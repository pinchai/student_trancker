<template>
  <div style="width: 99%">
    <!--modal-->
    <div v-if="modalShow">
      <modal
        :modalType="modalType"
        :formItem="formItem"
        @closeModal="closeModal"
      ></modal>
    </div>
    <!--end modal-->

    <!--import_modal-->
    <div v-if="modalImportShow">
      <import-modal
        :modalType="modalImportType"
        :formItem="formItem"
        @closeModal="closeImportModal"
      ></import-modal>
    </div>
    <!--end import_modal-->
    <b-card no-body class="card-table">
      <b-card-header>
        <h1>{{ $t("student") }}</h1>
        <b-row>
          <b-col cols="8">
            <b-button
              variant="outline-secondary"
              @click="fetchRecord"
              class="mb-2"
            >
              <i class="fa fa-sync"></i>
              {{ $t("refresh") }}
            </b-button>
            <b-button
              variant="outline-primary"
              @click="addRecord"
              v-if="checkAuthorize($store.state.permission.create)"
              class="mb-2"
            >
              <i class="fa fa-plus"></i>
              {{ $t("add") }}
            </b-button>
            <b-button
              variant="outline-primary"
              @click="importRecord"
              v-if="checkAuthorize($store.state.permission.create)"
              class="mb-2"
            >
              <i class="fa fa-plus"></i>
              {{ $t("import") }}
            </b-button>
            <b-button
              :disabled="showDelete"
              @click="editRecord"
              variant="outline-info"
              v-if="checkAuthorize($store.state.permission.update)"
              class="mb-2"
            >
              <i class="fa fa-edit"></i>
              {{ $t("edit") }}
            </b-button>
            <b-button
              :disabled="showDelete"
              @click="deleteItem"
              variant="outline-danger"
              v-if="checkAuthorize($store.state.permission.delete)"
              class="mb-2"
            >
              <i class="fa fa-trash"></i>
              {{ $t("delete") }}
            </b-button>
            <export-excel
              class="btn btn-outline-dark"
              style="cursor: pointer; margin-top: -8px"
              :data="export_excel"
              name="student_score.xls"
              :title="selectedGroup"
              :worksheet="selectedGroup"
            >
              Export Excel
            </export-excel>
            <a
              href="/view?group_name=st8.9"
              target="_blank"
            >
              <b-button
                style="margin-top: -8px"
                variant="outline-primary"
              >
                <i class="fa fa-trash"></i>
                Student View
              </b-button>
            </a>
          </b-col>
          <b-col cols="2">
            <b-input-group>
              <b-form-input
                id="filter-input"
                v-model="filter.txt_src"
                type="search"
                :placeholder="$t('search')"
              ></b-form-input>
            </b-input-group>
          </b-col>
          <b-col cols="2" md="2" lg="2" xl="1">
            <b-form-select
              v-model="pagination.table_size"
              @input="fetchRecord"
            >
              <b-form-select-option value="10">10</b-form-select-option>
              <b-form-select-option value="50">50</b-form-select-option>
              <b-form-select-option value="100">100</b-form-select-option>
              <b-form-select-option value="1000">1000</b-form-select-option>
            </b-form-select>
          </b-col>
        </b-row>
        <!--group list-->
        <b-row>
          <b-col cols="12">
            <b-form-group>
              <b-form-checkbox-group
                @input="fetchRecord"
                id="checkbox-group"
                v-model="filter.group_selected"
                :options="groups"
                name="group"
                value-field="id"
                text-field="name"
              ></b-form-checkbox-group>
            </b-form-group>
          </b-col>
        </b-row>
      </b-card-header>

      <b-card-body>
        <b-row>
          <b-col cols="12">
            <b-table
              selectable
              select-mode="single"
              selected-variant="primary"
              show-empty
              hover
              striped
              :filter="filter.txt_src"
              :fields="header"
              :items="items"
              @row-selected="rowItem"
              sticky-header='500px'
              small
            >
              <template #cell(image)="row">
                <img
                  style="width: 40px; height: 60px"
                  class="img-thumbnail rounded"
                  v-if="row.item.image == null"
                  src="/assets/img/no-image.png"
                >
                <div v-else>
                  <img
                    style="width: 40px; height: 50px"
                    class="rounded"
                    :id="row.item.image"
                    :src="'/images/student/thumbnail/' + row.item.image"
                    onerror="this.src='/image_error.png';"
                  >
                  <b-tooltip
                    :target="row.item.image"
                    placement="right"
                    variant="primary"
                  >
                    <img
                      class="img-thumbnail"
                      :src="'/images/student/' + row.item.image"
                      onerror="this.src='/image_error.png';"
                    >
                  </b-tooltip>
                </div>
              </template>
              <template v-slot:cell(no)="row">
                <strong>{{ row.index + 1 }}</strong>
              </template>
              <template v-slot:cell(name)="row">
                <span
                  :class="getAbsent(row.item.attendance).length >=6 ? 'text-danger bg-warning' : ''"
                >{{ row.item.name }}</span>
                <template v-if="getAbsent(row.item.attendance).length >=6">
                  <img src="/alert.gif" style="width: 20px; margin-top: -12px; margin-left: 1px">
                </template>
                <!-- {{ getAbsent(row.item.attendance).length >=6 ? '⚠️' : '' }}-->
              </template>
              <template v-slot:cell(attendance)="row">
                <span class="text-primary">
                  🟢Present: {{ getPreset(row.item.attendance).length }}ដង
                </span>
                <br>
                <span class="text-danger">
                  🔴Absent: {{ getAbsent(row.item.attendance).length }}ដង
                </span>
              </template>
              <template v-slot:cell(score)="row">
                <b-badge variant="primary" style="font-size: 12px">
                  MT: {{ (row.item.total_midterm) | currencyFormat }}
                </b-badge>
                <b-badge variant="secondary" style="font-size: 12px">
                  FT: {{ (row.item.total_final) | currencyFormat }}
                </b-badge>
                <b-badge variant="danger" style="font-size: 12px">
                  <span>
                    <template v-if="sumScore(row.item.score) < 50">
                      {{ $t('total_score') }}: {{ sumScore(row.item.score) | currencyFormat }}💸
                    </template>
                    <template v-else>
                      {{ $t('total') }}: {{ sumScore(row.item.score) }}😎
                    </template>
                  </span>
                </b-badge>
              </template>
              <template v-slot:cell(status)="row">
                <b-badge
                  pill
                  v-if="row.item.status == 0"
                  variant="danger"
                >
                  {{ $t("disabled") }}
                </b-badge>
                <b-badge
                  pill
                  v-if="row.item.status == 1"
                  variant="success"
                >
                  {{ $t("active") }}
                </b-badge>
              </template>
              <template v-slot:cell(created_at)="row">
                {{ row.item.created_at| dateTimeFormat("YYYY-MM-DD HH:mm:ss") }}
              </template>
              <template v-slot:cell(detail)="row">
                <a @click="row.toggleDetails">
                  <i
                    v-show="!row.detailsShowing"
                    class="fas fa-angle-double-down text-primary"
                    style="font-size: 20px"
                  ></i>
                  <i
                    v-show="row.detailsShowing"
                    class="fas fa-angle-double-up text-danger"
                    style="font-size: 20px"
                  ></i>
                </a>
              </template>
              <template #row-details="row">
                <div class="row">
                  <b-col cols="6">
                    <!--Present Details-->
                    <div class="col-lg-12 col-md-12 col-sm-6">
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
                                v-for="(item, index) in getPreset(row.item.attendance)"
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
                    </div>
                    <!--Absent Details-->
                    <div class="col-lg-12 col-md-12 col-sm-6">
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
                              </b-tr>
                            </b-thead>
                            <b-tbody>
                              <b-tr
                                v-for="(item, index) in getAbsent(row.item.attendance)"
                                :key="'student_'+index"
                              >
                                <b-td :class="item.checked == 0 ? 'bg-danger text-warning': ''">{{ index + 1 }}</b-td>
                                <b-td :class="item.checked == 0 ? 'bg-danger text-warning': ''">
                                  {{ item.classing_date | dateFormat }}
                                </b-td>
                                <b-td :class="item.checked == 0 ? 'bg-danger text-warning': ''">{{ item.remark }}</b-td>
                              </b-tr>
                            </b-tbody>
                          </b-table-simple>
                        </div>
                      </div>
                    </div>
                  </b-col>
                  <b-col cols="6">
                    <!--Score list-->
                    <div class="col-lg-12 col-md-12 col-sm-6">
                      <div class="card">
                        <div class="card-header">
                          <h3>Score list ✅</h3>
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
                                v-for="(item, index) in row.item.score"
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
                  </b-col>
                </div>
              </template>
            </b-table>
          </b-col>
        </b-row>
      </b-card-body>
      <b-card-footer>
        <b-col cols="12">
          <b-pagination
            v-model="pagination.current_page"
            :total-rows="pagination.total"
            :per-page="pagination.table_size"
            @input="fetchRecord"
          ></b-pagination>
        </b-col>
      </b-card-footer>
    </b-card>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import TextEditor from "../../../components/sharing/TextEditor";
