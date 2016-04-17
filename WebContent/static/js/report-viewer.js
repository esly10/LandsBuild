ReportViewerPanel = Ext.extend(Ext.Panel, {
		report: null,
		initComponent: function()
	    {

			var panel = this;
			var buttons = [];
			
			if(hasPermission(PL_REPORT_VIEW)){
			
				//var reportPanel = tabs.find('id', 'Report-' + report_name);
			
			var config = 
			{
				xtype: 'panel',
			    title: 'Reports',
			    id: 'reportab-general-' + panel.report_id,
			    padding: 5,
			    bodyCssClass: 'x-citewrite-panel-body',
			    autoScroll: true,
			    buttonAlign: 'left',
			    autoLoad : { 	url : _contextPath + '/report/reportList', 
			    				scripts : true, 
			    				//params: {report_id: panel.report_id, date: panel.date.value }, 
			    				params: {report_id: panel.report_id, start: panel.start, end: panel.end, year: panel.year, type: panel.type, password: panel.password} },
			    buttons:  buttons
			};
			Ext.apply(this, Ext.apply(this.initialConfig, config));
	        
			ReportViewerPanel.superclass.initComponent.apply(this, arguments);
			
			buttons.push({xtype:'button',
				handler: function(){
					
					Ext.Ajax.request({
						   url: _contextPath + '/report/details',
						   success: function(response, opts){
							   var data = Ext.decode(response.responseText);
							   if(data.success)
							   {
								   editreport(data.report, data.fields, data.types, panel, stateStore);
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
								   msg: 'Error loading report information.',
								   buttons: Ext.Msg.OK,
								   icon: Ext.MessageBox.ERROR
								});
						   },
						   params: { room_id: panel.report.ROOM_ID, xaction: 'get' }
						});
				},
				text: 'Edit'});
		}
			
			
	    }
});

