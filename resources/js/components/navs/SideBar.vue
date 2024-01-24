<template>
  <div
    class="sidebar-wrapper sidebar-theme p-2 bg-dark"
    style="margin-left: -18px"
  >
    <nav id="sidebar" style="margin-top: 24px;">
      <ul class="list-unstyled menu-categories" id="accordionExample">
        <perfect-scrollbar
          :options="scrollOptions"
        >
          <li
            class="menu"
            v-for="(item, index) in getMenuItems()"
            :key="index"
            @click="activeMenu(item.key, index)"
          >
            <a
              v-if="item.subs"
              :href="'#' + item.key"
              data-toggle="collapse"
              :class="item.key == currentRouteName ? 'router-link-exact-active router-link-active' : 'dropdown-toggle'"
            >
              <div>
                <span>
                  <i :class="item.icon" class="pr-2 text-white"></i>
                  {{ $t(item.label) }}
                </span>
              </div>
              <div>
                <i class="fas fa-chevron-right mr-2 text-white"></i>
              </div>
            </a>
            <ul
              v-if="item.subs"
              class="collapse submenu list-unstyled"
              :id="item.key"
            >
              <li v-for="(sub, index) in item.subs" :key="index">
                <router-link :to="sub.to">
                  <span>{{ $t(sub.label) }}</span>
                </router-link>
              </li>
            </ul>

            <!--no sub-->
            <router-link
              v-else-if="!item.subs"
              class="text-white dropdown-toggle"
              :to="item.to"
            >
              <div @click="activeMenu(item.key, index)">
                <span>
                  <i :class="item.icon" class="pr-2 text-white"></i>
                  {{ $t(item.label) }}
                </span>
              </div>
            </router-link>
          </li>

          <li
            v-if="checkCustomModuleAuthorize('user_activity', 'view')"
            class="menu"
          >
            <a
              class="text-white dropdown-toggle"
              href="/user-activity"
            >
              <span>
                <i class="fas fa-user-secret pr-2 text-white"></i>
                {{ $t('user_activity') }}
              </span>
            </a>
          </li>
        </perfect-scrollbar>
      </ul>
    </nav>
  </div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      scrollOptions: {
        suppressScrollX: true,
        wheelPropagation: false
      },
      menuItems: [],
      items: [
        {
          label: "dashboard",
          icon: "fas fa-tachometer-alt",
          to: "/dashboard",
          key: "dashboard",
          active: false
        },
        {
          label: "branch",
          icon: "fas fa-bezier-curve",
          to: "/branch",
          key: "branch",
          active: false
        },
        {
          label: "group",
          icon: "fas fa-dice-d6",
          to: "/student_management/group",
          key: "group",
          active: false
        },
        {
          label: "subject",
          icon: "fas fa-theater-masks",
          to: "/subject",
          key: "subject",
          active: false
        },
        // {
        //   label: "section",
        //   icon: "fas fa-dice-d6",
        //   to: "/student_management/section",
        //   key: "section",
        //   active: false
        // },
        {
          label: "position",
          icon: "fas fa-key",
          to: "/student_management/position",
          key: "position",
          active: false
        },
        {
          label: "student",
          icon: "fas fa-user-graduate",
          to: "/student_management/student",
          key: "student",
          active: false
        },
        {
          label: "attendance",
          icon: "fas fa-skull",
          to: "/student_management/classing",
          key: "classing",
          active: false
        },
        {
          label: "score",
          icon: "fas fa-rocket",
          to: "/student_management/score",
          key: "score",
          active: false
        },
        {
          label: "user_management",
          icon: "fas fa-user-lock",
          to: "/user_management",
          key: "user_management",
          active: false,
          subs: [
            {
              label: "user_role",
              to: "/user_management/user_role",
              key: "user_role",
              active: false
            },
            {
              label: "user_list",
              to: "/user_management/user_list",
              key: "user_list",
              active: false
            }
          ]
        },
        {
          label: "setting",
          icon: "fas fa-cog",
          to: "/setting",
          key: "setting",
          active: false,
          subs: [
            {
              label: "telegram_bot",
              to: "/setting/telegram_bot",
              key: "telegram_bot",
              active: false
            },
          ]
        },
        {
          label: "developer",
          icon: "fas fa-laptop-code",
          to: "/developer",
          key: "developer",
          active: false,
          subs: [
            {
              label: "application_setting",
              to: "/setting/application_setting",
              key: "application_setting",
              active: false
            },
            {
              label: "module",
              to: "/developer/module",
              key: "module",
              active: false
            },
          ]
        }
      ],
      is_active: false,
      is_active_main: false,
    };
  },
  computed: {
    ...mapGetters({
      rolePermission: "rolePermission",
      userAuth: "userAuth"
    }),
    currentRouteName() {
      return this.$route.name;
    },
  },
  watch: {},
  created() {
    this.activeMainMenu()
  },
  mounted() {
  },
  methods: {
    getMenuItems() {
      let vm = this;
      if (this.$helpers.nullToVoid(this.userAuth) == "") {
        return [];
      }
      if (this.$helpers.isEmpty(this.userAuth)) {
        return;
      }

      if (
        this.userAuth.user_type_id == this.$store.state.permission.DEV
      ) {
        return this.items;
      }

      // filter module only menu
      let moduleMenu = this.rolePermission;
      let menu = [];
      // menu.push(this.items[0])
      this.items.forEach(obj => {
        // if menu no subs
        if (vm.$helpers.nullToVoid(obj.subs) == "") {
          moduleMenu.forEach(b => {
            if (
              obj.key == b.module_key &&
              b.view == this.$store.state.permission.view
            ) {
              menu.push(obj);
            }
          });
        } else {
          // if menu has subs
          let subs = [];
          obj.subs.forEach(subsObj => {
            moduleMenu.forEach(b => {
              if (
                subsObj.key == b.module_key &&
                b.view == this.$store.state.permission.view
              ) {
                subs.push(subsObj);
              }
            });
          });
          if (vm.$helpers.nullToVoid(subs) != "") {
            menu.push({
              icon: obj.icon,
              label: obj.label,
              to: obj.to,
              key: obj.key,
              active: obj.active,
              subs: subs
            });
          }
        }
      });

      if (
        this.userAuth.user_type_id ==
        this.$store.state.permission.SUPER_USER
      ) {
        return menu.filter(item => item.key != "developer");
      } else if (
        this.userAuth.user_type_id == this.$store.state.permission.USER
      ) {
        return menu.filter(
          item =>
            item.key != "developer" && item.key != "user_management"
        );
      }

      return menu;
    },
    activeMenu(key, index) {
      //
    },
    activeMainMenu(item = null) {
      let active = false
      if (item != null) {
        let fullPath = this.$route.fullPath.split('/')
        let to = (item.subs[0].to).split('/')
        if (fullPath[1] == to[1]) {
          active = true
        }
      }
      return active
    }
  }
};
</script>
<style scoped>
.ps {
  height: 82vh;
  top: 27px;
  position: static;
}

a {
  text-decoration: none;
}

i {
  margin-bottom: -2px;
  font-size: 15px;
  color: rgba(111, 111, 111, 0.8);
  /* color: white; */
}

.submenu li a {
  color: #ababab !important;
}

.menu a:hover div {
  color: rgb(54, 52, 52) !important;
}

.submenu a:hover {
  background: hsla(0, 0%, 100%, 0.09);
  color: white !important;
  border-radius: 6px;
}
</style>
