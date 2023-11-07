(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[15],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/product_management/product/components/Modal.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/product_management/product/components/Modal.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuedraggable */ "./node_modules/vuedraggable/dist/vuedraggable.umd.js");
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vuedraggable__WEBPACK_IMPORTED_MODULE_2__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
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
    draggable: vuedraggable__WEBPACK_IMPORTED_MODULE_2___default.a,
    TextEditor: function TextEditor() {
      return Promise.all(/*! import() */[__webpack_require__.e(2), __webpack_require__.e(3)]).then(__webpack_require__.bind(null, /*! ../../../../components/sharing/TextEditor */ "./resources/js/components/sharing/TextEditor.vue"));
    }
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
        discount: 0,
        min_price: 0,
        max_price: 0,
        stock_alert: 0,
        cost_currency_id: null,
        price_currency_id: null,
        is_track_stock: false,
        product_type_id: 1,
        commission_type_id: 0,
        commission_value: 0,
        composite_lists: [],
        deleted_lists: [],
        product_image: [],
        description: null,
        how_to_use: null,
        ingredients: null
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
      deletedProductImage: [],
      blob: null
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
          if (this.formItem.action == "edit") {
            this.apiUrl = "/product/edit";
          } else {
            this.apiUrl = "/product/copy";
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
          input.image = null;
          input.old_image = null;
          axios.post(_this.apiUrl, input).then(function (response) {
            if (response.status === 200) {
              vm.listItems = response.data;
              //console.log(response.data.data.product.id)
              vm.$store.dispatch("setProducts", response.data.data.product);
              if (response.data.success == 1) {
                //upload image
                if (vm.blob != null) {
                  var formData = new FormData();
                  formData.append('product_id', response.data.data.new_product.id);
                  formData.append('image', vm.blob);
                  axios.post("/product/upload_image", formData).then(function (res) {
                    if (res.data.success === 1) {
                      vm.clearForm(res);
                      vm.$notify({
                        group: "message",
                        type: "success",
                        title: vm.$t("product"),
                        text: vm.$t("done")
                      });
                    }
                  })["catch"](function (error) {
                    console.log(error);
                  });
                } else {
                  vm.clearForm(response);
                  vm.$notify({
                    group: "message",
                    type: "success",
                    title: vm.$t("product"),
                    text: vm.$t("done")
                  });
                }
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
      this.form.id = this.formItem.id;
      this.form.name = this.formItem.name;
      this.form.cost = parseFloat(this.formItem.cost);
      this.form.price = parseFloat(this.formItem.price);
      this.form.discount = parseFloat(this.formItem.discount);
      this.form.min_price = parseFloat(this.formItem.min_price);
      this.form.max_price = parseFloat(this.formItem.max_price);
      this.form.stock_alert = parseFloat(this.formItem.stock_alert);
      this.form.cost_currency_id = this.formItem.cost_currency_id;
      this.form.price_currency_id = this.formItem.price_currency_id;
      this.form.sku = this.formItem.sku;
      this.form.is_track_stock = this.formItem.is_track_stock == 1 ? true : false;
      this.form.image = this.formItem.image;
      this.form.old_image = this.formItem.image;
      this.form.commission_type_id = this.formItem.commission_type;
      this.form.commission_value = parseFloat(this.formItem.commission_value);
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
      this.form.tax = parseFloat(this.formItem.tax);
      this.form.description = this.formItem.description;
      this.form.how_to_use = this.formItem.how_to_use;
      this.form.ingredients = this.formItem.ingredients;
      this.form.unit = this.unit.find(function (item) {
        return item.id == _this3.formItem.unit_id;
      });
      this.form.tax = this.formItem.tax;
      this.form.product_image = JSON.parse(JSON.stringify(this.formItem.product_image));
      this.form.product_image.map(function (obj) {
        obj.image = _this3.imgUrl + obj.image;
        return obj;
      });
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
      var _this4 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this4.imgUrl = "";
                if (!(_this4.imageType == "thumbnail")) {
                  _context.next = 10;
                  break;
                }
                _context.next = 4;
                return fetch(base64);
              case 4:
                _context.next = 6;
                return _context.sent.blob();
              case 6:
                _this4.blob = _context.sent;
                _this4.form.image = base64;
                _context.next = 20;
                break;
              case 10:
                if (!(_this4.imageType == "gallery")) {
                  _context.next = 20;
                  break;
                }
                _context.t0 = _this4.form.product_image;
                _context.t1 = base64;
                _context.next = 15;
                return fetch(base64);
              case 15:
                _context.next = 17;
                return _context.sent.blob();
              case 17:
                _context.t2 = _context.sent;
                _context.t3 = {
                  id: null,
                  image: _context.t1,
                  image_blob: _context.t2
                };
                _context.t0.push.call(_context.t0, _context.t3);
              case 20:
                _this4.closeModalCropperImage();
              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
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
    },
    getDescriptionText: function getDescriptionText(evt) {
      this.form.description = evt;
    },
    getHowToUseText: function getHowToUseText(evt) {
      this.form.how_to_use = evt;
    },
    getIngredients: function getIngredients(evt) {
      this.form.ingredients = evt;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/product_management/product/components/Modal.vue?vue&type=template&id=ed4f1cd2&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/product_management/product/components/Modal.vue?vue&type=template&id=ed4f1cd2&scoped=true& ***!
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
    staticClass: "fas fa-cubes"
  }), _vm._v(" " + _vm._s(_vm.$t("product")))])]), _vm._v(" "), _c("div", {
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
  })], 1)], 1), _vm._v(" "), _c("b-col", {
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
            disabled: "",
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
      "invalid-feedback": _vm.veeErrors.first("discount"),
      state: _vm.veeErrors.has("discount") ? false : null,
      label: _vm.$t("discount") + " *",
      "label-class": "control-label"
    }
  }, [_c("b-input-group", {
    attrs: {
      prepend: "%"
    }
  }, [_c("b-form-input", {
    directives: [{
      name: "validate",
      rawName: "v-validate",
      value: "required|max_value:100||min_value:0",
      expression: "'required|max_value:100||min_value:0'"
    }],
    attrs: {
      state: _vm.veeErrors.has("discount") ? false : null,
      "data-vv-name": "discount",
      "data-vv-as": _vm.$t("discount"),
      type: "number",
      placeholder: _vm.$t("discount")
    },
    model: {
      value: _vm.form.discount,
      callback: function callback($$v) {
        _vm.$set(_vm.form, "discount", $$v);
      },
      expression: "form.discount"
    }
  })], 1)], 1)], 1)], 1)], 1)], 1)], 1)], 1), _vm._v(" "), _c("b-card", {
    staticClass: "shadow-sm mt-3",
    attrs: {
      "no-body": ""
    }
  }, [_c("b-card-header", [_c("b-row", [_c("b-col", {
    attrs: {
      cols: "6"
    }
  }, [_c("h3", {
    staticClass: "info-title"
  }, [_vm._v(_vm._s(_vm.$t("description")))])]), _vm._v(" "), _c("b-col", {
    attrs: {
      cols: "6"
    }
  }, [_c("b-button", {
    directives: [{
      name: "b-toggle",
      rawName: "v-b-toggle.collapse-description",
      modifiers: {
        "collapse-description": true
      }
    }],
    staticClass: "float-right m-1"
  }, [_vm._v("Toggle How To Description")])], 1)], 1)], 1), _vm._v(" "), _c("b-card-body", [_c("b-row", [_c("b-col", {
    attrs: {
      cols: "12"
    }
  }, [_c("b-collapse", {
    attrs: {
      visible: "",
      id: "collapse-description"
    }
  }, [_c("text-editor", {
    attrs: {
      setText: _vm.form.description
    },
    on: {
      getText: _vm.getDescriptionText
    }
  })], 1)], 1)], 1)], 1)], 1), _vm._v(" "), _c("b-card", {
    staticClass: "shadow-sm mt-3",
    attrs: {
      "no-body": ""
    }
  }, [_c("b-card-header", [_c("b-row", [_c("b-col", {
    attrs: {
      cols: "6"
    }
  }, [_c("h3", {
    staticClass: "info-title"
  }, [_vm._v(_vm._s(_vm.$t("how_to_use")))])]), _vm._v(" "), _c("b-col", {
    attrs: {
      cols: "6"
    }
  }, [_c("b-button", {
    directives: [{
      name: "b-toggle",
      rawName: "v-b-toggle.collapse-use",
      modifiers: {
        "collapse-use": true
      }
    }],
    staticClass: "float-right m-1"
  }, [_vm._v("Toggle How To Use")])], 1)], 1)], 1), _vm._v(" "), _c("b-card-body", [_c("b-row", [_c("b-col", {
    attrs: {
      cols: "12"
    }
  }, [_c("b-collapse", {
    attrs: {
      visible: "",
      id: "collapse-use"
    }
  }, [_c("text-editor", {
    attrs: {
      setText: _vm.form.how_to_use
    },
    on: {
      getText: _vm.getHowToUseText
    }
  })], 1)], 1)], 1)], 1)], 1), _vm._v(" "), _c("b-card", {
    staticClass: "shadow-sm mt-3",
    attrs: {
      "no-body": ""
    }
  }, [_c("b-card-header", [_c("b-row", [_c("b-col", {
    attrs: {
      cols: "6"
    }
  }, [_c("h3", {
    staticClass: "info-title"
  }, [_vm._v(_vm._s(_vm.$t("ingredients")))])]), _vm._v(" "), _c("b-col", {
    attrs: {
      cols: "6"
    }
  }, [_c("b-button", {
    directives: [{
      name: "b-toggle",
      rawName: "v-b-toggle.collapse-use",
      modifiers: {
        "collapse-use": true
      }
    }],
    staticClass: "float-right m-1"
  }, [_vm._v("Toggle Ingredients")])], 1)], 1)], 1), _vm._v(" "), _c("b-card-body", [_c("b-row", [_c("b-col", {
    attrs: {
      cols: "12"
    }
  }, [_c("b-collapse", {
    attrs: {
      visible: "",
      id: "collapse-use"
    }
  }, [_c("text-editor", {
    attrs: {
      setText: _vm.form.ingredients
    },
    on: {
      getText: _vm.getIngredients
    }
  })], 1)], 1)], 1)], 1)], 1)], 1), _vm._v(" "), _c("template", {
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

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/product_management/product/components/Modal.vue?vue&type=style&index=0&id=ed4f1cd2&scoped=true&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/product_management/product/components/Modal.vue?vue&type=style&index=0&id=ed4f1cd2&scoped=true&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n[data-v-ed4f1cd2] .custom-modal {\n  border-radius: 15px;\n}\n[data-v-ed4f1cd2] .modal-dialog {\n  max-width: 80%;\n}\n.minus-image[data-v-ed4f1cd2] {\n  cursor: pointer;\n  position: absolute;\n  margin-top: 8px;\n}\n.minus-image[data-v-ed4f1cd2]:hover {\n  background-color: rgba(255, 0, 0, 0.2);\n  border-radius: 8px;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/product_management/product/components/Modal.vue?vue&type=style&index=0&id=ed4f1cd2&scoped=true&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/product_management/product/components/Modal.vue?vue&type=style&index=0&id=ed4f1cd2&scoped=true&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader??ref--6-1!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--6-2!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Modal.vue?vue&type=style&index=0&id=ed4f1cd2&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/product_management/product/components/Modal.vue?vue&type=style&index=0&id=ed4f1cd2&scoped=true&lang=css&");

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

/***/ "./resources/js/pages/product_management/product/components/Modal.vue":
/*!****************************************************************************!*\
  !*** ./resources/js/pages/product_management/product/components/Modal.vue ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Modal_vue_vue_type_template_id_ed4f1cd2_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Modal.vue?vue&type=template&id=ed4f1cd2&scoped=true& */ "./resources/js/pages/product_management/product/components/Modal.vue?vue&type=template&id=ed4f1cd2&scoped=true&");
/* harmony import */ var _Modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Modal.vue?vue&type=script&lang=js& */ "./resources/js/pages/product_management/product/components/Modal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Modal_vue_vue_type_style_index_0_id_ed4f1cd2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Modal.vue?vue&type=style&index=0&id=ed4f1cd2&scoped=true&lang=css& */ "./resources/js/pages/product_management/product/components/Modal.vue?vue&type=style&index=0&id=ed4f1cd2&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Modal_vue_vue_type_template_id_ed4f1cd2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Modal_vue_vue_type_template_id_ed4f1cd2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "ed4f1cd2",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/product_management/product/components/Modal.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/product_management/product/components/Modal.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/pages/product_management/product/components/Modal.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Modal.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/product_management/product/components/Modal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/product_management/product/components/Modal.vue?vue&type=style&index=0&id=ed4f1cd2&scoped=true&lang=css&":
/*!*************************************************************************************************************************************!*\
  !*** ./resources/js/pages/product_management/product/components/Modal.vue?vue&type=style&index=0&id=ed4f1cd2&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_style_index_0_id_ed4f1cd2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader!../../../../../../node_modules/css-loader??ref--6-1!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??ref--6-2!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Modal.vue?vue&type=style&index=0&id=ed4f1cd2&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/product_management/product/components/Modal.vue?vue&type=style&index=0&id=ed4f1cd2&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_style_index_0_id_ed4f1cd2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_style_index_0_id_ed4f1cd2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_style_index_0_id_ed4f1cd2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_style_index_0_id_ed4f1cd2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/pages/product_management/product/components/Modal.vue?vue&type=template&id=ed4f1cd2&scoped=true&":
/*!***********************************************************************************************************************!*\
  !*** ./resources/js/pages/product_management/product/components/Modal.vue?vue&type=template&id=ed4f1cd2&scoped=true& ***!
  \***********************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_template_id_ed4f1cd2_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Modal.vue?vue&type=template&id=ed4f1cd2&scoped=true& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/product_management/product/components/Modal.vue?vue&type=template&id=ed4f1cd2&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_template_id_ed4f1cd2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_template_id_ed4f1cd2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);