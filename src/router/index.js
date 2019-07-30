import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: () => import('../pages/Index')
    },
    {
      path: '/body',
      component: () => import('../pages/Body')
    },
    {
      path: '/xdemo',
      component: () => import('../pages/XDemo')
    },
    {
      path: '/test',
      component: () => import('../pages/Test')
    }
  ]
})

export default router