import group from "../../../store/group";

export default {
  moduleKey: "student",
  data() {
    return {
      items: [],
      export_excel: [],
      selectedItem: {},
      showDelete: true,
      showOverlay: false,
      modalShow: false,
      modalType: 0,
      modalImportShow: false,
      modalImportType: 0,
      formItem: {},
      pagination: {
        current_page: 1,
        per_page: 100,
        total: 0,
        to: 0,
        from: 0,
        last_page: 0,
        table_size: 100
      },
      filter: {
        warehouses: {},
        txt_src: null,
        group_selected: []
      },
    };
  },
  components: {
    TextEditor,
    Modal: () => import("./components/Modal"),
    ImportModal: () => import("./components/ImportModal"),
  },
  created() {
    this.fetchRecord();
  },
  computed: {
    ...mapGetters({
      groups: "getGroup",
    }),
    header() {
      let data = [
        // {
        //   key: "image",
        //   label: this.$t("image"),
        //   sortable: false,
        //   show_sm: true
        // },
        {
          key: "no",
          label: this.$t("no"),
          sortable: false,
          show_sm: true,
          thStyle: {width: "3%"},
        },
        {
          key: "name",
          label: this.$t("name"),
          sortable: true,
          show_sm: true,
          thStyle: {width: "18%"},
        },
        {
          key: "latin_name",
          label: this.$t("latin_name"),
          sortable: true,
          show_sm: true,
          thStyle: {width: "10%"},
        },
        {
          key: "attendance",
          label: this.$t("attendance"),
          sortable: true,
          show_sm: true,
          thStyle: {width: "30%"},
        },
        {
          key: "score",
          label: this.$t("score"),
          sortable: true,
          show_sm: true,
          thStyle: {width: "40%"},
        },
        // {
        //   key: "gender",
        //   label: this.$t("gender"),
        //   sortable: true,
        //   show_sm: true
        // },
        {
          key: "group",
          label: this.$t("group"),
          sortable: true,
          show_sm: true,
          thStyle: {width: "8%"},
        },
        // {
        //   key: "status",
        //   label: this.$t("status"),
        //   sortable: true,
        //   show_sm: true
        // },
        {
          key: "created_at",
          label: this.$t("created_at"),
          sortable: true,
          show_sm: true,
          thStyle: {width: "8%"},
        },
        {
          key: 'detail',
          label: this.$t('detail'),
          sortable: true,
          show_sm: true,
        },
      ];
      data = data.filter(obj => {
        return obj.show_sm == true
      })
      return data;
    },
    selectedGroup() {
      if (this.filter.group_selected.length > 0) {
        let current_group = this.groups.find(item => {
          return item.id == this.filter.group_selected[0]
        })
        return current_group.name
      }

    }
  },
  methods: {
    addRecord() {
      this.modalShow = true;
      this.modalType = 1; //set modal type 1 = save
    },
    importRecord() {
      this.modalImportShow = true;
      this.modalImportType = 1; //set modal type 1 = save
    },
    editRecord() {
      this.modalShow = true;
      this.selectedItem.old_logo = this.selectedItem.logo;
      this.formItem = Object.assign({}, this.selectedItem);
      this.modalType = 2; //set modal type 2 = edit
    },
    fetchRecord() {
      let vm = this;
      const input = this.getInput();
      this.export_excel = []
      axios
        .post("/student/get", input)
        .then(function (response) {
          response.data.data.forEach((item, index) => {
            //score
            let total_score = 0
            item.score.forEach(obj => {
              total_score += parseFloat(obj.score)
            })
            vm.export_excel.push({
              no: index + 1,
              name: item.name,
              latin_name: item.latin_name,
              total_midterm: item.total_midterm,
              total_final: item.total_final,
              total_score: total_score,
            })
          })
          vm.setInput(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteItem() {
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
            .post("/student/delete", {id: this.selectedItem.id})
            .then(function (response) {
              if (response.status == 200) {
                vm.fetchRecord();
                vm.$notify({
                  group: "message",
                  type: "success",
                  title: vm.$t("branch"),
                  text: vm.$t("done")
                });
                s
              }
            });
        }
      });
    },
    rowItem(event) {
      if (event.length > 0) {
        this.selectedItem = event[0];
        this.showDelete = false;
        console.log(this.selectedItem.id);
      } else {
        this.showDelete = true;
        this.selectedItem = {};
      }
    },
    closeModal(obj) {
      this.modalType = 0;
      this.modalShow = false;

      if (!this.$helpers.isEmpty(obj)) {
        this.fetchRecord();
      }
    },
    closeImportModal(obj) {
      this.modalImportType = 0;
      this.modalImportShow = false;

      if (!this.$helpers.isEmpty(obj)) {
        this.fetchRecord();
      }
    },
    getInput() {
      return {
        page: this.pagination.current_page,
        table_size: this.pagination.table_size,
        filter: this.filter,
      };
    },
    setInput(data) {
      this.items = data.data;
      this.pagination.total = data.pagination.total;
      this.pagination.from = data.pagination.from;
      this.pagination.to = data.pagination.to;
    },
    getPreset(item) {
      let preset = item.filter(obj => {
        return obj.checked == 1
      })
      return preset
    },
    getAbsent(item) {
      let preset = item.filter(obj => {
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
    }
  }
};
</script>
<style scoped></style>
