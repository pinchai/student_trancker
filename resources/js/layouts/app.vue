<template>
    <div>
        <!--  BEGIN NAVBAR  -->
        <topnav/>
        <!--  END NAVBAR  -->

        <!--  BEGIN MAIN CONTAINER  -->
        <div class="main-container" id="container">
            <div class="overlay" @click="hideSideBarCollapse"></div>
            <div class="search-overlay"></div>

            <!--  BEGIN SIDEBAR  -->
            <sidebar/>
            <!--  END SIDEBAR  -->

            <!--  BEGIN CONTENT PART  -->
            <div id="content" class="main-content" style="margin-top: 125px;">
                <div class="layout-px-spacing">
                    <div class="row layout-top-spacing">
                        <div class="col-12 layout-spacing">
                            <div
                                v-if="
                                    checkAuthorize($store.state.permission.view)
                                "
                            >
                              <transition
                                enter-active-class="animate__animated animate__zoomIn"
                                leave-active-class=""
                              >
                                <router-view></router-view>
                              </transition>
                            </div>
                            <div v-else>
                                <pageNotFound></pageNotFound>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="footer-wrapper">
                    <div class="footer-section f-section-1">
                        <p class="">
                            {{ $t("copy_right") }} © {{  currentYear  }}
                            <a target="_blank" href="#">Zorin</a>,
                            {{ $t("all_rights_reserved") }}
                        </p>
                    </div>
                    <div class="footer-section f-section-2">
                        <p class="">
                            {{ $t("version") }} {{ version }}
                        </p>
                    </div>
                </div>
            </div>
            <!--  END CONTENT PART  -->
        </div>
        <!-- END MAIN CONTAINER -->

        <notify class="notify-area-message"></notify>
    </div>
</template>
<script>
import Topnav from "../components/navs/Topnav";
import Sidebar from "../components/navs/Sidebar";
import Notify from "../components/sharing/Notifications/Notify";
import pageNotFound from "../pages/errors/404.vue";
import moment from "moment";
import {mapGetters} from "vuex";
export default {
    name: "app",
    head() {
        return {};
    },
    components: {
        Topnav,
        Sidebar,
        Notify,
        pageNotFound
    },
    data: () => {
      return {
        currentYear: moment().format("YYYY")
      }
    },
    computed: {
      ...mapGetters({
        version: 'getVersion',
      })
    },
    methods: {
        hideSideBarCollapse() {
            let mainContainer = document.getElementsByClassName(
                "main-container"
            );
            let mainHeader = document.querySelectorAll(".header.navbar");
            let overlay = document.getElementsByClassName("overlay");
            let htmlBody = document.querySelectorAll("html,body");

            // hide sidebar
            mainContainer[0].classList.remove("sidebar-closed");
            mainHeader[0].classList.remove("expand-header");
            mainContainer[0].classList.remove("sbar-open");
            // hide overlay
            overlay[0].classList.remove("show");
            htmlBody[0].classList.remove("sidebar-noneoverflow");
        }
    }
};
</script>
<style scoped>
/deep/ .card-table {
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
    border-radius: 20px;
    overflow: hidden;
    border: none;
}
/deep/ .footer-wrapper {
    margin-top: -15px;
}
/deep/ .apexcharts-menu {
    min-width: 113px;
}
/deep/ .menu .router-link-active {
    background: #5c7f77 !important;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
    border-radius: 6px;
    color: #f8f9fa !important;
}
/deep/ .submenu .router-link-active {
    background: hsla(0, 0%, 100%, 0.09);
    color: white !important;
    margin-top: 3px;
    margin-bottom: 3px;
}
/deep/ .badge {
    display: inline-block;
    padding: 0.6em 0.4em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
/deep/ .badge-pill {
    padding-right: 1.6em;
    padding-left: 1.6em;
    border-radius: 10rem;
}
</style>

<!-- Responsive -->
<style scoped>
@media (max-width: 991px) {
    /deep/ #sidebar {
        background: #343a40 !important;
        margin-top: 5px !important;
    }
}
</style>

<style>
/* This only changes this particular animation duration */
.animate__animated.animate__bounce {
  --animate-duration: 2s;
}

/* This changes all the animations globally */
:root {
  --animate-duration: 200ms;
  --animate-delay: 0.9s;
}
</style>
