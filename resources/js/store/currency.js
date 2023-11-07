import Vue from "vue";
export default {

    state: {
        currency: [],
    },

    getters: {
        getCurrency: (state) => state.currency,
    },

    mutations: {
        SET_CURRENCY(state, currency) {
            state.currency = currency;
        },
    },

    actions: {
        setCurrency({ commit }, currency) {
            commit('SET_CURRENCY', currency);
        },
    },
};
