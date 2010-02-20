Ext.namespace('wtcc.ui.edit.character');

wtcc.ui.edit.character = function () {
    var mypublic, myprivate;
    mypublic = {};
    myprivate = {};

    mypublic.create = function () {
        return new Ext.Panel({
            id: 'wtcc_ui_edit_character',
            autoHeight: true,
            autoWidth: true,
            items: [
                wtcc.ui.edit.infos.create(),
                wtcc.ui.edit.pools.create('Stats', 'stat', wtcc.model.character.stats),
                wtcc.ui.edit.pools.create('Skills', 'skill', wtcc.model.character.skills),
                wtcc.ui.edit.archetype.create(),
                wtcc.ui.edit.pools.create('Powers', 'power', wtcc.model.character.powers),
                wtcc.ui.edit.willpower.create()
            ]
        });
    };

    return mypublic;
}();

