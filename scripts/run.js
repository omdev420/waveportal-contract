const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  // tells hardhat to grab contarct owner wallet adress and some random wallet address called randomPerson

  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");

  // Above line compiles the contract WavePortal generate the necessary files we need to work with our contract under the artifacts directory

  const waveContract = await waveContractFactory.deploy();

  // What's happening here is Hardhat will create a local Ethereum network for us, but just for this contract. Then, after the script completes it'll destroy that local network. So, every time you run the contract, it'll be a fresh blockchain. What's the point? It's kinda like refreshing your local server every time so you always start from a clean slate which makes it easy to debug errors.

  await waveContract.deployed();

  // We'll wait until our contract is deployed to our local bchain. Remember the constructor we made in the WavePortal contract, it will run when deployed

  console.log("Contract deployed to:", waveContract.address);
  // Prints out the address where smart contract is located.

  console.log("Contract deployed by:", owner.address);
  // Prints out owner address, owner is the person who deploys the contract.

  let waveCount;
  waveCount = await waveContract.getTotalWaves();

  let waveTxn = await waveContract.wave();
  // Above line awaits for a transaction connected to owner's wallet address and run wave func. signed by it.

  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();

  waveTxn = await waveContract.connect(randomPerson).wave();
  // Above line awaits for a transaction connected to randomPerson's wallet address and run wave func. signed by it.

  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();
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
