import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入子组件
import useVant from '@/views/useVant.vue'
import Login from '@/views/login/login.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/useVant',
      component: useVant
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
export default router
