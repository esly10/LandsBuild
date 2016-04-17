Ext.onReady(function(){
		var reservations = Ext.get('nav-list');
		if(reservations != null)
		{
			
			reservations.on('click',function(){
				var content = Ext.getCmp('content-panel');
				content.removeAll(true);
				
				content.add(new ReservationListPanel());
				content.doLayout();
				return;
			});//end onclick 
		}
	});
