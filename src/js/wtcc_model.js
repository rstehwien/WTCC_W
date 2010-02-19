Ext.namespace('wtcc.model');

wtcc.model.init = function() {
    wtcc.model.config = wtcc.model.defaultConfig;
    wtcc.model.updateConfig(wtcc.model.config);
    wtcc.model.character = wtcc.model.createCharacter();
};

wtcc.model.createCharacter = function() {
    var char = wtcc.schema.create("character");
    var stats = JSONQuery("[?type='stat']", wtcc.model.config.effects);
    var native = JSONQuery("[?id='63337583-a1ce-4085-a83e-28243e11bf8c']", wtcc.model.config.modifiers)[0];
    var pool;
    var stat;
    var cur;
    var i;
    for (i = 0; i < stats.length; i = i + 1) {
        cur = stats[i];
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

    wtcc.schema.verify(char);

    char.points_stats = wtcc.model.updatePools(char.stats);
    char.points_skills = wtcc.model.updatePools(char.skills);
    char.points_powers = wtcc.model.updatePools(char.powers);
    wtcc.model.updateArchetype(char.archetype);
    wtcc.model.updateWillpower(char);
    char.points_total = char.points_stats + char.points_skills + char.points_powers + char.archetype.points + char.willpower.points;
};

wtcc.model.updateWillpower = function(char) {
    // TODO update willpower, base minimum depends on stats
};

wtcc.model.updatePools = function(pools) {
    var total_points = 0;

    var i;
    var pool;
    for (i = 0; i < pools.length; i = i + 1) {
        pool = pools[i];
        if (wtcc.util.myTypeOf(pool) !== 'object') {
            continue;
        }
        wtcc.model.updatePool(pool);
        total_points = total_points + pool.points;
    }

    return total_points;
};

wtcc.model.updatePool = function(pool) {
    pool.die_cost = wtcc.model.updateEffects(pool.effects);
    pool.points = (pool.die_cost * pool.normal) +
                  (2 * pool.die_cost * pool.hard) +
                  (4 * pool.die_cost * pool.wiggle);
};

wtcc.model.updateEffects = function(effects) {
    var total_die_cost = 0;

    var i;
    var effect;
    for (i = 0; i < effects.length; i = i + 1) {
        effect = effects[i];
        if (wtcc.util.myTypeOf(effect) !== 'object') {
            continue;
        }
        wtcc.model.updateEffect(effect);
        total_die_cost = total_die_cost + effect.die_cost;
    }

    return total_die_cost;
};

wtcc.model.updateEffect = function(effect) {
    var total_mod = 0;
    var i;
    var modifier;
    for (i = 0; i < effect.modifiers.length; i = i + 1) {
        modifier = effect.modifiers[i];
        if (wtcc.util.myTypeOf(modifier) !== 'object') {
            continue;
        }
        modifier.mod = modifier.cost * modifier.ranks;

        // TODO there should only be one unchosen capacity, everything else chosen
        if (modifier.is_chosen) {
            total_mod = total_mod + modifier.mod;
        }
    }
    effect.die_cost = effect.cost + total_mod;
};

wtcc.model.updateArchetype = function(archetype) {
    archetype.points = 0;
    var i;
    var mq;
    for (i = 0; i < archetype.meta_qualities.length; i = i + 1) {
        mq = archetype.meta_qualities[i];
        if (wtcc.util.myTypeOf(mq) !== 'object') {
            continue;
        }

        // TODO only the first source is free, everthing else chosen
        if (mq.is_chosen) {
            archetype.points = mq.cost;
        }
    }
};

wtcc.model.updateArchetypes = function(archetypes) {
    var i;
    var archetype;
    for (i = 0; i < archetypes.length; i = i + 1) {
        archetype = archetypes[i];
        if (wtcc.util.myTypeOf(archetype) !== 'object') {
            continue;
        }
        wtcc.model.updateArchetype(archetype);
    }
};

wtcc.model.updateConfig = function(config) {
    if (config.element !== 'data') throw new wtcc.Exception('updateConfig cannot update: ' + config.element);

    wtcc.schema.verify(config);
    wtcc.model.updatePools(config.powers);
    wtcc.model.updateArchetypes(config.archetypes);
};
