import Vue from 'vue';
import Vuex from 'vuex';

import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/black-green-dark.css';
import Cookies from 'js-cookie';
import createPersistedState from 'vuex-persistedstate';

Vue.use(VueMaterial)
Vue.use(Vuex)

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