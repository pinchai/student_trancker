<template>
  <b-modal
    id="modal"
    v-model="modal"
    no-close-on-backdrop
    no-close-on-esc
    hide-header-close
    size="xl"
    scrollable
    content-class="custom-modal"
  >
    <!-- modal category -->
    <div v-if="modalCategoryShow">
      <modal-category
        :modalType="modalCategoryType"
        @closeModal="closeModalCategory"
      ></modal-category>
    </div>

    <!-- modal brand -->
    <div v-if="modalBrandShow">
      <modal-brand
        :modalType="modalBrandType"
        @closeModal="closeModalBrand"
      ></modal-brand>
    </div>

    <!-- modal supplier -->
    <div v-if="modalSupplierShow">
      <modal-supplier
        :modalType="modalSupplierType"
        @closeModal="closeModalSupplier"
      ></modal-supplier>
    </div>

    <!-- modal tag -->
    <div v-if="modalTagShow">
      <modal-tag
        :modalType="modalTagType"
        @closeModal="closeModalTag"
      ></modal-tag>
    </div>

    <!-- modal unit -->
    <div v-if="modalUnitShow">
      <modal-unit
        :modalType="modalUnitType"
        @closeModal="closeModalUnit"
      ></modal-unit>
    </div>

    <template slot="modal-header">
      <h3><i class="fas fa-cubes"></i> {{ $t("product") }}</h3>
    </template>

    <!-- Content -->
    <div class="d-block">
      <!--product-->
      <b-card no-body class="shadow-sm">
        <b-card-body>
          <!--image thumbnail-->
          <b-row>
            <b-col cols="12" class="text-center mb-3">
              <div v-if="$helpers.nullToVoid(form.image) == ''">
                <i
                  class="fas fa-image"
                  style="font-size: 170px; color: #a0aec0"
                ></i>
              </div>
              <div v-else>
                <b-img
                  :src="this.imgUrl + this.form.image"
                  alt="Image"
                  width="170"
                  height="170"
                  rounded
                  class="mb-2"
                />
              </div>
              <div>
                <b-button
                  size="sm"
                  class="ml-2"
                  variant="outline-primary"
                  style="width: 151px"
                  @click="chooseImageThumbnail"
                >{{ $t("choose_file") }}
                </b-button
                >
                <input
                  ref="fileInputThumbnail"
                  style="display: none"
                  type="file"
                  accept="image/*"
                  :multiple="false"
                  @change="onFileChangeThumbnail"
                />
              </div>
            </b-col>
          </b-row>
          <!-- gallery -->
          <b-row class="mb-3">
            <!-- Image -->
            <b-col cols="12">
              <span>{{ $t("product") + " " + $t("image") }}</span>
              <i
                class="far fa-images px-2 pt-1 text-primary"
                style="font-size: 18px; cursor: pointer"
                @click="chooseImageGallery"
              ></i>

              <b-row
                @click="chooseImageGallery"
                style="
                  padding: 0 15px 0 15px;
                  border: solid 1px #dcdcdc;
                  margin: 0;
                  border-radius: 6px;
                  overflow-y: scroll;
                  max-height: 360px;
                  cursor: pointer;
                "
              >
                <b-col cols="12">
                  <div
                    v-if="$helpers.nullToVoid(form.product_image) == []"
                    style="height: 140px; text-align: center"
                    :invalid-feedback="veeErrors.first('image')"
                    :state="!veeErrors.has('image')"
                  >
                    <label
                      style="
                        padding-top: 60px;
                        color: rgba(0, 0, 0, 0.54);
                        cursor: pointer;
                      "
                    >{{
                        `${$t("select")} ${$t("product")} ${$t("image")}`
                      }}</label
                    >
                  </div>
                  <div v-else>
                    <draggable :list="form.product_image" class="row">
                      <div
                        v-for="(pic, index) in form.product_image"
                        :key="index"
                      >
                        <b-img
                          :src="pic.image"
                          class="border-radius"
                          width="140px"
                          height="140px"
                          style="margin-top: 20px; margin-left: 30px"
                        />
                        <i
                          class="fas fa-minus-circle minus-image"
                          @click="removeImageGallery($event, index)"
                        ></i>
                      </div>
                    </draggable>
                  </div>

                  <b-form-group>
                    <input
                      ref="fileInputGallery"
                      style="display: none"
                      type="file"
                      accept="image/*"
                      :multiple="false"
                      @change="onFileChangeGallery"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <!-- info -->
          <b-row>
            <b-col lg="12" md="12" sm="12" cols="12">
              <b-row>
                <!--name-->
                <b-col lg="6" md="12" sm="12">
                  <b-form-group
                    :invalid-feedback="veeErrors.first('name')"
                    :label="$t('name') + ' *'"
                    label-class="control-label"
                    class="text-left"
                  >
                    <b-form-input
                      v-model="form.name"
                      v-validate="'required'"
                      :state="veeErrors.has('name') ? false : null"
                      data-vv-name="name"
                      :data-vv-as="productName"
                      type="text"
                      :placeholder="productName"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <!--SKU-->
                <b-col lg="6" md="12" sm="12">
                  <b-form-group
                    label="SKU"
                    label-class="control-label"
                    class="text-left"
                  >
                    <b-form-input
                      v-model="form.sku"
                      type="text"
                      placeholder="SKU"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <!--category-->
                <b-col lg="6" md="12" sm="12">
                  <b-form-group
                    :invalid-feedback="veeErrors.first('category')"
                    :state="!veeErrors.has('category')"
                    class="text-left"
                  >
                    <label class="text-dark m-0 p-0">{{
                        $t("category") + " *"
                      }}</label>
                    <i
                      class="fas fa-plus-circle text-primary m-0 p-0"
                      style="cursor: pointer"
                      @click="
                        modalCategoryShow = true;
                        modalCategoryType = 1;
                      "
                    ></i>
                    <multi-select
                      v-model="form.category"
                      :multiple="false"
                      label="name"
                      track-by="name"
                      select-label=""
                      deselect-label=""
                      :options="categories"
                      v-validate="'required'"
                      :state="veeErrors.has('category') ? false : null"
                      :data-vv-name="'category'"
                      :data-vv-as="$t('category')"
                      :placeholder="$t('select') + $t('category')"
                    >
                    </multi-select>
                  </b-form-group>
                </b-col>
                <!--brand-->
                <b-col lg="6" md="12" sm="12">
                  <b-form-group
                    :invalid-feedback="veeErrors.first('brand')"
                    class="text-left"
                  >
                    <label class="text-dark m-0 p-0">{{ $t("brand") }}</label>
                    <i
                      class="fas fa-plus-circle text-primary m-0 p-0"
                      style="cursor: pointer"
                      @click="
                        modalBrandShow = true;
                        modalBrandType = 1;
                      "
                    ></i>
                    <multi-select
                      v-model="form.brand"
                      :multiple="false"
                      label="name"
                      track-by="name"
                      select-label=""
                      deselect-label=""
                      :options="brand"
                      :placeholder="$t('select') + $t('brand')"
                    >
                    </multi-select>
                  </b-form-group>
                </b-col>
                <!--tag-->
                <b-col lg="6" md="12" sm="12">
                  <b-form-group
                    :invalid-feedback="veeErrors.first('tag')"
                    class="text-left"
                  >
                    <label class="text-dark m-0 p-0">{{ $t("tag") }}</label>
                    <i
                      class="fas fa-plus-circle text-primary m-0 p-0"
                      style="cursor: pointer"
                      @click="
                        modalTagShow = true;
                        modalTagType = 1;
                      "
                    ></i>
                    <multi-select
                      v-model="form.tag"
                      :multiple="false"
                      label="name"
                      track-by="name"
                      select-label=""
                      deselect-label=""
                      :options="tag"
                      :placeholder="$t('select') + $t('tag')"
                    >
                    </multi-select>
                  </b-form-group>
                </b-col>
                <!--unit-->
                <b-col lg="6" md="12" sm="12">
                  <b-form-group
                    :invalid-feedback="veeErrors.first('unit')"
                    :state="!veeErrors.has('unit')"
                  >
                    <label class="text-dark m-0 p-0">{{
                        $t("unit") + " *"
                      }}</label>
                    <i
                      class="fas fa-plus-circle text-primary mt-1 p-0"
                      style="cursor: pointer"
                      @click="openUnitModal(null)"
                    ></i>
                    <multi-select
                      v-model="form.unit"
                      :multiple="false"
                      label="name"
                      track-by="name"
                      :options="unit"
                      v-validate="'required'"
                      select-label=""
                      deselect-label=""
                      :state="veeErrors.has('unit') ? false : null"
                      :data-vv-name="'unit'"
                      :data-vv-as="$t('unit')"
                      :placeholder="$t('select') + $t('unit')"
                    >
                    </multi-select>
                  </b-form-group>
                </b-col>
                <!--price-->
                <b-col lg="6" md="12" sm="12">
                  <b-form-group
                    :invalid-feedback="veeErrors.first('price')"
                    :state="veeErrors.has('price') ? false : null"
                    :label="$t('price') + ' *'"
                    label-class="control-label"
                    class="text-left"
                  >
                    <b-input-group>
                      <b-form-input
                        v-model="form.price"
                        v-validate="'required|max:20'"
                        :state="veeErrors.has('price') ? false : null"
                        :data-vv-name="'price'"
                        :data-vv-as="$t('price')"
                        type="number"
                        :placeholder="$t('price')"
                      >
                      </b-form-input>
                      <template #prepend>
                        <b-form-select
                          disabled
                          v-model="form.price_currency_id"
                          :options="currencies"
                          value-field="id"
                          text-field="name"
                          v-validate="'required'"
                          :state="veeErrors.has('price') ? false : null"
                          :data-vv-name="'price'"
                          :data-vv-as="$t('price')"
                        >
                          <template #first>
                            <b-form-select-option :value="null" disabled>{{
                                $t("currency")
                              }}
                            </b-form-select-option>
                          </template>
                        </b-form-select>
                      </template>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <!--discount-->
                <b-col lg="6" md="12" sm="12">
                  <b-form-group
                    :invalid-feedback="veeErrors.first('discount')"
                    :state="veeErrors.has('discount') ? false : null"
                    :label="$t('discount') + ' *'"
                    label-class="control-label"
                    class="text-left"
                  >
                    <b-input-group prepend="%">
                      <b-form-input
                        v-model="form.discount"
                        v-validate="'required|max_value:100||min_value:0'"
                        :state="veeErrors.has('discount') ? false : null"
                        :data-vv-name="'discount'"
                        :data-vv-as="$t('discount')"
                        type="number"
                        :placeholder="$t('discount')"
                      ></b-form-input>
                    </b-input-group>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
      <!--description-->
      <b-card no-body class="shadow-sm mt-3">
        <b-card-header>

          <b-row>
            <b-col cols="6"><h3 class="info-title">{{ $t("description") }}</h3></b-col>
            <b-col cols="6">
              <b-button v-b-toggle.collapse-description class="float-right m-1">Toggle How To Description</b-button>
            </b-col>
          </b-row>
        </b-card-header>
        <b-card-body>
          <b-row>
            <!--text_editor-->
            <b-col cols="12">
              <b-collapse visible id="collapse-description">
                <text-editor
                  :setText="form.description"
                  @getText="getDescriptionText"
                ></text-editor>
              </b-collapse>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
      <!--how_to_use-->
      <b-card no-body class="shadow-sm mt-3">
        <b-card-header>
          <b-row>
            <b-col cols="6"><h3 class="info-title">{{ $t("how_to_use") }}</h3></b-col>
            <b-col cols="6">
              <b-button v-b-toggle.collapse-use class="float-right m-1">Toggle How To Use</b-button>
            </b-col>
          </b-row>
        </b-card-header>
        <b-card-body>
          <b-row>
            <!--text_editor-->
            <b-col cols="12">

              <b-collapse visible id="collapse-use">
                <text-editor
                  :setText="form.how_to_use"
                  @getText="getHowToUseText"
                ></text-editor>
              </b-collapse>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
      <!--ingredients-->
      <b-card no-body class="shadow-sm mt-3">
        <b-card-header>
          <b-row>
            <b-col cols="6"><h3 class="info-title">{{ $t("ingredients") }}</h3></b-col>
            <b-col cols="6">
              <b-button v-b-toggle.collapse-use class="float-right m-1">Toggle Ingredients</b-button>
            </b-col>
          </b-row>
        </b-card-header>
        <b-card-body>
          <b-row>
            <!--text_editor-->
            <b-col cols="12">

              <b-collapse visible id="collapse-use">
                <text-editor
                  :setText="form.ingredients"
                  @getText="getIngredients"
                ></text-editor>
              </b-collapse>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
    </div>

    <!--footer-->
    <template slot="modal-footer">
      <b-button
        variant="outline-danger"
        @click="clearForm(null)"
        class="float-right"
      >
        <i class="fas fa-times-circle mr-1"></i>
        {{ $t("close") }}
      </b-button
      >
      <b-button
        type="submit"
        variant="outline-primary"
        class="float-right ml-2"
        @click.prevent="onSubmit"
      >
        <i class="fas fa-save mr-1"></i>
        {{ $t("save") }}
      </b-button
      >
    </template>

    <!-- Start modal-cropper-image Component -->
    <div v-if="modalShowCropperImage">
      <modal-cropper-image
        :modal-show="modalShowCropperImage"
        :target-file="cropperImageTargetFile"
        :aspect-ratio="1 / 1"
        :preview-width="350"
        :preview-height="350"
        :buttonOptions="{
          flipX: true,
          flipY: true,
          rotatePlus90: true,
          rotateMinus90: true,
        }"
        @closeModal="closeModalCropperImage"
        @save="saveModalCropperImage"
      />
    </div>

  </b-modal>
