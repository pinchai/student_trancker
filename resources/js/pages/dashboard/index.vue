<template>
  <div class="row layout-top-spacing">
    <!--daily_and monthly-->
    <template
      v-if="checkCustomModuleAuthorize('dashboard', 'view_card')"
    >
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
        <div class="row widget-statistic">
          <!--total_group-->
          <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
            <div class="widget widget-one_hybrid bg-gradient-success mb-3">
              <div class="widget-heading">
                <i class="fas fa-cubes text-primary" style="font-size:50px"></i>
                <p class="w-value">{{ items.total_group }}</p>
                <h5 class="">Total Group</h5>
              </div>
            </div>
          </div>
          <!--total_student-->
          <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
            <div class="widget widget-one_hybrid bg-gradient-success mb-3">
              <div class="widget-heading">
                <i class="fas fa-school text-secondary" style="font-size:50px"></i>
                <p class="w-value">{{ items.total_student }}</p>
                <h5 class="">Total Student</h5>
              </div>
            </div>
          </div>
          <!--total_classing-->
          <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
            <div
              class="widget widget-one_hybrid bg-gradient-secondary mb-3"
            >
              <div class="widget-heading">
                <i class="fas fa-table text-success" style="font-size:50px"></i>
                <p class="w-value">{{ items.total_classing }}</p>
                <h5 class="">Total Classing This month</h5>
              </div>
            </div>
          </div>
          <!--total_student_view-->
          <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
            <div class="widget widget-one_hybrid bg-gradient-secondary mb-3">
              <div class="widget-heading">
                <i class="fas fa-eye text-success" style="font-size:50px"></i>
                <p class="w-value">{{ items.total_student_view }}</p>
                <h5 class="">Total Student View</h5>
              </div>
            </div>
          </div>

          <!--count student by group-->
          <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div class="widget widget-one_hybrid bg-gradient-secondary mb-3">
              <div class="widget-heading">
                <h4>ចំនួនសិស្សតាមថ្នាក់</h4>
                <hr>
              </div>
              <apexchart
                height="290"
                type="bar"
                :options="columnChartCountStudentByGroup.chartOptions"
                :series="columnChartCountStudentByGroup.series"
              ></apexchart>
            </div>
          </div>

          <!--Calendar-->
          <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div class="widget widget-one_hybrid bg-gradient-secondary mb-3">
              <div class="widget-heading" style="height: 405px">
                <h4>Calendar</h4>
                <hr>
                <v-calendar
                  :columns="$screens({ default: 1, lg: 1 })"
                  :rows="$screens({ default: 1, lg: 1 })"
                  :is-expanded="$screens({ default: true, lg: 1 })"
                  title-position="right"
                  :attributes="calendar_attributes"
                  @dayclick="onDayClickHandler"
                />
                <b-alert
                  :show="todayClickedEventShow == true"
                  dismissible
                  class="mt-2"
                >
                  <ul>
                    <li
                      v-for="(item,index) in todayClickedEvent"
                      :key="'todayClickedEvent_'+index"
                    >
                      <strong>{{ item }}</strong>
                      <b-badge variant="primary">Meeting ☕️</b-badge>
                      <b-badge variant="secondary">Pending Approve 😅</b-badge>
                      <b-badge variant="success">Completed ✅</b-badge>
                      <b-badge variant="danger">Cancel ❌</b-badge>
                    </li>
                  </ul>
                </b-alert>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  moduleKey: "dashboard",
  data() {
    return {
      showDate: new Date(),
      items: null,
      columnChart: {
        series: [
          {
            data: []
          }
        ],
        chartOptions: {
          chart: {
            height: 600,
            type: "bar",
          },
          // colors: 'red',
          plotOptions: {
            bar: {
              columnWidth: "45%",
              distributed: true,
            }
          },
          dataLabels: {
            enabled: true,
            style: {
              colors: ['#3b3636']
            },
            textAnchor: 'start',
            formatter: function (val, opt) {
              return `$` + val.toLocaleString()
            },
          },
          stroke: {
            curve: 'smooth',
          },
          legend: {
            show: false
          },
          xaxis: {
            categories: [],
            labels: {
              style: {
                fontSize: "14px"
              }
            }
          },
          // colors: [
          //   `${"#"+Math.floor(Math.random() * 0x1000000).toString(16)}`,
          //   `${"#"+Math.floor(Math.random() * 0x1000000).toString(16)}`,
          // ]
        }
      },
      columnChartCountStudentByGroup: {
        series: [
          {
            data: []
          }
        ],
        chartOptions: {
          chart: {
            height: 350,
            type: "bar"
          },
          plotOptions: {
            bar: {
              columnWidth: "45%",
              distributed: true
            }
          },
          dataLabels: {
            //enabled: false,
            enabled: true,
            style: {
              colors: ['#3b3636']
            },
          },
          legend: {
            show: false
          },
          xaxis: {
            categories: [],
            labels: {
              style: {
                fontSize: "12px"
              }
            }
          },
          // colors: [
          //   `${"#"+Math.floor(Math.random() * 0x1000000).toString(16)}`,
          //   `${"#"+Math.floor(Math.random() * 0x1000000).toString(16)}`,
          // ]
        }
      },
      calendar_attributes: [],
      todayClickedEvent: [],
      todayClickedEventShow: false,
      attendance: []
    };
  },
  components: {},
  created() {
  },
  computed: {
    ...mapGetters({
      currencies: "getCurrency",
      userAuth: "userAuth",
      brand: "getBrand",
      default_currency: 'getDefaultCurrency',
    }),
  },
  watch: {
    "$i18n.locale": {
      handler(val) {
        this.getDashboardData(true);
      },
      immediate: true
    }
  },
  methods: {
    onDayClickHandler(e) {
      let popover = e.popovers[0]
      if (popover != undefined) {
        this.todayClickedEventShow = !(this.todayClickedEventShow)
        this.todayClickedEvent = (popover.label).split(' | ')
      }
    },
    setShowDate(d) {
      this.showDate = d;
    },
    getDashboardData(loading = true) {
      let vm = this;
      axios
        .post("/dashboard/get", {loading: loading})
        .then(function (response) {
          vm.items = response.data.data;
          //get product best_sale
          vm.setCountStudentByGroup(response.data.data.total_student_by_group);
          vm.attendance = response.data.data.student.attendance
          vm.setAttributeCalendar(vm.attendance)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    setCountStudentByGroup(item) {
      this.columnChartCountStudentByGroup.series[0].data = [];
      this.columnChartCountStudentByGroup.chartOptions.xaxis.categories = [];

      item.forEach(obj => {
        this.columnChartCountStudentByGroup.series[0].name = obj.group_name;
        this.columnChartCountStudentByGroup.series[0].data.push(obj.total_student);
        this.columnChartCountStudentByGroup.chartOptions.xaxis.categories.push(obj.group_name);
      })

    },
    setAttributeCalendar(attendance) {
      let vm = this
      attendance.forEach(obj => {
        let dt = new Date(obj.classing_date)
        let att = {
          highlight: {
            color: obj.checked == 1 ? 'green' : 'red',
            fillMode: 'outline',
          },
          popover: {
            label: obj.on_going,
            visibility: 'click',
            transition: 'slide-fade',
          },
          dates: [],
        }
        att.dates.push(
          new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()),
        )
        vm.calendar_attributes.push(att)
      })
    }
  }
};
</script>

<style scoped>
i {
  font-size: 18px;
  padding: 5px;
}

.shake:hover {
  /* Start the shake animation and make the animation last for 0.5 seconds */
  animation: shake 1s;

  /* When the animation is finished, start again */
  animation-iteration-count: infinite;
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
</style>
