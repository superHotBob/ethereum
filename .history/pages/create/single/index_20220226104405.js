import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import closeIcon from "../../../public/image/close.svg";
import { useSelector, useDispatch } from "react-redux";
import { hash, setTokenId } from "../../../reduser";
import Web3 from "web3";
import Router from 'next/router';
import { NFTStorage, File } from "nft.storage";
const contractABI = require("../../../artifacts/contracts/NFTMinter.sol/contract-abi.json");
const Contract = require("web3-eth-contract");
// import env from "react-dotenv";
const axios = require('axios');
// const key = env.REACT_APP_PINATA_KEY;
// const secret = env.REACT_APP_PINATA_SECRET;


const contractAddress = "0x138e8834275ADc812b2C15bCA1c056f6782FdCB7";

export default function Single() {
  
  const str = useSelector(hash);
  const dispatch = useDispatch();
 
  const unlock_content = useRef("");
  const [image_nft, setSelectedNft] = useState();
  const [price, setPrice] = useState(0);
  const [my_price, setMyPrice] = useState();
  const [putMarket, setPutMarket] = useState(true);
  const [unlock, setUnlock] = useState(true);
  const [royalties, setRoyalties] = useState();
  const [minting, setMinting] = useState();
  const [description, setDescription] = useState();
  const [name_nft, setNameNtf] = useState();
  const [type_nft, setTypeNtf] = useState();
  const [error_message, setErrorMessage] = useState(0);

  useEffect(()=>setNameNtf(localStorage.getItem('name')),[]);

  const SetMyPrice = (e) => {
    const old = my_price;
    console.log(Number(e.target.value) === e.target.value);
    if (Number(e.target.value) !== "NaN") {
      setMyPrice(e.target.value);
      console.log(my_price);
    } else if (Number(e.target.value) === 0) {
      setMyPrice();
    } else {
      setMyPrice(old);
    }
  };
  async function previewFile(e) {
    
    var file    = e.target.files[0];
    
    var data  = new FormData();
    var imagedata = document.querySelector('input[type="file"]').files[0];
    data.append('file', 'imagedata');
   
    
    console.log(data);
  
    // listen for 'load' events on the FileReader
   
  
    // if there's a file, tell the reader to read the data
    // which triggers the load event above
    if (file) {
      console.log(reader.readAsDataURL(file));
    }
  }
  const pinJSONToIPFS = async() => {
    const metadata = new Object();
      metadata.name = name_nft;
      metadata.image = url;
      metadata.description = description;
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //making axios POST request to Pinata ⬇️
    return axios 
        .post(url, metadata, {
            headers: {
              pinata_api_key: '8e18148843cb5c17cd92',
              pinata_secret_api_key: 'a94689cdb6130f38863f0ebb6675eee19bd11556bd5f6bd6b1963e0ae3814ba4'
            }
        })
        .then(function (response) {
           return {
               success: true,
               pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

    });
};

pinJSONToIPFS();

  const SetNameNft = (e) => {
    setNameNtf(e.target.value);
    localStorage.setItem("name", e.target.value);
  };
  const SetDescription = (e) => {
    setDescription(e.target.value);
    localStorage.setItem("description", e.target.value);
  };

  const web3 = new Web3(Web3.givenProvider);
  const Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

  async function CreateItem() {
   
    const nftstorage = new NFTStorage({ token: key});
    const my_data = Base64.encode(image_nft.replace(/data:image\/(png|jpeg);base64,/, ""));  
    const metadata = await nftstorage.store({      
      image: new File([my_data], "panda.jpg", { type: type_nft }),
      name: name_nft,
      description: description,
    });
    
    console.log('This is metadataUrl', metadata);
   
    const Mycontract = await new Contract(contractABI.abi, contractAddress);
    // const transactionParameters = {
    //   to: res.contractAddress, // Required except during contract publications.
    //   from: window.ethereum.selectedAddress, // must match user's active address.
    const Mydata = Mycontract.methods
      .mintNFT(window.ethereum.selectedAddress, metadata.url).encodeABI();
    // const my_nonce = await web3.eth.getTransactionCount(window.ethereum.selectedAddress, 'latest');
    // console.log('This is nonce',my_nonce);  
    // console.log('This is contract data', Mydata);
    web3.eth
      .sendTransaction({
        from: window.ethereum.selectedAddress,
        to: contractAddress,        
        data: Mydata,
      })
      .then(res=>{
        console.log(res);
        console.log(res.logs[1].topics[3]);
        dispatch(setTokenId(res.logs[1].topics[3]));
        Router.push('/token');
      })
      .then(err=>console.log(err));
    // const postData = {
    //   file: nft,
    //   address: str,
    //   name: name_nft,
    //   description: description,
    //   unlock_content: unlock_content.current ?
    //   unlock_content.current.valie :
    //   null,
    // };
    // try {
    //   const res = await fetch(`${baseURL}/item`, {
    //     method: "post",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "x-access-token": "token-value",
    //     },
    //     body: JSON.stringify(postData),
    //   })
    //   .then(res =>res.json());

      //   try {
      //        const txHash =  await window.ethereum
      //           .request({
      //                method: 'eth_sendTransaction',
      //              params: [transactionParameters],
      //           });
      //        return {
      //           success: true,
      //          status: console.log("✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" + txHash)
      //       }
      //    } catch (error) {
      //        return {
      //            success: false,
      //          status: console.log("😥 Something went wrong: " + error.message)

      //      }

      //  }

  
  };
  const SetRoyalties = (e) => {
    let data = e.target.value;
    console.log(data.search(/[a-zA-Z]/gi) === -1 && data.length < 3);
    if (data.search(/[a-zA-Z]/gi) === -1 && data.length < 3) {
      setRoyalties(data);
    } else {
      setRoyalties("");
    }
  };  
  useEffect(() => {
    const nameNft = localStorage.getItem("name");
    const typeNft = localStorage.getItem("type_nft");
    const imageNft = localStorage.getItem("nft");
    const descriptionNft = localStorage.getItem("description");
    setSelectedNft(imageNft);
    setTypeNtf(typeNft);
    setNameNtf(nameNft);
    setDescription(descriptionNft);    
  }, []);

 

  const changeHandler = async (event) => {
    let file = await event.target.files[0];    
    setTypeNtf(file.type);
    var reader = new FileReader();
    var url =  reader.readAsDataURL(file);
    reader.onloadend =  function () {
      setSelectedNft(reader.result);
      localStorage.setItem("nft", reader.result);
      localStorage.setItem("type_nft", file.type);   
    };    
  };
  return (
    <div className="single_main">
      <h1>Create single item on Oasis </h1>
      <div className="main_choose_file">     
        <div className="choose_file">
          {image_nft ? (
            <div>
              <h5 className="icon_close">
                <Image
                  alt="close"
                  src={closeIcon}
                  width="40px"
                  height="40px"
                  onClick={() => setSelectedNft("")}
                />
              </h5>
              {type_nft !== "video/mp4" ? (
                <div className="main_image">
                  <Image src={image_nft} width={300} height={400} id="image" />
                </div>
              ) : (
                <video width="400" controls>
                  <source src={selectedFile} type="video/mp4" />
                </video>
              )}
            </div>
          ) : (
            <>
              <p>PNG, GIF, WEBP, MP4 or MP3. Max 100mb.</p>
              <form encType="multipart/form-data">
                <label>
                  Choose File
                  <input
                    type="file"
                    id="file"
                    name="file"
                    accept="image/png, image/gif,image/webp, image/jpeg,video/mp4"
                    onChange={previewFile}
                  />
                </label>
              </form>
            </>
          )}
        </div>

        {/* <h3 className="put_on_market">
          Put on marketplace
          <button
            className={putMarket ? "left" : "right"}
            onClick={() => setPutMarket(!putMarket)}
          >
            <b className={putMarket ? "left_b" : "right_b"}></b>
          </button>
        </h3>
        <p>Enter price to allow users instantly purchase your NFT</p> */}
        {/* <div className="select">
          <span
            onClick={() => setPrice(0)}
            style={{ borderColor: price === 0 ? "blue" : "gray" }}
          >
            <img src="/fixed_price.svg" />
            fixed <br />
            price
          </span>
          <span
            onClick={() => setPrice(1)}
            style={{ borderColor: price === 1 ? "blue" : "gray" }}
          >
            <img src="/open_bid.svg" />
            Open for
            <br />
            big
          </span>
          <span
            onClick={() => setPrice(2)}
            style={{ borderColor: price === 2 ? "blue" : "gray" }}
          >
            <img src="/auction.svg" />
            Timed <br />
            auction
          </span>
        </div> */}
        {/* {price === 0 ? (
          <>
            <label className="price">
              Price {my_price}
              <input
                type="text"
                placeholder="Enter price for one piece"
                value={my_price}
                onChange={SetMyPrice}
              
              />
            </label>
            <p className="service_fee">
              Service fee <b>2.5%</b>
            </p>

            <p>You recieve </p>
          </>
        ) : null} */}
        {/* <h3 className="put_on_market unlock">
          Unlock once purchased
          <button
            className={unlock ? "left" : "right"}
            onClick={() => setUnlock(!unlock)}
          >
            <b className={unlock ? "left_b" : "right_b"}></b>
          </button>
        </h3>
        <p>Content will be unlocked after successful transaction</p> */}
        {!unlock && (
          <>
            <label className="price">
              <input
                type="text"
                placeholder="Digital key, code to redeem or link to a file ..."
                ref={unlock_content}
                onChange={SetMyPrice}
              />
            </label>
            <p>&#34;Locked content&#34; is not allowed to be empty</p>
          </>
        )}
        {/* <h3>Choose collection</h3>
        <div className="select collection">
          <div
            onClick={() => setPrice(0)}
            style={{
              borderColor: price === 0 ? "blue" : "rgba(4, 4, 5, 0.1)",
              marginRight: 20,
            }}
          >
            <Image src="/static/plus.svg" alt="plus" width={50} height={50} />
            <br />
            Create <br />
            <b>ERC-721</b>
          </div>
          <div
            onClick={() => setPrice(1)}
            style={{ borderColor: price === 1 ? "blue" : "rgba(4, 4, 5, 0.1)" }}
          >
            <span className="icon__oasis">O</span>
            <br />
            Oasis
            <br />
            <b>ROSE</b>
          </div>
        </div> */}
        {/* <h3 className="put_on_market">
          Free minting
          <button
            className={minting ? "left" : "right"}
            onClick={() => setMinting(!minting)}
          >
            <b className={minting ? "left_b" : "right_b"}></b>
          </button>
        </h3>
        <p>Buyer will pay gas fees for minting</p> */}

        <label className="price">
          <span>Name</span>
          <input
            type="text"
            placeholder="e. g. 'Redeemable T-Shirt with logo'"
            value={name_nft}
            onChange={SetNameNft}
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
            onChange={SetDescription}
          />
        </label>
        <p>With preserved line-breaks</p>
        {/* <label className="price royalties">
          Royalties
          <input
            type="text"
            placeholder="e. g. 10%"
            value={royalties}
            onChange={SetRoyalties}
          />
        </label>
        <button className="show_advansed">Show advanced setting</button> */}
        <div className="create_item_block">
          <button
            className={
              description && name_nft && str
                ? "create_item"
                : "create_item disabled"
            }
            disabled={!(description && name_nft && str)}
            onClick={CreateItem}
          >
            Create item
          </button>
          <span>
            Saved after changes <b>?</b>
          </span>
        </div>
      </div>
      <div className="preview__unlocked">
        <div className="preview_file">
          {!image_nft && <p>Upload file to preview your brand new NFT</p>}
        </div>
        {/* <div className="unlocked">
          {unlock_content.current ? unlock_content.current.value : null }
        </div> */}
      </div>
      <div className="error__message">Sorry,try again!</div>
      <style jsx>
        {`
          p {
            font: 500 14px/14px Roboto, sans-serif;
            color: rgb(110, 110, 110);
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
            background-image: url(${image_nft});
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
            display: ${image_nft ? "none" : "block"};
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
          .preview__unlocked {
            display: inline-block;
            float: right;
            position: -webkit-sticky; /* Safari */
            position: sticky;
            top: 160px;
            width: 35%;
            margin-top: 50px;
          }
          .preview_file {
            background-image: url(${image_nft});
            background-position: center 20%;
            background-repeat: no-repeat;
            background-size: 100%;
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
          .royalties:before {
            content: ${royalties
              ? `'Suggested: 0%, 10%, 20%, 30%. Maximum is 50%'`
              : `'Royalties must be a number'`};
            left: 0;
            color: ${royalties ? "rgba(4, 4, 5, 0.5)" : "red"};
            position: absolute;
            font-size: 14px;
            font-weight: 400;
            top: 80px;
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
          .create_item_block span {
            float: right;
            line-height: 70px;
            margin-left: 10px;
          }
          .create_item_block span b {
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
            opacity: ${error_message};
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
