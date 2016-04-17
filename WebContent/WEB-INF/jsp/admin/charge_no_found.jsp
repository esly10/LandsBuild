<%@ page language="java" contentType="text/xml; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="com.cambiolabs.citewrite.data.*" %>

<div style="width: 50%; float: left;">
	<dl class="list">
		<dt>Room #:</dt>
		<dd><c:out value="${room.ROOM_NO}" />
		<dt>Room Type:</dt>
		<dd>
			<c:choose>
			    <c:when test="${room.ROOM_TYPE == '1'}">
			        Double. 
			    </c:when>
			    <c:when test="${room.ROOM_TYPE == '2'}">
			        Single. 
			    </c:when>    
			    <c:when test="${room.ROOM_TYPE == '3'}">
			        Superior. 
			    </c:when>        
			    <c:otherwise>
			        Family Room. 
			    </c:otherwise>
			</c:choose>
		</dd>
		<dt>Room Status:</dt>
		<dd>
			<c:choose>
			    <c:when test="${room.STATUS == '1'}">
			        Available. 
			    </c:when>
			    <c:when test="${room.STATUS == '2'}">
			        Out of Service. 
			    </c:when>  
			    <c:otherwise>
			        Maintenance. 
			    </c:otherwise>
			</c:choose>
		</dd>
		<dt></dt>
		<dd></dd>
		<dt>Response:</dt>
		<dd><c:out value="${message}"/></dd>
	</dl>
</div>