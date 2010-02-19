var ModelTestCase = JSTest.TestCase({
    name: 'Model Test Case',

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

    testCreateCharacter: function () {
        var char = wtcc.model.createCharacter();
        this.assertGreaterThan(char.stats.length, 1);
        this.assertEqual(char.stats[0].effects[0].modifiers.length, 1);
        //wtcc.log(Ext.util.JSON.encode(char));
    },

    // TODO test update functions

});
