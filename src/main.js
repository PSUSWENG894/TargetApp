import Vue from 'vue'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'
// import 'vue-material/dist/theme/black-green-dark.css'
// import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)

import VueRouter from 'vue-router'
import {
  Authorization,
  Container,
  // Repositories,
  Repository
} from './components'
const routes = [{
    path: '',
    component: Authorization
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Container,
    props: true,
    children: [
      {path: 'repository/:name', name:'repo', component: Repository, props: true}
    ]
  }
]
const router = new VueRouter({
  mode: 'history',
  routes: routes
})

Vue.use(VueRouter)

import App from './App.vue'
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')