import Vue from 'vue'
import Router from 'vue-router'
import Homepage from './views/Homepage.vue'
<<<<<<< HEAD
import Loadpage from './views/Loadpage.vue'
=======
 import Gamepage from './views/Gamepage.vue'
>>>>>>> 6a7dbb1b1bcdc38b7dba0431ba09f16ce7d2cdcc

Vue.use(Router)
 
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/loading',
      name: 'Loadpage',
      component: Loadpage
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: () => import('./views/Gamepage.vue'),
      children: [{
        path: ':id/:player',
        name: 'room',
        component: () => import('./views/Gamepage.vue')
      }]
    }
  ]
})
