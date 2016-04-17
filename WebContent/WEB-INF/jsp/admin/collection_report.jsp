<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="com.cambiolabs.citewrite.data.*" %>

<%! private int Contador = 0; %>


	<div style="width: 100%; float: left;">
		<div style="width: 100%; float: left;">
			<dl class="list" style="font-size:14px;">
				<dt style="background:#FFFFFF; color:#f4dc49; text-align:center; padding:5px; font-size:24px;">Payment Collection Report</dt>	
				<dd style="background:#FFFFFF; color:#f4dc49; text-align:center; padding:5px; font-size:24px;"></dd> 	
				<dt style="background:#FFFFFF; color:#fd8838; text-align:left; padding:5px; font-size:14px;">Created: <c:out value="${date.formatdate}" /></dt>	
				<dd style="background:#FFFFFF; color:#fd8838; text-align:center; padding:5px; font-size:14px;"></dd> 	
				<dt></dt><dd></dd>	
			</dl>
		</div>	
	</div>	
		<div class="mealplan" style="width: 100%; float: left;">
		 <hr>  
		<table>
			  <thead>
				  <tr>
				    <th>Res No</th><th>Check-In</th><th>Agency</th><th>Guest</th><th>Terms</th> <th>Charge</th><th>Paid</th><th>Balance</th>
				  </tr>
			  </thead>
			  <tr style="background:#E1E1E1;"><td colspan=8; style="color:#fd8838; text-align:left; font-size:18px; font-style:bold;">Checked In </td> </tr>
			<c:forEach items="${reservationsCheckin}" var="item">	 
				 	<tr>
						<td><c:out value="${item.reservation_number}" /></td>
						<td><c:out value="${item.checkInFormated}" /></td>
						<td><c:out value="${item.agencyName}" /></td> 
						<td><c:out value="${item.guestName}" /></td>
						<td><c:out value="${item.paymentTerms}" /></td>
						<td><c:out value="${item.totalWOPaid}" /></td>
						<td><c:out value="${item.totalPaid}" /></td>
						<td><c:out value="${item.totalBalance}" /></td> 
				 	</tr>			 	
			</c:forEach>
			<tr></tr>
			<tr style="background:#E1E1E1;"><td colspan=8; style="color:#fd8838; text-align:left; font-size:18px;">Checked Out </td> </tr>
			<c:forEach items="${reservationsCheckout}" var="item">	
				 <tr>
						<td><c:out value="${item.reservation_number}" /></td>
						<td><c:out value="${item.checkInFormated}" /></td>
						<td><c:out value="${item.agencyName}" /></td> 
						<td><c:out value="${item.guestName}" /></td>
						<td><c:out value="${item.paymentTerms}" /></td>
						<td><c:out value="${item.totalWOPaid}" /></td>
						<td><c:out value="${item.totalPaid}" /></td>
						<td><c:out value="${item.totalBalance}" /></td>
				</tr>
			</c:forEach>
			<tr></tr>
			<tbody></tbody>
		</table>
		<hr>
	</div>		