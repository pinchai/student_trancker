import Vue from "vue";
export default {

    state: {
        delivery: [],
    },

    getters: {
        getDelivery: (state) => state.delivery,
    },

    mutations: {
        SET_DELIVERY(state, delivery) {
            state.delivery = delivery;
        },
    },

    actions: {
        setDelivery({ commit }, delivery) {
            commit('SET_DELIVERY', delivery);
        },
    },
};
