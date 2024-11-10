// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.7.0<0.9.0;
// to use nested array in contracts
pragma abicoder v2;

// the below contract has two functions - approve and safeTransfer
// fund is transfered to uniswap contract and approved. the contract will spend the amount in our place
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";

import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";

contract SingleSwapToken{
    ISwapRouter public constant swapRouter = ISwapRouter();

    // initialize with contract addresses of the tokens 
    address public constant DAI = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    address public constant WETH9 = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    address public constant USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;

    // taken from Uniswap documentation
    // in this function output amount is not fixed
    function swapExactInputString(uint amountIn) external returns(uint amountOut){
        TransferHelper.safeTransferFrom(WETH9, msg.sender, address(this), amountIn);

        TransferHelper.safeApprove(WETH9, address(swapRouter), amountIn);

        // similar to struct
        ISwapRouter.ExactInputSingleParams memory params=ISwapRouter.ExactInputSingleParams({
            tokenIn:WETH9,
            tokenOut:DAI,
            fee:3000, // hardcoded for development, dynamic for production
            recepient:msg.sender,
            deadline:block.timestamp,
            amountIn:amountIn,
            amountOutMinimum:0,
            sqrtPriceLimitX96:0
        });

        amountOut = swapRouter.exactInputSingle(params);
    }

    // in this function output amount is fixed
    function swapExactOutputSingle(uint amountOut, uint amountInMaximum) external returns(uint amountIn){

        TransferHelper.safeTransferFrom(WETH9, msg.sender, address(this), amountInMaximum);
        TransferHelper.safeApprove(WETH9, address(this), amountInMaximum);

        ISwapRouter.ExactOutputSingleParams memory params=ISwapRouter.ExactOutputSingleParams({
            tokenIn:WETH9,
            tokenOut:DAI,
            fee:3000,
            recepient:msg.sender,
            deadline:block.timestamp,
            amountOut:amountOut,
            amountInMaximum:amountInMaximum,
            sqrtPriceLimitX96:0
        });

        amountIn=swapRouter.ExactOutputSingle(params);

        if(amountIn<amountInMaximum){
            TransferHelper.safeApprove(WETH9, address(swapRouter), 0);

            TransferHelper.safeTransfer(WETH9, msg.sender, amountInMaximum - amountIn);
        }
    }
}