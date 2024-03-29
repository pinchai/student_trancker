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

    <b-card no-body class="card-table">
      <b-card-header>
        <h1>{{ $t("subject") }}</h1>
        <b-row>
          <b-col cols="12" xl="6">
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
          </b-col>
          <b-col cols="6" md="5" lg="5" xl="5" class="mb-2">
            <b-input-group>
              <b-form-input
                id="filter-input"
                v-model="filter.txt_src"
                type="search"
                :placeholder="$t('search')"
              ></b-form-input>
            </b-input-group>
          </b-col>
          <b-col cols="3" md="2" lg="2" xl="1">
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
              <template v-slot:cell(group)="row">
                <strong style="font-size: 20px">
                  {{ row.item.group }}
                </strong>
              </template>
              <template v-slot:cell(start_date)="row">
                <strong style="font-size: 20px">
                  {{ row.item.start_date | dateFormat }}
                </strong>
              </template>
              <template v-slot:cell(end_date)="row">
                <strong style="font-size: 20px">
                  {{ row.item.end_date | dateFormat }}
                </strong>
              </template>
              <template v-slot:cell(total_score)="row">
                <strong style="font-size: 20px; color: red">
                  {{ row.item.total_score }}
                </strong>
              </template>
              <template v-slot:cell(score_type)="row">
                <strong style="font-size: 18px">
                  {{ row.item.score_type }}<br>
                </strong>
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
                <b-table-simple small hover>
                  <b-thead>
                    <b-tr>
                      <b-th>No.</b-th>
                      <b-th>Name</b-th>
                      <b-th>Latin Name</b-th>
                      <b-th>Score</b-th>
                    </b-tr>
                  </b-thead>
                  <b-tbody>
                    <b-tr
                      v-for="(item, index) in row.item.student_score"
                      :key="'student_'+index"
                    >
                      <b-td :class="item.score <= 0 ? 'bg-warning': ''">{{ index + 1 }}</b-td>
                      <b-td :class="item.score <= 0 ? 'bg-warning': ''">{{ item.name }}</b-td>
                      <b-td>{{ item.latin_name }}</b-td>
                      <b-td>
                        <span style="color: red; font-size: 18px; font-weight: bolder">{{ item.score }}</span>
                      </b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
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
import moment from "moment";

export default {
  moduleKey: "subject",
  data() {
    return {
      items: [],
      selectedItem: {},
      showDelete: true,
      showOverlay: false,
      modalShow: false,
      modalType: 0,
      formItem: {},
      pagination: {
        current_page: 1,
        per_page: 10,
        total: 0,
        to: 0,
        from: 0,
        last_page: 0,
        table_size: 10
      },
      filter: {
        warehouses: {},
        txt_src: null,
        group_selected: []
      },
    };
  },
  components: {
    Modal: () => import("./components/Modal"),
    ScoreModal: () => import("./components/ScoreModal"),
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
        {
          key: "group",
          label: this.$t("group"),
          sortable: true,
          show_sm: true,
          thStyle: {width: "8%"},
        },
        {
          key: "start_date",
          label: this.$t("start_date"),
          sortable: true,
          show_sm: true,
          thStyle: {width: "10%"},
        },
        {
          key: "end_date",
          label: this.$t("end_date"),
          sortable: true,
          show_sm: true,
          thStyle: {width: "10%"},
        },
        {
          key: "score_type",
          label: this.$t("score_type"),
          sortable: true,
          show_sm: true,
          thStyle: {width: "8%"},
        },
        {
          key: "total_score",
          label: this.$t("total_score"),
          sortable: true,
          show_sm: true,
          thStyle: {width: "8%"},
        },
        {
          key: "remark",
          label: this.$t("remark"),
          sortable: true,
          show_sm: true,
          thStyle: {width: "8%"},
        },
        {
          key: 'detail',
          label: this.$t('detail'),
          sortable: true,
          show_sm: true,
          thStyle: {width: "10%"},
        },
      ];
      data = data.filter(obj => {
        return obj.show_sm == true
      })
      return data;
    }
  },
  methods: {
    addRecord() {
      this.modalShow = true;
      this.modalType = 1; //set modal type 1 = save
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
      axios
        .post("/subject/get", input)
        .then(function (response) {
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
            .post("/subject/delete", {id: this.selectedItem.id})
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
    getPreset(item){
      let preset = item.filter(obj=>{
        return obj.checked == 1
      })
      return preset
    },
    getAbsent(item){
      let preset = item.filter(obj=>{
        return obj.checked == 0
      })
      return preset
    }
  }
};
</script>
<style scoped></style>
