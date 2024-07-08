<template>
  <div>
    <vue2-date-picker
      v-model='dateTime'
      :type='type'
      :range='range'
      :format='format'
      :valueType='valueType'
      :editable='editable'
      :disabled='disabled'
      :append-to-body='false'
      :confirm='showConfirmBtn'
      :clearable='clearable'
      :title-format='titleFormat'
      :shortcuts='range ? shortcuts : []'
      :show-time-panel='showTimeRangePanel'
      :lang='lang'
      :confirm-text="$t('accept')"
      :placeholder="$t('date')"
      @input='selectedDateTime'
    >
      <template v-slot:footer>
        <b-button
          v-if='showTimeBtn'
          class='mr-2 btn_select_data_or_time'
          size='xs'
          variant='primary'
          @click='toggleTimeRangePanel'
        >
          {{ showTimeRangePanel ? $t('select_date') : $t('select_time') }}
        </b-button>
      </template>
    </vue2-date-picker>
  </div>
</template>

<script>
import Vue2DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import moment from 'moment'

export default {
  props: {
    type: {
      type: String,
      default: 'datetime'
    },
    clearable: {
      type: Boolean,
      default: false
    },
    titleFormat: {
      type: String,
      default: 'DD/MM/YYYY'
    },
    dateTimeValue: {
      type: Array,
      default: () => [
        moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
        moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')
      ]
    },
    singleDateTime: {
      type: String,
      default: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    range: {
      type: Boolean,
      default: true
    },
    showTimeBtn: {
      type: Boolean,
      default: true
    },
    showConfirmBtn: {
      type: Boolean,
      default: true
    },
    format: {
      type: String,
      default: 'DD/MM/YYYY HH:mm:ss'
    },
    valueType: {
      type: String,
      default: 'YYYY-MM-DD HH:mm:ss'
    },
    editable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: {Vue2DatePicker},
  created() {
    if (this.range) {
      //when picker is date range picker
      this.dateTime = this.dateTimeValue
    } else {
      //when picker is date picker
      this.dateTime = this.singleDateTime
      // this.dateTime = '2022-07-27 00:00:00'
    }
  },
  data() {
    return {
      dateTime: null,
      showTimeRangePanel: false,
      lang: {
        formatLocale: {
          firstDayOfWeek: 1
        }
      },
      shortcuts: [
        {
          text: this.$t('today'),
          onClick: () =>
            [
              moment().startOf('day').toDate(),
              moment().endOf('day').toDate()
            ]
        },
        {
          text: this.$t('yesterday'),
          onClick: () =>
            [
              moment().startOf('day').subtract(1, 'day').toDate(),
              moment().endOf('day').subtract(1, 'day').toDate()
            ]
        },
        {
          text: this.$t('this_week'),
          onClick: () =>
            [
              moment().startOf('week').toDate(),
              moment().endOf('week').toDate()
            ]
        },
        {
          text: this.$t('last_week'),
          onClick: () =>
            [
              moment().subtract(1, 'week').startOf('week').toDate(),
              moment().subtract(1, 'week').endOf('week').toDate()
            ]
        },
        {
          text: this.$t('this_month'),
          onClick: () =>
            [
              moment().startOf('month').toDate(),
              moment().endOf('month').toDate()
            ]
        },
        {
          text: this.$t('last_month'),
          onClick: () =>
            [
              moment().subtract(1, 'month').startOf('month').toDate(),
              moment().subtract(1, 'month').endOf('month').toDate()
            ]
        },
        {
          text: this.$t('this_year'),
          onClick: () =>
            [
              moment().startOf('year').toDate(),
              moment().endOf('year').toDate()
            ]
        },
        {
          text: this.$t('last_year'),
          onClick: () =>
            [
              moment().subtract(1, 'year').startOf('year').toDate(),
              moment().subtract(1, 'year').endOf('year').toDate()
            ]
        },
        {
          text: 'SETEC',
          onClick: () =>
            [
              (moment().subtract(1, 'months').date(16)).toDate(),
              (moment().subtract(0, 'months').date(15)).toDate()

              //moment().subtract(1, 'year').startOf('year').toDate(),
              //moment().subtract(1, 'year').endOf('year').toDate()
            ]
        }
      ]
    }
  },
  methods: {
    selectedDateTime() {
      let data = null
      if (this.range) {
        data = {
          'startDate': this.dateTime[0],
          'endDate': this.dateTime[1]
        }
      } else {
        data = this.dateTime
      }
      this.$emit('input', data)
    },
    setDateTimeValue(value) {
      this.dateTime = value
    },
    toggleTimeRangePanel() {
      this.showTimeRangePanel = !this.showTimeRangePanel
    }
  }
}
</script>

<style lang='scss'>
.mx-datepicker-range {
  width: 100%;
}

.mx-time-item {
  font-size: 18px !important;
}

.mx-time-header-title {
  font-size: 18px !important;
}

.btn_select_data_or_time {
  font-family: Kantumruy, Nunito, sans-serif;
  color: #fff;
  background-color: #008ecc;
  font-size: 16px;
  border-radius: 50px;
}

.mx-datepicker-btn-confirm {
  font-family: Kantumruy, Nunito, sans-serif;
  color: #fff;
  background-color: #008ecc;
  font-size: 16px;
  border-radius: 50px;
}

.mx-btn-shortcut {
  display: block;
  padding: 7px 4px;
  line-height: 30px;
  font-weight: normal;
  font-size: 15px;
  color: black;
  font-family: Kantumruy, Nunito, sans-serif;
}

.mx-input {
  display: inline-block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 34px;
  padding: 6px 30px;
  padding-left: 10px;
  font-size: 12px;
}

.mx-icon-calendar, .mx-icon-clear {
  position: absolute;
  top: 50%;
  right: 8px;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 12px;
  line-height: 1;
  color: rgba(0, 0, 0, .5);
  vertical-align: middle;
}

.mx-calendar-content .cell.in-range, .mx-calendar-content .cell.hover-in-range {
  color: #73879c;
  background-color: #dbedfb;
  border-radius: 30px;
}

.mx-calendar-content .cell.active {
  color: #fff;
  background-color: #008ecc;
  border-radius: 30px;
}

.mx-datepicker {
  width: 100%;
}

.mx-datepicker-popup {
  width: 100%;
}

</style>
