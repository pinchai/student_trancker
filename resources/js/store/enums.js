import Vue from "vue";
export default {

    state: {
        enums: [],
    },

    getters: {
        getEnums: (state) => state.enums,
    },

    mutations: {
        SET_ENUMS(state, enums) {
            state.enums = enums;
        },
    },

    actions: {
        setEnums({ commit }, enums) {
            commit('SET_ENUMS', enums);
        },
    },
};
