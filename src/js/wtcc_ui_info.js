Ext.namespace('wtcc.ui.info');

wtcc.ui.info = function () {
    var mypublic, myprivate;
    mypublic = {};
    myprivate = {};

    mypublic.create = function () {
        var infoPanel;
        infoPanel = new Ext.Panel({
            title: 'Character',
            html: '<h1>Character goes here</h1>',
            collapsible: true
        });
        return infoPanel;
    };

    return mypublic;
}();

