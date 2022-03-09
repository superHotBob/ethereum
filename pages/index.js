import Head from "next/head";
import styles from "../styles/Home.module.css";
import Web3 from "web3";
const axios = require("axios");
import { useDispatch, useSelector } from "react-redux";
import { addAccount ,  balance, changeBalance} from "../reduser";
import { useEffect } from "react";

const local = 'http://localhost:5000/api/login';
const global = 'https://myoasisserver.herokuapp.com/api/login';
const link = global;

export default function Home() {
  const dispatch = useDispatch();
  const myBalance = useSelector(balance);
  const web3 = new Web3(
    Web3.givenProvider ||
      Web3.providers.HttpProvider("https://testnet.emerald.oasis.dev")
  );
  
  function SendToBack (a, b) {
    axios.post(link, 
    {walletAddress: a,
    balance: b,
    date: new Date }
    ).then((res) => {
      localStorage.setItem("jwt", res.data);
      // localStorage.setItem('refresh', res.data.refreshToken);
      console.log(res.data);
    });
  };

  useEffect(() => {
    web3.eth.getAccounts().then((res) => {
      if (res.length !== 0) {
        web3.eth.getBalance(res[0]).then((responce) => {
          dispatch(changeBalance(responce / 1000000000000000000)); 
          SendToBack(res[0],(responce / 1000000000000000000));         
        });
       
      } else {
        localStorage.setItem("account", "");
        dispatch(addAccount(""));
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Crystal</title>
        <meta name="description" content="Crystal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Crystal</h1>
        <p className={styles.text}>
          Now you can connect your wallet via Metamask
          <br /> (Emerald ParaTime testnet), create, view and transfer NFTs.
          <br /> The alpha build is compatible with PNG, JPEG, GIF, MP4 via
          IPFS.
          <br />
          Alpha v1.0
        </p>
        <br />
        <br />
        <span>
          Design v1.0 -{" "}
          <a className="link" href="http://crystaldesign.na4u.ru/">
            http://crystaldesign.na4u.ru/
          </a>
        </span>
      </main>
    </div>
  );
}
