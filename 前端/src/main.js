import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$axios = axios
// axios在发送请求的时候携带cookie
axios.defaults.withCredentials=true;
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
