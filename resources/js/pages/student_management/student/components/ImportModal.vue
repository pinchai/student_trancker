<template>
  <b-modal
    id="modal"
    v-model="modal"
    scrollable
    top
    no-close-on-backdrop
    no-close-on-esc
    hide-header-close
    size="xl"
    content-class="custom-modal"
  >
    <template slot="modal-header">
      <h3>Import Student</h3>
    </template>
    <b-row>
      <!--group-->
      <b-col cols="12">
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
      <b-col cols="12">
        <b-form-group
          label="Excel File"
          label-class="control-label"
          class="text-left"
        >
          <b-form-file
            type="file"
            id="input"
            @input="chate"
            accept=".xlsx"
            class="mb-2"
          ></b-form-file>
        </b-form-group>
      </b-col>
      <!--Preview table-->
      <b-col cols="12">
        <div class="table-responsive">
          <table class="table table-sm table-striped table-bordered">
            <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Latin Name</th>
              <th>Gender</th>
            </tr>
            </thead>
            <tbody>
            <tr
              v-for="(item, index) in form.json_string"
              :key="'student_'+index"
            >
              <td>{{ item.no }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.latin_name }}</td>
              <td>{{ item.gender }}</td>
            </tr>
            </tbody>
          </table>
        </div>
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
      </b-button>
      <b-button
        type="submit"
        variant="outline-primary"
        class="float-right ml-2"
        @click.prevent="onSubmit"
      >
        <i class="fas fa-save mr-1" v-if="modalType == 1"></i>
        <i class="fa fa-edit mr-1" v-if="modalType == 2"></i>
        {{ modalOk }}
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import {mapGetters} from "vuex";
import readXlsxFile from "read-excel-file";

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
  components: {},
  data() {
    return {
      modal: true,
      form: {
        json_string: [],
        group_id: null,
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
          this.url = "/student/import";
        } else if (val == 2) {
          this.modal = true;
          this.setData();
          this.url = "/student/import";
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
          formData.append('json_string', JSON.stringify(this.form.json_string))
          formData.append('group_id', this.form.group_id)
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
    chate(){
      let vm = this
      const input = document.getElementById('input')
      readXlsxFile(input.files[0],
        {
          // dateFormat: 'dd/mm/yyyy',
          // trim: false,
        }
      ).then((rows) => {
        rows.forEach(item=>{
          vm.form.json_string.push(
            {
              'no': item[0],
              'name': item[1],
              'latin_name': item[2],
              'gender': item[3],
            }
          )
        })
      })
    }
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
