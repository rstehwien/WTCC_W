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
        var item = wtcc.schema.create("data");
        this.assertType(item, 'object');
        this.assertHasProperty(item, 'id');
        this.assertHasProperty(item, 'modifiers');
        this.assertHasProperty(item.modifiers, 'length');
        this.assertHasProperty(item, 'modifiers');
    },

    testCreateCharacter: function () {
        var item = wtcc.schema.create("character");
        this.assertType(item, 'object');
        this.assertHasProperty(item, 'id');
        this.assertType(item.willpower, 'object');
        this.assertHasProperty(item.willpower, 'id');
    },

    testCreateInvalid: function () {
        this.assertRaises(wtcc.Exception, wtcc.schema.create, null, "invalid");
    },

    testCopy: function () {
        var item1 = wtcc.schema.create("character");
        var item2 = wtcc.schema.copy(item1);
        this.assertNotEqual(item1.id, item2.id);
        this.assertEqual(item1.id, item2.id_org);
        this.assertNotEqual(item1.willpower.id, item2.willpower.id);
        this.assertEqual(item1.willpower.id, item2.willpower.id_org);
    },

    testVerify: function() {
        var item = {"element": "effect"};
        wtcc.schema.verify(item);
        this.assertHasProperty(item, 'id');
        this.assertHasProperty(item, 'modifiers');
        this.assertEqual(item.modifiers.length, 0);
    },

    testDeepVerify: function() {
        var item = {"element": "character", "willpower": {"element": "willpower"}};
        wtcc.schema.verify(item);
        this.assertHasProperty(item.willpower, 'id');
    },

    testTrim: function() {
        var item = wtcc.schema.create("modifier");
        this.assertHasProperty(item, 'cost');
        wtcc.schema.trim(item);
        this.assertNotHasProperty(item, 'cost');
        //wtcc.log(Ext.util.JSON.encode(item));
    }

    // this.todo('Write more tests');
});

