import Link from "next/link";
import Image from "next/image";
import copy from '../public/image/copy.svg';
import close from '../public/image/Icon_close.png';
import Web3 from "web3";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import refresh from "../public/image/refresh_icon.png";
import { useDispatch, useSelector } from "react-redux";
import { addAccount, changeBalance, walletAddress, balance } from "../reduser";
import useMetaMask from "../hooks/metamask";

export default function Navbar() {
  const dispatch = useDispatch();
  const { asPath } = useRouter();

  const { disconnect } = useMetaMask();

  useEffect(() => {
    localStorage.getItem("account")
      ? dispatch(addAccount(localStorage.getItem("account")))
      : dispatch(addAccount(""));
  });

  const account = useSelector(walletAddress);
  const my_balance = useSelector(balance);
  const [viewWallet, setviewWallet] = useState(false);
  const [textCopy, setTextCopy] = useState("copy to clipboard");
  const [refresh_balance, setRefreshBalance] = useState(false);

  const web3 = new Web3(Web3.givenProvider);

  async function SignOut() {
    disconnect();
    setviewWallet(false);
    dispatch(addAccount(""));
    localStorage.setItem("account", "");
    localStorage.setItem("jwt", "");
  }

  function updateClipboard(newClip) {
    navigator.clipboard.writeText(newClip).then(function () {
      setTextCopy("Copied");
    });
  }

  function Refresh() {
    setRefreshBalance(true);
    web3.eth.getBalance(account).then((res) => {
      dispatch(changeBalance(res / 1000000000000000000));
      setTimeout(() => setRefreshBalance(false), 1000);
    });
  }

  const substr = account ? account.slice(7, account.length - 5) : null;
  const new_str = account ? account.replace(substr, "...") : null;
  return (
    <div className="NavbarMain">
      <div>
        <Link href="/">
          <a className="to_main_page">Home page</a>
        </Link>
      </div>

      <nav className="navy">
        <Link href="/explore">
          <a className={asPath === "/explore" ? "active" : ""}>Explore</a>
        </Link>
        <Link href="/profile">
          {account && (
            <a className={asPath === "/profile" ? "active" : ""}>My NFTs</a>
          )}
        </Link>
        <Link href="/activity">
          <a className={asPath === "/activity" ? "active" : ""}>Activity</a>
        </Link>
      </nav>
      <div>
        {!account ? (
          <Link href="/connect">
            <a className="sing_in">Sign in</a>
          </Link>
        ) : null}
        {account && (
          <span className="open_wallet" onClick={() => setviewWallet(true)} />
        )}
        <Link href="/create">
          <a className="create">Create</a>
        </Link>
      </div>
      {viewWallet && (
        <div className="wallet_name">
          <span className="close">
            <Image
              alt="close"
              src={close}
              width={20}
              height={20}
              onClick={() => setviewWallet(false)}
            />
          </span>
          <h2 className="hash">
            {new_str}{" "}
            <span className="copy_account">
              <Image
                src={copy}
                width={18}
                height={18}
                alt="copy"
                onClick={() => updateClipboard(account)}
              />
            </span>
          </h2>
          <div className="balance">
            <div
              style={{ backgroundImage: 'url(/image/ethereum.svg)' }}
              className="my__hash"
            >
              {refresh_balance ? (
                <div className="refresh">
                  <Image src={refresh} width={45} height={45} alt="refresh" />
                </div>
              ) : (
                <>
                  Balance
                  <br />
                  <b onClick={Refresh} title="refresh">
                    {my_balance} TEST
                  </b>
                </>
              )}
            </div>
          </div>
          <Link href="/profile" passHref>
            <button style={{ backgroundImage: 'url(/image/user.png)' }}>
              My NFTs
            </button>
          </Link>
          <button
            onClick={SignOut}
            style={{ backgroundImage: 'url(/image/power-off.png)' }}
          >
            Sign out
          </button>
        </div>
      )}

      <style jsx>{`
        .NavbarMain {
          padding: 30px 0;
          width: 90%;
          margin: 0 auto;
          position: fixed;
          display: flex;
          z-index: 2;
          flex-direction: row;
          justify-content: space-between;
          top: 0;
          left: 5%;
          font-family: Roboto, sans-serif;
          background: #fff;
        }
        .open_wallet {
          height: 57px;
          width: 57px;
          background: red;
          display: inline-block;
          border-radius: 40px;
          vertical-align: bottom;
          float: right;
         
          cursor: pointer;
        }
        .navy {
          display: inline-block;
          width: 30%;
          font-size: 20px;
          display: flex;
          justify-content: space-between;
        }
        .navy span {
          cursor: pointer;
          font-size: 40px;
          height: 20px;
          margin-top: -5px;
          color: rgba(4, 4, 5, 0.5);
        }
        .navy a {
          font-weight: 500;
          line-height: 60px;
          color: rgba(4, 4, 5, 0.5);
          font-family: Roboto, sans-serif;
        }
        .navy a:hover,
        .navy span:hover {
          color: rgba(4, 4, 5, 1);
        }
        .sing_in,
        .create {
          float: right;
          font-weight: 700;
          font-size: 20px;
          padding: 15px 30px;
          border: 1px solid #ccc;
          border-radius: 50px;
        }
        .to_main_page {
          line-height: 60px;
          font-size: 18px;
          font-weight: 700;
         
          border-radius: 15px;
          font-family: Roboto, sans-serif;
        }
        .create {
          margin-right: 20px;
          background-image: linear-gradient(
            to right,
            rgb(255, 0, 184) 0%,
            rgb(100, 161, 255) 100%,
            rgb(0, 102, 255) 100%
          );
          color: #fff;

          transition: all 1s;
        }
        .create:hover {
          background-image: linear-gradient(
            to left,
            rgb(255, 0, 184) 0%,
            rgb(100, 161, 255) 100%,
            rgb(0, 102, 255) 100%
          );
          transition: all 1s;
        }
        label {
          width: 29%;
          position: relative;
          background-image: url("/static/search.svg");
          background-repeat: no-repeat;
          background-position: 15% center;
        }
        .img {
          position: absolute;
          top: 30px;
          left: 50px;
        }
        .close {
          float: right;
          cursor: pointer;
        }
        .close:hover {
          transform: scale(1.2);
        }
        input {
          font-weight: 700;
          font-size: 20px;
          padding: 17px 30px 17px 60px;

          height: 60.5px;
          box-sizing: border-box;
          border-radius: 50px;
          margin-left: 30px;
          vertical-align: middle;
          border: none;
          background: rgba(4, 4, 5, 0.07);
        }
        input:focus {
          background: #fff;
          border: none;
          outline: 5px solid #ccc;
          border: 1px solid #bbb;
        }
        .wallet_name {
          width: 450px;
          height: auto;
          border-radius: 15px;
          position: absolute;
          top: 120px;
          padding: 10px;
          right: 0;
          background: #fff;
          box-shadow: 0px 0px 27px 0px rgba(34, 60, 80, 0.2);
        }
        .wallet_name > button {
          padding: 20px;
          width: 100%;
          border: none;
          text-align: left;
          background-color: #fff;
          margin: 10px 0 0;
          padding-left: 60px;
          background-size: 7%;
          background-repeat: no-repeat;
          background-position: 4% center;
          font-weight: 700;
          font-size: 18px;
        }
        .refresh {
          animation: rotation 2s infinite linear;
          display: inline-block;
          width: 46px;

          height: 46px;
          padding: 0;
        }

        .hash {
          padding-left: 20px;
        }
        .hash img {
          cursor: pointer;
        }
        .copy_account {
          cursor: pointer;
        }
        .copy_account:before {
          content: "${textCopy}";
          font: 500 16px/16px Roboto, sans-serif;
          background: #000;
          color: #fff;
          opacity: 0;
          position: absolute;
          top: -10px;
          left: 130px;
          border-radius: 15px;
          padding: 10px;
          width: 150px;
          text-align: center;
        }
        .copy_account:hover:before {
          opacity: 1;
        }
        .wallet_name > button:hover {
          background-color: rgba(4, 4, 5, 0.07);
          border-radius: 10px;
        }

        .wallet_name b {
          float: right;
          cursor: pointer;
        }
        .balance {
          width: 100%;
          height: 55%;
          border: 1px solid rgba(4, 4, 5, 0.1);
          border-radius: 12px;
          padding: 12px 16px;
        }
        .balance b {
          font: 700 20px/30px Roboto, sans-serif;
          float: none;
          color: #000;
        }
        .balance button {
          width: 100%;
          height: 45px;
          border: 1px solid rgba(4, 4, 5, 0.1);
          border-radius: 50px;
          background: #fff;
          font: 700 18px/20px Roboto, sans-serif;
        }
        .balance div button {
          width: auto;
          float: right;
          padding: 0 20px;
          margin-top: -20px;
        }

        .my__hash {
          padding: 20px 0 20px 80px;
          margin: 0;
          background-size: 14%;
          color: gray;
          background-repeat: no-repeat;
          background-position: left center;
        }
        .navy a.active {
          color: #000;
          border-bottom: 3px solid #000;
        }
        @keyframes rotation {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(359deg);
          }
        }
        @media screen and (max-width: 680px) {
          .navbar_main {
            padding: 10px;
          }
          .navy {
            width: 100%;
            margin: 20px 0;
          }
          .sing_in,
          .create {
            width: 48%;
            text-align: center;
          }
          input {
            width: 80%;
            margin-left: 10px;
          }
        }
      `}</style>
    </div>
  );
}
