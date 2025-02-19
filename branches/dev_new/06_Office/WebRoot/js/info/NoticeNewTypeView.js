Ext.ns("NoticeNewTypeView");
NoticeNewTypeView = Ext
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
						NoticeNewTypeView.superclass.constructor.call(this, {
							id : "NoticeNewTypeView",
							title : "通知类别",
							iconCls : "menu-news_type",
							region : "center",
							layout : "border",
							items : [ this.searchPanel, this.gridPanel ]
						});
					},
					initUIComponents : function() {
						this.searchPanel = new Ext.FormPanel(
								{
									id : "NewTypeSearchForm",
									region : "north",
									height : 35,
									frame : false,
									border : false,
									layout : "hbox",
									layoutConfig : {
										padding : "5",
										align : "middle"
									},
									defaults : {
										style : "padding:0px 5px 0px 5px;",
										xtype : "label"
									},
									items : [
											{
												text : "查询条件:"
											},
											{
												text : "类别名称"
											},
											{
												xtype : "textfield",
												name : "Q_typeName_S_LK"
											},
											{
												text : "类别顺序"
											},
											{
												xtype : "numberfield",
												name : "Q_sn_SN_EQ"
											},
											{
												text : "查询",
												xtype : "button",
												iconCls : "search",
												handler : function() {
													var d = Ext
															.getCmp("NoticeNewTypeGrid");
													Ext
															.getCmp(
																	"NewTypeSearchForm")
															.getForm()
															.submit(
																	{
																		waitMsg : "正在提交查询信息",
																		url : __ctxPath
																				+ "/info/listNoticeNewType.do",
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
											},
											{
												text : "重置",
												xtype : "button",
												iconCls : "reset",
												handler : function() {
													Ext
															.getCmp(
																	"NewTypeSearchForm")
															.getForm().reset();
												}
											} ]
								});
						this.store = new Ext.data.Store({
							proxy : new Ext.data.HttpProxy({
								url : __ctxPath + "/info/listNoticeNewType.do"
							}),
							reader : new Ext.data.JsonReader({
								root : "result",
								totalProperty : "totalCounts",
								id : "typeId",
								fields : [ {
									name : "typeId",
									type : "int"
								}, "typeName", {
									name : "sn",
									type : "int"
								} ]
							}),
							remoteSort : true
						});
						this.store.setDefaultSort("typeId", "desc");
						this.store.load({
							params : {
								start : 0,
								limit : 25
							}
						});
						var c = new Ext.grid.CheckboxSelectionModel();
						var a = new Ext.grid.ColumnModel(
								{
									columns : [
											c,
											new Ext.grid.RowNumberer(),
											{
												header : "类别ID",
												hidden : true,
												dataIndex : "typeId",
												width : 40
											},
											{
												header : "类别名",
												dataIndex : "typeName",
												width : 100
											},
											{
												header : "类别顺序",
												dataIndex : "sn",
												width : 50
											},
											{
												header : "管理",
												dataIndex : "typeId",
												width : 150,
												renderer : function(g, f, d, j,
														e) {
													var i = d.data.typeId;
													var h = "";
													if (isGranted("_NoticeNewTypeDel")) {
														h = '<button title="删除" value=" " class="btn-del" onclick="NoticeNewTypeView.remove('
																+ i
																+ ')">&nbsp</button>';
													}
													if (isGranted("_NoticeNewTypeEdit")) {
														h += '&nbsp;&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="NoticeNewTypeView.edit('
																+ i
																+ ')">&nbsp</button>';
														h += '&nbsp;&nbsp;<button title="置顶" value=" " class="btn-up" onclick="NoticeNewTypeView.sort('
																+ i
																+ ","
																+ 1
																+ ')">&nbsp</button>';
														h += '&nbsp;&nbsp;<button title="上移" value=" " class="btn-top" onclick="NoticeNewTypeView.sort('
																+ i
																+ ","
																+ 2
																+ ')">&nbsp</button>';
														h += '&nbsp;&nbsp;<button title="下移" value=" " class="btn-down" onclick="NoticeNewTypeView.sort('
																+ i
																+ ","
																+ 3
																+ ')">&nbsp</button>';
														h += '&nbsp;&nbsp;<button title="置末" value=" " class="btn-last" onclick="NoticeNewTypeView.sort('
																+ i
																+ ","
																+ 4
																+ ')">&nbsp</button>';
													}
													return h;
												}
											} ],
									defaults : {
										menuDisabled : true,
										width : 100
									},
									listeners : {
										hiddenchange : function(d, e, f) {
											saveConfig(e, f);
										}
									}
								});
						this.topbar = new Ext.Toolbar({
							height : 30,
							items : []
						});
						if (isGranted("_NoticeNewTypeAdd")) {
							this.topbar.add(new Ext.Button({
								text : "添加",
								iconCls : "btn-add",
								handler : function() {
									new NoticeNewTypeForm().show();
								}
							}));
						}
						this.gridPanel = new Ext.grid.GridPanel({
							id : "NoticeNewTypeGrid",
							region : "center",
							autoWidth : true,
							autoHeight : true,
							tbar : this.topbar,
							closable : true,
							store : this.store,
							trackMouseOver : true,
							disableSelection : false,
							loadMask : true,
							cm : a,
							sm : c,
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
						this.gridPanel.addListener("rowdblclick", b);
						function b(f, d, g) {
							f.getSelectionModel().each(function(e) {
								if (isGranted("_NoticeNewTypeEdit")) {
									NoticeNewTypeView.edit(e.data.typeId);
								}
							});
						}
					}
				});
NoticeNewTypeView.remove = function(a) {
	Ext.Msg.confirm("删除操作", "你确定要删除该类别吗?", function(b) {
		var d = Ext.getCmp("NoticeNewTypeView");
		var c = Ext.getCmp("typeTree");
		if (b == "yes") {
			Ext.Ajax.request({
				url : __ctxPath + "/info/removeNoticeNewType.do",
				method : "post",
				params : {
					typeId : a
				},
				success : function() {
					var e = Ext.getCmp("typeTree");
					Ext.ux.Toast.msg("操作信息", "类别删除成功");
					Ext.getCmp("NoticeNewTypeGrid").getStore().reload();
					if (e != null) {
						e.root.reload();
					}
				},
				failure : function() {
					Ext.ux.Toast.msg("操作信息", "类别删除失败");
				}
			});
		}
	});
};
NoticeNewTypeView.edit = function(b) {
	var a = Ext.getCmp("newsTypeForm");
	if (a == null) {
		new NoticeNewTypeForm().show();
		a = Ext.getCmp("newsTypeForm");
	}
	a.form.load({
		url : __ctxPath + "/info/detailNoticeNewType.do",
		params : {
			typeId : b
		},
		method : "post",
		deferredRender : true,
		layoutOnTabChange : true,
		waitMsg : "正在载入数据...",
		success : function() {
		},
		failure : function() {
			Ext.ux.Toast.msg("编辑", "载入失败");
		}
	});
};
NoticeNewTypeView.sort = function(b, a) {
	Ext.Ajax.request({
		url : __ctxPath + "/info/sortNoticeNewType.do",
		method : "post",
		params : {
			typeId : b,
			opt : a
		},
		success : function() {
			var c = Ext.getCmp("typeTree");
			Ext.getCmp("NoticeNewTypeGrid").getStore().reload();
			if (c != null) {
				c.root.reload();
			}
		},
		failure : function() {
			Ext.ux.Toast.msg("操作信息", "操作失败");
			Ext.getCmp("NoticeNewTypeGrid").getStore().reload();
		}
	});
};