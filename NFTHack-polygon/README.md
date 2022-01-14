# NFT Hack ST NFT factory app
This is the NFT factory component of the app. Polygon chain functionality will be added shortly.  

<h1>NFT Factory App</h1>

# About

TO DO

# Folder and Directory Structure

NFT Hack ST Factory app
  - .vscode
  - build
  - node_modules
  - public
    * index.html
  - src
    - backEnd
      - abis
      - contracts
      - migrations
      - scripts
      - test
    - components
    - images
    - store
    * index.js
    * .env.example
    * truffle-config.js
    * yarn.lock


# Prerequisites

1. Install Node 14.16.1 via `nvm` if not installed

        $ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
        $ source ~/.nvm/nvm.sh
        $ nvm install 14.16.0
        $ nvm alias default 14.16.0
        $ nvm use default

2. Install truffle if not installed

        $ truffle version
        $ npm install -g truffle

3. Install ganache-cli if not installed

        $ ganache-cli --version
        $ npm install -g ganache-cli
        $ ganache-cli

    `ganache-cli` will now be running a development blockchain on port `8545` and give you 10 development network accounts with    addresses and corresponding private keys which can be imported to Metamask each with 100 ETH for gas and testing.  Make sure that port `8545` is listed in truffle-config.js for `ganache-cli`.

4. Install and run IPFS if not installed

        $ jsipfs version
        $ npm i -g ipfs
        In another terminal run IPFS
        $ jsipfs daemon

5. Install `yarn` if not installed

        $ yarn --version
        $ npm install --global yarn

# Migrate contracts and Run app

6. Git clone repo, enter directory and install

        $ git clone https://github.com/georgemac510/blockchain-developer-bootcamp-final-project.git
        $ cd blockchain-developer-bootcamp-final-project/
        $ yarn install

7. Create an `.env` file to hold your Metamask private key and Infura ID. Add those two pieces of data with no "'s or other symbols such as below:

        PRIVATE_KEYS=0000001111111122222233333aaaabbbbccccdddd
        INFURA_ID=987654321abcdefghifklmnopqrst

8. Compile, migrate and test contracts on development network. Make sure `truffle-config.js` is properly configured.

        Compile and migrate
        $ truffle compile
        $ truffle migrate --reset --network ganache_cli
        Test
        $ truffle test

9. Interact with deployed contract and mint tokens. Make sure `jsipfs daemon` is running in another terminal.

        $ truffle exec src/backEnd/scripts/mint.js --network ganache_cli

10. Run app on `localhost:3000`

        $ yarn start

    App should open up on `localhost:3000`

11. Buying NFTs on app

    a. Make sure that you are logged on to Metamask, your network is set to `Localhost 8545` and connected to `localhost:3000`

    b. Fund your Metamask account by grabbing the first private key from `ganache-cli` and import it. Now you have ETH for purchases.

    c. Under your chosen legal doc image, click the `Buy` button, confirm the purchase on the Metamask pop up window. You are now the proud owner of a legal doc to meet your needs.

12. Ethereum Rinkeby testnet deployment. make sure that `truffle-config.js` is properly configured for the Rinkeby network.

    a. Switch Metamask network to Rinkeby with a funded Rinkeby ETH account.
    
    b. Migrate contracts for Rinkeby and mint tokens.

        $ truffle migrate --network rinkeby
        $ truffle exec src/backEnd/scripts/mint.js --network rinkeby

    c. Verify deployment at https://rinkeby.etherscan.io/ by searching your new contract address and checking under `Erc721 Token Txns` to see the minted tokens.

# Live Demo URL


# Project Demo Video


