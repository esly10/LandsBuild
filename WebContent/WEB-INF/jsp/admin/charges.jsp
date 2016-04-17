<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="com.cambiolabs.citewrite.data.*" %>

<%! private int Contador = 0; %>


<div style="width: 100%; float: left;">
		<div style="width: 33%; float: left;">
			<dl class="list"; style="font-size:14px;">
				<dt style="background:#FFFFFF; color:#003d99; text-align:center; padding:5px; font-size:24px;">Detail of Charges</dt>	
				<dd style="background:#FFFFFF; color:#003d99; text-align:center; padding:5px; font-size:24px;"></dd> 	
				<dt style="background:#FFFFFF; color:#00bbff; text-align:left; padding:5px; font-size:14px;"><c:out value="${reservation.reservation_number}" /></dt>	
				<dd style="background:#FFFFFF; color:#00bbff; text-align:center; padding:5px; font-size:14px;"></dd> 	 	
				<hr>	 
			<dt>Reservation #:</dt>	<dd><c:out value="${reservation.reservation_number}" />	- <c:out value="${reservation.typeName}" /></dd>	
			<dt>Room #:</dt><dd><c:out value="${room.ROOM_NO}" />
				</dd>
				<dt>Status:</dt><dd><c:out value="${reservation.statusName}" /></dd>
			</dl>
		</div>
		
		<div style="width: 34%; float: left;">
			<dl class="list"; style="font-size:14px;">
				<dt style="background:#FFFFFF; color:#003d99; text-align:center; padding:5px; font-size:24px;"></dt>	
				<dd style="background:#FFFFFF; color:#003d99; text-align:center; padding:5px; font-size:24px;"></dd> 	
				<dt style="background:#FFFFFF; color:#00bbff; text-align:left; padding:5px; font-size:14px;"></dt>	
				<dd style="background:#FFFFFF; color:#00bbff; text-align:center; padding:5px; font-size:14px;"></dd> 	 	
				<hr>	
				<dt>Check in:</dt><dd><c:out value="${reservation.reservation_check_in_format}" /></dd>
				<dt>Check out:</dt><dd><c:out value="${reservation.reservation_check_out_format}"/> (<c:out value="${reservation.reservation_nights}" /> Nights)</dd>
				<dt>Occupancy:</dt><dd><c:out value="${reservation.reservation_adults}" /> ( <c:out value="${reservation.reservation_adults}"/> Adults, 
				<c:out value="${reservation.reservation_children}"/> Children, <c:out value="${reservation.reservation_guides}"/> Guides.)</dd>
				<dt>Meal Plan:</dt><dd><c:out value="${reservation.mealPlanName}" /></dd>
				
			</dl>
		</div>
		<div style="width: 33%; float: right;">
			<dl class="list"; style="font-size:14px;">
				<dt style="background:#FFFFFF; color:#003d99; text-align:center; padding:5px; font-size:24px;"></dt>	
				<dd style="background:#FFFFFF; color:#003d99; text-align:center; padding:5px; font-size:24px;"></dd> 	
				<dt style="background:#FFFFFF; color:#00bbff; text-align:left; padding:5px; font-size:14px;"></dt>	
				<dd style="background:#FFFFFF; color:#00bbff; text-align:center; padding:5px; font-size:14px;"></dd> 	 	
				<hr>
				<dt>Guest:</dt><dd><c:out value="${guest.name}"/></dd>
				<dt>Contact:</dt><dd><c:out value="${guest.phone} || ${guest.email}"/></dd>		
				<dt>Agency:</dt><dd><c:out value="${agency.agency_name}"/></dd>
				<dt>Contact:</dt><dd><c:out value="${agency.agency_phone} || ${agency.agency_email}"/></dd>	
				
			</dl>	
		</div>	
	</div>
	<div style="width: 100%; float: left;">
		<div style="width: 100%; font-size:14px;">
			<dl class="list">
				<dt style="background:#FFFFFF; color:#00bbff; text-align:left; padding:5px; font-size:14px;">Rooms Related</dt>	
				<dd style="background:#FFFFFF; color:#00bbff; text-align:center; padding:5px; font-size:14px;"></dd> 	
			</dl>
				<hr>
			<ul>
				
				<dl><dt></dt><dd></dd></dl>	
				 <c:forEach items="${roomsrelated}" var="rooms">	
				  			<li>Room #: <c:out value="${rooms.ROOM_NO}" /></li>
				  </c:forEach>
			</ul>
			<hr>
		</div>
	</div>
	<div style="width: 100%; float: left;">
		<c:if test = "${agencySize > 0}">	
			<table  class="tableCharge"  style="width:100%; float: right;";>
				 <tr><td colspan=6>Agency Charges: </td></tr>
				  <tr>
				    <th>Item</th><th>Description</th><th>Qty</th><th>Rate</th> <th>Total</th>
				  </tr>
				<c:forEach items="${agencyCharges}" var="item">	
				 <tr>
						<td><c:out value="${item.charge_item_name}" /></td> 
						<td><c:out value="${item.charge_item_desc}" /></td>
						<td><c:out value="${item.charge_qty}" /></td>
						<td>$ <c:out value="${item.charge_rate}" /></td>
						
						<td>$ <c:out  value="${item.charge_total}" /></td>								
				 </tr>		
				</c:forEach>
				
				<tr><td colspan=4 style="border-top: 1px solid #000;">Sub Total:</td><td colspan=2 style="border-top: 1px solid #000;">$ <c:out value="${reservation.agencyCharges}" /></td></tr>
				<tr><td colspan=4>Tax:</td><td colspan=2> <c:out value="${reservation.agencyFormatTax}" /></td></tr>
				<tr><td colspan=4>Paid:</td><td colspan=2;  style="color:red;">$ <c:out value="${reservation.agencyPaid}" /></td></tr>		
				<tr><td colspan=4>Total:</td><td colspan=2> <c:out value="${reservation.totalAgency}" /></td></tr>
			
			</table>
		</c:if>
		<c:if test = "${guestSize > 0}">	
			<table class="tableCharge" style="width:100%;  float: left;";>
			<tr><td colspan=6>Guest Charges: </td></tr>
				  <tr>
				    <th>Item</th><th>Description</th><th>Qty</th><th>Rate</th><th>Total</th>
				  </tr>
				<c:forEach items="${guestCharges}" var="item">	
				 <tr>
						<td><c:out value="${item.charge_item_name}" /></td> 
						<td><c:out value="${item.charge_item_desc}" /></td>
						<td><c:out value="${item.charge_qty}" /></td>
						<td>$ <c:out value="${item.charge_rate}" /></td>
						
						<td>$ <c:out  value="${item.charge_total}" /></td>							
				 </tr>		
				</c:forEach>
				
				<tr><td colspan=4  style="border-top: 1px solid #000;">Sub Total:</td><td colspan=2  style="border-top: 1px solid #000;">$ <c:out value="${reservation.guestCharges}" /></td></tr>
				<tr><td colspan=4>Tax:</td><td colspan=2> <c:out value="${reservation.guestFormatTax}" /></td></tr>
				<tr><td colspan=4>Paid:</td><td colspan=2  style="color:red;">$ <c:out value="${reservation.guestPaid}" /></td></tr>	
				<tr><td colspan=4>Total:</td><td colspan=2> <c:out value="${reservation.totalGuest}" /></td></tr>
			</table>
		</c:if>
		<table class="tableCharge" style="width:100%;";>
		<tr><td colspan=6>Totals: </td></tr>
			  <tr>
			    <th>Folio</th><th>Amount</th>
			  </tr>
			
			 <tr>
					<td>Agency Balance</td> 
					<td> <c:out value="${reservation.totalAgency}" /></td>
			 </tr>	
			  <tr>
					<td>Guest Balance</td> 
					<td> <c:out value="${reservation.totalGuest}" /></td>
			 </tr>	
			 <tr >
					<td style="font-size:18px;">Balance</td> 
					<td style="font-size:18px;"> <c:out value="${reservation.totalCharges}" /></td>
			 </tr>		
		</table>
	<hr>
</div>
	
	
	

												
												