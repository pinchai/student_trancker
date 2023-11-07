function getAddress(data) {
	let address =
		this.$helpers.nullToVoid(data.address) != '' ? data.address + ', ' : ''
	let house_no =
		this.$helpers.nullToVoid(data.house_no) != ''
			? data.house_no + ', '
			: ''
	let village_name =
		this.$helpers.nullToVoid(data.village_name) != ''
			? data.village_name + ', '
			: ''
	let commune_name =
		this.$helpers.nullToVoid(data.commune_name) != ''
			? data.commune_name + ', '
			: ''
	let district_name =
		this.$helpers.nullToVoid(data.district_name) != ''
			? data.district_name + ', '
			: ''
	let province_name =
		this.$helpers.nullToVoid(data.province_name) != ''
			? data.province_name + ', '
			: ''
	let country_name =
		this.$helpers.nullToVoid(data.country_name) != ''
			? data.country_name + ', '
			: ''

	return (
		address +
		house_no +
		village_name +
		commune_name +
		district_name +
		province_name +
		country_name
	)
}

export default getAddress
