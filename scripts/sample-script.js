const hre = require('hardhat');

async function main() {
  const Vote = await hre.ethers.getContractFactory('Voting');
  const vote = await Vote.deploy(
    ['Oussama', 'Ahmed', 'Omar'],
    [
      '0x4ff53bc9466f027a1ac2cf68cdafeefc608f9ac5',
      '0x323ceab01a37f03f207ec972e6dfa5cb4aee3ebe',
      '0x83e9e54ce13ac4fc6cddf3c1a706ba3641a8863f',
      '0x645e9011e5699586eb2804820be2a489f519dc30',
      '0xcc106156c39b4938c402ea843b8f948dba779bcd',
      '0xb125f351acdc693b48035451005fe8d5830ac162',
      '0x8210f39508a6ce8262bb5e0bc662aace524e19af',
      '0x0990830542f850ae7b66d211a8299dd03a04c937',
      '0x03a51c040e24a2962445f22142d13004d5ae1364',
      '0x238a6f524e8e7e600544d3880321c26527f20a79',
    ],
    1644492364,
    1676028334
  );

  await vote.deployed();

  console.log('Vote deployed to:', vote.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
