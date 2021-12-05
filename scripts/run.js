const main = async () => {
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");

  // Above line compiles the contract WavePortal generate the necessary files we need to work with our contract under the artifacts directory

  const waveContract = await waveContractFactory.deploy();

  // What's happening here is Hardhat will create a local Ethereum network for us, but just for this contract. Then, after the script completes it'll destroy that local network. So, every time you run the contract, it'll be a fresh blockchain. What's the point? It's kinda like refreshing your local server every time so you always start from a clean slate which makes it easy to debug errors.

  await waveContract.deployed();

  // We'll wait until our contract is deployed to our local bchain. Remember the constructor we made in the WavePortal contract, it will run when deployed

  console.log("Contract deployed to:", waveContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
