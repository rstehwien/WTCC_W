Ext.BLANK_IMAGE_URL = 'js/extjs/resources/images/default/s.gif';

Ext.namespace('wtcc');
Ext.namespace('wtcc.app');
Ext.namespace('wtcc.model');
Ext.namespace('wtcc.view');
Ext.namespace('wtcc.util');

wtcc.app.init = function() {
  wtcc.app.log('wtccDebug', 'wtcc.init begin')
  
  Ext.QuickTips.init();

  wtcc.model.character = wtcc.util.cloneJSON(wtcc.model.defaultConfig.character);
  wtcc.view.init();

  // TODO uncomment for production
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




