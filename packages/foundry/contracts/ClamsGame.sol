// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {VRFConsumerBaseV2Plus} from
    "chainlink-brownie-contracts/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {VRFV2PlusClient} from
    "chainlink-brownie-contracts/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";
import {IClamsPool} from "./interfaces/IClamsPool.sol";

/**
 * @title ClamsGame
 * @notice Core logic for the "25 Clams" Deal or No Deal-style game.
 *         A contestant pays an entry fee, picks one of 25 clams, then plays 8 rounds of
 *         eliminating clams and accepting / rejecting a banker offer. Clam values are
 *         determined by a Chainlink VRF-driven Fisher-Yates shuffle.
 * @dev Inherits VRFConsumerBaseV2Plus (its ConfirmedOwner is set to the deployer but unused).
 */
contract ClamsGame is VRFConsumerBaseV2Plus, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // --- Immutables / constants ---
    address public immutable CLAWD_TOKEN;
    address public immutable POOL_ADDRESS;
    uint256 public immutable ENTRY_FEE;
    uint256 public constant BURN_BPS = 200;
    uint256 public constant TREASURY_BPS = 200;
    address public constant TREASURY_ADDRESS = 0x90eF2A9211A3E7CE788561E5af54C76B0Fa3aEd0;
    uint256 public constant POOL_SHARE_BPS = 9600;
    uint256 public constant TIMEOUT = 86400;
    bytes32 public immutable KEY_HASH;
    uint256 public immutable SUBSCRIPTION_ID;
    uint32 public constant CALLBACK_GAS_LIMIT = 500000;
    uint16 public constant REQUEST_CONFIRMATIONS = 3;

    address internal constant BURN_ADDRESS = 0x000000000000000000000000000000000000dEaD;
    uint256 internal constant BPS_DENOMINATOR = 10000;
    uint256 internal constant NUM_CLAMS = 25;
    uint256 internal constant NUM_ROUNDS = 8;

    // --- Game state ---
    struct Game {
        address contestant;
        uint256 jackpotValue;
        uint256[25] clamValues; // in CLAWD wei, shuffled at VRF fulfillment
        bool[25] eliminated;
        uint8 contestantClam; // chosen by contestant at game start, 0-24
        uint8 currentRound; // 0-7 (8 rounds total), 8 == awaiting finalReveal
        uint256 lastActionTimestamp;
        uint256 currentOffer;
        bool active;
        bool vrfPending; // true between startGame and fulfillRandomWords
        bool roundEliminated; // true after eliminateClams called for current round
        uint256 vrfRequestId;
    }

    Game public currentGame;

    // --- Events ---
    event GameStarted(address indexed contestant, uint256 jackpot);
    event ClamsEliminated(uint8[] clamIds, uint256[] values, uint256 bankerOffer);
    event DealTaken(address indexed contestant, uint256 offer);
    event GameEnded(address indexed contestant, uint256 payout, bool tookDeal);
    event GameForfeited(address indexed contestant);

    // --- Errors ---
    error NoActiveGame();
    error NotContestant();
    error GameAlreadyActive();
    error VRFPending();
    error InvalidClamCount();
    error InvalidClamId();
    error DuplicateClamId();
    error ClamAlreadyEliminated();
    error OwnClamCannotBeEliminated();
    error InsufficientPool();
    error NotTimedOut();
    error InvalidVRFRequest();
    error NoOffer();
    error NotFinalRound();
    error EliminationsRequired();

    constructor(
        address vrfCoordinator,
        address clawd,
        address pool,
        uint256 entryFee,
        bytes32 keyHash,
        uint256 subscriptionId
    ) VRFConsumerBaseV2Plus(vrfCoordinator) {
        CLAWD_TOKEN = clawd;
        POOL_ADDRESS = pool;
        ENTRY_FEE = entryFee;
        KEY_HASH = keyHash;
        SUBSCRIPTION_ID = subscriptionId;
    }

    // --- Constant data accessors (fixed-size arrays cannot be `constant` in Solidity) ---

    /// @notice BPS value of each clam. Index 24 (jackpot) is 0 (placeholder, set per-game).
    function CLAM_BPS(uint256 index) public pure returns (uint16) {
        return _clamBps()[index];
    }

    function _clamBps() internal pure returns (uint16[25] memory) {
        return [
            uint16(10),
            50,
            100,
            150,
            200,
            250,
            300,
            350,
            400,
            450,
            500,
            550,
            600,
            650,
            700,
            800,
            1000,
            1500,
            2000,
            2500,
            3000,
            3500,
            4000,
            5000,
            0
        ];
    }

    /// @notice Banker offer multiplier (BPS) for each round.
    function ROUND_MULTIPLIERS(uint256 index) public pure returns (uint16) {
        return _roundMultipliers()[index];
    }

    function _roundMultipliers() internal pure returns (uint16[8] memory) {
        return [uint16(5500), 6500, 7200, 7800, 8400, 8800, 9200, 9700];
    }

    /// @notice Number of clams the contestant must eliminate in each round.
    function CLAMS_PER_ROUND(uint256 index) public pure returns (uint8) {
        return _clamsPerRound()[index];
    }

    function _clamsPerRound() internal pure returns (uint8[8] memory) {
        return [uint8(6), 5, 4, 3, 2, 1, 1, 1];
    }

    // --- Jackpot tiers ---

    function getJackpotValue(uint256 poolTVL) public view returns (uint256) {
        uint256 fee = ENTRY_FEE;
        if (poolTVL < 50 * fee) return 5 * fee;
        if (poolTVL < 100 * fee) return 10 * fee;
        if (poolTVL < 500 * fee) return 25 * fee;
        if (poolTVL < 1000 * fee) return 50 * fee;
        if (poolTVL < 5000 * fee) return 100 * fee;
        return 500 * fee;
    }

    // --- Game flow ---

    /// @notice Begin a new game. Pulls the entry fee, splits it, locks the pool and requests VRF.
    function startGame(uint8 chosenClamId) external nonReentrant {
        if (currentGame.active || currentGame.vrfPending) revert GameAlreadyActive();
        if (chosenClamId >= NUM_CLAMS) revert InvalidClamId();
        if (!IClamsPool(POOL_ADDRESS).gameContractSet()) revert InsufficientPool();

        IERC20 clawd = IERC20(CLAWD_TOKEN);

        // Pull entry fee from the contestant.
        clawd.safeTransferFrom(msg.sender, address(this), ENTRY_FEE);

        // Compute fee split.
        uint256 burnAmount = (ENTRY_FEE * BURN_BPS) / BPS_DENOMINATOR;
        uint256 treasuryAmount = (ENTRY_FEE * TREASURY_BPS) / BPS_DENOMINATOR;
        uint256 poolAmount = ENTRY_FEE - burnAmount - treasuryAmount;

        // Distribute fee.
        clawd.safeTransfer(BURN_ADDRESS, burnAmount);
        clawd.safeTransfer(TREASURY_ADDRESS, treasuryAmount);
        clawd.safeTransfer(POOL_ADDRESS, poolAmount);
        IClamsPool(POOL_ADDRESS).addToPool(poolAmount);

        // Pool solvency check against the jackpot tier (TVL now includes poolAmount).
        uint256 poolTVL = IClamsPool(POOL_ADDRESS).totalPooled();
        uint256 jackpot = getJackpotValue(poolTVL);
        if (poolTVL < jackpot) revert InsufficientPool();

        // Initialize the game slot (cleared from any prior game).
        delete currentGame;
        currentGame.contestant = msg.sender;
        currentGame.contestantClam = chosenClamId;
        currentGame.jackpotValue = jackpot;
        currentGame.vrfPending = true;
        currentGame.active = false;
        currentGame.lastActionTimestamp = block.timestamp;

        // Lock investor deposits/withdrawals.
        IClamsPool(POOL_ADDRESS).setGameActive(true);

        // Request randomness.
        uint256 requestId = s_vrfCoordinator.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: KEY_HASH,
                subId: SUBSCRIPTION_ID,
                requestConfirmations: REQUEST_CONFIRMATIONS,
                callbackGasLimit: CALLBACK_GAS_LIMIT,
                numWords: 1,
                extraArgs: VRFV2PlusClient._argsToBytes(VRFV2PlusClient.ExtraArgsV1({nativePayment: false}))
            })
        );
        currentGame.vrfRequestId = requestId;
        // GameStarted is emitted in fulfillRandomWords once VRF callback confirms the game is live.
    }

    /// @notice VRF callback: shuffles the clam values and activates the game.
    function fulfillRandomWords(uint256 requestId, uint256[] calldata randomWords) internal override {
        if (requestId != currentGame.vrfRequestId) revert InvalidVRFRequest();
        if (!currentGame.vrfPending) revert VRFPending();

        // Build the value array: BPS-derived amounts for clams 0-23, jackpot for clam 24.
        uint256[25] memory values;
        uint16[25] memory bps = _clamBps();
        for (uint256 i = 0; i < 24; i++) {
            values[i] = (uint256(bps[i]) * ENTRY_FEE) / BPS_DENOMINATOR;
        }
        values[24] = currentGame.jackpotValue;

        // Fisher-Yates shuffle using randomWords[0] as the seed.
        uint256 seed = randomWords[0];
        for (uint256 i = 24; i >= 1; i--) {
            uint256 j = uint256(keccak256(abi.encode(seed, i))) % (i + 1);
            (values[i], values[j]) = (values[j], values[i]);
        }

        currentGame.clamValues = values;
        currentGame.active = true;
        currentGame.vrfPending = false;
        currentGame.currentRound = 0;
        currentGame.lastActionTimestamp = block.timestamp;

        emit GameStarted(currentGame.contestant, currentGame.jackpotValue);
    }

    /// @notice Eliminate the required number of clams for the current round and compute the banker offer.
    function eliminateClams(uint8[] calldata clamIds) external nonReentrant {
        if (!currentGame.active) revert NoActiveGame();
        if (currentGame.vrfPending) revert VRFPending();
        if (msg.sender != currentGame.contestant) revert NotContestant();

        uint8 round = currentGame.currentRound;
        if (round >= NUM_ROUNDS) revert NotFinalRound();
        if (clamIds.length != _clamsPerRound()[round]) revert InvalidClamCount();

        bool[25] memory seen;
        uint256[] memory revealedValues = new uint256[](clamIds.length);

        for (uint256 i = 0; i < clamIds.length; i++) {
            uint8 id = clamIds[i];
            if (id >= NUM_CLAMS) revert InvalidClamId();
            if (id == currentGame.contestantClam) revert OwnClamCannotBeEliminated();
            if (currentGame.eliminated[id]) revert ClamAlreadyEliminated();
            if (seen[id]) revert DuplicateClamId();
            seen[id] = true;

            currentGame.eliminated[id] = true;
            revealedValues[i] = currentGame.clamValues[id];
        }

        // Banker offer = EV of remaining (non-eliminated, excluding own clam) * round multiplier.
        uint256 sum;
        uint256 count;
        for (uint256 i = 0; i < NUM_CLAMS; i++) {
            if (i == currentGame.contestantClam) continue;
            if (currentGame.eliminated[i]) continue;
            sum += currentGame.clamValues[i];
            count++;
        }

        uint256 offer;
        if (count > 0) {
            uint256 ev = sum / count;
            offer = (ev * _roundMultipliers()[round]) / BPS_DENOMINATOR;
        }
        currentGame.currentOffer = offer;
        currentGame.roundEliminated = true;
        currentGame.lastActionTimestamp = block.timestamp;

        emit ClamsEliminated(clamIds, revealedValues, offer);
    }

    /// @notice Accept the current banker offer and end the game.
    function deal() external nonReentrant {
        if (!currentGame.active) revert NoActiveGame();
        if (msg.sender != currentGame.contestant) revert NotContestant();
        if (currentGame.currentRound >= NUM_ROUNDS) revert NotFinalRound();
        if (!currentGame.roundEliminated) revert EliminationsRequired();

        uint256 offer = currentGame.currentOffer;
        if (offer == 0) revert NoOffer();

        address contestant = currentGame.contestant;

        // Effects: end the game before external payout.
        currentGame.active = false;

        // Interactions.
        IClamsPool(POOL_ADDRESS).payOut(contestant, offer);
        IClamsPool(POOL_ADDRESS).setGameActive(false);

        emit DealTaken(contestant, offer);
        emit GameEnded(contestant, offer, true);

        delete currentGame;
    }

    /// @notice Reject the current banker offer and advance to the next round.
    ///         Advancing past the last round (to round 8) puts the game in the finalReveal state.
    function noDeal() external nonReentrant {
        if (!currentGame.active) revert NoActiveGame();
        if (msg.sender != currentGame.contestant) revert NotContestant();
        if (currentGame.currentRound >= NUM_ROUNDS) revert NotFinalRound();
        if (!currentGame.roundEliminated) revert EliminationsRequired();

        currentGame.currentRound += 1;
        currentGame.currentOffer = 0;
        currentGame.roundEliminated = false;
        currentGame.lastActionTimestamp = block.timestamp;
    }

    /// @notice After all 8 rounds were declined, reveal the contestant's own clam and pay it out.
    function finalReveal() external nonReentrant {
        if (!currentGame.active) revert NoActiveGame();
        if (msg.sender != currentGame.contestant) revert NotContestant();
        if (currentGame.currentRound != NUM_ROUNDS) revert NotFinalRound();

        address contestant = currentGame.contestant;
        uint256 payout = currentGame.clamValues[currentGame.contestantClam];

        // Effects.
        currentGame.active = false;

        // Interactions.
        if (payout > 0) {
            IClamsPool(POOL_ADDRESS).payOut(contestant, payout);
        }
        IClamsPool(POOL_ADDRESS).setGameActive(false);

        emit GameEnded(contestant, payout, false);

        delete currentGame;
    }

    /// @notice Anyone can forfeit a stalled game after the timeout, releasing the pool lock.
    ///         The entry fee already added to the pool remains there.
    function forfeit() external nonReentrant {
        if (!currentGame.active && !currentGame.vrfPending) revert NoActiveGame();
        if (block.timestamp <= currentGame.lastActionTimestamp + TIMEOUT) revert NotTimedOut();

        address contestant = currentGame.contestant;

        currentGame.active = false;
        currentGame.vrfPending = false;

        IClamsPool(POOL_ADDRESS).setGameActive(false);

        emit GameForfeited(contestant);

        delete currentGame;
    }
}
