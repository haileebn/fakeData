const RP = require('request-promise')
//const URL = require(__base + 'config.json').sensorthings.url
const URL = require('./../../config.json').sensorthings.url

module.exports = {
	insertKit,
	updateKit,
	deleteKit
}

let obj = {
	"KitID": 13,
	"Name": "Fimo 518",
	"Location": [21.038189,105.7827482]
}
/*insertKit(RP, URL, obj)
	.then( v => {
		console.log(v)
	}).catch( e => {
		console.log(e)
	})*/

function insertKit(rp, url, obj) {
	let {KitID, Name, Location} = obj
	if(!KitID || !Name || !Location) return Promise.reject("Missing property")
	let value = {
		name: `FAirKit_${toDigits(KitID, 7)}`,
		description: `FAirKit ${KitID} . ${Name}`,
		Locations: [{
			name: Name,
			description: `Location for FAirKit ${KitID}`,
			encodingType: 'application/vnd.geo+json',
			location: {
				type: 'Point',
				coordinates: Location
			}
		}]
	}
	return insertThing(rp, url, value)
}

function insertThing(rp, url, value) {
	let option = {
		url: `${url}/Things`,
		body: value,
		json: true
	}
	return rp.post(option)
}

function updateKit(rp, url, KitID, obj) {
	let p = getThingIDByKitID(rp, url, KitID)
		.then( thingID => {
			let value = {}
			return updateThing(rp, url, thingID, value)
		})
	return p
}

function updateThing(rp, url, thingID, value) {
	let option = {
		url: `${url}/Things(${thingID})`,
		body: value,
		json: true
	}
	return rp.patch(option)
}

/*deleteKit(RP, URL, 10)
	.then( v => {
		console.log(v)
	}).catch( e => {
		console.log(e)
	})*/
function deleteKit(rp, url, KitID) {
	let p = getThingIDByKitID(rp, url, KitID)
		.then( thingID => {
			return deleteThing(rp, url, thingID)
		})
	return p
}

function deleteThing(rp, url, thingID) {
	return rp.delete(`${url}/Things(${thingID})`)
}

// convert 123 to '00...00123'
function toDigits(value, option) {
	let result = String(value)
	while(result.length < option) result = '0' + result
	return result
}

function getThingIDByKitID(rp, url, KitID) {
	let name = 'FAirKit_' + toDigits(KitID, 7)
	let p = rp.get(`${url}/Things?$filter=name eq '${name}'&$count=false&$select=id`)
		.then( body => {
			let temp = JSON.parse(body)
			temp = temp.value
			if(!temp[0]) throw `This kit with id = ${KitID} does not exist` //This KitID not exist
			let thingID = temp[0]['@iot.id']
			return thingID
		})
	return p
}
