<template>
  <div>
    <div class="header-container fixed-top">
      <header class="header navbar navbar-expand-sm ">
        <ul class="navbar-item theme-brand flex-row  text-center">
          <li v-if="false" class="nav-item theme-logo">
            <a href="/">
              <img
                :src="this.branch[0] && this.branch[0].logo != null ? 'images/branch/thumbnail/'+this.branch[0].logo : '/assets/img/90x90.jpg'"
                class="navbar-logo"
                alt="logo"
              />
            </a>
          </li>
          <li class="nav-item theme-text">
            <a href="/" class="nav-link text-white">{{
                this.branch[0] && this.branch[0].name != null ? this.branch[0].name : 'Invoice'
              }}</a>
          </li>
        </ul>
        <ul class="navbar-item flex-row ml-md-auto">
          <!-- languages -->
          <select-languages/>
          <!-- bell -->
          <li
            v-if="false"
            class="nav-item dropdown notification-dropdown"
          >
            <a
              href="javascript:void(0);"
              class="nav-link dropdown-toggle"
              id="notificationDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
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
                class="feather feather-bell"
              >
                <path
                  d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                ></path>
                <path
                  d="M13.73 21a2 2 0 0 1-3.46 0"
                ></path>
              </svg
              >
              <span class="badge badge-success"></span>
            </a>
            <div
              class="dropdown-menu position-absolute"
              aria-labelledby="notificationDropdown"
            >
              <div class="notification-scroll">
                <!-- <div class="dropdown-item">
                    <div class="media">
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
                            class="feather feather-heart"
                        >
                            <path
                                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                            ></path>
                        </svg>
                        <div class="media-body">
                            <div class="notification-para">
                                <span class="user-name"
                                    >Shaun Park</span
                                >
                                likes your photo.
                            </div>
                        </div>
                    </div>
                </div>

                <div class="dropdown-item">
                    <div class="media">
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
                            class="feather feather-share-2"
                        >
                            <circle
                                cx="18"
                                cy="5"
                                r="3"
                            ></circle>
                            <circle
                                cx="6"
                                cy="12"
                                r="3"
                            ></circle>
                            <circle
                                cx="18"
                                cy="19"
                                r="3"
                            ></circle>
                            <line
                                x1="8.59"
                                y1="13.51"
                                x2="15.42"
                                y2="17.49"
                            ></line>
                            <line
                                x1="15.41"
                                y1="6.51"
                                x2="8.59"
                                y2="10.49"
                            ></line>
                        </svg>
                        <div class="media-body">
                            <div class="notification-para">
                                <span class="user-name"
                                    >Kelly Young</span
                                >
                                shared your post
                            </div>
                        </div>
                    </div>
                </div>

                <div class="dropdown-item">
                    <div class="media">
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
                            class="feather feather-tag"
                        >
                            <path
                                d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
                            ></path>
                            <line
                                x1="7"
                                y1="7"
                                x2="7"
                                y2="7"
                            ></line>
                        </svg>
                        <div class="media-body">
                            <div class="notification-para">
                                <span class="user-name"
                                    >Kelly Young</span
                                >
                                mentioned you in comment.
                            </div>
                        </div>
                    </div>
                </div> -->
              </div>
            </div>
          </li>
          <!-- user -->
          <li
            class="nav-item dropdown user-profile-dropdown"
          >
            <a
              href="javascript:void(0);"
              class="nav-link dropdown-toggle user"
              id="userProfileDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="true"
            >
              <label style="text-transform: uppercase; margin-top: 3px">{{ this.$helpers.nullToVoid(userAuth, '') != '' ? userAuth.name : null }}</label>
              <b-avatar
                v-if="this.$helpers.nullToVoid(userAuth, '') != ''"
                badge
                badge-top
                badge-offset="-1px"
                badge-variant="success"
                size="35px"
                :src="'/images/user/'+userAuth.image"
              >
              </b-avatar>
            </a>
            <div
              class="dropdown-menu position-absolute"
              aria-labelledby="userProfileDropdown"
            >
              <div class="">
                <div
                  class="dropdown-item"
                  style="cursor: pointer;"
                >
                  <a @click="openModalProfile"
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
                    >
                      <path
                        d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                      ></path>
                      <circle
                        cx="12"
                        cy="7"
                        r="4"
                      ></circle>
                    </svg>
                    {{ $t("my_profile") }}</a
                  >
                </div>
                <div class="dropdown-item">
                  <a class="" href="/logout"
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
                      class="feather feather-log-out"
                    >
                      <path
                        d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
                      ></path>
                      <polyline
                        points="16 17 21 12 16 7"
                      ></polyline>
                      <line
                        x1="21"
                        y1="12"
                        x2="9"
                        y2="12"
                      ></line>
                    </svg>
                    {{ $t("sign_out") }}</a
                  >
                </div>
              </div>
            </div>
          </li>
        </ul>
      </header>
    </div>
    <div class="sub-header-container" style="margin-top: 11px;">
      <header class="header navbar navbar-expand-sm shadow-sm">
        <a
          href="javascript:void(0);"
          class="sidebarCollapse"
          data-placement="bottom"
          @click="sidebarCollapse"
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
            class="feather feather-menu"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg
          >
        </a>
        <ul class="navbar-nav flex-row">
          <li>
            <div class="page-header">
              <nav class="breadcrumb-one" aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li
                    class="breadcrumb-item"
                    v-if="!$route.path.includes('/welcome')"
                  >
                    {{ $t(this.getRouteName.main) }}
                  </li>
                  <li
                    v-if="
                                            this.$helpers.nullToVoid(
                                                getRouteName.sub
                                            ) != ''
                                        "
                    class="breadcrumb-item active"
                    aria-current="page"
                  >
                                        <span>{{
                                            $t(this.getRouteName.sub)
                                          }}</span>
                  </li>
                </ol>
              </nav>
            </div>
          </li>
        </ul>
        <ul v-if="false" class="navbar-nav flex-row ml-auto ">
          <li class="nav-item">
            <b-button
              v-for="(item, index) in currencies"
              :key="index"
              variant="info"
              class="mr-1"
              :style="
                                item.is_default == 1
                                    ? 'background-color: #6085a2'
                                    : 'background-color: #6cb2eb'
                            "
              @click="openModalCurrency(item)"
            >
              {{ item.symbol }} {{ item.sell_out_price }}
            </b-button>
          </li>
          <li class="nav-item more-dropdown">
            <div class="dropdown  custom-dropdown-icon">
              <a
                class="dropdown-toggle btn"
                href="#"
                role="button"
                id="customDropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ><span v-if="$i18n.locale == 'en'"
              >Quick Access</span
              >
                <span v-if="$i18n.locale == 'kh'"
                >ការចូលប្រើរហ័ស</span
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
                  class="feather feather-chevron-down"
                >
                  <polyline
                    points="6 9 12 15 18 9"
                  ></polyline>
                </svg
                >
              </a>
              <div
                class="dropdown-menu dropdown-menu-right"
                aria-labelledby="customDropdown"
              >
                <router-link
                  class="dropdown-item"
                  data-value="Add Currency"
                  to="#"
                  v-on:click.native="openAddCurrencyModal"
                >
                                    <span v-if="$i18n.locale == 'en'"
                                    >Add Currency</span
                                    >
                  <span v-if="$i18n.locale == 'kh'"
                  >បន្ថែមរូបិយប័ណ្ណ</span
                  >
                </router-link>
                <router-link
                  to="/setting/currency"
                  class="dropdown-item"
                  data-value="Currency List"
                ><span v-if="$i18n.locale == 'en'"
                >Currency List</span
                >
                  <span v-if="$i18n.locale == 'kh'"
                  >បញ្ជីរូបិយប័ណ្ណ</span
                  >
                </router-link>
                <router-link
                  to="/sale_management/pos"
                  class="dropdown-item"
                  data-value="POS"
                >POS
                </router-link>
                <router-link
                  to="/report/sale_report"
                  class="dropdown-item"
                  data-value="Sale Report"
                >{{ $t("sale_report") }}
                </router-link>
                <div v-if="userAuth">
                  <router-link
                    v-if="isDEV() || isSuper()"
                    to="/user_management/user_list"
                    class="dropdown-item"
                    data-value="User List"
                  >{{ $t("user_list") }}
                  </router-link>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </header>
    </div>

    <!-- modal profile -->
    <div v-if="modalProfileShow">
      <user-profile
        :modalType="modalProfileType"
        @closeModal="closeProfileModal"
      ></user-profile>
    </div>
    <!--end modal profile -->

    <!--modal currency -->
    <div v-if="modalCurrencyShow">
      <modal-currency
        :modalType="modalCurrencyType"
        :formItem="currencyItem"
        @closeModal="closeCurrencyModal"
      ></modal-currency>
    </div>
    <!--end modal currency -->
  </div>
