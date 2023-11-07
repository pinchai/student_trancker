import Vue from "vue";
export default {

    state: {
        tag: [],
    },

    getters: {
        getTag: (state) => state.tag,
    },

    mutations: {
        SET_TAG(state, tag) {
            state.tag = tag;
        },
    },

    actions: {
        setTag({ commit }, tag) {
            commit('SET_TAG', tag);
        },
    },
};
