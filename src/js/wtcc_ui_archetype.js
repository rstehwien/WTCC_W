Ext.namespace('wtcc.ui.archetype');

wtcc.ui.archetype = function () {
    var mypublic, myprivate;
    mypublic = {};
    myprivate = {};

    mypublic.create = function () {
        var panel;
        panel = new Ext.Panel({
            id: 'wtcc_ui_archetype',
            title: 'Archetype',
            html: '<h1>Archetype goes here</h1>'+wtcc.ui.longText,
            collapsible: true
        });
        return panel;
    };

    return mypublic;
}();

