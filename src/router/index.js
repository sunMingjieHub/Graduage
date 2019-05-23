import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/home'
import Login from '@/views/login/login'
import Tadmin from '@/views/main/tadmin'
import Admin from '@/views/main/admin'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/tadmin',
      name: 'tadmin',
      component: Tadmin
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    }
  ]
})
