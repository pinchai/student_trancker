(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{243:function(t,e,o){"use strict";o(35)},244:function(t,e,o){(t.exports=o(4)(!1)).push([t.i,"input[type=file][data-v-024bf1ec]{display:none}.preview[data-v-024bf1ec]{overflow:hidden;border:1px solid red}",""])},329:function(t,e,o){"use strict";o.r(e);var r=o(36),n=o.n(r),a=(o(241),{components:{VueCropper:n.a},props:{modalShow:{type:Boolean,default:!1},targetFile:{type:Event,default:function(){return{}}},aspectRatio:{type:Number,default:1},previewWidth:{type:Number,default:209},previewHeight:{type:Number,default:209},dragMode:{type:String,default:"move"},cropBoxMovable:{type:Boolean,default:!0},cropBoxResizable:{type:Boolean,default:!0},background:{type:Boolean,default:!0},buttonOptions:{type:Object,default:function(){return{}}}},data:function(){return{imgSrc:"/default_background.jpg",cropImg:"",data:null,modal:!1,showSeparator1:!1,showSeparator2:!1}},computed:{modalHeader:function(){return"".concat(this.$t("crop")," ").concat(this.$t("image"))},modalOk:function(){return this.$t("crop")}},watch:{modalShow:{handler:function(t){this.modal=t},immediate:!0},targetFile:{handler:function(t){this.setImage(t)},immediate:!0},buttonOptions:{handler:function(t){var e,o,r,n,a,i,s,l,p,u,c,v;t.selectImage=null!==(e=t.selectImage)&&void 0!==e&&e,t.reset=null!==(o=t.reset)&&void 0!==o&&o,t.zoomIn=null!==(r=t.zoomIn)&&void 0!==r&&r,t.zoomOut=null!==(n=t.zoomOut)&&void 0!==n&&n,t.moveLeft=null!==(a=t.moveLeft)&&void 0!==a&&a,t.moveRight=null!==(i=t.moveRight)&&void 0!==i&&i,t.moveUp=null!==(s=t.moveUp)&&void 0!==s&&s,t.moveDown=null!==(l=t.moveDown)&&void 0!==l&&l,t.rotatePlus90=null!==(p=t.rotatePlus90)&&void 0!==p&&p,t.rotateMinus90=null!==(u=t.rotateMinus90)&&void 0!==u&&u,t.flipX=null!==(c=t.flipX)&&void 0!==c&&c,t.flipY=null!==(v=t.flipY)&&void 0!==v&&v,this.showSeparator()},immediate:!0}},methods:{cropImage:function(){this.cropImg=this.$refs.cropper.getCroppedCanvas().toDataURL()},flipX:function(){var t=this.$refs.flipX,e=t.getAttribute("data-scale");e=e?-e:-1,this.$refs.cropper.scaleX(e),t.setAttribute("data-scale",e)},flipY:function(){var t=this.$refs.flipY,e=t.getAttribute("data-scale");e=e?-e:-1,this.$refs.cropper.scaleY(e),t.setAttribute("data-scale",e)},getCropBoxData:function(){this.data=JSON.stringify(this.$refs.cropper.getCropBoxData(),null,4)},getData:function(){this.data=JSON.stringify(this.$refs.cropper.getData(),null,4)},move:function(t,e){this.$refs.cropper.move(t,e)},reset:function(){this.$refs.cropper.reset()},rotate:function(t){this.$refs.cropper.rotate(t)},setCropBoxData:function(){this.data&&this.$refs.cropper.setCropBoxData(JSON.parse(this.data))},setData:function(){this.data&&this.$refs.cropper.setData(JSON.parse(this.data))},setImage:function(t){var e=this,o=t.target.files[0];if(-1!==o.type.indexOf("image/"))if("function"==typeof FileReader){var r=new FileReader;r.onload=function(t){e.imgSrc=t.target.result,e.$refs.cropper.replace(t.target.result)},r.readAsDataURL(o)}else alert("Sorry, FileReader API not supported");else alert("Please select an image file")},showFileChooser:function(){this.$refs.input.click()},zoom:function(t){this.$refs.cropper.relativeZoom(t)},save:function(){this.modal=!1;var t=this.$refs.cropper.getCroppedCanvas().toDataURL();this.$emit("save",t),this.$refs.cropper.destroy()},clearForm:function(){this.modal=!1,this.$emit("closeModal",null),this.$refs.cropper.destroy()},showSeparator:function(){var t=this.buttonOptions;(t.selectImage||t.reset)&&(this.showSeparator1=!0),(t.zoomIn||t.zoomOut||t.moveLeft||t.moveRight||t.moveUp||t.moveDown)&&(this.showSeparator2=!0)}}}),i=(o(243),o(1)),s=Object(i.a)(a,(function(){var t=this,e=t._self._c;return e("b-modal",{attrs:{id:"modal",scrollable:"",centered:"","no-close-on-backdrop":"","no-close-on-esc":"","hide-header-close":"",title:t.modalHeader,size:"xl"},model:{value:t.modal,callback:function(e){t.modal=e},expression:"modal"}},[e("b-row",[e("b-col",{attrs:{lg:"8",md:"8",sm:"12"}},[e("input",{ref:"input",attrs:{type:"file",name:"image",accept:"image/*"},on:{change:t.setImage}}),t._v(" "),e("vue-cropper",{ref:"cropper",attrs:{"aspect-ratio":t.aspectRatio,src:t.imgSrc,dragMode:t.dragMode,cropBoxMovable:t.cropBoxMovable,cropBoxResizable:t.cropBoxResizable,background:t.background,preview:".preview"}}),t._v(" "),e("div",{staticClass:"mt-2",staticStyle:{"text-align":"center"}},[t.buttonOptions.selectImage?e("b-button",{attrs:{size:"sm",variant:"primary"},on:{click:function(e){return e.preventDefault(),t.showFileChooser.apply(null,arguments)}}},[t._v("\n                    "+t._s(t.$t("select"))+t._s(t.$t("image"))+"\n                ")]):t._e(),t._v(" "),t.buttonOptions.reset?e("b-button",{attrs:{variant:"primary"},on:{click:function(e){return e.preventDefault(),t.reset.apply(null,arguments)}}},[t._v("\n                    "+t._s(t.$t("reset"))+"\n                ")]):t._e(),t._v(" "),t.showSeparator1?e("div",{staticClass:"separator mt-2 mb-2"}):t._e(),t._v(" "),t.buttonOptions.zoomIn?e("b-button",{attrs:{size:"xs",variant:"outline-primary"},on:{click:function(e){return e.preventDefault(),t.zoom(.2)}}},[t._v("\n                    "+t._s(t.$t("zoom_in"))+"\n                ")]):t._e(),t._v(" "),t.buttonOptions.zoomOut?e("b-button",{attrs:{size:"xs",variant:"outline-primary"},on:{click:function(e){return e.preventDefault(),t.zoom(-.2)}}},[t._v("\n                    "+t._s(t.$t("zoom_out"))+"\n                ")]):t._e(),t._v(" "),t.buttonOptions.moveLeft?e("b-button",{attrs:{size:"xs",variant:"outline-primary"},on:{click:function(e){return e.preventDefault(),t.move(-10,0)}}},[t._v("\n                    "+t._s(t.$t("move_left"))+"\n                ")]):t._e(),t._v(" "),t.buttonOptions.moveRight?e("b-button",{attrs:{size:"xs",variant:"outline-primary"},on:{click:function(e){return e.preventDefault(),t.move(10,0)}}},[t._v("\n                    "+t._s(t.$t("move_right"))+"\n                ")]):t._e(),t._v(" "),t.buttonOptions.moveUp?e("b-button",{attrs:{size:"xs",variant:"outline-primary"},on:{click:function(e){return e.preventDefault(),t.move(0,-10)}}},[t._v("\n                    "+t._s(t.$t("move_up"))+"\n                ")]):t._e(),t._v(" "),t.buttonOptions.moveDown?e("b-button",{attrs:{size:"xs",variant:"outline-primary"},on:{click:function(e){return e.preventDefault(),t.move(0,10)}}},[t._v("\n                    "+t._s(t.$t("move_down"))+"\n                ")]):t._e(),t._v(" "),t.showSeparator2?e("div",{staticClass:"separator mt-2 mb-2"}):t._e(),t._v(" "),t.buttonOptions.rotatePlus90?e("b-button",{attrs:{size:"xs",variant:"outline-primary"},on:{click:function(e){return e.preventDefault(),t.rotate(90)}}},[t._v("\n                    "+t._s(t.$t("rotate"))+" +90deg\n                ")]):t._e(),t._v(" "),t.buttonOptions.rotateMinus90?e("b-button",{attrs:{size:"xs",variant:"outline-primary"},on:{click:function(e){return e.preventDefault(),t.rotate(-90)}}},[t._v("\n                    "+t._s(t.$t("rotate"))+" -90deg\n                ")]):t._e(),t._v(" "),t.buttonOptions.flipX?e("b-button",{ref:"flipX",attrs:{size:"xs",variant:"outline-primary"},on:{click:function(e){return e.preventDefault(),t.flipX.apply(null,arguments)}}},[t._v("\n                    "+t._s(t.$t("flip"))+" X\n                ")]):t._e(),t._v(" "),t.buttonOptions.flipY?e("b-button",{ref:"flipY",attrs:{size:"xs",variant:"outline-primary"},on:{click:function(e){return e.preventDefault(),t.flipY.apply(null,arguments)}}},[t._v("\n                    "+t._s(t.$t("flip"))+" Y\n                ")]):t._e()],1)],1),t._v(" "),e("b-col",{attrs:{lg:"4",md:"4",sm:"12"}},[e("div",{staticClass:"preview",style:{width:"".concat(t.previewWidth,"px"),height:"".concat(t.previewHeight,"px")}})])],1),t._v(" "),e("template",{slot:"modal-footer"},[e("b-button",{attrs:{size:"xs",variant:"outline-secondary"},on:{click:t.clearForm}},[t._v(t._s(t.$t("cancel"))+"\n        ")]),t._v(" "),e("b-button",{attrs:{size:"xs",variant:"primary"},on:{click:t.save}},[t._v(t._s(t.modalOk))])],1)],2)}),[],!1,null,"024bf1ec",null);e.default=s.exports},35:function(t,e,o){var r=o(244);"string"==typeof r&&(r=[[t.i,r,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};o(5)(r,n);r.locals&&(t.exports=r.locals)}}]);