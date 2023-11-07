function payBy(value) {
	if (value == null || value == undefined) return 'Other'
	switch (value) {
		case 0:
			return 'amount'
			break
		case 1:
			return 'percentage'
			break
		default:
			return 'other'
			break
	}
}
export default payBy
