(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{219:function(e,t,i){"use strict";i(28)},220:function(e,t,i){(e.exports=i(4)(!1)).push([e.i,".headerRow[data-v-8997ca50]{padding:.75rem;background-color:#3b3f5c;color:#fff;font-weight:700;vertical-align:bottom;border-bottom:2px solid #dee2e6}.bodyRow[data-v-8997ca50]{padding:.75rem;border-top:1px solid #dee2e6}.child-menu[data-v-8997ca50]{margin-left:20px}[data-v-8997ca50] .custom-modal{border-radius:15px}",""])},28:function(e,t,i){var s=i(220);"string"==typeof s&&(s=[[e.i,s,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};i(5)(s,o);s.locals&&(e.exports=s.locals)},303:function(e,t,i){"use strict";i.r(t);var s=i(2);function o(e){return function(e){if(Array.isArray(e))return a(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return a(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);"Object"===i&&e.constructor&&(i=e.constructor.name);if("Map"===i||"Set"===i)return Array.from(e);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return a(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,s=new Array(t);i<t;i++)s[i]=e[i];return s}function l(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,s)}return i}function r(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?l(Object(i),!0).forEach((function(t){n(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):l(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function n(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}var c={props:{formItem:{type:Object,default:function(){return{}}},modalType:{type:Number,default:0}},data:function(){return{modal:!0,form:{id:null,name:null,description:null,user_type_id:null},url:null,chkCreateAll:!1,chkUpdateAll:!1,chkDeleteAll:!1,chkViewAll:!1,chkCreate:[],chkUpdate:[],chkDelete:[],chkView:[],listItems:{},customModuleItems:[]}},watch:{modalType:{handler:function(e){1==e?(this.modal=!0,this.url="/role/store"):2==e&&(this.modal=!0,this.url="/role/edit",this.setData(),this.getDataByRoleID())},immediate:!0},chkCreate:function(e,t){0===e.length?this.chkCreateAll=!1:e.length===this.moduleItems.length?this.chkCreateAll=!0:this.chkCreateAll=!1},chkUpdate:function(e,t){0===e.length?this.chkUpdateAll=!1:e.length===this.moduleItems.length?this.chkUpdateAll=!0:this.chkUpdateAll=!1},chkDelete:function(e,t){0===e.length?this.chkDeleteAll=!1:e.length===this.moduleItems.length?this.chkDeleteAll=!0:this.chkDeleteAll=!1},chkView:function(e,t){0===e.length?this.chkViewAll=!1:e.length===this.moduleItems.length?this.chkViewAll=!0:this.chkViewAll=!1},"form.user_type_id":{handler:function(e){e==this.$store.state.permission.USER?this.customModuleItems=this.customModuleItems.filter((function(e){return-1===e.module_key.indexOf("user_")})):this.setCustomModuleItem()},immediate:!0}},computed:r(r({},Object(s.b)({user_type:"getUserType",moduleItems:"getModuleItems"})),{},{modalOk:function(){return 1==this.modalType?this.$t("save"):2==this.modalType?this.$t("update"):"".concat(this.$t("wait"),"...")}}),methods:{setCustomModuleItem:function(){var e=this,t=[];this.moduleItems.forEach((function(i){if(""!=e.$helpers.nullToVoid(i.menu_title)){var s=Object.assign({},i);s.is_head_title=!0,t.push(s)}t.push(i)})),this.customModuleItems=t},getUserType:function(){var e=this;return this.user_type.filter((function(t){return t.id!=e.$store.state.permission.DEV&&t.id!=e.$store.state.permission.CASHIER}))},onSubmit:function(){var e=this,t=this;this.$validator.validateAll().then((function(i){if(i)if(0===e.chkView.length)t.$fire({position:"top-end",type:"warning",title:t.$t("at_least_view_one_module"),showConfirmButton:!1,backdrop:!1,toast:!0,background:"#f0ad4e",timer:2500});else{var s=e.form;s.role_permission=t.mergeRolePermission(),axios.post(e.url,s).then((function(e){200===e.status&&(t.listItems=e.data.data,t.clearForm(),t.$notify({group:"message",type:"success",title:t.$t("user_role"),text:t.$t("done")}))})).catch((function(e){console.log(e)}))}else t.$notify({group:"message",type:"warning",title:t.$t("user_role"),text:t.$t("validation_failed")})}))},clearForm:function(){var e=this;this.form={},this.$nextTick((function(){e.$validator.reset()})),this.$emit("closeModal",this.listItems),this.modal=!1,this.listItems={}},setData:function(){this.form=Object.assign({},this.formItem),this.setCustomModuleItem()},getDataByRoleID:function(){var e=this,t={role_id:this.formItem.id};axios.post("/role/get_update",t).then((function(t){e.splitRolePermission(t.data.data.role_permission)})).catch((function(e){console.log(e)}))},toggleCreateAll:function(e){var t=this;this.chkCreate=[],e&&this.customModuleItems.forEach((function(e){t.chkCreate.push(e.module_id+"_"+e.create)}))},toggleUpdateAll:function(e){var t=this;this.chkUpdate=[],e&&this.customModuleItems.forEach((function(e){t.chkUpdate.push(e.module_id+"_"+e.update)}))},toggleDeleteAll:function(e){var t=this;this.chkDelete=[],e&&this.customModuleItems.forEach((function(e){t.chkDelete.push(e.module_id+"_"+e.delete)}))},toggleViewAll:function(e){var t=this;this.chkView=[],e&&this.customModuleItems.forEach((function(e){t.chkView.push(e.module_id+"_"+e.view)}))},mergeRolePermission:function(){var e,t=[],i=[];(e=i).push.apply(e,o(this.chkCreate).concat(o(this.chkUpdate),o(this.chkDelete),o(this.chkView)));var s=[];if($.each(i,(function(e,t){-1===$.inArray(t,s)&&s.push(t)})),(i=s).forEach((function(e){e=e.split("_").map((function(e){return parseInt(e)})),t.push({module_id:e[0],permission_id:e[1]})})),this.form.user_type_id==this.$store.state.permission.USER){var a=this.moduleItems.filter((function(e){return e.module_key.indexOf("user_")>-1}));a.length>0&&a.map((function(e){var i=t.findIndex((function(t){return t.module_id==e.module_id}));i>-1&&t.splice(i,1)}))}return t},splitRolePermission:function(e){var t=this;this.chkCreate=[],this.chkUpdate=[],this.chkDelete=[],this.chkView=[],e.forEach((function(e){1==e.permission_id?t.chkCreate.push(e.module_id+"_"+e.permission_id):2==e.permission_id?t.chkUpdate.push(e.module_id+"_"+e.permission_id):3==e.permission_id?t.chkDelete.push(e.module_id+"_"+e.permission_id):4==e.permission_id&&t.chkView.push(e.module_id+"_"+e.permission_id)}))}}},u=(i(219),i(1)),d=Object(u.a)(c,(function(){var e=this,t=e._self._c;return t("b-modal",{attrs:{id:"modal",scrollable:"",centered:"","no-close-on-backdrop":"","no-close-on-esc":"","hide-header-close":"",size:"xl","content-class":"custom-modal"},model:{value:e.modal,callback:function(t){e.modal=t},expression:"modal"}},[t("template",{slot:"modal-header"},[t("h3",[t("i",{staticClass:"fas fa-user-lock"}),e._v(" "+e._s(e.$t("user_role")))])]),e._v(" "),t("div",{staticClass:"d-block"},[t("b-row",[t("b-col",{attrs:{cols:"4"}},[t("b-form-group",{staticClass:"text-left",attrs:{"invalid-feedback":e.veeErrors.first("name"),label:e.$t("name")+" *","label-class":"control-label"}},[t("b-form-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|max:191",expression:"'required|max:191'"}],attrs:{state:!e.veeErrors.has("name")&&null,"data-vv-name":"name","data-vv-as":e.$t("name"),type:"text",placeholder:e.$t("name")},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:(t.preventDefault(),e.onSubmit.apply(null,arguments))}},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1)],1),e._v(" "),t("b-col",{attrs:{cols:"4"}},[t("b-form-group",{staticClass:"text-left",attrs:{"invalid-feedback":e.veeErrors.first("user_type"),label:e.$t("user_type")+" *","label-class":"control-label"}},[t("b-form-select",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{state:!e.veeErrors.has("user_type")&&null,"data-vv-name":"user_type","data-vv-as":e.$t("user_type"),type:"text",placeholder:e.$t("user_type"),options:e.getUserType(),"value-field":"id","text-field":"type"},model:{value:e.form.user_type_id,callback:function(t){e.$set(e.form,"user_type_id",t)},expression:"form.user_type_id"}},[t("template",{slot:"first"},[t("option",{attrs:{disabled:""},domProps:{value:null}},[e._v("\n                "+e._s(e.$t("user_type"))+"\n              ")])])],2)],1)],1),e._v(" "),t("b-col",{attrs:{cols:"4"}},[t("b-form-group",{staticClass:"text-left",attrs:{"invalid-feedback":e.veeErrors.first("description"),label:e.$t("description")}},[t("b-form-input",{directives:[{name:"validate",rawName:"v-validate",value:"max:191",expression:"'max:191'"}],attrs:{state:!e.veeErrors.has("description")&&null,"data-vv-name":"description","data-vv-as":e.$t("description"),type:"text",placeholder:e.$t("description")},model:{value:e.form.description,callback:function(t){e.$set(e.form,"description",t)},expression:"form.description"}})],1)],1)],1),e._v(" "),t("b-row",{staticClass:"mt-2 mb-3"},[t("b-col",[t("h4",[e._v(e._s(e.$t("module_permission"))+":")]),e._v(" "),t("b-container",[t("div",{attrs:{id:"permissionsTable"}},[t("b-row",{staticClass:"headerRow",staticStyle:{position:"sticky",top:"-20px","z-index":"1000"}},[t("b-col",{staticClass:"p-0"},[e._v(e._s(e.$t("module")))]),e._v(" "),t("b-col",{staticClass:"p-0"},[e._e(),e._v(" "),t("span",{staticClass:"text-white"},[e._v("\n                    "+e._s(e.$t("create"))+"\n                ")])],1),e._v(" "),t("b-col",{staticClass:"p-0"},[e._e(),e._v(" "),t("span",{staticClass:"text-white"},[e._v("\n                  "+e._s(e.$t("update"))+"\n                ")])],1),e._v(" "),t("b-col",{staticClass:"p-0"},[e._e(),e._v(" "),t("span",{staticClass:"text-white"},[e._v("\n                  "+e._s(e.$t("delete"))+"\n                ")])],1),e._v(" "),t("b-col",{staticClass:"p-0"},[e._e(),e._v(" "),t("span",{staticClass:"text-white"},[e._v("\n                  "+e._s(e.$t("view"))+"\n                ")])],1)],1),e._v(" "),e._l(e.customModuleItems,(function(i,s){return t("b-row",{key:s,staticClass:"bodyRow"},[i.is_head_title?t("b-col",{staticStyle:{"font-weight":"bold"}},[e._v("\n                "+e._s(e.$t(i.menu_title))+"\n              ")]):e._e(),e._v(" "),i.is_head_title?e._e():t("b-col",[t("div",{class:0!=i.featured?"":"child-menu"},[e._v("\n                  "+e._s("product_category"==i.module_key?e.$t("category"):e.$t(i.module_key))+"\n                ")])]),e._v(" "),i.is_head_title?e._e():t("b-col",[t("b-form-checkbox",{attrs:{value:i.module_id+"_"+i.create,disabled:!i.permission.includes(i.create),size:"md"},model:{value:e.chkCreate,callback:function(t){e.chkCreate=t},expression:"chkCreate"}})],1),e._v(" "),i.is_head_title?e._e():t("b-col",[t("b-form-checkbox",{attrs:{value:i.module_id+"_"+i.update,disabled:!i.permission.includes(i.update),size:"md"},model:{value:e.chkUpdate,callback:function(t){e.chkUpdate=t},expression:"chkUpdate"}})],1),e._v(" "),i.is_head_title?e._e():t("b-col",[t("b-form-checkbox",{attrs:{value:i.module_id+"_"+i.delete,disabled:!i.permission.includes(i.delete),size:"md"},model:{value:e.chkDelete,callback:function(t){e.chkDelete=t},expression:"chkDelete"}})],1),e._v(" "),i.is_head_title?e._e():t("b-col",[t("b-form-checkbox",{attrs:{value:i.module_id+"_"+i.view,disabled:!i.permission.includes(i.view),size:"md"},model:{value:e.chkView,callback:function(t){e.chkView=t},expression:"chkView"}})],1)],1)}))],2)])],1)],1)],1),e._v(" "),t("template",{slot:"modal-footer"},[t("b-button",{staticClass:"float-right",attrs:{variant:"outline-danger"},on:{click:e.clearForm}},[t("i",{staticClass:"fas fa-times-circle mr-1"}),e._v("\n      "+e._s(e.$t("close"))+"\n    ")]),e._v(" "),t("b-button",{staticClass:"float-right ml-2",attrs:{type:"submit",variant:"outline-primary"},on:{click:function(t){return t.preventDefault(),e.onSubmit.apply(null,arguments)}}},[1==e.modalType?t("i",{staticClass:"fas fa-save mr-1"}):e._e(),e._v(" "),2==e.modalType?t("i",{staticClass:"fa fa-edit mr-1"}):e._e(),e._v("\n      "+e._s(e.modalOk)+"\n    ")])],1)],2)}),[],!1,null,"8997ca50",null);t.default=d.exports}}]);