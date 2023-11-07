import Vue from "vue";
export default {
    state:{
        create: 1,
        update: 2,
        delete: 3,
        view: 4,
        DEV: 1,
        SUPER_USER: 2,
        USER: 3,
        CASHIER: 4,
    },

    getters: {
        getCreatePermission: (state) => state.create,
        getUpdatePermission: (state) => state.update,
        getDeletePermission: (state) => state.delete,
        getViewPermission: (state) => state.view,
        DEVELOPER: (state) => state.DEV,
        SUPER_USER: (state) => state.SUPER_USER,
    },

    mutations: {},

    actions: {}
}
