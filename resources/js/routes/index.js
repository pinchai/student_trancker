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

//Student
import student from "../pages/student_management/student";

//Attendance
import classing from "../pages/student_management/classing";

//Score
import score from "../pages/student_management/score";

//subject
import subject from "../pages/subject";


//position
import position from "../pages/student_management/position";

//position
import group from "../pages/student_management/group";

//position
import section from "../pages/student_management/section";

//report
import hour_by_month from "../pages/report/hour_by_month";

//User Management
import user_role from "../pages/user_management/user_role";
import user_list from "../pages/user_management/user_list";

//Setting
import application_setting from "../pages/setting/application_setting";
import telegram_bot from "../pages/setting/telegram_bot";
import module from "../pages/developer/module/index";

//Not found & No Permission
import pageNotFound from "../pages/errors/404.vue";
import pageNotPermission from "../pages/errors/403.vue";

// addToScore
import addToScore from "../pages/student_management/student/action/addToScore.vue";

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
            path: "/student_management/student",
            name: "student",
            component: student,
            meta: {
                title: "student"
            }
        },
        {
            path: "/student_management/classing",
            name: "classing",
            component: classing,
            meta: {
                title: "classing"
            }
        },
        {
            path: "/report/hour_by_month",
            name: "hour_by_month",
            component: hour_by_month,
            meta: {
                title: "hour_by_month"
            }
        },
        {
            path: "/student_management/score",
            name: "score",
            component: score,
            meta: {
                title: "score"
            }
        },
        {
            path: "/student_management/group",
            name: "group",
            component: group,
            meta: {
                title: "group"
            }
        },
        {
            path: "/subject",
            name: "subject",
            component: subject,
            meta: {
                title: "subject"
            }
        },
        {
            path: "/student_management/section",
            name: "section",
            component: section,
            meta: {
                title: "section"
            }
        },
        {
            path: "/student_management/position",
            name: "position",
            component: position,
            meta: {
                title: "position"
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
            path: "/user_management/user_list",
            name: "user_list",
            component: user_list,
            meta: {
                title: "user_list"
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
        },
        {
            path: "/student_management/add_to_score",
            name: "add_to_score",
            component: addToScore,
            meta: {
                title: "add_to_score"
            }
        },
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
