RealExecutionView = Ext.extend(Ext.Panel, {
	searchPanel : null,
	gridPanel : null,
	store : null,
	topbar : null,
	constructor : function(a) {
		Ext.applyIf(this, a);
		this.initUIComponents();
		RealExecutionView.superclass.constructor.call(this, {
			id : "RealExecutionView",
			title : "执行跟踪管理",
			region : "center",
			layout : "border",
			items : [ this.searchPanel, this.gridPanel ]
		});
	},
	initUIComponents : function() {
		this.searchPanel = new Ext.FormPanel({
			height : 40,
			region : "north",
			frame : false,
			border : false,
			layout : "hbox",
			layoutConfig : {
				padding : "5",
				align : "middle"
			},
			defaults : {
				xtype : "label",
				margins : {
					top : 0,
					right : 4,
					bottom : 4,
					left : 4
				}
			},
			items : [ {
				text : "预算名称"
			}, {
				name : "Q_budget.name_S_LK",
				xtype : "textfield",
				width : 100
			}/*, {
				text : "部门名称"
			}, {
				name : "Q_budget.belongDept.depName_S_LK",
				xtype : "textfield",
				width : 100
			}*/, {
				text : "成本要素名称"
			}, {
				name : "Q_budgetItem.name_S_LK",
				xtype : "textfield",
				width : 100
			}, {
				text : "备注"
			}, {
				name : "Q_remark_S_LK",
				xtype : "textfield",
				width : 100
			}, {
				xtype : "button",
				text : "查询",
				iconCls : "search",
				handler : this.search.createCallback(this)
			} ]
		});
		this.store = new Ext.data.JsonStore(
				{
					url : __ctxPath + "/budget/listRealExecution.do?Q_deleteFlag_N_EQ=0",
					root : "result",
					totalProperty : "totalCounts",
					remoteSort : true,
					fields : [ "realExecutionId",
					           {name : "budget", mapping : "budget.name"}, 
					           {name : "belongDept", mapping : "budget.belongDept.depName"}, 
					           {name : "budgetItem", mapping : "budgetItem.name"}, 
					           "realValue", 
					           "month", 
					           "inputDate",
					           "remark"]
				});
		this.store.setDefaultSort("realExecutionId", "desc");
		this.store.load({
			params : {
				start : 0,
				limit : 25
			}
		});
		this.rowActions = new Ext.ux.grid.RowActions({
			header : "管理",
			width : 80,
			actions : [ {
				iconCls : "btn-del",
				qtip : "删除",
				style : "margin:0 3px 0 3px"
			}, {
				iconCls : "btn-edit",
				qtip : "编辑",
				style : "margin:0 3px 0 3px"
			} ]
		});
		var b = new Ext.grid.CheckboxSelectionModel();
		var a = new Ext.grid.ColumnModel({
			columns : [ b, new Ext.grid.RowNumberer(), {
				header : "realExecutionId",
				dataIndex : "realExecutionId",
				hidden : true
			}, {
				header : "预算",
				dataIndex : "budget"
			},  {
				header : "所属部门",
				dataIndex : "belongDept"
			}, {
				header : "成本要素",
				dataIndex : "budgetItem"
			}, {
				header : "金额",
				dataIndex : "realValue"
			}, {
				header : "月份",
				dataIndex : "month"
			}, {
				header : "输入日期",
				dataIndex : "inputDate"
			}, {
				header : "备注",
				dataIndex : "remark"
			}, this.rowActions ],
			defaults : {
				sortable : true,
				menuDisabled : false,
				width : 100
			}
		});
		this.topbar = new Ext.Toolbar({
			height : 30,
			bodyStyle : "text-align:left",
			items : [ {
				iconCls : "btn-add",
				text : "添加",
				xtype : "button",
				handler : this.createRecord
			}, {
				iconCls : "btn-del",
				text : "删除",
				xtype : "button",
				handler : this.delRecords,
				scope : this
			} ]
		});
		this.gridPanel = new Ext.grid.GridPanel({
			id : "RealExecutionGrid",
			region : "center",
			stripeRows : true,
			tbar : this.topbar,
			store : this.store,
			trackMouseOver : true,
			disableSelection : false,
			loadMask : true,
			autoHeight : true,
			cm : a,
			sm : b,
			plugins : this.rowActions,
			viewConfig : {
				forceFit : true,
				autoFill : true,
				forceFit : true
			},
			bbar : new Ext.PagingToolbar({
				pageSize : 25,
				store : this.store,
				displayInfo : true,
				displayMsg : "当前页记录索引{0}-{1}， 共{2}条记录",
				emptyMsg : "当前没有记录"
			})
		});
		this.gridPanel.addListener("rowdblclick", function(d, c, f) {
			d.getSelectionModel().each(function(e) {
				new RealExecutionForm(e.data.realExecutionId).show();
			});
		});
		this.rowActions.on("action", this.onRowAction, this);
	},
	search : function(a) {
		if (a.searchPanel.getForm().isValid()) {
			a.searchPanel.getForm().submit({
				waitMsg : "正在提交查询",
				url : __ctxPath + "/budget/listRealExecution.do?Q_deleteFlag_N_EQ=0",
				success : function(c, d) {
					var b = Ext.util.JSON.decode(d.response.responseText);
					a.gridPanel.getStore().loadData(b);
				}
			});
		}
	},
	createRecord : function() {
		new RealExecutionForm().show();
	},
	delByIds : function(a) {
		Ext.Msg.confirm("信息确认", "您确认要删除所选记录吗？", function(b) {
			if (b == "yes") {
				Ext.Ajax.request({
					url : __ctxPath + "/budget/multiDelRealExecution.do",
					params : {
						ids : a
					},
					method : "POST",
					success : function(c, d) {
						Ext.ux.Toast.msg("操作信息", "成功删除该记录！");
						Ext.getCmp("RealExecutionGrid").getStore().reload();
					},
					failure : function(c, d) {
						Ext.ux.Toast.msg("操作信息", "操作出错，请联系管理员！");
					}
				});
			}
		});
	},
	delRecords : function() {
		var c = Ext.getCmp("RealExecutionGrid");
		var a = c.getSelectionModel().getSelections();
		if (a.length == 0) {
			Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
			return;
		}
		var d = Array();
		for ( var b = 0; b < a.length; b++) {
			d.push(a[b].data.realExecutionId);
		}
		this.delByIds(d);
	},
	editRecord : function(a) {
		new RealExecutionForm({
			realExecutionId : a.data.realExecutionId
		}).show();
	},
	onRowAction : function(c, a, d, e, b) {
		switch (d) {
		case "btn-del":
			this.delByIds(a.data.realExecutionId);
			break;
		case "btn-edit":
			this.editRecord(a);
			break;
		default:
			break;
		}
	}
});