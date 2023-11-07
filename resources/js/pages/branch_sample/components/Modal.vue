<template>
    <b-modal
        id="modal"
        ref="branchModal"
        v-model="modal"
        centered
        size="xl"
        no-close-on-backdrop
        no-close-on-esc
        :title="modalHeader"
        hide-header-close
    >
        <b-container fluid>
            <b-row>
                <b-col cols="12" md="12" lg="3">
                    <b-col cols="12" class="text-center">
                        <div v-if="$helpers.nullToVoid(form.logo) == ''">
                            <b-icon
                                id="logo"
                                icon="card-image"
                                style="
                                    width: 170px;
                                    height: 170px;
                                    color: rgba(0, 0, 0, 0.54);
                                "
                            />
                        </div>
                        <div v-else style="margin-bottom: 20px">
                            <b-img
                                :src="this.imgUrl + this.form.logo"
                                alt="Logo"
                                width="155"
                                height="155"
                                rounded
                                style="margin-top: 20px"
                            />
                        </div>
                    </b-col>

                    <b-col cols="12" class="text-center mb-4">
                        <b-button
                            variant="outline-primary"
                            @click="chooseImage"
                            >{{ $t('choose_file') }}</b-button
                        >
                        <input
                            ref="fileInput"
                            style="display: none"
                            type="file"
                            accept=".png, .jpg"
                            :multiple="false"
                            @change="onFileChange"
                        />
                    </b-col>
                </b-col>
                <b-col cols="12" md="12" lg="9">
                    <b-row>
                        <b-col md="12" xl="6">
                            <b-form-group :label="$t('code')" label-for="code">
                                <b-form-input
                                    id="code"
                                    v-model="form.code"
                                    type="text"
                                    readonly
                                    :placeholder="$t('code')"
                                />
                            </b-form-group>
                        </b-col>
                        <b-col md="12" xl="6">
                            <b-form-group
                                :invalid-feedback="veeErrors.first('company')"
                                :state="!veeErrors.has('company')"
                                :label="$t('company')"
                                label-for="company"
                                class="required"
                                label-class="control-label"
                            >
                                <b-form-select
                                    id="company"
                                    v-model="form.company_id"
                                    v-validate="'required'"
                                    :state="
                                        veeErrors.has('company') ? false : null
                                    "
                                    data-vv-name="company"
                                    required
                                    :disabled="authLevel <= userLevel.COMPANY"
                                >
                                    <template slot="first">
                                        <option :value="null" disabled>
                                            {{ $t('company') }}
                                        </option>
                                    </template>
                                    <option
                                        v-for="company in companies"
                                        :key="company.value"
                                        :value="company.value"
                                    >
                                        {{ company.text | getNameByLocal }}
                                    </option>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col md="12" xl="6">
                            <b-form-group
                                :invalid-feedback="
                                    veeErrors.first('local name')
                                "
                                :state="!veeErrors.has('local name')"
                                :label="$t('local_name')"
                                label-for="local name"
                                class="required"
                                label-class="control-label"
                            >
                                <b-form-input
                                    v-model="form.branch_local_name"
                                    v-validate="'required|max:50'"
                                    :state="
                                        veeErrors.has('local name')
                                            ? false
                                            : null
                                    "
                                    data-vv-name="local name"
                                    type="text"
                                    required
                                    :placeholder="$t('local_name')"
                                    @keydown.enter="save"
                                />
                            </b-form-group>
                        </b-col>
                        <b-col md="12" xl="6">
                            <b-form-group
                                :invalid-feedback="
                                    veeErrors.first('latin name')
                                "
                                :state="!veeErrors.has('latin name')"
                                :label="$t('latin_name')"
                                label-for="latin name"
                                class="required"
                                label-class="control-label"
                            >
                                <b-form-input
                                    v-model="form.branch_latin_name"
                                    v-validate="'required|max:50'"
                                    :state="
                                        veeErrors.has('latin name')
                                            ? false
                                            : null
                                    "
                                    data-vv-name="latin name"
                                    type="text"
                                    required
                                    :placeholder="$t('latin_name')"
                                    @keydown.enter="save"
                                />
                            </b-form-group>
                        </b-col>
                        <b-col md="12" xl="4">
                            <b-form-group
                                :invalid-feedback="veeErrors.first('phone')"
                                :state="!veeErrors.has('phone')"
                                :label="$t('phone')"
                                label-for="phone"
                                label-class="control-label"
                            >
                                <b-form-input
                                    id="phone"
                                    v-model="form.phone"
                                    v-validate="'min:9|max:14'"
                                    :state="
                                        veeErrors.has('phone') ? false : null
                                    "
                                    data-vv-name="phone"
                                    type="text"
                                    required
                                    :placeholder="$t('phone')"
                                    @keydown.enter="save"
                                />
                            </b-form-group>
                        </b-col>
                        <b-col cols="4">
                            <b-form-group
                                :invalid-feedback="veeErrors.first('alt_phone')"
                                :state="!veeErrors.has('alt_phone')"
                                :label="$t('alt_phone')"
                                label-for="alt_phone"
                                label-class="control-label"
                            >
                                <b-form-input
                                    id="alt_phone"
                                    v-model="form.alt_phone"
                                    v-validate="'min:9|max:14'"
                                    :state="
                                        veeErrors.has('alt_phone')
                                            ? false
                                            : null
                                    "
                                    data-vv-name="alt_phone"
                                    type="text"
                                    required
                                    :placeholder="$t('alt_phone')"
                                    @keydown.enter="save"
                                />
                            </b-form-group>
                        </b-col>
                        <b-col cols="4">
                            <b-form-group
                                :invalid-feedback="veeErrors.first('email')"
                                :state="!veeErrors.has('email')"
                                :label="$t('email')"
                                label-for="email"
                                label-class="control-label"
                            >
                                <b-form-input
                                    v-model="form.email"
                                    v-validate="'email'"
                                    :state="
                                        veeErrors.has('email') ? false : null
                                    "
                                    data-vv-name="email"
                                    :placeholder="$t('email')"
                                    name="email"
                                    type="text"
                                    @keydown.enter="save"
                                />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group
                                :invalid-feedback="veeErrors.first('address')"
                                :state="!veeErrors.has('address')"
                                :label="$t('address')"
                                label-for="address"
                                label-class="control-label"
                            >
                                <b-form-textarea
                                    v-model="form.address"
                                    :placeholder="$t('address')"
                                    rows="3"
                                    max-rows="6"
                                ></b-form-textarea>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
        <template slot="modal-footer">
            <b-button variant="outline-secondary" @click="clearForm">
                {{ $t('cancel') }}</b-button
            >
            <b-button variant="primary" @click="save">
                {{ modalOk }}
            </b-button>
        </template>
    </b-modal>
