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

router.map({
    '/order': {
        name: 'Order Fulfilment',
        component: require('../components/OrderFulfillment.vue'),
        beforeEnter: requireAuth
    },
    '/login': {
        name:'Login In',
        component: require('../components/auth/Login.vue')
    }
})

router.start(App, 'body')