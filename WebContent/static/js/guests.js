Ext.onReady(function(){

	var pageLimit = 50;
	var adminGuests = Ext.get('nav-contacts'); 
	if(adminGuests != null)
	{
		adminGuests.on('click',function(){
			
		    // create the Data Store
			var store = new Ext.data.JsonStore({
				root: 'guests',
				url: _contextPath + '/guests/list',
				totalProperty: 'count',
				fields: [ 'guest_id','name', 'dni', 'title', 'address', 'zip', 'country', 'phone','email', 'mobile', 'fax', 'notes','market', 'creation_date', 'type'],
				remoteSort: true,
				sortInfo: {
						field: 'guest_id',
						direction: 'ASC'
					}

			});
			
			var countryStore = new Ext.data.JsonStore({
				root: 'country',
				url: _contextPath + '/guests/countryList',
				totalProperty: 'count',
				fields: [ 'country_id','country_code', 'country_name'],
				remoteSort: true,
				autoLoad: true,
				sortInfo: {
						field: 'country_id',
						direction: 'ASC'
					}

			});
			
			guestCountryCombo = new Ext.form.ComboBox({
				id: 'guest_country',
		    	hiddenName: 'guest_country',
		    	fieldLabel: 'Country',
		    	anchor:'95%',
                tabIndex: 4, 
		    	submitValue: true,
	            lazyRender: false,
	            store: countryStore,
				displayField:'country_name',
				valueField: 'country_id',
				triggerAction: 'all',
				allowBlank: false,
	            forceSelection: true
			});
			
			var printStore = new Ext.data.JsonStore({
			    	root: 'printLayout',
					url: _contextPath + '/administration/printList',
					totalProperty: 'count',
					fields: ['name', 'groupId', 'isDefault'],
					autoLoad: true,
					listeners: {
						'load' :  function(store,records,options) {
							var defaultData = {
									name: 'Default Format',
									groupId: 0,
									isDefault:false
								};
								var r = new this.recordType(defaultData, Ext.id()); // create new record
								this.add(r);
				        }
				    }
					
			    });
			
			var toolbar = {
	            pageSize: pageLimit,
	            store: store,
	            displayInfo: true,
	            displayMsg: 'Displaying guests {0} - {1} of {2}',
	            emptyMsg: "No guests to display"
	        };
		    
			
			if(hasPermission(PL_GUEST_MANAGE)){
				toolbar.items = ['-', {
	                text: 'Add Guest',
	                cls: 'x-btn-text details',
	                handler: function(btn, event){ addGuest(); }
	                }]; 
			}
		    
		    var columnModel = new Ext.grid.ColumnModel({
		        defaults: { sortable: true }
		        ,columns:[{
		            header: "ID",
		            dataIndex: 'guest_id',
		            width: 50
		        },{
		            header: "Name",
		            dataIndex: 'name',
		            width: 200
		        },{
		            header: "Address",
		            dataIndex: 'address',
		            width: 150
		        },{
		            header: "Market",
		            dataIndex: 'market',
		            width: 100,
		            renderer: function(value){ if(value == 1){ return 'Local'; }else if(value == 2){ return 'Israeli';}else{ return 'International';}}
		        },{
		            header: "Type",
		            dataIndex: 'type',
		            width: 100,
		            renderer: function(value){ if(value == 1){ return 'Guest'; }else if(value == 2){ return 'Group';}else{ return 'Other';}}
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
		    var _guestContextMenu = new Ext.menu.Menu({
		      id: 'GuestGridContextMenu',
		      items: [
				  { text: 'Edit', handler: editGuest },
				  { text: 'Delete', handler: deleteGuest }
		      ]
		   }); 
		    
		    if(hasPermission(PL_GUEST_MANAGE)){
			    grid.addListener('rowcontextmenu', onGuestGridContextMenu);
			    grid.addListener('rowdblclick', function(grid, index, event )
				    	{
		    		var record = grid.getStore().getAt(index);
		    		
		    		_guestContextMenu.rowRecord = record;
		    		
		    		editGuest();
		    	});
		    }
		    
		    function onGuestGridContextMenu(grid, rowIndex, e) {
				e.stopEvent();
				var coords = e.getXY();
				_guestContextMenu.rowRecord = grid.store.getAt(rowIndex);
				grid.selModel.selectRow(rowIndex);
				_selectedRow=rowIndex;
				_guestContextMenu.showAt([coords[0], coords[1]]);
			  }
			  
		    
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
		                            items: [
		                                    {   
		                                   
		     					    	   xtype: 'combo',
		     					    	   id: 'filter_market',
		     					    	   typeAhead: true,
		     							   triggerAction: 'all',
		     							   lazyRender:true,
		     							   mode: 'local',
		     							   autoload: true,
		     							   hiddenName: 'filter_market',
		     							   store: new Ext.data.ArrayStore({
		     							       id: 0,
		     							       fields: [
		     							           'MarketValue',
		     							           'MarketDisplay'
		     							        ],
		     							        data: [[1, 'Local'],[2, 'Israeli'],[3, 'International']]
		     							   }),
		     							   valueField: 'MarketValue',
		     							   displayField: 'MarketDisplay',
		     							   fieldLabel: 'Market',
		     						       anchor:'95%',
		     				               tabIndex: 12,
		     				               allowBlank: false,
		     				               forceSelection: true
		                                }
		                            ] // close items for first column
		                        },{   // column #1
		                            columnWidth: .30,
		                            layout: 'form',
		                            items: [
		                                {   xtype: 'radiogroup',
		    					            fieldLabel: 'Type',
		    					            id: 'filter_type',
		    					            itemCls: 'x-check-group-alt',
		    					            columns: 3,
		    					            items: [
		    					                {boxLabel: 'Guest', name: 'rb', inputValue: 1},
		    					                {boxLabel: 'Group', name: 'rb', inputValue: 2},
		    					                {boxLabel: 'All', name: 'rb', inputValue: 3}
		    					            ],
								            listeners: {
								            	change: function(field, newValue, oldValue, eOpts){
								            		Ext.getCmp("selected_grupbox_guest").setValue(newValue.inputValue);
								            		//console.log('change:' + field.fieldLabel + ' ' + newValue.rb);
								                }
								            }
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
		                    },{
		                    	xtype: 'hidden',
		    					id: 'selected_grupbox_guest',
		    					name: 'selected_grupbox_guest',
		    					value: 0
		                    }],
					
			});
			  
		    
			  var content = Ext.getCmp('content-panel');
				content.removeAll(true);
				
				content.add({
						xtype: 'panel',
						id: 'guest-content-panel',
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
						    region:'center',
						    margins: '0 0 0 0',
							items: [grid]
						},
						{
							title: 'Guests',
							collapsible: true,
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
			  
				
				var guestActive = Ext.getCmp('guest_active');
				var guestTittleCombo = Ext.getCmp('guestTittleCombo');
				var guestFormPanel  = Ext.getCmp('guestFormPanel');
				var guestDialog = Ext.getCmp('guestWindow');
				var guestMarketCombo = Ext.getCmp('guestMarketCombo');
				
				guestTittleCombo = new Ext.form.ComboBox({
				    typeAhead: true,
				    triggerAction: 'all',
				    lazyRender:true,
				    mode: 'local',
				    id: 'guest_title',
				    hiddenName: 'guest_title',
				    autoload: true,
				    store: new Ext.data.ArrayStore({
				        id: 0,
				        fields: [
				            'TittleValue',
				            'TittleDisplay'
				        ],
				        data: [[1, 'Mr'],[2, 'Mrs'],[3, 'Miss'],[4, 'Ms'],[5, 'Master'],[6, 'Family'],[7, 'Other']]
				    }),
				    valueField: 'TittleValue',
				    displayField: 'TittleDisplay',
				    fieldLabel: 'Tittle',
			    	anchor:'95%',
	                tabIndex: 1,
	                allowBlank: false,
	                forceSelection: true
				});
				
				guestTypeCombo = new Ext.form.ComboBox({
				    typeAhead: true,
				    triggerAction: 'all',
				    lazyRender:true,
				    mode: 'local',
				    id: 'guest_type',
				    hiddenName: 'guest_type',
				    autoload: true,
				    store: new Ext.data.ArrayStore({
				        id: 0,
				        fields: [
				            'TypeValue',
				            'TypeDisplay'
				        ],
				        data: [[1, 'Guest'],[2, 'Group'],[3, 'Other']]
				    }),
				    valueField: 'TypeValue',
				    displayField: 'TypeDisplay',
				    fieldLabel: 'Type',
			    	anchor:'95%',
	                tabIndex: 1,
	                allowBlank: false,
	                forceSelection: true
				});
									
				guestMarketCombo = new Ext.form.ComboBox({
				    typeAhead: true,
				    triggerAction: 'all',
				    lazyRender:true,
				    mode: 'local',
				    id: 'guest_market',
				    autoload: true,
				    hiddenName: 'guest_market',
				    store: new Ext.data.ArrayStore({
				        id: 0,
				        fields: [
				            'MarketValue',
				            'MArketDisplay'
				        ],
				        data: [[1, 'Local'],[2, 'Israeli'],[3, 'International']]
				    }),
				    valueField: 'MarketValue',
				    displayField: 'MArketDisplay',
				    fieldLabel: 'Market',
			    	anchor:'95%',
	                tabIndex: 12,
	                allowBlank: false,
	                forceSelection: true
				});

				
				
				if(!guestDialog)
				{
					
				//guest form
				guestFormPanel = new Ext.FormPanel({
					bodyBorder: false,
					border: false,
					frame: false,
					labelAlign: 'top',
					buttonAlign:'center',
					bodyStyle: 'padding: 10px; ',
					autoWidth: true,
					defaults: { width: '95%' },
					bodyCssClass: 'x-citewrite-panel-body',
					id: 'guestFormPanel',
					items:[
					       {
					            layout:'column',
					            border: false,
					            bodyCssClass: 'x-citewrite-panel-body',
					            items:[
					            {
					                columnWidth:.5,
					                defaultType:'textfield',
					                layout: 'form',
					                border: false,
					                bodyBorder: false,
					                bodyCssClass: 'x-citewrite-panel-body',
					                items: [guestTittleCombo,{
								    	   	id: 'guest_name',
								    	   	fieldLabel: 'Name',
						                    anchor:'95%',
						                    allowBlank: false,
							                tabIndex: 2 
								       },
								       {
								    	   id: 'guest_dni',
								    	   fieldLabel: 'DNI',
								    	   anchor:'95%',
						                   tabIndex: 3 

								       }, 	
								    	   guestCountryCombo
								       , {
								    	   id: 'guest_address',
								    	   fieldLabel: 'Address',
								    	   anchor:'95%',
						                   tabIndex: 5 

								       }/*,{
								    	   id: 'guest_zip',
								    	   fieldLabel: 'Zip',
								    	   anchor:'95%',
								    	   maskRe: /^[0-9-]*$/,
						                   tabIndex: 6

								       }*/
								       ]
					            },{
					                columnWidth:.5,
					                layout: 'form',
					                defaultType:'textfield',
					                border: false,
					                bodyBorder: false,
					                bodyCssClass: 'x-citewrite-panel-body',
					                items: [
								       {
								    	   id: 'guest_phone',
								    	   allowBlank: false,
								    	   fieldLabel: 'Phone',
								    	   maskRe: /^[0-9]*$/,
								    	   anchor:'95%',
						                   tabIndex: 7 
								       }/*,
								       {
								    	   id: 'guest_mobile',
								    	   fieldLabel: 'Mobile Phone',
								    	   maskRe: /^[0-9]*$/,
								    	   anchor:'95%',
						                   tabIndex: 8 
								       }*/,{ 
								    	   id: 'guest_email',
								    	   fieldLabel: 'Email',
								    	   regex: /^([\w\-\'\-]+)(\.[\w-\'\-]+)*@([\w\-]+\.){1,5}([A-Za-z]){2,4}$/,
								    	   regexText:'This field should be an e-mail address in the format "user@example.com"',
								    	   anchor:'95%',
								    	   allowBlank: false,
						                   tabIndex: 9 
								       }/*,{ 
								    	   id: 'guest_fax',
								    	   fieldLabel: 'Fax',
								    	   maskRe: /^[0-9]*$/,
								    	   anchor:'95%',
						                   tabIndex: 10 
								       }*/, 
								       guestMarketCombo,
								       guestTypeCombo
								        	]
					            }]
					        },{
					        		id: 'guest_notes',
					        		fieldLabel: 'Notes',
				                    anchor:'97%',
					                tabIndex: 13,
					                xtype: 'textarea',		
									name: 'guest_notes'
							},
					       {
								   id: 'guest_id',
								   xtype: 'hidden',
								   value: '0'
							}]
				});
			  
				//guest dialog
					guestDialog = new Ext.Window({
		                renderTo: document.body,
		                layout:'fit',
		                width:540,
		                height:530,
		                closeAction:'hide',
		                plain: true,
		                resizable: false,
		                modal: true,
		                id: 'guestWindow',
		                items: guestFormPanel,
	
		                buttons: [{
		                    text:'Save',
		                    handler: function()
		                    {
		                    	var guest_id = Ext.getCmp('guest_id').getValue();
		                    	var guest_name = Ext.getCmp('guest_name').getValue();
		                    	var guest_dni = Ext.getCmp('guest_dni').getValue();
		                    	var guest_address = Ext.getCmp('guest_address').getValue();
		                    	//var guest_zip = Ext.getCmp('guest_zip').getValue();
		                    	var guest_country = guestCountryCombo.getValue();
		                    	var guest_phone = Ext.getCmp('guest_phone').getValue();
		                    	var guest_email = Ext.getCmp('guest_email').getValue();
		                    	//var guest_mobile = Ext.getCmp('guest_mobile').getValue();
		                    	//var guest_fax = Ext.getCmp('guest_fax').getValue();
		                    	var guest_notes = Ext.getCmp('guest_notes').getValue();
		                    	var guest_title = guestTittleCombo.getValue();
		                    	var guest_market = guestMarketCombo.getValue();
		                    	var guest_type = guestTypeCombo.getValue();
		                     	
		                    	/*if(guest_name.length == 0 || guest_market.length == 0 || guest_email.length == 0)
	                    		{
		                    		Ext.Msg.show({
			            				   title:'Missing Field',
			            				   msg: 'Name, Market and Email are required.',
			            				   buttons: Ext.Msg.OK,
			            				   icon: Ext.MessageBox.ERROR
			            				});
		                    		
		                    		return false;
	                    		}
		                    	
		                    	if(guest_phone.length == 0 && guest_mobile.length == 0)
	                    		{
		                    		Ext.Msg.show({
			            				   title:'Missing Field',
			            				   msg: 'You need to provide at least one phone number.',
			            				   buttons: Ext.Msg.OK,
			            				   icon: Ext.MessageBox.ERROR
			            				});
		                    		
		                    		return false;
	                    		}
		                    	
		                    	if(guest_type.length == 0)
	                    		{
		                    		Ext.Msg.show({
			            				   title:'Missing Field',
			            				   msg: 'Type are required',
			            				   buttons: Ext.Msg.OK,
			            				   icon: Ext.MessageBox.ERROR
			            				});
		                    		
		                    		return false;
	                    		}*/
		                    	
		                    	
		                    	//validate form
		                    	guestFormPanel.getForm().submit({
		                    	    url: _contextPath + '/guests/save',
		                    	    params: {
		                    	        xaction: 'save'
		                    	    },
		                    	    success: function(form, action) {
		                    	    	guestDialog.hide();
		                    	       store.reload();
		                    	       Ext.growl.message('Success', 'Guest has been saved.');
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
		                    	guestDialog.hide();
		                    }
		                }]
		            });
				}else{
					//countryStore.getStore().reload();
				}
				
				 function editGuest()
				 {
						var guest = _guestContextMenu.rowRecord.data;
						  
						Ext.getCmp('guest_id').setValue(guest.guest_id);
						Ext.getCmp('guest_name').setValue(guest.name);
						Ext.getCmp('guest_dni').setValue(guest.dni);
						Ext.getCmp('guest_address').setValue(guest.address);
						//Ext.getCmp('guest_zip').setValue(guest.zip);
						//Ext.getCmp('guest_country').setValue(guest.country);
						Ext.getCmp('guest_phone').setValue(guest.phone);
						Ext.getCmp('guest_email').setValue(guest.email);
						//Ext.getCmp('guest_mobile').setValue(guest.mobile);
						//Ext.getCmp('guest_fax').setValue(guest.fax);
						Ext.getCmp('guest_notes').setValue(guest.notes);
						guestTittleCombo.setValue(guest.title);
						guestTypeCombo.setValue(guest.type);
						guestMarketCombo.setValue(guest.market);
						guestCountryCombo.setValue(guest.country);
						guestDialog.setTitle('Edit Guest');
						guestDialog.show();
						guestDialog.center();
				  }
				  
				  function deleteGuest()
				  {
					  var guest = _guestContextMenu.rowRecord.data;
					  
					  Ext.Msg.confirm("Delete?", "Remove guest '"+guest.name+"'?", function(bid, p2){
						  if(bid == "yes")
						  {
							  Ext.Ajax.request({
								   url: _contextPath + '/guests/delete',
								   success: function(p1, p2)
								   {
									   var response = Ext.decode(p1.responseText);
									   if(response.success)
									   {
										   store.reload();
										   Ext.growl.message('Success', 'Guest has been deleted.');
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
			            				   msg: 'Error deleting guest.',
			            				   buttons: Ext.Msg.OK,
			            				   icon: Ext.MessageBox.ERROR
			            				});
								   },
								   params: { xaction: 'delete', guest_id: guest.guest_id }
								}); 
						  }
					  });
				  }
				  
				  function addGuest()
				  {
					  guestDialog.setTitle('New Guest');
					  guestFormPanel.getForm().reset();
					  guestTittleCombo.setValue(1);
					  guestMarketCombo.setValue(1);
					  guestCountryCombo.setValue(1);
					  guestTypeCombo.setValue(1);
					  guestDialog.show();
				  }

		});//end function
	}//end if
	  
});
