import Vue from "vue";
export default {

    state: {
        agency: [],
    },

    getters: {
        getAgency: (state) => state.agency,
    },

    mutations: {
        SET_AGENCY(state, agency) {
            state.agency = agency;
        },
    },

    actions: {
        setAgency({ commit }, agency) {
            commit('SET_AGENCY', agency);
        },
    },
};
