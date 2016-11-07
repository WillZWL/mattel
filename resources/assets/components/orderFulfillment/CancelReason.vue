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
                  <select class="form-control" name='reason'>
                    <option></option>
                    <option v-for = "reason in reasons">{{ reason.reason_name }}</option>
                  </select>
              </div>
            </div>
          </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal" v-on:click="submitCancel()">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { postCancelOrder } from '../../vuex/actions'
  import { getCancelType, getCancelReason } from '../../vuex/getters';

  export default {
     props: [
      'cancelorders'
    ],
    vuex: {
      actions: {
        postCancelOrder
      },
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
      submitCancel() {
        var orders = this.cancelorders;
        var type = $("select[name='type']").val();
        var reason = $("select[name='reason']").val();
        if (reason && (orders.length > 0)) {
          this.postCancelOrder(orders, type, reason);
        } else {
          $.isLoading({ text: "Please select reason and cancel orders", class:"fa-exclamation-triangle" });
          setTimeout( function(){
            $.isLoading("hide");
          }, 2000)
        }
      },
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