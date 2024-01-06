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

    <!--modal qrcode-->
    <div v-if="modalShowQr">
      <modal-qr
        :modalType="modalTypeQr"
        :formItem="formItem"
        @closeModal="closeModalQr"
      ></modal-qr>
    </div>

    <!--modal_clone-->
    <div v-if="modalCloneShow">
      <modal-clone
        :modalType="modalCloneType"
        :formItem="formItem"
        @closeModal="closeCloneModal"
      ></modal-clone>
    </div>

    <!--list-->
    <b-card
      no-body
      class="card-table"
    >
      <b-card-header>
        <h1>{{ $t('product') }}</h1>
        <b-row>
          <b-col lg="6" md="12" sm="12">
            <!--refresh-->
            <b-button
              variant="outline-secondary"
              @click="fetchRecord"
            >
              <i class="fa fa-sync"></i>
              {{ $t('refresh') }}
            </b-button>
            <!--add-->
            <b-button
              variant="outline-primary"
              @click="addRecord"
              v-if="checkAuthorize($store.state.permission.create)"
            >
              <i class="fa fa-plus"></i>
              {{ $t('add') }}
            </b-button>
            <!--clone-->
            <b-button
              :disabled="showDelete"
              @click="cloneRecord"
              variant="outline-primary"
              v-if="checkAuthorize($store.state.permission.update) && false"
            >
              <i class="fa fa-copy"></i>
              {{ $t('clone') }}
            </b-button>
            <!--edit-->
            <b-button
              :disabled="showDelete"
              @click="editRecord"
              variant="outline-info"
              v-if="checkAuthorize($store.state.permission.update)"
            >
              <i class="fa fa-edit"></i>
              {{ $t('edit') }}
            </b-button>
            <!--delete-->
            <b-button
              :disabled="showDelete"
              @click="deleteItem"
              variant="outline-danger"
              v-if="checkAuthorize($store.state.permission.delete)"
            >
              <i class="fa fa-trash"></i>
              {{ $t('delete_record') }}
            </b-button>
          </b-col>
          <b-col lg="5" md="12" sm="12">
            <b-input-group>
              <b-form-input
                id="filter-input"
                type="search"
                v-model="filter.txt_src"
                :placeholder="$t('search')"
                @keydown.enter.prevent="fetchRecord"
              ></b-form-input>
            </b-input-group>
          </b-col>
          <b-col lg="1" md="12" sm="12">
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
              :fields="header"
              :items="items"
              @row-selected="rowItem"
              sticky-header='500px'
              small
            >
              <template #cell(image)="row">
                <img
                  style="width: 50px; height: 50px"
                  class="img-thumbnail rounded"
                  v-if="row.item.image == null"
                  src="/assets/img/no-image.png"
                >
                <div v-else>
                  <img
                    style="width: 40px; height: 40px"
                    class="img-thumbnail rounded"
                    :id="row.item.image"
                    :src="'/images/product/thumbnail/' + row.item.image"
                    onerror="this.src='/image_error.png';"
                  >
                  <b-tooltip
                    :target="row.item.image"
                    placement="right"
                    variant="primary"
                  >
                    <img
                      class="img-thumbnail"
                      :src="'/images/product/' + row.item.image"
                      onerror="this.src='/image_error.png';"
                    >
                  </b-tooltip>
                </div>
              </template>
              <template #cell(sku)="row">
                {{ row.item.sku }}
              </template>
              <template #cell(price)="row">
                {{ row.item.price | currencyFormat }}
                {{ getCurrencyDetail(row.item.price_currency_id).symbol }}
              </template>
              <template #cell(discount)="row">
                {{ row.item.discount | currencyFormat }} %
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
import {mapGetters} from 'vuex'

export default {
  moduleKey: 'product',
  data() {
    return {
      items: [],
      selectedItem: {},
      showDelete: true,
      showOverlay: false,
      modalShow: false,
      modalType: 0,

      modalShowQr: false,
      modalTypeQr: 0,

      modalCloneShow: false,
      modalCloneType: 0,
      modalEditUnitVariationType: 0,
      formItem: {},
      UnitVariationFormItem: {},
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
      },
    }
  },
  components: {
    Modal: () => import('./components/Modal'),
    ModalQr: () => import('./components/QrAndBarCodeModal'),
    ModalClone: () => import('./components/CloneModal'),
  },
  created() {
    this.fetchRecord();
  },
  computed: {
    ...mapGetters({
      currencies: 'getCurrency',
      categories: 'getProductCategory',
      brand: 'getBrand',
      unit: 'getUnit',
      variation: 'getVariation',
      tag: 'getTag',
      vendor: 'getVendor',
    }),
    header() {
      return [
        {
          key: 'image',
          label: this.$t('image'),
          sortable: false,
        },
        {
          key: 'sku',
          label: this.$t('sku'),
          sortable: true,
        },
        {
          key: 'name',
          label: this.$t('name'),
          sortable: true,
        },
        {
          key: 'category',
          label: this.$t('category'),
          sortable: true,
        },
        {
          key: 'price',
          label: this.$t('price'),
          sortable: true,
        },
        {
          key: 'discount',
          label: this.$t('discount'),
          sortable: true,
        },
      ]
    },
  },
  methods: {
    addRecord() {
      this.modalShow = true
      this.modalType = 1 //set modal type 1 = save
    },
    editRecord() {
      this.modalShow = true;
      this.selectedItem.action = 'edit';
      this.formItem = Object.assign({}, this.selectedItem);
      this.modalType = 2 //set modal type 2 = edit
    },
    cloneRecord() {
      this.modalCloneShow = true;
      this.selectedItem.action = 'clone';
      this.formItem = Object.assign({}, this.selectedItem);
      this.modalCloneType = 2 //set modal type 2 = edit
    },
    fetchRecord() {
      let vm = this;
      this.showOverlay = !this.showOverlay;
      const input = this.getInput();

      axios.post('/product/get', input).then(function (response) {
        vm.showOverlay = !vm.showOverlay;
        vm.setInput(response.data.data);

      }).catch(function (error) {
        console.log(error)
      });
    },
    deleteItem() {
      this.$fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.value) {
          let vm = this;
          axios.post('/product/delete', {id: this.selectedItem.id,}).then(function (response) {
            vm.$store.dispatch("setProducts", response.data.product);
            vm.fetchRecord();
            vm.$notify({
              group: 'message',
              type: 'success',
              title: vm.$t('product'),
              text: vm.$t('done')
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
      this.modalShow = false
      if (!this.$helpers.isEmpty(obj)) {
        this.fetchRecord();
      }
    },
    openQrModal(item) {
      this.formItem = item
      this.modalShowQr = true
      this.modalTypeQr = 1
    },
    closeModalQr(obj) {
      this.modalTypeQr = 0;
      this.modalShowQr = false
    },
    closeCloneModal(obj) {
      this.modalCloneType = 0;
      this.modalCloneShow = false
      if (!this.$helpers.isEmpty(obj)) {
        this.fetchRecord();
      }
    },
    getInput() {
      return {
        page: this.pagination.current_page,
        table_size: this.pagination.table_size,
        filter: this.filter
      }
    },
    setInput(data) {
      this.items = data.data
      this.pagination.total = data.pagination.total
      this.pagination.from = data.pagination.from
      this.pagination.to = data.pagination.to
    },
  }
}
</script>
