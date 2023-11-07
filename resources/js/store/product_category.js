import Vue from "vue";
export default {

    state: {
        product_category: [],
    },

    getters: {
        getProductCategory: (state) => state.product_category,
    },

    mutations: {
        SET_PRODUCT_CATEGORY(state, product_category) {
            state.product_category = product_category;
        },
    },

    actions: {
        setProductCategory({ commit }, product_category) {
            commit('SET_PRODUCT_CATEGORY', product_category);
        },
    },
};
