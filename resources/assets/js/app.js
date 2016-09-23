'use strict';

require('./bootstrap');

import Vue from 'vue';
import App from '../components/App.vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

Vue.config.debug = true
Vue.config.devtools = true

Vue.use(VueRouter)
Vue.use(VueResource)

// Vue.http.headers.common['Authorization'] = 'Bearer pvGqur2mHcPNeb8dmzYiUybLhGuybpkptiAFEaRZ';

/* eslint-disable no-new */

var router = new VueRouter({
    history: true,
    root: '/'
});

router.map({
    '/': {
        name: 'Order Fulfilment',
        component: require('../components/OrderFulfillment.vue'),
        auth: true
    },
    '/login': {
        component: require('../components/auth/Login.vue')
    }
})

router.start(App, 'body')