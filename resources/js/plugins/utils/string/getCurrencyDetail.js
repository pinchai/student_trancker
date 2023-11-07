
function getCurrencyDetial(currency_list, currency_id) {
    return currency_list.find(obj=>{
        return obj.id == currency_id
    })
}

export default getCurrencyDetial
