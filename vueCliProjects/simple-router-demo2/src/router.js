import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import home from "./home.vue";
import about from "./about.vue";
import user from "./user.vue";
import tablet from "./tablet.vue"
import phone from "./phone.vue"
import computer from "./computer.vue"

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

// demo1 
// const routes = [
//     {
//         path: "/home",
//         component: home
//     },
//     {
//         path: "/about",
//         component: about
//     },
//     /*新增user路径，配置了动态的id*/
//     {
//         path: "/user/:id",
//         component: user
//     },
//     {
//         path: '/',
//         redirect: '/home'
//     }
// ]

// demo2
const routes = [
    {
        path: "/home",
        // 下面这个属性也不少，因为，我们是先进入home页面，才能进入子路由
        component: home,
        // 子路由
        children: [
            {
                path: "phone",
                component: phone
            },
            {
                path: "tablet",
                component: tablet
            },
            {
                path: "computer",
                component: computer
            },
            // 当进入到home时，下面的组件显示
            {
                path: "",
                component: phone
            }
        ]
    },
    {
        path: "/about",
        component: about
    },
    {
        path: "/user/:id",
        component: user
    },
    {
        path: '/',
        redirect: '/home'
    }
]

var router = new VueRouter({
    routes
})
export default router;