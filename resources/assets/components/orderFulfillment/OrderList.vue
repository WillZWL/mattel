<style>
  table {
    font-size:10px;
  }
  table .fa-search-plus {
    font-size: 16px;
  }
  .alert {
    padding: 5px;margin-bottom: 10px;
  }
  .alert-dismissible .close {
    top: 0;right: 0;line-height: 0.8
  }
</style>
<template>
  <div class="x_content" v-if="id == 'table_content2'">
    <div class="col-md-6 col-xs-12 form-horizontal">
      <div class="form-group">
          <label class="control-label col-md-3">Tracking No.</label>
          <div class="col-md-6 col-xs-12">
              <input type="text" name="tracking_no" class="form-control" placeholder="Enter or Scan Tracking No"
              v-on:keyup.enter="scanTrackingNo()" v-model="tracking_no">
          </div>
      </div>
    </div>
    <div class="clearfix"></div>
    <!--success-->
    <div v-if="scanResultList.length>0">
      <div class="alert alert-success alert-dismissible fade in" role="alert" v-for="scanResult in scanResultList">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span>
          </button>
          {{scanResult.text}}
      </div>
    </div>
  </div>
  <table id="{{id}}" class="table table-striped table-bordered bulk_action jambo_table" width="100%">
    <thead>
      <tr>
        <th>
          <input type="checkbox" id="check-all" class="flat">
        </th>
        <th v-for="header in headers">{{header}}</th>
        <th>Order Items List</th>
        <th v-if="id == 'table_content1'">Action</th>
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
          <a data-toggle="modal" data-target=".overview{{$index}}-{{id}}" v-on:click="fetchOrderDetail(order.id)">
            {{order.platform_order_id}}&nbsp;&nbsp;<i class="fa fa-search-plus"></i>
          </a>
          <div class="modal fade overview{{$index}}-{{id}}" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
            <!-- detail overview-->
            <order-detail :index="$index" :detail="detail"></order-detail>
          </div>
        </td>
        <td>{{order.order_create_date}}</td>
        <td>{{order.update_date}}</td>
        <td>{{order.payment_method}}</td>
        <td>
          <table class="table table-striped table-bordered">
            <tr>
              <td>SKU</td>
              <td>Qty</td>
              <td>Inventory</td>
            </tr>
            <tr v-for="item in order.items">
              <td>{{ item.sku }}</td>
              <td>{{ item.qty }}</td>
              <template v-if="item.inventory < item.qty">
                <td class="alert alert-warning">{{ item.inventory }}</td>
              </template>
              <template v-else>
                <td>{{ item.inventory }}</td>
              </template>
            </tr>
          </table>
        </td>
        <td v-if="id == 'table_content1'">
          <template v-if="id == 'table_content1'">
            <button v-if="isCanReadyToShip(order)" type="button" class="btn btn-sm btn-primary"
                    v-on:click="setReadyToShip(order.id)">
                    Ready To Ship</button>
            <button v-else type="button" class="btn btn-sm btn-default disabled not-allowed">
                    Ready To Ship</button>
            <button data-toggle="modal" data-target=".cancelorder" type="button" class="btn btn-danger btn-sm" v-on:click="cancelOrder(order.id)">
              <i class="fa fa-trash-o"></i> Cancel
            </button>
          </template>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="modal fade cancelorder" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
    <cancel-reason :cancelorders="cancelOrderList"></cancel-reason>
  </div>

  <pagination-component :meta="meta"></pagination-component>

  <div class="x_content">
    <button v-if="id == 'table_content2'" type="button" class="btn btn-default"
            data-toggle="tooltip" data-placement="bottom" title="For selected orders"
            v-on:click="printPickingList()"><i class="fa fa-print"></i>  Picking List</button>
    <button v-if="id == 'table_content2'" type="button" class="btn btn-default" data-toggle="tooltip"
            data-placement="bottom" title="For selected orders"
            v-on:click="printInvoice()"><i class="fa fa-print"></i>  Invoice</button>
    <button v-if="id == 'table_content2'" type="button" class="btn btn-default"
            data-toggle="tooltip" data-placement="bottom" title="For selected orders"
            v-on:click="printAWBLable()"><i class="fa fa-print"></i>  AWB label</button>
    <button v-if="id == 'table_content2'" type="button" class="btn btn-default"
            data-toggle="tooltip" data-placement="bottom" title="For selected orders"
            v-on:click="printCarrierManifestLable()"><i class="fa fa-print"></i>  Carrier Manifest</button>
    <button v-if="id == 'table_content1'" type="button" class="btn btn-primary"
            data-toggle="tooltip" data-placement="bottom" title="Moves all orders with available stock to 'Ready to Ship'"
            v-on:click="allocateOrders('all')"><i class="fa fa-send"></i> Allocate Orders</button>
    <button v-if="id == 'table_content1'" type="button" class="btn btn-primary"
              data-toggle="tooltip" data-placement="bottom" title="For selected orders"
            v-on:click="setReadyToShip()"
            >Ready To Ship</button>
    <button v-if="id == 'table_content1'" type="button" class="btn btn-danger"
            data-toggle="modal" data-target=".cancelorder"
            v-on:click="cancelOrder()">
            <i class="fa fa-trash-o"></i> Cancel</button>
    <button v-if="id == 'table_content1'" type="button" class="btn btn-primary"
             data-toggle="tooltip" data-placement="bottom" title="Download Report"
             v-on:click="download()">
            <i class="fa fa-print"></i> Download
    </button>

  </div>
