import Vue from 'vue';
import VueResource from 'vue-resource'
Vue.use(VueResource);

// export const API_URL = 'http://vanguard/api/' // For DEV
export const API_URL = 'http://admincentre.eservicesgroup.com:7890/api/'

export const tableHeaders = [
              'BizType',
              'Merchant',
              'Platform Order No',
              'Order Date',
              'Updated Date',
              'Payment Method'
            ];

export const ordersMeta = {
    pagination: {
        'current_page': 0,
        'total_pages': 0
    }
}

export const switchOrderStatusTab = ({ dispatch }, status = 'new', queryStr = '') => {
    dispatch('FETCH_ORDER_LISTS', [], ordersMeta);
    $.isLoading({ text: "Loading  "+ status + " orders", class:"fa fa-refresh fa-spin" });
    dispatch('SET_TABLE_HEADERS', tableHeaders)
    dispatch('SET_TAB_STATUS', status);
    Vue.http({
        url:API_URL+'orders?status='+status+'&'+queryStr,
        method: 'GET'
    }).then(function (response) {
        dispatch('FETCH_ORDER_LISTS', response.data.data, response.data.meta);
    }).then (function () {
        $.isLoading("hide");
    }).catch(function(){
        $.isLoading("hide");
        $.isLoading({ text: "Error 500, Internal Server Error", class:"fa fa-exclamation-triangle" });
        setTimeout( function(){
            $.isLoading("hide");
        }, 3000)
    });
};

/**
 * _getDocument  [ get pickList / AWB Lable / Invoice ]
 * @parm   {Object}
 * example
 {
    id:["14","15"],
    action:"getDocument",
    document_type:"shippingLabel"
}
 * @return
 */

const _getDocument = (params, url = 'merchant-api/order-fufillment') => {
    params.action = 'getDocument';
    var apiUrl = API_URL + url;
    Vue.http.post(
        apiUrl, params
    ).then( function (response) {
        _downloadDocument(response.data.document);
    });
};


function _downloadDocument(documentUrl){
    if(documentUrl !== null){
        $('.tempLink').remove();
        var link = document.createElement('a');
        link.setAttribute('href', documentUrl);
        link.setAttribute('class', 'tempLink');
        $('body').append(link);
        link.click();
    }
}

export const downloadDocument = ({ dispatch }, documentUrl) => {
    _downloadDocument(documentUrl);
}

/**
 * _postOrderStatus
 * @param  {Object} params
 * @param   {String} url
 * @return
 */

const _postOrderStatus = (params, url = 'merchant-api/order-fufillment') => {
    var apiUrl = API_URL + url;
    Vue.http.post(
        apiUrl, params
    ).then( function (response) {
        if(response.data.status=="success"){
            var message ='';
            $.each(response.data.message, function(key, rowData) {
                $.each(rowData, function(soNo, val) {
                    message = message + "Order No " +soNo + val;
                });
            });
            alert(message);
            window.location.reload();
        }else if (response.data.status=="failed"){
            alert(response.data.message);
        }
    }).catch( function() {
        $.isLoading({ text: "Error 500, Internal Server Error", class:"fa fa-exclamation-triangle" });
        setTimeout( function(){
            $.isLoading("hide");
        }, 1000)
    })
};

/**
 * _getSelectedOrders
 * @param  {String} selector   Jquery selector
 * @return {Array}    order lists
 */
const _getSelectedOrders = ( selector = 'input:checkbox[name=id]:checked' ) => {
    var orders = $(selector);
    if (orders.length === 0) {
        $.isLoading({ text: "Please Select order First", class:"fa fa-exclamation-triangle"});
        setTimeout( function(){
            $.isLoading("hide");
        }, 500);
        return false;
    };
    var ids = [];
    $.each(orders, function() {
      ids.push(this.value);
    });
    return ids;
};

export const getSelectedOrders = ({ dispatch }) => {
    var ids = _getSelectedOrders();
    return ids;
}

export const setReadyToShip = ({ dispatch }, orders = []) => {
    var ids = _getSelectedOrders();
    if (ids) {
        var param = {
            id: ids,
            action: 'readyToShip'
        };
        _postOrderStatus(param);
    }
};

export const postCancelOrder = ({ dispatch }, orders = [], type = '', reason = '') => {
    if (orders) {
        var param = {
            id: orders,
            action: 'cancelOrder',
            type: type,
            reason: reason
        };
        _postOrderStatus(param);
    }
};

export const printPickingList = ({ dispatch }) => {
    var ids = _getSelectedOrders();
    if (ids) {
        var param = {
            id: ids,
        };
        var apiUrl = API_URL + 'merchant-api/order-picking-list';
        Vue.http.post(
            apiUrl,
            param
        ).then( function (response) {
            _downloadDocument(response.data.document);
        });
    }
};

export const printInvoice = ({ dispatch }) => {
    var ids = _getSelectedOrders()
    if (ids) {
        var param = {
            id: ids,
            document_type: 'invoice'
        };
        _getDocument(param);
    }
};

export const printAWBLable = ({ dispatch }) => {
    var ids = _getSelectedOrders()
    if (ids) {
        var param = {
            id: ids,
            document_type: 'shippingLabel'
        };
        _getDocument(param);
    }
};

export const printCarrierManifestLable = ({ dispatch }) => {
    var ids = _getSelectedOrders()
    if (ids) {
        var param = {
            id: ids,
            document_type: 'carrierManifest'
        };
        _getDocument(param);
    }
};

