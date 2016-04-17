
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

<%@ page import="org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter" %>
<%@ page import="org.springframework.security.core.AuthenticationException" %>

<c:set var="now" value="<%=new java.util.Date()%>" />

<html>
<head>
	<title>Lands in Love Secure Login</title>
	
	<link href="<c:url value="/static/css/global.css" />" rel="stylesheet" type="text/css" />
	
	<link href="<c:url value="/static/js/library/ext/css/ext-all.css" />" rel="stylesheet" type="text/css" />
	<link href="<c:url value="/static/js/library/ext/css/citewrite.css" />" rel="stylesheet" type="text/css" />
	
	<script type="text/javascript" src="<c:url value="/static/js/library/prototype.js" />" ></script>
	<script type="text/javascript" src="<c:url value="/static/js/library/scriptaculous/scriptaculous.js?load=effects" />" ></script>
	<script type="text/javascript" src="<c:url value="/static/js/library/ext/adapter/ext-prototype-adapter.js" />" ></script>
	<script type="text/javascript" src="<c:url value="/static/js/library/ext/ext-all.js" />" ></script>

	<script type="text/javascript" src="<c:url value="/static/js/growl.js" />"></script>

		<c:if test="${not empty param.message}">
			<script type="text/javascript">
			    Ext.onReady(function(){
			    	Ext.growl.message("Login Error", "Invalid username and/or password");	
			    });
			</script>
		</c:if>
		
	<link rel="SHORTCUT ICON" HREF="<c:url value="/favicon.ico" />" />
</head>
<body style="padding: 0px; margin: 0px;  background-image:url(../static/images/bgLogin.png); background-repeat:repeat-x; background-position:top; background-size: auto 100%;">
<div id="login-frame">	
	<div id="site-frame">
		<div id="login-header"><div></div></div>
		<div id="login-body">
			<div id="top"></div>
			<div id="middle">	
				<form action="<c:url value="/admin/doLogin" />" method="POST">
					<div class="login-form-container">
						<dl class="login-form">
							<dt>Nickname</dt>
							<dd><input type="text" name="j_username" id="j_username" value="" /></dd>
							<dt>Password</dt>
							<dd><input type="password" id="j_password" name="j_password" value="" /></dd>
						</dl>
						<button type="submit" style="width: 100px;"><img src="<c:url value="/static/images/btn-login.png" />" /></button>
					</div>
				</form>
			</div>
			<div id="bottom"></div>
			
			<div id="login-copyright">
				&copy; <fmt:formatDate pattern="yyyy" value="${now}" /> Lands in Love. All Rights Reserved.
			</div>
		</div>
	</div>
</div>
</body>
</html>