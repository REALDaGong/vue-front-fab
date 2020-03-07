import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      cancelTokenArr: [] // 取消请求token数组
  },
  mutations: {
      pushToken: (state, src) => {
          state.cancelTokenArr.push(src.cancelToken)
      },
      clearToken: ({cancelTokenArr}) => {
          cancelTokenArr.forEach(item => {
              item('路由跳转取消请求')
          })
          cancelTokenArr = []
      }
  }
})