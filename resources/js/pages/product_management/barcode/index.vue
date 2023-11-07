<template>
    <div>
        <b-card>
            <b-card-body class="p-0">
                <b-card-body>
                    <!--print option-->
                    <b-col lg="12" md="12" sm="12">
                        <b-row>
                            <b-col lg="12" md="12" sm="12" class="mb-2">
                                <strong>ព័តមានបង្ហាញនៅក្នុងស្លាក</strong>
                            </b-col>
                            <b-col lg="2" md="3" sm="12">
                                <!--product_name-->
                                <b-input-group>
                                    <b-input-group-append>
                                        <b-form-checkbox
                                            v-model="form.name"
                                            :value="true"
                                            :unchecked-value="false"
                                            size="md"
                                        ></b-form-checkbox>
                                    </b-input-group-append>
                                    <b-input-group-append class="mt-1">
                                        <span>{{ $t('product_name') }}</span>
                                    </b-input-group-append>
                                </b-input-group>
                            </b-col>
                            <b-col lg="2" md="3" sm="12">
                                <!--product_price-->
                                <b-input-group>
                                    <b-input-group-append>
                                        <b-form-checkbox
                                            v-model="form.price"
                                            :value="true"
                                            :unchecked-value="false"
                                            size="md"
                                        ></b-form-checkbox>
                                    </b-input-group-append>
                                    <b-input-group-append class="mt-1">
                                        <span>{{ $t('price') }}</span>
                                    </b-input-group-append>
                                </b-input-group>
                            </b-col>
                            <b-col lg="2" md="3" sm="12">
                                <!--product_sku-->
                                <b-input-group>
                                    <b-input-group-append>
                                        <b-form-checkbox
                                            v-model="form.sku"
                                            :value="true"
                                            :unchecked-value="false"
                                            size="md"
                                        ></b-form-checkbox>
                                    </b-input-group-append>
                                    <b-input-group-append class="mt-1">
                                        <span>{{ $t('code') }}</span>
                                    </b-input-group-append>
                                </b-input-group>
                            </b-col>
                            <b-col lg="12" md="12" sm="12">
                                <b-row class="mt-4">
                                    <!--barcode amount-->
                                    <b-col lg="3" md="3" sm="12">
                                        <strong>ការកំណត់ចំនួនបាកូដក្រដាស</strong>
                                        <b-row class="mt-2">
                                            <b-col class="m-0 p-0" lg="5" md="4" sm="12">
                                                <b-form-group
                                                    :invalid-feedback="veeErrors.first('column')"
                                                    :state="!veeErrors.has('column')"
                                                    :label="$t('column')"
                                                    label-for="column"
                                                    label-class="control-label"
                                                >
                                                    <b-form-input
                                                        autocomplete="off"
                                                        v-model="form.column"
                                                        v-validate="'required'"
                                                        :state="veeErrors.has('column') ? false : null"
                                                        data-vv-name="column"
                                                        :data-vv-as="$t('column')"
                                                        type="number"
                                                        :placeholder="$t('column')"
                                                        @keydown.enter="print"
                                                    />
                                                </b-form-group>
                                            </b-col>
                                            <b-col class="m-0 p-0" lg="1" md="1" sm="1">
                                                <p style="margin-top: 35px; margin-left: 10px">X</p>
                                            </b-col>
                                            <b-col class="m-0 p-0" lg="5" md="4" sm="12">
                                                <b-form-group
                                                    :invalid-feedback="veeErrors.first('row')"
                                                    :state="!veeErrors.has('row')"
                                                    :label="$t('row')"
                                                    label-for="number"
                                                    label-class="control-label"
                                                >
                                                    <b-form-input
                                                        autocomplete="off"
                                                        v-model="form.row"
                                                        v-validate="'required'"
                                                        :state="veeErrors.has('row') ? false : null"
                                                        data-vv-name="row"
                                                        :data-vv-as="$t('row')"
                                                        type="number"
                                                        :placeholder="$t('row')"
                                                        @keydown.enter="print"
                                                    />
                                                </b-form-group>
                                            </b-col>
                                        </b-row>
                                    </b-col>

                                    <!--barcode size-->
                                    <b-col lg="3" md="3" sm="12">
                                        <strong>ការទំហំបាកូដ (px)</strong>
                                        <b-row class="mt-2">
                                            <b-col lg="6" md="6" sm="12">
                                                <b-form-group
                                                    :invalid-feedback="veeErrors.first('size_x')"
                                                    :state="!veeErrors.has('size_x')"
                                                    :label="$t('size') + ' X'"
                                                    label-for="column"
                                                    label-class="control-label"
                                                >
                                                    <b-form-input
                                                        autocomplete="off"
                                                        v-model="form.size_x"
                                                        v-validate="'required'"
                                                        :state="veeErrors.has('size_x') ? false : null"
                                                        data-vv-name="size_x"
                                                        :data-vv-as="$t('size_x')"
                                                        type="number"
                                                        :placeholder="$t('size')"
                                                        @keydown.enter="print"
                                                    />
                                                </b-form-group>
                                            </b-col>
                                            <b-col lg="6" md="6" sm="12">
                                                <b-form-group
                                                    :invalid-feedback="veeErrors.first('size_y')"
                                                    :state="!veeErrors.has('size_y')"
                                                    :label="$t('size') + ' Y'"
                                                    label-for="column"
                                                    label-class="control-label"
                                                >
                                                    <b-form-input
                                                        autocomplete="off"
                                                        v-model="form.size_y"
                                                        v-validate="'required'"
                                                        :state="veeErrors.has('size_y') ? false : null"
                                                        data-vv-name="size_y"
                                                        :data-vv-as="$t('size_y')"
                                                        type="number"
                                                        :placeholder="$t('size')"
                                                        @keydown.enter="print"
                                                    />
                                                </b-form-group>
                                            </b-col>
                                        </b-row>
                                    </b-col>

                                    <!--barcode margin-->
                                    <b-col lg="3" md="3" sm="12">
                                        <strong>Margin Barcode</strong>
                                        <b-row class="mt-2">
                                            <b-col lg="6" md="6" sm="12">
                                                <b-form-group
                                                    :invalid-feedback="veeErrors.first('margin_x')"
                                                    :state="!veeErrors.has('margin_x')"
                                                    :label="$t('margin')+ ` X (px)`"
                                                    label-for="size"
                                                    label-class="control-label"
                                                >
                                                    <b-form-input
                                                        autocomplete="off"
                                                        v-model="form.margin_x"
                                                        v-validate="'required'"
                                                        :state="veeErrors.has('margin_x') ? false : null"
                                                        data-vv-name="margin_x"
                                                        :data-vv-as="$t('margin_x')"
                                                        type="number"
                                                        :placeholder="$t('size')"
                                                        @keydown.enter="print"
                                                    />
                                                </b-form-group>
                                            </b-col>
                                            <b-col lg="6" md="6" sm="12">
                                                <b-form-group
                                                    :invalid-feedback="veeErrors.first('margin_y')"
                                                    :state="!veeErrors.has('margin_y')"
                                                    :label="$t('margin') + ` Y (px)`"
                                                    label-for="row"
                                                    label-class="control-label"
                                                >
                                                    <b-form-input
                                                        autocomplete="off"
                                                        v-model="form.margin_y"
                                                        v-validate="'required'"
                                                        :state="veeErrors.has('margin_y') ? false : null"
                                                        data-vv-name="margin_y"
                                                        :data-vv-as="$t('margin_y')"
                                                        type="number"
                                                        :placeholder="$t('row')"
                                                        @keydown.enter="print"
                                                    />
                                                </b-form-group>
                                            </b-col>
                                        </b-row>
                                    </b-col>

                                    <!-- font size -->
                                    <b-col lg="3" md="3" sm="12">
                                        <strong>ការកំណត់ទំហំអក្សរ</strong>
                                        <b-row class="mt-2">
                                            <b-col lg="6" md="6" sm="12">
                                                <b-form-group
                                                    :invalid-feedback="veeErrors.first('font_size')"
                                                    :state="!veeErrors.has('font_size')"
                                                    :label="$t('size') + '(px)'"
                                                    label-for="size"
                                                    label-class="control-label"
                                                >
                                                    <b-form-input
                                                        autocomplete="off"
                                                        v-model="form.font_size"
                                                        v-validate="'required'"
                                                        :state="veeErrors.has('font_size') ? false : null"
                                                        data-vv-name="font_size"
                                                        :data-vv-as="$t('font_size')"
                                                        type="number"
                                                        :placeholder="$t('size')"
                                                        @keydown.enter="print"
                                                    />
                                                </b-form-group>
                                            </b-col>
                                        </b-row>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                    </b-col>
                    <hr>
                    <!--print list-->
                    <b-col lg="12" md="12" sm="12">
                        <!--search product_variation-->
                        <b-row class="justify-content-center align-items-center">
                            <!--search product_unit_variation-->
                            <b-col cols="6">
                                <b-input-group>
                                    <multi-select
                                        :multiple="false"
                                        label="name"
                                        track-by="name"
                                        :options="JSON.parse(JSON.stringify(product_unit_variation_list))"
                                        select-label=""
                                        deselect-label=""
                                        :placeholder="$t('search')+$t('product')+'......'"
                                        class="p-1"
                                        style="border-radius: 10px; background-color: gray"
                                        @input="addUnitVariation"
                                    >
                                    </multi-select>
                                </b-input-group>
                            </b-col>
                        </b-row>

                        <!--table selected product-->
                        <b-col md="12" lg="12" xl="12" class="mt-3 p-0">
                            <div class="table-responsive">
                                <table class="table table-sm table-bordered purchase-table" style="width: 100%">
                                    <thead>
                                    <tr style="white-space: nowrap">
                                        <th>{{ $t('product') }}</th>
                                        <th>{{ $t('amount_of') }}</th>
                                        <th>{{ $t('action') }}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr
                                        v-for="(item, index) in this.form.selected_product_variations"
                                        :key="index"
                                    >
                                        <!--product-->
                                        <td style=" width: 250px; vertical-align: middle">{{ item.name }}</td>
                                        <!--amount-->
                                        <td
                                            style="
                                            width: 250px;
                                            vertical-align: middle;
                                        "
                                        >
                                            <b-input-group>
                                                <b-form-input
                                                    style="border-radius: 5px"
                                                    v-model="item.qty"
                                                    v-validate="'required'"
                                                    :state="veeErrors.has(item.vee_qty) ? false : null"
                                                    :data-vv-name="item.vee_qty"
                                                    data-vv-as="amount"
                                                    type="number"
                                                    required
                                                    :placeholder="$t('amount_of')"
                                                    class="input-qty"
                                                    @focus="$event.target.select()"
                                                />
                                            </b-input-group>
                                        </td>
                                        <!--action-->
                                        <td
                                            style="
                                            width: 50px;
                                            vertical-align: middle;
                                        "
                                        >
                                            <b-button
                                                variant="link"
                                                size="xs"
                                                @click="removeUnitVariation(index)"
                                                class="mr-1 btn btn-danger"
                                            >
                                                <i class="fa fa-trash"></i>
                                            </b-button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </b-col>
                    </b-col>

                    <!--print btn-->
                    <b-button
                        size="xs"
                        class="float-right"
                        variant="primary"
                        icon="printer"
                        @click="print"
                    >
                        {{ $t('print') }}
                    </b-button>

                </b-card-body>
            </b-card-body>
        </b-card>
    </div>
