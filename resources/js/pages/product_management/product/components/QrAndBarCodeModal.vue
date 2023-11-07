<template>
  <b-modal
    id="modal"
    v-model="modal"
    no-close-on-backdrop
    no-close-on-esc
    hide-header-close
    size="lg"
    scrollable
    content-class="custom-modal"
  >
    <template slot="modal-header">
      <h5><i class="fas fa-qrcode"></i> Qrcode and Barcode</h5>
    </template>

    <!-- Content -->
    <div class="d-block">
      <b-row>
        <!--config block-->
        <b-col cols="8">
          <b-card>
            <b-card-body>
              <b-row>
                <!--show name -->
                <b-col cols="4">
                  <b-form-group
                    label="show Name"
                    label-class='control-label'
                    label-for='tag'
                  >
                    <b-form-checkbox
                      v-model='form.show_name'
                    >
                    </b-form-checkbox>
                  </b-form-group>
                </b-col>
                <!--show price -->
                <b-col cols="4">
                  <b-form-group
                    label="show price"
                    label-class='control-label'
                    label-for='tag'
                  >
                    <b-form-checkbox
                      v-model='form.show_price'
                    >
                    </b-form-checkbox>
                  </b-form-group>
                </b-col>
                <!--show value -->
                <b-col cols="4">
                  <b-form-group
                    label="show value"
                    label-class='control-label'
                    label-for='tag'
                  >
                    <b-form-checkbox
                      v-model='form.show_value'
                    >
                    </b-form-checkbox>
                  </b-form-group>
                </b-col>
                <!--width as mm-->
                <b-col cols="6">
                  <b-form-group
                    :label="$t('width')"
                    label-for="code"
                    label-class="control-label"
                  >
                    <b-form-input
                      v-model="form.width"
                      type="number"
                      :placeholder="$t('width')"
                    />
                  </b-form-group>
                </b-col>
                <!--height as mm-->
                <b-col cols="6">
                  <b-form-group
                    :label="$t('height')"
                    label-for="code"
                    label-class="control-label"
                  >
                    <b-form-input
                      v-model="form.height"
                      type="number"
                      :placeholder="$t('height')"
                    />
                  </b-form-group>
                </b-col>

                <!--layout preview-->
                <b-col cols="12">
                  <div
                    style="text-align: center; border: 1px solid red;"
                    :style="`width: ${form.width}mm; height: ${form.height}mm;`"
                  >
                    <!--name-->
                    <label v-if="form.show_name" style="margin-top: 2mm; font-size: 9px;">សាប៊ូតាបុយទឹកចុច+កញ្ចប់</label>
                    <!--price-->
                    <label v-if="form.show_price" style="margin-top: -20px; font-size: 9px;">12.00$</label>
                    <!--image here-->
                    <img
                      src="/barcode.png"
                      alt="barcode.png"
                      style='width: 45mm; height: 10mm; margin-top: 0'
                    />
                    <!--value-->
                    <p v-if="form.show_value" style="font-size: 9px;">855285242730</p>
                  </div>
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>
        </b-col>

        <!--barcode and qrcode-->
        <b-col cols="4">
          <b-row>
            <!--barcode-->
            <b-col cols="12">
              <template
                v-if="formItem.sku != null"
              >
                <barcode
                  :id="'barcode_'+formItem.sku"
                  style="width: 100%"
                  tag="img"
                  :value="formItem.sku"
                  :options="{
                    displayValue: true,
                    marginLeft: 0,
                    marginTop: 10,
                    format: 'CODE39'
                  }"
                ></barcode>
              </template>
              <b-button
                squared variant="outline-secondary"
                size="sm"
                @click="downloadBarcode('barcode_'+formItem.sku, formItem.name)"
                style="float: left"
              >
                download <i class="fas fa-download"></i>
              </b-button>
              <b-button
                squared variant="outline-secondary"
                size="sm"
                @click="onPrintLabel(formItem.id, 'barcode')"
                style="float: right"
              >
                {{ $t('print') }} <i class="fas fa-print"></i>
              </b-button>
            </b-col>
            <b-col cols=""><hr></b-col>
            <!--qrcode-->
            <b-col cols="12">
              <template
                v-if="formItem.sku != null"
              >
                <qrcode
                  style="width: 100%"
                  :id="'qr_'+formItem.sku"
                  :value="formItem.sku"
                  :text="formItem.sku"
                  :options="{ width: 500 }"
                  tag="img"
                ></qrcode>
              </template>
              <b-button
                squared variant="outline-secondary"
                size="sm"
                @click="downloadBarcode('qr_'+formItem.sku, formItem.name)"
                style="float: left"
              >
                download <i class="fas fa-download"></i>
              </b-button>
              <b-button
                squared variant="outline-secondary"
                size="sm"
                @click="onPrintLabel(formItem.id, 'qrcode')"
                style="float: right"
              >
                {{ $t('print') }} <i class="fas fa-print"></i>
              </b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>

    <!--footer-->
    <template slot="modal-footer">
      <b-button
        variant="outline-danger"
        @click="clearForm(null)"
        class="float-right"
      >
        <i class="fas fa-times-circle mr-1"></i>
        {{ $t("close") }}</b-button
      >
      <b-button
        v-if="false"
        type="submit"
        variant="outline-primary"
        class="float-right ml-2"
        @click.prevent="onSubmit"
      >
        <i class="fas fa-save mr-1"></i>
        {{ $t("save") }}</b-button
      >
    </template>
  </b-modal>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    formItem: {
      type: Object,
      default: () => {
        return {};
      },
    },
    modalType: {
      type: Number,
      default: 0,
    },
  },
  components: {
  },
  data() {
    return {
      modal: true,
      form: {
        id: null,
        width: 50,
        height: 25,
        show_name: true,
        show_price: true,
        show_value: true,
        value: 12313123123,
      },
      selected_product: [],
      listItems: {},
    };
  },
  computed: {
    ...mapGetters({
      currencies: "getCurrency",
    }),
  },
  watch: {
    modalType: {
      handler(val) {
        if (val == 1) {
          this.modal = true;
        } else if (val == 2) {
          this.modal = true;
          this.setData();
        }
      },
      immediate: true,
    },
  },
  methods: {
    onSubmit() {
      this.$validator.validateAll().then((result) => {
        let vm = this;
        if (result) {
          vm.clearForm(null);
        } else {
          vm.$notify({
            group: "message",
            type: "warning",
            title: vm.$t("product"),
            text: vm.$t("validation_failed"),
          });
        }
      });
    },
    onPrintLabel(id, type) {
      let vm = this
      axios({
        url: "/product/printLabel",
        data: {
          id: id,
          type: type,
          count: 1
        },
        method: "POST",
        responseType: "blob"
      })
        .then(response => {
          //open new tab
          var fileURL = URL.createObjectURL(response.data);
          window.open(fileURL);
        })
        .catch(error => {
          console.log(error);
        });
    },
    clearForm(obj) {
      this.$nextTick(() => {
        this.$validator.reset();
      });

      this.$emit("closeModal", obj);
      this.modal = false;
      this.listItems = {};
    },
    setData() {
      this.form.id = this.formItem.id;
    },
    downloadBarcode(id, product_name) {
      this.$fire({
        title: 'Barcode OR Qrcode',
        text: "Do you want to download ?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, download it!',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.value) {
          let base64 = document.getElementById(`${id}`).src;
          const downloadLink = document.createElement("a");
          downloadLink.href = base64;
          downloadLink.download = product_name;
          downloadLink.click();
        }
      });
    }
  },
};
</script>
