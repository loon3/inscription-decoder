import Head from 'next/head'
import styles from '../styles/Home.module.css'
import HexToBase64Form from '../components/convert'



export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Inscribe.art</title>
        <meta name="description" content="Create on-chain Bitcoin NFTs using Counterparty assets and Ordinal Inscriptions" />
      </Head>

      <main className={styles.main}>
        <div className={styles.heading}>
          <h1 className={styles.title}>
            Inscribe.art
          </h1>
        
          <div><a href="https://github.com/loon3/inscription-decoder" target="_blank" rel="noreferrer" className={styles.linkSmall}>github</a></div>
        </div>
        <p className={styles.description}>
          Create on-chain Bitcoin NFTs using Counterparty Assets (<a href="https://github.com/CounterpartyXCP" target="_blank" rel="noreferrer" className={styles.linkSmall}>github</a>) and Ordinal Inscriptions (<a href="https://github.com/casey/ord" target="_blank" rel="noreferrer" className={styles.linkSmall}>github</a>)
        </p>

        <p className={styles.description}>
          Paste your Inscription Reveal Tx ID into the input field below for your new Counterparty Asset Description.
        </p>

        <HexToBase64Form />
        
       
     
      </main>

    </div>
  )
}

