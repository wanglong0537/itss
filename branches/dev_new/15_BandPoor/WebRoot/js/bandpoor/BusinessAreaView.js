BusinessAreaView = Ext.extend(Ext.Panel, {
	constructor : function(a) {
		if(a == null) {
			a = {};
		}
		Ext.apply(this, a);
		this.initComponents();
		BusinessAreaView.superclass.constructor.call(this, {
			id : "BusinessAreaView",
			title : "商圈列表",
			region : "center",
			layout : "border",
			items : [
				this.searchPanel,
				this.gridPanel
			]
		});
	},
	searchPanel : null,
	gridPanel : null,
	store : null,
	topbar : null,
	initComponents : function() {
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
			items : [
				{
					text : "查询条件：名称"
				}, {
					fieldLabel : "名称",
					name : "Q_areaName_S_LK",
					xtype : "textfield"
				}, {
					xtype : "button",
					text : "查询",
					handler : this.search.createCallback(this)
				}
			]
		});
		this.store = new Ext.data.JsonStore({
			url : __ctxPath + "/bandpoor/listBusinessArea.do?Q_flag_N_EQ=1",
			totalProperty : "totalCounts",
			id : "id",
			root : "result",
			remoteSort : true,
			fields : [
				{
					name : "id",
					type : "int"
				},
				"areaName",
				"areaDesc",
				"flag"
			]
		});
		this.store.setDefaultSort("id", "desc");
		this.store.load({
			params : {
				start : 0,
				limit : 25
			}
		});
		var b = new Array();
		b.push({
			iconCls : "btn-edit",
			qtip : "编辑",
			style : "margin:0 3px 0 3px"
		});
		b.push({
			iconCls : "btn-del",
			qtip : "删除",
			style : "margin:0 3px 0 3px"
		});
		this.rowActions = new Ext.ux.grid.RowActions({
			header : "管理",
			width : 80,
			actions : b
		});
		var c = new Ext.grid.CheckboxSelectionModel();
		var a = new Ext.grid.ColumnModel({
			columns : [
				c,
				new Ext.grid.RowNumberer(),
				{
					header : "id",
					dataIndex : "id",
					hidden : true
				}, {
					header : "商圈名称",
					dataIndex : "areaName"
				}, {
					header : "商圈描述",
					dataIndex : "areaDesc"
				}, {
					header : "状态",
					dataIndex : "flag",
					hidden : true
				},
				this.rowActions
			],
			defaults : {
				sortable : true,
				menuDisable : false,
				width : 100
			}
		});
		this.topbar = new Ext.Toolbar({
			height : 30,
			bodyStyle : "text-align:left",
			items : []
		});
		this.topbar.add(new Ext.Button({
			iconCls : "btn-add",
			text : "添加商圈",
			handler : this.addBusinessArea
		}));
		this.topbar.add(new Ext.Button({
			iconCls : "btn-del",
			text : "删除商圈",
			handler : this.delBusinessArea
		}));
		this.topbar.add(new Ext.Button({
			text : "批量导入商圈",
			handler : this.uploadBusinessArea
		}));
		this.topbar.add(new Ext.Button({
			text : "下载商圈数据模板excel文件",
			handler : function() {
				window.open(__ctxPath + "/userfiles/dataTemplate/businessAreaTemplate.xls");
			}
		}));
		this.gridPanel = new Ext.grid.GridPanel({
			id : "BusinessAreaGrid",
			region : "center",
			autoWidth : true,
			autoHeight : true,
			stripeRows : true,
			tbar : this.topbar,
			closeable : true,
			store : this.store,
			trackMouseOver : true,
			disableSelection : false,
			loadMask : true,
			cm : a,
			sm : c,
			plugins : this.rowActions,
			viewConfig : {
				forceFit : true,
				enableRowBody : false,
				showPreview : false
			},
			bbar : new Ext.PagingToolbar({
				pageSize : 25,
				store : this.store,
				displayInfo : true,
				displayMsg : "当前显示{0}至{1}，共{2}条记录",
				emptyMsg : "当前没有记录"
			})
		});
		this.gridPanel.addListener("rowdblclick", function(f, d, g) {
			f.getSelectionModel().each(function(e) {
				new BusinessAreaForm({
					businessAreaId : e.data.id
				}).show();
			});
		});
		this.rowActions.on("action", this.onRowAction, this);
	},
	search : function(a) {
		if(a.searchPanel.getForm().isValid()) {
			a.searchPanel.getForm().submit({
				waitMsg : "正在提交查询……",
				url : __ctxPath + "/bandpoor/listBusinessArea.do?Q_flag_N_EQ=1",
				success : function(c, d) {
					var e = Ext.util.JSON.decode(d.response.responseText);
					a.gridPanel.getStore().loadData(e);
				}
			});
		}
	},
	addBusinessArea : function() {
		new BusinessAreaForm().show();
	},
	delBusinessArea : function() {
		var e = Ext.getCmp("BusinessAreaGrid");
		var c = e.getSelectionModel().getSelections();
		if(c.length == 0) {
			Ext.ux.Toast.msg("提示信息", "请选择要删除的记录！");
			return ;
		}
		var f = Array();
		for(var d = 0; d < c.length; d++) {
			f.push(c[d].data.id);
		}
		BusinessAreaView.remove(f);
	},
	editBusinessArea : function(a) {
		new BusinessAreaForm({
			businessAreaId : a.data.id
		}).show();
	},
	uploadBusinessArea : function() {
		var a = App.createUploadDialog({
			file_cat : "uploadData",
			callback : function (c) {
				for (var b = 0; b < c.length; b++) {
					Ext.Ajax.request({
						url : __ctxPath + "/bandpoor/uploadBusinessArea.do",
						params : {
							filePath : c[b].filepath
						},
						success : function(d) {
							var e = Ext.util.JSON.decode(d.responseText);
							if(e.flag == "0") {
								Ext.MessageBox.show({
									title : "操作信息",
									msg : e.msg,
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
								return ;
							}
							Ext.MessageBox.show({
								title : "操作信息",
								msg : "数据导入成功！",
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.INFO
							});
							Ext.getCmp("BusinessAreaView").gridPanel.store.reload({
								params : {
									start : 0,
									limit : 25
								}
							});
						}
					});
				}
			}
		});
		a.show();
	},
	onRowAction : function(c, a, d, e, b) {
		switch(d) {
			case "btn-del":
				this.delBusinessArea();
				break ;
			case "btn-edit":
				this.editBusinessArea(a);
				break ;
			default:
				break ;
		}
	}
});
BusinessAreaView.remove = function(b) {
	var a = Ext.getCmp("BusinessAreaGrid");
	Ext.Msg.confirm("信息确认", "您确认要删除所选记录吗？", function(c) {
		if(c == "yes") {
			Ext.Ajax.request({
				url : __ctxPath + "/bandpoor/multiDelBusinessArea.do",
				params : {
					ids : b
				},
				method : "post",
				success : function(d) {
					var e = Ext.util.JSON.decode(d.responseText);
					Ext.ux.Toast.msg("提示信息", "成功删除所选记录！");
					a.getStore().reload({
						params : {
							start : 0,
							limit : 25
						}
					});
				},
				failure : function() {
					Ext.MessageBox.show({
						title : "操作信息",
						msg : "删除失败，请联系管理员！",
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
				}
			});
		}
	});
}
