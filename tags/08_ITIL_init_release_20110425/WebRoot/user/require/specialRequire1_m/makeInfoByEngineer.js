PageTemplates = Ext.extend(Ext.Panel, {
	id : "PageTemplates",
	layout : 'table',
	height : 'auto',
	align : 'center',
	foredit : true,
	width : 1050,
	frame : true,
	autoScroll : true,
	defaults : {
		bodyStyle : 'padding:4px'
	},
	layoutConfig : {
		columns : 1
	},
	saveAndSubmit : function() {
		if (!Ext.getCmp('panel_SRAnalyse').form.isValid()) {
			Ext.MessageBox.alert("提示", "页面中带红色波浪线的为必填项,请填写完整必填项.");
			return false;
		}
		var formParam = Ext.getCmp('panel_SRAnalyse').form.getValues(false);
		var vp = null;
		if (formParam != null) {
			vp = Ext.apply(formParam, vp, {});
		}
		var curdataId = this.dataId;
		Ext.Ajax.request({
			url : webContext
					+ '/SRAction_saveProjectRequireAnalyseForReq.action?'
					+ '&reqId=' + this.dataId,
			params : vp,
			success : function(response, options) {
				var responseArray = Ext.util.JSON.decode(response.responseText);
				var tempId = responseArray.id;
				Ext.getCmp('SRAnalyse$id').setValue(tempId);
				window.parent.auditContentWin.specialAudit();
			},
			failure : function(response, options) {
				Ext.MessageBox.alert("保存失败");
			}
		}, this);
	},

	saveProjectRequireAnalyse : function() {
		var formParam = Ext.getCmp('panel_SRAnalyse').form.getValues(false);
		var vp = null;
		if (formParam != null) {
			vp = Ext.apply(formParam, vp, {});
		}
		var curdataId = this.dataId;
		Ext.Ajax.request({
			url : webContext
					+ '/SRAction_saveProjectRequireAnalyseForReq.action?'
					+ '&reqId=' + this.dataId,
			params : vp,
			success : function(response, options) {
				Ext.MessageBox.alert("保存成功");
				window.location = webContext
						+ "/user/require/specialRequire1_m/makeInfoByEngineer.jsp?"
						+ "dataId=" + curdataId;
			},
			failure : function(response, options) {
				Ext.MessageBox.alert("保存失败");
			}
		}, this);
	},
	saveProjectPlan : function() {
		var formParam = Ext.getCmp('panel_SRProjectPlan').form.getValues(false);
		var vp = null;
		if (formParam != null) {
			vp = Ext.apply(formParam, vp, {});
		}
		Ext.Ajax.request({
			url : webContext + '/SRAction_saveProjectPlanForReq.action?'
					+ '&reqId=' + this.dataId,
			params : vp,

			success : function(response, options) {
				Ext.MessageBox.alert("保存成功");
				var responseArray = Ext.util.JSON.decode(response.responseText);
				var curId = responseArray.requirementServiceItemId;
				window.location = webContext
						+ "/user/require/specialRequire1_m/makeInfoByEngineer.jsp?"
						+ "dataId=" + this.dataId;
			},
			failure : function(response, options) {
				Ext.MessageBox.alert("保存失败");
			}
		}, this);
	},
	addServiceItem : function() {
		var dataId = this.dataId;
		var taskId = this.taskId;
		// var reqClass = this.reqClass;
		var record = Ext.getCmp('gridpanel').getSelectionModel().getSelected();
		var records = Ext.getCmp('gridpanel').getSelectionModel()
				.getSelections();
		var store = this.storeservice;
		if (!record) {
			Ext.Msg.alert("提示", "请先选择要添加的行!");
			return;
		}
		if (records.length > 1) {
			Ext.MessageBox.alert('提示', '最多选择一条信息，进行添加!');
		}
		var newdataId = record.get('ServiceItem$id');
		Ext.Ajax.request({
			url : webContext + '/SRAction_saveServiceItemReShip.action?'
					+ 'reqId=' + dataId + '&newdataId=' + newdataId,

			success : function(response, options) {
				Ext.MessageBox.alert("提示", "添加成功", function() {
					Ext.getCmp('winid').close();
					window.location = webContext
							+ "/user/require/specialRequire1_m/makeInfoByEngineer.jsp?"
							+ "dataId=" + dataId + "&tabNumer="
							+ 'serviceItemBasePanel' + "taskId=" + taskId;
				});
			},
			failure : function(response, options) {
				Ext.MessageBox.alert("添加失败");
			}
		}, this);
	},
	reset : function() {
		Ext.getCmp('searchPanel').form.reset();
	},
	createSearch2 : function(btnName, link, imageUrl, scope) {
		var param = Ext.getCmp('searchPanel').form.getValues(false);
		param.methodCall = 'query';
		param.start = 1;
		this.formValue = param;
		this.pageBarservice.formValue = this.formValue;
		this.storeservice.removeAll();
		this.storeservice.load({
			params : param
		});

		return null;
	},
	saveServiceItem : function() {
		var formParam = Ext.getCmp('serviceItemBasePanel3').form
				.getValues(false);
		var vp = null;
		if (formParam != null) {
			vp = Ext.apply(formParam, vp, {});
		}
		var curdataId = this.dataId;
		Ext.Ajax.request({
			url : webContext + '/SRAction_saveServiceItemForRequire.action?'
					+ '&reqId=' + this.dataId,
			params : vp,

			success : function(response, options) {
				Ext.MessageBox.alert("保存成功");
				window.location = webContext
						+ "/user/require/specialRequire1_m/makeInfoByEngineer.jsp?"
						+ "dataId=" + curdataId + "&tabNumer="
						+ 'serviceItemBasePanel';
			},
			failure : function(response, options) {
				Ext.MessageBox.alert("保存失败");
			}
		}, this);
	},
	selectServiceItem : function() {
		var createPanel2 = this.getGridPanel();
		this.fp = this.getSearchForm();
		var win1 = new Ext.Window({
			id : 'winid',
			title : '服务项',
			height : 400,
			width : 700,
			constrain : false,
			constrainHeader : true,
			modal : true,
			resizable : false,
			draggable : true,
			layout : 'border',
			scope : this,
			items : [this.fp, createPanel2],
			buttons : [{
				text : '关闭',
				handler : function() {
					win1.close();
				},
				listeners : {
					'beforeclose' : function(p) {
						return true;
					}
				},
				scope : this
			}]
		});
		win1.show();
	},
	getSearchForm : function() {
		var da = new DataAction();
		var data = da.getPanelElementsForQuery("SerivceItemListGrid");
		var biddata = da.split(data);
		this.panel = new Ext.form.FormPanel({
			id : 'searchPanel',
			region : "north",
			layout : 'table',
			height : 'auto',
			width : 300,
			frame : true,
			collapsible : true,
			defaults : {
				bodyStyle : 'padding:6px'
			},
			layoutConfig : {
				columns : 4
			},
			items : biddata
		});
		return this.panel;
	},
	getGridPanel : function() {
		var da = new DataAction();
		this.fp = this.getSearchForm();
		var obj = da.getListPanelElementsForHead("SerivceItemListGrid");
		// 前面的复选框
		var sm = new Ext.grid.CheckboxSelectionModel();
		var columns = new Array();
		columns[0] = sm;
		// 循环出所有的行，然后增加属性修饰
		for (var i = 0; i < obj.length; i++) {
			var headItem = obj[i];
			var title = headItem.header;
			var alignStyle = 'left';
			var propertyName = headItem.dataIndex;
			var renderer = headItem.renderer;
			var hide = headItem.hidden;
			var isHidden = false;
			if (hide == 'true') {
				isHidden = true;
			}
			// 给每一行增加修饰
			var columnItem = "";
			columnItem = {
				header : title,
				dataIndex : propertyName,
				sortable : true,
				hidden : isHidden,
				align : alignStyle
			}

			columns[i + 1] = columnItem;
		}
		this.cm = new Ext.grid.ColumnModel(columns);
		this.storeservice = da
				.getPagePanelJsonStore("SerivceItemListGrid", obj);
		this.storeservice.paramNames.sort = "orderBy";
		this.storeservice.paramNames.dir = "orderType";
		this.cm.defaultSortable = true;
		var viewConfig = Ext.apply({
			forceFit : true
		}, this.gridViewConfig);
		this.pageBarservice = new Ext.PagingToolbarExt({
			pageSize : 10,
			store : this.storeservice,
			displayInfo : true,
			displayMsg : '当前显示 {0}-{1}条记录 /共{2}条记录',
			emptyMsg : "无显示数据"
		});
		this.formValue = '';
		this.pageBarservice.formValue = this.formValue;
		this.gridpanel = new Ext.grid.EditorGridPanel({
			id : "gridpanel",
			region : "center",
			rowspan : 1,
			store : this.storeservice,
			width : 100,
			frame : true,
			cm : this.cm,
			sm : sm,
			trackMouseOver : false,
			loadMask : true,
			height : 320,
			tbar : [{}, {
				text : '查 询',
				pressed : true,
				handler : this.createSearch2,
				scope : this,
				iconCls : 'search'
			}, '|', {
				text : '重 置',
				pressed : true,
				handler : this.reset,
				scope : this,
				iconCls : 'reset'
			}, '|', {
				text : '添 加',
				pressed : true,
				handler : this.addServiceItem,
				scope : this,
				iconCls : 'add'
			}, '   '],
			bbar : this.pageBarservice

		});
		var param = {
			'mehtodCall' : 'query',
			'start' : 1
		};

		this.pageBarservice.formValue = param;

		this.storeservice.removeAll();
		this.storeservice.load({
			params : param
		});

		return this.gridpanel;

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

	getFormpanel_SpecialRequire3_m_Input : function() {
		var da = new DataAction();
		var data = null;
		// 判断是新增还是修改
		var biddata = "";
		var buttonUtil = new ButtonUtil();
		this.getFormButtons = buttonUtil.getButtonForPanel(
				"panel_SpecialRequire3_m_Input", this);
		if (this.dataId != '0') {
			data = da.getPanelElementsForEdit("nsr1_m_makeInfoByEngineer",
					"panel_SpecialRequire3_m_Input", this.dataId);// 这是要随时变得
		} else {
			data = da.getPanelElementsForAdd("panel_SpecialRequire3_m_Input");

		}
		for (i = 0; i < data.length; i++) {
			if (data[i].xtype == 'combo' || data[i].xtype == 'datefield') {
				data[i].id = data[i].id + 8;// 改变Combobox的id
				data[i].readOnly = true;
				data[i].hideTrigger = true;
			}
			if (data[i].xtype == "panel") {
				var dd = Ext.encode(data[i]).replace(/display:/g,"display:none").replace("\"disabled\":false","\"disabled\":true");
				data[i] = Ext.decode(dd);
			}
			data[i].readOnly = true;
		}
		biddata = da.split(data);
		if (this.getFormButtons.length != 0) {
			this.formpanel_SpecialRequire3_m_Input = new Ext.form.FormPanel({
				id : 'panel_SpecialRequire3_m_Input',
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
			this.formpanel_SpecialRequire3_m_Input = new Ext.form.FormPanel({
				id : 'panel_SpecialRequire3_m_Input',
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
		return this.formpanel_SpecialRequire3_m_Input;
	},
	getFormserviceItemBasePanel : function() {
		var sra = new SRAction();
		var siId = sra.getReqServiceItemId(this.dataId);
		var da = new DataAction();
		var data = null;
		// 判断是新增还是修改
		var biddata = "";

		var buttonUtil = new ButtonUtil();
		this.getFormButtons = buttonUtil.getButtonForPanel(
				"serviceItemBasePanel", this);

		if (siId != '0') {
			data = da.getSingleFormPanelElementsForEdit("serviceItemBasePanel",siId);// 这是要随时变得

		} else {
			data = da.getPanelElementsForAdd("serviceItemBasePanel");

		}
		for (i = 0; i < data.length; i++) {
			if (data[i].id == 'ServiceItem$serviceItemCode') {
				data[i].readOnly = true;
				data[i].emptyText = '自动生成';
			}

		}

		biddata = da.split(data);

		var item = new Array();
		if (this.getFormButtons.length != 0&&this.readOnly!=1) {
			this.formserviceItemBasePanel = new Ext.form.FormPanel({
				id : 'serviceItemBasePanel3',
				layout : 'table',
				height : 'auto',
				width : 800,
				frame : true,
				collapsible : true,
				defaults : {
					bodyStyle : 'padding:4px'

				},
				style : 'padding:10px 0 0px 0px',
				layoutConfig : {
					columns : 4
				},
				title : "<font color=red>关联服务项</font>",
				items : biddata,
				buttons : this.getFormButtons
			});
		} else {
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
				title : "<font color=red>关联服务项</font>",
				items : biddata
			});
		}
		this.formserviceItemBasePanel2 = new Ext.Panel({
			id : 'serviceItemBasePanel',
			y : 200,
			anchor : '0 -200',
			layout : 'column',
			height : 1000,
			width : 1200,
			title : "<font color=red>关联服务项</font>",
			items : [this.formserviceItemBasePanel,this.modifyGridInfo()]
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
		for (i = 0; i < data.length; i++) {
			if (data[i].xtype == 'combo' || data[i].xtype == 'datefield') {
				data[i].id = data[i].id + 8;//改变Combobox的id
				data[i].readOnly = true;
				data[i].hideTrigger = true;
			}
			if (data[i].xtype == "panel") {
				var dd = Ext.encode(data[i]).replace(/display:/g,"display:none").replace("\"disabled\":false","\"disabled\":true");
				data[i] = Ext.decode(dd);
			}
			data[i].readOnly = true;
		}
		biddata = da.split(data);
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
		biddata = da.split(data);
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
				title : "<font color=red>项目需求分析</font>",
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
				title : "<font color=red>项目需求分析</font>",
				items : biddata
			});
		}
		return this.formpanel_SRAnalyse;
	},
		
	ciModify:function(){//相关配置项变更
			window.location = webContext
							+ '/user/configNewModify/configNewModify.jsp?modifyObjectId='+this.dataId
							+ "&backUrl=/user/require/specialRequire1_m/makeInfoByEngineer.jsp?dataId="
							+"&modifyType=specialRequire";
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
		this.model = "nsr1_m_makeInfoByEngineer";
		var buttonUtil = new ButtonUtil();
		this.mybuttons = buttonUtil.getButtonForModel(
				"nsr1_m_makeInfoByEngineer", this);
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
		var serviceId = sra.getReqServiceItemId(this.dataId);
		this.getFormpanel_SpecialRequire3_m_Input();
		this.pa.push(this.formpanel_SpecialRequire3_m_Input);
		this.formname.push("panel_SpecialRequire3_m_Input");
		temp.push(this.formpanel_SpecialRequire3_m_Input);
		this.getFormpanel_SRServiceProviderInfo_Input();
		this.pa.push(this.formpanel_SRServiceProviderInfo_Input);
		this.formname.push("panel_SRServiceProviderInfo_Input");
		temp.push(this.formpanel_SRServiceProviderInfo_Input);
		this.getFormpanel_SRAnalyse();
		this.pa.push(this.formpanel_SRAnalyse);
		this.formname.push("panel_SRAnalyse");
		temp.push(this.formpanel_SRAnalyse);
		//		if (serviceId != '0') {
		
		//		}
//		this.projectPlanGrid = new projectPlanListPanel({
//			dataId : this.dataId,
//			rootId : ppId
//		});
//		this.pa.push(this.projectPlanGrid);
//		this.formname.push("projectPlanListPanel");
//		temp.push(this.projectPlanGrid);
		this.getFormserviceItemBasePanel();
		this.pa.push(this.formserviceItemBasePanel2);
		this.formname.push("serviceItemBasePanel");
		temp.push(this.formserviceItemBasePanel2);
//		if (serviceId != '0') {
//			this.serviceORconfigShipTree = new PagteModelTreePanel({
//				dataId : this.dataId,
//				rootId : ppId
//			});
//			this.pa.push(this.serviceORconfigShipTree);
//			this.formname.push("tree");
//			temp.push(this.serviceORconfigShipTree);
//		}
		temp.push(histroyForm);
		items.push(this.getTabpanel(temp));
		if(this.readOnly!=1){
			items.push(this.buttons);
		}
		this.items = items;
		this.on("ciModify",this.ciModify,this);
		this.on("saveServiceItem", this.saveServiceItem, this);
		this.on("selectServiceItem", this.selectServiceItem, this);
		this.on("saveProjectRequireAnalyse", this.saveProjectRequireAnalyse,this);
		this.on("saveProjectPlan", this.saveProjectPlan, this);
		this.on("saveAndSubmit", this.saveAndSubmit, this);
		Ext.getCmp("modifyGrid").on("rowdblclick",this.lookModifyInfo,this);
		PageTemplates.superclass.initComponent.call(this);
	}
})