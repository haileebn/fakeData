const rp = require('request-promise')
//const URL = require(__base + 'config.json').sensorthings.url
const URL = require('./../../config.json').sensorthings.url

module.exports = {
	postKit,
	updateKit,
	deleteKit
}

value = {
	"KitID": 2,
	"Name": "Fimo 518",
	"Location": [21.038189,105.7827482]
}
postKit(value)
	.then( v => {
		console.log(v)
	}).catch( e => {
		console.log(e)
	})

function postKit(value) {
	let {KitID, Name, Location} = value
	if(!KitID || !Name || !Location) return Promise.reject("Missing property")
	let options = {
		url: `${URL}/Things`,
		body: {
			name: `FAirKit_${toDigits(KitID, 7)}`,
			description: `${Name}`,
			/*properties: {
				id: KitID
			},*/
			Locations: [{
				name: Name,
				description: `Location for FAirKit ${KitID}`,
				encodingType: 'application/vnd.geo+json',
				location: {
					type: 'Point',
					coordinates: Location
				}
			}]
		},
		json: true
	}
	return rp.post(options)
}

function updateKit(KitID, value) {
	let p = getThingId(KitID)
	p = p.then( thingId => {
		let options = {
			url: `${URL}/Things(${thingId})`,
			body: {},
			json: true
		}
	})
	return p
}

function deleteKit(KitID) {
	let p = getThingId(KitID)
		.then( thingId => {
			return rp.delete(`${URL}/Things(${thingId})`)
		})
	return p
}

// convert 123 to '0000123'
function toDigits(value, option = 7) {
	let arr = new Array(option)
	arr.fill('0')
	let result = arr.join('') + value
	result = result.slice(-option)
	return result
}

function getThingId(KitID) {
	let name = 'FAirKit_' + toDigits(KitID, 7)
	let p = rp(`${URL}/Things?$filter=name eq '${name}'&$count=false&$select=id`)
		.then( body => {
			let temp = JSON.parse(body)
			temp = temp.value
			let id = temp[0]['@iot.id']
			return id
		})
	return p
}
