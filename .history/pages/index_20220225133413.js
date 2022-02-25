import Head from "next/head";
import styles from "../styles/Home.module.css";
import Web3 from "web3";

export default function Home() { 
  const web3 = new Web3(Web3.givenProvider);
  web3.eth.getBalance('0xce6968bC30C1Dee5741C2b2790440C18bD0DE03f')
  .then(res=>res.json())
  .then(res=>console.log(res));
  return (
    <div className={styles.container}>
      <Head>
        <title>Ethereum</title>
        <meta name="description" content="Ethereum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Oasis</h1>
      </main>
    </div>
  );
}