var _reportMutex = false;
function editreport(report, fields, reportTypes, panel, stateStore)
{
	if(_reportMutex)
	{
		return;
	}
	
	_reportMutex = true;
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
					id: 'edit-report-id',
					name: 'report_id',
					value: 0
				},{
			    	   xtype: 'combo',
			    	   id: 'edit-report-status',
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
			    	   id: 'edit-report-type',
			    	   hiddenName: 'type_id',
			    	   fieldLabel: 'Type',
			    	   submitValue: true,
		               width: 165,
					 	lazyRender: false,
					 	store: new Ext.data.JsonStore({
					        autoDestroy: true,
					        fields: ['report_type_id', 'name'],
					        data : reportTypes
					    }),
					    displayField: 'name',
					    valueField: 'report_type_id',
						triggerAction: 'all',
						forceSelection: true,
						mode: 'local',
						allowBlank: false
			       },{
					id: 'edit-report-first-name',
					name: 'first_name',
		    	   fieldLabel: 'First Name',
	               allowBlank: false
		       },{
					id: 'edit-report-last-name',
					name: 'last_name',
		    	   fieldLabel: 'Last Name',
	               allowBlank: false
		       },{
		    	   id: 'edit-report-username',
		    	   name: 'username',
		    	   fieldLabel: 'Username',
		    	   maskRe: /^[0-9A-Za-z]*$/,
	               allowBlank: false
		       },{
					id: 'edit-report-password',
					name: 'password',
		    	   fieldLabel: 'Password'
		       },{
					id: 'edit-report-email',
					name: 'email',
		    	    fieldLabel: 'Email',
					regex: /^([\w\-\'\-]+)(\.[\w-\'\-]+)*@([\w\-]+\.){1,5}([A-Za-z]){2,4}$/,
					regexText:'This field should be an e-mail address in the format "user@example.com"',
					allowBlank: false
		       },{
					id: 'edit-report-home-phone',
					name: 'home_phone',
		    	   fieldLabel: 'Home Phone'
		       },{
					id: 'edit-report-mobile-phone',
					name: 'mobile_phone',
		    	   fieldLabel: 'Mobile Phone'
		       },{
					id: 'edit-report-address',
					name: 'address',
		    	   fieldLabel: 'Address',
				   allowBlank: false
		       },{
					id: 'edit-report-city',
					name: 'city',
		    	   fieldLabel: 'City',
				   allowBlank: false
		       },
		       {
				   xtype: 'combo',
				   id: 'edit-report-state',
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
					id: 'edit-report-state',
					name: 'state',
					fieldLabel: 'State',
					allowBlank: false
		       },*/{
		    	   id: 'edit-report-zip',
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
			    	   id: 'edit-report-'+field.name,
			    	   hiddenName: 'report-extra-'+field.name,
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
				    	   id: 'edit-report-'+field.name,
				    	   name: 'report-extra-'+field.name,
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
	if(report != null)
	{
		title = "Edit ";
	}
	
	title += " report";
	
	var reportWindow = new Ext.Window({
        renderTo: document.body,
        title: title,
        width:325,
        height: 300,
        plain: true,
        resizable: true,
        autoScroll: true,
        modal: true,
        id: 'editreportFormWindow',
        items: formPanel,
        
        buttons: [{
            text:'Save',
            handler: function()
            {   
				//validate form
				formPanel.getForm().submit({
					url: _contextPath + '/report/save',
					scope: this,
					params: ajaxParams,
					success: function(form, action) {
						if(report != null)
						{
							//var reportPanel = Ext.getCmp('reporttab-general-' + report.report_id);
							if(panel != null)
							{
								
								panel.load({url: _contextPath + '/owner/details', scripts : true, params: {room_id: report.report_id }});
							}
						}
						else
						{
							var data = Ext.decode(action.response.responseText);
							//new panel
							var tabs = Ext.getCmp('reporttabs');
							if(tabs != null)
							{
								var reportPanel = new reportTabPanel({report: data.report});
								tabs.add(reportPanel);
								tabs.setActiveTab(reportPanel.id);
								reportPanel.setTitle(data.report.first_name);
							}
						}
						
						var grid = Ext.getCmp('report-list-grid');
						if(grid != null)
						{
							grid.store.reload();
						}
						
						var parent = action.options.scope.findParentByType('window'); 
						parent.close();
					   
						Ext.growl.message('Success', 'report has been updated.');
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
					_reportMutex = false;							
				}
			}
    });
	reportWindow.show();
	window.setTimeout(setreportMutex,500);
	
	if(report != null)
	{
		Ext.getCmp('edit-report-id').setValue(report.report_id);
		Ext.getCmp('edit-report-first-name').setValue(report.first_name);
		Ext.getCmp('edit-report-last-name').setValue(report.last_name);
		Ext.getCmp('edit-report-type').setValue(report.type_id);
		Ext.getCmp('edit-report-status').setValue(report.status);
		Ext.getCmp('edit-report-username').setValue(report.username);
		Ext.getCmp('edit-report-email').setValue(report.email);
		Ext.getCmp('edit-report-home-phone').setValue(report.home_phone);
		Ext.getCmp('edit-report-mobile-phone').setValue(report.mobile_phone);
		Ext.getCmp('edit-report-address').setValue(report.address);
		Ext.getCmp('edit-report-city').setValue(report.city);
		Ext.getCmp('edit-report-state').setValue(report.state_id);
		Ext.getCmp('edit-report-zip').setValue(report.zip);
		
		
		if(fields != undefined && fields.length > 0)
		{
			for(var i = 0; i < fields.length; i++)
			{
				var field = fields[i];
				var input = Ext.getCmp('edit-report-'+field.name);
				
				var attr = getAttributeByName(report.extra, field.name);
				if(attr != null)
				{
					input.setValue(attr.value);
				}
			}
		}
	}//end if report != null
	else
	{
		Ext.getCmp('edit-report-id').setValue(0);
	}
}//end editreport function

function setreportMutex(){
	_reportMutex = false;
}