<style>
  .login{
    padding: 10px 20px;
    margin-left: 0px;
    z-index: 2;
    background:#F7F7F7;
  }
</style>
<template>
  <div class="container body">
    <div id="app">
      <div class="main_container" v-if="authenticated">
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
      <div class="main_container" v-else>
        <div class="login" role="main">
          <router-view></router-view>
        </div>
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
import auth from '../js/auth'

export default {
  ready() {
    console.log(this);
  },
  data() {
    return {
      flag: true,
      authenticated: this.authenticated
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