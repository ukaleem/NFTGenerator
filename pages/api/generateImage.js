var images = require("images");
var fs = require('fs');
const resizeImg = require('resize-img');
import { total_count } from "../../config";




const genders = ['Male', 'Female', 'Fluid'];
// const traits = ['0 Background', '0.1 Back Horn', '1 Body', '2 Hair', '3 Eyes', '4 Mouth', '5 Front  Horn', '6 Eyebrows', '7 Clothes', '8 Earring', '9 Nose ring', '10 Tattoos', '11 Neck piece', '12 Eyewear', '13 Halos'];
const traits = ['Background', 'Back Horn', 'Body', 'Hair', 'Eyes', 'Mouth', 'Front Horn', 'Eyebrows', 'Clothes', 'Eyewear', 'Earring', 'Nose ring', 'Tattoos', 'Neck piece', 'Halos', 'Beard'];
// const compulsory = [[1,-1, 1, 1, 1, 1, -1, 1, 1, 0, 0, 0, 0, 0, 0], [1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, 0, 0, 0, 0], []];

const compulsory = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 0, 0, 0, 0], []];
const non_compusory_names = [['Earring', 'Tattoos', 'Neckpiece', 'Eyewear', 'Halos'], ['Nose', 'Tattoos', 'Neck', 'Eyewear', 'Halos'], ['Tattoos', 'Neck', 'Eyewear', 'Halos']]
function isCompulsory(name, _gindex) {
    name = replaceAll(name, "_", "");
    for (var i = 0; i < non_compusory_names[i]; i++) {
        if (name.includes(non_compusory_names[i])) {
            return false;
        }
    }
    return true;
}
///////////
// genders.map(gender => {
//     let folders = fs.readdirSync('_img/' +  gender + '/');
//     folders.map(folder=> {
//         let files = fs.readdirSync('_img/' +  gender + '/' + folder + '/');
//         files.map(file => {
//             let fileName = '_img/' +  gender + '/' + folder + '/' + file;
//             (async () => {
//                 let image = await resizeImg(fs.readFileSync(fileName), {
//                     width: 299,
//                     height: 349
//                 });
//                 console.log(fileName)
//                 fs.writeFileSync(fileName, image);
//             })();
//         })
//     })
// })
/////////



function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function addZero(inp) {
    if (inp.length == 1) return ('0' + inp);
    return inp
}
function logArray(s_prefix, s_array) {
    var s_new = [];
    s_array.map(v => {
        s_new.push(v + ".png");
    })
    console.log(s_prefix + " total count = " + s_new.length);
    console.log(s_prefix + " each file name = " + s_new);
}

// let total_count = total_count;
let file_name_array = [];
let file_name_code_array = [];
let fullfilenamearraynonline = [];
let fileInfos = [];
let gender_prop = [2433 / 6666, 2433 / 6666, 1800 / 6666];
let genderArray = [];
for (var i = 0; i < genders.length; i++) {
    for (var j = 0; j < Math.floor(gender_prop[i] * total_count); j++) {
        genderArray.push(i);
    }
}

for (var i = 0; i < total_count - genderArray.length + 1; i++) {
    genderArray.push(2);
}

for (var i = 0; i < total_count * 2; i++) {
    var index1 = getRndInteger(0, genderArray.length);
    var index2 = getRndInteger(0, genderArray.length);
    var temp = genderArray[index1];
    genderArray[index1] = genderArray[index2];
    genderArray[index2] = temp;
}

