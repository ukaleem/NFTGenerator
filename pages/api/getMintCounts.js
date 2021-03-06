var fs = require('fs');
var images = require("images");
const resizeImg = require('resize-img');
const util = require('util');
const FormData = require('form-data');
import axios from "axios";
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
import { total_count } from "../../config";
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export default async function handler(req, res) {

    
    var content = await readFile('img/total', 'utf8');
    var totals = JSON.parse(content);
    var _totals = totals.filter((total) => (total==-1))
    
    res.status(200).json({
        total: total_count,
        minted: _totals.length
    })
}