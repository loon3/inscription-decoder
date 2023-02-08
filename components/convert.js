import React, { useState } from 'react';
// import bs58 from 'bs58';
import { hexToBase64 } from '../lib/util.js'
import styles from '../styles/HexToBase64.module.css';

export default function HexToBase64Form(){
  const [hexString, setHexString] = useState('');
  const [base64String, setBase64String] = useState('');
  const [url, setUrl] = useState('');
  const [urlDirect, setUrlDirect] = useState('');

  const handleHexStringChange = (event) => {
    setHexString(event.target.value);

    let result = hexToBase64(event.target.value);

    let hostname = window.location.hostname;
    let imageUrl = "https://"+hostname+"/api/image?type=json&format=base64&tx="+encodeURIComponent(result);
    setUrl(imageUrl);

    let imageUrlDirect = "https://"+hostname+"/api/image?tx="+event.target.value;
    setUrlDirect(imageUrlDirect);

    let description = "ORD:"+result
    setBase64String(description);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <label htmlFor="hex-string-input" className={styles.label}>Your Inscription Reveal Tx ID:</label>
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
                <label htmlFor="base64-string-output" className={styles.label}>Use this Asset Description:</label>
                <output id="base64-string-output" className={styles.output}>{base64String}</output>
                </div>
                
            </div>
            <div className={styles.imageLink}>
                <a href={url}>JSON Url</a>
            </div>
            <div className={styles.imageLink}>
                <a href={urlDirect}>Image Url</a>
            </div>
        </>
      )}
    </div>
  );
};

