Ext.BLANK_IMAGE_URL = 'js/extjs/resources/images/default/s.gif';

Ext.namespace('wtcc');

wtcc.Exception = function(message) {
  this.message = message;
  return this;
}

wtcc.log = function(level, msg) {
    if (wtcc.util.myTypeOf(console) !== 'undefined') console.log(level + ': ' + msg);
};
