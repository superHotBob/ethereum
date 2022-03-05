import Image from "next/image";
import React, { useState } from "react";
import closeIcon from "../../public/image/close.svg";
import Web3 from "web3";
import Router from "next/router";
const axios = require("axios");
const contractABI = require("../../artifacts/contracts/NFTMinter.sol/contract-abi.json");
const Contract = require("web3-eth-contract");


const contractAddress = "0x2265C9ea6E9C593734e04b839B5f8a72a6427FeE";

export default function Single() {  
  const [description, setDescription] = useState();
  const [name_nft, setNameNft] = useState();
  const [type_nft, setTypeNft] = useState();
  const [error_message, setErrorMessage] = useState("none");
  const [imageNft, selectedImageNft] = useState();

  const web3 = new Web3(Web3.givenProvider);

  async function CreateItem() {
    const metadata = new Object();
    metadata.name = name_nft;
    metadata.image = imageNft;
    metadata.description = description;
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //making axios POST request to Pinata ⬇️
    return axios
      .post(url, metadata, {
        headers: {
          pinata_api_key: "8e18148843cb5c17cd92",
          pinata_secret_api_key:
            "a94689cdb6130f38863f0ebb6675eee19bd11556bd5f6bd6b1963e0ae3814ba4",
        },
      })
      .then(async function (response) {
        let metadata = response.data.IpfsHash;        
        const Mycontract = await new Contract(contractABI.abi, contractAddress);
        const Mydata = Mycontract.methods
          .mintNFT(window.ethereum.selectedAddress, metadata)
          .encodeABI();
        web3.eth
          .sendTransaction({
            from: window.ethereum.selectedAddress,
            to: contractAddress,
            data: Mydata,
          })
          .then((res) => {
            axios.post(url, {
        headers: {
          pinata_api_key: "8e18148843cb5c17cd92",
          pinata_secret_api_key:
            "a94689cdb6130f38863f0ebb6675eee19bd11556bd5f6bd6b1963e0ae3814ba4",
        },
      })
            console.log(res.logs);
            let id = web3.utils.hexToNumber(res.logs[0].topics[3]);          
            Router.push(`/token/${id}`);
          })
          .then((err) => console.log(err));
      })
      .catch(function (error) {        
        return {
          success: false,
          message: console.log(error.message),
        };
      });
  }

  const viewImage = async (event) => {
    let file = event.target.files[0];
    setTypeNft(file.type);
    console.log(file);
    const reader = new FileReader();
    reader.onloadend = function () {
      selectedImageNft(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="single_main">
      <h1>Create single item on Oasis </h1>
      <div className="main_choose_file">
        <div className="choose_file">
          {imageNft ? (
            <div>
              <h5 className="icon_close">
                <button onClick={() => selectedImageNft()}>
                  <Image
                    alt="close"
                    src={closeIcon}
                    width="40px"
                    height="40px"
                  />
                </button>
              </h5>
              {type_nft === "video/mp4" ? (
                <video
                  src={imageNft}
                  width="80%"
                  loop
                  autoPlay
                  mute
                  type="video/mp4"
                />
              ) : type_nft === "audio/mpeg" ? (
                <audio
                  controls
                  loop
                  autoPlay
                  type="audio/mpeg"
                  src={imageNft}
                />
              ) : (
                <div className="main_image" />
              )}
            </div>
          ) : (
            <>
              <p>PNG, GIF, WEBP, MP4, MP3 . Max 100mb.</p>
              <form>
                <label>
                  Choose File
                  <input
                    type="file"
                    id="file"
                    name="file"
                    accept="image/png, image/gif, image/webp, image/jpeg, video/mp4,audio/mp3"
                    onChange={(e) => viewImage(e)}
                  />
                </label>
              </form>
            </>
          )}
        </div>

        <label className="price">
          <span>Name</span>
          <input
            type="text"
            placeholder="e. g. 'Redeemable T-Shirt with logo'"
            value={name_nft}
            onChange={(e) => setNameNft(e.target.value)}
          />
        </label>
        {!name_nft && (
          <p style={{ color: "red" }}>{"Name"} is not allowed to be empty</p>
        )}
        <label className="price">
          <span>
            Description
            <b
              style={{
                color: "rgb(110, 110, 110)",
                fontWeight: 400,
                fontSize: 20,
              }}
            >
              (Optional)
            </b>
          </span>
          <input
            type="text"
            placeholder="e. g. 'After purchasing you’ll be able to get the real T-Shirt'"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <p>With preserved line-breaks</p>

        <div className="block-create-item">
          <button
            className={
              description && name_nft 
                ? "create_item"
                : "create_item disabled"
            }
            disabled={!(description && name_nft )}
            onClick={CreateItem}
          >
            Create item
          </button>
          <span>
            Saved after changes <b>?</b>
          </span>
        </div>
      </div>
      <div className="preview_file">
        <div style={{ marginTop: 100 }}>
          {type_nft === "video/mp4" && imageNft ? (
            <video
              width="100%"
              autoPlay
              loop
              mute
              src={imageNft}
              type="video/mp4"
            />
          ) : type_nft === "audio/mpeg" && imageNft ? (
            <audio
              className="audio"
              controls
              loop
              type="audio/mpeg"
              src={imageNft}
            />
          ) : null}
        </div>
        {!imageNft && <p>Upload file to preview your brand new NFT</p>}
      </div>
      <div className="error__message">Sorry,try again!</div>
      <style jsx>
        {`
          p {
            font: 500 14px/14px Roboto, sans-serif;
            color: rgb(110, 110, 110);
          }
          .audio {
            display: block;
            margin: 40% auto;
          }
          .single_main {
            width: 70%;
            margin: 150px auto 0;
            padding-bottom: 30px;
          }
          .file {
            position: relative;
          }
          .file span {
            position: absolute;
          }
          .icon_close {
            text-align: end;
            cursor: pointer;
            opacity: 0.3;
            margin: -20px 10px;
          }
          .main_choose_file {
            width: 62%;
            display: inline-block;
          }
          .main_image {
            width: 100%;
            height: 500px;
            background-image: url(${imageNft});
            background-repeat: no-repeat;
            background-size: auto 100%;
            background-position: center;
          }
          .choose_file {
            text-align: center;
            position: relative;
            margin: 50px 0;
            z-index: 1;
            background: #fff;
            border: 1px dashed rgba(4, 4, 5, 0.1);
            border-radius: 15px;
            padding: 40px 10px;
          }
          .choose_file:before {
            content: "Upload file";
            position: absolute;
            top: -40px;
            left: 0;
            font: 700 20px/30px Roboto, sans-serif;
          }
          .choose_file:after {
            content: '"File" is required';
            position: absolute;
            top: 101%;
            display: ${imageNft ? "none" : "block"};
            left: 0;
            color: red;
            font: 500 16px/30px Roboto, sans-serif;
          }
          button:active {
            transform: scale(0.98);
            /* Scaling button to 0.98 to its original size */
            box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
            /* Lowering the shadow */
          }
          input[type="file"] {
            display: none;
          }
          .choose_file img,
          .preview_file img {
            width: 70%;
            margin: 20px auto;
            height: auto;
            display: block;
            border-radius: 10px;
          }
          .choose_file label {
            padding: 15px;
            width: 40%;
            border: none;
            cursor: pointer;
            border-radius: 50px;
            background-color: #fff;
            margin: 0;
            color: rgb(0, 102, 255);
            background: rgba(0, 102, 255, 0.15);
            display: inline-block;
            font-weight: 700;
            font-size: 18px;
          }
          .choose_file label:hover {
            background: rgba(0, 102, 255, 0.3);
          }
          .service_fee {
            margin: 20px 0;
          }
          .preview_file {
            display: inline-block;
            float: right;
            position: -webkit-sticky; /* Safari */
            position: sticky;
            top: 160px;
            width: 35%;
            margin-top: 50px;
            background-image: url(${imageNft});
            background-position: center 50%;
            background-repeat: no-repeat;
            background-size: 50%;
            height: 500px;
            border: 1px solid rgba(4, 4, 5, 0.1);
            border-radius: 15px;
          }
          .unlocked {
            border: 1px solid rgba(4, 4, 5, 0.1);
            border-radius: 15px;
            height: 100px;
            position: relative;
            margin-top: 60px;
            text-align: center;
            line-height: 100px;
          }
          .unlocked:before {
            content: "Unlock content";
            position: absolute;
            top: -40px;
            left: 0;
            font: 700 20px/30px Roboto, sans-serif;
          }

          .preview_file:before {
            content: "Preview";
            position: absolute;
            top: -40px;
            left: 0;
            font: 700 20px/30px Roboto, sans-serif;
          }
          .preview_file p {
            width: 70%;
            margin: 45% auto;
            text-align: center;
            color: rgba(4, 4, 5, 0.5);
            font: 700 18px/25px Roboto, sans-serif;
          }
          .select {
            display: flex;
            flex-direction: row;
            margin: 20px 0 40px;
            justify-content: space-between;
          }
          .select div {
            width: 48%;
            border: 1px solid rgba(4, 4, 5, 0.1);
            border-radius: 15px;
            text-align: center;
            cursor: pointer;
            padding: 40px 0;
            font: 500 18px/22px Roboto, sans-serif;
          }
          .icon__oasis {
            font: 700 40px/50px Roboto, sans-serif;
            background: linear-gradient(60deg, red, yellow);
            padding: 1px 11px;
            border-radius: 50px;
            margin-bottom: 4px;
            display: inline-block;
          }
          .select img {
            display: block;
            margin: 0 auto;
          }
          .put_on_market {
            background: #121fcf;
            background: -webkit-linear-gradient(to left, #121fcf 50%, #c19ae5);
            background: -moz-linear-gradient(to left, #121fcf 50%, #c19ae5);
            background: linear-gradient(to left, #121fcf 50%, #c19ae5);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .unlock {
            background: linear-gradient(to left, #c19ae5 50%, #121fcf);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .right {
            width: 40px;
            height: 20px;
            background-color: rgb(0, 102, 255);
            border-radius: 40px;
            transition: all 0.5s ease-in-out 0s;
            border: none;
            padding: 0 4px;
            float: right;
            text-align: right;
          }
          .left {
            width: 40px;
            height: 20px;
            background-color: rgba(0, 102, 255, 0.1);
            border-radius: 40px;
            transition: all 0.5s ease-in-out 0s;
            border: 1px solid rgb(0, 102, 255);
            padding: 0 4px;
            float: right;
            text-align: left;
          }

          .right_b {
            transition: all 0.5s ease-in-out 0s;
            color: #fff;
            font-size: 12px;
            padding: 1px 8px;
            border-radius: 8px;
            background: #fff;
          }
          .left_b {
            transition: all 0.5s ease-in-out 0s;
            color: rgb(0, 102, 255);
            font-size: 12px;
            padding: 1px 8px;
            border-radius: 8px;
            background: rgb(0, 102, 255);
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
          label {
            font-weight: 700;
            position: relative;
          }
          .royalties:after {
            content: "%";
            left: 98%;
            color: rgba(4, 4, 5, 0.5);
            position: absolute;
            top: 40px;
          }

          .create_item,
          .show_advansed {
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
          .collection {
            justify-content: space-between;
          }
          span b {
            color: rgb(110, 110, 110);
            font: 500 12px/20px Roboto, sans-serif;
          }
          .show_advansed {
            width: 100%;
            color: #000;
            margin-top: 40px;
            background: #fff;
            border: 1px solid rgba(4, 4, 5, 0.1);
          }
          .block-create-item span {
            float: right;
            line-height: 70px;
            margin-left: 10px;
          }
          .block-create-item_block span b {
            background: rgba(4, 4, 5, 0.1);
            border-radius: 15px;
            padding: 5px 10px;
            font-size: 15px;
            cursor: pointer;
          }
          .disabled {
            background: rgb(230, 230, 230);
            color: gray;
            cursor: not-allowed;
          }
          .error__message {
            position: fixed;
            top: 45%;
            left: 35%;
            height: 300px;
            display: ${error_message};
            width: 30%;
            background: #fff;
            z-index: 100;
            text-align: center;
            font-size: 50px;
            line-height: 300px;
            box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);
            border-radius: 15px;
          }
        `}
      </style>
    </div>
  );
}
