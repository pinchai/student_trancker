<template>
  <div style="width: 99%">
    <!--list-->
    <b-card
      no-body
      class="card-table"
    >
      <b-card-header>
        <h1>{{ $t('module') }}</h1>
      </b-card-header>
      <!--list-->
      <b-card-body>
        <b-row>
          <b-col cols="12">
            <div class="table-responsive">
              <table class="table table-bordered table-striped">
                <thead>
                <tr class="font-weight-bolder">
                  <th>No.</th>
                  <th>Module Name</th>
                  <th>Module Key</th>
                  <th>Custom Permission</th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="items.length == 0">
                  <td colspan="9" style="text-align: center">
                    <div class='material-icons' style='font-size: 40px; color: gray'>storage</div>
                    <center style="font-size: 20px">{{ $t('no_recode') }}</center>
                  </td>
                </tr>
                <tr
                  v-for="(item, index) in items"
                  :key="'module_'+index"
                >
                  <!--no-->
                  <td>
                    <strong class="text-dark">{{ index + 1 }}</strong>
                  </td>
                  <!--module_name-->
                  <td>
                    <strong class="text-dark">{{ item.module_name }}</strong>
                  </td>
                  <!--module_key-->
                  <b-td>
                    <strong class="text-dark">{{ item.module_key }}</strong>
                  </b-td>
                  <!--custom_permission-->
                  <b-td>
                    <strong class="text-dark">{{ item.custom_permission }}</strong>
                  </b-td>
                </tr>
                </tbody>
              </table>
            </div>
          </b-col>
        </b-row>
      </b-card-body>
      <b-card-footer>
        <b-col cols="12" v-if="false">footer</b-col>
      </b-card-footer>
    </b-card>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import moment from 'moment'
import DatePicker from '../../../components/sharing/DatePicker'

export default {
  moduleKey: 'product_report',
  data() {
    return {
      items: [],
      selectedItem: {},
      showDelete: true,
      showOverlay: false,
      formItem: {},
      filter: {
        txt_src: null,
        branch_id: null,
        selling_type: null,

        customer_id: null,
        selected_customer: null,

        selected_agency: null,
        agency_id: null,
        customer_type: 'customer',

        user_id: null,
        date_range: {
          startDate: moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
          endDate: moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')
        }
      },
      show_filter: false
    }
  },
  components: {
    DatePicker
  },
  created() {
    this.fetchRecord();
  },
  watch: {
    filter: {
      handler: function (after, before) {
        let vm = this

        //customer
        if (vm.$helpers.nullToVoid(after.selected_customer, '') != '') {
          after.customer_id = after.selected_customer.id
        } else {
          after.customer_id = null
        }

        //agency
        if (vm.$helpers.nullToVoid(after.selected_agency, '') != '') {
          after.agency_id = after.selected_agency.id
        } else {
          after.agency_id = null
        }
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters({
      currencies: 'getCurrency',
      products: 'getProducts',
      bank: 'getBank',
      agency: 'getAgency',
      banks: 'getBank',
      default_currency: 'getDefaultCurrency',
    }),
  },
  methods: {
    fetchRecord() {
      let vm = this;
      this.showOverlay = !this.showOverlay;
      const input = this.getInput();
      input.filter = this.filter

      axios.post('/module/get', input).then(function (response) {
        vm.showOverlay = !vm.showOverlay;
        vm.setInput(response.data);

      }).catch(function (error) {
        console.log(error)
      });
    },
    rowItem(event) {
      if (event.length > 0) {
        this.selectedItem = event[0];
        this.showDelete = false;
      } else {
        this.showDelete = true;
        this.selectedItem = {};
      }
    },
    getInput() {
      return {
        filter: this.filter
      }
    },
    setInput(data) {
      this.items = data.data
    },
    dateTimeSelected(dateTime) {
      this.filter.date_range.startDate = dateTime.startDate
      this.filter.date_range.endDate = dateTime.endDate
    },
    resetFilter() {
      this.filter.txt_src = null
      this.filter.user_id = null
      this.filter.branch_id = null
      this.filter.customer_id = null
      this.filter.agency_id = null
      this.filter.selling_type = null

      this.filter.selected_agency = null
      this.filter.selected_customer = null

      let startDate = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss')
      let endDate = moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')

      //reset dateTimeValue on date-picker component
      this.$refs.date_picker.setDateTimeValue([startDate, endDate])

      //reset dateTimeValue on filter
      this.filter.date_range.startDate = startDate
      this.filter.date_range.endDate = endDate
    },
    printExcel() {
      let vm = this;
      let start_date = vm.filter.date_range.startDate
      let end_date = vm.filter.date_range.endDate
      let file_name = `product_report(${start_date} - ${end_date}).xlsx`;
      axios({
        url: "/product_report/printExcel",
        data: {
          filter: vm.filter
        },
        method: "POST",
        responseType: "blob"
      })
        .then(response => {
          const url = window.URL.createObjectURL(
            new Blob([response.data])
          );
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", file_name); //or any other extension
          document.body.appendChild(link);
          link.click();
        })
        .catch(error => {
          vm.inProgress = false;
        });
    },
  }
}
</script>
