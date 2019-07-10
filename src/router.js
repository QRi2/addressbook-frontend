import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import PersonendatenAnlegen from './views/PersonendatenAnlegen'
import PersonendatenDetail from './views/PersonendatenDetail'
import PersonendatenBearbeiten from './views/PersonendatenBearbeiten'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/personendatenAnlegen',
      name: 'personendatenAnlegen',
      component: PersonendatenAnlegen
    },
    {
      path: '/personendatenBearbeiten/:id',
      name: 'personendatenBearbeiten',
      component: PersonendatenBearbeiten
    },
    {
      path: '/personendatenDetail/:id',
      name: 'personendatenDetail',
      component: PersonendatenDetail
    }
  ]
})
