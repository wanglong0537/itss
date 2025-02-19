var taskId = null;
PageTemplates = Ext.extend(Ext.Panel, {
	id : "PageTemplates",
	layout : 'table',
	height : 'auto',
	align : 'center',
	foredit : true,
	width : 1050,
	frame : true,
	buttonAlign : 'center',
	autoScroll : true,
	defaults : {
		bodyStyle : 'padding:4px'
	},
	layoutConfig : {
		columns : 1
	},
	saveAndSubmit : function() {
		var appManager = Ext.getCmp('SpecialRequirement$appManagerCombo').getValue();	

		if(!Ext.getCmp('panel_SpecialRequire3ConfirmByIT_Input').form.isValid()){
			Ext.MessageBox.alert("提示","页面中带红色波浪线的为必填项,请填写完整。谢谢您合作！");	
			return false;
		}
		if(appManager==""||appManager==null){
			Ext.MessageBox.alert("提示","请选择实施顾问。谢谢您合作！");	
			return false;
		}	
		
		var formParam = Ext.encode(getFormParam('panel_SpecialRequire3ConfirmByIT_Input'));
		alert(webContext + '/extjs/workflow?method=getData&taskId=' + taskId
								+ '&users=executeByEngineer:' + appManager);
		Ext.Ajax.request({
			url : webContext+ '/SRAction_saveSpecialRequire.action',
			params : {
				info : formParam
			},			
			success : function(response, options) {
				if(appManager!=""){
					Ext.Ajax.request({
						url : webContext + '/extjs/workflow?method=getData&taskId=' + taskId
								+ '&users=executeByEngineer:' + appManager,
						method : 'post',
						success : function(response, options) {
							window.parent.auditContentWin.specialAudit();
						},
						failure : function(response, options) {
							alert("流程审批出现异常");
						}
					});
				}else{
					window.parent.auditContentWin.specialAudit();
				}
				},
			failure : function(response, options) {
				Ext.MessageBox.alert("保存失败");
			}
		}, this);
	},
	getTabpanel : function(tab, tabTitle) {
		this.tabPanel = new Ext.TabPanel({
			xtype : 'tabpanel',
			activeTab : 0,
			enableTabScroll : true,
			// minTabWidth:100,
			// resizeTabs:true,
			title : tabTitle,
			deferredRender : false,
			frame : true,
			plain : true,
			border : false,
			// tabPosition:'bottom',
			baseCls : 'x-plain',// 是否设置和背景色同步
			width : 900,
			// bodyBorder : true,
			defaults : {
				autoHeight : true,
				bodyStyle : 'padding:2px'
			},
			items : tab
		});
		return this.tabPanel;

	},
	getPanel : function(appa, panelTitle) {
		this.Panel = new Ext.Panel({
			id : "Pages",
			height : 'auto',
			align : 'center',
			title : panelTitle,
			border : false,
			defaults : {
				bodyStyle : 'padding:5px'
			},
			width : 'auto',
			frame : true,
			autoScroll : true,
			layoutConfig : {
				columns : 1
			},
			items : appa
		});
		return this.Panel;

	},

//	getFormpanel_specialRequire3_start : function() {
//		var da = new DataAction();
//		var data = null;
//		// 判断是新增还是修改
//		var biddata = "";
//
//		var buttonUtil = new ButtonUtil();
//		this.getFormButtons = buttonUtil.getButtonForPanel(
//				"panel_specialRequire3_start", this);
//		if (this.dataId != '0') {
//			data = da.getPanelElementsForEdit("sr3_confirmByIT",
//					"panel_specialRequire3_start", this.dataId);// 这是要随时变得
//			biddata = da.split(data);
//		} else {
//			data = da.getPanelElementsForAdd("panel_specialRequire3_start");
//			biddata = da.split(data);
//		}
//		if (this.getFormButtons.length != 0) {
//			this.formpanel_specialRequire3_start = new Ext.form.FormPanel({
//				id : 'panel_specialRequire3_start',
//				layout : 'table',
//				height : 'auto',
//				width : 800,
//				frame : true,
//				collapsible : true,
//				defaults : {
//					bodyStyle : 'padding:4px'
//				},
//				layoutConfig : {
//					columns : 4
//				},
//				title : "售前支持申请面板",
//				items : biddata,
//				buttons : this.getFormButtons
//			});
//		} else {
//			this.formpanel_specialRequire3_start = new Ext.form.FormPanel({
//				id : 'panel_specialRequire3_start',
//				layout : 'table',
//				height : 'auto',
//				width : 800,
//				frame : true,
//				collapsible : true,
//				defaults : {
//					bodyStyle : 'padding:4px'
//				},
//				layoutConfig : {
//					columns : 4
//				},
//				title : "售前支持申请面板",
//				items : biddata
//			});
//		}
//		return this.formpanel_specialRequire3_start;
//	},
//	getFormpanel_SREngineerAndShare : function() {
//		var da = new DataAction();
//		var data = null;
//		// 判断是新增还是修改
//		var biddata = "";
//
//		var buttonUtil = new ButtonUtil();
//		this.getFormButtons = buttonUtil.getButtonForPanel(
//				"panel_SREngineerAndShare", this);
//		if (this.dataId != '0') {
//			data = da.getPanelElementsForEdit("sr3_confirmByIT",
//					"panel_SREngineerAndShare", this.dataId);// 这是要随时变得
//			biddata = da.split(data);
//		} else {
//			data = da.getPanelElementsForAdd("panel_SREngineerAndShare");
//			biddata = da.split(data);
//		}
//		if (this.getFormButtons.length != 0) {
//			this.formpanel_SREngineerAndShare = new Ext.form.FormPanel({
//				id : 'panel_SREngineerAndShare',
//				layout : 'table',
//				height : 'auto',
//				width : 800,
//				frame : true,
//				collapsible : true,
//				defaults : {
//					bodyStyle : 'padding:4px'
//				},
//				layoutConfig : {
//					columns : 4
//				},
//				title : "售前支持选择工程师分摊金额信息",
//				items : biddata,
//				buttons : this.getFormButtons
//			});
//		} else {
//			this.formpanel_SREngineerAndShare = new Ext.form.FormPanel({
//				id : 'panel_SREngineerAndShare',
//				layout : 'table',
//				height : 'auto',
//				width : 800,
//				frame : true,
//				collapsible : true,
//				defaults : {
//					bodyStyle : 'padding:4px'
//				},
//				layoutConfig : {
//					columns : 4
//				},
//				title : "售前支持选择工程师分摊金额信息",
//				items : biddata
//			});
//		}
//		return this.formpanel_SREngineerAndShare;
//	},
// addy by zhangzy for 售前申请改为一个实体 in 2009 12 9 start	
	getFormpanel_SpecialRequire3ConfirmByIT_Input : function() {
		var da = new DataAction();
		var data = null;
		var biddata = "";
		if (this.dataId != '0') {
			data = da.getPanelElementsForEdit("sr3_confirmByIT",
					"panel_SpecialRequire3ConfirmByIT_Input", this.dataId);// 这是要随时变得
		} else {
			data = da.getPanelElementsForAdd("panel_SpecialRequire3ConfirmByIT_Input");
		}
		for(var i = 0; i < data.length; i++){
			if(data[i].id!="SpecialRequirement$appManagerCombo"
				&&data[i].id!="SpecialRequirement$shareFee"){
				data[i].readOnly = true;
				data[i].hideTrigger = true;
			}
			var idStr = data[i].id + "";
			if (idStr=='SpecialRequirement$appManagerCombo') {
					data[i].fieldLabel = '实施顾问';
			}
			if (idStr=='SpecialRequirement$otherInfo') {
					data[i].fieldLabel = '费用分摊成本中心';
			}			
		}		
		biddata = da.split(data);
		var formpanel_SpecialRequire3ConfirmByIT_Input = new Ext.form.FormPanel({
			id : 'panel_SpecialRequire3ConfirmByIT_Input',
			layout : 'table',
			height : 'auto',
			width : 800,
			frame : true,
			collapsible : true,
			defaults : {
				bodyStyle : 'padding:4px'
			},
			layoutConfig : {
				columns : 4
			},
			title : "售前支持需求审批面板",
			items : biddata
		});
		return formpanel_SpecialRequire3ConfirmByIT_Input;
	},	
	items : this.items,
	buttons : this.buttons,
// addy by zhangzy for 售前申请改为一个实体 in 2009 12 9 end	
	/*
	 * clientvalidation 初始化
	 */
	initComponent : function() {
//		var histroyForm = new HistroyForm({
//			reqId : this.dataId,
//			reqClass : "com.digitalchina.itil.require.entity.SpecialRequirement"
//		});
//
//		var items = new Array();
//		var pa = new Array();
//		this.pa = pa;
//		var gd = new Array();
//		this.gd = gd;
//		var temp = new Array();
//		this.temp = temp;
//		var formname = new Array();
//		this.formname = formname;
//		var gridname = new Array();
//		this.gridname = gridname;
//		this.model = "sr3_confirmByIT";
//		var buttonUtil = new ButtonUtil();
//		this.mybuttons = buttonUtil.getButtonForModel("sr3_confirmByIT", this);
//		if (this.mybuttons != "") {
//			this.buttons = {
//				layout : 'table',
//				height : 'auto',
//				width : 800,
//				style : 'margin:4px 6px 4px 300px',
//				align : 'center',
//				defaults : {
//					bodyStyle : 'padding:4px'
//				},
//				items : this.mybuttons
//			};
//		} else {
//			this.buttons = {
//				layout : 'table',
//				height : 'auto',
//				width : 800,
//				style : 'margin:4px 6px 4px 300px',
//				align : 'center',
//				defaults : {
//					bodyStyle : 'padding:4px'
//				}
//			};
//		}
//
//		this.getFormpanel_specialRequire3_start();
//		this.pa.push(this.formpanel_specialRequire3_start);
//		this.formname.push("panel_specialRequire3_start");
//		temp.push(this.formpanel_specialRequire3_start);
//		this.getFormpanel_SREngineerAndShare();
//		this.pa.push(this.formpanel_SREngineerAndShare);
//		this.formname.push("panel_SREngineerAndShare");
//		temp.push(this.formpanel_SREngineerAndShare);
//		temp.push(histroyForm);
//		items.push(this.getTabpanel(temp));
		taskId = this.taskId;
		var histroyForm = new HistroyForm({
			reqId : this.dataId,
			reqClass : "com.digitalchina.itil.require.entity.SpecialRequirement"
		});
		
		var items = new Array();
		var temp = new Array();
		this.model = "sr3_confirmByIT";
		var buttonUtil = new ButtonUtil();
		this.mybuttons = buttonUtil.getButtonForModel("sr3_confirmByIT",this);
		if(this.readOnly!=1){
			this.buttons = this.mybuttons;
		}			
		temp.push(this.getFormpanel_SpecialRequire3ConfirmByIT_Input());
		temp.push(histroyForm);
		items.push(this.getTabpanel(temp));
		if(this.readOnly!=1){
			items.push(this.buttons);
		}
		this.items = items;
		this.on("saveAndSubmit", this.saveAndSubmit, this);
		PageTemplates.superclass.initComponent.call(this);
	}
})