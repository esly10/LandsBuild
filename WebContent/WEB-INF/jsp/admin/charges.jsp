<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="com.cambiolabs.citewrite.data.*" %>

<%! private int Contador = 0; %>


<div style="width: 100%; float: left;">
		<div style="width: 33%; float: left;">
			<dl class="list"; style="font-size:14px;">
				<dt style="background:#FFFFFF; color:#001a66; text-align:center; padding:5px; font-size:24px;">Detail of Charges</dt>	
				<dd style="background:#FFFFFF; color:#001a66; text-align:center; padding:5px; font-size:24px;"></dd> 	
				<dt style="background:#FFFFFF; color:#4d79ff; text-align:left; padding:5px; font-size:14px;"><c:out value="${reservation.reservation_number}" /></dt>	
				<dd style="background:#FFFFFF; color:#4d79ff; text-align:center; padding:5px; font-size:14px;"></dd> 	 	
				<hr>	 
				<dt>Reservation #:</dt>	<dd><c:out value="${reservation.reservation_number}" />	- <c:out value="${reservation.typeName}" /></dd>	
				<dt>Room #:</dt><dd><c:out value="${room.ROOM_NO}" />
				</dd>
				<dt>Status:</dt><dd><c:out value="${reservation.statusName}" /></dd>
				<dt>Rooms Related:</dt><dd><c:out value="${reservation.reservation_rooms_comma_separate}" /></dd>
			</dl>
		</div>
		
		<div style="width: 34%; float: left;">
			<dl class="list"; style="font-size:14px;">
				<dt style="background:#FFFFFF; color:#001a66; text-align:center; padding:5px; font-size:24px;"></dt>	
				<dd style="background:#FFFFFF; color:#001a66; text-align:center; padding:5px; font-size:24px;"></dd> 	
				<dt style="background:#FFFFFF; color:#4d79ff; text-align:left; padding:5px; font-size:14px;"></dt>	
				<dd style="background:#FFFFFF; color:#4d79ff; text-align:center; padding:5px; font-size:14px;"></dd> 	 	
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
				<dt style="background:#FFFFFF; color:#001a66; text-align:center; padding:5px; font-size:24px;"></dt>	
				<dd style="background:#FFFFFF; color:#001a66; text-align:center; padding:5px; font-size:24px;"></dd> 	
				<dt style="background:#FFFFFF; color:#4d79ff; text-align:left; padding:5px; font-size:14px;"></dt>	
				<dd style="background:#FFFFFF; color:#4d79ff; text-align:center; padding:5px; font-size:14px;"></dd> 	 	
				<hr>
				<dt>Guest:</dt><dd><c:out value="${guest.name}"/></dd>
				<dt>Contact:</dt><dd><c:out value="${guest.phone} || ${guest.email}"/></dd>		
				<c:if test="${agency.agency_name != null}">
					<dt>Agency:</dt><dd><c:out value="${agency.agency_name}"/></dd>
					<dt>Contact:</dt><dd><c:out value="${agency.agency_phone} || ${agency.agency_email}"/></dd>	
				</c:if>
			</dl>	
		</div>	
	</div>
	
	<div style="width: 100%; float: left;">
			<c:if test = "${agencySize > 0}">	
				<table  class="tableCharge"  style="width:100%; float: right;";>
					 <tr><td colspan=7 style="background:#037dcf;">Agency</td></tr>
					 <tr><td colspan=7 style="border-top: 1px solid #000; background:#FFFFFF; color:#4d79ff; font-size:14px; font-weight: bold; ">Charges</td></tr>
					  <tr>
					    <th>Date</th><th>Item</th><th>Description</th><th>Qty</th>
					    <c:if test="${reservation.reservation_type != 3}"><th style="">Nights</th></c:if>
					    <th>Rate</th><th>Total</th>
					  	</tr>
						<c:forEach items="${agencyCharges}" var="item">	
						 <tr>
						 		<td><c:out value="${item.chargeDateFormat}" /></td>
								<td><c:out value="${item.charge_item_name}" /></td> 
								<td><c:out value="${item.charge_item_desc}" /></td>
								<td><c:out value="${item.charge_qty}" /></td>
								<c:if test="${reservation.reservation_type != 3}">
									<td style="text-align: center;"><c:out value="${item.charge_nights}" /></td>
								</c:if>
								<td>$ <c:out value="${item.charge_rate}" /></td>
								
								<td>$ <c:out  value="${item.charge_total}" /></td>								
						 </tr>		
						</c:forEach>
				</table>
			
			<c:if test = "${agencyPaySize > 0}">	
					<table  class="tableCharge"  style="width:100%; float: right;";>
						<tr><td colspan=5 style="border-top: 1px solid #000;  background:#FFFFFF; color:#4d79ff;">Payments</td></tr>
						  <tr>
						    <th>Payment Date</th><th>Receive Date</th><th>Method</th><th>Transaction</th><th>Amount</th>
						  </tr>
						<c:forEach items="${agencyPayments}" var="item">	
						 <tr>
								<td><c:out value="${item.paymentDateFormat}" /></td> 
								<td><c:out value="${item.receiveDateFormat}" /></td> 
								<td><c:out value="${item.methodName}" /></td>
								<td><c:out value="${item.transaction_no}" /></td>
								<td>$<c:out value="${item.amount}" /></td>
						 </tr>		
						</c:forEach>
					</table>
				</c:if>
				<c:if test = "${agencySize > 0}">	
					<table  class="tableCharge"  style="width:100%; float: right;";>
						<tr><td colspan=6 style="border-top: 1px solid #000; background:#FFFFFF; color:#4d79ff;">Totals: </td></tr>
						<tr><td colspan=4>Sub Total:</td><td colspan=2>$ <c:out value="${reservation.agencyCharges}" /></td></tr>
						<tr><td colspan=4>Tax:</td><td colspan=2>$ <c:out value="${reservation.agencyFormatTax}" /></td></tr>
						<tr><td colspan=4>Paid:</td><td colspan=2;  style="color:red;">$ <c:out value="${reservation.agencyPaid}" /></td></tr>		
						<tr><td colspan=4>Total:</td><td colspan=2>$ <c:out value="${reservation.totalAgency}" /></td></tr>
					</table>
				</c:if>
		</c:if>
		<c:if test = "${guestSize > 0}">	
				<table  class="tableCharge"  style="width:100%; float: right;";>
					 <tr><td colspan=7 style="background:#037dcf;">Guest</td></tr>
					 <tr><td colspan=7 style="border-top: 1px solid #000; background:#FFFFFF; color:#4d79ff; font-size:14px; font-weight: bold; ">Charges</td></tr>
					   <tr>
						    <th>Date</th><th>Item</th><th>Description</th><th>Qty</th>
						    <c:if test="${reservation.reservation_type != 3}"><th style="">Nights</th></c:if>
						    <th>Rate</th><th>Total</th>
						  </tr>
						<c:forEach items="${guestCharges}" var="item">	
						 <tr>
						 		<td><c:out value="${item.chargeDateFormat}" /></td> 
								<td><c:out value="${item.charge_item_name}" /></td> 
								<td><c:out value="${item.charge_item_desc}" /></td>
								<td><c:out value="${item.charge_qty}" /></td>
								<c:if test="${reservation.reservation_type != 3}">
									<td style="text-align: center;"><c:out value="${item.charge_nights}" /></td>
								</c:if>
								<td>$ <c:out value="${item.charge_rate}" /></td>
								
								<td>$ <c:out  value="${item.charge_total}" /></td>							
						 </tr>		
						</c:forEach>
				</table>
			
			<c:if test = "${guestPaySize > 0}">	
					<table  class="tableCharge"  style="width:100%; float: right;";>
						<tr><td colspan=5 style="border-top: 1px solid #000; background:#FFFFFF; color:#4d79ff;">Payments</td></tr>
						   <tr>
							    <th>Payment Date</th><th>Receive Date</th><th>Method</th><th>Transaction</th><th>Amount</th>
							  </tr>
							<c:forEach items="${guestPayments}" var="item">	
							 <tr>
									<td><c:out value="${item.paymentDateFormat}" /></td> 
									<td><c:out value="${item.receiveDateFormat}" /></td> 
									<td><c:out value="${item.methodName}" /></td>
									<td><c:out value="${item.transaction_no}" /></td>
									<td>$<c:out value="${item.amount}" /></td>
							 </tr>		
					</c:forEach>
					</table>
				</c:if>
				<c:if test = "${guestSize > 0}">	
					<table  class="tableCharge"  style="width:100%; float: right;";>
						<tr><td colspan=6 style="border-top: 1px solid #000; background:#FFFFFF; color:#4d79ff;">Totals: </td></tr>
						<tr><td colspan=4 >Sub Total:</td><td colspan=2>$ <c:out value="${reservation.guestCharges}" /></td></tr>
						<tr><td colspan=4>Tax:</td><td colspan=2> <c:out value="${reservation.guestFormatTax}" /></td></tr>
						<tr><td colspan=4>Paid:</td><td colspan=2  style="color:red;">$ <c:out value="${reservation.guestPaid}" /></td></tr>	
						<tr><td colspan=4>Total:</td><td colspan=2>$ <c:out value="${reservation.totalGuest}" /></td></tr>
					</table>
				</c:if>
		</c:if>
		<table class="tableCharge" style="width:100%;";>
		<tr><td colspan=6 style="background:#037dcf;">Totals: </td></tr>
			  <tr>
			    <th>Folio</th><th>Amount</th>
			  </tr>
			
			 <tr>
					<td>Agency Balance</td> 
					<td>$ <c:out value="${reservation.totalAgency}" /></td>
			 </tr>	
			  <tr>
					<td>Guest Balance</td> 
					<td>$ <c:out value="${reservation.totalGuest}" /></td>
			 </tr>	
			 <tr >
					<td style="font-size:18px;">Balance</td> 
					<td style="font-size:18px;">$ <c:out value="${reservation.totalCharges}" /></td>
			 </tr>		
		</table>
	<hr>
</div>
	
	
	

												
												