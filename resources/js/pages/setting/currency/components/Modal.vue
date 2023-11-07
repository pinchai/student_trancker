<template>
    <b-modal
        id="modal"
        v-model="modal"
        centered
        scrollable
        no-close-on-backdrop
        no-close-on-esc
        hide-header-close
        size="lg"
        content-class="custom-modal"
    >
        <template slot="modal-header">
            <h3><i class="fas fa-comments-dollar"></i> {{ $t("currency") }}</h3>
        </template>
        <div class="d-block">
            <b-row>
                <!--code-->
                <b-col cols="6">
                    <b-form-group
                        :invalid-feedback="veeErrors.first('code')"
                        :label="$t('code') + ' *'"
                        label-class="control-label"
                        class="text-left"
                    >
                        <b-form-input
                            autocomplete="off"
                            v-model="form.code"
                            v-validate="'required'"
                            :state="veeErrors.has('code') ? false : null"
                            data-vv-name="code"
                            :data-vv-as="$t('code')"
                            type="text"
                            :placeholder="$t('code')"
                            @keydown.enter.prevent="onSubmit"
                        ></b-form-input>
                    </b-form-group>
                </b-col>
                <!--symbol-->
                <b-col cols="6">
                    <b-form-group
                        :invalid-feedback="veeErrors.first('symbol')"
                        :label="$t('symbol') + ' *'"
                        label-class="control-label"
                        class="text-left"
                    >
                        <b-form-input
                            autocomplete="off"
                            v-model="form.symbol"
                            v-validate="'required'"
                            :state="veeErrors.has('symbol') ? false : null"
                            data-vv-name="symbol"
                            :data-vv-as="$t('symbol')"
                            type="text"
                            :placeholder="$t('symbol')"
                            @keydown.enter.prevent="onSubmit"
                        ></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <!--name-->
                <b-col cols="6">
                    <b-form-group
                        :invalid-feedback="veeErrors.first('name')"
                        :label="$t('name') + ' *'"
                        label-class="control-label"
                        class="text-left"
                    >
                        <b-form-input
                            autocomplete="off"
                            v-model="form.name"
                            v-validate="'required'"
                            :state="veeErrors.has('name') ? false : null"
                            data-vv-name="name"
                            :data-vv-as="$t('name')"
                            type="text"
                            :placeholder="$t('name')"
                            @keydown.enter.prevent="onSubmit"
                        ></b-form-input>
                    </b-form-group>
                </b-col>
                <!--country-->
                <b-col cols="6">
                    <b-form-group
                        :label="$t('country')"
                        label-class="control-label"
                        class="text-left"
                    >
                        <b-form-input
                            autocomplete="off"
                            v-model="form.country"
                            type="text"
                            :placeholder="$t('country')"
                            @keydown.enter.prevent="onSubmit"
                        ></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <!--sell_out_price-->
                <b-col cols="6">
                    <b-form-group
                        :invalid-feedback="veeErrors.first('sell_out_price')"
                        :label="$t('sell_out_price') + ' *'"
                        label-class="control-label"
                        class="text-left"
                    >
                        <b-form-input
                            autocomplete="off"
                            v-model="form.sell_out_price"
                            v-validate="'required'"
                            :state="
                                veeErrors.has('sell_out_price') ? false : null
                            "
                            data-vv-name="sell_out_price"
                            :data-vv-as="$t('sell_out_price')"
                            min="0"
                            type="number"
                            :placeholder="$t('sell_out_price')"
                            @keydown.enter.prevent="onSubmit"
                        ></b-form-input>
                    </b-form-group>
                </b-col>
                <!--buy_in_price-->
                <b-col cols="6">
                    <b-form-group
                        :invalid-feedback="veeErrors.first('buy_in_price')"
                        :label="$t('buy_in_price') + ' *'"
                        label-class="control-label"
                        class="text-left"
                    >
                        <b-form-input
                            autocomplete="off"
                            v-model="form.buy_in_price"
                            v-validate="'required'"
                            :state="
                                veeErrors.has('buy_in_price') ? false : null
                            "
                            data-vv-name="buy_in_price"
                            :data-vv-as="$t('buy_in_price')"
                            min="0"
                            type="number"
                            :placeholder="$t('buy_in_price')"
                        ></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <!--order-->
                <b-col cols="6">
                    <b-form-group
                        :label="orderTitle"
                        label-class="control-label"
                        class="text-left"
                    >
                        <b-form-input
                            autocomplete="off"
                            v-model="form.order"
                            min="0"
                            type="number"
                            :placeholder="orderTitle"
                        ></b-form-input>
                    </b-form-group>
                </b-col>
                <!--is_default-->
                <b-col cols="6">
                    <b-form-group
                        :invalid-feedback="veeErrors.first('is_default')"
                        :label="$t('is_default')"
                        label-class="control-label"
                        class="text-left"
                    >
                        <b-form-select
                            v-model="form.is_default"
                            v-validate="'required'"
                            :state="veeErrors.has('is_default') ? false : null"
                            data-vv-name="is_default"
                            :data-vv-as="$t('is_default')"
                            :disabled="disabledIsDefault"
                        >
                            <template slot="#first"></template>
                            <b-form-select-option value="1">
                                <span v-if="$i18n.locale == 'en'">Yes</span>
                                <span v-if="$i18n.locale == 'kh'"
                                    >ប្រើជាលំនាំដើម</span
                                >
                            </b-form-select-option>
                            <b-form-select-option value="0">
                                <span v-if="$i18n.locale == 'en'">No</span>
                                <span v-if="$i18n.locale == 'kh'"
                                    >មិនបានប្រើជាលំនាំដើម</span
                                >
                            </b-form-select-option>
                        </b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>

            <template v-if="false">
                <b-row class="mt-1">
                    <b-col>
                        <b-button variant="outline-primary" @click="addQuickCash">
                            <i class="fa fa-money-bill-alt"></i>
                            <span v-if="$i18n.locale == 'en'">Add Quick Cash</span>
                            <span v-if="$i18n.locale == 'kh'"
                            >បង្កើតតម្លៃ Quick Cash</span
                            >
                        </b-button>
                    </b-col>
                </b-row>
                <b-row
                    class="mt-4"
                    v-for="(quick, index) in form.quick_cash"
                    :key="index"
                >
                    <b-col cols="12" sm="12" md="6" xl="3">
                        <b-button
                            class="w-75 mt-4"
                            variant="outline-primary"
                            @click="chooseImage($event, index)"
                        >{{ $t("choose_file") }}</b-button
                        >
                        <input
                            ref="fileInput"
                            style="display: none"
                            type="file"
                            accept=".png, .jpg"
                            :multiple="false"
                            @change="onFileChange($event, index)"
                        />
                    </b-col>
                    <!-- image -->
                    <b-col cols="12" sm="12" md="6" xl="3" class="ml-2 mr-2">
                        <div v-if="$helpers.nullToVoid(quick.image) == ''">
                            <i
                                class="fas fa-image"
                                style="font-size: 88px; color: #a0aec0; margin-left: 20px;"
                            ></i>
                        </div>
                        <div v-else>
                            <b-img
                                :src="quick.image"
                                alt="img"
                                width="150"
                                height="80"
                            />
                        </div>
                    </b-col>
                    <!--amount-->
                    <b-col cols="12" sm="12" md="6" xl="3">
                        <b-form-group
                            :state="veeErrors.has('amount_' + index) ? false : null"
                            :invalid-feedback="veeErrors.first('amount_' + index)"
                            :label="$t('amount') + ' *'"
                            label-class="control-label"
                            class="text-left"
                        >
                            <b-input-group>
                                <b-form-input
                                    autocomplete="off"
                                    v-model="quick.amount"
                                    v-validate="'required'"
                                    :state="
                                    veeErrors.has('amount_' + index)
                                        ? false
                                        : null
                                "
                                    :data-vv-name="'amount_' + index"
                                    :data-vv-as="$t('amount')"
                                    min="0"
                                    type="number"
                                    :placeholder="$t('amount')"
                                    @keydown.enter.prevent="onSubmit"
                                ></b-form-input>
                                <template #append>
                                    <i
                                        class="fas fa-trash-alt text-danger ml-3"
                                        style="cursor: pointer; margin-top: 9px; font-size: 20px;"
                                        @click="removeQuickCash(index)"
                                    ></i>
                                </template>
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                </b-row>
            </template>
        </div>
        <template slot="modal-footer">
            <b-button
                variant="outline-danger"
                @click="clearForm"
                class="float-right"
            >
                <i class="fas fa-times-circle mr-1"></i>
                {{ $t("close") }}</b-button
            >
            <b-button
                type="submit"
                variant="outline-primary"
                class="float-right ml-2"
                @click.prevent="onSubmit"
            >
                <i class="fas fa-save mr-1" v-if="modalType == 1"></i>
                <i class="fa fa-edit mr-1" v-if="modalType == 2"></i>
                {{ modalOk }}</b-button
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
            }
        },
        modalType: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            modal: true,
            form: {
                id: null,
                code: null,
                name: null,
                symbol: null,
                country: null,
                buy_in_price: null,
                sell_out_price: null,
                order: null,
                is_default: 0,
                quick_cash: []
            },
            url: null,
            imgQuickCashUrl: null,
            deleteQuickCashImage: [],
            listItems: {},
            disabledIsDefault: false
        };
    },
    watch: {
        modalType: {
            handler(val) {
                if (val == 1) {
                    this.modal = true;
                    this.url = "/currency/store";
                } else if (val == 2) {
                    this.modal = true;

                    this.imgQuickCashUrl = "/images/quick_cash/";

                    this.setData();
                    this.url = "/currency/update";
                }
            },
            immediate: true
        }
    },
    computed: {
        ...mapGetters({}),
        modalOk() {
            return this.modalType == 1
                ? this.$t("save")
                : this.modalType == 2
                ? this.$t("update")
                : `${this.$t("wait")}...`;
        },
        orderTitle() {
            return this.$i18n.locale == "en"
                ? "Order"
                : this.$i18n.locale == "kh"
                ? "លេខរៀង"
                : "";
        }
    },
    created() {},
    methods: {
        onSubmit() {
            let vm = this;
            this.$validator.validateAll().then(result => {
                if (result) {
                    let input = JSON.parse(JSON.stringify(this.form));
                    axios
                        .post(this.url, input)
                        .then(function(response) {
                            if (response.status === 200) {
                                vm.$store.dispatch(
                                    "setCurrency",
                                    response.data.combo_list
                                );
                                vm.listItems = response.data.data;

                                //Set New Default Currency
                                if (vm.listItems.is_default == 1) {
                                    vm.$store.dispatch(
                                        "setDefaultCurrency",
                                        vm.listItems
                                    );
                                }
                                vm.clearForm();

                                vm.$notify({
                                    group: "message",
                                    type: "success",
                                    title: vm.$t("currency"),
                                    text: vm.$t("done")
                                });

                                window.location.reload();
                            }
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                } else {
                    vm.$notify({
                        group: "message",
                        type: "warning",
                        title: vm.$t("currency"),
                        text: vm.$t("validation_failed")
                    });
                }
            });
        },
        clearForm() {
            this.form = {};
            this.imgQuickCashUrl = null;
            this.deleteQuickCashImage = [];

            this.$nextTick(() => {
                this.$validator.reset();
            });

            this.$emit("closeModal", this.listItems);
            this.modal = false;
            this.listItems = {};
        },
        setData() {
            this.form = Object.assign(
                {},
                JSON.parse(JSON.stringify(this.formItem))
            );

            // this.form.quick_cash.map(obj => {
            //     if (this.$helpers.nullToVoid(obj.image) != "") {
            //         obj.image = this.imgQuickCashUrl + obj.image;
            //         obj.old_image = obj.image;
            //     }
            //     return obj;
            // });

            if (this.formItem.is_default == 1) {
                this.disabledIsDefault = true;
            } else {
                this.disabledIsDefault = false;
            }
        },
        addQuickCash() {
            this.form.quick_cash.push({
                id: null,
                currency_id: null,
                image: null,
                old_image: null,
                amount: null,
                order: 0
            });
        },
        removeQuickCash(index) {
            if (
                this.$helpers.nullToVoid(
                    this.form.quick_cash[index].old_image
                ) != ""
            ) {
                this.deleteQuickCashImage.push(this.form.quick_cash[index]);
            }

            this.$delete(this.form.quick_cash, index);
        },
        chooseImage($event, index) {
            this.$refs.fileInput[index].click();
        },
        onFileChange($event, index) {
            let vm = this;
            const files = $event.target.files || $event.dataTransfer.files;
            if (files[0]) {
                if (files[0].size > 2 * 5120 * 5120) {
                    return;
                }
                var reader = new FileReader();
                reader.onload = function(e) {
                    vm.form.quick_cash[index].image = "";
                    vm.form.quick_cash[index].image = e.target.result;
                };
                reader.readAsDataURL(files[0]);
            }
        }
    }
};
</script>

<style scoped>
/deep/ .custom-modal {
    border-radius: 15px;
}
</style>
