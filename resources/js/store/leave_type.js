import Vue from "vue";
export default {

    state: {
        leave_type: [],
    },

    getters: {
        getLeaveType: (state) => state.leave_type,
    },

    mutations: {
        SET_LEAVE_TYPE(state, leave_type) {
            state.leave_type = leave_type;
        },
    },

    actions: {
        setLeaveType({ commit }, leave_type) {
            commit('SET_LEAVE_TYPE', leave_type);
        },
    },
};
