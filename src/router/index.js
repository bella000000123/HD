import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

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
  },
  {
    path: '/peipan',
    name: 'peipan',
    component: () => import('../views/peipan.vue')
  },
  {
    path: '/liansai',
    name: 'liansai',
    component: () => import('../views/liansai.vue')
  },
  {
    path: '/gonglue',
    name: 'gonglue',
    component: () => import('../views/gonglue.vue')
  },
  {
    path: '/user',
    name: 'user',
    redirect: '/user/info',

    component: () => import('../views/userInfo.vue'),
    children: [
      // 二级路由配置
      { path: '/user/info', component: () => import('../views/userInfo/info.vue'), meta: { requireAuth: true } },
      { path: '/user/password', component: () => import('../views/userInfo/password.vue'), meta: { requireAuth: true } },
      { path: '/user/phone', component: () => import('../views/userInfo/phone.vue'), meta: { requireAuth: true } },
      { path: '/user/follow', component: () => import('../views/userInfo/follow.vue'), meta: { requireAuth: true } }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  // linkActiveClass: "linkActive",
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // 判断是否需要登录权限
    if (!store.state.isLogin) {
      return next({
        path: '/home'
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
