ArchivesIssueManage = Ext
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
						ArchivesIssueManage.superclass.constructor.call(this, {
							id : "ArchivesIssueManage",
							iconCls : "menu-archive-issue-manage",
							title : "发文管理",
							region : "center",
							layout : "border",
							items : [ this.searchPanel, this.gridPanel ]
						});
					},
					initUIComponents : function() {
						this.searchPanel = new Ext.FormPanel( {
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
						this.store = new Ext.data.JsonStore( {
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
						this.store.load( {
							params : {
								start : 0,
								limit : 25
							}
						});
						this.rowActions = new Ext.ux.grid.RowActions( {
							header : "管理",
							width : 80,
							actions : [ {
								iconCls : "btn-archives-detail",
								qtip : "查阅详情",
								style : "margin:0 3px 0 3px"
							} ]
						});
						var b = new Ext.grid.CheckboxSelectionModel();
						var a = new Ext.grid.ColumnModel(
								{
									columns : [
											b,
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
													if (c == 0) {
														return '<font color="#777">草稿</font>';
													} else if (c == 1){
															return '<font color="red">待审批</font>';
													} else if(c == 2){
															return '<font color="green">待审批</font>';
													} else if(c == 3){
															return '<font color="green">已签发</font>';
													}else if(c == 4){
															return '<font color="green">待签发</font>';
													}else{
															return '<font color="green">归档</font>';
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
												renderer : function(c) {
													return c.substring(0, 10);
												}
											}, this.rowActions ],
									defaults : {
										sortable : true,
										menuDisabled : false,
										width : 100
									}
								});
						this.topbar = new Ext.Toolbar( {
							height : 30,
							bodyStyle : "text-align:left",
							items : []
						});
						this.gridPanel = new Ext.grid.GridPanel( {
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
							sm : b,
							plugins : this.rowActions,
							viewConfig : {
								forceFit : true,
								autoFill : true,
								forceFit : true
							},
							bbar : new Ext.PagingToolbar( {
								pageSize : 25,
								store : this.store,
								displayInfo : true,
								displayMsg : "当前页记录索引{0}-{1}， 共{2}条记录",
								emptyMsg : "当前没有记录"
							})
						});
						this.gridPanel.addListener("rowdblclick", function(d,
								c, f) {
							d.getSelectionModel().each(function(e) {
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
					detail : function(a) {
						new ArchivesDetailWin( {
							archivesId : a.data.archivesId
						}).show();
					},
					onRowAction : function(c, a, d, e, b) {
						switch (d) {
						case "btn-archives-detail":
							this.detail(a);
							break;
						default:
							break;
						}
					}
				});