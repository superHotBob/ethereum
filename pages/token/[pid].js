import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { tokenId, setTokenId } from "../../reduser";
import Image from "next/image";
import Web3 from "web3";
import myAwait from "../../public/image/await.gif";
const contractABI = require("../../artifacts/contracts/NFTMinter.sol/contract-abi (3).json");
const Contract = require("web3-eth-contract");
const contractAddress = "0x8c43A7C2ed788059c5f7d2A4164939F3E5dd7fDF";

export default function Token() {
  const dispatch = useDispatch();
  const Id = useSelector(tokenId);

  useEffect(() => {
    let link = window.location.href;
    let leng = link.lastIndexOf("/");
    let tokenId = Number(link.substr(leng + 1, 1000));
    dispatch(setTokenId(tokenId));
    setTimeout(() => {
      tokenId === 0 ? console.log("error", tokenId) : ReadToken();
      async function ReadToken() {
        const my_owner = await contract.methods.ownerOf(tokenId).call();
        setOwner(my_owner);
        const owner = await contract.methods.tokenURI(tokenId).call();
        fetch(`https://ipfs.io/ipfs/${owner}`, {
          method: "get",
        })
          .then((res) => res.json())
          .then((res) => setData((prevState) => ({ ...prevState, ...res })));
      }
    }, 100);
  }, []);

  const web3 = new Web3(Web3.givenProvider);

  const [data, setData] = useState();
  const [owner, setOwner] = useState();
  const contract = new web3.eth.Contract(contractABI.abi, contractAddress);

  const [menu, selectMenu] = useState("Owners");
  const [account, setAccount] = useState();
  const [result, setResult] = useState("");

  async function mintNFT() {
    let link = window.location.href;
    let leng = link.lastIndexOf("/");
    let tokenId = Number(link.substr(leng + 1, 1000));
    window.contract = await new Contract(contractABI.abi, contractAddress);
    const transactionParameters = {
      to: contractAddress,
      from: window.ethereum.selectedAddress,
      data: window.contract.methods
        .safeTransferFrom(window.ethereum.selectedAddress, account, tokenId)
        .encodeABI(),
    };
    try {
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
      return {
        success: setResult("Transfer success"),
        status: console.log("✅ transaction success"),
      };
    } catch (error) {
      return {
        success: setResult("Transfer error"),
        status: console.log("😥 Something went wrong: " + error.message),
      };
    }
  }

  return (
    <div className="token__main__block">
      {data ? (
        <>
          <div className="image__block">
            {data.type !== "video/mp4" ? (
              <div className="center_block" />
            ) : (
              <video
                width="600"
                height="700"
                loop
                autoPlay
                muted
                className="video"
              >
                <source src={data.image} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
          <div className="title__block">
            <h1>{data.name}</h1>
            <h4>{data.description}</h4>
            {/* <p className="creator">{data.creatorOf}</p> */}
            <p className="menu">
              <span className="Owners" onClick={() => selectMenu("Owners")}>
                Owners
              </span>
              <span className="Details" onClick={() => selectMenu("Details")}>
                Details
              </span>
              <span className="History" onClick={() => selectMenu("History")}>
                History
              </span>
            </p>
            <h3>{owner}</h3>
            <label className="price">
              <input
                type="text"
                placeholder="enter account data"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              />
            </label>
            <button
              className={account ? "create_item" : "create_item disabled"}
              disabled={!account}
              onClick={mintNFT}
            >
              TRANSFER THIS NFT
            </button>
            <h3>{result}</h3>
            {/* <div className="select_menu">
              {menu === 'Owners' ?
              <h3>{data.mane}</h3>: menu === 'Details' ?
              <h3>
                <p style={{color: 'gray',fontWeight: 500}}>Blockchain</p>
               
                  {data.platform}
                
              </h3>:null}
            </div> */}
          </div>
          <style jsx>{`
            .video {
              display: block;
              margin: 80px auto 0;
              border-radius: 15px;
            }
            .creator {
              display: inline-block;
              width: 45%;
              margin-top: 30px;
              position: relative;
              padding: 15px 0;
            }
            .creator:before {
              content: "Creator";
              position: absolute;
              top: -20px;
              font: 500 20px/20px Roboto, sans-serif;
            }
            .menu {
              font: 500 20px/60px Roboto, sans-serif;
              border-bottom: 1px solid #bbb;
              color: gray;
              cursor: pointer;
            }
            .${menu} {
              color: #000;
            }
            .menu span {
              margin-right: 30px;
            }
            .menu span:hover {
              color: #000;
            }
            .image__block {
              display: inline-block;
              width: 60%;
              height: 60vh;
              padding: 0 200px;
            }
            .center_block {
              width: auto;
              text-align: center;
              position: relative;
              height: 60vh;
              margin: 50px auto;
              background-size: auto 70%;
              background-repeat: no-repeat;
              background-position: center 40%;
              background-image: url(${data.image});
            }

            .title__block {
              display: inline-block;
              width: 35%;
              vertical-align: top;
            }
            .price {
              font: 700 18px/18px Roboto, sans-serif;
              margin: 30px 0 10px;
              display: block;
            }
            .price input {
              border: none;
              width: 100%;
              border-bottom: 2px solid rgba(4, 4, 5, 0.1);
              padding: 15px 0 5px;
              outline: none;
              color: rgba(4, 4, 5, 0.5);
              font: 500 18px/32px Roboto, sans-serif;
            }
            .create_item {
              padding: 18px;
              width: 40%;
              border: none;
              font-weight: 700;
              border-radius: 50px;
              background-color: #fff;
              margin: 10px 0;
              color: #fff;
              background: rgb(0, 102, 255);
              display: inline-block;
            }
          `}</style>
        </>
      ) : (
        <h1 style={{ margin: "40vh auto", width: 150 }}>
          <Image src={myAwait} width={100} height={100} alt="await" />{" "}
        </h1>
      )}
    </div>
  );
}