</template>
<script>
import {mapGetters} from "vuex";
import swal from "sweetalert2";
import Draggable from "vuedraggable";

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
    ModalCategory: () => import("../../category/components/Modal"),
    ModalBrand: () => import("../../brand/components/Modal"),
    ModalTag: () => import("../../tag/components/Modal"),
    ModalUnit: () => import("../../unit/components/Modal"),
    ModalCropperImage: () =>
      import("../../../../components/sharing/ModalCropperImage"),
    draggable: Draggable,
    TextEditor: () => import("../../../../components/sharing/TextEditor")
  },
  data() {
    return {
      imgUrl: "/images/product/",
      modal: true,
      form: {
        name: null,
        sku: null,
        selected: null,
        image: null,
        old_image: null,
        unit: [],
        category: [],
        brand: null,
        supplier: null,
        tag: null,
        tax: null,
        cost: 0,
        price: 0,
        discount: 0,
        min_price: 0,
        max_price: 0,
        stock_alert: 0,
        cost_currency_id: null,
        price_currency_id: null,
        is_track_stock: false,
        product_type_id: 1,
        commission_type_id: 0,
        commission_value: 0,
        composite_lists: [],
        deleted_lists: [],
        product_image: [],
        description: null,
        how_to_use: null,
        ingredients: null,
      },
      selected_product: [],
      listItems: {},
      apiUrl: null,

      modalCategoryShow: false,
      modalCategoryType: 0,

      modalBrandShow: false,
      modalBrandType: 0,

      modalSupplierShow: false,
      modalSupplierType: 0,

      modalTagShow: false,
      modalTagType: 0,

      modalUnitShow: false,
      modalUnitType: 0,
      indexUnitForm: null,

      modalShowCropperImage: false,
      cropperImageTargetFile: null,
      imageType: null,
      deletedProductImage: [],
      blob: null,
    };
  },
  computed: {
    ...mapGetters({
      currencies: "getCurrency",
      categories: "getProductCategory",
      brand: "getBrand",
      unit: "getUnit",
      tag: "getTag",
      vendor: "getVendor",
      default_currency: "getDefaultCurrency",
      enums: "getEnums",
      products: "getProducts",
    }),
    productName() {
      return this.$i18n.locale == "en"
        ? "Product Name"
        : this.$i18n.locale == "kh"
          ? "ឈ្មោះផលិតផល"
          : "";
    },
  },
  watch: {
    modalType: {
      handler(val) {
        if (val == 1) {
          this.modal = true;
          this.apiUrl = "/product/store";

          //set default currency to cost and price
          this.form.cost_currency_id = this.default_currency[0].id;
          this.form.price_currency_id = this.default_currency[0].id;
        } else if (val == 2) {
          this.modal = true;
          this.setData();
          if (this.formItem.action == "edit") {
            this.apiUrl = "/product/edit";
          } else {
            this.apiUrl = "/product/copy";
          }
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
          let input = this.form;
          // Reorder product image index
          input.product_image.map((obj, index) => {
            obj.order = index;
            return obj;
          });
          input.deleted_product_image = this.deletedProductImage;
          input.image = null;
          input.old_image = null;
          axios.post(this.apiUrl, input)
            .then(function (response) {
              if (response.status === 200) {
                vm.listItems = response.data;
                //console.log(response.data.data.product.id)
                vm.$store.dispatch("setProducts", response.data.data.product);
                if (response.data.success == 1) {
                  //upload image
                  if (vm.blob != null) {
                    let formData = new FormData();
                    formData.append('product_id', response.data.data.new_product.id)
                    formData.append('image', vm.blob)
                    axios.post("/product/upload_image", formData).then(function (res) {
                      if (res.data.success === 1) {
                        vm.clearForm(res);
                        vm.$notify({
                          group: "message",
                          type: "success",
                          title: vm.$t("product"),
                          text: vm.$t("done"),
                        });
                      }
                    }).catch(function (error) {
                      console.log(error);
                    });

                  }else {
                    vm.clearForm(response);
                    vm.$notify({
                      group: "message",
                      type: "success",
                      title: vm.$t("product"),
                      text: vm.$t("done"),
                    });
                  }
                } else if (response.data.success === 3) {
                  let msg =
                    vm.$i18n.locale == "en"
                      ? "This Product Name is Already Exits"
                      : "ឈ្មោះផលិតផលមានរួចមកហើយ";
                  Swal.fire({
                    title: "Oop...",
                    text: msg,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                  });
                }
              }
            }).catch(function (error) {
            console.log(error);
          });
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
    clearForm(obj) {
      this.form = {};

      this.$nextTick(() => {
        this.$validator.reset();
      });

      this.$emit("closeModal", obj);
      this.modal = false;
      this.listItems = {};
    },
    setData() {
      this.form.id = this.formItem.id;
      this.form.name = this.formItem.name;
      this.form.cost = parseFloat(this.formItem.cost);
      this.form.price = parseFloat(this.formItem.price);
      this.form.discount = parseFloat(this.formItem.discount);
      this.form.min_price = parseFloat(this.formItem.min_price);
      this.form.max_price = parseFloat(this.formItem.max_price);
      this.form.stock_alert = parseFloat(this.formItem.stock_alert);
      this.form.cost_currency_id = this.formItem.cost_currency_id;
      this.form.price_currency_id = this.formItem.price_currency_id;
      this.form.sku = this.formItem.sku;
      this.form.is_track_stock =
        this.formItem.is_track_stock == 1 ? true : false;
      this.form.image = this.formItem.image;
      this.form.old_image = this.formItem.image;
      this.form.commission_type_id = this.formItem.commission_type;
      this.form.commission_value = parseFloat(this.formItem.commission_value);
      this.form.product_type_id = this.formItem.product_type;
      this.form.composite_lists = this.formItem.product_composite;
      this.form.category = this.categories.find((item) => {
        return item.id == this.formItem.category_id;
      });
      this.form.brand = this.brand.find((item) => {
        return item.id == this.formItem.brand_id;
      });
      this.form.supplier = this.vendor.find((item) => {
        return item.id == this.formItem.supplier_id;
      });
      this.form.tag = this.tag.find((item) => {
        return item.id == this.formItem.tag_id;
      });
      this.form.tax = parseFloat(this.formItem.tax);

      this.form.description = this.formItem.description;
      this.form.how_to_use = this.formItem.how_to_use;
      this.form.ingredients = this.formItem.ingredients;

      this.form.unit = this.unit.find((item) => {
        return item.id == this.formItem.unit_id;
      });
      this.form.tax = this.formItem.tax;

      this.form.product_image = JSON.parse(JSON.stringify(this.formItem.product_image));
      this.form.product_image.map((obj) => {
        obj.image = this.imgUrl + obj.image;
        return obj;
      });
    },
    chooseImageThumbnail() {
      this.$refs.fileInputThumbnail.click();
    },
    onFileChangeThumbnail($event) {
      let vm = this;
      const files = $event.target.files || $event.dataTransfer.files;
      const fileSize = files[0].size / 1024 / 1024; // in 1 MB
      if (fileSize > 1) {
        let msg =
          vm.$i18n.locale == "en"
            ? "Cannot upload image bigger than 1MB"
            : "មិនអាចផ្ទុករូបភាពធំជាង1MBបានទេ។";
        Swal.fire({
          icon: "error",
          title: "Oop...",
          text: msg,
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        this.$refs.fileInputThumbnail.value = "";
        return;
      }
      if (files[0]) {
        this.cropperImageTargetFile = $event;
        this.imageType = "thumbnail";
        this.openModalCropperImage();
      } else {
        vm.form.image = null;
      }
    },
    chooseImageGallery() {
      this.$refs.fileInputGallery.click();
    },
    onFileChangeGallery($event) {
      let vm = this;
      const files = $event.target.files || $event.dataTransfer.files;
      const fileSize = files[0].size / 1024 / 1024; // in 1 MB
      if (fileSize > 1) {
        let msg =
          vm.$i18n.locale == "en"
            ? "Cannot upload image bigger than 1MB"
            : "មិនអាចផ្ទុករូបភាពធំជាង1MBបានទេ។";
        Swal.fire({
          icon: "error",
          title: "Oop...",
          text: msg,
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        this.$refs.fileInputGallery.value = "";
        return;
      }
      if (files[0]) {
        this.cropperImageTargetFile = $event;
        this.imageType = "gallery";
        this.openModalCropperImage();
      }
    },
    removeImageGallery(e, index) {
      e.stopPropagation();
      if (this.$helpers.nullToVoid(this.form.product_image[index].id) != "") {
        this.deletedProductImage.push(this.form.product_image[index]);
      }

      this.form.product_image.splice(index, 1);
    },
    //Cropper
    openModalCropperImage() {
      this.modalShowCropperImage = true;
    },
    closeModalCropperImage(data) {
      this.modalShowCropperImage = false;
      this.$refs.fileInputThumbnail.value = "";
      this.$refs.fileInputGallery.value = "";
      this.cropperImageTargetFile = null;
      this.imageType = "";
    },
    async saveModalCropperImage(base64) {
      this.imgUrl = "";
      if (this.imageType == "thumbnail") {
        this.blob = await (await fetch(base64)).blob();
        this.form.image = base64;
      } else if (this.imageType == "gallery") {
        this.form.product_image.push({
          id: null,
          image: base64,
          image_blob: await (await fetch(base64)).blob(),
        });
      }
      this.closeModalCropperImage();
    },
    closeModalCategory(obj) {
      this.modalCategoryShow = false;
      this.modalCategoryType = 0;

      if (!this.$helpers.isEmpty(obj)) {
        this.form.category = obj;
      }
    },
    closeModalBrand(obj) {
      this.modalBrandShow = false;
      this.modalBrandType = 0;

      if (!this.$helpers.isEmpty(obj)) {
        this.form.brand = obj;
      }
    },
    closeModalSupplier(obj) {
      this.modalSupplierShow = false;
      this.modalSupplierType = 0;

      if (!this.$helpers.isEmpty(obj)) {
        this.form.supplier = obj;
      }
    },
    closeModalTag(obj) {
      this.modalTagShow = false;
      this.modalTagType = 0;

      if (!this.$helpers.isEmpty(obj)) {
        this.form.tag = obj;
      }
    },
    openUnitModal(index) {
      this.modalUnitShow = true;
      this.modalUnitType = 1;

      this.indexUnitForm = index;
    },
    closeModalUnit(obj) {
      this.modalUnitShow = false;
      this.modalUnitType = 0;

      if (!this.$helpers.isEmpty(obj)) {
        this.form.product_unit[this.indexUnitForm].unit = obj;
      }
    },
    rowCompositeDelete(index, event) {
      this.form.composite_lists.splice(index, 1);
      this.form.deleted_lists.push({
        id: event.id === undefined ? null : event.id,
      });
      this.selected_product = [];
    },
    onProductSelected(item) {
      if (this.$helpers.nullToVoid(item, "") !== "") {
        let duplicate_id = this.form.composite_lists.findIndex(function (obj) {
          return obj.product_id == item.id;
        });
        if (duplicate_id == -1) {
          this.form.composite_lists.push({
            id: null,
            product_composite_id: item.id,
            name: item.name,
            quantity: 1,
            cost: item.cost,
            cost_currency_id: item.cost_currency_id,
            price: item.price,
            price_currency_id: item.price_currency_id,
            vee_quantity: `vee_quantity_${this.form.composite_lists.length}`,
          });
        } else {
          swal.fire({
            type: "warning",
            title: this.$t("product"),
            text: this.$t("This Product Is Already Exist"),
          });
        }
      }
      this.selected_product = [];
    },
    getDescriptionText(evt){
      this.form.description = evt
    },
    getHowToUseText(evt){
      this.form.how_to_use = evt
    },
    getIngredients(evt){
      this.form.ingredients = evt
    },
  },
};
</script>

<style scoped>
/deep/ .custom-modal {
  border-radius: 15px;
}

/deep/ .modal-dialog {
  max-width: 80%;
}

.minus-image {
  cursor: pointer;
  position: absolute;
  margin-top: 8px;
}

.minus-image:hover {
  background-color: rgba(255, 0, 0, 0.2);
  border-radius: 8px;
}
</style>
