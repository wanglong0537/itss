HrPromAssessmentPreview = Ext.extend(Ext.Window, {
	panel : null,
	constructor : function(a) {
		if(a == null) {
			a = {};
		}
		Ext.apply(this, a);
		this.initComponents();
		HrPromAssessmentPreview.superclass.constructor.call(this, {
			id : "HrPromAssessmentPreview",
			region : "center",
			layout : "fit",
			border : false,
			maximizable : true,
			items : [
				this.panel
			],
			modal : true,
			height : 600,
			width : 850,
			autoScroll : true,
			title : "晋升评估页面",
			listeners : {
				close : function() {

				}
			}
		});
	},
	initComponents : function() {
		this.panel = new Ext.Panel({
			border : false,
			bodyBorder : false,
			html : "<iframe frameborder='no' width=100% height=100% src='" + __ctxPath + "/hrm/previewStatusHrPromAssessment.do?id=" + this.assessmentId + "'>"
		});
	}
});