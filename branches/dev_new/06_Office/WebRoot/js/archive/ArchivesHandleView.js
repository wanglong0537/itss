ArchivesHandleView = Ext.extend(Ext.Panel, {
	searchPanel : null,
	gridPanel : null,
	store : null,
	topbar : null,
	constructor : function(a) {
		Ext.applyIf(this, a);
		this.initUIComponents();
		ArchivesHandleView.superclass.constructor.call(this, {
			id : "ArchivesHandleView",
			title : "收文归档列表",
			iconCls : "menu-arch-handler",
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
				text : "发文机关或部门"
			}, {
				name : "Q_archives.issueDep_S_LK",
				xtype : "textfield",
				anchor : "100%"
			}, {
				text : "公文标题"
			}, {
				name : "Q_archives.subject_S_LK",
				xtype : "textfield",
				anchor : "100%"
			}, {
				xtype : "button",
				text : "查询",
				iconCls : "search",
				handler : this.search.createCallback(this)
			} ]
		});
		this.store = new Ext.data.JsonStore({
			url : __ctxPath + "/archive/listArchivesHandle.do",
			root : "result",
			totalProperty : "totalCounts",
			remoteSort : true,
			fields : [ {
				name : "handleId",
				type : "int"
			}, "archives" ,
			"filedDeptName",
			"recFiledTypeName"]
		});
		this.store.setDefaultSort("handleId", "desc");
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
				iconCls : "btn-readdocument",
				qtip : "查看",
				style : "margin:0 3px 0 3px"
			} ]
		});
		var b = new Ext.grid.CheckboxSelectionModel();
		var a = new Ext.grid.ColumnModel({
			columns : [ b, new Ext.grid.RowNumberer(), {
				header : "handleId",
				dataIndex : "handleId",
				hidden : true
			}, {
				header : "文件标题",
				dataIndex : "archives",
				renderer : function(c) {
					if (c != null) {
						return c.subject;
					}
				}
			}, {
				header : "来文字号",
				dataIndex : "archives",
				renderer : function(c) {
					if (c != null) {
						return c.archivesNo;
					}
				}
			}, {
				header : "来文机关或部门",
				dataIndex : "archives",
				renderer : function(c) {
					if (c != null) {
						return c.issueDep;
					}
				}
			}, {
				header : "归档部门",
				dataIndex : "filedDeptName"
			}, {
				header : "归档类型",
				dataIndex : "recFiledTypeName"
			}, {
				header : "发布日期",
				dataIndex : "archives",
				renderer : function(c) {
					if (c != null && c != "") {
						return c.issueDate.substring(0, 10);
					}
				}
			}, this.rowActions ],
			defaults : {
				sortable : true,
				menuDisabled : false,
				width : 100
			}
		});
		this.gridPanel = new Ext.grid.GridPanel({
			id : "ArchivesHandleGrid",
			region : "center",
			stripeRows : true,
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
		this.rowActions.on("action", this.onRowAction, this);
	},
	search : function(a) {
		if (a.searchPanel.getForm().isValid()) {
			a.searchPanel.getForm().submit({
				waitMsg : "正在提交查询",
				url : __ctxPath + "/archive/listArchivesHandle.do",
				success : function(c, d) {
					var b = Ext.util.JSON.decode(d.response.responseText);
					a.gridPanel.getStore().loadData(b);
				}
			});
		}
	},
	createRecord : function() {
		new ArchivesHandleForm().show();
	},
	delByIds : function(a) {
		Ext.Msg.confirm("信息确认", "您确认要删除所选记录吗？", function(b) {
			if (b == "yes") {
				Ext.Ajax.request({
					url : __ctxPath + "/archive/multiDelArchivesHandle.do",
					params : {
						ids : a
					},
					method : "POST",
					success : function(c, d) {
						Ext.ux.Toast.msg("操作信息", "成功删除该[ArchivesHandle]！");
						Ext.getCmp("ArchivesHandleGrid").getStore().reload();
					},
					failure : function(c, d) {
						Ext.ux.Toast.msg("操作信息", "操作出错，请联系管理员！");
					}
				});
			}
		});
	},
	delRecords : function() {
		var c = Ext.getCmp("ArchivesHandleGrid");
		var a = c.getSelectionModel().getSelections();
		if (a.length == 0) {
			Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
			return;
		}
		var d = Array();
		for ( var b = 0; b < a.length; b++) {
			d.push(a[b].data.handleId);
		}
		this.delByIds(d);
	},
	editRecord : function(a) {
		new ArchivesHandleForm({
			handleId : a.data.handleId
		}).show();
	},
	onRowAction : function(c, a, d, e, b) {
		switch (d) {
		case "btn-readdocument":
			this.editRecord(a);
			break;
		default:
			break;
		}
	}
});