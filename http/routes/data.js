const express = require('express');
const router = express.Router();
const rp = require('request-promise')

const hostting = `http://118.70.72.15:2223`;

const optionsAllKit = function (kitid) {
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

router.get('/', (req, res) => {
	res.send('DATA HOME')
})

router.get('/:id', (req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", "*");
	const id = Number(req.params.id);
    rp(optionsAllKit(id))
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