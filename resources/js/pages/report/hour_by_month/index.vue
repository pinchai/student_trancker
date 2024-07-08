<template>
  <div style="width: 99%">
    <!--list-->
    <b-card no-body class="card-table">
      <b-card-header>
        <h1>{{ $t("hour_by_month") }}</h1>
        <!--filter-->
        <b-row>
          <b-col cols="12">
            <hr/>
          </b-col>
          <!--date range-->
          <b-col lg="6" md="6" sm="12">
            <b-form-group class="text-left" :label="$t('date')">
              <date-picker
                :editable="true"
                @input="dateTimeSelected"
                ref="date_picker"
              ></date-picker>
            </b-form-group>
          </b-col>
          <!--button action-->
          <b-col cols="12">
            <!--search-->
            <b-button
              variant="outline-secondary"
              @click="fetchRecord"
              class="float-right mr-2"
            >
              <i class="fas fa-search"></i>
              {{ $t("search") }}
            </b-button>
            <!--clear-->
            <b-button
              variant="outline-danger"
              @click="resetFilter"
              class="float-right mr-2"
            >
              <i class="fas fa-times"></i>
              {{ $t("clear") }}
            </b-button>
          </b-col>
        </b-row>
      </b-card-header>
      <!--list-->
      <b-card-body>
        <b-row>
          <b-col cols="12">
            <div class="table-responsive">
              <table
                class="table table-bordered table-striped"
                style="width: 100%"
              >
                <thead>
                <tr class="font-weight-bolder">
                  <th width="10">No.</th>
                  <th width="150">{{ $t("group") }}</th>
                  <th width="300">{{ $t("total_hour") }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="items.length == 0">
                  <td colspan="9" style="text-align: center">
                    <div
                      class="material-icons"
                      style="font-size: 40px; color: gray"
                    >
                      storage
                    </div>
                    <center style="font-size: 20px">
                      {{ $t("no_recode") }}
                    </center>
                  </td>
                </tr>
                <tr
                  v-for="(item, index) in items"
                  :key="'sale_list_' + index"
                >
                  <!--no. -->
                  <td>
                    <strong class="text-dark">{{ index + 1 }}</strong>
                  </td>
                  <!-- group_name -->
                  <td>
                    <strong class="text-dark">
                      {{ item.group_name }}
                    </strong>
                  </td>
                  <!-- total_hour -->
                  <td>
                    <strong class="text-dark">
                      {{ item.total_hour }}
                    </strong>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </b-col>
        </b-row>
      </b-card-body>
      <b-card-footer>
        <b-row>
          <!--total_hour-->
          <b-col cols="12">
            <table class="table table-border">
              <tr>
                <th>
                  <h4 style="text-decoration: underline">ម៉ោងសរុប</h4>
                </th>
                <th>
                  <h4 style="text-decoration: underline">ទឹកប្រាក់សរុបដែលទទួលបាន</h4>
                </th>
              </tr>
              <tr>
                <td>
                  <h4>{{ sumHour(items) }} ម៉ោង</h4>
                </td>
                <td>
                  <h4>{{ (sumHour(items) * 9) | currencyFormat }} $</h4>
                </td>
              </tr>
            </table>
          </b-col>
        </b-row>
      </b-card-footer>
    </b-card>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import moment from "moment";
import DatePicker from "../../../components/sharing/DatePicker";

export default {
  moduleKey: "net_income_report",
  data() {
    return {
      items: [],
      selectedItem: {},
      showDelete: true,
      showOverlay: false,
      formItem: {},
      filter: {
        txt_src: null,
        date_range: {
          startDate: moment().startOf("month").format("YYYY-MM-DD HH:mm:ss"),
          endDate: moment().endOf("month").format("YYYY-MM-DD HH:mm:ss")
        },
      },
      show_filter: false,
    };
  },
  components: {
    DatePicker,
  },
  created() {
    this.fetchRecord();
  },
  watch: {},
  computed: {
    ...mapGetters({
      // currencies: "getCurrency",
    }),
  },
  methods: {
    fetchRecord() {
      let vm = this;
      this.showOverlay = !this.showOverlay;
      const input = this.getInput();
      input.filter = this.filter;
      axios
        .post("/hour_by_month_report/get", input)
        .then(function (response) {
          vm.showOverlay = !vm.showOverlay;
          vm.setInput(response.data.data);
          //vm.sumHour(response.data.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getInput() {
      return {
        filter: this.filter,
      };
    },
    setInput(data) {
      this.items = data;
      //
    },
    dateTimeSelected(dateTime) {
      this.filter.date_range.startDate = dateTime.startDate;
      this.filter.date_range.endDate = dateTime.endDate;
    },
    resetFilter() {
      this.filter.txt_src = null;
      this.filter.user_id = null;
      this.filter.branch_id = null;
      this.filter.customer_id = null;
      this.filter.agency_id = null;

      this.filter.selected_agency = null;
      this.filter.selected_customer = null;

      let startDate = moment().startOf("month").format("YYYY-MM-DD HH:mm:ss");
      let endDate = moment().endOf("month").format("YYYY-MM-DD HH:mm:ss");

      //reset dateTimeValue on date-picker component
      this.$refs.date_picker.setDateTimeValue([startDate, endDate]);

      //reset dateTimeValue on filter
      this.filter.date_range.startDate = startDate;
      this.filter.date_range.endDate = endDate;
    },
    sumHour(data) {
      let total = 0;
      data.forEach((item) => {
        total += parseFloat(item.total_hour);
      });
      return total;
    },
  },
};
</script>
