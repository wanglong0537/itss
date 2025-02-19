ArchivesDraftView = Ext
		.extend(
				Ext.Panel,
				{
					setDefId : function(a) {
						this.defId = a;
					},
					getDefId : function() {
						return this.defId;
					},
					formPanel : null,
					constructor : function(a) {
						Ext.applyIf(this, a);
						Ext.Ajax
								.request({
									scope : this,
									url : __ctxPath
											+ "/archive/getFlowArchFlowConf.do?flowType="
											+ 0,
									success : function(b, c) {
										var d = Ext.util.JSON
												.decode(b.responseText);
										if (d.success) {
											this.setDefId(d.defId);
										}
									}
								});
						this.init();
						ArchivesDraftView.superclass.constructor.call(this, {
							title : "公文拟稿发文",
							id : "ArchivesDraftView",
							iconCls : "menu-archive-draft",
							layout : "column",
							defaults : {
								border : false,
								autoScroll : true
							},
							tbar : new Ext.Toolbar({
								items : [
										{
											text : "查看批阅流程",
											iconCls : "btn-flow-chart",
											handler : this.showFlowPicture
													.createCallback(this),
											scope : this
										}, "-", {
											text : "暂存",
											iconCls : "btn-beready-save",
											handler : this.onDraft,
											scope : this
										}, "-", {
											text : "发送",
											iconCls : "btn-save",
											handler : this.onSend,
											scope : this
										}, {
											text : "完成",
											iconCls : "btn-archives-finish",
											handler : this.finish,
											scope : this
										} ]
							}),
							items : [ this.formPanel ]
						});
					},
					showFlowPicture : function(a) {
						showFlowPictureWin = Ext.extend(Ext.Window, {
							panel : null,
							constructor : function(b) {
								if (b == null) {
									b = {};
								}
								Ext.apply(this, b);
								this.initComponents();
								showFlowPictureWin.superclass.constructor.call(
										this, {
											id : "ArchivesDisplayFlowPicture",
											layout : "fit",
											items : this.panel,
											modal : true,
											height : 500,
											width : 600,
											maximizable : true,
											title : "查看流程图"
										});
							},
							initComponents : function() {
								this.panel = new Ext.Panel({
									iconCls : "btn-flow-chart",
									width : 600,
									height : 500,
									autoScroll : true,
									split : true,
									scope : this,
									region : "west",
									margin : "5 5 5 5",
									html : '<img src="' + __ctxPath
											+ "/jbpmImage?defId=" + a.defId
											+ "&rand=" + Math.random() + '"/>'
								});
							}
						});
						new showFlowPictureWin().show();
					},
					onSave : function(f, c) {
						if (this.store.getCount() == 0) {
							Ext.ux.Toast.msg("操作信息", "请添加公文正文附件!");
						} else {
							if (this.formPanel.getForm().isValid()) {
								var b = [];
								for ( var e = 0, d = this.store.getCount(); e < d; e++) {
									b.push(this.store.getAt(e).data);
								}
								var a = this.formPanel;
								a
										.getForm()
										.submit(
												{
													method : "POST",
													waitMsg : "正在提交数据...",
													params : {
														status : f,
														docs : Ext.encode(b)
													},
													success : function(g, h) {
														Ext
																.getCmp(
																		"archives.archivesId")
																.setValue(
																		h.result.archivesId);
														a
																.getForm()
																.submit(
																		{
																			url : __ctxPath
																					+ "/flow/saveProcessActivity.do",
																			waitMsg : "正在提交流程表单信息...",
																			scope : this,
																			params : {
																				defId : c.defId,
																				startFlow : true
																			},
																			success : function(
																					i,
																					j) {
																				Ext.ux.Toast
																						.msg(
																								"操作信息",
																								"成功保存信息！");
																				AppUtil
																						.removeTab(Ext
																								.getCmp("ArchivesDraftView"));
																				var k = Ext
																						.getCmp("ProcessRunGrid");
																				if (k != null) {
																					k
																							.getStore()
																							.reload();
																				}
																			}
																		});
													},
													failure : function(g, h) {
														Ext.MessageBox
																.show({
																	title : "操作信息",
																	msg : "信息保存出错，请联系管理员！",
																	buttons : Ext.MessageBox.OK,
																	icon : Ext.MessageBox.ERROR
																});
													}
												});
							}
						}
					},
					onDraft : function() {
						if (this.formPanel.getForm().isValid()) {
							var b = [];
							for ( var d = 0, c = this.store.getCount(); d < c; d++) {
								b.push(this.store.getAt(d).data);
							}
							var a = this.formPanel;
							a
									.getForm()
									.submit(
											{
												method : "POST",
												waitMsg : "正在提交数据...",
												params : {
													status : 0,
													docs : Ext.encode(b)
												},
												success : function(e, f) {
													Ext.ux.Toast.msg("操作信息",
															"成功保存草稿！");
													AppUtil
															.removeTab(Ext
																	.getCmp("ArchivesDraftView"));
												},
												failure : function(e, f) {
													Ext.MessageBox
															.show({
																title : "操作信息",
																msg : "信息保存出错，请联系管理员！",
																buttons : Ext.MessageBox.OK,
																icon : Ext.MessageBox.ERROR
															});
												}
											});
						}
					},
					onSend : function() {
						var a = 1;
						this.onSave(a, this);
					},
					finish : function() {
						if (this.formPanel.getForm().isValid()) {
							var b = [];
							for ( var d = 0, c = this.store.getCount(); d < c; d++) {
								b.push(this.store.getAt(d).data);
							}
							var a = this.formPanel;
							a
									.getForm()
									.submit(
											{
												method : "POST",
												waitMsg : "正在提交数据...",
												params : {
													status : 7,
													docs : Ext.encode(b)
												},
												success : function(f, g) {
													var e = g.result.archivesId;
													Ext.Ajax
															.request({
																url : __ctxPath
																		+ "/archive/handOutArchives.do",
																params : {
																	archivesId : e
																},
																method : "post",
																success : function() {
																	Ext.ux.Toast
																			.msg(
																					"操作信息",
																					"成功发文！");
																},
																failure : function() {
																}
															});
													AppUtil
															.removeTab(Ext
																	.getCmp("ArchivesDraftView"));
												},
												failure : function(e, f) {
													Ext.MessageBox
															.show({
																title : "操作信息",
																msg : "信息保存出错，请联系管理员！",
																buttons : Ext.MessageBox.OK,
																icon : Ext.MessageBox.ERROR
															});
												}
											});
						}
					},
					addArchiveDoc : function() {
						var a = Ext.getCmp("archiveTypeId");
						new ArchTemplateSelector({
							callback : function(d) {
								var c = Ext.getCmp("archiveDocViewGrid")
										.getStore();
								var b = Ext.getCmp("ArchivesDraftView");
								var e = function(f) {
									b.insertNewDoc(c, f);
								};
								new ArchivesDocForm({
									docPath : d,
									callback : e
								}).show();
							}
						}).show();
					},
					insertNewDoc : function(a, c) {
						var b;
						if (a.recordType) {
							b = new a.recordType();
							b.data = {};
							b.data["docId"] = c.docId;
							b.data["fileId"] = c.fileId;
							b.data["docPath"] = c.docPath;
							b.data["docName"] = c.docName;
							b.data["curVersion"] = c.curVersion ? c.curVersion
									: 1;
							b.data.newRecord = true;
							b.commit();
							a.add(b);
						}
					},
					addNewArchiveDoc : function() {
						var b = this.store;
						var a = this;
						var c = function(d) {
							a.insertNewDoc(b, d);
						};
						new ArchivesDocForm({
							callback : c
						}).show();
					},
					uploadArchiveDoc : function() {
						var b = this.store;
						var a = this;
						var d = function(g) {
							for ( var e = 0; e < g.length; e++) {
								var f = {
									docId : 0,
									fileId : g[e].fileId,
									docPath : g[e].filepath,
									docName : g[e].filename,
									curVersion : 1
								};
								a.insertNewDoc(b, f);
							}
						};
						var c = App.createUploadDialog({
							file_cat : "archive",
							callback : d
						});
						c.show();
					},
					deleteArchiveDoc : function() {
						var e = Ext.getCmp("archiveDocViewGrid");
						var b = e.getSelectionModel().getSelections();
						if (b.length == 0) {
							Ext.Msg.alert("信息", "请选择要查看的文档！");
							return;
						}
						var a = b[0];
						var c = e.getStore();
						var d = a.data.docId;
						Ext.Msg
								.confirm(
										"信息确认",
										"您确认要删除所选记录吗？",
										function(f) {
											if (f == "yes") {
												Ext.Ajax
														.request({
															url : __ctxPath
																	+ "/archive/multiDelArchivesDoc.do",
															params : {
																ids : d
															},
															method : "POST",
															success : function(
																	g, h) {
																Ext.ux.Toast
																		.msg(
																				"操作信息",
																				"成功删除该文档附件！");
																c.remove(a);
															},
															failure : function(
																	g, h) {
																Ext.ux.Toast
																		.msg(
																				"操作信息",
																				"操作出错，请联系管理员！");
															}
														});
											}
										});
					},
					detailArchivesDoc : function() {
						var f = Ext.getCmp("archiveDocViewGrid");
						var c = f.getSelectionModel().getSelections();
						if (c.length == 0) {
							Ext.Msg.alert("信息", "请选择要查看的文档！");
							return;
						}
						var b = c[0];
						var g = b.data.docPath;
						var e = b.data.docId;
						var d = f.getStore();
						var a = Ext.getCmp("ArchivesDraftView");
						var h = function(i) {
							d.remove(b);
							a.insertNewDoc(d, i);
						};
						new ArchivesDocForm({
							docId : e,
							docPath : g,
							callback : h
						}).show();
					},
					init : function() {
						this.store = new Ext.data.JsonStore({
							url : __ctxPath
									+ "/archive/listArchivesDoc.do?archivesId="
									+ this.archivesId,
							root : "result",
							totalProperty : "totalCounts",
							remoteSort : true,
							fields : [ {
								name : "docId",
								type : "int"
							}, "fileAttach", "creator", "creatorId",
									"menderId", "mender", "docName",
									"docStatus", "curVersion", "docPath",
									"updatetime", "createtime" ]
						});
						this.store.setDefaultSort("docId", "desc");
						if (this.archivesId != null && this.archivesId != ""
								&& this.archivesId != "undefined") {
							this.store.load();
						}
						this.toolbar = new Ext.Toolbar({
							height : 30,
							items : [ {
								text : "按模板在线添加",
								iconCls : "menu-archive-template",
								handler : this.addArchiveDoc,
								scope : this
							}, "-", {
								text : "在线添加",
								iconCls : "btn-edit-online",
								handler : this.addNewArchiveDoc,
								scope : this
							}, "-", {
								text : "上传文档",
								iconCls : "btn-upload",
								handler : this.uploadArchiveDoc,
								scope : this
							}, "-", {
								text : "删除附件文档",
								iconCls : "btn-del",
								scope : this,
								handler : this.deleteArchiveDoc
							}, "-", {
								text : "查看修改文档",
								iconCls : "menu-archive-issue-manage",
								scope : this,
								handler : this.detailArchivesDoc
							} ]
						});
						var a = new Ext.grid.CheckboxSelectionModel({
							singleSelect : true
						});
						this.docGridPanel = new Ext.grid.EditorGridPanel(
								{
									title : "公文正文",
									iconCls : "menu-attachment",
									columnWidth : 0.96,
									border : true,
									id : "archiveDocViewGrid",
									autoHeight : true,
									store : this.store,
									tbar : this.toolbar,
									sm : a,
									columns : [
											new Ext.grid.RowNumberer(),
											a,
											{
												dataIndex : "docId",
												hidden : true
											},
											{
												dataIndex : "fileAttach",
												hidden : true,
												renderer : function(b) {
												}
											},
											{
												dataIndex : "docStatus",
												hidden : true
											},
											{
												dataIndex : "menderId",
												hidden : true
											},
											{
												dataIndex : "creatorId",
												hidden : true
											},
											{
												dataIndex : "docName",
												width : 150,
												header : "文档名称"
											},
											{
												dataIndex : "docPath",
												header : "文档路径",
												width : 300
											},
											{
												dataIndex : "curVersion",
												header : "当前版本",
												renderer : function(b) {
													return "第" + b + "版";
												}
											},
											{
												header : "管理",
												width : 100,
												dataIndex : "docId",
												sortable : false,
												renderer : function(e, d, b, g,
														c) {
													var f = "";
													f += '<button title="历史版本" value=" " class="btn-archive-history" onclick="ArchivesDraftView.attach('
															+ e
															+ ')">&nbsp;&nbsp;</button>';
													return f;
												}
											} ]
								});
						this.formPanel = new Ext.FormPanel(
								{
									columnWidth : 0.96,
									layout : "form",
									autoHeight : true,
									style : "padding:6px 6px 16px 5%",
									url : __ctxPath
											+ "/archive/saveIssueArchives.do",
									id : "ArchivesForm",
									defaults : {
										anchor : "96%,96%"
									},
									reader : new Ext.data.JsonReader({
										root : "data"
									}, [ {
										name : "archives.archviesId",
										mapping : "archivesId"
									}, {
										name : "archives.typeName",
										mapping : "typeName"
									}, {
										name : "archives.typeId",
										mapping : "typeId"
									}, {
										name : "archives.archivesNo",
										mapping : "archivesNo"
									}, {
										name : "archives.privacyLevel",
										mapping : "privacyLevel"
									}, {
										name : "archives.urgentLevel",
										mapping : "urgentLevel"
									}, {
										name : "archives.subject",
										mapping : "subject"
									}, {
										name : "archives.issueDep",
										mapping : "issueDep"
									}, {
										name : "archives.depId",
										mapping : "depId"
									}, {
										name : "archives.keywords",
										mapping : "keywords"
									}, {
										name : "archives.shortContent",
										mapping : "shortContent"
									}, {
										name : "archives.handleOpinion",
										mapping : "handleOpinion"
									}, {
										name : "archives.fileCounts",
										mapping : "fileCounts"
									}, {
										name : "archives.sources",
										mapping : "sources"
									}, {
										name : "archives.recDepIds",
										mapping : "recDepIds"
									}, {
										name : "archives.recDepNames",
										mapping : "recDepNames"
									} ]),
									items : [
											{
												name : "archives.archivesId",
												id : "archives.archivesId",
												xtype : "hidden",
												value : this.archivesId == null ? ""
														: this.archivesId
											},
											{
												name : "archives.typeName",
												id : "archives.typeName",
												xtype : "hidden"
											},
											{
												layout : "column",
												border : false,
												items : [ {
													columnWidth : 0.5,
													border : false,
													style : "padding:0px 0px 0px 10px;",
													layout : "form",
													items : {
														fieldLabel : "公文类型",
														hiddenName : "archives.typeId",
														xtype : "combo",
														allowBlank : false,
														editable : false,
														lazyInit : false,
														allowBlank : false,
														triggerAction : "all",
														store : new Ext.data.SimpleStore(
																{
																	autoLoad : true,
																	url : __ctxPath
																			+ "/archive/comboArchivesType.do",
																	fields : [
																			"typeId",
																			"typeName" ]
																}),
														displayField : "typeName",
														valueField : "typeId",
														listeners : {
															select : function(
																	d, b, c) {
																Ext
																		.getCmp(
																				"archives.typeName")
																		.setValue(
																				b.data.typeName);
															}
														}
													}
												} ]
											},
											{
												xtype : "fieldset",
												title : "发文设置",
												border : true,
												defaults : {
													anchor : "98%,98%"
												},
												items : [
														{
															layout : "form",
															border : false,
															items : {
																fieldLabel : "发文字号",
																name : "archives.archivesNo",
																id : "archives.archivesNo",
																xtype : "textfield",
																allowBlank : false,
																anchor : "100%"
															}
														},
														{
															layout : "form",
															border : false,
															style : "padding:0px 0px 7px 0px;",
															defaults : {
																anchor : "96%,96%"
															},
															items : [ {
																layout : "column",
																border : false,
																items : [
																		{
																			layout : "form",
																			anchor : "99%",
																			style : "padding:0px 0px 0px 0px;",
																			border : false,
																			items : {
																				fieldLabel : "密级",
																				width : 200,
																				name : "archives.privacyLevel",
																				id : "archives.privacyLevel",
																				triggerAction : "all",
																				lazyRender : true,
																				allowBlank : false,
																				emptyText : "选择密级",
																				xtype : "combo",
																				store : [
																						"普通",
																						"秘密",
																						"机密",
																						"绝密" ]
																			}
																		},
																		{
																			layout : "form",
																			border : false,
																			items : {
																				fieldLabel : "紧急程度",
																				width : 200,
																				name : "archives.urgentLevel",
																				id : "archives.urgentLevel",
																				triggerAction : "all",
																				lazyRender : true,
																				allowBlank : false,
																				emptyText : "选择紧急程度",
																				xtype : "combo",
																				store : [
																						"普通",
																						"紧急",
																						"特急",
																						"特提" ]
																			}
																		} ]
															} ]
														},
														{
															fieldLabel : "文件标题",
															name : "archives.subject",
															id : "archives.subject",
															xtype : "textfield",
															allowBlank : false
														},
														{
															xtype : "container",
															layout : "column",
															style : "padding-left:0px;margin-left:0px;",
															height : 30,
															defaults : {
																style : "padding:5px 0px 2px 0px;",
																border : false
															},
															items : [
																	{
																		xtype : "label",
																		text : "发文部门或单位",
																		width : 106
																	},
																	{
																		name : "archives.issueDep",
																		id : "archives.issueDep",
																		xtype : "textfield",
																		width : "70%",
																		value : curUserInfo.depName,
																		allowBlank : false,
																		readOnly : true
																	},
																	{
																		name : "archives.depId",
																		id : "archives.depId",
																		value : curUserInfo.depId,
																		xtype : "hidden"
																	},
																	{
																		xtype : "button",
																		iconCls : "menu-department",
																		text : "选择部门",
																		handler : function() {
																			DepSelector
																					.getView(
																							function(
																									b,
																									c) {
																								Ext
																										.getCmp(
																												"archives.issueDep")
																										.setValue(
																												c);
																								Ext
																										.getCmp(
																												"archives.depId")
																										.setValue(
																												b);
																							},
																							true)
																					.show();
																		}
																	} ]
														},
														{
															xtype : "container",
															layout : "column",
															style : "padding:5px 0px 8px 0px;margin-left:0px;",
															defaults : {
																border : false,
																style : "padding:3px 0px 2px 0px;"
															},
															items : [
																	{
																		xtype : "label",
																		text : "接收单位或部门",
																		width : 106
																	},
																	{
																		xtype : "textarea",
																		name : "archives.recDepNames",
																		width : "70%",
																		readOnly : true,
																		id : "archives.recDepNames"
																	},
																	{
																		xtype : "hidden",
																		name : "archives.recDepIds",
																		id : "archives.recDepIds"
																	},
																	{
																		xtype : "button",
																		iconCls : "menu-department",
																		text : "选择部门",
																		handler : function() {
																			DepSelector
																					.getView(
																							function(
																									b,
																									c) {
																								Ext
																										.getCmp(
																												"archives.recDepIds")
																										.setValue(
																												b);
																								Ext
																										.getCmp(
																												"archives.recDepNames")
																										.setValue(
																												c);
																							},
																							false)
																					.show();
																		}
																	} ]
														},
														{
															fieldLabel : "主题词",
															name : "archives.keywords",
															id : "archives.keywords",
															xtype : "textfield"
														},
														{
															fieldLabel : "内容简介",
															name : "archives.shortContent",
															id : "archives.shortContent",
															xtype : "textarea"
														},
														{
															fieldLabel : "公文来源",
															name : "archives.sources",
															id : "archives.sources",
															xtype : "textfield"
														},
														{
															name : "archives.fileCounts",
															id : "archives.fileCounts",
															xtype : "hidden",
															value : "0"
														} ]
											}, this.docGridPanel ]
								});
						if (this.archivesId != null
								&& this.archivesId != "undefined") {
							this.formPanel
									.getForm()
									.load(
											{
												deferredRender : false,
												url : __ctxPath
														+ "/archive/getIssueArchives.do?archivesId="
														+ this.archivesId,
												waitMsg : "正在载入数据...",
												success : function(b, c) {
												},
												failure : function(b, c) {
												}
											});
						}
					}
				});
ArchivesDraftView.attach = function(f) {
	var e = Ext.getCmp("archiveDocViewGrid");
	var c = e.getSelectionModel().getSelections();
	if (c.length == 0) {
		Ext.Msg.alert("信息", "请选择要查看的文档！");
		return;
	}
	var b = c[0];
	var a = Ext.getCmp("ArchivesDraftView");
	var d = e.getStore();
	var g = function(h) {
		d.remove(b);
		a.insertNewDoc(d, h);
	};
	new ArchivesDocHistoryWin({
		docId : f,
		callback : g
	}).show();
};