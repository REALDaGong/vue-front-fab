import axios from 'axios'
import { Message, Loading } from 'element-ui'
import store from '@/utils/vueXstore'

// const ConfigBaseURL = 'http://49.235.226.118/fabric/' // 默认路径，这里也可以使用env来判断环境
const ConfigBaseURL = 'http://localhost:8080/'
let loadingInstance = null // 这里是loading
// 使用create方法创建axios实例
export const Service = axios.create({
  timeout: 7000, // 请求超时时间
  baseURL: ConfigBaseURL,
  method: 'post',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': 'http://localhost:8081'
  }
})
/*
// 添加请求拦截器
Service.interceptors.request.use(config => {
  loadingInstance = Loading.service({
    lock: true,
    text: 'loading...'
  })
  return config
})
*/
// 添加响应拦截器

Service.interceptors.request.use(
  config => {
      // vuex记录cancelToken
      config.cancelToken = new axios.CancelToken((cancel) => {
          store.commit('pushToken', {
              cancelToken: cancel
          })
      })
      return config
  },
  error => {
      return Promise.reject(error)
  })

// http response 拦截器
Service.interceptors.response.use(
  response => {
      return response.data
  },
  error => {
      // console.log(error)
      if (error.message === '路由跳转取消请求') { // 判断是否为路由跳转取消网络请求
          console.log('路由跳转取消请求' + error)
      } else {
          const msg = error.Message !== undefined ? error.Message : ''
          
          return Promise.reject(error)
      }
    })