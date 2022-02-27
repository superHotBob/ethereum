import Head from "next/head";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";


export default function Home() {  
 useEffect(()=> console.log('HREF',window.location.href),[]);
   
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
