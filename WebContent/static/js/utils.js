function getActiveErrorMessage(form){
	var error_string = "";
	form.items.each(function(item) {
		if(item.getActiveError()){
		
			if(item != undefined && item.fieldLabel != undefined){
				error_string=error_string+"The field '"+item.fieldLabel+ "' is invalid, reason: " + item.getActiveError() + "<br />"; 
			}else if(item != undefined && item.name != undefined){
				error_string=error_string+"The field '"+item.name+ "' is invalid, reason: " + item.getActiveError() + "<br />"; 
			}else{
				error_string=error_string+"The field is invalid, reason: " + item.getActiveError() + "<br />"; 
			}

		}
	});

	if(error_string.length<=0){
		error_string = 'Form fields may not be submitted with invalid values.';
	}
	return error_string;
}