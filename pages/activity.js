import React, { useEffect,  useState } from "react";
import Web3 from "web3";
import { useRouter } from "next/router";
const contractABI = require("../artifacts/contracts/NFTMinter.sol/contract-abi.json");
const contractAddress = "0x2265C9ea6E9C593734e04b839B5f8a72a6427FeE";


const local = 'http://localhost:5000/api/transactions';
const global = 'https://myoasisserver.herokuapp.com/api/transactions';
const link = global;

const axios = require("axios");
const web3 = new Web3(
  Web3.givenProvider ||
    Web3.providers.HttpProvider("https://testnet.emerald.oasis.dev")
);

const contract = new web3.eth.Contract(contractABI.abi, contractAddress);

export default function Activity() {
  const [allTokens, setTokens] = useState([]);

  const router = useRouter();
  
  

  function Refresh() {
    axios.get(link, 
      {headers: { 'authorization': localStorage.getItem('jwt') }})
    .then((res) => setTokens(res.data))
    .then(err => router.push('/'))    
  };
  
  
  
  useEffect(() => {   
    axios.get(link,{
      headers: { 'authorization' :  localStorage.getItem('jwt') }}
      ).then((res) => { 
      setTokens(res.data)})
      
      // const tokens = [];
      // async function pastEvents() {
      //   const latestBlock = await web3.eth.getBlockNumber();
      //   setMoment_Last_Block(latestBlock);        
      //   console.log("This is  block", latestBlock, moment_last_block);
      //   for (let i = latestBlock - 500; i <= latestBlock; i++) {         
      //     const pastEvent = await contract.getPastEvents("AllEvents", {
      //       fromBlock: i,
      //       toBlock: i,
      //     });
      //     titleRef.current.textContent = latestBlock - i + 1; 
             
      //     if (
      //       pastEvent.length !== 0 &&
      //       pastEvent[0].event !== "OwnershipTransferred"
      //     ) {
      //       console.log(pastEvent);  
      //       if (pastEvent[0].event === "Approval") {
      //         titleRef.current.textContent = latestBlock - i + 1; 
      //         console.log(pastEvent[1].returnValues.tokenId);  
      //         tokens.push({
      //           TokenId: pastEvent[1].returnValues.tokenId,
      //           BlockNumber: i,
      //           From: pastEvent[1].returnValues.from,
      //           To: pastEvent[1].returnValues.to,
      //         });
      //         // console.log(
      //         //   "TokenId: ",
      //         //   pastEvent[1].returnValues.tokenId,
      //         //   "From: ",
      //         //   pastEvent[1].returnValues.from,
      //         //   "To:",
      //         //   pastEvent[1].returnValues.to,
      //         //   "BlockNumber:",
      //         //   i
      //         // );
      //       } else {  
      //         titleRef.current.textContent = latestBlock - i +1; 
      //         console.log(pastEvent[0].returnValues.tokenId);                
      //         tokens.push({
      //           TokenId: pastEvent[0].returnValues.tokenId,
      //           BlockNumber: i,
      //           From: pastEvent[0].returnValues.from,
      //           To: pastEvent[0].returnValues.to,
      //         });
      //         // console.log(
      //         //   "TokenId: ",
      //         //   pastEvent[0].returnValues.tokenId,
      //         //   "From: ",
      //         //   pastEvent[0].returnValues.from,
      //         //   "To:",
      //         //   pastEvent[0].returnValues.to,
      //         //   "BlockNumber:",
      //         //   i
      //         // );
      //       }
      //     }
      //   }
      //   console.log("New token", tokens);
        
      //   setTokens(tokens);
      // }
      // pastEvents();
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
        
        {allTokens.map((i,index) => (
          <p key={index} className="HeaderTable">
            <span className="token">{i.tokenId}</span>
            <span>{i.from}</span>
            <span>{i.to}</span>
          </p>
        ))}
        <br/>
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
