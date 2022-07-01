const VWorldLand = artifacts.require("VWorldLand.sol");
// const Racer = artifacts.require('Racers.sol');
// const Matic = artifacts.require('MaticToken.sol');

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */

let _VWorldLand, raceraddress, marketplaceaddress;

contract("All", function (accounts) {
  it("Deployed VWorldLand: ", async function () {
    x = await VWorldLand.deployed();
    _VWorldLand = x.address;
    return assert.isTrue(true);
  });
  it("Total Supply: ", async function () {
    VWorldLand.deployed()
      .then((instance) => {
        let supply = instance.totalSupply();
        return supply == 3;
      })
      .catch((e) => {
        console.log(e);
      });
  });
  it("Owner: ", async function () {
    VWorldLand.deployed()
      .then((instance) => {
        let owner = instance.owner();
        return owner === accounts[0];
      })
      .catch((e) => {
        console.log(e);
      });
  });
  it("Balance: ", async function () {
    VWorldLand.deployed()
      .then((instance) => {
        let balance = instance.balanceOf(accounts[0]);
        return balance === 0;
      })
      .catch((e) => {
        console.log(e);
      });
  });
  it("CheckLand: ", async function () {
    VWorldLand.deployed()
      .then((instance) => {
        let land = instance.checkLand(1);
        return (
          land.x == 10 &&
          land.y == 20 &&
          land.area == 200 &&
          land.owner == accounts[0]
        );
      })
      .catch((e) => {
        console.log(e);
      });
  });
  it("ownerOf: ", async function () {
    VWorldLand.deployed()
      .then((instance) => {
        let owner = instance.ownerOf(1);
        return owner == accounts[0];
      })
      .catch((e) => {
        console.log(e);
      });
  });
  it("Land: ", async function () {
    VWorldLand.deployed()
      .then((instance) => {
        let land = instance.land(1);
        return land.x == 10 && land.y == 20 && land.area == 200;
      })
      .catch((e) => {
        console.log(e);
      });
  });
  it("Safe Transfer: ", async function () {
    VWorldLand.deployed()
      .then(async (instance) => {
        let approve = await instance.approve(accounts[1], 0);
        let safeTransfer = await instance.safeTransferFrom(
          accounts[0],
          accounts[1],
          0
        );
        let bal = await instance.balanceOf(accounts[1]);
        return bal == 1;
      })
      .catch((e) => {
        console.log(e);
      });
  });
});

//transfer caller is not owner
