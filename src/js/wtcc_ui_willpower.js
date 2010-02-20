Ext.namespace('wtcc.ui.willpower');

wtcc.ui.willpower = function () {
    var mypublic, myprivate;
    mypublic = {};
    myprivate = {};

    mypublic.create = function () {
        var panel;
        panel = new Ext.Panel({
            title: 'Willpower',
            html: '<h1>Willpower goes here</h1>',
            collapsible: true
        });
        return panel;
    };

    return mypublic;
}();

