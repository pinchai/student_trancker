import Vue from "vue";
import store from "./index";
export default {
    state: {
        userAuth: null,
        clockIn: null,
        rolePermission: [],
        authLevel: null
    },

    getters: {
        userAuth: state => state.userAuth,
        clockIn: state => state.clockIn,
        rolePermission: state => state.rolePermission,
        authLevel: state => state.authLevel
    },

    mutations: {
        SetUserAuth(state, userAuth) {
            state.userAuth = userAuth;
        },
        SetClockIn(state, clockIn) {
            state.clockIn = clockIn;
        },

        SetRolePermission(state, rolePermission) {
            state.rolePermission = rolePermission;
        },
        SetAuthLevel(state, authLevel) {
            state.authLevel = authLevel;
        }
    },

    actions: {
        fetchUserPermissionData({ commit }) {
            axios
                .post("/user/getUserPermissionData", { loading: false })
                .then(response => {
                    commit("SetUserAuth", response.data.data.user);
                    commit("SetClockIn", response.data.data.clock_in);
                    commit("SetRolePermission", response.data.data.role_permission);
                    commit("SetAuthLevel", response.data.data.auth_level);
                });
        },
        updateUserAuth({ commit }, user) {
            commit("SetUserAuth", user);
        }
    }
};
