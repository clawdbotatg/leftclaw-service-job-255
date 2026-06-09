// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IClamsPool {
    function gameContractSet() external view returns (bool);
    function totalPooled() external view returns (uint256);
    function totalShares() external view returns (uint256);
    function gameActive() external view returns (bool);
    function setGameActive(bool active) external;
    function addToPool(uint256 amount) external;
    function payOut(address recipient, uint256 amount) external;
}
