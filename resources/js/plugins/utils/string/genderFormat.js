function genderFormat(value) {
	if (value == null || value == undefined) return 'other'
	switch (value) {
		case 1:
			return 'male'
			break
		case 2:
			return 'female'
			break
		default:
			return 'other'
			break
	}
}
export default genderFormat
