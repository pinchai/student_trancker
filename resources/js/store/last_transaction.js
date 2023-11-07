import Vue from "vue";
export default {

    state: {
        last_transaction: [],
    },

    getters: {
        getLastTransaction: (state) => state.last_transaction,
    },

    mutations: {
        SET_LAST_TRANSACTION(state, last_transaction) {
            state.last_transaction = last_transaction;
        },
    },

    actions: {
        setLastTransaction({ commit }, last_transaction) {
            commit('SET_LAST_TRANSACTION', last_transaction);
        },
    },
};
