Ext.BLANK_IMAGE_URL = 'js/extjs/resources/images/default/s.gif';

var wtcc = {
    model: {},
    view: {},
    
    init: function() {
        wtcc.log('wtccDebug', 'wtcc.init begin')
        
        wtcc.model.character = wtcc.cloneJSON(wtcc.model.defaultConfig.character);
        wtcc.view.init();
                
        if (typeof(Titanium) === 'undefined') window.onbeforeunload = function() { return 'About to loose any changes.'; };
        
        wtcc.log('wtccDebug', 'wtcc.init complete')
    },

    cloneJSON: function(json) {
        return Ext.util.JSON.decode(Ext.util.JSON.encode(json));
    },
    
    log: function(level, msg) {
      console.log(level + ': ' + msg);
    },
    
};
Ext.onReady(wtcc.init);

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

