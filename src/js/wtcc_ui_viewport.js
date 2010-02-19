Ext.namespace('wtcc.ui.viewport');

wtcc.ui.viewport.init = function () {
    wtcc.ui.viewport.createMainWindow();
    // Ext.getCmp('wtcc_ui_center').getLayout().setActiveItem(0)
};

wtcc.ui.viewport.createMainWindow = function () {
    var toolbar, infoPanel, archetypePanel, poolsStats, poolsSkills, poolsPowers,
            willpowerPanel, characterEditor, centerCards, statusBar, viewport;

    toolbar = new Ext.Toolbar({
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
                        text: 'Load'
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
                    }
                ]
            },
            {
                xtype: 'tbfill'
            }
        ]
    });

    infoPanel = new Ext.Panel({
        title: 'Character',
        html: '<h1>Character goes here</h1>',
        collapsible: true
    });

    archetypePanel = new Ext.Panel({
        title: 'Archetype',
        html: '<h1>Archetype goes here</h1>',
        collapsible: true
    });

    poolsStats = wtcc.ui.pools.create('Stats', wtcc.model.character.stats);
    poolsSkills = wtcc.ui.pools.create('Skills', wtcc.model.character.skills);
    poolsPowers = wtcc.ui.pools.create('Powers', wtcc.model.character.powers);

    willpowerPanel = new Ext.Panel({
        title: 'Willpower',
        html: '<h1>Willpower goes here</h1>',
        collapsible: true
    });

    characterEditor = new Ext.Panel({
        id: 'wtcc_ui_character_editor',
        xtype: 'panel',
        autoScroll: true,
        items: [infoPanel, poolsStats, poolsSkills, archetypePanel, poolsPowers, willpowerPanel]
    });

    centerCards = new Ext.Container({
        region: 'center',
        id: 'wtcc_ui_center',
        layout: 'card',
        activeItem: 'wtcc_ui_character_editor',
        items: [characterEditor]
    });

    statusBar = new Ext.Toolbar({
        region: 'south',
        id: 'wtcc_ui_bottom',
        height: 40
    });

    viewport = new Ext.Viewport({
        layout: 'border',
        items: [toolbar, centerCards, statusBar]
    });
    return viewport;
};

