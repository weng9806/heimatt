import Vue from 'vue'
import Vuex from 'vuex'
import { setLoacl, getLoacl } from '@/utils/mylocal.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: getLoacl('userInfo') || {}
  },
  mutations: {
    setUserInfo: function (state, payload) {
      state.userInfo = payload
      setLoacl('userInfo', payload)
    }
  }
})
