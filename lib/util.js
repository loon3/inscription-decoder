const bitcoinjs = require('bitcoinjs-lib')
//const sharp = require('sharp');
const bs58 = require('bs58');

export function hexToBase58(hexString) {
  return bs58.encode(Buffer.from(hexString, 'hex'));
}

export function base58ToHex(base58String) {
  return bs58.decode(base58String).toString('hex');
}

export async function getIcon(mimeType, imageHexString) {
  const maxHeight = 48;
  const maxWidth = 48;

  let image = sharp(Buffer.from(imageHexString, 'hex'));

  if (mimeType === 'image/gif') {
    image = image.trim();
  }

  const resizedImage = await image.resize({ height: maxHeight, width: maxWidth, fit: 'inside' }).toBuffer();
  const base64Image = `data:${mimeType};base64,${resizedImage.toString('base64')}`;

  return base64Image;
}

export function getInscription(raw){
    const tx = bitcoinjs.Transaction.fromHex(raw)

    const witness = tx.ins[0].witness[1];
    const script = bitcoinjs.script.decompile(witness);

    //get MIME
    const hex = Buffer.from(script[6]).toString('hex');
    const mime = Buffer.from(hex, 'hex').toString();

    //get file data
    script.pop()
    script.splice(0, 8)

    const hexStrings = script.map(array => {
    return Array.from(array, x => ('00' + x.toString(16)).slice(-2)).join('');
    });

    const combinedHexString = hexStrings.join('');

    return {hex: combinedHexString, mime: mime}
}

export function base64ToHex(base64) {
    const raw = Buffer.from(base64, 'base64');
    let hex = '';
    for (let i = 0; i < raw.length; i++) {
      let hexValue = raw[i].toString(16);
      hex += (hexValue.length === 1 ? '0' : '') + hexValue;
    }
    return hex;
}

export default function hexToBase64(hex) {
    const raw = Buffer.from(hex, 'hex');
    return raw.toString('base64');
  }
  
