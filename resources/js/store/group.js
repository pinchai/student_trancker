import Vue from "vue";

export default {

  state: {
    group: [],
  },

  getters: {
    getGroup: (state) => state.group,
  },

  mutations: {
    SET_GROUP(state, group) {
      state.group = group;
    },
  },

  actions: {
    setGroup({commit}, group) {
      commit('SET_GROUP', group);
    },
  },
};
