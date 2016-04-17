Ext.namespace("Ext.ux.form");
RegExp.escape = function(str) {
  return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
};
Ext.ux.form.MultiCombo = Ext.extend(Ext.form.ComboBox, {
	fieldName: '',
	checkedName: 'checked',
	constructor:function(config) {
		config = config || {};
		config.listeners = config.listeners || {};
		
		Ext.applyIf(config.listeners, 
		{
			 scope:this,
			 blur:this.onRealBlur,
			 beforequery:this.onBeforeQuery
		});
		this.fieldName = config.fieldName;
		config.id = this.fieldName;
		config.hiddenName = this.fieldName;// + '-hidden';
		config.checkedName = 'checked';
		config.mode = 'local';
		config.editable = false;
		this.displayField = config.displayField;
		
		Ext.ux.form.MultiCombo.superclass.constructor.call(this, config);
		// this.loadValues();
		
	}, 
	loadValues: function()
	{
		// var object = this;
		// Ext.Ajax.request({
			// url:'administration.php'
			// ,params:{
				// get:'dp_notification_groups',
				// field_name:this.fieldName
			// }
			// ,success:function(response,opts){
				// var managerIDs = Ext.decode(response.responseText);
				
				// if(managerIDs.length > 0){
					// var values = managerIDs.join(';');
					// object.setComboValue(values);
				// }
			// }
		// });
	},
	onBeforeQuery:function(qe) {
		qe.query = qe.query.replace(new RegExp(RegExp.escape(this.getCheckedDisplay()) + '[ ;]*'), '');
	},
    initComponent:function() 
    {
		if(!this.tpl) 
		{
			var html = new Array( 
				 '<tpl for=".">',
				'<div class="x-combo-list-item">',
				'<img src="' + Ext.BLANK_IMAGE_URL + '" ',
				'class="ux-multicombo-icon ux-multicombo-icon-',
				'{[values.', this.checkedName, '?"checked":"unchecked"', ']}">',
				'<div class="ux-multicombo-item-text">{' + ( this.displayField )+ ':htmlEncode}</div>',
				'</div>',
				'</tpl>');
			
			this.tpl = html.join('');
		}
 
		Ext.ux.form.MultiCombo.superclass.initComponent.apply(this, arguments);

		this.onLoad = this.onLoad.createSequence(function() {
			if(this.el) {
				var val = this.el.innerHTML;
				this.el.innerHTML = '';
				this.el.innerHTML = val;
			}
		});
 
    },
    initEvents:function() 
    {
    	Ext.ux.form.MultiCombo.superclass.initEvents.apply(this, arguments);
		this.keyNav.tab = false;
	},
	clearValue:function() 
	{
		this.value = '';
		this.setRawValue(this.value);
		this.store.clearFilter();
		this.store.each(function(record) {
			record.set(this.checkedName, false);
		}, this);
		if(this.hiddenField) {
			this.hiddenField.value = '';
		}
		this.applyEmptyText();
	},
	getCheckedDisplay:function() 
	{
		var re = new RegExp(';', "g");
		return this.getCheckedValue(this.displayField).replace(re, '; ');
	},
	getCheckedValue:function(field) 
	{
		field = field || 'id';
		var c = [];

		var sdata = this.store.snapshot || this.store.data;;

		sdata.each(function(record){
			if(record.get(this.checkedName)) 
			{
				c.push(record.get(field));
			}
		}, this);

		return c.join(';');
	},
	onRealBlur:function() {
		this.list.hide();
		var rv = this.getRawValue();
		var rva = rv.split(new RegExp('; *'));
		var va = [];
		var snapshot = this.store.snapshot || this.store.data;

		Ext.each(rva, function(v) {
			snapshot.each(function(r) {
				if(v === r.get(this.displayField)) {
					va.push(r.get('id'));
				}
			}, this);
		}, this);
		this.setComboValue(va.join(';'));
		this.store.clearFilter();
	},
	onSelect:function(record, index) {
        if(this.fireEvent('beforeselect', this, record, index) !== false){

			record.set(this.checkedName, !record.get(this.checkedName));

			if(this.store.isFiltered()) {
				this.doQuery(this.allQuery);
			}

			this.setComboValue(this.getCheckedValue());
            this.fireEvent('select', this, record, index);
        }
	},
	setComboValue:function(v) {
		if(v) {
			v = '' + v;

			this.store.clearFilter();
			this.store.each(function(r) {
				var checked = !(!v.match(
					 '(^|;)' + RegExp.escape(r.get('id'))
					+'(;|$)'))
				;

				r.set(this.checkedName, checked);
			}, this);
			this.value = this.getCheckedValue();
			this.setRawValue(this.getCheckedDisplay());
			if(this.hiddenField) {
				this.hiddenField.value = this.value;
			}
			
			if(this.el) {
				this.el.removeClass(this.emptyClass);
			}
		}
		else {
			this.clearValue();
		}
	} 
	,selectAll:function() {
        this.store.each(function(record){
            record.set(this.checkedName, true);
        }, this);

        this.doQuery(this.allQuery);
        this.setComboValue(this.getCheckedValue());
    }
    ,deselectAll:function() {debugger;
		this.clearValue();
    }
});

 
// eof
