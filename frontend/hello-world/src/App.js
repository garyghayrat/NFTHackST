import React, {useEffect, useState} from "react"
import {ethers} from "ethers";
import myToken from "./MyToken.json"

const OPENSEA_LINK = '';
const TOTAL_MINT_COUNT = 50;
const CONTRACT_ADDRESS = "0xdc81ef4a7bcc4788e26a9a67545acc68c317ef36";

export default function App() {

    const [currentAccount, setCurrentAccount] = useState("");
  
    const checkIfWalletIsConnected = async () => {
        const { ethereum } = window;
    
        if (!ethereum) {
            console.log("Make sure you have metamask!");
            return;
        } else {
            console.log("We have the ethereum object", ethereum);
        }
    
        /*
        * Check if we're authorized to access the user's wallet
        */
        const accounts = await ethereum.request({ method: 'eth_accounts' });
    
        /*
        * User can have multiple authorized accounts, we grab the first one if its there!
        */
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
          setCurrentAccount(account)
        } else {
          console.log("No authorized account found")
        }
      }

      const connectWallet = async () => {
        try {
          const { ethereum } = window;
    
          if (!ethereum) {
            alert("Get MetaMask!");
            return;
          }
    
          /*
          * Fancy method to request access to account.
          */
          const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    
          /*
          * Boom! This should print out public address once we authorize Metamask.
          */
          console.log("Connected", accounts[0]);
          setCurrentAccount(accounts[0]); 
        } catch (error) {
          console.log(error)
        }
      }

      const askContractToMintNft = async () => {
      
        try {
          const { ethereum } = window;
      
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myToken.abi, signer);
      
            console.log("Going to pop wallet now to pay gas...")
            let nftTxn = await connectedContract.mint(1, 0);
      
            console.log("Mining...please wait.")
            await nftTxn.wait();
            
            console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
      
          } else {
            console.log("Ethereum object doesn't exist!");
          }
        } catch (error) {
          console.log(error)
        }
      }
    
      const renderNotConnectedContainer = () => (
        <button onClick={connectWallet}>
          Connect to Wallet
        </button>
      );

      useEffect(() => {
        checkIfWalletIsConnected();
      }, [])
    

    return (
        <div>
            <h1>test</h1>
            {currentAccount === "" ? (renderNotConnectedContainer()) : 
                (<button onClick={askContractToMintNft} className="cta-button connect-wallet-button">
                Mint NFT
                </button>)
            }
        </div>
    )
}