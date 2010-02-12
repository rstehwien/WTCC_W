wtcc.app.init = function() {
  wtcc.app.log('wtccDebug', 'wtcc.init begin')

  wtcc.model.character = wtcc.util.cloneJSON(wtcc.model.defaultConfig.character);
  wtcc.view.init();

  //if (typeof(Titanium) === 'undefined') window.onbeforeunload = function() { return 'About to loose any changes.'; };
  wtcc.app.log('wtccDebug', 'wtcc.init complete')
};

wtcc.app.log = function(level, msg) {
  if (typeof(console) !== 'undefined') console.log(level + ': ' + msg);
};

Ext.onReady(wtcc.app.init);

/*
include: function(filename) {
    var head = document.getElementsByTagName('head')[0];

    script = document.createElement('script');
    script.src = filename;
    script.type = 'text/javascript';

    head.appendChild(script)
},
WTCC.include("js/wtcc_data.js")

  <script type="text/javascript" src="js/ext-basex.js"></script>

    loadData: function() {
        Ext.Ajax.request(
        {
            loadMask: true,
            url: 'data/WTCC_data.json',
            success: WTCC.parseData,
            failure: function() {
              debugger;
              Ext.Msg.alert('Error', 'Unable to load data.');
            }
        });
    },

    parseData: function(result) {
      try {
      WTCC.data = Ext.util.JSON.decode(result.responseText);
      }
      catch (err) {
        Ext.Msg.alert('Error', 'Failed to parse data: ' + err);
      }
    },
*/


