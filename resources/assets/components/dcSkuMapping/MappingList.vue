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
            </tr>
          </thead>
          <tbody>
            <tr v-for="mapping in mappings">
              <td>{{ mapping.warehouse_id }}</td>
              <td>{{ mapping.mattel_sku }}</td>
              <td>{{ mapping.dc_sku }}</td>
            </tr>
          </tbody>
        </table>
        <pagination :meta="meta"></pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import Pagination from '../common/Pagination.vue';
  import { mattelSkuMappingSearch } from '../../vuex/actions';
  import { getMappingLists, getMappingMeta } from '../../vuex/getters';
  export default {
    components: {
      Pagination
    },
    vuex: {
      actions: {
        submitForm: mattelSkuMappingSearch
      },
      getters: {
        mappings: getMappingLists,
        meta: getMappingMeta,
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
