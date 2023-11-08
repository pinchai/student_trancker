<template>
    <b-modal
        id="modal"
        v-model="modal"
        centered
        no-close-on-backdrop
        no-close-on-esc
        hide-header-close
        size="md"
        content-class="custom-modal"
    >
        <template slot="modal-header">
            <h3><i class="fas fa-handshake"></i> {{ $t('group') }}</h3>
        </template>
        <div class="d-block" >
            <b-row>
                <b-col cols="12" lg="12" xl="12">
                     <b-row>
                         <!--name-->
                        <b-col cols="12">
                            <b-form-group
                                :label="$t('name')+ '*'"
                                :invalid-feedback="veeErrors.first('name')"
                                label-class="control-label"
                                class="text-left"
                            >
                                <b-form-input
                                    autocomplete="off"
                                    v-model="form.name"
                                    type="text"
                                    :placeholder="$t('name')"
                                    @keydown.enter.prevent="onSubmit"
                                    v-validate="'required'"
                                    :state="veeErrors.has('name') ? false : null"
                                    data-vv-name="name"
                                    :data-vv-as="$t('name')"
                                ></b-form-input>
                            </b-form-group>
                        </b-col>
                        <!--remark-->
                        <b-col cols="12">
                            <b-form-group
                                :label="$t('remark')"
                                label-class="control-label"
                                class="text-left"
                            >
                                <b-textarea
                                    autocomplete="off"
                                    v-model="form.remark"
                                    :placeholder="$t('remark')"
                                    rows="5"
                                ></b-textarea>
                            </b-form-group>
                        </b-col>
                     </b-row>
                </b-col>
            </b-row>
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
                modal: true,
                form: {
                    id: null,
                    name: null,
                },
                url: null,
                listItems: {}
            }
        },
        watch: {
            modalType: {
                handler(val) {
                    if (val == 1){
                        this.modal = true;
                        this.url = '/group/store';
                    }else if (val == 2){
                        this.modal = true;
                        this.setData();
                        this.url = '/group/update';
                    }
                },
                immediate: true,
            },
        },
        computed: {
            ...mapGetters({
              groups: "getGroup"
            }),
            modalOk() {
                return this.modalType == 1 ? this.$t('save')
                : (this.modalType == 2 ? this.$t('update')
                : `${this.$t('wait')}...`)
            },
        },
        created(){
        },
        methods:{
            onSubmit() {
                let vm = this;
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        let input = this.form
                        axios.post(this.url, input).then(function (response) {
                            if (response.status === 200){
                                vm.listItems = response.data.data
                                vm.clearForm()
                                vm.$notify({
                                    group: 'message',
                                    type: 'success',
                                    title: vm.$t('group'),
                                    text: vm.$t('done')
                                });
                            }
                        }).catch(function (error) {
                            console.log(error)
                        });
                    }else{
                        vm.$notify({
                            group: 'message',
                            type: 'warning',
                            title: vm.$t('group'),
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
