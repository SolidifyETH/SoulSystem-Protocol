import { expect } from "chai";
import { Contract, ContractReceipt, Signer } from "ethers";
import { ethers } from "hardhat";
import { deployContract, deployUUPS } from "../utils/deployment";
const { upgrades } = require("hardhat");

//Test Data
const ZERO_ADDR = '0x0000000000000000000000000000000000000000';
let test_uri = "ipfs://QmQxkoWcpFgMa7bCzxaANWtSt43J1iMgksjNnT4vM1Apd7"; //"TEST_URI";


describe("Hub", function () {
    let openRepoContract: Contract;
    let hubContract: Contract;
    let hubContract2: Contract;
    let avatarContract: Contract;
    let actionContract: Contract;
    // let configContract1: Contract;
    // let configContract2: Contract;
    
    //Addresses
    let account1: Signer;
    let account2: Signer;

    before(async function () {

        //Populate Accounts
        [account1, account2] = await ethers.getSigners();

        //Extract Addresses
        this.addr1 = await account1.getAddress();
        this.addr2 = await account2.getAddress();

        //--- Deploy OpenRepo (UUPS)
        openRepoContract = await deployUUPS("OpenRepoUpgradable", []);

        //--- Deploy Config
        // const ConfigContract = await ethers.getContractFactory("Config");
        // configContract1 = await ConfigContract.connect(account1).deploy();
        // configContract2 = await ConfigContract.connect(account2).deploy();

        //Deploy Reaction Implementation
        this.reactionContract = await ethers.getContractFactory("ReactionUpgradable").then(res => res.deploy());
        //Game Upgradable Implementation
        this.gameUpContract = await ethers.getContractFactory("GameUpgradable").then(res => res.deploy());

        //--- Deploy Hub Upgradable
        hubContract = await deployUUPS("HubUpgradable", [
            openRepoContract.address,
            // configContract1.address,
            this.gameUpContract.address,
            this.reactionContract.address
          ]);
        await hubContract.deployed();

        //-- Deploy Another Hub
        hubContract2 = await deployUUPS("HubUpgradable", [
            openRepoContract.address,
            // configContract2.address,
            this.gameUpContract.address,
            this.reactionContract.address
          ]);
        await hubContract2.deployed();

        //--- Deploy Avatar
        avatarContract = await deployUUPS("SoulUpgradable", [hubContract.address]);
        //Set Avatar Contract to Hub
        hubContract.assocSet("SBT", avatarContract.address);
        hubContract2.assocSet("SBT", avatarContract.address);

        //--- Deploy History
        actionContract = await deployUUPS("ActionRepoTrackerUp", [hubContract.address]);
        //Set Avatar Contract to Hub
        hubContract.assocSet("history", actionContract.address);
        hubContract2.assocSet("history", actionContract.address);
    });

    it("Should Be Secure", async function () {
        await expect(
            hubContract.connect(account2).hubChange(hubContract2.address)
          ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    // it("Should Remember & Serve Config", async function () {
    //     expect(await hubContract.getConfig()).to.equal(configContract1.address);
    // });

    it("Should Move Children Contracts to a New Hub", async function () {
        //Check Before
        expect(await avatarContract.getHub()).to.equal(hubContract.address);
        expect(await actionContract.getHub()).to.equal(hubContract.address);
        //Change Hub
        hubContract.hubChange(hubContract2.address);
        //Check After
        expect(await avatarContract.getHub()).to.equal(hubContract2.address);
        expect(await actionContract.getHub()).to.equal(hubContract2.address);
    });

});