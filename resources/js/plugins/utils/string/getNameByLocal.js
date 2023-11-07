/**
 * Get name by local
 * @param {*} name
 * @param {*} local
 */
function getNameByLocal(name, local = 'local_name') {
	if (name != '' && name != null) {
		try {
			name = JSON.parse(name)
			if (local == 'local_name') {
				return name.local_name
			} else {
				return name.latin_name
			}
		} catch (e) {
			return name
		}
	} else {
		return null
	}
}

export default getNameByLocal
