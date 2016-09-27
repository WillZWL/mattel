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

var router = new VueRouter();

Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.access_token;

var router = new VueRouter();

router.map({
    '/order': {
        name: 'Order Fulfilment',
        component: require('../components/OrderFulfillment.vue'),
        auth: true
    },
    '/login': {
        name:'Login In',
        component: require('../components/auth/Login.vue'),
        auth: false
    },
    '/': {
        name:'Home',
        component: require('../components/OrderFulfillment.vue'),
        auth: true
    }
});

router.beforeEach((transition) => {
    if (transition.to.auth) {
        if (!auth.checkAuth()) {
          transition.redirect('/login')
        }
    } else if (transition.to.path == '/login' && auth.checkAuth()) {
      transition.redirect('/')
    } else if (transition.to.path == '/logout') {
      auth.logout()
      transition.redirect('login')
    }

    transition.next()
});

router.start(App, 'body')