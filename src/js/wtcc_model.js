wtcc.model.init = function() {
  wtcc.model.config = wtcc.model.defaultConfig;
  wtcc.model.character = wtcc.model.createCharacter();
};

wtcc.model.createCharacter = function() {
	var char = wtcc.model.schema.create("character");
    var stats = wtcc.model.schema.findBy(wtcc.model.config.effects, 'type', 'stat');
    var native = wtcc.model.schema.findBy(wtcc.model.config.modifiers, 'id', '63337583-a1ce-4085-a83e-28243e11bf8c')[0];
    var pool;
    var stat;
    var cur;
    for each (cur in stats) {
        if (wtcc.util.myTypeOf(cur) !== 'object') {
            continue;
        }
        stat = wtcc.model.schema.copy(cur);
        if (native !== undefined) {
            stat.modifiers.push(wtcc.model.schema.copy(native));
        }

        pool = wtcc.model.schema.create("pool");
        pool.name = stat.name;
        pool.effects.push(stat);

        char.pools.pools.push(pool);
    }
	return char;
};
