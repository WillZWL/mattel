<style>
  .modal-body {
    font-size: 12px;
  }
</style>
<template>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
         <h4 class="modal-title" id="myModalLabel2">Order Detail</h4>
      </div>
      <div class="modal-body">
        <div class="" role="tabpanel" data-example-id="togglable-tabs">
          <ul class="nav nav-tabs bar_tabs" role="tablist">
            <li role="presentation" class="active">
              <a href="#order-detail-{{index}}-tab1" id="customer-info-tab" role="tab" data-toggle="tab" aria-expanded="true">
                Customer Information
              </a>
            </li>
            <li role="presentation" class="">
              <a href="#order-detail-{{index}}-tab2" role="tab" id="item-list-tab" data-toggle="tab" aria-expanded="false">
                Items List
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <div role="tabpanel" class="tab-pane fade active in" id="order-detail-{{index}}-tab1" aria-labelledby="customer-info-tab">
              <div class="x_panel">
                <p><b>Client ID:</b> 000888</p>
                <p><b>Customer Name:</b> Will Zhang</p>
                <p><b>Phones Number:</b> 097732324354</p>
                <p><b>Country:</b> CN</p>
                <p><b>State:</b> </p>
                <p><b>City:</b> </p>
                <p><b>Address:</b> </p>
                <p><b>Postal Code:</b> 78683289</p>
              </div>
            </div>
            <div role="tabpanel" class="tab-pane fade" id="order-detail-{{index}}-tab2" aria-labelledby="item-list-tab">
              <table class="table table-striped table-bordered bulk_action jambo_table" width="100%">
                <thead>
                  <tr>
                    <th>Platform Order no.</th>
                    <!-- <th>ESG SKU</th> -->
                    <th>Platform SKU</th>
                    <th>Product Name</th>
                    <th>Shipment Type</th>
                    <th>Price</th>
                    <th>Shipping</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>58009133</td>
                    <td>FR43890934BHK</td>
                    <td>Iphone 7 plus ()</td>
                    <td>DropShipping</td>
                    <td>7188</td>
                    <td>0</td>
                    <td>Shipped</td>
                  </tr>
                  <tr>
                    <td>58009133</td>
                    <td>FR43890934BHK</td>
                    <td>Iphone 7 plus ()</td>
                    <td>DropShipping</td>
                    <td>7188</td>
                    <td>0</td>
                    <td>Shipped</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
     props: [
      'index'
    ],
  }
</script>