var fs = require('fs');

const files = fs.readdirSync('public/img/output/');
const itemspages = 8;
let items = [];
let temp = [];
files.map((file, ind) => {
    if(ind % itemspages == 0){
        if(ind>0) items.push(temp)
        temp =[];
    }
    temp.push(file);
})
const maxPage = Math.floor(files.length/itemspages) + 1;
export default function handler(req, res) {
    if (req.method === "POST") {
        let pageIndex = req.body.pageIndex;
        res.json(items[pageIndex-1]);
    }else{

        res.send(maxPage);
    }

}
  