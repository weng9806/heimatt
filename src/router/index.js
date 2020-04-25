import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入子组件
import useVant from '@/views/useVant.vue'
import Login from '@/views/login/login.vue'
import Home from '@/views/home/home.vue'
// 首页组件
import Index from '@/views/home/index/index.vue'
// 我的个人组件
import My from '@/views/home/my/my.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/useVant',
      component: useVant
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: '/home/index',
      children: [
        {
          path: 'index',
          component: Index
        },
        {
          path: 'my',
          component: My
        }
      ]
    }
  ]
})
export default router
