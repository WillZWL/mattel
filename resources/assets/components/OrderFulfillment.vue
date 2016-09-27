<template>
  <div class="nav-sm">
  <div class="container body">
    <div id="app">
  <sidebar></sidebar>
  <navbar></navbar>
  <!-- Main content -->
  <div class="right_col" role="main">
    <section class="content">
      <!-- Page Title -->
      <titlebar></titlebar>
      <!-- Your Page Content Here -->
      <!-- route outlet -->
      <div class="row">
        <order-filters></order-filters>
        <div class="col-md-12 col-sm-12 col-xs-12">
          <div class="x_panel">
            <div class="x_content">
              <div class="" role="tabpanel" data-example-id="togglable-tabs">
                <ul id="myTab" class="nav nav-tabs bar_tabs" role="tablist">
                  <li role="presentation" class="active">
                    <a href="#tab_content1" role="tab" id="new"
                       data-toggle="tab" aria-expanded="true"
                       v-on:click="switchOrderStatusTab('new')">New</a>
                  </li>
                  <li role="presentation" class="">
                    <a href="#tab_content2" role="tab" id="ready"
                      data-toggle="tab" aria-expanded="false"
                      v-on:click="switchOrderStatusTab('ready')">Ready To Ship</a>
                  </li>
                  <li role="presentation" class="">
                    <a href="#tab_content3" role="tab" id="shipped"
                    data-toggle="tab" aria-expanded="false"
                    v-on:click="switchOrderStatusTab('shipped')">Shipped</a>
                  </li>
                </ul>
                <div id="myTabContent" class="tab-content">
                  <div role="tabpanel" class="tab-pane fade active in" id="tab_content1" aria-labelledby="new"
                    v-if="status == 'new'">
                    <order-list :id="'table_content1'" :orders='orders'></order-list>
                  </div>
                  <div role="tabpanel" class="tab-pane fade" id="tab_content2" aria-labelledby="ready"
                    v-if="status == 'ready'">
                    <order-list :id="'table_content2'" :orders='orders'></order-list>
                  </div>
                  <div role="tabpanel" class="tab-pane fade" id="tab_content3" aria-labelledby="shipped"
                    v-if="status == 'shipped'">
                    <order-list :id="'table_content3'" :orders='orders'></order-list>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <!-- /.content -->
  <footbar></footbar>
      </div>
  </div>
  </div>

</template>
<script>
  import OrderFilters from './orderFulfillment/OrderFilters.vue'
  import OrderList from './orderFulfillment/OrderList.vue'
  import Titlebar from './common/Titlebar.vue';
  import Navbar from './common/Navbar.vue';
  import Sidebar from './common/Sidebar.vue';
  import Footbar from './common/Footbar.vue';

  import { switchOrderStatusTab } from '../vuex/actions';
  import { getTabStatus, getOrderLists } from '../vuex/getters';

  export default {
    vuex: {
      actions: {
        switchOrderStatusTab
      },
      getters: {
        status: getTabStatus,
        orders: getOrderLists,
      }
    },
    components: {
      OrderList,
      OrderFilters,
      Titlebar,
      Navbar,
      Sidebar,
      Footbar
    },
    data() {
      return {}
    },
    ready() {
      this.switchOrderStatusTab('new')
    }
  }
</script>