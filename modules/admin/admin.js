module.exports = {
	find
}

function find(db) {
	return db.collection('admin').find().toArray()
}