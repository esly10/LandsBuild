Ext.onReady(function(){
    
    Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
    	var year = new Date().format('Y');
    
    var viewport = new Ext.Viewport({
        layout: 'border',
        items: [
        // create instance immediately
        new Ext.BoxComponent({
            region: 'north',
            height: 40, // give north and south regions a height
            contentEl: 'headerPanel'
        }), {
            region: 'south',            
            height: 25,
            split: true,
            margins: '0 0 0 0',
            paddings:'0 0 0 0',
            border: false,
            frame: false,
            //bodyStyle: 'background-color: transparent;',
            items:[new Ext.ux.StatusBar({
                id: 'statusbar',
                cls: 'x-citewrite-toolbar',
                // any standard Toolbar items:
                items: [
                    '&copy; Copyright '+year+' - Lands in Love &nbsp;&nbsp;|&nbsp;&nbsp;version&nbsp; 1.0'
                ]
            })]
        }, {
            region: 'west',
            id: 'navigation-panel', // see Ext.getCmp() below
            contentEl: 'toolsPanel',
            title: 'Tools',
            split: true,
            width: 50,
            resizable:false,
            //minSize: 175,
            border: false,
            frame: false,
            maxSize: 800,
            collapsible: true,
            //collapseMode: 'mini',
            hideCollapseTool: true,
            //split: true,
            paddings:'0 0 0 0',
            margins: '0 0 0 0'
        },
        {
        	xtype: 'panel',
            region: 'center', // a center region is ALWAYS required for border layout
            deferredRender: false,
            autoScroll: false,
            border: false,
            frame: false,
            id: 'content-panel',
            name: 'content-panel',
            paddings:'0 0 0 0',
            margins: '0 0 0 0',
            layout: 'fit'
        }]
    });
    
    //check for a session timeout
    Ext.TaskMgr.start({
        run: function()
        {
        	Ext.Ajax.request({
				   url: _contextPath + '/user/authenticated',
				   success: function(p1, p2)
				   {
					   var header = p1.getAllResponseHeaders();
					   if(header.indexOf('text/html') != -1)
					   {
						   window.location.href = _contextPath + "/";
						   return;
					   }
					   var response = Ext.decode(p1.responseText);
					   if(!response.success)
					   {
						   window.location.href = _contextPath + "/";
					   }
				   },
				   failure: function(){
					   window.location.href = _contextPath + "/";
				   }
				}); 
        },
        interval: 1000*60
    });
    
});

Ext.layout.FormLayout.prototype.trackLabels = true;

/*
Ext.Ajax.on('requestexception', function(response, options, e) {
	window.location.href = _contextPath + '/login.jsp';
});*/