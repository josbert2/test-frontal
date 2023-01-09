import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'

import Users from '@/pages/Users/Add.vue'
import Home from '@/components/Main/Main.vue'
import Profile from '@/pages/Profile/Profile.vue'
import ContactView from '@/pages/Contact/View.vue'
import Login from '@/pages/Login/Login.vue'
import store from '@/store.js'
import NotFound from '@/pages/404.vue'


// Middleware para verificar si el usuario tiene una sesión iniciada
const checkAuth = (to, from, next) => {
   const token = localStorage.getItem('access_token');
   console.log(token)
   if (token) {
     next();
   } else {
     next('/login');
   }
 };

const routes = [
   {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: checkAuth
   },
   {
      path: '/login',
      name: 'Login',
      component: Login,
   },
   {
      path: '/edit/:id/:mode',
      name: 'edit',
      component: Users,
      beforeEnter: checkAuth

   },
   {
      path: '/add',
      name: 'add',
      component: Users,
      beforeEnter: checkAuth
   },
   {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: checkAuth
   },
   {
      name: '404',
      path: '/404',
      component: NotFound
   },

   {
      path: '/view/:id',
      name: 'contact',
      component: ContactView,
      beforeEnter: (to, from, next) => {
         console.log(to.params.id)
         axios.get('http://localhost:3000/users/' + to.params.id)
            .then(response => {
               if (response.data) {
                  next()
               }else{
                  router.push({ name: '404' })
               }
            })
            .catch(error => {
               console.log(error)
               next('/404')
            })
      }
   }
]

const router = createRouter({
   history: createWebHistory('/'),
   routes
})

export default router