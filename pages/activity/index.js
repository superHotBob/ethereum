import React, { useEffect, useRef, useState } from "react";
import Web3 from "web3";
const contractABI = require("../../artifacts/contracts/NFTMinter.sol/contract-abi.json");
const contractAddress = "0x2265C9ea6E9C593734e04b839B5f8a72a6427FeE";
const walletAddress = "0xE9252e37E406B368Ad38d201800bF421978af659";
const axios = require("axios");
const web3 = new Web3(
  Web3.givenProvider ||
    Web3.providers.HttpProvider("https://testnet.emerald.oasis.dev")
);

const contract = new web3.eth.Contract(contractABI.abi, contractAddress);

export default function Activity() {
  const [allTokens, setTokens] = useState([]);
  const [latest_block, setLatestBlock] = useState(404000);
  const [moment_last_block, setMoment_Last_Block] = useState(0);

  const titleRef = useRef();
  
  function Safe() {
    // titleRef.current.textContent = "New updated Text";  
    // axios.post("http://localhost:5000/api/tokens", { tokens }).then((res) => {
    //   console.log(res);
    //   console.log(res.data);
    // });
  }
  console.log("new ref");
  useEffect(() => {
   
    // axios.get("http://localhost:5000/api/lastblock").then((res) => {     
      const tokens = [];
      async function pastEvents() {
        const latestBlock = await web3.eth.getBlockNumber();
        setMoment_Last_Block(latestBlock);        
        console.log("This is  block", latestBlock, moment_last_block);
        for (let i = latestBlock - 500; i <= latestBlock; i++) {         
          const pastEvent = await contract.getPastEvents("AllEvents", {
            fromBlock: i,
            toBlock: i,
          });
          titleRef.current.textContent = latestBlock - i + 1;      
          if (
            pastEvent.length !== 0 &&
            pastEvent[0].event !== "OwnershipTransferred"
          ) {
            if (pastEvent[0].event === "Approval") {
              titleRef.current.textContent = latestBlock - i + 1;  
              tokens.push({
                TokenId: pastEvent[1].returnValues.tokenId,
                BlockNumber: i,
                From: pastEvent[1].returnValues.from,
                To: pastEvent[1].returnValues.to,
              });
              // console.log(
              //   "TokenId: ",
              //   pastEvent[1].returnValues.tokenId,
              //   "From: ",
              //   pastEvent[1].returnValues.from,
              //   "To:",
              //   pastEvent[1].returnValues.to,
              //   "BlockNumber:",
              //   i
              // );
            } else {  
              titleRef.current.textContent = latestBlock - i +1;                 
              tokens.push({
                TokenId: pastEvent[0].returnValues.tokenId,
                BlockNumber: i,
                From: pastEvent[0].returnValues.from,
                To: pastEvent[0].returnValues.to,
              });
              // console.log(
              //   "TokenId: ",
              //   pastEvent[0].returnValues.tokenId,
              //   "From: ",
              //   pastEvent[0].returnValues.from,
              //   "To:",
              //   pastEvent[0].returnValues.to,
              //   "BlockNumber:",
              //   i
              // );
            }
          }
        }
        console.log("New token", tokens);
        
        setTokens(tokens);
      }
      pastEvents();
    // } );
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        
         {allTokens.length === 0 && <div className="Counter">
            <span ref={titleRef}> </span>
            <span> from last {500}</span>
        </div>}
        {allTokens.map((i) => (
          <p key={i.BlockNumber} className="HeaderTable">
            <span className="token">{i.TokenId}</span>
            <span>{i.From}</span>
            <span>{i.To}</span>
          </p>
        ))}
        <br/>
        <button className="button blue" onClick={Safe}>
          safe
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
