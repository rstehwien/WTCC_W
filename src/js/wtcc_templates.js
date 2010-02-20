Ext.namespace('wtcc.templates');

wtcc.templates = function () {
    var mypublic, myprivate;
    mypublic = {};
    myprivate = {};

    mypublic.getMeta = function(type, list) {
        var str, data, i;

        data = JSONQuery("[?type='" + type + "']", list);
        if (data.length === 0) {
            return "";
        }

        str = "<p>";
        if (type === 'source') {
            str = str + (data.length > 1 ? "<strong>Sources: </strong>" : "<strong>Source: </strong>");
        }
        else if (type === 'permission') {
            str = str + (data.length > 1 ? "<strong>Permissions: </strong>" : "<strong>Permission: </strong>");
        }
        else if (type === 'intrinsic') {
            str = str + (data.length > 1 ? "<strong>Intrinsics: </strong>" : "<strong>Intrinsic: </strong>");
        }

        for (i = 0; i < data.length; i = i + 1) {
            if (i > 0) {
                str = str + ", "
            }
            str = str + data[i].name + " (" + data[i].cost + ")";
        }
        str = str + "</p>";
        return str;
    };

    myprivate.info = '<p><strong>{name}:</strong> {text}</p>';

    myprivate.infos = '<tpl for=".">' + myprivate.info + '</tpl>';

    myprivate.archetype = '<h2>Archetype ({points})</h2>' +
                          '<p><strong>Name: </strong>{name}</p>' +
                          '{[wtcc.templates.getMeta(\'source\', values.meta_qualities)]}' +
                          '{[wtcc.templates.getMeta(\'permission\', values.meta_qualities)]}' +
                          '{[wtcc.templates.getMeta(\'intrinsic\', values.meta_qualities)]}';

    myprivate.willpower = '<h2>Willpower ({points})</h2>' +
                          '<p><strong>Base: </strong> {base}</p>' +
                          '<p><strong>Current: </strong> {current}</p>' +
                          '<strong>Motivations:</strong><ul>' +
                          '<tpl for="motivations"><li>{name} ({value})</li></tpl>' +
                          '</ul>';

    myprivate.pools = '<ul>'+
                      '<tpl for=".">'+
                      '<li>{name} {normal}d+{hard}hd+{wiggle}wd ({points})</li>'+
                      '</tpl></ul>';

    myprivate.character = '<h1>{name}</h1>' +
                          '<br><tpl for="infos">' +
                          myprivate.info +
                          '</tpl>' +
                          '<br><h2>Point Total:</h2><p>{points_total}</p>' +
                          '<br><tpl for="archetype">' +
                          myprivate.archetype +
                          '</tpl>' +
                          '<br><h2>Stats ({points_stats})</h2><tpl for="stats">' + myprivate.pools + '</tpl>' +
                          '<tpl for="willpower"><br>' + myprivate.willpower + '</tpl>' +
                          '<br><h2>Skills ({points_skills})</h2><tpl for="skills">' + myprivate.pools + '</tpl>' +
                          '<br><h2>Powers ({points_powers})</h2><tpl for="powers">' + myprivate.pools + '</tpl>';
    mypublic.character = new Ext.XTemplate(myprivate.character);
    mypublic.character.compile();

    return mypublic;
}();

