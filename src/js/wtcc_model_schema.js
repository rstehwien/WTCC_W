// All classes have an "id" (UUID)
// All classes can have "id_org" (copy of original)
// Might add "description" for full text from book

/*
{
  "<classname>": {                                  // define class
    "<property_name1>": <default>,                  // property with simple value
    "<property_name2>": {"class": "<classname"},    // property that is another class
    "<property_name2>": [<example>],                // property that is an array of simple values
    "<property_name2>": [{"class": "<classname"}],  // property that is an array of other classes
  } 
}
*/

wtcc.model.schema.elements = {
  "data": {
    "version": 1,
    "cost_willpower_base": 3,
    "cost_willpower": 1,
    "effects": {"class": "effect"},              // stats, skills, base powers
    "modifiers": [{"class": "modifier"}],
    "meta_qualities": {"class": "meta_quality"}, // base meta qualities (sources, permissions, intrinsics)
    "archetypes": [{"class": "archetype"}],      // built archetypes
    "powers": {"class": "pools"},                // built powers
    "tables": [{"class": "table"}],
    "character": {"class": "character"},
  },
  
  "character": {
    "version": 1, 
    "name": "",
    "points": 0,
    "infos": [{"class": "info"}],
    "willpower": {"class": "willpower"},
    "archetype": {"class": "archetype"}, 
    "pools": {"class": "pools"},
    "custom_modifiers": [{"class": "effect"}],
    "measurements": [{"class": "measurement"}],
  },
  
  "info": {
    "name": "",
    "text": "",
  },

  "willpower": {
    "min_base": 0,
    "base": 0,
    "current": 0,
    "points": 0,
    "motivation": [{"class": "motivation"}],
  },
  
  "motivation": {
    "type": "",
    "value": 0,
    "name": "",
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
    "modifiers": [{"class": "modifier"}],
  },

  "pools": {
    "points_stats": 0,
    "points_skills": 0,
    "points_powers": 0,
    "pools": [{"class": "pool"}],
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
    "effects": [{"class": "effect"}],
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
    "source": "",
  },

  "archetype": {
    "type": "",
    "name": "",
    "points": 0,
    "source": "",
    "meta_qualities": [{"class": "meta_quality"}],
  },

  "meta_quality": {
    "type": "",
    "name": "",
    "cost": 0,
    "is_custom": false,
    "note": "",
    "is_note_required": false,
    "is_chosen": true,
    "source": "",
  },

  "table": {
    "type": "",
    "name": "",
    "units": "",
    "link": "",
    "boost": 0,
    "beyond": 0,
    "measurements": [{"class": "measurement"}],
  },

  "measurement": {
    "type": "",
    "pool": 0,
    "text_cols": "",
    "text": "",
    "units": "",
    "value": 0,
  },
}