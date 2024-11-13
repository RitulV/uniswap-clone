import booToken from "./BooToken.json"
import lifeToken from "./LifeToken.json"
import singleSwapToken from "./SingleSwapToken.json";
import swapMultiHop from "./swapMultiHop.json";
import IWETH from './IWETH.json'
  
// replace with contract addresses
export const BooTokenAddress = "0xA899118f4BCCb62F8c6A37887a4F450D8a4E92E0";
export const BooTokenABI = booToken.abi; 

export const LifeTokenAddress = "0xb60971942E4528A811D24826768Bc91ad1383D21";
export const LifeTokenABI = lifeToken.abi; 

export const SingleSwapTokenAddress = "0xD185B4846E5fd5419fD4D077dc636084BEfC51C0";
export const SingleSwapTokenABI = singleSwapToken.abi; 

export const SwapMultiHopAddress = "0xF94AB55a20B32AC37c3A105f12dB535986697945";
export const swapMultiHopABI = swapMultiHop.abi; 

export const IWETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
export const IWETHABI = IWETH.abi; 
