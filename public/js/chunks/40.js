(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[40],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/sharing/TextEditor.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/sharing/TextEditor.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue2_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue2-editor */ "./node_modules/vue2-editor/dist/vue2-editor.esm.js");
/* harmony import */ var quill_image_resize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! quill-image-resize */ "./node_modules/quill-image-resize/image-resize.min.js");
/* harmony import */ var quill_image_resize__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(quill_image_resize__WEBPACK_IMPORTED_MODULE_1__);


vue2_editor__WEBPACK_IMPORTED_MODULE_0__["Quill"].register("modules/imageResize", quill_image_resize__WEBPACK_IMPORTED_MODULE_1___default.a);
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    editorSettings: {
      type: Object,
      "default": function _default() {
        return {
          modules: {
            imageResize: true
          }
        };
      }
    },
    customToolbar: {
      type: Array,
      "default": function _default() {
        return [["bold", "italic", "underline"], [{
          'header': [1, 2, 3, 4, 5, 6, false]
        }], ['blockquote', "link"], [{
          list: "ordered"
        }, {
          list: "bullet"
        }], [{
          'align': []
        }], [{
          'color': []
        }, {
          'background': []
        }], ["image"]];
      }
    },
    setText: {
      type: String,
      "default": ''
    }
  },
  watch: {
    setText: {
      handler: function handler(val) {
        if (this.$helpers.nullToVoid(val) != '') {
          this.text = val;
        }
      },
      immediate: true
    },
    text: {
      handler: function handler(val) {
        this.$emit("getText", val);
      },
      immediate: true
    }
  },
  data: function data() {
    return {
      text: '',
      image_upload_path: '/images/gallery/'
    };
  },
  methods: {
    handleImageAdded: function handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var _this = this;
      var formData = new FormData();
      formData.append("image", file);
      axios({
        url: '/branch/upload_images',
        method: 'POST',
        data: formData
      }).then(function (result) {
        var url = _this.image_upload_path + result.data; // Get url from response
        Editor.insertEmbed(cursorLocation, "image", url);
        resetUploader();
      })["catch"](function (err) {
        console.log(err);
      });
    },
    handleImageRemoved: function handleImageRemoved(image) {
      var imageName = image.split('/');
      axios.post('/branch/delete_images', {
        image: imageName[imageName.length - 1]
      }).then(function (res) {
        console.log(res);
      });
    },
    getText: function getText() {
      return this.text;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/sharing/TextEditor.vue?vue&type=template&id=33733738&":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/sharing/TextEditor.vue?vue&type=template&id=33733738& ***!
  \***************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_c("VueEditor", {
    attrs: {
      useCustomImageHandler: "",
      editorOptions: _vm.editorSettings,
      editorToolbar: _vm.customToolbar
    },
    on: {
      "image-added": _vm.handleImageAdded,
      "image-removed": _vm.handleImageRemoved
    },
    model: {
      value: _vm.text,
      callback: function callback($$v) {
        _vm.text = $$v;
      },
      expression: "text"
    }
  })], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/components/sharing/TextEditor.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/sharing/TextEditor.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TextEditor_vue_vue_type_template_id_33733738___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TextEditor.vue?vue&type=template&id=33733738& */ "./resources/js/components/sharing/TextEditor.vue?vue&type=template&id=33733738&");
/* harmony import */ var _TextEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TextEditor.vue?vue&type=script&lang=js& */ "./resources/js/components/sharing/TextEditor.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TextEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TextEditor_vue_vue_type_template_id_33733738___WEBPACK_IMPORTED_MODULE_0__["render"],
  _TextEditor_vue_vue_type_template_id_33733738___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/sharing/TextEditor.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/sharing/TextEditor.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/sharing/TextEditor.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TextEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./TextEditor.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/sharing/TextEditor.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TextEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/sharing/TextEditor.vue?vue&type=template&id=33733738&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/sharing/TextEditor.vue?vue&type=template&id=33733738& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_TextEditor_vue_vue_type_template_id_33733738___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../node_modules/vue-loader/lib??vue-loader-options!./TextEditor.vue?vue&type=template&id=33733738& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/sharing/TextEditor.vue?vue&type=template&id=33733738&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_TextEditor_vue_vue_type_template_id_33733738___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_TextEditor_vue_vue_type_template_id_33733738___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);