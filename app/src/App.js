import React, { useEffect , useState } from "react";
import "./App.css";
import twitterLogo from "./assets/twitter-logo.svg";
import CandyMachine from "./CandyMachine";

import chouchin from './assets/chouchin.png';

// Constants
const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
    const [walletAddress, setWalletAddress]= useState(null);
    const checkIfWalletIsConnected = async() => {
        try{
            const { solana } = window;

            if(solana){
                if (solana && solana.isPhantom ){
                console.log('Phantom wallet found');


                const response = await solana.connect( {onlyIfTrusted:true} );
                console.log('Connected with Public Key: ',
                response.publicKey.toString());

                setWalletAddress(response.publicKey.toString());
                }

            }else{
                alert('Solana object not found! Get a Phantom Wallet 👻');
            }

        }catch(error){
            console.error(error);
        }

    };

    const connectWallet = async() => {
        const {solana} = window;
        if (solana){
            const response = await solana.connect();
            console.log('Connected with Public Key: ',response.publicKey.toString());
            setWalletAddress(response.publicKey.toString());
        }
    };


    const renderNotConnectedContainer = () => {
        return (
            <button 
                className="cta-button connect-wallet-button"
                onClick={connectWallet}
            >
                Connect to Wallet
            </button>
        )
    };




    useEffect( ()=>{
        const onLoad = async()=>{
            await checkIfWalletIsConnected();
        };
            window.addEventListener('load',onLoad);
            return ()=>  window.removeEventListener('load',onLoad);
        
    },[] );




    return (
    <div className="App">
        <div className="container">
        <div><img className="top-image"  src={chouchin} alt="chouchin-ankou" ></img></div> 
        <div className="header-container">
            <p className="header">You live in the sea, too!</p>
            <p className="sub-text">Cute Marine life NFT drop</p>

            {!walletAddress && renderNotConnectedContainer()}

        </div>

        { /* walletアドレスを確認してからwalletAddressを渡す */ }
        {walletAddress && <CandyMachine  walletAddress = {window.solana}  />}


        <div className="footer-container">
            <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
            <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
            >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
        </div>
    </div>
    );
    };

export default App;
