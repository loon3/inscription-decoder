import Head from 'next/head'
import Link from 'next/link'
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
          To view inscriptions, use the following path:
        </p>

        <p>
          <code className={styles.code}>api/image?tx=[inscription reveal tx id]</code>
        </p>
       
        <div className={styles.grid}>
          <Link href="/asset">

          <div className={styles.card}>
           
            <h2>
              Link to Asset <span>-&gt;</span>
            </h2>
            <p>
              Connect an inscription with your Counterparty asset
            </p>
          </div>
          </Link>
          </div>
      </main>

    </div>
  )
}

