<template>
  <b-modal
    id="modal"
    v-model="modal"
    hide-footer
    hide-header
    scrollable
    centered
    no-close-on-backdrop
    no-close-on-esc
    hide-header-close
    :title="$t('profile')"
  >
    <div class="user-profile layout-spacing">
      <div class="widget-content widget-content-area">
        <b-row>
          <b-col cols="10">
            <h3>{{ $t("profile") }}</h3>
          </b-col>
          <b-col
            class="float-right pl-2"
            style="margin-left: -22px;"
            v-if="!showFormEdit"
          >
            <span
              class="edit-profile"
              style="cursor: pointer;"
              @click="setFormEditData"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-edit-3"
              >
                <path d="M12 20h9"></path>
                <path
                    d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
                ></path></svg
              ></span>
          </b-col>

          <b-col class="float-right">
            <span
              class="close-profile text-white"
              style="cursor: pointer;"
              @click="closeModal"
            >
              <i
                class="fas fa-times-circle"
                style="margin-top: 11px; margin-left: 2px;"
              ></i>
            </span>
          </b-col>
        </b-row>
        <div class="text-center user-info mt-2">
          <div v-if="!showFormEdit">
            <b-avatar
              size="150px"
              :src="this.imgUrl + userAuth.image"
            ></b-avatar>
          </div>

          <!-- Form Update -->
