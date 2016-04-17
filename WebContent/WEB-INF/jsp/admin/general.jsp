<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="com.cambiolabs.citewrite.data.ConfigItem" %>
<%@ page import="com.cambiolabs.citewrite.db.DBFilter" %>
<%@ page import="com.cambiolabs.citewrite.db.DBFilterList" %>
<%@ page import="java.util.ArrayList" %>

<% 
	ConfigItem item = ConfigItem.lookup("BO_CERTIFICATE_INFO"); 
%>
<p>To create citations from the back office, please fill in the information below.</p>
<form name="general-form" id="general-form">
	<div id="codes-container" style="width: 560px;">
		<div class="form-row">
			<dl class="config-form codes-form">
				<dd class="radio"><input type="checkbox"  id="check_use_stick" name="check_use_stick_name" />&nbsp;Use Stick</dd>
				
			</dl>
		</div>	
	</div>
</form>
<div style="clear: left;"></div>
<script type="text/javascript">
	var generalConfig = new GeneralConfiguration();
</script>
<div style="padding-top: 10px;">
	<div id="saveGeneral" style="float: left"></div>
</div>
<script type="text/javascript">
	var saveBtn = new Ext.Button({renderTo:'saveGeneral', text:'Save', width: '70px'});
	saveBtn.handler = generalConfig.save.bind(generalConfig);
</script>