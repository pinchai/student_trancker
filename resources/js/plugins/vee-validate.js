import Vue from 'vue'
import VeeValidateKH from '../lang/veeValidation/kh'
import VeeValidateEN from '../lang/veeValidation/en'
import VeeValidate, { Validator } from 'vee-validate'

Vue.use(VeeValidate, {
    errorBagName: 'veeErrors',
    // This is the default
    inject: true,
    // Important to name this something other than 'fields'
    fieldsBagName: 'veeFields',
})

Vue.use(VeeValidate, {
    // This is the default
    inject: true,
    // Important to name this something other than 'fields'
    fieldsBagName: 'veeFields',
    // This is not required but avoids possible naming conflicts
    errorBagName: 'veeErrors'
});

Validator.localize('kh', VeeValidateKH)
Validator.localize('en', VeeValidateEN)
