import Vue from 'vue'
import Router from 'vue-router'

import Authorization from '../components'
import Repositories from '../components'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'dashboard',
      path: '/dashboard',
      component: Repositories
    },
    {
      name: 'auth',
      path: '/auth',
      component: Authorization
    }
  ]
})
