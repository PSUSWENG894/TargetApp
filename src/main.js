import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/black-green-dark.css' // This line here
Vue.use(VueMaterial)

import App from './App.vue'
Vue.config.productionTip = false
new Vue({
  render: h => h(App)
}).$mount('#app')
