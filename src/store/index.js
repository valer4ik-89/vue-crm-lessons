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
    setError(state, error){ 
      state.error = error
    },
    clearError(state){
      state.error = null
    }
  },
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_CURRENCY
      
      const res = await fetch(`https://free.currconv.com/api/v7/convert?q=UAH_USD,UAH_EUR&apiKey=${key}`)
                        .then(res => {                          
                          return res.json()
                        })
                        .then(res => {
                          const currencies = Object.values(res.results)
                          return currencies
                        })
                        console.log(res);
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
