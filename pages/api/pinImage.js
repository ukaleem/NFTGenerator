const pinataSDK = require('@pinata/sdk');
const fs = require('fs');


const pinata = pinataSDK('6d78aaa98809fbfcf16f', '0a424fa3beb41f81618a30f623cd9a279819a6bdfe2ffea0f51f2ebf75bb569e');

pinata.testAuthentication().then((result) => {
    //handle successful authentication here
    console.log(result);
}).catch((err) => {
    //handle error here
    console.log(err);
});


export default function handler(req, res) {
    console.log(req.body.fileName)
    const readableStreamForFile = fs.createReadStream('img/output/' + req.body.fileName);
    const options = {
        pinataMetadata: {
            name: 'image',
           
        },
        pinataOptions: {
            cidVersion: 0
        }
    };
    pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
        //handle results here
        // console.log(result);
        res.send('https://gateway.pinata.cloud/ipfs/'+result.IpfsHash);
    }).catch((err) => {
        //handle error here
        console.log(err);
        res.send('error')
    });
    // res.status(200).json({ name: 'pinata image' })
}
