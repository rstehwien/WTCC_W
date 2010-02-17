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

wtcc.schema.elements = {
    "data": {
        "version": 1,
        "cost_willpower_base": 3,
        "cost_willpower": 1,
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
            {"element": "pools"}
        ],                // built powers
        "tables": [
            {"element": "table"}
        ],
    },

    "character": {
        "version": 1,
        "name": "",
        "points": 0,
        "infos": [
            {"element": "info"}
        ],
        "willpower": {"element": "willpower"},
        "archetype": {"element": "archetype"},
        "pools": {"element": "pools"},
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

    "pools": {
        "points_stats": 0,
        "points_skills": 0,
        "points_powers": 0,
        "list": [
            {"element": "pool"}
        ]
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

wtcc.schema.create = function(element) {
    var scheme = wtcc.schema.elements[element];
    if (scheme === null || scheme === undefined) throw new wtcc.Exception('Unknown element "' + element + '"');

    var obj = {"element": element, "id": Math.uuid()};
    for (property in scheme) {
        switch (wtcc.util.myTypeOf(scheme[property])) {
            case 'function': continue;
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
            obj[property] = wtcc.schema.create(scheme[property].element);
        }
        else {
            obj[property] = wtcc.util.cloneJSON(scheme[property]);
        }
    }
    return obj;
};

wtcc.schema.findBy = function(obj, property, match, first) {
    var ret = [];

    var item;
    if (wtcc.util.myTypeOf(obj) === 'array') {
        for each (item in obj) {
            if (wtcc.util.myTypeOf(item) !== 'object') {
                continue;
            }
            ret = ret.concat(wtcc.schema.findBy(item, property, match, first));
            if (first === true && ret.length > 0) {
                return ret;
            }
        }
        return ret;
    }
    else if (wtcc.util.myTypeOf(obj) === 'object') {
        var prop = obj[property];

        if (wtcc.util.myTypeOf(match) === 'string' && prop === match) {
            ret.push(obj);
        }
        else if (wtcc.util.myTypeOf(match.test) === 'function' && match.test(prop)) {
            ret.push(obj);
        }

        if (first === true && ret.length > 0) {
            return ret;
        }

        var cur;
        var itemtype;
        for (cur in obj) {
            item = obj[cur];
            itemtype = wtcc.util.myTypeOf(item);
            if (itemtype === 'object' || itemtype === 'array') {
                ret = ret.concat(wtcc.schema.findBy(item, property, match, first));
                if (first === true && ret.length > 0) {
                    return ret;
                }
            }
        }
    }

    return ret;
}

wtcc.schema.copy = function(orig) {
    var obj = wtcc.util.cloneJSON(orig);
    var reg = /[\w-]*/i;

    var ids = wtcc.schema.findBy(obj, 'id', reg);
    var item;
    for each (item in ids) {
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
