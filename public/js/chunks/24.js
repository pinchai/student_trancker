(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[24],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/product_management/product/components/QrAndBarCodeModal.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/product_management/product/components/QrAndBarCodeModal.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    formItem: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    modalType: {
      type: Number,
      "default": 0
    }
  },
  components: {},
  data: function data() {
    return {
      modal: true,
      form: {
        id: null,
        width: 50,
        height: 25,
        show_name: true,
        show_price: true,
        show_value: true,
        value: 12313123123
      },
      selected_product: [],
      listItems: {}
    };
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])({
    currencies: "getCurrency"
  })),
  watch: {
    modalType: {
      handler: function handler(val) {
        if (val == 1) {
          this.modal = true;
        } else if (val == 2) {
          this.modal = true;
          this.setData();
        }
      },
      immediate: true
    }
  },
  methods: {
    onSubmit: function onSubmit() {
      var _this = this;
      this.$validator.validateAll().then(function (result) {
        var vm = _this;
        if (result) {
          vm.clearForm(null);
        } else {
          vm.$notify({
            group: "message",
            type: "warning",
            title: vm.$t("product"),
            text: vm.$t("validation_failed")
          });
        }
      });
    },
    onPrintLabel: function onPrintLabel(id, type) {
      var vm = this;
      axios({
        url: "/product/printLabel",
        data: {
          id: id,
          type: type,
          count: 1
        },
        method: "POST",
        responseType: "blob"
      }).then(function (response) {
        //open new tab
        var fileURL = URL.createObjectURL(response.data);
        window.open(fileURL);
      })["catch"](function (error) {
        console.log(error);
      });
    },
    clearForm: function clearForm(obj) {
      var _this2 = this;
      this.$nextTick(function () {
        _this2.$validator.reset();
      });
      this.$emit("closeModal", obj);
      this.modal = false;
      this.listItems = {};
    },
    setData: function setData() {
      this.form.id = this.formItem.id;
    },
    downloadBarcode: function downloadBarcode(id, product_name) {
      this.$fire({
        title: 'Barcode OR Qrcode',
        text: "Do you want to download ?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, download it!',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then(function (result) {
        if (result.value) {
          var base64 = document.getElementById("".concat(id)).src;
          var downloadLink = document.createElement("a");
          downloadLink.href = base64;
          downloadLink.download = product_name;
          downloadLink.click();
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/product_management/product/components/QrAndBarCodeModal.vue?vue&type=template&id=5beeec26&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/product_management/product/components/QrAndBarCodeModal.vue?vue&type=template&id=5beeec26& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("b-modal", {
    attrs: {
      id: "modal",
      "no-close-on-backdrop": "",
      "no-close-on-esc": "",
      "hide-header-close": "",
      size: "lg",
      scrollable: "",
      "content-class": "custom-modal"
    },
    model: {
      value: _vm.modal,
      callback: function callback($$v) {
        _vm.modal = $$v;
      },
      expression: "modal"
    }
  }, [_c("template", {
    slot: "modal-header"
  }, [_c("h5", [_c("i", {
    staticClass: "fas fa-qrcode"
  }), _vm._v(" Qrcode and Barcode")])]), _vm._v(" "), _c("div", {
    staticClass: "d-block"
  }, [_c("b-row", [_c("b-col", {
    attrs: {
      cols: "8"
    }
  }, [_c("b-card", [_c("b-card-body", [_c("b-row", [_c("b-col", {
    attrs: {
      cols: "4"
    }
  }, [_c("b-form-group", {
    attrs: {
      label: "show Name",
      "label-class": "control-label",
      "label-for": "tag"
    }
  }, [_c("b-form-checkbox", {
    model: {
      value: _vm.form.show_name,
      callback: function callback($$v) {
        _vm.$set(_vm.form, "show_name", $$v);
      },
      expression: "form.show_name"
    }
  })], 1)], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      cols: "4"
    }
  }, [_c("b-form-group", {
    attrs: {
      label: "show price",
      "label-class": "control-label",
      "label-for": "tag"
    }
  }, [_c("b-form-checkbox", {
    model: {
      value: _vm.form.show_price,
      callback: function callback($$v) {
        _vm.$set(_vm.form, "show_price", $$v);
      },
      expression: "form.show_price"
    }
  })], 1)], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      cols: "4"
    }
  }, [_c("b-form-group", {
    attrs: {
      label: "show value",
      "label-class": "control-label",
      "label-for": "tag"
    }
  }, [_c("b-form-checkbox", {
    model: {
      value: _vm.form.show_value,
      callback: function callback($$v) {
        _vm.$set(_vm.form, "show_value", $$v);
      },
      expression: "form.show_value"
    }
  })], 1)], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      cols: "6"
    }
  }, [_c("b-form-group", {
    attrs: {
      label: _vm.$t("width"),
      "label-for": "code",
      "label-class": "control-label"
    }
  }, [_c("b-form-input", {
    attrs: {
      type: "number",
      placeholder: _vm.$t("width")
    },
    model: {
      value: _vm.form.width,
      callback: function callback($$v) {
        _vm.$set(_vm.form, "width", $$v);
      },
      expression: "form.width"
    }
  })], 1)], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      cols: "6"
    }
  }, [_c("b-form-group", {
    attrs: {
      label: _vm.$t("height"),
      "label-for": "code",
      "label-class": "control-label"
    }
  }, [_c("b-form-input", {
    attrs: {
      type: "number",
      placeholder: _vm.$t("height")
    },
    model: {
      value: _vm.form.height,
      callback: function callback($$v) {
        _vm.$set(_vm.form, "height", $$v);
      },
      expression: "form.height"
    }
  })], 1)], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      cols: "12"
    }
  }, [_c("div", {
    staticStyle: {
      "text-align": "center",
      border: "1px solid red"
    },
    style: "width: ".concat(_vm.form.width, "mm; height: ").concat(_vm.form.height, "mm;")
  }, [_vm.form.show_name ? _c("label", {
    staticStyle: {
      "margin-top": "2mm",
      "font-size": "9px"
    }
  }, [_vm._v("សាប៊ូតាបុយទឹកចុច+កញ្ចប់")]) : _vm._e(), _vm._v(" "), _vm.form.show_price ? _c("label", {
    staticStyle: {
      "margin-top": "-20px",
      "font-size": "9px"
    }
  }, [_vm._v("12.00$")]) : _vm._e(), _vm._v(" "), _c("img", {
    staticStyle: {
      width: "45mm",
      height: "10mm",
      "margin-top": "0"
    },
    attrs: {
      src: "/barcode.png",
      alt: "barcode.png"
    }
  }), _vm._v(" "), _vm.form.show_value ? _c("p", {
    staticStyle: {
      "font-size": "9px"
    }
  }, [_vm._v("855285242730")]) : _vm._e()])])], 1)], 1)], 1)], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      cols: "4"
    }
  }, [_c("b-row", [_c("b-col", {
    attrs: {
      cols: "12"
    }
  }, [_vm.formItem.sku != null ? [_c("barcode", {
    staticStyle: {
      width: "100%"
    },
    attrs: {
      id: "barcode_" + _vm.formItem.sku,
      tag: "img",
      value: _vm.formItem.sku,
      options: {
        displayValue: true,
        marginLeft: 0,
        marginTop: 10,
        format: "CODE39"
      }
    }
  })] : _vm._e(), _vm._v(" "), _c("b-button", {
    staticStyle: {
      "float": "left"
    },
    attrs: {
      squared: "",
      variant: "outline-secondary",
      size: "sm"
    },
    on: {
      click: function click($event) {
        return _vm.downloadBarcode("barcode_" + _vm.formItem.sku, _vm.formItem.name);
      }
    }
  }, [_vm._v("\n              download "), _c("i", {
    staticClass: "fas fa-download"
  })]), _vm._v(" "), _c("b-button", {
    staticStyle: {
      "float": "right"
    },
    attrs: {
      squared: "",
      variant: "outline-secondary",
      size: "sm"
    },
    on: {
      click: function click($event) {
        return _vm.onPrintLabel(_vm.formItem.id, "barcode");
      }
    }
  }, [_vm._v("\n              " + _vm._s(_vm.$t("print")) + " "), _c("i", {
    staticClass: "fas fa-print"
  })])], 2), _vm._v(" "), _c("b-col", {
    attrs: {
      cols: ""
    }
  }, [_c("hr")]), _vm._v(" "), _c("b-col", {
    attrs: {
      cols: "12"
    }
  }, [_vm.formItem.sku != null ? [_c("qrcode", {
    staticStyle: {
      width: "100%"
    },
    attrs: {
      id: "qr_" + _vm.formItem.sku,
      value: _vm.formItem.sku,
      text: _vm.formItem.sku,
      options: {
        width: 500
      },
      tag: "img"
    }
  })] : _vm._e(), _vm._v(" "), _c("b-button", {
    staticStyle: {
      "float": "left"
    },
    attrs: {
      squared: "",
      variant: "outline-secondary",
      size: "sm"
    },
    on: {
      click: function click($event) {
        return _vm.downloadBarcode("qr_" + _vm.formItem.sku, _vm.formItem.name);
      }
    }
  }, [_vm._v("\n              download "), _c("i", {
    staticClass: "fas fa-download"
  })]), _vm._v(" "), _c("b-button", {
    staticStyle: {
      "float": "right"
    },
    attrs: {
      squared: "",
      variant: "outline-secondary",
      size: "sm"
    },
    on: {
      click: function click($event) {
        return _vm.onPrintLabel(_vm.formItem.id, "qrcode");
      }
    }
  }, [_vm._v("\n              " + _vm._s(_vm.$t("print")) + " "), _c("i", {
    staticClass: "fas fa-print"
  })])], 2)], 1)], 1)], 1)], 1), _vm._v(" "), _c("template", {
    slot: "modal-footer"
  }, [_c("b-button", {
    staticClass: "float-right",
    attrs: {
      variant: "outline-danger"
    },
    on: {
      click: function click($event) {
        return _vm.clearForm(null);
      }
    }
  }, [_c("i", {
    staticClass: "fas fa-times-circle mr-1"
  }), _vm._v("\n      " + _vm._s(_vm.$t("close")))]), _vm._v(" "), false ? undefined : _vm._e()], 1)], 2);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/pages/product_management/product/components/QrAndBarCodeModal.vue":
