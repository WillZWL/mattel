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
        <ul class="pagination right">
          <template v-if="meta.pagination.current_page == 1">
            <li class="paginate_button previous disabled">
              <a aria-controls="datatable-fixed-header" tabindex="0">Previous</a>
            </li>
          </template>
          <template v-else>
            <li class="paginate_button previous">
              <a aria-controls="datatable-fixed-header" tabindex="0" @click="pagination(meta.pagination.links.previous)">Previous</a>
            </li>
          </template>
          <li class="paginate_button current disabled">
            <a aria-controls="datatable-fixed-header" tabindex="0" >
              Page {{meta.pagination.current_page}} of {{meta.pagination.total_pages}}
            </a>
          </li>
          <template v-if="meta.pagination.current_page < meta.pagination.total_pages">
            <li class="paginate_button next" id="datatable-fixed-header_next">
              <a aria-controls="datatable-fixed-header" tabindex="0" @click="pagination(meta.pagination.links.next)">Next</a>
            </li>
          </template>
          <template v-else>
            <li class="paginate_button next disabled" id="datatable-fixed-header_next">
              <a aria-controls="datatable-fixed-header" tabindex="0">Next</a>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mattelSkuMappingSearch } from '../../vuex/actions';
  import { getMappingLists, getMappingMeta } from '../../vuex/getters';

  export default {
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
