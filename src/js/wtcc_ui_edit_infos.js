Ext.namespace('wtcc.ui.edit.infos');

wtcc.ui.edit.infos = function () {
    var mypublic, myprivate;
    mypublic = {};
    myprivate = {};

    mypublic.create = function () {
        return new Ext.Panel({
            id: 'wtcc_ui_edit_infos',
            title: 'Information',
            html: '<h1>Character info goes here</h1>'+wtcc.ui.longText,
            collapsible: true
        });
    };

    return mypublic;
}();

