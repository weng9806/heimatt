import Vue from 'vue'
import store from '@/store'
import router from '@/router'
import { Toast } from 'vant'
Vue.use(Toast)
// 声明一个插件对象
var pluginObj = {}
// install 是固定语法,  vue.use()时会调用 install方法
pluginObj.install = function (vueObj) {
  vueObj.prototype.$login = function () {
    var token = store.state.userInfo.token
    if (!token) {
      Toast.fail('请先登录')
      router.push('/checklogin')
      return false
    }
    return true
  }
}

export default pluginObj
