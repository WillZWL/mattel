<style>
  .login{
    padding: 10px 20px;
    margin-left: 0px;
    z-index: 2;
    background:#F7F7F7;
  }
</style>
<template>
  <router-view></router-view>
</template>

<script>

import auth from '../js/auth'
import store from '../vuex/store';
export default {
  store,
  replace: false
}
</script>