<!--          <input type="button" value="print" @click="Web2apkPrint">-->
<!--          <input type="button" value="Toast" @click="Web2apkToast">-->
<!--          <input type="button" value="NewPage" @click="Web2apkNewPage">-->

          <div
            v-if="showFormEdit"
            class="user-image-edit"
          >
            <div class='my-8'>
              <image-uploader
                :maxWidth="1200"
                :maxHeight="1200"
                :quality='0.9'
                :preview=false
                :className="['fileInput', { 'fileInput--loaded': hasImage }]"
                :capture=false
                :debug='0'
                doNotResize='gif'
                :autoRotate='false'
                outputFormat="string"
                @input='setImage'
                accept="image/*"
              >
                <label for='fileInput' slot='upload-label' style='margin: auto'>
                  <b-avatar :src="image_preview" size="10rem"></b-avatar>
                  <center>
                    <span class='upload-caption'>{{ hasImage ? 'Replace' : 'Upload' }}</span>
                  </center>
                </label>
              </image-uploader>
            </div>
          </div>
          <p class="text-uppercase" v-if="!showFormEdit">
            {{ userAuth.name }}
          </p>
        </div>
        <div class="user-info-list">
          <div>
            <ul class="contacts-block list-unstyled">
              <li
                class="contacts-block__item d-flex"
                v-if="showFormEdit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-user"
                  style="width: 24px; margin-top: 5px;"
                >
                  <path
                    d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                  />
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <b-form-group>
                  <b-form-input
                    autofocus
                    autocomplete="off"
                    v-model="form.name"
                    v-validate="'required|max:20'"
                    :state="veeErrors.has('name') ? false : null"
                    data-vv-name="name"
                    :data-vv-as="$t('name')"
                    type="text"
                    :placeholder="$t('name')"
                    @keydown.enter.prevent="onUpdate"
                    disabled
                  ></b-form-input>
                  <div
                    v-if="veeErrors.has('name')"
                    class="error-feedback"
                  >
                    {{ veeErrors.first("name") }}
                  </div>
                </b-form-group>
              </li>
              <li
                class="contacts-block__item"
                v-if="!showFormEdit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-coffee"
                >
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                  <path
                    d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"
                  ></path>
                  <line x1="6" y1="1" x2="6" y2="4"></line>
                  <line x1="10" y1="1" x2="10" y2="4"></line>
                  <line x1="14" y1="1" x2="14" y2="4"></line>
                </svg>
                <span
                  v-if="userAuth.user_type_id == $store.state.permission.DEV"
                >
                  Developer
                </span>
                <span v-else>{{ userAuth.user_type_name }}</span>
              </li>
              <li
                class="contacts-block__item mt-2 d-flex"
                v-if="!showFormEdit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-map-pin"
                >
                  <path
                    d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                  ></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{{ userAuth.branch_name }}</span>
              </li>
              <li
                class="contacts-block__item mt-2"
                v-if="!showFormEdit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-calendar"
                >
                  <rect
                    x="3"
                    y="4"
                    width="18"
                    height="18"
                    rx="2"
                    ry="2"
                  ></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>
                  {{ formatDateCreated(userAuth.created_at) }}
                    <template v-if="$i18n.locale == 'en'">
                      (Created)
                    </template>
                    <template
                      v-if="$i18n.locale == 'kh'"
                    >
                      (ថ្ងៃបង្កើត)
                    </template>
                </span>
              </li>
              <li class="contacts-block__item mt-2 d-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-mail"
                >
                  <path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  ></path>
                  <polyline
                    points="22,6 12,13 2,6"
                  ></polyline>
                </svg>
                <span v-if="!showFormEdit">{{
                    userAuth.email
                  }}</span>
                <b-form-group v-if="showFormEdit">
                  <b-form-input
                    style="margin-top: -6px;"
                    autocomplete="off"
                    v-model="form.email"
                    v-validate="'required|email'"
                    :state="veeErrors.has('email') ? false : null"
                    data-vv-name="email"
                    :data-vv-as="$t('email')"
                    type="email"
                    :placeholder="$t('email')"
                    @keydown.enter.prevent="onUpdate"
                    disabled
                  ></b-form-input>
                  <div
                    v-if="veeErrors.has('email')"
                    class="error-feedback"
                  >
                    {{ veeErrors.first("email") }}
                  </div>
                </b-form-group>
              </li>
              <li
                class="contacts-block__item mt-2 d-flex"
                v-if="showFormEdit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-lock"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <b-form-group>
                  <b-form-input
                    style="margin-top: -6px;"
                    autocomplete="off"
                    v-model="form.new_password"
                    v-validate="'min:8|max:191'"
                    :state="
                                            veeErrors.has('new_password')
                                                ? false
                                                : null
                                        "
                    data-vv-name="new_password"
                    :data-vv-as="$t('new_password')"
                    :type="
                                            showPassword == true
                                                ? 'text'
                                                : 'password'
                                        "
                    :placeholder="$t('new_password')"
                    @keydown.enter.prevent="onUpdate"
                  ></b-form-input>
                  <div
                    v-if="veeErrors.has('new_password')"
                    class="error-feedback"
                  >
                    {{ veeErrors.first("new_password") }}
                  </div>
                </b-form-group>
              </li>
              <li
                class="contacts-block__item mt-2 d-flex"
                v-if="showFormEdit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-upload-cloud"
                >
                  <polyline points="16 16 12 12 8 16"/>
                  <line x1="12" y1="12" x2="12" y2="21"/>
                  <path
                    d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"
                  />
                  <polyline points="16 16 12 12 8 16"/>
                </svg>
                <b-form-group>
                  <b-form-input
                    style="margin-top: -6px;"
                    autocomplete="off"
                    v-model="form.confirm_password"
                    v-validate="
                        $helpers.nullToVoid(
                            form.new_password
                        ) != ''
                            ? `required|min:8|max:191|confirmed:${form.new_password}`
                            : `min:8|max:191|confirmed:${form.new_password}`
                    "
                    :state="
                        veeErrors.has('confirm_password')
                            ? false
                            : null
                    "
                    data-vv-name="confirm_password"
                    :data-vv-as="$t('confirm_password')"
                    :type="
                        showPassword == true
                            ? 'text'
                            : 'password'
                    "
                    :placeholder="$t('confirm_password')"
                    @keydown.enter.prevent="onUpdate"
                  ></b-form-input>
                  <div
                    v-if="veeErrors.has('confirm_password')"
                    class="error-feedback"
                  >
                    {{ veeErrors.first("confirm_password") }}
                  </div>
                </b-form-group>
              </li>
              <li
                v-if="showFormEdit"
                class="contacts-block__item show-password-block d-flex"
              >
                <div style="margin-left: 34px; ">
                  <label
                    v-if="$i18n.locale == 'en'"
                    for="show-password"
                  >Show Password</label
                  >
                  <label
                    v-if="$i18n.locale == 'kh'"
                    for="show-password"
                  >បង្ហាញលេខសំងាត់</label
                  >
                </div>
                <b-form-checkbox
                  v-model="showPassword"
                  id="show-password"
                  switch
                  class="ml-2"
                >
                </b-form-checkbox>
              </li>
              <li
                class="contacts-block__item mt-4 "
                v-if="showFormEdit"
              >
                <div class="float-right">
                  <b-button
                    variant="outline-danger"
                    @click="clearFormEditData"
                  >
                    <i class="fas fa-times-circle mr-1"></i>
                    {{ $t("cancel") }}
                  </b-button
                  >
                  <b-button
                    type="submit"
                    variant="outline-primary"
                    class="float-right ml-2"
                    @click.prevent="onUpdate"
                  >
                    <i class="fa fa-edit mr-1"></i>
                    {{ $t("update") }}
                  </b-button
                  >
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import {mapGetters} from "vuex";
import moment from "moment";
import ImageUploader from 'vue-image-upload-resize'

