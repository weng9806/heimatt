import Vue from 'vue'
import App from './App.vue'
// 导入路由
import router from './router'
// 导入共享数据
import store from './store'
// 导入css样式
import '@/style/index.css'
// // 导入dayjs
// import dayjs from 'dayjs'
// 导入登录验证插件
import myPlugin from '@/utils/myplugin.js'

// 导入vant Lazyload懒加载
import Vant, { Lazyload, Toast } from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
Vue.use(Lazyload)
Vue.use(Toast)
Vue.use(myPlugin)

// var relativeTime = require('dayjs/plugin/relativeTime') // 转换为相对时间插件
// dayjs.extend(relativeTime)
// require('dayjs/locale/zh-cn') // 转换为中文
// dayjs.locale('zh-cn') // 全局使用

// --------------------------------------- 登录验证方法 ------------------------------------------------------
// Vue.prototype.$login = function () {
//   var token = store.state.userInfo.token
//   if (!token) {
//     Toast.fail('请先登录')
//     router.push('/login')
//     return false
//   }
//   return true
// }

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
