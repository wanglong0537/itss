Ext.ns("FileAttachDetail");
FileAttachDetail.show = function(a) {
	var b = new Ext.Window({
		title : "附件详细信息",
		iconCls : "menu-attachment",
		width : 650,
		height : 320,
		modal : true,
		layout : "form",
		buttonAlign : "center",
		autoLoad : {
			url : __ctxPath + "/fileDetail.do?fileId=" + a
		},
		buttons : [ {
			xtype : "button",
			iconCls : "btn-close",
			text : "关闭",
			handler : function() {
				b.close();
			}
		} ]
	});
	b.show();
};