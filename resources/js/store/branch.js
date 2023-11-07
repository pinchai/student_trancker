import Vue from "vue";
export default {

    state: {
        branch: [],
    },

    getters: {
        getBranch: (state) => state.branch,
    },

    mutations: {
        setBranch(state, branch) {
            state.branch = branch;
        },
    },

    actions: {
        fetchBranch({ commit }, branch) {
            commit('setBranch', branch);
        },
    },
};