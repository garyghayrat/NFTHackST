import React, {useEffect, useState} from "react"
import {ethers} from "ethers";
import myToken from "./MyToken.json"
import logo from "./images/FAN.png"
import Card from "./Card.js"
import data from "./data.js"

const OPENSEA_LINK = '';
const TOTAL_MINT_COUNT = 50;
const CONTRACT_ADDRESS = "0x38bF7640E28ce3b4fb4D8030166f34Ca738a32BD";

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

            // const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            // // Prompt user for account connections
            // await provider.send("eth_requestAccounts", []);
            // const signer = provider.getSigner();

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myToken.abi, signer);
      
            console.log("Going to pop wallet now to pay gas...")
            let nftTxn = await connectedContract.mint(0, 1);
      
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

      const askContractToMintOko = async () => {
      
        try {
          const { ethereum } = window;
      
          if (ethereum) {

            // const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            // // Prompt user for account connections
            // await provider.send("eth_requestAccounts", []);
            // const signer = provider.getSigner();

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myToken.abi, signer);
      
            console.log("Going to pop wallet now to pay gas...")
            let nftTxn = await connectedContract.mint(1, 1);
      
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

      const askContractToMintPotions = async () => {
      
        try {
          const { ethereum } = window;
      
          if (ethereum) {

            // const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            // // Prompt user for account connections
            // await provider.send("eth_requestAccounts", []);
            // const signer = provider.getSigner();

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myToken.abi, signer);
      
            console.log("Going to pop wallet now to pay gas...")
            let nftTxn = await connectedContract.mint(2, 1);
      
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

      const askContractToMintPlex = async () => {
      
        try {
          const { ethereum } = window;
      
          if (ethereum) {

            // const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            // // Prompt user for account connections
            // await provider.send("eth_requestAccounts", []);
            // const signer = provider.getSigner();

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myToken.abi, signer);
      
            console.log("Going to pop wallet now to pay gas...")
            let nftTxn = await connectedContract.mint(3, 1);
      
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
        <button onClick={connectWallet} className="wallet-button">
          Connect to Wallet
        </button>
      );

      useEffect(() => {
        checkIfWalletIsConnected();
      }, [])

    //   const cards = data.map(item => {
    //     return (
    //         <Card 
    //         key={item.id}
    //         item={item}
    //         handleClick={askContractToMintNft}
    //     />)
    // })

    return (
        <div>
            <header>
              <img src={logo} class="logo"></img>
                <h1 className="header--text">social token marketplace.</h1>
                {currentAccount === "" && (renderNotConnectedContainer())}
            </header>

            <div className="feed">
                <Card 
                  title= "$OKO"
                  DJ= "OKO"
                  city= "New York, NY"
                  description= "$OKO token holders receive access to exclusive merch and guest list access for upcoming shows."
                  image= "./images/oko.png"
                  handleClick={askContractToMintOko}
                />
                <Card 
                  title= "$POTIONS"
                  DJ= "Potions"
                  city= "New York, NY"
                  description= "$POTION token holders receive exclusive access to unreleased b2b sessions."
                  image= "./images/potions.png"
                  handleClick={askContractToMintPotions}
                />
                <Card 
                  title= "$PLEX"
                  DJ= "Maceo Plex"
                  city= "Barcelona, Spain"
                  description= "$PLEX token holders have access to a private discord server with Maceo Plex."
                  image= "./images/maceo-plex.png"
                  handleClick={askContractToMintPlex}
                />
            </div>
        </div>
    )
}