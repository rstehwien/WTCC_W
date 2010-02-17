wtcc.util.cloneJSON = function(json) {
    return Ext.util.JSON.decode(Ext.util.JSON.encode(json));
};

wtcc.util.myTypeOf = function(obj) {
    var type = typeof(obj);
    if (type == 'object') {
        if (obj == null) {
            return 'null';
        } else if (obj.constructor.toString().match(/regexp/i) !== null) {
            return 'regexp';
        } else if (obj.constructor.toString().match(/date/i) !== null) {
            return 'date';
        } else if (obj.constructor.toString().match(/html/i) !== null) {
            return 'html';
        } else if (obj.constructor.toString().match(/array/i) !== null && typeof(obj.length) !== 'undefined') {
            return 'array';
        } else {
            return 'object';
        }
    } else {
        return type;
    }
};
