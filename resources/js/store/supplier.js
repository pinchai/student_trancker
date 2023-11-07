import Vue from "vue";

export default {

  state: {
    supplier: [],
  },

  getters: {
    getSupplier: (state) => state.supplier,
  },

  mutations: {
    SET_SUPPLIER(state, supplier) {
      state.supplier = supplier;
    },
  },

  actions: {
    setSupplier({commit}, supplier) {
      commit('SET_SUPPLIER', supplier);
    },
  },
};
