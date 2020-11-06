import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './userModule'
import moviesModule from './moviesModule'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    moviesModule,
    userModule
  }
})
