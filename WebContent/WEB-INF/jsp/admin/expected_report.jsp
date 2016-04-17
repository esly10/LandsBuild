<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="com.cambiolabs.citewrite.data.*" %>

<%! private int Contador = 0; %>


	<div style="width: 100%; float: left;">
		<div style="width: 100%; float: left;">
			<dl class="list" style="font-size:14px;">
				<dt style="background:#FFFFFF; color:#f0359d; text-align:center; padding:5px; font-size:24px;">Expected occupancy Report</dt>	
				<dd style="background:#FFFFFF; color:#f0359d; text-align:center; padding:5px; font-size:24px;"></dd> 	
				<dt style="background:#FFFFFF; color:#f03535; text-align:left; padding:5px; font-size:14px;"><c:out value="${now.formatdate}" /> - <c:out value="${end.formatdate}" /></dt>	
				<dd style="background:#FFFFFF; color:#f03535; text-align:center; padding:5px; font-size:14px;"></dd> 	
				<dt></dt><dd></dd>	
			</dl>
		</div>	
	</div>	
	
	<div>	
	
	<hr size="2" color="#4f5f6f">
		<c:forEach items="${calendar}" var="item">	
		
		<div style="width: 100%; float: left;">
		
				<div style="width: 33%; float: left;">
					<dl class="list"; style="font-size:14px;">
						<dt style="background:#E1E1E1; color:#f0359d; text-align:left; padding:5px; font-size:14px;"><c:out value="${item.formatdate}" /></dt>	
						<dd style="background:#E1E1E1; color:#f0359d; text-align:center; padding:5px; font-size:14px;"></dd> 
						<hr>	
						<dt style="text-decoration: underline;">Hotel Guest:</dt><dd style="text-decoration: underline;"></dd>
						<dt>Morning:</dt><dd><c:out value="${item.morningOccupancy}" />  <c:out value="${item.morningRooms}" /></dd>
						<dt>Check-Outs:</dt><dd><c:out value="${item.checkoutsRes}" />  <c:out value="${item.checkoutsRooms}" /></dd>
						<dt>Check-Ins:</dt><dd><c:out value="${item.checkinsRes}" />   <c:out value="${item.checkinsRooms}" /></dd>
						<dt>Evening:</dt><dd><c:out value="${item.eveningOccupancy}" />  <c:out value="${item.eveningRooms}" /></dd>
						
						<dt></dt><dd></dd>
					</dl>
				</div>
				
				<div style="width: 34%; float: left;">
					<dl class="list"; style="font-size:14px;">
						<dt style="background:#E1E1E1; color:#f0359d; text-align:left; padding:5px; font-size:14px;"></dt>	
						<dd style="background:#E1E1E1; color:#f0359d; text-align:center; padding:5px; font-size:14px;"></dd> 
						<hr>	
						<dt style="text-decoration: underline;">Groups:</dt><dd style="text-decoration: underline;"></dd>
						<c:forEach items="${item.groups}" var="group">
							<dt style="width: 10px;"></dt><dd><c:out value="${group}" /></dd>
						</c:forEach>				
						<dt></dt><dd></dd>
					</dl>
				</div>
				<div style="width: 33%; float: right;">
					<dl class="list"; style="font-size:14px;">
						<dt style="background:#E1E1E1; color:#f0359d; text-align:left; padding:5px; font-size:14px;"></dt>	
						<dd style="background:#E1E1E1; color:#f0359d; text-align:center; padding:5px; font-size:14px;"></dd> 
						<hr>		
						<dt style="text-decoration: underline;">Events:</dt><dd style="text-decoration: underline;"></dd>
						<c:forEach items="${item.events}" var="event">
							<dt style="width: 10px;"></dt><dd><c:out value="${event}" /></dd>
						</c:forEach>
									
						<dt></dt><dd></dd>
					</dl>	
				</div>
				</div>
				
				<hr size="2" color="#4f5f6f">
				
			</c:forEach>		
		</div>