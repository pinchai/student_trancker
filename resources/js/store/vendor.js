import Vue from "vue";
export default {

    state: {
        vendor: [],
    },

    getters: {
        getVendor: (state) => state.vendor,
    },

    mutations: {
        SET_VENDOR(state, vendor) {
            state.vendor = vendor;
        },
    },

    actions: {
        setVendor({ commit }, vendor) {
            commit('SET_VENDOR', vendor);
        },
    },
};
