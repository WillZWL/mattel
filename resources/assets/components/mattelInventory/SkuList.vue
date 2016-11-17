<template>
  <div class="col-md-12 col-sm-12 col-xs-12">
    <div class="x_panel">
      <div class="x_content">
        <table class="table table-striped table-bordered bulk_action jambo_table" width="100%">
          <thead>
            <tr>
              <th>WAREHOUSE ID</th>
              <th>Mattel SKU</th>
              <th>DC SKU</th>
              <th width="15%">Inventory</th>
              <th width="15%">Threshold</th>
              <th width="10%">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="inventory in inventorys">
              <td>{{ inventory.warehouse_id }}</td>
              <td>{{ inventory.mattel_sku }}</td>
              <td>{{ inventory.dc_sku }}</td>
              <td>
                <input type="number" class="form-control col-md-6 col-xs-12" id="inventory{{inventory.id}}"  value="{{ inventory.inventory }}">
              </td>
              <td>
                <input type="number" class="form-control col-md-6 col-xs-12" id="threshold{{inventory.id}}" value="{{ inventory.threshold }}">
              </td>
              <td>
                 <button type="button" class="btn btn-primary" @click="updateInventory(inventory.id)"><i class="fa fa-save"></i> Update</button>
              </td>
            </tr>
          </tbody>
        </table>
        <pagination-component :meta="meta"></pagination-component>
      </div>
    </div>
  </div>
</template>

<script>
  import PaginationComponent from '../common/PaginationComponent.vue';
  import { skuInventorySearch, API_URL } from '../../vuex/actions';
  import { getInventoryLists, getInventoryMeta } from '../../vuex/getters';
  export default {
    components: {
      PaginationComponent
    },
    vuex: {
      actions: {
        submitForm: skuInventorySearch
      },
      getters: {
        inventorys: getInventoryLists,
        meta: getInventoryMeta,
      }
    },
    methods: {
      pagination: function(url) {
        var query_str = $.url('query', url);
        this.submitForm(query_str);
      },
      updateInventory: function(id) {
        var instance = this;
        var inventorys = this.inventorys;
        var postData = {};

        var inventory = $('#inventory'+id).val();
        var threshold = $('#threshold'+id).val();
        console.log(inventory);
        inventorys.filter(function (inventoryObj) {
          if (inventoryObj.id == id) {
            postData = inventoryObj;
          }
        });
        postData.inventory = inventory;
        postData.threshold = threshold;
        $.isLoading({ text: "Updating", class:"fa fa-refresh fa-spin" });
        this.$http.post(
          API_URL+'platform-market-inventory',
          postData
        ).then( function(response) {
          $.isLoading("hide");
          if (response.data.success) {
              $.isLoading({ text:response.data.message, class:"fa fa-check" });
          } else {
              $.isLoading({ text:response.data.message, class:"fa fa-exclamation-triangle" });
          }
          setTimeout( function(){
              $.isLoading("hide");
          }, 3000);
        }).catch(function(){
            $.isLoading("hide");
            $.isLoading({ text: "Error 500, Internal Server Error", class:"fa fa-exclamation-triangle" });
            setTimeout( function(){
                $.isLoading("hide");
            }, 3000);
        });
      }
    }
  }
</script>
