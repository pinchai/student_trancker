/**
 *  format phone number
 *
 * '012942924' => '012-942-924'
 */
function phoneFormat(value, format = ' ') {
	if (value == '' || value == undefined) return ''
	if (value.length == 10) {
		return value.replace(
			/(\d{3})(\d{3})(\d{4})/,
			`$1${format}$2${format}$3`
		)
	} else if (value.length == 9) {
		return value.replace(
			/(\d{3})(\d{3})(\d{3})/,
			`$1${format}$2${format}$3`
		)
	} else {
		return ''
	}
}

export default phoneFormat
