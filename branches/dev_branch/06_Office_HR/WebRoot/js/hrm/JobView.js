JobView = Ext.extend(Ext.Panel, {
	constructor : function(a) {
		if (a == null) {
			a = {};
		}
		Ext.apply(this, a);
		this.initComponents();
		JobView.superclass.constructor.call(this, {
			id : "JobView",
			iconCls : "menu-job",
			title : "岗位管理",
			region : "center",
			layout : "border",
			//items : [ this.searchPanel, this.gridPanel ]
			items : [ this.deptPanel, this.gridPanel ]
		});
	},
	typeId : null,
	searchPanel : null,
	gridPanel : null,
	store : null,
	topbar : null,
	initComponents : function() {
		
		//add by awen for add department on 2011-10-11 begin

		this.deptPanel = new Ext.tree.TreePanel({
			region : "west",
			id : "jobTreePanel",
			title : "部门信息显示",
			collapsible : true,
			split : true,
			height : 800,
			width : 180,
			tbar : new Ext.Toolbar({
				items : [ {
					xtype : "button",
					iconCls : "btn-refresh",
					text : "刷新",
					handler : function() {
						this.deptPanel.root.reload();
					},
					scope : this
				}, {
					xtype : "button",
					text : "展开",
					iconCls : "btn-expand",
					handler : function() {
						this.deptPanel.expandAll();
					},
					scope : this
				}, {
					xtype : "button",
					text : "收起",
					iconCls : "btn-collapse",
					handler : function() {
						this.deptPanel.collapseAll();
					},
					scope : this
				} ]
			}),
			loader : new Ext.tree.TreeLoader({
				url : __ctxPath + "/system/listDepartment.do"
			}),
			root : new Ext.tree.AsyncTreeNode({
				expanded : true
			}),
			rootVisible : false,
			listeners : {
				"click" : JobView.clickNode
			}
		});
		
		//add by awen for add department on 2011-10-11 end
		
		this.searchPanel = new Ext.FormPanel({
			region : "north",
			height : 40,
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
				text : "查询条件：岗位名称"
			}, {
				fieldLabel : "岗位名称：",
				name : "Q_jobName_S_LK",
				xtype : "textfield"
			}, {
				text : "所属部门："
			}, {
				name : "Q_department.depName_S_LK",
				xtype : "textfield"
			}, {
				text : "备注："
			}, {
				name : "Q_memo_S_LK",
				xtype : "textfield"
			}, {
				xtype : "button",
				text : "查询",
				iconCls : "search",
				handler : this.search.createCallback(this)
			}, {
				name : "Q_delFlag_SN_EQ",
				width : 80,
				xtype : "hidden",
				value : 0
			} ]
		});
		this.store = new Ext.data.JsonStore({
			url : __ctxPath + "/hrm/listJob.do",
			baseParams : {
				"Q_delFlag_SN_EQ" : 0
			},
			root : "result",
			totalProperty : "totalCounts",
			remoteSort : true,
			fields : [ {
				name : "jobId",
				type : "int"
			}, "jobName", "department", "memo" ]
		});
		this.store.setDefaultSort("jobId", "desc");
		this.store.load({
			params : {
				start : 0,
				limit : 25
			}
		});
		var b = new Array();
		if (isGranted("_JobDel")) {
			b.push({
				iconCls : "btn-del",
				qtip : "删除",
				style : "margin:0 3px 0 3px"
			});
		}
		if (isGranted("_JobEdit")) {
			b.push({
				iconCls : "btn-edit",
				qtip : "编辑",
				style : "margin:0 3px 0 3px"
			});
		}
		this.rowActions = new Ext.ux.grid.RowActions({
			header : "管理",
			width : 80,
			actions : b
		});
		var c = new Ext.grid.CheckboxSelectionModel();
		var a = new Ext.grid.ColumnModel({
			columns : [ c, new Ext.grid.RowNumberer(), {
				header : "jobId",
				dataIndex : "jobId",
				hidden : true
			}, {
				header : "岗位名称",
				dataIndex : "jobName"
			}, {
				header : "所属部门",
				dataIndex : "department",
				renderer : function(d) {
					return d.depName;
				}
			}, {
				header : "备注",
				dataIndex : "memo"
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
			items : []
		});
		if (isGranted("_JobAdd")) {
			this.topbar.add(new Ext.Button({
				iconCls : "btn-add",
				text : "添加岗位",
				handler : this.createRecord
			}));
		}
		if (isGranted("_JobDel")) {
			this.topbar.add(new Ext.Button({
				iconCls : "btn-del",
				text : "删除岗位",
				handler : this.delRecords,
				scope : this
			}));
		}
		if (isGranted("_JobRec")) {
			this.topbar.add(new Ext.Button({
				iconCls : "btn-empProfile-recovery",
				text : "恢复岗位",
				handler : this.recovery
			}));
		}
		this.gridPanel = new Ext.grid.GridPanel({
			id : "JobGrid",
			region : "center",
			stripeRows : true,
			tbar : this.topbar,
			store : this.store,
			trackMouseOver : true,
			disableSelection : false,
			loadMask : true,
			autoHeight : true,
			cm : a,
			sm : c,
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
		this.gridPanel.addListener("rowdblclick", function(f, d, g) {
			f.getSelectionModel().each(function(e) {
				if (isGranted("_JobEdit")) {
					new JobForm({
						jobId : e.data.jobId
					}).show();
				}
			});
		});
		this.rowActions.on("action", this.onRowAction, this);
	},
	search : function(a) {
		if (a.searchPanel.getForm().isValid()) {
			a.searchPanel.getForm().submit({
				waitMsg : "正在提交查询",
				url : __ctxPath + "/hrm/listJob.do",
				success : function(c, d) {
					var b = Ext.util.JSON.decode(d.response.responseText);
					a.gridPanel.getStore().loadData(b);
				}
			});
		}
	},
	createRecord : function() {
		new JobForm().show();
	},
	delByIds : function(a) {
		Ext.Msg.confirm("信息确认", "您确认要删除所选记录吗？", function(b) {
			if (b == "yes") {
				Ext.Ajax.request({
					url : __ctxPath + "/hrm/multiDelJob.do",
					params : {
						ids : a
					},
					method : "POST",
					success : function(c, d) {
						Ext.ux.Toast.msg("操作信息", "成功删除信息！");
						Ext.getCmp("JobGrid").getStore().reload();
					},
					failure : function(c, d) {
						Ext.ux.Toast.msg("操作信息", "操作出错，请联系管理员！");
					}
				});
			}
		});
	},
	delRecords : function(b) {
		var d = Ext.getCmp("JobGrid");
		var a = d.getSelectionModel().getSelections();
		if (a.length == 0) {
			Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
			return;
		}
		var e = Array();
		for ( var c = 0; c < a.length; c++) {
			e.push(a[c].data.jobId);
		}
		this.delByIds(e);
	},
	editRecord : function(a) {
		new JobForm({
			jobId : a.data.jobId
		}).show();
	},
	recovery : function(a) {
		new RecoveryJobWin().show();
	},
	onRowAction : function(c, a, d, e, b) {
		switch (d) {
		case "btn-del":
			this.delRecords();
			break;
		case "btn-edit":
			this.editRecord(a);
			break;
		default:
			break;
		}
	}
});

JobView.clickNode = function(b) {
	if (b != null) {
		var c = Ext.getCmp("JobView");
		//var a = c.getStore();
		var a = c.store;
		a.url = __ctxPath + "/hrm/listJob.do";
		if(b.id!="0"){
			a.baseParams = {
					'Q_department.depId_L_EQ' : b.id
			};
		}else{
			a.baseParams = {
			};
		}	
		a.params = {
			start : 0,
			limit : 25
		};
		a.reload({
			params : {
				start : 0,
				limit : 25
			}
		});
	}
};