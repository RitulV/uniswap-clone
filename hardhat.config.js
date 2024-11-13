// require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 5000,
        details: { yul: false },
      },
    },
  },
  networks: {
    hardhat: {
      gas: 12000000, // Set an appropriate gas limit
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/L6WZg1Z2DT1CtAS3E2k3FDMsuVMTJGxm",
        // url: "https://eth-sepolia.g.alchemy.com/v2/L6WZg1Z2DT1CtAS3E2k3FDMsuVMTJGxm",
        accounts: [
          "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
        ],
      },
    },
  },
};

// require("@nomiclabs/hardhat-waffle");

// module.exports = {
//   solidity: {
//     version: "0.7.6",
//     settings: {
//       optimizer: {
//         enabled: true,
//         runs: 5000,
//         details: { yul: false },
//       },
//     },
//   },
//   networks: {
//     hardhat: {
//       forking: {
//         url: "your",
//         accounts: [`0x${"your"}`],
//       },
//     },
//   },
// };
