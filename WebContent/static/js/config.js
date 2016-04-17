Ext.onReady(function(){

	var configuration = Ext.get('nav-settingsw');
	if(configuration != null)
	{
		configuration.on('click',function(){
			
			var topToolbar = new Ext.Toolbar({
	    		buttonAlign: 'right',
	            items:[{
	                text: 'Add Print Layout',
	                cls: 'x-btn-text details',
	                handler: function(btn, event){ addPrintLayout(); }
	                }]
	        });
			
			var title = "Permit File";
			if(IS_CITATION_PAYMENT_ENABLED||IS_MANAGED_PERMITS_ENABLED){
				title = "Managed Permits";
			}
			
			var tabpanelconfig = new Ext.TabPanel({	
				xtype: 'tabpanel',
				id: 'config-tabpanel',
				activeTab: 0,
				border: false,
				frame: false,
				close: function()
				{
					alert('closed');	
				},
				items:[
				   {
						title: 'General',
						id: 'general-config-panel',
						bodyCssClass: 'x-citewrite-panel-body',
						padding: '10px',
						bodyStyle: 'margins:20px 0px 10px 0px',
						autoScroll: false,
						layout: 'fit',
						items: [new GeneralPanel()]
					}, 
					new CiteConfigurationPanel(), 
					{
						title: title,
						id: 'permit-config-panel',
						bodyCssClass: 'x-citewrite-panel-body',
						autoScroll: false,
						layout: 'fit',
						items: [new PermitPanel()]
					},
					{
						title: 'Hotlist File',
						id: 'hotlist-config-panel',
						bodyCssClass: 'x-citewrite-panel-body',
						padding: '10px',
						autoScroll: true,
						autoLoad : { url : _contextPath + '/hotlist/list', scripts : true }
					},
					
					{
						title: 'Codes',
						id: 'codes-config-panel',
						bodyCssClass: 'x-citewrite-panel-body',
						autoScroll: false,
						layout: 'fit',
						items: [new CodesPanel()]
					}
				]
			});
			
			if(IS_CITATION_PAYMENT_ENABLED||IS_MANAGED_PERMITS_ENABLED){		
				
				 try {
					 tabpanelconfig.add({
							title: 'eCommerce',
							id: 'ecommerce-config-panel',
							bodyCssClass: 'x-citewrite-panel-body',
							autoScroll: false,
							layout: 'fit',
							items: [new eCommercePanel()]
				       });

		        }catch(err){
		                
		        }
		            				
				
			}
			
			tabpanelconfig.add(new PrintPanel());
			tabpanelconfig.activate(0);
			
			var content = Ext.getCmp('content-panel');
			content.removeAll(true);
			content.add(
					{
						xtype: 'panel',
						title: 'Settings',
						id: 'config-panel',
						layout: 'fit',
						bodyBorder: false,
						border: false,
						autoScroll: true,
						padding: '0px 0px 0px 0px',
						items: [tabpanelconfig]
					});
			
			content.doLayout();
			
			function addPrintLayout()
			{
				var tabpanel = Ext.getCmp('config-tabpanel');
				var tab = tabpanel.add({
					title: 'Print Layout',
					bodyCssClass: 'x-citewrite-panel-body',
					padding: '10px',
					autoScroll: true,
					closable: true
					/*,autoLoad : { url : _contextPath + '/administration/permit', scripts : true }*/ 
				});
				tabpanel.activate(tab);
			}
		});
	}
});

