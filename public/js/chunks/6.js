(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{221:function(t,e,o){"use strict";o(25)},222:function(t,e,o){(t.exports=o(4)(!1)).push([t.i,"[data-v-15442471] .custom-modal{border-radius:15px}[data-v-15442471] .ql-editor{min-height:180px!important}",""])},25:function(t,e,o){var a=o(222);"string"==typeof a&&(a=[[t.i,a,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};o(5)(a,r);a.locals&&(t.exports=a.locals)},325:function(t,e,o){"use strict";o.r(e);var a=o(2),r=o(0),s=o.n(r);function n(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,a)}return o}function i(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}var l={name:"Modal",props:{formItem:{type:Object,default:function(){return{}}},modalType:{type:Number,default:0}},components:{},data:function(){return{modal:!0,form:{id:null,image_one:null,image_two:null,group_id:null,checked:1,date_time:s()().format("YYYY-MM-DD"),remark:null,section_id:null,on_going:null,classing_type:null,duration:null},url:null,imgUrl:"/images/classing/",listItems:{},student_list:[],group_section:null,txt_src:null}},created:function(){if("/classing/store"===this.url){var t,e=JSON.parse(localStorage.getItem("group_selected"));this.form.group_id=null!==(t=e[0])&&void 0!==t?t:null,this.form.group_id&&this.getStudent(this.form.group_id)}},computed:function(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?n(Object(o),!0).forEach((function(e){i(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):n(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}({modalOk:function(){return 1==this.modalType?this.$t("save"):2==this.modalType?this.$t("update"):"".concat(this.$t("wait"),"...")}},Object(a.b)({positions:"getPosition",groups:"getGroup"})),watch:{modalType:{handler:function(t){1==t?(this.modal=!0,this.url="/classing/store"):2==t&&(this.modal=!0,this.setData(),this.url="/classing/edit")},immediate:!0}},methods:{onSubmit:function(){var t=this,e=this;this.$validator.validateAll().then((function(o){if(o){var a=t.form;a.student_list=t.student_list,axios.post(t.url,a).then((function(t){200===t.status&&(e.listItems=t.data.data,e.clearForm(),e.$notify({group:"message",type:"success",title:e.$t("classing"),text:e.$t("done")}))})).catch((function(t){console.log(t)}))}else e.$notify({group:"message",type:"warning",title:e.$t("classing"),text:e.$t("validation_failed")})}))},clearForm:function(){var t=this;this.form={},this.$nextTick((function(){t.$validator.reset()})),this.$emit("closeModal",this.listItems),this.modal=!1,this.listItems={}},setData:function(){this.form=Object.assign({},this.formItem),this.form.duration=parseFloat(this.formItem.duration),this.form.logo="/images/classing/"+this.formItem.image,this.form.old_logo=this.formItem.image,this.student_list=this.formItem.attendance,this.group_section=this.formItem.group_section},getStudent:function(t){var e=this,o=e.groups.find((function(e){return e.id==t}));e.form.on_going=o.on_going;var a={group_id:t,date_time:e.form.date_time};axios.post("/student/getByGroupId",a).then((function(t){e.student_list=t.data.data,e.group_section=t.data.data[0].group_section})).catch((function(t){console.log(t)}))},rowClick:function(t,e){t.checked=e},getBgColor:function(t){var e="";return 0==t&&(e="bg-danger text-warning"),1==t&&(e=""),2==t&&(e="bg-warning text-dark"),e}}},c=(o(221),o(1)),m=Object(c.a)(l,(function(){var t=this,e=t._self._c;return e("b-modal",{attrs:{id:"modal",scrollable:"",top:"","no-close-on-backdrop":"","no-close-on-esc":"","hide-header-close":"",size:"lg","content-class":"custom-modal"},model:{value:t.modal,callback:function(e){t.modal=e},expression:"modal"}},[e("template",{slot:"modal-header"},[e("h3",[e("i",{staticClass:"fas fa-walking"}),t._v(" "+t._s(t.$t("attendance"))+"\n    ")])]),t._v(" "),e("b-row",[t._e(),t._v(" "),t._e(),t._v(" "),e("b-col",{attrs:{lg:"12",xl:"12",md:"12",sm:"12"}},[e("b-form-group",{staticClass:"text-left",attrs:{label:t.$t("group"),"label-class":"control-label"}},[e("b-form-group",[e("v-select",{attrs:{options:t.groups,reduce:function(t){return t.id},label:"name"},on:{input:function(e){return t.getStudent(t.form.group_id)}},model:{value:t.form.group_id,callback:function(e){t.$set(t.form,"group_id",e)},expression:"form.group_id"}})],1)],1)],1),t._v(" "),e("b-col",{attrs:{lg:"12",xl:"12",md:"12",sm:"12"}},[e("b-row",[e("b-col",{attrs:{lg:"4",xl:"4",md:"12",sm:"12"}},[t._v("\n          "+t._s(t.form.on_going)+"\n          "),e("b-form-group",{attrs:{label:"On Going"}},[e("b-form-radio",{attrs:{name:"on_going",value:"midterm",disabled:"midterm"!==t.form.on_going},model:{value:t.form.on_going,callback:function(e){t.$set(t.form,"on_going",e)},expression:"form.on_going"}},[t._v("\n              Midterm\n            ")]),t._v(" "),e("b-form-radio",{attrs:{name:"on_going",value:"final",disabled:"final"!==t.form.on_going},model:{value:t.form.on_going,callback:function(e){t.$set(t.form,"on_going",e)},expression:"form.on_going"}},[t._v("\n              Final\n            ")])],1)],1),t._v(" "),e("b-col",{attrs:{lg:"4",xl:"4",md:"12",sm:"12"}},[e("b-form-group",{attrs:{label:"Classing Type"}},[e("b-form-radio",{attrs:{name:"classing_type",value:"normal"},model:{value:t.form.classing_type,callback:function(e){t.$set(t.form,"classing_type",e)},expression:"form.classing_type"}},[t._v("\n              Normal\n            ")]),t._v(" "),e("b-form-radio",{attrs:{name:"classing_type",value:"rep"},model:{value:t.form.classing_type,callback:function(e){t.$set(t.form,"classing_type",e)},expression:"form.classing_type"}},[t._v("\n              REPLACEMENT\n            ")]),t._v(" "),e("b-form-radio",{attrs:{name:"classing_type",value:"to"},model:{value:t.form.classing_type,callback:function(e){t.$set(t.form,"classing_type",e)},expression:"form.classing_type"}},[t._v("\n              Take Over\n            ")]),t._v(" "),e("b-form-radio",{attrs:{name:"classing_type",value:"midterm"},model:{value:t.form.classing_type,callback:function(e){t.$set(t.form,"classing_type",e)},expression:"form.classing_type"}},[t._v("\n              Midterm Exam\n            ")]),t._v(" "),e("b-form-radio",{attrs:{name:"classing_type",value:"final"},model:{value:t.form.classing_type,callback:function(e){t.$set(t.form,"classing_type",e)},expression:"form.classing_type"}},[t._v("\n              Final Exam\n            ")])],1)],1),t._v(" "),e("b-col",{attrs:{lg:"4",xl:"4",md:"12",sm:"12"}},[e("b-form-group",{attrs:{label:"Section"}},t._l(t.group_section,(function(o,a){return e("b-form-radio",{key:"group_section"+a,attrs:{name:"group-section",value:o.id},model:{value:t.form.section_id,callback:function(e){t.$set(t.form,"section_id",e)},expression:"form.section_id"}},[t._v("\n              "+t._s(o.name)+"\n            ")])})),1)],1)],1)],1),t._v(" "),e("b-col",{attrs:{lg:"12",xl:"12",md:"12",sm:"12"}},[e("b-row",[e("b-col",{attrs:{cols:"6"}},[e("b-form-group",{staticClass:"text-left",attrs:{size:"sm","invalid-feedback":t.veeErrors.first("date"),state:!t.veeErrors.has("date")&&null,label:t.$t("date")+" *","label-class":"control-label"}},[e("b-form-datepicker",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{"reset-button":"","close-button":"","today-button":"",locale:"en",required:"",size:"sm","hide-header":"","date-format-options":{year:"numeric",month:"short",day:"2-digit"},state:!t.veeErrors.has("date")&&null,"data-vv-name":"date","data-vv-as":t.$t("date")},model:{value:t.form.date_time,callback:function(e){t.$set(t.form,"date_time",e)},expression:"form.date_time"}})],1)],1),t._v(" "),e("b-col",{attrs:{cols:"6"}},[e("b-form-group",{staticClass:"text-left w-100",attrs:{"invalid-feedback":t.veeErrors.first("duration"),label:t.$t("duration")+" *","label-class":"control-label"}},[e("b-select",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{state:!t.veeErrors.has("duration")&&null,"data-vv-name":"duration","data-vv-as":t.$t("duration")},model:{value:t.form.duration,callback:function(e){t.$set(t.form,"duration",e)},expression:"form.duration"}},[e("b-form-select-option",{attrs:{value:null}},[t._v(t._s(t.$t("select"))+t._s(t.$t("duration")))]),t._v(" "),e("b-form-select-option",{attrs:{value:1}},[t._v("1 ម៉ោង")]),t._v(" "),e("b-form-select-option",{attrs:{value:1.5}},[t._v("1.5 ម៉ោង")])],1)],1)],1)],1)],1),t._v(" "),e("b-col",{attrs:{lg:"12",xl:"12",md:"12",sm:"12"}},[e("b-form-group",{staticClass:"text-left",attrs:{"invalid-feedback":t.veeErrors.first("remark"),label:t.$t("remark"),"label-class":"control-label"}},[e("b-textarea",{attrs:{autocomplete:"off",rows:"3",placeholder:t.$t("remark")},model:{value:t.form.remark,callback:function(e){t.$set(t.form,"remark",e)},expression:"form.remark"}})],1)],1),t._v(" "),e("b-col",{attrs:{lg:"12",xl:"12",md:"12",sm:"12"}},[e("b-table-simple",{attrs:{small:"",hover:"","caption-top":"",responsive:"",filter:t.txt_src}},[e("b-thead",[e("b-tr",[e("b-th",[t._v("No.")]),t._v(" "),e("b-th",[t._v("Name")]),t._v(" "),e("b-th",[t._v("Latin Name")]),t._v(" "),e("b-th",[t._v("Status")])],1)],1),t._v(" "),e("b-tbody",t._l(t.student_list,(function(o,a){return e("b-tr",{key:"student_"+a},[e("b-td",{class:t.getBgColor(o.checked)},[t._v(t._s(a+1))]),t._v(" "),e("b-td",{class:t.getBgColor(o.checked)},[1!=o.checked?e("b-button",{attrs:{variant:"primary",size:"sm"},on:{click:function(e){return t.rowClick(o,1)}}},[t._v("មក")]):t._e(),t._v(" "),0!=o.checked?e("b-button",{attrs:{variant:"danger",size:"sm"},on:{click:function(e){return t.rowClick(o,0)}}},[t._v("មិនមក\n              ")]):t._e(),t._v(" "),2!=o.checked?e("b-button",{staticClass:"text-dark",attrs:{variant:"warning",size:"sm"},on:{click:function(e){return t.rowClick(o,2)}}},[t._v("ច្បាប់\n              ")]):t._e(),t._v("\n              "+t._s(o.name)+"\n              "),e("br"),t._v(" "),o.request_permission?e("div",[o.request_permission.length>0?e("div",[e("a",{staticClass:"btn btn-sm btn-outline-info",attrs:{href:"#",id:"popover-target-1"+o.name}},[t._v("\n                    Permission\n                    "),e("img",{staticStyle:{width:"20px",height:"20px"},attrs:{src:"/github_loading.gif",alt:"loading"}})]),t._v(" "),e("b-popover",{attrs:{target:"popover-target-1"+o.name,triggers:"hover",placement:"top"},scopedSlots:t._u([{key:"title",fn:function(){return[e("strong",[t._v("Name: "+t._s(o.name))]),t._v(" "),e("br")]},proxy:!0}],null,!0)})],1):t._e()]):t._e()],1),t._v(" "),e("b-td",{class:t.getBgColor(o.checked)},[t._v("\n              "+t._s(o.latin_name)+"\n            ")]),t._v(" "),e("b-td",{class:t.getBgColor(o.checked)},[1==o.checked?e("i",{staticClass:"fas fa-check-circle",staticStyle:{"font-size":"20px",color:"blue"}}):t._e(),t._v(" "),0==o.checked?e("i",{staticClass:"fas fa-times-circle",staticStyle:{"font-size":"20px"}}):t._e(),t._v(" "),2==o.checked?e("i",{staticClass:"fas fa-user-injured",staticStyle:{"font-size":"20px",color:"deeppink"}}):t._e()])],1)})),1)],1)],1)],1),t._v(" "),e("template",{slot:"modal-footer"},[e("b-button",{staticClass:"float-right",attrs:{variant:"outline-danger"},on:{click:t.clearForm}},[e("i",{staticClass:"fas fa-times-circle mr-1"}),t._v("\n      "+t._s(t.$t("close"))+"\n    ")]),t._v(" "),e("b-button",{staticClass:"float-right ml-2",attrs:{type:"submit",variant:"outline-primary"},on:{click:function(e){return e.preventDefault(),t.onSubmit.apply(null,arguments)}}},[1==t.modalType?e("i",{staticClass:"fas fa-save mr-1"}):t._e(),t._v(" "),2==t.modalType?e("i",{staticClass:"fa fa-edit mr-1"}):t._e(),t._v("\n      "+t._s(t.modalOk)+"\n    ")])],1)],2)}),[],!1,null,"15442471",null);e.default=m.exports}}]);