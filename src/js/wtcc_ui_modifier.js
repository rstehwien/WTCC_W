Ext.namespace('wtcc.ui.modifier');

wtcc.ui.modifier = function () {
    var mypublic, myprivate;
    mypublic = {};
    myprivate = {};

    mypublic.create = function () {
        var panel;
        panel = new Ext.Panel({
            id: 'modifier',
            html: '<h1>Modifier editor goes here</h1>'+wtcc.ui.longText,
        });
        return panel;
    };

    return mypublic;
}();