export default {
  components: { ImageUploader },
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
      modal: false,
      url: null,
      showFormEdit: false,
      showPassword: false,
      imgUrl: "/images/user/",
      hasImage: false,
      image_preview: null,
      form: {
        id: null,
        name: null,
        email: null,
        new_password: null,
        confirm_password: null,
        image: null,
        old_image: null
      },
      defaultForm: {
        id: null,
        name: null,
        email: null,
        new_password: null,
        confirm_password: null,
        image: null,
        old_image: null
      }
    };
  },
  computed: {
    ...mapGetters({
      userAuth: "userAuth",
      branch_list: "getBranch"
    })
  },
  watch: {
    modalType: {
      handler(val) {
        if (val == 1) {
          this.modal = true;
        } else if (val == 2) {
          this.modal = true;
        }
      },
      immediate: true
    }
  },
  methods: {
    Web2apkPrint(){
      Website2APK.printPage();
    },
    Web2apkToast(){
      Website2APK.showToast("This is a Toast");
    },
    Web2apkNewPage(){
      Website2APK.openExternal("https://onenightsolution.biz/");
    },
    closeModal() {
      this.modal = false;
      this.$emit("closeModal", this.modal);
      this.clearFormEditData();
    },
    formatDateCreated(date) {
      let defaultFormat = "YYYY-MM-DD HH:mm:ss";
      let format = "DD, MMM, YYYY";

      return moment(date, defaultFormat).format(format);
    },
    setFormEditData() {
      if (!this.$helpers.isEmpty(this.userAuth)) {
        this.showFormEdit = true;

        this.form.id = this.userAuth.id;
        this.form.name = this.userAuth.name;
        this.form.email = this.userAuth.email;
        this.form.image = this.userAuth.image;
        this.form.old_image = JSON.parse(JSON.stringify(this.userAuth.image));
        this.image_preview = this.imgUrl+''+this.form.image
      }
    },
    clearFormEditData() {
      this.showFormEdit = false;
      this.form = Object.assign({}, this.defaultForm);
      this.imgUrl = "/images/user/";
    },
    onUpdate() {
      let vm = this;
      this.$validator.validateAll().then(result => {
        if (result) {
          axios
            .post("/user/update_profile", this.form)
            .then(function (response) {
              if (response.status === 200) {
                let user = response.data.data;
                if (!vm.$helpers.isEmpty(user)) {
                  vm.$store.dispatch("updateUserAuth", user);
                }
                vm.clearFormEditData();
                vm.$notify({
                  group: "message",
                  type: "success",
                  title: vm.$t("profile"),
                  text: vm.$t("done")
                });
              }
              vm.window.reload()
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          vm.$notify({
            group: "message",
            type: "warning",
            title: vm.$t("profile"),
            text: vm.$t("validation_failed")
          });
        }
      });
    },
    setImage(output) {
      this.hasImage = true
      this.image_preview = output
      this.form.image = output
      // console.log(output)
      // console.log('Info', output.info)
      // console.log('Exif', output.exif)
    },
  }
};
</script>

<style scoped>
/deep/ .modal-dialog-centered.modal-dialog-scrollable .modal-content {
  border-radius: 30px;
}

.widget-content-area {
  /* -webkit-box-shadow: 0 4px 6px 0 rgba(63, 60, 60, 0.09), 0 1px 20px 0 rgba(0, 0, 0, 0.08), 0px 1px 11px 0px rgba(0, 0, 0, 0.06);
-moz-box-shadow: 0 4px 6px 0 rgba(85, 85, 85, 0.0901961), 0 1px 20px 0 rgba(0, 0, 0, 0.08), 0px 1px 11px 0px rgba(0, 0, 0, 0.06);
box-shadow: 0 4px 6px 0 rgba(66, 66, 66, 0.09), 0 1px 20px 0 rgba(0, 0, 0, 0.08), 0px 1px 11px 0px rgba(0, 0, 0, 0.06); */
}

.layout-spacing {
  padding-bottom: 25px;
}

.user-profile .widget-content-are {
  border-radius: 35px;
}

.user-profile .widget-content-area .edit-profile {
  height: 35px;
  width: 35px;
  display: flex;
  justify-content: center;
  align-self: center;
  background-color: #1b55e2;
  background: linear-gradient(to right, #0081ff 0%, #0045ff 100%);
  border-radius: 50%;
  box-shadow: 0 10px 15px rgba(0, 69, 255, 0.2);
}

.user-profile .widget-content-area .close-profile {
  height: 35px;
  width: 35px;
  display: flex;
  justify-content: center;
  align-self: center;
  background-color: #d9534f;
  background: linear-gradient(to right, #bb4673 0%, #cf5cb6 100%);
  border-radius: 50%;
  box-shadow: 0 10px 15px rgba(0, 69, 255, 0.2);
}

.user-profile .widget-content-area .edit-profile svg {
  font-size: 17px;
  vertical-align: middle;
  margin-right: 0;
  color: #fff;
  width: 19px;
  align-self: center;
}

.user-profile .widget-content-area h3 {
  position: relative;
  font-size: 21px;
  font-weight: 600;
  color: #3b3f5c;
  margin: 6px 0px 0 0;
}

.user-profile .widget-content-area h3:after {
  position: absolute;
  content: "";
  height: 2px;
  width: 55px;
  background: #1b55e2;
  border-radius: 50%;
  bottom: 0;
  left: 15px;
}

.user-profile .widget-content-area .user-info {
  margin-top: 63px;
}

.user-profile .widget-content-area .user-info img {
  border-radius: 9px;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),
  0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.2);
}

.user-profile .widget-content-area .user-info p {
  font-size: 20px;
  font-weight: 600;
  margin-top: 22px;
  color: #1b55e2;
}

.user-profile .widget-content-area .user-info-list ul.contacts-block {
  border: none;
  max-width: 230px;
  margin: 36px auto;
}

.user-profile .widget-content-area .user-info-list ul.contacts-block li {
  margin-bottom: 13px;
  font-weight: 600;
  font-size: 13px;
}

.user-profile .widget-content-area .user-info-list ul.contacts-block li a {
  font-weight: 600;
  font-size: 15px;
  color: #1b55e2;
}

.user-profile .widget-content-area .user-info-list ul.contacts-block svg {
  width: 21px;
  margin-right: 15px;
  color: #888ea8;
  vertical-align: middle;
  fill: rgba(0, 23, 55, 0.08);
}

.user-profile
.widget-content-area
.user-info-list
ul.contacts-block
li:hover
svg {
  color: #1b55e2;
  fill: rgba(27, 85, 226, 0.239216);
}

.user-profile
.widget-content-area
.user-info-list
ul.contacts-block
ul.list-inline {
  margin: 27px auto;
}

.user-profile
.widget-content-area
.user-info-list
ul.contacts-block
ul.list-inline
div.social-icon {
  border: 2px solid #e0e6ed;
  border-radius: 50%;
  height: 35px;
  width: 35px;
  display: flex;
  justify-content: center;
  align-self: center;
}

.user-profile
.widget-content-area
.user-info-list
ul.contacts-block
ul.list-inline
svg {
  margin-right: 0;
  color: #1b55e2;
  width: 19px;
  align-self: center;
}

/deep/ .form-group {
  width: 100%;
  margin-bottom: 10px;
}

/deep/ .form-control {
  font-weight: 600;
  font-size: 13px;
  color: #212529;
}

/deep/ .invalid-feedback {
  margin-top: 0.6rem;
  left: 52%;
}

/deep/ .custom-select {
  font-weight: 600;
  font-size: 13px;
  color: #212529;
  margin-top: -8px;
}

.disabled-text {
  color: #8795a3 !important;
  cursor: not-allowed;
}

.error-feedback {
  color: red;
  margin-top: 5px;
}

.user-image-edit {
  cursor: pointer;
}

.show-password-block {
  margin-top: -13px;
}

.show-password-block label {
  color: #78797a;
  cursor: pointer;
  font-size: 13px;
}

/deep/ .custom-switch .custom-control-label::after {
  top: calc(0.14rem + 2px);
}

/deep/ .custom-control-label::before {
  top: 0.14rem;
}
</style>

<style>
#fileInput {
  display: none;
}

.my-8 {
  margin-top: 4rem;
  margin-bottom: 4rem;
}
</style>
