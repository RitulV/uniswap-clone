import React, { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import Web3Modal from "web3modal";

import {
  checkIfWalletConnected,
  connectWallet,
  connectingWithBooToken,
  connectingWithLifeToken,
  connectingWithSingleSwapToken,
  connectingWithIWETHToken,
  connectingWithDAIToken,
} from "../Utils/appFeatures";

import { IWETHABI } from "./constants";
import ERC20 from "./ERC20.json";

export const SwapTokenContext = React.createContext();

export const SwapTokenContextProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [ether, setEther] = useState("");
  const [networkConnect, setNetworkConnect] = useState("");
  const [weth9, setWeth9] = useState("");
  const [dai, setDai] = useState("");
  const [tokenData, setTokenData] = useState([]);

  // weth, boo and life token address
  const addToken = [
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    "0xb60971942E4528A811D24826768Bc91ad1383D21",
    "0xD185B4846E5fd5419fD4D077dc636084BEfC51C0",
  ];

  const fetchingData = async () => {
    try {
      // get user account
      const userAccount = await checkIfWalletConnected();
      setAccount(userAccount);

      // create provider
      // const web3modal = new Web3Modal();
      // const connection = await web3modal.connect();
      // const provider = new ethers.providers.Web3Provider(connection);
      const provider = new ethers.providers.JsonRpcProvider(
        "https://eth-mainnet.g.alchemy.com/v2/L6WZg1Z2DT1CtAS3E2k3FDMsuVMTJGxm"
      );

      // check balance
      const balance = await provider.getBalance(userAccount);
      const convertBal = BigNumber.from(balance).toString();
      const ethValue = ethers.utils.formatEther(convertBal);
      setEther(ethValue);

      // get network
      const network = await provider.getNetwork();
      setNetworkConnect(network.name);

      // all token balance and data
      addToken.map(async (el) => {
        // getting contract
        const contract = new ethers.Contract(el, ERC20, provider);

        // getting balance of token
        const userBalance = await contract.balanceOf(userAccount);
        const tokenLeft = BigNumber.from(userBalance).toString();
        const convertTokenBal = ethers.utils.formatEther(tokenLeft);

        // get name and symbol
        const symbol = await contract.symbol();
        const name = await contract.name();

        tokenData.push({
          name: name,
          symbol: symbol,
          tokenBalance: convertTokenBal,
        });
      });

      //weth balance
      const wethContract = await connectingWithIWETHToken();
      const wethBal = await wethContract.balanceOf(userAccount);
      const wethToken = BigNumber.from(wethBal).toString();
      const convertWethTokenBal = ethers.utils.formatEther(wethToken);
      setWeth9(convertWethTokenBal);

      //DAI balance
      const daiContract = await connectingWithDAIToken();
      const daiBal = await daiContract.balanceOf(userAccount);
      const daiToken = BigNumber.from(daiBal).toString();
      const convertdaiTokenBal = ethers.utils.formatEther(daiToken);
      setDai(convertdaiTokenBal);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  // single swap token
  const singleSwapToken = async () => {
    try {
      const singleSwapToken = await connectingWithSingleSwapToken();
      const weth = await connectingWithIWETHToken();
      const dai = await connectingWithDAIToken();

      const amountIn = BigNumber.from("1000000000000000000"); // 1 WETH

      await weth.deposit({ value: amountIn });
      await weth.approve(singleSwapTokenContract.address, amountIn);

      // swap
      await singleSwapTokenContract.swapExactInputSingle(amountIn, {
        gasLimit: 300000,
      });

      const balance = await dai.balanceOf(account);
      const transferAmount = BigNumber.from(balance).toString();
      const ethValue = ether.utils.formatEther(transferAmount);
      setDai(ethValue);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SwapTokenContext.Provider
      value={{
        singleSwapToken,
        connectWallet,
        account,
        weth9,
        dai,
        networkConnect,
        ether,
        tokenData,
      }}
    >
      {children}
    </SwapTokenContext.Provider>
  );
};
