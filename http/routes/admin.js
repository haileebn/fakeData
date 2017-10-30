const express = require('express');
const router = express.Router();

const admin = require(__base + '/modules/admin/admin')

router.get('/', (req, res) => {
	const db = req.app.locals.db;
	admin.find(db).then( result => res.send(result))
})

router.post('/', (req, res) => {
	console.log(req.body)
	res.send(req.body)
})

module.exports = router