</template>
<script>
import swal from 'sweetalert2'
import { mapGetters } from 'vuex'
export default {
	layout: 'app',
	middleware: 'acl',
	moduleKey: 'product_barcode',
	head() {
		return {
			title: this.$t('product_barcode'),
		}
	},
	data() {
		return {
		    form: {
		        name: true,
		        price: true,
		        sku: true,
		        branch: false,
		        column: 4,
		        row: 100,
		        size_x: 3,
		        size_y: 70,
		        margin_x: 10,
		        margin_y: 10,
		        font_size: 20,
                selected_product_variations: [],
            },
			rowItem: {},
			items: {},
			apiUrl: process.env.API_URL,
			product_id: null,
            product_variation_lists: [],
            product_variation: {},
		}
	},
    computed: {
        ...mapGetters({
            product_unit_variation_list: 'getProductUnitVariationList',
        }),
    },
	created() {
		//
	},
	methods: {
        print() {
            let vm = this;
            axios({
                url: "/barcode/print",
                data: {
                    filter: vm.form
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
        addUnitVariation(evt){
            if (evt != null) {
                //check dpl product
                let dpl = this.form.selected_product_variations.findIndex(obj=>{
                    return parseFloat(obj.product_unit_variation_id) == parseFloat(evt.product_unit_variation_id)
                });

                if (dpl == -1){
                    this.form.selected_product_variations.push(evt);
                }
                else {
                    let old_qty = this.form.selected_product_variations[dpl].qty;
                    this.form.selected_product_variations[dpl].qty = parseFloat(old_qty) + 1
                }
            }
        },
        removeUnitVariation(index){
            this.$delete(this.form.selected_product_variations, index)
        },
	},
}
</script>
