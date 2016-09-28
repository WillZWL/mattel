import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const state = {
    orderLists: [],
    tabStatus:'new',
    tableHeaders: [
      'BizType',
      'Merchant',
      'Platform Order No',
      'Order Date',
      'Updated Date',
      'Payment Method',
      'Item QTY',
      'Inventory',
      'Action'
    ],
    orderDetail:{},
};

const mutations = {
    SET_TAB_STATUS(state, status) {
        state.tabStatus = status;
    },
    FETCH_ORDER_LISTS(state, orderLists) {
        state.orderLists = orderLists;
    },
    SET_TABLE_HEADERS(state, headers) {
        state.tableHeaders = headers;
    },
    SET_ORDER_DETAIL(state, detail) {
        state.orderDetail = detail;
    }
};

export default new Vuex.Store({
    state,
    mutations,
});