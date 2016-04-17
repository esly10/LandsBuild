Ext.onReady(function(){
	var invoice = Ext.get('nav-rooms');
	if(invoice != null)
	{
		
		invoice.on('click',function(){
			var content = Ext.getCmp('content-panel');
			content.removeAll(true);
			
			content.add(new RoomsPanel());
			content.doLayout();
			return;
		});//end onclick 
	}
});
