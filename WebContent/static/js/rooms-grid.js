 RoomsPanel = Ext.extend(Ext.grid.GridPanel, {
		rooms: null,
		pageLimit: 50,
		initComponent: function()
	    {

			// create the Data Store
		    this.store = new Ext.data.JsonStore({
				url: _contextPath + '/rooms/list',
				root: 'rooms',
		        totalProperty: 'count',
		        remoteSort: true,
		        fields: [
		            'ROOM_ID',
		            'ROOM_NO',
		            'ROOM_TYPE',
		            'STATUS',
		            'LOCATION_X',
		            'LOCATION_Y'		            		            
		        ],
				sortInfo: {
					field: 'ROOM_NO',
					direction: 'ASC'
				},
				baseParams: {IS_DELETE: 0 },
				autoLoad: {params:{start:0, limit: this.pageLimit}}
		    });

		    
		    var columnModel = new Ext.grid.ColumnModel({
		        defaults: { 
		        	sortable: true 
		        },
		        columns:[
		                 {header: "Room ID", dataIndex: 'ROOM_ID', hidden: true },
		                 {header: "Room No", dataIndex: 'ROOM_NO', width: 30 },
		                 {header: "Room Type", dataIndex: 'ROOM_TYPE', width: 50,
		                 renderer: function(value){ if(value == 1){ return 'Double'; }else if(value == 2){ return 'Single';}else if(value == 3){ return 'Superior';}else{ return 'Family Room';}}},
		                 {header: "Status", dataIndex: 'STATUS', width: 50, 
		                 renderer: function(value){ if(value == 1){ return 'Available'; }else if(value == 2){ return 'Out of Service';}else{ return 'Maintenance';}}},
		                 {header: "Location X",dataIndex: 'LOCATION_X',width: 50},
		                 {header: "Location Y",dataIndex: 'LOCATION_Y',width: 50}
		                 ]
		        });
		    
		    
		    var panel = this;
		    
		    var toolbar = {
		            pageSize: panel.pageLimit,
		            store: panel.store,
		            displayInfo: true,
		            displayMsg: 'Displaying rooms {0} - {1} of {2}',
		            emptyMsg: "No rooms to display"
		        };
		    
		    toolbar.items = ['-',                
                {
	                text: 'Add Room',
	                cls: 'x-btn-text details',
	                handler: function(btn, event){ 
	                	// 0 to new
	                	panel.roomsWindow(null);
	                }
	             }];
		    
		    var config = {
		    	title: 'Rooms',
		    	padding: '5 5 5 5',
		        store: panel.store,
		        trackMouseOver:false,
		        disableSelection:false,
		        frame: false,
		        border: false,		
		        // paging bar on the bottom
		        bbar: new Ext.PagingToolbar(toolbar),
		        loadMask: true,
		        // grid columns
		        colModel: columnModel,		
		        // customize view config
		        viewConfig: { forceFit:true },		
		        // paging bar on the bottom
		        tbar: {
			    	xtype: 'toolbar',
			    	items: ['Filter: ',
			    	        {
			    				xtype: 'cleartrigger',
					            fieldLabel: 'Sample Trigger',
					            emptyText:"Room No",
					            value: '',
					            enableKeyEvents: true,
					            listeners: {
					            	keyup: function(field, event)
					            	{
					            		if(event.keyCode == 13)
					            		{
						            		var filterValue = this.getValue();
						            		
							            	var store = panel.store;
							            	store.baseParams = {filter: filterValue, limit: panel.pageLimit};
							            	store.load();
					            		}
					            	},
					            },
					            onTriggerClick: function() {
					            	this.setValue('');
					            	
					            	var store = panel.store;
					            	store.baseParams = {owner_id: panel.owner.owner_id, limit: panel.pageLimit};
					            	store.load();
					            }
					        }
			    	        ]
			    }
			    
		    };
		   
			Ext.apply(this, Ext.apply(this.initialConfig, config));
	        
			RoomsPanel.superclass.initComponent.apply(this, arguments);
			
			this.on('rowcontextmenu', this.showContextMenu);
			this.on('rowdblclick', function(grid, index, event)
					{
						event.stopEvent();
						var record = grid.getStore().getAt(index);
						panel.roomsWindow(record.data);
					});
	    },
	    showContextMenu: function(grid, index, event)
		{
	    	event.stopEvent();
			var panel = this;
			var record = grid.getStore().getAt(index);
			
			var items = new Array(
					{
						text: 'Edit',
						handler: function() 
						{					
							var data = record.data;
							
							panel.roomsWindow(data);
						}
			
					}/*,
					{
						text: 'Delete',
						handler: function() 
						{
							Ext.MessageBox.confirm("Delete Room?", 'Delete room "'+record.data.ROOM_NO+'"?', function(p1, p2){
								if(p1 != 'no')
								{
									// Basic request
									Ext.Ajax.request({
									   url: _contextPath + '/rooms/delete',
									   success: function(response, opts){
										   panel.store.reload();
										   Ext.growl.message('Success','Room has been deleted.');
									   },
									   failure: function(response, opts){
										   Ext.Msg.show({
											   title:'Error!',
											   msg: 'Error deleting Room.',
											   buttons: Ext.Msg.OK,
											   icon: Ext.MessageBox.ERROR
											});
									   },
									   params: { ROOM_ID: record.data.ROOM_ID}
									});
								}
							});
						}
			
					}*/
					);
			
			
			new Ext.menu.Menu(
			{
				items: items
			}).showAt(event.xy);
		},
		roomsWindow: function(data)
		{
			var panel = this;
			
			var title = "Add Room";
			
			if(data == null){
				 title = "Edit Room";
				
			}
			
			var formPanelRoom = new Ext.Panel({			    	
	    		id: 'roomPanel',
	    		padding: '0px',			    		
				bodyStyle:'padding: 0px; margin: 0px;',
				border: false,	
				frame:false,
				bodyBorder: false,
				frame: false,
				labelAlign: 'top',
				buttonAlign:'center',
				bodyStyle: 'padding: 10px; ',
				//autoWidth: true,
	    		items: [	    		        
						{
							xtype: 'form',
							//autoWidth: true,
							//autoHeight: true,
							id:"room-form",
							padding: '10px',	
							//deferredRender: false,	
							bodyBorder: false,
							border: false,
							labelAlign: 'top',
							frame: false,
							defaultType:'textfield',
							buttonAlign:'center',
							bodyStyle: 'padding: 10px; ',
							//autoWidth: true,
							defaults: { width: '95%' },
							bodyCssClass: 'x-citewrite-panel-body',
							items: [
							        {
									xtype:'hidden',
									id:'room_id',
									name:'ROOM_ID',
									anchor: '95%'
								},{
									xtype:'numberfield',
									id:'room_no',
									name:'ROOM_NO',
									allowBlank: false,
									fieldLabel: 'Room No',
									anchor: '95%'									
								},
								{	
									xtype: 'combo',
									id : 'ROOM_TYPE',
									name : 'ROOM_TYPE',
									hiddenName : 'ROOM_TYPE',
									allowBlank : false,
									// regex:
									// /^(?!\.?$)\d{0,9}(\.\d{0,0})?$/,
									regexText : 'The maximum length for this field is 10',
									fieldLabel : 'Room Type',
									forceSelection : true,
									mode : 'local',
									triggerAction : 'all',
									lazyRender : false,
									anchor: '95%',
									store : new Ext.data.ArrayStore(
									{
										autoDestroy : true,
										id : "statusStore",
										fields : [
												'id',
											'value' ],
											data : [
												[ '1','Double' ],
												[ '2','Single' ],
												[ '3','Superior' ],
												[ '4','Family Room' ] ]
												}),
										displayField : 'value',
										valueField : 'id'
								},
								{
									   xtype: 'combo',
									   id: 'status',
									   name:'STATUS',
									   hiddenName: 'STATUS',
								    	//regex: /^(?!\.?$)\d{0,9}(\.\d{0,0})?$/,
									   regexText:'The maximum length for this field is 10',
									   forceSelection: true,
									   allowBlank: false,
									   mode: 'local',
									   fieldLabel: 'Status',
									   triggerAction: 'all',
									   lazyRender: false,
									   anchor: '95%',
									   store: new Ext.data.ArrayStore({
										   	   autoDestroy: true,
											   id: "statusStore",
											   fields: ['id', 'value'],
											   data : [
											            ['1', 'Available'],
											            ['2', 'Out of Service'],
											            ['3', 'Maintenance']
											        ]
									    }),
									    displayField: 'value',
									    valueField: 'id'
								},
								{
									xtype:'numberfield',
									id:'location_x',
									name:'LOCATION_X',
									fieldLabel: 'Location X',
									anchor: '95%'
								},
								{
									xtype:'numberfield',
									id:'location_y',
									name:'LOCATION_Y',
									fieldLabel: 'Location Y',
									anchor: '95%'
								}]
						}
	    		        
	    		]
	    	});
			
			var roomsWindow = new Ext.Window({
		        renderTo: document.body,
		        title:title,
		        width:350,
		        layout:'fit',
		        height:'380px',
		        plain: true,
		        resizable: false,
		        autoScroll: true,
		        modal: true,
		        id: 'room-view-window',
		        closeAction: 'close',
		        items:formPanelRoom,
		        autoDestroy: true,
		        /*items: [{
		        	xtype: 'panel',
					bodyCssClass: 'x-citewrite-panel-body',
			        padding: 5,
		        	autoLoad: {url: _contextPath + '/invoice/details', params: {invoice_id: record.data.invoice_id, owner_id: panel.owner.owner_id }},
		        }],*/
		        buttons: [{
	                text:'Save',
	                handler: function()
	                {   	                	
	                	//validate form
	                	Ext.getCmp("room-form").getForm().submit({
	                		 url: _contextPath + '/rooms/save',
	                	    scope: this,
	                	    params: {citation_id: 0},
	                	    success: function(response, opts){		
	                	    	Ext.getCmp("room-view-window").close();	                	    	
	                	    	panel.store.reload();
	                	    	Ext.growl.message('Success', 'Room has been saved.');
	                	    },
	                	    failure: function(form, action) {
	    						switch (action.failureType) {
								case Ext.form.Action.CLIENT_INVALID:
									Ext.Msg.show({
									   title:'Error',
									   msg: getActiveErrorMessage(form),
									   buttons: Ext.Msg.OK,
									   icon: Ext.MessageBox.ERROR
									});

									break;
								case Ext.form.Action.CONNECT_FAILURE:
									Ext.Msg.show({
									   title:'Failure!',
									   msg: 'Ajax communication failed',
									   buttons: Ext.Msg.OK,
									   icon: Ext.MessageBox.ERROR
									});
									break;
								case Ext.form.Action.SERVER_INVALID:
									Ext.Msg.show({
									   title:'Failure!',
									   msg:  action.result.msg,
									   buttons: Ext.Msg.OK,
									   icon: Ext.MessageBox.ERROR
									});
						   }
						}
	                	});
	                }
	            },{
	                text: 'Close',
	                handler: function(){
	                	this.findParentByType('window').close();
	                }
	            }]
		    });
			
			roomsWindow.show();
			roomsWindow.center();
			
			if(data != null){
				 Ext.getCmp("room_id").setValue(data.ROOM_ID);
				 Ext.getCmp("room_no").setValue(data.ROOM_NO);
				 Ext.getCmp("ROOM_TYPE").setValue(data.ROOM_TYPE);
				 Ext.getCmp("status").setValue(data.STATUS);
				 Ext.getCmp("location_x").setValue(data.LOCATION_X);
				 Ext.getCmp("location_y").setValue(data.LOCATION_Y);
			}
		}
		
});