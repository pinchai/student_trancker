import Vue from "vue";
export default {

    state: {
        dealer: [],
    },

    getters: {
        getDealer: (state) => state.dealer,
    },

    mutations: {
        SET_DEALER(state, dealer) {
            state.dealer = dealer;
        },
    },

    actions: {
        setDealer({ commit }, dealer) {
            commit('SET_DEALER', dealer);
        },
    },
};
