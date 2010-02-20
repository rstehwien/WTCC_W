Ext.namespace('wtcc.ui.character');

wtcc.ui.character = function () {
    var mypublic, myprivate;
    mypublic = {};
    myprivate = {};

    mypublic.create = function () {
        var panel = new Ext.Panel({
            id: 'wtcc_ui_editor_character',
            autoHeight: true,
            autoWidth: true,
            items: [
                wtcc.ui.infos.create(),
                wtcc.ui.pools.create('Stats', wtcc.model.character.stats),
                wtcc.ui.pools.create('Skills', wtcc.model.character.skills),
                wtcc.ui.archetype.create(),
                wtcc.ui.pools.create('Powers', wtcc.model.character.powers),
                wtcc.ui.willpower.create()
            ]
        });
        return panel;
    };

    return mypublic;
}();

