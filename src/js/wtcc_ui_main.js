Ext.namespace('wtcc.ui.main');

wtcc.ui.main = function () {
    var mypublic, myprivate;
    mypublic = {};
    myprivate = {};

    mypublic.init = function () {
        myprivate.createMainWindow();
        // Ext.getCmp('wtcc_ui_center').getLayout().setActiveItem(0)
    };

    myprivate.createMainWindow = function () {
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


    return mypublic;
}();


wtcc.ui.longText = "<p>Lorem ipsum dolor sit amet, nec fermentum pharetra donec massa, nulla velit at, nisl consequat vestibulum vestibulum auctor, euismod integer placerat sed. Porta pede enim sodales laudantium vulputate integer, sed vitae vitae quis nostrud tortor hymenaeos. Sed et nam nullam magna nunc lectus, metus in leo elit justo in, vitae nunc, accumsan turpis porttitor velit vestibulum aliquet. Lacinia condimentum sed consectetuer, libero ac sem sollicitudin eleifend et, tortor nec risus a dolor nulla accumsan, egestas vel vel gravida nulla elit mi. In pellentesque venenatis mattis risus interdum nunc, at et sollicitudin sapien nec duis litora, conubia diam eu, in libero praesent. Vel sapiente sit nibh sodales, sed morbi. Elit imperdiet, amet vivamus sodales vestibulum praesent, libero arcu consectetuer ligula, rutrum adipisci magnis. In praesent ipsum, mauris enim non arcu mattis wisi libero.</p>\
<p>Morbi vitae aliquam viverra nunc, dolore porttitor viverra. Ac fringilla varius lacus sed quam, pellentesque quis, vitae libero, rhoncus dolor eum amet. Pellentesque metus aut magnis adipiscing, bibendum ducimus nulla orci ac, nostra in nunc vivamus amet integer. Commodo ipsum velit, erat hac tellus ac venenatis magna velit, arcu eu fuga platea ac luctus duis, urna primis. Integer cum, tincidunt dui elit, fringilla sem sit eu, sit conubia urna feugiat tristique dapibus amet, mauris torquent. Leo ante, tincidunt dictum magna esse consectetuer lectus. Sapien nibh minima urna pharetra et ante. Wisi curabitur sollicitudin est mattis ac ultricies, nunc vestibulum quam. Gravida vitae diam dolor pede donec, urna vestibulum quis elit, quam neque lacus, amet ut, dolor tempus quam nonummy. Gravida velit dictum commodo, accumsan nulla integer arcu. Pede fames, suscipit eu lorem sed ut non, tempor egestas. Mi ante vehicula torquent, duis dui vel lobortis massa incididunt, mattis dignissim pulvinar, dolor pharetra dolor sodales mus.</p>\
<p>Eget dolor, fringilla massa massa morbi ultrices non, risus metus blandit mauris rhoncus rutrum faucibus, aliquam vestibulum proin, varius ut erat vitae eu. Duis placerat etiam wisi suspendisse, odio est et, nonummy nulla lorem. Ab vel lectus litora suscipit congue, vivamus integer vel lobortis ut sed tellus, suspendisse veniam turpis massa wisi euismod, orci tellus, orci vivamus tortor sapien nulla condimentum. Amet pharetra orci porta velit, nullam sed vitae in, vel elit auctor facilisis interdum volutpat turpis, lacus libero, et nulla nec dui metus. Nec laoreet quae viverra temporibus vel, vulputate erat tellus, exercitation sollicitudin odio donec consectetuer etiam, consequat et molestie suspendisse libero. Est suscipit consectetuer morbi, tempor sit, id sed cursus rutrum nonummy donec quam, cras imperdiet phasellus donec in, nulla orci mattis quis elementum. Eget ante egestas in sapien, elit elit, tellus dui ante phasellus parturient, aliquam sapien quis nulla, pulvinar nec. Donec non.\
<p>Sagittis proin urna, orci blandit a ante, pretium nullam varius in aliqua et. Nunc tortor elementum fermentum, dapibus proin quis luctus mollis, purus mollis risus, justo a quisque nullam laoreet nisl eget. Ac metus etiam elit fusce turpis, cursus ultricies tellus, at phasellus non duis et sed. Sapien dictum convallis purus quis eget. Elit viverra ac mauris ullamcorper, aliquam mollis ut, etiam aliquam nibh praesent habitant sit, phasellus sodales ut wisi, mauris neque. Placerat nibh faucibus, nunc amet orci diam vitae tincidunt adipiscing. Sit semper mauris malesuada leo, volutpat fusce, cras ultricies mi ac. Nibh nullam nunc purus dolor in turpis. Laoreet interdum, semper scelerisque pede, at vel, donec elit turpis quis non eleifend feugiat, dapibus vivamus pharetra iaculis iaculis consequatur id.</p>"
;
