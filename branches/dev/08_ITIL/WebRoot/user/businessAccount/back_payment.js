/*
 * 收款panel
 */
function save() {
	Ext.getCmp('saveButton').disable();
	Ext.getCmp('submitButton').disable();
	Ext.getCmp('backButton').disable();
	var curbaId = Ext.getCmp('businessAccountId').getValue();
	var desc = Ext.getCmp("apply$desc").getValue();
	Ext.Ajax.request({
		url : webContext + '/businessAccountAction_saveExpendBusinessAccount.action',
		params : {
			desc : unicode(desc),
			businessAccountId : curbaId,
			requireId : this.requireId
		},
		success : function(response) {
			var jsonObj = Ext.decode(response.responseText);
			Ext.Msg.alert("提示信息", jsonObj.message);
			Ext.getCmp('saveButton').enable();
			Ext.getCmp('submitButton').enable();
			Ext.getCmp('backButton').enable();
		},
		failure : function(response, options) {
			Ext.getCmp('saveButton').enable();
			Ext.getCmp('submitButton').enable();
			Ext.getCmp('backButton').enable();
			Ext.MessageBox.alert("提示", "保存失败");
		}
	});
}
function submit() {
	Ext.getCmp('saveButton').disable();
	Ext.getCmp('submitButton').disable();
	Ext.getCmp('backButton').disable();
	var curbaId = Ext.getCmp('businessAccountId').getValue();
	var desc = Ext.getCmp("apply$desc").getValue();
	Ext.Ajax.request({
		url : webContext
				+ '/businessAccountAction_saveExpendBusinessAccount.action',
		params : {
			desc : unicode(desc),
			businessAccountId : curbaId,
			requireId : this.requireId
		},
		success : function(response) {
			var jsonObj = Ext.decode(response.responseText);
			var curRequireId = this.requireId;
			Ext.Ajax.request({
				url : webContext + '/businessAccountWorkflow_apply.action',
				params : {
					dataId : curbaId,
					bzparam : "{dataId :'" + curbaId + "',applyId : '"+ curbaId + "',requireId : '" + curRequireId 
							+ "',applyType: 'baproject',applyTypeName: '商务结算付款申请',workflowHistory:'com.digitalchina.itil.require.entity.BusinessAccountApplyHis'}",
					defname : 'businessAccount21251188942921'
				},
				success : function(response, options) {
					var meg = Ext.decode(response.responseText);
					if (meg.id != undefined) {
						//Ext.Msg.alert("提示", "启动工作流成功",function(){//remove by lee for 用户要求去掉提示
							window.location = webContext+'/user/businessAccount/searchBusinessAccount.jsp';
						//});
					} else {
						Ext.Msg.alert("提示", "启动工作流失败", function() {
							Ext.getCmp('saveButton').enable();
							Ext.getCmp('submitButton').enable();
							Ext.getCmp('backButton').enable();
							alert(meg.Exception);
						});
					}
				},
				failure : function(response, options) {
					Ext.getCmp('backButton').enable();
					Ext.getCmp('saveButton').enable();
					Ext.getCmp('submitButton').enable();
					Ext.MessageBox.alert("提示", "启动工作流失败");
				}
			}, this);
		},
		failure : function(response, options) {
			Ext.getCmp('backButton').enable();
			Ext.getCmp('saveButton').enable();
			Ext.getCmp('submitButton').enable();
			Ext.MessageBox.alert("提示", "启动工作流失败");
		}
	});
}

function saveAndSubmit() {
	var curbaId = Ext.getCmp('businessAccountId').getValue();
	var desc = Ext.getCmp("apply$desc").getValue();
	Ext.Ajax.request({
		url : webContext + '/businessAccountAction_saveExpendBusinessAccount.action',
		params : {
			desc : unicode(desc),
			businessAccountId : curbaId,
			requireId : this.requireId
		},
		success : function(response) {
			var jsonObj = Ext.decode(response.responseText);
			Ext.Msg.alert("提示信息", jsonObj.message);
			window.parent.auditContentWin.specialAudit();
		},
		failure : function(response, options) {
			Ext.MessageBox.alert("提示", "保存失败");
		}
	});
}

