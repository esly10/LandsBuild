<%@ page session="true" language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<%@ page import="com.cambiolabs.citewrite.data.User" %>
<%
	User cwUser = User.getCurrentUser();
	pageContext.setAttribute("user", cwUser);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="Content-Language" content="en-us" />
	<meta http-equiv="Expires" content="Tue, 01 Jan 1980 00:00:00 GMT" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Content-Style-Type" content="text/css" />
	<title>Lands in Love</title>
	<script type="text/javascript" src="<c:url value="/static/js/library/prototype.js" />" ></script>
	
	<!-- helper libraries -->
	<script type="text/javascript" src="<c:url value="/static/js/calendar/js/jquery-1.9.1.min.js" />"></script>
 		    		  
	<script type="text/javascript">
        var $jQuery = jQuery.noConflict();
    </script>
    
	<script type="text/javascript" src="<c:url value="/static/js/library/scriptaculous/scriptaculous.js?load=effects" /> " ></script>
	
	<link href="<c:url value="/static/js/library/ext/css/ext-all.css" />" rel="stylesheet" type="text/css" />
	<link href="<c:url value="/static/js/library/ext/css/citewrite.css" />" rel="stylesheet" type="text/css" />
	<link href="<c:url value="/static/css/global.css" />" rel="stylesheet" type="text/css" />
	
	<script type="text/javascript" src="<c:url value="/static/js/library/ext/adapter/ext-prototype-adapter.js" />" ></script>
	<script type="text/javascript" src="<c:url value="/static/js/library/ext/ext-all-debug.js" />" ></script>
	<script type="text/javascript" src="<c:url value="/static/js/library/ext/status-bar.js" />" ></script>
	<script type="text/javascript" src="<c:url value="/static/js/library/ext/clear-trigger.js" />" ></script>
	
	
	<script type="text/javascript">
		var _isAdmin = <%= (cwUser.isAdmin())?"true":"false" %>;
		var _contextPath = '<%= request.getContextPath() %>/admin';
		var _rootContextPath = '<%= request.getContextPath() %>';
	</script>
		
	<link rel="stylesheet" type="text/css" href="<c:url value="/static/js/library/ext/ux/fileuploadfield/css/fileuploadfield.css" />"/>
	<script type="text/javascript" src="<c:url value="/static/js/library/ext/ux/fileuploadfield/FileUploadField.js" />"></script>
	
    <link rel="stylesheet" type="text/css" href="<c:url value="/static/js/library/ext/ux/css/Ext.ux.GridTotals.css" />"/>
	<script type="text/javascript" src="<c:url value="/static/js/library/ext/ux/Ext.ux.GridTotals.js" />"></script>
	
	<script type="text/javascript" src="<c:url value="/static/js/library/ext/ux/CheckColumn.js" />"></script>
	<script type="text/javascript" src="<c:url value="/static/js/library/ext/ux/Ext.ux.form.MultiCombo.js" />"></script>
	<link href="<c:url value="/static/js/library/ext/css/Ext.ux.form.MultiCombo.css" />" rel="stylesheet" type="text/css" />
	
	
	<script type="text/javascript" src="<c:url value="/static/js/portal.js" />"></script>
	<script type="text/javascript" src="<c:url value="/static/js/utils.js" />"></script>
	<script type="text/javascript" src="<c:url value="/static/js/growl.js" />"></script>
	<script type="text/javascript" src="<c:url value="/static/js/user-account.js" />"></script>
	
	<link rel="SHORTCUT ICON" HREF="<c:url value="/favicon.ico" />" />
	<%@include file="manage-user-permissions.jsp" %>
