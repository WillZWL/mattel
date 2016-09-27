'use strict';

require('./boot');

import Vue from 'vue';
import App from '../components/App.vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import auth from './auth'
Vue.config.debug = true
Vue.config.devtools = true
Vue.use(VueRouter)
Vue.use(VueResource)

<<<<<<< HEAD
Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_tokens');

// Check the user's auth status when the app start
// auth.checkAuth()
var router = new VueRouter();
=======
function requireAuth (route, redirect, next) {
  if (!auth.checkAuth()) {
    redirect({
      path: '/login',
      query: { redirect: route.fullPath }
    })
  } else {
    next()
  }
}

var router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/logout',
      beforeEnter (route, redirect) {
        auth.logout()
        redirect('/login')
      }
    }
  ]
});
>>>>>>> 96007d3089016d34d81e83729156b2e875897fe9

router.map({
    '/order': {
        name: 'Order Fulfilment',
        component: require('../components/OrderFulfillment.vue'),
<<<<<<< HEAD
    },
    '/login': {
        name:'Login In',
        component: require('../components/auth/Login.vue'),
    },
});

router.beforeEach((transition) => {
    transition.to.auth = auth.checkAuth();
    if (transition.to.auth) {
        transition.next();
    } else {
        transition.redirect('/');
=======
        beforeEnter: requireAuth
    },
    '/login': {
        name:'Login In',
        component: require('../components/auth/Login.vue')
>>>>>>> 96007d3089016d34d81e83729156b2e875897fe9
    }
});

router.start(App, 'body')