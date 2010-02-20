Ext.namespace('wtcc.model');

wtcc.model.init = function () {
    wtcc.model.config = wtcc.defaultConfig;
    wtcc.model.updateConfig(wtcc.model.config);
    wtcc.model.character = wtcc.model.createCharacter();
};

wtcc.model.createCharacter = function () {
    var character, stats, native_modifier, pool, stat, cur, i;

    character = wtcc.schema.create("character");
    stats = JSONQuery("[?type='stat']", wtcc.model.config.effects);
    native_modifier = JSONQuery("[?id='"+wtcc.model.config.id_native+"']", wtcc.model.config.modifiers)[0];

    for (i = 0; i < stats.length; i = i + 1) {
        cur = stats[i];
        if (wtcc.util.myTypeOf(cur) !== 'object') {
            continue;
        }
        stat = wtcc.schema.copy(cur);
        if (native_modifier !== undefined) {
            stat.modifiers.push(wtcc.schema.copy(native_modifier));
        }

        pool = wtcc.schema.create("pool");
        pool.name = stat.name;
        pool.normal = 1;
        pool.type = 'stat';
        pool.effects.push(stat);

        character.stats.push(pool);
    }
    wtcc.model.updateCharacter(character);
    return character;
};

wtcc.model.updateCharacter = function (character) {
    if (character.element !== 'character') {
        throw new wtcc.Exception('updateCharacter cannot update: ' + character.element);
    }

    wtcc.schema.verify(character);

    character.points_stats = wtcc.model.updatePools(character.stats);
    character.points_skills = wtcc.model.updatePools(character.skills);
    character.points_powers = wtcc.model.updatePools(character.powers);
    wtcc.model.updateArchetype(character.archetype);
    wtcc.model.updateWillpower(character);
    character.points_total = character.points_stats + character.points_skills + character.points_powers + character.archetype.points + character.willpower.points;
};

wtcc.model.updateWillpower = function (character) {
    // TODO update willpower, base minimum depends on stats
    character.willpower.min_base = 0;
};

wtcc.model.updatePools = function (pools) {
    var total_points, i, pool;

    total_points = 0;

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

wtcc.model.updatePool = function (pool) {
    pool.die_cost = wtcc.model.updateEffects(pool.effects);
    pool.points = (pool.die_cost * pool.normal) +
                  (wtcc.model.config.mult_hard * pool.die_cost * pool.hard) +
                  (wtcc.model.config.mult_wiggle * pool.die_cost * pool.wiggle);
};

wtcc.model.updateEffects = function (effects) {
    var total_die_cost, i, effect;

    total_die_cost = 0;
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

wtcc.model.updateEffect = function (effect) {
    var total_mod, i, modifier;

    total_mod = 0;
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

wtcc.model.updateArchetype = function (archetype) {
    var i, mq;

    archetype.points = 0;

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

wtcc.model.updateArchetypes = function (archetypes) {
    var i, archetype;

    for (i = 0; i < archetypes.length; i = i + 1) {
        archetype = archetypes[i];
        if (wtcc.util.myTypeOf(archetype) !== 'object') {
            continue;
        }
        wtcc.model.updateArchetype(archetype);
    }
};

wtcc.model.updateConfig = function (config) {
    if (config.element !== 'data') {
        throw new wtcc.Exception('updateConfig cannot update: ' + config.element);
    }

    wtcc.schema.verify(config);
    wtcc.model.updatePools(config.powers);
    wtcc.model.updateArchetypes(config.archetypes);
};
