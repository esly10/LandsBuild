Ext.onReady(function(){
	
	var pageLimit = 50;
	var adminLookup = Ext.get('nav-reservation');
	if(adminLookup != null)
	{
		adminLookup.on('click',function(){
		    // create the Data Store
		    var store = new Ext.data.JsonStore({
				url: _contextPath + '/history/lookups',
				root: 'lookups',
		        totalProperty: 'count',
		        remoteSort: true,
		        fields: [ 'lookup_id', 'license', 'vin', 'state', 'user_id', 'user_name', 'lookup_date'],
		        autoLoad: {params: {start: 0, limit: pageLimit}},
		        sortInfo: {
		            field: 'lookup_date',
		            direction: 'DESC' // or 'DESC' (case sensitive for local sorting)
		        }
		    });

		    var toolbar = {
		            pageSize: pageLimit,
		            store: store,
		            displayInfo: true,
		            displayMsg: 'Displaying lookups {0} - {1} of {2}',
		            emptyMsg: "No lookups to display"
		        };
		    
		    
		    if(hasPermission(PL_ADMIN))
		    {
		    	toolbar.items = ['-', {
		                text: 'Clear History',
		                cls: 'x-btn-text details',
		                handler: function(btn, event){ clearHistory(); }
		                }];
		    }
		    
		    var columnModel = new Ext.grid.ColumnModel({
		        defaults: { sortable: true }
		        ,columns:[{
		            header: "License",
		            dataIndex: 'license',
		            width: 75
		        }
		        ,{
		            header: "VIN",
		            dataIndex: 'vin',
		            width: 100
		        },{
		            header: "User",
		            dataIndex: 'user_name',
		            width: 75
		        },{
		            header: "Date",
		            dataIndex: 'lookup_date',
		            width: 100
		        }]});
		    
		    var grid = new Ext.grid.GridPanel({
		        store: store,
		        trackMouseOver:false,
		        disableSelection:false,
		        frame: false,
		        border: false,
		
		        // grid columns
		        colModel: columnModel,
		
		        // customize view config
		        layout: 'fit',
		        viewConfig: { forceFit:true },
		
		        // paging bar on the bottom
		        bbar: new Ext.PagingToolbar(toolbar),
		        loadMask: true,
		        autoScroll: true
		    });
		    
		    var _selectedRow = null;
		    var _contextMenu = new Ext.menu.Menu({
		      id: 'GridContextMenu',
		      items: [
				  { text: 'Delete', handler: deleteRow }
		      ]
		   }); 
		    
		    if(_isAdmin){
			    grid.addListener('rowcontextmenu', onGridContextMenu);
		    }
		    
		    function onGridContextMenu(grid, rowIndex, e) {
				e.stopEvent();
				var coords = e.getXY();
				_contextMenu.rowRecord = grid.store.getAt(rowIndex);
				grid.selModel.selectRow(rowIndex);
				_selectedRow=rowIndex;
				_contextMenu.showAt([coords[0], coords[1]]);
			  }
			  	  
			  function deleteRow()
			  {
				  var lookup = _contextMenu.rowRecord.data;
				  Ext.Msg.confirm("Delete?", "Delete lookup entry?", function(bid, p2){
					  if(bid == "yes")
					  {
						  Ext.Ajax.request({
							   url: _contextPath + '/history/lookup',
							   success: function(p1, p2)
							   {
								   var response = Ext.decode(p1.responseText);
								   if(response.success)
								   {
									   store.reload();
									   Ext.growl.message('Success', 'Lookup entry has been deleted.');									   
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
		            				   msg: 'Error deleting lookup entry.',
		            				   buttons: Ext.Msg.OK,
		            				   icon: Ext.MessageBox.ERROR
		            				});
							   },
							   params: { xaction: 'delete', lookup_id: lookup.lookup_id }
							}); 
					  }
				  });
			  }//deleteRow
			  
			  function clearHistory()
			  {
				  Ext.getCmp('clearFormPanel').getForm().reset();
				  clearHistoryDialog.show();
			  }
			  
			  var filterForm = new Ext.FormPanel({
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
					items:[
					       {
					    	   id: 'filter_license',
					    	   fieldLabel: 'License'
					       },
					       {
					    	   id: 'filter_vin',
					    	   fieldLabel: 'VIN'
					       },
					       {
					    	   id: 'filter_user',
					    	   fieldLabel: 'User'
					       },
					       {
					    	   id: 'filter_date',
					    	   fieldLabel: 'Date',
					    	   xtype: 'datefield'
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
			}); //filterForm
			  
			  var content = Ext.getCmp('content-panel');
				content.removeAll(true);
				
				content.add({
						xtype: 'panel',
						title: 'Lookup History',
						layout:'border',
						border: false,
						bodyCssClass: 'x-citewrite-border-ct',
						defaults: {
						    collapsible: true,
						    split: true,
						    layout: 'fit'
						},

						items: [{
							
							collapsible: false,
						    region:'center',
						    margins: '5 0 5 5',
							items: [grid]
						},
						{
							title: 'Filter',
							region:'east',
							margins: '5 5 5 0',
							width: 200,
							items: [filterForm]
						}]
					});
				content.doLayout();
				
				
				var clearHistoryDialog = Ext.getCmp('clearHistoryDialog');
				if(!clearHistoryDialog)
				{
				var clearFormPanel = new Ext.FormPanel({
					bodyBorder: false,
					border: false,
					frame: false,
					labelAlign: 'top',
					buttonAlign:'center',
					bodyStyle: 'padding: 10px; ',
					autoWidth: true,
					id: 'clearFormPanel',
					defaults: { width: 160 },
					bodyCssClass: 'x-citewrite-panel-body',
					items:[
					       {
					    	   xtype: 'datefield',
					    	   id: 'clear_start',
					    	   fieldLabel: 'Start Date'
					       },
					       {
					    	   xtype: 'datefield',
					    	   id: 'clear_end',
					    	   fieldLabel: 'End Date'
					       }]
				});
			  
				//device dialog
				clearHistoryDialog = new Ext.Window({
					title: 'Clear History',
	                renderTo: document.body,
	                id: 'clearHistoryDialog',
	                layout:'fit',
	                width:200,
	                height:200,
	                closeAction:'hide',
	                plain: true,
	                resizable: false,
	                modal: true,

	                items: clearFormPanel,

	                buttons: [{
	                    text:'OK',
	                    handler: function()
	                    {
	                    	//validate form
	                    	clearFormPanel.getForm().submit({
	                    	    url: _contextPath + '/history/lookup',
	                    	    params: {
	                    	        xaction: 'clear'
	                    	    },
	                    	    success: function(form, action) {
	                    	    	clearHistoryDialog.hide();
	                    	    	store.reload({params: {start: 0, limit: pageLimit}});
	                    	    	Ext.growl.message('Success', 'Lookup history has been cleared.');
	                    	       
	                    	    },
	                    	    failure: function(form, action) {
	                    	        switch (action.failureType) {
	                    	            case Ext.form.Action.CLIENT_INVALID:
	                    	                Ext.growl.message('Failure', 'Form fields may not be submitted with invalid values');
	                    	                break;
	                    	            case Ext.form.Action.CONNECT_FAILURE:
	                    	                Ext.growl.message('Failure', 'Ajax communication failed');
	                    	                break;
	                    	            case Ext.form.Action.SERVER_INVALID:
	                    	               Ext.growl.message('Failure', action.result.msg);
	                    	       }
	                    	    }
	                    	});
	                    }
	                },{
	                    text: 'Cancel',
	                    handler: function(){
	                    	clearHistoryDialog.hide();
	                    }
	                }]
	            });
			}//end clearDialog
		});//end onclick
	} //end if
	  
});
