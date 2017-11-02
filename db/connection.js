/**
 * Khởi tạo kết nối tới mongodb
 * @param {String} host
 * @param {Number} port
 * @param {String} username
 * @param {String} password
 * @return {Object} connection
 */
function initDatabase(host = `localhost`, port = 27017, username = ``, password = ``){
	const mongodb = require('mongodb')
	const MongoClient = mongodb.MongoClient
	let db_url = `mongodb://${username}:${password}`
	db_url += `@${host}:${port}/mydb`
	// return MongoClient.connect(db_url)
    return MongoClient.connect("mongodb://localhost:27017/fairserver")

}


module.exports = initDatabase;