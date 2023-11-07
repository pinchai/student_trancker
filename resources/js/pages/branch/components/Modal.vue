<template>
  <b-modal
    id="modal"
    v-model="modal"
    scrollable
    top
    no-close-on-backdrop
    no-close-on-esc
    hide-header-close
    size="lg"
    content-class="custom-modal"
  >
    <template slot="modal-header">
      <h3><i class="fas fa-warehouse"></i> {{ $t("branch") }}</h3>
    </template>
    <b-row>
      <!--select image-->
      <b-col cols="12" xl="3" class="border-lg text-center mb-3">
        <!--image-->
        <b-col cols="12">
          <div v-if="$helpers.nullToVoid(form.logo) == ''">
            <i
              class="fas fa-image"
              style="font-size: 150px; color: #a0aec0"
            ></i>
          </div>
          <div v-else>
            <b-img
              :src="this.form.logo"
              alt="Logo"
              width="150"
              height="150"
              rounded
            />
          </div>
        </b-col>
        <b-col cols="12" class="mt-2">
          <b-button
            size="sm"
            class="ml-2"
            variant="outline-primary"
            @click="chooseImage"
          >{{ $t("choose_file") }}
          </b-button
          >
          <input
            ref="fileInput"
            style="display: none"
            type="file"
            accept=".png, .jpg"
            :multiple="false"
            @change="onFileChange"
          />
        </b-col>
      </b-col>
      <!--form-->
      <b-col cols="12" xl="9">
        <b-row>
          <!--name-->
          <b-col lg="6" xl="6" md="6" sm="12">
            <b-form-group
              :invalid-feedback="veeErrors.first('name')"
              :label="$t('name') + ' *'"
              label-class="control-label"
              class="text-left"
            >
              <b-form-input
                autocomplete="off"
                v-model="form.name"
                v-validate="'required'"
                :state="veeErrors.has('name') ? false : null"
                data-vv-name="name"
                :data-vv-as="$t('name')"
                type="text"
                :placeholder="$t('name')"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <!--phone-->
          <b-col lg="6" xl="6" md="6" sm="12">
            <b-form-group
              :invalid-feedback="veeErrors.first('phone')"
              :label="$t('phone') + ' *'"
              label-class="control-label"
              class="text-left"
            >
              <b-form-input
                autocomplete="off"
                v-model="form.phone"
                v-validate="'required'"
                :state="veeErrors.has('phone') ? false : null"
                data-vv-name="phone"
                :data-vv-as="$t('phone')"
                type="text"
                :placeholder="$t('phone')"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <!--email-->
          <b-col lg="6" xl="6" md="6" sm="12">
            <b-form-group
              :invalid-feedback="veeErrors.first('email')"
              :label="$t('email') + ' *'"
              label-class="control-label"
              class="text-left"
            >
              <b-form-input
                autocomplete="off"
                v-model="form.email"
                v-validate="'required|email'"
                :state="veeErrors.has('email') ? false : null"
                data-vv-name="email"
                :data-vv-as="$t('email')"
                type="text"
                :placeholder="$t('email')"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <!--status-->
          <b-col lg="6" xl="6" md="6" sm="12">
            <b-form-group
              :invalid-feedback="veeErrors.first('status')"
              :label="$t('status')"
              label-class="control-label"
              class="text-left"
            >
              <b-select v-model="form.status">
                <b-form-select-option value="0">{{
                    $t("disabled")
                  }}
                </b-form-select-option>
                <b-form-select-option value="1">{{
                    $t("enabled")
                  }}
                </b-form-select-option>
              </b-select>
            </b-form-group>
          </b-col>
          <!--address-->
          <b-col cols="12">
            <b-form-group
              :invalid-feedback="veeErrors.first('address')"
              :label="$t('address')"
              label-class="control-label"
              class="text-left"
            >
              <b-textarea
                autocomplete="off"
                v-model="form.address"
                rows="3"
                :placeholder="$t('address')"
              ></b-textarea>
            </b-form-group>
          </b-col>
          <!--text_editor-->
          <b-col cols="12">
            <text-editor
              :setText="form.html_text"
              @getText="getText"
            ></text-editor>
          </b-col>
        </b-row>

      </b-col>
    </b-row>
    <template slot="modal-footer">
      <b-button
        variant="outline-danger"
        @click="clearForm"
        class="float-right"
      >
        <i class="fas fa-times-circle mr-1"></i>
        {{ $t("close") }}
      </b-button
      >
      <b-button
        type="submit"
        variant="outline-primary"
        class="float-right ml-2"
        @click.prevent="onSubmit"
      >
        <i class="fas fa-save mr-1" v-if="modalType == 1"></i>
        <i class="fa fa-edit mr-1" v-if="modalType == 2"></i>
        {{ modalOk }}
      </b-button
      >
    </template>

    <!-- Start modal-cropper-image Component -->
    <div v-if="modalShowCropperImage">
      <modal-cropper-image
        :modal-show="modalShowCropperImage"
        :target-file="targetFile"
        :aspect-ratio="aspectRatio"
        :preview-width="349"
        :preview-height="349"
        :buttonOptions="{
                    flipX: true,
                    flipY: true,
                    rotatePlus90: true,
                    rotateMinus90: true
                }"
        @closeModal="closeModalCropperImage"
        @save="saveModalCropperImage"
      />
    </div>
  </b-modal>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: "Modal",
  props: {
    formItem: {
      type: Object,
      default: () => {
        return {};
      }
    },
    modalType: {
      type: Number,
      default: 0
    }
  },
  components: {
    ModalCropperImage: () => import("../../../components/sharing/ModalCropperImage"),
    TextEditor: () => import("../../../components/sharing/TextEditor")
  },
  data() {
    return {
      modal: true,
      status: [
        {id: 0, name: "Disable"},
        {id: 1, name: "Enable"}
      ],
      form: {
        name: null,
        phone: null,
        email: null,
        address: null,
        description: null,
        logo: null,
        old_logo: null,
        status: 1,
        html_text: null
      },
      url: null,
      imgUrl: "/images/branch/",
      mediaPath: "/images/media/",
      listItems: {},
      modalShowCropperImage: false,
      aspectRatio: 1.03 / 1,
      targetFile: null,
      editorOptionDesc: {
        theme: "snow",
        placeholder: "",
        modules: {
          toolbar: {
            container: [
              "bold",
              "underline",
              "italic",
              "strike",
              "blockquote",
              "image",
              {list: "ordered"},
              {list: "bullet"},
              {script: "sub"},
              {script: "super"},
              {indent: "-1"},
              {indent: "+1"},
              {direction: "rtl"},
              {header: [1, 2, 3, 4, 5, 6, false]},
              {color: []},
              {background: []},
              {font: []},
              {align: []},
              "clean",
              "link",
              "video"
            ],
            handlers: {
              image: function () {
                document.getElementById("imageDesc").click();
              }
            }
          },
          imageResize: {
            modules: ["Resize", "DisplaySize"]
          }
        }
      },
      FILE: null,
      blob: null,
    };
  },
  computed: {
    modalOk() {
      return this.modalType == 1
        ? this.$t("save")
        : this.modalType == 2
          ? this.$t("update")
          : `${this.$t("wait")}...`;
    }
  },
  watch: {
    modalType: {
      handler(val) {
        if (val == 1) {
          this.modal = true;
          this.url = "/branch/store";
        } else if (val == 2) {
          this.modal = true;
          this.setData();
          this.url = "/branch/edit";
        }
      },
      immediate: true
    }
  },
  methods: {
    onSubmit() {
      let vm = this;
      this.$validator.validateAll().then(result => {
        if (result) {
          const formData = new FormData()
          //formData.append('logo', this.FILE, this.FILE.name)
          formData.append('cropped_logo', this.blob)
          formData.append('id', this.form.id)
          formData.append('name', this.form.name)
          formData.append('phone', this.form.phone)
          formData.append('email', this.form.email)
          formData.append('address', this.form.address)
          formData.append('description', this.form.description)
          formData.append('status', this.form.status)
          axios
            .post(this.url, formData)
            .then(function (response) {
              if (response.status === 200) {
                vm.$store.dispatch(
                  "fetchBranch",
                  response.data.combo_list
                );
                vm.listItems = response.data.data;
                vm.clearForm();

                vm.$notify({
                  group: "message",
                  type: "success",
                  title: vm.$t("branch"),
                  text: vm.$t("done")
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          vm.$notify({
            group: "message",
            type: "warning",
            title: vm.$t("branch"),
            text: vm.$t("validation_failed")
          });
        }
      });
    },
    clearForm() {
      this.form = {};

      this.$nextTick(() => {
        this.$validator.reset();
      });

      this.$emit("closeModal", this.listItems);
      this.modal = false;
      this.listItems = {};
    },
    setData() {
      this.form = Object.assign({}, this.formItem);
      this.form.logo = '/images/branch/' + this.formItem.logo;
      this.form.old_logo = this.formItem.logo;
    },
    chooseImage() {
      this.$refs.fileInput.click();
    },
    onFileChange($event) {
      this.FILE = event.target.files[0]
      this.targetFile = $event;
      this.openModalCropperImage();
    },
    getText(evt){
      this.form.html_text = evt
    },
    //Cropper
    openModalCropperImage() {
      this.modalShowCropperImage = true;
    },
    closeModalCropperImage(data) {
      this.modalShowCropperImage = false;
      this.$refs.fileInput.value = "";
      this.targetFile = null;
    },
    async saveModalCropperImage(base64) {
      this.blob = await (await fetch(base64)).blob();
      //console.log(this.blob)
      this.imgUrl = "";
      this.form.logo = base64;
      this.closeModalCropperImage();
    },
    uploadImageDesc($event) {
      let vm = this;
      const files = $event.target.files || $event.dataTransfer.files;

      if (files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          let input = {
            image: e.target.result
          };

          //upload image to server
          axios
            .post("/system/upload_media", input)
            .then(response => {
              let imageResponse = response.data.data;

              //this code to set your position cursor
              const cursor = vm.$refs.quillDesc.quill.getSelection();
              //this code to set image on your server to quill editor
              vm.$refs.quillDesc.quill.insertEmbed(
                cursor.index,
                "image",
                `${vm.mediaPath}${imageResponse}`
              );

              //Clear file and can upload the same image again
              vm.$refs.imageDesc.value = "";
            })
            .catch(e => {
              console.log("error");
            });
        };
        reader.readAsDataURL(files[0]);
      }
    },
  }
};
</script>

<style scoped>
/deep/ .custom-modal {
  border-radius: 15px;
}

/deep/ .ql-editor {
  min-height: 180px !important;
}
</style>
