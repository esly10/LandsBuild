var _ownerMutex = false;
ReservationListPanel = Ext.extend(Ext.Panel, {
	grid: null,
	store: null,
	filter: null,
	pageLimit: 50,
	stateStore: null,
	ownerStore: null,
	data: null,
	violationStore: null,
	owner: null,
	windowFlag: false,
	initComponent: function()
    {
		var panel = this;
		if(this.owner == null)
		{
			this.owner = {owner_id: 0};
		}
		
	
		// create the Data Store
	    this.store = new Ext.data.JsonStore({
			url: _contextPath + '/reservation/reservationList',
			baseParams: {owner_id: this.owner.owner_id },
			root: 'reservations',
	        totalProperty: 'count',
	        remoteSort: true,
	        fields: [
	            'reservation_id',
	            'reservation_number', 
	            'reservation_type',
	            'reservation_status',
	            'reservation_agency_id',
	            'reservation_guest_id',
	            'reservation_user_id', 
	            'reservation_check_in',
	            'reservation_check_out',
	        	'reservation_rooms_qty',
	        	'reservation_nights',
				'reservation_rooms_occupancy',
	            'reservation_rooms',
	            'reservation_adults',
	            'reservation_children', 
	            'reservation_guides',
	            'reservation_meal_plan',
	            'reservation_rate_type',
	            'reservation_payment_terms',
	            'reservation_payment_value',
	            'reservation_agency_tax', 
	            'reservation_agency_amount',
	            'reservation_guest_tax',
	            'reservation_guest_amount',
	            'reservation_service_notes',
	            'reservation_transport_notes',
	            'reservation_internal_notes',
	            'reservation_bar_notes',
	            'reservation_update_date',
	            'reservation_creation_date',
	            'agency_name',
	            'card_name',
	            'card_no', 
	            'card_exp', 
	            'card_type', 
	            'reservation_tax',
	            'reservation_bank',
	            'reservation_event_date',
	            'reservation_event_participants',
	            'reservation_ignore_service',
	            'reservation_ignore_tax',
	            'name' ,'checkin','checkout','user_name'	          
	        ],
			sortInfo: {
				field: 'reservation_check_in',
				direction: 'DESC'
			},
			autoLoad: {params:{start:0, limit: panel.pageLimit}}
	    });
	    
	    //var params = panel.filter.getForm().getFieldValues();
	    this.store.baseParams ={filter_status: 7};
	    
	   /* 
		Ext.Ajax.request({
			   url: _contextPath + '/owner/details',
			   success: function(response, opts){
				   data = Ext.decode(response.responseText);
				   if(data.success)
				   {
					   //editOwner(data.owner, data.fields, data.types, panel, stateStore);
				   }
				   else
				   {
					   Ext.Msg.show({
						   title:'Error!',
						   msg: data.msg,
						   buttons: Ext.Msg.OK,
						   icon: Ext.MessageBox.ERROR
						});
				   }
				   
			   },
			   failure: function(response, opts){
				   Ext.Msg.show({
					   title:'Error!',
					   msg: 'Error loading owner information.',
					   buttons: Ext.Msg.OK,
					   icon: Ext.MessageBox.ERROR
					});
			   },
			   params: { owner_id: citation.owner_id, xaction: 'get' }
			});*/
		
	    
	    var toolbar = {
	            pageSize: panel.pageLimit,
	            store: this.store,
	            displayInfo: true,
	            displayMsg: 'Displaying Reservations {0} - {1} of {2}',
	            emptyMsg: "No reservations to display"
	        };
	    
	    if( (hasPermission(PL_ADMIN) && this.owner.owner_id == 0) || hasPermission(PL_CITATION_MANAGE))
	    {
		    toolbar.items = [
	                '-',	                
	                {
		                text: 'Add Reservation',
		                cls: 'x-btn-text details',
		                handler: function(btn, event){ 
		                	                	
		                	var url =  "http://"+window.location.host+window.location.pathname+"reservation?reservation_id=0";						
							window.open(url); 
		        			return;
		        			
		                }
		             }];
	    }
	     
	    var columnModel = new Ext.grid.ColumnModel({
	        defaults: { sortable: true }
	        ,columns:[{
	            header: "Reservation No",
	            dataIndex: 'reservation_number',
	            width: 100
	        },{
	            header: "Status",
	            dataIndex: 'reservation_status',
	            width: 60,
	            renderer: function(value){ if(value == 1){ 
	            								return 'Confirmed'; 
	            							}else if(value == 2){ 
	            								return 'Canceled';
	            							}else if(value == 3){ 
	            								return 'Check In';
	            							}else if(value == 4){ 
	            								return 'Check Out';
	            							}else if(value == 5){ 
	            								return 'Open';
	            							}else{ 
	            								return 'No Show';}}
	        }
	        ,{
	            header: "Guest",
	            dataIndex: 'name',
	            width: 110
	        },{
	            header: "Agency",
	            dataIndex: 'agency_name',
	            width: 110
	        }
	        ,{
	            header: "Check In / Event",
	            dataIndex: 'reservation_check_in',
	            width: 90,
	        	renderer: function(value, meta, dataStore)
	        	   { 
	        		 if(dataStore.data.reservation_type == 3){
	        			 value= dataStore.data.reservation_event_date;
	        		 }
	        		   return Ext.util.Format.date(value, 'Y-m-d'); 
	        		   //return value;
	        	   }
	        },{
	            header: "Check Out",
	            dataIndex: 'reservation_check_out',
	            width: 90,
	        	renderer: function(value)
	        	   { 
	        		   return Ext.util.Format.date(value, 'Y-m-d'); 
	        		   //return value;
	        	   }
	        },{
	            header: "Event date",
	            dataIndex: 'reservation_event_date',
	            width: 70,
	            hidden: true,
	        	renderer: function(value)
	        	   { 
	        		   return Ext.util.Format.date(value, 'Y-m-d'); 
	        		   //return value;
	        	   }
	        },{
	            header: "Creation Date",
	            dataIndex: 'reservation_creation_date',
	            width: 90,
	        	renderer: function(value)
	        	   { 
	        		   return Ext.util.Format.date(value, 'Y-m-d'); 
	        		   //return value;
	        	   }
	        },{
	            header: "Update date",
	            dataIndex: 'reservation_update_date',
	            width: 70,
	        	renderer: function(value)
	        	   { 
	        		   return Ext.util.Format.date(value, 'Y-m-d'); 
	        		   //return value;
	        	   }
	        }]});
	    
	    this.grid = new Ext.grid.GridPanel({
	        width:550,
	        height:300,
	        store: this.store,
	        trackMouseOver:false,
	        viewConfig: { forceFit:false },	
	        disableSelection:false,
	        frame: false,
	        border: false,
	
	        // grid columns
	        colModel: columnModel,
	
	        // customize view config
	        viewConfig: { forceFit:true },
	
	        // paging bar on the bottom
	        bbar: new Ext.PagingToolbar(toolbar),
	        loadMask: true,
	        listeners: {'rowcontextmenu': this.showContextMenu,
					'rowdblclick': function(grid, index, event)
						{
							var record = grid.getStore().getAt(index);
							var url =  "http://"+window.location.host+window.location.pathname+"reservation?reservation_id="+record.data.reservation_id;						
							window.open(url); 
		        			return;
		        			/*
							event.stopEvent();
							var record = grid.getStore().getAt(index);
							var content = Ext.getCmp('content-panel');
		        			content.removeAll(true);			
		        			content.add(new ReservationPanel({'reservationInfo' : record.data}));
		        			content.doLayout();
		        			return;*/
							
					}, scope: this }
	    });
	    
	    /*this.filter = new Ext.FormPanel({
			bodyBorder: false,
			border: false,
			frame: false,
			collapsible:false,
			defaultType:'textfield',
			labelAlign: 'top',
			buttonAlign:'center',
			bodyStyle: 'padding: 10px; ',
			autoWidth: true,
			autoScroll: true,
			defaults: { width: '95%' },
			bodyCssClass: 'x-citewrite-panel-body',
			items:[
			       {
			    	   name: 'filter_number',
			    	   anchor:'95%',
			    	   fieldLabel: 'Reservation Number'
			       },
			       { 
			    	   xtype: 'combo',
			    	   hiddenName: 'filter_status',
			    	   fieldLabel: 'Status',
			    	   anchor:'95%',
			    	   submitValue: true,
			    	   typeAhead: true,
			    	   triggerAction: 'all',
			    	   lazyRender:true,
			    	   mode: 'local',
			    	   id: 'filter_status',
			    	   autoload: true,
			    	   store: new Ext.data.ArrayStore({
					        id: 0,
					        fields: [
					            'StatusValue',
					            'StatusDisplay'
					        ],
					        data: [[1, 'Confirmed'],[2, 'Canceled'],[3, 'Check In'],[4, 'Check Out'],[5, 'No Show']]  
					    }),
					    valueField: 'StatusValue',
						displayField: 'StatusDisplay',
				    	anchor:'95%',
		            	tabIndex: 6,
		            	allowBlank: true,
		                forceSelection: false
			       },
			       {
			    	   name: 'filter_guest',
			    	   anchor:'95%',
			    	   fieldLabel: 'Guest Name'
			       },
			       {
			    	   name: 'filter_agency',
			    	   anchor:'95%',
			    	   fieldLabel: 'Agency'
			       },
			       {
			    	   name: 'filter_checkIn',
			    	   fieldLabel: 'Check In',
			    	   anchor:'95%',
			    	   xtype: 'datefield'
			       },
			       {
			    	   name: 'filter_checkOut',
			    	   fieldLabel: 'Check Out',
			    	   anchor:'95%',
			    	   xtype: 'datefield'
			       },
			       {
			            xtype: 'radiogroup',
			            fieldLabel: 'Period Selector',
			            id: 'filter_type',
			            itemCls: 'x-check-group-alt',
			            columns: 1,
			            items: [
			                {boxLabel: 'Today', name: 'rb', inputValue: 1},
			                {boxLabel: 'Following Week', name: 'rb', inputValue: 2},
			                {boxLabel: 'Following Month', name: 'rb', inputValue: 3},
			                {boxLabel: 'All', name: 'rb', inputValue: 4}
			            ]
			        }
			       ],
	        buttons: [{
	            text: 'Apply',
	            width: 60,
	            handler: function(){
	               var params = panel.filter.getForm().getFieldValues();
	               params.owner_id = panel.owner.owner_id;
	               panel.store.baseParams = params;
	               panel.store.load({params: {start: 0, limit: panel.pageLimit}});
	            }
	        },{
	            text: 'Reset',
	            width: 60,
	            handler: function(){
	            	panel.filter.getForm().reset();					
	            	panel.store.baseParams = {owner_id: panel.owner.owner_id};
	            	panel.store.load({params: {start: 0, limit: panel.pageLimit}});
	            }
	        }]
		}); //filterForm*/
		
	    this.filter = new Ext.FormPanel({
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
                            columnWidth: .20,
                            layout: 'form',
                            items: [
									{
										   name: 'filter_number',
										   xtype: 'textfield', 
										   anchor:'95%',
										   fieldLabel: 'Res. Number'
									},{
											xtype: 'box',
											height: 10
									},{ 
								    	   xtype: 'combo',
								    	   hiddenName: 'filter_status',
								    	   fieldLabel: 'Status',
								    	   anchor:'95%',
								    	   submitValue: true,
								    	   typeAhead: true,
								    	   triggerAction: 'all',
								    	   lazyRender:true,
								    	   mode: 'local',
								    	   id: 'filter_status',
								    	   autoload: true,
								    	   store: new Ext.data.ArrayStore({
										        id: 0,
										        fields: [
										            'StatusValue',
										            'StatusDisplay'
										        ],
										        data: [[1, 'Confirmed'],[2, 'Canceled'],[3, 'Check In'],[4, 'Check Out'],[5, 'Open'],[6, 'No Show'],[7, 'Confirm, Open & Checkin'],[8, 'All']]  
										    }),
										    valueField: 'StatusValue',
											displayField: 'StatusDisplay',
											value:7,
									    	anchor:'95%',
							            	tabIndex: 6,
							            	allowBlank: true,
							                forceSelection: false
								       }
                            ] // close items for first column
                        },{   // column #1
                            columnWidth: .20,
                            layout: 'form',
                            items: [
                                {
						    	   name: 'filter_guest',
						    	   xtype: 'textfield', 
						    	   anchor:'95%',
						    	   fieldLabel: 'Guest Name'
						       },{
									xtype: 'box',
									height: 10
						       },
						       {
						    	   name: 'filter_agency',
						    	   xtype: 'textfield', 
						    	   anchor:'95%',
						    	   fieldLabel: 'Agency'
						       }
                            ] // close items for first column
                        },{   // column #1
                            columnWidth: .25,
                            layout: 'form',
                            items: [
                                    {
							    	   name: 'filter_checkIn',
							    	   fieldLabel: 'CheckIn Start',
							    	   anchor:'95%',
							    	   xtype: 'datefield',
							    	   listeners : {
											  select: function (t,n,o) {
												  Ext.getCmp('filter_checkOut').setValue(t.value);
											   }
										}
							       },{
										xtype: 'box',
										height: 10
							       },
							       {
							    	   name: 'filter_checkOut',
							    	   id: 'filter_checkOut',
							    	   fieldLabel: 'CheckIn End',
							    	   anchor:'95%',
							    	   xtype: 'datefield'
							       }
                            ] // close items for first column
                        },{   // column #1
                            columnWidth: .30,
                            layout: 'form',
                            items: [
                                {
						            xtype: 'radiogroup',
						            fieldLabel: 'Created and Updated',
						            id: 'filter_type',
						            itemCls: 'x-check-group-alt',
						            //columnHeigth: 15,
						            columns: 3,
						            items: [
						                    {boxLabel: 'Crtd Today', name: 'rb', inputValue: 1, height: 32},
							                {boxLabel: 'Uptd Today', name: 'rb', inputValue: 5, height: 32},
							                {boxLabel: 'Crtd Week', name: 'rb', inputValue: 2, height: 32},
							                {boxLabel: 'Uptd Week', name: 'rb', inputValue: 4, height: 32},
							                {boxLabel: 'Crtd Yesterday', name: 'rb', inputValue: 6, height: 32},
							                {boxLabel: 'Uptd Month', name: 'rb', inputValue: 3, height: 32}                 
						               
						            ],
						            listeners: {
						            	change: function(field, newValue, oldValue, eOpts){
						            		Ext.getCmp("selected_grupbox_reservation").setValue(newValue.inputValue);
						                }
						            }
						        }
                            ] // close items for first column
                        },{   // column #1
                            columnWidth: .05,
                            layout: 'form',
                            items: [{  	  	xtype: 'button',
                        		text: 'Apply',
        			            width: 60,
        			            handler: function(){
        			               var params = panel.filter.getForm().getFieldValues();
        			               panel.store.baseParams = params;
        			               panel.store.load({params: {start: 0, limit: panel.pageLimit}});
        			            },
        			        },{
								xtype: 'box',
								height: 10
        			        },{
        			        	xtype: 'button',
        			            text: 'Reset',
        			            width: 60,
        			            //height:30,
        			            handler: function(){
        			            	panel.filter.getForm().reset();				
        			            	panel.store.baseParams = {filter_status: 7};
        			            	panel.store.load({params: {start: 0, limit: panel.pageLimit}});
        			            }
        			      }
                                
                            ] 
                        }],
                    },{
                    	xtype: 'hidden',
    					id: 'selected_grupbox_reservation',
    					name: 'selected_grupbox_reservation',
    					value: 0
                    }],
	    });
	    
		 
		var config = 
		{
			xtype: 'panel',
			layout:'border',
			border: false,
			bodyCssClass: 'x-citewrite-panel-body',
			autoDestroy: true,
			defaults: {
			    collapsible: true,
			    split: true,
			    layout: 'fit'
			},

			items: [{
				title: '',
				collapsible: true,
			    region:'center',
			    margins: '5 0 5 5',
				items: [this.grid]
			},
			{
				title: 'Reservation List',
				collapsible: true,
				collapsed:false,
				collapseMode: 'mini',
				region:'north',
				margins: '0 0 0 0',
				//width: '100%',
				 height:110,
				items: [this.filter]
			}]
		};
		
		Ext.apply(this, Ext.apply(this.initialConfig, config));
        
		ReservationListPanel.superclass.initComponent.apply(this, arguments);

    },
    showContextMenu: function(grid, index, event)
	{
		event.stopEvent();
		var panel = this;
		var record = grid.getStore().getAt(index);
		
		var items = new Array(/*{
					text: 'Details',
					handler: function() 
					{
						//panel.details(record.data);
						var content = Ext.getCmp('content-panel');
	        			content.removeAll(true);			
	        			content.add(new ReservationPanel({'reservationInfo' : record.data}));
	        			content.doLayout();
	        			return;
					}
				},*/
				{
					text: 'Details New Tab',
					handler: function() 
					{						
						var url =  "http://"+window.location.host+window.location.pathname+"reservation?reservation_id="+record.data.reservation_id;						
						window.open(url); 
	        			return;
					}
				});
		
		/*if(hasPermission(PL_CITATION_MANAGE) || (hasPermission(PL_OWNER_MANAGE) && panel.owner.owner_id > 0))
		{
			items.push({
					text: 'Edit',
					handler: function() 
					{
						panel.editCitation(record.data.citation_id);
					}
				});
			
		}*/	
		/*
		if(hasPermission(PL_ADMIN))
		{
			items.push({
				text: 'Delete',
				handler: function() 
				{
					panel.deleteCitation(record.data);
				}
			});
			
		}		*/

		new Ext.menu.Menu(
		{
			items: items,
			autoDestroy: true
		}).showAt(event.xy);
	},
					   
	details: function(cite)
	{
		var panel = this;		
		
		if(!panel.windowFlag)
			
		{
			
			panel.windowFlag = true;
			Ext.Ajax.request({
				   url: _contextPath + '/citation/details',
				   params: { citation_id: cite.citation_id, owner_id: panel.owner.owner_id },
				   success: function(p1, p2)
				   {
					   var response = Ext.decode(p1.responseText);
					   if(response.success)
					   {
						   var citation = response.citation;
			
						   var citationWindow = new Ext.Window({
								title: 'Citation Details - ' + citation.citation_number,
				                renderTo: document.body,
				                layout:'fit',
				                width:700,
				                height:600,
				                closeAction:'close',
				                plain: true,
				                resizable: true,
				                modal: true,
	
				                items:[ {
				                	xtype: 'tabpanel',
				                	activeTab: 0,
				                	id: 'citationDetailsTabPanel',
				                	autoScroll: true,
				                	frame: false,
				                	border: false,
				                	items:[{
				                			xtype: 'panel',
				                			title: 'General',
				                			id: 'citationDetailsGeneralTab',
				                			bodyCssClass: 'x-citewrite-panel-body',
				                			bodyStyle: 'padding: 10px;',
				                			autoScroll: true,
				                			buttonAlign:'left',
				                			buttons: [{
							                    text: 'Save',
							                    handler: function(){
							                    	//dispPanel
							                    	var form = Ext.getCmp('citation-update-panel'); 
							                    	if(Ext.getCmp('combo-citation-status').getValue() == "WriteOff"){
							                    		Ext.getCmp('combo-citation-status').setValue(Ext.getCmp('edit-filter_citation_reason').getValue());
							                    	}
							                    	form.getForm().submit({
									            	    url: _contextPath + '/citation/save',
									            	    scope: this,
									            	    params: {citation_id: citation.citation_id, owner_id: panel.owner.owner_id, updateGeneral : true},
									            	    success: function(form, action) {
									            	    	
									            	    	var response = Ext.decode(action.response.responseText);
									            	    	if(response.success)
									            	    	{
										            	    
									            	    		if(Ext.getCmp('combo-citation-status').getValue() == "Bad Debt" || Ext.getCmp('combo-citation-status').getValue() == "Sent to collections"){
										                    		Ext.getCmp('combo-citation-status').setValue("WriteOff");
										                    	}
									            	    		panel.grid.store.reload();
										            	    	Ext.growl.message('Success', 'Citation has been appealed.');
									            	    	}
									            	    	else
									            	    	{
									            	    		Ext.Msg.show({
								            	    			   title:'Error',
								            	    			   msg: response.msg,
								            	    			   buttons: Ext.Msg.OK,
								            	    			   icon: Ext.MessageBox.ERROR
								            	    			});
									            	    	}
									            	    },
									            	    failure: function(form, action) {
									            	        switch (action.failureType) {
									            	            case Ext.form.Action.CLIENT_INVALID:
									            	            	Ext.Msg.show({
									            	    			   title:'Error',
									            	    			   msg: 'The fields outlined in red are required.',
									            	    			   buttons: Ext.Msg.OK,
									            	    			   icon: Ext.MessageBox.ERROR
									            	    			});
									            	                break;
									            	            case Ext.form.Action.CONNECT_FAILURE:
									            	            	Ext.Msg.show({
									            	    			   title:'Failure',
									            	    			   msg: 'Ajax communication failed',
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
									            	                break;
									            	       }
									            	    }
									            	});
							                    }
							                }]
				                		}]
				                	}],
	
				                buttons: [{
				                    text: 'Close',
				                    handler: function(){
				                    	this.findParentByType('window').close();
				                    }
				                }],
				                listeners: {
				                	close: function(p){
				                		panel.windowFlag = false;
							        }
				                }
				            });
						  
						   var tab = Ext.getCmp('citationDetailsGeneralTab');
						   
						   var fields = response.fields;
						   var photos = citation.photos;					   
						   var extra = citation.extra;
							  
						   var html = new Array('<dl class="list">',
								   					'<dt>Citation Number</dt>',
								   					'<dd>',citation.citation_number,'</dd>',
								   					'<dt>PIN</dt>',
								   					'<dd>',citation.pin,'</dd>');
								
						   for(var i = 0; i < fields.length; i++)
						   {
							   var field = fields[i];
							   if(field.name != '')
							   {
								   html.push('<dt>',field.label,'</dt>');
							   }
							   
							   if(field.type == 'text')
							   {
								   var ca = panel.findCA(field.name, extra);
								   if(ca != null)
								   {
									   html.push('<dd>',ca.value,'</dd>');
								   }
								   else if(field.name == 'permit_number')
								   {
									   html.push('<dd id="citation-permit_number-field">',citation.permit_number,'</dd>');
								   }
								   else
								   {
									   html.push('<dd>&nbsp;</dd>');
								   }
							   }
							   else if(field.type == 'list' || field.type == 'database')
							   {
								   var ca = panel.findCA(field.name, extra);
								   if(ca != null)
								   {
									   html.push('<dd>',ca.value_id, ' - ',ca.value,'</dd>');
								   }
								   else
								   {
									   html.push('<dd>&nbsp;</dd>');
								   }
							   }
							   else
							   {
								   if(field.name == 'date_time')
								   {
									   html.push('<dd>',Ext.util.Format.date(citation.citation_date, 'F j, Y g:i A'),'</dd>');
								   }
								   else if(field.name == 'officer_id')
								   {  		
									   html.push('<dd>',citation.officer_id,'</dd>');
								   }
								   else if(field.name == 'license')
								   {  		
									   html.push('<dd>',citation.license,'</dd>');
								   }
								   else if(field.name == 'vin')
								   {  		
									   html.push('<dd>',citation.vin,'</dd>');
								   }
								   else if(field.name == 'color')
								   {  		
										   html.push('<dd>',citation.color_id, ' - ', citation.color_description, '</dd>');
								   }
								   else if(field.name == 'make')
								   {  		
									   html.push('<dd>',citation.make_id, ' - ', citation.make_description, '</dd>');
								   }
								   else if(field.name == 'state')
								   {  		
									   html.push('<dd>',citation.state_id, ' - ', citation.state_description,'</dd>');
								   }
								   else if(field.name == 'violation')
								   {  		
									   html.push('<dd>',citation.violation_id,' - ', citation.violation_description, '</dd>',
										  		'<dt>Amount</dt>',
										  		'<dd>$',citation.violation_amount,'</dd>');
								  
									  if(citation.violation_start != null)
									  {
										  html.push('<dt>Chalk Start</dt>',
											  		'<dd>',Ext.util.Format.date(citation.violation_start, 'F j, Y g:i A'),'</dd>');
									  }
									  
									  if(citation.violation_end != null)
									  {
										  html.push('<dt>Chalk End</dt>',
											  		'<dd>',Ext.util.Format.date(citation.violation_end, 'F j, Y g:i A'),'</dd>');
									  }
								   }
								   else if(field.name == 'location')
								   {
									   html.push('<dd>',citation.location_id, ' - ', citation.location_description,'</dd>');
								   }
								   else if(field.name == 'comment')
								   {
									   html.push('<dd>',citation.comment_id, ' - ', citation.comments,'</dd>');
								   }
								   else if(field.name == 'status')
								   {
									   //html.push('<dd id="citation-status-field">',citation.status,'</dd>');
									   html.push('<div id="div-status" style="width:300px"></div>');
									   //html.push('<input id="div-status">');
								   }
								   else if(field.name == 'lat')
								   {
									   html.push('<dd id="citation-lat-field">',citation.lat,'</dd>');
								   }
								   else if(field.name == 'lng')
								   {
									   html.push('<dd id="citation-lng-field">',citation.lng,'</dd>');
								   }
								   else
								   {
									   html.push('<dd>&nbsp;</dd>');
								   }  		
							   }  
						   }
						   
						   html.push(	'<dt>Exported</dt>',
								  		'<dd>',((citation.exported == 1)?'Yes':'No'),'</dd>',
								  '</dl>');
						   
						   
						   html.push('<div id="button-citation"></div>');
						   
						   if(citation.first_export)
							   html.push('<br><dd><a href="'+_contextPath + '/citation/pdfExport?citation_id='+citation.citation_id+'&notification=first">Download First Notification.</a></dd>');
						   if(citation.final_export)
							   html.push('<br><dd><a href="'+_contextPath + '/citation/pdfExport?citation_id='+citation.citation_id+'&notification=final">Download Final Notification.</a></dd>');
						   tab.update(html.join(''));
								  
						     
							  dispCitationPanel = new Ext.form.FormPanel({
								    renderTo : 'div-status',
								    id:"citation-update-panel",
								    plain: true,
								    width:300,
								    bodyStyle:{"background-color":"white", "border-color":"white"},
								    items    : [
								      {
								    	   xtype: 'combo',
								    	   width: 165,
								    	   id: 'combo-citation-status',
								    	   hiddenName: 'citation-status',
								    	   submitValue: true,
								    	   hideLabel: true,
										   lazyRender: false,
										   style: {
							                    marginBottom: '5px'
							               },
										   store:panel.statusStore,

										    displayField: 'status_name',
										    valueField: 'status_id',
											triggerAction: 'all',
											forceSelection: true,
											mode: 'local',
								            allowBlank: false,
								            value:citation.status.status_name,
								            listeners: {
											    select: function(combo, record, index) {
											      if(record.data.status_name == 'Community Service'){
											    	  Ext.getCmp('edit-add-community-service-end').show();
											    	  
											    	  Ext.getCmp('edit-filter_citation_reason').hide();
											    	  Ext.getCmp('edit-filter_citation_reason').setValue('');
											      }else {
											    	  Ext.getCmp('edit-add-community-service-end').hide();
											    	  Ext.getCmp('edit-add-community-service-end').setValue('');
											    	  
											    	  if(record.data.status_name == 'WriteOff'){
											    		  Ext.getCmp('edit-filter_citation_reason').show();
											    	  }else {
											    		  Ext.getCmp('edit-filter_citation_reason').hide();
												    	  Ext.getCmp('edit-filter_citation_reason').setValue('');
											    	  }
											      }
											    },
											    'render': {
													scope: this,
													fn: function (field) {
																											
														var storeItems = panel.statusStore.getRange(),
														i = 0, flag = 0;
														

														for(; i<storeItems.length; i++){     
														   if(storeItems[i].get('status_name') == "WriteOff"){
															   flag = 1;
														   }            
														} 
																											
														// load first opotion to combo
														if(!flag){
															var statusVal = Ext.data.Record.create([
																	                                   {name: 'status_id', mapping : "status_id", type: 'int'},
																	                                   {name: 'status_name',  mapping : "status_name",  type: 'string'},
																	                                   {name: 'fee_check',  mapping : "fee_check",  type: 'int'}
																							                                 ]);
															var newData = new statusVal({status_id: 0, status_name: "WriteOff", fee_check: 1});
															//paymentPlanStore.insert(0, newData);
															panel.statusStore.insert(3,newData);
															panel.statusStore.commitChanges();
														}
													
													}
												}
											}
								       },
								       {
								    	   xtype: 'combo',
								    	   hiddenName: 'filter_citation_reason',
								    	   id:'edit-filter_citation_reason',
								    	   hideLabel: true,
								    	   emptyText: "Enter the Reason",
								    	   submitValue: true,
							               width: 165,
							               hidden:true,
							               
										   lazyRender: false,
										   store: new Ext.data.ArrayStore({
										        autoDestroy: true,
										        fields: ['id', 'description'],
										        data : [
										            [7, 'Bad Debt'], // 7 id to Bad Debt
										            [8, 'Sent to collections'] // 8 id to Sent to collections
										        ]
										    }),
										    displayField: 'description',
										    valueField: 'id',
											triggerAction: 'all',
											forceSelection: true,
											mode: 'local',
								            allowBlank: true
								       },					  
								       {
								    	   xtype: 'datefield',
											id: 'edit-add-community-service-end',
											name: 'citation-community-service-end',
											hideLabel: true,
											value:Ext.util.Format.date(citation.community_service_end, 'Y-m-d H:i:s'),
										    emptyText: "Enter the Com. Serv. End Date",											
											width:165,											
											format: 'Y-m-d H:i:s',
											altFormats: 'M d, Y h:i:s a',
											renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
											hidden:true
								       }
								    ],
								  });
							  
							  //var myBtn = Ext.getCmp('combo-citation-status');
							  //myBtn.fireEvent("select", myBtn);
							  
							  if(citation.status.status_name == "Bad Debt" || citation.status_name == "Sent to collections"){
								  Ext.getCmp("combo-citation-status").setValue(0);
								  Ext.getCmp("edit-filter_citation_reason").setValue(citation.status.status_name);
								  Ext.getCmp("edit-filter_citation_reason").show();
							  } else if(citation.status_name == "Community Service"){
								  Ext.getCmp("edit-add-community-service-end").show();
								  Ext.getCmp("edit-add-community-service-end").setValue(Ext.util.Format.date(citation.community_service_end, 'Y-m-d H:i:s')); //2015-11-11 00:00:00
							  }
							  //Ext.getCmp("edit-filter_citation_reason").fireEvent("select");
							 
							  //now add photos
							  var tabpanel = Ext.getCmp('citationDetailsTabPanel');
							  var count = 1;
							  tabpanel.items.each(function(c){
									  if(count > 1)
									  {
										  tabpanel.remove(c);
									  }
									  count++;
								  });
												  		
							  if(citation.lat != 0)
							  {
								  tabpanel.add({
					                    xtype: 'gmappanel',
					                    zoomLevel: 17,
					                    gmapType: 'map',
					                    title: 'Map',
					                    id: 'my_map',
					                    mapConfOpts: ['enableScrollWheelZoom','enableDoubleClickZoom','enableDragging'],
					                    mapControls: ['GMapTypeControl','NonExistantControl'],
					                    setCenter: {
					                    	lat: citation.lat,
					                        lng: citation.lng
					                    },
					                    markers: [{
					                        lat: citation.lat,
					                        lng: citation.lng,
					                        marker: {title: citation.citation_number}
					                    }]
					                });
							  }
							 
							  
							  if(photos.length  > 0)
							  {
								  for(var i = 0; i < photos.length; i++)
								  {
									  tabpanel.add({
				                			xtype: 'panel',
				                			title: 'Photo',
				                			bodyCssClass: 'x-citewrite-panel-body',
				                			autoScroll: true,
				                			html: '<img src="'+_contextPath+'/citation/photo?pid='+photos[i].citation_photo_id+'"/>'
				                		});
								  }
							  }
							  
						  	  if((IS_CITATION_PAYMENT_ENABLED) && ((((hasPermission(PL_OWNER_MANAGE) && panel.owner.owner_id > 0) || hasPermission(PL_CITATION_MANAGE)) && (citation.status != 'Paid')) || 
						  			  ((citation.status == 'Paid') && (hasPermission(PL_OWNER_MANAGE|PL_OWNER_VIEW)||hasPermission(PL_CITATION_MANAGE|PL_CITATION_VIEW)))) && (hasPermission(PL_CITATION_PAYMENT))){
						  		tabpanel.add(panel.getPaymentPanel(citation));
						  		tabpanel.add(panel.getPaymentPaymentsPanel(citation));
						  		//tabpanel.add(panel.getPaymentPlanPanel(citation));
						  		tabpanel.add(new CitationPaymentPlanPanel(citation));

						  		
						  		 Ext.Ajax.request({
									   url: _contextPath + '/owner/details',
									   success: function(response, opts){
										   this.data = Ext.decode(response.responseText);
										   if( this.data.success)
										   {
											   tabpanel.add(panel.getOwnerPanel(citation, data.types)); 
											   //editOwner(data.owner, data.fields, data.types, panel, stateStore);
										   }
										   else
										   {
											   Ext.Msg.show({
												   title:'Error!',
												   msg: data.msg,
												   buttons: Ext.Msg.OK,
												   icon: Ext.MessageBox.ERROR
												});
										   }
										   
									   },
									   failure: function(response, opts){
										   Ext.Msg.show({
											   title:'Error!',
											   msg: 'Error loading owner information.',
											   buttons: Ext.Msg.OK,
											   icon: Ext.MessageBox.ERROR
											});
									   },
									   params: { owner_id: citation.owner_id, xaction: 'get' }
								   });
						  		
						  		
						  		
						    	
						  		
						  	  }
						  	  
						  	  	/** Tap for Notes**/
							  var notesPanel = new Ext.Panel({
									                			title: 'Notes',
									                			bodyCssClass: 'x-citewrite-panel-body',
									                			autoScroll: true,
									                			layout: 'form',
									                			padding: 10,
									                			buttonAlign: 'left'
									                		});
							  
							  notesPanel.add(
									  {
										  xtype: 'form',
										  bodyBorder: false,
										  id:'citationNotesFormPanel',
										  border: false,
										  frame: false,
										  bodyCssClass: 'x-citewrite-panel-body',
										  buttonAlign: 'left',
										  defaults: {width: '95%'},
										  items:[
										         {
												 	xtype: 'textarea',
												 	id: 'citation-notes',
												 	name: 'citation_notes',
												 	fieldLabel: 'Notes',
												 	value: citation.notes,
												 	height: 150,
												 	labelWidth: 60
												 }
										  ],
										  buttons:[{
								                text: 'Save',
								                handler: function(){
								                	var form = this.findParentByType('form');
								                	form.getForm().submit({
									            	    url: _contextPath + '/citation/saveNotes',
									            	    scope: this,
									            	    params: {citation_id: citation.citation_id, owner_id: panel.owner.owner_id},
									            	    success: function(form, action) {
									            	    	
									            	    	var response = Ext.decode(action.response.responseText);
									            	    	if(response.success)
									            	    	{
										            	    
										            	    	Ext.growl.message('Success', 'Citation Notes has been appealed.');
									            	    	}
									            	    	else
									            	    	{
									            	    		Ext.Msg.show({
								            	    			   title:'Error',
								            	    			   msg: response.msg,
								            	    			   buttons: Ext.Msg.OK,
								            	    			   icon: Ext.MessageBox.ERROR
								            	    			});
									            	    	}
									            	    },
									            	    failure: function(form, action) {
									            	        switch (action.failureType) {
									            	            case Ext.form.Action.CLIENT_INVALID:
									            	            	Ext.Msg.show({
									            	    			   title:'Error',
									            	    			   msg: 'The fields outlined in red are required.',
									            	    			   buttons: Ext.Msg.OK,
									            	    			   icon: Ext.MessageBox.ERROR
									            	    			});
									            	                break;
									            	            case Ext.form.Action.CONNECT_FAILURE:
									            	            	Ext.Msg.show({
									            	    			   title:'Failure',
									            	    			   msg: 'Ajax communication failed',
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
									            	                break;
									            	       }
									            	    }
									            	});
								                }
								            }]
									  });
						
							  tabpanel.add(new CitationNotesPanel(citation));
							  tabpanel.add(new CitationOwnerPanel(citation));
							  citationWindow.show();
					   }
					   else
					   {
						   Ext.Msg.show({
							   title:'Failure',
							   msg:  response.msg,
							   buttons: Ext.Msg.OK,
							   icon: Ext.MessageBox.ERROR
							});
					   }
				   },
				   failure: function(){  
					   Ext.Msg.show({
						   title:'Failure',
						   msg:  'Error retrieving citation photos.',
						   buttons: Ext.Msg.OK,
						   icon: Ext.MessageBox.ERROR
						});
				   }
				});
			}
	},
	
	getPaymentPlanPanel: function(citation)
	{
		var bPanel = null;
		var panel = this;		
		
		bPanel= {
				xtype: 'form',
				title: 'Payment Plan',
				bodyBorder: false,
				border: false,
				frame: false,
				autoScroll: true,
				bodyStyle: 'padding: 10px; ',
				bodyCssClass: 'x-citewrite-panel-body',
				buttonAlign: 'left',				
				items: [
						{
							xtype: 'hidden',
							name: 'citation_id',
							value: citation.citation_id
						},
						{
							   xtype: 'combo',
							   id: 'citation-type ',
							   hiddenName: 'citation-type ',
							   fieldLabel: 'Type ',
							   submitValue: true,
							   width: 120,
							   lazyRender: false,
							   allowBlank: false,
							   store: new Ext.data.ArrayStore({
							   autoDestroy: true,
							   fields: ['id', 'value'],
							   data : [
							            ['payment_amount', 'Payment Amount'],
							            ['payments_number', 'Number of Payments']
							        ]
							    }),
							    value:'payment_amount',
							    displayField: 'value',
							    valueField: 'id',
								triggerAction: 'all',
								forceSelection: true,
								mode: 'local',
								listeners:{
									select: function(val, e)
									{
										if(val.value == "payment_amount") {
											Ext.getCmp("value").label.update("Payment Amount");
										}else {
											Ext.getCmp("value").label.update("Number of Payments");
										}
									}
								}
						},
						//payment amount or number of payments
						{
							xtype: 'numberfield',
							id: 'value',
							name: 'value',
							fieldLabel: 'Payment Amount',
							value: 0,
							width: 120,
							allowBlank: false,
							listeners:{keyup: function(field, e)
								{
								
								}
							}
						},
						{
						   xtype: 'combo',
						   id: 'citation-frequency',
						   hiddenName: 'frequency',
						   fieldLabel: 'Frequency',
						   submitValue: true,
						   width: 120,
						   lazyRender: false,
						   allowBlank: false,
						   store: new Ext.data.ArrayStore({
						   autoDestroy: true,
						   fields: ['id', 'value'],
						   data : [
						            ['weekly', 'weekly'],
						            ['monthly', 'monthly']
						        ]
						    }),
						    displayField: 'value',
						    valueField: 'id',
							triggerAction: 'all',
							forceSelection: true,
							mode: 'local'
						},
						{
					        xtype: 'datefield',
							id: 'start_date',
							name: 'start_date',
						    fieldLabel: 'Start Date',
							format: 'Y-m-d H:i:s',
							altFormats: 'M d, Y h:i:s a',
							width:120,
							allowBlank: false,
							value: '1970-01-01 00:00:00'
					    }
						],
						 buttons: []
			};
		
		return bPanel;
	},
	getPaymentPaymentsPanel: function(citation)
	{
		var bPanel = null;
		var panel = this;		
		
		bPanel= {
				xtype: 'panel',
				title: 'Payments',
				bodyBorder: false,
				border: false,
				frame: false,
				autoScroll: true,
				bodyStyle: 'padding: 10px; ',
				bodyCssClass: 'x-citewrite-panel-body',
				buttonAlign: 'left',				
				items: [
						{
							xtype: 'hidden',
							name: 'citation_id',
							value: citation.citation_id
						},
						{
			        		xtype: 'panel',
							id: 'paymentsPages',
							//layout: 'accordion',
							border: false,
							listeners:{
								 render:function(){
									 panel.create_page_payments(citation);
								 }
							},
							tbar:[],
							/*layoutConfig: {
											titleCollapse: true,
											closable: true,
											animate: true
							 }*/
			        	}
						],
						 buttons: [
						           {
						        	   text: 'Refresh',
						        	   handler: function(){
						        		   panel.create_page_payments(citation);
						        	   }
						           }
						 ]
			};
		
		return bPanel;
	},
	create_page_payments: function (citation){
		
		var panelComp = this;
		
		if(typeof Ext.getCmp("paymentsPages").items != "undefined"){
			var pages  = Ext.getCmp("paymentsPages").items.length;
			for(var i = 0; i <= pages;  i++)
			{
				Ext.getCmp("paymentsPages").remove(0, true);
				Ext.getCmp("paymentsPages").doLayout();
			}
		}		
		Ext.Ajax.request({
			url: _contextPath + '/citation/details',
			   params: { citation_id: citation.citation_id, owner_id: citation.owner_id },
			   success: function(response, opts){
				   var data = Ext.decode(response.responseText);
				   if(data.success)
				   {					  
					   var index = 0;
					   var citation = data.citation;
						 Ext.each(data.citation.invoice.items, function(value) {
							var d = new Date();
							var id = d.getTime();			
							var html = new Array('<form action="'+ _contextPath + '/invoice/doRefund" method="post">');
							//$('input[name="submitButton"]').closest("form");
							html.push('<dl class="list">');
							html.push('<input type="hidden" name="invoice_id" value="'+value.invoice_id+'">');
							html.push('<input type="hidden" name="invoice_item_id" value="'+value.invoice_item_id+'">');
							html.push('<input type="hidden" name="citation_id" value="'+citation.citation_id+'">');
							html.push('<input type="hidden" name="owner_id" value="'+citation.owner_id+'">');
							
							if(typeof value.payment_method != "undefined"){
								html.push('<dt>Payment Method</dt>','<dd>'+value.payment_method+'</dd>');
							}
							
							if(typeof value.status != "undefined"){
								html.push('<dt>Status </dt>','<dd>'+value.status+'</dd>');
							}
							
							if(typeof value.amount != "undefined"){
								html.push('<dt>Amount</dt>','<dd>$ '+value.amount+'.00</dd>');
							}
							
							html.push('<dt></dt>','<dd></dd>');
							
							if(typeof value.description != "undefined"){
								html.push('<dt>Description</dt>','<dd>'+value.description+'</dd>');
							}
							if(typeof value.billing_last_name != "undefined"){
								html.push('<dt>Name</dt>','<dd>'+value.billing_first_name+' '+value.billing_last_name+'</dd>');
							}
							if(typeof value.billing_email != "undefined"){
								html.push('<dt>Email</dt>','<dd>'+value.billing_email+'</dd>');
							}										
							if(typeof value.billing_address != "undefined"){
								html.push('<dt>Address</dt>','<dd>'+value.billing_address+'</dd>');
							}
							if(typeof value.billing_city != "undefined"){
								html.push('<dt>City</dt>','<dd>'+value.billing_city+'</dd>');
							}
							if(typeof value.billing_state_id != "undefined"){
								html.push('<dt>State</dt>','<dd>'+value.billing_state_id+'</dd>');
							}
							if(typeof value.billing_zip != "undefined"){
								html.push('<dt>Zip</dt>','<dd>'+value.billing_zip+'</dd>');
							}
							if(typeof value.item_date != "undefined"){
								html.push('<dt>Date</dt>','<dd>'+value.item_date+'</dd>');
							}
							
							html.push('<dt></dt>','<dd></dd>');
							
							if(typeof value.billing_zip != "undefined"){
								html.push('<dt>Credit Card</dt>','<dd>'+value.cc_number+'</dd>');
							}							
							if(typeof value.billing_zip != "undefined"){
								html.push('<dt>Expiration</dt>','<dd>'+value.cc_exp_month+'/'+value.cc_exp_year+'</dd>');
							}		
								
							html.push('</dl>');
							
							if((hasPermission(PL_INVOICE_REFUND_VOIDE)))
							{
								if(value.status != "Voided"){
									html.push('<br><div style="position:relative; float:left; margin-right:15px; padding-bottom: 20px;"><table id="ext-comp-1093" cellspacing="0" class="x-btn x-btn-noicon" style="width: 75px;">'+
											'<tbody class="x-btn-small x-btn-icon-small-left">'+
												'<tr>'+
													'<td class="x-btn-tl"><i>&nbsp;</i></td>'+
													'<td class="x-btn-tc"></td>'+
													'<td class="x-btn-tr"><i>&nbsp;</i></td>'+
													'</tr><tr>'+
													'<td class="x-btn-ml"><i>&nbsp;</i></td>'+
													'<td class="x-btn-mc">'+
														'<em class=" x-unselectable" unselectable="on">'+
															'<button type="button" class="void_button x-btn-text" void-id="'+value.invoice_item_id+'">Void</button>'+
														'</em>'+
													'</td>'+
													'<td class="x-btn-mr"><i>&nbsp;</i></td>'+
													'</tr><tr>'+
													'<td class="x-btn-bl"><i>&nbsp;</i></td>'+
													'<td class="x-btn-bc"></td>'+
													'<td class="x-btn-br"><i>&nbsp;</i></td>'+
												'</tr>'+
											'</tbody>'+
										'</table></div>');
								}else{
									html.push("<br>");
								}
								
								
								html.push('<div style="position:relative; float:left;  padding-bottom: 20px;"><table id="ext-comp-1093" cellspacing="0" class="x-btn x-btn-noicon" style="width: 75px;">'+
											'<tbody class="x-btn-small x-btn-icon-small-left">'+
												'<tr>'+
													'<td class="x-btn-tl"><i>&nbsp;</i></td>'+
													'<td class="x-btn-tc"></td>'+
													'<td class="x-btn-tr"><i>&nbsp;</i></td>'+
													'</tr><tr>'+
													'<td class="x-btn-ml"><i>&nbsp;</i></td>'+
													'<td class="x-btn-mc">'+
														'<em class=" x-unselectable" unselectable="on">'+
															'<button type="button" class="refound_button x-btn-text" refound-id="'+value.invoice_item_id+'">Refoud</button>'+
														'</em>'+
													'</td>'+
													'<td class="x-btn-mr"><i>&nbsp;</i></td>'+
													'</tr><tr>'+
													'<td class="x-btn-bl"><i>&nbsp;</i></td>'+
													'<td class="x-btn-bc"></td>'+
													'<td class="x-btn-br"><i>&nbsp;</i></td>'+
												'</tr>'+
											'</tbody>'+
										'</table></div>');
							}		
														
							
							html.push('</form>');
							
							index = index+1;
							
							var item = new Ext.FormPanel({							    
							    bodyStyle: 'padding-left: 10px;',
							    title: 'Payment '+ index,
							    id: 'tab_payment_'+value.invoice_item_id,
							    border: false,
								autoHeight: false,
								bodyCssClass: 'x-citewrite-panel-body',
								tools:[],
								html:html.join(''),										
							 });
							
							Ext.getCmp("paymentsPages").add(item);
							Ext.getCmp("paymentsPages").doLayout();				
							
						 });
						 
						 panelComp.bindActions();
				   }
				   else
				   {
					   Ext.Msg.show({
   	            	   title:'Error!',
   	            	   msg:  data.msg,
   	            	   buttons: Ext.Msg.OK,
   	            	   icon: Ext.MessageBox.ERROR
   	            	});
				   }											   
			   },
			   failure: function(response, opts){
				   Ext.Msg.show({
	            	   title:'Error!',
	            	   msg:  'Error loading permit information.',
	            	   buttons: Ext.Msg.OK,
	            	   icon: Ext.MessageBox.ERROR
	            	});
			   }
			});
			 
	},
	bindActions: function()
    {
		var panel = this;
    	var container = Ext.get('paymentsPages');
    	var deletes = container.query('.refound_button');
    	Ext.each(deletes, function(button, index){
    		//button.off('click');    		
    		button.on("click", function(){
    	    	
    			var refound_id =this.getAttribute("refound-id");
    	    	var title = "Refund Payment";
    	    	var msg = "Please enter the amount to refund:";
    	    	
    	    	Ext.MessageBox.prompt(title, msg, function(p1, p2){
    				if(p1 == 'ok')
    				{	
    					if(p2.trim() == "" || !(!isNaN(parseFloat(p2)) && isFinite(p2)) || p2 < 0){
    						alert("Invalid Amount.");
    						return false;
    					}
    	    			Ext.Ajax.request({
    	    				url: _contextPath + '/invoice/doRefund',
    	    				   params: { invoice_item_id: refound_id, refund_amount: p2 },
    	    				   success: function(response, opts){
    	    					   var data = Ext.decode(response.responseText);
    	    					   if(data.success)
    	    					   {
    	    						   alert("Success.");
    	    					   }
    	    					   else
    	    					   {
    	    						   Ext.Msg.show({
    	    	   	            	   title:'Error!',
    	    	   	            	   msg:  data.msg,
    	    	   	            	   buttons: Ext.Msg.OK,
    	    	   	            	   icon: Ext.MessageBox.ERROR
    	    	   	            	});
    	    					   }											   
    	    				   },
    	    				   failure: function(response, opts){
    	    					   Ext.Msg.show({
    	    		            	   title:'Error!',
    	    		            	   msg:  'Error loading permit information.',
    	    		            	   buttons: Ext.Msg.OK,
    	    		            	   icon: Ext.MessageBox.ERROR
    	    		            	});
    	    				   }
    	    				});
    				}
    	    	}, this, false, Ext.util.Format.number("", '0.00'));
    	    
    			/*
    			var refound_id = this.getAttribute("refound-id");
    			Ext.Ajax.request({
    				url: _contextPath + '/invoice/doRefund',
    				   params: { invoice_item_id: refound_id },
    				   success: function(response, opts){
    					   var data = Ext.decode(response.responseText);
    					   if(data.success)
    					   {
    						   
    					   }
    					   else
    					   {
    						   Ext.Msg.show({
    	   	            	   title:'Error!',
    	   	            	   msg:  data.msg,
    	   	            	   buttons: Ext.Msg.OK,
    	   	            	   icon: Ext.MessageBox.ERROR
    	   	            	});
    					   }											   
    				   },
    				   failure: function(response, opts){
    					   Ext.Msg.show({
    		            	   title:'Error!',
    		            	   msg:  'Error loading permit information.',
    		            	   buttons: Ext.Msg.OK,
    		            	   icon: Ext.MessageBox.ERROR
    		            	});
    				   }
    				});*/
    		});
    	});
    	
    	
    	/***************************/
    	
    	var voids = container.query('.void_button');
    	Ext.each(voids, function(button, index){
    		//button.off('click');    		
    		button.on("click", function(){
    	    	
    			var void_id = this.getAttribute("void-id");
    			Ext.Ajax.request({
    				url: _contextPath + '/invoice/doVoid',
    				   params: { invoice_item_id: void_id},
    				   success: function(response, opts){
    					   var data = Ext.decode(response.responseText);
    					   if(data.success)
    					   {
    						   alert("Success.");
    					   }
    					   else
    					   {
    						   Ext.Msg.show({
    	   	            	   title:'Error!',
    	   	            	   msg:  data.msg,
    	   	            	   buttons: Ext.Msg.OK,
    	   	            	   icon: Ext.MessageBox.ERROR
    	   	            	});
    					   }											   
    				   },
    				   failure: function(response, opts){
    					   Ext.Msg.show({
    		            	   title:'Error!',
    		            	   msg:  'Error loading permit information.',
    		            	   buttons: Ext.Msg.OK,
    		            	   icon: Ext.MessageBox.ERROR
    		            	});
    				   }
    			});
    	    	
    		});
    	});
    	
    },
			
	getItemAmount: function(items, type)
	{
		//var payments = 0.00;
		for(var i = 0; i < items.length; i++)
		{
			if(items[i].type == type)
			{ 
				//payments = payments + items[i].amount;
				return Ext.util.Format.number(items[i].amount, '0.00');
			}
		}
		
		return  '0.00';
		//return  Ext.util.Format.number(payments, '0.00');
	},
	appealDetails: function(appeal, tabpanel, status)
	{
		if(hasPermission(PL_OWNER_MANAGE|PL_OWNER_VIEW) || hasPermission(PL_CITATION_MANAGE|PL_CITATION_VIEW)){
			
			var panel = this;
			var appHtml = new Array(
					  '<dl class="list">',
					  		'<dt>Appeal Date</dt>',
					  		'<dd>',Ext.util.Format.date(appeal.appeal_date, 'F j, Y g:i A'),'</dd>',
					  		'<dt>Status</dt>',
					  		'<dd id="citation-appeal-status-field">',appeal.status,'</dd>',
					  		'<dt>Appealed By</dt>',
					  		'<dd>',appeal.name,'</dd>',
					  		'<dt>Phone</dt>',
					  		'<dd>',appeal.phone,'</dd>',
					  		'<dt>Address</dt>',
					  		'<dd>',appeal.address,'</dd>',
					  		'<dt>City</dt>',
					  		'<dd>',appeal.city,'</dd>',
					  		'<dt>State</dt>',
					  		'<dd>',appeal.state_id,'</dd>',
					  		'<dt>Zip</dt>',
					  		'<dd>',appeal.zip,'</dd>',
					  		'<dt>Reason</dt>',
					  		'<dd style="height: auto; width: auto;">',appeal.reason,'</dd>'
					  	);
		
			var form = new Ext.form.FormPanel(
					{
						border: false,
						frame: false,
						bodyCssClass: 'x-citewrite-panel-body',
						buttonAlign: 'left',
						autoHeight: true,
		    			defaults: {width: '95%'},
						items:[{
							xtype: 'box',
							html: appHtml
						}]
					});
			
			if(((hasPermission(PL_OWNER_MANAGE) && panel.owner.owner_id >0) || hasPermission(PL_CITATION_MANAGE)) && (status != 'Paid')){
				
				form.add(
						{
						   xtype: 'combo',
						   id: 'appeal-decision-status',
						   hiddenName: 'appeal_decision_status',
						   fieldLabel: 'Status',
						   submitValue: true,
							lazyRender: false,
							store: new Ext.data.ArrayStore({
								autoDestroy: true,
								fields: ['id', 'description'],
								data : [
									['New', 'New'],
									['Under Review', 'Under Review'],
									['Upheld', 'Upheld'],
									['Dismissed', 'Dismissed']
								]
							}),
							displayField: 'description',
							valueField: 'id',
							triggerAction: 'all',
							forceSelection: true,
							mode: 'local',
							allowBlank: false,
							value: appeal.status
						},
						{
							xtype: 'box',
							html: '<div id="appeal-decision-date" style="margin: 0px 0px 5px 105px;">as of '+Ext.util.Format.date(appeal.decision_date, 'F j, Y g:i A')+'</div>'
						},
						{
							xtype: 'textarea',
							id: 'appeal-decision_reason',
							name: 'appeal_decision_reason',
							fieldLabel: 'Reason',
							value: appeal.decision_reason
						}
				);
				
				form.addButton({
					 text: 'Update' 
				  }, function(){
					  this.getForm().submit({
						  url: _contextPath + '/citation/appeal',
		          	    scope: this,
		          	    params: {citation_id: appeal.citation_id, xaction: 'decision'},
		          	    success: function(form, action) {
		          	    	panel.store.reload();
		          	    	
		          	    	var response = Ext.decode(action.response.responseText);
		          	    	if(response.success)
		          	    	{
			            	    	var status = Ext.get('citation-appeal-status-field');
			            	    	if(status != null)
			            	    	{
			            	    		status.update(response.appeal.status);
			            	    	}
			            	    	
			            	    	Ext.get('appeal-decision-date').update('as of ' + Ext.util.Format.date(response.appeal.decision_date, 'F j, Y g:i A'));
			            	    	            	    	
			            	    	Ext.growl.message('Success', 'Appeal has been updated.');
		          	    	}
		          	    	else
		          	    	{
		          	    		Ext.Msg.show({
	            	    			   title:'Error',
	            	    			   msg:  response.msg,
	            	    			   buttons: Ext.Msg.OK,
	            	    			   icon: Ext.MessageBox.ERROR
	            	    		 });
		          	    	}
		          	    },
		          	    failure: function(form, action) {
		          	        switch (action.failureType) {
		          	            case Ext.form.Action.CLIENT_INVALID:
		          	            	Ext.Msg.show({
		          	            	   title:'Error',
		          	            	   msg: 'The fields outlined in red are required.',
		          	            	   buttons: Ext.Msg.OK,
		          	            	   icon: Ext.MessageBox.ERROR
		          	            	});
		          	                break;
		          	            case Ext.form.Action.CONNECT_FAILURE:
		          	            	Ext.Msg.show({
		          	            	   title:'Failure',
		          	            	   msg: 'Ajax communication failed',
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
		          	            	break;
		          	       }
		          	    }
					  });
					  
				  }, form);
				
			}else{
				
				appHtml.push('<dt>Updated</dt>');
				appHtml.push('<dd>',Ext.util.Format.date(appeal.decision_date, 'F j, Y g:i A'),'</dd>');
				appHtml.push('<dt>Response</dt>');
				appHtml.push('<dd>',appeal.decision_reason,'</dd>');			
			}
			
			appHtml.push('</dl><div style="clear: left; margin-bottom: 15px;"></div>');
			appHtml.join('');
			
			tabpanel.add(form);
		}
	},
	editCitation: function(citation_id)
	{
	
		if(_ownerMutex)
		{
			return;
		}
		_ownerMutex = true;
		var panel = this;
		Ext.Ajax.request({
			   url: _contextPath + '/citation/details',
			   params: { citation_id: citation_id, owner_id: this.owner.owner_id, xaction: 'edit'},
			   success: function(response, opts){
				   var data = Ext.decode(response.responseText);
				   if(data.success)
				   {
					   panel.launchEditWindow(data.citation, data.fields, data.prefix);
				   }
				   else
				   {
					   Ext.Msg.show({
      	            	   title:'Error!',
      	            	   msg:  data.msg,
      	            	   buttons: Ext.Msg.OK,
      	            	   icon: Ext.MessageBox.ERROR
      	            	});
				   }											   
			   },
			   failure: function(response, opts){
				   Ext.Msg.show({
	            	   title:'Error!',
	            	   msg:  'Error loading permit information.',
	            	   buttons: Ext.Msg.OK,
	            	   icon: Ext.MessageBox.ERROR
	            	});
			   }
			});
	},
	launchEditWindow: function(citation, fields, prefix)
	{
		var panel = this;
		Ext.QuickTips.init();
		var general = {
				bodyBorder: false,
				border: false,
				frame: false,
				defaultType:'textfield',
				bodyStyle: 'padding: 10px; ',
				bodyCssClass: 'x-citewrite-panel-body',
				defaults: { width: '95%' },
				items: [{
						id: 'edit-citation-number',
						name: 'citation-number',
						value: citation.citation_number,
						allowBlank: false,
						disabled: true,
						fieldLabel: 'Number'
					},{
						id: 'edit-citation-pin',
						name: 'citation-pin',
						value: citation.pin,
						fieldLabel: 'PIN'
					},{
			    	   xtype: 'combo',
			    	   id: 'edit-citation-status',
			    	   hiddenName: 'citation-status',
			    	   fieldLabel: 'Status',
			    	   submitValue: true,
		               width: 165,
					 	lazyRender: false,
					 	store: panel.statusStore,
					    displayField: 'status_name',
					    valueField: 'status_id',
						triggerAction: 'all',
						forceSelection: true,
						mode: 'local',
			            allowBlank: false,
			            listeners: {
						    select: function(combo, record, index) {
						      if(record.data.status_name == 'Community Service'){
						    	  Ext.getCmp('add-community-service-end').show();
						    	  
						    	  Ext.getCmp('filter_citation_reason').hide();
						    	  Ext.getCmp('filter_citation_reason').setValue('');
						      }else {
						    	  Ext.getCmp('add-community-service-end').hide();
						    	  Ext.getCmp('add-community-service-end').setValue('');
						    	  
						    	  if(record.data.status_name == 'WriteOff'){
						    		  Ext.getCmp('filter_citation_reason').show();
						    	  }else {
						    		  Ext.getCmp('filter_citation_reason').hide();
							    	  Ext.getCmp('filter_citation_reason').setValue('');
						    	  }
						      }
						    },
						    'render': {
								scope: this,
								fn: function (field) {
									if(citation.citation_id == 0)
									{
										Ext.getCmp('edit-citation-number').setValue(prefix);
									}
									var storeItems = panel.statusStore.getRange(),
									i = 0, flag = 0;
									

									for(; i<storeItems.length; i++){     
									   if(storeItems[i].get('status_name') == "WriteOff"){
										   flag = 1;
									   }            
									} 
																						
									// load first opotion to combo
									if(!flag){
										var statusVal = Ext.data.Record.create([
												                                   {name: 'status_id', mapping : "status_id", type: 'int'},
												                                   {name: 'status_name',  mapping : "status_name",  type: 'string'},
												                                   {name: 'fee_check',  mapping : "fee_check",  type: 'int'}
																		                                 ]);
										var newData = new statusVal({status_id: 0, status_name: "WriteOff", fee_check: 1});
										//paymentPlanStore.insert(0, newData);
										panel.statusStore.insert(3,newData);
										panel.statusStore.commitChanges();
									}
									
								
								}
							}
						},
			            value: citation.status.status_id
			       },
			       {
			    	   xtype: 'combo',
			    	   hiddenName: 'filter_citation_reason',
			    	   id:'filter_citation_reason',
			    	   fieldLabel: 'Reason',
			    	   submitValue: true,
		               width: 165,
		               hidden:true,
					 	lazyRender: false,
					 	store: new Ext.data.ArrayStore({
					        autoDestroy: true,
					        fields: ['id', 'description'],
					        data : [
					            ['Bad Debt', 'Bad Debt'],
					            ['Sent to collections', 'Sent to collections']
					        ]
					    }),
					    displayField: 'description',
					    valueField: 'id',
						triggerAction: 'all',
						forceSelection: true,
						mode: 'local',
			            allowBlank: true
			       },
  
			       {
			    	   xtype: 'datefield',
						id: 'add-community-service-end',
						name: 'citation-community-service-end',
					    fieldLabel: 'Com. Serv. End Date',
						format: 'Y-m-d H:i:s',
						altFormats: 'M d, Y h:i:s a',
						width:160,
						value: '1970-01-01 00:00:00',											
							format: 'Y-m-d H:i:s',
							altFormats: 'M d, Y h:i:s a',
							renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
						hidden:true
			       }]
			};		
		
				
		if(fields != undefined && fields.length > 0)
		{
			for(var i = 0; i < fields.length; i++)
			{
				var field = fields[i];
				if(field.type == 'list' || field.type == 'database' || field.type == 'codes')
				{
					var combo = {
				    	   xtype: 'combo',
				    	   id: 'edit-citation-'+field.name,
				    	   hiddenName: 'citation-'+field.name,
				    	   fieldLabel: field.label,
				    	   width: 165,
						 	lazyRender: false,
						 	store: new Ext.data.JsonStore({
						        autoDestroy: true,
						        fields: ['id', 'name', 'isOther'],
						        data : field.options
						    }),
						    displayField: 'name',
						    valueField: 'id',
							triggerAction: 'all',
							forceSelection: true,
							mode: 'local',
							submitValue: true,
							allowBlank: (field.required != true),
							tpl: '<tpl for="."><div class="x-combo-list-item">{id} - {name}</div></tpl>'
				       };
					
					if(field.type == 'codes')
					{
						if(field.name == 'violation')
						{
							combo.store = panel.violationStore;
							combo.displayField = 'description';
							combo.valueField = 'codeid';
							combo.tpl = '<tpl for="."><div class="x-combo-list-item">{codeid} - {description}</div></tpl>';
							combo.listeners = {
									select: function(combo, record, index )
									{
										if(record.data.is_overtime == 1)
										{
											Ext.getCmp('edit-citation-violation-start-date').show();
											Ext.getCmp('edit-citation-violation-start-time').show();
											Ext.getCmp('edit-citation-violation-end-date').show();
											Ext.getCmp('edit-citation-violation-end-time').show();
										}
										else
										{
											Ext.getCmp('edit-citation-violation-start-date').hide();
											Ext.getCmp('edit-citation-violation-start-time').hide();
											Ext.getCmp('edit-citation-violation-end-date').hide();
											Ext.getCmp('edit-citation-violation-end-time').hide();
										}
									}
							};
							
							var amount = {
							    	   id: 'edit-citation-violation-amount',
							    	   name: 'citation-violation-amount',
							    	   fieldLabel: "Amount"
							       };
							
							var hideFields = true;
							if(citation != null)
							{
								combo.value = citation.violation_id;
								amount.value = Ext.util.Format.number(citation.violation_amount, '0.00');
								
								var index = this.violationStore.find('codeid', citation.violation_id);
								if(index != -1)
								{
									var viol = this.violationStore.getAt(index);
									if(viol.data.is_overtime == 1)
									{
										hideFields = false;
									}
									
								}
							}
							
							general.items.push(combo);
							general.items.push(amount);
							
							var sDate = {
							    	   xtype: 'datefield',
										id: 'edit-citation-violation-start-date',
										name: 'citation-violation-start-date',
							    	   fieldLabel: 'Chalk Start',
							    	   hidden: hideFields
							    		   
							       };
							
							var sTime = {
							    	   xtype: 'timefield',
										id: 'edit-citation-violation-start-time',
										name: 'citation-violation-start-time',
							    	   fieldLabel: '',
							    	   width: 100,
							    	   hidden: hideFields
							       };
							
							var eDate = {
							    	   xtype: 'datefield',
										id: 'edit-citation-violation-end-date',
										name: 'citation-violation-end-date',
							    	   fieldLabel: 'Chalk End',
							    	   hidden: hideFields
							       };
							
							var eTime = {
							    	   xtype: 'timefield',
										id: 'edit-citation-violation-end-time',
										name: 'citation-violation-end-time',
										fieldLabel: '',
							    	   width: 100,
							    	   hidden: hideFields
							       };
							
							if(citation != null)
							{
								if(citation.violation_start != null)
								{
									sDate.value = Ext.util.Format.date(citation.violation_start, 'm/d/Y');
									sTime.value = Ext.util.Format.date(citation.violation_start, 'g:i A');
								}
								
								if(citation.violation_end != null)
								{
									eDate.value = Ext.util.Format.date(citation.violation_end, 'm/d/Y');
									eTime.value = Ext.util.Format.date(citation.violation_end, 'g:i A');
								}
							}
							
							general.items.push(sDate);
							general.items.push(sTime);
							
							general.items.push(eDate);
							general.items.push(eTime);
						}
						else
						{
							combo.listeners = {
									select: function(combo, record, index )
									{
										if(record.data.isOther)
										{
											Ext.getCmp(combo.id + '-other').show();
										}
										else
										{
											Ext.getCmp(combo.id + '-other').hide();
										}
									}
							};
							var other = {
							    	   id: 'edit-citation-'+field.name+'-other',
							    	   name: 'citation-'+field.name+'-other',
							    	   fieldLabel: '',
							       };
							if(field.name == 'state')
							{
								combo.value = citation.state_id;
								
								var option = this.getFieldOption(field.options, citation.state_id);
								if(option != null && option.isOther)
								{
									other.value = citation.state_description;
									other.hidden = false;
								}
								else
								{
									other.hidden = true;
								}
							}
							else if(field.name == 'make')
							{
								combo.value = citation.make_id;
								var option = this.getFieldOption(field.options, citation.make_id);
								if(option != null && option.isOther)
								{
									other.value = citation.make_description;
									other.hidden = false;
								}
								else
								{
									other.hidden = true;
								}
							}
							else if(field.name == 'color')
							{
								combo.value = citation.color_id;
								var option = this.getFieldOption(field.options, citation.color_id);
								if(option != null && option.isOther)
								{
									other.value = citation.color_description;
									other.hidden = false;
								}
								else
								{
									other.hidden = true;
								}
							}
							else if(field.name == 'location')
							{
								combo.value = citation.location_id;
								var option = this.getFieldOption(field.options, citation.location_id);
								if(option != null && option.isOther)
								{
									other.value = citation.location_description;
									other.hidden = false;
								}
								else
								{
									other.hidden = true;
								}
							}
							else if(field.name == 'comment')
							{
								combo.value = citation.comment_id;
								var option = this.getFieldOption(field.options, citation.comment_id);
								if(option != null && option.isOther)
								{
									other.value = citation.comments;
									other.hidden = false;
								}
								else
								{
									other.hidden = true;
								}
							}
							
							general.items.push(combo);
							general.items.push(other);
						}
					}
					else
					{
						general.items.push(combo);
					}
				}
				else if(field.type == 'text')
				{
					var options = {
					    	   id: 'edit-citation-'+field.name,
					    	   name: 'citation-'+field.name,
					    	   fieldLabel: field.label,
					    	   allowBlank: (field.required != true)
					       };
					if(field.validation.length > 0)
					{
						options.maskRe = new RegExp(field.validation);
					}
					general.items.push(options);
				}
				else
				{
					if(field.name == 'status')
					{
						continue;
					}
					else if(field.name == 'date_time')
					{
						var date = {
						    	   xtype: 'datefield',
									id: 'edit-citation-date',
									name: 'citation-date',
						    	   fieldLabel: 'Date/Time'
						       };
						
						var time = {
						    	   xtype: 'timefield',
									id: 'edit-citation-time',
									name: 'citation-time',
						    	   fieldLabel: '',
						    	   width: 100
						       };
						
						if(citation != null)
						{
							date.value = Ext.util.Format.date(citation.citation_date, 'm/d/Y');
							time.value = Ext.util.Format.date(citation.citation_date, 'g:i A');
						}
						
						general.items.push(date);
						general.items.push(time);						
					} 
					else
					{  		
						var options = {
						    	   id: 'edit-citation-'+field.name,
						    	   name: 'citation-'+field.name,
						    	   fieldLabel: field.label,
						    	   allowBlank: (field.required != true)
						       };
						if(field.validation.length > 0)
						{
							options.maskRe = new RegExp(field.validation);
						}
						
						if(field.name == 'license')
						{
							options.value = citation.license;
							options.regex = new RegExp(/^([0-9|a-zA-Z]){1,8}$/);
							options.regexText = "Invalid license";
						}
						else if(field.name == 'vin')
						{
							options.value = citation.vin;
							options.regex = new RegExp(/^([a-h|j-n|p-zA-H|J-N|P-Z|0-9]){9}[a-h|j-n|p|r-t|v-zA-H|J-N|P|R-T|V-Z|0-9][a-h|j-n|p-zA-H|J-N|P-Z|0-9]([0-9]){6}$/);
							options.regexText = "Invalid VIN";
							
						}
						else if(field.name == 'officer_id')
						{
							options.value = citation.officer_id;
						}
						
						general.items.push(options);
					}
				}
			}
		}
		
		
		
		var title = "New ";
		if(citation.citation_id != 0)
		{
			title = "Edit ";
		}
		
		title += " Citation";
		
		var formPanel = new Ext.form.FormPanel(general);
		var aWindow = new Ext.Window({
	        renderTo: document.body,
	        title: title,
	        width:425,
	        height: 400,
	        plain: true,
	        resizable: true,
	        autoScroll: true,
	        modal: true,
	        id: 'editPermitFormWindow',
	        items: [formPanel],
	        
	        buttons: [{
	            text:'Save',
	            handler: function()
	            {   
	            	if((Ext.getCmp('edit-citation-license').getValue().length>0)||(Ext.getCmp('edit-citation-vin').getValue( ).length>0)){
	            		
	            		
	            		if(Ext.getCmp('edit-citation-status').getValue() == 'Community Service'){
	            			if(Ext.getCmp('add-community-service-end').getValue() == ''){
	            				Ext.Msg.show({
	 	             			   title:'Error!',
	 	             			   msg: 'Com. Serv. End Date required.',
	 	             			   buttons: Ext.Msg.OK,
	 	             			   icon: Ext.MessageBox.ERROR
	 	             			});
	 	            			
	 	            			return false;
	            			}
	            			
	            		}
	            		
	            		if(Ext.getCmp('edit-citation-status').getValue() == 'WriteOff'){
	            			if(Ext.getCmp('filter_citation_reason').getValue() == ''){
	            				Ext.Msg.show({
	 	             			   title:'Error!',
	 	             			   msg: 'Reason required.',
	 	             			   buttons: Ext.Msg.OK,
	 	             			   icon: Ext.MessageBox.ERROR
	 	             			});
	 	            			
	 	            			return false;
	            			}else {
	            				Ext.getCmp('edit-citation-status').setValue(Ext.getCmp('filter_citation_reason').getValue());
	            			}
	            			
	            		}
	            		//validate form 
		            	formPanel.getForm().submit({
		            	    url: _contextPath + '/citation/save',
		            	    scope: this,
		            	    params: {citation_id: citation.citation_id, owner_id: panel.owner.owner_id},
		            	    success: function(form, action) {
		            	    	panel.grid.store.reload();
		            	    	
		            	    	var parent = action.options.scope.findParentByType('window'); 
		            	    	parent.close();
		            	       
		            	    	
		            	    		Ext.growl.message('Success', 'Citation has been updated.');
		            	    	
		            	    },
		            	    failure: function(form, action) {
		            	        switch (action.failureType) {
		            	            case Ext.form.Action.CLIENT_INVALID:
		            	            	Ext.Msg.show({
	            	            		   title:'Error!',
	            	            		   msg: 'The fields outlined in red are required.',
	            	            		   buttons: Ext.Msg.OK,
	            	            		   icon: Ext.MessageBox.ERROR
	            	            		});
		            	                break;
		            	            case Ext.form.Action.CONNECT_FAILURE:
		            	            	Ext.Msg.show({
	            	            		   title:'Failure',
	            	            		   msg: 'Ajax communication failed.',
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
		            	            	break;
		            	       }
		            	    }
		            	});
	            		
	            	}else{
	            		Ext.Msg.show({
            			   title:'Error!',
            			   msg: 'The VIN or license required.',
            			   buttons: Ext.Msg.OK,
            			   icon: Ext.MessageBox.ERROR
            			});
	            	}
	            	
	            }
	        },{
	            text: 'Close',
	            handler: function(){
	            	this.findParentByType('window').close();
	            }
	        }],listeners: {
				close: function()
				{
					_ownerMutex = false;							
				}
			}
	    });
		
		aWindow.show();
		window.setTimeout(setOwnerMutex,500);
		 if(Ext.getCmp('edit-citation-status').getValue() == 'Community Service'){
			 Ext.getCmp('add-community-service-end').show();
			 //var date = citation.community_service_end.slice(0,-2);
			 var value = Ext.util.Format.date(citation.community_service_end, 'Y-m-d H:i:s');
			 Ext.getCmp('add-community-service-end').setValue(value);//
		 }
		 
		 if(Ext.getCmp('edit-citation-status').getValue() == "Bad Debt" || Ext.getCmp('edit-citation-status').getValue() == "Sent to collections"){
			 Ext.getCmp('filter_citation_reason').show();
			 Ext.getCmp('filter_citation_reason').setValue(Ext.getCmp('edit-citation-status').getValue());
			 
			 Ext.getCmp('edit-citation-status').setValue("WriteOff");
		 }
			 

		if(citation != null)
		{			
			if(fields != undefined && fields.length > 0)
			{
				for(var i = 0; i < fields.length; i++)
				{
					var field = fields[i];
					if(field.type == 'list' || field.type == 'text' || field.type == 'database')
					{
						var input = Ext.getCmp('edit-citation-'+field.name);
						
						var attr = panel.getAttributeByName(citation.extra, field.name);
						if(attr != null)
						{
							if(field.type == 'text')
							{
								input.setValue(attr.value);
							}
							else
							{
								input.setValue(attr.value_id);
							}
						}
					}
				}
			}
			
		}//end if vehicle != null
		
	},
	getFieldOption: function(fields, id)
	{
		if(fields != undefined && fields.length > 0)
		{
			for(var i = 0; i < fields.length; i++)
			{
				var field = fields[i];
				if(field.id == id)
				{
					return field;
				}
			}
		}
		
		return null;
	},
	getAttributeByName: function(attributes, name)
	{
		if(attributes != undefined && attributes.length > 0)
		{
			for(var i = 0; i < attributes.length; i++)
			{
				var attr = attributes[i];
				if(attr.field_ref == name)
				{
					return attr;
				}
			}
		}
		
		return null;
	},
	deleteCitation: function(citation)
    {
		  var panel = this;
		  Ext.Msg.confirm("Delete?", "Delete citation "+citation.citation_number+"?", function(bid, p2){
		  if(bid == "yes")
		  {
			  Ext.Ajax.request({
				   url: _contextPath + '/citation/delete',
				   params: { citation_id: citation.citation_id, owner_id: panel.owner.owner_id }, 
				   success: function(p1, p2)
				   {
					   var response = Ext.decode(p1.responseText);
					   if(response.success)
					   {
						   panel.store.reload();
						   Ext.growl.message('Success', 'Citation has been deleted.');
						   
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
						   msg: 'Error deleting the Citation.',
						   buttons: Ext.Msg.OK,
						   icon: Ext.MessageBox.ERROR
						});
					   },
					   scope: this
					}); 
			  }
		  });
	  },//deleteRow
	  clearCitations: function()
	  {
		  var clearFormPanel = new Ext.FormPanel({
				bodyBorder: false,
				border: false,
				frame: false,
				labelAlign: 'top',
				buttonAlign:'center',
				bodyStyle: 'padding: 10px; ',
				autoWidth: true,
				defaults: { width: 160 },
				bodyCssClass: 'x-citewrite-panel-body',
				items:[
				       {
				    	   xtype: 'datefield',
				    	   id: 'citation_clear_start',
				    	   fieldLabel: 'Start Date'
				       },
				       {
				    	   xtype: 'datefield',
				    	   id: 'citation_clear_end',
				    	   fieldLabel: 'End Date'
				       }]
			});
		  
		  var panel = this;
			//device dialog
			var clearDialog = new Ext.Window({
				title: 'Clear Citations',
                renderTo: document.body,
                id: 'clearCitationDialog',
                layout:'fit',
                width:200,
                height:200,
                closeAction:'close',
                plain: true,
                resizable: false,
                modal: true,

                items: clearFormPanel,

                buttons: [{
                    text:'OK',
                    handler: function()
                    {
                    	Ext.Msg.confirm("Delete?", "Delete citations?", function(bid, p2){
              			  if(bid == "yes")
              			  {
	                    	//validate form
	                    	clearFormPanel.getForm().submit({
	                    	    url: _contextPath + '/citation/clear',
	                    	    success: function(form, action) {
	                    	    	clearDialog.close();
	                    	       panel.store.load({params: {start: 0, limit: panel.pageLimit}});
	                    	       Ext.growl.message('Success', 'Citations have been deleted.');
	                    	    },
	                    	    failure: function(form, action) {
	                    	        switch (action.failureType) {
	                    	            case Ext.form.Action.CLIENT_INVALID:
	                    	            	Ext.Msg.show({
	                 						   title:'Failure',
	                 						   msg: 'Form fields may not be submitted with invalid values',
	                 						   buttons: Ext.Msg.OK,
	                 						   icon: Ext.MessageBox.ERROR
	                 						});
	                    	                break;
	                    	            case Ext.form.Action.CONNECT_FAILURE:
	                    	            	Ext.Msg.show({
	                 						   title:'Failure',
	                 						   msg: 'Ajax communication failed',
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
              			  else
              			  {
              				clearDialog.close();
              			  }
                    	});
                    }
                },{
                    text: 'Cancel',
                    handler: function(){
                    	this.findParentByType('window').close();
                    }
                }]
            });
			
			clearDialog.show();
	  },
	  findCA: function(name, extra)
	  {
	  	for(var i = 0; i < extra.length; i++)
	  	{
	  		var ca = extra[i];
	  		if(ca.field_ref == name)
	  		{
	  			return ca;
	  		}
	  	}
	  	
	  	return null;
	  }
	  

});

function setOwnerMutex(){
	_ownerMutex = false;
}