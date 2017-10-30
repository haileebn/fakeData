const express = require('express');
const router = express.Router();

router.get('/all', (req, res) => {
	res.send('all kit')
})

router.get('/:id', (req, res) => {
	res.send('get kit by id')
})

router.post('/', (req, res) => {
	let body = req.body
	res.send('insert kit ')
})

router.put('/:id', (req, res) => {
	res.send('update kit ')
})

router.delete('/:id', (req, res) => {
	let id = req.params.id
	res.send('delete kit ')
})

module.exports = router