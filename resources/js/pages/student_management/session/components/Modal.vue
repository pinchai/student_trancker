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
      <h3><i class="fas fa-user-graduate"></i> {{ $t("session") }}</h3>
    </template>

    <b-row>
      <!--image_one-->
      <b-col lg="6" xl="6" md="6" sm="6">
        <b-form-group
          label="Referent Image"
          label-class="control-label"
          class="text-left"
        >
          <input
            id="image_one"
            type="file"
            ref="imageOne"
            @change="previewFiles"
          >
        </b-form-group>
        <a v-show="form.image_one != null" id="image_one_tab" href="#" target="_blank">
          <img
            class="img-fluid"
            id="image_one_img"
            alt="your image"
            width="100" height="150"
            onerror="this.src='/image_error.png';"
          />
        </a>
      </b-col>
      <!--image_two-->
      <b-col lg="6" xl="6" md="6" sm="6">
        <b-form-group
          label="Referent Image"
          label-class="control-label"
          class="text-left"
        >
          <input
            type="file"
            ref="imageTwo"
            @change="previewFilesTwo"
          >
        </b-form-group>
        <a v-show="form.image_two != null" id="image_two_tab" href="#" target="_blank">
          <img
            class="img-fluid"
            id="image_two"
            alt="your image"
            width="100" height="150"
            onerror="this.src='/image_error.png';"
          />
        </a>
      </b-col>
      <!--group-->
      <b-col lg="12" xl="12" md="12" sm="12">
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
            @input="getStudent(form.group_id)"
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
      <!--date time-->
      <b-col lg="12" xl="12" md="12" sm="12">
        <b-form-group
          size="sm"
          :invalid-feedback="veeErrors.first('date')"
          :state="veeErrors.has('date') ? false : null"
          :label="$t('date') + ' *'"
          label-class="control-label"
          class="text-left"
        >
          <b-form-datepicker
            reset-button
            close-button
            today-button
            locale='en'
            required
            size='sm'
            hide-header
            v-model='form.date_time'
            :date-format-options="{year: 'numeric',month: 'short',day: '2-digit'}"
            v-validate="'required'"
            :state="veeErrors.has('date') ? false : null"
            :data-vv-name="'date'"
            :data-vv-as="$t('date')"
          ></b-form-datepicker>
        </b-form-group>
      </b-col>
      <!--remark-->
      <b-col lg="12" xl="12" md="12" sm="12">
        <b-form-group
          :invalid-feedback="veeErrors.first('remark')"
          :label="$t('remark')"
          label-class="control-label"
          class="text-left"
        >
          <b-textarea
            autocomplete="off"
            v-model="form.remark"
            rows="3"
            :placeholder="$t('remark')"
          ></b-textarea>
        </b-form-group>
      </b-col>
      <b-col lg="12" xl="12" md="12" sm="12">
        <div class="table-responsive">
          <table class="table table-sm table-striped">
            <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Latin Name</th>
              <th>Check</th>
            </tr>
            </thead>
            <tbody>
            <tr
              v-for="(item, index) in student_list"
              :key="'student_'+index"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.latin_name }}</td>
              <td>
                <b-form-checkbox
                  size="lg"
                  v-model="item.checked"
                  name="checkbox-1"
                  value="1"
                  unchecked-value="0"
                >
                  Present
                </b-form-checkbox>
              </td>
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
  </b-modal>
</template>

<script>
import {mapGetters} from "vuex";
import moment from "moment";

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
        id: null,
        image_one: null,
        image_two: null,
        group_id: null,
        checked: 1,
        date_time: moment().format('YYYY-MM-DD'),
        remark: null,
      },
      url: null,
      imgUrl: "/images/session/",
      listItems: {},
      student_list: [],
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
          this.url = "/session/store";
        } else if (val == 2) {
          this.modal = true;
          this.setData();
          this.url = "/session/edit";
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
          formData.append('id', this.form.id)
          formData.append('image_one', this.form.image_one)
          formData.append('image_two', this.form.image_two)
          formData.append('group_id', this.form.group_id)
          formData.append('date_time', this.form.date_time)
          formData.append('remark', this.form.remark)
          formData.append('student_list', JSON.stringify(this.student_list))
          axios.post(this.url, formData).then(function (response) {
            if (response.status === 200) {
              vm.listItems = response.data.data;
              vm.clearForm();

              vm.$notify({
                group: "message",
                type: "success",
                title: vm.$t("session"),
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
            title: vm.$t("session"),
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
      this.form.logo = '/images/session/' + this.formItem.image;
      this.form.old_logo = this.formItem.image;

      this.student_list = this.formItem.attendance
    },
    previewFiles() {
      this.form.image_one = this.$refs.imageOne.files[0]
      if (this.form.image_one.type == 'image/heic') {
        alert('your iphone\'s camera is using .heic please change to .jpg file')
        this.form.image_one = null
        return
      }
      document.getElementById('image_one_img').src = window.URL.createObjectURL(this.form.image_one)
      document.getElementById('image_one_tab').href = window.URL.createObjectURL(this.form.image_one)
    },
    previewFilesTwo() {
      this.form.image_two = this.$refs.imageTwo.files[0]
      if (this.form.image_two.type == 'image/heic') {
        alert('your iphone\'s camera is using .heic please change to .jpg file')
        this.form.image_two = null
        return
      }

      document.getElementById('image_two').src = window.URL.createObjectURL(this.form.image_two)
      document.getElementById('image_two_tab').href = window.URL.createObjectURL(this.form.image_two)
    },
    getStudent(group_id) {
      let vm = this;
      const input = {
        'group_id': group_id
      }
      axios.post("/student/getByGroupId", input).then(function (response) {
        vm.student_list = response.data.data

      })
        .catch(function (error) {
          console.log(error);
        });
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
