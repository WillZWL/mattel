<template>
  <div class="container body">
    <div id="app">
      <div class="main_container" v-if="auth">
        <sidebar></sidebar>
        <navbar></navbar>
        <!-- Main content -->
        <div class="right_col" role="main">
          <section class="content">
            <!-- Page Title -->
            <titlebar></titlebar>
            <!-- Your Page Content Here -->
            <!-- route outlet -->
            <router-view></router-view>
          </section>
        </div>
        <!-- /.content -->
        <footbar></footbar>
      </div>
      <div class="main_container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Titlebar from './common/Titlebar.vue';
import Navbar from './common/Navbar.vue';
import Sidebar from './common/Sidebar.vue';
import Footbar from './common/Footbar.vue';
import store from '../vuex/store';

export default {
  ready() {
    console.log(this);
    this.$set('auth', this.$route.auth)
  },
  data() {
    return {
      auth:false
    }
  },
  components: {
  Titlebar,
  Navbar,
  Sidebar,
  Footbar
  },
  store,
  replace: false
}
</script>