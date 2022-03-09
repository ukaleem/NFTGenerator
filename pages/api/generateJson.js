import { total_count } from "../../config";
var fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);


let ss = {
  seller_fee_basis_points: 500,
  name: "Dungeon Demon #1",
  symbol: "Dungeon Demon",
  description: "Dungeon Demon NFT",

  collection: {
    name: "Dungeon Demon Season #1",
    family: "Dungeon Demon on Solana"
  },
  edition: 2021,
  image: "1.png",
  attributes: [
    {
      "trait_type": "web",
      "value": "yes"
    },
    {
      "trait_type": "mobile",
      "value": "yes"
    },
    {
      "trait_type": "extension",
      "value": "yes"
    }
  ],
  properties: {
    files: [],
    categoy: "image",
    creators: [{
      address: "6zEKPhiDkcbwVUjmcu3k4vHPgSrFG56wNQvJYfDZbW1M",
      share: 100
    }

    ]
  },

  external_url: "https://DemonNFTS.com"
}


export default async function  handler(req, res) {
  for (let i = 0; i < total_count; i++) {
    ss.name = "Demon " + i.toString();
    ss.image = i + ".png";
    var files = JSON.parse(await readFile(`img/output_name/${i}`))
    ss.properties.files=[];
    files.map(file=>{
      if(file!="")
      ss.properties.files.push(file);
    })
    fs.writeFile('img/output_json/' + i.toString() + ".json", JSON.stringify(ss), function (err) {
      console.log(i + " is completed");
    });
  }
  res.json(ss);
}