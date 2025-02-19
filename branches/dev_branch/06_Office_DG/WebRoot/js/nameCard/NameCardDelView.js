Ext.ns("NameCardDelView");
NameCardDelView = Ext
		.extend(
				Ext.Panel,
				{
					searchPanel : null,
					gridPanel : null,
					store : null,
					topbar : null,
					constructor : function(a) {
						Ext.applyIf(this, a);
						this.initUIComponents();
						NameCardDelView.superclass.constructor.call(this, {
							id : "NameCardDelView",
							title : "退胸卡列表",
							iconCls : "menu-card",
							region : "center",
							layout : "border",
							items : [ this.searchPanel, this.gridPanel ]
						});
					},
					initUIComponents : function() {
						this.searchPanel = new Ext.FormPanel(
								{
									height : 35,
									region : "north",
									frame : false,
									layoutConfig : {
										padding : "5",
										align : "middle"
									},
									id : "NameCardDelSearchForm",
									layout : "hbox",
									defaults : {
										xtype : "label",
										border : false,
										margins : {
											top : 2,
											right : 4,
											bottom : 2,
											left : 4
										}
									},
									items : [
											{
												text : "退胸卡名称"
											},
											{
												xtype : "textfield",
												name : "Q_roleName_S_LK"
											},
											{
												text : "退胸卡描述"
											},
											{
												xtype : "textfield",
												name : "Q_roleDesc_S_LK"
											},
											{
												xtype : "button",
												text : "查询",
												iconCls : "search",
												handler : function() {
													var c = Ext
															.getCmp("NameCardDelSearchForm");
													var d = Ext
															.getCmp("NameCardDelGrid");
													if (c.getForm().isValid()) {
														c
																.getForm()
																.submit(
																		{
																			waitMsg : "正在提交查询",
																			url : __ctxPath
																					+ "/nameCard/listNameCardDel.do",
																			success : function(
																					f,
																					g) {
																				var e = Ext.util.JSON
																						.decode(g.response.responseText);
																				d
																						.getStore()
																						.loadData(
																								e);
																			}
																		});
													}
												}
											} ]
								});
						this.store = new Ext.data.Store({
							proxy : new Ext.data.HttpProxy({
								url : __ctxPath
										+ "/nameCard/listNameCardDel.do"
							}),
							reader : new Ext.data.JsonReader({
								root : "result",
								totalProperty : "totalCounts",
								id : "id",
								fields : [ {
									name : "roleId",
									type : "int"
								}, "roleName", "roleDesc", {
									name : "status",
									type : "int"
								}, "isDefaultIn" ]
							}),
							remoteSort : true
						});
						this.store.setDefaultSort("roleId", "desc");
						this.store.load({
							params : {
								start : 0,
								limit : 25
							}
						});
						var b = new Ext.grid.CheckboxSelectionModel();
						var a = new Ext.grid.ColumnModel(
								{
									columns : [
											b,
											new Ext.grid.RowNumberer(),
											{
												header : "roleId",
												dataIndex : "roleId",
												hidden : true
											},
											{
												header : "状态",
												dataIndex : "status",
												width : 30,
												renderer : function(c) {
													var d = "";
													if (c == "1") {
														d += '<img title="激活" src="'
																+ __ctxPath
																+ '/images/flag/customer/effective.png"/>';
													} else {
														d += '<img title="禁用" src="'
																+ __ctxPath
																+ '/images/flag/customer/invalid.png"/>';
													}
													return d;
												}
											},
											{
												header : "退胸卡名称",
												dataIndex : "roleName",
												width : 200
											},
											{
												header : "退胸卡描述",
												dataIndex : "roleDesc",
												width : 400
											},
											{
												header : "管理",
												dataIndex : "roleId",
												width : 80,
												renderer : function(j, i, e, g,
														k) {
													var c = e.data.roleId;
													var d = e.data.roleName;
													var h = e.data.isDefaultIn;
													var f = "";
													if (c != -1) {
														if (h == "0") {
															if (isGranted("_NameCardDelDel")) {
																f = '<button title="删除" value=" " class="btn-del" onclick="NameCardDelView.remove('
																		+ c
																		+ ')"></button>';
															}
															if (isGranted("_NameCardDelEdit")) {
																f += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="NameCardDelView.edit('
																		+ c
																		+ ')"></button>';
															}
															if (isGranted("_NameCardDelGrant")) {
																f += '&nbsp;<button title="授权" value=" " class="btn-grant" onclick="NameCardDelView.grant('
																		+ c
																		+ ",'"
																		+ d
																		+ "')\">&nbsp;</button>";
															}
														} else {
															f = '<button title="复制" value=" " class="btn-copyrole" onclick="NameCardDelView.copy('
																	+ c
																	+ ')"></button>';
														}
													}
													return f;
												}
											} ],
									defaults : {
										sortable : true,
										menuDisabled : false,
										width : 100
									}
								});
						this.gridPanel = new Ext.grid.GridPanel({
							id : "NameCardDelGrid",
							region : "center",
							tbar : this.topbar(),
							store : this.store,
							trackMouseOver : true,
							disableSelection : false,
							loadMask : true,
							autoHeight : true,
							cm : a,
							sm : b,
							viewConfig : {
								forceFit : true,
								enableRowBody : false,
								showPreview : false
							},
							bbar : new Ext.PagingToolbar({
								pageSize : 25,
								store : this.store,
								displayInfo : true,
								displayMsg : "当前显示从{0}至{1}， 共{2}条记录",
								emptyMsg : "当前没有记录"
							})
						});
						this.gridPanel
								.addListener(
										"rowdblclick",
										function(d, c, f) {
											d
													.getSelectionModel()
													.each(
															function(e) {
																if (e.data.isDefaultIn == "0"
																		&& e.data.roleId != -1) {
																	NameCardDelView
																			.edit(e.data.roleId);
																}
															});
										});
					}
				});
