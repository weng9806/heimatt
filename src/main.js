import Vue from 'vue'
import App from './App.vue'
// 导入路由
import router from './router'
// 导入共享数据
import store from './store'
// 导入css样式
import '@/style/index.css'

import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