function view(curId) {
	var curDataId = this.dataId;
	var _panel = new Ext.form.FormPanel({
		id : 'addWinPanel',
		layout : 'table',
		width : 300,
		height : 150,
		frame : true,
		layoutConfig : {
			columns : 2
		},
		defaults : {
			bodyStyle : 'padding:4px'
		},
		buttonAlign : 'center',
		buttons : [{
			text : '确认',
			handler : function() {
				
				if (Ext.getCmp('addWinPanel').form.isValid()) {
					var curCostCenter = Ext.getCmp('costCenter').getValue(); //成本中心
					var money = Ext.getCmp('uMoney').getValue(); //实际金额
					Ext.Ajax.request({
						url : webContext+ '/businessAccountAction_initPaymentInfo.action',
						method : 'POST',
						params : {
							baId : curDataId,		//当前申请ID
							expendPlanId : curId,	//收款计划ID
							costCenter : curCostCenter,
							money : money
						},
						success : function(response) {
							var res = response.responseText;
							nowRec = Ext.decode(res);
							if (nowRec.result) {
								Ext.Msg.alert('提示', '保存成功');
								Ext.getCmp("paymengGrid").store.reload();
								Ext.getCmp("_window").close();
							} else {
								Ext.Msg.alert('提示', '不能超过计划剩余金额');
							}
						},
						failure : function() {
							Ext.Msg.alert('提示', '保存失败');
						}
					});
				} else {
					Ext.Msg.alert('提示', '带红线的为必填项');
				}
			}
		}, {
			text : '取消',
			handler : function() {
				Ext.getCmp('_window').close();
			}
		}],
		items : [{
			html : '<font style="font-size:13px;text-align:right">成本中心：</font>',
			border : false,
			style : 'width:100;text-align:right'
		}, {
			xtype : 'textfield',
			id : 'costCenter',
			allowBlank : false,
			style : 'width:160;text-align:left'
		}, {
			html : '<font style="font-size:13px;text-align:right">付款金额：</font>',
			border : false,
			style : 'width:100;text-align:right'
		}, {
			xtype : 'numberfield',
			id : 'uMoney',
			allowBlank : false,
			style : 'width:160;text-align:left'
		}]
	});

	var _window = new Ext.Window({
		id : '_window',
		title : '更新新付款计划',
		width : 300,
		height : 200,
		layout : 'table',
		layoutConfig : {
			cloumns : 1
		},
		items : [_panel]
	});
	_window.show();
}
function modifyView(record) {
	var _panel = new Ext.form.FormPanel({
		id : 'modifyWinPanel',
		layout : 'table',
		width : 300,
		height : 150,
		frame : true,
		layoutConfig : {
			columns : 2
		},
		defaults : {
			bodyStyle : 'padding:4px'
		},
		buttonAlign : 'center',
		buttons : [{
			text : '确认',
			handler : function() {
				
				if (Ext.getCmp('modifyWinPanel').form.isValid()) {
					var curId = record.get("itil_RealPayment$id");
					var curCostCenter = Ext.getCmp('costCenter').getValue(); //成本中心
					var money = Ext.getCmp('uMoney').getValue(); //实际金额
					Ext.Ajax.request({
						url : webContext+ '/businessAccountAction_savePaymentInfo.action',
						method : 'POST',
						params : {
							realPaymentId : curId,	//收款计划ID
							costCenter : curCostCenter,
							money : money
						},
						success : function(response) {
							var res = response.responseText;
							nowRec = Ext.decode(res);
							if (nowRec.result) {
								Ext.Msg.alert('提示', '保存成功');
								Ext.getCmp("paymengGrid").store.reload();
								Ext.getCmp("_window").close();
							} else {
								Ext.Msg.alert('提示', '不能超过计划剩余金额');
							}
						},
						failure : function() {
							Ext.Msg.alert('提示', '保存失败');
						}
					});
				
				} else {
					Ext.Msg.alert('提示', '带红线的为必填项');
				}
			}
		}, {
			text : '取消',
			handler : function() {
				Ext.getCmp('_window').close();
			}
		}],
		items : [{
			html : '<font style="font-size:13px;text-align:right">成本中心：</font>',
			border : false,
			style : 'width:100;text-align:right'
		}, {
			xtype : 'textfield',
			id : 'costCenter',
			allowBlank : false,
			style : 'width:160;text-align:left'
		}, {
			html : '<font style="font-size:13px;text-align:right">付款金额：</font>',
			border : false,
			style : 'width:100;text-align:right'
		}, {
			xtype : 'numberfield',
			id : 'uMoney',
			allowBlank : false,
			style : 'width:160;text-align:left'
		}]
	});
	Ext.getCmp('costCenter').setValue(record.get("itil_RealPayment$costCenter")); //成本中心
	Ext.getCmp('uMoney').setValue(record.get("itil_RealPayment$realMoney")); //实际金额
	var _window = new Ext.Window({
		id : '_window',
		title : '更新新付款计划',
		width : 300,
		height : 200,
		layout : 'table',
		layoutConfig : {
			cloumns : 1
		},
		items : [_panel]
	});
	_window.show();

}

