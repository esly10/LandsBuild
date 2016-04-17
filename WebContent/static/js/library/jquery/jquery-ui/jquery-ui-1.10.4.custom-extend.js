jQuery(document).ready(function(){

	$.widget("ui.tooltip", $.ui.tooltip, {
		options: {
			content: function () {
				return $(this).prop('title');
			}
		}
	});

	
	
	$('.infotip').attr('title', function(){
		var divName = $(this).attr('title');
		if(divName == undefined){return;}
		return $(String('#'+divName)).html();
	});
	

	$(document).tooltip({position: {my: "center bottom",at: "right+50 top+75"},show: {delay: 500}});
		
	
	
	
	
});	