// Dùng express dựng server - FAirServer
// Biến app sẽ được khởi tạo, cài đặt cơ bản, thêm các route rồi export, ko listen tại đây
// Truyền biến db connection vào

const express = require('express');
const bodyParser = require('body-parser')

/**
 * Trả về biến app đã được cấu hình
 * @param {Object} db
 * @return {Object} app
 */

function initServer(db){
	const app = new express();
	const admin = require('./routes/admin')
	const data = require('./routes/data')
	const kit = require('./routes/kit')
	const notification = require('./routes/notification')
	const user = require('./routes/user')

	app.locals.db = db
	app.use(bodyParser.urlencoded({extended: true}))
	app.use(bodyParser.json())
	app.use('/admin', admin)
	app.use('/data', data)
	app.use('/kit', kit)
	app.use('/notification', notification)
	app.use('/user', user)
	
	return app;
}


module.exports = initServer;