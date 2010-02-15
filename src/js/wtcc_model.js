wtcc.model.init = function() {
  wtcc.model.character = wtcc.model.createCharacter();
};

wtcc.model.createCharacter = function() {
	var char = wtcc.model.schema.create("character"); //wtcc.util.cloneJSON(wtcc.model.defaultConfig.character);
	return char;
};
