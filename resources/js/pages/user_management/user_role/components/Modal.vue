<template>
  <b-modal
    id="modal"
    v-model="modal"
    scrollable
    centered
    no-close-on-backdrop
    no-close-on-esc
    hide-header-close
    size="xl"
    content-class="custom-modal"
  >
    <template slot="modal-header">
      <h3><i class="fas fa-user-lock"></i> {{ $t("user_role") }}</h3>
    </template>
    <div class="d-block">
      <b-row>
        <b-col cols="4">
          <b-form-group
            :invalid-feedback="veeErrors.first('name')"
            :label="$t('name') + ' *'"
            label-class="control-label"
            class="text-left"
          >
            <b-form-input
              v-model="form.name"
              v-validate="'required|max:191'"
              :state="veeErrors.has('name') ? false : null"
              data-vv-name="name"
              :data-vv-as="$t('name')"
              type="text"
              :placeholder="$t('name')"
              @keydown.enter.prevent="onSubmit"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group
            :invalid-feedback="veeErrors.first('user_type')"
            :label="$t('user_type') + ' *'"
            label-class="control-label"
            class="text-left"
          >
            <b-form-select
              v-model="form.user_type_id"
              v-validate="'required'"
              :state="veeErrors.has('user_type') ? false : null"
              data-vv-name="user_type"
              :data-vv-as="$t('user_type')"
              type="text"
              :placeholder="$t('user_type')"
              :options="getUserType()"
              value-field="id"
              text-field="type"
            >
              <template slot="first">
                <option :value="null" disabled>
                  {{ $t("user_type") }}
                </option>
              </template>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group
            :invalid-feedback="veeErrors.first('description')"
            :label="$t('description')"
            class="text-left"
          >
            <b-form-input
              v-model="form.description"
              v-validate="'max:191'"
              :state="veeErrors.has('description') ? false : null"
              data-vv-name="description"
              :data-vv-as="$t('description')"
              type="text"
              :placeholder="$t('description')"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="mt-2 mb-3">
        <b-col>
          <h4>{{ $t("module_permission") }}:</h4>
          <b-container>
            <div id="permissionsTable">
              <b-row class="headerRow" style="position: sticky; top: -20px; z-index: 1000">
                <b-col class="p-0">{{ $t("module") }}</b-col>
                <b-col class="p-0">
                  <b-form-checkbox
                    v-if="false"
                    v-model="chkCreateAll"
                    @change="toggleCreateAll"
                    size="md"
                  >
                    <span class="ml-2 text-white">
                      {{ $t("create") }}
                    </span>
                  </b-form-checkbox>
                  <span class="text-white">
                      {{ $t("create") }}
                  </span>
                </b-col>
                <b-col class="p-0">
                  <b-form-checkbox
                    v-if="false"
                    v-model="chkUpdateAll"
                    @change="toggleUpdateAll"
                    size="md"
                  >
                    <span class="ml-2 text-white">
                      {{ $t("update") }}
                    </span>
                  </b-form-checkbox>
                  <span class="text-white">
                    {{ $t("update") }}
                  </span>
                </b-col>
                <b-col class="p-0">
                  <b-form-checkbox
                    v-if="false"
                    v-model="chkDeleteAll"
                    @change="toggleDeleteAll"
                    size="md"
                  >
                    <span class="ml-2 text-white">
                      {{ $t("delete") }}
                    </span>
                  </b-form-checkbox>
                  <span class="text-white">
                    {{ $t("delete") }}
                  </span>
                </b-col>
                <b-col class="p-0">
                  <b-form-checkbox
                    v-if="false"
                    v-model="chkViewAll"
                    @change="toggleViewAll"
                    size="md"
                  >
                    <span class="ml-2 text-white">
                      {{ $t("view") }}
                    </span>
                  </b-form-checkbox>
                  <span class="text-white">
                    {{ $t("view") }}
                  </span>
                </b-col>
              </b-row>
              <b-row
                v-for="(moduleItem, index) in customModuleItems"
                :key="index"
                class="bodyRow"
              >
                <b-col
                  v-if="moduleItem.is_head_title"
                  style="font-weight: bold"
                >
                  {{ $t(moduleItem.menu_title) }}
                </b-col>
                <b-col v-if="!moduleItem.is_head_title">
                  <div
                    :class="moduleItem.featured != 0 ? '' : 'child-menu'"
                  >
                    {{ moduleItem.module_key == "product_category" ? $t("category") : $t(moduleItem.module_key) }}
                  </div>
                </b-col>

                <b-col v-if="!moduleItem.is_head_title">
                  <b-form-checkbox
                    v-model="chkCreate"
                    :value="moduleItem.module_id + '_' + moduleItem.create"
                    :disabled="!moduleItem.permission.includes(moduleItem.create)"
                    size="md"
                  />
                </b-col>
                <b-col v-if="!moduleItem.is_head_title">
                  <b-form-checkbox
                    v-model="chkUpdate"
                    :value="moduleItem.module_id +'_' +moduleItem.update"
                    :disabled="!moduleItem.permission.includes(moduleItem.update)"
                    size="md"
                  />
                </b-col>
                <b-col v-if="!moduleItem.is_head_title">
                  <b-form-checkbox
                    v-model="chkDelete"
                    :value="moduleItem.module_id + '_' +moduleItem.delete"
                    :disabled="!moduleItem.permission.includes(moduleItem.delete)"
                    size="md"
                  />
                </b-col>
                <b-col v-if="!moduleItem.is_head_title">
                  <b-form-checkbox
                    v-model="chkView"
                    :value="moduleItem.module_id + '_' + moduleItem.view"
                    :disabled="!moduleItem.permission.includes(moduleItem.view)"
                    size="md"
                  />
                </b-col>
              </b-row>
            </div>
          </b-container>
        </b-col>
      </b-row>
    </div>

    <template slot="modal-footer">
      <b-button
        variant="outline-danger"
        @click="clearForm"
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
        <i class="fas fa-save mr-1" v-if="modalType == 1"></i>
        <i class="fa fa-edit mr-1" v-if="modalType == 2"></i>
        {{ modalOk }}
      </b-button
      >
    </template>
  </b-modal>
