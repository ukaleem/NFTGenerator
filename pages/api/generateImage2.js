var images = require("images");
const fs = require('fs').promises;
const resizeImg = require('resize-img');
import { total_count } from "../../config";

let count = 0;


export default async function handler(req, res) {

    while (count < total_count) {
        let data = await fs.readFile('img/output_name/' + count.toString(), 'utf8')//, function (err, data) {
        data = JSON.parse(data);
        // Display the file content
        let image = images(data[0]);

        data.map((file, ind) => {
            if (ind > 0 && file != '') {
                let _image = images(file);

                image = image.draw(_image, 0, 0);
                _image = null;
                // images.gc();

                if (ind == data.length - 1) {
                    var __fname = 'public/output/' + count + '.png';
                    image.save(__fname);
                    // image.gc();
                    image = null;
                    console.log('file creating = ' + count)
                    count++;
                }
            }
        })

        // count = total_count;
    }
    res.send('exot');
}