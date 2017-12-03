const express = require('express');
const router = express.Router();
const rp = require('request-promise');
const bodyParser = require('body-parser');


const hostting = `http://118.70.72.15:2223`;

const optionsDataInDay = function (data) {
	return {
        method: 'POST',
        uri: `${hostting}/data/analysis/day`,
        body: data,
        headers: {
            'content-type': 'application/json; charset=utf-8', // Is set automatically
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
        },
        json: true // Automatically parses the JSON string in the response
    };
};

const optionsDataInWeek = function (data) {
    return {
        method: 'POST',
        uri: `${hostting}/data/analysis/week`,
        body: data,
        headers: {
            'content-type': 'application/json; charset=utf-8', // Is set automatically
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
        },
        json: true // Automatically parses the JSON string in the response
    };
};

router.get('/', (req, res) => {
	res.send('DATA HOME')
})

router.post('/analysis/day', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
	const data = req.body;
	data.KitID = Number(data.KitID);
	data.TimeZone = Number(data.TimeZone);
	data.StartHour = Number(data.StartHour);
	console.log(data, typeof data);
    rp(optionsDataInDay(data))
        .then( result => {

            // let temp2 = [];
            // result.forEach((r, i) => {
            //     if (r.Data !== undefined)
            //         temp2.push(r);
            //     if(i === result.length - 1)
                    res.send(result);
            // });
        });
});

router.post('/analysis/week', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const data = req.body;
    data.KitID = Number(data.KitID);
    data.TimeZone = Number(data.TimeZone);
    console.log(data, typeof data);
    rp(optionsDataInWeek(data))
        .then( result => {

            // let temp2 = [];
            // result.forEach((r, i) => {
            //     if (r.Data !== undefined)
            //         temp2.push(r);
            //     if(i === result.length - 1)
            res.send(result);
            // });
        });
});

module.exports = router