import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { useSelector, useDispatch } from "react-redux";
const contractAddress = "0x8c43A7C2ed788059c5f7d2A4164939F3E5dd7fDF";
const contractABI = require("../../../artifacts/contracts/NFTMinter.sol/contract-abi (3).json");
const Contract = require("web3-eth-contract");
import { setTokenId, tokenId } from "../../../reduser";

export default function ExploreAll() {
  const [metadata, setImage] = useState([]);
  const dispatch = useDispatch();
  const web3 = new Web3(Web3.givenProvider);

  const ids = [3];

  const contract = new web3.eth.Contract(contractABI.abi, contractAddress);

  useEffect(() => {
    async function ReadToken() {
      const owner = await contract.methods.tokenURI(ids).call();
      let data = await fetch(`https://ipfs.io/ipfs/${owner}`, {
        method: "get",
      })
      .then((res) => res.json())
      .then(res => console.log(res))
      .then((res) => res);
        
    };

    console.log(ReadToken());
    // setImage(arr => [...arr,res]))
  }, []);

  return (
    <div className="start_main">
      <h1>Explore ALL NFTs </h1>     
      {metadata.length > 0 && (
        <div className="all_nft">{metadata}
          <Link href={`/token/${ids}`} replace>
            <a>
              <div className="image_block">
                {/* <p className="bolls">
                  <span className="collection main">ENS</span>
                  <span className="collection owner"></span>
                  <span className="collection creator"></span>
                </p> */}

                <h3 className="name_image">
                  {metadata.name}
                  {/* <span className="icon_close">
                    <Image src="/static/ethereum.svg"  width={30} height={30} alt="ethereum" />
                  </span> */}
                </h3>

                <p className="cost">{metadata.description}</p>
              </div>
            </a>
          </Link>
        </div>
      )}
      <style jsx>{`
        p,
        h5 {
          text-align: left;
          margin: 5px 0;
        }
        .start_main {
          margin: 200px auto;
          width: 90%;
        }

        .collection {
          display: inline-block;
          width: 40px;
          vertical-align: top;
          line-height: 40px;
          font-size: 16px;
          color: #fff;
          text-align: center;
          height: 40px;
          border-radius: 40px;
          background: linear-gradient(to left, #121fcf, #c19ae5);
          cursor: pointer;
          position: relative;
          transition: all 0.5s;
        }
        .owner {
          background: linear-gradient(to left, #121fcf, red);
          left: -10px;
        }
        .creator {
          background: linear-gradient(to left, yellow, #c19ae5);
          left: -20px;
        }
        .main:hover,
        .owner:hover,
        .creator:hover {
          margin-top: -10px;
          transition: all 0.5s;
        }
        .main:before {
          content: "Collection: ENS domain";
          position: absolute;
          top: -100px;
          left: -70px;
          width: 180px;
          color: #000;
          box-shadow: 0px 3px 8px 0px rgba(34, 60, 80, 0.2);
          background: #fff;
          padding: 10px;
          border-radius: 10px;
          opacity: 0;
          transition: all 0.5s;
        }
        .main:hover:before {
          opacity: 1;
          top: -70px;
        }
        .image_block {
          width: 25vw;
          height: 30vw;
          padding: 20px;
          margin-right: 20px;
          display: inline-block;
          border: 1px solid #bbb;
          border-radius: 15px;
          text-align: center;
          position: relative;
          background: url(${metadata.image});
          background-size: auto 70%;
          background-repeat: no-repeat;
          background-position: center 40%;
        }
        .name_image {
          text-align: center;

          margin-top: 108%;
          font: 700 18px/18px Roboto, sans-serif;
        }
        .name_image img {
          float: right;
          margin-top: -8px;
        }
        .cost {
          font: 500 14px/20px Roboto, sans-serif;
        }
        h1 {
          text-align: left;
          font-size: 50px;
        }
        h5 {
          background: #121fcf;
          background: -webkit-linear-gradient(to left, #121fcf 50%, #c19ae5);
          background: -moz-linear-gradient(to left, #121fcf 50%, #c19ae5);
          background: linear-gradient(to left, #121fcf 50%, #c19ae5);
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
}
