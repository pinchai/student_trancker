<template>
  <b-modal
    id="modal"
    v-model="modal"
    hide-header
    scrollable
    centered
    no-close-on-backdrop
    no-close-on-esc
    hide-header-close
    content-class="custom-modal"
  >
    <!-- Start modal-cropper-image Component -->
    <div v-if="modalShowCropperImage">
      <modal-cropper-image
        :modal-show="modalShowCropperImage"
        :target-file="cropperImageTargetFile"
        :aspect-ratio="1 / 1"
        :preview-width="350"
        :preview-height="350"
        :buttonOptions="{
          flipX: true,
          flipY: true,
          rotatePlus90: true,
          rotateMinus90: true,
        }"
        @closeModal="closeModalCropperImage"
        @save="saveModalCropperImage"
      />
    </div>

    <div class="d-block">
      <!--image-->
      <b-row>
        <b-col cols="12" class="text-center mb-3">
          <div v-if="$helpers.nullToVoid(form.image) == ''">
            <i
              class="fas fa-image"
              style="font-size: 170px; color: #a0aec0"
            ></i>
          </div>
          <div v-else>
            <b-img
              :src="this.imgUrl + this.form.image"
              alt="Image"
              width="170"
              height="170"
              rounded
              class="mb-2"
            />
          </div>
          <div>
            <b-button
              size="sm"
              class="ml-2"
              variant="outline-primary"
              style="width: 151px"
              @click="chooseImageThumbnail"
            >{{ $t("choose_file") }}</b-button
            >
            <input
              ref="fileInputThumbnail"
              style="display: none"
              type="file"
              accept="image/*"
              :multiple="false"
              @change="onFileChangeThumbnail"
            />
          </div>
        </b-col>
      </b-row>
      <!--name-->
      <b-form-group
        :invalid-feedback="veeErrors.first('name')"
        :label="$t('name') + ' *'"
        label-class="control-label"
        class="text-left"
      >
        <b-form-input
          v-model="form.name"
          v-validate="'required|max:20'"
          :state="veeErrors.has('name') ? false : null"
          data-vv-name="name"
          :data-vv-as="$t('bank')"
          type="text"
          :placeholder="$t('bank')"
          @keydown.enter.prevent="onSubmit"
        ></b-form-input>
      </b-form-group>
      <!--label-->
      <b-form-group
        :invalid-feedback="veeErrors.first('label')"
        :label="$t('label')"
        label-class="control-label"
        class="text-left"
      >
        <b-form-input
          v-model="form.label"
          v-validate="'max:100'"
          :state="veeErrors.has('label') ? false : null"
          data-vv-name="label"
          :data-vv-as="$t('label')"
          type="text"
          :placeholder="$t('label')"
          @keydown.enter.prevent="onSubmit"
        ></b-form-input>
      </b-form-group>
      <!--show invoice-->
      <b-form-group
        :invalid-feedback="veeErrors.first('is_show')"
        label="Show In Invoice"
        label-class="control-label"
        class="text-left"
      >
        <b-select
          v-model="form.is_show"
          v-validate="'required'"
          :state="veeErrors.has('is_show') ? false : null"
          data-vv-name="gender"
          :data-vv-as="$t('is_show')"
        >
          <b-form-select-option value="0">Don't Show</b-form-select-option>
          <b-form-select-option value="1">Show</b-form-select-option>
        </b-select>
      </b-form-group>
    </div>
    <template slot="modal-footer">
      <b-button variant="outline-danger" @click="clearForm" class="float-right">
        <i class="fas fa-times-circle mr-1"></i>
        {{ $t('close') }}
      </b-button>
      <b-button type="submit" variant="outline-primary" class="float-right ml-2" @click.prevent="onSubmit">
        <i class="fas fa-save mr-1" v-if="modalType == 1"></i>
        <i class="fa fa-edit mr-1" v-if="modalType == 2"></i>
        {{ modalOk }}
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  props: {
    formItem: {
      type: Object,
      default: () => {
        return {}
      },
    },
    modalType: {
      type: Number,
      default: 0,
    },
  },
  components: {
    ModalCropperImage: () => import("../../../../components/sharing/ModalCropperImage"),
  },
  data() {
    return {
      modal: true,
      imgUrl: "/images/bank/",
      form: {
        name: null,
        label: null,
        is_show: 0,
        image: null,
        old_image: null,
      },
      url: null,
      listItems: {},
      modalShowCropperImage: false,
      cropperImageTargetFile: null,
    }
  },
  computed: {
    ...mapGetters({}),
    modalOk() {
      return this.modalType == 1 ? this.$t('save')
        : (this.modalType == 2 ? this.$t('update')
          : `${this.$t('wait')}...`)
    },
  },
  watch: {
    modalType: {
      handler(val) {
        if (val == 1) {
          this.modal = true;
          this.url = '/bank/store';
        } else if (val == 2) {
          this.modal = true;
          this.setData();
          this.url = '/bank/edit';
        }
      },
      immediate: true,
    },
  },
  created() {
  },
  methods: {
    onSubmit() {
      this.$validator.validateAll().then((result) => {
        let vm = this;
        if (result) {
          axios.post(this.url, this.form).then(function (response) {
            vm.listItems = response.data.data
            vm.clearForm()
            vm.$notify({
              group: 'message',
              type: 'success',
              title: vm.$t('bank'),
              text: vm.$t('done')
            });
          }).catch(function (error) {
            console.log(error)
          });
        } else {
          vm.$notify({
            group: 'message',
            type: 'warning',
            title: vm.$t('bank'),
            text: vm.$t('validation_failed')
          });
        }
      });
    },
    clearForm() {
      this.form = {}
      this.$nextTick(() => {
        this.$validator.reset();
      });
      this.$emit('closeModal', this.listItems);
      this.modal = false
      this.listItems = {}
    },
    validateState(ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref);
      }
      return null;
    },
    setData() {
      this.form = Object.assign({}, this.formItem)
      this.form.image = this.formItem.image;
      this.form.old_image = this.formItem.image;
    },
    openModalCropperImage() {
      this.modalShowCropperImage = true;
    },
    closeModalCropperImage(data) {
      this.modalShowCropperImage = false;
      this.$refs.fileInputThumbnail.value = "";
      this.cropperImageTargetFile = null;
    },
    saveModalCropperImage(base64) {
      this.imgUrl = "";
      this.form.image = base64;
      this.closeModalCropperImage();
    },
    chooseImageThumbnail() {
      this.$refs.fileInputThumbnail.click();
    },
    onFileChangeThumbnail($event) {
      let vm = this;
      const files = $event.target.files || $event.dataTransfer.files;
      const fileSize = files[0].size / 1024 / 1024; // in 1 MB
      if (fileSize > 1) {
        let msg =
          vm.$i18n.locale == "en"
            ? "Cannot upload image bigger than 1MB"
            : "មិនអាចផ្ទុករូបភាពធំជាង1MBបានទេ។";
        Swal.fire({
          icon: "error",
          title: "Oop...",
          text: msg,
          allowOutsideClick: false,
          allowEscapeKey: false,
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
  }
}
</script>

<style scoped>
/deep/ .custom-modal {
  border-radius: 15px;
}
</style>
