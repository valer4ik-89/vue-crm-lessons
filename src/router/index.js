import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      layout: "empty",
      title: 'Login'
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      layout: "empty",
      title: "Register"
    },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {
      layout: 'main',
      title: "Categories"
    },
    component: () => import ('../views/Categories.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    meta: {
      layout: 'main',
      title: "Detail"
    },
    component: () => import ('../views/DetailRecord.vue')
  },
  {
    path: '/history',
    name: 'history',
    meta: {
      layout: 'main',
      title: "History"
    },
    component: () => import ('../views/History.vue')
  },
  {
    path: '/',
    name: 'home',
    meta: {
      layout: 'main',
      title: "Home"
    },
    component: () => import ('../views/Home.vue')
  },
  {
    path: '/planing',
    name: 'planing',
    meta: {
      layout: 'main',
      title: "Planing"
    },
    component: () => import ('../views/Planing.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      layout: 'main',
      title: "Profile"
    },
    component: () => import ('../views/Profile.vue')
  },
  {
    path: '/record',
    name: 'record',
    meta: {
      layout: 'main',
      title: "New Record"
    },
    component: () => import ('../views/NewRecord.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
