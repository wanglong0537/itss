PageTemplates = Ext.extend(Ext.Panel, {
	id : "PageTemplates",
	layout : 'table',
	height : 'auto',
	align : 'center',
	foredit : true,
	width : 800,
	frame : true,
	autoScroll : true,
	defaults : {
		bodyStyle : 'padding:4px'
	},
	layoutConfig : {
		columns : 1
	},
//add by musicbear for 暂存按钮 in 2009 11 04 begin	
	saveTemp : function(){
		var tempDateId = this.dataId;
		var formParam = Ext.getCmp('panel_SRprojectContracts').form.getValues(false);
		var vp = null;
		if (formParam != null) {
			vp = Ext.apply(formParam, vp, {});
		}
		Ext.Ajax.request({
			url : webContext
					+ '/SRAction_saveRequirementContractForReq.action?reqId=' + tempDateId,
			params : vp,

			success : function(response, options) {
				var responseArray = Ext.util.JSON.decode(response.responseText);
				this.spid = responseArray.contractId;
				var spCode = responseArray.contractCode;
				Ext.getCmp('SRprojectContracts$id').setValue(this.spid);
				Ext.getCmp('SRprojectContracts$contractCode').setValue(spCode);
				Ext.MessageBox.alert("保存成功");
			},
			failure : function(response, options) {
				Ext.MessageBox.alert("保存失败");
			}
		}, this);
	},
//add by musicbear for 暂存按钮 in 2009 11 04 end	
	saveAndSubmit : function() {
		var curDataId = this.dataId;
		var formParam = Ext.getCmp('panel_SRprojectContracts').form.getValues(false);
		var vp = null;
		if (formParam != null) {
			vp = Ext.apply(formParam, vp, {});
		}
		Ext.Ajax.request({
			url : webContext
					+ '/SRAction_saveRequirementContractForReq.action?'
					+ '&reqId=' + this.dataId,
			params : vp,

			success : function(response, options) {
				var responseArray = Ext.util.JSON.decode(response.responseText);
				this.spid = responseArray.contractId;
				var spCode = responseArray.contractCode;
				Ext.getCmp('SRprojectContracts$id').setValue(this.spid);
				Ext.getCmp('SRprojectContracts$contractCode').setValue(spCode);
				window.parent.auditContentWin.specialAudit();
			},
			failure : function(response, options) {
				Ext.MessageBox.alert("保存失败");
			}
		}, this);
	},
	saveRequirementContract : function() {
		var curDataId = this.dataId;
		var formParam = Ext.getCmp('panel_SRprojectContracts').form
				.getValues(false);
		var vp = null;
		if (formParam != null) {
			vp = Ext.apply(formParam, vp, {});
		}
		Ext.Ajax.request({
			url : webContext
					+ '/SRAction_saveRequirementContractForReq.action?'
					+ '&reqId=' + this.dataId,
			params : vp,

			success : function(response, options) {
				var responseArray = Ext.util.JSON.decode(response.responseText);
				Ext.MessageBox.alert("提示", "保存成功");
				this.spid = responseArray.contractId;
				Ext.getCmp('SRprojectContracts$id').setValue(this.spid);
				window.location = webContext
						+ "/user/require/specialRequire/comfirmByITManager3.jsp?"
						+ "dataId=" + curDataId;
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
			//minTabWidth:100,
			//resizeTabs:true,
			title : tabTitle,
			deferredRender : false,
			frame : true,
			plain : true,
			border : false,
			//tabPosition:'bottom',
			baseCls : 'x-plain',// 是否设置和背景色同步
			width : 900,
			//bodyBorder : true,
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

	getFormpanel_SpecialRequire3_Input : function() {
		var da = new DataAction();
		var data = null;
		// 判断是新增还是修改
		var biddata = "";
		var buttonUtil = new ButtonUtil();
		this.getFormButtons = buttonUtil.getButtonForPanel(
				"panel_SpecialRequire3_Input", this);
		if (this.dataId != '0') {
			data = da.getPanelElementsForEdit("nsr1_confirmByClientManager",
					"panel_SpecialRequire3_Input", this.dataId);// 这是要随时变得
		} else {
			data = da.getPanelElementsForAdd("panel_SpecialRequire3_Input");

		}
		biddata = da.splitForReadOnly(data);
		if (this.getFormButtons.length != 0) {
			this.formpanel_SpecialRequire3_Input = new Ext.form.FormPanel({
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
				title : "用户申请",
				items : biddata,
				buttons : this.getFormButtons
			});
		} else {
			this.formpanel_SpecialRequire3_Input = new Ext.form.FormPanel({
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
				title : "用户申请",
				items : biddata
			});
		}
		return this.formpanel_SpecialRequire3_Input;
	},
	getFormserviceItemBasePanel : function() {
		var sra = new SRAction();
		var siId = sra.getReqServiceItemId(this.dataId);
		var da = new DataAction();
		var data = null;
		// 判断是新增还是修改
		var biddata = "";

		var buttonUtil = new ButtonUtil();
		this.getFormButtons = buttonUtil.getButtonForPanel("serviceItemBasePanel", this);

		if (siId != '0') {
			data = da.getSingleFormPanelElementsForEdit("serviceItemBasePanel",siId);// 这是要随时变得
		} else {
			data = da.getPanelElementsForAdd("serviceItemBasePanel");
		}
		biddata = da.splitForReadOnly(data);

		var item = new Array();
			this.formserviceItemBasePanel = new Ext.form.FormPanel({
				id : 'serviceItemBasePanel3',
				layout : 'table',
				height : 'auto',
				width : 800,
				frame : true,
				collapsible : true,
				defaults : {
					bodyStyle : 'padding:4px',
					autoHeight : true
				},
				style : 'padding:10px 0 0px 0px',
				layoutConfig : {
					columns : 4
				},
				title : "关联服务项",
				items : biddata
			});
		this.formserviceItemBasePanel2 = new Ext.Panel({
			id : 'serviceItemBasePanel',
			y : 200,
			anchor : '0 -200',
			layout : 'column',
			height : 1000,
			width : 1200,
			title : "关联服务项",
			items : [this.formserviceItemBasePanel]
			//items : [this.formserviceItemBasePanel,this.modifyGridInfo()]
		});
		return this.formserviceItemBasePanel2;
	},
	 modifyGridInfo:function(){
   
   		var sm = new Ext.grid.CheckboxSelectionModel();// 复选框
		var cm = new Ext.grid.ColumnModel([sm,{header:'id',dataIndex:'id',hidden:true,sortable:true},
											{header:'变更编号',dataIndex:'modifyNo',sortable:true},
											{header:'变更名称',dataIndex:'name',sortable:true},
											{header:'变更描述',dataIndex:'descn',sortable:true},
											{header:'变更原因',dataIndex:'reason',sortable:true},
											{header:'变更提交人',dataIndex:'applyUser',sortable:true},
											{header:'变更提交日期',dataIndex:'applyDate',sortable:true}
										
											]);
		this.storeChild=new Ext.data.JsonStore({
				url : webContext
						+'/ciRelationShip_getModifyInfoListByProblemId.action?objectId='+this.dataId+"&modifyType=specialRequire",//?&configItemId='+this.configItemId+"&itemFlag="+itemFlag,
				fields : ['id', 'modifyNo','name','descn','reason','applyUser','applyDate'],
				totalProperty : 'rowCount',
				root : 'data',
				id : 'id'
				
		});
		this.storeChild.paramNames.sort = "orderBy";
		this.storeChild.paramNames.dir = "orderType";
		this.pageBar = new Ext.PagingToolbarExt({
			pageSize :10,// 使用的是系统默认值
			store : this.storeChild,
			displayInfo : true,
			displayMsg : '当前显示 {0}-{1}条记录 /共{2}条记录',
			emptyMsg : "无显示数据"
		});
		this.formValue = '';
		this.pageBar.formValue = this.formValue;
		this.grid = new Ext.grid.GridPanel({
			id:"modifyGrid",
			title:"变更信息   <font color=black style='font-weight:lighter'  face=楷体_GB2312>【双击查看变更信息】</font>",
			store : this.storeChild,
			collapsible : true,
			cm : cm,
			sm : sm,
			height:200,
			width:800,
			frame:true,
			border:true,
			trackMouseOver : false,
			loadMask : true,
			y : 40,
			anchor : '0 -38',
			bbar : this.pageBar			
			});
		var param = {
			'start' : 1
			};
		this.pageBar.formValue = param;
		this.storeChild.load({
			params : param
		});
		return this.grid; 
   
   
   },
   
   lookModifyInfo:function(){
   		var record = Ext.getCmp("modifyGrid").getSelectionModel()
							.getSelected();
	    var records = Ext.getCmp("modifyGrid").getSelectionModel()
							.getSelections();
        if (!record) {
	         Ext.Msg.alert("提示", "请先选择查看的记录!");
	         return;
           }
         if (records.length == 0) {
	      Ext.MessageBox.alert('警告', '只能选择一条信息!');
	      return;
        }
        var modifyId = record.get("id");
        
        var url = webContext+ '/user/configNewModify/ciModifyFirstLook.jsp';

					this.configItemModifyWindow = new Ext.Window({
						//									
						title : '变更信息窗口',
						modal : true,
						height : 500,
						width : 800,
						resizable : true,
						id : "modifyInfoWindow",
						draggable : true,
						buttons : [{
							buttonAlign : 'center',
							text : '关闭',
							pressed : true,
							handler : function() {
								Ext.getCmp("modifyInfoWindow").close();
								// Ext.getCmp("tree").root.reload();
							}
						}],
						autoLoad : {
							// 装载审批有关信息，与流程有关,此处可把任务名称传递过去，auditInfo.jsp根据任务名称决定是否需要修改审批内容
							url : webContext + "/tabFrame.jsp?url=" + url+"?dataId="+modifyId,// +"****currentItemId="+currentItemId+"****flag=child",
							text : "页面正在加载中......",
							method : 'post',
							scope : this
						},
						viewConfig : {
							autoFill : true,
							forceFit : true
						},
						layout : 'fit',
						buttonAlign : 'center',
						items : [{
							html : "正在加载页面内容......"
						}]

					});
					this.configItemModifyWindow.show();	
        
        
        
   },
	getFormpanel_SRServiceProviderInfo_Input : function() {
		var da = new DataAction();
		var data = null;
		// 判断是新增还是修改
		var biddata = "";

		var buttonUtil = new ButtonUtil();
		this.getFormButtons = buttonUtil.getButtonForPanel(
				"panel_SRServiceProviderInfo_Input", this);
		if (this.dataId != '0') {
			data = da.getPanelElementsForEdit("sr2_makeInfoByEngineer",
					"panel_SRServiceProviderInfo_Input", this.dataId);// 这是要随时变得
		} else {
			data = da.getPanelElementsForAdd("panel_SRServiceProviderInfo_Input");
			
		}
		biddata = da.splitForReadOnly(data);
		if (this.getFormButtons.length != 0) {
			this.formpanel_SRServiceProviderInfo_Input = new Ext.form.FormPanel({
				id : 'panel_SRServiceProviderInfo_Input',
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
				title : "技术总监审批面板",
				items : biddata,
				buttons : this.getFormButtons
			});
		} else {
			this.formpanel_SRServiceProviderInfo_Input = new Ext.form.FormPanel({
				id : 'panel_SRServiceProviderInfo_Input',
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
				title : "技术总监审批面板",
				items : biddata
			});
		}
		return this.formpanel_SRServiceProviderInfo_Input;
	},

/****
 *    remove  by muiscbear for 去掉个性化需求计划 in 2009 11 6 start
 * 

	getGridpanel_SRExpendPlan_list : function() {
		var reqId = this.dataId;
		var da = new DataAction();
		var obj = da.getPanelElementsForHead("panel_SRExpendPlan_list");
		var buttonUtil = new ButtonUtil();
		var getGridButtons = buttonUtil.getButtonForPanel(
				"panel_SRExpendPlan_list", this);

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
		this.store = da.getPagePanelJsonStore("panel_SRExpendPlan_list", obj);
		var addExpendPlanButton = new Ext.Button({
			text : '添加',
			pressed : true,
			iconCls : 'add',
			handler : function() {
				var store = Ext.getCmp('panel_SRExpendPlan_list').store;
				if (store.recordType) {
					var rec = new store.recordType({
						newRecord : true
					});
					rec.fields.each(function(f) {
						rec.data[f.name] = f.defaultValue || null;
					});
					rec.commit();
					store.add(rec);
					return rec;
				}
				return false;
			}
		});
		var removeExpendPlanButton = new Ext.Button({
			text : '删除',
			pressed : true,
			iconCls : 'remove',
			handler : function() {
				var record = Ext.getCmp('panel_SRExpendPlan_list')
						.getSelectionModel().getSelected();
				var records = Ext.getCmp('panel_SRExpendPlan_list')
						.getSelectionModel().getSelections();
				if (!record) {
					Ext.Msg.alert("提示", "请先选择要删除的行!");
					return;
				}
				if (records.length == 0) {
					Ext.MessageBox.alert('警告', '最少选择一条信息，进行删除!');
				} else {
					Ext.MessageBox.confirm('提示框', '您确定要进行该操作？', function(btn) {
						if (btn == 'yes') {
							if (records) {
								for (var i = 0; i < records.length; i++) {
									Ext.getCmp('panel_SRExpendPlan_list').store
											.remove(records[i]);
									var id = records[i].get("SRExpendPlan$id");
									Ext.Ajax.request({
										url : webContext
												+ '/extjs/pageData?method=removeGridColumn',
										params : {
											panel : 'panel_SRExpendPlan_list',
											id : id
										},
										timeout : 100000,
										success : function(response) {
											var r = Ext
													.decode(response.responseText);
											if (!r.success) {
												Ext.Msg.alert("提示信息", "数据删除失败",
														function() {

														});
											}
											Ext
													.getCmp('panel_SRExpendPlan_list').store
													.reload();
										},
										scope : this

									});
								}
							}
						}
					}, this)
				}
			}
		});
		var saveExpendPlanButton = new Ext.Button({
			text : '保存',
			pressed : true,
			iconCls : 'save',
			handler : function() {
				// var reqId = this.dataId;
				var store = Ext.getCmp('panel_SRExpendPlan_list').store;
				var info = "";
				store.each(function(record) {
					if (record.dirty) {
						info += Ext.encode(record.data) + ",";
					}
				})
				info = unicode(info);
				Ext.Ajax.request({
					url : webContext + '/SRAction_saveExpendPlan.action',
					params : {
						info : info,
						reqId : reqId
					},
					success : function(response, options) {
						Ext.MessageBox.alert("提示", "保存成功", function() {
							store.reload();
								// store.removeAll();
								// removedIds = "";
							});

					},
					failure : function(response, options) {
						Ext.MessageBox.alert("保存失败");
					}

				})
			}
		});
		this.cm.defaultSortable = true;
		// var viewConfig = Ext.apply({
		// forceFit : false
		// }, this.gridViewConfig);
		this.formValue = '';
		this.gridpanel_SRExpendPlan_list = new Ext.grid.EditorGridPanel({
			id : 'panel_SRExpendPlan_list',
			store : this.store,
			cm : this.cm,
			sm : sm,
			title : "<font color=red>个性化需求支出计划</font>",
			trackMouseOver : false,
			loadMask : true,
			clicksToEdit : 2,
			collapsible : true,
			autoScroll : true,
			loadMask : true,
			autoHeight : true,
			width : 800,// this.width - 15,
			frame : true,
			tbar : [addExpendPlanButton, removeExpendPlanButton,
					saveExpendPlanButton]
				// [getGridButtons]
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
		return this.gridpanel_SRExpendPlan_list;
	},
 * 
 * 
 * 
 * remove  by muiscbear for 去掉个性化需求计划 in 2009 11 6 end	
 */
	getGridpanel_SRIncomePlan_list : function() {
		var reqId = this.dataId;
		var da = new DataAction();
		var obj = da.getPanelElementsForHead("panel_SRIncomePlan_list");
		var buttonUtil = new ButtonUtil();
		var getGridButtons = buttonUtil.getButtonForPanel(
				"panel_SRIncomePlan_list", this);

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
		this.store = da.getPagePanelJsonStore("panel_SRIncomePlan_list", obj);
		var addIncomePlanButton = new Ext.Button({
			text : '添加',
			pressed : true,
			iconCls : 'add',
			handler : function() {
				var store = Ext.getCmp('panel_SRIncomePlan_list').store;
				if (store.recordType) {
					var rec = new store.recordType({
						newRecord : true
					});
					rec.fields.each(function(f) {
						rec.data[f.name] = f.defaultValue || null;
					});
					rec.commit();
					store.add(rec);
					return rec;
				}
				return false;
			}
		});
		var removeIncomePlanButton = new Ext.Button({
			text : '删除',
			pressed : true,
			iconCls : 'remove',
			handler : function() {
				var record = Ext.getCmp('panel_SRIncomePlan_list')
						.getSelectionModel().getSelected();
				var records = Ext.getCmp('panel_SRIncomePlan_list')
						.getSelectionModel().getSelections();
				if (!record) {
					Ext.Msg.alert("提示", "请先选择要删除的行!");
					return;
				}
				if (records.length == 0) {
					Ext.MessageBox.alert('警告', '最少选择一条信息，进行删除!');
				} else {
					Ext.MessageBox.confirm('提示框', '您确定要进行该操作？', function(btn) {
						if (btn == 'yes') {
							if (records) {
								for (var i = 0; i < records.length; i++) {
									Ext.getCmp('panel_SRIncomePlan_list').store
											.remove(records[i]);
									var id = records[i].get("SRIncomePlan$id");
									Ext.Ajax.request({
										url : webContext
												+ '/extjs/pageData?method=removeGridColumn',
										params : {
											panel : 'panel_SRIncomePlan_list',
											id : id
										},
										timeout : 100000,
										success : function(response) {
											var r = Ext
													.decode(response.responseText);
											if (!r.success) {
												Ext.Msg.alert("提示信息", "数据删除失败",
														function() {

														});
											}
//remove by lee for “个性化需求收款计划”中，删除按钮功能有误	in 2009 11 7 										
//											Ext
//													.getCmp('panel_SRIncomePlan_list').store
//													.reload();
										},
										scope : this

									});
								}
							}
						}
					}, this)
				}
			}
		});
		var saveIncomePlanButton = new Ext.Button({
			text : '保存',
			pressed : true,
			iconCls : 'save',
			handler : function() {
				// var reqId = this.dataId;
				var store = Ext.getCmp('panel_SRIncomePlan_list').store;
				var info = "";
				store.each(function(record) {
					if (record.dirty) {
						info += Ext.encode(record.data) + ",";
					}
				})
				info = unicode(info);
				Ext.Ajax.request({
					url : webContext + '/SRAction_saveIncomePlan.action',
					params : {
						info : info,
						reqId : reqId
					},
					success : function(response, options) {
						Ext.MessageBox.alert("提示", "保存成功", function() {
							store.reload();
								// store.removeAll();
								// removedIds = "";
							});

					},
					failure : function(response, options) {
						Ext.MessageBox.alert("保存失败");
					}

				})
			}
		});
		this.cm.defaultSortable = true;
		// var viewConfig = Ext.apply({
		// forceFit : true
		// }, this.gridViewConfig);
		this.formValue = '';
		this.gridpanel_SRIncomePlan_list = new Ext.grid.EditorGridPanel({
			id : 'panel_SRIncomePlan_list',
			store : this.store,
			cm : this.cm,
			sm : sm,
			title : "<font color=red>个性化需求收款计划</font>",
			trackMouseOver : false,
			loadMask : true,
			clicksToEdit : 2,
			collapsible : true,
			autoScroll : true,
			loadMask : true,
			autoHeight : true,
			width : 800,// this.width - 15,
			frame : true,
			tbar : [addIncomePlanButton, removeIncomePlanButton,
					saveIncomePlanButton]
				// [getGridButtons]
		});
		if (this.dataId != '0') {
			var pcnameValue = "";
			var fcnameObj = Ext.getCmp("SpecialRequirement$id");
			if (fcnameObj != undefined) {
				pcnameValue = Ext.getCmp("SpecialRequirement$id").getValue();
			}
			var str = '{' + '\"' + "specialRequire" + '\"' + ':' + '\"'
					+ this.dataId + '\"' + '}';// 这是要随时变得
			var param = eval('(' + str + ')');
			param.methodCall = 'query';
			// alert(str);
			this.store.load({
				params : param
			});
		}
		return this.gridpanel_SRIncomePlan_list;
	},

	getFormpanel_SRAnalyse : function() {
		var sra = new SRAction();
		var praId = sra.getProjectRequireAnalyseId(this.dataId);
		var da = new DataAction();
		var data = null;
		// 判断是新增还是修改
		var biddata = "";

		var buttonUtil = new ButtonUtil();
		this.getFormButtons = buttonUtil.getButtonForPanel("panel_SRAnalyse",
				this);
		if (praId != '0') {
			data = da.getSingleFormPanelElementsForEdit("panel_SRAnalyse",
					praId);// 这是要随时变得
		} else {
			data = da.getSingleFormPanelElementsForEdit("panel_SRAnalyse", "");
		}
		biddata = da.splitForReadOnly(data);
		if (this.getFormButtons.length != 0) {
			this.formpanel_SRAnalyse = new Ext.form.FormPanel({
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
				items : biddata,
				buttons : this.getFormButtons
			});
		} else {
			this.formpanel_SRAnalyse = new Ext.form.FormPanel({
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
		}
		return this.formpanel_SRAnalyse;
	},
	getFormpanel_SRProjectPlan : function() {
		var da = new DataAction();
		var data = null;
		// 判断是新增还是修改
		var biddata = "";

		var buttonUtil = new ButtonUtil();
		this.getFormButtons = buttonUtil.getButtonForPanel(
				"panel_SRProjectPlan", this);
		if (this.dataId != '0') {
			data = da.getPanelElementsForEdit("nsr_comfirmByITManager2",
					"panel_SRProjectPlan", this.dataId);// 这是要随时变得
			biddata = da.split(data);
		} else {
			data = da.getPanelElementsForAdd("panel_SRProjectPlan");
			biddata = da.split(data);
		}
		if (this.getFormButtons.length != 0) {
			this.formpanel_SRProjectPlan = new Ext.form.FormPanel({
				id : 'panel_SRProjectPlan',
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
				title : "个性化需求项目计划实体(N)",
				items : biddata,
				buttons : this.getFormButtons
			});
		} else {
			this.formpanel_SRProjectPlan = new Ext.form.FormPanel({
				id : 'panel_SRProjectPlan',
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
				title : "个性化需求项目计划实体(N)",
				items : biddata
			});
		}
		return this.formpanel_SRProjectPlan;
	},
	getFormpanel_SRprojectContracts : function() {
		var sra = new SRAction();
		var rcId = sra.getRequirementContractId(this.dataId);
		var da = new DataAction();
		var data = null;
		// 判断是新增还是修改
		var biddata = "";

		var buttonUtil = new ButtonUtil();
		this.getFormButtons = buttonUtil.getButtonForPanel(
				"panel_SRprojectContracts", this);
		if (rcId != '0') {
			data = da.getSingleFormPanelElementsForEdit(
					"panel_SRprojectContracts", rcId);// 这是要随时变得
		} else {
			data = da.getSingleFormPanelElementsForEdit(
					"panel_SRprojectContracts", "");
		}
		for (i = 0; i < data.length; i++) {
			var idStr = data[i].id + "";
			if (idStr=="SRprojectContracts$contractCode") {
				data[i].readOnly = true;
				//data[i].emptyText = '自动生成';
			}
		}
		biddata = da.split(data);
		
		var saveTempButton = new Ext.Button({
			text : "暂存合同",
			iconCls : 'save',
			scope : this,
			handler : this.saveTemp
		});
		this.getFormButtons.push(saveTempButton);
		if (this.getFormButtons.length != 0) {
			this.formpanel_SRprojectContracts = new Ext.form.FormPanel({
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
				title : "<font color=red>个性化需求合同</font>",
				items : biddata,
				buttons : this.getFormButtons
			});
		} else {
			this.formpanel_SRprojectContracts = new Ext.form.FormPanel({
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
				title : "<font color=red>个性化需求合同</font>",
				items : biddata
			});
		}
		return this.formpanel_SRprojectContracts;
	},
	items : this.items,
	/*
	 * clientvalidation 初始化
	 */
	initComponent : function() {
		var histroyForm = new HistroyForm({
			reqId : this.dataId,
			reqClass : "com.digitalchina.itil.require.entity.SpecialRequirement"
		});
		var sra = new SRAction();
		var ppId = sra.getRootProjectPlanId(this.dataId);
		var items = new Array();
		var pa = new Array();
		this.pa = pa;
		var gd = new Array();
		this.gd = gd;
		var temp = new Array();
		this.temp = temp;
		var formname = new Array();
		this.formname = formname;
		var gridname = new Array();
		this.gridname = gridname;
		this.model = "nsr1_comfirmByITManager2";
		var buttonUtil = new ButtonUtil();
		this.mybuttons = buttonUtil.getButtonForModel(
				"nsr1_comfirmByITManager2", this);
		if (this.mybuttons != "") {
			this.buttons = {
				layout : 'table',
				height : 'auto',
				width : 800,
				style : 'margin:4px 6px 4px 300px',
				align : 'center',
				defaults : {
					bodyStyle : 'padding:4px'
				},
				items : this.mybuttons
			};
		} else {
			this.buttons = {
				layout : 'table',
				height : 'auto',
				width : 800,
				style : 'margin:4px 6px 4px 300px',
				align : 'center',
				defaults : {
					bodyStyle : 'padding:4px'
				}
			};
		}

		this.getFormpanel_SpecialRequire3_Input();
		this.pa.push(this.formpanel_SpecialRequire3_Input);
		this.formname.push("panel_SpecialRequire3_Input");
		temp.push(this.formpanel_SpecialRequire3_Input);

		this.getFormpanel_SRServiceProviderInfo_Input();
		this.pa.push(this.formpanel_SRServiceProviderInfo_Input);
		this.formname.push("panel_SRServiceProviderInfo_Input");
		temp.push(this.formpanel_SRServiceProviderInfo_Input);
		this.getFormpanel_SRAnalyse();
		this.pa.push(this.formpanel_SRAnalyse);
		this.formname.push("panel_SRAnalyse");
		temp.push(this.formpanel_SRAnalyse);
//		this.projectPlanGrid = new projectPlanListPanel({
//			dataId : this.dataId,
//			rootId : ppId
//		});
//
//		this.pa.push(this.projectPlanGrid);
//		this.formname.push("projectPlanListPanel");
//		temp.push(this.projectPlanGrid);
		this.getFormserviceItemBasePanel();
		this.pa.push(this.formserviceItemBasePanel2);
		this.formname.push("serviceItemBasePanel");
		temp.push(this.formserviceItemBasePanel2);
		this.getFormpanel_SRprojectContracts();
		this.pa.push(this.formpanel_SRprojectContracts);
		this.formname.push("panel_SRprojectContracts");
		temp.push(this.formpanel_SRprojectContracts);

//remove  by muiscbear for 去掉个性化需求计划 in 2009 11 6 start
//		
//		this.getGridpanel_SRExpendPlan_list();
//		this.gd.push(this.gridpanel_SRExpendPlan_list);
//		this.gridname.push("panel_SRExpendPlan_list");
//		temp.push(this.gridpanel_SRExpendPlan_list);
//		
//remove  by muiscbear for 去掉个性化需求计划 in 2009 11 6 end		
		
		
		this.getGridpanel_SRIncomePlan_list();
		this.gd.push(this.gridpanel_SRIncomePlan_list);
		this.gridname.push("panel_SRIncomePlan_list");
		temp.push(this.gridpanel_SRIncomePlan_list);
		temp.push(histroyForm);
		items.push(this.getTabpanel(temp));
		if(this.readOnly!=1){
			items.push(this.buttons);
		}
		this.items = items;
		this.on("saveRequirementContract", this.saveRequirementContract, this);
		
		this.on("saveTemp", this.saveTemp, this);
		this.on("saveAndSubmit", this.saveAndSubmit, this);
		PageTemplates.superclass.initComponent.call(this);
	}

})