import Vue from "vue";
export default {

    state: {
        table_size: 30,
    },

    getters: {
        getTableSize: (state) => state.table_size,
    },

    mutations: {
        SET_TABLE_SIZE(state, table_size) {
            state.table_size = table_size;
        },
    },

    actions: {
        setTableSize({ commit }, table_size) {
            commit('SET_TABLE_SIZE', table_size);
        },
    },
};
