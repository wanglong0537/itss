Ext.ns("SearchNoticeNew");
var SearchNoticeNew = function(a) {
	return this.getView(a);
};
SearchNoticeNew.prototype.getView = function(a) {
	return new Ext.Panel(
			{
				id : "SearchNoticeNew",
				title : "搜索通知",
				iconCls : "menu-news",
				border : false,
				style : "padding-bottom:10px;",
				autoScroll : true,
				items : [ {
					region : "center",
					anchor : "100%",
					items : [
							new Ext.FormPanel(
									{
										id : "ALLNewsSearchForm",
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
													text : "请输入条件:"
												},
												{
													xtype : "textfield",
													name : "searchContent",
													width : 150
												},{

													text : "已阅通知:",
													xtype : "label"
												},{

													fieldLabel : "已阅通知",
													name : "hasRead",
													id : "hasRead",
													xtype : "checkbox",
													inputValue : "true"
												},
												{
													xtype : "button",
													text : "查询",
													iconCls : "search",
													handler : function() {
														var b = Ext
																.getCmp("ALLNewsSearchForm");
														var c = Ext
																.getCmp("SearchNoticeNewGrid");
														if (b.getForm()
																.isValid()) {
															b
																	.getForm()
																	.submit(
																			{
																				waitMsg : "正在提交查询",
																				url : __ctxPath
																						+ "/info/searchNoticeNew.do",
																				success : function(
																						e,
																						f) {
																					var d = Ext.util.JSON
																							.decode(f.response.responseText);
																					c
																							.getStore()
																							.loadData(
																									d);
																				}
																			});
														}
													}
												},
												{
													xtype : "button",
													text : "重置",
													iconCls : "reset",
													handler : function() {
														var b = Ext
																.getCmp("ALLNewsSearchForm");
														b.getForm().reset();
													}
												} ]
									}), this.setup(a) ]
				} ]
			});
};
SearchNoticeNew.prototype.setup = function(a) {
	return this.grid(a);
};
SearchNoticeNew.prototype.grid = function(d) {
	var a = new Ext.grid.ColumnModel(
			{
				columns : [
						new Ext.grid.RowNumberer(),
						{
							header : "newsId",
							dataIndex : "newsId",
							hidden : true
						},
						{
							header : "通知图标",
							width : 120,
							dataIndex : "subjectIcon",
							renderer : function(i, g, e, k, f) {
								var h = e.data.subjectIcon;
								var j = null;
								if (h != "") {
									j = '<img style="border:0;" width="48" height="48" src="'
											+ __ctxPath
											+ "/attachFiles/"
											+ h
											+ '" border="0"/>';
								} else {
									j = '<img style="border:0;" width="48" height="48" src="'
											+ __ctxPath
											+ '/images/default_newsIcon.jpg" border="0"/>';
								}
								return j;
							}
						}, {
							header : "通知标题",
							width : 210,
							dataIndex : "subject"
						}, {
							header : "作者",
							width : 120,
							dataIndex : "author"
						}, {
							header : "创建时间",
							width : 210,
							dataIndex : "createtime"
						}, {
							header : "回复次数",
							width : 120,
							dataIndex : "replyCounts"
						}, {
							header : "浏览数",
							width : 120,
							dataIndex : "viewCounts"
						}, {
							header : "状态",
							width : 120,
							dataIndex : "status",
							renderer : function(e) {
								return e == 0 ? "禁用" : "生效";
							}
						} ],
				defaults : {
					sortable : true,
					menuDisabled : false,
					width : 100
				}
			});
	var b = this.store();
	b.load({
		params : {
			start : 0,
			limit : 7,
			searchContent : d
		}
	});
	var c = new Ext.grid.GridPanel({
		id : "SearchNoticeNewGrid",
		store : b,
		trackMouseOver : true,
		disableSelection : false,
		autoScroll : true,
		loadMask : true,
		autoHeight : true,
		sortable : false,
		cm : a,
		viewConfig : {
			forceFit : true,
			enableRowBody : false,
			showPreview : false
		},
		bbar : new Ext.PagingToolbar({
			pageSize : 7,
			store : b,
			displayInfo : true,
			displayMsg : "当前显示从{0}至{1}， 共{2}条记录",
			emptyMsg : "当前没有记录"
		})
	});
	c.addListener("rowdblclick", function(g, f, h) {
		g.getSelectionModel().each(function(e) {
			App.clickTopTab("NoticeNewDetail", e.data.newsId, function() {
				AppUtil.removeTab("NoticeNewDetail");
			});
		});
	});
	return c;
};
SearchNoticeNew.prototype.store = function() {
	var a = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : __ctxPath + "/info/searchNoticeNew.do"
		}),
		reader : new Ext.data.JsonReader({
			root : "result",
			totalProperty : "totalCounts",
			id : "id",
			fields : [ {
				name : "newsId",
				type : "int"
			}, "typeId", "subjectIcon", "subject", "author", "createtime",
					"replyCounts", "viewCounts", "content", "updateTime",
					"status" ]
		}),
		remoteSort : true
	});
	a.setDefaultSort("newsId", "desc");
	return a;
};