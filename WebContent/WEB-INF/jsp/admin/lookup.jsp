<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:forEach var="searchResult" items="${searchResultList}" varStatus="counter">
	<div id="resultTab${counter.count}" class="x-hide-display" style="padding: 0px 10px;">
		<c:out value="${searchResult}" escapeXml="false"/>
	</div>
</c:forEach>

<script type="text/javascript">
	var tabPanel = Ext.getCmp('searchTabPanel');
	<c:forEach var="searchResult" items="${searchResultList}" varStatus="counter">
		tabPanel.add(new SearchPanelResult({title:"<c:out value="${counter.count}-${searchResult.typeName}"/>", description:"<c:out value="resultTab${counter.count}"/>", vehicleId:"<c:out value="${searchResult.vehicleId}"/>"}));	
	</c:forEach>
	
	<c:if test="${empty searchResultList}">
		Ext.growl.message('Success', 'Your search returned no results.');
	</c:if>

</script>
