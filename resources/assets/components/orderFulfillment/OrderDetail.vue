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
                <div class="col-md-6 col-xs-12">
                  <div class="x_panel">
                    <p><b>Bill Name :</b> {{detail.bill_name}}</p>
                    <p><b>Bill Phones Number :</b> {{detail.bill_phone}}</p>
                    <p><b>Bill Postal Code :</b> {{detail.bill_postal_code}}</p>
                    <p><b>Bill Country :</b> {{detail.bill_county}}</p>
                    <p><b>Bill City :</b> {{detail.bill_city}}</p>
                    <p><b>Bill District :</b> {{detail.bill_district}}</p>
                    <p><b>Bill Address :</b><br/>
                       {{detail.bill_address_line_1}}<br/>
                       {{detail.bill_address_line_2}}<br/>
                       {{detail.bill_address_line_3}}<br/>
                    </p>
                  </div>
                </div>
                <div class="col-md-6 col-xs-12">
                  <div class="x_panel">
                    <p><b>Shipping Name :</b> {{detail.name}}</p>
                    <p><b>Shipping Phones Number :</b> {{detail.phone}}</p>
                    <p><b>Shipping Postal Code :</b> {{detail.postal_code}}</p>
                    <p><b>Shipping Country :</b> {{detail.county}}</p>
                    <p><b>Shipping City :</b> {{detail.city}}</p>
                    <p><b>Shipping District :</b> {{detail.district}}</p>
                    <p><b>Shipping Address :</b><br/>
                       {{detail.address_line_1}}<br/>
                       {{detail.address_line_2}}<br/>
                       {{detail.address_line_3}}<br/>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div role="tabpanel" class="tab-pane fade" id="order-detail-{{index}}-tab2" aria-labelledby="item-list-tab">
              <table class="table table-striped table-bordered bulk_action jambo_table" width="100%">
                <thead>
                  <tr>
                    <th>Platform Order no.</th>
                    <th>Platform SKU</th>
                    <th>Product Name</th>
                    <th>Shipment Type</th>
                    <th>Price</th>
                    <th>Shipping</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in detail.items">
                    <td>{{item.platform_order_id}}</td>
                    <td>{{item.seller_sku}}</td>
                    <td>{{item.title}}</td>
                    <td>{{item.shipping_type}}</td>
                    <td>{{item.item_price}}</td>
                    <td>{{item.shipping_price}}</td>
                    <td>{{item.status}}</td>
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
      'index',
      'detail'
    ],
  }
</script>