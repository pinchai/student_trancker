<template>
  <div>
    <!-- Start modal Component -->
    <div v-if="modalShow">
      <modal
        :form-item="rowItem"
        :modal-type="modalType"
        @closeModal="closeModal"
      />
    </div>
    <!-- End modal Component -->

    <!-- Page Heading -->
    <div class="page-header-nav">
      <b-row class="mt-2">
        <b-col cols="12" xl="6">
          <div class="page-title">
            <div>{{ $t('branch') }}</div>
          </div>
        </b-col>

        <b-col cols="12" xl="6" class="text-right">
          <b-button variant="primary" @click="get">
            <b-icon icon="arrow-repeat"></b-icon>
            {{ $t('refresh') }}
          </b-button
          >
          <auth-button
            :action="$store.state.permission.create"
            variant="primary"
            icon="plus"
            @click="openAddModal"
          >{{ $t('add') }}
          </auth-button
          >
          <b-dropdown :text="$t('action')" right variant="primary">
            <b-dropdown-item
              v-if="$store.state.permission.update"
              :disabled="$helpers.isEmpty(selectedItem)"
              @click="edit"
            >
              <b-icon icon="pen"></b-icon>
              <span class="ml-3">{{ $t('edit') }}</span>
            </b-dropdown-item>
            <b-dropdown-item
              v-if="$store.state.permission.delete"
              :disabled="$helpers.isEmpty(selectedItem)"
              @click="deleteItem"
            >
              <div class="text-danger">
                <b-icon icon="trash"></b-icon>
                <span class="ml-3">{{ $t('delete') }}</span>
              </div>
            </b-dropdown-item>
          </b-dropdown>
        </b-col>
      </b-row>
      <div class="mb-2 mt-2">
        <b-button
          variant="empty"
          class="pt-0 pl-0 d-inline-block d-md-none"
          v-b-toggle.displayOptions
        >
          {{ $t('display_options') }}
          <b-icon icon="chevron-down"/>
        </b-button>
        <b-collapse id="displayOptions" class="d-md-block">
          <b-row class="mt-4">
            <b-col col cols="12" xl="6">
              <div
                class="search-sm d-inline-block float-md-left mr-1 align-top"
              >
                <b-input
                  v-model="filter"
                  :placeholder="$t('search')"
                  @keydown.enter="get"
                />
              </div>
            </b-col>
            <b-col sm="12" xl="6" class="text-right">
                            <span class="text-muted text-small mr-1 mb-2">
                                {{ pagination.from }} - {{ pagination.to }}
                                {{ this.$t('of') }} {{ pagination.total }}
                            </span>
              <b-dropdown
                right
                :text="`${pagination.table_size}`"
                variant="outline-dark"
                class="d-inline-block"
                size="xs"
              >
                <b-dropdown-item
                  v-for="(size, index) in pageOptions"
                  :key="index"
                  @click="
                                        pagination.table_size = size
                                        get()
                                    "
                >{{ size }}
                </b-dropdown-item
                >
              </b-dropdown>
            </b-col>
          </b-row>
        </b-collapse>
      </div>
      <div class="separator mb-4"></div>
    </div>
    <b-card class="shadow mb-4">
      <b-table
        selectable
        select-mode="single"
        selected-variant="primary"
        class=""
        show-empty
        hover
        :items="items"
        :fields="header"
        :current-page="pagination.current_page"
        :per-page="pagination.perPage"
        :filter="filter"
        responsive
        @row-selected="rowSelected"
        sticky-header='500px'
        small
      >
        <template v-slot:table-busy>
          <div class="text-center text-primary my-2">
            <b-spinner
              variant="primary"
              class="align-middle"
            ></b-spinner>
          </div>
        </template>
        <template v-slot:cell(branch_name)="row">{{
            row.item.branch_name | getNameByLocal
          }}
        </template>
        <template v-slot:cell(company_name)="row">{{
            row.item.company_name | getNameByLocal
          }}
        </template>
        <template v-slot:cell(phone)="row">
          {{ row.item.phone | phoneFormat }}
        </template>
        <template v-slot:cell(alt_phone)="row">{{
            row.item.alt_phone | phoneFormat
          }}
        </template>
      </b-table>
      <b-row>
        <b-col cols="12">
          <b-pagination
            align="center"
            v-model="pagination.current_page"
            :total-rows="pagination.total"
            :per-page="pagination.table_size"
            @input="get"
          >
            <template #next-text>
              <b-icon icon="chevron-right"/>
            </template>
            <template #prev-text>
              <b-icon icon="chevron-left"/>
            </template>
            <template #first-text>
              <b-icon icon="chevron-bar-left"/>
            </template>
            <template #last-text>
              <b-icon icon="chevron-bar-right"/>
            </template>
          </b-pagination>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>
