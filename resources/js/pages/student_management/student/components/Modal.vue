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
      <h3><i class="fas fa-user-graduate"></i> {{ $t("student") }}</h3>
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
          >
            {{ $t("choose_file") }}
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
          <!--latin_name-->
          <b-col lg="6" xl="6" md="6" sm="12">
            <b-form-group
              :invalid-feedback="veeErrors.first('latin_name')"
              :label="$t('latin_name') + ' *'"
              label-class="control-label"
              class="text-left"
            >
              <b-form-input
                autocomplete="off"
                v-model="form.latin_name"
                v-validate="'required'"
                :state="veeErrors.has('latin_name') ? false : null"
                data-vv-name="latin_name"
                :data-vv-as="$t('latin_name')"
                type="text"
                :placeholder="$t('latin_name')"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <!--gender-->
          <b-col lg="6" xl="6" md="6" sm="12">
            <b-form-group
              :invalid-feedback="veeErrors.first('gender')"
              :label="$t('gender')"
              label-class="control-label"
              class="text-left"
            >
              <b-select v-model="form.gender">
                <b-form-select-option value="male">{{
                    $t("male")
                  }}
                </b-form-select-option>
                <b-form-select-option value="female">{{
                    $t("female")
                  }}
                </b-form-select-option>
              </b-select>
            </b-form-group>
          </b-col>
          <!--position-->
          <b-col lg="6" xl="6" md="6" sm="12">
            <b-form-group
              :invalid-feedback="veeErrors.first('position_id')"
              :label="$t('position') + ' *'"
              label-class="control-label"
              class="text-left"
            >
              <b-select
                v-model="form.position_id"
                v-validate="'required'"
                :state="veeErrors.has('position_id') ? false : null"
                data-vv-name="position_id"
                :data-vv-as="$t('position')"
              >
                <b-form-select-option :value="null">{{ $t('select') }}{{ $t('position') }}</b-form-select-option>
                <b-form-select-option
                  v-for="(item, index) in positions"
                  :value="item.id"
                  :key="'position_'+index"
                > {{ item.name }}
                </b-form-select-option>
              </b-select>
            </b-form-group>
          </b-col>
          <!--group-->
          <b-col lg="6" xl="6" md="6" sm="12">
            <b-form-group
              :invalid-feedback="veeErrors.first('group_id')"
              :label="$t('group')"
              label-class="control-label"
              class="text-left"
            >
              <b-select
                v-validate="'required'"
                :state="veeErrors.has('group_id') ? false : null"
                data-vv-name="group_id"
                :data-vv-as="$t('group')"
                v-model="form.group_id"
              >
                <b-form-select-option value="null">{{ $t('group') }}</b-form-select-option>
                <b-form-select-option
                  v-for="(item, index) in groups"
                  :key="'group_'+index"
                  :value="item.id"
                >
                  {{ item.name }}
                </b-form-select-option>
              </b-select>
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
          <!--phone-->
          <b-col v-if="false" lg="6" xl="6" md="6" sm="12">
            <b-form-group
              :invalid-feedback="veeErrors.first('phone')"
              :label="$t('phone') + ' *'"
              label-class="control-label"
              class="text-left"
            >
              <b-form-input
                autocomplete="off"
                v-validate="'required'"
                :state="veeErrors.has('phone') ? false : null"
                data-vv-name="phone"
                :data-vv-as="$t('phone')"
                v-model="form.phone"
                type="text"
                :placeholder="$t('phone')"
              ></b-form-input>
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
    ModalCropperImage: () => import("../../../../components/sharing/ModalCropperImage"),
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
        latin_name: null,
        phone: '00000000',
        address: null,
        description: null,
        logo: null,
        old_logo: null,
        status: 1,
        html_text: null,
        position_id: null,
        gender: 'male',
        group_id: null
      },
      url: null,
      imgUrl: "/images/student/",
      mediaPath: "/images/media/",
      listItems: {},
      modalShowCropperImage: false,
      aspectRatio: 0.8 / 1,
      targetFile: null,
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
    },
    ...mapGetters({
      positions: "getPosition",
      groups: "getGroup",
    }),
  },
  watch: {
    modalType: {
      handler(val) {
        if (val == 1) {
          this.modal = true;
          this.url = "/student/store";
        } else if (val == 2) {
          this.modal = true;
          this.setData();
          this.url = "/student/edit";
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
          formData.append('cropped_logo', this.blob)
          formData.append('id', this.form.id)
          formData.append('name', this.form.name)
          formData.append('latin_name', this.form.latin_name)
          formData.append('phone', this.form.phone)
          formData.append('group_id', this.form.group_id)
          formData.append('address', this.form.address)
          formData.append('description', this.form.description)
          formData.append('position_id', this.form.position_id)
          formData.append('status', this.form.status)
          formData.append('gender', this.form.gender)
          axios.post(this.url, formData).then(function (response) {
              if (response.status === 200) {
                vm.listItems = response.data.data;
                vm.clearForm();

                vm.$notify({
                  group: "message",
                  type: "success",
                  title: vm.$t("student"),
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
            title: vm.$t("student"),
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
      this.form.logo = '/images/student/' + this.formItem.image;
      this.form.old_logo = this.formItem.image;
    },
    chooseImage() {
      this.$refs.fileInput.click();
    },
    onFileChange($event) {
      this.FILE = event.target.files[0]
      this.targetFile = $event;
      this.openModalCropperImage();
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
