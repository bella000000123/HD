import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/bifen',
    name: 'bifen',
    component: () => import('../views/Bifen.vue')
  },
  {
    path: '/soccer',
    name: 'soccer',
    component: () => import('../views/Soccer.vue')
  },
  {
    path: '/basketball',
    name: 'basketball',
    component: () => import('../views/Basketball.vue')
  },
  {
    path: '/gaoshou',
    name: 'gaoshou',
    component: () => import('../views/Gaoshou.vue')
  },
  {
    path: '/qingbao',
    name: 'qingbao',
    component: () => import('../views/Qingbao.vue')
  },
  {
    path: '/tuijianDetail',
    name: 'tuijianDetail',
    component: () => import('../views/TuijianDetail.vue')
  },
  {
    path: '/article',
    name: 'article',
    component: () => import('../views/article.vue')
  },
  {
    path: '/bifenDetail',
    name: 'bifenDetail',
    component: () => import('../views/bifenDetail.vue')
  },
  {
    path: '/bifenVideo',
    name: 'bifenVideo',
    component: () => import('../views/bifenVideo.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  // linkActiveClass: "linkActive",
  routes
})

export default router
