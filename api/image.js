import { base58ToHex, base64ToHex, getIcon, getInscription } from '../lib/util.js'

module.exports = async (req, res) => {
    const {
        query: { tx, type, format },
    } = req;

    let txid = tx

    if (format === 'base64') {
        txid = base64ToHex(tx)
    }

    if (format === 'base58') {
        txid = base58ToHex(tx)
    }
 
    const txUrl = "https://api.blockcypher.com/v1/btc/main/txs/"+txid+"?includeHex=true" 
    const response = await fetch(txUrl);

    const data = await response.json()
    const raw = data.hex
    const imageData = getInscription(raw)

    const allowableTypes = ['image/png', 'image/jpeg', 'image/gif']
    
    if (type === 'json' && allowableTypes.includes(imageData.mime)){    

        const imageDataBase64 = Buffer.from(imageData.hex, 'hex').toString('base64')

        // const iconDataBase64 = await getIcon(imageData.mime, imageData.hex)
        // {
        //     "type": "icon",
        //     "data": iconDataBase64
        // },

        const jsonData = {
            "images": [
                {
                    "type": "large",
                    "data": "data:"+imageData.mime+";base64,"+imageDataBase64
                },

            ]
        }
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(jsonData));
    } else {
        const buffer = new Buffer.from(imageData.hex, 'hex');
        res.statusCode = 200;
        res.setHeader('Content-Type', imageData.mime);
        res.end(buffer);
    }
};