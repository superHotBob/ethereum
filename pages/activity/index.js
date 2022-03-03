import React, { useEffect, useState } from "react";
import Web3 from "web3";
const contractABI = require("../../artifacts/contracts/NFTMinter.sol/contract-abi.json");
const contractAddress = "0x2265C9ea6E9C593734e04b839B5f8a72a6427FeE";
const walletAddress = "0xE9252e37E406B368Ad38d201800bF421978af659";

const web3 = new Web3(
  Web3.givenProvider ||
    Web3.providers.HttpProvider("https://testnet.emerald.oasis.dev")
);

const contract = new web3.eth.Contract(contractABI.abi, contractAddress);

export default function Activity () {

    const [tonens, setTokens] = useState([]);
    
    useEffect(()=>{
        


        const startedBlock = 392718;
        async function pastEvents() {
        const latestBlock = await web3.eth.getBlockNumber();
        console.log(latestBlock);
        
        for (let i = startedBlock; i <= latestBlock; i++) {
            const pastEvent = await contract.getPastEvents("AllEvents", {
            fromBlock: i,
            toBlock: i
            });
            if (pastEvent.length !== 0 && pastEvent[0].event !== "OwnershipTransferred") {
            if (pastEvent[0].event === "Approval") {
                console.log("TokenId: ",pastEvent[1].returnValues.tokenId,"From: ",pastEvent[1].returnValues.from,"To:",pastEvent[1].returnValues.to,"BlockNumber:",i)
            }
            else {
                console.log("TokenId: ",pastEvent[0].returnValues.tokenId,"From: ",pastEvent[0].returnValues.from,"To:",pastEvent[0].returnValues.to,"BlockNumber:",i)
            }
            }
        }
        }
        pastEvents();

    },[]);

    return (
        <div className="main_block">
            <h1>Activity</h1>
            <style jsx>{`
                .main_block {
                    margin-top: 200px;
                }
                h1 {
                    text-align: center;
                }
                `}</style>
        </div>
    )
}