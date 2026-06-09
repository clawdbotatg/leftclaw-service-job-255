import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  "8453": {
    ClamsPool: {
      address: "0x94a312581269433d52F83c8FFd34097370627E2a",
      abi: [
        {
          type: "constructor",
          inputs: [
            {
              name: "clawd",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "CLAWD",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract IERC20",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "DEAD_AMOUNT",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "DEAD_SHARES",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "addToPool",
          inputs: [
            {
              name: "amount",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "deposit",
          inputs: [
            {
              name: "amount",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "gameActive",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "gameContract",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "gameContractSet",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "initGame",
          inputs: [
            {
              name: "_game",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "payOut",
          inputs: [
            {
              name: "recipient",
              type: "address",
              internalType: "address",
            },
            {
              name: "amount",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "setGameActive",
          inputs: [
            {
              name: "active",
              type: "bool",
              internalType: "bool",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "shareValueCLAWD",
          inputs: [
            {
              name: "_shares",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "shares",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "totalPooled",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "totalShares",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "userSharesCLAWD",
          inputs: [
            {
              name: "user",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "withdraw",
          inputs: [
            {
              name: "sharesToBurn",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "event",
          name: "Deposited",
          inputs: [
            {
              name: "investor",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "amount",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
            {
              name: "shares",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "Withdrawn",
          inputs: [
            {
              name: "investor",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "shares",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
            {
              name: "amount",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "error",
          name: "AlreadyInitialized",
          inputs: [],
        },
        {
          type: "error",
          name: "GameActive",
          inputs: [],
        },
        {
          type: "error",
          name: "GameNotInitialized",
          inputs: [],
        },
        {
          type: "error",
          name: "InsufficientPool",
          inputs: [],
        },
        {
          type: "error",
          name: "InsufficientShares",
          inputs: [],
        },
        {
          type: "error",
          name: "NotGameContract",
          inputs: [],
        },
        {
          type: "error",
          name: "ReentrancyGuardReentrantCall",
          inputs: [],
        },
        {
          type: "error",
          name: "SafeERC20FailedOperation",
          inputs: [
            {
              name: "token",
              type: "address",
              internalType: "address",
            },
          ],
        },
      ],
    },
    ClamsGame: {
      address: "0x5E91944DB001C70435E2425DF14430829d4fBc06",
      abi: [
        {
          type: "constructor",
          inputs: [
            {
              name: "vrfCoordinator",
              type: "address",
              internalType: "address",
            },
            {
              name: "clawd",
              type: "address",
              internalType: "address",
            },
            {
              name: "pool",
              type: "address",
              internalType: "address",
            },
            {
              name: "entryFee",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "keyHash",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "subscriptionId",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "BURN_BPS",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "CALLBACK_GAS_LIMIT",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint32",
              internalType: "uint32",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "CLAMS_PER_ROUND",
          inputs: [
            {
              name: "index",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "uint8",
              internalType: "uint8",
            },
          ],
          stateMutability: "pure",
        },
        {
          type: "function",
          name: "CLAM_BPS",
          inputs: [
            {
              name: "index",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "uint16",
              internalType: "uint16",
            },
          ],
          stateMutability: "pure",
        },
        {
          type: "function",
          name: "CLAWD_TOKEN",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "ENTRY_FEE",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "KEY_HASH",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "POOL_ADDRESS",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "POOL_SHARE_BPS",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "REQUEST_CONFIRMATIONS",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint16",
              internalType: "uint16",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "ROUND_MULTIPLIERS",
          inputs: [
            {
              name: "index",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "uint16",
              internalType: "uint16",
            },
          ],
          stateMutability: "pure",
        },
        {
          type: "function",
          name: "SUBSCRIPTION_ID",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "TIMEOUT",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "TREASURY_ADDRESS",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "TREASURY_BPS",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "acceptOwnership",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "currentGame",
          inputs: [],
          outputs: [
            {
              name: "contestant",
              type: "address",
              internalType: "address",
            },
            {
              name: "jackpotValue",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "contestantClam",
              type: "uint8",
              internalType: "uint8",
            },
            {
              name: "currentRound",
              type: "uint8",
              internalType: "uint8",
            },
            {
              name: "lastActionTimestamp",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "currentOffer",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "active",
              type: "bool",
              internalType: "bool",
            },
            {
              name: "vrfPending",
              type: "bool",
              internalType: "bool",
            },
            {
              name: "roundEliminated",
              type: "bool",
              internalType: "bool",
            },
            {
              name: "vrfRequestId",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "deal",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "eliminateClams",
          inputs: [
            {
              name: "clamIds",
              type: "uint8[]",
              internalType: "uint8[]",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "finalReveal",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "forfeit",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "getJackpotValue",
          inputs: [
            {
              name: "poolTVL",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "noDeal",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "owner",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "rawFulfillRandomWords",
          inputs: [
            {
              name: "requestId",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "randomWords",
              type: "uint256[]",
              internalType: "uint256[]",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "s_vrfCoordinator",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract IVRFCoordinatorV2Plus",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "setCoordinator",
          inputs: [
            {
              name: "_vrfCoordinator",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "startGame",
          inputs: [
            {
              name: "chosenClamId",
              type: "uint8",
              internalType: "uint8",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "transferOwnership",
          inputs: [
            {
              name: "to",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "event",
          name: "ClamsEliminated",
          inputs: [
            {
              name: "clamIds",
              type: "uint8[]",
              indexed: false,
              internalType: "uint8[]",
            },
            {
              name: "values",
              type: "uint256[]",
              indexed: false,
              internalType: "uint256[]",
            },
            {
              name: "bankerOffer",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "CoordinatorSet",
          inputs: [
            {
              name: "vrfCoordinator",
              type: "address",
              indexed: false,
              internalType: "address",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "DealTaken",
          inputs: [
            {
              name: "contestant",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "offer",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "GameEnded",
          inputs: [
            {
              name: "contestant",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "payout",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
            {
              name: "tookDeal",
              type: "bool",
              indexed: false,
              internalType: "bool",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "GameForfeited",
          inputs: [
            {
              name: "contestant",
              type: "address",
              indexed: true,
              internalType: "address",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "GameStarted",
          inputs: [
            {
              name: "contestant",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "jackpot",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "OwnershipTransferRequested",
          inputs: [
            {
              name: "from",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "to",
              type: "address",
              indexed: true,
              internalType: "address",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "OwnershipTransferred",
          inputs: [
            {
              name: "from",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "to",
              type: "address",
              indexed: true,
              internalType: "address",
            },
          ],
          anonymous: false,
        },
        {
          type: "error",
          name: "ClamAlreadyEliminated",
          inputs: [],
        },
        {
          type: "error",
          name: "DuplicateClamId",
          inputs: [],
        },
        {
          type: "error",
          name: "EliminationsRequired",
          inputs: [],
        },
        {
          type: "error",
          name: "GameAlreadyActive",
          inputs: [],
        },
        {
          type: "error",
          name: "InsufficientPool",
          inputs: [],
        },
        {
          type: "error",
          name: "InvalidClamCount",
          inputs: [],
        },
        {
          type: "error",
          name: "InvalidClamId",
          inputs: [],
        },
        {
          type: "error",
          name: "InvalidVRFRequest",
          inputs: [],
        },
        {
          type: "error",
          name: "NoActiveGame",
          inputs: [],
        },
        {
          type: "error",
          name: "NoOffer",
          inputs: [],
        },
        {
          type: "error",
          name: "NotContestant",
          inputs: [],
        },
        {
          type: "error",
          name: "NotFinalRound",
          inputs: [],
        },
        {
          type: "error",
          name: "NotTimedOut",
          inputs: [],
        },
        {
          type: "error",
          name: "OnlyCoordinatorCanFulfill",
          inputs: [
            {
              name: "have",
              type: "address",
              internalType: "address",
            },
            {
              name: "want",
              type: "address",
              internalType: "address",
            },
          ],
        },
        {
          type: "error",
          name: "OnlyOwnerOrCoordinator",
          inputs: [
            {
              name: "have",
              type: "address",
              internalType: "address",
            },
            {
              name: "owner",
              type: "address",
              internalType: "address",
            },
            {
              name: "coordinator",
              type: "address",
              internalType: "address",
            },
          ],
        },
        {
          type: "error",
          name: "OwnClamCannotBeEliminated",
          inputs: [],
        },
        {
          type: "error",
          name: "ReentrancyGuardReentrantCall",
          inputs: [],
        },
        {
          type: "error",
          name: "SafeERC20FailedOperation",
          inputs: [
            {
              name: "token",
              type: "address",
              internalType: "address",
            },
          ],
        },
        {
          type: "error",
          name: "VRFPending",
          inputs: [],
        },
        {
          type: "error",
          name: "ZeroAddress",
          inputs: [],
        },
      ],
    },
  },
} as const;

export type DeployedContracts = typeof deployedContracts;
export default deployedContracts satisfies GenericContractsDeclaration;
