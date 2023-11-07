/**
 * Get name by local
 * @param {*} value
 * @param {*} local
 */
function jsonDecode(value, key) {
	if (value != '' && value != null) {
		try {
			value = JSON.parse(value)
			if (Object.entries(value).length == 0) {
				return value
			} else {
				if (key != '' && key != null) {
					return value[key]
				} else {
					return value
				}
			}
		} catch (e) {
			return value
		}
	} else {
		return null
	}
}

export default jsonDecode
