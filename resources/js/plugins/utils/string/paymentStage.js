function paymentStage(value) {
	if (value == null || value == undefined) return 'Other'
	switch (value) {
		case 1:
			return 'deposit'
		case 2:
			return 'extra_payment'
		case 3:
			return 'installment'
		case 4:
			return 'repayment'
		case 5:
			return 'pay_dynamic'
		case 6:
			return 'done'
		default:
			return 'Other'
	}
}
export default paymentStage
