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
              <li role="presentation" class="">
                <a href="#tab_content3" role="tab" id="shipped"
                data-toggle="tab" aria-expanded="false"
                v-on:click="changeOrderStatus('shipped')">Shipped</a>
              </li>
            </ul>
            <div id="myTabContent" class="tab-content">
              <div role="tabpanel" class="tab-pane fade active in" id="tab_content1" aria-labelledby="new" v-if="status == 'new'">
                <order-list :id="'table_content1'" :orders='orders'></order-list>
              </div>
              <div role="tabpanel" class="tab-pane fade" id="tab_content2" aria-labelledby="ready" v-if="status == 'ready'">
                <order-list :id="'table_content2'" :orders='orders'></order-list>
              </div>
              <div role="tabpanel" class="tab-pane fade" id="tab_content3" aria-labelledby="shipped" v-if="status =='shipped'">
                <order-list :id="'table_content3'" :orders='orders'></order-list>
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
        orders: [],
        status: 'new'
      }
    },
    ready() {
      this.changeOrderStatus('new')
    },
    methods: {
      init() {

      },
      changeOrderStatus: function(status) {
        $.isLoading({ text: "Loading  "+ status + " orders", class:"fa fa-refresh fa-spin" });
        this.$http({
          url:'http://vanguard.dev/api/getOrders?status='+status,
          method: 'get'
        }).then(function (response) {
          this.$set('orders', response.data.data);
        }).then(function(){
          if ($("input.flat")[0]) {
            $('input.flat').iCheck({
              checkboxClass: 'icheckbox_flat-green'
            });
          }
          // Table
          $('table input').on('ifChecked', function () {
              checkState = '';
              $(this).parent().parent().parent().addClass('selected');
              countChecked();
          });
          $('table input').on('ifUnchecked', function () {
              checkState = '';
              $(this).parent().parent().parent().removeClass('selected');
              countChecked();
          });

          var checkState = '';
          $('.bulk_action input').on('ifChecked', function () {
              checkState = '';
              $(this).parent().parent().parent().addClass('selected');
              countChecked();
          });

          $('.bulk_action input').on('ifUnchecked', function () {
              checkState = '';
              $(this).parent().parent().parent().removeClass('selected');
              countChecked();
          });

          $('.bulk_action input#check-all').on('ifChecked', function () {
              checkState = 'all';
              countChecked();
          });

          $('.bulk_action input#check-all').on('ifUnchecked', function () {
              checkState = 'none';
              countChecked();
          });

          function countChecked() {
              if (checkState === 'all') {
                  $(".bulk_action input[name='id']").iCheck('check');
              }
              if (checkState === 'none') {
                  $(".bulk_action input[name='id']").iCheck('uncheck');
              }

              var checkCount = $(".bulk_action input[name='id']:checked").length;
              if (checkCount) {
                  $('.column-title').hide();
                  $('.bulk-actions').show();
              } else {
                  $('.column-title').show();
                  $('.bulk-actions').hide();
              }
          }
        });
        setTimeout( function(){
          $.isLoading("hide");
        }, 1000)
      }
    }
  }
</script>