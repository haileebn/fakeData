const config = require('./config.json')
const mongodb = config.mongodb
const connection = require('./db/connection')

global.__base = __dirname + '/'

connection(mongodb.host, mongodb.port, mongodb.username, mongodb.password)
	.then( db => {
		const app = require('./http/app')(db)
		const PORT = 3000
		
		app.get('/', (req, res) => {
			res.send('HOME')
		})

		app.post('/', (req, res) => {
			res.send(req.body)
		})

		app.listen(PORT, () => {
			console.log(`Listening on port ${PORT}!`)
		})
	}).catch( error => {
		console.log(error)
	})
