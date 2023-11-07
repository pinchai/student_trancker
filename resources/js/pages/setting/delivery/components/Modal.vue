<template>
    <b-modal
        id="modal"
        v-model="modal"
        hide-header
        scrollable
        centered
        no-close-on-backdrop
        no-close-on-esc
        hide-header-close
        content-class="custom-modal"
        >
        <div class="d-block">
                <b-form-group
                    :invalid-feedback="veeErrors.first('name')"
                    :label="$t('name') + ' *'"
                    label-class="control-label"
                    class="text-left"
                >
                    <b-form-input
                        v-model="form.name"
                        v-validate="'required|max:20'"
                        :state="veeErrors.has('name') ? false : null"
                        data-vv-name="name"
                        :data-vv-as="$t('delivery')"
                        type="text"
                        :placeholder="$t('delivery')"
                        @keydown.enter.prevent="onSubmit"
                    ></b-form-input>
                </b-form-group>
        </div>
        <template slot="modal-footer">
                <b-button variant="outline-danger" @click="clearForm" class="float-right">
                    <i class="fas fa-times-circle mr-1"></i>
                    {{ $t('close') }}</b-button>
                <b-button type="submit" variant="outline-primary" class="float-right ml-2" @click.prevent="onSubmit">
                    <i class="fas fa-save mr-1" v-if="modalType == 1"></i>
                    <i class="fa fa-edit mr-1" v-if="modalType == 2"></i>
                    {{ modalOk }}</b-button>
        </template>
    </b-modal>
</template>

<script>
    import { mapGetters } from 'vuex';
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
        data(){
            return{
                modal:true,
                data: 'hello',
                form: {
                    name: null,
                },
                url: null,
                listItems: {}
            }
        },
        computed: {
            ...mapGetters({
            }),
            modalOk() {
                return this.modalType == 1 ? this.$t('save')
                : (this.modalType == 2 ? this.$t('update')
                : `${this.$t('wait')}...`)
            },
        },
        watch: {
            modalType: {
                handler(val) {
                    if (val == 1){
                        this.modal = true;
                        this.url = '/delivery/store';
                    }else if (val == 2){
                        this.modal = true;
                        this.setData();
                        this.url = '/delivery/edit';
                    }
                },
                immediate: true,
            },
        },
        created(){
        },
        methods:{
            onSubmit() {
                this.$validator.validateAll().then((result) => {
                    let vm = this;
                    if (result) {
                        axios.post(this.url, this.form).then(function (response) {
                            vm.listItems = response.data.data
                            vm.clearForm()
                            vm.$notify({
                                group: 'message',
                                type: 'success',
                                title: vm.$t('delivery'),
                                text: vm.$t('done')
                            });
                        }).catch(function (error) {
                            console.log(error)
                        });
                    }else{
                        vm.$notify({
                            group: 'message',
                            type: 'warning',
                            title: vm.$t('delivery'),
                            text: vm.$t('validation_failed')
                        });
                    }
                });
            },
            clearForm() {
                this.form = {}
                this.$nextTick(() => {
                    this.$validator.reset();
                });
                this.$emit('closeModal', this.listItems);
                this.modal = false
                this.listItems = {}
            },
            validateState(ref) {
                if (
                    this.veeFields[ref] &&
                    (this.veeFields[ref].dirty || this.veeFields[ref].validated)
                ) {
                    return !this.veeErrors.has(ref);
                }
                return null;
            },
            setData() {
                this.form = Object.assign({}, this.formItem)
            },
        }
    }
</script>

<style scoped>
   /deep/ .custom-modal{
        border-radius: 15px;
    }
</style>
