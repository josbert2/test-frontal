import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import './assets/base.css'
import './assets/main.scss'

import VueLazyload from 'vue-lazyload'
import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'



createApp(App)
  .use(store)
  .use(router)
  .use(mdiVue, {
    icons: mdijs
  })
 
  .use(VueLazyload, {
    preLoad: 1.3,
    error: 'https://placezombie.com/640x360',
    loading: 'https://placezombie.com/640x360',
    attempt: 1
  })
  .mount('#app');


module.exports = {
   css: {
      loaderOptions: {
         sass: {
            data: `
               @import "@/assets/main.scss";
            `
         }
      }
   }
}