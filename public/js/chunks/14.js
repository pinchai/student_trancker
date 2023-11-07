(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/product_management/product/components/CloneModal.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/product_management/product/components/CloneModal.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuedraggable */ "./node_modules/vuedraggable/dist/vuedraggable.umd.js");
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vuedraggable__WEBPACK_IMPORTED_MODULE_2__);
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
  components: {
    ModalCategory: function ModalCategory() {
      return __webpack_require__.e(/*! import() */ 5).then(__webpack_require__.bind(null, /*! ../../category/components/Modal */ "./resources/js/pages/product_management/category/components/Modal.vue"));
    },
    ModalBrand: function ModalBrand() {
      return __webpack_require__.e(/*! import() */ 4).then(__webpack_require__.bind(null, /*! ../../brand/components/Modal */ "./resources/js/pages/product_management/brand/components/Modal.vue"));
    },
    ModalTag: function ModalTag() {
      return __webpack_require__.e(/*! import() */ 7).then(__webpack_require__.bind(null, /*! ../../tag/components/Modal */ "./resources/js/pages/product_management/tag/components/Modal.vue"));
    },
    ModalUnit: function ModalUnit() {
      return __webpack_require__.e(/*! import() */ 6).then(__webpack_require__.bind(null, /*! ../../unit/components/Modal */ "./resources/js/pages/product_management/unit/components/Modal.vue"));
    },
    ModalCropperImage: function ModalCropperImage() {
      return Promise.all(/*! import() */[__webpack_require__.e(1), __webpack_require__.e(0)]).then(__webpack_require__.bind(null, /*! ../../../../components/sharing/ModalCropperImage */ "./resources/js/components/sharing/ModalCropperImage.vue"));
    },
    draggable: vuedraggable__WEBPACK_IMPORTED_MODULE_2___default.a
  },
  data: function data() {
    return {
      imgUrl: "/images/product/",
      modal: true,
      form: {
        name: null,
        sku: null,
        selected: null,
        image: null,
        old_image: null,
        unit: [],
        category: [],
        brand: null,
        supplier: null,
        tag: null,
        tax: null,
        cost: 0,
        price: 0,
        cost_currency_id: null,
        price_currency_id: null,
        is_track_stock: false,
        product_type_id: null,
        commission_type_id: 0,
        commission_value: 0,
        composite_lists: [],
        deleted_lists: [],
        product_image: []
      },
      selected_product: [],
      listItems: {},
      apiUrl: null,
      modalCategoryShow: false,
      modalCategoryType: 0,
      modalBrandShow: false,
      modalBrandType: 0,
      modalSupplierShow: false,
      modalSupplierType: 0,
      modalTagShow: false,
      modalTagType: 0,
      modalUnitShow: false,
      modalUnitType: 0,
      indexUnitForm: null,
      modalShowCropperImage: false,
      cropperImageTargetFile: null,
      imageType: null,
      deletedProductImage: []
    };
  },
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])({
    currencies: "getCurrency",
    categories: "getProductCategory",
    brand: "getBrand",
    unit: "getUnit",
    tag: "getTag",
    vendor: "getVendor",
    default_currency: "getDefaultCurrency",
    enums: "getEnums",
    products: "getProducts"
  })), {}, {
    productName: function productName() {
      return this.$i18n.locale == "en" ? "Product Name" : this.$i18n.locale == "kh" ? "ឈ្មោះផលិតផល" : "";
    }
  }),
  watch: {
    modalType: {
      handler: function handler(val) {
        if (val == 1) {
          this.modal = true;
          this.apiUrl = "/product/store";

          //set default currency to cost and price
          this.form.cost_currency_id = this.default_currency[0].id;
          this.form.price_currency_id = this.default_currency[0].id;
        } else if (val == 2) {
          this.modal = true;
          this.setData();
          if (this.formItem.action == "clone") {
            this.apiUrl = "/product/store";
          } else {
            this.apiUrl = "/product/store";
          }
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
          var input = _this.form;

          // Reorder product image index
          input.product_image.map(function (obj, index) {
            obj.order = index;
            return obj;
          });
          input.deleted_product_image = _this.deletedProductImage;
          axios.post(_this.apiUrl, input).then(function (response) {
            if (response.status === 200) {
              vm.listItems = response.data;
              vm.$store.dispatch("setProducts", response.data.data.product);
              if (response.data.success === 1) {
                vm.clearForm(response);
                vm.$notify({
                  group: "message",
                  type: "success",
                  title: vm.$t("product"),
                  text: vm.$t("done")
                });
              } else if (response.data.success === 3) {
                var msg = vm.$i18n.locale == "en" ? "This Product Name is Already Exits" : "ឈ្មោះផលិតផលមានរួចមកហើយ";
                Swal.fire({
                  title: "Oop...",
                  text: msg,
                  allowOutsideClick: false,
                  allowEscapeKey: false
                });
              }
            }
          })["catch"](function (error) {
            console.log(error);
          });
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
    clearForm: function clearForm(obj) {
      var _this2 = this;
      this.form = {};
      this.$nextTick(function () {
        _this2.$validator.reset();
      });
      this.$emit("closeModal", obj);
      this.modal = false;
      this.listItems = {};
    },
    setData: function setData() {
      var _this3 = this;
      this.form.id = null;
      this.form.name = this.formItem.name;
      this.form.cost = this.formItem.cost;
      this.form.price = this.formItem.price;
      this.form.cost_currency_id = this.formItem.cost_currency_id;
      this.form.price_currency_id = this.formItem.price_currency_id;
      this.form.sku = this.formItem.sku;
      this.form.is_track_stock = this.formItem.is_track_stock == 1 ? true : false;
      this.form.image = null;
      this.form.old_image = null;
      this.form.commission_type_id = this.formItem.commission_type;
      this.form.commission_value = this.formItem.commission_value;
      this.form.product_type_id = this.formItem.product_type;
      this.form.composite_lists = this.formItem.product_composite;
      this.form.category = this.categories.find(function (item) {
        return item.id == _this3.formItem.category_id;
      });
      this.form.brand = this.brand.find(function (item) {
        return item.id == _this3.formItem.brand_id;
      });
      this.form.supplier = this.vendor.find(function (item) {
        return item.id == _this3.formItem.supplier_id;
      });
      this.form.tag = this.tag.find(function (item) {
        return item.id == _this3.formItem.tag_id;
      });
      this.form.tax = this.formItem.tax;
      this.form.unit = this.unit.find(function (item) {
        return item.id == _this3.formItem.unit_id;
      });
      this.form.tax = this.formItem.tax;
      this.form.product_image = [];
    },
    chooseImageThumbnail: function chooseImageThumbnail() {
      this.$refs.fileInputThumbnail.click();
    },
    onFileChangeThumbnail: function onFileChangeThumbnail($event) {
      var vm = this;
      var files = $event.target.files || $event.dataTransfer.files;
      var fileSize = files[0].size / 1024 / 1024; // in 1 MB
      if (fileSize > 1) {
        var msg = vm.$i18n.locale == "en" ? "Cannot upload image bigger than 1MB" : "មិនអាចផ្ទុករូបភាពធំជាង1MBបានទេ។";
        Swal.fire({
          icon: "error",
          title: "Oop...",
          text: msg,
          allowOutsideClick: false,
          allowEscapeKey: false
        });
        this.$refs.fileInputThumbnail.value = "";
        return;
      }
      if (files[0]) {
        this.cropperImageTargetFile = $event;
        this.imageType = "thumbnail";
        this.openModalCropperImage();
      } else {
        vm.form.image = null;
      }
    },
    chooseImageGallery: function chooseImageGallery() {
      this.$refs.fileInputGallery.click();
    },
    onFileChangeGallery: function onFileChangeGallery($event) {
      var vm = this;
      var files = $event.target.files || $event.dataTransfer.files;
      var fileSize = files[0].size / 1024 / 1024; // in 1 MB
      if (fileSize > 1) {
        var msg = vm.$i18n.locale == "en" ? "Cannot upload image bigger than 1MB" : "មិនអាចផ្ទុករូបភាពធំជាង1MBបានទេ។";
        Swal.fire({
          icon: "error",
          title: "Oop...",
          text: msg,
          allowOutsideClick: false,
          allowEscapeKey: false
        });
        this.$refs.fileInputGallery.value = "";
        return;
      }
      if (files[0]) {
        this.cropperImageTargetFile = $event;
        this.imageType = "gallery";
        this.openModalCropperImage();
      }
    },
    removeImageGallery: function removeImageGallery(e, index) {
      e.stopPropagation();
      if (this.$helpers.nullToVoid(this.form.product_image[index].id) != "") {
        this.deletedProductImage.push(this.form.product_image[index]);
      }
      this.form.product_image.splice(index, 1);
    },
    //Cropper
    openModalCropperImage: function openModalCropperImage() {
      this.modalShowCropperImage = true;
    },
    closeModalCropperImage: function closeModalCropperImage(data) {
      this.modalShowCropperImage = false;
      this.$refs.fileInputThumbnail.value = "";
      this.$refs.fileInputGallery.value = "";
      this.cropperImageTargetFile = null;
      this.imageType = "";
    },
    saveModalCropperImage: function saveModalCropperImage(base64) {
      this.imgUrl = "";
      if (this.imageType == "thumbnail") {
        this.form.image = base64;
      } else if (this.imageType == "gallery") {
        this.form.product_image.push({
          id: null,
          image: base64
        });
      }
      this.closeModalCropperImage();
    },
    closeModalCategory: function closeModalCategory(obj) {
      this.modalCategoryShow = false;
      this.modalCategoryType = 0;
      if (!this.$helpers.isEmpty(obj)) {
        this.form.category = obj;
      }
    },
    closeModalBrand: function closeModalBrand(obj) {
      this.modalBrandShow = false;
      this.modalBrandType = 0;
      if (!this.$helpers.isEmpty(obj)) {
        this.form.brand = obj;
      }
    },
    closeModalSupplier: function closeModalSupplier(obj) {
      this.modalSupplierShow = false;
      this.modalSupplierType = 0;
      if (!this.$helpers.isEmpty(obj)) {
        this.form.supplier = obj;
      }
    },
    closeModalTag: function closeModalTag(obj) {
      this.modalTagShow = false;
      this.modalTagType = 0;
      if (!this.$helpers.isEmpty(obj)) {
        this.form.tag = obj;
      }
    },
    openUnitModal: function openUnitModal(index) {
      this.modalUnitShow = true;
      this.modalUnitType = 1;
      this.indexUnitForm = index;
    },
    closeModalUnit: function closeModalUnit(obj) {
      this.modalUnitShow = false;
      this.modalUnitType = 0;
      if (!this.$helpers.isEmpty(obj)) {
        this.form.product_unit[this.indexUnitForm].unit = obj;
      }
    },
    rowCompositeDelete: function rowCompositeDelete(index, event) {
      this.form.composite_lists.splice(index, 1);
      this.form.deleted_lists.push({
        id: event.id === undefined ? null : event.id
      });
      this.selected_product = [];
    },
    onProductSelected: function onProductSelected(item) {
      if (this.$helpers.nullToVoid(item, "") !== "") {
        var duplicate_id = this.form.composite_lists.findIndex(function (obj) {
          return obj.product_id == item.id;
        });
        if (duplicate_id == -1) {
          this.form.composite_lists.push({
            id: null,
            product_composite_id: item.id,
            name: item.name,
            quantity: 1,
            cost: item.cost,
            cost_currency_id: item.cost_currency_id,
            price: item.price,
            price_currency_id: item.price_currency_id,
            vee_quantity: "vee_quantity_".concat(this.form.composite_lists.length)
          });
        } else {
          sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.fire({
            type: "warning",
            title: this.$t("product"),
            text: this.$t("This Product Is Already Exist")
          });
        }
      }
      this.selected_product = [];
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/product_management/product/components/CloneModal.vue?vue&type=template&id=d7eecb54&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/product_management/product/components/CloneModal.vue?vue&type=template&id=d7eecb54&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************/
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
      size: "xl",
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
  }, [_vm.modalCategoryShow ? _c("div", [_c("modal-category", {
    attrs: {
      modalType: _vm.modalCategoryType
    },
    on: {
      closeModal: _vm.closeModalCategory
    }
  })], 1) : _vm._e(), _vm._v(" "), _vm.modalBrandShow ? _c("div", [_c("modal-brand", {
    attrs: {
      modalType: _vm.modalBrandType
    },
    on: {
      closeModal: _vm.closeModalBrand
    }
  })], 1) : _vm._e(), _vm._v(" "), _vm.modalSupplierShow ? _c("div", [_c("modal-supplier", {
    attrs: {
      modalType: _vm.modalSupplierType
    },
    on: {
      closeModal: _vm.closeModalSupplier
    }
  })], 1) : _vm._e(), _vm._v(" "), _vm.modalTagShow ? _c("div", [_c("modal-tag", {
    attrs: {
      modalType: _vm.modalTagType
    },
    on: {
      closeModal: _vm.closeModalTag
    }
  })], 1) : _vm._e(), _vm._v(" "), _vm.modalUnitShow ? _c("div", [_c("modal-unit", {
    attrs: {
      modalType: _vm.modalUnitType
    },
    on: {
      closeModal: _vm.closeModalUnit
    }
  })], 1) : _vm._e(), _vm._v(" "), _c("template", {
    slot: "modal-header"
  }, [_c("h3", [_c("i", {
    staticClass: "fas fa-copy"
  }), _vm._v(" Clone " + _vm._s(_vm.$t("product")))])]), _vm._v(" "), _c("div", {
    staticClass: "d-block"
  }, [_c("b-card", {
    staticClass: "shadow-sm",
    attrs: {
      "no-body": ""
    }
  }, [_c("b-card-body", [_c("b-row", [_c("b-col", {
    staticClass: "text-center mb-3",
    attrs: {
      cols: "12"
    }
  }, [_vm.$helpers.nullToVoid(_vm.form.image) == "" ? _c("div", [_c("i", {
    staticClass: "fas fa-image",
    staticStyle: {
      "font-size": "170px",
      color: "#a0aec0"
    }
  })]) : _c("div", [_c("b-img", {
    staticClass: "mb-2",
    attrs: {
      src: this.imgUrl + this.form.image,
      alt: "Image",
      width: "170",
      height: "170",
      rounded: ""
    }
  })], 1), _vm._v(" "), _c("div", [_c("b-button", {
    staticClass: "ml-2",
    staticStyle: {
      width: "151px"
    },
    attrs: {
      size: "sm",
      variant: "outline-primary"
    },
    on: {
      click: _vm.chooseImageThumbnail
    }
  }, [_vm._v(_vm._s(_vm.$t("choose_file")) + "\n              ")]), _vm._v(" "), _c("input", {
    ref: "fileInputThumbnail",
    staticStyle: {
      display: "none"
    },
    attrs: {
      type: "file",
      accept: "image/*",
      multiple: false
    },
    on: {
      change: _vm.onFileChangeThumbnail
    }
  })], 1)])], 1), _vm._v(" "), _c("b-row", {
    staticClass: "mb-3"
  }, [_c("b-col", {
    attrs: {
      cols: "12"
    }
  }, [_c("span", [_vm._v(_vm._s(_vm.$t("product") + " " + _vm.$t("image")))]), _vm._v(" "), _c("i", {
    staticClass: "far fa-images px-2 pt-1 text-primary",
    staticStyle: {
      "font-size": "18px",
      cursor: "pointer"
    },
    on: {
      click: _vm.chooseImageGallery
    }
  }), _vm._v(" "), _c("b-row", {
    staticStyle: {
      padding: "0 15px 0 15px",
      border: "solid 1px #dcdcdc",
      margin: "0",
      "border-radius": "6px",
      "overflow-y": "scroll",
      "max-height": "360px",
      cursor: "pointer"
    },
    on: {
      click: _vm.chooseImageGallery
    }
  }, [_c("b-col", {
    attrs: {
      cols: "12"
    }
  }, [_vm.$helpers.nullToVoid(_vm.form.product_image) == [] ? _c("div", {
    staticStyle: {
      height: "140px",
      "text-align": "center"
    },
    attrs: {
      "invalid-feedback": _vm.veeErrors.first("image"),
      state: !_vm.veeErrors.has("image")
    }
  }, [_c("label", {
    staticStyle: {
      "padding-top": "60px",
      color: "rgba(0, 0, 0, 0.54)",
      cursor: "pointer"
    }
  }, [_vm._v(_vm._s("".concat(_vm.$t("select"), " ").concat(_vm.$t("product"), " ").concat(_vm.$t("image"))))])]) : _c("div", [_c("draggable", {
    staticClass: "row",
    attrs: {
      list: _vm.form.product_image
    }
  }, _vm._l(_vm.form.product_image, function (pic, index) {
    return _c("div", {
      key: index
    }, [_c("b-img", {
      staticClass: "border-radius",
      staticStyle: {
        "margin-top": "20px",
        "margin-left": "30px"
      },
      attrs: {
        src: pic.image,
        width: "140px",
        height: "140px"
      }
    }), _vm._v(" "), _c("i", {
      staticClass: "fas fa-minus-circle minus-image",
      on: {
        click: function click($event) {
          return _vm.removeImageGallery($event, index);
        }
      }
    })], 1);
  }), 0)], 1), _vm._v(" "), _c("b-form-group", [_c("input", {
    ref: "fileInputGallery",
    staticStyle: {
      display: "none"
    },
    attrs: {
      type: "file",
      accept: "image/*",
      multiple: false
    },
    on: {
      change: _vm.onFileChangeGallery
    }
  })])], 1)], 1)], 1)], 1), _vm._v(" "), _c("b-row", [_c("b-col", {
    attrs: {
      lg: "12",
      md: "12",
      sm: "12",
      cols: "12"
    }
  }, [_c("b-row", [_c("b-col", {
    attrs: {
      lg: "6",
      md: "12",
      sm: "12"
    }
  }, [_c("b-form-group", {
    staticClass: "text-left",
    attrs: {
      "invalid-feedback": _vm.veeErrors.first("name"),
      label: _vm.$t("name") + " *",
      "label-class": "control-label"
    }
  }, [_c("b-form-input", {
    directives: [{
      name: "validate",
      rawName: "v-validate",
      value: "required",
      expression: "'required'"
    }],
    attrs: {
      state: _vm.veeErrors.has("name") ? false : null,
      "data-vv-name": "name",
      "data-vv-as": _vm.productName,
      type: "text",
      placeholder: _vm.productName
    },
    model: {
      value: _vm.form.name,
      callback: function callback($$v) {
        _vm.$set(_vm.form, "name", $$v);
      },
      expression: "form.name"
    }
  })], 1)], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      lg: "6",
      md: "12",
      sm: "12"
    }
  }, [_c("b-form-group", {
    staticClass: "text-left",
    attrs: {
      label: "SKU",
      "label-class": "control-label"
    }
  }, [_c("b-form-input", {
    attrs: {
      type: "text",
      placeholder: "SKU"
    },
    model: {
      value: _vm.form.sku,
      callback: function callback($$v) {
        _vm.$set(_vm.form, "sku", $$v);
      },
      expression: "form.sku"
    }
  })], 1)], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      lg: "6",
      md: "12",
      sm: "12"
    }
  }, [_c("b-form-group", {
    staticClass: "text-left",
    attrs: {
      "invalid-feedback": _vm.veeErrors.first("category"),
      state: !_vm.veeErrors.has("category")
    }
  }, [_c("label", {
    staticClass: "text-dark m-0 p-0"
  }, [_vm._v(_vm._s(_vm.$t("category") + " *"))]), _vm._v(" "), _c("i", {
    staticClass: "fas fa-plus-circle text-primary m-0 p-0",
    staticStyle: {
      cursor: "pointer"
    },
    on: {
      click: function click($event) {
        _vm.modalCategoryShow = true;
        _vm.modalCategoryType = 1;
      }
    }
  }), _vm._v(" "), _c("multi-select", {
    directives: [{
      name: "validate",
      rawName: "v-validate",
      value: "required",
      expression: "'required'"
    }],
    attrs: {
      multiple: false,
      label: "name",
      "track-by": "name",
      "select-label": "",
      "deselect-label": "",
      options: _vm.categories,
      state: _vm.veeErrors.has("category") ? false : null,
      "data-vv-name": "category",
      "data-vv-as": _vm.$t("category"),
      placeholder: _vm.$t("select") + _vm.$t("category")
    },
    model: {
      value: _vm.form.category,
      callback: function callback($$v) {
        _vm.$set(_vm.form, "category", $$v);
      },
      expression: "form.category"
    }
  })], 1)], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      lg: "6",
      md: "12",
      sm: "12"
    }
  }, [_c("b-form-group", {
    staticClass: "text-left",
    attrs: {
      "invalid-feedback": _vm.veeErrors.first("brand")
    }
  }, [_c("label", {
    staticClass: "text-dark m-0 p-0"
  }, [_vm._v(_vm._s(_vm.$t("brand")))]), _vm._v(" "), _c("i", {
    staticClass: "fas fa-plus-circle text-primary m-0 p-0",
    staticStyle: {
      cursor: "pointer"
    },
    on: {
      click: function click($event) {
        _vm.modalBrandShow = true;
        _vm.modalBrandType = 1;
      }
    }
  }), _vm._v(" "), _c("multi-select", {
    attrs: {
      multiple: false,
      label: "name",
      "track-by": "name",
      "select-label": "",
      "deselect-label": "",
      options: _vm.brand,
      placeholder: _vm.$t("select") + _vm.$t("brand")
    },
    model: {
      value: _vm.form.brand,
      callback: function callback($$v) {
        _vm.$set(_vm.form, "brand", $$v);
      },
      expression: "form.brand"
    }
  })], 1)], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      lg: "6",
      md: "12",
      sm: "12"
    }
  }, [_c("b-form-group", {
    staticClass: "text-left",
    attrs: {
      "invalid-feedback": _vm.veeErrors.first("supplier")
    }
  }, [_c("label", {
    staticClass: "text-dark m-0 p-0"
  }, [_vm._v(_vm._s(_vm.$t("supplier")))]), _vm._v(" "), _c("i", {
    staticClass: "fas fa-plus-circle text-primary m-0 p-0",
    staticStyle: {
      cursor: "pointer"
    },
    on: {
      click: function click($event) {
        _vm.modalSupplierShow = true;
        _vm.modalSupplierType = 1;
      }
    }
  }), _vm._v(" "), _c("multi-select", {
    attrs: {
      multiple: false,
      label: "name",
      "track-by": "name",
      options: _vm.vendor,
      "select-label": "",
      "deselect-label": "",
      placeholder: _vm.$t("select") + _vm.$t("supplier")
    },
    model: {
      value: _vm.form.supplier,
      callback: function callback($$v) {
        _vm.$set(_vm.form, "supplier", $$v);
      },
      expression: "form.supplier"
    }
  })], 1)], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      lg: "6",
      md: "12",
      sm: "12"
    }
  }, [_c("b-form-group", {
    staticClass: "text-left",
    attrs: {
      "invalid-feedback": _vm.veeErrors.first("tag")
    }
  }, [_c("label", {
    staticClass: "text-dark m-0 p-0"
  }, [_vm._v(_vm._s(_vm.$t("tag")))]), _vm._v(" "), _c("i", {
    staticClass: "fas fa-plus-circle text-primary m-0 p-0",
    staticStyle: {
      cursor: "pointer"
    },
    on: {
      click: function click($event) {
        _vm.modalTagShow = true;
        _vm.modalTagType = 1;
      }
    }
  }), _vm._v(" "), _c("multi-select", {
    attrs: {
      multiple: false,
      label: "name",
      "track-by": "name",
      "select-label": "",
      "deselect-label": "",
      options: _vm.tag,
      placeholder: _vm.$t("select") + _vm.$t("tag")
    },
    model: {
      value: _vm.form.tag,
      callback: function callback($$v) {
        _vm.$set(_vm.form, "tag", $$v);
      },
      expression: "form.tag"
    }
  })], 1)], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      lg: "6",
      md: "12",
      sm: "12"
    }
  }, [_c("b-form-group", {
    staticClass: "text-left",
    attrs: {
      label: _vm.$t("tax"),
      "label-class": "control-label"
    }
  }, [_c("b-form-input", {
    attrs: {
      type: "number",
      placeholder: _vm.$t("tax")
    },
    model: {
      value: _vm.form.tax,
      callback: function callback($$v) {
        _vm.$set(_vm.form, "tax", $$v);
      },
      expression: "form.tax"
    }
  })], 1)], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      lg: "6",
      md: "12",
      sm: "12"
    }
  }, [_c("b-form-group", {
    attrs: {
      "invalid-feedback": _vm.veeErrors.first("unit"),
      state: !_vm.veeErrors.has("unit")
    }
  }, [_c("label", {
    staticClass: "text-dark m-0 p-0"
  }, [_vm._v(_vm._s(_vm.$t("unit") + " *"))]), _vm._v(" "), _c("i", {
    staticClass: "fas fa-plus-circle text-primary mt-1 p-0",
    staticStyle: {
      cursor: "pointer"
    },
    on: {
      click: function click($event) {
        return _vm.openUnitModal(null);
      }
    }
  }), _vm._v(" "), _c("multi-select", {
    directives: [{
      name: "validate",
      rawName: "v-validate",
      value: "required",
      expression: "'required'"
    }],
    attrs: {
      multiple: false,
      label: "name",
      "track-by": "name",
      options: _vm.unit,
      "select-label": "",
      "deselect-label": "",
      state: _vm.veeErrors.has("unit") ? false : null,
      "data-vv-name": "unit",
      "data-vv-as": _vm.$t("unit"),
      placeholder: _vm.$t("select") + _vm.$t("unit")
    },
    model: {
      value: _vm.form.unit,
      callback: function callback($$v) {
        _vm.$set(_vm.form, "unit", $$v);
      },
      expression: "form.unit"
    }
  })], 1)], 1), _vm._v(" "), _vm.checkCustomModuleAuthorize("product", "view_cost") ? _c("b-col", {
    attrs: {
      lg: "6",
      md: "12",
      sm: "12"
    }
  }, [_c("b-form-group", {
    staticClass: "text-left",
    attrs: {
      "invalid-feedback": _vm.veeErrors.first("cost"),
      state: _vm.veeErrors.has("cost") ? false : null,
      label: _vm.$t("cost") + " *",
      "label-class": "control-label"
    }
  }, [_c("b-input-group", {
    scopedSlots: _vm._u([{
      key: "prepend",
      fn: function fn() {
        return [_c("b-form-select", {
          directives: [{
            name: "validate",
            rawName: "v-validate",
            value: "required",
            expression: "'required'"
          }],
          attrs: {
            options: _vm.currencies,
            "value-field": "id",
            "text-field": "name",
            state: _vm.veeErrors.has("cost") ? false : null,
            "data-vv-name": "cost",
            "data-vv-as": _vm.$t("cost")
          },
          scopedSlots: _vm._u([{
            key: "first",
            fn: function fn() {
              return [_c("b-form-select-option", {
                attrs: {
                  value: null,
                  disabled: ""
                }
              }, [_vm._v(_vm._s(_vm.$t("currency")) + "\n                          ")])];
            },
            proxy: true
          }], null, false, 1381749530),
          model: {
            value: _vm.form.cost_currency_id,
            callback: function callback($$v) {
              _vm.$set(_vm.form, "cost_currency_id", $$v);
            },
            expression: "form.cost_currency_id"
          }
        })];
      },
      proxy: true
    }], null, false, 3239920032)
  }, [_c("b-form-input", {
    directives: [{
      name: "validate",
      rawName: "v-validate",
      value: "required|max:20",
      expression: "'required|max:20'"
    }],
    attrs: {
      state: _vm.veeErrors.has("cost") ? false : null,
      "data-vv-name": "cost",
      "data-vv-as": _vm.$t("cost"),
      type: "number",
      placeholder: _vm.$t("cost")
    },
    model: {
      value: _vm.form.cost,
      callback: function callback($$v) {
        _vm.$set(_vm.form, "cost", $$v);
      },
      expression: "form.cost"
    }
  })], 1)], 1)], 1) : _vm._e(), _vm._v(" "), _c("b-col", {
    attrs: {
      lg: "6",
      md: "12",
      sm: "12"
    }
  }, [_c("b-form-group", {
    staticClass: "text-left",
    attrs: {
      "invalid-feedback": _vm.veeErrors.first("price"),
      state: _vm.veeErrors.has("price") ? false : null,
      label: _vm.$t("price") + " *",
      "label-class": "control-label"
    }
  }, [_c("b-input-group", {
    scopedSlots: _vm._u([{
      key: "prepend",
      fn: function fn() {
        return [_c("b-form-select", {
          directives: [{
            name: "validate",
            rawName: "v-validate",
            value: "required",
            expression: "'required'"
          }],
          attrs: {
            options: _vm.currencies,
            "value-field": "id",
            "text-field": "name",
            state: _vm.veeErrors.has("price") ? false : null,
            "data-vv-name": "price",
            "data-vv-as": _vm.$t("price")
          },
          scopedSlots: _vm._u([{
            key: "first",
            fn: function fn() {
              return [_c("b-form-select-option", {
                attrs: {
                  value: null,
                  disabled: ""
                }
              }, [_vm._v(_vm._s(_vm.$t("currency")) + "\n                          ")])];
            },
            proxy: true
          }]),
          model: {
            value: _vm.form.price_currency_id,
            callback: function callback($$v) {
              _vm.$set(_vm.form, "price_currency_id", $$v);
            },
            expression: "form.price_currency_id"
          }
        })];
      },
      proxy: true
    }])
  }, [_c("b-form-input", {
    directives: [{
      name: "validate",
      rawName: "v-validate",
      value: "required|max:20",
      expression: "'required|max:20'"
    }],
    attrs: {
      state: _vm.veeErrors.has("price") ? false : null,
      "data-vv-name": "price",
      "data-vv-as": _vm.$t("price"),
      type: "number",
      placeholder: _vm.$t("price")
    },
    model: {
      value: _vm.form.price,
      callback: function callback($$v) {
        _vm.$set(_vm.form, "price", $$v);
      },
      expression: "form.price"
    }
  })], 1)], 1)], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      lg: "6",
      md: "12",
      sm: "12"
    }
  }, [_c("b-form-group", {
    staticClass: "text-left",
    attrs: {
      "invalid-feedback": _vm.veeErrors.first("product_type_id"),
      state: _vm.veeErrors.has("product_type_id") ? false : null,
      label: _vm.$t("product_type") + " *",
      "label-class": "control-label"
    }
  }, [_c("b-input-group", [_c("b-form-select", {
    directives: [{
      name: "validate",
      rawName: "v-validate",
      value: "required",
      expression: "'required'"
    }],
    attrs: {
      state: _vm.veeErrors.has("product_type_id") ? false : null,
      "data-vv-name": "product_type_id",
      "data-vv-as": _vm.$t("product_type")
    },
    scopedSlots: _vm._u([{
      key: "first",
      fn: function fn() {
        return [_c("b-form-select-option", {
          attrs: {
            value: null,
            disabled: ""
          }
        }, [_vm._v("\n                          " + _vm._s(_vm.$t("product_type")) + "\n                        ")])];
      },
      proxy: true
    }]),
    model: {
      value: _vm.form.product_type_id,
      callback: function callback($$v) {
        _vm.$set(_vm.form, "product_type_id", $$v);
      },
      expression: "form.product_type_id"
    }
  }, [_vm._v(" "), _vm._l(_vm.enums.product_type, function (item, index) {
    return _c("b-form-select-option", {
      key: "product_type_" + index,
      attrs: {
        value: item.id
      }
    }, [_vm._v("\n                        " + _vm._s(_vm.$t(item.name)) + "\n                      ")]);
  })], 2)], 1)], 1)], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      lg: "6",
      md: "12",
      sm: "12"
    }
  }, [_c("b-form-group", {
    staticClass: "text-left",
    attrs: {
      "invalid-feedback": _vm.veeErrors.first("commission"),
      state: _vm.veeErrors.has("commission") ? false : null,
      label: _vm.$t("commission") + " *",
      "label-class": "control-label"
    }
  }, [_c("b-input-group", {
    scopedSlots: _vm._u([{
      key: "prepend",
      fn: function fn() {
        return [_c("b-form-select", {
          attrs: {
            state: _vm.veeErrors.has("commission") ? false : null,
            "data-vv-name": "commission",
            "data-vv-as": _vm.$t("commission"),
            disabled: _vm.form.price_currency_id == null ? true : false
          },
          scopedSlots: _vm._u([{
            key: "first",
            fn: function fn() {
              return [_c("b-form-select-option", {
                attrs: {
                  value: null,
                  disabled: ""
                }
              }, [_vm._v(_vm._s(_vm.$t("commission")) + "\n                          ")])];
            },
            proxy: true
          }]),
          model: {
            value: _vm.form.commission_type_id,
            callback: function callback($$v) {
              _vm.$set(_vm.form, "commission_type_id", $$v);
            },
            expression: "form.commission_type_id"
          }
        }, [_vm._v(" "), _vm._l(_vm.enums.commission_type, function (item, index) {
          return _c("b-form-select-option", {
            key: "commission_type_" + index,
            attrs: {
              value: item.id
            }
          }, [[item.id == 0 ? _c("span", [_vm._v("%")]) : _c("span", [_vm._v("\n                              " + _vm._s(_vm.form.price_currency_id == null ? _vm.$t("price") : _vm.getCurrencyDetail(_vm.form.price_currency_id).symbol) + "\n                            ")])]], 2);
        })], 2)];
      },
      proxy: true
    }])
  }, [_vm._v(" "), _c("b-form-input", {
    directives: [{
      name: "validate",
      rawName: "v-validate",
      value: "required|max:20",
      expression: "'required|max:20'"
    }],
    attrs: {
      state: _vm.veeErrors.has("commission") ? false : null,
      "data-vv-name": "commission",
      "data-vv-as": _vm.$t("commission"),
      type: "number",
      placeholder: _vm.$t("commission"),
      disabled: _vm.form.price_currency_id == null ? true : false
    },
    model: {
      value: _vm.form.commission_value,
      callback: function callback($$v) {
        _vm.$set(_vm.form, "commission_value", $$v);
      },
      expression: "form.commission_value"
    }
  })], 1)], 1)], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      lg: "4",
      md: "12",
      sm: "12"
    }
  }, [_c("b-form-group", {
    staticClass: "text-left",
    attrs: {
      label: _vm.$t("is_track_stock"),
      "label-class": "control-label"
    }
  }, [_c("b-form-checkbox", {
    model: {
      value: _vm.form.is_track_stock,
      callback: function callback($$v) {
        _vm.$set(_vm.form, "is_track_stock", $$v);
      },
      expression: "form.is_track_stock"
    }
  }, [_vm._v(_vm._s(_vm.$t("is_track_stock")) + "\n                  ")])], 1)], 1)], 1)], 1)], 1)], 1)], 1), _vm._v(" "), _vm.form.product_type_id == 3 ? _c("b-card", {
    staticClass: "shadow-sm mt-3",
    attrs: {
      "no-body": ""
    }
  }, [_c("b-card-header", [_c("h3", {
    staticClass: "info-title"
  }, [_vm._v(_vm._s(_vm.$t("composite")))])]), _vm._v(" "), _c("b-card-body", [_c("b-row", [_c("b-col", {
    attrs: {
      md: "12",
      lg: "12",
      xl: "12"
    }
  }, [_c("b-form-group", {
    attrs: {
      "label-for": "tag",
      "label-class": "control-label"
    }
  }, [_c("multi-select", {
    attrs: {
      multiple: false,
      label: "name",
      "track-by": "name",
      "select-label": "",
      "deselect-label": "",
      options: _vm.products,
      placeholder: _vm.$t("select") + _vm.$t("product")
    },
    on: {
      input: _vm.onProductSelected
    },
    model: {
      value: _vm.selected_product,
      callback: function callback($$v) {
        _vm.selected_product = $$v;
      },
      expression: "selected_product"
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "table-responsive",
    staticStyle: {
      height: "300px"
    }
  }, [_c("table", {
    staticClass: "table table-sm table-bordered",
    staticStyle: {
      width: "100%"
    }
  }, [_c("thead", [_c("tr", {
    staticStyle: {
      "white-space": "nowrap"
    }
  }, [_c("th", [_vm._v("No.")]), _vm._v(" "), _c("th", [_vm._v(_vm._s(_vm.$t("product")))]), _vm._v(" "), _c("th", [_vm._v(_vm._s(_vm.$t("quantity")))]), _vm._v(" "), _c("th", [_vm._v(_vm._s(_vm.$t("cost")))]), _vm._v(" "), _c("th", [_vm._v(_vm._s(_vm.$t("price")))]), _vm._v(" "), _c("th", [_vm._v(_vm._s(_vm.$t("action")))])])]), _vm._v(" "), _c("tbody", _vm._l(_vm.form.composite_lists, function (item, index) {
    return _c("tr", {
      key: index
    }, [_c("td", {
      staticStyle: {
        width: "50px",
        "vertical-align": "middle"
      }
    }, [_vm._v("\n                    " + _vm._s(index + 1) + "\n                  ")]), _vm._v(" "), _c("td", {
      staticStyle: {
        "vertical-align": "middle"
      }
    }, [_vm._v(_vm._s(item.name))]), _vm._v(" "), _c("td", {
      staticStyle: {
        width: "250px",
        "vertical-align": "middle"
      }
    }, [_c("b-input-group", [_c("b-form-input", {
      directives: [{
        name: "validate",
        rawName: "v-validate",
        value: "required|min_value:0.00001|max_value:1000",
        expression: "\n                            'required|min_value:0.00001|max_value:1000'\n                          "
      }],
      staticStyle: {
        "border-radius": "5px"
      },
      attrs: {
        state: _vm.veeErrors.has(item.vee_quantity) ? false : null,
        "data-vv-name": item.vee_quantity,
        "data-vv-as": _vm.$t("quantity"),
        type: "number",
        required: "",
        placeholder: _vm.$t("quantity")
      },
      on: {
        focus: function focus($event) {
          return $event.target.select();
        }
      },
      model: {
        value: item.quantity,
        callback: function callback($$v) {
          _vm.$set(item, "quantity", $$v);
        },
        expression: "item.quantity"
      }
    }), _vm._v(" "), _c("b-form-invalid-feedback", {
      staticStyle: {
        "margin-top": "35px"
      }
    }, [_vm._v("\n                        " + _vm._s(_vm.veeErrors.items.length > 0 ? _vm.veeErrors.items[0].msg : "") + "\n                      ")])], 1)], 1), _vm._v(" "), _c("td", {
      staticStyle: {
        "vertical-align": "middle"
      }
    }, [_vm.checkCustomModuleAuthorize("product", "view_cost") ? [_vm._v("\n                      " + _vm._s(_vm._f("currencyFormat")(item.cost)) + "\n                      "), _c("span", [_vm._v(_vm._s(_vm.getCurrencyDetail(item.cost_currency_id).symbol))])] : _vm._e()], 2), _vm._v(" "), _c("td", {
      staticStyle: {
        "vertical-align": "middle"
      }
    }, [_vm._v("\n                    " + _vm._s(_vm._f("currencyFormat")(item.price)) + "\n                    "), _c("span", [_vm._v(_vm._s(_vm.getCurrencyDetail(item.price_currency_id).symbol))])]), _vm._v(" "), _c("td", {
      staticStyle: {
        width: "50px",
        "vertical-align": "middle"
      }
    }, [_c("b-button", {
      staticClass: "mr-1 btn-default",
      attrs: {
        variant: "link",
        size: "sm"
      },
      on: {
        click: function click($event) {
          return _vm.rowCompositeDelete(index, item);
        }
      }
    }, [_c("p", {
      staticClass: "h6 mt-1"
    }, [_c("i", {
      staticClass: "fa fa-trash text-danger"
    })])])], 1)]);
  }), 0)])])], 1)], 1)], 1)], 1) : _vm._e()], 1), _vm._v(" "), _c("template", {
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
  }), _vm._v("\n      " + _vm._s(_vm.$t("close")) + "\n    ")]), _vm._v(" "), _c("b-button", {
    staticClass: "float-right ml-2",
    attrs: {
      type: "submit",
      variant: "outline-primary"
    },
    on: {
      click: function click($event) {
        $event.preventDefault();
        return _vm.onSubmit.apply(null, arguments);
      }
    }
  }, [_c("i", {
    staticClass: "fas fa-save mr-1"
  }), _vm._v("\n      " + _vm._s(_vm.$t("save")) + "\n    ")])], 1), _vm._v(" "), _vm.modalShowCropperImage ? _c("div", [_c("modal-cropper-image", {
    attrs: {
      "modal-show": _vm.modalShowCropperImage,
      "target-file": _vm.cropperImageTargetFile,
      "aspect-ratio": 1 / 1,
      "preview-width": 350,
      "preview-height": 350,
      buttonOptions: {
        flipX: true,
        flipY: true,
        rotatePlus90: true,
        rotateMinus90: true
      }
    },
    on: {
      closeModal: _vm.closeModalCropperImage,
      save: _vm.saveModalCropperImage
    }
  })], 1) : _vm._e()], 2);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/product_management/product/components/CloneModal.vue?vue&type=style&index=0&id=d7eecb54&scoped=true&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/product_management/product/components/CloneModal.vue?vue&type=style&index=0&id=d7eecb54&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n[data-v-d7eecb54] .custom-modal {\n  border-radius: 15px;\n}\n[data-v-d7eecb54] .modal-dialog {\n  max-width: 80%;\n}\n.minus-image[data-v-d7eecb54] {\n  cursor: pointer;\n  position: absolute;\n  margin-top: 8px;\n}\n.minus-image[data-v-d7eecb54]:hover {\n  background-color: rgba(255, 0, 0, 0.2);\n  border-radius: 8px;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/product_management/product/components/CloneModal.vue?vue&type=style&index=0&id=d7eecb54&scoped=true&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/product_management/product/components/CloneModal.vue?vue&type=style&index=0&id=d7eecb54&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader??ref--6-1!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--6-2!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./CloneModal.vue?vue&type=style&index=0&id=d7eecb54&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/product_management/product/components/CloneModal.vue?vue&type=style&index=0&id=d7eecb54&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./resources/js/pages/product_management/product/components/CloneModal.vue":
/*!*********************************************************************************!*\
  !*** ./resources/js/pages/product_management/product/components/CloneModal.vue ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CloneModal_vue_vue_type_template_id_d7eecb54_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CloneModal.vue?vue&type=template&id=d7eecb54&scoped=true& */ "./resources/js/pages/product_management/product/components/CloneModal.vue?vue&type=template&id=d7eecb54&scoped=true&");
