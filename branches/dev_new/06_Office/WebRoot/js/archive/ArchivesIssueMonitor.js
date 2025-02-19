ArchivesIssueMonitor = Ext
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
						ArchivesIssueMonitor.superclass.constructor
								.call(this,
										{
											id : "ArchivesIssueMonitor",
											iconCls : "menu-archive-monitor",
											title : "发文监控",
											region : "center",
											layout : "border",
											items : [ this.searchPanel,
													this.gridPanel ]
										});
					},
					initUIComponents : function() {
						this.searchPanel = new Ext.FormPanel({
							height : 35,
							region : "north",
							frame : false,
							border : false,
							layout : "hbox",
							layoutConfig : {
								padding : "5",
								align : "middle"
							},
							defaults : {
								style : "padding:0px 5px 0px 5px;",
								border : false,
								anchor : "98%,98%",
								labelWidth : 75,
								xtype : "label"
							},
							items : [ {
								text : "类型名称"
							}, {
								name : "Q_typeName_S_LK",
								width : 100,
								xtype : "textfield"
							}, {
								text : "发文字号"
							}, {
								width : 100,
								name : "Q_archivesNo_S_LK",
								xtype : "textfield"
							}, {
								text : "文件标题"
							}, {
								width : 100,
								name : "Q_subject_S_LK",
								xtype : "textfield"
							}, {
								xtype : "button",
								text : "查询",
								iconCls : "search",
								handler : this.search.createCallback(this)
							} ]
						});
						this.store = new Ext.data.JsonStore({
							url : __ctxPath + "/archive/listArchives.do",
							baseParams : {
								"Q_archType_SN_EQ" : 0
							},
							root : "result",
							totalProperty : "totalCounts",
							remoteSort : true,
							fields : [ {
								name : "archivesId",
								type : "int"
							}, "typeId", "typeName", "archivesNo", "issueDep",
									"depId", "subject", "issueDate", "status",
									"shortContent", "fileCounts",
									"privacyLevel", "urgentLevel", "issuer",
									"issuerId", "keywords", "sources",
									"archType", "createtime" ]
						});
						this.store.setDefaultSort("archivesId", "desc");
						this.store.load({
							params : {
								start : 0,
								limit : 25
							}
						});
						var b = [];
						b.push({
							iconCls : "btn-archives-detail",
							qtip : "查阅详情",
							style : "margin:0 3px 0 3px"
						});
						if (isGranted("_ArchivesIssueHasten")) {
							b.push({
								iconCls : "btn-archives-remind",
								qtip : "催办",
								style : "margin:0 3px 0 3px"
							});
						}
						this.rowActions = new Ext.ux.grid.RowActions({
							header : "管理",
							width : 80,
							actions : b
						});
						var c = new Ext.grid.CheckboxSelectionModel();
						var a = new Ext.grid.ColumnModel(
								{
									columns : [
											c,
											new Ext.grid.RowNumberer(),
											{
												header : "archivesId",
												dataIndex : "archivesId",
												hidden : true
											},
											{
												header : "公文类型名称",
												dataIndex : "typeName"
											},
											{
												header : "发文字号",
												dataIndex : "archivesNo"
											},
											{
												header : "发文机关或部门",
												dataIndex : "issueDep"
											},
											{
												header : "文件标题",
												dataIndex : "subject"
											},
											{
												header : "公文状态",
												dataIndex : "status",
												renderer : function(c) {
													if (c == "0") {
														return '<font color="green">草稿</font>';
													} else {
														if (c == "1") {
															return '<font color="red">待核稿</font>';
														} else {
															if (c == "2") {
																return '<font color="red">待签发</font>';
															} else {
																if (c == "3") {
																	return '<font color="red">待承办</font>';
																} else {
																	if (c == "4") {
																		return '<font color="red">待盖章</font>';
																	} else {
																		if (c == "5") {
																			return '<font color="red">待部门负责人审核</font>';
																		} else {
																			if (c == "6") {
																				return '<font color="red">待分管领导审核</font>';
																			} else {																				
																				if (c == "7") {
																					return '<font color="green">归档</font>';
																				} else {
																					if (c == "8") {
																						return '<font color="red">待局长审核</font>';	
																					} else {
																						if(c == "9"){
																							return '<font color="red">待编号</font>';
																						}else{
																							return '<font color="red">待拟稿人分发</font>';
																						}																				
																					}																				
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}, {
												header : "秘密等级",
												dataIndex : "privacyLevel"
											}, {
												header : "紧急程度",
												dataIndex : "urgentLevel"
											}, {
												header : "发文时间",
												dataIndex : "createtime",
												renderer : function(d) {
													return d.substring(0, 10);
												}
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
						this.gridPanel = new Ext.grid.GridPanel({
							id : "ArchivesGrid",
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
						this.gridPanel.addListener("rowdblclick", function(f,
								d, g) {
							f.getSelectionModel().each(function(e) {
							});
						});
						this.rowActions.on("action", this.onRowAction, this);
					},
					search : function(a) {
						if (a.searchPanel.getForm().isValid()) {
							a.searchPanel
									.getForm()
									.submit(
											{
												waitMsg : "正在提交查询",
												url : __ctxPath
														+ "/archive/listArchives.do",
												success : function(c, d) {
													var b = Ext.util.JSON
															.decode(d.response.responseText);
													a.gridPanel.getStore()
															.loadData(b);
												}
											});
						}
					},
					delRecords : function() {
						var c = Ext.getCmp("ArchivesGrid");
						var a = c.getSelectionModel().getSelections();
						if (a.length == 0) {
							Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
							return;
						}
						var d = Array();
						for ( var b = 0; b < a.length; b++) {
							d.push(a[b].data.archivesId);
						}
						this.delByIds(d);
					},
					detail : function(a) {
						new ArchivesDetailWin({
							archivesId : a.data.archivesId
						}).show();
					},
					remind : function(b) {
						var a = b.data.status;
						var d = "";
						var c = false;				

						if (a == "0") {
							d = "草稿";
						} else {
							if (a == "1") {
								d = "科室负责人核稿";
							} else {
								if (a == "2") {
									d = "分管或局领导签发";
								} else {
									if (a == "3") {
										d = "办公室主任承办";
									} else {
										if (a == "4") {
											d = "盖章";
										} else {
											if (a == "5") {
												d = "部门负责人"; //请示报告
											} else {
												if (a == "6") {
													d = "分局局长审核";//请示报告
												} else {																				
													if (a == "7") {
														d = "归档";
														c=true;
													} else {
														if (a == "8") {
															d = "局长审核";	//请示报告
														} else {
															if (a == "9"){
																d = "编号录入";
															}else{
																d = "拟稿人分发";
															}																					
														}																				
													}
												}
											}
										}
									}
								}
							}
						}			
					
						
//						if (a == 1) {
//							d = "发文核稿";
//						} else {
//							if (a == 2) {
//								d = "科室审核";
//							} else {
//								if (a == 3) {
//									d = "主管领导审批";
//								} else {
//									if (a == 4) {
//										d = "分管领导签发";
//									} else {
//										if (a == 5) {
//											d = "发文校对";
//										} else {
//											if (a == 6) {
//												d = "发文分发";
//											} else {
//												c = true;
//											}
//										}
//									}
//								}
//							}
//						}
						if (!c) {
							new ArchHastenForm({
								archivesId : b.data.archivesId,
								archivesNo : b.data.archivesNo,
								activityName : d
							}).show();
						} else {
							Ext.ux.Toast.msg("提示信息", "发文已归档!");
						}
					},
					onRowAction : function(c, a, d, e, b) {
						switch (d) {
						case "btn-archives-detail":
							this.detail(a);
							break;
						case "btn-archives-remind":
							this.remind(a);
							break;
						default:
							break;
						}
					}
				});