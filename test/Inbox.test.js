const assert = require("assert");
const ganache = require("ganache");
const { Web3 } = require("web3");
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");
const { INITIAL_STRING, UPDATED_STRING, INITIAL_GAS } = require("../constants/constants");

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
    .send({ from: accounts[0], gas: INITIAL_GAS });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_STRING);
  });

  it("can update message", async () => {
    await inbox.methods
      .setMessage(UPDATED_STRING)
      .send({ from: accounts[0], gas: "1000000" });
    const message = await inbox.methods.message().call();
    assert.equal(message, UPDATED_STRING);
  });
});
