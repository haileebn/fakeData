module.exports = toDigits
// convert 123 to '00...00123'
function toDigits(value, option) {
	let result = String(value)
	while(result.length < option) result = '0' + result
	return result
}