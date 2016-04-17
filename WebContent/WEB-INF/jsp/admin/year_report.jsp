<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="com.cambiolabs.citewrite.data.*" %>

<%! private int Contador = 0; %>


	<div style="width: 100%; float: left;">
		<div style="width: 100%; float: left;">
			<dl class="list" style="font-size:14px;">
				<dt style="background:#FFFFFF; color:#fd8838; text-align:center; padding:5px; font-size:24px;">Occupancy Month Report</dt>	
				<dd style="background:#FFFFFF; color:#fd8838; text-align:center; padding:5px; font-size:24px;"></dd> 	
				<dt style="background:#FFFFFF; color:#cc9900; text-align:left; padding:5px; font-size:14px;"><c:out value="${now.formatdate}" /></dt>	
				<dd style="background:#FFFFFF; color:#cc9900; text-align:center; padding:5px; font-size:14px;"></dd> 	
				<hr>
				<dt style="background:#fd8838; color:#FFFFFF; text-align:left; padding:2px; font-size:18px;">Year: <c:out value="${year}" /></dt>	
				<dd style="background:#fd8838; color:#FFFFFF; text-align:center; padding:2px; font-size:20px;"></dd> 	
			</dl>
		</div>	
	</div>	
	<div class="mealplan" style="width: 100%; float: left;">
	<table>
			  <thead>
				  <tr>
				    <th>Month</th><th>Nights</th><th>Guests</th>
				  </tr>
			  </thead>
			 
			<c:forEach items="${calendar}" var="item">	
			 <tr>
			 		<td><c:out value="${item.month}" /></td>
			 		<td><c:out value="${item.monthNights}" /></td>
					<td><c:out value="${item.monthGuests}" /></td> 					
			 </tr>		
			</c:forEach>
			<tr>
			 							
			 </tr>
			<tfoot>
				<tr style="text-width: bold; font-size:14px; background:#E1E1E1;" >
					<td>TOTAL</td>
			 		<td><c:out value="${totalNights}" /></td>
					<td><c:out value="${totalGuests}" /></td> 
				</tr>
			</tfoot>
			<tbody></tbody>
		</table>
		 <hr>  
	</div>	