NameCardDelView.prototype.topbar = function() {
	var a = new Ext.Toolbar({
		id : "NameCardDelFootBar",
		height : 30,
		bodyStyle : "text-align:left",
		items : []
	});
	if (isGranted("_NameCardDelAdd")) {
		a.add(new Ext.Button({
			iconCls : "btn-add",
			text : "添加退胸卡",
			handler : function() {
				new NameCardDelForm().show();
			}
		}));
	}
	if (isGranted("_NameCardDelDel")) {
		a.add(new Ext.Button(
				{
					iconCls : "btn-del",
					text : "删除退胸卡",
					handler : function() {
						var d = Ext.getCmp("NameCardDelGrid");
						var b = d.getSelectionModel().getSelections();
						if (b.length == 0) {
							Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
							return;
						}
						var e = Array();
						var f = "";
						for ( var c = 0; c < b.length; c++) {
							if (b[c].data.isDefaultIn == "0"
									&& b[c].data.roleId != -1) {
								e.push(b[c].data.roleId);
							} else {
								f += b[c].data.roleName + ",";
							}
						}
						if (f == "") {
							NameCardDelView.remove(e);
						} else {
							Ext.ux.Toast.msg("信息", f + "不能被删除！");
						}
					}
				}));
	}
	return a;
};
NameCardDelView.remove = function(b) {
	var a = Ext.getCmp("NameCardDelGrid");
	Ext.Msg.confirm("信息确认", "您确认要删除该记录吗？", function(c) {
		if (c == "yes") {
			Ext.Ajax.request({
				url : __ctxPath + "/nameCard/multiDelNameCardDel.do",
				params : {
					ids : b
				},
				method : "post",
				success : function() {
					Ext.ux.Toast.msg("信息", "成功删除所选记录！");
					a.getStore().reload({
						params : {
							start : 0,
							limit : 25
						}
					});
				}
			});
		}
	});
};
NameCardDelView.edit = function(a) {
	new NameCardDelForm({
		roleId : a,
		isCopy : 0
	}).show();
};
NameCardDelView.grant = function(b, a) {
	new RoleGrantRightView(b, a);
};
NameCardDelView.copy = function(a) {
	new NameCardDelForm({
		roleId : a,
		isCopy : 1
	}).show();
};