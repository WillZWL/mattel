<template>
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
                   v-on:click="changeOrderStatus('new')">New</a>
              </li>
              <li role="presentation" class="">
                <a href="#tab_content2" role="tab" id="ready"
                  data-toggle="tab" aria-expanded="false"
                  v-on:click="changeOrderStatus('ready')">Ready To Ship</a>
              </li>
              <!-- <li role="presentation" class="">
                <a href="#tab_content3" role="tab" id="in-transit"
                data-toggle="tab" aria-expanded="false"
                v-on:click="changeOrderStatus('in-transit')">In Transit</a>
              </li>
              -->
              <li role="presentation" class="">
                <a href="#tab_content4" role="tab" id="shipped"
                data-toggle="tab" aria-expanded="false"
                v-on:click="changeOrderStatus('shipped')">Shipped</a>
              </li>
            </ul>
            <div id="myTabContent" class="tab-content">
              <div role="tabpanel" class="tab-pane fade active in" id="tab_content1" aria-labelledby="new">
                <order-list :id="'table_content1'" :items='items'></order-list>
              </div>
              <div role="tabpanel" class="tab-pane fade" id="tab_content2" aria-labelledby="ready">
                <order-list :id="'table_content2'" :items='items'></order-list>
              </div>
              <!-- <div role="tabpanel" class="tab-pane fade" id="tab_content3" aria-labelledby="in-transit">
                <order-list :id="'table_content3'" :items='items'></order-list>
              </div>
              -->
              <div role="tabpanel" class="tab-pane fade" id="tab_content4" aria-labelledby="shipped">
                <order-list :id="'table_content4'" :items='items'></order-list>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import OrderFilters from './orderFulfillment/OrderFilters.vue'
  import OrderList from './orderFulfillment/OrderList.vue'
  export default {
    components: {
      OrderList,
      OrderFilters
    },
    data() {
      return {
        items: [
          {
            platform_type:'Accelerator',
            biz_type:'Lazada',
            merchant:'MATTEL',
            platform_id:'AC-BCLZ-ETRPH',
            lazada_so_no:'4499667766',
            esg_so_no:'543634',
            order_create_date:'2016-09-15 00:00:38',
            update_date:'2016-09-15 00:00:42',
            payment_method:'bc_lazada_my',
            price:'1000.00',
            order_qty:'5',
            inventory: '10'
          },
          {
            platform_type:'Accelerator',
            biz_type:'Lazada',
            merchant:'MATTEL',
            platform_id:'AC-BCLZ-ETRPH',
            lazada_so_no:'4499667755',
            esg_so_no:'543666',
            order_create_date:'2016-09-15 00:00:38',
            update_date:'2016-09-15 00:00:42',
            payment_method:'bc_lazada_ph',
            price:'6000.00',
            order_qty:'6',
            inventory: '15'
          },
          {
            platform_type:'Accelerator',
            biz_type:'Lazada',
            merchant:'MATTEL',
            platform_id:'AC-BCLZ-ETRPH',
            lazada_so_no:'4499667766',
            esg_so_no:'543634',
            order_create_date:'2016-09-15 00:00:38',
            update_date:'2016-09-15 00:00:42',
            payment_method:'bc_lazada_my',
            price:'1000.00',
            order_qty:'5',
            inventory: '10'
          },
          {
            platform_type:'Accelerator',
            biz_type:'Lazada',
            merchant:'MATTEL',
            platform_id:'AC-BCLZ-ETRPH',
            lazada_so_no:'4499667755',
            esg_so_no:'543666',
            order_create_date:'2016-09-15 00:00:38',
            update_date:'2016-09-15 00:00:42',
            payment_method:'bc_lazada_ph',
            price:'6000.00',
            order_qty:'6',
            inventory: '15'
          },
          {
            platform_type:'Accelerator',
            biz_type:'Lazada',
            merchant:'MATTEL',
            platform_id:'AC-BCLZ-ETRPH',
            lazada_so_no:'4499667766',
            esg_so_no:'543634',
            order_create_date:'2016-09-15 00:00:38',
            update_date:'2016-09-15 00:00:42',
            payment_method:'bc_lazada_my',
            price:'1000.00',
            order_qty:'5',
            inventory: '10'
          },
          {
            platform_type:'Accelerator',
            biz_type:'Lazada',
            merchant:'MATTEL',
            platform_id:'AC-BCLZ-ETRPH',
            lazada_so_no:'4499667755',
            esg_so_no:'543666',
            order_create_date:'2016-09-15 00:00:38',
            update_date:'2016-09-15 00:00:42',
            payment_method:'bc_lazada_ph',
            price:'6000.00',
            order_qty:'6',
            inventory: '15'
          },
          {
            platform_type:'Accelerator',
            biz_type:'Lazada',
            merchant:'MATTEL',
            platform_id:'AC-BCLZ-ETRPH',
            lazada_so_no:'4499667766',
            esg_so_no:'543634',
            order_create_date:'2016-09-15 00:00:38',
            update_date:'2016-09-15 00:00:42',
            payment_method:'bc_lazada_my',
            price:'1000.00',
            order_qty:'5',
            inventory: '10'
          },
          {
            platform_type:'Accelerator',
            biz_type:'Lazada',
            merchant:'MATTEL',
            platform_id:'AC-BCLZ-ETRPH',
            lazada_so_no:'4499667755',
            esg_so_no:'543666',
            order_create_date:'2016-09-15 00:00:38',
            update_date:'2016-09-15 00:00:42',
            payment_method:'bc_lazada_ph',
            price:'6000.00',
            order_qty:'6',
            inventory: '15'
          },
          {
            platform_type:'Accelerator',
            biz_type:'Lazada',
            merchant:'MATTEL',
            platform_id:'AC-BCLZ-ETRPH',
            lazada_so_no:'4499667766',
            esg_so_no:'543634',
            order_create_date:'2016-09-15 00:00:38',
            update_date:'2016-09-15 00:00:42',
            payment_method:'bc_lazada_my',
            price:'1000.00',
            order_qty:'5',
            inventory: '10'
          },
          {
            platform_type:'Accelerator',
            biz_type:'Lazada',
            merchant:'MATTEL',
            platform_id:'AC-BCLZ-ETRPH',
            lazada_so_no:'4499667755',
            esg_so_no:'543666',
            order_create_date:'2016-09-15 00:00:38',
            update_date:'2016-09-15 00:00:42',
            payment_method:'bc_lazada_ph',
            price:'6000.00',
            order_qty:'6',
            inventory: '15'
          },
          {
            platform_type:'Accelerator',
            biz_type:'Lazada',
            merchant:'MATTEL',
            platform_id:'AC-BCLZ-ETRPH',
            lazada_so_no:'4499667766',
            esg_so_no:'543634',
            order_create_date:'2016-09-15 00:00:38',
            update_date:'2016-09-15 00:00:42',
            payment_method:'bc_lazada_my',
            price:'1000.00',
            order_qty:'5',
            inventory: '10'
          },
          {
            platform_type:'Accelerator',
            biz_type:'Lazada',
            merchant:'MATTEL',
            platform_id:'AC-BCLZ-ETRPH',
            lazada_so_no:'4499667755',
            esg_so_no:'543666',
            order_create_date:'2016-09-15 00:00:38',
            update_date:'2016-09-15 00:00:42',
            payment_method:'bc_lazada_ph',
            price:'6000.00',
            order_qty:'6',
            inventory: '15'
          }
        ]
      }
    },
    ready() {

    },
    methods: {
      init() {

      },
      changeOrderStatus: function(status) {
        $.isLoading({ text: "Loading  "+ status + " orders", class:"fa fa-refresh fa-spin" });
        // this.$http({
        //   url:this.api_url+'order_fulfillment'
        //   method: 'GET'
        // }).then(function (response) {
        //   this.$set('items', response.data.data);
        // });
        setTimeout( function(){
          $.isLoading("hide");
        }, 1000)
      }
    }
  }
</script>