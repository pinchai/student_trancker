import Vue from "vue";
export default {

    state: {
        bank: [],
    },

    getters: {
        getBank: (state) => state.bank,
    },

    mutations: {
        SET_BANK(state, bank) {
            state.bank = bank;
        },
    },

    actions: {
        setBank({ commit }, bank) {
            commit('SET_BANK', bank);
        },
    },
};