</template>
<script>
  import OrderDetail from './OrderDetail.vue'
  import CancelReason from './CancelReason.vue'
  import PaginationComponent from '../common/PaginationComponent.vue';

  import {
      API_URL,
      checkboxHelper,
      setReadyToShip,
      printPickingList,
      printInvoice,
      printAWBLable,
      printCarrierManifestLable,
      fetchOrderDetail,
      scanTrackingNo,
      switchOrderStatusTab,
      fetchCancelReason,
      getSelectedOrders,
      downloadDocument
    } from '../../vuex/actions';

  import { getTableHeaders, getOrderDetail,getScanResult, getTabStatus, getOrdersMeta } from '../../vuex/getters';

  export default {
    vuex: {
      actions: {
        checkboxHelper,
        setReadyToShip,
        printPickingList,
        printInvoice,
        printAWBLable,
        printCarrierManifestLable,
        fetchOrderDetail,
        vuexScanTrackingNo:scanTrackingNo,
        fetchOrderDetail,
        switchOrderStatusTab,
        getSelectedOrders,
        fetchCancelReason,
        downloadDocument
      },
      getters: {
        headers: getTableHeaders,
        detail: getOrderDetail,
        scanResultData: getScanResult,
        meta: getOrdersMeta,
        status: getTabStatus
      },
    },
    components: {
      OrderDetail,
      CancelReason,
      PaginationComponent
    },
    props: [
      'id',
      'orders'
    ],
    ready() {
      this.checkboxHelper()
    },
    data() {
      return {
        scanResultList: [],
        tracking_no: '',
        cancelOrderList: []
      }
    },
    methods: {
      download: function()
      {
        var downloadUrl = API_URL+'export-orders?status='+this.status+'&access_token='+localStorage.access_token;
        this.downloadDocument(downloadUrl);
      },
      cancelOrder: function(order = '')
      {
        this.cancelOrderList = [];
        if (order) {
          this.cancelOrderList.push(order);
        } else {
          this.cancelOrderList = this.getSelectedOrders();
        }
        this.fetchCancelReason();
      },
      allocateOrders: function(orders = [])
      {
        $.isLoading({ text: "All order with available stock moving to Ready to Ship", class:"fa fa-refresh fa-spin" });
        setTimeout( function(){
          $.isLoading("hide");
        }, 2000)
      },
      scanTrackingNo: function() {
        var tracking_no = this.tracking_no.trim()
        if (tracking_no) {
          this.vuexScanTrackingNo(tracking_no);
          this.scanResultList.push({text:"Your Tranking No is "+ tracking_no});
          this.tracking_no = '';
        }
      },
      pagination: function(url) {
        var query_str = $.url('query', url);
        this.switchOrderStatusTab(this.status, query_str);
      },
      isCanReadyToShip: function(order) {
        var can = true;
        $.each(order.items, function(key, item) {
          if (item.qty > item.inventory) {
            can = false;
          }
        });
        return can;
        if (disabled) {
          return "btn-primary";
        } else {
          return "btn-default disabled not-allowed";
        }
      }
    }
  }
</script>