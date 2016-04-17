<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ page import="org.springframework.mobile.device.site.SitePreferenceUtils" %>
<%@ page import="org.springframework.mobile.device.site.SitePreference" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<jsp:useBean id="date" class="java.util.Date" />
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta http-equiv="Content-Language" content="en-us" />
		<meta http-equiv="Expires" content="Tue, 01 Jan 1980 00:00:00 GMT" />
		<meta http-equiv="Pragma" content="no-cache" />
		<meta http-equiv="Content-Style-Type" content="text/css" />
		
		<title>CiteWrite Mobile</title>
		
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
		<link rel="stylesheet" type="text/css" href="http://cdn.leafletjs.com/leaflet-0.5.1/leaflet.css" />
		<script src="http://cdn.leafletjs.com/leaflet-0.5.1/leaflet.js"></script>
		
		<link rel="stylesheet" type="text/css" href="<c:url value="/static/js/library/jquery/jquery.mobile/jquery.mobile-1.2.0.min.css"/>" media="all" />
		<link rel="stylesheet" type="text/css" href="<c:url value="/static/css/mobile.css" />" media="all" />
		
		
		<script type="text/javascript" src="<c:url value="/static/js/library/jquery/jquery-1.8.3.min.js" />"></script>
		<script src="<c:url value="/static/js/library/jquery/jquery.mobile/jquery.mobile-1.2.0.min.js"/>"></script>
		<script type="text/javascript" src="<c:url value="/static/js/library/jquery/jquery.limitkeypress.min.js" />"></script>
		<script type="text/javascript">
			var _contextPath = '<%= request.getContextPath() %>';
			
		    jQuery(document).bind("ready", function(){
		        $.extend(  $.mobile , {
		        	ajaxEnabled: false,
		        	ajaxLinksEnabled: false,
		        	autoInitializePage: false
		          });
		        });
		</script>
	
		
	</head>

	<body class="pay-ticket">
		<div data-role="page" id="inici"  data-theme="a">
			<div id="body-frame">	
				<div id="site-frame">
					<div id="header">
						
						 <div id="logo"></div>
						 
						
					</div>
					
					<tiles:insertAttribute name="main-content" />
					<% SitePreference sitePreference = SitePreferenceUtils.getCurrentSitePreference(request); %>
				</div>
				<div id="footer" class="public"><div>&copy; <fmt:formatDate value="${date}" pattern="yyyy" /> Cambio CiteWrite. All Rights Reserved</div><div><a href="<c:url value="/index/policy" />" target="_blank">Privacy Policy</a>&nbsp;<label>|</label>&nbsp;<a href="<c:url value="/index/terms" />" target="_blank">Terms &amp; Condition</a></div></div>
			<div id="site-preference"><a <%if(sitePreference == sitePreference.NORMAL){%> style="color: #5B6271;"  <%} %>href="${currentUrl}?site_preference=normal"> Desktop</a>&nbsp;|&nbsp;<a <%if(sitePreference == SitePreference.MOBILE){%> style="color: #5B6271;"  <%} %>href="${currentUrl}?site_preference=mobile">Mobile</a></div>
		</div>
		</div>
		
	</body>
</html>