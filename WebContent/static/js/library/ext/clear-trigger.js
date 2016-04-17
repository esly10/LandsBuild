Ext.ux.CustomTrigger = Ext.extend(Ext.form.TriggerField, {
	alias: 'widget.customtrigger',
	initComponent: function() {
		var me = this;
	
		me.triggerClass = 'x-form-clear-trigger';
	
		Ext.ux.CustomTrigger.superclass.initComponent.apply(this, arguments);
	}
});
Ext.reg('cleartrigger', Ext.ux.CustomTrigger);