</template>

<script>
import {mapGetters} from "vuex";

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
        name: null,
        description: null,
        user_type_id: null
      },
      url: null,
      chkCreateAll: false,
      chkUpdateAll: false,
      chkDeleteAll: false,
      chkViewAll: false,
      chkCreate: [],
      chkUpdate: [],
      chkDelete: [],
      chkView: [],
      listItems: {},
      customModuleItems: []
    };
  },
  watch: {
    modalType: {
      handler(val) {
        if (val == 1) {
          this.modal = true;
          this.url = "/role/store";
        } else if (val == 2) {
          this.modal = true;
          this.url = "/role/edit";
          this.setData();
          this.getDataByRoleID();
        }
      },
      immediate: true
    },
    chkCreate(newVal, oldVal) {
      if (newVal.length === 0) {
        this.chkCreateAll = false;
      } else if (newVal.length === this.moduleItems.length) {
        this.chkCreateAll = true;
      } else {
        this.chkCreateAll = false;
      }
    },
    chkUpdate(newVal, oldVal) {
      if (newVal.length === 0) {
        this.chkUpdateAll = false;
      } else if (newVal.length === this.moduleItems.length) {
        this.chkUpdateAll = true;
      } else {
        this.chkUpdateAll = false;
      }
    },
    chkDelete(newVal, oldVal) {
      if (newVal.length === 0) {
        this.chkDeleteAll = false;
      } else if (newVal.length === this.moduleItems.length) {
        this.chkDeleteAll = true;
      } else {
        this.chkDeleteAll = false;
      }
    },
    chkView(newVal, oldVal) {
      if (newVal.length === 0) {
        this.chkViewAll = false;
      } else if (newVal.length === this.moduleItems.length) {
        this.chkViewAll = true;
      } else {
        this.chkViewAll = false;
      }
    },
    "form.user_type_id": {
      handler(val) {
        //Get Only Module not equal user management
        if (val == this.$store.state.permission.USER) {
          this.customModuleItems = this.customModuleItems.filter(
            obj => {
              return obj.module_key.indexOf("user_") === -1;
            }
          );
        } else {
          this.setCustomModuleItem();
        }
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters({
      user_type: "getUserType",
      moduleItems: "getModuleItems"
    }),
    modalOk() {
      return this.modalType == 1
        ? this.$t("save")
        : this.modalType == 2
          ? this.$t("update")
          : `${this.$t("wait")}...`;
    }
  },
  methods: {
    setCustomModuleItem() {
      let vm = this;
      let item = [];

      this.moduleItems.forEach(obj => {
        if (vm.$helpers.nullToVoid(obj.menu_title) != "") {
          let input = Object.assign({}, obj);
          input.is_head_title = true;
          item.push(input);
        }
        item.push(obj);
      });

      this.customModuleItems = item;
    },
    getUserType() {
      return this.user_type.filter(
        obj =>
          obj.id != this.$store.state.permission.DEV &&
          obj.id != this.$store.state.permission.CASHIER
      );
    },
    onSubmit() {
      let vm = this;
      this.$validator.validateAll().then(result => {
        if (result) {
          // check module and permission
          if (this.chkView.length === 0) {
            vm.$fire({
              position: "top-end",
              type: "warning",
              title: vm.$t("at_least_view_one_module"),
              showConfirmButton: false,
              backdrop: false,
              toast: true,
              background: "#f0ad4e",
              timer: 2500
            });
          } else {
            let input = this.form;

            input.role_permission = vm.mergeRolePermission();

            axios
              .post(this.url, input)
              .then(function (response) {
                if (response.status === 200) {
                  vm.listItems = response.data.data;
                  vm.clearForm();

                  vm.$notify({
                    group: "message",
                    type: "success",
                    title: vm.$t("user_role"),
                    text: vm.$t("done")
                  });
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        } else {
          vm.$notify({
            group: "message",
            type: "warning",
            title: vm.$t("user_role"),
            text: vm.$t("validation_failed")
          });
        }
      });
    },
    clearForm() {
      this.form = {};

      this.$nextTick(() => {
        this.$validator.reset();
      });

      this.$emit("closeModal", this.listItems);
      this.modal = false;
      this.listItems = {};
    },
    setData() {
      this.form = Object.assign({}, this.formItem);
      this.setCustomModuleItem();
    },
    getDataByRoleID() {
      let vm = this;
      const input = {
        role_id: this.formItem.id
      };
      axios
        .post("/role/get_update", input)
        .then(function (response) {
          vm.splitRolePermission(response.data.data.role_permission);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    toggleCreateAll(checked) {
      let vm = this;
      this.chkCreate = [];
      if (checked) {
        this.customModuleItems.forEach(obj => {
          vm.chkCreate.push(obj.module_id + "_" + obj.create);
        });
      }
    },
    toggleUpdateAll(checked) {
      let vm = this;
      this.chkUpdate = [];
      if (checked) {
        this.customModuleItems.forEach(obj => {
          vm.chkUpdate.push(obj.module_id + "_" + obj.update);
        });
      }
    },
    toggleDeleteAll(checked) {
      let vm = this;
      this.chkDelete = [];
      if (checked) {
        this.customModuleItems.forEach(obj => {
          vm.chkDelete.push(obj.module_id + "_" + obj.delete);
        });
      }
    },
    toggleViewAll(checked) {
      let vm = this;
      this.chkView = [];
      if (checked) {
        this.customModuleItems.forEach(obj => {
          vm.chkView.push(obj.module_id + "_" + obj.view);
        });
      }
    },
    /** Merge view, create, update, delete module */
    mergeRolePermission() {
      let roleModules = [];
      let arr = [];
      arr.push(
        ...this.chkCreate,
        ...this.chkUpdate,
        ...this.chkDelete,
        ...this.chkView
      );
      var uniqueValue = [];
      $.each(arr, function (i, el) {
        if ($.inArray(el, uniqueValue) === -1) uniqueValue.push(el);
      });
      arr = uniqueValue;
      arr.forEach(obj => {
        obj = obj.split("_").map(obj => parseInt(obj));
        roleModules.push({
          module_id: obj[0],
          permission_id: obj[1]
        });
      });

      //Return Only Module not equal user management
      if (this.form.user_type_id == this.$store.state.permission.USER) {
        //Get user management modules
        let modules = this.moduleItems.filter(obj => {
          return obj.module_key.indexOf("user_") > -1;
        });

        //Find index user management in roleModules and delete
        if (modules.length > 0) {
          modules.map(item => {
            let index = roleModules.findIndex(
              obj => obj.module_id == item.module_id
            );

            if (index > -1) {
              roleModules.splice(index, 1);
            }
          });
        }
      }

      return roleModules;
    },
    /**
     *  Split view, create, update, delete module
     */
    splitRolePermission(data) {
      let vm = this;
      this.chkCreate = [];
      this.chkUpdate = [];
      this.chkDelete = [];
      this.chkView = [];

      data.forEach(obj => {
        if (obj.permission_id == 1) {
          vm.chkCreate.push(obj.module_id + "_" + obj.permission_id);
        } else if (obj.permission_id == 2) {
          vm.chkUpdate.push(obj.module_id + "_" + obj.permission_id);
        } else if (obj.permission_id == 3) {
          vm.chkDelete.push(obj.module_id + "_" + obj.permission_id);
        } else if (obj.permission_id == 4) {
          vm.chkView.push(obj.module_id + "_" + obj.permission_id);
        }
      });
    }
  }
};
</script>

<style scoped>
.headerRow {
  padding: 0.75rem;
  background-color: #3b3f5c;
  color: #ffffff;
  font-weight: bold;
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
}

.bodyRow {
  padding: 0.75rem;
  border-top: 1px solid #dee2e6;
}

.child-menu {
  margin-left: 20px;
}

/deep/ .custom-modal {
  border-radius: 15px;
}
</style>
