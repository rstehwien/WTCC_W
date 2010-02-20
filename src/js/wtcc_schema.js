Ext.namespace('wtcc.schema');

// All elements have a "element" property
// All elements have an "id" (UUID)
// All elements can have "id_org" (copy of original)
// Might add "description" for full text from book

/*
 {
 "<classname>": {                                  // define class
 "<property_name1>": <default>,                  // property with simple value
 "<property_name2>": {"element": "<classname"},    // property that is another class
 "<property_name2>": [<example>],                // property that is an array of simple values
 "<property_name2>": [{"element": "<classname"}],  // property that is an array of other classes
 }
 }
 */

wtcc.schema = function () {
    var mypublic, myprivate;
    mypublic = {};
    myprivate = {};

    myprivate.elements = {
        "data": {
            "version": 1,
            "cost_willpower_base": 3,
            "cost_willpower": 1,
            "id_native": "",
            "mult_hard": 2,
            "mult_wiggle": 4,
            "effects": [
                {"element": "effect"}
            ],              // stats, skills, base powers
            "modifiers": [
                {"element": "modifier"}
            ],
            "meta_qualities": [
                {"element": "meta_quality"}
            ], // base meta qualities (sources, permissions, intrinsics)
            "archetypes": [
                {"element": "archetype"}
            ],        // built archetypes
            "powers": [
                {"element": "pool"}
            ],                // built powers
            "tables": [
                {"element": "table"}
            ]
        },

        "character": {
            "version": 1,
            "name": "",
            "points_stats": 0,
            "points_skills": 0,
            "points_powers": 0,
            "points_total": 0,
            "infos": [
                {"element": "info"}
            ],
            "willpower": {"element": "willpower"},
            "archetype": {"element": "archetype"},
            "stats": [
                {"element": "pool"}
            ],
            "skills": [
                {"element": "pool"}
            ],
            "powers": [
                {"element": "pool"}
            ],
            "custom_modifiers": [
                {"element": "effect"}
            ],
            "measurements": [
                {"element": "measurement"}
            ]
        },

        "info": {
            "name": "",
            "text": ""
        },

        "willpower": {
            "min_base": 0,
            "base": 0,
            "current": 0,
            "points": 0,
            "motivations": [
                {"element": "motivation"}
            ]
        },

        "motivation": {
            "type": "",
            "value": 0,
            "name": ""
        },

        "pool": {
            "type": "",
            "name": "",
            "die_cost": 0,
            "normal": 0,
            "hard": 0,
            "wiggle": 0,
            "points": 0,
            "source": "",
            "effects": [
                {"element": "effect"}
            ]
        },

        "effect": {
            "type": "",
            "name": "",
            "cost": 0,
            "note": "",
            "is_note_required": false,
            "link": "",
            "is_link_required": false,
            "is_add_measurement": false,
            "die_cost": 0,
            "source": "",
            "code": "", // effect code A/U/D with levels
            "modifiers": [
                {"element": "modifier"}
            ]
        },

        "modifier": {
            "type": "",
            "name": "",
            "cost": 0,
            "note": "",
            "is_note_required": false,
            "has_ranks": true,
            "ranks": 1,
            "link": "",
            "is_link_required": false,
            "mod": 0,
            "is_chosen": true,
            "source": ""
        },

        "archetype": {
            "type": "",
            "name": "",
            "points": 0,
            "source": "",
            "meta_qualities": [
                {"element": "meta_quality"}
            ]
        },

        "meta_quality": {
            "type": "",
            "name": "",
            "cost": 0,
            "is_custom": false,
            "note": "",
            "is_note_required": false,
            "is_chosen": true,
            "source": ""
        },

        "table": {
            "type": "",
            "name": "",
            "units": "",
            "link": "",
            "boost": 0,
            "beyond": 0,
            "measurements": [
                {"element": "measurement"}
            ]
        },

        "measurement": {
            "type": "",
            "pool": 0,
            "text_cols": "",
            "text": "",
            "units": "",
            "value": 0
        }
    };

    mypublic.create = function (name) {
        var scheme, obj;

        scheme = myprivate.elements[name];
        if (scheme === null || scheme === undefined) {
            throw new wtcc.Exception('Unknown element name "' + name + '"');
        }

        obj = {"element": name};
        wtcc.schema.verify(obj);
        return obj;
    };

    mypublic.verify = function (obj) {
        var name, scheme, property;

        name = obj.element;
        scheme = myprivate.elements[name];
        if (scheme === null || scheme === undefined) {
            throw new wtcc.Exception('Unknown element name "' + name + '"');
        }

        if (obj.id === undefined) {
            obj.id = Math.uuid();
        }

        for (property in scheme) {
            if (scheme.hasOwnProperty(property)) {
                if (obj[property] !== undefined) {
                    if (wtcc.util.myTypeOf(obj[property].element) !== 'undefined') {
                        // TODO make sure that element is of right kind
                        mypublic.verify(obj[property]);
                    }
                    // TODO check that arrays have right kind
                    continue;
                }
                switch (wtcc.util.myTypeOf(scheme[property])) {
                    case 'function':
                        continue;
                    case 'string':
                    case 'number':
                    case 'boolean':
                        obj[property] = scheme[property];
                        continue;
                    case 'array':
                        obj[property] = [];
                        continue;
                }
                if (wtcc.util.myTypeOf(scheme[property].element) !== 'undefined') {
                    obj[property] = mypublic.create(scheme[property].element);
                }
                else {
                    throw new wtcc.Exception('Unknown property name "' + property + '"');
                }
            }
        }
    };

    mypublic.copy = function (orig) {
        var obj, reg, ids, item, i;
        obj = wtcc.util.cloneJSON(orig);
        reg = /[\w\-]*/i;

        ids = JSONQuery("..[?id]", obj);

        for (i = 0; i < ids.length; i = i + 1) {
            item = ids[i];
            if (wtcc.util.myTypeOf(item) !== 'object') {
                continue;
            }
            if (item.id_org === undefined || !reg.match(item.id_org)) {
                item.id_org = item.id;
            }
            item.id = Math.uuid();
        }

        return obj;
    };

    mypublic.metadata = function (name) {
        var scheme, fields, property, metadata;

        scheme = myprivate.elements[name];
        if (scheme === null || scheme === undefined) {
            throw new wtcc.Exception('Unknown element name "' + name + '"');
        }

        fields = [];
        for (property in scheme) {
            if (scheme.hasOwnProperty(property)) {
                switch (wtcc.util.myTypeOf(scheme[property])) {
                    case 'string':
                    case 'number':
                    case 'boolean':
                        fields.push({"name": property});
                }
            }
        }

        metadata = {
            "idProperty": "id",
            "root": "rows",
            "totalProperty": "results",
            "successProperty": "success",
            "fields": fields
        };

        return metadata;
    };

    mypublic.trim = function (obj) {
        var name, scheme, property;
        name = obj.element;
        scheme = myprivate.elements[name];
        if (scheme === null || scheme === undefined) {
            return;
        }

        for (property in scheme) {
            if (scheme.hasOwnProperty(property)) {
                if (obj[property] === undefined) {
                    continue;
                }
                switch (wtcc.util.myTypeOf(scheme[property])) {
                    case 'function':
                    case 'array':
                        continue;
                    case 'string':
                    case 'number':
                    case 'boolean':
                        if (obj[property] === scheme[property]) {
                            delete obj[property];
                        }
                        continue;
                }
                if (wtcc.util.myTypeOf(scheme[property].element) !== 'undefined') {
                    obj[property] = mypublic.trim(obj[property]);
                }
            }
        }
    };

    return mypublic;
}();

