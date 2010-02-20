Ext.namespace('wtcc.ui.pool');

wtcc.ui.pool = function () {
    var mypublic, myprivate;
    mypublic = {};
    myprivate = {};

    mypublic.create = function () {
        var panel;
        panel = new Ext.Panel({
            html: '<h1>Pool goes here</h1>'+wtcc.ui.longText,
        });
        return panel;
    };

    return mypublic;
}();

