<%@ page language="java" pageEncoding="gbk"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
	<head>
		<title>欢迎使用IT服务系统</title>
		<%@include file="/includefiles.jsp"%>
		<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
		<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
		<META HTTP-EQUIV="Expires" CONTENT="0">
		<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=utf-8">
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/js/extendTextArea.js"></script>
		<script type="text/javascript"
			src="<c:url value="/js/TabCloseMenu.js"/>"></script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/infoAdmin/workflow/configPage/dynamicAssginForm.js"></script>
			<script type="text/javascript"
			src="${pageContext.request.contextPath}/infoAdmin/workflow/configPage/addMarkForm.js"></script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/infoAdmin/workflow/configPage/configUnitSearchForm.js"></script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/infoAdmin/workflow/configPage/ConfigUnitPanelAddRecordPanel.js"></script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/infoAdmin/workflow/configPage/ConfigUnitPanelModifyRecordPanel.js"></script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/infoAdmin/workflow/configPage/actionConfigUnit.js"></script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/infoAdmin/workflow/configPage/orderAction.js"></script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/infoAdmin/workflow/configPage/pageModelConfigUnit.js"></script>
		<style type="text/css">
.x-head {
	background: url(images/titlelog.png) no-repeat left;
	height: 65px;
	background-color: 'blank'
}

html,body {
	font: normal 12px verdana;
	margin: 0;
	padding: 0;
	border: 0 none;
	overflow: hidden;
	height: 100%;
}

p {
	margin: 5px;
}

.nav {
	background-image: url(images/other/folder_go.png);
}

.cls {
	font-size: 9pt;
}

.common-text {
	font-size: 9pt;
}
</style>
		<script type="text/javascript">
	   
	</script>
		<script type="text/javascript">
	
	function changeSkin(value){
	   		 Ext.util.CSS.swapStyleSheet('window', webContext+'/extEngine/resources/css/' + value + '.css');
	}
	function updateTab(id,title, url) {
    	var tab = mainPanel.getItem(id);
  		if(tab){
   			mainPanel.remove(tab);
   		}
    	tab = addTab(id,title,url);
   		mainPanel.setActiveTab(tab);
    }
	
	var addMarkForm ;
		Ext.onReady(function(){	
	   Ext.QuickTips.init();
	   Ext.state.Manager.setProvider(new Ext.state.CookieProvider()); 
	  
	   addMarkForm = new AddMarkForm({taskId :'${param.taskId}'});
	   
	   addMarkForm.render("configUnitListPanel");
	   
	   new Ext.Viewport({
	   	 layout:'fit',
	   	 items:[addMarkForm]
	   });
	});
	Ext.override(Ext.grid.GridView, {
    templates: {
        cell: new Ext.Template(
               '<td class="x-grid3-col x-grid3-cell x-grid3-td-{id} {css}" style="{style}" tabIndex="0" {cellAttr}>',
               '<div class="x-grid3-cell-inner x-grid3-col-{id}" {attr}>{value}</div>',
               "</td>"
           )
    }
	});
	</script>
	</head>
	<body onload="changeSkin('${userInfo.userViewStyle}');">

		<div id="configUnitListPanel" style="height: 100%"></div>
		<div id="hello-win" class="x-hidden">
			<div class="x-window-header">
				Hello Dialog
			</div>
			<div id="hello-tabs">
				<!-- Auto create tab 1 -->
				<div class="x-tab" title="Hello World 1">
					<p>
						Hello...
					</p>
				</div>
				<!-- Auto create tab 2 -->
				<div class="x-tab" title="Hello World 2">
					<p>
						... World!
					</p>
				</div>
			</div>
		</div>
		尚待实现
	</body>
</html>