</template>
<script>
import swal from 'sweetalert2'
import { mapGetters } from 'vuex'
export default {
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
    data() {
        return {
            form: {
                id: null,
                branch_name: null,
                phone: null,
                logo: null,
                old_logo: null,
                email: null,
                status: null,
            },
            modal: false,
            isRefresh: false,
            apiUrl: process.env.API_URL,
            imgUrl: '',
        }
    },
    computed: {
        ...mapGetters({
            user: 'auth/user',
            companies: 'company/companies',
            authBranches: 'branch/branches',
            authLevel: 'auth/authLevel',
            userLevel: 'user_type/level',
        }),
        modalHeader() {
            return this.modalType == 1
                ? this.$t('branch')
                : this.$t('branch')
        },
        modalOk() {
            return this.modalType == 1 ? this.$t('save') : this.$t('update')
        },
    },
    watch: {
        modalType: {
            handler(val) {
                if (val == 1) {
                    this.modal = true
                } else if (val == 2) {
                    this.setData()
                }
            },
            immediate: true,
        },
    },
    created() {
        if (
            this.$store.state.auth.authLevel <=
            this.$store.state.user_type.level.COMPANY
        ) {
            this.form.company_id = this.$store.state.auth.user.user_company_id
        }
    },
    methods: {
        /**
         * Insert or Update branch
         */
        save(evt) {
            let vm = this
            // prevent close popup
            evt.preventDefault()
            // check validation
            vm.$validator.validateAll().then((result) => {
                if (result) {
                    const input = this.form
                    vm.form.branch_name = vm.getFullLocalName(
                        vm.form.branch_latin_name,
                        vm.form.branch_local_name
                    )
                    let url = 'branch/store'
                    if (vm.modalType == 2) {
                        url = 'branch/update'
                    }
                    vm.$axios
                        .$post(url, input)
                        .then((response) => {
                            vm.$notify(
                                'success',
                                vm.$t('branch'),
                                vm.$t('done'),
                            );
                            vm.$store.dispatch(
                                'branch/setBranch',
                                response.branches
                            )
                            //
                            vm.isRefresh = true;
                            this.clearForm();
                        })
                        .catch((error) => {})
                } else {
                    vm.$notify(
                        'warning',
                        vm.$t('branch'),
                        vm.$t('validation_failed'),
                    );
                }
            })
        },
        setData() {
            this.form = Object.assign({}, this.formItem)
            // Start: Fomat branch name
            this.form.branch_latin_name = this.$helpers.getNameByLocal(
                this.formItem.branch_name,
                'latin_name'
            );
            this.form.branch_local_name = this.$helpers.getNameByLocal(
                this.formItem.branch_name
            );
            this.form.old_logo = this.form.logo;
            if (this.$helpers.nullToVoid(this.form.logo) != '') {
                // this.form.logo = this.apiUrl + 'images/branch/' + this.form.logo
                this.imgUrl = this.apiUrl + 'images/branch/'
            }
            this.form.location = this.form.location_local;
            this.modal = true
        },
        chooseImage() {
            this.$refs.fileInput.click()
        },
        onFileChange($event) {
            let vm = this
            const files = $event.target.files || $event.dataTransfer.files
            if (files[0]) {
                if (files[0].size > 2 * 5120 * 5120) {
                    vm.form.logo = 'https://placekitten.com/380/200'
                    return
                }
                var reader = new FileReader()
                reader.onload = function (e) {
                    vm.form.logo = '';
                    vm.imgUrl = '';
                    vm.form.logo = e.target.result
                }
                reader.readAsDataURL(files[0])
            } else {
                vm.form.logo = 'https://placekitten.com/380/200'
            }
        },
        /**
         * Get full name
         * @param {*} name
         * @param {*} local
         */
        getFullLocalName(latin, local) {
            var name = {
                latin_name: latin,
                local_name: local,
            }
            return JSON.stringify(name)
        },
        /**
         * Clear Form
         */
        clearForm() {
            this.modal = false
            this.form = Object.assign({}, this.$options.data().form)
            this.$nextTick().then(() => {
                this.veeErrors.clear()
            });
            this.$emit('closeModal', this.isRefresh);
            this.isRefresh = false
        },
    },
}
</script>
