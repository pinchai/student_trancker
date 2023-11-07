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
      <h3><i class="fas fa-warehouse"></i> {{ $t("slider") }}</h3>
    </template>
    <b-row>
      <!--select image-->
      <b-col cols="12" class="border-lg text-center mb-3">
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
              width="300"
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
          </b-button>
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
      <b-col cols="12">
        <b-row>
          <!--title-->
          <b-col cols="12">
            <b-form-group
              :invalid-feedback="veeErrors.first('title')"
              :label="$t('title')"
              label-class="control-label"
              class="text-left"
            >
              <b-textarea
                autocomplete="off"
                v-model="form.title"
                rows="3"
                :placeholder="$t('title')"
                v-validate="'required'"
                :state="veeErrors.has('title') ? false : null"
                data-vv-name="title"
                :data-vv-as="$t('title')"
              ></b-textarea>
            </b-form-group>
          </b-col>
          <!--url-->
          <b-col cols="12">
            <b-form-group
              :invalid-feedback="veeErrors.first('url')"
              :label="$t('url') + ' *'"
              label-class="control-label"
              class="text-left"
            >
              <b-form-input
                autocomplete="off"
                v-model="form.url"
                v-validate="'required'"
                :state="veeErrors.has('url') ? false : null"
                data-vv-name="url"
                :data-vv-as="$t('url')"
                type="text"
                :placeholder="$t('url')"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <!--place-->
          <b-col cols="6">
            <b-form-group
              :invalid-feedback="veeErrors.first('place')"
              :label="$t('place') + ' *'"
              label-class="control-label"
              class="text-left"
            >
              <b-form-input
                autocomplete="off"
                v-model="form.place"
                v-validate="'required'"
                :state="veeErrors.has('place') ? false : null"
                data-vv-name="place"
                :data-vv-as="$t('place')"
                type="text"
                :placeholder="$t('place')"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <!--order_number-->
          <b-col cols="6">
            <b-form-group
              :invalid-feedback="veeErrors.first('order_number')"
              :label="$t('order_number') + ' *'"
              label-class="control-label"
              class="text-left"
            >
              <b-form-input
                autocomplete="off"
                v-model="form.order_number"
                v-validate="'required'"
                :state="veeErrors.has('order_number') ? false : null"
                data-vv-name="order_number"
                :data-vv-as="$t('order_number')"
                type="number"
                :placeholder="$t('order_number')"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <!--description-->
          <b-col cols="12">
            <b-card no-body class="shadow-sm mt-3">
              <b-card-header>
                <b-row>
                  <b-col cols="6"><h3 class="info-title">{{ $t("description") }}</h3></b-col>
                  <b-col cols="6">
                    <b-button v-b-toggle.collapse-description class="float-right m-1">Toggle How To Description
                    </b-button>
                  </b-col>
                </b-row>
              </b-card-header>
              <b-card-body>
                <b-row>
                  <!--text_editor-->
                  <b-col cols="12">
                    <b-collapse visible id="collapse-description">
                      <text-editor
                        :setText="form.description"
                        @getText="getDescriptionText"
                      ></text-editor>
                    </b-collapse>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
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
import moment from 'moment';

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
        title: null,
        place: 'middle',
        order_number: 0,
        description: null,
        url: '#',
        logo: null,
        old_logo: null,
        old_image: null,
        expire_date: moment().format('YYYY-MM-DD'),
        price: 0,
        discount: 0,
      },
      url: null,
      imgUrl: "/images/slider/",
      mediaPath: "/images/media/",
      listItems: {},
      modalShowCropperImage: false,
      aspectRatio: 16 / 9,
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
          this.url = "/slider/store";
        } else if (val == 2) {
          this.modal = true;
          this.setData();
          this.url = "/slider/edit";
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
          formData.append('id', this.form.id)
          formData.append('title', this.form.title)
          formData.append('place', this.form.place)
          formData.append('description', this.form.description)
          formData.append('order_number', this.form.order_number)
          formData.append('url', this.form.url)
          formData.append('old_image', this.form.old_image)
          formData.append('cropped_logo', this.blob)
          axios
            .post(this.url, formData)
            .then(function (response) {
              if (response.status === 200) {
                vm.listItems = response.data.data;
                vm.clearForm();

                vm.$notify({
                  group: "message",
                  type: "success",
                  title: vm.$t("slider"),
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
            title: vm.$t("slider"),
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
      this.form.logo = '/images/slider/' + this.formItem.image;
      this.form.old_logo = this.formItem.image;
      this.form.old_image = this.formItem.image;
    },
    chooseImage() {
      this.$refs.fileInput.click();
    },
    onFileChange($event) {
      this.FILE = event.target.files[0]
      this.targetFile = $event;
      this.openModalCropperImage();
    },
    getShortDescriptionText(evt) {
      this.form.short_description = evt
    },
    getDescriptionText(evt) {
      this.form.description = evt
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
