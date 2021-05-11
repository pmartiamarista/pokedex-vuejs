import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    icon: 'mdi-home-circle-outline',
  },
  {
    path: '/regions',
    name: 'Regions',
    component: () => import(/* webpackChunkName: "about" */ '../views/Regions.vue'),
    icon: 'mdi-earth',
  },
  {
    path: '/types',
    name: 'Types',
    component: () => import(/* webpackChunkName: "about" */ '../views/Types.vue'),
    icon: 'mdi-atom',
  }
]

const router = new VueRouter({
  routes
})

export default router
