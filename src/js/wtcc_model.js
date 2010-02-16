wtcc.model.init = function() {
  wtcc.model.character = wtcc.model.createCharacter();
};

wtcc.model.createCharacter = function() {
	var char = wtcc.model.schema.create("character"); //wtcc.util.cloneJSON(wtcc.model.defaultConfig.character);
    var stats = wtcc.model.schema.findBy(wtcc.model.defaultConfig.effects, 'type', 'stat');
    var native = wtcc.model.schema.findBy(wtcc.model.defaultConfig.modifiers, 'name', 'Native');
    var pool;
    var stat;
    var cur;
    for each (cur in stats) {
        if (wtcc.util.myTypeOf(cur) !== 'object') {
            continue;
        }
        stat = wtcc.model.schema.copy(cur);
        stat.modifiers.push(wtcc.model.schema.copy(native))

        pool = wtcc.model.schema.create("pool");
        pool.name = stat.name;
        pool.effects.push(stat);

        char.pools.pools.push(pool);
    }
	return char;
};
