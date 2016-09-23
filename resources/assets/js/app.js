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

Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_tokens');

// Check the user's auth status when the app start
// auth.checkAuth()

var router = new VueRouter();

router.map({
    '/order': {
        name: 'Order Fulfilment',
        component: require('../components/OrderFulfillment.vue')
    },
    '/login': {
        component: require('../components/auth/Login.vue')
    }
})

router.start(App, 'body')