</template>
<script>
import SelectLanguages from "../sharing/SelectLanguages";
import UserProfile from "../sharing/UserProfile";
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      getRouteName: null,
      modalProfileShow: false,
      modalProfileType: 0,
      modalCurrencyShow: false,
      modalCurrencyType: 0,
      currencyItem: {},
      imgUrl: "/images/user/",
      profile_image: null
    };
  },
  components: {
    SelectLanguages,
    UserProfile,
    ModalCurrency: () =>
      import("../../pages/setting/currency/components/Modal")
  },
  computed: {
    ...mapGetters({
      currencies: "getCurrency",
      userAuth: "userAuth",
      branch: "getBranch"
    })
  },
  watch: {
    $route: {
      handler(val) {
        let route = val.path.split("/");

        if (route.length > 2) {
          this.getRouteName = {
            main: route[1],
            sub: route[route.length - 1]
          };
        } else {
          this.getRouteName = {main: route[1], sub: null};
        }
      },
      immediate: true
    },
    userAuth: {
      handler(val) {
        if (!this.$helpers.isEmpty(val)) {
          this.profile_image = val.image;
        }
      },
      immediate: true
    }
  },
  methods: {
    openAddCurrencyModal() {
      this.currencyItem = {};
      this.modalCurrencyShow = true;
      this.modalCurrencyType = 1;
    },
    openModalCurrency(item) {
      this.currencyItem = item;

      this.modalCurrencyShow = true;
      this.modalCurrencyType = 2; //set modal type 2 = edit
    },
    closeCurrencyModal(event) {
      this.modalCurrencyType = 0;
      this.modalCurrencyShow = false;
      this.currencyItem = {};
    },
    openModalProfile() {
      this.modalProfileShow = true;
      this.modalProfileType = 1; //set modal type 1 = save
    },
    closeProfileModal(event) {
      this.modalProfileType = 0;
      this.modalProfileShow = false;
    },
    sidebarCollapse() {
      let mainContainer = document.getElementsByClassName(
        "main-container"
      );
      let mainHeader = document.querySelectorAll(".header.navbar");
      let overlay = document.getElementsByClassName("overlay");
      let htmlBody = document.querySelectorAll("html,body");

      // show sidebar
      mainContainer[0].classList.toggle("sidebar-closed");
      mainHeader[0].classList.toggle("expand-header");
      mainContainer[0].classList.toggle("sbar-open");
      // show overlay
      overlay[0].classList.toggle("show");
      htmlBody[0].classList.toggle("sidebar-noneoverflow");
    }
  }
};
</script>
<style scoped>
.dropdown-item a {
  text-decoration: none;
}
</style>
