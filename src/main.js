import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/black-green-dark.css' // This line here
Vue.use(VueMaterial)

import VueRouter from 'vue-router'
import {
  Authorization,
  Repositories
} from './components'

Vue.use(VueRouter)
const routes = [{
    path: '/auth',
    component: Authorization
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Repositories,
    props: true,
  }
]
const router = new VueRouter({
  routes // short for `routes: routes`
})

//import App from './App'
import store from '../store'

Vue.config.productionTip = false

//const app = new Vue({
//  render: h => h(App),
//  router: router,
//  store: store,
//}).$mount('#app')
const app = new Vue({
  router,
  store,
  components: {
    "main-nav": MainNav
  }
}).$mount('#app')
