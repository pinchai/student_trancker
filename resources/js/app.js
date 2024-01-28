require("./bootstrap");
window.Vue = require("vue");

//Router
import router from "./routes";

/*Vuex*/
import store from "./store";

//Plugins
import "./plugins";

//i18n
import i18n from "./plugins/i18n";

//Bootstrap Vue
import BootstrapVue from "bootstrap-vue"; //Importing
Vue.use(BootstrapVue); // Telling Vue to use this in whole application

import PerfectScrollbar from "vue2-perfect-scrollbar";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";

Vue.use(PerfectScrollbar);

//Apex Chart
import VueApexCharts from "vue-apexcharts";

Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);

//Multi Select
import MultiSelect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

Vue.component("multi-select", MultiSelect);

//date rage-picker
import DateRangePicker from "./components/sharing/DateRangePicker";

Vue.component("date-range", DateRangePicker);

//excel
import downloadExcel from "./plugins/vue-json-excel";

Vue.component("download-excel", downloadExcel);

//Notify
import Notifications from "vue-notification";

Vue.use(Notifications);

//barcode scanner
import Vue from "vue";
import VueBarcodeScanner from "./components/sharing/vue-barcode-scanner";

Vue.use(VueBarcodeScanner);

//Remember Language
import {Validator} from "vee-validate";

if (localStorage.lang != null) {
  i18n.locale = localStorage.lang;
  Validator.localize(localStorage.lang);
} else {
  localStorage.lang = i18n.locale;
  Validator.localize(i18n.locale);
}

import VueHtmlToPaper from "./plugins/vue-html-to-paper";

const options = {
  name: "_blank",
  specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
  styles: [],
  timeout: 1000, // default timeout before the print window appears
  autoClose: true, // if false, the window will not close after printing
  windowTitle: window.document.title // override the window title
};
Vue.use(VueHtmlToPaper, options);
// or, using the defaults with no stylesheet
// Vue.use(VueHtmlToPaper);

//Barcode generate
import VueBarcode from '@chenfengyuan/vue-barcode';
Vue.component(VueBarcode.name, VueBarcode);

//qrcode generate
import VueQrcode from '@chenfengyuan/vue-qrcode';
Vue.component(VueQrcode.name, VueQrcode);

// importing the helper
import interceptorsSetup from './plugins/interceptors'
interceptorsSetup()

import VueFormulate from '@braid/vue-formulate'
Vue.use(VueFormulate)

import excel from 'vue-excel-export'
Vue.use(excel)

import Cookies from 'js-cookie'

const app = new Vue({
  el: "#app",
  router,
  store,
  i18n,
  async beforeCreate() {
    // init data to VueX
    let vm = this
    await axios.post("/system/get_into_vuex", {loading: false})
      .then(function (response) {
        if (response.status === 200) {
          store.dispatch("setFirstModule", response.data.data.first_menu);
          store.dispatch("setEnums", response.data.data.enums);
          store.dispatch("fetchBranch", response.data.data.branch);
          store.dispatch("setModuleItems", response.data.data.module_permission);

          store.dispatch("setCustomUserModulePermission", response.data.data.custom_user_module_permission);
          store.dispatch("setUser", response.data.data.users);
          store.dispatch("setTableSize", response.data.data.default_table_size);
          store.dispatch("setVersion", response.data.data.version);
          store.dispatch("setPosition", response.data.data.position);
          store.dispatch("setGroup", response.data.data.group);
          //
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  async created() {
    await store.dispatch("fetchUserPermissionData");
  }
});
