import { ethers } from "ethers";
import Web3Modal from "web3modal";

import {
  BooTokenAddress,
  BooTokenABI,
  LifeTokenAddress,
  LifeTokenABI,
  SingleSwapTokenAddress,
  SingleSwapTokenABI,
  SwapMultiHopAddress,
  swapMultiHopABI,
  IWETHAddress,
  IWETHABI,
} from "../Context/constants";

// function to check if wallet is connected
export const checkIfWalletConnected = async () => {
  try {
      if (!window.ethereum) return console.log("Install Metamask");
      const accounts = await window.ethereum.requests({
           method:"eth_accounts",
      })
      
      const firstAccount = accounts[0];
      return firstAccount;

  } catch (error) {
    console.log(error);
  }
};

//  function to connect to wallet
export const connectWallet = async () => {
    try {
        if (!window.ethereum) return console.log("Install Metamask");
        const accounts = await window.ethereum.requests({
          method: "eth_requestAccounts",
        });

        const firstAccount = accounts[0];
        return firstAccount;
        
    } catch (error) {
        console.log(error);
    }
}

// FETCHING CONTRACT ------------------------

// boo token fetching
export const fetchBooContract = (signerOrProvider) =>
  new ethers.Contract(BooTokenAddress, BooTokenABI, signerOrProvider);

//connecting with BOO token contract
export const connectingWithBooToken = async () => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchBooContract(signer);

        return contract;
    } catch (error) {
        console.log(error)
    }
}

// FETCHING CONTRACT ------------------------

// life token fetching
export const fetchLifeContract = (signerOrProvider) =>
  new ethers.Contract(LifeTokenAddress, LifeTokenABI, signerOrProvider);

//connecting with Life token contract
export const connectingWithLifeToken = async () => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchLifeContract(signer);
        return contract;
    } catch (error) {
        console.log(error)
    }
}

// FETCHING CONTRACT ------------------------

// singleSwap token fetching
export const fetchSingleSwapContract = (signerOrProvider) =>
  new ethers.Contract(
    SingleSwapTokenAddress,
    SingleSwapTokenABI,
    signerOrProvider
  );

//connecting with singleSwap token contract
export const connectingWithSingleSwapToken = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchSingleSwapContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};


// FETCHING CONTRACT ------------------------

// IWETH token fetching
export const fetchIWETHContract = (signerOrProvider) =>
  new ethers.Contract(IWETHAddress, IWETHABI, signerOrProvider);

//connecting with IWETH token contract
export const connectingWithIWETHToken = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchIWETHContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

// FETCHING CONTRACT ------------------------

// DAI token fetching
const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
export const fetchDAIContract = (signerOrProvider) =>
  new ethers.Contract(DAIAddress, IWETHABI, signerOrProvider);

//connecting with DAI token contract
export const connectingWithDAIToken = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchDAIContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};