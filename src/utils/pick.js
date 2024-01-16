const pick = (object, keys) => {
	if (typeof object !== 'object' || object === null) {
		throw new TypeError('Expected an object as the first argument')
	}

	if (!Array.isArray(keys)) {
		throw new TypeError('Expected an array as the second argument')
	}

	return keys.reduce((obj, key) => {
		if (Object.prototype.hasOwnProperty.call(object, key)) {
			obj[key] = object[key]
		}
		return obj
	}, {})
}

export default pick
