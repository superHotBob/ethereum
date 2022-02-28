import Head from "next/head";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";


export default function Home() {  
 
   
  return (
    <div className={styles.container}>
      <Head>
        <title>Ethereum</title>
        <meta name="description" content="Ethereum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Crystal</h1>
        <p className={styles.text}>Now you can connect your wallet via Metamask<br/> (Emerald ParaTime testnet),
         create, view and transfer NFTs.<br/> The alpha build is compatible with PNG, JPEG, GIF, MP3, MP4 via IPFS.
         <br/>
         Alpha v1.0
         </p>
         <br/>
         <br/>

         <span>Design v1.0 - https://crystaldesign.herokuapp.com</span>
      </main>
    </div>
  );
}
