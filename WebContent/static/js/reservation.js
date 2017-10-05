Ext.onReady(function(){
	var invoice = Ext.get('nav-reservation');
	if(invoice != null)
	{
		
		invoice.on('click',function(){
			
			var url =  "http://"+window.location.host+window.location.pathname+"reservation?reservation_id=0";						
			window.open(url); 
			return;
			
			var content = Ext.getCmp('content-panel');
			content.removeAll(true);			
			content.add(new ReservationPanel());
			content.doLayout();
			return;
		});//end onclick 
	}
});
