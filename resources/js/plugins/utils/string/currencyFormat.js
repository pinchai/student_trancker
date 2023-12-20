import Cookies from 'js-cookie'
function currencyFormat(value) {
  let decimal_part = Cookies.get('decimal_part') == undefined ? 1 : Cookies.get('decimal_part')
  return (parseFloat(value)).toFixed(decimal_part).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

export default currencyFormat
