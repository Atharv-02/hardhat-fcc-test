require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
module.exports = {
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
    },
  },
  etherscan: {
    apikey: {
      goerli: ETHERSCAN_API_KEY,
    },
    etherscan: {
      apiKey: {
        goerli: "F41UHJ8QWGI86FPGMZBZIHVPPAHX6XU6F3",
      },
      customChains: [
        {
          network: "goerli",
          chainId: 5,
          urls: {
            apiURL: "https://api-goerli.etherscan.io/api",
            browserURL: "https://goerli.etherscan.io",
          },
        },
      ],
    },
  },
  solidity: "0.8.19",
};
