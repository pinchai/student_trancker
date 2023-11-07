import Vue from 'vue'
import util from './util/index'
import * as stringFilters from './string/index'

var Vue2Filters = {
	install: function(Vue) {
		util.each(stringFilters, function(value, key) {
			Vue.filter(key, value)
		})

		Vue.prototype.$helpers = stringFilters
	}
}

Vue.use(Vue2Filters)

if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(Vue2Filters)
}
