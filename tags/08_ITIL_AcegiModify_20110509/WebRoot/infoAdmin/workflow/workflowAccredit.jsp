<%@ page language="java" pageEncoding="gbk"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ include file="/includefiles.jsp" %>
<html>
<head>
  <title>欢迎使用IT服务系统</title>
  <%@include file="/includefiles.jsp"%>
    <META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=gbk">
  	<script type="text/javascript" src="${pageContext.request.contextPath}/ibmb2b/order/Ext.ux.UploadDialog.js"></script>
  	<script type="text/javascript" src="${pageContext.request.contextPath}/infoAdmin/workflow/workflowAccreditPanel.js"></script>
  	<script type="text/javascript" src="${pageContext.request.contextPath}/infoAdmin/workflow/workflowAccreditSearchForm.js"></script>   
  	<script type="text/javascript" src="${pageContext.request.contextPath}/ibmb2b/order/GroupSummary.js"></script>  
  	<script type="text/javascript" src="${pageContext.request.contextPath}/infoAdmin/workflow/workFlowAction.js"></script>  
  	<script type="text/javascript" src="${pageContext.request.contextPath}/infoAdmin/workflow/multisel/Multiselect.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/infoAdmin/workflow/multisel/DDView.js"></script>
	<link rel='stylesheet' type='text/css' href='${pageContext.request.contextPath}/infoAdmin/workflow/multisel/Multiselect.css'>   	
	<style type="text/css"> 
		.x-head{
			background:url(images/titlelog.png) no-repeat left;
			height:65px;
			background-color: 'blank'
		}
		html, body {
	        font:normal 12px verdana;
	        margin:0;
	        padding:0;
	        border:0 none;
	        overflow:hidden;
	        height:100%;
	    }
		p {
		    margin:5px;
		}
	    .nav {
	        background-image:url(images/other/folder_go.png);
	    }
	    .cls {
	    	font-size:9pt;
	    }
	    .common-text {
	    	font-size:9pt;
	    }
    </style>
	<script type="text/javascript">
	
	function changeSkin(value){
	   		 Ext.util.CSS.swapStyleSheet('window', '../extEngine/resources/css/' + value + '.css');
	}
	function updateTab(id,title, url) {
    	var tab = mainPanel.getItem(id);
  		if(tab){
   			mainPanel.remove(tab);
   		}
    	tab = addTab(id,title,url);
   		mainPanel.setActiveTab(tab);
    }
	
	Ext.BLANK_IMAGE_URL = '../extEngine/resources/images/default/s.gif';
	Ext.onReady(function(){	
	   Ext.QuickTips.init();

	   Ext.state.Manager.setProvider(new Ext.state.CookieProvider()); 
	   var accreditPanel = new AccreditPanel({userId:'${sessionScope.userInfo.userName}'});
	   
	  // bidApplyPanel.render("orderApply");
	   
	   new Ext.Viewport({
	   	 layout:'fit',
	   	 items:[accreditPanel]
	   });
	   //orderApplyPanel.initData();
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
<div id="orderApply" style="height:100%"></div>
<div id="hello-win" class="x-hidden">
    <div class="x-window-header">Hello Dialog</div>
    <div id="hello-tabs">
        <!-- Auto create tab 1 -->
        <div class="x-tab" title="Hello World 1">
            <p>Hello...</p>
        </div>
        <!-- Auto create tab 2 -->
        <div class="x-tab" title="Hello World 2">
            <p>... World!</p>
        </div>
    </div>
</div>

</body>
</html>
