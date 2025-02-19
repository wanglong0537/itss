var UserSubSelector = {
	getView : function(d, c) {
		var a = this.initPanel(c);
		var b = new Ext.Window({
			title : "选择下属",
			iconCls : "menu-subuser",
			width : 440,
			height : 420,
			layout : "fit",
			items : [ a ],
			modal : true,
			buttonAlign : "center",
			buttons : [ {
				text : "确认",
				iconCls : "btn-ok",
				scope : "true",
				handler : function() {
					var f = Ext.getCmp("SubGrid");
					var h = f.getSelectionModel().getSelections();
					var j = "";
					var g = "";
					for ( var e = 0; e < h.length; e++) {
						if (e > 0) {
							j += ",";
							g += ",";
						}
						j += h[e].data.userId;
						g += h[e].data.fullname;
					}
					if (d != null) {
						d.call(this, j, g);
					}
					b.close();
				}
			}, {
				text : "关闭",
				iconCls : "btn-cancel",
				handler : function() {
					b.close();
				}
			} ]
		});
		return b;
	},
	initPanel : function(c) {
		var g = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
				url : __ctxPath + "/system/subAdepartmentAppUser.do"
			}),
			reader : new Ext.data.JsonReader({
				root : "result",
				totalProperty : "totalCounts",
				id : "id",
				fields : [ {
					name : "userId",
					type : "int"
				}, "fullname", "title" ]
			}),
			remoteSort : true
		});
		g.setDefaultSort("id", "desc");
		g.load({
			params : {
				start : 0,
				limit : 12
			}
		});
		var a = null;
		if (c) {
			var a = new Ext.grid.CheckboxSelectionModel({
				singleSelect : true
			});
		} else {
			a = new Ext.grid.CheckboxSelectionModel();
		}
		var h = new Ext.grid.ColumnModel(
				{
					columns : [
							a,
							new Ext.grid.RowNumberer(),
							{
								header : "用户名",
								dataIndex : "fullname",
								renderer : function(k, l, j) {
									var m = j.data.title;
									if (m == 1) {
										return '<img src="'
												+ __ctxPath
												+ '/images/flag/man.png"/>&nbsp;'
												+ k;
									} else {
										return '<img src="'
												+ __ctxPath
												+ '/images/flag/women.png"/>&nbsp;'
												+ k;
									}
								},
								width : 60
							} ],
					defaults : {
						sortable : true,
						menuDisabled : true,
						width : 120
					},
					listeners : {
						hiddenchange : function(j, k, l) {
							saveConfig(k, l);
						}
					}
				});
		var b = new Ext.tree.TreePanel({
			id : "treePanels",
			title : "按部门分类 ",
			autoScroll:true,
			iconCls : "dep-user",
			loader : new Ext.tree.TreeLoader({
				url : __ctxPath + "/system/listDepartment.do"
			}),
			root : new Ext.tree.AsyncTreeNode({
				expanded : true
			}),
			rootVisible : false,
			listeners : {
				"click" : this.clickNode
			}
		});
		var i = new Ext.tree.TreePanel({
			id : "rolePanel",
			iconCls : "role-user",
			title : "按角色分类 ",
			autoScroll:true,
			loader : new Ext.tree.TreeLoader({
				url : __ctxPath + "/system/treeAppRole.do"
			}),
			root : new Ext.tree.AsyncTreeNode({
				expanded : true
			}),
			rootVisible : false,
			listeners : {
				"click" : this.clickRoleNode
			}
		});
		var d = new Ext.Panel({
			id : "onlinePanel",
			iconCls : "online-user",
			title : "在线人员  ",
			listeners : {
				"expand" : this.clickOnlinePanel
			}
		});
		var f = new Ext.grid.GridPanel({
			id : "SubGrid",
			height : 345,
			store : g,
			shim : true,
			trackMouseOver : true,
			disableSelection : false,
			loadMask : true,
			cm : h,
			sm : a,
			viewConfig : {
				forceFit : true,
				enableRowBody : false,
				showPreview : false
			},
			bbar : new Ext.PagingToolbar({
				pageSize : 12,
				store : g,
				displayInfo : true,
				displayMsg : "当前显示从{0}至{1}， 共{2}条记录",
				emptyMsg : "当前没有记录"
			})
		});
		var e = new Ext.Panel({
			id : "contactPanel",
			width : 400,
			height : 400,
			layout : "border",
			border : false,
			items : [ {
				region : "west",
				split : true,
				collapsible : true,
				header : false,
				width : 120,
				margins : "5 0 5 5",
				layout : "accordion",
				items : [ b, i, d ]
			}, {
				region : "center",
				margins : "5 0 5 5",
				width : 230,
				items : [ f ]
			} ]
		});
		return e;
	},
	clickNode : function(b) {
		if (b != null) {
			var c = Ext.getCmp("SubGrid");
			var a = c.getStore();
			a.proxy.conn.url = __ctxPath + "/system/subAdepartmentAppUser.do";
			a.baseParams = {
				depId : b.id
			};
			a.load({
				params : {
					start : 0,
					limit : 12
				}
			});
		}
	},
	clickRoleNode : function(b) {
		if (b != null) {
			var c = Ext.getCmp("SubGrid");
			var a = c.getStore();
			a.baseParams = {
				roleId : b.id
			};
			a.proxy.conn.url = __ctxPath + "/system/subAroleAppUser.do";
			a.load({
				params : {
					start : 0,
					limit : 12
				}
			});
		}
	},
	clickOnlinePanel : function() {
		var b = Ext.getCmp("SubGrid");
		var a = b.getStore();
		a.proxy.conn.url = __ctxPath + "/system/onlineAsubAppUser.do";
		a.load({
			params : {
				start : 0,
				limit : 200
			}
		});
	}
};