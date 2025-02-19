Ext.ns("SalaryPayoffView");
SalaryPayoffView = Ext.extend(Ext.Panel, {
			constructor : function (a) {
				if (a == null) {
					a = {};
				}
				Ext.apply(this, a);
				this.initComponents();
				SalaryPayoffView.superclass.constructor.call(this, {
						id : "SalaryPayoffView",
						title : "薪酬发放审核",
						region : "center",
						iconCls : "menu-check-salay",
						layout : "border",
						items : [this.searchPanel, this.gridPanel]
					});
			},
			typeId : null,
			searchPanel : null,
			gridPanel : null,
			store : null,
			topbar : null,
			initComponents : function () {
				
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
							items : [{
									text : "查询条件：员工姓名:"
								}, {
									name : "Q_fullname_S_LK",
									width : 100,
									xtype : "textfield"
								}, {
									text : "审批状态:"
								}, {
									hiddenName : "Q_checkStatus_SN_EQ",
									width : 110,
									xtype : "combo",
									editable : false,
									mode : "local",
									triggerAction : "all",
									store : [["", "　"], ["0", "未审核"], ["1", "审核通过"], ["2", "审核未通过"]]
								},{
									text : "日期从"
								}, {
									name : "Q_startTime_D_GE",
									width : 100,
									xtype : "datefield",
									format : "Y-m-d"
								}, {
									text : "至"
								}, {
									name : "Q_endTime_D_LE",
									width : 100,
									xtype : "datefield",
									format : "Y-m-d"
								}, {
									xtype : "button",
									text : "查询",
									iconCls : "search",
									handler : this.search.createCallback(this)
								}, {
									xtype : "button",
									text : "导出",
									iconCls : "export",
									handler : this.exports.createCallback(this)
								}, {
									xtype : "button",
									text : "计算薪资",
									iconCls : "export",
									handler : this.caculate.createCallback(this)
								}, {
									id:"exporturl",
									name:"exporturl",
									html:""
								}
							]
						});
				this.store = new Ext.data.JsonStore({
							url : __ctxPath + "/hrm/listSalaryPayoff.do",
							root : "result",
							totalProperty : "totalCounts",
							remoteSort : true,
							fields : [{
									name : "recordId",
									type : "int"
								}, "fullname", "userId", "profileNo", "idNo", "standAmount", "encourageAmount", "deductAmount", "achieveAmount", "encourageDesc", "deductDesc", "memo", "acutalAmount", "provident","insurance","selftax","regTime", "register", "checkName", "checkTime", "checkStatus", "startTime", "endTime", "standardId"]
						});
				this.store.setDefaultSort("recordId", "desc");
				this.store.load({
						params : {
							start : 0,
							limit : 25
						}
					});
				var b = new Ext.grid.CheckboxSelectionModel();
				var a = new Ext.grid.ColumnModel({
							columns : [b, new Ext.grid.RowNumberer(), {
									header : "recordId",
									dataIndex : "recordId",
									hidden : true
								}, {
									header : "员工姓名",
									dataIndex : "fullname"
								}, {
									header : "档案编号",
									dataIndex : "profileNo"
								}, {
									header : "身份证号",
									dataIndex : "idNo"
								}, {
									header : "薪标金额",
									dataIndex : "standAmount",
									renderer : function (c) {
										return '<img src="' + __ctxPath + '/images/flag/customer/rmb.png"/>' + c;
									}
								}, {
									header : "实发金额",
									dataIndex : "acutalAmount",
									renderer : function (c) {
										return '<img src="' + __ctxPath + '/images/flag/customer/rmb.png"/>' + c;
									}
								}, {
									header : "公积金",
									dataIndex : "provident",
									renderer : function (c) {
										return '<img src="' + __ctxPath + '/images/flag/customer/rmb.png"/>' + c;
									}
								}, {
									header : "保险",
									dataIndex : "insurance",
									renderer : function (c) {
										return '<img src="' + __ctxPath + '/images/flag/customer/rmb.png"/>' + c;
									}
								}, {
									header : "个人所得税",
									dataIndex : "selftax",
									renderer : function (c) {
										return '<img src="' + __ctxPath + '/images/flag/customer/rmb.png"/>' + c;
									}
								}, {
									header : "登记时间",
									dataIndex : "regTime",
									renderer : function (c) {
										return c.substring(0, 10);
									}
								}, {
									header : "审批状态",
									dataIndex : "checkStatus",
									renderer : function (c) {
										if (c == "0") {
											return "未审核";
										} else {
											if (c == "1") {
												return '<img title="通过审核" src="' + __ctxPath + '/images/flag/customer/effective.png"/>';
											} else {
												return '<img title="没通过审核" src="' + __ctxPath + '/images/flag/customer/invalid.png"/>';
											}
										}
									}
								}, {
									header : "管理",
									dataIndex : "profileId",
									width : 100,
									sortable : false,
									renderer : function (g, f, d, j, e) {
										var i = d.data.recordId;
										var c = d.data.checkStatus;
										var h = "";
										if (isGranted("_SalaryPayoffDel")) {
											h += '<button title="删除" value=" " class="btn-del" onclick="SalaryPayoffView.remove(' + i + ')">&nbsp;&nbsp;</button>';
										}
										if (c != 1 && c != 2) {
											if (isGranted("_SalaryPayoffEdit")) {
												h += '<button title="编辑" value=" " class="btn-edit" onclick="SalaryPayoffView.edit(' + i + ')">&nbsp;&nbsp;</button>';
											}
											if (isGranted("_SalaryPayoffCheck")) {
												h += '<button title="审核" value=" " class="btn-empProfile-check" onclick="SalaryPayoffView.check(' + i + ')">&nbsp;&nbsp;</button>';
											}
										} else {
											if (isGranted("_SalaryPayoffQuery")) {
												h += '<button title="查看" value=" " class="btn-readdocument" onclick="SalaryPayoffView.look(' + i + ')">&nbsp;&nbsp;</button>';
											}
										}
										if (isGranted("_SalaryPayoffQuery")) {
											h += '<button title="查看操作记录" value=" " class="btn-operation" onclick="SalaryPayoffView.operation(' + i + ')">&nbsp;&nbsp;</button>';
										}
										return h;
									}
								}
							],
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
				if (isGranted("_SalaryPayoffAdd")) {
					this.topbar.add(new Ext.Button({
								iconCls : "btn-add",
								text : "登记",
								handler : this.createRecord
							}));
				}
				if (isGranted("_SalaryPayoffDel")) {
					this.topbar.add(new Ext.Button({
								iconCls : "btn-del",
								text : "删除",
								handler : this.delRecords,
								scope : this
							}));
				}
				this.gridPanel = new Ext.grid.GridPanel({
							id : "SalaryPayoffGrid",
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
							bbar : new Ext.PagingToolbar({
									pageSize : 25,
									store : this.store,
									displayInfo : true,
									displayMsg : "当前页记录索引{0}-{1}， 共{2}条记录",
									emptyMsg : "当前没有记录"
								})
						});
				this.gridPanel.addListener("rowdblclick", function (d, c, f) {
						d.getSelectionModel().each(function (h) {
								var i = h.data.recordId;
								if (h.data.checkStatus == 0) {
									if (isGranted("_SalaryPayoffEdit")) {
										var g = Ext.getCmp("centerTabPanel");
										var e = Ext.getCmp("SalaryPayoffForm");
										if (SalaryPayoffForm != null) {
											g.remove("SalaryPayoffForm");
										}
										e = new SalaryPayoffForm({
													recordId : i
												});
										g.add(e);
										g.activate(e);
									}
								} else {
									SalaryPayoffView.look(i);
								}
							});
					});
			},
			search : function (a) {
				if (a.searchPanel.getForm().isValid()) {
					a.searchPanel.getForm().submit({
							waitMsg : "正在提交查询",
							url : __ctxPath + "/hrm/listSalaryPayoff.do",
							success : function (c, d) {
								var b = Ext.util.JSON.decode(d.response.responseText);
								a.gridPanel.getStore().loadData(b);
							}
						});
				}
			},
			exports : function (a) {
				if (a.searchPanel.getForm().isValid()) {
					a.searchPanel.getForm().submit({
							waitMsg : "正在导出",
							url : __ctxPath + "/hrm/exportSalaryPayoff.do",
							success : function (c, d) {
								var b = Ext.util.JSON.decode(d.response.responseText);
								Ext.getCmp("exporturl").getEl().dom.innerHTML="<a href='"+b.data+"'>点击下载导出文件</a>";
							}
						});
				}
			},
			caculate : function (a) {
				var a = __ctxPath
				+ "/system/listDepartment.do?opt=appUser";
				var dept = new TreeSelector(
						"Q_department.depId_EQ", a, "所属部门",
						"searchPanel.department.depId", false);
				var formPanel = new Ext.FormPanel({
					layout : "form",
					bodyStyle : "padding:10px 10px 10px 10px",
					border : false,
					url : __ctxPath
							+ "/hrm/countSalaryPayoff.do",
					id : "deptSalaryPayoffForm",
					defaults : {
						anchor : "98%,98%"
					},
					defaultType : "textfield",
					items : [{
						fieldLabel : "所属部门",
						name : "Q_department.depId_EQ",
						id : "searchPanel.department.depId",
						xtype : "hidden"
					},
					dept]
				});
				var win = new Ext.Window({
					id : 'caculateWin',
					title : '计算薪资',
					width : 300,
					height : 150,
					layout : "fit",
					iconCls : "menu-JobSalaryRelation",
					modal : true,
					maximizable : true,
					items : formPanel,
					buttonAlign : "center",
					buttons : [
						{
							text : "计算",
							iconCls : "btn-save",
							handler : function(){
							Ext.getCmp("Q_department.depId_EQ").allowBlank = true;
							Ext.getCmp("searchPanel.department.depId").allowBlank = true;
							var depid=Ext.getCmp("searchPanel.department.depId").getValue();
							Ext.getCmp("deptSalaryPayoffForm").getForm().submit({
								waitMsg : "正在计算数据...",
								url : __ctxPath + "/hrm/countSalaryPayoff.do?depid="+depid,
								success : function (c, d) {
									Ext.getCmp("caculateWin").close();
										Ext.getCmp("SalaryPayoffGrid").getStore().reload();
										Ext.MessageBox
													.show({
														title : "操作信息",
														msg : "计算成功！",
														buttons : Ext.MessageBox.OK,
														icon : Ext.MessageBox.INFO
													});
								},
								failure : function(c, d) {
									Ext.MessageBox
											.show({
												title : "操作信息",
												msg : "信息计算出错，请联系管理员！",
												buttons : Ext.MessageBox.OK,
												icon : Ext.MessageBox.ERROR
											});
								}
							});
							return;
							//var depid=Ext.getCmp("searchPanel.department.depId").getValue();
							Ext.Ajax.request({
									waitMsg : "正在计算数据...",
									url : __ctxPath+ "/hrm/countSalaryPayoff.do?depid="+depid,
									success : function(h, j) {
										var data = Ext.decode(h.responseText);
										Ext.getCmp("caculateWin").close();
										Ext.getCmp("SalaryPayoffGrid").getStore().reload();
										Ext.MessageBox
													.show({
														title : "操作信息",
														msg : "计算成功！",
														buttons : Ext.MessageBox.OK,
														icon : Ext.MessageBox.INFO
													});
									},
									failure : function(c, d) {
											Ext.MessageBox
													.show({
														title : "操作信息",
														msg : "信息计算出错，请联系管理员！",
														buttons : Ext.MessageBox.OK,
														icon : Ext.MessageBox.ERROR
													});
										}
								});
							}
						}, {
							text : "取消",
							iconCls : "btn-cancel",
							handler : function(a){
								Ext.getCmp("caculateWin").close();
							}
							
						}]
				});
				win.show();
				
			},
			createRecord : function () {
				var b = Ext.getCmp("centerTabPanel");
				var a = Ext.getCmp("SalaryPayoffForm");
				if (SalaryPayoffForm != null) {
					b.remove("SalaryPayoffForm");
				}
				a = new SalaryPayoffForm();
				b.add(a);
				b.activate(a);
			},
			delRecords : function () {
				var c = Ext.getCmp("SalaryPayoffGrid");
				var a = c.getSelectionModel().getSelections();
				if (a.length == 0) {
					Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
					return;
				}
				var d = Array();
				for (var b = 0; b < a.length; b++) {
					d.push(a[b].data.recordId);
				}
				SalaryPayoffView.remove(d);
			}
		});
