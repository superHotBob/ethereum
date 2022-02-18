import Image from "next/image";
import React, { useState, useEffect } from "react";

export default function Single() {
  const [nft, setSelectedNft] = useState();
  const [price, setPrice] = useState(0);
  const [my_price, setMyPrice] = useState();
  const [putMarket, setPutMarket] = useState(true);
  const [unlock, setUnlock] = useState(true);
  const [royalties, setRoyalties] = useState();
  const [minting, setMinting] = useState();
  const [description, setDescription] = useState();
  const [name_nft, setName_ntf] = useState();
  const [type_nft, setTypeNtf] = useState();

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
  useEffect(() => localStorage.setItem("nft", nft), [nft]);
  const changeHandler = async (event) => {
    var file = event.target.files[0];
    setTypeNtf(file.type);
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = function () {
      setSelectedNft(reader.result);
      localStorage.setItem("nft", reader.result);
      localStorage.setItem("type_nft", file.type);
    };
  };

  return (
    <div className="single_main">
      <h1>Create single item on Ethereum</h1>
      <div className="main_choose_file">
        <div className="choose_file">
          {nft ? (
            <div>
              <h5 className="icon_close">
                <Image
                  alt="close"
                  src="/static/close.svg"
                  width="40px"
                  height="40px"
                  onClick={() => setSelectedNft("")}
                />
              </h5>
              {type_nft !== "video/mp4" ? (
                <img src={nft} alt="image_nft" />
              ) : (
                <video width="400" controls>
                  <source src={selectedFile} type="video/mp4" />
                </video>
              )}
            </div>
          ) : (
            <>
              <p>PNG, GIF, WEBP, MP4 or MP3. Max 100mb.</p>
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
            </>
          )}
        </div>
        <h3 className="put_on_market">
          Put on marketplace
          <button
            className={putMarket ? "left" : "right"}
            onClick={() => setPutMarket(!putMarket)}
          >
            <b className={putMarket ? "left_b" : "right_b"}></b>
          </button>
        </h3>
        <p>Enter price to allow users instantly purchase your NFT</p>
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
        <h3 className="put_on_market unlock">
          Unlock once purchased
          <button
            className={unlock ? "left" : "right"}
            onClick={() => setUnlock(!unlock)}
          >
            <b className={unlock ? "left_b" : "right_b"}></b>
          </button>
        </h3>
        <p>Content will be unlocked after successful transaction</p>
        {unlock && (
          <>
            <label className="price">
              <input
                type="text"
                placeholder="Digital key, code to redeem or link to a file ..."
                valie={my_price}
                onChange={SetMyPrice}
              />
            </label>
            <p>&#34;Locked content&#34; is not allowed to be empty</p>
          </>
        )}
        <h3>Choose collection</h3>
        <div className="select collection">
          <span
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
          </span>
          <span
            onClick={() => setPrice(1)}
            style={{ borderColor: price === 1 ? "blue" : "rgba(4, 4, 5, 0.1)" }}
          >
            <Image
              src="/static/rarible.png"
              alt="rarible"
              width={50}
              height={50}
              className="rarible"
            />
            <br />
            Oasis
            <br />
            <b>RARI</b>
          </span>
        </div>
        <h3 className="put_on_market">
          Free minting
          <button
            className={minting ? "left" : "right"}
            onClick={() => setMinting(!minting)}
          >
            <b className={minting ? "left_b" : "right_b"}></b>
          </button>
        </h3>
        <p>Buyer will pay gas fees for minting</p>

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
        <label className="price royalties">
          Royalties
          <input
            type="text"
            placeholder="e. g. 10%"
            value={royalties}
            onChange={SetRoyalties}
          />
        </label>
        <button className="show_advansed">Show advanced setting</button>
        <div className="create_item_block">
          <button
            className={
              royalties && name_nft ? "create_item" : "create_item disabled"
            }
            disabled
          >
            Create item
          </button>
          <span>
            Saved after changes <b>?</b>
          </span>
        </div>
      </div>

      <div className="preview_file">
        {!nft && <p>Upload file to preview your brand new NFT</p>}
      </div>
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
            display: ${nft ? "none" : "block"};
            left: 0;
            color: red;
            font: 500 16px/30px Roboto, sans-serif;
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
            background-image: url(${nft});
            background-position: center 20%;
            background-repeat: no-repeat;
            background-size: 100%;
            top: 150px;
            width: 35%;
            margin-top: 50px;
            height: 500px;
            border: 1px solid rgba(4, 4, 5, 0.1);
            border-radius: 15px;
          }
          .name_preview {
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
          .select span {
            width: 30%;
            border: 1px solid rgba(4, 4, 5, 0.1);
            border-radius: 15px;
            text-align: center;
            cursor: pointer;
            padding: 40px 0;
            font: 500 18px/22px Roboto, sans-serif;
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
            justify-content: start;
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
        `}
      </style>
    </div>
  );
}
