Ext.onReady(function(){
	var invoice = Ext.get('nav-reservation');
	if(invoice != null)
	{
		
		invoice.on('click',function(){
			var content = Ext.getCmp('content-panel');
			content.removeAll(true);			
			content.add(new ReservationPanel());
			content.doLayout();
			return;
		});//end onclick 
	}
});
