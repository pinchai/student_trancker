<template>
  <div style="width: 99%">
    <!-- Profile Card -->
    <b-card>
      <b-row>
        <b-col md="3" class="text-center">
          <b-img
            src="https://via.placeholder.com/150"
            alt="Profile Picture"
            rounded
            class="mb-3"
          />
        </b-col>
        <b-col md="9">
          <h3>{{ item.name }} - {{ item.latin_name }}</h3>
          <h5 class="text-muted">{{ item.position }}</h5>
          <p>
            {{ item.group_name }}
          </p>
          <p>
            {{ item.address }}
          </p>
        </b-col>
      </b-row>
    </b-card>

    <!-- Additional Information -->
    <b-card class="mt-4">
      <b-tabs card>
        <!--Attendance Tab-->
        <b-tab title="Attendance">
          <b-row>
            <!--Present Details-->
            <b-col md="4">
              <div class="card">
                <div class="card-header">
                  <h3>Present Details ✅</h3>
                </div>
                <div class="card-body">
                  <b-table-simple small hover>
                    <b-thead>
                      <b-tr>
                        <b-th>No.</b-th>
                        <b-th>Date</b-th>
                        <b-th>Remark</b-th>
                      </b-tr>
                    </b-thead>
                    <b-tbody>
                      <b-tr
                        v-for="(item, index) in getPreset(item)"
                        :key="'student_'+index"
                      >
                        <b-td :class="item.checked == 0 ? 'bg-danger text-warning': ''">
                          {{ index + 1 }}
                        </b-td>
                        <b-td :class="item.checked == 0 ? 'bg-danger text-warning': ''">
                          {{ item.classing_date | dateFormat }}
                        </b-td>
                        <b-td :class="item.checked == 0 ? 'bg-danger text-warning': ''">{{ item.remark }}</b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
                </div>
              </div>
            </b-col>
            <!--Permission Details-->
            <b-col md="4">
              <div class="card">
                <div class="card-header">
                  <h3>Permission Details 🚑</h3>
                </div>
                <div class="card-body">
                  <b-table-simple small hover>
                    <b-thead>
                      <b-tr>
                        <b-th>No.</b-th>
                        <b-th>Date</b-th>
                        <b-th>Remark</b-th>
                      </b-tr>
                    </b-thead>
                    <b-tbody>
                      <b-tr
                        v-for="(item, index) in getPermission(item)"
                        :key="'student_'+index"
                      >
                        <b-td class="text-warning bg-dark">
                          {{ index + 1 }}
                        </b-td>
                        <b-td class="text-warning bg-dark">
                          {{ item.classing_date | dateFormat }}
                        </b-td>
                        <b-td class="text-warning bg-dark">{{ item.remark }}</b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
                </div>
              </div>
            </b-col>
            <!--Absent Details-->
            <b-col md="4">
              <div class="card">
                <div class="card-header">
                  <h3>Absent Details ❌</h3>
                </div>
                <div class="card-body">
                  <b-table-simple small hover>
                    <b-thead>
                      <b-tr>
                        <b-th>No.</b-th>
                        <b-th>Date</b-th>
                        <b-th>Remark</b-th>
                        <b-th>Action</b-th>
                      </b-tr>
                    </b-thead>
                    <b-tbody>
                      <b-tr
                        v-for="(item, index) in getAbsent(item)"
                        :key="'student_'+index"
                      >
                        <b-td :class="item.checked == 0 ? 'bg-danger text-warning': ''">{{ index + 1 }}</b-td>
                        <b-td :class="item.checked == 0 ? 'bg-danger text-warning': ''">
                          {{ item.classing_date | dateFormat }}
                        </b-td>
                        <b-td :class="item.checked == 0 ? 'bg-danger text-warning': ''">{{ item.remark }}</b-td>
                        <b-td :class="item.checked == 0 ? 'bg-danger text-warning': ''">
                          <i class="fa fa-trash" @click="deleteAttendance(item.id)"></i>
                        </b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-tab>
        <!--Score Tab-->
        <b-tab :title="'Score - ' + sumScore(item.score) + 'ពិន្ទុ'">
          <b-row>
            <!--Midterm Score list-->
            <div class="col-6">
              <div class="card">
                <div class="card-header">
                  <h3>Midterm Score list ✅</h3>
                </div>
                <div class="card-body">
                  <b-table-simple small hover>
                    <b-thead>
                      <b-tr>
                        <b-th>No.</b-th>
                        <b-th>Date</b-th>
                        <b-th>Score Type</b-th>
                        <b-th>Score</b-th>
                        <b-th>Remark</b-th>
                      </b-tr>
                    </b-thead>
                    <b-tbody>
                      <b-tr
                        v-for="(item, index) in getMidtermScore(item.score)"
                        :key="'score_'+index"
                      >
                        <b-td>{{ index + 1 }}</b-td>
                        <b-td>{{ item.updated_at | dateFormat }}</b-td>
                        <b-td>{{ item.score_type }}</b-td>
                        <b-td>{{ item.score }}</b-td>
                        <b-td>{{ item.remark }}</b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
                </div>
              </div>
            </div>

            <!--Final Score list-->
            <div class="col-6">
              <div class="card">
                <div class="card-header">
                  <h3>Final Score list ✅</h3>
                </div>
                <div class="card-body">
                  <b-table-simple small hover>
                    <b-thead>
                      <b-tr>
                        <b-th>No.</b-th>
                        <b-th>Date</b-th>
                        <b-th>Score Type</b-th>
                        <b-th>Score</b-th>
                        <b-th>Remark</b-th>
                      </b-tr>
                    </b-thead>
                    <b-tbody>
                      <b-tr
                        v-for="(item, index) in getFinalScore(item.score)"
                        :key="'score_'+index"
                      >
                        <b-td>{{ index + 1 }}</b-td>
                        <b-td>{{ item.updated_at | dateFormat }}</b-td>
                        <b-td>{{ item.score_type }}</b-td>
                        <b-td>{{ item.score }}</b-td>
                        <b-td>{{ item.remark }}</b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
                </div>
              </div>
            </div>
          </b-row>
        </b-tab>
        <!--other action Tab-->
        <b-tab title="Add To Score List" active>
          <b-row>
            <div class="col-6">
              <div class="card">
                <div class="card-header">
                  <h3>Add To Score List</h3>
                </div>
                <div class="card-body">
                  <b-col cols="12 mb-lt-0 mt-sm-2">
                    <!--group search-->
                    <b-form-group v-if="false">
                      <v-select
                        multiple
                        :options="groups"
                        v-model="filter.group_selected"
                        :reduce="(option) => option.id"
                        label="name"
                        @input="fetchScore"
                      />
                    </b-form-group>
                    <!--score list-->
                    <b-form-group
                      v-if="score_list.length > 0"
                      label="Score List"
                    >
                      <b-form-radio-group
                        v-model="form.score_id"
                        :options="score_list"
                        name="radios-stacked"
                        stacked
                      ></b-form-radio-group>
                    </b-form-group>
                  </b-col>
                  <!--score-->
                  <b-col
                    v-if="form.score_id != null"
                    cols="12"
                    class=" mb-lt-0 mt-sm-2"
                  >
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
                  <!--save-->
                  <b-col
                    v-if="form.score_id != null"
                    cols="12"
                  >
                    <b-button
                      type="submit"
                      variant="outline-primary"
                      class="float-right"
                      @click.prevent="onSubmit"
                    >
                      Save
                    </b-button>
                  </b-col>
                </div>
              </div>
            </div>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import moment from 'moment';
