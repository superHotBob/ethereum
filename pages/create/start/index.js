import Image from "next/image";

export default function Start() {
  return (
    <div className="start_main">
      <h1>Choose Blockchain</h1>
      <span>Choose the most suitable blockchain for your needs.</span>
      <br />
      <span>You need to sign in for creation</span>
      <div className="choose_blockchain">
        <div>
          <Image alt="ethereum" src="/ethereum.svg" width="100" height="100" className="img" />
          <p>Ethereum</p>
          <button>Sign in</button>
        </div>
        <div>
          <img alt="tz" src="/tz.svg" width="100" height="100" className="img" />
          <p>Tezos</p>
          <button>Sign in</button>
        </div>
        <div>
          <Image alt="flow" src="/flow.svg" width="100" height="100" className="img" />
          <p>Flow</p>
          <button>Sign in</button>
        </div>
      </div>
      <style jsx>{`
        .start_main {
          width: 75%;
          margin: 200px auto;
        }
        span {
          font-size: 29px;
          line-height: 40px;
          color: gray;
          font-weight: 500;
        }
        .img {
          z-index: 1;
        }
        h1 {
          text-align: left;
          font-size: 50px;
        }
        .choose_blockchain {
          display: flex;
          width: 100%;
          flex-direction: row;
          justify-content: space-between;
        }
        .choose_blockchain div {
          height: 600px;
          width: 32%;
          padding-top: 8%;
          border: 1px solid rgba(4, 4, 5, 0.1);
          border-radius: 20px;
          text-align: center;
          margin-top: 50px;
        }
        p {
          font-size: 35px;
          margin: 60px auto;
          font-weight: 700;
        }
        button {
          font-weight: 700;
          font-size: 20px;
          padding: 20px 100px;
          background: #fff;
          border: 1px solid rgba(4, 4, 5, 0.1);
          border-radius: 50px;
          cursor: pointer;
        }
        button:hover {
            border: 1px solid rgba(4, 4, 5, 0.4);
        }
        @media screen and (max-width: 680px) {
            .start_main {
                width: 95%;
                margin: 200px auto;
            }
            button {
                width: 90%;
                padding: 20px 10px;
            }
            .choose_blockchain div {
                height: auto;
            }    
        }
      `}</style>
    </div>
  );
}
