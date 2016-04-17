<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="com.cambiolabs.citewrite.data.*" %>

<%! private int Contador = 0; %>


	<div style="width: 100%; float: left;">
		<div style="width: 100%; float: left;">
			<dl class="list" style="font-size:14px;">
				<dt style="background:#FFFFFF; color:#35a0f0; text-align:center; padding:5px; font-size:24px;">Marketing Report</dt>	
				<dd style="background:#FFFFFF; color:#35a0f0; text-align:center; padding:5px; font-size:24px;"></dd> 	
				<dt style="background:#FFFFFF; color:#fd8838; text-align:left; padding:5px; font-size:14px;"><c:out value="${start.formatdate}" /> - <c:out value="${end.formatdate}" /></dt>	
				<dd style="background:#FFFFFF; color:#fd8838; text-align:center; padding:5px; font-size:14px;"></dd> 	
				<dt></dt><dd></dd>	
				<dt style="background:#35a0f0; color:#FFFFFF; text-align:center; padding:5px; font-size:14px;">Created:</dt>	
				<dd style="background:#35a0f0; color:#FFFFFF; text-align:center; padding:5px; font-size:14px;"><c:out value="${now.formatdate}" /></dd> 	
			</dl>
		</div>	
	</div>	
	
	<div>	
	<hr>
		<c:forEach items="${reservations}" var="item">	
		<div style="width: 100%; float: left;">
		
				<div style="width: 33%; float: left;">
					<dl class="list"; style="font-size:14px;">
						<dt></dt><dd></dd>	
						<dt><c:out value="${item.reservation_number}" />	</dt>
						<dd><c:out value="${item.typeName}" /></dd>	
						<dt>Guest:</dt><dd><c:out value="${item.guestName}"/></dd>
						<dt>Agency:</dt><dd><c:out value="${item.agencyName}"/></dd>
						<dt>Attended:</dt><dd><c:out value="${item.userName}" /></dd>
						<dt></dt><dd></dd>
					</dl>
				</div>
				<div style="width: 34%; float: left;">
					<dl class="list"; style="font-size:14px;">
						<dt></dt><dd></dd>	
						<dt>Check in:</dt><dd><c:out value="${item.reservation_check_in}" /></dd>
						<dt>Nights:</dt><dd><c:out value="${item.reservation_nights}" /></dd>
						<dt>Rooms:</dt><dd><c:out value="${item.rooms}" /></dd>
						<dt>Occupancy:</dt><dd><c:out value="${item.reservation_rooms_occupancy}" /> </dd>
						<dt></dt><dd></dd>
					</dl>
				</div>
				<div style="width: 33%; float: right;">
					<dl class="list"; style="font-size:14px;">
						<dt></dt><dd></dd>	
						<dt>Notes</dt><dd></dd>
						<dt>Transport:</dt><dd><c:out value="${item.reservation_transport_notes}"/></dd>		
						<dt>Service:</dt><dd><c:out value="${item.reservation_service_notes}"/></dd>
						<dt>Internal:</dt><dd><c:out value="${item.reservation_internal_notes}"/></dd>	
						<dt></dt><dd></dd>
					</dl>	
				</div>
				</div>
				<hr>
			</c:forEach>		
		</div>
	