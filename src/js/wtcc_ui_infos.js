Ext.namespace('wtcc.ui.infos');

wtcc.ui.infos = function () {
    var mypublic, myprivate;
    mypublic = {};
    myprivate = {};

    mypublic.create = function () {
        var infoPanel;
        infoPanel = new Ext.Panel({
            title: 'Information',
            html: '<h1>Character info goes here</h1>'+wtcc.ui.longText,
            collapsible: true
        });
        return infoPanel;
    };

    return mypublic;
}();