console.log(genderArray.length);
function replaceAll(str, find, replace) {
    // console.log(str);
    return str.replace(new RegExp(find, 'g'), replace);
}
function rarity(num) {
    return (num / total_count * 100);
}
export default function handler(req, res) {
    // res.send('end');return;
    // console.log(process.cwd());
    // console.log(genders)
    // var files = fs.readdirSync('img/' +  genders[0] + '/');
    // console.log(files);
    let each_gender_array = [[], [], []];
    let og_bodys = [0, 0, 0];
    let og_bodys_array = [[], [], []];
    let fire_bodys = [0, 0, 0];
    let fire_bodys_array = [[], [], []];
    let crownhalo = 0;
    let crownhalo_array = [];
    let dd_tatto = 0;
    let dd_tatto_array = [];
    let all_fired = [0, 0, 0];
    let all_fired_array = [[], [], []];
    let laser_eyes = 0;
    let laser_eyes_array = [];
    let fire_eyes = 0;
    let fire_eyes_array = [];
    let vr_eyes = 0;
    let vr_eyes_array = [];
    let gender_count = [0, 0, 0];
    let compulsory_count = [10, 10, 12];
    let compusory_only_count = [0, 0, 0];
    let compulsory_only_count_array = [[], [], []];
    genderArray.map((_gender, gender_ind) => {
        let passed = false;
        while (!passed) {
            console.log('precessing = ' + gender_ind);

            let gender = genders[_gender];
            let _fullnamenonline = gender;
            let itemsArray = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
            let _folders = fs.readdirSync('img/' + gender + '/');
            let folders = [];
            let folders_essential = [];
            let folders_nonessential = [];
            let fileInfo = {};
            traits.map(trait => {
                for (var i = 0; i < _folders.length; i++) {
                    if (_folders[i].includes(trait)) {

                        if (_folders[i].includes('_')) {
                            folders_nonessential.push(_folders[i]);
                        } else {
                            folders_essential.push(_folders[i]);
                            folders.push(_folders[i]);
                        }
                        // if(!isCompulsory(_folders[i], gender_ind)){
                        //     folders_nonessential.push(_folders[i]);
                        // }else{
                        //     folders_essential.push(_folders[i]);
                        //     folders.push(_folders[i]);
                        // }
                        continue;
                    }
                }
            })
            folders_nonessential.map(f => {
                if (getRndInteger(0, 2) == 0) {
                    folders.push(f);
                }
            })
            // console.log(folders);
            let item = [];
            file_name_code_array.push(addZero(_gender.toString(16)))
            folders.map((folder, i_folder) => {
                let files = fs.readdirSync('img/' + gender + '/' + folder + '/');
                _fullnamenonline += folder;
                var ind = getRndInteger(0, files.length);
                if (all_fired[_gender] === 0) {
                    files.map((f, i2) => {
                        if (f.includes('Fire')) {
                            ind = i2;
                        }
                    })
                    if (i_folder == folders.length - 1) {
                        all_fired[_gender] = 1;
                    }
                }
                let codelen = file_name_code_array.length;
                file_name_code_array[codelen - 1] = file_name_code_array[codelen - 1] + addZero((ind + 1).toString(16));
                item.push('img/' + gender + '/' + folder + '/' + files[ind]);
                // console.log(traits)
                // console.log(replaceAll(folder, '_', ''))
                let trait_index2 = 0;

                for (let ii = 0; ii < traits.length; ii++) {
                    // console.log(traits[ii])
                    if (folder.includes(traits[ii])) {
                        trait_index2 = ii; break;
                    }
                }
                // console.log(folder)
                // console.log(trait_index2)
                // console.log(traits.indexOf(replaceAll(folder, '_', '')))
                // console.log(replaceAll(files[ind]))
                // console.log('---------------------')
                itemsArray[trait_index2] = replaceAll(files[ind], '_', '');
                _fullnamenonline += files[ind];
            })
            ///check exception
            //check if back and fron horn exists
            // console.log(itemsArray)
            let fullnamenonline = replaceAll(_fullnamenonline, '_', '');
            fullnamenonline = replaceAll(fullnamenonline, ' ', '');
            // console.log(fullnamenonline);
            // if(fullnamenonline.includes('BackHorn'))
            //   if(!fullnamenonline.includes('FrontHorn')){
            //     console.log('Back Horn Front Horn failed');
            //     passed = false; continue; 
            // }
            //backhorn is Broken (gold) and fronthorn is Broken (Gold)
            // if(fullnamenonline.includes('BackHornBroken(Gold)') != fullnamenonline.includes('FrontHornBroken(Gold)')){
            //     console.log('backhorn is Broken (gold) and fronthorn is Broken (Gold)');
            //     passed = false; continue;
            // }
            //broken horn with no halo
            if (fullnamenonline.includes('Broken') && fullnamenonline.includes('Halos')) {
                console.log('broken horn with no halo');
                passed = false; continue;
            }
            //if Male, Only dust, hash & serpent males can have a bald hairstyle
            if (_gender == 'Male')
                if (itemsArray[3].includes('Bald')) {
                    if (!(itemsArray[2].includes('Dust') || itemsArray[2].includes('Hash') || itemsArray[2].includes('Serpent'))) {
                        console.log('if Male, Only dust, hash & serpent males can have a bald hairstyle');
                        passed = false; continue;
                    }
                }
            //Fire eyes can't wear any eyewear (eyepatch, shades etc.).
            if (itemsArray[4].includes('Fire') && itemsArray[9] != '') {
                console.log('Fire eyes cant wear any eyewear (eyepatch, shades etc.).');
                passed = false; continue;
            }
            //laser eyes can't wear any eyewear (eyepatch, shades etc.).
            if (itemsArray[4].includes('aser') && itemsArray[9] != '') {
                console.log('laser eyes cant wear any eyewear (eyepatch, shades etc.).');
                passed = false; continue;
            }
            //For the male, black eyebrows should match with a black beard and a fire eyebrowwith a fire beard
            if (_gender == 'Male')
                if (itemsArray[15] != '')
                    if (itemsArray[7].includes('Black')) {
                        if (!itemsArray[15].includes('Black')) {
                            console.log('For the male, black eyebrows should match with a black beard and a fire eyebrowwith a fire beard');
                            passed = false; continue;
                        }
                    }
            // console.log(itemsArray[7] )
            if (_gender == 'Male')
                if (itemsArray[15] != '')
                    if (itemsArray[7].includes('Fire')) {
                        if (!itemsArray[15].includes('Fire')) {
                            console.log('For the male, black eyebrows should match with a black beard and a fire eyebrowwith a fire beard');
                            passed = false; continue;
                        }
                    }
            // console.log('passed = ' + gender_ind)
            //OG(Red) trait should be rare (say 10% of each Sex, making it 10% overall)
            // if(itemsArray[15] != '')
            if (itemsArray[2].includes('OG')) {
                if (rarity(og_bodys[_gender] + 1) > 11) {
                    console.log('OG(Red) trait should be rare (say 10% of each Sex, making it 10% overall)');
                    passed = false; continue;
                }
            }
            // if(itemsArray[15] != '')
            // if (gender_ind % 3 == 0 && gender_ind>total_count/2)
            //     if (rarity(og_bodys[_gender] + 1) < 9) {
            //         if (!itemsArray[2].includes('OG')) {
            //             console.log('OG(Red) trait should be rare (say 10% of each Sex, making it 10% overall)');
            //             passed = false; continue;
            //         }
            //     }
            //Fire body ultra-rare (maybe 1% or less)
            if (itemsArray[2].includes('Fire')) {
                if (rarity(fire_bodys[_gender] + 1) > 2) {
                    console.log('Fire body ultra-rare (maybe 1% or less)');
                    passed = false; continue;
                }
            }
            //Crown Halo should be rare (5% or less)
            if (itemsArray[14].includes('Crown')) {
                if (rarity(crownhalo + 1) > 5) {
                    console.log('Crown Halo should be rare (5% or less)')
                    passed = false; continue;
                }
            }
            //DD Logo tattoo should be rare (5% or less)
            if (itemsArray[12].includes('DD')) {
                if (rarity(dd_tatto + 1) > 5) {
                    console.log('DD Logo tattoo should be rare (5% or less)')
                    passed = false; continue;
                }
            }
            //Laser eye trait should be rare, say 1-2%?
            if (itemsArray[4].includes('Laser')) {
                if (rarity(laser_eyes + 1) > 2) {
                    console.log('Laser eye trait should be rare, say 1-2%?')
                    passed = false; continue;
                }
            }
            //Fire eye trait as well, about 3-5%
            if (itemsArray[4].includes('Fire')) {
                if (rarity(fire_eyes + 1) > 2) {
                    console.log('Fire eye trait as well, about 3-5%')
                    passed = false; continue;
                }
            }
            //forbid fire body with fire bright background
            // if(itemsArray[2].includes("Fire")){
            //     if(itemsArray[0].includes("Bright")){
            //         passed = false; continue;
            //     }
            // }
            //when broken front horn, no backhorn
            if (itemsArray[6].includes('roken')) {
                item[1] = '';
            }
            if (itemsArray[6].includes('ull')) {
                if (itemsArray[1].includes('roken')) {
                    passed = false; continue;
                }
            }
            //front and back horn color match
            if (itemsArray[6].includes('old') != itemsArray[1].includes('old')) {
                console.log('Front and backhorn color should match');
                passed = false; continue;
            }
            if (itemsArray[6].includes('one') != itemsArray[1].includes('one')) {
                console.log('Front and backhorn color should match');
                passed = false; continue;
            }
            //bald hair not match with og skin
            if (itemsArray[3].includes('ald') && itemsArray[2].includes('OG')) {
                console.log('bald hair not match with og skin');
                passed = false; continue;
            }
            //bald hair should match with bald body
            if ((itemsArray[3].includes('ald') && !itemsArray[2].includes('ald')) || (!itemsArray[3].includes('ald') && itemsArray[2].includes('ald'))) {
                console.log('bald hair should match with bald body');
                passed = false; continue;
            }
            //VR Goggles should be rare (1% or less)
            if (itemsArray[9].includes('VR')) {
                if (rarity(vr_eyes + 1) > 2) {
                    console.log('VR Goggles should be rare (1% or less)')
                    passed = false; continue;
                }
            }
            //compulsory only
            if (folders.length !== compulsory_count[_gender]) {
                if (rarity(compusory_only_count[_gender]) < 9) {
                    console.log('compulsory at least 10%')
                    passed = false; continue;
                }

            } else {
                if (rarity(compusory_only_count[_gender]) > 10) {
                    console.log('compulsory should be 10%')
                    passed = false; continue;
                }
            }
            //check final double mint
            if (fullfilenamearraynonline.indexOf(fullnamenonline) > -1) {
                console.log('doubled');
                passed = false;
                continue;
            }
            passed = true;

            fullfilenamearraynonline.push(fullnamenonline);
            file_name_array.push(item);
            //add gender array
            each_gender_array[_gender].push(gender_ind);
            //plus og bodys
            if (itemsArray[2].includes('OG')) {
                og_bodys[_gender]++;
                og_bodys_array[_gender].push(gender_ind);
            }
            //plus fire bodys
            if (itemsArray[2].includes('Fire')) {
                fire_bodys_array[_gender].push(gender_ind);
                fire_bodys[_gender]++
            }
            //plus crown halo
            if (itemsArray[14].includes('Crown')) {
                crownhalo++;
                crownhalo_array.push(gender_ind);
            }
            //plus DD tatto
            if (itemsArray[12].includes('DD')) {
                dd_tatto++;
                dd_tatto_array.push(gender_ind);
            }
            //plus laser eye
            if (itemsArray[4].includes('Laser')) {
                laser_eyes++;
                laser_eyes_array.push(gender_ind);
            }
            //plus fire eye
            if (itemsArray[4].includes('Fire')) {
                fire_eyes++;
                fire_eyes_array.push(gender_ind);
            }
            //plus vr eye
            if (itemsArray[9].includes('VR')) {
                vr_eyes++;
                vr_eyes_array.push(gender_ind);
            }
            //add compulsory only count
            if (folders.length === compulsory_count[_gender]) {
                compusory_only_count[_gender]++;
                compulsory_only_count_array[_gender].push(gender_ind);
            }
            gender_count[_gender]++;
        }

    })
    console.log(file_name_code_array)
    let total_array = [];
    file_name_array.map((files, index1) => {
        fs.writeFile('img/output_name/' + index1.toString(), JSON.stringify(files), function (err) {

        });
    })
    for (var i = 0; i < file_name_array.length; i++) {
        total_array.push(i);
    }
    fs.writeFile('img/total', JSON.stringify(total_array), function (err) {

    });
    file_name_array.map((files, ind0) => {
        fs.writeFile('img/output_name/' + ind0.toString(), JSON.stringify(files), function (err) {
        });
    })
    // file_name_array.map((files, ind0) => {
       
    //     let image = images(files[0]);
        
    //     files.map((file, ind) => {
    //         if (ind > 0 && file != '') {
    //             image = image.draw(images(file), 0, 0);
    //             if (ind == files.length - 1) {
    //                 var __fname = 'img/output/' + ind0 + '.png';
    //                 image.save(__fname);
    //                 console.log('file creating = ' + ind0)
    //             }
    //         }
    //     })
    // })
    console.log('--------------anylitics result---------------');
    console.log('total character counts = ', total_count);
    console.log("-----------------------------------------");
    console.log('each gender count = ' + gender_count[0] + ' , ' + gender_count[1] + ' , ' + gender_count[2])
    logArray(genders[0], each_gender_array[0]);
    logArray(genders[1], each_gender_array[1]);
    logArray(genders[2], each_gender_array[2]);
    console.log("-----------------------------------------");
    console.log('og body rarity per sex = ' + rarity(og_bodys[0]) + ' % , ' + rarity(og_bodys[1]) + ' % , ' + rarity(og_bodys[2]) + " %")
    logArray('OG body in' + genders[0], og_bodys_array[0]);
    logArray('OG body in' + genders[1], og_bodys_array[1]);
    logArray('OG body in' + genders[2], og_bodys_array[2]);
    console.log("-----------------------------------------");
    console.log('fire body rarity per sex = ' + rarity(fire_bodys[0]) + ' % , ' + rarity(fire_bodys[1]) + ' % , ' + rarity(fire_bodys[2]) + " %")
    logArray('fire body in' + genders[0], fire_bodys_array[0]);
    logArray('fire body in' + genders[1], fire_bodys_array[1]);
    logArray('fire body in' + genders[2], fire_bodys_array[2]);
    console.log("-----------------------------------------");
    console.log('crown halo rarity is ' + rarity(crownhalo) + " %");
    logArray('crown halo', crownhalo_array);
    console.log("-----------------------------------------");
    console.log('dd tatto rarity = ' + rarity(dd_tatto) + " %");
    logArray('dd tatto', crownhalo_array);
    console.log("-----------------------------------------");
    console.log('compulsory only rarity per sex = ' + rarity(compusory_only_count[0]) + ' % , ' + rarity(compusory_only_count[1]) + ' % , ' + rarity(compusory_only_count[2]) + " %");
    logArray('compulsory only in' + genders[0], compulsory_only_count_array[0]);
    logArray('compulsory only in' + genders[1], compulsory_only_count_array[1]);
    logArray('compulsory only in' + genders[2], compulsory_only_count_array[2]);
    console.log("-----------------------------------------");
    console.log('laser eye rarity = ' + rarity(laser_eyes) + " %");
    logArray('laser eye', laser_eyes_array);
    console.log("-----------------------------------------");
    console.log('fire eyes rarity = ' + rarity(fire_eyes) + " %");
    logArray('fire eyes', fire_eyes_array);
    console.log("-----------------------------------------");
    console.log('VR eyes rarity = ' + rarity(vr_eyes) + " %");
    logArray('VR eyes', vr_eyes_array);
    console.log("-----------------------------------------");
    file_name_array.map((files, ind0) => {
       
        let image = images(files[0]);
        
        files.map((file, ind) => {
            if (ind > 0 && file != '') {
                let _image = images(file);
                
                image = image.draw(_image, 0, 0);
                _image = null;
                // images.gc();

                if (ind == files.length - 1) {
                    var __fname = 'img/output/' + ind0 + '.png';
                    image.save(__fname);
                    // image.gc();
                    image = null;
                    console.log('file creating = ' + ind0)
                }
            }
        })

    })
    // images("img/blank.png").draw(images("img/Fire (Bright).png"), 10, 10).draw(images("img/Mystique.png"), 10, 10).save("img/output.png");
    res.send('image generation completed')
}
