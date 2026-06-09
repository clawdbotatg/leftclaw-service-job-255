// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title ClamsPool
 * @notice ERC4626-style investor vault for the "25 Clams" game. CLAWD is the underlying asset.
 *         Investors deposit CLAWD while no game is active and receive proportional shares.
 *         The registered game contract pays out winners and adds entry fees to the pool.
 * @dev Uses a dead-shares seeding pattern to prevent the first-depositor inflation attack.
 */
contract ClamsPool is ReentrancyGuard {
    using SafeERC20 for IERC20;

    // --- Constants ---
    /// @dev Dead shares minted to address(1) on the first deposit to seed the pool.
    uint256 public constant DEAD_SHARES = 1000;
    /// @dev Virtual assets seeded alongside the dead shares.
    uint256 public constant DEAD_AMOUNT = 1000;

    // --- Immutables ---
    IERC20 public immutable CLAWD;

    // --- Storage ---
    address public gameContract;
    bool public gameContractSet;
    bool public gameActive;

    uint256 public totalShares;
    uint256 public totalPooled;
    mapping(address => uint256) public shares;

    // --- Events ---
    event Deposited(address indexed investor, uint256 amount, uint256 shares);
    event Withdrawn(address indexed investor, uint256 shares, uint256 amount);

    // --- Errors ---
    error GameActive();
    error GameNotInitialized();
    error NotGameContract();
    error AlreadyInitialized();
    error InsufficientPool();
    error InsufficientShares();

    constructor(address clawd) {
        CLAWD = IERC20(clawd);
    }

    modifier onlyGame() {
        if (!gameContractSet) revert GameNotInitialized();
        if (msg.sender != gameContract) revert NotGameContract();
        _;
    }

    /// @notice One-time registration of the game contract. No owner required.
    function initGame(address _game) external {
        if (gameContractSet) revert AlreadyInitialized();
        gameContract = _game;
        gameContractSet = true;
    }

    /// @notice Toggle the active-game lock. Only callable by the registered game contract.
    function setGameActive(bool active) external onlyGame {
        gameActive = active;
    }

    /// @notice Deposit CLAWD and mint proportional shares. Disabled while a game is active.
    function deposit(uint256 amount) external nonReentrant {
        if (gameActive) revert GameActive();

        uint256 sharesToMint;
        if (totalShares == 0) {
            // Seed dead shares to prevent the first-depositor inflation attack.
            shares[address(1)] = DEAD_SHARES;
            totalShares = DEAD_SHARES;
            totalPooled = DEAD_AMOUNT;
            sharesToMint = (amount * totalShares) / totalPooled;
        } else {
            sharesToMint = (amount * totalShares) / totalPooled;
        }

        // Effects
        shares[msg.sender] += sharesToMint;
        totalShares += sharesToMint;
        totalPooled += amount;

        // Interaction
        CLAWD.safeTransferFrom(msg.sender, address(this), amount);

        emit Deposited(msg.sender, amount, sharesToMint);
    }

    /// @notice Burn shares and withdraw proportional CLAWD. Disabled while a game is active.
    function withdraw(uint256 sharesToBurn) external nonReentrant {
        if (gameActive) revert GameActive();
        if (shares[msg.sender] < sharesToBurn) revert InsufficientShares();

        uint256 amountOut = (sharesToBurn * totalPooled) / totalShares;

        // Effects
        shares[msg.sender] -= sharesToBurn;
        totalShares -= sharesToBurn;
        totalPooled -= amountOut;

        // Interaction
        CLAWD.safeTransfer(msg.sender, amountOut);

        emit Withdrawn(msg.sender, sharesToBurn, amountOut);
    }

    /// @notice Pay CLAWD from the pool to a winner. Only callable by the game contract.
    function payOut(address recipient, uint256 amount) external nonReentrant onlyGame {
        if (amount > totalPooled) revert InsufficientPool();

        // Effects
        totalPooled -= amount;

        // Interaction
        CLAWD.safeTransfer(recipient, amount);
    }

    /// @notice Account for entry-fee CLAWD already transferred into the pool. Only callable by the game contract.
    function addToPool(uint256 amount) external nonReentrant onlyGame {
        totalPooled += amount;
    }

    /// @notice CLAWD value of a given number of shares.
    function shareValueCLAWD(uint256 _shares) public view returns (uint256) {
        if (totalShares == 0) return 0;
        return (_shares * totalPooled) / totalShares;
    }

    /// @notice CLAWD value of a user's shares.
    function userSharesCLAWD(address user) external view returns (uint256) {
        return shareValueCLAWD(shares[user]);
    }
}
