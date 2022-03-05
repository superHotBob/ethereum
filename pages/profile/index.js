import Link from "next/link";
import { useEffect, useState } from "react";
import Web3 from "web3";
import Image from "next/image";
import { useSelector } from "react-redux";
import { walletAddress } from "../../reduser";
import myAwait from "../../public/image/await.gif";
const contractABI = require("../../artifacts/contracts/NFTMinter.sol/contract-abi.json");
const contractAddress = "0x2265C9ea6E9C593734e04b839B5f8a72a6427FeE";


export default function Profile() {

  const my_wallet = useSelector(walletAddress);

  const [metadata, setMetadata] = useState([]);
  const [sort, setSort] = useState(true);
  const [size, changeSize] = useState(true);

  const web3 = new Web3(
    Web3.givenProvider ||
      Web3.providers.HttpProvider("https://testnet.emerald.oasis.dev")
  );
  const contract = new web3.eth.Contract(contractABI.abi, contractAddress);

  useEffect(() => {
    async function tokensList() {
      const nftBalance = await contract.methods.balanceOf(my_wallet).call();
      console.log(nftBalance);
      const data = [];
      for (let i = 0; i < nftBalance; i++) {
        const tokenId = await contract.methods
          .tokenOfOwnerByIndex(my_wallet, i)
          .call();
        const tokenMetadataURI = await contract.methods
          .tokenURI(tokenId)
          .call();
        data.push({ tokenId: tokenId, tokenMetadataURI: tokenMetadataURI });
      }
      console.log(data);

      const my_metadata = [];
      async function ReadToken() {
        for (const i of data) {
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
        setMetadata(my_metadata);
      }
      ReadToken();
    }
    tokensList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="start_main">
      <h1 className="head_nft">
        Explore MY NFTs
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
                <a style={{ marginRight: 9 }}>
                  <div
                    style={{ backgroundImage: `url(${i.image})` }}
                    className="image_block"
                  >
                    tokenId:{i.id}
                    {i.image.search("video") > 0 && (
                      <div style={{ marginTop: "15%" }}>
                        <video
                          width="80%"
                          autoPlay
                          loop
                          mute
                          src={i.image}
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

                      <p className="description">{i.description}</p>
                    </h3>
                  </div>
                </a>
              </Link>
            ))}
        </div>
      ) : (
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
        .all_nft {
          display: flex;

          flex-wrap: wrap;
          align-content: flex-start;
        }
        .size {
          margin-left: 20px;
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
          width: ${size ? "29" : "21.6"}vw;
          height: ${size ? "30" : "20"}vw;
          padding: 2% 0 10px;
          margin-top: 19px;
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
          margin: 0;
          padding: 20px 0;
          font-size: 50px;
          border-bottom: 1px solid #ddd;
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
