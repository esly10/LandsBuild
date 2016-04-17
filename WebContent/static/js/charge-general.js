ChargeGeneralPanel = Ext.extend(Ext.Panel, {
		charge: null,
		initComponent: function()
	    {

			var panel = this;
			var buttons = [];
			
			if(hasPermission(PL_CHARGES_VIEW)){
			/*	stateStore = new Ext.data.JsonStore({
					url: _contextPath + '/codes/list',
					root: 'codes',
					id: 'states-store',
			        totalProperty: 'count',
			        remoteSort: true,
			        fields: [
			            'codeid',
			            'description'
			        ],
					sortInfo: {
						field: 'description',
						direction: 'ASC'
					},
					baseParams: {start: 0, limit: 0, type: 'state'},
					autoLoad: true
			    });*/
				
				
			buttons.push({xtype:'button',
				handler: function(){
					rr = new ReservationPanel({'reservation_id': panel.charge.rr_reservation_id});
					rr.showPaymentWindow();
					
				},
				text: 'Pay'},
				
				{xtype:'button',
					
					handler: function(){
						
		            	var room_id = panel.charge.room_id;
		            	var date = panel.date.value;
		    			var body = Ext.getBody();
		    			var frame = Ext.get('hiddenform-iframe');
		    			if(frame != undefined)
		    			{
		    				frame.remove();
		    			}
		    			
		    			frame = body.createChild({
		    		        tag: 'iframe',
		    		        cls: 'x-hidden',
		    		        id: 'hiddenform-iframe',
		    		        method: 'get',
		    		        name: 'hidden-iframe',
		    		       
		    				scripts : true, 
		    		        src: _contextPath + "/rooms/exportPDF?room_id="+ room_id + "&date=" + date
		    		      });    		
		    		
		            },text: 'Export'});
					
				/*	handler: function(){
						
						Ext.Ajax.request({
							   url: _contextPath + '/rooms/exportPdf',
							   success: function(response, opts){
								   var data = Ext.decode(response.responseText);
								   if(data.success)
								   {
									   editcharge(data.charge, data.fields, data.types, panel, stateStore);
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
									   msg: 'Error loading charge information.',
									   buttons: Ext.Msg.OK,
									   icon: Ext.MessageBox.ERROR
									});
							   },
							   params: { room_id: panel.charge.room_id, xaction: 'get'}
							});
					},*/
					
		}
			
			
			var config = 
			{
				xtype: 'panel',
			    //title: 'Charges',
			    id: 'chargetab-general-' + panel.charge.room_id,
			    padding: 5,
			    bodyCssClass: 'x-citewrite-panel-body',
			    autoScroll: true,
			    buttonAlign: 'left',
			    autoLoad : { url : _contextPath + '/rooms/details', scripts : true, params: {room_id: panel.charge.room_id, date: panel.date.value } },
			    buttons:  buttons
			};
			Ext.apply(this, Ext.apply(this.initialConfig, config));
	        
			ChargeGeneralPanel.superclass.initComponent.apply(this, arguments);
			
	    }
});

