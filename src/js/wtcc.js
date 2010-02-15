Ext.BLANK_IMAGE_URL = 'js/extjs/resources/images/default/s.gif';

Ext.namespace('wtcc');
Ext.namespace('wtcc.app');
Ext.namespace('wtcc.model');
Ext.namespace('wtcc.model.schema');
Ext.namespace('wtcc.view');
Ext.namespace('wtcc.util');

wtcc.Exception = function(message) {
  this.message = message;
  return this;
}