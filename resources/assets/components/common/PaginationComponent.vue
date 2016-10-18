<template>
  <ul class="pagination right">
    <template v-if="meta.pagination.current_page < 2">
      <li class="paginate_button previous disabled">
        <a tabindex="0">Previous</a>
      </li>
    </template>
    <template v-else>
      <li class="paginate_button previous">
        <a tabindex="0" @click="pagination(meta.pagination.links.previous)">Previous</a>
      </li>
    </template>
    <li class="paginate_button current disabled">
      <a tabindex="0" >
        Page {{ meta.pagination.current_page }} of {{ meta.pagination.total_pages }}
      </a>
    </li>
    <template v-if="meta.pagination.current_page < meta.pagination.total_pages">
      <li class="paginate_button next" id="datatable-fixed-header_next">
        <a tabindex="0" @click="pagination(meta.pagination.links.next)">Next</a>
      </li>
    </template>
    <template v-else>
      <li class="paginate_button next disabled">
        <a tabindex="0">Next</a>
      </li>
    </template>
  </ul>
</template>
<script>
  export default {
    props: [
      'meta',
    ],
    methods: {
      pagination: function(url) {
        this.$parent.pagination(url)
      }
    }
  }
</script>