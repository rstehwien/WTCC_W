var SchemaTestCase = JSTest.TestCase({
	name: 'Schema Test Case',
	
	init: function () {
		// this is called only once, before any tests are run
	},
	
	setup: function () {
		// this is called before every test
	},
	
	cleanup: function () {
		// this is called after every test
	},

	teardown: function () {
		// this is called only once, after all tests have been run
	},
	
	testCreateData: function () {
		var item = wtcc.model.schema.create("data");
		this.assertType(item, 'object');
		this.assertHasProperty(item, 'id');
		this.assertHasProperty(item, 'modifiers');
		this.assertHasProperty(item.modifiers, 'length');
		this.assertHasProperty(item, 'modifiers');
	},
	
	testCreateCharacter: function () {
		var item = wtcc.model.schema.create("character");
		this.assertType(item, 'object');
		this.assertHasProperty(item, 'id');
		this.assertType(item.willpower, 'object');
		this.assertHasProperty(item.willpower, 'id');
	},
	
	testCreateInvalid: function () {
	  this.assertRaises(wtcc.Exception, wtcc.model.schema.create, null, "invalid");
	},
	
	testCopy: function () {
		var item1 = wtcc.model.schema.create("character");
		this.todo('Write more tests');
	}
	
	// this.todo('Write more tests');
});
