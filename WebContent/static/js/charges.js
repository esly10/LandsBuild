Ext.onReady(function(){

	var pageLimit = 50;
	/*datePicker = Ext.form.DateField({
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
		name: 'filter_date'
	});*/
	//var now = Date.now();
	//datePicker.setValue(new Date());
	
	
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
		                 /*'ROOM_ID',
				            'room_no',
				            'ROOM_TYPE',
				            'STATUS',
				            'LOCATION_X',
				            'LOCATION_Y'*/		   
		            'room_no',
		            'room_id',
		            'room_type',
		            'rr_id',
		            'rr_reservation_id'
		        ],
				sortInfo: {
					field: 'room_no',
					direction: 'ASC'
				},
				baseParams: {IS_DELETE: 0 },
				autoLoad: {params:{start:0, limit: this.pageLimit}}
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
					            		 if(chargeStore.data.rr_id != "") {
						            	        meta.style = "background-color:#33cc33; height:24px; color: #FFFFFF; font-size: 12px; font-weight: bold; width: 20px;";
						            	       
						            	    }
					            		 return	 chargeStore.data.room_no;
					            	}
			                  },
				            {header: 'Room Status', sortable: false, dataIndex: 'room_no', width: 110, 
				            	renderer : function(value, meta, chargeStore) {
				            		meta.style = "background-color:#E1E1E1; height:24px; width: 110px;";
				            		if(chargeStore.data.rr_id != "") {
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
				    		chargePanel = new ChargeTabPanel({charge: record.data, date: Ext.getCmp('filter_date')   });
							tabs.add(chargePanel);
							tabs.setActiveTab(chargePanel.id);
			    		}
			    		
			    	}
			    },tbar: {
			    	xtype: 'toolbar',
			    	items: ['Date: ', 
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
			    	        ]
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
					defaultType:'textfield',
					labelAlign: 'top',
					buttonAlign:'center',
					bodyStyle: 'padding: 10px; ',
					autoWidth: true,
					bodyCssClass: 'x-citewrite-panel-body',
					items:[
					       {
							   xtype: 'datefield',
							   id: 'reservation_check_in',
							   name: 'reservation_check_in',
							   fieldLabel: 'Check In',
							   format: 'd/m/Y',
							   submitFormat: 'Y-m-d H:i:s',
							   submitValue : true,
							   altFormats: 'Y-m-d',
							   anchor: "99.2%",	
							   allowBlank: false,
							   //value: now,
							   listeners:{
							   	change : function(val){
							   	var now = val.getValue();
							   	var days = Ext.getCmp("reservation_nights").getValue();
							   	if(days != ""){
							   	now.setDate(now.getDate() + parseInt(days));
							    Ext.getCmp("reservation_check_out").setValue(now.toISOString().substring(0, 10));
							   		}
							   	   	
							   		}
							   }
							//value: Ext.util.Format.date(data.date, 'Y-m-d')
							}
					       ],
			       buttons: [{
			            text: 'Apply',
			            width: 60,
			            handler: function(){
			               var params = filterForm.getForm().getFieldValues();
			               store.baseParams = params;
			              store.load({params: {start: 0, limit: pageLimit}});
			            }
			        },{
			            text: 'Reset',
			            width: 60,
			            handler: function(){
			            	filterForm.getForm().reset();					
			            	store.baseParams = {};
			            	store.load({params: {start: 0, limit: pageLimit}});
			            }
			        }]
			});
			 
			 
			ChargeTabPanel = Ext.extend(Ext.TabPanel, {
				charge: null,
				date: null,
				bodyCssClass: 'x-citewrite-panel-body',
				initComponent: function()
			    {
					var config = {
							id: 'Room-' + this.charge.room_id + ' (' + this.date.value+ ')',
							title:'Room- '+ this.charge.room_no + ' (' + this.date.value+ ')',
							tabPosition: 'bottom',
							activeTab: 0,
							closable: true,
							autoDestroy: true,
							enableTabScroll: true,
						    items: [
						            new ChargeGeneralPanel({charge: this.charge, date: this.date})						           
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
			        	title: 'Manage Charges',
			            layout: 'border',
			            border: false,
			            frame: false,
			            items: [{
							title: false,
			                region:'west',
			                xtype: 'container',
			                margins: '5 0 5 5',
			                border: false,
			                split: true,
			                collapsible: false,
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
			                 },filterForm]	
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