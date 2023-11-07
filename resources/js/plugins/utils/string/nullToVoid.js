function nullToVoid(value, str = '') {
	if (
		value == null ||
		value == '' ||
		typeof value == undefined ||
		typeof value == 'undefined' ||
		value == 'null' ||
		value == undefined ||
		value == 'undefined'
	) {
		return str
	} else {
		return value
	}
}

export default nullToVoid
