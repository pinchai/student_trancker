<template>
  <div class="row layout-top-spacing">
    <!--daily_and monthly-->
    <template
      v-if="checkCustomModuleAuthorize('dashboard', 'view_card')"
    >
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
        <div class="row widget-statistic">
          <!--total_blog-->
          <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
            <div class="widget widget-one_hybrid bg-gradient-success mb-3">
              <div class="widget-heading">
                <i class="fas fa-newspaper text-primary" style="font-size:50px"></i>
                <p class="w-value">{{ items.total_blog }}</p>
                <h5 class="">Total Blog</h5>
              </div>
            </div>
          </div>
          <!--today_view-->
          <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
            <div class="widget widget-one_hybrid bg-gradient-success mb-3">
              <div class="widget-heading">
                <i class="fas fa-eye text-secondary" style="font-size:50px"></i>
                <p class="w-value">{{ items.total_view }}</p>
                <h5 class="">Total View</h5>
              </div>
            </div>
          </div>
          <!--today_product-->
          <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
            <div
              class="widget widget-one_hybrid bg-gradient-secondary mb-3"
            >
              <div class="widget-heading">
                <i class="fas fa-cubes text-success" style="font-size:50px"></i>
                <p class="w-value">{{ items.today_product }}</p>
                <h5 class="">Total Product</h5>
              </div>
            </div>
          </div>
          <!--today_employee-->
          <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
            <div class="widget widget-one_hybrid bg-gradient-secondary mb-3">
              <div class="widget-heading">
                <i class="fas fa-user text-danger" style="font-size:50px"></i>
                <p class="w-value">{{ items.today_employee }}</p>
                <h5 class="">Total Employee</h5>
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
import moment from "moment";
import store from "../../store";
import Swal from "sweetalert2";
import {currencyFormat} from "../../plugins/utils/string";

export default {
  moduleKey: "dashboard",
  data() {
    return {
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
            formatter: function(val, opt) {
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
      columnChartProductBestSale: {
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
      showLastSaleChart: false,
      showProductBestSaleChart: false,
      pieChartMostSaleCategory: {
        series: [],
        chartOptions: {
          chart: {
            width: 400,
            type: "donut"
          },
          labels: [],
          responsive: [
            {
              breakpoint: 1880,
              options: {
                chart: {
                  width: 400
                },
                legend: {
                  position: "bottom"
                }
              }
            }
          ]
        }
      },
      showPieChartMostSaleCategory: false,
      pieChartAgencyByMostSale: {
        series: [],
        chartOptions: {
          chart: {
            width: 400,
            type: "donut"
          },
          labels: [],
          responsive: [
            {
              breakpoint: 1880,
              options: {
                chart: {
                  width: 400
                },
                legend: {
                  position: "bottom"
                }
              }
            }
          ]
        }
      },
      showPieChartAgencyByMostSale: false,
      annual_leave: [],
    };
  },
  created() {},
  computed: {
    ...mapGetters({
      currencies: "getCurrency",
      userAuth: "userAuth",
      brand: "getBrand",
      default_currency: 'getDefaultCurrency',
    }),
    totalLeave(){
      let total_leave = 0
      this.annual_leave.forEach(item=>{
        total_leave += parseFloat(item.total_duration)
      })
      return total_leave
    }
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
    getDashboardData(loading = true) {
      let vm = this;
      axios
        .post("/dashboard/get", {loading: loading})
        .then(function (response) {
          vm.items = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
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
