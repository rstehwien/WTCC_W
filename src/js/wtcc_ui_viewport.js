Ext.namespace('wtcc.ui.viewport');

wtcc.ui.viewport.init = function() {
    wtcc.ui.viewport.createMainWindow();
    // Ext.getCmp('wtcc_ui_center').getLayout().setActiveItem(0)
};

wtcc.ui.viewport.createMainWindow = function() {
    wtcc.ui.viewport.viewport = new Ext.Viewport({
        layout: 'border',
        items: [
        {
            region: 'north',
            id: 'wtcc_ui_top',
            height: 30,
            xtype: 'toolbar',
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
                },
                ],
            },
            {
                xtype: 'tbfill'
            },
            ],
        },
        {
            region: 'center',
            id: 'wtcc_ui_center',
            layout: 'card',
            activeItem: 'wtcc_ui_main',
            items: [
            {
                id: 'wtcc_ui_main',
                xtype: 'panel',
                autoScroll: true,
                items: [
                {
                    xtype: 'panel',
                    title: 'Character',
                    html: '<h1>Character goes here</h1>' + wtcc.ui.longText,
                    collapsible: true,
                },
                {
                    xtype: 'panel',
                    title: 'Archetype',
                    html: '<h1>Archetype goes here</h1>' + wtcc.ui.longText,
                    collapsible: true,
                },
                {
                    xtype: 'panel',
                    title: 'Pools',
                    html: '<h1>Pools go here</h1>' + wtcc.ui.longText,
                    collapsible: true,
                },
                {
                    xtype: 'panel',
                    title: 'Willpower',
                    html: '<h1>Willpower goes here</h1>' + wtcc.ui.longText,
                    collapsible: true,
                },
                ]
            },
            {
                id: 'wtcc_ui_edit_pool',
                html: '<h1>Pool editor</h1>'
            },
            {
                id: 'wtcc_ui_edit_effect',
                html: '<h1>Effect editor</h1>'
            },
            ]
        },
        {
            region: 'south',
            id: 'wtcc_ui_bottom',
            height: 40,
            xtype: 'toolbar'
        }
        ]
    });
};