<script>
import swal from 'sweetalert2'

export default {
  layout: 'app',
  middleware: 'acl',
  moduleKey: 'branch',
  head() {
    return {
      title: this.$t('branch'),
    }
  },
  components: {
    Modal: () => import('./components/Modal'),
  },
  data() {
    return {
      header: [
        {
          key: 'code',
          label: this.$t('code'),
          sortable: true,
        },
        {
          key: 'branch_name',
          label: this.$t('name'),
          sortable: true,
        },
        {
          key: 'company_name',
          label: this.$t('company_name'),
          sortable: true,
        },
        {
          key: 'phone',
          label: this.$t('phone'),
          sortable: true,
        },
        {
          key: 'alt_phone',
          label: this.$t('alt_phone'),
          sortable: true,
        },
        {
          key: 'email',
          label: this.$t('email'),
          sortable: true,
        },
        {
          key: 'created_at',
          label: this.$t('created_at'),
          sortable: true,
        },
        {
          key: 'status',
          label: this.$t('status'),
          sortable: true,
        },
      ],
      items: [],
      pagination: {
        current_page: 1,
        per_page: 10,
        total: 0,
        to: 0,
        from: 0,
        last_page: 0,
        table_size: 10
      },
      pageOptions: [10, 20, 50, 100],
      modalType: 0,
      filter: null,
      modalShow: false,
      isLoad: true,
      rowItem: {},
      apiUrl: process.env.API_URL,
      selectedItem: {},
    }
  },
  created() {
    this.get()
  },
  methods: {
    get() {
      let vm = this
      const input = {
        page: this.pagination.current_page,
        table_size: this.pagination.table_size,
      }
      this.$axios.$post('branch/get', input).then((response) => {
        if (response.data) {
          vm.items = response.data
          vm.pagination.total = response.pagination.total
          vm.pagination.from = response.pagination.from
          vm.pagination.to = response.pagination.to
        }
      })
    },
    openAddModal() {
      this.modalShow = true
      this.modalType = 1
    },
    /**
     * open modal for edting branch
     */
    edit() {
      this.modalShow = true
      this.rowItem = Object.assign({}, this.selectedItem)
      this.modalType = 2
    },
    /**
     * delete selected branch
     */
    deleteItem(item, index) {
      let vm = this
      swal.fire({
        title: vm.$t('are_you_sure'),
        text: vm.$t('cannot_revert_this'),
        type: 'question',
        showCancelButton: true,
        confirmButtonText: vm.$t('ok'),
        cancelButtonText: vm.$t('cancel'),
        reverseButtons: true,
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return new Promise((resolve) => {
            let input = {
              data: {
                id: vm.selectedItem.id,
              },
            }
            vm.$axios
              .$post('branch/delete', input)
              .then(function (response) {
                vm.$notify(
                  'success',
                  vm.$t('branch'),
                  vm.$t('done'),
                );

                vm.$store.dispatch(
                  'branch/setBranch',
                  response.branches
                )
                vm.get()
              })
              .catch(function (error) {
                vm.$notify(
                  'error',
                  vm.$t('branch'),
                  error.response.data.message,
                );
              })
          })
        },
        allowOutsideClick: () => !swal.isLoading(),
      })
    },
    /**
     * Update branch status
     */
    updateStatus(id, status) {
      let vm = this
      let input = {
        data: {
          id: id,
          status: status,
        },
      }
      vm.$axios
        .$post('branch/update_status', input)
        .then(function (response) {
          vm.$store.dispatch('branch/setBranch', response.branches)
          vm.get()
        })
        .catch((error) => {
        })
    },
    /** Row selected */
    rowSelected(items) {
      if (items.length > 0) {
        this.selectedItem = items[0]
      } else {
        this.selectedItem = {}
      }
    },
    /**
     *
     */
    closeModal(value) {
      if (value) {
        this.get()
      }
      this.modalType = 0;
      this.rowItem = {}
    },
  },
}
</script>
