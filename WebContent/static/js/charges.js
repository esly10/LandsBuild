Ext.onReady(function(){

	var pageLimit = 50;
		
	var manageCharges = Ext.get('nav-payment');
	if(manageCharges != null)
	{
		manageCharges.on('click', function(){
			var chargeStore = new Ext.data.JsonStore
			({
				url: _contextPath + '/rooms/chargeList',
				root: 'rooms',
		        totalProperty: 'count',
		        remoteSort: true,
		        fields: [
		            'room_no',
		            'room_id',
		            'room_type',
		            'rr_id',
		            'rr_reservation_id',
		            'reservation_id'
		        ],
				sortInfo: {
					field: 'room_no',
					direction: 'ASC'
				},
				baseParams: {IS_DELETE: 0 },
				autoLoad: {params:{start:0, limit: this.pageLimit}}
			});
			
			var eventStore = new Ext.data.JsonStore
			({
				url: _contextPath + '/rooms/eventList',
				root: 'reservations',
		        totalProperty: 'count',
		        remoteSort: true, 
		        fields: [
		            'reservation_number',
		            'reservation_type',
		            'reservation_status',
		            'reservation_id'
		        ],
				sortInfo: {
					field: 'reservation_number',
					direction: 'ASC'
				},
				baseParams: {IS_DELETE: 0, number:"none" },
				autoLoad: {params:{start:0, limit: 100}}
			});
			
			var ChargeList = function(viewer, config) {
			    this.viewer = viewer;
			    Ext.apply(this, config);
			
			    this.store = chargeStore,
			    this.colModel = new Ext.grid.ColumnModel({
			        defaults: {
			            width: 150,
			            sortable: true
			        },
			        columns: [
			               {header: '', sortable: true, dataIndex: 'room_no', width: 20, 
					            	renderer : function(value, meta, chargeStore) {
					            		meta.style = "background-color:#4f5f6f; color: #FFFFFF; height:24px; font-size: 12px; width: 20px; ";
					            		 if(chargeStore.data.reservation_id != "") {
						            	        meta.style = "background-color:#33cc33; height:24px; color: #FFFFFF; font-size: 12px; font-weight: bold; width: 20px;";
						            	       
						            	    }
					            		 return	 chargeStore.data.room_no;
					            	}
			                  },
				            {header: 'Room Status', sortable: false, dataIndex: 'room_no', width: 110, 
				            	renderer : function(value, meta, chargeStore) {
				            		meta.style = "background-color:#E1E1E1; height:24px; width: 110px;";
				            		if(chargeStore.data.reservation_id != "") {
					            	        meta.style = "background-color:#ccff99; height:24px; font-weight: bold; width: 110px;";
					            	        return "Used";
					            	    }
				            		 return "Empty";
				            }
			           } 
			        ]
			    });
			    this.viewConfig = {
			        forceFit: true
			    };
			
			    ChargeList.superclass.constructor.call(this, 
			    {
			        region: 'center',
			        id: 'charge-list-grid',
			        loadMask: {msg:'Loading Charge...'},
			
			        sm: new Ext.grid.RowSelectionModel
			        ({
			            singleSelect:true
			        }),
			
			        viewConfig: 
			        {
			            forceFit:true,
			            enableRowBody:true,
			            showPreview:false,
			            getRowClass : this.applyRowClass
			        }
			    });
			
			};
			
			

			Ext.extend(ChargeList, Ext.grid.GridPanel, {
			    listeners:{
			    	rowdblclick: function(grid, index, event )
			    	{
			    		var record = grid.getStore().getAt(index);
			    		var tabs = Ext.getCmp('chargetabs');

			    		var chargePanel = tabs.find('id', 'Room-' + record.data.room_id + ' (' + Ext.getCmp('filter_date') + ')');
			    		if(chargePanel.length > 0)
			    		{
			    			tabs.setActiveTab(chargePanel[0]);
			    		}
			    		else
			    		{
				    		chargePanel = new ChargeTabPanel({charge: record.data, date: Ext.getCmp('filter_date'), isEvent: 0 });
							tabs.add(chargePanel);
							tabs.setActiveTab(chargePanel.id);
			    		}
			    		
			    	}
			    },tbar: {
			    	xtype: 'toolbar',
			    	items: [/*'Date: ', 
			    	       {
			    				xtype: 'datefield',
					            fieldLabel: 'Date',
					            emptyText:"Now",
					            value: '',
					            enableKeyEvents: true,
					            format: 'Y-m-d H:i:s',
								submitFormat: 'Y-m-d H:i:s',
								submitValue : true,
								altFormats: 'Y-m-d',
								width: 150,
								anchor: "12%",
								id: 'filter_date',
								name: 'filter_date',
								listeners : {
									select: function (t,n,o) {
								    	chargeStore.baseParams = {date: t.value};
								    	chargeStore.load({params: {start: 0, limit: pageLimit}});
						            },
						            change: function (t,n,o) {
								    	chargeStore.baseParams = {date: t.value};
								    	chargeStore.load({params: {start: 0, limit: pageLimit}});
						            },
								   render : function(datefield) {
								        datefield.setValue(new Date());
								    }
								}
			    	        }
			    	       */ ]
			    }
			});
			
			
			var EventList = function(viewer, config) {
			    this.viewer = viewer;
			    Ext.apply(this, config);
			
			    this.store = eventStore,
			    this.colModel = new Ext.grid.ColumnModel({
			        defaults: {
			            width: 150,
			            sortable: true
			        },
			        columns: [
			               {header: '', sortable: true, dataIndex: 'room_no', width: 25, 
					            	renderer : function(value, meta, eventStore) {
					            		meta.style = "background-color:#4f5f6f; color: #FFFFFF; height:24px; font-size: 12px;  font-weight: bold; width: 25px; ";
					            		 if(eventStore.data.reservation_status == 3) {
						            	        meta.style = "background-color:#33cc33; height:24px; color: #FFFFFF; font-size: 12px; font-weight: bold; width: 25px;";
						            	        return "IN";
						            	 }
					            		 if(eventStore.data.reservation_status == 1) {
						            	        meta.style = "background-color:#ff8000; height:24px; color: #FFFFFF; font-size: 12px; font-weight: bold; width: 25px;";
						            	        return "CF";
						            	 }
					            		 if(eventStore.data.reservation_status == 4) {
						            	        meta.style = "background-color:#cc0000; height:24px; color: #FFFFFF; font-size: 12px; font-weight: bold; width: 25px;";
						            	        return "OU";
						            	 }
					            		 if(eventStore.data.reservation_status == 5) {
						            	        meta.style = "background-color:#29a3a3; height:24px; color: #FFFFFF; font-size: 12px; font-weight: bold; width: 25px;";
						            	        return "OP";
						            	 }
					            		 if(eventStore.data.reservation_status == 2) {
						            	        return "CA";
						            	 }
					            		 return	 "NS";
					            	}
			                  },
				            {header: 'Event Number', sortable: false, dataIndex: 'room_no', width: 110, 
				            	renderer : function(value, meta, eventStore) {
				            		meta.style = "background-color:#E1E1E1; height:24px; width: 110px;";
				            		 if(eventStore.data.reservation_status == 3) {
					            	        meta.style = "background-color:#ccff99; height:24px; width: 110px;";
					            	        return eventStore.data.reservation_number;
					            	    }
				            		 if(eventStore.data.reservation_status == 1) {
				            	        meta.style = "background-color:#ffd9b3; height:24px; width: 110px;";
				            	        return eventStore.data.reservation_number;
				            		 }
				            		 if(eventStore.data.reservation_status == 4) {
				            			  meta.style = "background-color:#ff9999; height:24px; width: 110px;";
					            	        return eventStore.data.reservation_number;
					            	 }
				            		 if(eventStore.data.reservation_status == 5) {
				            			  meta.style = "background-color:#99e6e6; height:24px; width: 110px;";
					            	        return eventStore.data.reservation_number;
					            	 }
				            		 return eventStore.data.reservation_number;
				            }
			           } 
			        ]
			    });
			    this.viewConfig = {
			        forceFit: true
			    };
			
			    EventList.superclass.constructor.call(this, 
			    {
			        region: 'center',
			        id: 'event-list-grid',
			        loadMask: {msg:'Loading Charge...'},
			
			        sm: new Ext.grid.RowSelectionModel
			        ({
			            singleSelect:true
			        }),
			
			        viewConfig: 
			        {
			            forceFit:true,
			            enableRowBody:true,
			            showPreview:false,
			            getRowClass : this.applyRowClass
			        }
			    });
			
			};
			
			
			
			Ext.extend(EventList, Ext.grid.GridPanel, {
			    listeners:{
			    	rowdblclick: function(grid, index, event )
			    	{
			    		var record = grid.getStore().getAt(index);
			    		var tabs = Ext.getCmp('chargetabs');

			    		var chargePanel = tabs.find('id', 'Event-' + record.data.reservation_id + ' (' + record.data.reservation_number + ')');
			    		if(chargePanel.length > 0)
			    		{
			    			tabs.setActiveTab(chargePanel[0]);
			    		}
			    		else
			    		{
				    		chargePanel = new ChargeTabPanel({charge: record.data, date: Ext.getCmp('filter_date'), isEvent: 1   });
							tabs.add(chargePanel);
							tabs.setActiveTab(chargePanel.id);
			    		}
			    		
			    	}
			    },tbar: {
			    	xtype: 'toolbar',
			    	items: [/*'Date: ', 
			    	       {
			    				xtype: 'datefield',
					            fieldLabel: 'Date',
					            emptyText:"Now",
					            value: '',
					            enableKeyEvents: true,
					            format: 'Y-m-d H:i:s',
								submitFormat: 'Y-m-d H:i:s',
								submitValue : true,
								altFormats: 'Y-m-d',
								width: 150,
								anchor: "12%",
								id: 'filter_date',
								name: 'filter_date',
								listeners : {
									select: function (t,n,o) {
								    	chargeStore.baseParams = {date: t.value};
								    	chargeStore.load({params: {start: 0, limit: pageLimit}});
						            },
						            change: function (t,n,o) {
								    	chargeStore.baseParams = {date: t.value};
								    	chargeStore.load({params: {start: 0, limit: pageLimit}});
						            },
								   render : function(datefield) {
								        datefield.setValue(new Date());
								    }
								}
			    	        }
			    	       */ ]
			    }
			});
			
			
			//myDateField.setValue(new Date());
			var ChargeListMenu = function(grid, index, event)
			{
				event.stopEvent();
				var record = grid.getStore().getAt(index);
				
				var items = new Array({
						text: 'Delete',
						handler: function() 
						{
							Ext.MessageBox.confirm("Delete Charge?", 'Delete "'+record.data.name+'"?', function(p1, p2){
								if(p1 != 'no')
								{
									// Basic request
									Ext.Ajax.request({
									   url: _contextPath + '/charge/delete',
									   success: function(response, opts){
										   grid.getStore().reload();
										   Ext.growl.message('Success','Charge has been deleted.');
									   },
									   failure: function(response, opts){
										   Ext.Msg.show({
											   title:'Error!',
											   msg: 'Error deleting report.',
											   buttons: Ext.Msg.OK,
											   icon: Ext.MessageBox.ERROR
											});
									   },
									   params: { charge_id: record.data.room_no }
									});
								}
							});
						}
					});
				
				
				var menu = new Ext.menu.Menu(
				{
					items: items
				}).showAt(event.xy);
			};
				
			 var filterForm = new Ext.FormPanel({
					bodyBorder: false,
					border: false,
					frame: false,
					//defaultType:'textfield',
					//labelAlign: 'top',
					//buttonAlign:'center',
					 buttonAlign: 'right',
					bodyStyle: 'padding-top: 10px; ',
					autoWidth: true,
					defaults: { width: '30%' },
					bodyCssClass: 'x-citewrite-panel-body',
					items: [
		                    {
		                        layout:'column',
		                        items:[
		                        {   // column #1
		                            columnWidth: .3,
		                            layout: 'form',
		                            items: [
		                                {  	xtype: 'radiogroup',
								            fieldLabel: 'Search Method',
								            id: 'filter_type',
								            itemCls: 'x-check-group-alt',
								            value:1,
								            columns: 2,
								            items: [
								                {boxLabel: 'Staying Only', name: 'rb', inputValue: 1},
								                {boxLabel: 'All', name: 'rb', inputValue: 2}
								            ],
								            listeners: {
								            	change: function(field, newValue, oldValue, eOpts){
								            		if(newValue.inputValue == 1 ){
								            			Ext.getCmp("filter_date").hide();
								            		}else{
								            			Ext.getCmp("filter_date").show();
								            		}
								            		Ext.getCmp("selected_grupbox").setValue(newValue.inputValue);
								            		var date = Ext.getCmp("filter_date").getValue();
	        								    	chargeStore.baseParams = {date: date, check:newValue.inputValue};
	        								    	chargeStore.load({params: {start: 0, limit: pageLimit}});
								            		//console.log('change:' + field.fieldLabel + ' ' + newValue.rb);
								                }
								            }
		                                }
		                            ] // close items for first column
		                        },{   // column #1
		                            //columnWidth: '350px',
		                        	columnWidth: .35,
		                            layout: 'form',
		                            items: [
		                                    {   
		                                   
		                                    	xtype: 'datefield',
		        					            emptyText:"Now",
		        					            fieldLabel: 'Select Date',
		        					            value: '',
		        					            enableKeyEvents: true,
		        					            format: 'Y-m-d H:i:s',
		        								submitFormat: 'Y-m-d H:i:s',
		        								submitValue : true,
		        								altFormats: 'Y-m-d',
		        								id: 'filter_date',
		        								width: 200,
		        								hidden: true,
		        								name: 'filter_date',
		        								listeners : {
		        									
		        									select: function (t,n,o) {
		        										var check = Ext.getCmp("selected_grupbox").getValue();
		        								    	chargeStore.baseParams = {date: t.value, check:check};
		        								    	chargeStore.load({params: {start: 0, limit: pageLimit}});
		        						            },
		        						            change: function (t,n,o) {
		        						            	var check = Ext.getCmp("selected_grupbox").getValue();
		        								    	chargeStore.baseParams = {date: t.value, check:check};
		        								    	chargeStore.load({params: {start: 0, limit: pageLimit}});
		        						            },
		        								   render : function(datefield) {
		        								       datefield.setValue(new Date());
		        								    }
		        								}
		                                }
		                            ] // close items for first column
		                        },{   // column #1
		                            columnWidth: .25,
		                            layout: 'form',
		                            items: [
		                                    {   
		                                     xtype: 'textfield', 
		 		                             id: 'event_number',
		 									 fieldLabel: '   Event Lookup',
		 									align: 'right' 
		                                }
		                                
		                            ] // close items for first column
		                        },{   // column #1
		                            columnWidth: .05,
		                            layout: 'form',
		                            items: [
		                                {  	  	xtype: 'button',
		 										align: 'right' ,
		 										buttonAlign:'right',
		                                		text: 'Apply',
		                			            width: 60,
		                			            handler: function(){
		                			            	var number = Ext.getCmp("event_number").getValue();
		                			            	eventStore.baseParams = {IS_DELETE: 0, number:number};
		                			            	eventStore.load({params: {start: 0, limit: pageLimit}});
		                			            }
		                			        }
		                            ] // close items for first column
		                        },{   // column #1
		                            columnWidth: .05,
		                            layout: 'form',
		                            items: [
		                                {  	  	xtype: 'button',
		 										align: 'right' ,
		 										buttonAlign:'right',
		                                		text: 'Clear',
		                			            width: 60,
		                			            handler: function(){
		                			            	var number = "none";
		                			            	eventStore.baseParams = {IS_DELETE: 0, number:number};
		                			            	eventStore.load({params: {start: 0, limit: pageLimit}});
		                			            }
		                			        }
		                            ] // close items for first column
		                        }],
		                    },{
		                    	xtype: 'hidden',
		    					id: 'selected_grupbox',
		    					name: 'selected_grupbox',
		    					value: 0
		                    }],
			});
			 
			 
			ChargeTabPanel = Ext.extend(Ext.TabPanel, {
				charge: null,
				date: null,
				isEvent: 0,
				
					
				bodyCssClass: 'x-citewrite-panel-body',
				initComponent: function()
			    {
					var idTest= null;
					var tittleTest= null;
					if (this.isEvent==0){
						idTest= 'Room-' + this.charge.room_id + ' (' + this.date.value+ ')';
						tittleTest='Room- '+ this.charge.room_no + ' (' + this.date.value+ ')';
					}else{
						idTest= 'Event-' + this.charge.reservation_id + ' (' + this.charge.reservation_number+ ')';
						tittleTest='Event- '+ this.charge.reservation_id + ' (' + this.charge.reservation_number+ ')';
					}
					var config = {
						id: idTest,
						title:tittleTest,
						tabPosition: 'bottom',
						activeTab: 0,
						closable: true,
						autoDestroy: true,
						enableTabScroll: true,
						items: [
						            new ChargeGeneralPanel({charge: this.charge, date: this.date, event: this.isEvent}),
						            new ChargeAgencyPanel({charge: this.charge, date: this.date, event: this.isEvent}),
						            new ChargeGuestPanel({charge: this.charge, date: this.date, event: this.isEvent})
							   ]
					    };
					
			        Ext.apply(this, Ext.apply(this.initialConfig, config));
			        
			        ChargeTabPanel.superclass.initComponent.apply(this, arguments);
			    }				
			});
			
			
			var ChargeManager = Ext.extend(Ext.Panel, 
			{
			    initComponent: function()
			    {
			        Ext.apply(this, 
			        {
			        	title: '',
			            layout: 'border',
			            border: false,
			            frame: false,
			            items: [{
			            	
			                region:'west',
			                collapsible: true,
							collapsed:false,
							title: 'Rooms',
							collapseMode: 'mini',
			                //xtype: 'container',
			                margins: '5 0 5 5',
			                border: false,
			                split: true,
			                //collapsible: false,
			                width: 200,
			                collapsible: true,   // make collapsible
			                layout: 'fit',
			                items: [new ChargeList()]
			            },{
			            	 title: 'Center Region',
			                 region: 'center',     // center region is required, no width/height specified
			                 xtype: 'container',
			                 layout: 'fit',
			                 margins: '5 5 5 5',
			                 items:[{
			                	 xtype: 'tabpanel',
			                	 id: 'chargetabs',
			                	 frame: false,
			                	 closable: true
			                 }]	
			            },{
			            	title: 'Manage Charges',
							collapsible: true,
							collapsed:false,
							collapseMode: 'mini',
							region:'north',
							margins: '0 0 0 0',
							//width: '100%',
							height:80,
							items: [filterForm]
						},{
			            	title: 'Events',
							collapsible: true,
							collapsed:false,
							collapseMode: 'mini',
							region:'east',
							layout: 'fit',
							margins: '0 0 0 0',
							//width: '100%',
							width: 200,
							items: [new EventList()]
						}]
			        });
			        ChargeManager.superclass.initComponent.apply(this, arguments);
			    }
			});
			
			var content = Ext.getCmp('content-panel');
			content.removeAll(true);
			content.add(new ChargeManager({bodyCssClass: 'x-citewrite-border-ct'}));
			content.doLayout();
		}); //end managers on click
	}//end if	
	
});