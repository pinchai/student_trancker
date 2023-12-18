<template>
  <b-modal
    id="modal"
    v-model="modal"
    scrollable
    centered
    no-close-on-backdrop
    no-close-on-esc
    hide-header-close
    size="md"
    content-class="custom-modal"
  >
    <template slot="modal-header">
      <h6><i class="fas fa-medal"></i> {{ $t("score") }}របស់:
        <span class="bg-warning text-danger">{{ form.name }}-{{ form.latin_name }}</span>
      </h6>
    </template>

    <b-row>
      <div class="col-12">
        <center>
          <h1 v-if="form.late_submit_days > 0" class="text-danger rounded-lg">យឺត{{ form.late_submit_days | currencyFormat}}ថ្ងៃ⚠️</h1>
          <h1 v-else class="bg-primary rounded-lg">ទាន់ពេល✅</h1>
        </center>
      </div>
      <!--end date-->
      <b-col lg="12" xl="12" md="12" sm="12">
        <b-form-group
          size="sm"
          :invalid-feedback="veeErrors.first('end_date')"
          :state="veeErrors.has('end_date') ? false : null"
          label="ផុតកំណត់"
          label-class="control-label"
          class="text-left"
        >
          <b-form-datepicker
            disabled
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
      <!--submit date-->
      <b-col lg="12" xl="12" md="12" sm="12">
        <b-form-group
          size="sm"
          :invalid-feedback="veeErrors.first('submit_date')"
          :state="veeErrors.has('submit_date') ? false : null"
          label="Submit Date"
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
            v-model='form.submit_date'
            :date-format-options="{year: 'numeric',month: 'short',day: '2-digit'}"
            v-validate="'required'"
            :state="veeErrors.has('submit_date') ? false : null"
            :data-vv-name="'submit_date'"
            :data-vv-as="$t('submit_date')"
          ></b-form-datepicker>
        </b-form-group>
      </b-col>
      <!--score-->
      <b-col cols="12">
        <b-form-group
          :label="$t('score')+ '*'"
          :invalid-feedback="veeErrors.first('score')"
          label-class="control-label"
          class="text-left"
        >
          <b-form-input
            autocomplete="off"
            v-model="form.score"
            type="number"
            :placeholder="$t('score')"
            @keydown.enter.prevent="onSubmit"
            v-validate="'required'"
            :state="veeErrors.has('score') ? false : null"
            data-vv-name="score"
            :data-vv-as="$t('score')"
          ></b-form-input>
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
        score: null,
        remark: null,
        end_date: null,
        submit_date: moment().format('YYYY-MM-DD'),
        late_submit_days: 0
      },
      score_types: [
        {'name': 'lab'},
        {'name': 'midterm'},
        {'name': 'final'}
      ],
      url: null,
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
          this.setData();
          this.url = "/score/update_student_score";
        } else if (val == 2) {
          this.modal = true;
          this.setData();
          this.url = "/score/update_student_score";
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
          let input = this.form
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
      this.form.submit_date = moment().format('YYYY-MM-DD')

      let end_date = moment().format(this.form.end_date)
      let now = moment(new Date()); //todays date
      let end = moment(end_date); // another date
      let duration = moment.duration(now.diff(end));
      this.form.late_submit_days = duration.asDays();
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
