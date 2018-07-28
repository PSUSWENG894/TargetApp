import Vue from 'vue'
import Vuex from 'vuex';
import Cookies from 'js-cookie';
import createPersistedState from 'vuex-persistedstate';

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'
// import 'vue-material/dist/theme/black-green-dark.css'
// import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)
Vue.use(Vuex)

import VueRouter from 'vue-router'
import {
  Authorization,
  Container,
  DeveloperContributions,
  Repository,
  Home
} from './components'
const routes = [{
    path: '',
    component: Authorization
  },
  {
    path: '/dashboard/:gitOrg/',
    component: Container,
    props: true,
    children: [
      {path: '', name:'dashboard-home', component: Home, props: true},
      {path: 'repository/:targetRepository', name:'repo', component: Repository, props: true},
      {path: 'contributions', name:'cont', component: DeveloperContributions, props: true},
    ]
  }
]
const router = new VueRouter({
  // mode: 'history', // Github Pages does not handle History Mode Correctly
  routes: routes
})

Vue.use(VueRouter)

const store = new Vuex.Store({
  state: {
    gitOrgName: null,
    gitAPIKey: null,
    travisAPIKey: null
  },
  plugins: [createPersistedState({
    storage: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, { expires: 3}),
      removeItem: key => Cookies.remove(key)
    }
  })],
  mutations: {
    setGitOrg(state, orgName) {
      state.gitOrgName = orgName
    },
    setGitAPI(state, apiKey) {
      state.gitAPIKey = apiKey
    },
    setTravisAPI(state, apiKey) {
      state.travisAPIKey = apiKey
    }
  }
})

import App from './App.vue'
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router: router,
  store: store
}).$mount('#app')