</head>
<body id="body">
	
	<div id="headerPanel" class="x-hide-display">
		<div style="position: relative;">
			<div id="header">
				<div id="header-space">
					<div id="header-box"></div>
					<div id="header-line"></div>
				</div>
			</div>
	        <div id="header-user"><div id="header-user-text">
	        <c:out value="${user.firstName} ${user.lastName}" />&nbsp;&nbsp;&nbsp;&nbsp; </div>
	        <div id="header-user-icons">
	        <a href="#" id="my-account-link"><img src=<c:url value="/static/images/user.png" /> ></a>&nbsp;&nbsp;&nbsp;&nbsp;
	        <a href="#" id="credits"><img src=<c:url value="/static/images/credits.png" /> ></a>&nbsp;&nbsp;&nbsp;&nbsp;
	        <a href="<c:url value="/admin/logout" />"><img src=<c:url value="/static/images/exit.png" /> ></a></div>
	       </div>
	    </div>
    </div>
    
	<div id="toolsPanel" class="x-hide-display">
        <ul class="navigation" id="tool-options">
        	<% if(cwUser.hasPermission(User.PL_RESERVATION_MANAGE)){ %>
        		<li id="nav-reservation">New Reservation
        			<script type="text/javascript" src="<c:url value="/static/js/reservationStores.js" />"></script>
		    		<script type="text/javascript" src="<c:url value="/static/js/reservation.js" />"></script>
		 			<script type="text/javascript" src="<c:url value="/static/js/reservation-grid.js" />"></script>
		    	</li>
		    <% } if(cwUser.hasPermission(User.PL_RESERVATION_VIEW)){ %>
		    	<li id="nav-list">Reservation List</li>
		     	<li style="display:none;">
		    		<script type="text/javascript" src="<c:url value="/static/js/reservation-list.js" />"></script>
		    		<script type="text/javascript" src="<c:url value="/static/js/reservation-list-panel.js" />"></script>
		    	</li>
		    	
		    <% } if(cwUser.hasPermission(User.PL_OCUPANCY_LIST)){ %>
		    	<li id="nav-calendar">Calendar		    	  
		    	  		   
		    	  	<script type="text/javascript" src="<c:url value="/static/js/calendar/js/moment.min.js" />"></script>
		    	  	<script type="text/javascript" src="<c:url value="/static/js/calendar/js/jquery-ui-1.10.2.min.js" />"></script>
		    	  	 					    
 					<script type="text/javascript" src="<c:url value="/static/js/calendar/js/timelineScheduler.js" />"></script>        		
        			<script type="text/javascript" src="<c:url value="/static/js/calendar-code.js" />"></script>		    	
        	
		    		<script type="text/javascript" src="<c:url value="/static/js/calendar.js" />"></script>
		    		<script type="text/javascript" src="<c:url value="/static/js/calendar-general.js" />"></script>		    		
		    	</li>		   		
	    	
		    <% } if(cwUser.hasPermission(User.PL_CHARGES_VIEW)){ %>
		    	<li id="nav-payment">Charges
		    		<script type="text/javascript" src="<c:url value="/static/js/charges.js" />"></script>
		    		<script type="text/javascript" src="<c:url value="/static/js/charge-general.js" />"></script>
		    	</li>
		  
		    <% } if(cwUser.hasPermission(User.PL_GUEST_MANAGE)){ %>
		    	<li id="nav-contacts">Guests
			    	<script type="text/javascript" src="<c:url value="/static/js/guests.js" />"></script>
			    </li>
			    </li>
    		<% } if(cwUser.hasPermission(User.PL_AGENCY_MANAGE)){ %>
				<li id="nav-agencies">Agencies
		 			<script type="text/javascript" src="<c:url value="/static/js/agencies.js" />"></script>
		 		</li>
			<% } if(cwUser.hasPermission(User.PL_SERVICE_MANAGE)){ %>
				<li id="nav-services">Services
					<script type="text/javascript" src="<c:url value="/static/js/services.js" />"></script>
	   	 		</li>
	   	 		</li>
    		<% } if(cwUser.hasPermission(User.PL_ROOM_MANAGE)){ %>
				<li id="nav-rooms">Rooms
		 			<script type="text/javascript" src="<c:url value="/static/js/rooms.js" />"></script>
		 			<script type="text/javascript" src="<c:url value="/static/js/rooms-grid.js" />"></script>
		 		</li>
    		<% } if(cwUser.hasPermission(User.PL_REPORT_VIEW)){ %>
				<li id="nav-reports">Reports
		 			<script type="text/javascript" src="<c:url value="/static/js/report-list.js" />"></script>
		 			<script type="text/javascript" src="<c:url value="/static/js/report-viewer.js" />"></script>
		 		</li>
			<% } if(cwUser.isAdmin()){ %>
				<li id="nav-settings">Settings		
					
	   	 		</li>
    		<% } %>
        </ul>
    </div>
        
    <script type="text/javascript">
    Ext.onReady(function(){
    	var nav = Ext.getCmp('navigation-panel');
    	nav.doLayout();    	
    	
    	var content = Ext.getCmp('content-panel');
		content.removeAll(true);			
		content.add(new CalendarPanel());
		content.doLayout();
		return;
    });
    </script>
</body>
</html>