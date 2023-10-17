const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");

const { interface, bytecode } = require("./compile");
const {
  INITIAL_STRING,
  INITIAL_GAS,
  RECOVERY_PHRASE,
  WEB3_API_ENDPOINT,
} = require("./constants/constants");

const provider = new HDWalletProvider(RECOVERY_PHRASE, WEB3_API_ENDPOINT);

const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account", accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
      .send({ from: accounts[0], gas: INITIAL_GAS });

    console.log("Contract deployed to", result?.options?.address);
    provider.engine.stop();
  } catch (error) {
    console.log("error =>>", error);
  }
};

deploy();
