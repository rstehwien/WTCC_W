Ext.namespace('wtcc.ui.edit.pool');

wtcc.ui.edit.pool = function () {
    var mypublic, myprivate;
    mypublic = {};
    myprivate = {};

    mypublic.create = function () {
        return new Ext.Panel({
            id: 'wtcc_ui_edit_pool',
            html: '<h1>Pool goes here</h1>'+wtcc.ui.longText
        });
    };

    return mypublic;
}();

