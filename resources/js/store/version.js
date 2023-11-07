import Vue from "vue";
export default {

    state: {
        version: null,
    },

    getters: {
        getVersion: (state) => state.version,
    },

    mutations: {
        SET_VERSION(state, version) {
            state.version = version;
        },
    },

    actions: {
        setVersion({ commit }, version) {
            commit('SET_VERSION', version);
        },
    },
};
