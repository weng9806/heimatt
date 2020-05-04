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
// 搜索组件
import Search from '@/views/home/search/search.vue'
// 搜索结果组件
import Searchresult from '@/views/home/searchResult/searchResult.vue'
// 文章详情组件
import Detail from '@/views/detail/detail.vue'
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
      path: '/checklogin',
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
        },
        {
          path: 'search',
          component: Search
        }
      ]
    },
    {
      path: '/searchresult',
      component: Searchresult
    },
    {
      path: '/detail',
      component: Detail
    }
  ]
})
export default router
