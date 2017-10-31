const express = require('express')
const router = express.Router()
const rp = require('request-promise')
const URL = require(__base + 'config.json').sensorthings.url
const func = require(__base + 'modules/kit/function')

router.get('/all', (req, res) => {
	res.send('all kit')
})

router.get('/:id', (req, res) => {
	res.send('get kit by id')
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