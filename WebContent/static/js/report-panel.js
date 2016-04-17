ReportFormPanel = Ext.extend(Ext.Panel, {
	stateStore: null,
	initComponent: function()
    {
		 var panel = this;
		
	    this.stateStore = new Ext.data.JsonStore({
	    	root: 'states',
			url: _contextPath + '/permit/permitSearchableList',
			totalProperty: 'count',
			fields: ['label', 'queryName', 'columnName'],
			autoLoad: true
	    });
		
		var config = 
		{
			xtype: 'panel',
			title: 'Search Type',
			layout: 'fit',
			bodyBorder: false,
			border: false,
			autoScroll: true,
			bodyCssClass: 'x-citewrite-panel-body',
			tbar: [
		            {
						xtype: 'combo',
						valueField: 'columnName',
						displayField: 'label',
						lazyRender: false,
					 	store: this.stateStore,
						typeAhead: true,
						mode: 'local',
						width: 100,
						id: 'searchType'
					}, ' ',
					{
						xtype: 'textfield',
						id: 'lookup-value',
		                width:150,
		                allowblank: false,
		                maskRe: /^[a-zA-Z0-9_]*$/
		            }, ' ',
					{
		            	xtype: 'tbbutton',
		            	text: 'GO',
		            	handler: function()
		            	{
		            		panel.doLookup();
		            	}
		            },
		            {
		            	xtype: 'tbbutton',
		            	text: 'RESET',
		            	handler: function()
		            	{
		            		$('searchType').setValue('');
		            		$('lookup-value').value = '';
		            		$('lookup-value').focus();
		            		panel.removeAll();
		            	}
	            	}
		        ],
			items: [

				]
		};
		
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		ReportFormPanel.superclass.initComponent.apply(this, arguments);

    },
    doLookup: function()
	{
    	var value = Ext.getCmp('lookup-value').getValue();
    	var searchType = Ext.getCmp('searchType').getValue();
    	
    	var data = {
				value: value,
				searchType: searchType
		};
    	
    	if(value.length == 0)
		{
			Ext.Msg.show({
				   title:'Missing Field',
				   msg: 'Please enter a value.',
				   buttons: Ext.Msg.OK,
				   icon: Ext.MessageBox.ERROR
				});
			
			return false;
		}
    	
    	if(searchType.length == 0)
		{
			Ext.Msg.show({
				   title:'Missing Field',
				   msg: 'Please enter a search type.',
				   buttons: Ext.Msg.OK,
				   icon: Ext.MessageBox.ERROR
				});
			
			return false;
		}
    	
    	 var tabs = new Ext.TabPanel({
             border: false,
             bodyBorder: false,
             activeTab: 0,
             frame:false,
             plain: false,
             tabPosition: 'top',
             id: 'searchTabPanel'
         });
    	 
    	Ext.getCmp('statusbar').showBusy('Searching...');
    	this.removeAll();
    	var panel = this;
    	this.load({
		    url: _contextPath + '/search/search',
		    scripts: true,
		    params: data, // or a URL encoded string
		    callback: function()
		    {
		    	Ext.getCmp('statusbar').clearStatus();
		    	panel.add(tabs);
		    	panel.doLayout();
		    }});
	}
});




