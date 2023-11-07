import Vue from "vue";
export default {

    state: {
        unit: [],
    },

    getters: {
        getUnit: (state) => state.unit,
    },

    mutations: {
        SET_UNIT(state, unit) {
            state.unit = unit;
        },
    },

    actions: {
        setUnit({ commit }, unit) {
            commit('SET_UNIT', unit);
        },
    },
};
