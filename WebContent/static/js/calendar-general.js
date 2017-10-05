CalendarPanel = Ext.extend(Ext.Panel, {
		initComponent: function()
	    {
			var panel = this;
			calendarStore.reload();
			var config = 
			{
				xtype: 'panel',
			    //title: 'Calendar',
			    id: 'calendar-main',
			    padding: 2,
			    bodyCssClass: 'x-citewrite-panel-body',
			    autoScroll: true,
			    buttonAlign: 'left',
			    autoLoad : { url : _contextPath + '/calendar/panel', scripts : true, params: {} },
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


