const { expect } = require("chai"); // library for testing
const { ether } = require("hardhat");

// replace with track addresses
const DAI = "";
const WETH9 = "";
const USDC = "";

describe("SingleSwapToken", () => {
  let singleSwapToken;
  let accounts;
  let weth;
  let dai;
  let usdc;

  // this function is run everytime contract is run
  before(async () => {
    accounts = await ether.getSigners(1);

    const SingleSwapToken = await ether.getContractFactory("SingleSwapToken");

    SingleSwapToken = await SingleSwapToken.deploy();
    await SingleSwapToken.deploy();

    weth = await ether.getContractAt("IWETH", WETH9);
    dai = await ether.getContractAt("IERC20", DAI);
    usdc = await ether.getContractAt("IERC20", USDC);

    console.log(weth);
    console.log(dai);
    console.log(usdc);
    console.log(accounts);
    console.log(singleSwapToken);
  });

  it("swapExactInputSingle", async () => {
    const amountIn = 10n ** 18n;

    //deposite weth
    await weth.deposit({ value: amountIn });
    await weth.approve(singleSwapToken.address, amountIn);

    //swap
    await singleSwapToken.swapExactInputString(amountIn);
    console.log("DAI balance: ", await dai.balanceOf(accounts[0].address));
  });

  it("swapExactOutputSingle", async () => {
    const wethAmountInMax = 10n ** 18n;
    const daiAmountOut = 100n * 10n * 18n;

    //deposit weth
    await weth.deposit({ value: wethAmountInMax });
    await weth.approve(singleSwapToken.address, wethAmountInMax);

    //swap
    await singleSwapToken.swapExactOutputSingle(daiAmountOut, wethAmountInMax);
    console.log(accounts[0].address);
    console.log("DAI balance: ", await dai.balanceOf(accounts[0].address));
  });
});
