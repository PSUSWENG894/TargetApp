import Vue from 'vue'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/black-green-dark.css' // This line here
Vue.use(VueMaterial)

import VueRouter from 'vue-router'
import {
  Authorization,
  Repositories
} from './components'
const routes = [{
    path: '',
    component: Authorization
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Repositories,
    props: true
  }
]
const router = new VueRouter({
  routes // short for `routes: routes`
})

Vue.use(VueRouter)

import App from './App.vue'
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')