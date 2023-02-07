import React, { useState } from 'react';
// import bs58 from 'bs58';
import { hexToBase64 } from '../lib/util.js'
import styles from '../styles/HexToBase64.module.css';

export default function HexToBase64(){
  const [hexString, setHexString] = useState('');
  const [base64String, setBase64String] = useState('');
  const [url, setUrl] = useState('');

  const handleHexStringChange = (event) => {
    setHexString(event.target.value);

    //let result = 'ORD:'+bs58.encode(Buffer.from(event.target.value, 'hex'));
    let result = hexToBase64(event.target.value);

    let imageUrl = "http://localhost:3002/api/image?type=json&format=base64&tx="+encodeURIComponent(result);
    setUrl(imageUrl);

    let description = "ORD:"+result
    setBase64String(description);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <label htmlFor="hex-string-input" className={styles.label}>Inscription Reveal Tx ID:</label>
        <input
          id="hex-string-input"
          type="text"
          value={hexString}
          onChange={handleHexStringChange}
          className={styles.input}
        />
      </div>
      {base64String && (
        <>
      <div className={styles.outputContainer}>
        <div>
        <label htmlFor="base64-string-output" className={styles.label}>Asset Description:</label>
        <output id="base64-string-output" className={styles.output}>{base64String}</output>
        </div>
        
      </div>
      <div className={styles.imageLink}>
      <a href={url}>{url}</a>
      </div>
      </>
      )}
    </div>
  );
};

