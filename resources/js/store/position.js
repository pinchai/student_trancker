import Vue from "vue";

export default {

  state: {
    position: [],
  },

  getters: {
    getPosition: (state) => state.position,
  },

  mutations: {
    SET_POSITION(state, position) {
      state.position = position;
    },
  },

  actions: {
    setPosition({commit}, position) {
      commit('SET_POSITION', position);
    },
  },
};
