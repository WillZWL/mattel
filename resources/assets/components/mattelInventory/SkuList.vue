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
              <th>Inventory</th>
              <th>Threshold</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="inventory in inventorys">
              <td>{{ inventory.warehouse_id }}</td>
              <td>{{ inventory.mattel_sku }}</td>
              <td>{{ inventory.dc_sku }}</td>
              <td>{{ inventory.inventory }}</td>
              <td>{{ inventory.threshold }}</td>
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
  import { skuInventorySearch } from '../../vuex/actions';
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
      }
    }
  }
</script>