function getFormPanel() {
	var formPanel = new Ext.form.FormPanel({
		id : "formPanel",
		title : "付款申请",
		frame : true,
		width : 800,// this.width - 15,
		layout : 'table',
		layoutConfig : {
			columns : 4
		},
		items : [
		
		{
			html : "申请编号:&nbsp;",
			cls : 'common-text',
			style : 'width:150;text-align:right'
		}, {
			xtype : 'textfield',
			id : "applyNum",
			readOnly : true,
			emptyText : "系统自动生成",
			fieldLabel : '申请编号',
			height : 0,
			width : 200
		}, 
		/*	{
			html : "申请理由:&nbsp;",
			cls : 'common-text',
			style : 'width:150;text-align:right'
		}, */new Ext.form.Hidden({
			xtype : "textarea",
			width : 546,
			id : "apply$desc",
			height : 50,
			colspan : 3
		}),new Ext.form.Hidden({
				xtype : 'hidden',
				id : 'businessAccountId',
				name : 'businessAccountId',
				width : 200,
				fieldLabel : '自动编号'
		})]
	})
	Ext.getCmp('applyNum').setValue(this.applyNum);
	Ext.getCmp('businessAccountId').setValue(this.dataId);
	Ext.getCmp('apply$desc').setValue(this.descn);
	return formPanel;
}
function getpaymentGridPanel() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	 this.store = new Ext.data.JsonStore({ 
	            url : webContext+'/businessAccountAction_getAllPaymentInfo.action?baId='+this.dataId,
	            fields:[{name:'SRExpendPlan$id'},
	            {name:'SRExpendPlan$name'},
	        	{name:'SRExpendPlan$descn'},
	          	{name:'plan$money'},
	          	{name:'plan$startDate'},
	           	{name:'plan$endDate'},
	           	{name:'plan$balance'},
	           	{name:'itil_RealPayment$id'},
	           	{name:'itil_RealPayment$realDate'},
	           	{name:'itil_RealPayment$costCenter'},
	           	{name:'itil_RealPayment$realMoney'}],
	            totalProperty:"rowCount",
	            root:"data",
	            remoteSort:false,             
	           	timeout:8000
	            });
	var viewConfig = Ext.apply({
		forceFit : true
	}, this.gridViewConfig);
	this.formValue = '';
	var addButton = new Ext.Button({
		text : '增加',
		pressed : true,
		iconCls : 'add',
		scope : this,
		handler : function() {
			var varTMPId = Ext.getCmp("planCombo").getValue();
			if (varTMPId == "") {
				Ext.getCmp("planCombo").setValue("");
				Ext.Msg.alert("提示", "请选择后添加");
				return;
			}
			view(varTMPId);
		}
	});
	var modifyButton = new Ext.Button({
		text : '修改',
		pressed : true,
		iconCls : 'edit',
		scope : this,
		handler : function() {
			var gridPanel = Ext.getCmp("paymengGrid");
			var record = gridPanel.getSelectionModel().getSelected();
			var records = gridPanel.getSelectionModel().getSelections();
			if (!record) {
				Ext.Msg.alert("提示", "请先选择要修改的付款条目!");
				return;
			}
			if (records.length > 1) {
				Ext.Msg.alert("提示", "不能同时修改多个付款条目");
			} else {
				modifyView(record);
			}

		}
	});
	var deleteButton = new Ext.Button({
		text : '删除',
		pressed : true,
		iconCls : 'delete',
		scope : this,
		handler : function() {
			var record = Ext.getCmp("paymengGrid").getSelectionModel()
					.getSelected();
			var records = Ext.getCmp("paymengGrid").getSelectionModel()
					.getSelections();
			if (!record) {
				Ext.Msg.alert("提示", "请选择要删除的付款条目信息");
				return;
			}
			if (records.length == 0) {
				Ext.MessageBox.alert('提示', '最少选择一条付款条目信息进行删除!');
				return;
			}
			Ext.MessageBox.confirm("确认删除", "是否要删除所选择的付款条目信息?",
					function(button) {
						if (button == "yes") {
							for (var i = 0; i < records.length; i++) {
								Ext.getCmp("paymengGrid").store
										.remove(records[i]);
							}
						}
					});
		}
	});
	var saveButton = new Ext.Button({
		text : '保存付款条目',
		pressed : true,
		iconCls : 'save',
		scope : this,
		handler : function() {
			save();
		}
	});
	var planCombo = new Ext.form.ComboBox({
		xtype : 'combo',
		id : 'planCombo',
		width : 200,
		style : '',
		fieldLabel : '付款条目',
		displayField : 'name',
		valueField : 'id',
		emptyText : '请选择...',
		allowBlank : true,
		typeAhead : true,
		name : 'planCombo',
		triggerAction : 'all',
		minChars : 50,
		queryDelay : 700,
		store : new Ext.data.JsonStore({
			url : webContext
					+ '/businessAccountAction_getExpendPlanCombo.action?dataId='
					+ this.requireId,
			fields : ['id', 'name'],
			totalProperty : 'rowCount',
			root : 'data',
			id : 'id'
		}),
		listeners : {
			'beforequery' : function(queryEvent) {
			}
		}
	});
	this.grid = new Ext.grid.GridPanel({
		id : 'paymengGrid',
		store : this.store,
		sm : sm,
		columns : [sm, 
			{header:'自动编号',dataIndex:'SRExpendPlan$id',align : 'left',sortable : true,hidden:true},
			{header:'付款名称',dataIndex:'SRExpendPlan$name',align : 'left',sortable : true,hidden:false},
			{header:'付款描述',dataIndex:'SRExpendPlan$descn',align : 'left',sortable : true,hidden:false},
			{header:'付款金额',dataIndex:'plan$money',align : 'left',sortable : true,hidden:true},
			{header:'计划开始时间',dataIndex:'plan$startDate',align : 'left',sortable : true,hidden:false},
			{header:'计划结束时间',dataIndex:'plan$endDate',align : 'left',sortable : true,hidden:false},
			{header:'剩余金额',dataIndex:'plan$balance',align : 'left',sortable : true,hidden:false},
			{header:'自动编号',dataIndex:'itil_RealPayment$id',align : 'left',sortable : true,hidden:true},
			{header:'实际付款时间',dataIndex:'itil_RealPayment$realDate',align : 'left',sortable : true,hidden:true},
			{header:'付款成本中心',dataIndex:'itil_RealPayment$costCenter',align : 'left',sortable : true,hidden:false},
			{header:'实际付款金额',dataIndex:'itil_RealPayment$realMoney',align : 'left',sortable : true,hidden:false}],
		//		title : "付款条目",
		trackMouseOver : false,
		loadMask : true,
		clicksToEdit : 2,
		collapsible : true,
		autoScroll : true,
		loadMask : true,
		//autoHeight : true,
		height : 250,
		width : 800,// this.width - 15,
		frame : true,
		tbar : [planCombo, addButton, modifyButton, deleteButton],
		listeners : {
			"dblclick" : function() {
				var record = Ext.getCmp("paymengGrid").getSelectionModel().getSelected();
				modifyView(record);
			}
		}
	});
	this.store.load();
	return this.grid;
}

