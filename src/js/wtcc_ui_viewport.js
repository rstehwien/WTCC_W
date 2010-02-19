Ext.namespace('wtcc.ui.viewport');

wtcc.ui.viewport.init = function() {
    wtcc.ui.viewport.createMainWindow();
    // Ext.getCmp('wtcc_ui_center').getLayout().setActiveItem(0)
};

wtcc.ui.viewport.createMainWindow = function() {

    var toolbar = new Ext.Toolbar({
        id: 'wtcc_ui_toolbar',
        region: 'north',
        height: 30,
        items: [
            {
                xtype: 'tbspacer'
            },
            {
                xtype: 'tbbutton',
                text: 'Menu',
                menu: [
                    {
                        text: 'Load',
                    },
                    {
                        text: 'Save'
                    },
                    {
                        text: 'Export'
                    },
                    '-',
                    {
                        text: 'Config'
                    },
                    '-',
                    {
                        text: 'About'
                    },
                    {
                        text: 'Help'
                    },
                ],
            },
            {
                xtype: 'tbfill'
            },
        ],

    });

    var infoPanel = new Ext.Panel({
        title: 'Character',
        html: '<h1>Character goes here</h1>',
        collapsible: true,
    });

    var archetypePanel = new Ext.Panel({
        title: 'Archetype',
        html: '<h1>Archetype goes here</h1>',
        collapsible: true,
    });

    var poolsStats = wtcc.ui.pools.create('Stats', wtcc.schema.findBy(wtcc.model.character.pools.list, 'type', 'stat', false, true));
    var poolsSkills = wtcc.ui.pools.create('Skills', wtcc.schema.findBy(wtcc.model.character.pools.list, 'type', 'skill', false, true));
    var poolsPowers = wtcc.ui.pools.create('Powers', wtcc.schema.findBy(wtcc.model.character.pools.list, 'type', 'power', false, true));

    var willpowerPanel = new Ext.Panel({
        title: 'Willpower',
        html: '<h1>Willpower goes here</h1>',
        collapsible: true,
    });

    var characterEditor = new Ext.Panel({
        id: 'wtcc_ui_character_editor',
        xtype: 'panel',
        autoScroll: true,
        items: [infoPanel, poolsStats, poolsSkills, archetypePanel, poolsPowers, willpowerPanel]
    });

    var centerCards = new Ext.Container({
        region: 'center',
        id: 'wtcc_ui_center',
        layout: 'card',
        activeItem: 'wtcc_ui_character_editor',
        items: [characterEditor],
    });

    var statusBar = new Ext.Toolbar({
        region: 'south',
        id: 'wtcc_ui_bottom',
        height: 40,
    });

    var viewport = new Ext.Viewport({
        layout: 'border',
        items: [toolbar, centerCards, statusBar]
    });
    return viewport;
};

