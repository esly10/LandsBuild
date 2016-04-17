<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="com.cambiolabs.citewrite.data.*" %>

<%! private int Contador = 0; %>
<meta charset="utf-8">

<link href="<c:url value="/static/js/calendar/css/timelineScheduler.css" />" rel="stylesheet" type="text/css" />
<link href="<c:url value="/static/js/calendar/css/timelineScheduler.styling.css" />" rel="stylesheet" type="text/css" />
<link href="<c:url value="/static/js/calendar/css/calendar.css" />" rel="stylesheet" type="text/css" />
        
<script type="text/javascript" src="<c:url value="/static/js/calendar-code.js" />"></script>	
<div class="calendar" id="calendar-div"></div>
<div class="realtime-info"></div>

<div class="hide" id="rmenu">
     <ul>
         <li>
             <a  href="#" id="create-res">Add Reservation</a><br>
         </li>
     </ul>
 </div>

<style>
	@page {
	        size:A3 landscape;
	        margin: 0;
	        height: 510mm;
	    }
    @media print {
        html, body {
            width: 510mm;
            height: 510mm;
            -webkit-print-color-adjust: exact;       
        }
    }    
	.show {
	    z-index:1000;
	    position: absolute;
	    display: block;
	    cursor: pointer;
	    margin: 0;
	    border: 1px solid #E1E1E1;
	    font-weight: bold;
	    padding: .25em;
	    text-decoration: none;
	    color: #222222;
	    height: 20px;
	    line-height: 20px;
	    padding-left: .5em;
	    padding-right: .5em;
	    border-top-left-radius: 4px;
	    border-bottom-left-radius: 4px;
	    background-color: #EEEEEE;
	}
	.hide { display: none;}
	.show li{ list-style: none; }
	.show a { text-decoration: none; }
</style>

<script type="text/javascript">
$jQuery(document).ready(Calendar.Init);
$jQuery(document).ready(Calendar.Init);
</script>					