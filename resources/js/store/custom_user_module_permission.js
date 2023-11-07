import Vue from "vue";
export default {

    state: {
        custom_user_module_permission: [],
    },

    getters: {
        getCustomUserModulePermission: (state) => state.custom_user_module_permission,
    },

    mutations: {
        SET_CUSTOM_USER_MODULE_PERMISSION(state, custom_user_module_permission) {
            state.custom_user_module_permission = custom_user_module_permission;
        },
    },

    actions: {
        setCustomUserModulePermission({ commit }, custom_user_module_permission) {
            commit('SET_CUSTOM_USER_MODULE_PERMISSION', custom_user_module_permission);
        },
    },
};
