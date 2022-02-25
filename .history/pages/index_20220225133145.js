import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() { 
  const web3 = new Web3(Web3.givenProvider);
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
