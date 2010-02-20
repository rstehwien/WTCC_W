Ext.namespace('wtcc.ui.view');

wtcc.ui.view = function () {
    var mypublic, myprivate;
    mypublic = {};
    myprivate = {};

    mypublic.create = function () {
        var panel;
        panel = new Ext.Panel({
            title: 'View',
            frame: true,
            html: '<h1>Viewer goes here</h1>',
        });
        return panel;
    };

    return mypublic;
}();

