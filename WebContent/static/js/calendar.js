Ext.onReady(function(){
	var invoice = Ext.get('nav-calendar');
	if(invoice != null)
	{
		
		invoice.on('click',function(){
			var content = Ext.getCmp('content-panel');
			content.removeAll(true);			
			content.add(new CalendarPanel());
			content.doLayout();
			return;
		});//end onclick 
	}
});
