<template>
  <div class="container body">
    <div id="app">
      <div class="main_container" v-if="flag">
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
import auth from '../js/auth'

export default {
  // ready() {
  //   console.log(authenticated);
  // },
  data() {
    return {
      flag: true,
      authenticated: auth.checkAuth()
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