import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: ''
  },
  mutations: {
    setUserInfo: function (state, data) {
      state.userInfo = data
    }
  }
})
