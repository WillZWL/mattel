<template>
  <div class="col-md-12 col-sm-12 col-xs-12">
    <div class="x_panel">
      <div class="x_title">
        <h2>Filters</h2>
        <ul class="nav navbar-right panel_toolbox">
          <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a></li>
        </ul>
        <div class="clearfix"></div>
      </div>
      <div class="x_content">
        <form name="fm" class="form_search form-horizontal form-label-left" onsubmit="return false">
          <!--left side-->
          <div class="col-md-6 col-xs-12">
            <div class="form-group">
                <label class="control-label col-md-4">Mattel SKU.</label>
                <div class="col-md-6 col-xs-12">
                    <input type="text" name="mattel_sku" class="form-control col-md-6 col-xs-12">
                </div>
            </div>
          </div>
          <!--right side-->
          <div class="col-md-6 col-xs-12">
            <!-- <div class="form-group">
                <label class="control-label col-md-4">DC SKU.</label>
                <div class="col-md-6 col-xs-12">
                    <input type="text" name="dc_sku" class="form-control col-md-6 col-xs-12">
                </div>
            </div> -->
          </div>
          <div class="form-group col-md-12">
            <div class="col-md-12 col-sm-12 col-xs-12 col-md-offset-5">
              <input type="button" class="btn btn-dark" name='reset' value="Reset">
              <input type="button" class="btn btn-success" name="search" value="Search" @click="submitForm()">
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { skuInventorySearch } from '../../vuex/actions';

export default {
  vuex: {
    actions: {
      submitForm: skuInventorySearch
    }
  },
  ready () {
    if (url('query')) {
      this.submitForm(url('query'));
    }
  }
}
</script>
