CalendarPanel = Ext.extend(Ext.Panel, {
		appeal: null,
		initComponent: function()
	    {
			var panel = this;
			var config = 
			{
				xtype: 'panel',
			    //title: 'Calendar',
			    id: 'calendar-main',
			    padding: 5,
			    bodyCssClass: 'x-citewrite-panel-body',
			    autoScroll: true,
			    buttonAlign: 'left',
			    autoLoad : { url : _contextPath + '/calendar/panel', scripts : true, params: {citation_appeal_id: this.citation_appeal_id} },
			    buttons:  []
			};
			
			Ext.apply(this, Ext.apply(this.initialConfig, config));
	        
			CalendarPanel.superclass.initComponent.apply(this, arguments);
	    },
	    editNote: function(note_id)
	    {},
	    deleteNote: function(note_id)
	    {}
});


