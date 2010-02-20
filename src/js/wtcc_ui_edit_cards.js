Ext.namespace('wtcc.ui.edit.cards');

wtcc.ui.edit.cards = function () {
    var mypublic, myprivate;
    mypublic = {};
    myprivate = {};

    mypublic.create = function () {
        var panel, curItem, maxItem;
        curItem = 0;
        maxItem = 4;
        panel = new Ext.Panel({
            id: 'wtcc_ui_edit_cards',
            layout: 'card',
            title: 'Edit',
            frame: true,
            activeItem: 'wtcc_ui_edit_character',
            items: [
                wtcc.ui.edit.character.create(),
                wtcc.ui.edit.pool.create(),
                wtcc.ui.edit.effect.create(),
                wtcc.ui.edit.info.create(),
                wtcc.ui.edit.modifier.create()
            ],
            // TODO hide this bar when logic hooked in to edit
            bbar: [
                {
                    text: '< Prev',
                    ref: '../prevButton',
                    disabled: true,
                    handler: function() {
                        curItem = curItem - 1;
                        panel.getLayout().setActiveItem(curItem);
                        if (curItem === 0) {
                            panel.prevButton.disable();
                        }
                        panel.nextButton.enable();
                    }

                },
                '->',
                {
                    text: 'Next >',
                    ref:'../nextButton',
                    handler:function() {
                        curItem = curItem + 1;
                        panel.getLayout().setActiveItem(curItem);
                        panel.prevButton.enable();
                        if (curItem === maxItem) {
                            panel.nextButton.disable();
                        }
                    }
                }
            ]

        });
        return panel;
    };

    return mypublic;
}();

