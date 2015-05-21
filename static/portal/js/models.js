/**
 * Created by admin on 15/3/6.
 */

Ext.define('kitchenSink_tree', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'ajax',
        reader: 'json'
    },

    fields: [
        {name : 'code', type : 'string'},
        {name : 'name', type : 'string'}
    ]
});

Ext.define('my_menu', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'ajax',
        reader: 'json'
    },
    fields: [ 'id', 'text','menu','xtype','items' ]
});