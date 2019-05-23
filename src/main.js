// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

axios.defaults.baseURL = 'http://127.0.0.1:8000';
//axios.defaults.baseURL = 'http://10.18.93.13:8000';
axios.defaults.headers['Content-Type'] = 'application/json';

Vue.prototype.$axios= axios


Vue.config.productionTip = false

Vue.prototype.qs = qs
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',

})
