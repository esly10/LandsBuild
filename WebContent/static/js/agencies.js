Ext.onReady(function(){

	var pageLimit = 50;
	adminAgencies = Ext.get('nav-agencies'); 
	if(adminAgencies != null)
	{
		adminAgencies.on('click',function(){
			
		    // create the Data Store
			var store = new Ext.data.JsonStore({
				root: 'agencies',
				url: _contextPath + '/agency/list',
				totalProperty: 'count',
				fields: [ 'agency_id','agency_name', 'agency_identification', 'agency_address', 'agency_zip', 'agency_country', 'agency_phone', 'agency_email','agency_fax', 'agency_type', 'agency_web_site', 'agency_notes'],
				remoteSort: true,
				sortInfo: {
						field: 'agency_id',
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
			
			agencyCountryCombo = new Ext.form.ComboBox({
				id: 'agency_country',
		    	hiddenName: 'agency_country',
		    	fieldLabel: 'Country',
		    	anchor:'95%',
                tabIndex: 3, 
		    	submitValue: true,
	            lazyRender: false,
	            store: countryStore,
				displayField:'country_name',
				valueField: 'country_id',
				triggerAction: 'all',
				allowBlank: false,
	            forceSelection: true
			});
			
			
			var toolbar = {
	            pageSize: pageLimit,
	            store: store,
	            displayInfo: true,
	            displayMsg: 'Displaying agencies {0} - {1} of {2}',
	            emptyMsg: "No agencies to display"
	        };
		    
			
			if(hasPermission(PL_AGENCY_MANAGE)){
				toolbar.items = ['-', {
	                text: 'Add Agency',
	                cls: 'x-btn-text details',
	                handler: function(btn, event){ addAgency(); }
	                }]; 
			}
		    
		    var columnModel = new Ext.grid.ColumnModel({
		        defaults: { sortable: true }
		        ,columns:[{
		            header: "ID",
		            dataIndex: 'agency_id',
		            width: 50
		        },{
		            header: "Name",
		            dataIndex: 'agency_name',
		            width: 200
		        },{
		            header: "Address",
		            dataIndex: 'agency_address',
		            width: 150
		        },{
		            header: "Type",
		            dataIndex: 'agency_type',
		            width: 100,
		            renderer: function(value){ if(value == 1){ return 'Agency Tour'; }else if(value == 2){ return 'Coorporation';}else{ return 'Independient';}}
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
		    var _agencyContextMenu = new Ext.menu.Menu({
		      id: 'AgencyGridContextMenu',
		      items: [
				  { text: 'Edit', handler: editAgency },
				  { text: 'Delete', handler: deleteAgency }
		      ]
		   }); 
		    
		    if(hasPermission(PL_AGENCY_MANAGE)){
			    grid.addListener('rowcontextmenu', onAgencyGridContextMenu);
			    grid.addListener('rowdblclick', function(grid, index, event )
				    	{
		    		var record = grid.getStore().getAt(index);
		    		
		    		_agencyContextMenu.rowRecord = record;
		    		
		    		editAgency();
		    	});
		    }
		    
		    function onAgencyGridContextMenu(grid, rowIndex, e) {
				e.stopEvent();
				var coords = e.getXY();
				_agencyContextMenu.rowRecord = grid.store.getAt(rowIndex);
				grid.selModel.selectRow(rowIndex);
				_selectedRow=rowIndex;
				_agencyContextMenu.showAt([coords[0], coords[1]]);
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
		                            columnWidth: .25,
		                            layout: 'form',
		                            items: [
		                                {   xtype: 'textfield', 
		                                	id: 'filter_name',
									    	fieldLabel: 'Name'
		                                }
		                            ] // close items for first column
		                        },{   // column #1
		                            columnWidth: .4,
		                            layout: 'form',
		                            items: [
		                                {  	xtype: 'radiogroup',
								            fieldLabel: 'Type',
								            id: 'filter_type',
								            itemCls: 'x-check-group-alt',
								            columns: 4,
								            items: [
								                {boxLabel: 'Agency Tour', name: 'rb', inputValue: 1},
								                {boxLabel: 'Corporation', name: 'rb', inputValue: 2},
								                {boxLabel: 'Independient', name: 'rb', inputValue: 3},
								                {boxLabel: 'All', name: 'rb', inputValue: 4}
								            ],
								            listeners: {
								            	change: function(field, newValue, oldValue, eOpts){
								            		Ext.getCmp("selected_grupbox_agencies").setValue(newValue.inputValue);
								            		//console.log('change:' + field.fieldLabel + ' ' + newValue.rb);
								                }
								            }
		                                }
		                            ] // close items for first column
		                        },{   // column #1
		                            columnWidth: .25,
		                            layout: 'form',
		                            items: [
		                                    {   
		                                   
		     					    	   xtype: 'combo',
		     					    	   id: 'filter_country',
		     					    	   hiddenName: 'filter_country',
		     					    	   fieldLabel: 'Country',
		     					    	   anchor:'95%',
		     				               tabIndex: 3, 
		     				               submitValue: true,
		     					           lazyRender: false,
		     					           store: countryStore,
		     					           displayField:'country_name',
		     					           valueField: 'country_id',
		     					           triggerAction: 'all',
		     					           forceSelection: true
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
		    					id: 'selected_grupbox_agencies',
		    					name: 'selected_grupbox_agencies',
		    					value: 0
		                    }],
			});
			  
			  var content = Ext.getCmp('content-panel');
				content.removeAll(true);
				
				content.add({
						xtype: 'panel',
						//title: 'Agencies',
						id: 'agency-content-panel',
						layout:'border',
						bodyCssClass: 'x-citewrite-border-ct',
						border: false,
						defaults: {
						    collapsible: true,
						    split: true,
						    layout: 'fit'
						},

						items: [{
							//title: 'Filter',
							title: 'Agencies',
							collapsible: true,
							collapsed:false,
							collapseMode: 'mini',
							region:'north',
							margins: '0 0 0 0',
							//width: '100%',
							 height:80,
							items: [filterForm]
						},{
							title: '',
							collapsible: true,
						    region:'center',
						    margins: '0 0 0 0',
							items: [grid]
						}
						]
					});
				//content.add(grid);
				content.doLayout();
			  
				
				var agencyActive = Ext.getCmp('agency_active');
				var agencyTypeCombo = Ext.getCmp('agencyTypeCombo');
				var agencyFormPanel  = Ext.getCmp('agencyFormPanel');
				var agencyDialog = Ext.getCmp('agencyWindow');
												
				agencyTypeCombo = new Ext.form.ComboBox({
				    typeAhead: true,
				    triggerAction: 'all',
				    lazyRender:true,
				    mode: 'local',
				    id: 'agency_type',
				    hiddenName: 'agency_type',
				    autoload: true,
				    store: new Ext.data.ArrayStore({
				        id: 0,
				        fields: [
				            'TypeValue',
				            'TypeDisplay'
				        ],
				        data: [[1, 'Agency Tour'],[2, 'Corporation'],[3, 'Independient']]
				    }),
				    valueField: 'TypeValue',
				    displayField: 'TypeDisplay',
				    fieldLabel: 'Type',
			    	anchor:'95%',
	                tabIndex: 10,
	                allowBlank: false,
	                forceSelection: true
				});
									
			if(!agencyDialog)
				{
					
				//agency form
				agencyFormPanel = new Ext.FormPanel({
					bodyBorder: false,
					border: false,
					frame: false,
					labelAlign: 'top',
					buttonAlign:'center',
					bodyStyle: 'padding: 10px; ',
					autoWidth: true,
					defaults: { width: '95%' },
					bodyCssClass: 'x-citewrite-panel-body',
					id: 'agencyFormPanel',
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
					                items: [{
								    	   	id: 'agency_name',
								    	   	fieldLabel: 'Name',
						                    anchor:'95%',
						                    allowBlank: false,
							                tabIndex: 1 
								       },
								       {
								    	   id: 'agency_identification',
								    	   fieldLabel: 'Corporation ID',
								    	   anchor:'95%',
						                   tabIndex: 2 

								       }, 	
								    	   agencyCountryCombo
								       , {
								    	   id: 'agency_address',
								    	   fieldLabel: 'Address',
								    	   anchor:'95%',
						                   tabIndex: 4 

								       }/*,{
								    	   id: 'agency_zip',
								    	   fieldLabel: 'Zip',
								    	   anchor:'95%',
								    	   maskRe: /^[0-9-]*$/,
						                   tabIndex: 5

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
								    	   id: 'agency_phone',
								    	   fieldLabel: 'Phone',
								    	   allowBlank: false,
								    	   anchor:'95%',
						                   tabIndex: 6 
								       },
								       {
								    	   id: 'agency_web_site',
								    	   fieldLabel: 'Web Site',
								    	   anchor:'95%',
						                   tabIndex: 7 
								       },{ 
								    	   id: 'agency_email',
								    	   fieldLabel: 'Email',
								    	   regex: /^([\w\-\'\-]+)(\.[\w-\'\-]+)*@([\w\-]+\.){1,5}([A-Za-z]){2,4}$/,
								    	   regexText:'This field should be an e-mail address in the format "user@example.com"',
								    	   anchor:'95%',
								    	   allowBlank: false,
						                   tabIndex: 8 
								       },/*{ 
								    	   id: 'agency_fax',
								    	   fieldLabel: 'Fax',
								    	   maskRe: /^[0-9]*$/,
								    	   anchor:'95%',
						                   tabIndex: 9 
								       }, */
								       agencyTypeCombo
								        	]
					            }]
					        },{
					        		id: 'agency_notes',
					        		fieldLabel: 'Notes',
				                    anchor:'97%',
					                tabIndex: 13,
					                xtype: 'textarea',		
									name: 'agency_notes'
							},
					       {
								   id: 'agency_id',
								   xtype: 'hidden',
								   value: '0'
							}]
				});
			  
				//agency dialog
					agencyDialog = new Ext.Window({
		                renderTo: document.body,
		                layout:'fit',
		                width:540,
		                height:490,
		                closeAction:'hide',
		                plain: true,
		                resizable: false,
		                modal: true,
		                id: 'agencyWindow',
		                items: agencyFormPanel,
	
		                buttons: [{
		                    text:'Save',
		                    handler: function()
		                    {
		                    	var agency_id = Ext.getCmp('agency_id').getValue();
		                    	var agency_name = Ext.getCmp('agency_name').getValue();
		                    	var agency_dni = Ext.getCmp('agency_identification').getValue();
		                    	var agency_address = Ext.getCmp('agency_address').getValue();
		                    	//var agency_zip = Ext.getCmp('agency_zip').getValue();
		                    	var agency_country = agencyCountryCombo.getValue();
		                    	var agency_phone = Ext.getCmp('agency_phone').getValue();
		                    	var agency_email = Ext.getCmp('agency_email').getValue();
		                    	var agency_web_site = Ext.getCmp('agency_web_site').getValue();
		                    	//var agency_fax = Ext.getCmp('agency_fax').getValue();
		                    	var agency_notes = Ext.getCmp('agency_notes').getValue();
		                    	var agency_type = agencyTypeCombo.getValue();
		                     	
		                    	/*if(agency_name.length == 0 || agency_phone.length == 0 || agency_email.length == 0)
	                    		{
		                    		Ext.Msg.show({
			            				   title:'Missing Field',
			            				   msg: 'Name, Phone and Email are required.',
			            				   buttons: Ext.Msg.OK,
			            				   icon: Ext.MessageBox.ERROR
			            				});
		                    		
		                    		return false;
	                    		}
		                    	
		                    	if(agency_type.length == 0)
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
		                    	agencyFormPanel.getForm().submit({
		                    	    url: _contextPath + '/agency/save',
		                    	    params: {
		                    	        xaction: 'save'
		                    	    },
		                    	    success: function(form, action) {
		                    	    	agencyDialog.hide();
		                    	    	Ext.growl.message('Success', 'Agency has been saved.');
		                    	    	store.reload();
		                    	    	remove: true;
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
		                    	agencyDialog.hide();
		                    }
		                }]
		            });
				}else{
					//countryStore.getStore().reload();
				}
				
				 function editAgency()
				 {
						var agency = _agencyContextMenu.rowRecord.data;
						  
						Ext.getCmp('agency_id').setValue(agency.agency_id);
						Ext.getCmp('agency_name').setValue(agency.agency_name);
						Ext.getCmp('agency_identification').setValue(agency.agency_identification);
						Ext.getCmp('agency_address').setValue(agency.agency_address);
						//Ext.getCmp('agency_zip').setValue(agency.agency_zip);
						//Ext.getCmp('agency_country').setValue(agency.country);
						Ext.getCmp('agency_phone').setValue(agency.agency_phone);
						Ext.getCmp('agency_email').setValue(agency.agency_email);
						Ext.getCmp('agency_web_site').setValue(agency.agency_web_site);
						//Ext.getCmp('agency_fax').setValue(agency.agency_fax);
						Ext.getCmp('agency_notes').setValue(agency.agency_notes);
						agencyTypeCombo.setValue(agency.agency_type);
						agencyCountryCombo.setValue(agency.agency_country);
						agencyDialog.setTitle('Edit Agency');
						agencyDialog.show();
						agencyDialog.center();
				  }
				  
				  function deleteAgency()
				  {
					  var agency = _agencyContextMenu.rowRecord.data;
					  
					  Ext.Msg.confirm("Delete?", "Remove agency '"+agency.name+"'?", function(bid, p2){
						  if(bid == "yes")
						  {
							  Ext.Ajax.request({
								   url: _contextPath + '/agencies/delete',
								   success: function(p1, p2)
								   {
									   var response = Ext.decode(p1.responseText);
									   if(response.success)
									   {
										   store.reload();
										   Ext.growl.message('Success', 'Agency has been deleted.');
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
			            				   msg: 'Error deleting agency.',
			            				   buttons: Ext.Msg.OK,
			            				   icon: Ext.MessageBox.ERROR
			            				});
								   },
								   params: { xaction: 'delete', agency_id: agency.agency_id }
								}); 
						  }
					  });
				  }
				  
				  function addAgency()
				  {
					  agencyDialog.setTitle('New Agency');
					  agencyFormPanel.getForm().reset();
					  agencyCountryCombo.setValue(1);
					  agencyTypeCombo.setValue(1);
					  agencyDialog.show();
				  }

		});//end function
	}//end if
	  
});
