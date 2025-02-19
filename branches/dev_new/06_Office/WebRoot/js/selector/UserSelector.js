var UserSelector = {
	getView : function(e, c, d) {
		var a = this.initPanel(c);
		var b = new Ext.Window({
			title : "选择用户",
			iconCls : "menu-appuser",
			width : 640,
			height : 480,
			layout : "fit",
			border : false,
			items : [ a ],
			resizable : false,
			modal : true,
			buttonAlign : "center",
			buttons : [ {
				text : "确认",
				iconCls : "btn-ok",
				scope : "true",
				handler : function() {
					var l = "";
					var j = "";
					if (c) {
						var h = Ext.getCmp("contactGrid");
						var k = h.getSelectionModel().getSelections();
						for ( var g = 0; g < k.length; g++) {
							if (g > 0) {
								l += ",";
								j += ",";
							}
							l += k[g].data.userId;
							j += k[g].data.fullname;
						}
					} else {
						var f = Ext.getCmp("selectedUserGrid").getStore();
						for ( var g = 0; g < f.getCount(); g++) {
							if (g > 0) {
								l += ",";
								j += ",";
							}
							l += f.getAt(g).data.userId;
							j += f.getAt(g).data.fullname;
						}
					}
					if (e != null) {
						e.call(this, l, j);
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
		if (d) {
			b.addButton(new Ext.Button({
				text : "发起人",
				iconCls : "menu-subuser",
				handler : function() {
					e.call(this, "__start", "[发起人]");
					b.close();
				}
			}));
			b.addButton(new Ext.Button({
				text : "上级",
				iconCls : "btn-super",
				handler : function() {
					e.call(this, "__super", "[上级]");
					b.close();
				}
			}));
		}
		return b;
	},
	initPanel : function(e) {
		var i = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
				url : __ctxPath + "/system/selectAppUser.do"
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
		i.setDefaultSort("id", "desc");
		i.load({
			params : {
				start : 0,
				limit : 12
			}
		});
		var c = null;
		if (e) {
			c = new Ext.grid.CheckboxSelectionModel({
				singleSelect : true
			});
		} else {
			c = new Ext.grid.CheckboxSelectionModel();
		}
		var j = new Ext.grid.ColumnModel(
				{
					columns : [
							c,
							new Ext.grid.RowNumberer(),
							{
								header : "用户名",
								dataIndex : "fullname",
								renderer : function(o, p, n) {
									var q = n.data.title;
									if (q == 1) {
										return '<img src="'
												+ __ctxPath
												+ '/images/flag/man.png"/>&nbsp;'
												+ o;
									} else {
										return '<img src="'
												+ __ctxPath
												+ '/images/flag/women.png"/>&nbsp;'
												+ o;
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
						hiddenchange : function(n, o, p) {
							saveConfig(o, p);
						}
					}
				});
		var d = new Ext.tree.TreePanel({
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
		var l = new Ext.tree.TreePanel({
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
		var f = new Ext.Panel({
			id : "onlinePanel",
			iconCls : "online-user",
			title : "在线人员  ",
			listeners : {
				"expand" : this.clickOnlinePanel
			}
		});
		var k = new Ext.grid.GridPanel({
			title : "用户列表",
			id : "contactGrid",
			region : "center",
			height : 370,
			autoWidth : false,
			store : i,
			shim : true,
			trackMouseOver : true,
			disableSelection : false,
			loadMask : true,
			cm : j,
			sm : c,
			viewConfig : {
				forceFit : true,
				enableRowBody : false,
				showPreview : false
			},
			bbar : new Ext.PagingToolbar({
				pageSize : 12,
				store : i,
				displayInfo : true,
				displayMsg : "当前显示从{0}至{1}， 共{2}条记录",
				emptyMsg : "当前没有记录"
			})
		});
		var b = new Ext.FormPanel(
				{
					height : 34,
					region : "north",
					layout : "hbox",
					bodyStyle : "padding:6px 2px 2px 2px",
					layoutConfigs : {
						align : "middle",
						padding : "8"
					},
					defaultType : "label",
					defaults : {
						margins : "0 4 0 4"
					},
					items : [
							{
								text : "用户姓名"
							},
							{
								xtype : "textfield",
								name : "Q_fullname_S_LK",
								width : 260
							},
							{
								xtype : "button",
								text : "查询",
								iconCls : "btn-search",
								handler : function() {
									b
											.getForm()
											.submit(
													{
														url : __ctxPath
																+ "/system/listAppUser.do",
														method : "post",
														success : function(o, p) {
															k.getStore().proxy.conn.url = __ctxPath
																	+ "/system/listAppUser.do";
															var n = Ext.util.JSON
																	.decode(p.response.responseText);
															k
																	.getStore()
																	.loadData(n);
														}
													});
								}
							} ]
				});
		var h = new Ext.grid.CheckboxSelectionModel();
		var a = new Ext.grid.GridPanel({
			id : "selectedUserGrid",
			title : "已选用户",
			height : 382,
			autoScroll : true,
			store : new Ext.data.ArrayStore({
				fields : [ "userId", "fullname" ]
			}),
			trackMouseOver : true,
			sm : h,
			columns : [ h, new Ext.grid.RowNumberer(), {
				header : "用户名",
				dataIndex : "fullname"
			} ]
		});
		var m = new Ext.Panel({
			width : 200,
			region : "east",
			layout : "column",
			border : false,
			items : [ new Ext.Panel({
				frame : true,
				width : 35,
				height : 430,
				layout : {
					type : "vbox",
					pack : "center",
					align : "stretch"
				},
				defaults : {
					margins : "0 0 5 0"
				},
				items : [ {
					xtype : "button",
					text : "&gt;&gt;",
					handler : function() {
						var t = Ext.getCmp("contactGrid");
						var n = Ext.getCmp("selectedUserGrid");
						var u = n.getStore();
						var x = t.getSelectionModel().getSelections();
						for ( var p = 0; p < x.length; p++) {
							var q = x[p].data.userId;
							var v = x[p].data.fullname;
							var s = false;
							for ( var o = 0; o < u.getCount(); o++) {
								if (u.getAt(o).data.userId == q) {
									s = true;
									break;
								}
							}
							if (!s) {
								var w = {
									userId : q,
									fullname : v
								};
								var r = new u.recordType(w);
								n.stopEditing();
								u.add(r);
							}
						}
					}
				}, {
					xtype : "button",
					text : "&lt&lt;",
					handler : function() {
						var p = Ext.getCmp("selectedUserGrid");
						var q = p.getSelectionModel().getSelections();
						var n = p.getStore();
						for ( var o = 0; o < q.length; o++) {
							p.stopEditing();
							n.remove(q[o]);
						}
					}
				} ]
			}), a ]
		});
		var g = new Ext.Panel({
			id : "contactPanel",
			width : 540,
			height : 410,
			layout : "border",
			border : false,
			items : [ b, {
				region : "west",
				split : true,
				header : false,
				collapsible : true,
				width : 140,
				layout : "accordion",
				items : [ d, l, f ]
			}, k ]
		});
		if (!e) {
			g.add(m);
		}
		return g;
	},
	clickNode : function(b) {
		if (b != null) {
			var c = Ext.getCmp("contactGrid");
			var a = c.getStore();
			a.proxy.conn.url = __ctxPath + "/system/selectAppUser.do";
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
			var c = Ext.getCmp("contactGrid");
			var a = c.getStore();
			a.baseParams = {
				roleId : b.id
			};
			a.proxy.conn.url = __ctxPath + "/system/findAppUser.do";
			a.load({
				params : {
					start : 0,
					limit : 12
				}
			});
		}
	},
	clickOnlinePanel : function() {
		var b = Ext.getCmp("contactGrid");
		var a = b.getStore();
		a.proxy.conn.url = __ctxPath + "/system/onlineAppUser.do";
		a.load({
			params : {
				start : 0,
				limit : 200
			}
		});
	}
};