import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'



export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ordinal Inscription Decoder</title>
        <meta name="description" content="Decode ordinal inscriptions using raw tx data from a block explorer" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Ordinal Inscription Decoder
        </h1>

        <p className={styles.description}>
          To return inscriptions as images, use the following path:
        </p>

        <p>
          <code className={styles.code}>api/image?tx=[inscription reveal tx id]</code>
        </p>
       
      </main>

    </div>
  )
}

