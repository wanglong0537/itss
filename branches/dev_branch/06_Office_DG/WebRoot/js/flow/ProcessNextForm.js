ProcessNextForm = Ext
		.extend(
				Ext.Panel,
				{
					formPanel : null,
					formButtons : [],
					constructor : function(c) {
						Ext.applyIf(this, c);
						var a = false;
						Ext.Ajax.request({
							params : {
								taskId : this.taskId
							},
							async : false,
							scope : this,
							url : __ctxPath + "/flow/checkTask.do",
							success : function(e, f) {
								var d = Ext.util.JSON.decode(e.responseText);
								if (d.assigned != undefined) {
									if (!d.assigned) {
										Ext.ux.Toast.msg("操作信息",
												"该任务已经被其他用户锁定执行！");
										a = true;
									}
									if (d.assigned) {
										Ext.ux.Toast.msg("操作信息", "该任务已经成功锁定!");
									}
								}
							}
						});
						if (a) {
							var b = Ext.getCmp("TaskPanelView");
							if (b != null && b != undefined) {
								b.getUpdater().update(
										__ctxPath + "/flow/displayTask.do");
							}
							ProcessNextForm.superclass.constructor.call(null);
							return;
						}
						ProcessNextForm.superclass.constructor.call(this, {
							id : "ProcessForm" + this.taskId,
							iconCls : "btn-approvalTask",
							title : this.activityName,
							layout : "border",
							bodyStyle : "padding:5px",
							items : []
						});
					},
					initComponent : function() {
						var self = this;
						var taskId = this.taskId;
						var formOuterPanel = new Ext.Panel({
							autoHeight : true,
							layout : "hbox",
							border : false,
							layoutConfig : {
								padding : "5",
								pack : "center",
								align : "middle"
							},
							items : [ new Ext.form.Label({
								text : "正在加载流程表单...",
								height : 60
							}) ]
						});
						var detailPanel = new Ext.Panel({
							title : "审批信息",
							layout : "fit",
							autoHeight : true,
							autoScroll : true,
							autoLoad : {
								url : __ctxPath
										+ "/flow/processRunDetail.do?randId="
										+ Math.random() + "&taskId=" + taskId
							}
						});
						var leftPanel = new Ext.Panel({
							border : false,
							region : "center",
							layout : "anchor",
							autoScroll : true,
							bodyStyle : "padding:5px",
							items : [ formOuterPanel, detailPanel ]
						});
						var rightPanel = new Ext.Panel({
							bodyStyle : "padding:5px",
							title : "自由跳转",
							region : "east",
							collapsible : true,
							split : true,
							width : 210,
							layout : {
								type : "vbox",
								padding : "5",
								align : "left"
							},
							defaults : {
								margins : "0 0 5 0"
							}
						});
						this.items = [ leftPanel, rightPanel ];
						this.tbar = new Ext.Toolbar({
							items : [ {
								text : "流程示意图",
								iconCls : "btn-flow-chart",
								handler : function() {
									new FlowImageWindow({
										taskId : taskId
									}).show();
								}
							}, "-" ]
						});
						ProcessNextForm.superclass.initComponent.call(this);
						var activityName = this.activityName;
						var destName = "";
						Ext.Ajax
								.request({
									url : __ctxPath
											+ "/flow/getProcessActivity.do",
									params : {
										activityName : activityName,
										taskId : taskId
									},
									success : function(response, options) {
										try {
											var isFormPanel = true;
											var formPanel = null;
											if (response.responseText.trim()
													.indexOf("[") == 0) {
												if (activityName == ""
														|| activityName == "undefined"
														|| activityName == null) {
													activityName = "开始";
												}
												eval('formPanel = new Ext.FormPanel({title:"任务表单-'
														+ activityName
														+ '",defaults:{border:false},bodyStyle:"padding:8px 8px 8px 8px;",layout:"form",width:750,autoHeight:true,items:'
														+ response.responseText
														+ "});");
											} else {
												if (response.responseText
														.indexOf("Ext.extend(Ext.Panel") != -1) {
													isFormPanel = false;
													eval("formPanel= new ("
															+ response.responseText
															+ ")();");
												} else {
													eval("formPanel= new ("
															+ response.responseText
															+ ")();");
												}
											}
											formOuterPanel.removeAll(true);
											formOuterPanel.add(formPanel);
											if (isFormPanel) {
												Ext.Ajax
														.request({
															url : __ctxPath
																	+ "/flow/transProcessActivity.do",
															params : {
																taskId : taskId
															},
															success : function(
																	response,
																	options) {
																var object = Ext.util.JSON
																		.decode(response.responseText);
																self
																		.getTopToolbar()
																		.add(
																				new Ext.Toolbar.Separator());
																for ( var i = 0; i < object.data.length; i++) {
																	self
																			.getTopToolbar()
																			.insert(
																					2 + i,
																					self
																							.genFormButton(
																									formPanel,
																									taskId,
																									object.data[i].name,
																									object.data[i].destination,
																									activityName));
																}
																self.doLayout();
															}
														});
											} else {
												formPanel.setTaskId(taskId);
												formOuterPanel.doLayout();
											}
											var freeTransCombo = new Ext.form.ComboBox(
													{
														xtype : "combo",
														allowBlank : false,
														editable : false,
														lazyInit : false,
														anchor : "96%,96%",
														triggerAction : "all",
														listeners : {
															select : function(
																	combo,
																	record,
																	index) {
																destName = record.data.destName;
															}
														},
														store : new Ext.data.SimpleStore(
																{
																	autoLoad : true,
																	url : __ctxPath
																			+ "/flow/freeTransProcessActivity.do?taskId="
																			+ taskId,
																	fields : [
																			"signalName",
																			"destName" ]
																}),
														displayField : "destName",
														valueField : "signalName"
													});
											rightPanel.add(new Ext.form.Label({
												text : "跳转任务:"
											}));
											rightPanel.add(freeTransCombo);
											rightPanel.add({
												xtype : "label",
												text : "下一任务执行人:"
											});
											var userAssignNames = new Ext.form.TextField(
													{
														name : "nextAssignUserNames",
														width : 160,
														readOnly : true
													});
											var flowAssignId = "";
											var userSelectButton = new Ext.Button(
													{
														name : "userSelectButton",
														text : "选择执行人",
														iconCls : "btn-users",
														handler : function() {
															UserSelector
																	.getView(
																			function(
																					uIds,
																					uNames) {
																				userAssignNames
																						.setValue(uNames);
																				flowAssignId = uIds;
																			},
																			true)
																	.show();
														}
													});
											rightPanel.add(userAssignNames);
											rightPanel.add(userSelectButton);
											rightPanel
													.add(new Ext.Button(
															{
																text : "自由跳转",
																iconCls : "btn-transition",
																handler : function() {
																	if (destName == "") {
																		Ext.ux.Toast
																				.msg(
																						"操作信息",
																						"请选择自由跳转的任务!");
																		return;
																	}
																	var form = null;
																	if (!isFormPanel) {
																		form = formPanel.formPanel
																				.getForm();
																	} else {
																		form = formPanel
																				.getForm();
																	}
																	if (form
																			.isValid()) {
																		var signalName = freeTransCombo
																				.getValue();
																		form
																				.submit({
																					url : __ctxPath
																							+ "/flow/nextProcessActivity.do",
																					method : "post",
																					waitMsg : "正在提交处理，请稍等",
																					params : {
																						taskId : taskId,
																						signalName : signalName,
																						activityName : activityName,
																						destName : destName,
																						flowAssignId : flowAssignId
																					},
																					success : function(
																							fp,
																							action) {
																						Ext.ux.Toast
																								.msg(
																										"操作信息",
																										"成功保存！");
																						AppUtil
																								.removeTab("ProcessForm"
																										+ taskId);
																						var myTaskGrid = Ext
																								.getCmp("MyTaskGrid");
																						var appHomeTaskGrid = Ext
																								.getCmp("TaskPanelView");
																						if (appHomeTaskGrid != null) {
																							appHomeTaskGrid
																									.getUpdater()
																									.update(
																											__ctxPath
																													+ "/flow/displayTask.do");
																						}
																						if (myTaskGrid != null) {
																							myTaskGrid
																									.getStore()
																									.reload();
																						}
																					},
																					failure : function(
																							fp,
																							action) {
																						Ext.ux.Toast
																								.msg(
																										"操作信息",
																										"操作出错，请联系管理员！");
																					}
																				});
																	}
																}
															}));
											rightPanel.doLayout();
										} catch (e) {
											Ext.ux.Toast.msg("表单加载信息",
													"流程表单加载出现异常！" + e);
										}
									}
								});
					},
					genFormButton : function(b, d, a, e, f) {
						var c = b;
						return {
							iconCls : "btn-transition",
							text : "转至[" + e + "]",
							listeners : {
								"click" : function() {
									var g = c.getForm();
									if (g.isValid()) {
										g
												.submit({
													url : __ctxPath
															+ "/flow/nextProcessActivity.do",
													method : "post",
													waitMsg : "正在提交处理，请稍等",
													params : {
														taskId : d,
														signalName : a,
														activityName : f,
														destName : e
													},
													success : function(h, j) {
														Ext.ux.Toast
																.msg("操作信息",
																		"成功保存！");
														AppUtil
																.removeTab("ProcessForm"
																		+ d);
														var k = Ext
																.getCmp("MyTaskGrid");
														var i = Ext
																.getCmp("TaskPanelView");
														if (i != null) {
															i
																	.getUpdater()
																	.update(
																			__ctxPath
																					+ "/flow/displayTask.do");
														}
														if (k != null) {
															k.getStore()
																	.reload();
														}
													},
													failure : function(h, i) {
														Ext.ux.Toast.msg(
																"操作信息",
																"操作出错，请联系管理员！");
													}
												});
									}
								}
							}
						};
					}
				});
FlowImageWindow = Ext.extend(Ext.Window, {
	constructor : function(a) {
		Ext.applyIf(this, a);
		FlowImageWindow.superclass.constructor.call(this, {
			autoScroll : true,
			iconCls : "btn-flow-chart",
			bodyStyle : "background-color:white",
			maximizable : true,
			title : "流程示意图",
			width : 600,
			height : 500,
			modal : true,
			layout : "fit",
			html : '<img src="' + __ctxPath + "/jbpmImage?taskId="
					+ this.taskId + "&rand=" + Math.random() + '"/>'
		});
	}
});