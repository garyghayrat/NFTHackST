import { tokens, ether, ETHER_ADDRESS, expectRevert, expectEvent } from './helpers'

console.log("Testing")

const NFTHack = artifacts.require('./NFTHack')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('NFTHack', ([acc1, acc2]) => {
  let nftHack

  beforeEach(async () => {
    nftHack = await NFTHack.new()
  })

  describe('deploy and test...', () => {
    it('...name', async () => {
      expect(await nftHack.name()).to.be.eq('NFTHack')
    })

    it('...symbol', async () => {
      expect(await nftHack.symbol()).to.be.eq('NHST')
    })

    it('...owner address', async () => {
      expect(await nftHack._owner()).to.be.eq(acc1)
    })
  })

  describe('deploy, mint and test...', () => {

    beforeEach(async () => {
      await nftHack.mint('token_uri_1', ether(0.01))
      await nftHack.mint('token_uri_2', ether(0.02))
      await nftHack.mint('token_uri_3', ether(0.03))
    })

    it('...total supply', async () => {
      expect(Number(await nftHack.totalSupply())).to.be.eq(3)
    })

    it("...URI's", async () => {
      expect(await nftHack.tokenURI('1')).to.be.eq('token_uri_1')
      expect(await nftHack.tokenURI('2')).to.be.eq('token_uri_2')
      expect(await nftHack.tokenURI('3')).to.be.eq('token_uri_3')
    })

    it("...prices", async () => {
      expect(Number(await nftHack.price('1'))).to.be.eq(Number(ether(0.01)))
      expect(Number(await nftHack.price('2'))).to.be.eq(Number(ether(0.02)))
      expect(Number(await nftHack.price('3'))).to.be.eq(Number(ether(0.03)))
    })

    it("+ test if rejects minting by non-owner", async () => {
      expectRevert(nftHack.mint('token_uri_4', ether(0.04), { from: acc2 }), "Ownable: caller is not the owner")
    })
  })

  describe('deploy, mint, buy and test...', () => {
    let result

    beforeEach(async () => {
      await nftHack.mint('token_uri_1', ether(0.01))
      await nftHack.mint('token_uri_2', ether(0.02))
      result = await nftHack.buy('1', {from: acc2, value: ether(0.01)})
    })

    it('...new owner', async () => {
      expect(await nftHack.ownerOf('1')).to.be.eq(acc2)
    })

    it("...sold status", async () => {
      expect(await nftHack.sold('1')).to.eq(true)
    })

    it("...event values", () => {
      expectEvent.inLogs(result.logs, 'Purchase', {
        owner: acc2,
        price: ether(0.01),
        id: '1',
        uri: 'token_uri_1'
      })
    })

    it("...sold status", async () => {
      expect(await nftHack.sold('1')).to.eq(true)
    })

    it("+ test if rejects buying for invalid id, msg.value and status", async () => {
      expectRevert(nftHack.buy('1', {from: acc2, value: ether(0.01)}), "Error, wrong Token id")
      expectRevert(nftHack.buy('2', {from: acc2, value: ether(0.01)}), "Error, Token costs more")
      expectRevert(nftHack.buy('3', {from: acc2, value: ether(0.02)}), "Error, Token is sold")
    })
  })
})