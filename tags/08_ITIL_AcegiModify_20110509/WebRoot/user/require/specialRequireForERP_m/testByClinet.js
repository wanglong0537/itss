PageTemplates = Ext.extend(Ext.Panel, {
	id : "PageTemplates",
	layout : 'fit',
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
		if (!Ext.getCmp('panel_srInfo_input3').form.isValid()) {
			Ext.MessageBox.alert("提示", "页面中带红色波浪线的为必填项,请填写完整必填项.");
			return false;
		}
		var formParam = Ext.getCmp('panel_srInfo_input3').form.getValues(false);
		var vp = null;
		if (formParam != null) {
			vp = Ext.apply(formParam, vp, {});
		}
		var curdataId = this.dataId;
		Ext.Ajax.request({
			url : webContext
					+ '/SRAction_saveSpecialRequirementInfo.action?'
					+ '&reqId=' + curdataId,
			params : vp,
			success : function(response, options) {
				var responseArray = Ext.util.JSON.decode(response.responseText);
				var tempId = responseArray.id;
				Ext.getCmp('itil_req_SpecialRequirementInfo$id').setValue(tempId);
				window.parent.auditContentWin.specialAudit();
			},
			failure : function(response, options) {
				Ext.MessageBox.alert("保存失败");
			}
		}, this);
	},
		saveForGrid : function() {
		var reqId = this.dataId;
		var store = Ext.getCmp('panel_SRTestReport').store;
		var product = "";
		store.each(function(record) {
			if (record.dirty) {
				product += Ext.encode(record.data) + ",";
			}
		})
		product = unicode(product);
		Ext.Ajax.request({
			url : webContext + '/SRAction_saveTestReport.action',
			params : {
				product : product,
				reqId : reqId
			},
			success : function(response, options) {
				Ext.MessageBox.alert("提示", "保存成功", function() {
					store.reload();
					store.removeAll();
					});

			},
			failure : function(response, options) {
				Ext.MessageBox.alert("保存失败");
			}

		})
	},
	removePlan : function() {
		var record = Ext.getCmp('panel_SRTestReport').getSelectionModel().getSelected();
		var records = Ext.getCmp('panel_SRTestReport').getSelectionModel().getSelections();
		var store = Ext.getCmp('panel_SRTestReport').store;
		if (!record) {
			Ext.Msg.alert("提示", "请先选择要删除的行!");
			return;
		}
		if (records.length == 0) {
			Ext.MessageBox.alert('警告', '最少选择一条信息，进行删除!');
		} else {
			Ext.MessageBox.confirm('提示框', '您确定要进行该操作？', function(btn) {
				if (btn == 'yes') {
					var remIds = "";
					if (records) {
						for (var i = 0; i < records.length; i++) {
							this.store.remove(records[i]);
							remIds += records[i].get("SRTestReport$id") + ",";
						}
						Ext.Ajax.request({
							url : webContext
									+ '/SRAction_removeTestReport.action',
							params : {
								removedIds : remIds
							},
							success : function(response, options) {
								Ext.MessageBox.alert("提示", "删除成功", function() {
									store.reload();
									store.removeAll();
								});

							},
							failure : function(response, options) {
								Ext.MessageBox.alert("删除失败");
							}
						})
					}
				}
			}, this)
		}
	},

	getTabpanel : function(tab, tabTitle) {
		var tabPanel = new Ext.TabPanel({
			xtype : 'tabpanel',
			activeTab : 0,
			enableTabScroll : true,
			title : tabTitle,
			deferredRender : false,
			frame : true,
			plain : true,
			border : false,
			autoScroll : true,
			baseCls : 'x-plain',// 是否设置和背景色同步
			width : 900,
			defaults : {
				autoHeight : true,
				bodyStyle : 'padding:2px'
			},
			items : tab
		});
		return tabPanel;

	},
	getPanel : function(appa, panelTitle) {
		var Panel = new Ext.Panel({
			id : Ext.id(),
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
		return Panel;

	},

	getFormpanel_erpSR_it_m_input : function() {
		var da = new DataAction();
		var data = null;
		// 判断是新增还是修改
		var biddata = "";
		if (this.dataId != '0') {
			data = da.getPanelElementsForEdit("esr_m_testByClient",
					"panel_erpSR_it_m_input", this.dataId);// 这是要随时变得
		} else {
			data = da.getPanelElementsForAdd("panel_erpSR_it_m_input");
		}
		biddata = da.splitForReadOnly(data);
		var formpanel_erpSR_it_m_input = new Ext.form.FormPanel({
			id : 'panel_erpSR_it_m_input',
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
			title : "ERP非常规需求变更",
			items : biddata
		});
		return formpanel_erpSR_it_m_input;
	},
	getFormpanel_srInfo_input3 : function() {
		var da = new DataAction();
		var data = null;
		// 判断是新增还是修改
		var biddata = "";
		if (this.dataId != '0') {
			data = da.getPanelElementsForEdit("esr_m_testByClient",
					"panel_srInfo_input3", this.dataId);// 这是要随时变得
		} else {
			data = da.getPanelElementsForAdd("panel_srInfo_input3");
		}
		var modifyData = new Array();
		
		for (var i = 0; i < data.length; i++) {
			if(data[i].id!="itil_req_SpecialRequirementInfo$isCompleteCombo"
				&&data[i].id!="itil_req_SpecialRequirementInfo$isContentCombo"){
				data[i].readOnly = true;
				data[i].hideTrigger = true;
				if (data[i].xtype == "panel") {
					var dd = Ext.encode(data[i]).replace(/display:/g,
							"display:none").replace("\"disabled\":false",
							"\"disabled\":true");
					data[i] = Ext.decode(dd);
				}
			}				
			if(i==9){
				modifyData.push(this.getGridpanel_SRTestReport());
			}
			modifyData.push(data[i]);
		}
		biddata = da.split(modifyData);
		//biddata = da.splitForReadOnly(data);
		var formpanel_srInfo_input3 = new Ext.form.FormPanel({
			id : 'panel_srInfo_input3',
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
			title : "需求分析",
			items : biddata
		});
		return formpanel_srInfo_input3;
	},
	getGridpanel_SRTestReport : function() {
		var da = new DataAction();
		var obj = da.getPanelElementsForHead("panel_SRTestReport");
		var buttonUtil = new ButtonUtil();
		var getGridButtons = buttonUtil.getButtonForPanel("panel_SRTestReport",
				this);

		var sm = new Ext.grid.CheckboxSelectionModel();
		var columns = new Array();
		columns[0] = sm;
		// 循环出所有的行，然后增加属性修饰
		for (var i = 0; i < obj.length; i++) {
			var headItem = obj[i];
			var title = headItem.header;
			var alignStyle = 'left';
			var propertyName = headItem.dataIndex;
			var editor = headItem.editor;
			var renderer = headItem.renderer;
			var hide = headItem.hidden;
			var isHidden = false;
			if (hide == 'true') {
				isHidden = true;
			}
			// 给每一行增加修饰
			var columnItem = "";
			if (editor.xtype == 'combo') {
				columnItem = {
					header : title,
					dataIndex : propertyName,
					sortable : true,
					hidden : isHidden,
					align : alignStyle,
					renderer : renderer,
					editor : editor
				}
			} else if (editor.xtype == 'datefield') {
				columnItem = {
					header : title,
					dataIndex : propertyName,
					sortable : true,
					hidden : isHidden,
					align : alignStyle,
					renderer : renderer,
					editor : editor
				}
			} else {
				columnItem = {
					header : title,
					dataIndex : propertyName,
					sortable : true,
					hidden : isHidden,
					align : alignStyle,
					editor : editor
				}
			}
			columns[i + 1] = columnItem;
		}
		this.cm = new Ext.grid.ColumnModel(columns);
		this.store = da.getPagePanelJsonStore("panel_SRTestReport", obj);
		this.cm.defaultSortable = true;
		var viewConfig = Ext.apply({
			forceFit : true
		}, this.gridViewConfig);
		this.formValue = '';
		var gridpanel_SRTestReport = new Ext.grid.EditorGridPanel({
			fieldLabel : '测试信息',
			id : 'panel_SRTestReport',
			store : this.store,
			cm : this.cm,
			sm : sm,
			//title : "用户测试报告",
			trackMouseOver : false,
			loadMask : true,
			clicksToEdit : 2,
			collapsible : true,
			autoScroll : true,
//			loadMask : true,
			height : 120,
			width : 9999,// this.width - 15,
			frame : true,
			tbar : [getGridButtons]
		});
		if (this.dataId != '0') {
			var pcnameValue = "";
			var fcnameObj = Ext.getCmp("SpecialRequirement$id");
			if (fcnameObj != undefined) {
				pcnameValue = Ext.getCmp("SpecialRequirement$id").getValue();
			}
			var str = '{' + '\"' + "specialRequire" + '\"' + ':' + '\"'
					+ pcnameValue + '\"' + '}';// 这是要随时变得
			var param = eval('(' + str + ')');
			param.methodCall = 'query';
			// alert(str);
			this.store.load({
				params : param
			});
		}
		return gridpanel_SRTestReport;
	},
	items : this.items,
	buttons : this.buttons,
	/*
	 * clientvalidation 初始化
	 */
	initComponent : function() {
		
		var histroyForm = new HistroyForm({
			reqId : this.dataId,
			reqClass : "com.zsgj.itil.require.entity.SpecialRequirement"
		});
		
		var items = new Array();
		var temp = new Array();
		this.model = "esr_m_testByClient";
		var buttonUtil = new ButtonUtil();
		this.mybuttons = buttonUtil.getButtonForModel(
				"esr_m_testByClient", this);
		this.buttons = new Array();
		if(this.readOnly!=1){
			this.buttons =this.mybuttons;
		}

		temp.push(this.getFormpanel_erpSR_it_m_input());

		temp.push(this.getFormpanel_srInfo_input3());
		
		temp.push(histroyForm);
		items.push(this.getTabpanel(temp));
		this.items = items;
		this.on("removePlan", this.removePlan, this);
		this.on("saveForGrid", this.saveForGrid, this);
		this.on("saveAndSubmit", this.saveAndSubmit, this);
		PageTemplates.superclass.initComponent.call(this);
		if(Ext.getCmp('itil_req_SpecialRequirementInfo$isCompleteCombo').getValue()==""
			&&Ext.getCmp('itil_req_SpecialRequirementInfo$isContentCombo').getValue()==""){
			Ext.getCmp('itil_req_SpecialRequirementInfo$isCompleteCombo').setValue('1');
			Ext.getCmp('itil_req_SpecialRequirementInfo$isContentCombo').setValue('1');
		}
		
	}
})