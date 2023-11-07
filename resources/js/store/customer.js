import Vue from "vue";
export default {

    state: {
        customer: [],
    },

    getters: {
        getCustomer: (state) => state.customer,
    },

    mutations: {
        SET_CUSTOMER(state, customer) {
            state.customer = customer;
        },
    },

    actions: {
        setCustomer({ commit }, customer) {
            commit('SET_CUSTOMER', customer);
        },
    },
};
