Ext.namespace('wtcc.ui.infos');

wtcc.ui.infos = function () {
    var mypublic, myprivate;
    mypublic = {};
    myprivate = {};

    mypublic.create = function () {
        var panel;
        panel = new Ext.Panel({
            id: 'wtcc_ui_infos',
            title: 'Information',
            html: '<h1>Character info goes here</h1>'+wtcc.ui.longText,
            collapsible: true
        });
        return panel;
    };

    return mypublic;
}();

