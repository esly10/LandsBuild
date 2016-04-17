Ext.onReady(function(){

	var pageLimit = 50;
	var adminServices = Ext.get('nav-services'); 
	if(adminServices != null)
	{
		adminServices.on('click',function(){
			
		    // create the Data Store
			var store = new Ext.data.JsonStore({
				root: 'services',
				url: _contextPath + '/service/list',
				totalProperty: 'count',
				fields: [ 'service_id','service_type', 'service_description', 'service_status', 'service_rate_base', 'service_bill_assigned','service_name'],
				remoteSort: true,
				sortInfo: {
						field: 'service_id',
						direction: 'ASC'
					}

			});
			
			
			var toolbar = {
	            pageSize: pageLimit,
	            store: store,
	            displayInfo: true,
	            displayMsg: 'Displaying services {0} - {1} of {2}',
	            emptyMsg: "No services to display"
	        };
		    
			
			if(hasPermission(PL_SERVICE_MANAGE)){
				toolbar.items = ['-', {
	                text: 'Add Service',
	                cls: 'x-btn-text details',
	                handler: function(btn, event){ addService(); }
	                }]; 
			}
		    
		    var columnModel = new Ext.grid.ColumnModel({
		        defaults: { sortable: true }
		        ,columns:[{
		            header: "Code",
		            dataIndex: 'service_id',
		            width: 40
		        },{
		            header: "Name",
		            dataIndex: 'service_name',
		            width: 180
		        },{
		            header: "Type",
		            dataIndex: 'service_type',
		            width: 80,
		            renderer: function(value){ if(value == 1){ return 'Room'; }else if(value == 2){ return 'Outdoor';}else if(value == 3){ return 'Indoor';}else if(value == 4){ return 'Meal';}else{ return 'Other';}}
		        },{
		            header: "Regular Rate",
		            dataIndex: 'service_rate_base',
		            width: 100,
		            renderer: Ext.util.Format.usMoney
		        },{
		            header: "Bill Company",
		            dataIndex: 'service_bill_assigned',
		            width: 120,
		            renderer: function(value){ if(value == 1){ return 'Lands in Love'; }else{ return 'Canopy San Lorenzo';}}
		        }]
		    });
		    
		    var grid = new Ext.grid.GridPanel({
		        layout: 'fit',
		        store: store,
		        trackMouseOver:false,
		        disableSelection:false,
		        frame: false,
		        border: false,
		
		        // grid columns
		        colModel: columnModel,
		
		        // customize view config
		        viewConfig: { forceFit:true },
		
		        // paging bar on the bottom
		        bbar: new Ext.PagingToolbar(toolbar)
		    });
		    
		    store.load({params:{start:0, limit:pageLimit}});
		    		
		    var _selectedRow = null;
		    var _serviceContextMenu = new Ext.menu.Menu({
		      id: 'ServiceGridContextMenu',
		      items: [
				  { text: 'Edit', handler: editService },
				  { text: 'Delete', handler: deleteService }
		      ]
		   }); 
		    
		    if(hasPermission(PL_SERVICE_MANAGE)){
			    grid.addListener('rowcontextmenu', onServiceGridContextMenu);
			    grid.addListener('rowdblclick', function(grid, index, event )
				    	{
		    		var record = grid.getStore().getAt(index);
		    		
		    		_serviceContextMenu.rowRecord = record;
		    		
		    		editService();
		    	});
		    }
		    
		    function onServiceGridContextMenu(grid, rowIndex, e) {
				e.stopEvent();
				var coords = e.getXY();
				_serviceContextMenu.rowRecord = grid.store.getAt(rowIndex);
				grid.selModel.selectRow(rowIndex);
				_selectedRow=rowIndex;
				_serviceContextMenu.showAt([coords[0], coords[1]]);
			  }
			  
			var serviceActive = Ext.getCmp('service_active');
			var serviceTypeCombo = Ext.getCmp('serviceTypeCombo');
			var serviceFormPanel  = Ext.getCmp('serviceFormPanel');
			var serviceDialog = Ext.getCmp('serviceWindow');
			var serviceStatusCombo = Ext.getCmp('serviceStatusCombo');
			var serviceBillCombo = Ext.getCmp('serviceBillCombo');

			serviceTypeCombo = new Ext.form.ComboBox({
			    typeAhead: true,
			    triggerAction: 'all',
			    lazyRender:true,
			    mode: 'local',
			    id: 'service_type',
			    hiddenName: 'service_type',
			    autoload: true,
			    store: new Ext.data.ArrayStore({
			        id: 0,
			        fields: [
			            'TypeValue',
			            'TypeDisplay'
			        ],
			        data: [[1, 'Room'],[2, 'Outdoor'],[3, 'Indoor'],[4, 'Meal'],[0,'Other']]   
			    }),
			    valueField: 'TypeValue',
			    displayField: 'TypeDisplay',
			    fieldLabel: 'Type',
		    	anchor:'95%',
                tabIndex: 3,
                allowBlank: false,
                forceSelection: true
			});
			
						
			serviceBillCombo = new Ext.form.ComboBox({
			    typeAhead: true,
			    triggerAction: 'all',
			    lazyRender:true,
			    mode: 'local',
			    id: 'service_bill_assigned',
			    hiddenName: 'service_bill_assigned',
			    autoload: true,
			    store: new Ext.data.ArrayStore({
			        id: 0,
			        fields: [
			            'CompanyValue',
			            'CompanyDisplay'
			        ],
			        data: [[1, 'Lands in love'],[2, 'Canopy San Lorenzo']]   
			    }),
			    valueField: 'CompanyValue',
			    displayField: 'CompanyDisplay',
			    fieldLabel: 'Company Bill',
		    	anchor:'95%',
                tabIndex: 6,
                allowBlank: true,
                forceSelection: true
			});
			
								
			serviceStatusCombo = new Ext.form.ComboBox({
			    typeAhead: true,
			    triggerAction: 'all',
			    lazyRender:true,
			    mode: 'local',
			    id: 'service_status',
			    autoload: true,
			    hiddenName: 'service_status',
			    store: new Ext.data.ArrayStore({
			        id: 1,
			        fields: [
			            'StatusValue',
			            'StatusDisplay'
			        ],
			        data: [[1, 'Enable'],[2, 'Disabled'],[3, 'programmed'],[4, 'Suspended'],[0,'Other']]        
			    }),
			    valueField: 'StatusValue',
			    displayField: 'StatusDisplay',
			    fieldLabel: 'Status',
		    	anchor:'95%',
                tabIndex: 4,
                allowBlank: true,
                forceSelection: true
			});
		    
			
			
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
		                            columnWidth: .30,
		                            layout: 'form',
		                            items: [
		                                {   xtype: 'textfield', 
		                                	 id: 'filter_name',
		      					    	   anchor:'95%',
		      					    	   fieldLabel: 'Name'
		                                }
		                            ] // close items for first column
		                        },{   // column #1
		                            columnWidth: .30,
		                            layout: 'form',
		                            items: [{
		 					    	   xtype: 'combo',
							    	   hiddenName: 'filter_bill_assigned',
							    	   fieldLabel: 'Bill',
							    	   anchor:'95%',
							    	   submitValue: true,
							    	   typeAhead: true,
							    	   triggerAction: 'all',
							    	   lazyRender:true,
							    	   mode: 'local',
							    	   id: 'filter_bill_assigned',
							    	   autoload: true,
							    	   store: new Ext.data.ArrayStore({
									        id: 0,
									        fields: [
									            'CompanyValue',
									            'CompanyDisplay'
									        ],
									        data: [[1, 'Lands in love'],[2, 'Canopy San Lorenzo']]   
									    }),
									    valueField: 'CompanyValue',
										displayField: 'CompanyDisplay',
								    	anchor:'95%',
						            	tabIndex: 6,
						            	allowBlank: true,
						                forceSelection: false
							       }
		                                    
		                            ] // close items for first column
		                        },{   // column #1
		                            columnWidth: .30,
		                            layout: 'form',
		                            items: [
		                                {   id: 'filter_type',
		     					    	   xtype: 'combo',
		    					    	   hiddenName: 'filter_type',
		    					    	   anchor:'95%',
		    					    	   submitValue: true,
		    					    	   typeAhead: true,
		    					    	   triggerAction: 'all',
		    					    	   lazyRender:true,
		    					    	   mode: 'local',
		    					    	   store: new Ext.data.ArrayStore({
		    							        id: 0,
		    							        fields: [
		    							            'TypeValue',
		    							            'TypeDisplay'
		    							        ],
		    							        data: [[1, 'Room'],[2, 'Outdoor'],[3, 'Indoor'],[4, 'Meal']]   
		    							    }),
		    							    valueField: 'TypeValue',
		    							    displayField: 'TypeDisplay',
		    							    fieldLabel: 'Type',
		    						    	anchor:'95%',
		    				            	tabIndex: 6,
		    				            	allowBlank: true,
		    				                forceSelection: false
		                                }
		                            ] // close items for first column
		                        },{   // column #1
		                            columnWidth: .05,
		                            layout: 'form',
		                            items: [
		                                {  	  	xtype: 'button',
		                                		text: 'Apply',
		                			            width: 60,
		                			            handler: function(){
		                			               var params = filterForm.getForm().getFieldValues();
		                			               store.baseParams = params;
		                			               store.load({params: {start: 0, limit: pageLimit}});
		                			            }
		                			        }
		                            ] // close items for first column
		                        },{   // column #1
		                            columnWidth: .05,
		                            layout: 'form',
		                            items: [
		                                {
		                			        	xtype: 'button',
		                			            text: 'Reset',
		                			            width: 60,
		                			            //height:30,
		                			            handler: function(){
		                			            	filterForm.getForm().reset();					
		                			            	store.baseParams = {};
		                			            	store.load({params: {start: 0, limit: pageLimit}});
		                			            }
		                			      }
		                            ] // close items for first column
		                        }],
		                    }],
					
			});
			  var content = Ext.getCmp('content-panel');
				content.removeAll(true);
				
				content.add({
						xtype: 'panel',
						id: 'service-content-panel',
						layout:'border',
						bodyCssClass: 'x-citewrite-border-ct',
						border: false,
						defaults: {
						    collapsible: true,
						    split: true,
						    layout: 'fit'
						},

						items: [{
							collapsible: true,
							title: '',
						    region:'center',
						    margins: '0 0 0 0',
							items: [grid]
						},
						{
							collapsible: true,
							title: 'Services',
							collapsed:false,
							collapseMode: 'mini',
							region:'north',
							margins: '0 0 0 0',
							//width: '100%',
							 height:80,
							items: [filterForm]
						}]
					});
				//content.add(grid);
				content.doLayout();
				if(!serviceDialog)
				{
					
				//service form
				serviceFormPanel = new Ext.FormPanel({
					bodyBorder: false,
					border: false,
					frame: false,
					defaultType:'textfield',
					labelAlign: 'top',
					buttonAlign:'center',
					bodyStyle: 'padding: 10px; ',
					autoWidth: true,
					defaults: { width: '95%' },
					bodyCssClass: 'x-citewrite-panel-body',
					id: 'serviceFormPanel',
					items:[
					       {
					    		id: 'service_name',
					    	   	fieldLabel: 'Name',
			                    anchor:'95%',
			                    allowBlank: false,
				                tabIndex: 1 
					       },{
					    		id: 'service_description',
					    	   	fieldLabel: 'Description',
			                    anchor:'95%',
			                    allowBlank: true,
				                tabIndex: 2 
					       },
					       serviceTypeCombo,
					       serviceStatusCombo,
					       {
					    		id: 'service_rate_base',
					    	   	fieldLabel: 'Rate base',
			                    anchor:'95%',
			                    allowBlank: false,
			                    maskRe: /[PE0-9.]/,
				                tabIndex: 5 
					       },
					       serviceBillCombo,
					       {
							   id: 'service_id',
							   xtype: 'hidden',
							   value: '0'
					       }
					       ]
				});
			  
				//service dialog
					serviceDialog = new Ext.Window({
		                renderTo: document.body,
		                //layout:'fit',
		                width:400,
		                height:'450px',
		                closeAction:'hide',
		                plain: true,
		                resizable: false,
		                modal: true,
		                id: 'serviceWindow',
		                items: serviceFormPanel,
	
		                buttons: [{
		                    text:'Save',
		                    handler: function()
		                    {
		                    	var service_id = Ext.getCmp('service_id').getValue();
		                    	var service_description = Ext.getCmp('service_description').getValue();
		                    	var service_rate_base = Ext.getCmp('service_rate_base').getValue();
		                    	var service_name = Ext.getCmp('service_name').getValue();
		                    	var service_type = serviceTypeCombo.getValue();
		                    	var service_status = serviceStatusCombo.getValue();
		                    	var service_bill_assigned = serviceBillCombo.getValue();
		                     	
		                    	if(service_name.length == 0 || service_rate_base.length == 0 || service_bill_assigned.length == 0)
	                    		{
		                    		Ext.Msg.show({
			            				   title:'Missing Field',
			            				   msg: 'All fields are required.',
			            				   buttons: Ext.Msg.OK,
			            				   icon: Ext.MessageBox.ERROR
			            				});
		                    		
		                    		return false;
	                    		}
		                   	
		                    	//validate form
		                    	serviceFormPanel.getForm().submit({
		                    	    url: _contextPath + '/service/save',
		                    	    params: {
		                    	        xaction: 'save'
		                    	    },
		                    	    success: function(form, action) {
		                    	    	serviceDialog.hide();
		                    	    	Ext.growl.message('Success', 'Service has been saved.');
		                    	    	remove: true;
		                    	    	store.reload();
		                    	    },
		                    	    failure: function(form, action) {
		                    	        switch (action.failureType) {
		                    	            case Ext.form.Action.CLIENT_INVALID:
												Ext.Msg.show({
												   title:'Failure',
												   msg:  'Form fields may not be submitted with invalid values',
												   buttons: Ext.Msg.OK,
												   icon: Ext.MessageBox.ERROR
												});
		                    	                break;
		                    	            case Ext.form.Action.CONNECT_FAILURE:
		                    	            	Ext.Msg.show({
												   title:'Failure',
												   msg:   'Ajax communication failed',
												   buttons: Ext.Msg.OK,
												   icon: Ext.MessageBox.ERROR
												});
		                    	                break;
		                    	            case Ext.form.Action.SERVER_INVALID:
												Ext.Msg.show({
												   title:'Failure',
												   msg: action.result.msg,
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
		                    	serviceDialog.hide();
		                    }
		                }]
		            });
				}else{
					//countryStore.getStore().reload();
				}
				
				 function editService()
				 {
						var service = _serviceContextMenu.rowRecord.data;
								
						Ext.getCmp('service_id').setValue(service.service_id);
						Ext.getCmp('service_description').setValue(service.service_description);
						Ext.getCmp('service_rate_base').setValue(service.service_rate_base);
						Ext.getCmp('service_name').setValue(service.service_name);
						serviceTypeCombo.setValue(service.service_type);
						serviceStatusCombo.setValue(service.service_status);
						serviceBillCombo.setValue(service.service_bill_assigned);
						serviceDialog.setTitle('Edit Service');
						serviceDialog.show();
						serviceDialog.center();
				  }
				  
				  function deleteService()
				  {
					  var service = _serviceContextMenu.rowRecord.data;
					  
					  Ext.Msg.confirm("Delete?", "Remove service '"+service.service_description+"'?", function(bid, p2){
						  if(bid == "yes")
						  {
							  Ext.Ajax.request({
								   url: _contextPath + '/service/delete',
								   success: function(p1, p2)
								   {
									   var response = Ext.decode(p1.responseText);
									   if(response.success)
									   {
										   store.reload();
										   Ext.growl.message('Success', 'Service has been deleted.');
									   }
									   else
									   {
										   Ext.Msg.show({
				            				   title:'Failure',
				            				   msg: response.msg,
				            				   buttons: Ext.Msg.OK,
				            				   icon: Ext.MessageBox.ERROR
				            				});
									   }
								   },
								   failure: function(){
									   Ext.Msg.show({
			            				   title:'Failure',
			            				   msg: 'Error deleting service.',
			            				   buttons: Ext.Msg.OK,
			            				   icon: Ext.MessageBox.ERROR
			            				});
								   },
								   params: { xaction: 'delete', service_id: service.service_id }
								}); 
						  }
					  });
				  }
				  
				  function addService()
				  {
					  serviceDialog.setTitle('New Service');
					  serviceFormPanel.getForm().reset();
					  serviceTypeCombo.setValue(1);
					  serviceStatusCombo.setValue(1);
					  serviceDialog.show();
					  serviceBillCombo.setValue(1);
				  }

		});//end function
	}//end if
	  
});
