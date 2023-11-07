import Vue from "vue";

export default {

  state: {
    users: [],
  },

  getters: {
    getUser: (state) => state.users,
  },

  mutations: {
    SET_USER(state, users) {
      state.users = users;
    },
  },

  actions: {
    setUser({commit}, users) {
      commit('SET_USER', users);
    },
  },
};
