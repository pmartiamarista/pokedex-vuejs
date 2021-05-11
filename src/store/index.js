import Vue from 'vue'
import Vuex from 'vuex'
import layout from './modules/layout'
import favorites from './modules/favorites'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    layout,
    favorites,
  },
})
