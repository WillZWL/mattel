<style>
  table {
    font-size:10px;
  }
  table .fa-search-plus {
    font-size: 16px;
  }
</style>
<template>
  <table id="{{id}}" class="table table-striped table-bordered bulk_action jambo_table" width="100%">
    <thead>
      <tr>
        <th>
          <input type="checkbox" id="check-all" class="flat">
        </th>
          <th v-for="header in headers">{{header}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="order in orders">
        <td class="a-center td_checkbox">
          <input type="checkbox" class="flat" name="id" value="{{order.id}}">
        </td>
        <td>{{order.biz_type}}</td>
        <td>{{order.merchant}}</td>
        <td>
          <a data-toggle="modal" data-target=".overview{{$index}}-{{id}}">
            {{order.platform_order_id}}&nbsp;&nbsp;<i class="fa fa-search-plus"></i>
          </a>
          <div class="modal fade overview{{$index}}-{{id}}" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
            <!-- detail overview-->
            <order-detail :index="$index"></order-detail>
          </div>
        </td>
        <td>{{order.order_create_date}}</td>
        <td>{{order.update_date}}</td>
        <td>{{order.payment_method}}</td>
        <td>
          <p v-for="(sku, qty) in order.items">{{sku}} Qty:{{qty}}</p>
        </td>
        <td>{{order.inventory}}</td>
        <td v-if="id != 'table_content3'">
          <template v-if="id == 'table_content1'">
            <button v-if="order.inventory > order.order_qty" type="button" class="btn btn-sm btn-primary">
                    Ready To Ship</button> &nbsp;&nbsp;
            <button v-else type="button" class="btn btn-sm btn-default disabled not-allowed">
                    Ready To Ship</button>
          </template>
          <button type="button" class="btn btn-danger btn-sm" v-on:click="cancel(order.esg_so_no)"><i class="fa fa-trash-o"></i> Cancel</button>
        </td>
      </tr>
    </tbody>
  </table>
  <div v-if="id != 'table_content3'" class="x_content">
    <button v-if="id == 'table_content2'" type="button" class="btn btn-default"
            data-toggle="tooltip" data-placement="bottom" title="For selected orders"
            v-on:click="printPickingList()"><i class="fa fa-print"></i>  Picking List</button>
    <button v-if="id == 'table_content2'" type="button" class="btn btn-default" data-toggle="tooltip"
            data-placement="bottom" title="For selected orders"
            v-on:click="printInvoice()"><i class="fa fa-print"></i>  Invoice</button>
    <button v-if="id == 'table_content2'" type="button" class="btn btn-default"
            data-toggle="tooltip" data-placement="bottom" title="For selected orders"
            v-on:click="printAWBLable()"><i class="fa fa-print"></i>  AWB label</button>
    <button v-if="id == 'table_content1'" type="button" class="btn btn-primary"
            data-toggle="tooltip" data-placement="bottom" title="Moves all orders with available stock to 'Ready to Ship'"
            v-on:click="allocateOrders('all')"><i class="fa fa-send"></i> Allocate Orders</button>
    <button v-if="id == 'table_content1'" type="button" class="btn btn-primary"
              data-toggle="tooltip" data-placement="bottom" title="For selected orders"
            v-on:click="setReadyToShip()"
            >Ready To Ship</button>
    <button v-if="id == 'table_content2'" type="button" class="btn btn-primary"
            data-toggle="tooltip" data-placement="bottom" title="For selected orders"
            v-on:click="scanTrackingNo()">
            Scan Tracking No.</button>
    <button v-if="id != 'table_content3'" type="button" class="btn btn-danger"
            data-toggle="tooltip" data-placement="bottom" title="For selected orders"
            v-on:click="cancelOrder()">
            <i class="fa fa-trash-o"></i> Cancel</button>
  </div>
</template>
<script>
  import OrderDetail from './OrderDetail.vue'
  import {
      checkboxHelper,
      setReadyToShip,
      cancelOrder,
      printPickingList,
      printInvoice,
      printAWBLable,
      scanTrackingNo,
    } from '../../vuex/actions';

  import { getTableHeaders } from '../../vuex/getters';

  export default {
    vuex: {
      actions: {
        checkboxHelper,
        setReadyToShip,
        cancelOrder,
        printPickingList,
        printInvoice,
        printAWBLable,
        scanTrackingNo
      },
      getters: {
        headers: getTableHeaders
      }
    },
    components: {
      OrderDetail
    },
    props: [
      'id',
      'orders'
    ],
    ready() {
      this.checkboxHelper()
    },
    data() {
      return {}
    },
    methods: {
      allocateOrders: function(orders = [])
      {
        $.isLoading({ text: "All order with available stock moving to Ready to Ship", class:"fa fa-refresh fa-spin" });
        setTimeout( function(){
          $.isLoading("hide");
        }, 2000)
      }
    }
  }
</script>