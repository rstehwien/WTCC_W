wtcc.view = {
    init: function() {
        wtcc.view.createMainWindow();
        // Ext.getCmp('wtcc_ui_center').getLayout().setActiveItem(0)
    },

    createMainWindow: function() {
        wtcc.view.viewport = new Ext.Viewport({
            layout: 'border',
            items: [
            {
                region: 'north',
                id: 'wtcc_ui_top',
                height: 40,
                xtype: 'toolbar',
            },
            {
                region: 'center',
                id: 'wtcc_ui_center',
                layout: 'card',
                activeItem: 'wtcc_ui_main',
                items: [
                  {
                    id: 'wtcc_ui_main',
                    html: '<h1>Main View</h1>'
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
    },
}