function getFormpanel_SpecialRequire3_Input() {
	var da = new DataAction();
	var biddata = "";
	var data = da.getSingleFormPanelElementsForEdit("panel_SpecialRequire_Input", this.requireId);
	for (i = 0; i < data.length; i++) {
		if (data[i].xtype == 'combo' || data[i].xtype == 'datefield') {
			data[i].id = data[i].id + 8;// 改变Combobox的id
			data[i].readOnly = true;
			data[i].hideTrigger = true;
		}
		data[i].readOnly = true;
	}
	biddata = da.split(data);
	var formpanel_SpecialRequire3_Input = new Ext.form.FormPanel({
		id : 'panel_SpecialRequire3_Input',
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
		title : "申请",// "解决方案设计开发服务",
		items : biddata
	});
	return formpanel_SpecialRequire3_Input;
}

//需求分析面吧
function getFormpanel_SRAnalyse() {
	var sra = new SRAction();
	var praId = sra.getProjectRequireAnalyseId(this.requireId);
	var da = new DataAction();
	var data = null;
	// 判断是新增还是修改
	var biddata = "";
	if (praId != '0') {
		data = da.getSingleFormPanelElementsForEdit("panel_SRAnalyse", praId);// 这是要随时变得
	} else {
		data = da.getSingleFormPanelElementsForEdit("panel_SRAnalyse", "");
	}
	biddata = da.splitForReadOnly(data);
	var formpanel_SRAnalyse = new Ext.form.FormPanel({
		id : 'panel_SRAnalyse',
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
		title : "项目需求分析",
		items : biddata
	});
	return formpanel_SRAnalyse;
}
//需求合同面板
function getFormpanel_SRprojectContracts() {
	var sra = new SRAction();
	var rcId = sra.getRequirementContractId(this.requireId);
	var da = new DataAction();
	var data = null;// 判断是新增还是修改
	var biddata = "";
	if (rcId != '0') {
		data = da.getSingleFormPanelElementsForEdit("panel_SRprojectContracts",rcId);// 这是要随时变得
	} else {
		data = da.getSingleFormPanelElementsForEdit("panel_SRprojectContracts","");
	}
	biddata = da.splitForReadOnly(data);
	var formpanel_SRprojectContracts = new Ext.form.FormPanel({
		id : 'panel_SRprojectContracts',
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
		title : "个性化需求合同",
		items : biddata
	});
	return formpanel_SRprojectContracts;
}

/*
 * tabPanel
 */
function getTabPanel() {
	var tab = new Ext.TabPanel({
		title : "需求基本信息",
		deferredRender : false,
		activeTab : 0,
		frame : true,
		plain : true,
		width : Ext.get('gridWidth').getWidth() - 30,
		defaults : {
			autoHeight : true
		},
		items : [{
			title : "需求基本信息",
			width : "auto",
			items : [this.getFormpanel_SpecialRequire3_Input()]
		},{
			title : "需求分析信息",
			width : "auto",
			items : [this.getFormpanel_SRAnalyse()]
		},{
			title : "需求合同信息",
			width : "auto",
			items : [this.getFormpanel_SRprojectContracts()]
		},{
			title : "<font color=red>付款申请</font>",
			width : "auto",
			items : [this.getFormPanel(), this.getpaymentGridPanel()]
		}]
	});
	return tab;
}