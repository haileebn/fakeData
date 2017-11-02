const express = require('express')
const router = express.Router()
const rp = require('request-promise')
const URL = require(__base + 'config.json').sensorthings.url
const func = require(__base + 'modules/kit/function')

router.get('/all', (req, res) => {
   //  res.setHeader("Access-Control-Allow-Origin", "*");
   //  const data = [
   //      {
   //          "KitID": "FAirKit_000001",
   //          "Name": "Fimo 518",
   //          "Location": [21.038189,105.7827482],
   //          "PM25": getRandomInt(40, 100),
   //          "CreatedTime": 1508383622
   //      },
   //      {
   //          "KitID": "FAirKit_000002",
   //          "Name": "Fimo 408",
   //          "Location": [21.038189,105.7837482],
   //          "PM25": getRandomInt(40, 100),
   //          "CreatedTime": 1508383620
   //      },
   //  ];
	res.send("all analysis");
})

router.get('/day/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
	res.send(fakeAnalysisOneKitInDay(req.params.id))
});
router.get('/week/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
	res.send(fakeAnalysisOneKitInWeek(req.params.id))
});

// router.post('/', (req, res) => {
// 	let body = req.body
// 	func.insertKit(rp, URL, body)
// 		.then( v => {
// 			console.log(v)
// 			res.send({error: false})
// 		}).catch( e => {
// 			console.log(e)
// 			res.send({error: true})
// 		})
// })
//
// router.put('/:id', (req, res) => {
// 	let KitID = req.params.id 
// 	let obj = req.body
// 	res.send('update kit ')
// })
//
// router.delete('/:id', (req, res) => {
// 	let KitID = req.params.id
// 	func.deleteKit(rp, URL, KitID)
// 		.then( v => {
// 			console.log(v)
// 			res.send({error: false})
// 		}).catch( e => {
// 			console.log(e)
// 			res.send({error: true})
// 		})
// })

module.exports = router
//
function fakeAnalysisOneKitInDay(name) {
    let obj1 = {
        "KitID": "FAirKit_000001",
        "AnalysisType": "Day",
        "Date": "19/10/2017",
        "TimeZone": "7",
        "StartHour": "10",
        "PM2.5": [ 11, 22, 20, 24, 11, 32, 24, 23, 14, 11, 44, 12, 32, 22, 28, 29, 35, 18, 10, 27, 26, 38, 27, 11 ],
        "Temperature": [ 26, 25, 26, 27, 27.5, 26, 25.5, 24, 24, 23, 23, 22, 26, 25, 26, 27, 27.5, 26, 25.5, 24, 24, 23, 23, 45 ],
        "Humidity": [ 12, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 36 ]
    }
    let obj2 = {
        "KitID": "FAirKit_000002",
        "AnalysisType": "Day",
        "Date": "19/10/2017",
        "TimeZone": "7",
        "StartHour": "10",
        "PM2.5": [ 24, 22, 23, 44, 26, 32, 24, 23, 14, 11, 44, 12, 32, 82, 28, 29, 35, 18, 90, 27, 26, 38, 27, 18 ],
        "Temperature": [ 26, 25, 26, 27, 27.5, 26, 25.5, 24, 24, 23, 23, 22, 26, 25, 26, 27, 27.5, 26, 25.5, 24, 24, 23, 23, 22 ],
        "Humidity": [ 12, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92 ]
    }
    if (name === obj1.KitID) return obj1;
    else return obj2
    // return obj;
}
function fakeAnalysisOneKitInWeek(name) {
    let obj1 = {
        "KitID": "FAirKit_000001",
        "AnalysisType": "Week",
        "Date": "19/10/2017",
        "TimeZone": "7",
        "PM2.5": [ 24, 22, 23, 24, 26, 32, 24 ],
        "Temperature": [ 26, 25, 26, 27, 27.5, 26, 25.5 ],
        "Humidity": [ 80, 81, 82, 83, 84, 85, 86 ]
    };
    let obj2 = {
        "KitID": "FAirKit_000002",
        "AnalysisType": "Week",
        "Date": "19/10/2017",
        "TimeZone": "7",
        "PM2.5": [ 15, 25, 12, 21, 12, 32, 12 ],
        "Temperature": [ 5, 28, 11, 16, 27.5, 1, 12 ],
        "Humidity": [ 45, 81, 46, 83, 48, 15, 90 ]
    };
    if (name === obj1.KitID) return obj1;
    else return obj2
    // return obj;
}
function getRandomInt(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}