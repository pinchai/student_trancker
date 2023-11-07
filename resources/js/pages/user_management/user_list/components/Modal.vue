<template>
  <b-modal
    id="modal"
    v-model="modal"
    centered
    no-close-on-backdrop
    no-close-on-esc
    hide-header-close
    size="xl"
    content-class="custom-modal"
  >
    <template slot="modal-header">
      <h3><i class="fas fa-address-card"></i> {{ $t('user') }}</h3>
    </template>
    <div class="d-block">
      <!--select image-->
      <b-row class="mb-2">
        <b-col class="text-center">
          <div @click="chooseImage" style="cursor: pointer;">
            <div v-if="$helpers.nullToVoid(form.image) == ''">
              <i
                class="fas fa-image"
                style="font-size: 150px; color: #a0aec0"
              ></i>
            </div>
            <div v-else>
              <b-img
                :src="this.imgUrl + this.form.image"
                alt="Logo"
                width="150"
                height="150"
                rounded
              />
            </div>
            <input
              ref="fileInput"
              style="display: none"
              type="file"
              accept=".png, .jpg"
              :multiple="false"
              @change="onFileChange"
            />
          </div>
        </b-col>
      </b-row>
      <b-row>
        <!--name-->
        <b-col lg="4" md="6" sm="12" cols="6">
          <b-form-group
            :invalid-feedback="veeErrors.first('name')"
            :label="$t('name') + ' *'"
            label-class="control-label"
            class="text-left"
          >
            <b-form-input
              autocomplete="off"
              v-model="form.name"
              v-validate="'required|max:20'"
              :state="veeErrors.has('name') ? false : null"
              data-vv-name="name"
              :data-vv-as="$t('name')"
              type="text"
              :placeholder="$t('name')"
              @keydown.enter.prevent="onSubmit"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <!--email-->
        <b-col lg="4" md="6" sm="12" cols="6">
          <b-form-group
            :invalid-feedback="veeErrors.first('email')"
            :label="$t('email') + ' *'"
            label-class="control-label"
            class="text-left"
          >
            <b-form-input
              autocomplete="off"
              v-model="form.email"
              v-validate="'required|email'"
              :state="veeErrors.has('email') ? false : null"
              data-vv-name="email"
              :data-vv-as="$t('email')"
              type="email"
              :placeholder="$t('email')"
              @keydown.enter.prevent="onSubmit"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <!--password-->
        <b-col lg="4" md="6" sm="12" cols="6">
          <b-form-group
            :invalid-feedback="veeErrors.first('password')"
            :label="$t('password') + ' *'"
            label-class="control-label"
            class="text-left"
          >
            <b-form-input
              v-model="form.password"
              autocomplete="off"
              v-validate="modalType == 2 ? 'min:8|max:191' : 'required|min:8|max:191'"
              :state="veeErrors.has('password') ? false : null"
              data-vv-name="password"
              :data-vv-as="$t('password')"
              :type="showPasswordIcon ? 'text' : 'password'"
              :placeholder="$t('password')"
              @keydown.enter.prevent="onSubmit"
            ></b-form-input>
            <i
              :class="showPasswordIcon ? 'fas fa-eye' : 'fas fa-eye-slash'"
              class="password-icon"
              @click="showPasswordIcon = !showPasswordIcon"
            ></i>
          </b-form-group>
        </b-col>
        <!--confirm_password-->
        <b-col lg="4" md="6" sm="12" cols="6">
          <b-form-group
            :invalid-feedback="veeErrors.first('confirm_password')"
            :label="$t('confirm_password') + ' *'"
            label-class="control-label"
            class="text-left"
          >
            <b-form-input
              v-model="confirm_password"
              autocomplete="off"
              v-validate="modalType == 2 ? ($helpers.nullToVoid(form.password) != '' ? `required|min:8|max:191|confirmed:${form.password}` : `min:8|max:191|confirmed:${form.password}`) : `required|min:8|max:191|confirmed:${form.password}`"
              :state="veeErrors.has('confirm_password') ? false : null"
              data-vv-name="confirm_password"
              :data-vv-as="$t('confirm_password')"
              :type="showConfirmPasswordIcon ? 'text' : 'password'"
              :placeholder="$t('confirm_password')"
              @keydown.enter.prevent="onSubmit"
            ></b-form-input>
            <i
              :class="showConfirmPasswordIcon ? 'fas fa-eye' : 'fas fa-eye-slash'"
              class="password-icon"
              @click="showConfirmPasswordIcon = !showConfirmPasswordIcon"
            ></i>
          </b-form-group>
        </b-col>
        <!--branch-->
        <b-col lg="4" md="6" sm="12" cols="6">
          <b-form-group
            :invalid-feedback="veeErrors.first('branch')"
            :label="$t('branch') + ' *'"
            label-class="control-label"
            class="text-left"
          >
            <b-select
              v-model="form.branch_id"
              v-validate="'required'"
              :state="veeErrors.has('branch') ? false : null"
              data-vv-name="branch"
              :data-vv-as="$t('branch')"
              :options="branch"
              text-field="name"
              value-field="id"
            >
              <template slot="first">
                <b-form-select-option :value="null" disabled>{{ $t('branch') }}</b-form-select-option>
              </template>
            </b-select>

          </b-form-group>
        </b-col>
        <!--status-->
        <b-col lg="4" md="6" sm="12" cols="6">
          <b-form-group
            :invalid-feedback="veeErrors.first('status')"
            :label="$t('status') + ' *'"
            label-class="control-label"
            class="text-left"
          >
            <b-select
              v-model="form.status"
            >
              <b-form-select-option value="0">{{ $t('disabled') }}</b-form-select-option>
              <b-form-select-option value="1">{{ $t('enabled') }}</b-form-select-option>
            </b-select>
          </b-form-group>
        </b-col>
        <!--user_type-->
        <b-col lg="4" md="6" sm="12" cols="6">
          <b-form-group
            :invalid-feedback="veeErrors.first('user_type')"
            :label="$t('user_type') + ' *'"
            label-class="control-label"
            class="text-left"
          >
            <b-select
              v-model="form.user_type_id"
              v-validate="'required'"
              :state="veeErrors.has('user_type') ? false : null"
              data-vv-name="user_type"
              :data-vv-as="$t('user_type')"
              :options="getUserType()"
              text-field="type"
              value-field="id"
              @change="fetchRole(form.user_type_id)"
            >
              <template slot="first">
                <b-form-select-option :value="null" disabled>{{ $t('user_type') }}</b-form-select-option>
              </template>
            </b-select>

          </b-form-group>
        </b-col>
        <!--role-->
        <b-col lg="4" md="6" sm="12" cols="6">
          <b-form-group
            :invalid-feedback="veeErrors.first('role')"
            :label="$t('role') + ' *'"
            label-class="control-label"
            class="text-left"
          >
            <b-select
              v-model="form.role_id"
              v-validate="'required'"
              :state="veeErrors.has('role') ? false : null"
              data-vv-name="role"
              :data-vv-as="$t('role')"
              :options="role"
              text-field="name"
              value-field="id"
              :disabled="form.user_type_id != null && form.user_type_id != 4 ? false : true"
            ></b-select>

          </b-form-group>
        </b-col>
        <!--Custom permission-->
        <b-col lg="4" md="6" sm="12" cols="12">
          <b-card>
            <b-card-header>
              <h3 style="text-transform: uppercase"><i class="fas fa-unlock-alt"></i> VIP Permission</h3>
            </b-card-header>
            <b-card-body>
              <b-row>
                <b-col
                  cols="12"
                  v-for="(item, index) in custom_module_permission"
                  :key="'custom_module_permission_'+index"
                >
                  <b-form-group
                    :label="$t(item.module_key)"
                  >
                    <b-form-checkbox-group
                      v-model="item.selected_custom_permission"
                      :options="item.custom_permission"
                      name="flavour-2a"
                      switches
                      stacked
                    ></b-form-checkbox-group>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
    <template slot="modal-footer">
      <b-button variant="outline-danger" @click="clearForm" class="float-right">
        <i class="fas fa-times-circle mr-1"></i>
        {{ $t('close') }}
      </b-button>
      <b-button type="submit" variant="outline-primary" class="float-right ml-2" @click.prevent="onSubmit">
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
        id: null,
        name: null,
        email: 'sample@mail.com',
        password: null,
        role_id: null,
        user_type_id: null,
        position_id: null,
        branch_id: null,
        image: null,
        old_image: null,
        status: 1,
        annual_leave_amount: 0,
        salary: 0,
        leader: [],
        chat_id: null,
      },
      url: null,
      confirm_password: null,
      showPasswordIcon: false,
      showConfirmPasswordIcon: false,
      role: [],
      imgUrl: '/images/user/',
      listItems: {},
      custom_module_permission: null,
      userLists: []
    }
  },
  watch: {
    modalType: {
      async handler(val) {
        if (val == 1) {
          this.modal = true;
          this.url = '/user/store';
          await this.getUsers()
        } else if (val == 2) {
          this.modal = true;
          this.setData();
          this.url = '/user/edit';
        }
      },
      immediate: true,
    },
  },
  computed: {
    ...mapGetters({
      branch: 'getBranch',
      user_type: 'getUserType',
      positions: 'getPosition',
    }),
    modalOk() {
      return this.modalType == 1 ? this.$t('save')
        : (this.modalType == 2 ? this.$t('update')
          : `${this.$t('wait')}...`)
    },
  },
  created() {},
  methods: {
    getUserType() {
      return this.user_type.filter(obj => obj.id != 1)
    },
    fetchRole(userTypeId) {
      let vm = this
      let input = {
        user_type_id: userTypeId,
        user_id: vm.form.id
      }

      this.showOverlay = !this.showOverlay;

      axios.post('/role/get_by_user_type', input).then(function (response) {
        vm.showOverlay = !vm.showOverlay;
        vm.role = response.data.data;

        //cashier role
        if (vm.form.user_type_id == 4) {
          vm.form.role_id = vm.role[0].id
        }

        response.data.custom_module_permission.map(obj=>{
          if (vm.$helpers.nullToVoid(obj.custom_permission, '') != ''){
            obj.custom_permission = (obj.custom_permission).split(",");
          }else {
            obj.custom_permission = []
          }
        })
        vm.custom_module_permission = response.data.custom_module_permission;
      }).catch(function (error) {
        console.log(error)
      });
    },
    onSubmit() {
      this.$validator.validateAll().then((result) => {
        let vm = this;
        if (result) {
          let input = this.form

          input.password = this.confirm_password
          input.custom_module_permission = this.custom_module_permission

          axios.post(this.url, input).then(function (response) {
            if (response.status === 200) {
              vm.listItems = response.data.data
              vm.clearForm()

              vm.$notify({
                group: 'message',
                type: 'success',
                title: vm.$t('user_list'),
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
            title: vm.$t('user_list'),
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
    async setData() {

      await this.getUsers()
      this.formItem.leader = this.userLists.find(obj=>{
        return obj.id == this.formItem.leader_id
      })
      this.form = Object.assign({}, this.formItem)
      // console.log(this.form.leader)
      this.form.old_image = this.formItem.image
      this.fetchRole(this.form.user_type_id)
    },
    chooseImage() {
      this.$refs.fileInput.click()
    },
    onFileChange($event) {
      let vm = this
      const files = $event.target.files || $event.dataTransfer.files
      if (files[0]) {
        if (files[0].size > 2 * 5120 * 5120) {
          vm.form.image = '/assets/img/no-image.png'
          return
        }
        var reader = new FileReader()
        reader.onload = function (e) {
          vm.form.image = '';
          vm.imgUrl = '';
          vm.form.image = e.target.result
        }
        reader.readAsDataURL(files[0])
      } else {
        vm.form.image = '/assets/img/no-image.png'
      }
    },
    async getUsers() {
      let vm = this;
      this.showOverlay = !this.showOverlay;
      const input = {};
      await axios.post("/user/get", input).then(function (response) {
        vm.showOverlay = !vm.showOverlay;
        vm.userLists = response.data.data;
      }).catch(function (error) {
        console.log(error);
      });
    },
  }
}
</script>

<style scoped>
.password-icon {
  position: absolute;
  top: 43px;
  right: 24px;
  cursor: pointer;
}

/deep/ .custom-modal {
  border-radius: 15px;
}
</style>
