import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import VueMeta from 'vue-meta'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter'
import currencyFilter from './filters/currency.filter'
import localizeFilter from './filters/localize.filter'
import tooltipDirective from './directives/tooltip.directive'
import MessagePlugin from './utils/message.plugin'
import TitlePlugin from './utils/title.plugin'
import AppLoader from './components/app/AppLoader'
import './registerServiceWorker'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(MessagePlugin)
Vue.use(TitlePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.filter('date', dateFilter)
Vue.filter('currencyFilter', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('AppLoader', AppLoader)
Vue.component('paginate', Paginate)

const firebaseConfig = {
  apiKey: 'AIzaSyBlVs_PRt0wwOJfDhywN-rGZkZQMHjVcd8',
  authDomain: 'vue-crm-24dc9.firebaseapp.com',
  databaseURL: 'https://vue-crm-24dc9.firebaseio.com',
  projectId: 'vue-crm-24dc9',
  storageBucket: 'vue-crm-24dc9.appspot.com',
  messagingSenderId: '936937356724',
  appId: '1:936937356724:web:608b38f7239792ffec06e1'
}

firebase.initializeApp(firebaseConfig)

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
