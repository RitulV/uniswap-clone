// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.7.0<0.9.0;
// to use nested array in contracts
pragma abicoder v2;

import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";

contract SwapMultiHop{
    ISwapRouter public constant swapRouter = ISwapRouter();

    // addresses of the tokens 
    address public constant DAI;
    address public constant WETH9;
    address public constant USDC;

    function swapExactInputMultihop(uint amountIn) external returns (uint amountOut){
        TransferHelper.safeTransferFrom(WETH9, msg.sender, address(this), amountIn);
        TransferHelper.safeApprove(WETH9, address(swapRouter), amountIn);

        ISwapRouter.ExactInputParams memory params=ISwapRouter.ExactInputParams({
            path: abi.encodePacked(
                WETH9, // input
                uint24(3000), //pool fee
                USDC, // output conversion
                uint24(100),
                DAI
            ),
            recipient: msg.sender,
            deadline: block.timestamp,
            amountIn:amountIn,
            amountOutMinimum:0
        });

        amountOut=swapRouter.exactInput(params);
    }

    function swapExactOutputMultihop(uint amountOut, uint amountInMaximum) external returns (uint amountIn){
        TransferHelper.safeTransferFrom(WETH9, msg.sender, address(this), amountInMaximum);
        TransferHelper.safeApprove(WETH9, address(swapRouter), amountInMaximum);

        ISwapRouter.ExactOutputParams memory params=ISwapRouter.ExactOutputParams({
            path: abi.encodePacked(
                DAI, // input
                uint24(100), //pool fee
                USDC, 
                uint24(3000),
                WETH9
            ),
            recipient: msg.sender,
            deadline: block.timestamp,
            amountOut:amountOut,
            amountInMaximum:amountInMaximum
        });

        amountIn=swapRouter.exactInput(params);

        if(amountIn < amountInMaximum){
            TransferHelper.safeApprove(WETH9, address(swapRouter), 0);
            TransferHelper.safeTransferFrom(WETH9, address(this), msg.sender, amountInMaximum-amountIn);
        }
    }
}
}
