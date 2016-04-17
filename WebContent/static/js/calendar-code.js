	// Visual Studio references

	/// <reference path="jquery-1.9.1.min.js" />
	/// <reference path="jquery-ui-1.10.2.min.js" />
	/// <reference path="moment.min.js" />
	/// <reference path="timelineScheduler.js" />


 // create the Data Store
    roomsStoreCalendar = new Ext.data.JsonStore({
		url: _contextPath + '/rooms/list',
		root: 'rooms',
        totalProperty: 'count',
        remoteSort: false,
        autoLoad: true,
        fields: [
            'ROOM_ID',
            'ROOM_NO',
            'ROOM_TYPE',
            'STATUS',
            'LOCATION_X',
            'LOCATION_Y'		            		            
        ],
		sortInfo: {
			field: 'ROOM_NO',
			direction: 'ASC'
		},
		baseParams: {}
    });
    
    calendarStore = new Ext.data.JsonStore({
		url: _contextPath + '/calendar/listCalendar',
		root: 'reservations',
        totalProperty: 'count',
        remoteSort: false,
        autoLoad: true,
        fields: [
            'rr_room_id',
            'rr_reservation_id',
            'rr_reservation_in',
            'rr_reservation_out',
            'room_no',
            'reservation_agency_id',
            'reservation_guest_id',
            'guest_name',
            'agency_name',  
            'reservation_number',
            'reservation_status',
			'reservation_type',
			'reservation_nights',
			'reservation_adults',
			'reservation_children',
			'reservation_guides',
			'reservation_event_date',					
			'reservation_event_participants'
        ],
		sortInfo: {
			field: 'room_no',
			direction: 'DESC'
		},
		baseParams: {}
    });
    
	var arrayRoomsCalendar = new Array();
	var arrayCalendar = new Array();
    
	roomsStoreCalendar.load({
		params:{start:0, limit: 1000},
		callback: function () {
			roomsStoreCalendar.each(function(record,id){
				arrayRoomsCalendar.push({
		            id: record.data.ROOM_ID,
		            name: 'Room '+record.data.ROOM_NO.toString()	            
		        });
			});	    			
        }
     });
	
	calendarStore.load({
		params:{start:0, limit: 1000},
		callback: function () {
			calendarStore.each(function(record,id){    				
				
				if(record.data.reservation_type != 3){ // no show events
				var type = "";
				var title = "";
				if(record.data.reservation_type == 1){
					 type = "Fit";
				}else if(record.data.reservation_type == 2){
					 type = "Group";
				} else if(record.data.reservation_type == 3){
					 type = "Event";
				}
				//"Original Value: "+rec.value+"&#10;";
				title +=  "Reservation Number: "+record.data.reservation_number+"&#10;";
				title += "Guest Name: "+record.data.guest_name+"&#10;";
				title += "Agency Name: "+record.data.agency_name+"&#10;";
				title += "Room No: "+record.data.room_no+"&#10;";
				title += "Status: "+getStatus(record.data.reservation_status)+"&#10;";
					title += "Type: "+type+"&#10;";
					title += "Check In: "+ moment(record.data.rr_reservation_in).add('hours', -12).toLocaleString()+"&#10;";
					title += "Check Out: "+ moment(record.data.rr_reservation_out).add('hours', -12).toLocaleString()+"&#10;";
							
				
				if( record.data.reservation_type == 3){
						/*arrayCalendar.push(
    						{
    	    				    id: 'res_'+id,
    	    				    name: '<div title="'+title+'"><div>'+record.data.guest_name+'</div><div>'+type+', '+record.data.reservation_number+'</div></div>',
    	    				    sectionID: record.data.rr_room_id,
    	    				    start: moment(record.data.reservation_event_date).add('hours', -12),
    	    				    end: moment(record.data.reservation_event_date).add('hours', 12),
    	    				    classes: 'item-status-'+record.data.reservation_status,
    				            data:record.data
    	    				         
    	    				}
	    				);*/
				} else {
					arrayCalendar.push(
							{
    	    				    id: 'res_'+id,
	    	    				    //name: '<div title="'+title+'"><div>'+record.data.guest_name+'</div><div>'+type+', '+record.data.reservation_number+'</div></div>',
	    	    				    name: '<div title="'+title+'"><div style="height:20px;line-height: 12px;">'+record.data.guest_name+'</div></div>',
    	    				    sectionID: record.data.rr_room_id,
    	    				    start: moment(record.data.rr_reservation_in).add('hours', -12),
    	    				    end: moment(record.data.rr_reservation_out).add('hours', 12),
    	    				    classes: 'item-status-'+record.data.reservation_status,
    	    				    data:record.data
    	    				}
    				);
				}
				}				
					    				
			});
			
        }
     });
	
	var today = moment().startOf('day');

	var Calendar = {
	    Periods: [
	        {
	            Name: '1 week',
	            Label: '1 week',
	            TimeframePeriod: (60 * 24),
	            TimeframeOverall: (60 * 24 * 7),
	            TimeframeHeaders: [
	                'MMM',
	                'Do'
	            ],
	            Classes: 'period-1week'
	        },
	        {
	            Name: '1 month',
	            Label: '1 month',
	            TimeframePeriod: (60 * 24 * 1),
	            TimeframeOverall: (60 * 24 * 28),
	            TimeframeHeaders: [
	                'MMM',
	                'Do'
	            ],
	            Classes: 'period-1month'
	        }
	    ],

	    Items: arrayCalendar,
	    /* [
		{
		    id: 22,
		    sectionID: 23,
		    name: '<div>Esly Qusada</div><div>Sub Info</div>',
		    start: moment(today).add('days', 5),//start: moment(today).add('hours', 12),
		    end: moment(today).add('days', 7), //end: moment(today).add('days', 3).add('hours', 4),		    
		    classes: 'item-status '
		}
	    ],*/

	    Sections: arrayRoomsCalendar,

	    Init: function () {
	        TimeScheduler.Options.GetSections = Calendar.GetSections;
	        TimeScheduler.Options.GetSchedule = Calendar.GetSchedule;
	        TimeScheduler.Options.Start = today;
	        TimeScheduler.Options.Periods = Calendar.Periods;
	        TimeScheduler.Options.SelectedPeriod = '1 month';
	        TimeScheduler.Options.Element = $jQuery('.calendar');

	        TimeScheduler.Options.AllowDragging = false;
	        TimeScheduler.Options.AllowResizing = false;

	        TimeScheduler.Options.Events.ItemClicked = Calendar.Item_Clicked;
	        TimeScheduler.Options.Events.ItemDropped = Calendar.Item_Dragged;
	        TimeScheduler.Options.Events.ItemResized = Calendar.Item_Resized;

	        //TimeScheduler.Options.Events.ItemMovement = Calendar.Item_Movement;
	        //TimeScheduler.Options.Events.ItemMovementStart = Calendar.Item_MovementStart;
	        //TimeScheduler.Options.Events.ItemMovementEnd = Calendar.Item_MovementEnd;

	        TimeScheduler.Options.Text.NextButton = '&nbsp;';
	        TimeScheduler.Options.Text.PrevButton = '&nbsp;';

	        TimeScheduler.Options.MaxHeight = 100;
	        TimeScheduler.Init();	
	        window.oncontextmenu = function ()
	        {
	            return false;     // cancel default menu
	        };
	        addContextMenu();	    
	        resizeTable();

	        $jQuery('#create-res').click(function(ev){
	        	addResWindows();
	         });
	        
	        
	        var w =$jQuery( ".time-sch-table.time-sch-table-header" ).width();		
    		$jQuery( ".time-sch-table-header tbody" ).width(w-8);
    		
    		if(document.getElementById("print_buton_calendar") === null){
            	$jQuery( ".time-sch-period-container" ).append( '<a id="print_buton_calendar" onclick="printContent()" class="time-sch-period-button time-sch-button" href="#">Print</a>' ); //$( "h2" )
            }
	        //var num = 28;
	        //var width = 0;
	        
	        //var newHeader = $jQuery(".time-sch-table-header tbody").clone();
	        // $jQuery( "body" ).append(newHeader);
	        //for (i = 0; i < num; i++) { 
	        	//width = $jQuery(".time-sch-date-content.time-sch-header-1-date-column-"+i).width();
	        	//$jQuery(".time-sch-date-header.time-sch-header-1-date-column-"+i).width(width);
	        //}
	        
	    },

	    GetSections: function (callback) {
	        callback(Calendar.Sections);
	    },

	    GetSchedule: function (callback, start, end) {
	        callback(Calendar.Items);
	    },

	    Item_Clicked: function (item) {
	        console.log(item);
	    },

	    Item_Dragged: function (item, sectionID, start, end) {
	        var foundItem;

	        console.log(item);
	        console.log(sectionID);
	        console.log(start);
	        console.log(end);

	        for (var i = 0; i < Calendar.Items.length; i++) {
	            foundItem = Calendar.Items[i];

	            if (foundItem.id === item.id) {
	                foundItem.sectionID = sectionID;
	                foundItem.start = start;
	                foundItem.end = end;

	                Calendar.Items[i] = foundItem;
	            }
	        }

	        TimeScheduler.Init();
	    },

	    Item_Resized: function (item, start, end) {
	        var foundItem;

	        console.log(item);
	        console.log(start);
	        console.log(end);

	        for (var i = 0; i < Calendar.Items.length; i++) {
	            foundItem = Calendar.Items[i];

	            if (foundItem.id === item.id) {
	                foundItem.start = start;
	                foundItem.end = end;

	                Calendar.Items[i] = foundItem;
	            }
	        }

	        TimeScheduler.Init();
	    },

	    Item_Movement: function (item, start, end) {
	        var html;

	        html =  '<div>';
	        html += '   <div>';
	        html += '       Start: ' + start.format('Do MMM YYYY HH:mm');
	        html += '   </div>';
	        html += '   <div>';
	        html += '       End: ' + end.format('Do MMM YYYY HH:mm');
	        html += '   </div>';
	        html += '</div>';

	        $jQuery('.realtime-info').empty().append(html);
	    },

	    Item_MovementStart: function () {
	    	$jQuery('.realtime-info').show();
	    },

	    Item_MovementEnd: function () {
	    	$jQuery('.realtime-info').hide();
	    }
	};

	function mouseX(evt) {
	    if (evt.pageX) {
	        return evt.pageX;
	    } else if (evt.clientX) {
	       return evt.clientX + (document.documentElement.scrollLeft ?
	           document.documentElement.scrollLeft :
	           document.body.scrollLeft);
	    } else {
	        return null;
	    }
	}
	function addResWindows(){

		var panel = this;
		
		var formPanelRes = new Ext.Panel({			    	
    		id: 'addResPanel',
    		padding: '0px',			    		
			bodyStyle:'padding: 0px; margin: 0px;',
			border: false,				
			frame:false,
			bodyBorder: false,
			frame: false,
			labelAlign: 'top',
			buttonAlign:'center',
			bodyStyle: 'padding: 10px; ',
			//autoWidth: true,
    		items: [	    		        
					{
						xtype: 'form',
						id:"res-form",
						padding: '10px',		
						bodyBorder: false,
						border: false,
						labelAlign: 'top',
						frame: false,
						defaultType:'textfield',
						buttonAlign:'center',
						bodyStyle: 'padding: 10px; ',
						defaults: { width: '95%' },
						bodyCssClass: 'x-citewrite-panel-body',
						items: [
						        {
								    xtype: 'datefield',
								    id: 'add-reservation_check_in',
								    name: 'reservation_check_in',
								    fieldLabel: 'Check In',
									format: 'd/m/Y',
									submitFormat: 'Y-m-dTH:i:s',
									submitValue : true,
									altFormats: 'Y-m-d',
									anchor: "80%",																		
									allowBlank: false,
									listeners:{}
									//value: Ext.util.Format.date(data.date, 'Y-m-d')
								},
								{
								    xtype: 'datefield',
								    id: 'add-reservation_check_out',
								    name: 'reservation_check_out',
								    fieldLabel: 'Check Out',
									format: 'd/m/Y',
									submitFormat: 'Y-m-dTH:i:s',
									submitValue : true,
									altFormats: 'Y-m-d',
									anchor: "80%",																		
									allowBlank: false,
									listeners:{}
									//value: Ext.util.Format.date(data.date, 'Y-m-d')
								}
							]
					}
    		        
    		]
    	});
		
		var addResWindow = new Ext.Window({
	        renderTo: document.body,
	        title:"Reservation",
	        width:260,
	        layout:'fit',
	        height:'250px',
	        plain: true,
	        resizable: false,
	        autoScroll: true,
	        modal: true,
	        closeAction: 'close',
	        items:formPanelRes,
	        autoDestroy: true,
	        /*items: [{
	        	xtype: 'panel',
				bodyCssClass: 'x-citewrite-panel-body',
		        padding: 5,
	        	autoLoad: {url: _contextPath + '/invoice/details', params: {invoice_id: record.data.invoice_id, owner_id: panel.owner.owner_id }},
	        }],*/
	        buttons: [{
                text:'Go',
                handler: function()
                {
                	
                	if(Ext.getCmp("res-form").getForm().isValid()){
                		var content = Ext.getCmp('content-panel');
            			content.removeAll(true);			
            			content.add(new ReservationPanel({'reservationInfo' : 
            				{
            				reservation_check_in: Ext.getCmp("add-reservation_check_in").getValue(),
            				reservation_check_out:Ext.getCmp("add-reservation_check_out").getValue(),
            				from_calendar: true
            				}
            			}));
            			content.doLayout();
            			this.findParentByType('window').close();
            			return;
                	}                	
                	
                }
            },{
                text: 'Close',
                handler: function(){
                	this.findParentByType('window').close();
                }
            }]
	    });
		
		$jQuery('#rmenu').hide();
		addResWindow.show();
		addResWindow.center();
	
	}
	function addContextMenu(){
		 
			 $jQuery('.time-sch-section-container').mousedown(function(ev){
		            if(ev.which == 3)
		            {
		                 /*var ctxMenu = document.getElementById("ctxMenu");
			             ctxMenu.style.display = "block";
			             ctxMenu.style.left = (event.pageX - 10)+"px";
			             ctxMenu.style.top = (event.pageY - 10)+"px";*/
			             
			             //alert("contextmenu"+event);
			                document.getElementById("rmenu").className = "show";  
			                document.getElementById("rmenu").style.top =  mouseY(event)-70 + 'px';
			                document.getElementById("rmenu").style.left = mouseX(event)-40 + 'px';
			                $jQuery('#rmenu').show();
			                window.event.returnValue = false;
		            } else {
		            	$jQuery('#rmenu').hide();
		            }
		         });
		 
	}
	function getStatus(id){
	 /*  '1', 'Confirmed'
		 '2', 'Canceled'
		 '3', 'Check in'
		 '4', 'Check out'
		 '5', 'Open'
		 '6', 'No Show'  */
		if(id == 1){
			return 'Confirmed';
		}
		else if(id == 2){
			return 'Canceled';
		}
		else if(id == 3){
			return 'Check in';
		}
		else if(id == 4){
			return 'Check out';
		}
		else if(id == 6){
			return 'No Show';
		}
		
		return 'n/a';
		
	}
	function mouseY(evt) {
	    if (evt.pageY) {
	        return evt.pageY;
	    } else if (evt.clientY) {
	       return evt.clientY + (document.documentElement.scrollTop ?
	       document.documentElement.scrollTop :
	       document.body.scrollTop);
	    } else {
	        return null;
	    }
	}
		
	function resizeTable(){
		$jQuery( ".time-sch-table" ).resize(function() {		
    		var w =$jQuery( ".time-sch-table.time-sch-table-header" ).width();		
    		$jQuery( ".time-sch-table-header tbody" ).width(w-8);
    		
    	});	
	} 
	

	function printContent(){

		$jQuery('#calendar-div').parents().siblings().hide();
		$jQuery('.time-sch-period-container').hide();
		$jQuery('.time-sch-time-container').hide();
		
		window.print();
		
		$jQuery('#calendar-div').parents().siblings().show();		
		$jQuery('.ext-el-mask').hide();
		$jQuery('.time-sch-period-container').show();
		$jQuery('.time-sch-time-container').show();
		return true;
		
	};


	
	