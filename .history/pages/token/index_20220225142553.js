import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { NFTE } from "@nfte/react";

export default function Token() {
  const new_data = {
    name: localStorage.getItem("name"),
    description: localStorage.getItem("description"),
    type: localStorage.getItem("type_nft"),
    mediaUrl: localStorage.getItem("nft"),
  };

  const [data, setData] = useState(new_data);
  const [menu, selectMenu] = useState("Owners");
  const [account, setAccount] = useState();

  function mintNFT() {

  };

  // useEffect(() => {
  //   const new_data = {
  //     'name':  localStorage.getItem("name_nft"),
  //     'description': localStorage.getItem("description"),
  //     'type': localStorage.getItem("type_nft"),
  //     'mediaUrl': localStorage.getItem("nft")

  //   };
  //   setData(prevState=>({...prevState, 'mediaUrl': localStorage.getItem("nft")}));
  //   console.log('This is data',data);
  //   },[]);
  // async function get() {
  //   fetch(
  //     "https://nfte.app/api/nft-data?contract=0x3b3ee1931dc30c1957379fac9aba94d1c48a5405&tokenId=45"
  //   )
  //     .then((response) => response.json())
  //     .then((responce) => {
  //       setData(responce);
  //       console.log(responce);
  //     });
  // }
  // get();

  return (
    <>
      {data ? (
        <div className="token__main__block">
          <div className="image__block">
            {data.type !== "video/mp4" ? (
              <div className="center_block">
                <Image
                  src={data.mediaUrl}
                  width={300}
                  height={500}
                  alt="media"
                />
              </div>
            ) : (
              <video
                width="600"
                height="700"
                loop
                autoPlay
                muted
                className="video"
              >
                <source src={data.mediaUrl} type="video/mp4" />
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
            <label className="price">
              <input
                type="text"
                placeholder="enter account data"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              />
            </label>
            <button
              className={
                account
                  ? "create_item"
                  : "create_item disabled"
              }
              disabled={!(account)}
              onClick={mintNFT}
            >
              mint NFT
            </button>
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
            .token__main__block {
              margin: 100px auto;
              width: 90%;
            }
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
              padding: 20px;
            }
            .center_block {
              width: auto;
              text-align: center;

              margin: 50px auto;
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
        </div>
      ) : null}
    </>
  );
}
