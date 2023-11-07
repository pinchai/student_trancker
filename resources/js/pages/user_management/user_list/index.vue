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
        <h1>{{ $t("user_list") }}</h1>
        <b-row>
          <b-col cols="6">
            <b-button
              variant="outline-secondary"
              @click="fetchRecord"
            >
              <i class="fa fa-sync"></i>
              {{ $t("refresh") }}
            </b-button>
            <b-button
              variant="outline-primary"
              @click="addRecord"
              v-if="checkAuthorize($store.state.permission.create)"
            >
              <i class="fa fa-plus"></i>
              {{ $t("add") }}
            </b-button>
            <b-button
              :disabled="showDelete"
              @click="editRecord"
              variant="outline-info"
              v-if="checkAuthorize($store.state.permission.update)"
            >
              <i class="fa fa-edit"></i>
              {{ $t("edit") }}
            </b-button>
            <b-button
              :disabled="showDelete"
              @click="deleteItem"
              variant="outline-danger"
              v-if="checkAuthorize($store.state.permission.delete)"
            >
              <i class="fa fa-trash"></i>
              {{ $t("delete_record") }}
            </b-button>
          </b-col>
          <b-col cols="5">
            <b-input-group>
              <b-form-input
                id="filter-input"
                v-model="filter.txt_src"
                type="search"
                :placeholder="$t('search')"
              ></b-form-input>
            </b-input-group>
          </b-col>
          <b-col cols="1">
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
              <template v-slot:cell(image)="row">
                <img
                  style="width: 50px; height: 50px"
                  class="img-thumbnail rounded"
                  v-if="row.item.image == null"
                  src="/assets/img/no-image.png"
                  onerror="this.src='/image_error.png';"
                />
                <div v-else>
                  <img
                    style="width: 40px; height: 40px"
                    class="img-thumbnail rounded"
                    :id="row.item.image"
                    :src="'/images/user/thumbnail/' +row.item.image"
                    onerror="this.src='/image_error.png';"
                  />
                  <b-tooltip
                    :target="row.item.image"
                    placement="right"
                    variant="primary"
                  >
                    <img
                      class="img-thumbnail"
                      :src="'/images/user/' + row.item.image"
                      onerror="this.src='/image_error.png';"
                    />
                  </b-tooltip>
                </div>
              </template>
              <template v-slot:cell(created_at)="row">
                {{ row.item.created_at | dateTimeFormat("YYYY-MM-DD HH:mm:ss") }}
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

export default {
  moduleKey: "user_list",
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
        per_page: this.$store.getters.getTableSize,
        total: 0,
        to: 0,
        from: 0,
        last_page: 0,
        table_size: this.$store.getters.getTableSize
      },
      filter: {
        warehouses: {},
        txt_src: null
      }
    };
  },
  components: {
    Modal: () => import("./components/Modal")
  },
  created() {
    this.fetchRecord();
  },
  computed: {
    ...mapGetters({
      default_currency: 'getDefaultCurrency',
    }),
    header() {
      return [
        {
          key: "image",
          label: this.$t("image"),
          sortable: true
        },
        {
          key: "name",
          label: this.$t("name"),
          sortable: true
        },
        {
          key: "email",
          label: this.$t("email"),
          sortable: true
        },
        {
          key: "branch_name",
          label: this.$t("branch"),
          sortable: true
        },
        {
          key: "role_name",
          label: this.$t("role"),
          sortable: true
        },
        {
          key: "created_at",
          label: this.$t("created_at"),
          sortable: true
        }
      ];
    }
  },
  methods: {
    addRecord() {
      this.modalShow = true;
      this.modalType = 1; //set modal type 1 = save
    },
    editRecord() {
      this.modalShow = true;
      this.formItem = Object.assign({}, this.selectedItem);
      this.modalType = 2; //set modal type 2 = edit
    },
    fetchRecord() {
      let vm = this;
      this.showOverlay = !this.showOverlay;
      const input = this.getInput();

      axios
        .post("/user/get", input)
        .then(function (response) {
          vm.showOverlay = !vm.showOverlay;
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
            .post("/user/delete", {id: this.selectedItem.id})
            .then(function (response) {
              vm.fetchRecord();
              //New
              vm.$notify({
                group: "message",
                type: "success",
                title: vm.$t("user_list"),
                text: vm.$t("done")
              });
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
        filter: this.filter
      };
    },
    setInput(data) {
      this.items = data.data;
      this.pagination.total = data.total;
      this.pagination.from = data.from;
      this.pagination.to = data.to;
    },
    sendTest(bot_toked, chat_id) {
      let vm = this;
      let input = {
        'bot_toked': bot_toked,
        'chat_id': chat_id,
      }
      axios.post('/telegram_bot/sendTest', input).then(function (response) {
        if (response.status === 200) {
          vm.$notify({
            group: 'message',
            type: 'success',
            title: vm.$t('telegram_bot'),
            text: vm.$t('done')
          });
        }
      }).catch(function (error) {
        console.log(error)
      });
    },
  }
};
</script>
<style scoped></style>
