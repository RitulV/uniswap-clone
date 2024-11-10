const { expect } = require("chai"); // library for testing
const { ether } = require("hardhat");

// replace with track addresses
const DAI = "";
const WETH9 = "";
const USDC = "";

describe("SwapMultiHop", () => {
  let swapMultiHop;
  let accounts;
  let weth;
  let dai;
  let usdc;

  // this function is run everytime contract is run
  before(async () => {
    accounts = await ethers.getSigners(1);

    const SwapMultiHop = await ethers.getContractFactory("SwapMultiHop");

    swapMultiHop = await SwapMultiHop.deploy();
    await swapMultiHop.deploy();

    weth = await ethers.getContractAt("IWETH", WETH9);
    dai = await ethers.getContractAt("IERC20", DAI);
    usdc = await ethers.getContractAt("IERC20", USDC);

    console.log(weth);
    console.log(dai);
    console.log(usdc);
    console.log(accounts);
    console.log(swapMultiHop);
  });

  it("swapExactInputMultihop", async () => {
    const amountIn = 10n ** 18n;

    //deposite weth
    await weth.deposit({ value: amountIn });
    await weth.approve(s.address, amountIn);

    //swap
    await swapMultiHop.swapExactInputMultihop(amountIn);
    console.log("DAI balance: ", await dai.balanceOf(accounts[0].address));
  });

  it("swapExactOutputMultihop", async () => {
    const wethAmountInMax = 10n ** 18n;
    const daiAmountOut = 100n * 10n * 18n;

    //deposit weth
    await weth.deposit({ value: wethAmountInMax });
    await weth.approve(s.address, wethAmountInMax);

    //swap
    await swapMultiHop.swapExactOutputMultihop(daiAmountOut, wethAmountInMax);
    console.log(accounts[0].address);
    console.log("DAI balance: ", await dai.balanceOf(accounts[0].address));
  });
});
