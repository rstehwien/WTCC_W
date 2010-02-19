Ext.namespace('wtcc.ui.pools');

wtcc.ui.pools.create = function (title, pools) {
    var meta, store, colModel, grid;

    meta = wtcc.schema.metadata('pool');
    meta.data = {"rows": pools};
    store = new Ext.data.JsonStore(meta);

    colModel = new Ext.grid.ColumnModel({
        columns: [
            { header: 'Name', dataIndex: 'name', width: 200},
            { header: 'Cost', dataIndex: 'die_cost'},
            { header: 'd', dataIndex: 'normal'},
            { header: 'hd', dataIndex: 'hard'},
            { header: 'wd', dataIndex: 'wiggle'},
            { header: 'Points', dataIndex: 'points'}
        ],
        defaults: {
            sortable: false,
            menuDisabled: true,
            width: 50
        }
    });

    grid = new Ext.grid.GridPanel({
        title: title,
        collapsible: true,
        store: store,
        colModel: colModel,
        autoHeight: true,
        //autoWidth: true,
        stripeRows: true,
    });

    // TODO fix scrolling

    return grid;
};
