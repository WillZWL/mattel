<template>
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
        <h4 class="modal-title" id="myModalLabel2">Cancel Reason</h4>
      </div>
      <div class="modal-body" style="height:100px;">
          <form class="form-horizontal form-label-left">
            <div class="form-group col-md-12">
              <label class="control-label col-md-3">Type: </label>
              <div class="col-md-6 col-xs-12">
                  <select class="form-control" name='type' v-on:change="changeType()">
                    <option> </option>
                    <option v-for = "type in cancelTypes">{{ type }}</option>
                  </select>
              </div>
            </div>
            <div class="form-group col-md-12">
              <label class="control-label col-md-3">Name: </label>
              <div class="col-md-6 col-xs-12">
                  <select class="form-control" name='name'>
                    <option></option>
                    <option v-for = "reason in reasons">{{ reason.reason_name }}</option>
                  </select>
              </div>
            </div>
          </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { getCancelType, getCancelReason } from '../../vuex/getters';

  export default {
    vuex: {
      getters: {
        cancelTypes: getCancelType,
        cancelReasons: getCancelReason
      }
    },
    data() {
      return {
        reasons: []
      }
    },
    methods: {
      changeType() {
        var type = $("select[name='type']").val();
        var reasonArr = [];
        var cancelReasons = this.cancelReasons;
        for (var i = cancelReasons.length - 1; i >= 0; i--) {
          if (cancelReasons[i].type == type) {
            reasonArr.push(cancelReasons[i])
          }
        }
        this.$set('reasons', reasonArr);
      }
    }
  }

</script>