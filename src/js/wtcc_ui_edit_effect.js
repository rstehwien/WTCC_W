Ext.namespace('wtcc.ui.edit.effect');

wtcc.ui.edit.effect = function () {
    var mypublic, myprivate;
    mypublic = {};
    myprivate = {};

    mypublic.create = function () {
        return new Ext.Panel({
            id: 'wtcc_ui_edit_effect',
            html: '<h1>Effect goes here</h1>'+wtcc.ui.longText
        });
    };

    return mypublic;
}();

