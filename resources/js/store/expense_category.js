import Vue from "vue";
export default {

    state: {
        expense_category: [],
    },

    getters: {
        getExpenseCategory: (state) => state.expense_category,
    },

    mutations: {
        SET_EXPENSE_CATEGORY(state, expense_category) {
            state.expense_category = expense_category;
        },
    },

    actions: {
        setExpenseCategory({ commit }, expense_category) {
            commit('SET_EXPENSE_CATEGORY', expense_category);
        },
    },
};
