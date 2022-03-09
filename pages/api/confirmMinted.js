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

   var mintIndex = req.body.mintIndex;
    var content = await readFile('img/total', 'utf8');
    var totals = JSON.parse(content);
    totals[mintIndex] = -1;
    await writeFile('img/total', JSON.stringify(totals));
    res.send('ok');
}