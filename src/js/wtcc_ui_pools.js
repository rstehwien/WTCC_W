Ext.namespace('wtcc.ui.pools');

wtcc.ui.pools.create = function(title, pools) {
    var meta = wtcc.schema.metadata('pool');
    meta.data = {"rows": pools};
    var store = new Ext.data.JsonStore(meta);

    var colModel = new Ext.grid.ColumnModel({
        columns: [
            { header: 'Name', dataIndex: 'name'},
            { header: 'Cost', dataIndex: 'die_cost'},
            { header: 'd', dataIndex: 'normal'},
            { header: 'hd', dataIndex: 'hard'},
            { header: 'wd', dataIndex: 'wiggle'},
            { header: 'Points', dataIndex: 'points'},
        ],
        defaults: {
            sortable: false,
            menuDisabled: true,
            width: 100
        },
    });

    var grid = new Ext.grid.GridPanel({
        title: title,
        collapsible: true,
        store: store,
        colModel: colModel,
        height: 200,
    });

    // TODO fix scrolling

    return grid;
};
