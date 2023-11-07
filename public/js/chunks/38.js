(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[38],{

/***/ "./node_modules/nice-numeric-input/dist/nice-numeric-input.esm.js":
/*!************************************************************************!*\
  !*** ./node_modules/nice-numeric-input/dist/nice-numeric-input.esm.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return entry_esm; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);


var script = vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
  props: {
    value: {
      type: Number,
      default: 0
    },
    id: {
      type: String,
      default: "nice-numeric-input"
    },
    name: {
      type: String,
      default: "nice-numeric-input"
    },
    label: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: ""
    },
    step: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      default: Number.NEGATIVE_INFINITY
    },
    max: {
      type: Number,
      default: Number.POSITIVE_INFINITY
    },
    isValid: {
      type: Boolean,
      default: false,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    locale: {
      type: String,
      default: null
    },
    currency: {
      type: String,
      default: null
    },
    minDecimalPlaces: {
      type: Number,
      default: 0
    },
    maxDecimalPlaces: {
      type: Number,
      default: 2
    },
    integerOnly: {
      type: Boolean,
      default: false
    },
    noControls: {
      type: Boolean,
      default: false
    },
    hideLabel: {
      type: Boolean,
      default: false
    },
    decreaseTitle: {
      type: String,
      default: "Increase"
    },
    increaseTitle: {
      type: String,
      default: "Decrease"
    },
    increaseText: {
      type: String,
      default: "+"
    },
    decreaseText: {
      type: String,
      default: "-"
    },
    superIncreaseText: {
      type: String,
      default: "++"
    },
    superDecreaseText: {
      type: String,
      default: "--"
    },
    ultraIncreaseText: {
      type: String,
      default: "+++"
    },
    ultraDecreaseText: {
      type: String,
      default: "---"
    },
    superStep: {
      type: Number,
      default: 10
    },
    ultraStep: {
      type: Number,
      default: 100
    },
    labelClass: {
      type: String,
      default: null
    },
    inputClass: {
      type: String,
      default: null
    },
    decreaseButtonClass: {
      type: String,
      default: null
    },
    increaseButtonClass: {
      type: String,
      default: null
    },
    wrapperClass: {
      type: String,
      default: null
    },
    superStepClass: {
      type: String,
      default: ""
    },
    ultraStepClass: {
      type: String,
      default: ""
    }
  },
  data: function () {
    return {
      internalValue: null,
      ctrlActive: false,
      shiftActive: false,
      internalLocale: "en-US"
    };
  },
  computed: {
    labelId: function () {
      return this.id + '-label';
    },
    canIncrease: function () {
      return this.internalValueIsNotDefined || this.internalValue + this.internalStep <= this.max;
    },
    canDecrease: function () {
      return this.internalValueIsNotDefined || this.internalValue - this.internalStep >= this.min;
    },
    displayString: function () {
      if (this.internalValueIsNotDefined) {
        if (this.value) {
          this.setInternalValue(this.value);
        } else {
          this.setToDefaultValue();
        }
      }

      var minDecimals = 0,
          maxDecimals = 0;

      if (!this.integerOnly) {
        minDecimals = this.minDecimalPlaces;
        maxDecimals = this.maxDecimalPlaces;
      }

      return this.internalValue.toLocaleString(this.internalLocale, {
        style: this.currency ? "currency" : "decimal",
        currency: this.currency || undefined,
        minimumFractionDigits: minDecimals,
        maximumFractionDigits: maxDecimals
      });
    },
    internalValueIsNotDefined: function () {
      return this.internalValue == null || Number.isNaN(this.internalValue);
    },
    isValidComputed: {
      get: function () {
        return this.isValid;
      },
      set: function (val) {
        this.$emit('update:isValid', val);
      }
    },
    isError: function () {
      var error = false;

      if (this.internalValue == null || this.internalValue > this.max || this.internalValue < this.min) {
        error = true;
      }

      this.isValidComputed = !error;
      return error;
    },
    isUltraChangeActive: function () {
      return this.ctrlActive && this.shiftActive;
    },
    isSuperChangeActive: function () {
      // Equivalent of ctrlActive XOR shiftActive for booleans.
      return this.ctrlActive != this.shiftActive;
    },
    internalIncreaseText: function () {
      if (this.isUltraChangeActive) {
        return this.ultraIncreaseText;
      } else if (this.isSuperChangeActive) {
        return this.superIncreaseText;
      } else {
        return this.increaseText;
      }
    },
    internalDecreaseText: function () {
      if (this.isUltraChangeActive) {
        return this.ultraDecreaseText;
      } else if (this.isSuperChangeActive) {
        return this.superDecreaseText;
      } else {
        return this.decreaseText;
      }
    },
    changeButtonClass: function () {
      if (this.isUltraChangeActive) {
        return this.ultraStepClass || "much-smaller-padding";
      } else if (this.isSuperChangeActive) {
        return this.superStepClass || "smaller-padding";
      } else {
        return "";
      }
    },
    internalStep: function () {
      if (this.isUltraChangeActive) {
        return this.ultraStep;
      } else if (this.isSuperChangeActive) {
        return this.superStep;
      } else {
        return this.step;
      }
    }
  },
  methods: {
    getDefaultValue: function () {
      if (this.min != Number.NEGATIVE_INFINITY) {
        return this.min;
      }

      return 0;
    },
    handlePaste: function (e) {
      var clipboardData = e.clipboardData || window.clipboardData;
      var pastedData = clipboardData.getData("Text");

      if (pastedData) {
        e.stopPropagation();
        e.preventDefault();
        this.valueChanged(pastedData, null);
      }
    },
    handleInput: function (e) {
      var target = e.target;
      this.valueChanged(target.value, e.data);
    },
    handleChange: function (e) {
      var target = e.target;
      this.valueChanged(target.value, null, true);
    },
    valueChanged: function (newValue, newInput, strictValidation, possibleRecurse) {
      if (strictValidation === void 0) {
        strictValidation = false;
      }

      if (possibleRecurse === void 0) {
        possibleRecurse = true;
      }

      var decimalNumbersRegex = /[+-]?\d+(\.\d+)?/g;
      var normalisedInput = this.normaliseInput(newValue, this.internalLocale); // Match to find any numbers.

      var matches = normalisedInput.match(decimalNumbersRegex);
      var result = null;
      var isValidNonNumeric = false;

      if (!strictValidation && (this.isEmptyInput(newValue) || this.isStartingSignedInput(newValue) || this.isAddingDecimalPlaces(newValue))) {
        isValidNonNumeric = true;
      } else if (matches != null && matches.length > 0) {
        // Parse the first match.
        result = parseFloat(matches[0]);
      } else {
        if (possibleRecurse && newValue.length > 0) {
          this.valueChanged("" + newValue[0], newInput, strictValidation, false);
          return;
        } // Manually clear the invalid input to cover edge cases where computed properties don't update because the internal value hasn't changed value.


        this.$refs.numberInput.value = null;
      } // Don't reset to 0 when we have a valid non-numeric edge case.


      if (!isValidNonNumeric) {
        if (this.integerOnly) {
          result = Math.round(result);
        }

        if (newInput === "-") {
          result = -result;
        } else if (newInput === "+") {
          result = Math.abs(result);
        }

        this.setInternalValue(result);
      }
    },
    normaliseInput: function (value, locale) {
      var example = Intl.NumberFormat(locale).format(1.1);
      var cleanRegExp = new RegExp("[^-+0-9" + example.charAt(1) + "]", "g");
      var cleanValue = value.replace(cleanRegExp, "");
      var normalised = cleanValue.replace(example.charAt(1), ".");
      return normalised;
    },
    isStartingSignedInput: function (input) {
      return input.length === 1 && (input === "+" || input === "-");
    },
    isEmptyInput: function (input) {
      return input.length === 0;
    },
    isAddingDecimalPlaces: function (input) {
      return input.endsWith(".") || input.endsWith(",") || input.endsWith(" ");
    },
    increase: function () {
      if (this.canIncrease) {
        if (this.internalValueIsNotDefined) {
          this.setToDefaultValue();
        }

        this.setInternalValue(this.internalValue + this.internalStep);
      }
    },
    decrease: function () {
      if (this.canDecrease) {
        if (this.internalValueIsNotDefined) {
          this.setToDefaultValue();
        }

        this.setInternalValue(this.internalValue - this.internalStep);
      }
    },
    setToDefaultValue: function () {
      var newVal = 0;

      if (this.min != Number.NEGATIVE_INFINITY) {
        newVal = this.min;
      }

      this.setInternalValue(newVal);
    },
    setInternalValue: function (val) {
      // Wipe out the value to force an update even if the value hasn't changed - ensures extra characters that don't affect the parsed value are removed from display.
      this.internalValue = null;
      this.internalValue = val;
      this.$emit('input', this.internalValue);
    },
    keychange: function (e) {
      this.ctrlActive = e.ctrlKey;
      this.shiftActive = e.shiftKey;
    }
  },
  created: function () {
    if (this.locale === null) {
      if (typeof window !== 'undefined' && window) {
        this.internalLocale = window.navigator.language;
        document.addEventListener("keydown", this.keychange);
        document.addEventListener("keyup", this.keychange);
      }
    } else {
      this.internalLocale = this.locale;
    }

    if (vue__WEBPACK_IMPORTED_MODULE_0___default.a.config.devtools) {
      // Validate props that depend on each other in development mode.
      if (this.min > this.max) {
        console.error("nice-numeric-input Prop Error: Min [" + this.min + "] cannot be greater than Max [" + this.max + "]");
      }

      if (this.$listeners && !this.$listeners.input) {
        console.warn("nice-numeric-input Warning: There is no input event listener attached, use v-model or bind one directly to the input event.");
      }
    }
  },
  beforeDestroy: function () {
    document.removeEventListener('keydown', this.keychange);
    document.removeEventListener('keyup', this.keychange);
  },
  watch: {
    value: function (newVal) {
      this.internalValue = newVal;
    }
  }
});

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "input-wrapper",
    class: [_vm.noControls ? '' : 'controls', _vm.isError ? 'error' : '', _vm.wrapperClass]
  }, [!_vm.hideLabel ? _c('label', {
    staticClass: "input-label",
    class: _vm.labelClass,
    attrs: {
      "id": _vm.labelId,
      "for": _vm.id
    }
  }, [_vm._v("\n            " + _vm._s(_vm.label) + "\n        ")]) : _vm._e(), _vm._v(" "), !_vm.noControls ? _c('button', {
    staticClass: "left-control",
    class: [_vm.changeButtonClass, _vm.decreaseButtonClass],
    attrs: {
      "disabled": _vm.disabled || !_vm.canDecrease,
      "title": _vm.decreaseTitle
    },
    on: {
      "click": _vm.decrease
    }
  }, [_vm._v("\n            " + _vm._s(_vm.internalDecreaseText) + "\n        ")]) : _vm._e(), _vm._v(" "), _c('input', {
    ref: "numberInput",
    class: [_vm.noControls ? 'no-controls-input' : 'double-controls-input', _vm.inputClass],
    attrs: {
      "id": _vm.id,
      "name": _vm.name,
      "disabled": _vm.disabled,
      "type": "text",
      "placeholder": _vm.placeholder,
      "aria-labelledby": !_vm.hideLabel ? _vm.labelId : false,
      "aria-label": _vm.hideLabel ? _vm.label : false
    },
    domProps: {
      "value": _vm.displayString
    },
    on: {
      "input": _vm.handleInput,
      "change": _vm.handleChange,
      "paste": _vm.handlePaste
    }
  }), _vm._v(" "), !_vm.noControls ? _c('button', {
    staticClass: "right-control",
    class: [_vm.changeButtonClass, _vm.increaseButtonClass],
    attrs: {
      "disabled": _vm.disabled || !_vm.canIncrease,
      "title": _vm.increaseTitle
    },
    on: {
      "click": _vm.increase
    }
  }, [_vm._v("\n            " + _vm._s(_vm.internalIncreaseText) + "\n        ")]) : _vm._e()]);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-89fe9580_0", {
    source: ".input-wrapper[data-v-89fe9580]{position:relative;font-weight:400;font-style:normal;display:-webkit-box;display:-ms-flexbox;display:flex;color:rgba(0,0,0,.9)}.input-wrapper>input[data-v-89fe9580]{width:100%;margin:0;max-width:100%;-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;outline:0;-webkit-tap-highlight-color:transparent;text-align:left;line-height:1.2em;font-family:\"Helvetica Neue\",Arial,Helvetica,sans-serif;padding:.66em 1em;background:#fff;border:1px solid rgba(34,36,38,.2);color:rgba(0,0,0,.9);border-radius:.3rem;-webkit-transition:border-color .1s ease,-webkit-box-shadow .1s ease;transition:border-color .1s ease,-webkit-box-shadow .1s ease;transition:box-shadow .1s ease,border-color .1s ease;transition:box-shadow .1s ease,border-color .1s ease,-webkit-box-shadow .1s ease;-webkit-box-shadow:none;box-shadow:none}.input-wrapper input[disabled][data-v-89fe9580],.input-wrapper.disabled[data-v-89fe9580]{opacity:.4}.input-wrapper.disabled>input[data-v-89fe9580]{pointer-events:none}.input-wrapper>input[data-v-89fe9580]:active{border-color:rgba(0,0,0,.4);background:#fafafa}.input-wrapper>input[data-v-89fe9580]:focus{border-color:#85b7d9;background:#fff;color:rgba(0,0,0,.8)}.input-wrapper.error>input[data-v-89fe9580]{background-color:#ffd7d7;border-color:#dba8a8;color:#9b2d2b}.input-wrapper>input[data-v-89fe9580]::-webkit-input-placeholder{color:rgba(191,191,191,.87)}.input-wrapper>input[data-v-89fe9580]::-moz-placeholder{color:rgba(191,191,191,.87)}.input-wrapper>input[data-v-89fe9580]:-ms-input-placeholder{color:rgba(191,191,191,.87)}.input-wrapper.error>input[data-v-89fe9580]::-webkit-input-placeholder{color:#e7bdbc}.input-wrapper.error>input[data-v-89fe9580]::-moz-placeholder{color:#e7bdbc}.input-wrapper.error>input[data-v-89fe9580]::-ms-input-placeholder{color:#e7bdbc!important}.input-wrapper.error>input[data-v-89fe9580]:focus::-webkit-input-placeholder{color:#da9796}.input-wrapper.error>input[data-v-89fe9580]:focus::-moz-placeholder{color:#da9796}.input-wrapper.error>input[data-v-89fe9580]:focus::-ms-input-placeholder{color:#da9796!important}.input-label[data-v-89fe9580]{-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto;margin:0;font-size:1em;padding-right:1em;font-weight:700;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}button[data-v-89fe9580]{cursor:pointer;display:inline-block;min-height:1em;outline:0;border:none;vertical-align:baseline;background:#e0e1e2 none;color:rgba(0,0,0,.7);font-family:\"Helvetica Neue\",Arial,Helvetica,sans-serif;margin:0 .25em 0 0;padding:.75em 1.5em .75em}button.smaller-padding[data-v-89fe9580]{padding:.75em 1.25em .75em}button.much-smaller-padding[data-v-89fe9580]{padding:.75em 1em .75em}button[data-v-89fe9580]:hover{background-color:#cacbcd;-webkit-box-shadow:0 0 0 1px transparent inset,0 0 0 0 rgba(34,36,38,.15) inset;box-shadow:0 0 0 1px transparent inset,0 0 0 0 rgba(34,36,38,.15) inset;color:rgba(0,0,0,.8)}button[data-v-89fe9580]:focus{background-color:#cacbcd;color:rgba(0,0,0,.8);background-image:\"\"!important;-webkit-box-shadow:\"\"!important;box-shadow:\"\"!important}button[data-v-89fe9580]:active{background-color:#babbbc;background-image:\"\";color:rgba(0,0,0,.9);-webkit-box-shadow:0 0 0 1px transparent inset,none;box-shadow:0 0 0 1px transparent inset,none}button[data-v-89fe9580]:disabled{cursor:default;opacity:.4!important;-webkit-box-shadow:none!important;box-shadow:none!important;pointer-events:none!important}.input-wrapper.controls>button[data-v-89fe9580]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto;margin:0;text-transform:none;text-shadow:none;font-weight:700;line-height:1em;font-style:normal;text-align:center;text-decoration:none;-webkit-box-shadow:0 0 0 1px transparent inset,0 0 0 0 rgba(34,36,38,.15) inset;box-shadow:0 0 0 1px transparent inset,0 0 0 0 rgba(34,36,38,.15) inset;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-transition:opacity .1s ease,background-color .1s ease,color .1s ease,background .1s ease,-webkit-box-shadow .1s ease;transition:opacity .1s ease,background-color .1s ease,color .1s ease,background .1s ease,-webkit-box-shadow .1s ease;transition:opacity .1s ease,background-color .1s ease,color .1s ease,box-shadow .1s ease,background .1s ease;transition:opacity .1s ease,background-color .1s ease,color .1s ease,box-shadow .1s ease,background .1s ease,-webkit-box-shadow .1s ease;-webkit-tap-highlight-color:transparent}button.left-control[data-v-89fe9580]{border-radius:3px 0 0 3px}button.right-control[data-v-89fe9580]{border-radius:0 3px 3px 0}.double-controls-input[data-v-89fe9580]{border-radius:0!important}.no-controls-input[data-v-89fe9580]{border-radius:3px!important;border-left-color:rgba(34,36,38,.15)!important}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = "data-v-89fe9580";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

var component = __vue_component__;

// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var entry_esm = /*#__PURE__*/(function () {
  // Assign InstallableComponent type
  var installable = component; // Attach install function executed by Vue.use()

  installable.install = function (Vue) {
    Vue.component('NiceNumericInput', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;




/***/ })

}]);