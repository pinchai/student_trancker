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
      <h3><i class="fas fa-rocket"></i> {{ $t("score") }}</h3>
    </template>

    <b-row>
      <!--group-->
      <b-col lg="12" xl="12" md="12" sm="12">
        <b-form-group
            :label="$t('group')"
            label-class="control-label"
            class="text-left"
        >
          <b-form-group>
            <v-select
                :options="groups"
                v-model="form.group_id"
                :reduce="(option) => option.id"
                label="name"
                @input="getStudent(form.group_id)"
            />
          </b-form-group>
        </b-form-group>
      </b-col>
      <!--start date-->
      <b-col lg="6" xl="6" md="6" sm="12">
        <b-form-group
            size="sm"
            :invalid-feedback="veeErrors.first('start_date')"
            :state="veeErrors.has('start_date') ? false : null"
            :label="$t('start_date') + ' *'"
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
              v-model='form.start_date'
              :date-format-options="{year: 'numeric',month: 'short',day: '2-digit'}"
              v-validate="'required'"
              :state="veeErrors.has('start_date') ? false : null"
              :data-vv-name="'start_date'"
              :data-vv-as="$t('start_date')"
          ></b-form-datepicker>
        </b-form-group>
      </b-col>
      <!--end date-->
      <b-col lg="6" xl="6" md="6" sm="12">
        <b-form-group
            size="sm"
            :invalid-feedback="veeErrors.first('end_date')"
            :state="veeErrors.has('end_date') ? false : null"
            :label="$t('end_date') + ' *'"
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
              v-model='form.end_date'
              :date-format-options="{year: 'numeric',month: 'short',day: '2-digit'}"
              v-validate="'required'"
              :state="veeErrors.has('end_date') ? false : null"
              :data-vv-name="'end_date'"
              :data-vv-as="$t('end_date')"
          ></b-form-datepicker>
        </b-form-group>
      </b-col>
      <!--radio block-->
      <b-col lg="12" xl="12" md="12" sm="12">
        <b-row>
          <!--score_type-->
          <b-col lg="4" xl="4" md="12" sm="12">
            <b-form-group
                label="Score Type"
            >
              <b-form-radio
                  v-for="(item, index) in score_types"
                  :key="'score_type_'+index"
                  v-model="form.score_type"
                  name="group-section"
                  :value="item.name"
              >
                {{ item.name }}
              </b-form-radio>
            </b-form-group>
          </b-col>
          <!--on_going-->
          <b-col lg="4" xl="4" md="12" sm="12">
            <b-form-group
                label="On Going"
            >
              <b-form-radio
                  v-model="form.on_going"
                  name="on_going"
                  value="midterm"
                  :disabled="form.on_going !== 'midterm'"
              >
                Midterm
              </b-form-radio>

              <b-form-radio
                  v-model="form.on_going"
                  name="on_going"
                  value="final"
                  :disabled="form.on_going !== 'final'"
              >
                Final
              </b-form-radio>
            </b-form-group>
          </b-col>
          <!--is_close-->
          <b-col lg="4" xl="4" md="12" sm="12">
            <b-form-group
                label="Is Close"
            >
              <b-form-radio
                  v-model="form.is_close"
                  name="is_close"
                  value="1"
              >
                ឈប់ទទួល
              </b-form-radio>
              <b-form-radio
                  v-model="form.is_close"
                  name="is_close"
                  value="0"
              >
                នៅទទួល
              </b-form-radio>
            </b-form-group>
          </b-col>
        </b-row>
      </b-col>
      <!--total_score-->
      <b-col v-if="form.group_id != null" cols="12">
        <b-form-group
            :label="$t('total_score')+ '*'"
            :invalid-feedback="veeErrors.first('total_score')"
            label-class="control-label"
            class="text-left"
        >
          <b-form-input
              autocomplete="off"
              v-model="form.total_score"
              type="number"
              :placeholder="$t('total_score')"
              @keydown.enter.prevent="onSubmit"
              v-validate="'required'"
              :state="veeErrors.has('total_score') ? false : null"
              data-vv-name="total_score"
              :data-vv-as="$t('total_score')"
          ></b-form-input>
          <a
              href="#"
              class="float-right"
              @click="setToAll"
          >
            set to all
          </a>
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
      <!--student_list-->
      <b-col lg="12" xl="12" md="12" sm="12">
        <b-table-simple
            small
            hover
            caption-top
            responsive
            striped
            :filter="txt_src"
        >
          <b-thead>
            <b-tr>
              <b-th>No.</b-th>
              <b-th>Name</b-th>
              <b-th>Latin Name</b-th>
              <b-th>Check</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr
                v-for="(item, index) in student_list"
                :key="'student_'+index"
                @click="rowClick(item)"
            >
              <b-td :class="item.score < 0 ? 'bg-danger text-white': ''">{{ index + 1 }}</b-td>
              <b-td :class="item.score < 0 ? 'bg-danger text-white': ''">
                {{ item.name }}
              </b-td>
              <b-td :class="item.score < 0 ? 'bg-danger text-white': ''">{{ item.latin_name }}</b-td>
              <b-td>
                <b-form-input
                    style='border-radius: 5px'
                    v-model='item.score'
                    v-validate="`required|max_value:${form.total_score}`"
                    :state="veeErrors.has('score_'+index) ? false : null"
                    :data-vv-name="'score_'+index"
                    :data-vv-as="$t('score')"
                    type='number'
                    required
                    :placeholder="$t('score')"
                    autocomplete="off"
                    @change="something_change = true"
                ></b-form-input>
                <b
                    class="mt-4"
                    :class="item.total_absent > 0 ? 'text-danger' : 'text-success'"
                >
                  {{ item.total_absent == null ? 'សិស្សល្អ ⏰' : 'ឈប់: ' + item.total_absent + 'ដង' }}
                </b> |
                <span class="text-primary">មករៀន:{{ item.total_present }}ដង</span> |
                <span
                    class="text-secondary"
                    v-if="item.show_remark == 0"
                    style="cursor: pointer"
                    @click="item.show_remark = 1"
                >show remark</span>
                <span
                    class="text-secondary"
                    v-if="item.show_remark == 1"
                    style="cursor: pointer"
                    @click="item.show_remark = 0"
                >Hide remark</span>
                <textarea
                    v-if="item.show_remark == 1"
                    class="w-100"
                    rows="5"
                    v-model="item.remark"
                ></textarea>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
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
      </b-button>
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
        group_id: null,
        score_type: null,
        total_score: 0,
        start_date: moment().format('YYYY-MM-DD'),
        end_date: moment().format('YYYY-MM-DD'),
        remark: null,
        on_going: null,
        is_close: 0,
      },
      score_types: [
        {'name': 'lab'},
        {'name': 'lab_final'},
        {'name': 'midterm'},
        {'name': 'final'}
      ],
      url: null,
      imgUrl: "/images/score/",
      listItems: {},
      student_list: [],
      group_section: null,
      txt_src: null,
      something_change: false
    };
  },
  created() {
    if (this.url === '/score/store') {
      let selected_group = JSON.parse(localStorage.getItem('group_selected'))
      this.form.group_id = selected_group[0] ?? null
      if (this.form.group_id) {
        this.getStudent(this.form.group_id)
      }
    }
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
          this.url = "/score/store";
        } else if (val == 2) {
          this.modal = true;
          this.setData();
          this.url = "/score/edit";
        }
      },
      immediate: true
    },
  },
  methods: {
    onSubmit() {
      let vm = this;
      this.$validator.validateAll().then(result => {
        if (result) {
          let input = this.form
          input.student_list = this.student_list
          axios.post(this.url, input).then(function (response) {
            if (response.status === 200) {
              vm.listItems = response.data.data;
              vm.clearForm();

              vm.$notify({
                group: "message",
                type: "success",
                title: vm.$t("score"),
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
            title: vm.$t("score"),
            text: vm.$t("validation_failed")
          });
        }
      });
    },
    clearForm() {
      if (this.url == "/score/edit" && this.something_change == true) {
        let dig = confirm("Do Your want to close ?");
        if (dig === false) {
          return;
        }
      }

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
      this.form.logo = '/images/score/' + this.formItem.image;
      this.form.old_logo = this.formItem.image;

      this.student_list = this.formItem.student_score
      this.group_section = this.formItem.group_section
    },
    getStudent(group_id) {
      let vm = this;
      let group_detail = vm.groups.find(item => {
        return item.id == group_id
      })
      vm.form.on_going = group_detail.on_going
      const input = {
        'group_id': group_id
      }
      axios.post("/student/getByGroupId", input).then(function (response) {
        vm.student_list = response.data.data
        vm.group_section = response.data.data[0].group_section

      })
          .catch(function (error) {
            console.log(error);
          });
    },
    rowClick(item) {
      item.checked = !item.checked
    },
    setToAll() {
      this.$fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, set to all!",
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then(result => {
        if (result.value) {
          let vm = this;
          vm.student_list.forEach(item => {
            item.score = vm.form.total_score
            console.log(item)
          })
          //alert(vm.form.total_score)
        }
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

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
