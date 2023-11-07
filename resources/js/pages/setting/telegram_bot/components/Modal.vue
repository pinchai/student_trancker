<template>
  <b-modal
    id="modal"
    v-model="modal"
    centered
    no-close-on-backdrop
    no-close-on-esc
    hide-header-close
    size="lg"
    content-class="custom-modal"
  >
    <template slot="modal-header">
      <h3><i class="fas fa-shopping-cart"></i> {{ $t('telegram_bot') }}</h3>
    </template>
    <div class="d-block">
      <b-row>
        <b-col cols="12" lg="12" xl="12">
          <b-row>
            <!--bot_toked-->
            <b-col cols="12">
              <b-form-group
                :invalid-feedback="veeErrors.first('bot_toked')"
                :label="$t('bot_toked') + ' *'"
                label-class="control-label"
                class="text-left"
              >
                <b-form-input
                  autocomplete="off"
                  v-model="form.bot_toked"
                  v-validate="'required'"
                  :state="veeErrors.has('bot_toked') ? false : null"
                  data-vv-name="bot_toked"
                  :data-vv-as="$t('bot_toked')"
                  type="text"
                  :placeholder="$t('bot_toked')"
                  @keydown.enter.prevent="onSubmit"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <!--chat_id-->
            <b-col cols="12">
              <b-form-group
                :invalid-feedback="veeErrors.first('chat_id')"
                :label="$t('chat_id') + ' *'"
                label-class="control-label"
                class="text-left"
              >
                <b-form-input
                  autocomplete="off"
                  v-model="form.chat_id"
                  v-validate="'required'"
                  :state="veeErrors.has('chat_id') ? false : null"
                  data-vv-name="chat_id"
                  :data-vv-as="$t('chat_id')"
                  type="text"
                  :placeholder="$t('chat_id')"
                  @keydown.enter.prevent="onSubmit"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <!--action-->
            <b-col cols="12">
              <b-form-group
                :invalid-feedback="veeErrors.first('action')"
                :label="$t('action') + ' *'"
                label-class="control-label"
                class="text-left"
              >
                <b-form-input
                  disabled
                  autocomplete="off"
                  v-model="form.action"
                  v-validate="'required'"
                  :state="veeErrors.has('action') ? false : null"
                  data-vv-name="action"
                  :data-vv-as="$t('action')"
                  type="text"
                  :placeholder="$t('action')"
                  @keydown.enter.prevent="onSubmit"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>
    <template slot="modal-footer">
      <b-button variant="outline-danger" @click="clearForm" class="float-right">
        <i class="fas fa-times-circle mr-1"></i>
        {{ $t('close') }}
      </b-button>
      <b-button
        type="submit"
        variant="outline-primary"
        class="float-right ml-2"
        @click.prevent="onSubmit"
      >
        <i class="fas fa-save mr-1" v-if="modalType == 1"></i>
        <i class="fa fa-edit mr-1" v-if="modalType == 2"></i>
        {{ modalOk }}
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import {mapGetters} from 'vuex';

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
      modal: true,
      form: {
        bot_toked: null,
        chat_id: null,
        action: null,
      },
      url: null,
      worker_list: [],
      listItems: {}
    }
  },
  watch: {
    modalType: {
      handler(val) {
        if (val == 1) {
          this.modal = true;
          this.url = '/telegram_bot/store';
        } else if (val == 2) {
          this.modal = true;
          this.setData();
          this.url = '/telegram_bot/update';
        }
      },
      immediate: true,
    },
  },
  computed: {
    ...mapGetters({}),
    modalOk() {
      return this.modalType == 1 ? this.$t('save')
        : (this.modalType == 2 ? this.$t('update')
          : `${this.$t('wait')}...`)
    },
  },
  created() {
  },
  methods: {
    onSubmit() {
      let vm = this;
      this.$validator.validateAll().then((result) => {
        if (result) {
          let input = this.form

          axios.post(this.url, input).then(function (response) {
            if (response.status === 200) {
              vm.listItems = response.data.data
              vm.clearForm()

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
        } else {
          vm.$notify({
            group: 'message',
            type: 'warning',
            title: vm.$t('telegram_bot'),
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
/deep/ .custom-modal {
  border-radius: 15px;
}
</style>
