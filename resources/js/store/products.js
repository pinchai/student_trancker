import Vue from "vue";
export default {

    state: {
        products: [],
    },

    getters: {
        getProducts: (state) => state.products,
    },

    mutations: {
        SET_PRODUCTS(state, products) {
            state.products = products;
        },
    },

    actions: {
        setProducts({ commit }, products) {
            commit('SET_PRODUCTS', products);
        },
    },
};
