var agencyStore = null;	
var paymentStore = null;
var guestsStore = null;
var roomsStore = null;
var chargesStore = null;
agencyStore= new Ext.data.JsonStore({
		url: _contextPath + '/agency/list',
		root: 'agencies',		
        totalProperty: 'count',
        remoteSort: true,
        autoLoad: true,
        fields: [ 
                  'agency_id',
                  'agency_name', 
                  'agency_identification', 
                  'agency_address', 
                  'agency_zip', 
                  'agency_country', 
                  'agency_phone', 
                  'agency_email',
                  'agency_fax', 
                  'agency_type', 
                  'agency_web_site', 
                  'agency_notes'
                 ],
	     sortInfo: {
			field: 'agency_id',
			direction: 'ASC'
		}
    });
	
	var countryStoreForRes = new Ext.data.JsonStore({
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


	paymentStore = new Ext.data.JsonStore({
		url: _contextPath + '/payments/list',     
		root: 'payments',     
        totalProperty: 'count',
        remoteSort: true,
        fields: [ 
                'payment_id',
                'reservation_id',
                'payment_date',
                'payment_method',
                 'receive_date',
                 'transaction_no',
                 'back_account',
                 'amount',
                 'bill_to',
                 'payment_notes',
                 'payment_method_description'
        ],
        sortInfo: {
			field: 'payment_date',
			direction: 'DESC'
		},
		autoLoad: {}
    });
	
	guestsStore = new Ext.data.JsonStore({
		root: 'guests',
		url: _contextPath + '/guests/list',
		totalProperty: 'count',
		remoteSort: true,
		autoLoad: true,
		fields: [ 
		          	'guest_id',
		          	'name', 
		          	'dni', 
		          	'title', 
		          	'address', 
		          	'zip', 
		          	'country', 
		          	'phone',
		          	'email', 
		          	'mobile', 
		          	'fax', 
		          	'notes',
		          	'market', 
		          	'creation_date', 
		          	'type'
		        ],
		
		sortInfo: {
				field: 'guest_id',
				direction: 'ASC'
			}
	});

	
	  // create the Data Store
    roomsStore = new Ext.data.JsonStore({
		url: _contextPath + '/rooms/availableList',
		root: 'rooms',
        totalProperty: 'count',
        remoteSort: true,
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
			direction: 'DESC'
		},
		baseParams: {IS_DELETE: 0 }
    });
    
    
    // create the Data Store
    mealPlanStore = new Ext.data.JsonStore({
		url: _contextPath + '/reservation/mealsPlanList',
		root: 'meals',
        totalProperty: 'count',
        remoteSort: true,
        autoLoad: true,
        fields: [
            'meal_plan_id',
            'meal_plan_description'		            		            
        ],
		sortInfo: {
			field: 'meal_plan_id',
			direction: 'asc'
		}
    });
    
    // create the Data Store
    paymentMethodStore = new Ext.data.JsonStore({
		url: _contextPath + '/reservation/paymentMethodList',
		root: 'paymentMethod',
        totalProperty: 'count',
        remoteSort: true,
        autoLoad: true,
        fields: [
            'payment_method_id',
            'payment_method_description'		            		            
        ],
		sortInfo: {
			field: 'payment_method_id',
			direction: 'asc'
		}
    });
    
 // create the Data Store
    ccTypeStore = new Ext.data.JsonStore({
		url: _contextPath + '/reservation/ccTypeList',
		root: 'cc_type',
        totalProperty: 'count',
        remoteSort: true,
        autoLoad: true,
        fields: [
            'cc_type_id',
            'cc_type_description'		            		            
        ],
		sortInfo: {
			field: 'cc_type_id',
			direction: 'asc'
		}
    });
    
    arrayRoomsStore = new Array();
    /*roomsStore.load({
		params:{start:0, limit: 1000},
		callback: function () {
			roomsStore.each(function(record,id){
				 var dataRoom = new Array(record.data.ROOM_ID.toString(), record.data.ROOM_NO.toString(), record.data.ROOM_TYPE.toString());
				arrayRoomsStore.push(dataRoom);
			});
			
        }
     });*/
    
	
	 // create the Data Store
    chargesStore = new Ext.data.JsonStore({
        // destroy the store if the grid is destroyed
       // autoDestroy: true,
        root: 'charges',
        url: _contextPath + '/reservation/chargeList',
        fields: [
                 // the 'name' below matches the tag name to read, except 'availDate'
                 // which is mapped to the tag 'availability'
                 'charge_id',
                 'charge_reservation_id',
                 'charge_date',
                 'charge_item_name',
                 'charge_item_desc',
                 'charge_qty',
                 'charge_rate',
                 'charge_total',
                 'charge_folio',
                 'unique_id'
        ]
    });
    
