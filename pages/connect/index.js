import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Web3 from "web3";
const axios = require("axios");
import Image from "next/image";
import metamask from "../../public/image/metamask.svg";
import { useDispatch, useSelector } from "react-redux";
import { increment, addAccount, changeBalance } from "../../reduser";
import useMetaMask from "../../hooks/metamask";

export default function Connect() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [metaMask, setMetaMask] = useState(false);
  const [errorMessage, viewErrorMessage] = useState(false);
  const [metaMaskError, viewMetaMaskError] = useState(
    "You are connected to an unsupported network"
  );

  const { connect,  account } = useMetaMask();
    

  const web3 = new Web3(Web3.givenProvider);

  useEffect(() => {
    const read_id = async () => {     
      const chainId = await web3.eth.getChainId();
      if (chainId !== 42261) {        
        viewErrorMessage(true);
      }
    };
    read_id();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => ReadAccountNext(), [account]);
  // function SendToBack (a) {
  //   axios.post("http://localhost:5000/api/tokens", { tokens: a }).then((res) => {
      
  //   });

  // };


  async function ReadAccountNext() {
    await web3.eth.getAccounts().then((res) => {
      if (res[0] > 0) {
        web3.eth.getBalance(res[0]).then((responce) => {
          dispatch(changeBalance(responce / 1000000000000000000));
        });
        dispatch(increment());
        dispatch(addAccount(res[0]));
        localStorage.setItem("account", res[0]);
        router.push("/");
        // SendToBack(res[0]);
        
      }
    });
  }

  async function ReadAccount() {
    await web3.eth.getAccounts().then((res) => {
      if (res[0] > 0) {
        web3.eth.getBalance(res[0]).then((responce) => {
          dispatch(changeBalance(responce / 1000000000000000000));
        });
        dispatch(increment());
        dispatch(addAccount(res[0]));
        localStorage.setItem("account", res[0]);
        SendToBack(res[0]);
        router.push("/");
      } else {       
        connect();        
      }
    });
  }


  return (
    <div className="connect_main">
      <Link href="/">
        <a className="link__mainPage">Home page</a>
      </Link>

      {metaMask ? (
        <button className="without_metamask">Create Metamask Wallet</button>
      ) : (
        <button className="metamask" onClick={() => ReadAccount()}>
          Sign in with Metamask
        </button>
      )}

      <p>
        We do not own your private keys and cannot access your profile funds
        without your confirmation.
      </p>
      {errorMessage && (
        <div className="message_error">
          <Link href="/" passHref>
            <b className="close">
              <Image
                alt="close"
                src="/static/Icon_close.png"
                width={20}
                height={20}
              />
            </b>
          </Link>
          <p>{metaMaskError}</p>
        </div>
      )}
      <style jsx>{`
        .connect_main {
          background-color: #fff;
          width: 100%;
          height: 100vh;
          z-index: 100;
          position: absolute;
          padding-left: 35%;
          padding-top: 20%;
        }
        .link__mainPage {
          position: absolute;
          font-size: 20px;
          top: 30px;
          left: 40px;
          font-weight: 700;
          padding: 0 20px;
          font-family: Roboto, sans-serif;
        }
        .message_error {
          position: absolute;
          top: 20%;
          left: 30%;
          height: 500px;
          width: 40%;
          padding: 10px;
          background: #fff;
          border-radius: 15px;
          box-shadow: 0px 0px 15px 0px #9c9c9c;
        }
        .message_error p {
          text-align: center;
          font-size: 40px;
          color: red;
          width: 100%;
          margin-top: 200px;
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
          background-image: url(${metamask.src});
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
          background-image: url(${metamask.scr});
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
