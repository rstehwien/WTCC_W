Ext.namespace('wtcc.ui.editcards');

wtcc.ui.editcards = function () {
    var mypublic, myprivate;
    mypublic = {};
    myprivate = {};

    mypublic.create = function () {
        var panel, curItem, maxItem;
        curItem = 0;
        maxItem = 4;
        panel = new Ext.Panel({
            layout: 'card',
            title: 'Edit',
            frame: true,
            activeItem: 'wtcc_ui_editor_character',
            items: [
                wtcc.ui.character.create(),
                wtcc.ui.pool.create(),
                wtcc.ui.effect.create(),
                wtcc.ui.info.create(),
                wtcc.ui.modifier.create()
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

