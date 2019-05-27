const Token = artifacts.require("Token");

contract.only("Token", function(accounts) {
  const OWNER = accounts[0];
  const ALICE = accounts[1];
  const BOB = accounts[2];

  let tokenInstance;

  beforeEach(async function () {
    tokenInstance = await Token.new();
  });

  describe("Interest tests", () => {
    it.skip("Should get delta", async function () {
      const actual = await tokenInstance.delta(10000);
      console.log(Number(actual));
      console.log(actual);

      assert.equal(actual, 10000, "Delta should be 10000");
    });
  });

  describe("ERC20 tests", () => {
    it.only("Should test ERC20 public properties", async function () {
      const name = await tokenInstance.name();
      assert.equal(name, "Virtual Token", "Name should be Virtual Token");

      const symbol = await tokenInstance.symbol();
      assert.equal(symbol, "VITO", "Symbol should be VITO");
    });

    it.only("Total supply should be 100000000000000", async function () {
      const actual = await tokenInstance.totalSupply();
      assert.equal(Number(actual), Number(100000000000000), "Total supply should be 100000000000000");
    });

    it.only("Owner balance should be 100000000000000", async function () {
      const actual = await tokenInstance.balanceOf(OWNER);
      assert.equal(actual.valueOf(), 100000000000000, "Balance should be 100000000000000");
    });

    it.only("Should transfer 200 tokens to alice", async function () {
      await tokenInstance.transfer(ALICE, 200, {from: OWNER});
      const actual = await tokenInstance.balanceOf(ALICE);
      assert.equal(Number(actual), 200, "Balance should be 200");
    });

    it.only("Should transfer 500000000 tokens to alice", async function () {
      await tokenInstance.transfer(ALICE, 500000000, {from: OWNER});
      const actual = await tokenInstance.balanceOf(ALICE);
      assert.equal(Number(actual), 500000000, "Balance should be 500000000");
    });

    it.only("Should transfer 600000000 tokens to alice", async function () {
      await tokenInstance.transfer(ALICE, 600000000, {from: OWNER});
      const actual = await tokenInstance.balanceOf(ALICE);
      assert.equal(Number(actual), 600000000, "Balance should be 600000000");
    });

    it.only("Should get total in curculation of zero as owners balance is not included", async function () {
      const actual = await tokenInstance._getInCirculation();
      assert.equal(Number(actual), 0, "In circulation should be 0");
    });

    it.only("Should get total in curculation", async function () {
      await tokenInstance.transfer(ALICE, 600000000, {from: OWNER});
      const actual = await tokenInstance._getInCirculation();

      assert.equal(Number(actual), 600000000, "Total should be 600000000");
    });
    
    it.skip("Owner balance should be 100000000000000", async function () {
      const actual = await tokenInstance.delta();
      assert.equal(Number(actual), 100000000000000, "Balance should be 100000000000000");
    });
  });
});