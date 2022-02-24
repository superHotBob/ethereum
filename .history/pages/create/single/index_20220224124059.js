import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import closeIcon from "../../../public/image/close.svg";
import { useSelector } from "react-redux";
import { hash } from "../../../reduser";
import Web3 from "web3";

import { NFTStorage, File } from "nft.storage";
const contractABI = require("../../../artifacts/contracts/NFTMinter.sol/contract-abi.json");
const Contract = require("web3-eth-contract");
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE";

export default function Single() {
  const str = useSelector(hash);
  const NFT_STORAGE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDRmODNkQTc1ODYxNzU4YzFEMjRhMEM4RTg4QjNmMzhlYjM3ODdCNDUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0NTUwNzc5MzI5OSwibmFtZSI6Im5mdCJ9.3EZe3Bcxay2KRSW4aJLOHhovrZYMbR6UMrks9GscKV8";
  const unlock_content = useRef("");
  const [image_nft, setSelectedNft] = useState();
  const [price, setPrice] = useState(0);
  const [my_price, setMyPrice] = useState();
  const [putMarket, setPutMarket] = useState(true);
  const [unlock, setUnlock] = useState(true);
  const [royalties, setRoyalties] = useState();
  const [minting, setMinting] = useState();
  const [description, setDescription] = useState();
  const [name_nft, setName_ntf] = useState();
  const [type_nft, setTypeNtf] = useState();
  const [error_message, setErrorMessage] = useState(0);

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
  // const baseURL = "http://localhost:5000/api";

  const web3 = new Web3(Web3.givenProvider);

  async function CreateItem() {
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });
    const metadata = await nftstorage.store({
      image: new File([image_nft], "panda.jpg", { type: "image/jpg" }),
      name: name_nft,
      description: description,
    });
    console.log('This is metadataUrl', metadata.url);
    const contractAddress = "0xbcC7999B281f9daD87E2F566E483652ede7f2A25";
    const Mycontract = await new Contract(contractABI.abi, contractAddress);
    // const transactionParameters = {
    //   to: res.contractAddress, // Required except during contract publications.
    //   from: window.ethereum.selectedAddress, // must match user's active address.
    const Mydata = Mycontract.methods
      .mintNFT(window.ethereum.selectedAddress, metadata.url).encodeABI();
    const my_nonce = await web3.eth.getTransactionCount(window.ethereum.selectedAddress, 'latest');
    console.log('This is nonce',my_nonce);  
    console.log('This is contract data', Mydata);
    web3.eth
      .sendTransaction({
        from: window.ethereum.selectedAddress,
        to: contractAddress,
        nonce: my_nonce,        
        gas: 21000,
        data: Mydata,
      })
      .on("receipt", console.log)
      .on("error", console.error);
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

    //     // try {
    //     //     const txHash =  await window.ethereum
    //     //         .request({
    //     //             method: 'eth_sendTransaction',
    //     //             params: [transactionParameters],
    //     //         });
    //     //     return {
    //     //         success: true,
    //     //         status: console.log("✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" + txHash)
    //     //     }
    //     // } catch (error) {
    //     //     return {
    //     //         success: false,
    //     //         status: console.log("😥 Something went wrong: " + error.message)

    //     //     }

    //     // }

    // } catch (err) {
    //   setErrorMessage(1);
    //   setTimeout(()=>setErrorMessage(0),2000);
    //   console.log(err);
    // }
  }
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
    const nft_name = localStorage.getItem("nft");
    const type = localStorage.getItem("type_nft");
    setSelectedNft(nft_name);
    setTypeNtf(type);
  }, []);

  useEffect(() => localStorage.setItem("nft", image_nft), [image_nft]);

  const changeHandler = async (event) => {
    let file = await event.target.files[0];
    // let formData = new FormData(event);

    setTypeNtf(file.type);
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function () {
      setSelectedNft(reader.result);
      localStorage.setItem("image_nft", reader.result);
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
                <div className="main_image"></div>
              ) : (
                <video width="400" controls>
                  <source src={selectedFile} type="video/mp4" />
                </video>
              )}
            </div>
          ) : (
            <>
              <p>PNG, GIF, WEBP, MP4 or MP3. Max 100mb.</p>
              <form>
                <label>
                  Choose File
                  <input
                    type="file"
                    id="file"
                    name="file"
                    accept="image/png, image/gif,image/webp, image/jpeg,video/mp4"
                    onChange={changeHandler}
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
            valie={name_nft}
            onChange={(e) => setName_ntf(e.target.value)}
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
