import React, { useEffect, useState } from "react";
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
  const [tonens, setTokens] = useState([]);
  const [latest_block, setLatestBlock] = useState(397414);

  useEffect(()=>{


  },[]);

  useEffect(() => {
    const startedBlock = 396718;
    const new_token = [];
    async function pastEvents() {
      const latestBlock = await web3.eth.getBlockNumber();
      setLatestBlock(latestBlock);
      console.log("This is latest block", latestBlock);
      for (let i = latest_block - 500; i <= latestBlock; i++) {
        const pastEvent = await contract.getPastEvents("AllEvents", {
          fromBlock: i,
          toBlock: i,
        });
        // console.log(pastEvent);
        if (
          pastEvent.length !== 0 &&
          pastEvent[0].event !== "OwnershipTransferred"
        ) {
          if (pastEvent[0].event === "Approval") {
            new_token.push({
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
            // new_token.push({
            //   TokenId: pastEvent[0].returnValues.tokenId,
            //   BlockNumber: i,
            //   From: pastEvent[1].returnValues.from,
            //   To: pastEvent[1].returnValues.to,
            // });
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
      console.log("New token", new_token);
      setTokens(new_token);
    }
    pastEvents();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="main_block">
      <div className="activity">
        <h1>Activity</h1>
        <p className="header_table">
          <span className="token">TokenId</span>
          <span>From</span>
          <span>To</span>
        </p>

        {tonens.map((i) => (
          <p key={i.BlockNumber} className="header_table">
            <span className="token">{i.TokenId}</span>
            <span>{i.From}</span>
            <span>{i.To}</span>
          </p>
        ))}
      </div>
      <style jsx>{`
        .main_block {
          margin-top: 200px;
        }
        .activity {
          width: 80%;
          margin: 0 auto;
        }
        .header_table {
          font-size: 20px;
          border-bottom: 1px solid #ddd;
        }
       
        .header_table span {
          width: 40%;
          display: inline-block;
          text-align: center;
          margin-right: 20px;
          padding: 20px;
        }
        .header_table span:first-of-type {
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
