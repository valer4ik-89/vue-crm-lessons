import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import categories from './categories'
import record from './record'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    async fetchCurrency() {
      const res = await fetch(
        `https://api.exchangerate-api.com/v4/latest/EUR`
      ).then(res => {
        return res.json()
      })
      console.log(res)
      return res
    }
  },
  getters: {
    error(state) {
      return state.error
    }
  },
  modules: {
    auth,
    info,
    categories,
    record
  }
})
