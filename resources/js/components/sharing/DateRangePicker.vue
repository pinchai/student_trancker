<template>
    <date-range-picker 
        ref="picker"
        :locale-data="locale"
        :minDate="minDate" 
        :maxDate="maxDate"
        :singleDatePicker="singleDatePicker"
        :timePicker="timePicker"
        :timePicker24Hour="timePicker24Hour"
        :showWeekNumbers="showWeekNumbers"
        :linkedCalendars="linkedCalendars"
        :autoApply="autoApply"
        :ranges="ranges"
        :opens="opens"
        v-model="dateValue"
        @update="selectDate"
    >
    </date-range-picker>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import moment from 'moment'
export default {
    components: {
        DateRangePicker
    },
    props: {
        opens: {
            type: String,
            default: 'center'
        },
        value: {
            type: Object,
            default: {startDate: '2019-12-10', endDate : '2019-12-20'}
        },
        minDate: {
            type: String,
            default: '2000-01-01 00:00:00'
        },
        maxDate: {
            type: String,
            default: '2050-12-31 00:00:00'
        },
        singleDatePicker: {
            type: Boolean,
            default: false
        },
        timePicker: {
            type: Boolean,
            default: false
        },
        timePicker24Hour: {
            type: Boolean,
            default: false
        },
        showWeekNumbers: {
            type: Boolean,
            default: true
        },
        linkedCalendars: {
            type: Boolean,
            default: true
        },
        autoApply: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            dateValue: this.value,
            locale: {
                direction: 'ltr', //direction of text
                format: 'dd/mm/yyyy', //fomart of the dates displayed
                separator: ' ~ ', //separator between the two ranges
                applyLabel: 'Apply',
                cancelLabel: 'Cancel',
                weekLabel: 'W',
                customRangeLabel: 'Custom Range',
                daysOfWeek: moment.weekdaysMin(), //array of days - see moment documenations for details
                monthNames: moment.monthsShort(), //array of month names - see moment documenations for details
                firstDay: 1, //ISO first day of week - see moment documenations for details
                showWeekNumbers: true //show week numbers on each row of the calendar
            },
            ranges: { //default value for ranges object (if you set this to false ranges will no be rendered)
                'Today': [moment().toDate(), moment().toDate()],
                'Yesterday': [moment().subtract(1, 'days').toDate(), moment().subtract(1, 'days').toDate()],
                'This month': [moment().startOf('month').toDate(), moment().endOf('month').toDate()],
                'This year': [moment().startOf('year').toDate(), moment().endOf('year').toDate()],
                'Last week': [moment().subtract(1, 'week').startOf('week').toDate(), moment().subtract(1, 'week').endOf('week').toDate()],
                'Last month': [moment().subtract(1, 'month').startOf('month').toDate(), moment().subtract(1, 'month').endOf('month').toDate()],
            }
        }
    },
    created() {
        if (this.$helpers.isEmpty(this.value)) {
            this.dateValue = {startDate: moment().subtract(1, 'days').toDate(), endDate : moment().toDate()}
        }
    },
    methods: {
        selectDate() {
            this.$emit('input', this.dateValue)
            this.$emit('select', this.dateValue)
        }
    }
}
</script>

<style lang="scss">
    .vue-daterange-picker {
        .calendars {
            flex-wrap: inherit !important;
        }
    }
</style>
