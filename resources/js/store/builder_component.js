import Vue from "vue";
export default {

    state: {
      builder_component: [
        {
          class: 'col-lg-6 col-md-6 col-sm-12',
          "type": "text",
          "label": "Student Name",
          "name": "student_name",
          validation: 'required',
          placeholder: "student_name",
          "label-is-valid-class": "my-valid-class",
          style: 'width: 100%; font-size: 12px; margin-bottom: 10px; margin-top: 0',
          help: '',
          // "error-behavior": "live"
        },
        {
          "type": "number",
          "label": "Student Age",
          "name": "student_age",
          validation: 'required',
          "label-is-valid-class": "my-valid-class",
          class: 'col-lg-6 col-md-6 col-sm-12',
          style: 'width: 100%; font-size: 12px; margin-bottom: 10px; margin-top: 0',
          // "error-behavior": "live"
        },
        {
          name: 'gender',
          type: 'select',
          label: 'Gender',
          class: 'col-lg-6 col-md-6 col-sm-12',
          style: 'width: 100%; font-size: 12px; margin-bottom: 10px; margin-top: 0',
          "label-is-valid-class": "my-valid-class",
          "error-behavior": "live",
          options: {
            male: 'Male',
            female: 'Female',
          },
        },
        {
          type: "datetime-local",
          name: "datetime",
          label: "datetime-local",
          placeholder: "Sample datetime-local placeholder",
          help: "",
          class: 'col-lg-6 col-md-6 col-sm-12',
          style: 'width: 100%; font-size: 12px; margin-bottom: 10px; margin-top: 0',
          "label-is-valid-class": "my-valid-class",
          validation: "required",
          "error-behavior": "live"
        },
        {
          type: 'submit',
          label: 'search',
          class: 'col-lg-6 col-md-6 col-sm-12',
          style: 'width: 100%; font-size: 16px; margin-bottom: 10px; margin-top: 0; float: right',
        },
      ],
    },

    getters: {
        getComponent: (state) => state.builder_component,
    },

    mutations: {
        SET_COMPONENT(state, builder_component) {
            state.builder_component = builder_component;
        },
    },

    actions: {
        setComponent({ commit }, builder_component) {
            commit('SET_COMPONENT', builder_component);
        },
    },
};
