Ext.namespace('wtcc.ui.edit.info');

wtcc.ui.edit.info = function () {
    var mypublic, myprivate;
    mypublic = {};
    myprivate = {};

    mypublic.create = function () {
        return new Ext.Panel({
            id: 'wtcc_ui_edit_info',
            html: '<h1>Info editor goes here</h1>'+wtcc.ui.longText
        });
    };

    return mypublic;
}();

