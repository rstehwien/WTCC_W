Ext.namespace('wtcc.ui.info');

wtcc.ui.info = function () {
    var mypublic, myprivate;
    mypublic = {};
    myprivate = {};

    mypublic.create = function () {
        var panel;
        panel = new Ext.Panel({
            id: 'wtcc_ui_info',
            html: '<h1>Info editor goes here</h1>'+wtcc.ui.longText,
        });
        return panel;
    };

    return mypublic;
}();

