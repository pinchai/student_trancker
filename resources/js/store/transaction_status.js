import Vue from "vue";
export default {

    state: {
        transaction_status: [],
    },

    getters: {
        getTransactionStatus: (state) => state.transaction_status,
    },

    mutations: {
        SET_TRANSACTION_STATUS(state, transaction_status) {
            state.transaction_status = transaction_status;
        },
    },

    actions: {
        setTransactionStatus({ commit }, transaction_status) {
            commit('SET_TRANSACTION_STATUS', transaction_status);
        },
    },
};
