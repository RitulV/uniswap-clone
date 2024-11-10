import booToken from "./BooToken.json"
import lifeToken from "./LifeToken.json"
import singleSwapToken from "./SingleSwapToken.json";
import swapMultiHop from "./swapMultiHop.json";
import IWETH from './IWETH.json'
  
// replace with contract addresses

export const BooTokenAddress = "0x90c84237fddf091b1e63f369af122eb46000bc70";
export const BooTokenABI = booToken.abi; 

export const LifeTokenAddress = "0x3D63c50AD04DD5aE394CAB562b7691DD5de7CF6f";
export const LifeTokenABI = lifeToken.abi; 

export const SingleSwapTokenAddress = "0x103A3b128991781EE2c8db0454cA99d67b257923";
export const SingleSwapTokenABI = singleSwapToken.abi; 

export const SwapMultiHopAddress = "0xBbc18b580256A82dC0F9A86152b8B22E7C1C8005";
export const swapMultiHopABI = swapMultiHop.abi; 


export const IWETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
export const IWETHABI = IWETH.abi; 
