Ext.namespace('wtcc.ui.edit.willpower');

wtcc.ui.edit.willpower = function () {
    var mypublic, myprivate;
    mypublic = {};
    myprivate = {};

    mypublic.create = function () {
        return new Ext.Panel({
            id: 'wtcc_ui_edit_willpower',
            title: 'Willpower',
            html: '<h1>Willpower goes here</h1>'+wtcc.ui.longText,
            collapsible: true
        });
    };

    return mypublic;
}();

