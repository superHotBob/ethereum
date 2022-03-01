import Head from "next/head";
import styles from "../styles/Home.module.css";
import Web3 from "web3";
import { useDispatch, useSelector } from "react-redux";
import { addAccount } from "../reduser";

export default function Home() {
  const dispatch = useDispatch();
  const web3 = new Web3(Web3.givenProvider);

  web3.eth.getAccounts().then((res) => {
    localStorage.setItem("account", res[0]);
    dispatch(addAccount(res[0]));
  });
  return (
    <div className={styles.container}>
      <Head>
        <title>Ethereum</title>
        <meta name="description" content="Ethereum" />
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
