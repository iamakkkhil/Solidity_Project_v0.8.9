const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi, evm } = require("./compile");

const dotenv = require('dotenv');
dotenv.config();

// ADD mnemonics and rinkeby API for your account
const provider = new HDWalletProvider(
    `${process.env.MNEMONIC}`,
    `${process.env.RINKEBY_API}`
)

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account", accounts[0])

    const result = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object, arguments: ['Hi there!'] })
        .send({ gas: "1000000", from: accounts[0] });

    console.log("Contract deployed to", result.options.address);

    provider.engine.stop();
};

deploy();

// Attempting to deploy from account 0xFfdc2bb0106Cb487ac8937ec68b875d087aD631F
// Contract deployed to 0xCC2b6fFB7b42EB3Ee27ef0fb9B2A535F4c61E834