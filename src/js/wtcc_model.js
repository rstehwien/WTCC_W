Ext.namespace('wtcc.model');

wtcc.model.init = function() {
  wtcc.model.config = wtcc.model.defaultConfig;
  wtcc.model.updateConfig(wtcc.model.config);
  wtcc.model.character = wtcc.model.createCharacter();
};

wtcc.model.createCharacter = function() {
	var char = wtcc.schema.create("character");
    var stats = wtcc.schema.findBy(wtcc.model.config.effects, 'type', 'stat');
    var native = wtcc.schema.findBy(wtcc.model.config.modifiers, 'id', '63337583-a1ce-4085-a83e-28243e11bf8c')[0];
    var pool;
    var stat;
    var cur;
    for each (cur in stats) {
        if (wtcc.util.myTypeOf(cur) !== 'object') {
            continue;
        }
        stat = wtcc.schema.copy(cur);
        if (native !== undefined) {
            stat.modifiers.push(wtcc.schema.copy(native));
        }

        pool = wtcc.schema.create("pool");
        pool.name = stat.name;
        pool.normal = 1;
        pool.type = 'stat';
        pool.effects.push(stat);

        char.stats.push(pool);
    }
    wtcc.model.updateCharacter(char);
	return char;
};

wtcc.model.updateCharacter = function(char) {
    if (char.element !== 'character') throw new wtcc.Exception('updateCharacter cannot update: ' + char.element);
    // TODO implement
};

wtcc.model.updateConfig = function(config) {
    if (config.element !== 'data') throw new wtcc.Exception('updateConfig cannot update: ' + config.element);
    // TODO implement
};
