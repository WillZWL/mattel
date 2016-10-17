<template>
  <div class="nav-sm">
    <div class="container body">
      <div id="app">
        <sidebar></sidebar>
        <navbar></navbar>
          <div class="right_col" role="main">
            <titlebar></titlebar>
            <div class="row">
              <filters></filters>
              <sku-list></sku-list>
              <upload></upload>
            </div>
          </div>
        <footbar></footbar>
      </div>
    </div>
  </div>
</template>
<script>
  import Filters from './mattelInventory/Filters.vue';
  import SkuList from './mattelInventory/SkuList.vue';
  import Upload from './mattelInventory/Upload.vue';
  import Titlebar from './common/Titlebar.vue';
  import Navbar from './common/Navbar.vue';
  import Sidebar from './common/Sidebar.vue';
  import Footbar from './common/Footbar.vue';
  export default {
    components: {
      Filters,
      SkuList,
      Upload,
      Titlebar,
      Navbar,
      Sidebar,
      Footbar
    }
  }
</script>