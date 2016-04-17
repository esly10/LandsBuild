<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<style type="text/css">
	 	body{font-size: 30px; font-weight: bold;}
	 	div#header{border-bottom: 2px solid black;}
	 	div#content{margin-bottom: 10px;}
	 	div#descrip{float: left; font-size: 18px;font-weight: bold;margin:0px 10px 0px 5%; line-height: 40px; width: 200px;}
	 	div#descrip-content{font-size: 30px; font-weight: bold;}
	</style>
<div id="header">
<div style=" float: left; margin-right: 10%;">Temporary Permit</div>
<div style="text-align: right;"><c:out value="${permit.permitNumber}" /></div>
</div>
<div style="text-align: center;margin-bottom: 15px;"><c:out value="${permit.typeName}" /></div>
<div style="margin-bottom: 10px;">
<div id="descrip">Vehicle(s):</div>
	<c:forEach items="${permit.vehicles}" var="vehicle" >
		<div id="descrip-content"><c:out value="${vehicle.make}"/>(<c:if test="${vehicle.license eq ''}"><c:out value="${vehicle.vin}"/></c:if><c:out value="${vehicle.license}"/>)</div>
	</c:forEach>
</div>
<div id="content">
<div id="descrip">Start Date:</div>
<div id="descrip-content"><c:out value="${permit.validStart}"/></div>
</div>
<div id="content">
<div id="descrip">Expiration Date:</div>
<div id="descrip-content"><c:out value="${permit.validEnd}"/></div>
</div>