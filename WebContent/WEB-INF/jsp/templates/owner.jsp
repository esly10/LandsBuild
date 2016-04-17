<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<jsp:useBean id="date" class="java.util.Date" />

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="Content-Language" content="en-us" />
	<meta http-equiv="Expires" content="Tue, 01 Jan 1980 00:00:00 GMT" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Content-Style-Type" content="text/css" />
	
	<title><c:out value="${title}" /></title>
	<link rel="stylesheet" type="text/css" href="<c:url value="/static/css/public.css" />" media="all" />
	
	<script type="text/javascript" src="<c:url value="/static/js/library/jquery/jquery-1.8.3.min.js" />"></script>
	<script type="text/javascript" src="<c:url value="/static/js/library/jquery/jquery.limitkeypress.min.js" />"></script>
	<script type="text/javascript">
		var _contextPath = '<%= request.getContextPath() %>';
	</script>
	

	
</head>

<body >
	<div id="body-frame">	
		<div id="site-frame"  style="height: auto; min-height: 710px;">
			<div id="header">
				
				<div id="welcome">Welcome, <c:out value="${owner.firstName}" /> <c:out value="${owner.lastName}" /></div>
				<div id="account">
					<a href="<c:url value="/owner/account" />" >My Account </a>&nbsp;&nbsp;<a href="<c:url value="/owner/citation" />">My Citations </a>&nbsp;&nbsp;<a href="<c:url value="/owner/invoices" />">My Transactions </a>&nbsp;&nbsp;<a href="<c:url value="/logout" />">Log Out</a>			
				</div>
				
				<div id="logo"></div>  
				
			</div>
			
			<tiles:insertAttribute name="main-content" />
			
		</div>
			 <div id="footer" class="public"><div>&copy; <fmt:formatDate value="${date}" pattern="yyyy" /> Cambio CiteWrite. All Rights Reserved</div><div><a href="<c:url value="/index/policy" />" target="_blank">Privacy Policy</a>&nbsp;<label>|</label>&nbsp;<a href="<c:url value="/index/terms" />" target="_blank">Terms &amp; Condition</a></div></div>
	</div>

</body>
</html>