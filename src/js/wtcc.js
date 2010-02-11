function buildWindow() {
    var win = new Ext.Window({
        id: 'myWindow',
        title: 'My first Ext JS Window',
        width: 300,
        height: 150,
        layout: 'fit',
        autoLoad: {
            url: 'sayHi.html',
            scripts: true
        }
    });
    win.show();
    Ext.MessageBox.alert('Hello', 'The DOM is ready!');
}
Ext.onReady(buildWindow);