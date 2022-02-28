import Link from "next/link";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { useDispatch } from "react-redux";
const contractAddress = "0x8c43A7C2ed788059c5f7d2A4164939F3E5dd7fDF";
const contractABI = require("../../artifacts/contracts/NFTMinter.sol/contract-abi (3).json");
const Contract = require("web3-eth-contract");

export default function Profile() {
    const [metadata, setImage] = useState([]);
  const [tokenId, setTokenId] = useState([]);
  const [size, changeSize] = useState(true);
  const dispatch = useDispatch();
  const web3 = new Web3(Web3.givenProvider);

  

  const contract = new web3.eth.Contract(contractABI.abi, contractAddress);

  useEffect(() => {
        async function tokensList() {
            // await contract.getPastEvents('Transfer', {
            //      fromBlock:  372012,
               
            //     toBlock: 'latest'

            //  },function(error, events){ console.log(events); })

            //  .then(res =>  console.log("This is events", res)) 
           
        
    
      const list  = await contract.methods.fetchMyNFTs().call({from: window.ethereum.selectedAddress});
      console.log('This is my tokens', list);    
      const new_list = list.map((i) => Number(i.tokenId)).filter((i) => i > 1);
      setTokenId((tokenId) => [...tokenId, new_list]);

      async function ReadToken() {
        console.log(tokenId);
        for (const i of new_list) {
         
          const owner = await contract.methods.tokenURI(i).call();
          let data = await fetch(`https://ipfs.io/ipfs/${owner}`, {
            method: "get",
          })
            .then((res) => res.json())
            .then((res) => res);
          setImage((metadata) => [
            ...metadata,
            {
              name: data.name,
              description: data.description,
              image: data.image,
              id: i,
            },
          ]);
        }
      }
      ReadToken();
    }
    tokensList();
  }, []);
  // setTimeout(()=>console.log('This is tokens', tokenId),2000);
  return (
    <div className="start_main">
      <h1>Explore MY NFTs <button className="size" onClick={()=>changeSize(!size)}>view</button></h1>
      {metadata.length > 0 && (
        <div className="all_nft">
          {metadata.map((i) => (
            <Link href="/token/[pid]" key={i.id}  as={`/token/${i.id}`}>
              <a style={{marginRight: 9}}>
                <div
                  style={{ backgroundImage: `url(${i.image})` }}
                  className="image_block"
                >
                  {/* <p className="bolls">
                      <span className="collection main">ENS</span>
                      <span className="collection owner"></span>
                      <span className="collection creator"></span>
                    </p> */}
                  tokenId:{i.id}
                  <h3 className="name_image">
                    {i.name}
                    {/* <span className="icon_close">
                        <Image src="/static/ethereum.svg"  width={30} height={30} alt="ethereum" />
                      </span> */}
                  </h3>
                  <p className="cost">{i.description}</p>
                </div>
              </a>
            </Link>
          ))}
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
        .all_nft {
          display: flex;
          
          flex-wrap: wrap;
          align-content: flex-start;
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
          width: ${size ? '29' : '21.6'}vw;
          height: ${size ? '30' : '20'}vw;
          padding: 2%;
          margin-top: 9px;         
          display: inline-block;         
          border-radius: 15px;
          text-align: center;
          position: relative;
          background-size: auto 70%;
          background-repeat: no-repeat;
          background-position: center 40%;
        }
        .image_block:hover {
            box-shadow: 0px 3px 8px 5px rgba(34, 60, 80, 0.2);
            transition: all 0.5s;
        }
        .size {
          font: 500 20px/50px Roboto, sans-serif;
          float: right;
          border-radius: 50px;
        }
        .name_image {
          text-align: center;
          margin: ${size ? '90% 0 0' : '75% 0 0'};
          font: 700 18px/18px Roboto, sans-serif;
        }
        .name_image img {
          float: right;
          margin-top: -8px;
        }
        .cost {
          font: 500 14px/20px Roboto, sans-serif;
          text-align: center;
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