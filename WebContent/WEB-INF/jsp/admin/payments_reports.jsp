<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="com.cambiolabs.citewrite.data.*" %>

<%! private int Contador = 0; %>


	<div style="width: 100%; float: left;">
		<div style="width: 100%; float: left;">
			<dl class="list" style="font-size:14px;">
				<dt style="background:#FFFFFF; color:#f03535; text-align:center; padding:5px; font-size:24px;">Payments Report</dt>	
				<dd style="background:#FFFFFF; color:#f03535; text-align:center; padding:5px; font-size:24px;"></dd> 	
				<dt style="background:#FFFFFF; color:#990000; text-align:left; padding:5px; font-size:14px;"><c:out value="${start.formatdate}" />-<c:out value="${end.formatdate}" /></dt>	
				<dd style="background:#FFFFFF; color:#990000; text-align:right; padding:5px; font-size:14px;">Payment method:<c:out value="${paymentMethod}" /></dd> 
			</dl>
		</div>	
	</div>	
		<div class="mealplan" style="width: 100%; float: left;">
		 <hr>  
		<table>
			  <thead>
				  <tr>
				    <th>Received</th><th>Res Number</th><th>Payment Method</th><th>Transaction No.</th><th>Amount</th> <th>Guest Name</th><th>Agency Name</th>
				  </tr>
			  </thead>
			  	<c:forEach items="${calendar}" var="cal">	
			 		 <tr style="background:#E1E1E1;"><td colspan=7; style="color:#f03535; text-align:left; font-size:18px; font-style:bold;"><c:out value="${cal.monthYear}" /></td> </tr>
						<c:forEach items="${payments}" var="item">	
					  	<c:if test="${cal.monthNumber == item.monthNumber}"> 
					  		<c:if test="${cal.year == item.year}"> 
							  	<tr>
										<td><c:out value="${item.receiveDateFormated}" /></td> 
										<td><c:out value="${item.reservationNumber}" /></td> 
										<td><c:out value="${item.methodName}" /></td> 
										<td><c:out value="${item.transaction_no}" /></td>
										<td><c:out value="${item.amount}" /></td>
										<td><c:out value="${item.guestName}" /></td>
										<td><c:out value="${item.agencyName}" /></td> 
								 	</tr>
							 	</c:if>		
					 	</c:if>	
					</c:forEach>
				
				</c:forEach>
			
			<tr></tr>
			<tbody></tbody>
		</table>
		<hr>
	</div>		