import swal from "sweetalert2";

export default {
  data() {
    return {
      form: {
        student_id: null,
        score_id: null,
        score: 0,
      },
      url: null,
      item: [],
      filter: {
        txt_src: null,
        group_selected: []
      },
      score_list: []
    }
  },
  props: {
    formItem: {
      type: Object,
      default: () => {
        return {}
      },
    },
    modalType: {
      type: Number,
      default: 0,
    },
  },
  components: {},
  computed: {
    ...mapGetters({
      enums: 'getEnums',
      groups: "getGroup",
    }),
  },
  watch: {},
  created() {
    let vm = this
    this.form.student_id = parseInt(vm.$route.query.id)
    this.fetchRecord(this.form.student_id)
  },
  methods: {
    async fetchRecord(id) {
      let vm = this
      let input = {
        'id': this.form.student_id
      }

      await axios
        .post("/student/getInfo", input)
        .then(function (response) {
          vm.item = response.data
          vm.filter.group_selected = [response.data.group_id]
        })
        .catch(function (error) {
          console.log(error);
        });
      await vm.fetchScore()
    },
    fetchScore() {
      let vm = this;
      const input = {
        filter: this.filter,
      }
      axios
        .post("/score/get", input)
        .then(function (response) {
          vm.score_list = response.data.data
          vm.score_list.map(item => {
            item.text = `Remark: ${item.remark} - Score: ${item.total_score} - ${item.on_going}`
            item.value = item.id
          })
          console.log(response.data.data)
          //vm.setInput(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    onSubmit() {
      this.$validator.validateAll().then((result) => {
        let vm = this;
        if (result) {
          let input = vm.form
          axios.post('/score/customer_add', input).then(function (response) {
            if (response.status === 200) {
              vm.$notify({
                group: 'message',
                type: 'success',
                title: vm.$t('product'),
                text: vm.$t('done')
              });
              vm.clearForm()
              vm.fetchRecord()
            }
          }).catch(function (error) {
            console.log(error)
          });
        } else {
          vm.$notify({
            group: 'message',
            type: 'warning',
            title: vm.$t('score'),
            text: vm.$t('validation_failed')
          });
        }
      });
    },
    getPreset(item) {
      let preset = item.attendance.filter(obj => {
        return obj.checked == 1
      })
      return preset
    },
    getPermission(item) {
      let preset = item.attendance.filter(obj => {
        return obj.checked == 2
      })
      return preset
    },
    getAbsent(item) {
      let preset = item.attendance.filter(obj => {
        return obj.checked == 0
      })
      return preset
    },
    sumScore(item) {
      let total = 0
      item.forEach(obj => {
        total += parseFloat(obj.score)
      })

      return total
    },
    deleteAttendance(id) {
      this.$fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then(result => {
        if (result.value) {
          let vm = this;
          axios
            .post("/student/delete_attendance",
              {
                id: id
              })
            .then(function (response) {
              if (response.status == 200) {
                vm.fetchRecord();
                vm.$notify({
                  group: "message",
                  type: "success",
                  title: vm.$t("branch"),
                  text: vm.$t("done")
                });
              }
            });
        }
      });
    },
    getMidtermScore(item) {
      let midterm = item.filter(obj => {
        return obj.on_going == 'midterm'
      })
      return midterm
    },
    getFinalScore(item) {
      let final = item.filter(obj => {
        return obj.on_going == 'final'
      })
      return final
    },
    clearForm(){
      this.filter.group_selected = []
      this.form.score_id = null
      this.form.score = 0
    }
  }
}
</script>

