import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter'
import currencyFilter from './filters/currency.filter'
import tooltipDirective from './directives/tooltip.directive';
import MessagePlugin from './utils/message.plugin'
import AppLoader from './components/app/AppLoader';
import './registerServiceWorker'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'


Vue.use(MessagePlugin)
Vue.use(Vuelidate)

Vue.config.productionTip = false

Vue.filter('date', dateFilter)
Vue.filter('currencyFilter', currencyFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('AppLoader', AppLoader)
Vue.component('paginate', Paginate)

const firebaseConfig = {
  apiKey: "AIzaSyBTwodHUCpb4NZi6ZKDq2wLdtI3lspOzpg",
  authDomain: "vue-crm-1ddd0.firebaseapp.com",
  databaseURL: "https://vue-crm-1ddd0.firebaseio.com",
  projectId: "vue-crm-1ddd0",
  storageBucket: "vue-crm-1ddd0.appspot.com",
  messagingSenderId: "218893274917",
  appId: "1:218893274917:web:45b3c6f65a5f75f812d4cc",
  measurementId: "G-10278TMTB4"
};

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


