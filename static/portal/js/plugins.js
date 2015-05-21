/**
 * Created with PyCharm.
 * User: zhaolin.huang
 * Date: 14-2-11
 * Time: 下午2:54
 * To change this template use File | Settings | File Templates.
 */
starry_web.plugin = {};
//django 插件
starry_web.plugin.django_csrf = (function () {
    Ext.onReady(function () {
        function getCookie(name) {
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = Ext.util.Format.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }

        Ext.Ajax.on('beforerequest', function (conn, options) {
            if (!(/^http:.*/.test(options.url) || /^https:.*/.test(options.url))) {
                options.headers = options.headers || {};
                options.headers["X-CSRFToken"] = getCookie('csrftoken');
            }
        }, this);
    });
//    console.log("extjs csrf plugin reload success!");
    return "loaded";
})();
/**
 * 在store中搜索需要的数据
 * @type {*}
 */
starry_web.plugin.filter_data_from_store = function (store, params) {
    var store_data = store.data.items;
    var filter_result = [];
    for (var i = 0; i < store_data.length; i++) {
        var data = store_data[i].data;
        for (p in params) {
            if (p in data && data[p] == params[p]) {
                data["store_index"] = i;
                filter_result.push(data);
            }
        }
    }
    return filter_result.length == 1 ? filter_result[0] : filter_result;
};
/**
 * 修改alert
 * @type {Function}
 */
alert = starry_web.plugin.alert = function (message, title, fn) {
    Ext.Msg.alert(title || "大盘", message, fn || function () {
    });
};
/**
 *  ext comfirm
 * @param message
 * @param fn
 * @param title
 */
starry_web.comfirm = function (message, fn, title) {
    Ext.MessageBox.confirm(title || "大盘", message, function (btn) {
        if (btn == "yes") {
            fn();
        }
    });
};
/**
 *
 * @param cmp
 */
starry_web.plugin.mask = function (cmp) {
    var do_mask_cmp = (cmp && cmp.getEl()) || Ext.getBody();
    do_mask_cmp.mask();
    starry_web.masked_cmp = do_mask_cmp;
};
/**
 *unmask
 * @param cmp
 */
starry_web.plugin.unmask = function (cmp) {
    var do_mask_cmp = (cmp && cmp.getEl()) || (starry_web.masked_cmp && starry_web.masked_cmp) || Ext.getBody();
    do_mask_cmp.unmask();
};
starry_web.is_number = function (str) {
    if (typeof str == "string") {
        return Boolean(str.match(/^\d+$/))
    } else {
        throw {"message": "is_number paramter string only support"}
    }

};
/**
 *is ip check
 * @param str
 * @returns {*}
 */
starry_web.plugin.is_ip = function (str) {
    return Boolean(str.match(/^\d+.\d+.\d+.\d+$/))
};
/**
 *
 * @param response
 * @returns {boolean}
 */
starry_web.plugin.response_exception = function (response) {
    var status = response.status;
    switch (status) {
        case 403:
            alert("没有可操作权限！请到集团权限平台申请权限，项目标识：xxx");
            return false;
    }
    return true;
};