import Vue from 'vue'
import App from './App.vue'
//import VueRouter from 'vue-router'
import vSelect from 'vue-select'
import router from './routes'
import { store } from './store'
import firebase from 'firebase'
import 'vue-select/dist/vue-select.css';

Vue.component('v-select', vSelect);
Vue.config.productionTip = false
// Vue.use(VueRouter)

// const router = new VueRouter({
//   mode: 'history',
//   routes
// });
let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      render: h => h(App),
      router,
      store
    }).$mount('#app')
  }
})


