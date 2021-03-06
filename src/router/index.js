import Vue from 'vue'
import Router from 'vue-router'
import menus from '@/config/menu-config'

import Login from '@/view/login.vue'
import Register from '@/view/register.vue'


import SubprojectDetail from '@/view/subprojectDetail.vue'
import UserInfo from '@/view/userinfo.vue'

// eslint-disable-next-line
import mainApp from '@/main.vue'
import error from '@/view/404.vue'

import store from '@/utils/vueXstore'

Vue.use(Router)

var routes = []

routes.push({

    path: `/app`,
    component: mainApp
  },
  {
    path: `/login`,
    name: `Login`,
    component: Login
  },
  {
    path: `/register`,
    component: Register
  },
  {
    path: `/subprojectDetail`,
    component: SubprojectDetail
  },
  {
    path: `*`,
    component: error
  },
  {
    path: `/`,
    redirect: `/app`

  },
  {
    path: `/userinfo`,
    component: UserInfo
  }
)
var children = []
menus.forEach((item) => {
  item.sub.forEach((sub) => {
    children.push({
      path: `${sub.componentName}`,
      name: sub.componentName,
      component: () => import(`@/components/${sub.componentName}`)
    })
    routes[0].children = children
  })
  if (typeof item.child !== 'undefined') {
    var child2 = []
    item.child.forEach((sub) => {
      child2.push({
        path: `${sub.componentName}`,
        name: sub.componentName,
        component: () => import(`@/components/${sub.componentName}`)
      })
      children[0].children = child2
    })
  }
})

const router = new Router({routes})

router.beforeEach((to, from, next) => {
  store.commit('clearToken')// 取消请求
  next();
})

// export default new Router({routes})
export default router