var fs = require('fs');
var images = require("images");
const resizeImg = require('resize-img');
const util = require('util');
const FormData = require('form-data');
import axios from "axios";
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export default async function handler(req, res) {

    // for(let i =0 ;i< 100; i++){
    //   console.log(getRndInteger(0, 2));
    // }
    const name_prefix = 'img/output_name/';
    var content = await readFile('img/total', 'utf8');
    var totals = JSON.parse(content);
    var totalForMints = totals.filter((total) => (total > -1));
    if (totalForMints.length == 0) {
        res.send('none'); return;
    }
    var mintIndex = getRndInteger(0, totalForMints.length);
    var files = JSON.parse(await readFile(name_prefix + mintIndex.toString()))
    // console.log(file_name_array)
    let image = images(files[0]);
    // console.log(files)
    files.map((file, ind) => {

        if (ind > 0 && file != '') {
            image = image.draw(images(file), 0, 0);
            if (ind == files.length - 1) {
                var __fname = 'img/output/' + mintIndex + '.png';
                image.save(__fname);
                console.log('file creating = ' + mintIndex)
            }
        }
    })
    let image_s = await resizeImg(fs.readFileSync('img/output/' + mintIndex + '.png'), {
        width: 299,
        height: 349
    });
   
    var small_name = 'img/output/' + mintIndex +   '_small.png'
    fs.writeFileSync(small_name, image_s);
    let data = new FormData();
    data.append('file', fs.createReadStream(small_name));
    var url_pinata = `https://api.pinata.cloud/pinning/pinFiletoIPFS`;
    var resp = await axios.post(url_pinata, data, {
        headers: {
            "Content-Type": `multipart/form-data; boundary= ${data._boundary}`,
            pinata_api_key: '6d78aaa98809fbfcf16f',
            pinata_secret_api_key: '0a424fa3beb41f81618a30f623cd9a279819a6bdfe2ffea0f51f2ebf75bb569e',
        },
    })
    var image_url = "https://gateway.pinata.cloud/ipfs/" + resp.data.IpfsHash;
    url_pinata = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    console.log({name: mintIndex.toString(), image: image_url})
    resp = await axios.post(url_pinata, {name: mintIndex.toString(), image: image_url}, {
        headers: {
            pinata_api_key: '6d78aaa98809fbfcf16f',
            pinata_secret_api_key: '0a424fa3beb41f81618a30f623cd9a279819a6bdfe2ffea0f51f2ebf75bb569e',
        },
    })
    var tokenUri = "https://gateway.pinata.cloud/ipfs/" + resp.data.IpfsHash;
    console.log(tokenUri);
    // content = await readFile('img/total', 'utf8');
    // totals = JSON.parse(content);
    // totals[mintIndex] = -1;
    // await writeFile('img/total', JSON.stringify(totals));
    res.status(200).json({tokenUri, mintIndex, image_url});
}