<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="com.cambiolabs.citewrite.data.*" %>

<%! private int Contador = 0; %>


	<div style="width: 100%; float: left;">
		<div style="width: 100%; float: left;">
			<dl class="list" style="font-size:14px;">
				<dt style="background:#FFFFFF; color:#002db3; text-align:center; padding:5px; font-size:24px;">HouseKeeper Report</dt>	
				<dd style="background:#FFFFFF; color:#002db3; text-align:center; padding:5px; font-size:24px;"></dd> 	
				<dt style="background:#FFFFFF; color:#00b8e6; text-align:left; padding:5px; font-size:14px;"><c:out value="${start.formatdate}" /></dt>	
				<dd style="background:#FFFFFF; color:#00b8e6; text-align:center; padding:5px; font-size:14px;"></dd> 	
				<dt></dt><dd></dd>	
			</dl>
		</div>	
	</div>	
		<div class="mealplan" style="width: 100%; float: left;">
		 <hr>  
		<table>
			  <thead>
				  <tr>
				  <th>Room No</th>
				  <c:forEach items="${calendar}" var="item">	
				    <th><c:out value="${item.formatsmall}" />
				  </c:forEach>
				  </tr>
			  </thead>
			 
			<c:forEach items="${rooms}" var="item">	
			 <tr>
			 		<td><c:out value="${item.ROOM_NO}" /></td>
			 		
			 		<td></td>
					<td></td> 
					<td></td>
					<td></td>
					<td></td> 
					<td></td>
					<td></td>							
			 </tr>		
			</c:forEach>
			
		</table>
		
	</div>		