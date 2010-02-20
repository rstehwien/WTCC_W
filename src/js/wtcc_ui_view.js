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
            html: wtcc.model.character.html
        });
        return panel;
    };

    return mypublic;
}();

