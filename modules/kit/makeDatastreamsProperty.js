const sensorsID = [1, 2]
// ['DHT22', 'PMS5003']
const toDigits = require('./toDigits')

const observedpropertiesID = [1,2,3,4,5]
// [Temperature, Humidity, PM1.0, PM2.5, PM10]

let d1 = {
	observationType: "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement",
	unitOfMeasurement : {
		"name":"Degree Celsius",
		"symbol":"°C",
		"definition":"http:"
	},
	Sensor: {"@iot.id": sensorsID[0]},
	ObservedProperty: {"@iot.id": observedpropertiesID[0]}
}
let d2 = {
	observationType: "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement",
	unitOfMeasurement : {
		"name":"Percent",
		"symbol":"%",
		"definition":"http:"
	},
	Sensor: {"@iot.id": sensorsID[0]},
	ObservedProperty: {"@iot.id": observedpropertiesID[1]}
}
let d3 = {
	observationType: "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement",
	unitOfMeasurement : {
		"name":"Microgram per cubic meter",
		"symbol":"µg/m³",
		"definition":"http:"
	},
	Sensor: {"@iot.id": sensorsID[1]},
	ObservedProperty: {"@iot.id": observedpropertiesID[2]}
}
let d4 = {
	observationType: "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement",
	unitOfMeasurement : {
		"name":"Microgram per cubic meter",
		"symbol":"µg/m³",
		"definition":"http:"
	},
	Sensor: {"@iot.id": sensorsID[1]},
	ObservedProperty: {"@iot.id": observedpropertiesID[3]}
}
let d5 = {
	observationType: "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement",
	unitOfMeasurement : {
		"name":"Microgram per cubic meter",
		"symbol":"µg/m³",
		"definition":"http:"
	},
	Sensor: {"@iot.id": sensorsID[1]},
	ObservedProperty: {"@iot.id": observedpropertiesID[4]}
}

function makeDatastreamsProperty(KitID) {
	let result = [d1, d2, d3, d4, d5]
	result[0].name = `FAirKit_${toDigits(KitID, 7)}_Temperature`
	result[0].description = `Datastreams for temperature of FAirKit ${KitID}`
	result[1].name = `FAirKit_${toDigits(KitID, 7)}_Humidity`
	result[1].description = `Datastreams for humidity of FAirKit ${KitID}`
	result[2].name = `FAirKit_${toDigits(KitID, 7)}_PM1.0`
	result[2].description = `Datastreams for pm1.0 of FAirKit ${KitID}`
	result[3].name = `FAirKit_${toDigits(KitID, 7)}_PM2.5`
	result[3].description = `Datastreams for pm2.5 of FAirKit ${KitID}`
	result[4].name = `FAirKit_${toDigits(KitID, 7)}_PM10`
	result[4].description = `Datastreams for pm10 of FAirKit ${KitID}`
	return result
}
module.exports = makeDatastreamsProperty