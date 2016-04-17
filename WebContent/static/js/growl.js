Ext.growl = function(){
    var msgCt;

    function createBox(t, s)
    {
    	return ['<div id="growl-msg">',
                '<div><h3>', t, '</h3><p>', s, '</p></div>',
                '</div>'].join('');
    }
    return {
        message : function(title, format){
            if(!msgCt){
                msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
            }
            msgCt.alignTo(document, 't-t');
            var s = String.format.apply(String, Array.prototype.slice.call(arguments, 1));
            var m = Ext.DomHelper.append(msgCt, {html:createBox(title, s)}, true);
            m.fadeIn('t').pause(2).ghost("t", {remove:true});
        },

        init : function()
        {
        }
    };
}();