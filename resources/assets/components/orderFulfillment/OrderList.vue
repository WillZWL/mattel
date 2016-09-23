<style>
  table {
    font-size:10px;
  }
  table .fa-search-plus {
    font-size: 16px;
  }
</style>
<template>
<ul>
<li>New</li>
<li>Ready</li>
<li>shipped</li>
</ul>
  <table id="{{id}}" class="table table-striped table-bordered bulk_action jambo_table" width="100%">
    <thead>
      <tr>
        <th>
          <input type="checkbox" id="check-all" class="flat">
        </th>
        <template v-if="id == 'table_content1'">
          <th v-for="header in new_headers">{{header}}</th>
        </template>
        <template v-if="id == 'table_content2'">
          <th v-for="header in ready_headers">{{header}}</th>
        </template>
        <template v-if="id == 'table_content4'">
          <th v-for="header in shipped_headers">{{header}}</th>
        </template>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items">
        <td class="a-center td_checkbox">
          <input type="checkbox" class="flat" name="id" value="">
        </td>
        <td>{{item.biz_type}}</td>
        <td>{{item.merchant}}</td>
        <td>
          <a data-toggle="modal" data-target=".overview{{$index}}-{{id}}">
            {{item.lazada_so_no}}&nbsp;&nbsp;<i class="fa fa-search-plus"></i>
          </a>
          <div class="modal fade overview{{$index}}-{{id}}" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
            <!-- detail overview-->
            <order-detail :index="$index"></order-detail>
          </div>
        </td>
        <td>{{item.order_create_date}}</td>
        <td>{{item.update_date}}</td>
        <td>{{item.payment_method}}</td>
        <td>{{item.order_qty}}</td>
        <td>{{item.inventory}}</td>
        <td v-if="id == 'table_content2'">
          <input type="text" name="tracking_no" class="col-md form-control input_sm tracking-no-{{item.esg_so_no}}"
            v-on:change="scanTrackingNo(item.esg_so_no)">
        </td>
        <td v-if="id != 'table_content4'">
          <button v-if="id == 'table_content1'" type="button" class="btn btn-primary btn-sm"
                  v-on:click="readyToShip(item.esg_so_no)">Ready to Ship
          </button><br />
          <button type="button" class="btn btn-danger btn-sm" v-on:click="cancel(item.esg_so_no)"><i class="fa fa-trash-o"></i> Cancel</button>
        </td>
      </tr>
    </tbody>
  </table>
  <div v-if="id != 'table_content4'" class="x_content">
    <button v-if="id == 'table_content1'" type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="For selected orders"><i class="fa fa-print"></i>  Picking List</button>
    <button v-if="id == 'table_content2'" type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="For selected orders"><i class="fa fa-print"></i>  Invoice</button>
    <button v-if="id == 'table_content2'" type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="For selected orders"><i class="fa fa-print"></i>  AWB label</button>
    <button v-if="id == 'table_content1'" type="button" class="btn btn-primary"
            data-toggle="tooltip" data-placement="bottom" title="Moves all orders with available stock to 'Ready to Ship'"
            v-on:click="allocateOrders('all')"><i class="fa fa-send"></i> Allocate Orders</button>
    <button v-if="id == 'table_content1'" type="button" class="btn btn-primary"
            data-toggle="tooltip" data-placement="bottom" title="For selected orders">
            Ready To Ship</button>
    <button v-if="id != 'table_content4'" type="button" class="btn btn-danger"
            data-toggle="tooltip" data-placement="bottom" title="For selected orders">
            <i class="fa fa-trash-o"></i>  Cancel</button>
  </div>
</template>
<script>
  import OrderDetail from './OrderDetail.vue'
  export default {
    components: {
      OrderDetail
    },
    props: [
      'id',
      'items'
    ],
    ready() {
      this.init()
    },
    data() {
      return {
        new_headers: [
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
        ready_headers: [
          'BizType',
          'Merchant',
          'Platform Order No',
          'Order Date',
          'Updated Date',
          'Payment Method',
          'Item QTY',
          'Inventory',
          'Scan Tracking No.',
          'Action'
        ],
        shipped_headers: [
          'BizType',
          'Merchant',
          'Platform Order No',
          'Order Date',
          'Updated Date',
          'Payment Method',
          'Item QTY',
          'Inventory'
        ]
      }
    },
    methods: {
      init() {
        var table_selector = '#'+this.id;
        var table = $(table_selector).DataTable({
          // fixedHeader: true,
          bSort:false,
          buttons: []
        });
      },
      allocateOrders: function(orders)
      {
        $.isLoading({ text: "All order with available stock moving to Ready to Ship", class:"fa fa-refresh fa-spin" });
        setTimeout( function(){
          $.isLoading("hide");
        }, 2000)
      },
      readyToShip: function(order_no)
      {
        $.isLoading({ text: "Setting "+order_no+ " to Ready To Ship", class:"fa fa-refresh fa-spin" });
        setTimeout( function(){
          $.isLoading("hide");
        }, 2000)
      },
      cancel: function(order_no)
      {
        $.isLoading({ text: order_no + " Canceling", class:"fa fa-refresh fa-spin" });
        setTimeout( function(){
          $.isLoading("hide");
        }, 2000)
      },
      scanTrackingNo: function(order_no)
      {
        var tracking_no = $(".tracking-no-"+order_no).val();
        $.isLoading({ text: order_no + " Shipped, TrackingNo is "+ tracking_no, class:"fa fa-refresh fa-spin" });
        setTimeout( function(){
          $.isLoading("hide");
        }, 2000)
      }
    }
  }
</script>