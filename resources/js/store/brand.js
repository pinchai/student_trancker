import Vue from "vue";
export default {

    state: {
        brand: [],
    },

    getters: {
        getBrand: (state) => state.brand,
    },

    mutations: {
        SET_BRAND(state, brand) {
            state.brand = brand;
        },
    },

    actions: {
        setBrand({ commit }, brand) {
            commit('SET_BRAND', brand);
        },
    },
};
