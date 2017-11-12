const express = require('express')
const router = express.Router()
const rp = require('request-promise')
const URL = require(__base + 'config.json').sensorthings.url
const func = require(__base + 'modules/kit/function')



router.get('/all', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const data = [
        {
            "KitID": "FAirKit_000001",
            "Name": "Fimo 518",
            "Location": [21.038189,105.7827482],
            "PM2.5": getRandomInt(40, 500),
            "CreatedTime": 1508383622
        },
        {
            "KitID": "FAirKit_000002",
            "Name": "Fimo 408",
            "Location": [21.038189,105.7837482],
            "PM2.5": getRandomInt(40, 100),
            "CreatedTime": 1508383620
        },
    ];
	res.send({data});
})

router.get('/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
	res.send(fakeRecordOneKit(req.params.id))
})

router.post('/', (req, res) => {
	let body = req.body
	func.insertKit(rp, URL, body)
		.then( v => {
			console.log(v)
			res.send({error: false})
		}).catch( e => {
			console.log(e)
			res.send({error: true})
		})
})

router.put('/:id', (req, res) => {
	let KitID = req.params.id 
	let obj = req.body
	res.send('update kit ')
})

router.delete('/:id', (req, res) => {
	let KitID = req.params.id
	func.deleteKit(rp, URL, KitID)
		.then( v => {
			console.log(v)
			res.send({error: false})
		}).catch( e => {
			console.log(e)
			res.send({error: true})
		})
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