/* harmony import */ var _CloneModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CloneModal.vue?vue&type=script&lang=js& */ "./resources/js/pages/product_management/product/components/CloneModal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _CloneModal_vue_vue_type_style_index_0_id_d7eecb54_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CloneModal.vue?vue&type=style&index=0&id=d7eecb54&scoped=true&lang=css& */ "./resources/js/pages/product_management/product/components/CloneModal.vue?vue&type=style&index=0&id=d7eecb54&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _CloneModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CloneModal_vue_vue_type_template_id_d7eecb54_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CloneModal_vue_vue_type_template_id_d7eecb54_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "d7eecb54",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/product_management/product/components/CloneModal.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/product_management/product/components/CloneModal.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/pages/product_management/product/components/CloneModal.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CloneModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./CloneModal.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/product_management/product/components/CloneModal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CloneModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/product_management/product/components/CloneModal.vue?vue&type=style&index=0&id=d7eecb54&scoped=true&lang=css&":
/*!******************************************************************************************************************************************!*\
  !*** ./resources/js/pages/product_management/product/components/CloneModal.vue?vue&type=style&index=0&id=d7eecb54&scoped=true&lang=css& ***!
  \******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CloneModal_vue_vue_type_style_index_0_id_d7eecb54_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader!../../../../../../node_modules/css-loader??ref--6-1!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--6-2!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./CloneModal.vue?vue&type=style&index=0&id=d7eecb54&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/product_management/product/components/CloneModal.vue?vue&type=style&index=0&id=d7eecb54&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CloneModal_vue_vue_type_style_index_0_id_d7eecb54_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CloneModal_vue_vue_type_style_index_0_id_d7eecb54_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CloneModal_vue_vue_type_style_index_0_id_d7eecb54_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CloneModal_vue_vue_type_style_index_0_id_d7eecb54_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/pages/product_management/product/components/CloneModal.vue?vue&type=template&id=d7eecb54&scoped=true&":
/*!****************************************************************************************************************************!*\
  !*** ./resources/js/pages/product_management/product/components/CloneModal.vue?vue&type=template&id=d7eecb54&scoped=true& ***!
  \****************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_CloneModal_vue_vue_type_template_id_d7eecb54_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./CloneModal.vue?vue&type=template&id=d7eecb54&scoped=true& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/product_management/product/components/CloneModal.vue?vue&type=template&id=d7eecb54&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_CloneModal_vue_vue_type_template_id_d7eecb54_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_CloneModal_vue_vue_type_template_id_d7eecb54_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);