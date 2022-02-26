import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Web3 from "web3";
const contractAddress = "0x138e8834275ADc812b2C15bCA1c056f6782FdCB7";
const contractABI = require("../../../artifacts/contracts/NFTMinter.sol/contract-abi.json");
const Contract = require("web3-eth-contract");

export default function ExploreAll() {
  const web3 = new Web3(Web3.givenProvider);

  useEffect(()=>{
    // async function ReadToken() {
    //   fetch('http://testnet.explorer.emerald.oasis.dev/api?module=token&action=getToken&contractaddress=0x138e8834275ADc812b2C15bCA1c056f6782FdCB7', {
    //         method: "get",
           
    //       })
    //       .then(res =>res.json())
    //       .then(res => console.log(res))
    // };
    // ReadToken()

    const myContract = new web3.eth.Contract(contractABI.abi, contractAddress);
      myContract.getPastEvents('Transfer', {
          filter: {
              _from: '0x0000000000000000000000000000000000000000'
          },
          fromBlock: 'latest'
      }).then((events) => {
          for (let event of events) {
              console.log(event.returnValues._tokenId);
          }
      });

  },[])

 
  return (
    <div className="start_main">
      <h1>Explore ALL NFTs</h1>
      <div className="all_nft">
        <Link href="/token" passHref>            
          <div className="image_block">
            <p className="bolls">
              <span className="collection main">ENS</span>
              <span className="collection owner"></span>
              <span className="collection creator"></span>
            </p>
            
            

            <p className="name_image">
              Bear #4512
              <span className="icon_close">
                <Image src="/static/ethereum.svg"  width={30} height={30} alt="ethereum" />
              </span>
              
            </p>
            <p className="cost">
              1 ETH <span style={{ color: "#bbb" }}>1/1</span>
            </p>
            <h5>Buy now</h5>
          </div>
        </Link>
      </div>
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
        .main:hover, .owner:hover, .creator:hover {
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
          border: 1px solid #bbb;
          border-radius: 15px;
          text-align: center;
          position: relative;
          background: url('https://img.rarible.com/prod/image/upload/t_image_big/prod-itemImages/0xb66a603f4cfe17e3d27b87a8bfcad319856518b8:105920822369709375853288917251796322838081429785310148444847718745428717469697/57b9c84')  no-repeat center 30%;
          background-size: 80% auto;
        }
        .name_image {
          text-align: left;
          position: relative;
          margin-top: 93%;          
          font: 700 14px/18px Roboto, sans-serif;
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