/*!****************************************************************************************!*\
  !*** ./resources/js/pages/product_management/product/components/QrAndBarCodeModal.vue ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _QrAndBarCodeModal_vue_vue_type_template_id_5beeec26___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./QrAndBarCodeModal.vue?vue&type=template&id=5beeec26& */ "./resources/js/pages/product_management/product/components/QrAndBarCodeModal.vue?vue&type=template&id=5beeec26&");
/* harmony import */ var _QrAndBarCodeModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./QrAndBarCodeModal.vue?vue&type=script&lang=js& */ "./resources/js/pages/product_management/product/components/QrAndBarCodeModal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _QrAndBarCodeModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _QrAndBarCodeModal_vue_vue_type_template_id_5beeec26___WEBPACK_IMPORTED_MODULE_0__["render"],
  _QrAndBarCodeModal_vue_vue_type_template_id_5beeec26___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/product_management/product/components/QrAndBarCodeModal.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/product_management/product/components/QrAndBarCodeModal.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************!*\
  !*** ./resources/js/pages/product_management/product/components/QrAndBarCodeModal.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_QrAndBarCodeModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./QrAndBarCodeModal.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/product_management/product/components/QrAndBarCodeModal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_QrAndBarCodeModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/product_management/product/components/QrAndBarCodeModal.vue?vue&type=template&id=5beeec26&":
/*!***********************************************************************************************************************!*\
  !*** ./resources/js/pages/product_management/product/components/QrAndBarCodeModal.vue?vue&type=template&id=5beeec26& ***!
  \***********************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_QrAndBarCodeModal_vue_vue_type_template_id_5beeec26___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./QrAndBarCodeModal.vue?vue&type=template&id=5beeec26& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/product_management/product/components/QrAndBarCodeModal.vue?vue&type=template&id=5beeec26&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_QrAndBarCodeModal_vue_vue_type_template_id_5beeec26___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_QrAndBarCodeModal_vue_vue_type_template_id_5beeec26___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);