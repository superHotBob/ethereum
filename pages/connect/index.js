import Link from "next/link";
import React, { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { useRouter } from 'next/router'
import Web3 from "web3";
import { useDispatch, useSelector } from 'react-redux';
import { increment, incrementByAmount} from '../../reduser';
export default function Connect() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [metaMask, setMetaMask] = useState(false);

  useEffect(() => {
    const read_id = async () => {
      const provider = await detectEthereumProvider();
      
      if (provider) {
        console.log("MetaMask installed!");
        // From now on, this should always be true:
        // provider === window.ethereum
        // startApp(provider); // initialize your app
      } else {
        console.log("Please install MetaMask!");
      }
    };
    read_id();
  }, []);
  const web3 = new Web3(Web3.givenProvider);
  async function ReadAccount() {
    // var accounts = await web3.eth.getAccounts();
    // web3.eth.getBalance("0xce6968bC30C1Dee5741C2b2790440C18bD0DE03f")
    // .then((res)=>console.log('This is balance',res));
    // console.log('This account',accounts);
    router.push('/');
    dispatch(increment());
    const con = ethereum.isConnected();
    console.log(con);
    // const chainId = await window.ethereum.request({ method: 'eth_chainId'});
    const my_accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    dispatch(incrementByAmount(my_accounts[0]));
    console.log('This my accounts',my_accounts);
  };
  return (
    <div className="connect_main">
      <Link href="/">
        <a className="to_main_page">O</a>
      </Link>
      <h1>Sign in your wallet</h1>
      {metaMask ? (
        <button className="without_metamask">Create Metamask Wallet</button>
      ) : (
        <button className="metamask" onClick={ReadAccount}>Sign in with Metamask</button>
      )}
      <button>Sign in with Oasis Wallet</button>
      <button>Create new Wallet</button>
      <p>
        We do not own your private keys and cannot access your profile funds
        without your confirmation.
      </p>
      <style jsx>{`
        .connect_main {
          background-color: #fff;
          width: 100%;
          height: 100vh;
          z-index: 100;
          position: absolute;
          padding-left: 35%;
        }
        .to_main_page {
          position: absolute;
          font-size: 45px;
          top: 30px;
          left: 40px;
          font-weight: 700;
          padding: 0 20px;
          font-family: Roboto, sans-serif;
          border-radius: 20px;
          background: rgb(254, 218, 3);
        }
        h1 {
          margin-top: 20vh;
          font: 700 55px/70px Roboto, sans-serif;
        }
        p {
          width: 30%;
          margin-top: 30px;
        }
        .metamask {
          background-image: url(/metamask.svg);
          background-repeat: no-repeat;
          background-position: 5% center;
          background-size: 8%;
          background-color: rgb(0, 102, 255);
          color: #fff;
        }
        .metamask:hover {
          background-color: rgba(0, 102, 255, 0.8);
        }
        .without_metamask {
          background-image: url(/metamask.svg);
          background-repeat: no-repeat;
          background-position: 5% center;
          background-size: 8%;

          color: #000;
        }
        button {
          width: 45%;
          height: 80px;
          text-align: center;
          border: 1px solid #ccc;
          border-radius: 56px;
          cursor: pointer;
          display: block;
          margin-top: 30px;
          background: #fff;
          font: 700 20px/80px Roboto, sans-serif;
        }
        button:active {
            transform: scale(0.98);
            /* Scaling button to 0.98 to its original size */
            box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
            /* Lowering the shadow */
        }
        span {
          font: 500 30px/40px Roboto, sans-serif;
          color: #bbb;
          display: inline-block;
          width: 50%;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}
