# NFTHack ST NFT 


## Requirements

This app used Truffle Polygon Box as its starting point and has the following requirements:

- [Node.js](https://nodejs.org/) 14.x or later
- An [Infura](https://infura.io/) account and Project ID
- A [MetaMask](https://metamask.io/) account
- Install Truffle:  `npm install -g truffle`
- Install ganache CLI:  `npm install -g ganache-cli`

## Setup prior to deploying contracts

### Setting up the env File

1. Use `touch .env` in the command line to create a `.env` file at the root of your project.
2. Copy and paste the code below into the new `.env` file.
```
MNEMONIC="<Your Mnemonic>"
INFURA_PROJECT_ID="<Your Infura Project ID>"
```

3. Add the 12-word seed phrase which can be found in your Metamask wallet by clicking on the hamburger, `Settings`, then Security & Privacy. The seed phrase should be copied and pasted into `.env` file right after `MNEMONIC=` with no spaces.<br>
***IMPORTANT*** The seed phrase should be from your Ethereum development wallet with only testnet ETH, not a live Mainnet wallet.
4. Copy and paste your Infura Project ID to `.env` after `INFURA_PROJECT_ID=` with no spaces.


### Adding Mumbai Polygon and Rinkeby Testnet ETH tokens to Metamask
1. You will need a funded Mumbai Polygon wallet to deploy the contracts on Polygon. To add the Mumbai Polygon RPC to your Metamask wallet visit: https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/#add-the-polygon-network-manually. The Mumbai Polygon faucet and its use can be found at: https://docs.polygon.technology/docs/develop/tools/polygon-faucet/#how-to-use-polygon-faucet
2. You will also need Rinkeby testnet ETH to deploy your contracts on the Rinkeby network. You can change networks in your Metamask wallet by clicking on the dropdown menu and selecting Rinkeby and an active Rinkeby faucet can be found at https://faucets.chain.link/rinkeby


## Compiling and Migrating to development testnet
1. Open another terminal and enter `ganache-cli` to start the development server on localhost port:8545.
2. Compile your contracts with `truffle compile`.
3. Migrate contracts to the local dev testnet with `truffle migrate --network development`.

## Compiling and Migrating to Rinkeby testnet
1. Compile your contracts with `truffle compile`.
2. Migrate your contracts to the Rinkeby ETH testnet with `truffle migrate --network rinkeby`.
3. You can check your contracts by copy and pasting the truffle contract address output into https://rinkeby.etherscan.io/
4. Save this contract address for the minting process.

## Compiling and Migrating to Polygon Mumbai testnet
1. Compile your contracts with `npm run compile:polygon`
2. Migrate your contracts to the Mumbai Polygon testnet with `truffle migrate --config truffle-config.polygon.js --network=polygon_infura_testnet`
3. You can check you contracts by checking the address on https://mumbai.polygonscan.com/
4. Save this contract address for the minting process.

## Installing and running frontend
1. In project root, cd into the `frontend/hello-world` directory 
2. Use `npm install` to install the front-end
3. Start the front-end with `npm run start`.

## Minting Rinkeby NFTs 
1. Login to your Metamask account and choose the Rinkeby network with your funded Rinkeby address.
2. Click `Mint NFT`, then `Confirm` on the Metamask pop up screen.
3. Wait 15-20 minutes and check your Rinkeby address at https://testnets.opensea.io/get-listed/step-two. You should see your minted NFT in a new collection.

## Minting Mumbai Polygon NFTs 
1. Login to your Metamask account and choose the Mumbai Polygon network with your funded Mumbai Polygon address.
2. Click `Mint NFT`, then `Confirm`on the Metamask pop up screen.
3. Wait 15-20 minutes and check your Mumbai Polygon address at https://testnets.opensea.io/get-listed/step-two. You should see your minted NFT in a new collection.



