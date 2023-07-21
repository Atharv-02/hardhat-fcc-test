//imports
const { ethers, run, network } = require("hardhat");
require("dotenv").config();
//async main
async function main() {
  console.log(process.env.ETHERSCAN_API_KEY);
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying ...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  console.log("Confirming Deployment");
  // To wait and to make sure contract is deployed
  const contractDeployed = await simpleStorage.waitForDeployment();
  const address = await simpleStorage.getAddress();
  console.log("Hi");
  console.log(contractDeployed);

  if (network.config.chainId !== 31337 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deploymentTransaction().wait(6);
    await verify(address, []);
  }
  const currentValue = await simpleStorage.retrieve();
  console.log(currentValue);

  //Update the current value
  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(updatedValue);
}

// Verify contracts programatically

async function verify(contractAddress, args) {
  console.log("Verifying Contract ...");
  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified ")) {
      console.log("Already Verified");
    } else {
      console.log(e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
