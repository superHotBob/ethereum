import Link from "next/link";
import { useEffect, useState } from "react";
import Web3 from "web3";
import Image from "next/image";
import myAwait from "../../public/image/await.gif";

const contractAddress = "0x2265C9ea6E9C593734e04b839B5f8a72a6427FeE";
const contractABI = require("../../artifacts/contracts/NFTMinter.sol/contract-abi.json");


export default function ExploreAll() {
  const [metadata, setImage] = useState([]);
  const [size, changeSize] = useState(true);
  const [sort, setSort] = useState(true);
  const web3 = new Web3(
    Web3.givenProvider ||
      Web3.providers.HttpProvider("https://testnet.emerald.oasis.dev")
  );

  const contract = new web3.eth.Contract(contractABI.abi, contractAddress);

  useEffect(() => {
    
    async function tokensList() {
      const totalSupply = await contract.methods.totalSupply().call();     
      const data = [];
      for (let i = 0; i < totalSupply; i++) {       
          const tokenId = await contract.methods.tokenByIndex(i).call();
          const tokenOwner = await contract.methods.ownerOf(tokenId).call();
          const tokenMetadataURI = await contract.methods.tokenURI(tokenId).call();
                  
        data.push({ tokenId: tokenId, tokenMetadataURI: tokenMetadataURI,tokenOwner: tokenOwner });
      };
      

      const my_metadata = [];
      async function ReadToken() {
        for (const i of data) { 
          console.log(data);        
          await fetch(`https://ipfs.io/ipfs/${i.tokenMetadataURI}`, {
            method: "get",
          })
            .then((res) => res.json())
            .then((res) =>
              my_metadata.push({
                name: res.name,
                description: res.description,
                image: res.image,
                id: i.tokenId,
              })
            );
        }        
        setImage(my_metadata);
      }
      ReadToken();
    }
    tokensList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="start_main">
      <h1>
        Explore ALL NFTs
        <button className="size" onClick={() => changeSize(!size)}>
          view
        </button>
        <button className="size" onClick={() => setSort(!sort)}>
          sort
        </button>
      </h1>
      {metadata.length > 0 ? (
        <div className="all_nft">
          {metadata
            .sort((a, b) => (sort ? a.id - b.id : b.id - a.id))
            .map((i) => (
              <Link href="/token/[pid]" key={i.id} as={`/token/${i.id}`}>
                <a>
                  <div
                    style={{ backgroundImage: `url(${i.image})` }}
                    className="image_block"
                  >
                    {/* <p className="bolls">
                      <span className="collection main">ENS</span>
                      <span className="collection owner"></span>
                      <span className="collection creator"></span>
                    </p> */}
                    token Id: <b>{i.id}</b>
                    {i.image.search("video") > 0 && (
                      <div style={{ marginTop: "15%" }}>
                        <video
                          src={i.image}
                          width="80%"
                          loop
                          autoPlay
                          type="video/mp4"
                        />
                      </div>
                    )}
                    {i.image.search("audio") > 0 && (
                      <div style={{ marginTop: "15%" }}>
                        <audio controls loop type="audio/mpeg" src={i.image} />
                      </div>
                    )}
                    <h3 className="name_image">
                      {i.name}
                      {/* <span className="icon_close">
                        <Image src="/static/ethereum.svg"  width={30} height={30} alt="ethereum" />
                      </span> */}
                      <p className="description">{i.description}</p>
                    </h3>
                  </div>
                </a>
              </Link>
            ))}
        </div>) : (
        <h1 style={{ margin: "30vh auto", width: 150, border: "none" }}>
          <Image src={myAwait} width={100} height={100} alt="await" />
        </h1>
      
      )}
      <style jsx>{`
        p,
        h5 {
          text-align: left;
          margin: 5px 0;
        }
        .start_main {
          margin: 160px auto;
          width: 90%;
        }
        .size {
          margin-left: 20px;
          width: 50px;
        }
        .all_nft {
          display: flex;
          justify-content: space-between;
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
          width: ${size ? "29" : "21"}vw;
          height: ${size ? "30" : "20"}vw;
          padding: 2%;
          margin-top: 20px;
          display: inline-block;

          border-radius: 15px;
          text-align: center;
          position: relative;
          background-size: auto 70%;
          background-repeat: no-repeat;
          background-position: center 40%;
          transition: all 0.5;
        }
        .image_block:hover {
          box-shadow: 0px 3px 8px 5px rgba(34, 60, 80, 0.2);
          transition: all 0.5s;
          background-size: auto 75%;
          transition: all 0.5;
        }
        .size {
          font: 500 20px/50px Roboto, sans-serif;
          float: right;
          border-radius: 50px;
        }
        .name_image {
          text-align: center;
          font: 700 20px/22px Roboto, sans-serif;
          position: absolute;
          bottom: 0;
          width: 100%;
          margin-bottom: 0;
        }
        .description {
          font: 500 16px/20px Roboto, sans-serif;
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
