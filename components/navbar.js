import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement, 
  selectCount,
  hash,
  balance
} from "../reduser";

export default function Navbar() {
  const dispatch = useDispatch();
  function SignOut() {
    setviewWallet(false);
    dispatch(decrement());
  };
  const count = useSelector(selectCount);
  const str = useSelector(hash);
  const my_balance = useSelector(balance);
  const [viewWallet, setviewWallet] = useState(false);
 
  const substr = str ?  str.slice(7, str.length - 5): null;
  const new_str = str.replace(substr, "...");
  return (
    <div className="navbar_main">
      <div>
        <Link href="/">
          <a className="to_main_page">O</a>
        </Link>
        <label>
          <input type="search" placeholder="Colection, item or user" />
        </label>
      </div>

      <nav className="navy">
        <Link href="/explore/all">
          <a className="">Explore</a>
        </Link>
        <Link href="/">
          <a className="">My profile</a>
        </Link>
        <Link href="/">
          <a className="">Following</a>
        </Link>

        <Link href="/">
          <a className="">Activity</a>
        </Link>
        <span>...</span>
      </nav>

      <div>
        <Link href="/connect">
          <a className="sing_in">Sign in</a>
        </Link>
        {count && (
          <span className="open_wallet" onClick={() => setviewWallet(true)} />
        )}
        <Link href="/create/single">
          <a className="create">Create</a>
        </Link>
      </div>
      {viewWallet && (
        <div className="wallet_name">
          <span className="close">
            <Image
              alt="close"
              src="/Icon_close.png"
              width={20}
              height={20}
              style={{ float: "right" }}
              onClick={() => setviewWallet(false)}
            />
          </span>
          <h2 className="hash">
              {new_str}{" "}
              <Image src="/copy.svg" width={18} height={18} alt="copy"/> 
          
          </h2>
          <div className="balance">
            <div style={{ backgroundImage: "url(/ethereum.svg)" }}>
                Balance<br/>
                <b>{my_balance} ETH</b>
            </div>
            <div style={{ backgroundImage: "url(/ethereum.svg)" }}>
                Bidding Balance<br/>
                <b>0 WETH</b> 
                <button>Convert</button>
            </div>
            {/* <div>
                <b>0 RARI</b> 
                <button>Claim</button>
            </div> */}
            <button>Add funds with card</button>
          </div>
          <button style={{ backgroundImage: "url(/user.png)" }}>My profile</button>
          <button style={{ backgroundImage: "url(/edit.svg)" }}>Edit profile</button>
          <button
            onClick={SignOut}
            style={{ backgroundImage: "url(/power-off.png)" }}
          >
            Sign out
          </button>
        </div>
      )}

      <style jsx>{`
        .navbar_main {
          padding: 30px 40px;
          width: 100%;
          position: fixed;
          display: flex;
          z-index: 2;
          flex-direction: row;
          justify-content: space-between;
          top: 0;
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
          margin-right: 20px;
          cursor: pointer;
        }
        .navy {
          display: inline-block;
          width: 35%;
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
        .navy a:hover, .navy span:hover {
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
          vertical-align: middle;
          font-size: 45px;
          font-weight: 700;
          padding: 0 10px;
          border-radius: 15px;
          font-family: Roboto, sans-serif;
          background: rgb(254, 218, 3);
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
          background-image: url("/search.svg");
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
          right: 188px;
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
        .hash {
            padding-left: 20px;
        }
        .hash img {
            cursor: pointer;
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
            font: 700 20px/30px Roboto,sans-serif;
            float: none;
            color: #000;
        }
        .balance  button {
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
        .balance div {
          padding: 20px 0 20px 80px;
          margin: 0;
          background-size: 14%;
          color: gray;
          background-repeat: no-repeat;
          background-position: left center;
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