import { NextApiRequest, NextApiResponse } from 'next';

const bitcoinjs = require('bitcoinjs-lib')

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

    return {hex: combinedHexString, mime: mime}
}

module.exports = async (req, res) => {
    const {
        query: { tx },
    } = req;
    
    const txUrl = "https://api.blockcypher.com/v1/btc/main/txs/"+tx+"?includeHex=true" 
    const response = await fetch(txUrl);

    const data = await response.json()
    const raw = data.hex
    const imageData = getInscription(raw)

    const buffer = new Buffer.from(imageData.hex, 'hex');

    res.statusCode = 200;
    res.setHeader('Content-Type', imageData.mime);
    res.end(buffer);
  
};