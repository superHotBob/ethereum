import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { useSelector } from "react-redux";
import { myContract } from "../reduser";
import { useRouter } from "next/router";
const contractABI = require("../artifacts/contracts/NFTMinter.sol/contract-abi.json");

const local = "http://localhost:5000/api/transactions";
const global = "https://myoasisserver.herokuapp.com/api/transactions";
const link = global;

const axios = require("axios");
const web3 = new Web3(
  Web3.givenProvider ||
    Web3.providers.HttpProvider("https://testnet.emerald.oasis.dev")
);


export default function Activity() {
  const contractAddress = useSelector(myContract);
  const contract = new web3.eth.Contract(contractABI.abi, contractAddress);

  const [allTokens, setTokens] = useState([]);

  const router = useRouter();

  function Refresh() {
    axios
      .get(link, { headers: { authorization: localStorage.getItem("jwt") } })
      .then((res) => setTokens(res.data));
  }

  useEffect(() => {
    axios
      .get(link, {
        headers: { authorization: localStorage.getItem("jwt") },
      })
      .then((res) => {
        setTokens(res.data);
      });  
  }, []);

  return (
    <div className="MainBlock">
      <div className="Activity">
        <h1>Activity</h1>

        <p className="HeaderTable">
          <span className="token">TokenId</span>
          <span>From</span>
          <span>To</span>
        </p>

        {allTokens.map((i, index) => (
          <p key={index} className="HeaderTable">
            <span className="token">{i.tokenid}</span>
            <span>{i.author}</span>
            <span>{i.newuser}</span>
          </p>
        ))}
        <br />
        <button className="button blue" onClick={Refresh}>
          refresh
        </button>
      </div>
      <style jsx>{`
        .MainBlock {
          margin-top: 200px;
        }
        .Activity {
          width: 90%;
          margin: 0 auto;
        }
        .Counter {
          text-align: center;
          margin: 50px 0;
          font-size: 20px;
        }
        .HeaderTable {
          font-size: 20px;
          border-bottom: 1px solid #ddd;
          margin: 0;
        }

        .HeaderTable span {
          width: 40%;
          display: inline-block;
          text-align: center;
          margin-right: 20px;
          padding: 20px;
        }
        .HeaderTable span:first-of-type {
          width: 10%;
        }
        h1 {
          border-bottom: 1px solid #ddd;
          padding-bottom: 20px;
        }
      `}</style>
    </div>
  );
}
