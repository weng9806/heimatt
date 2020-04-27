import Vue from 'vue'
import App from './App.vue'
// 导入路由
import router from './router'
// 导入共享数据
import store from './store'
// 导入css样式
import '@/style/index.css'
// 导入dayjs
import dayjs from 'dayjs'

// 导入vant Lazyload懒加载
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
Vue.use(Lazyload)

var relativeTime = require('dayjs/plugin/relativeTime') // 转换为相对时间插件
dayjs.extend(relativeTime)
require('dayjs/locale/zh-cn') // 转换为中文
dayjs.locale('zh-cn') // 全局使用

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
