import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const state = {
    orderLists: [],
    ordersMeta: {
      pagination: {
          'current_page': 0,
          'total_pages': 0
      }
    },
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
    scanResult:{},
    mappingLists: [],
    mappingMeta: {
      pagination: {
          'current_page': 0,
          'total_pages': 0
      }
    },
    inventoryLists: [],
    inventoryMeta: {
      pagination: {
          'current_page': 0,
          'total_pages': 0
      }
    }
};

const mutations = {
    SET_TAB_STATUS(state, status) {
        state.tabStatus = status;
    },
    FETCH_ORDER_LISTS(state, orderLists, ordersMeta) {
        state.orderLists = orderLists;
        state.ordersMeta = ordersMeta;
    },
    SET_TABLE_HEADERS(state, headers) {
        state.tableHeaders = headers;
    },
    SET_ORDER_DETAIL(state, detail) {
        state.orderDetail = detail;
    },
    SCAN_TRACKING_NO(state, result) {
        state.scanResult = result;
    },
    FETCH_MAPPING_LISTS(state, mappingLists, mappingMeta) {
        state.mappingLists = mappingLists;
        state.mappingMeta = mappingMeta;
    },
    FETCH_INVENTORY_LISTS(state, inventoryLists, inventoryMeta) {
        state.inventoryLists = inventoryLists;
        state.inventoryMeta = inventoryMeta;
    }
};

export default new Vuex.Store({
    state,
    mutations,
});