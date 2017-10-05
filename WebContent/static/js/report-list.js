Ext.onReady(function(){

	var pageLimit = 50;
	var manageReports = Ext.get('nav-reports');
	if(manageReports != null)
	{
		manageReports.on('click', function(){
			
			var dataStore = new Ext.data.Store({
				data:[
				[1,"Expected"],
				[2,"Marketing" ],
				[3,"Groups"],
				[4,"Collection"],
				[5,"Meal Plan"],
				[6,"Payments"],
				[7,"Statuses"],
				[8,"Ocupancy"],
				[9,"HouseKeeper"]
				],
				reader: new Ext.data.ArrayReader( { id: 'id' },	['id',  'Name',]) 
			}) ;
			
			var yearStore = new Ext.data.Store({
				 data: [
				        [2010, "2010"],[2011, "2011"],[2012, "2012"],[2013, "2013"],[2014, "2014"],[2015, "2015"],[2016, "2016"],
				        [2017, "2017"],[2018, "2018"],[2019, "2019"],[2020, "2020"],[2021, "2021"],[2022, "2022"],[2023, "2023"],
				        [2024, "2024"],[2025, "2025"],[2026, "2026"],[2027, "2027"],[2028, "2028"],[2029, "2029"],[2030, "2030"]
				        ],
				reader: new Ext.data.ArrayReader( { id: 'id' },	['id',  'Name',]) 
			}) ;
			
			/*var payTypeStore = new Ext.data.Store({
				 data: [[1, "Credit Card"],[2, "Transaction"],[3, "Check"],[4, "Cash"],[5, "Other"],[6, "All"]],
				reader: new Ext.data.ArrayReader( { id: 'id' },	['id',  'Name',]) 
			}) ;*/
			
			var payTypeStore = new Ext.data.JsonStore({
				root: 'method',
				url: _contextPath + '/report/paymentTypeList',
				totalProperty: 'count',
				fields: [ 'payment_method_id','payment_method_description'],
				remoteSort: true,
				autoLoad: true,
				sortInfo: {
						field: 'payment_method_id',
						direction: 'ASC'
					}

			});
			
			
			var ReportList = function(viewer, config) {
			    this.viewer = viewer;
			    Ext.apply(this, config);
			
			    this.store = dataStore,
			    this.colModel = new Ext.grid.ColumnModel({
			        defaults: {
			            width: 150,
			            sortable: true
			        },
			        columns: [
			            {header: '', sortable: true, dataIndex: 'id', width: 48, 
			            	renderer : function(value, meta, dataStore) {
			            	    if(dataStore.data.id == 1) {
			            	        meta.style = "background-color:#f0359d; background-image: url("+_rootContextPath+"/static/images/ocupancy-report.png); background-repeat: no-repeat; background-position: center;  height:50px;";
			            	    } else if(dataStore.data.id == 2) {
			            	    	meta.style = "background-color:#35a0f0; background-image: url("+_rootContextPath+"/static/images/marketing-report.png);  background-repeat: no-repeat; background-position: center;  height:50px;"; 
			            	    	
			            	    }else if(dataStore.data.id == 3) {  
			            	    	meta.style = "background-color:#49e34c; background-image: url("+_rootContextPath+"/static/images/group-report.png);  background-repeat: no-repeat; background-position: center;  height:50px;"; 
			            	    }else if(dataStore.data.id == 4) {
			            	    	meta.style = 	"background-color:#f4dc49; background-image: url("+_rootContextPath+"/static/images/payment-report.png); background-repeat: no-repeat; background-position: center;  height:50px;";
			            	    }else if(dataStore.data.id == 5) {
			            	    	meta.style = "background-color:#9838fd; background-image: url("+_rootContextPath+"/static/images/meal-report.png);  background-repeat: no-repeat; background-position: center;  height:50px;";
			            	    }else if(dataStore.data.id == 6) {
			            	    	meta.style = "background-color:#f03535; background-image: url("+_rootContextPath+"/static/images/security-report.png); background-repeat: no-repeat; background-position: center;  height:50px;";
			            	    }else if(dataStore.data.id == 7) {
			            	    	meta.style = "background-color:#16df9d; background-image: url("+_rootContextPath+"/static/images/status-report.png);  background-repeat: no-repeat; background-position: center;  height:50px;";
			            	    }else if(dataStore.data.id == 8) {
			            	    	meta.style = "background-color:#fd8838; background-image: url("+_rootContextPath+"/static/images/monthly-report.png); background-repeat: no-repeat; background-position: center;  height:50px;";
			            	    }else if(dataStore.data.id == 9) {
			            	    	meta.style = "background-color:#002db3; background-image: url("+_rootContextPath+"/static/images/cleaner-report.png); background-repeat: no-repeat; background-position: center;  height:50px;";
			            	    }else{
			            	    	meta.style = "background-color:gray; background-image: url(/"+_rootContextPath+"/static/images/monthly-report.png); background-repeat: no-repeat; background-position: center;  height:50px;";
			            	    }
			            	}		           
			            },{header: 'Name', sortable: true, dataIndex: 'Name',
			            	
			            }
			        ]
			    });
			    this.viewConfig = {
			        forceFit: true
			    };
			
			    ReportList.superclass.constructor.call(this, 
			    {
			        region: 'center',
			        id: 'report-list-grid',
			        loadMask: {msg:'Loading Report...'},
			
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
			
			Ext.extend(ReportList, Ext.grid.GridPanel, {
	            hideHeaders:true, 
			    listeners:{
			    	rowdblclick: function(grid, index, event )
			    	{
			    		//Ext.getCmp("filterRegion").collapse();
			    		var record = grid.getStore().getAt(index);
			    		Ext.getCmp("report_id").setValue(record.data.id);
			    		Ext.getCmp("report_name").setValue(record.data.Name);
			    		if(record.data.id== 4 || record.data.id== 7 ){
			    			Ext.getCmp("filterRegion").expand();
			    			Ext.getCmp("filter_start").hide();
				    		Ext.getCmp("filter_end").hide();
				    		Ext.getCmp("filter_year").hide();
				    		Ext.getCmp("filter_pay").hide();
				    		Ext.getCmp("filter_pdf").hide();
				    		Ext.getCmp("filter_button").show();
				    		Ext.getCmp("filter_pdf").hide();
				    		Ext.getCmp("filter_password").hide();				    		
			    		}else if(record.data.id== 1 || record.data.id== 2 ){
			    			Ext.getCmp("filterRegion").expand();
			    			Ext.getCmp("filter_start").show();
				    		Ext.getCmp("filter_end").show();
				    		Ext.getCmp("filter_year").hide();
				    		Ext.getCmp("filter_pay").hide();
				    		Ext.getCmp("filter_button").show();
				    		Ext.getCmp("filter_pdf").hide();
				    		Ext.getCmp("filter_password").hide();
			    		}else if(record.data.id== 3 || record.data.id== 5){
			    			Ext.getCmp("filterRegion").expand();
			    			Ext.getCmp("filter_start").show();
				    		Ext.getCmp("filter_end").hide();
				    		Ext.getCmp("filter_year").hide();
				    		Ext.getCmp("filter_pay").hide();
				    		Ext.getCmp("filter_button").show();
				    		Ext.getCmp("filter_pdf").hide();
				    		Ext.getCmp("filter_password").hide();
			    		}if(record.data.id== 6){
			    			Ext.getCmp("filterRegion").expand();
			    			Ext.getCmp("filter_start").show();
				    		Ext.getCmp("filter_end").show();
				    		Ext.getCmp("filter_year").hide();
				    		Ext.getCmp("filter_pay").show();
				    		Ext.getCmp("filter_pay").setValue(7);
				    		Ext.getCmp("filter_button").show();
				    		Ext.getCmp("filter_pdf").hide();
				    		Ext.getCmp("filter_password").show();
				    		Ext.getCmp("filter_password").setValue("");
			    		}else if(record.data.id== 8){
			    			Ext.getCmp("filterRegion").expand();
			    			Ext.getCmp("filter_start").hide();
				    		Ext.getCmp("filter_end").hide();
				    		Ext.getCmp("filter_year").show();
				    		Ext.getCmp("filter_pay").hide();
				    		Ext.getCmp("filter_button").show();
				    		Ext.getCmp("filter_pdf").hide();
				    		Ext.getCmp("filter_password").hide();
			    		}else if(record.data.id== 9){
			    			Ext.getCmp("filterRegion").expand();
			    			Ext.getCmp("filter_start").show();
				    		Ext.getCmp("filter_end").hide();
				    		Ext.getCmp("filter_year").hide();
				    		Ext.getCmp("filter_pay").hide();
				    		Ext.getCmp("filter_button").show();
				    		Ext.getCmp("filter_pdf").hide();
				    		Ext.getCmp("filter_password").hide();
			    		}
			    		
			    	}
			    }
			});
			//myDateField.setValue(new Date());
				
			 var filterForm = new Ext.FormPanel({
					bodyBorder: false,
					border: false,
					region:'west',
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
					            fieldLabel: 'Start',
					            emptyText:"Now",
					            value: '',
					            hidden: true,
					            enableKeyEvents: true,
					            format: 'Y-m-d',
								submitFormat: 'Y-m-d',
								submitValue : true,
								altFormats: 'Y-m-d',
								width: 150,
								anchor: "90%",
								id: 'filter_start',
								name: 'filter_start',
								renderer: Ext.util.Format.dateRenderer('Y-m-d'),
								listeners : {
									 render : function(datefield) {
									        datefield.setValue(new Date());
									  },
									  select: function (t,n,o) {
										  Ext.getCmp('filter_end').setValue(t.value);
									   }
								}
							   
							
							},{
								xtype: 'datefield',
					            fieldLabel: 'End',
					            emptyText:"Now",
					            value: '',
					            hidden: true,
					            enableKeyEvents: true,
					            format: 'Y-m-d',
					            dateFormat: 'Y-m-d',
					            submitFormat: 'Y-m-d H:i:s',
								submitValue : true,
								altFormats: 'Y-m-d',
								width: 150,
								anchor: "90%",
								id: 'filter_end',
								name: 'filter_end',
								listeners : {
								    render : function(datefield) {
								        datefield.setValue(new Date());
								    }
								}
								
								},{
								 	   xtype: 'combo',
							    	   hiddenName: 'filter_year',
							    	   id: 'filter_year',
									   name: 'filter_year',
							    	   fieldLabel: 'Year',
							    	   hidden: true,
							    	   submitValue: true,
							    	   typeAhead: true,
							    	   triggerAction: 'all',
							    	   lazyRender:true,
							    	   mode: 'local',
							    	   autoload: true,
							    	   store: yearStore,
									    valueField: 'id',
									    displayField: 'Name',
								    	anchor:'90%',
						            	allowBlank: true,
						                forceSelection: false
								},{
								 	   xtype: 'combo',
							    	   hiddenName: 'filter_pay',
							    	   id: 'filter_pay',
									   name: 'filter_pay',
							    	   fieldLabel: 'Pay Type',
							    	   hidden: true,
							    	   submitValue: true,
							    	   typeAhead: true,
							    	   triggerAction: 'all',
							    	   lazyRender:true,
							    	   mode: 'local',
							    	   autoload: true,
							    	   store: payTypeStore,
									    valueField: 'payment_method_id',
									    displayField: 'payment_method_description',
								    	anchor:'90%',
						            	allowBlank: true,
						                forceSelection: false
								},{
									xtype: 'textfield',
									id: 'filter_password',
									name: 'filter_password',								
									fieldLabel: 'Password', 
									hidden: true,
									anchor:'90%',
									inputType: 'password'
								},{
									xtype: 'button',
                            		text: 'Create Report',
                            		id: 'filter_button',
                            		hidden: true,
                            		style: {padding: '20px'},
                            		width: 100,
                            		anchor:'99%',
            			            handler: function(){
            			        
            			            	 	Ext.getCmp("filter_pdf").show();
	            			            	var id = Ext.getCmp('report_id').getValue();
	            			            	var report_name = Ext.getCmp('report_name').getValue();
	            			            	var start = Ext.getCmp('filter_start').getValue();
	            			            	//var dt = new Date(strstart);
	            			            	//var start = Ext.Date.parse(strstart,'d-m-Y');
	            			            	var end = Ext.getCmp('filter_end').getValue();
	            			            	var year = Ext.getCmp('filter_year').getValue();
	            			            	var type = Ext.getCmp('filter_pay').getValue();
	            			            	var password = Ext.getCmp('filter_password').getValue();
	            				    		var tabs = Ext.getCmp('reporttabs');
	            				    		if(id == 6 && password != 'acc011')
	        	                    		{
	        		                    		Ext.Msg.show({
	        			            				   title:'Permission Message',
	        			            				   msg: 'Password Invalid.',
	        			            				   buttons: Ext.Msg.OK,
	        			            				   icon: Ext.MessageBox.ERROR
	        			            				});
	        		                    		
	        		                    		return false;
	        	                    		}
	            				    		var count =1;
	            				    		var stop=false;
	            				    		while (stop==false) {
	            				    			var reportPanel = tabs.find('id', 'Report-' + report_name +'-'+ count);
	            				    			var test='Report-' + report_name +'-'+ count;
	            				    			if(reportPanel.length > 0)
		            				    		{
		            				    			count+=1;
		            				    		}else
		            				    		{
		            				    			reportPanel = new ReportTabPanel({
		            				    											report_id: id, 
		            				    											report_name: report_name +'-'+ count,
		            				    											start: start, 
		            				    											end: end, 
		            				    											year: year, 
		            				    											type: type,
		            				    											password: password,
		            				    											count: count,
		            				    											});
		            								tabs.add(reportPanel);
		            								tabs.setActiveTab(reportPanel.id);
		            								stop=true;
		            				    		}
	            				            }
            			            }
								},{
									xtype: 'button',
									hidden: true,
                            		text: 'Export to PDF',
                            		id: 'filter_pdf',
                            		style: {padding: '20px'},
                            		width: 100,
                            		anchor:'99%',
            			            handler: function(){
            			            
            			            	var id = Ext.getCmp('report_id').getValue();
            			            	var report_name = Ext.getCmp('report_name').getValue();
            			            	var start = Ext.getCmp('filter_start').getValue();
            			            	//var dt = new Date(strstart);
            			            	//var start = Ext.util.Format.dateRenderer('Y-m-d');
            			            	//var start = Ext.Date.parse(strstart,'d-m-Y');
            			            	var end = Ext.getCmp('filter_end').getValue();
            			            	var year = Ext.getCmp('filter_year').getValue();
            			            	var type = Ext.getCmp('filter_pay').getValue();
            			            	var password = Ext.getCmp('filter_password').getValue(); 			
            			    			var body = Ext.getBody();
            			    			var frame = Ext.get('hiddenform-iframe');
            			    			if(frame != undefined)
            			    			{
            			    				frame.remove();
            			    			}
            			    			
            			    			if(id == 6 && password != 'acc011')
        	                    		{
        		                    		Ext.Msg.show({
        			            				   title:'Permission Message',
        			            				   msg: 'Password Invalid.',
        			            				   buttons: Ext.Msg.OK,
        			            				   icon: Ext.MessageBox.ERROR
        			            				});
        		                    		
        		                    		return false;
        	                    		}
            			    			
            			    			
            			    			frame = body.createChild({
            			    		        tag: 'iframe',
            			    		        cls: 'x-hidden',
            			    		        id: 'hiddenform-iframe',
            			    		        method: 'get',
            			    		        name: 'hidden-iframe',
            			    		       
            			    				scripts : true, 
            			    				
            			    				//params: {report_id: id, start:start, end:end, year:year, type:type, password: password},
            			   
            			    		        src: _contextPath + "/report/exportPDF?report_id="+ id + "&report_name=" + report_name
            			    		        + "&start=" + start.getTime() + "&end=" + end.getTime() + "&year=" + year  + "&type=" + type+ "&password=" + password
            			    				 //src : _contextPath + '/report/exportPDF?'+params, 
            			    		      });    		
            			    		
            			            }
								},
							       {
									   id: 'report_id',
									   xtype: 'hidden',
									   value: '0'
								},{
									   id: 'report_name',
									   xtype: 'hidden',
									   value: '0'
								}							
					       ],
			});
			 
			
			 ReportTabPanel = Ext.extend(Ext.TabPanel, {
				report : null,
				date: null,
				bodyCssClass: 'x-citewrite-panel-body',
				initComponent: function()
			    {
					var config = {
							id: 'Report-' + this.report_name,
							title:'Report-' + this.report_name,
							tabPosition: 'bottom',
							activeTab: 0,
							closable: true,
							autoDestroy: true,
							enableTabScroll: true,
						    items: [
						            new ReportViewerPanel({report_id: this.report_id, start: this.start, 
						            						end: this.end, year: this.year, type: this.type, password: this.password})						           
								   ]
						        };
					
			        Ext.apply(this, Ext.apply(this.initialConfig, config));
			        
			        ReportTabPanel.superclass.initComponent.apply(this, arguments);
			    }				
			});
			
			
			var ReportManager = Ext.extend(Ext.Panel, 
			{
			    initComponent: function()
			    {
			        Ext.apply(this, 
			        {
			        	title: false,
			            layout: 'border',
			            border: false,
			            frame: false,
			            items: [{
			            	title: 'Reports',
			                region:'west',
			                //xtype: 'container',
			                margins: '0 0 0 0',
			                border: false,
			                split: false,
			                collapsible: false,
			                flex: 1,
			                width: 200,
			                layout: 'fit',
			                items: [new ReportList()]
			            },{
			            	 title: 'Center Region',
			                 region: 'center',     // center region is required, no width/height specified
			                 xtype: 'container',
			                 border: false,
			                 layout: 'fit',
			                 margins: '0 0 0 0',
			                 items:[{
			                	 	title: false,
						            layout: 'border',
						            border: false,
						            frame: false,
						            items: [{
											title: '',
										    region:'west',
										    id: 'filterRegion',
										    margins: '0 0 0 0',
										    collapsible: true,
											collapsed:true,
											collapseMode: 'mini',
										    width: 200,
										    items: [filterForm]
										},{
											title: 'Display',
							                 region: 'center',     // center region is required, no width/height specified
							                 border: false,
							                 layout: 'fit',
							                 margins: '0 0 0 0',
							                 items:[{
							                	 xtype: 'tabpanel',
							                	 id: 'reporttabs',
							                	 frame: false,
							                	 closable: true
							                 }]	
					                 }]
			                 }]
			            }]
			        });
			        ReportManager.superclass.initComponent.apply(this, arguments);
			    }
			});
			
			var content = Ext.getCmp('content-panel');
			content.removeAll(true);
			content.add(new ReportManager({bodyCssClass: 'x-citewrite-border-ct'}));
			content.doLayout();
			Ext.getCmp("filterRegion").collapse(); 
		}); //end managers on click
	}//end if	
	
});