Ext.namespace('wtcc.ui.edit.modifier');

wtcc.ui.edit.modifier = function () {
    var mypublic, myprivate;
    mypublic = {};
    myprivate = {};

    mypublic.create = function () {
        return new Ext.Panel({
            id: 'wtcc_ui_edit_modifier',
            html: '<h1>Modifier editor goes here</h1>'+wtcc.ui.longText
        });
    };

    return mypublic;
}();

