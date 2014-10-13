Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    items:{ html:'<a href="https://help.rallydev.com/apps/2.0rc3/doc/">App SDK 2.0rc3 Docs</a>'},
    launch: function() {
        Ext.create('Rally.data.wsapi.Store', {
            model: 'Project',
            autoLoad: true,
            limit: Infinity,
            listeners: {
                load: this._onDataLoaded,
                scope: this
            },
            fetch: ['Name','TeamMembers','ObjectID']
        });
    },
    _onDataLoaded: function(store, data) {
        var records = _.map(data, function(record) {
            return Ext.apply({
                TeamMemberCount: record.get('TeamMembers').Count
            }, record.getData());
        });
        this.add({
            xtype: 'rallygrid',
            showPagingToolbar: true,
            showRowActionsColumn: false,
            sortable: true,
            editable: false,
            store: Ext.create('Rally.data.custom.Store', {
                data: records
            }),
            columnCfgs: [
                 {
                    text: 'Name',
                    dataIndex: 'Name',
                    flex:1
                },
                {
                    text: 'ID',
                    dataIndex: 'ObjectID'
                },
                {
                    text: '# of Team Members',
                    dataIndex: 'TeamMemberCount'
                }
            ]
        });
    }
});
