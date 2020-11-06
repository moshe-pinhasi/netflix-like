import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/movie-details/:id',
    name: 'movie-details',
    component: () => import(/* webpackChunkName: "about" */ '../views/MovieDetails.vue')
  },
  {
    path: '/my-list',
    name: 'my-list',
    component: () => import(/* webpackChunkName: "about" */ '../views/MyList.vue'),
    meta: {
      requriedAuth: true
    }
  },
  {
    path: "*",
    redirect: { name: "home" }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requriedAuth && !store.getters['userModule/user']) {
    next({name: 'home'})
    return
  }
  next()
})

export default router