FileConfiguration = Class.create();
FileConfiguration.prototype = {
	initialize: function(options) 
	{
		this.options = {
			type: 'permit',
			container: null,
			rowCount: 0,
			btnAdd: null,
			path: null,
			mappingSource: null,
			url: null
		};
		
		Object.extend(this.options, options || {});
		
		var object = this;
		this.options.btnAdd.onclick = this.add.bind(this);
		this.doBind();
	},
	doBind: function()
	{
		var object = this;
		this.options.container.select('.btn-up').each(function(div){div.onclick = object.up.bind(object, div);});
		this.options.container.select('.btn-down').each(function(div){div.onclick = object.down.bind(object, div);});
		this.options.container.select('.btn-remove').each(function(div){div.onclick = object.remove.bind(object, div);});
	},
	add: function()
	{
		this.options.rowCount++;
		var html = new Array(
				'<div class="form-row">',
					'<dl class="config-form">',
						'<dt><input type="text" class="x-form-text" style="width: 80%" id="column_name" name="column_name" value="Column" /></dt>',
						'<dd><select class="x-form-select" id="mapping" name="mapping"><option value="">-- None --</option>');
						for(var i = 0; i < this.options.mappingSource.length; i++)
						{
							var field = this.options.mappingSource[i];
							html.push('<option value="',field.columnName,'">',field.label,'</option>');			
						}
						
						html.push('</select></dd><dd class="display-order"><input type="text" class="x-form-text" id="column_display_order" name="column_display_order" value="',this.options.rowCount,'" style="width: 40px;"/></dd>');
						if(this.options.type == 'permit')
						{
							html.push('<dd class="searchable"><input type="checkbox" class="x-form-text" id="column_searchable" name="column_searchable" value="1" /></dd>');
						}
		
						html.push(	'<dd>',
										'<div class="x-tool-btn btn-up" title="Move Column Up"></div>',
										'<div class="x-tool-btn btn-down" title="Move Column Down"></div>',
										'<div class="x-tool-btn btn-remove" title="Remove Column"></div>',
									'</dd>',
								'</dl>',
							'</div>'	
						);
		
		this.options.container.insert(html.join(''));
		this.doBind();
	},
	remove: function(icon)
	{
		var parent = $(icon.parentNode.parentNode.parentNode);
		parent.remove();
	},
	up: function(icon)
	{
		var parent = $(icon.parentNode.parentNode.parentNode);
		var sibling = parent.previous('.form-row');
		if(sibling != undefined)
		{
			parent.remove();
			sibling.insert({before: parent});
		}
	},
	down: function(icon)
	{
		var parent = $(icon.parentNode.parentNode.parentNode);
		var sibling = parent.next('.form-row');
		if(sibling != undefined)
		{
			parent.remove();
			sibling.insert({after: parent});
		}
	},
	save: function(button, event)
	{
		var rows = this.options.container.select('.form-row');
		var data = {action: 'save', count: rows.length};
		var mappingMap = new Object();
		var fieldMap  = new Object();
		var displayMap  = new Object();
		
		if(this.options.path.value.length == 0)
		{
			Ext.Msg.show({
				   title:'Field Error',
				   msg: 'Please enter a file path',
				   buttons: Ext.Msg.OK,
				   icon: Ext.MessageBox.ERROR
				});
			return false;
		}
		data.file_path = this.options.path.value;
		
		for(var i = 0; i < rows.length; i++)
		{
			var row = rows[i];
			var name = (row.select("input[name='column_name']")[0]).value;
			if(name.length == 0)
			{
				Ext.Msg.show({
	 				   title:'Field Error',
	 				   msg: 'Please enter a name for all fields',
	 				   buttons: Ext.Msg.OK,
	 				   icon: Ext.MessageBox.ERROR
	 				});
				return false;
			}
			if(fieldMap[name] == undefined){
				fieldMap[name] = name;
			}else{
				Ext.Msg.show({
	 				   title:'Field Error',
	 				   msg: 'The Field Name is unique',
	 				   buttons: Ext.Msg.OK,
	 				   icon: Ext.MessageBox.ERROR
	 				});
				fieldMap = null;
				return false;
			}
			var order = (row.select("input[name='column_display_order']")[0]).value;
			if(displayMap[order] == undefined){
				displayMap[order] = order;
			}else{
				Ext.Msg.show({
	 				   title:'Field Error',
	 				   msg: 'The display order is unique',
	 				   buttons: Ext.Msg.OK,
	 				   icon: Ext.MessageBox.ERROR
	 				});
				fieldMap = null;
				return false;
			}
			if(order.length == 0)
			{
				Ext.Msg.show({
	 				   title:'Field Error',
	 				   msg: 'Please enter a valid display order for all fields.',
	 				   buttons: Ext.Msg.OK,
	 				   icon: Ext.MessageBox.ERROR
	 				});
				return false;
			}
			var mapping = (row.select("select[name='mapping']")[0]).value;
			if(mapping != ""){
				if(mappingMap[mapping] == undefined){
					mappingMap[mapping] = mapping;
				}else{
					Ext.Msg.show({
		 				   title:'Field Error',
		 				   msg: 'The Citation Mapping is unique',
		 				   buttons: Ext.Msg.OK,
		 				   icon: Ext.MessageBox.ERROR
		 				});
					mappingMap = null;
					return false;
				}
			}
			if(order.length == 0)
			{
				Ext.Msg.show({
	 				   title:'Field Error',
	 				   msg: 'Please enter a valid display order for all fields.',
	 				   buttons: Ext.Msg.OK,
	 				   icon: Ext.MessageBox.ERROR
	 				});
				return false;
			}
			if(isNaN(parseInt(order, 10)))
			{
				Ext.Msg.show({
 				   title:'Field Error',
 				   msg: 'Please enter an integer for the display order for all fields.',
 				   buttons: Ext.Msg.OK,
 				   icon: Ext.MessageBox.ERROR
 				});
				return false;
			}
			
			if(this.options.type == 'permit')
			{
				var searchable = (row.select("input[name='column_searchable']")[0]);
				if(searchable.checked)
				{
					data['searchable_'+i] = 1;
				}
				else
				{
					data['searchable_'+i] = 0;
				}
			}
					
			data['order_'+i] = i+1;
			data['name_'+i] = name;
			data['display_order_'+i] = order;
			data['mapping_value_'+i] = mapping;
		}
		
		Ext.Ajax.request({
			   url: this.options.url,
			   success: function(p1, p2)
			   {
				   var response = Ext.decode(p1.responseText);
				   if(response.success)
				   {
					   Ext.growl.message('Success', 'Configuration has been saved.');
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
			   failure: function()
			   {
				   Ext.Msg.show({
    				   title:'Error',
    				   msg: 'Error saving configuration.',
    				   buttons: Ext.Msg.OK,
    				   icon: Ext.MessageBox.ERROR
    				});
			   },
			   params: data
			});
	}
};
