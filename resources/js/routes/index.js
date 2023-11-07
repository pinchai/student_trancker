import Vue from "vue";
import VueRouter from "vue-router";
//i18n
import i18n from "../plugins/i18n";

/*Vuex*/
import store from "../store";

Vue.use(VueRouter);

//For blade
/*  Global Component Are Register Here */
Vue.component("app", require("../layouts/app").default);

//Welcome
import welcome from "../pages/welcome/";

//Dashboard
import dashboard from "../pages/dashboard/";

//Branch
import branch from "../pages/branch";

//Blog
import blog from "../pages/blog";

//Promotion
import promotion from "../pages/promotion";

//slider
import slider from "../pages/slider";

//Product Management
import product_category from "../pages/product_management/category";
import brand from "../pages/product_management/brand";
import unit from "../pages/product_management/unit";
import variation from "../pages/product_management/variation";
import tag from "../pages/product_management/tag";
import product from "../pages/product_management/product";
import barcode from "../pages/product_management/barcode";

//User Management
import user_role from "../pages/user_management/user_role";
import user_list from "../pages/user_management/user_list";

//Setting
import currency from "../pages/setting/currency";
import bank from "../pages/setting/bank";
import delivery from "../pages/setting/delivery";
import application_setting from "../pages/setting/application_setting";
import telegram_bot from "../pages/setting/telegram_bot";
import module from "../pages/developer/module/index";

//HR
import position from "../pages/HR/position";
import employee from "../pages/HR/employee";

//Not found & No Permission
import pageNotFound from "../pages/errors/404.vue";
import pageNotPermission from "../pages/errors/403.vue";


const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "welcomes",
      component: welcome,
      meta: {
        title: "welcome",
        transition: 'slide-right'
      }
    },
    {
      path: "/welcome",
      name: "welcome",
      component: welcome,
      meta: {
        title: "welcome",
        transition: 'slide-right'
      }
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: dashboard,
      meta: {
        title: "dashboard",
        transition: 'slide-right'
      }
    },
    {
      path: "/branch",
      name: "branch",
      component: branch,
      meta: {
        title: "branch",
        transition: 'slide-right'
      }
    },
    {
      path: "/product_management/category",
      name: "product_category",
      component: product_category,
      meta: {
        title: "product_category"
      }
    },
    {
      path: "/product_management/brand",
      name: "brand",
      component: brand,
      meta: {
        title: "brand"
      }
    },
    {
      path: "/product_management/unit",
      name: "unit",
      component: unit,
      meta: {
        title: "unit"
      }
    },
    {
      path: "/product_management/variation",
      name: "variation",
      component: variation,
      meta: {
        title: "variation"
      }
    },
    {
      path: "/product_management/tag",
      name: "tag",
      component: tag,
      meta: {
        title: "tag"
      }
    },
    {
      path: "/product_management/product",
      name: "product",
      component: product,
      meta: {
        title: "product"
      }
    },
    {
      path: "/product_management/barcode",
      name: "barcode",
      component: barcode,
      meta: {
        title: "barcode"
      }
    },
    {
      path: "/user_management/user_role",
      name: "user_role",
      component: user_role,
      meta: {
        title: "user_role"
      }
    },
    {
      path: "/blog",
      name: "blog",
      component: blog,
      meta: {
        title: "blog",
        transition: 'slide-right'
      }
    },
    {
      path: "/promotion",
      name: "promotion",
      component: promotion,
      meta: {
        title: "promotion",
        transition: 'slide-right'
      }
    },
    {
      path: "/slider",
      name: "slider",
      component: slider,
      meta: {
        title: "slider",
        transition: 'slide-right'
      }
    },
    {
      path: "/user_management/user_list",
      name: "user_list",
      component: user_list,
      meta: {
        title: "user_list"
      }
    },
    {
      path: "/setting/currency",
      name: "currency",
      component: currency,
      meta: {
        title: "currency"
      }
    },
    {
      path: "/setting/bank",
      name: "bank",
      component: bank,
      meta: {
        title: "bank"
      }
    },
    {
      path: "/setting/delivery",
      name: "delivery",
      component: delivery,
      meta: {
        title: "delivery"
      }
    },
    {
      path: "/setting/application_setting",
      name: "application_setting",
      component: application_setting,
      meta: {
        title: "application_setting"
      }
    },
    {
      path: "/setting/telegram_bot",
      name: "telegram_bot",
      component: telegram_bot,
      meta: {
        title: "telegram_bot"
      }
    },
    {
      path: "/HR/position",
      name: "position",
      component: position,
      meta: {
        title: "position"
      }
    },
    {
      path: "/HR/employee",
      name: "employee",
      component: employee,
      meta: {
        title: "employee"
      }
    },
    {
      path: "/developer/module",
      name: "module",
      component: module,
      meta: {
        title: "module"
      }
    },
    {
      path: "/403",
      name: "403",
      component: pageNotPermission,
      meta: {
        title: "403 | No Permission"
      }
    },
    {
      path: "*",
      name: "404",
      component: pageNotFound,
      meta: {
        title: "404 | Not Found"
      }
    }
  ]
});

//header title
router.beforeEach((toRoute, fromRoute, next) => {
  store.dispatch(
    "setCurrentModule",
    toRoute.matched[0].components.default.moduleKey
  );

  window.document.title =
    toRoute.meta && toRoute.meta.title
      ? i18n.t(toRoute.meta.title)
      : "Construction";

  next();
});

export default router;
