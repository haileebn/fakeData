const express = require('express')
const router = express.Router()
const rp = require('request-promise')
const URL = require(__base + 'config.json').sensorthings.url
const func = require(__base + 'modules/kit/function')

const bounds= "21.53484700204879,108.29704284667969,21.80285818527671,108.62113952636719";
const generateKit = "http://118.70.72.15:2223/kit/generate";
const updateKit = "http://118.70.72.15:2223/kit/";
const urlAllKit = `http://118.70.72.15:2223/kit/all`;
const hostting = `http://118.70.72.15:2223`;

const optionsLastRecord = function (x) {
    return {
        method: 'GET',
        uri: `https://api.waqi.info/api/widget/@${x}/widget.v1.json`,
        headers: {
            'content-type': 'application/json; charset=utf-8', // Is set automatically
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
        },
        json: true // Automatically parses the JSON string in the response
    }
};

const optionsAllKit = {
    method: 'GET',
    uri: urlAllKit,
    headers: {
        'content-type': 'application/json; charset=utf-8', // Is set automatically
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
    },
    json: true // Automatically parses the JSON string in the response
};


const optionsGenerateKit = {
    method: 'POST',
    uri: generateKit,
    headers: {
        'content-type': 'application/json; charset=utf-8', // Is set automatically
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
    },
    // json: true // Automatically parses the JSON string in the response
};

const optionsUpdateKit = function (kitID, data) {
    // console.log(data);
    return {
        method: 'PUT',
        uri: `http://118.70.72.15:2223/kit/${kitID}`,
        body: data,
        headers: {
            'content-type': 'application/json; charset=utf-8', // Is set automatically
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
        },
        json: true // Automatically parses the JSON string in the response
    };
};

const optionsLastOneKit = function (kitid) {
    return {
        method: 'GET',
        uri: `${hostting}/kit/${kitid}`,
        headers: {
            'content-type': 'application/json; charset=utf-8', // Is set automatically
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
        },
        json: true // Automatically parses the JSON string in the response
    };
};

router.get('/all', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    let data= [];
    rp(optionsAllKit)
        .then( result => {
            data.push(result[4]);
            data.push(result[8]);
            data.push(result[70]);
            data.push(result[90]);
            data.push(result[19]);
                let temp2 = [];
                result.forEach((r, i) => {
                    if (r.Data !== undefined)
                        temp2.push(r);
                    if(i === result.length - 1)
                        res.send(temp2);
                });
    });
    // const data = [
    //     {
    //         "KitID": "FAirKit_000001",
    //         "Name": "Fimo 518",
    //         "Location": [21.038189,105.7827482],
    //         "PM2.5": getRandomInt(40, 500),
    //         "CreatedTime": 1508383622
    //     },
    //     {
    //         "KitID": "FAirKit_000002",
    //         "Name": "Fimo 408",
    //         "Location": [21.038189,105.7837482],
    //         "PM2.5": getRandomInt(40, 100),
    //         "CreatedTime": 1508383620
    //     },
    // ];
	// res.send({data});
})

router.get('/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const id = Number(req.params.id);
    rp(optionsLastOneKit(id))
        .then( result => {

            // let temp2 = [];
            // result.forEach((r, i) => {
            //     if (r.Data !== undefined)
            //         temp2.push(r);
            //     if(i === result.length - 1)
            res.send(result);
            // });
        });
})

module.exports = router
//
function fakeRecordOneKit(name) {
    let PM = getRandomInt(40, 500),
        temp = getRandomInt(20, 40),
        hud = getRandomInt(40, 80);
    let obj = {
        KitID:  name,
        data: {
            'PM2.5': PM,
            'temp': temp,
            'hud': hud,
        }
    };
    return obj;
}

function getRandomInt(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
function toDigits(value, option) {
    let result = String(value)
    while(result.length < option) result = '0' + result
    return result
}