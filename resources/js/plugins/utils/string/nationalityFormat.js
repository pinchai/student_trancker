function nationalityFormat(value) {
	if (value == null || value == undefined) return 'other'
	switch (value) {
		case 1:
			return 'cambodian'

		case 2:
			return 'thai'

		default:
			return 'other'
	}
}
export default nationalityFormat
