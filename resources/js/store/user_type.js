import Vue from "vue";
export default {

    state: {
        level: {
            DEV: 10,
            SUPPER_USER: 9,
            USER: 8,
            // CASHIER: 7,
        },
        user_type: [
            { id: 1, type: 'Dev', level: '10' },
            { id: 2, type: 'Super User', level: '9' },
            { id: 3, type: 'User', level: '8' },
            // { id: 4, type: 'Cashier', level: '7' },
        ],
    },

    getters: {
        DEV: (state) => state.level.DEV,
        SUPPER_USER: (state) => state.level.SUPPER_USER,
        USER: (state) => state.level.USER,
        // CASHIER: (state) => state.level.CASHIER,
        level: (state) => state.level,
        getUserType: (state) => state.user_type,
    },

    mutations: {},

    actions: {}
};
