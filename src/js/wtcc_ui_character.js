Ext.namespace('wtcc.ui.character');

wtcc.ui.character = function () {
    var mypublic, myprivate;
    mypublic = {};
    myprivate = {};

    mypublic.create = function () {
        var panel = new Ext.Panel({
            id: 'wtcc_ui_character_editor',
            autoHeight: true,
            autoWidth: true,
            items: [
                wtcc.ui.info.create(),
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