export const downloadInventoryReport = ( {dispatch} ) => {
    var downloadUrl = API_URL + 'download-inventory-report?access_token='+localStorage.access_token;
    _downloadDocument(downloadUrl);
}

export const downloadMattelSkuMapping = ( {dispatch} ) => {
    var downloadUrl = API_URL + 'download-mattel-sku-mapping?access_token='+localStorage.access_token;
    _downloadDocument(downloadUrl);
}

export const scanTrackingNo = ( {dispatch}, tracking_no ) => {
    dispatch('SCAN_TRACKING_NO', {});
    $.isLoading({ text: "Loading", class:"fa fa-refresh fa-spin" });
    if (tracking_no) {
        var param = {
            "tracking_no": tracking_no,
        };
        var apiUrl = API_URL + 'merchant-api/scan-tracking-no';
        Vue.http.post(
            apiUrl,param
        ).then( function (response) {
            dispatch('SCAN_TRACKING_NO', response.data);
            $.isLoading("hide");
        });
    }
};

export const fetchOrderDetail = ({ dispatch }, order_id ) => {
    dispatch('SET_ORDER_DETAIL', {});
    $.isLoading({ text: "Loading", class:"fa fa-refresh fa-spin" });
    if (order_id) {
        Vue.http({
            url:API_URL+'orders/'+order_id,
            method: 'GET'
        }).then(function (response) {
            dispatch('SET_ORDER_DETAIL', response.data.data[0]);
            $.isLoading("hide");
        });
    }
};

export const mattelSkuMappingSearch = ({ dispatch }, queryStr = '') => {
    $.isLoading({ text: "Loading", class:"fa fa-refresh fa-spin" });
    if (queryStr == '') {
        var queryStr = $("form[name='fm']").serialize();
    }
    window.history.pushState(null, null, 'dc-sku-mapping?'+queryStr);
    Vue.http({
        url:API_URL+'mattel-sku-mapping-list?'+queryStr,
        method: 'GET'
    }).then(function (response) {
        $.isLoading("hide");
        dispatch('FETCH_MAPPING_LISTS', response.data.data, response.data.meta);
    }).catch(function(){
        $.isLoading("hide");
        $.isLoading({ text: "Error 500, Internal Server Error", class:"fa fa-exclamation-triangle" });
        setTimeout( function(){
            $.isLoading("hide");
        }, 3000)
    });
}

export const skuInventorySearch = ({ dispatch }, queryStr = '') => {
    $.isLoading({ text: "Loading", class:"fa fa-refresh fa-spin" });
    if (queryStr == '') {
        var queryStr = $("form[name='fm']").serialize();
    }
    window.history.pushState(null, null, 'inventory?'+queryStr);
    Vue.http({
        url:API_URL+'platform-market-inventory?'+queryStr,
        method: 'GET'
    }).then(function (response) {
        $.isLoading("hide");
        dispatch('FETCH_INVENTORY_LISTS', response.data.data, response.data.meta);
    }).catch(function(){
        $.isLoading("hide");
        $.isLoading({ text: "Error 500, Internal Server Error", class:"fa fa-exclamation-triangle" });
        setTimeout( function(){
            $.isLoading("hide");
        }, 3000)
    });
}

export const fetchCancelReason = ({ dispatch }) => {
    $.isLoading({ text: "Loading", class:"fa fa-refresh fa-spin" });
    Vue.http({
        url:API_URL+'merchant-api/order-cancel-reason',
        method: 'POST'
    }).then( function (response) {
        $.isLoading("hide");
        var cancelReason = [];
        var type = []
        for (var i in response.data) {
            for (var j in response.data[i]) {
                type.push(j);
                for (var n = 0; n < response.data[i][j].length; n++) {
                    cancelReason.push(response.data[i][j][n])
                }
            }
        }
        dispatch('FETCH_CANCEL_TYPE', type);
        dispatch('FETCH_CANCEL_REASON', cancelReason);
    });
}

export const checkboxHelper = ({ dispatch }) => {
    if ($("input.flat")[0]) {
        $('input.flat').iCheck({ checkboxClass: 'icheckbox_flat-green' });
    }
    // Table
    $('table input').on('ifChecked', function () {
        checkState = '';
        $(this).parent().parent().parent().addClass('selected');
        countChecked();
    });
    $('table input').on('ifUnchecked', function () {
        checkState = '';
        $(this).parent().parent().parent().removeClass('selected');
        countChecked();
    });

    var checkState = '';
    $('.bulk_action input').on('ifChecked', function () {
        checkState = '';
        $(this).parent().parent().parent().addClass('selected');
        countChecked();
    });

    $('.bulk_action input').on('ifUnchecked', function () {
        checkState = '';
        $(this).parent().parent().parent().removeClass('selected');
        countChecked();
    });

    $('.bulk_action input#check-all').on('ifChecked', function () {
        checkState = 'all';
        countChecked();
    });

    $('.bulk_action input#check-all').on('ifUnchecked', function () {
        checkState = 'none';
        countChecked();
    });

    function countChecked() {
        if (checkState === 'all') {
            $(".bulk_action input[name='id']").iCheck('check');
        }
        if (checkState === 'none') {
            $(".bulk_action input[name='id']").iCheck('uncheck');
        }
        var checkCount = $(".bulk_action input[name='id']:checked").length;
        if (checkCount) {
            $('.column-title').hide();
            $('.bulk-actions').show();
        } else {
            $('.column-title').show();
            $('.bulk-actions').hide();
        }
    }
}
