import Vue from "vue";
export default {

    state: {
        warehouse: [],
    },

    getters: {
        getWarehouse: (state) => state.warehouse,
    },

    mutations: {
        SET_WAREHOUSE(state, warehouse) {
            state.warehouse = warehouse;
        },
    },

    actions: {
        setWarehouse({ commit }, warehouse) {
            commit('SET_WAREHOUSE', warehouse);
        },
    },
};
