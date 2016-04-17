<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="com.cambiolabs.citewrite.data.*" %>

<%! private int Contador = 0; %>


	<div style="width: 100%; float: left;">
		<div style="width: 100%; float: left;">
			<dl class="list" style="font-size:14px;">
				<dt style="background:#FFFFFF; color:#802CD8; text-align:center; padding:5px; font-size:24px;">Meal Plan Report</dt>	
				<dd style="background:#FFFFFF; color:#802CD8; text-align:center; padding:5px; font-size:24px;"></dd> 	
				<dt style="background:#FFFFFF; color:#CA337E; text-align:left; padding:5px; font-size:14px;"><c:out value="${date.formatdate}" /></dt>	
				<dd style="background:#FFFFFF; color:#CA337E; text-align:center; padding:5px; font-size:14px;"></dd> 	
				<dt></dt><dd></dd>	
			</dl>
		</div>	
	</div>	
		<div class="mealplan" style="width: 100%; float: left;">
		 <hr>  
		<table>
			  <thead>
				  <tr>
				    <th>Room No</th><th>Guest Name</th><th>Qty</th><th>Plan</th><th style="text-align:center;">Breakfast</th> <th style="text-align:center;">Launch</th><th style="text-align:center;">Dinner</th>
				  </tr>
			  </thead>
			 
			<c:forEach items="${reservations}" var="item">	
			 <tr>
			 		<td><c:out value="${item.rooms}" /></td>
			 		<td><c:out value="${item.guestName}" /></td>
					<td><c:out value="${item.reservation_rooms_occupancy}" /></td> 
					<td><c:out value="${item.mealPlanName}" /></td>
					<td style="text-align:center;"><input type="checkbox"></td>
					<td style="text-align:center;"><input type="checkbox"></td>
					<td style="text-align:center;"><input type="checkbox"></td>								
			 </tr>		
			</c:forEach>
			<tfoot>
				<tr>
					<td colspan="7"><div id="paging">
							<ul>
								<li><a href="#"><span>Previous</span></a></li>
								<li><a href="#" class="active"><span>1</span></a></li>
								<li><a href="#"><span>2</span></a></li>
								<li><a href="#"><span>3</span></a></li>
								<li><a href="#"><span>4</span></a></li>
								<li><a href="#"><span>5</span></a></li>
								<li><a href="#"><span>Next</span></a></li>
							</ul>
						</div>
				</tr>
			</tfoot>
			<tbody></tbody>
		</table>
	</div>		