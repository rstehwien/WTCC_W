Ext.namespace('wtcc.ui.effect');

wtcc.ui.effect = function () {
    var mypublic, myprivate;
    mypublic = {};
    myprivate = {};

    mypublic.create = function () {
        var panel;
        panel = new Ext.Panel({
            html: '<h1>Effect goes here</h1>',
        });
        return panel;
    };

    return mypublic;
}();

