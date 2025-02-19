AppShoppingGuideView = Ext.extend(Ext.Panel, {
	constructor : function(a) {
		Ext.applyIf(this, a);
		this.initUIComponents();
		AppShoppingGuideView.superclass.constructor.call(this, {
			id : "AppShoppingGuideView",
			title : "导购信息",
			iconCls : "menu-appuser",
			autoScroll : true
		});
	},
	initUIComponents : function() {
		this.initSearchPanel();
		this.initGridPanel();
		this.items = [ this.searchPanel, this.gridPanel ];
	},
	onSearch : function(c) {
		var a = Ext.getCmp("AppShoppingGuideSearchForm");
		var b = Ext.getCmp("AppShoppingGuideGrid");
		if (a.getForm().isValid()) {
			a.getForm().submit({
				waitMsg : "正在提交查询",
				url : __ctxPath + "/system/listAppUser.do?defaultRroles=" + __appShopingGuidRoles,
				success : function(e, f) {
					var d = Ext.util.JSON.decode(f.response.responseText);
					b.getStore().loadData(d);
				}
			});
		}
	}
});
AppShoppingGuideView.prototype.initSearchPanel = function() {
	this.searchPanel = new Ext.FormPanel({
		height : 35,
		frame : false,
		border : false,
		id : "AppShoppingGuideSearchForm",
		layout : "hbox",
		layoutConfig : {
			padding : "5",
			align : "middle"
		},
		defaults : {
			xtype : "label",
			border : false,
			margins : {
				top : 0,
				right : 4,
				bottom : 4,
				left : 4
			}
		},
		items : [ {
			text : "用户账号"
		}, {
			xtype : "textfield",
			name : "Q_username_S_LK"
		}, {
			text : "用户姓名"
		}, {
			xtype : "textfield",
			name : "Q_fullname_S_LK"
		}, {
			text : "入店时间:从"
		}, {
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_accessionTime_D_GT"
		}, {
			text : "至"
		}, {
			xtype : "datefield",
			format : "Y-m-d",
			name : "Q_accessionTime_D_LT"
		}, {
			xtype : "button",
			text : "查询",
			iconCls : "search",
			scope : this,
			handler : this.onSearch.createCallback(this)
		} ]
	});
};
AppShoppingGuideView.prototype.initGridPanel = function() {
	this.toolbar = new Ext.Toolbar({
		height : 30,
		items : []
	});
	if (isGranted("_AppShoppingGuideAdd")) {
		this.toolbar.add(new Ext.Button({
			text : "添加导购",
			iconCls : "add-user",
			handler : function() {
				var f = Ext.getCmp("centerTabPanel");
				var g = Ext.getCmp("AppShoppingGuideForm");
				if (g == null) {
					g = new AppShoppingGuideForm("增加导购");
					f.add(g);
				} else {
					f.remove(g);
					g = new AppShoppingGuideForm("增加导购");
					f.add(g);
				}
				f.activate(g);
			}
		}));
	}
	if (isGranted("_AppShoppingGuideDel")) {
		this.toolbar.add(new Ext.Button({
			iconCls : "btn-del",
			text : "删除导购",
			handler : function() {
				var h = Ext.getCmp("AppShoppingGuideGrid");
				var f = h.getSelectionModel().getSelections();
				if (f.length == 0) {
					Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
					return;
				}
				var j = Array();
				var k = "";
				for ( var g = 0; g < f.length; g++) {
					if (f[g].data.userId != 1) {
						j.push(f[g].data.userId);
					} else {
						k += f[g].data.fullname + ",";
					}
				}
				if (k == "") {
					AppShoppingGuideView.remove(j);
				} else {
					Ext.ux.Toast.msg("信息", k + "不能被删除！");
				}
			}
		}));
	}
	var b = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : __ctxPath + "/system/listAppUser.do"
		}),
		reader : new Ext.data.JsonReader({
			root : "result",
			totalProperty : "totalCounts",
			fields : [ {
				name : "userId",
				type : "int"
			}, "username", "password", "fullname", "address", "email",
					"department", "title", "position", {
						name : "accessionTime"
					}, {
						name : "status",
						type : "int"
					} ]
		}),
		remoteSort : true
	});
	b.setDefaultSort("userId", "desc");
	b.load({
		params : {
			start : 0,
			limit : 25
		}
	});
	var e = new Ext.grid.CheckboxSelectionModel();
	var a = new Ext.grid.ColumnModel(
			{
				columns : [
						e,
						new Ext.grid.RowNumberer(),
						{
							header : "userId",
							dataIndex : "userId",
							hidden : true
						},
						{
							header : "状态",
							dataIndex : "status",
							width : 30,
							renderer : function(f) {
								var g = "";
								if (f == "1") {
									g += '<img title="激活" src="'
											+ __ctxPath
											+ '/images/flag/customer/effective.png"/>';
								} else {
									g += '<img title="禁用" src="'
											+ __ctxPath
											+ '/images/flag/customer/invalid.png"/>';
								}
								return g;
							}
						},
						{
							header : "账号",
							dataIndex : "username",
							width : 60
						},
						{
							header : "地址",
							dataIndex : "address",
							hidden : true,
							exprint : true
						},
						{
							header : "用户名",
							dataIndex : "fullname",
							width : 60
						},
						{
							header : "邮箱",
							dataIndex : "email",
							width : 120
						},
						{
							header : "所属部门（或门店）",
							dataIndex : "department",
							renderer : function(f) {
								if (f == null) {
									return "";
								} else {
									return f.depName;
								}
							},
							width : 60
						},
						{
							header : "所在职位（或岗位）",
							dataIndex : "position",
							width : 60
						},
						{
							header : "入店时间",
							dataIndex : "accessionTime",
							width : 100
						},
						{
							header : "管理",
							dataIndex : "userId",
							sortable : false,
							width : 60,
							renderer : function(j, i, g, m, h) {
								var l = g.data.userId;
								var f = g.data.username;
								var k = "";
								if (l != 1) {
									if (isGranted("_AppShoppingGuideDel")) {
										k += '<button title="删除" value=" " class="btn-del" onclick="AppShoppingGuideView.remove('
												+ l + ')"></button>';
									}
									if (isGranted("_AppShoppingGuideEdit")) {
										k += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="AppShoppingGuideView.edit('
												+ l
												+ ",'"
												+ f
												+ "')\"></button>";
									}
								}
								return k;
							}
						} ],
				defaults : {
					sortable : true,
					menuDisabled : true,
					width : 100
				}
			});
	this.gridPanel = new Ext.grid.GridPanel({
		id : "AppShoppingGuideGrid",
		tbar : this.toolbar,
		store : b,
		autoHeight : true,
		shim : true,
		trackMouseOver : true,
		disableSelection : false,
		loadMask : true,
		cm : a,
		sm : e,
		viewConfig : {
			forceFit : true,
			enableRowBody : false,
			showPreview : false
		},
		bbar : new Ext.PagingToolbar({
			pageSize : 25,
			store : b,
			displayInfo : true,
			displayMsg : "当前显示从{0}至{1}， 共{2}条记录",
			emptyMsg : "当前没有记录"
		})
	});
	this.gridPanel.addListener("rowdblclick", d);
	var c = this.gridPanel;
	function d(g, f, h) {
		g.getSelectionModel().each(function(j) {
			var i = j.data.userId;
			if (isGranted("_AppShoppingGuideEdit") && i != 1) {
				AppShoppingGuideView.edit(i, j.data.username);
			}
		});
	}
};
AppShoppingGuideView.remove = function(a) {
	Ext.Msg.confirm("删除操作", "你确定要删除该用户吗?", function(b) {
		if (b == "yes") {
			Ext.Ajax.request({
				url : __ctxPath + "/system/multiDelAppUser.do",
				method : "post",
				params : {
					ids : a
				},
				success : function(d) {
					var c = Ext.util.JSON.decode(d.responseText);
					if (c.msg == "") {
						Ext.ux.Toast.msg("操作信息", "用户删除成功");
					} else {
						Ext.ux.Toast.msg("操作信息", c.msg);
					}
					Ext.getCmp("AppShoppingGuideGrid").getStore().reload();
				},
				failure : function() {
					Ext.ux.Toast.msg("操作信息", "用户删除失败");
				}
			});
		}
	});
};
AppShoppingGuideView.edit = function(c, f) {
	var b = Ext.getCmp("centerTabPanel");
	var d = Ext.getCmp("AppShoppingGuideForm");
	if (d == null) {
		d = new AppShoppingGuideForm(f + "-详细信息", c);
		b.add(d);
	} else {
		b.remove("AppShoppingGuideForm");
		d = new AppShoppingGuideForm(f + "-详细信息", c);
		b.add(d);
	}
	b.activate(d);
	var e = Ext.getCmp("AppShoppingGuideMustInfo");
	e.remove("appUser.password");
	Ext.getCmp("appUser.username").getEl().dom.readOnly = true;
	e.doLayout(true);
	var a = Ext.getCmp("AppShoppingGuideFormToolbar");
	Ext.getCmp("resetPassword").show();
	a.doLayout(true);
	d.form.load({
		url : __ctxPath + "/system/getAppUser.do",
		params : {
			userId : c
		},
		method : "post",
		waitMsg : "正在载入数据...",
		success : function(k, m) {
			var h = Ext.getCmp("appUser.photo");
			var l = Ext.getCmp("displayUserPhoto");
			var j = Ext.getCmp("appUserTitle");
			if (h.value != "" && h.value != null && h.value != "undefined") {
				l.body.update('<img src="' + __ctxPath + "/attachFiles/"
						+ h.value + '" width="100%" height="100%"/>');
			} else {
				if (j.value == "0") {
					l.body.update('<img src="' + __ctxPath
							+ '/images/default_image_female.jpg" />');
				}
			}
			var g = Ext.util.JSON.decode(m.response.responseText).data[0];
			var i = getDateFromFormat(g.accessionTime, "yyyy-MM-dd HH:mm:ss");
			Ext.getCmp("appUser.accessionTime").setValue(new Date(i));
			var j = getDateFromFormat(g.departureTime, "yyyy-MM-dd HH:mm:ss");
			Ext.getCmp("appUser.departureTime").setValue(new Date(j));
			Ext.getCmp("appUser.depId").setValue(g.department.depId);
			Ext.getCmp("depTreeSelector").setValue(g.department.depName);
		},
		failure : function() {
			Ext.ux.Toast.msg("编辑", "载入失败");
		}
	});
};