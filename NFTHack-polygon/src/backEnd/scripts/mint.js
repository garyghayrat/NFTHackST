const { create, globSource } = require('ipfs-http-client')
const ipfs = create('http://127.0.0.1:5002')
const NFTHack = artifacts.require("NFTHack")
const fs = require('fs');

// !(migrate --reset) contract before running the script!

module.exports = async function(callback) {
  try {
    let nftHackData = [] //LegalDocs's database for front-end
    const nftHack = await NFTHack.deployed()
    const accounts = await web3.eth.getAccounts()

    console.log('\nUploading images on IPFS...')
    let files = fs.readdirSync(`${__dirname}/gallery`);
    let upload = await ipfs.add(globSource(`${__dirname}/gallery`, { recursive: true }))

    console.log('\nPreparing metadata directory...')
    await fs.rmdirSync(`${__dirname}/metadata`, { recursive: true }, callback);
    await fs.mkdirSync(`${__dirname}/metadata`, { recursive: true }, callback);

    console.log('\nCreating metadata...')
    for(let i=0; i<files.length; i++){
      let metadata = JSON.stringify({
        "name": `${/[^.]*/.exec(files[i])[0]}`,
        "description": "NFT Hack ST is your ticket to your favorite artists",
        "image": `https://ipfs.io/ipfs/${upload.cid.toString()}/${files[i]}`
      }, null, '\t');

      var img = fs.readFileSync(`${__dirname}/gallery/${files[i]}`, {encoding: 'base64'});
      nftHackData.push(metadata.slice(0, -2) + `,\n\t"img": "${img}"` + `,\n\t"id": ${i+1}\n}`)

      // nftsData.push(metadata.slice(0, -2) + `,\n\t"id": ${i+1}\n}`) //add metadata&id to nftsData
      await fs.writeFileSync(`${__dirname}/metadata/${/[^.]*/.exec(files[i])[0]}.json`, metadata)
    }

    console.log('\nUploading metadata on IPFS...')
    files = fs.readdirSync(`${__dirname}/metadata`);
    upload = await ipfs.add(globSource(`${__dirname}/metadata`, { recursive: true }))

    console.log('\nMinting nftHack...')
    for(let i=0; i<files.length; i++){
      await nftHack.mint(`https://ipfs.io/ipfs/${upload.cid.toString()}/${files[i]}`, web3.utils.toWei('0.001', 'Ether'))
      nftHackData[i] = nftHackData[i].slice(0, -2) + `,\n\t"price": ${await nftHack.price(i+1)},\n\t"uri": "${await nftHack.tokenURI(i+1)}"\n}` //add price&URI to nftsData
      console.log(`\n${i+1} NFTHack is minted with URI:\n${await nftHack.tokenURI(i+1)}`)
    }

    console.log('\nAggregating nftHack data...')
    if(fs.existsSync(`${__dirname}/nftHackData.js`)) {
      await fs.unlinkSync(`${__dirname}/nftHackData.js`)
    }
    await fs.writeFileSync(`${__dirname}/nftHackData.js`, `export const nftHackData = [${nftHackData}]`)

    console.log('\n\nSuccess.')
  } catch(error) {
    console.log(error)
  }
  callback()
}