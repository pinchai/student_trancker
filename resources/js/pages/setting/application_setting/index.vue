<template>
  <div style="width: 99%">
    <b-card no-body class="card-table">
      <b-card-header>
        <h1>{{ $t("default_setting") }}</h1>
      </b-card-header>
      <b-card-body>
        <b-row>
          <b-col
            cols="6"
            v-for="(item, index) in form"
            :key="'setting_'+index"
          >
            <b-form-group
              :label="item.value[0].label"
              label-class="control-label"
              class="text-left"
            >
             <!--render for default sale_status-->
              <b-form-select
                v-if="item.value[0].key == 'sale_status'"
                :state="veeErrors.has('status') ? false : null"
                :data-vv-name="'status'"
                :data-vv-as="$t('status')"
                v-model="item.value[0].value"
              >
                <b-form-select-option
                  v-for="(status, index) in transaction_status"
                  :key="'status_'+index"
                  :value="status.id"
                >
                  {{ $t(status.name) }}
                </b-form-select-option>
              </b-form-select>

              <b-form-input
                v-else
                v-model="item.value[0].value"
                type="text"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </b-card-body>
      <b-card-footer>
        <b-col cols="12">
          <b-button
            @click="onSubmit"
            variant="outline-info"
            class="float-right"
          >
            <i class="fa fa-edit"></i>
            {{ $t("save") }}
          </b-button>
        </b-col>
      </b-card-footer>
    </b-card>
    <b-row>
      <b-col cols="12">

      </b-col>
    </b-row>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  moduleKey: "bank",
  data() {
    return {
      id: null,
      form: [
        {
          label: 'Clock In IP Address',
          key: 'ip',
          value: '0.0.0.0'
        }
      ],
    };
  },
  components: {},
  created() {
    this.fetchRecord();
  },
  computed: {
    ...mapGetters({
      category: "getProductCategory",
      transaction_status: 'getTransactionStatus',
    }),
  },
  methods: {
    fetchRecord() {
      let vm = this;
      this.showOverlay = !this.showOverlay;
      const input = {};
      axios.post("/setting/get", input).then(function (response) {
        vm.showOverlay = !vm.showOverlay;
        vm.form = response.data.data
        vm.form.map(item=>{
          item.value = JSON.parse(item.value)
        })
      }).catch(function (error) {
        console.log(error);
      });
    },
    onSubmit() {
      this.$validator.validateAll().then((result) => {
        let vm = this;
        let input = {
          setting: this.form
        }
        if (result) {
          axios.post("/setting/edit", input).then(function (response) {
            if (response.status === 200) {
              window.location.reload()
            }
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
  }
};
</script>
