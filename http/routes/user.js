const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.send('USER HOME')
})

module.exports = router