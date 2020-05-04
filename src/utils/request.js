import axios from 'axios'
import store from '@/store'
import jsonbig from 'json-bigint'
// import { setLoacl } from './mylocal.js'

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn',
  transformResponse: [function (data) {
    try {
      return jsonbig.parse(data)
    } catch (error) {
      return data
    }
  }]
})
const instance1 = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  var token = store.state.userInfo.token
  // 如果token存在，添加请求头 Authorization
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, async function (error) {
  // 对响应错误做点什么
  var status = error.response.status
  if (status === 401) {
    var refreshToken = store.state.userInfo.refresh_token
    // 发送请求 获取新的token
    var res = await instance1({
      url: '/app/v1_0/authorizations',
      method: 'put',
      headers: {
        Authorization: 'Bearer ' + refreshToken
      }
    })
    var newUserInfo = {
      token: res.data.data.token,
      refresh_token: refreshToken
    }
    store.commit('setUserInfo', newUserInfo)
    // setLoacl('userInfo', newUserInfo)
    return instance(error.config)
  }
  return Promise.reject(error)
})

export default instance
