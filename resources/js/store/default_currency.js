import Vue from "vue";
export default {

    state: {
        default_currency: [],
    },

    getters: {
        getDefaultCurrency: (state) => state.default_currency,
    },

    mutations: {
        SET_DEFAULT_CURRENCY(state, default_currency) {
            state.default_currency = default_currency;
        },
    },

    actions: {
        setDefaultCurrency({ commit }, default_currency) {
            commit('SET_DEFAULT_CURRENCY', default_currency);
        },
    },
};
