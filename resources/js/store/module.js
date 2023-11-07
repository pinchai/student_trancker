import Vue from "vue";
export default {
    state: {
        first_module: "",
        current_module: null,
        moduleItems: []
    },

    getters: {
        getFirstModule: state => state.first_module,
        getCurrentModule: state => state.current_module,
        getModuleItems: state => state.moduleItems
    },

    mutations: {
        SET_FIRST_MODULE(state, module) {
            state.first_module = module;
        },
        SET_CURRENT_MODULE(state, module) {
            state.current_module = module;
        },
        SET_MODULE_ITEMS(state, moduleItems) {
            state.moduleItems = moduleItems;
        }
    },

    actions: {
        setFirstModule({ commit }, module) {
            commit("SET_FIRST_MODULE", module);
        },
        setCurrentModule({ commit }, module) {
            commit("SET_CURRENT_MODULE", module);
        },
        setModuleItems({ commit }, moduleItems) {
            commit("SET_MODULE_ITEMS", moduleItems);
        }
    }
};
