import React from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";

const bitcoinjs = require('bitcoinjs-lib')


export async function getServerSideProps(context) {

  let { tx } = context.query

  if (!tx) {
      return {
          props: {
              tx: null
          }
      }
  }

  return {
      props: {
          tx: tx,
      }
  }
}


function getRawTx(tx, callback){
    
    const urlInit = "https://api.blockcypher.com/v1/btc/main/txs/"+tx+"?includeHex=true"
        
    fetch(urlInit).then(response => response.json()).then(function(data){
        callback(data.hex)
    })
}


function getInscription(raw){
  const tx = bitcoinjs.Transaction.fromHex(raw)
  //console.log(bitcoinjs)

  const witness = tx.ins[0].witness[1];
  const script = bitcoinjs.script.decompile(witness);

  //get MIME
  const hex = Buffer.from(script[6]).toString('hex');
  const mime = Buffer.from(hex, 'hex').toString();
  //console.log(mime)

  //get file data
  script.pop()
  script.splice(0, 8)

  const hexStrings = script.map(array => {
    return Array.from(array, x => ('00' + x.toString(16)).slice(-2)).join('');
  });

  const combinedHexString = hexStrings.join('');
  const uint8Array = new Uint8Array(combinedHexString.match(/[\da-f]{2}/gi).map(h => parseInt(h, 16)));

  const blob = new Blob([uint8Array], { type: mime });

  return blob
}

const ImageDisplay = ({ imageBlob }) => {

    if (imageBlob) {
  return (
    <img src={URL.createObjectURL(imageBlob)} alt="Image Display" />
  );
    } else {
    return (
    <div></div>
    );
    }
};



function Inscription({tx}) {

  const [imageBlob, setImageBlob] = useState(null)

    useEffect(() => {  
        getRawTx(tx, function(raw){
            const blob = getInscription(raw)
            setImageBlob(blob)
        })
    }, [])


    return (
    <div>
   
        <ImageDisplay imageBlob={imageBlob} />
        
    </div>
    );
}


export default Inscription;
