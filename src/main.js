import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import apolloProvider from './vue-apollo'
import VueApollo from 'vue-apollo'
import store from './store'

Vue.use(VueApollo)
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  apolloProvider,
  store,
  render: h => h(App)
}).$mount('#app')
