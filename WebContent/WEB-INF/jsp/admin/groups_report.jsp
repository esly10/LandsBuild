<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="com.cambiolabs.citewrite.data.*" %>

<%! private int Contador = 0; %>


	<div style="width: 100%; float: left;">
		<div style="width: 100%; float: left;">
			<dl class="list" style="font-size:14px;">
				<dt style="background:#FFFFFF; color:#49e34c; text-align:center; padding:5px; font-size:24px;">Group Events Report</dt>	
				<dd style="background:#FFFFFF; color:#49e34c; text-align:center; padding:5px; font-size:24px;"></dd> 	
				<dt style="background:#FFFFFF; color:#f4dc49; text-align:left; padding:5px; font-size:14px;"><c:out value="${date.formatdate}" /> </dt>	
				<dd style="background:#FFFFFF; color:#f4dc49; text-align:center; padding:5px; font-size:14px;"></dd> 	
				<dt></dt><dd></dd>	
				<dt style="background:#4f5f6f; color:#FFFFFF; text-align:center; padding:5px; font-size:14px;">Next one day tours since:</dt>	
				<dd style="background:#4f5f6f; color:#FFFFFF; text-align:center; padding:5px; font-size:14px;"><c:out value="${date.formatdate}" /></dd> 	
			</dl>
		</div>	
	</div>	
	
	<div>	
	
	<hr size="2" color="#4f5f6f">
		<c:forEach items="${reservations}" var="item">	
		
		<div style="width: 100%; float: left;">
		
				<div style="width: 33%; float: left;">
					<dl class="list"; style="font-size:14px;">
						<dt style="background:#FFFFFF; color:#00cc00; text-align:left; padding:2px; font-size:18px;"><c:out value="${item.typeName}" />
						</dt><dd style="background:#FFFFFF; color:#00cc00; text-align:left; padding:2px; font-size:18px;"></dd>	
						<hr style="color:#00cc00;"/>
						<dt></dt><dd></dd>	
						
						<dt><c:out value="${item.checkInFormated}" /></dt> <dd></dd>
						<dt><c:out value="${item.statusName}" /></dt>
						<dd><c:out value="${item.mealPlanName}" /></dd>
						<dt>Agency:</dt><dd><c:out value="${item.agencyName}"/></dd>
						<dt>Attended:</dt><dd><c:out value="${item.userName}" /></dd>
						<dt></dt><dd></dd>
						
					</dl>
				</div>
				
				<div style="width: 34%; float: left;">
					<dl class="list"; style="font-size:14px;">
						<dt style="background:#FFFFFF; color:#00cc00; text-align:left; padding:2px; font-size:18px;"><c:out value="${item.guestName}" /></dt><dd style="background:#FFFFFF; color:#00cc00; text-align:left; padding:2px; font-size:18px;"></dd>
						<hr>
						<dt></dt><dd></dd>	
						<dt>Adults:</dt><dd><c:out value="${item.reservation_adults}" /></dd>
						<dt>Children:</dt><dd><c:out value="${item.reservation_children}" /></dd>
						<dt>Guides:</dt><dd><c:out value="${item.reservation_guides}" /></dd>
						<dt style="text-decoration: underline;">Total:</dt><dd style="text-decoration: underline;"><c:out value="${item.reservation_rooms_occupancy}" /> </dd>
						<dt></dt><dd></dd>
						
					</dl>
				</div>
				<div style="width: 33%; float: right;">
					<dl class="list"; style="font-size:14px;">
					<dt style="background:#FFFFFF; color:#00cc00; text-align:left; padding:2px; font-size:18px;"></dt><dd style="background:#FFFFFF; color:#e6b800; text-align:right; padding:2px; font-size:18px;"><c:out value="${item.reservation_number}" /></dd>
					<hr>
					<dt></dt><dd></dd>	
						<dt>Notes</dt><dd></dd>
						<dt>Transport:</dt><dd><c:out value="${item.reservation_transport_notes}"/></dd>		
						<dt>Service:</dt><dd><c:out value="${item.reservation_service_notes}"/></dd>
						<dt>Internal:</ cvdt><dd><c:out value="${item.reservation_internal_notes}"/></dd>	
						<dt></dt><dd></dd>
						
					</dl>	
				</div>
				</div>
				
				<hr size="2" color="#4f5f6f">
				
			</c:forEach>		
		</div>