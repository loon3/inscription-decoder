import Head from 'next/head'
import styles from '../styles/Home.module.css'
import HexToBase64 from '../components/convert'



export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Inscription as Asset Image</title>
        <meta name="description" content="Decode ordinal inscriptions using raw tx data from a block explorer" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Inscription as Asset Image
        </h1>

        <p className={styles.description}>
          Paste your Inscription Reveal Tx ID into the input field below. The tool will return the compatible asset description.
        </p>

        <HexToBase64 />
        
       
     
      </main>

    </div>
  )
}

