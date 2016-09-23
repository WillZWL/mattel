<style>

</style>
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
                <label class="control-label col-md-4">Lazada Order NO.</label>
                <div class="col-md-6 col-xs-12">
                    <input type="text" name="" class="form-control col-md-6 col-xs-12">
                </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-4">Order Create Date</label>
              <div class="col-md-6 col-xs-12">
                <div class="controls">
                  <div class="input-prepend input-group">
                    <span class="add-on input-group-addon"><i class="glyphicon glyphicon-calendar fa fa-calendar"></i></span>
                    <input type="text" name="reservation" id="reservation" class="form-control" value="03/18/2013 - 03/23/2013" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--right side-->
          <div class="col-md-6 col-xs-12">
          </div>
          <div class="form-group col-md-12">

          </div>
          <div class="form-group col-md-12">
            <div class="col-md-12 col-sm-12 col-xs-12 col-md-offset-5">
              <input type="button" class="btn btn-dark" name='reset' value="Reset">
              <input type="button" class="btn btn-success" name="search" value="Search">
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    ready() {
      $('#reservation').daterangepicker(null, function(start, end, label) {
        console.log(start.toISOString(), end.toISOString(), label);
      });
    }
  }
</script>