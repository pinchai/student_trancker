import Vue from "vue";
export default {

  state: {
    in_progress: false,
  },

  getters: {
    getInProgress: (state) => state.in_progress,
  },

  mutations: {
    SET_IN_PROGRESS(state, in_progress) {
      state.in_progress = in_progress;
    },
  },

  actions: {
    setInProgress({ commit }, in_progress) {
      commit('SET_IN_PROGRESS', in_progress);
    },
  },
};
