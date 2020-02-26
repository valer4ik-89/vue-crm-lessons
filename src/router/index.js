import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      layout: 'empty'
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      layout: 'empty'
    },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('../views/Categories.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('../views/DetailRecord.vue')
  },
  {
    path: '/history',
    name: 'history',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('../views/History.vue')
  },
  {
    path: '/',
    name: 'home',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/planing',
    name: 'planing',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('../views/Planing.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/record',
    name: 'record',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('../views/NewRecord.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.meta.auth
  if (requireAuth && !currentUser) {
    next('/login?message=login')
  }
  next()
})

export default router
