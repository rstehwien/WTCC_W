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

    testFindByStrExists: function () {
        var item = wtcc.model.schema.create("character");
        item.name = "Foo";
        var result = wtcc.model.schema.findBy(item, 'name', 'Foo');
        this.assertEqual(result.length, 1);
    },

    testFindByRegExExists: function () {
        var item = wtcc.model.schema.create("character");
        item.name = "Foo";
        var result = wtcc.model.schema.findBy(item, 'name', /oo/);
        this.assertEqual(result.length, 1);
    },

    testFindByStrNotExists: function () {
        var item = wtcc.model.schema.create("character");
        item.name = "Foo";
        var result = wtcc.model.schema.findBy(item, 'name', 'BAr');
        this.assertEqual(result.length, 0);
    },

    testFindByRegExNotExists: function () {
        var item = wtcc.model.schema.create("character");
        item.name = "Foo";
        var result = wtcc.model.schema.findBy(item, 'name', /z/);
        this.assertEqual(result.length, 0);
    },

    testFindByMultCall: function () {
        //var result = wtcc.model.schema.findBy(wtcc.model.defaultConfig, 'element', 'modifier');
        //this.assertGreatherThan(result.length, 1);
        //var result2 = wtcc.model.schema.findBy(wtcc.model.defaultConfig.modifiers, 'name', 'Native');
        //this.assertEqual(result2.length, 1);
        this.todo('Write more tests');
    },

    testCopy: function () {
        var item1 = wtcc.model.schema.create("character");
        var item2 = wtcc.model.schema.copy(item1);
        this.assertNotEqual(item1.id, item2.id);
        this.assertEqual(item1.id, item2.id_org);
        this.assertNotEqual(item1.willpower.id, item2.willpower.id);
        this.assertEqual(item1.willpower.id, item2.willpower.id_org);
    }

    // this.todo('Write more tests');
});

