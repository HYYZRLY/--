import Vue from 'vue'
// 引入vueRouter路由插件
import VueRouter from 'vue-router'
import axios from 'axios'
// 引入注册组件
import Index from '../views/index.vue'
import Register from '../views/register.vue'
import Login from '../views/login.vue'
import Department from '../components/index/content/department.vue'
import Doctor from '../components/index/content/doctor.vue'
import Registration from '../components/index/content/registration.vue'
import Roster from '../components/index/content/roster.vue'
import Notice from '../components/index/content/notice.vue'
import Suggestion from '../components/index/content/suggestion.vue'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: { requireAuth: true }
  },
  {
    path: '/index',
    component: Index,
    meta: { requireAuth: true },
    children: [
      {
        path: "/department",
        component: Department,
        meta: { requireAuth: true }
      },
      {
        path: "/doctor",
        component: Doctor,
        meta: { requireAuth: true }

      },
      {
        path: "/registration",
        component: Registration,
        meta: { requireAuth: true }

      },
      {
        path: "/roster",
        component: Roster,
        meta: { requireAuth: true }

      },
      {
        path: "/notice",
        component: Notice,
        meta: { requireAuth: true }

      },
      {
        path: "/suggestion",
        component: Suggestion,
        meta: { requireAuth: true }

      },
    ]
  },
  {
    path: "/register",
    name: 'Register',
    component: Register,
  },
  {
    path: "/login",
    name: 'Login',
    component: Login,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // axios("http://localhost:5000").then((res) => {
  //   if (to.name !== 'Login' && res.data.username == undefined) {
  //     console.log("未登录");
  //       next({ name: 'Login' })
  //       next({ name: 'Register' })
  //   }
  //   else {
  //     console.log("已登录o((>ω< ))o");
  //     next()
  //   }
  // })
  if (to.meta.requireAuth) {
    if (sessionStorage.getItem("isLog") == 'true') {
      console.log(sessionStorage.getItem("isLog"), 1);
      next()
    } else {
      next({ name: 'Login' })
      console.log(sessionStorage.getItem("isLog"), 2);

    }
  }
  else {
    if (sessionStorage.getItem("isLog") == 'true') {
      // console.log(localStorage.getItem("isLog"),1);
      next('/')
    } else {
      next()
      // console.log(localStorage.getItem("isLog"),2);

    }
  }
})

export default router