var _chargeMutex = false;
function editcharge(charge, fields, chargeTypes, panel, stateStore)
{
	if(_chargeMutex)
	{
		return;
	}
	
	_chargeMutex = true;
	var general = {
			xtype: 'panel',
			layout: 'form',
			title: 'General',
			bodyBorder: false,
			border: false,
			frame: false,
			defaultType:'textfield',
			bodyStyle: 'padding: 10px; ',
			bodyCssClass: 'x-citewrite-panel-body',
			defaults: { width: '95%' },
			items: [{
					xtype: 'hidden',
					id: 'edit-charge-id',
					name: 'charge_id',
					value: 0
				},{
			    	   xtype: 'combo',
			    	   id: 'edit-charge-status',
			    	   hiddenName: 'status',
			    	   fieldLabel: 'Status',
			    	   submitValue: true,
		               width: 165,
					 	lazyRender: false,
					 	store: new Ext.data.ArrayStore({
					        autoDestroy: true,
					        fields: ['id', 'description'],
					        data : [
					            ['Active', 'Active'],
					            ['Inactive', 'Inactive'],
					            ['Pending', 'Pending']
					        ]
					    }),
					    displayField: 'description',
					    valueField: 'id',
						triggerAction: 'all',
						forceSelection: true,
						mode: 'local',
						allowBlank: false
			       },{
			    	   xtype: 'combo',
			    	   id: 'edit-charge-type',
			    	   hiddenName: 'type_id',
			    	   fieldLabel: 'Type',
			    	   submitValue: true,
		               width: 165,
					 	lazyRender: false,
					 	store: new Ext.data.JsonStore({
					        autoDestroy: true,
					        fields: ['charge_type_id', 'name'],
					        data : chargeTypes
					    }),
					    displayField: 'name',
					    valueField: 'charge_type_id',
						triggerAction: 'all',
						forceSelection: true,
						mode: 'local',
						allowBlank: false
			       },{
					id: 'edit-charge-first-name',
					name: 'first_name',
		    	   fieldLabel: 'First Name',
	               allowBlank: false
		       },{
					id: 'edit-charge-last-name',
					name: 'last_name',
		    	   fieldLabel: 'Last Name',
	               allowBlank: false
		       },{
		    	   id: 'edit-charge-username',
		    	   name: 'username',
		    	   fieldLabel: 'Username',
		    	   maskRe: /^[0-9A-Za-z]*$/,
	               allowBlank: false
		       },{
					id: 'edit-charge-password',
					name: 'password',
		    	   fieldLabel: 'Password'
		       },{
					id: 'edit-charge-email',
					name: 'email',
		    	    fieldLabel: 'Email',
					regex: /^([\w\-\'\-]+)(\.[\w-\'\-]+)*@([\w\-]+\.){1,5}([A-Za-z]){2,4}$/,
					regexText:'This field should be an e-mail address in the format "user@example.com"',
					allowBlank: false
		       },{
					id: 'edit-charge-home-phone',
					name: 'home_phone',
		    	   fieldLabel: 'Home Phone'
		       },{
					id: 'edit-charge-mobile-phone',
					name: 'mobile_phone',
		    	   fieldLabel: 'Mobile Phone'
		       },{
					id: 'edit-charge-address',
					name: 'address',
		    	   fieldLabel: 'Address',
				   allowBlank: false
		       },{
					id: 'edit-charge-city',
					name: 'city',
		    	   fieldLabel: 'City',
				   allowBlank: false
		       },
		       {
				   xtype: 'combo',
				   id: 'edit-charge-state',
				   hiddenName: 'state',
				   name: 'state',
				   fieldLabel: 'State',
				   submitValue: true,
			       width: 165,
				 	lazyRender: false,
				 	store: stateStore,
				    displayField: 'description',
				    valueField: 'codeid',
					triggerAction: 'all',
					forceSelection: true,
					mode: 'local'
			   },
		       /*{
					id: 'edit-charge-state',
					name: 'state',
					fieldLabel: 'State',
					allowBlank: false
		       },*/{
		    	   id: 'edit-charge-zip',
		    	   name: 'zip',
		    	   fieldLabel: 'Zip',
		    	   maskRe: /^[0-9-]*$/,
				   allowBlank: false
		       }]
		};
	
	var additional = {
			xtype: 'panel',
			layout: 'form',
			title: 'Additional',
			bodyBorder: false,
			border: false,
			frame: false,
			defaultType:'textfield',
			bodyStyle: 'padding: 10px; ',
			bodyCssClass: 'x-citewrite-panel-body',
			autoWidth: true,
			defaults: { width: '95%' },
			items: []
	};
	
	if(fields != undefined && fields.length > 0)
	{
		for(var i = 0; i < fields.length; i++)
		{
			var field = fields[i];
			if(field.type == 'list' || field.type == 'database')
			{
				additional.items.push({
			    	   xtype: 'combo',
			    	   id: 'edit-charge-'+field.name,
			    	   hiddenName: 'charge-extra-'+field.name,
			    	   fieldLabel: field.label,
			    	   width: 165,
					 	lazyRender: false,
					 	store: new Ext.data.JsonStore({
					        autoDestroy: true,
					        fields: ['id', 'name'],
					        data : field.options
					    }),
					    displayField: 'name',
					    valueField: 'id',
						triggerAction: 'all',
						forceSelection: true,
						mode: 'local',
						submitValue: true,
						allowBlank: (field.required != true)
			       });
			}
			else //text
			{
				var options = {
				    	   id: 'edit-charge-'+field.name,
				    	   name: 'charge-extra-'+field.name,
				    	   fieldLabel: field.label,
							allowBlank: (field.required != true)
				       };
				if(field.validation.length > 0)
				{
					options.maskRe = new RegExp(field.validation);
				}
				additional.items.push(options);
			}
		}
	}
	
			
	var formPanel = new Ext.form.FormPanel({
		xtype: 'form',
		border: false,
		frame: false,
		bodyBorder: false,
		autoHeight: true,
		items: [{
				xtype: 'tabpanel',
				autoWidth: true,
				activeTab: 0,
				border: false,
				frame: false,
				deferredRender: false,
				defaults: {autoHeight: true, autoScroll: true},
				items: [general, additional]
			}]
		});
  
	var ajaxParams = {};
	var title = "Add ";
	if(charge != null)
	{
		title = "Edit ";
	}
	
	title += " charge";
	
	var chargeWindow = new Ext.Window({
        renderTo: document.body,
        title: title,
        width:325,
        height: 300,
        plain: true,
        resizable: true,
        autoScroll: true,
        modal: true,
        id: 'editchargeFormWindow',
        items: formPanel,
        
        buttons: [{
            text:'Save',
            handler: function()
            {   
				//validate form
				formPanel.getForm().submit({
					url: _contextPath + '/charge/save',
					scope: this,
					params: ajaxParams,
					success: function(form, action) {
						if(charge != null)
						{
							//var chargePanel = Ext.getCmp('chargetab-general-' + charge.charge_id);
							if(panel != null)
							{
								
								panel.load({url: _contextPath + '/owner/details', scripts : true, params: {room_id: charge.charge_id }});
							}
						}
						else
						{
							var data = Ext.decode(action.response.responseText);
							//new panel
							var tabs = Ext.getCmp('chargetabs');
							if(tabs != null)
							{
								var chargePanel = new chargeTabPanel({charge: data.charge});
								tabs.add(chargePanel);
								tabs.setActiveTab(chargePanel.id);
								chargePanel.setTitle(data.charge.first_name);
							}
						}
						
						var grid = Ext.getCmp('charge-list-grid');
						if(grid != null)
						{
							grid.store.reload();
						}
						
						var parent = action.options.scope.findParentByType('window'); 
						parent.close();
					   
						Ext.growl.message('Success', 'charge has been updated.');
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
        }],listeners: {
				close: function()
				{
					_chargeMutex = false;							
				}
			}
    });
	chargeWindow.show();
	window.setTimeout(setchargeMutex,500);
	
	if(charge != null)
	{
		Ext.getCmp('edit-charge-id').setValue(charge.charge_id);
		Ext.getCmp('edit-charge-first-name').setValue(charge.first_name);
		Ext.getCmp('edit-charge-last-name').setValue(charge.last_name);
		Ext.getCmp('edit-charge-type').setValue(charge.type_id);
		Ext.getCmp('edit-charge-status').setValue(charge.status);
		Ext.getCmp('edit-charge-username').setValue(charge.username);
		Ext.getCmp('edit-charge-email').setValue(charge.email);
		Ext.getCmp('edit-charge-home-phone').setValue(charge.home_phone);
		Ext.getCmp('edit-charge-mobile-phone').setValue(charge.mobile_phone);
		Ext.getCmp('edit-charge-address').setValue(charge.address);
		Ext.getCmp('edit-charge-city').setValue(charge.city);
		Ext.getCmp('edit-charge-state').setValue(charge.state_id);
		Ext.getCmp('edit-charge-zip').setValue(charge.zip);
		
		
		if(fields != undefined && fields.length > 0)
		{
			for(var i = 0; i < fields.length; i++)
			{
				var field = fields[i];
				var input = Ext.getCmp('edit-charge-'+field.name);
				
				var attr = getAttributeByName(charge.extra, field.name);
				if(attr != null)
				{
					input.setValue(attr.value);
				}
			}
		}
	}//end if charge != null
	else
	{
		Ext.getCmp('edit-charge-id').setValue(0);
	}
}//end editcharge function

function setchargeMutex(){
	_chargeMutex = false;
}
