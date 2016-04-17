<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="com.cambiolabs.citewrite.data.User" %>

<script>
	
	var PL_ADMIN = 1; 
	var PL_RESERVATION_VIEW = 2; 
	var PL_OCUPANCY_LIST = 4;
	var PL_CHARGES_VIEW = 8;
	var PL_REPORT_VIEW = 16;
	var PL_PAYMENT_REPORT_VIEW = 32; 
	var PL_RESERVATION_MANAGE = 64; 
	var PL_AGENCY_MANAGE = 128; 
	var PL_GUEST_MANAGE = 256;
	var PL_SERVICE_MANAGE = 512; 
	var PL_ROOM_MANAGE = 1024; 
	var PL_SETTINGS_MANAGE = 2048;

	
	
	function hasPermission (level)
	{
		var permissions = <c:out value="${user.permissions}" />;
		return permissions == PL_ADMIN ?  true : ((permissions & level) > 0);
	}
	
</script>

