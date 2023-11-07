// https://github.com/nuxt/nuxt.js/issues/3221
import Vue from "vue";
import moment from "moment";
import {mapGetters} from "vuex";

Vue.mixin({
  computed: {
    ...mapGetters({
      currencies: "getCurrency",
      customer: "getCustomer",
      vendor: "getVendor",
      enums: "getEnums",
      units: "getUnit",
      transaction_status: "getTransactionStatus"
    })
  },
  methods: {
    isSuper() {
      if (this.$store.getters.userAuth == "") {
        return;
      }
      if (this.$store.state.auth != "") {
        if (
          this.$store.getters.userAuth.user_type_id ==
          this.$store.state.permission.DEV ||
          this.$store.getters.userAuth.user_type_id ==
          this.$store.state.permission.SUPER_USER
        ) {
          return true;
        }
      }
      return false;
    },
    isDEV() {
      if (this.$store.getters.userAuth == "") {
        return;
      }
      if (this.$store.state.auth != "") {
        if (
          this.$store.getters.userAuth.user_type_id ==
          this.$store.state.permission.DEV
        ) {
          return true;
        }
      }
      return false;
    },
    checkAuthorize(action, module_key = "") {
      /*
        CREATE = 1,
        UPDATE = 2,
        DELETE = 3,
        VIEW = 4
      */
      let currentRoute = this.$route.name;

      let moduleKey = this.$store.state.module.current_module;
      if (this.$helpers.nullToVoid(module_key) != "") {
        moduleKey = module_key;
      }

      if (this.$helpers.nullToVoid(this.$store.getters.userAuth) == "") {
        return false;
      }

      if (this.isDEV()) {
        return true;
      }

      if (currentRoute.includes("welcome")) {
        return true;
      } else {
        const modules = this.$store.getters.rolePermission;
        for (var obj of modules) {
          if (
            obj.module_key == moduleKey &&
            (obj.create == action ||
              obj.update == action ||
              obj.delete == action ||
              obj.view == action)
          ) {
            return true;
          }
        }
      }
      return false;
    },
    checkCustomModuleAuthorize(module_key, action_name) {
      if (this.$helpers.nullToVoid(this.$store.getters.userAuth) == "") {
        return false;
      }
      if (this.isDEV()) {
        return true;
      }

      let custom_user_module_permission = this.$store.getters.getCustomUserModulePermission;
      let module_permission = custom_user_module_permission.find(obj => {
        return obj.module_key == module_key
      })
      if (this.$helpers.nullToVoid(module_permission, '') != '') {
        let all_action = (module_permission.custom_permission).split(",")
        if (all_action.includes(action_name)) {
          return  true
        } else {
          return  false
        }
      } else {
        return false
      }
    },
    getFullLocalName(latin, local) {
      var name = {
        latin_name: latin,
        local_name: local
      };
      return JSON.stringify(name);
    },
    getNameByLang(name) {
      if (name != "" && name != null) {
        try {
          name = JSON.parse(name);
          if (localStorage.lang == "kh") {
            return name.local_name;
          } else {
            return name.latin_name;
          }
        } catch (e) {
          return name;
        }
      } else {
        return null;
      }
    },
    getCustomerDetail(contact_id) {
      return this.customer.find(obj => {
        return obj.id == contact_id;
      });
    },
    getVendorDetail(contact_id) {
      return this.vendor.find(obj => {
        return obj.id == contact_id;
      });
    },
    getCurrencyDetail(currency_id) {
      return this.currencies.find(obj => {
        return obj.id == currency_id;
      });
    },
    getCurrencyDetailById(currency_id) {
      if (this.$helpers.nullToVoid(currency_id) != '') {
        return this.currencies.find((obj) => {
          return obj.id == currency_id
        })
      } else {
        return 'currency_id not found'
      }
    },
    getTransactionStatusById(status_id) {
      if (this.$helpers.nullToVoid(status_id) != '') {
        return this.transaction_status.find((obj) => {
          return obj.id == status_id
        })
      } else {
        return 'currency_id not found'
      }
    },
    getProductTypeDetail(product_type) {
      return this.enums.product_type.find(obj => {
        return obj.id == product_type;
      });
    },
    getSellingTypeDetail(selling_type) {
      return this.enums.selling_type.find(obj => {
        return obj.id == selling_type;
      });
    },
    getUnitDetailById(id) {
      if (this.$helpers.nullToVoid(id) != '') {
        return this.units.find((obj) => {
          return obj.id == id
        })
      } else {
        return 'unit not found'
      }
    },
    roundNumber(num) {
      if (this.$helpers.nullToVoid(num) != '') {
        return +(Math.round(num + 'e+4') + 'e-4')
      } else {
        return 0
      }
    },
    numberFormat(value) {
      return (parseFloat(value)).toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    },
    getTimeAgoFromNow(time) {
      if (this.$i18n.locale == 'en') {
        return moment(time).locale('en').fromNow()
      } else if (this.$i18n.locale == 'kh') {
        return moment(time).locale('km').fromNow()
      }
    },
    getDurationById(id){
      let duration_type = [
        { text: 'Single day', name: 'ថ្ងៃ',value: '1'  },
        { text: 'Multiple day', name: 'ថ្ងៃ', value: '2' },
        { text: 'Hours', name: 'ម៉ោង', value: '3' }
      ]

      let found = duration_type.find(obj=>{
        return obj.value == id
      })
      if (found){
        return found
      }else {
        return  []
      }
    },
    focusIn(event){
      let target_value = event.value
      let target_id = event.id
      //console.log(target_id);
      document.getElementById(target_id).value = parseFloat(target_value) <= 0 ? null  : target_value
    },
    QtyFocusIn(event){
      let target_value = event.value
      let target_id = event.id
      //console.log(target_id);
      document.getElementById(target_id).value = parseFloat(target_value) <= 1 ? null  : target_value
    },
    focusOut(event){
      let target_value = event.value
      let target_id = event.id
      //console.log(target_id);
      document.getElementById(target_id).value = parseFloat(target_value) > 0 ? target_value  : 0
    },
    toggleBodyScrollbar(visible) {
      const body = document.getElementsByTagName('body')[0];
      if(visible)
        body.classList.add("overflow-hidden");
      else
        body.classList.remove("overflow-hidden");
    }
  }
});