SalaryPayoffView.edit = function (c) {
	var b = Ext.getCmp("centerTabPanel");
	var a = Ext.getCmp("SalaryPayoffForm");
	if (SalaryPayoffForm != null) {
		b.remove("SalaryPayoffForm");
	}
	a = new SalaryPayoffForm({
				recordId : c
			});
	b.add(a);
	b.activate(a);
};
SalaryPayoffView.remove = function (a) {
	Ext.Msg.confirm("信息确认", "您确认要删除所选记录吗？", function (b) {
			if (b == "yes") {
				Ext.Ajax.request({
						url : __ctxPath + "/hrm/multiDelSalaryPayoff.do",
						params : {
							ids : a
						},
						method : "POST",
						success : function (c, d) {
							Ext.ux.Toast.msg("操作信息", "成功删除记录！");
							Ext.getCmp("SalaryPayoffGrid").getStore().reload();
						},
						failure : function (c, d) {
							Ext.ux.Toast.msg("操作信息", "操作出错，请联系管理员！");
						}
					});
			}
		});
};
SalaryPayoffView.check = function (a) {
	new CheckSalaryPayoffForm({
			recordId : a
		}).show();
};
SalaryPayoffView.operation = function (b) {
	var a = new Ext.Window({
				id : "SalaryPayoffViewOperationWin",
				title : "薪酬发放操作纪录",
				iconCls : "btn-operation",
				width : 500,
				x : 300,
				y : 50,
				autoHeight : true,
				border : false,
				modal : true,
				layout : "anchor",
				plain : true,
				bodyStyle : "padding:5px;",
				buttonAlign : "center",
				items : [new Ext.Panel({
							autoScroll : true,
							autoHeight : true,
							border : false,
							autoLoad : {
								url : __ctxPath + "/pages/hrm/salaryPayoffOperation.jsp?recordId=" + b
							}
						})],
				buttons : [{
						text : "关闭",
						iconCls : "btn-cancel",
						handler : function () {
							a.close();
						}
					}
				]
			});
	a.show();
};
SalaryPayoffView.look = function (b) {
	var a = new CheckSalaryPayoffForm({
				recordId : b
			}).show();
	a.setTitle("发放详细信息");
	a.remove("CheckSalaryPayoffForm");
	Ext.getCmp("salaryPayoffbtnY").hide();
	Ext.getCmp("salaryPayoffbtnN").hide();
};
 