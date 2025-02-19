<%@ page language="java" pageEncoding="gbk"%> 
<html>
<head>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=gbk">
<title>template</title>
<%@include file="/includefiles.jsp"%>
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/column-tree.css" />
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/DWRTreeLoader.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/dwr/engine.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/dwr/interface/PanelManager.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/infoAdmin/pageModel/pagePanel/PanelDataPanel.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/infoAdmin/pageModel/pagePanel/ColumnDataPanel.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/infoAdmin/pageModel/pagePanel/PanelComponent.js"></script>

<style type="text/css">
    #tree1, #tree2 {
    	float:left;
    	margin:20px;
    	border:1px solid #c3daf9;
    	width:250px;
    	height:300px;
    }
    .folder .x-tree-node-icon{
		background:transparent url(../tree-image/folder.gif);
	}
	.x-tree-node-expanded .x-tree-node-icon{
		background:transparent url(../tree-image/folder-open.gif);
	}
    .common-text {
    	font-size:9pt;
    }

    </style>
    <script type="text/javascript">
        Ext.BLANK_IMAGE_URL = '${pageContext.request.contextPath}/extEngine/resources/images/default/s.gif';
        //var pagePanelId = '${pagePanelId}';
    	Ext.onReady(function(){			
			var panel = new PanelComponent();
			panel.render(Ext.getBody());
				
        });
     </script>   
    
</head>
<body>
</body>
</html>
