DiaryPanelView = Ext
		.extend(
				Ext.ux.Portlet,
				{
					tools : null,
					constructor : function(a) {
						Ext.applyIf(this, a);
						this.initTool();
						DiaryPanelView.superclass.constructor
								.call(
										this,
										{
											id : "DiaryPanelView",
											title : "我的日志",
											iconCls : "menu-diary",
											tools : this.tools,
											autoLoad : {
												url : __ctxPath
														+ "/system/displayDiary.do?start=0&limit=8"
											}
										});
					},
					initTool : function() {
						this.tools = [
								{
									id : "refresh",
									handler : function() {
										Ext
												.getCmp("DiaryPanelView")
												.getUpdater()
												.update(
														__ctxPath
																+ "/system/displayDiary.do?start=0&limit=8");
									}
								},
								{
									id : "close",
									handler : function(c, b, a) {
										Ext.Msg.confirm("提示信息", "确认删除此模块吧？",
												function(d) {
													if (d == "yes") {
														a.ownerCt.remove(a,
																true);
													}
												});
									}
								} ];
					}
				});
NewsPanelView = Ext.extend(Ext.ux.Portlet, {
	tools : null,
	constructor : function(a) {
		Ext.applyIf(this, a);
		this.initTool();
		NewsPanelView.superclass.constructor.call(this, {
			id : "NewsPanelView",
			title : "新闻中心",
			iconCls : "menu-news",
			tools : this.tools,
			autoLoad : {
				url : __ctxPath + "/info/displayNews.do"
			}
		});
	},
	initTool : function() {
		this.tools = [ {
			id : "refresh",
			handler : function() {
				Ext.getCmp("NewsPanelView").getUpdater().update(
						__ctxPath + "/info/displayNews.do");
			}
		} ];
	}
});

DistArchivesPanelView = Ext.extend(Ext.ux.Portlet, {
	tools : null,
	constructor : function(a) {
		Ext.applyIf(this, a);
		this.initTool();
		DistArchivesPanelView.superclass.constructor.call(this, {
			id : "DistArchivesPanelView",
			title : "待阅公文",
			iconCls : "menu-archive-handout",
			tools : this.tools,
			autoLoad : {
				url : __ctxPath + "/archive/displayArchivesDist.do"
			}
		});
	},
	initTool : function() {
		this.tools = [ {
			id : "refresh",
			handler : function() {
				Ext.getCmp("DistArchivesPanelView").getUpdater().update(
						__ctxPath + "/archive/displayArchivesDist.do");
			}
		} ,
		{
			id : "close",
			handler : function(c, b, a) {
				Ext.Msg.confirm("提示信息", "确认删除此模块吧？",
						function(d) {
							if (d == "yes") {
								a.ownerCt.remove(a,
										true);
							}
						});
			}
		}];
	}
});

NoticeNewsPanelView = Ext.extend(Ext.ux.Portlet, {
	tools : null,
	constructor : function(a) {
		Ext.applyIf(this, a);
		this.initTool();
		NoticeNewsPanelView.superclass.constructor.call(this, {
			id : "NoticeNewsPanelView",
			title : "我的通知",
			iconCls : "menu-news",
			tools : this.tools,
			autoLoad : {
				url : __ctxPath + "/info/displayNoticeNew.do"
			}
		});
	},
	initTool : function() {
		this.tools = [ {
			id : "refresh",
			handler : function() {
				Ext.getCmp("NoticeNewsPanelView").getUpdater().update(
						__ctxPath + "/info/displayNoticeNew.do");
			}
		} ,
		{
			id : "close",
			handler : function(c, b, a) {
				Ext.Msg.confirm("提示信息", "确认删除此模块吧？",
						function(d) {
							if (d == "yes") {
								a.ownerCt.remove(a,
										true);
							}
						});
			}
		}];
	}
});
MessagePanelView = Ext.extend(Ext.ux.Portlet, {
	tools : null,
	constructor : function(a) {
		Ext.applyIf(this, a);
		this.initTool();
		MessagePanelView.superclass.constructor.call(this, {
			id : "MessagePanelView",
			title : "个人消息",
			iconCls : "menu-message",
			tools : this.tools,
			autoLoad : {
				url : __ctxPath + "/info/displayInMessage.do"
			}
		});
	},
	initTool : function() {
		this.tools = [ {
			id : "refresh",
			handler : function() {
				Ext.getCmp("MessagePanelView").getUpdater().update(
						__ctxPath + "/info/displayInMessage.do");
			}
		} ];
	}
});
NoticePanelView = Ext.extend(Ext.ux.Portlet, {
	tools : null,
	constructor : function(a) {
		Ext.applyIf(this, a);
		this.initTool();
		NoticePanelView.superclass.constructor.call(this, {
			id : "NoticePanelView",
			title : "公告",
			iconCls : "menu-notice",
			tools : this.tools,
			autoLoad : {
				url : __ctxPath + "/info/displayNotice.do"
			}
		});
	},
	initTool : function() {
		this.tools = [
				{
					id : "refresh",
					handler : function() {
						Ext.getCmp("NoticePanelView").getUpdater().update(
								__ctxPath + "/info/displayNotice.do");
					}
				}, {
					id : "close",
					handler : function(c, b, a) {
						Ext.Msg.confirm("提示信息", "确认删除此模块吧？", function(d) {
							if (d == "yes") {
								a.ownerCt.remove(a, true);
							}
						});
					}
				} ];
	}
});
TaskPanelView = Ext.extend(Ext.ux.Portlet, {
	tools : null,
	constructor : function(a) {
		Ext.applyIf(this, a);
		this.initTool();
		TaskPanelView.superclass.constructor.call(this, {
			id : "TaskPanelView",
			title : "待办事项",
			iconCls : "menu-flowWait",
			tools : this.tools,
			autoLoad : {
				url : __ctxPath + "/flow/displayTask.do"
			}
		});
	},
	initTool : function() {
		this.tools = [
				{
					id : "refresh",
					handler : function() {
						Ext.getCmp("TaskPanelView").getUpdater().update(
								__ctxPath + "/flow/displayTask.do");
					}
				}, {
					id : "close",
					handler : function(c, b, a) {
						Ext.Msg.confirm("提示信息", "确认删除此模块吧？", function(d) {
							if (d == "yes") {
								a.ownerCt.remove(a, true);
							}
						});
					}
				} ];
	}
});
AppointmentPanelView = Ext
		.extend(
				Ext.ux.Portlet,
				{
					tools : null,
					constructor : function(a) {
						Ext.applyIf(this, a);
						this.initTool();
						AppointmentPanelView.superclass.constructor
								.call(
										this,
										{
											id : "AppointmentPanelView",
											title : "我的约会",
											iconCls : "menu-appointment",
											tools : this.tools,
											autoLoad : {
												url : __ctxPath
														+ "/task/displayAppointment.do?start=0&limit=8"
											}
										});
					},
					initTool : function() {
						this.tools = [
								{
									id : "refresh",
									handler : function() {
										Ext
												.getCmp("AppointmentPanelView")
												.getUpdater()
												.update(
														__ctxPath
																+ "/task/displayAppointment.do?start=0&limit=8");
									}
								},
								{
									id : "close",
									handler : function(c, b, a) {
										Ext.Msg.confirm("提示信息", "确认删除此模块吧？",
												function(d) {
													if (d == "yes") {
														a.ownerCt.remove(a,
																true);
													}
												});
									}
								} ];
					}
				});
CalendarPlanPanelView = Ext
		.extend(
				Ext.ux.Portlet,
				{
					tools : null,
					constructor : function(a) {
						Ext.applyIf(this, a);
						this.initTool();
						CalendarPlanPanelView.superclass.constructor
								.call(
										this,
										{
											id : "CalendarPlanPanelView",
											title : "我的日程",
											iconCls : "menu-cal-plan-view",
											tools : this.tools,
											autoLoad : {
												url : __ctxPath
														+ "/task/displayCalendarPlan.do?start=0&limit=8"
											}
										});
					},
					initTool : function() {
						this.tools = [
								{
									id : "refresh",
									handler : function() {
										Ext
												.getCmp("CalendarPlanPanelView")
												.getUpdater()
												.update(
														__ctxPath
																+ "/task/displayCalendarPlan.do?start=0&limit=8");
									}
								},
								{
									id : "close",
									handler : function(c, b, a) {
										Ext.Msg.confirm("提示信息", "确认删除此模块吧？",
												function(d) {
													if (d == "yes") {
														a.ownerCt.remove(a,
																true);
													}
												});
									}
								} ];
					}
				});
MyPlanPanelView = Ext
		.extend(
				Ext.ux.Portlet,
				{
					tools : null,
					constructor : function(a) {
						Ext.applyIf(this, a);
						this.initTool();
						MyPlanPanelView.superclass.constructor
								.call(
										this,
										{
											id : "MyPlanPanelView",
											title : "我的计划",
											iconCls : "menu-myplan",
											tools : this.tools,
											autoLoad : {
												url : __ctxPath
														+ "/task/displayWorkPlan.do?start=0&limit=8"
											}
										});
					},
					initTool : function() {
						this.tools = [
								{
									id : "refresh",
									handler : function() {
										Ext
												.getCmp("MyPlanPanelView")
												.getUpdater()
												.update(
														__ctxPath
																+ "/task/displayWorkPlan.do?start=0&limit=8");
									}
								},
								{
									id : "close",
									handler : function(c, b, a) {
										Ext.Msg.confirm("提示信息", "确认删除此模块吧？",
												function(d) {
													if (d == "yes") {
														a.ownerCt.remove(a,
																true);
													}
												});
									}
								} ];
					}
				});
DeskNewsPanelView = Ext.extend(Ext.ux.Portlet, {
	tools : null,
	constructor : function(a) {
		Ext.applyIf(this, a);
		this.initTool();
		DeskNewsPanelView.superclass.constructor.call(this, {
			id : "DeskNewsPanelView",
			title : "桌面新闻",
			iconCls : "menu-news",
			tools : this.tools,
			border : false,
			height : 330,
			autoLoad : {
				url : __ctxPath + "/info/imageNews.do",
				scripts : true
			}
		});
	},
	initTool : function() {
		this.tools = [ {
			id : "refresh",
			handler : function() {
				Ext.getCmp("DeskNewsPanelView").getUpdater().update({
					url : __ctxPath + "/info/imageNews.do",
					scripts : true
				});
			}
		}, {
			id : "close",
			handler : function(c, b, a) {
				Ext.Msg.confirm("提示信息", "确认删除此模块吧？", function(d) {
					if (d == "yes") {
						a.ownerCt.remove(a, true);
					}
				});
			}
		} ];
	}
});
NoticeScollPanelView = Ext.extend(Ext.ux.Portlet, {
	tools : null,
	constructor : function(a) {
		Ext.applyIf(this, a);
		this.initTool();
		NoticeScollPanelView.superclass.constructor.call(this, {
			id : "NoticeScollPanelView",
			title : "滚动公告栏",
			iconCls : "menu-notice",
			tools : this.tools,
			autoLoad : {
				url : __ctxPath + "/info/scrollerNotice.do?",
				scripts : true
			}
		});
	},
	initTool : function() {
		this.tools = [ {
			id : "refresh",
			handler : function() {
				Ext.getCmp("NoticeScollPanelView").getUpdater().update({
					url : __ctxPath + "/info/scrollerNotice.do",
					scripts : true
				});
			}
		}, {
			id : "close",
			handler : function(c, b, a) {
				Ext.Msg.confirm("提示信息", "确认删除此模块吧？", function(d) {
					if (d == "yes") {
						a.ownerCt.remove(a, true);
					}
				});
			}
		} ];
	}
});
MyDocumentPanelView = Ext
		.extend(
				Ext.ux.Portlet,
				{
					tools : null,
					constructor : function(a) {
						Ext.applyIf(this, a);
						this.initTool();
						MyDocumentPanelView.superclass.constructor
								.call(
										this,
										{
											id : "MyDocumentPanelView",
											title : "我的文档",
											iconCls : "menu-document",
											tools : this.tools,
											autoLoad : {
												url : __ctxPath
														+ "/document/displayDocument.do?start=0&limit=8"
											}
										});
					},
					initTool : function() {
						this.tools = [
								{
									id : "refresh",
									handler : function() {
										Ext
												.getCmp("MyDocumentPanelView")
												.getUpdater()
												.update(
														__ctxPath
																+ "/document/displayDocument.do?start=0&limit=8");
									}
								},
								{
									id : "close",
									handler : function(c, b, a) {
										Ext.Msg.confirm("提示信息", "确认删除此模块吧？",
												function(d) {
													if (d == "yes") {
														a.ownerCt.remove(a,
																true);
													}
												});
									}
								} ];
					}
				});
MyMailPanelView = Ext
		.extend(
				Ext.ux.Portlet,
				{
					tools : null,
					constructor : function(a) {
						Ext.applyIf(this, a);
						this.initTool();
						MyMailPanelView.superclass.constructor
								.call(
										this,
										{
											id : "MyMailPanelView",
											title : "我的邮件",
											iconCls : "menu-mail",
											tools : this.tools,
											autoLoad : {
												url : __ctxPath
														+ "/communicate/displayMail.do?start=0&limit=8"
											}
										});
					},
					initTool : function() {
						this.tools = [
								{
									id : "refresh",
									handler : function() {
										Ext
												.getCmp("MyMailPanelView")
												.getUpdater()
												.update(
														__ctxPath
																+ "/communicate/displayMail.do?start=0&limit=8");
									}
								},
								{
									id : "close",
									handler : function(c, b, a) {
										Ext.Msg.confirm("提示信息", "确认删除此模块吧？",
												function(d) {
													if (d == "yes") {
														a.ownerCt.remove(a,
																true);
													}
												});
									}
								} ];
					}
				});
DepPlanPanelView = Ext.extend(Ext.ux.Portlet, {
	tools : null,
	constructor : function(a) {
		Ext.applyIf(this, a);
		this.initTool();
		DepPlanPanelView.superclass.constructor.call(this, {
			id : "DepPlanPanelView",
			title : "部门计划",
			iconCls : "menu-depplan",
			tools : this.tools,
			autoLoad : {
				url : __ctxPath + "/task/displayDepWorkPlan.do"
			}
		});
	},
	initTool : function() {
		this.tools = [
				{
					id : "refresh",
					handler : function() {
						Ext.getCmp("DepPlanPanelView").getUpdater().update(
								__ctxPath + "/task/displayDepWorkPlan.do");
					}
				}, {
					id : "close",
					handler : function(c, b, a) {
						Ext.Msg.confirm("提示信息", "确认删除此模块吧？", function(d) {
							if (d == "yes") {
								a.ownerCt.remove(a, true);
							}
						});
					}
				} ];
	}
});
PanelSelectorWin = Ext.extend(Ext.Window, {
	formPanel : null,
	buttons : null,
	constructor : function(a) {
		Ext.applyIf(this, a);
		this.initUI();
		PanelSelectorWin.superclass.constructor.call(this, {
			id : "PanelSelectorWin",
			title : "选择显示模块",
			layout : "fit",
			height : 225,
			width : 300,
			modal : true,
			defaults : {
				padding : "5"
			},
			buttons : this.buttons,
			buttonAlign : "center",
			items : this.formPanel
		});
	},
	initUI : function() {
		this.formPanel = new Ext.FormPanel({
			id : "PanelSelectorForm",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.5,
				border : false,
				items : [ {
					xtype : "checkbox",
					boxLabel : "待办事项",
					hideLabel : true,
					id : "TaskPanelViewCheckBox",
					name : "TaskPanelView"
				}, {
					xtype : "checkbox",
					boxLabel : "我的日志",
					hideLabel : true,
					id : "DiaryPanelViewCheckBox",
					name : "DiaryPanelView"
				}, {
					xtype : "checkbox",
					hideLabel : true,
					boxLabel : "我的约会",
					id : "AppointmentPanelViewCheckBox",
					name : "AppointmentPanelView"
				}, {
					xtype : "checkbox",
					boxLabel : "我的日程",
					hideLabel : true,
					id : "CalendarPlanPanelViewCheckBox",
					name : "CalendarPlanPanelView"
				}, {
					xtype : "checkbox",
					boxLabel : "部门计划",
					hideLabel : true,
					id : "DepPlanPanelViewCheckBox",
					name : "DepPlanPanelView"
				}, {
					xtype : "checkbox",
					boxLabel : "公告（列表显示）",
					hideLabel : true,
					id : "NoticePanelViewCheckBox",
					name : "NoticePanelView"
				} , {
					xtype : "checkbox",
					boxLabel : "待阅公文",
					hideLabel : true,
					id : "DistArchivesPanelViewCheckBox",
					name : "DistArchivesPanelView"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.5,
				border : false,
				items : [ {
					xtype : "checkbox",
					hideLabel : true,
					boxLabel : "我的计划",
					id : "MyPlanPanelViewCheckBox",
					name : "MyPlanPanelView"
				}, {
					xtype : "checkbox",
					boxLabel : "桌面新闻",
					hideLabel : true,
					id : "DeskNewsPanelViewCheckBox",
					name : "DeskNewsPanelView"
				}, {
					xtype : "checkbox",
					boxLabel : "滚动公告栏",
					hideLabel : true,
					id : "NoticeScollPanelViewCheckBox",
					name : "NoticeScollPanelView"
				}, {
					xtype : "checkbox",
					boxLabel : "我的文档",
					hideLabel : true,
					id : "MyDocumentPanelViewCheckBox",
					name : "MyDocumentPanelView"
				}, {
					xtype : "checkbox",
					boxLabel : "我的邮件",
					hideLabel : true,
					id : "MyMailPanelViewCheckBox",
					name : "MyMailPanelView"
				}, {
					xtype : "checkbox",
					boxLabel : "我的通知",
					hideLabel : true,
					id : "NoticeNewsPanelViewCheckBox",
					name : "NoticeNewsPanelView"
				} ]
			} ]
		});
		var portal = Ext.getCmp("Portal");
		curUserInfo.portalConfig = [];
		var items = portal.items;
		for ( var i = 0; i < items.length; i++) {
			var v = items.itemAt(i);
			for ( var j = 0; j < v.items.getCount(); j++) {
				var m = v.items.itemAt(j);
				var portalItem = new PortalItem(m.id, i, j);
				curUserInfo.portalConfig.push(portalItem);
			}
		}
		var confs = curUserInfo.portalConfig;
		for ( var i = 0; i < confs.length; i++) {
			var panelView = confs[i].panelId;
			var panelCheck = Ext.getCmp(panelView + "CheckBox");
			if (panelCheck != null) {
				panelCheck.setValue(true);
				panelCheck.disable();
			}
		}
		this.buttons = [
				{
					xtype : "button",
					text : "确定",
					iconCls : "btn-save",
					handler : function() {
						var fd = Ext.getCmp("PortalItem");
						var portal = Ext.getCmp("Portal");
						var array = [ "DiaryPanelView", "TaskPanelView",
								"NoticePanelView", "AppointmentPanelView",
								"CalendarPlanPanelView", "DepPlanPanelView",
								"MyPlanPanelView", "DeskNewsPanelView",
								"NoticeScollPanelView", "MyDocumentPanelView",
								"MyMailPanelView", "NoticeNewsPanelView", 
								"DistArchivesPanelView"];
						for ( var v = 0; v < array.length; v++) {
							var check = Ext.getCmp(array[v] + "CheckBox");
							if (check != null) {
								if (check.getValue()
										&& Ext.getCmp(array[v]) == null) {
									var panel = eval("new " + array[v] + "()");
									fd.add(panel);
								}
							}
						}
						fd.doLayout();
						portal.doLayout();
						Ext.getCmp("PanelSelectorWin").close();
					}
				}, {
					xtype : "button",
					text : "取消",
					iconCls : "btn-cancel",
					handler : function() {
						Ext.getCmp("PanelSelectorWin").close();
					}
				} ];
	}
});
AppHome = Ext.extend(Ext.Panel, {
	portalPanel : null,
	toolbar : null,
	closable:false,
	constructor : function(a) {
		Ext.applyIf(this, a);
		this.initUIComponents();
		AppHome.superclass.constructor.call(this, {
			title : "首       页",
			closable : false,
			id : "AppHome",
			iconCls : "menu-company",
			layout : "fit",
			defaults : {
				padding : "0 5 0 0"
			},
			tbar : this.toolbar,
			items : this.portalPanel
		});
	},
	initUIComponents : function() {
		this.toolbar = new Ext.Toolbar({
			height : 30,
			items : [ "->", {
				xtype : "button",
				text : "添加模块",
				iconCls : "btn-add",
				handler : function() {
					new PanelSelectorWin().show();
				}
			}, {
				xtype : "button",
				text : "保存",
				iconCls : "btn-save",
				handler : function() {
					var portal = Ext.getCmp("Portal");
					curUserInfo.portalConfig = [];
					var items = portal.items;
					for ( var i = 0; i < items.length; i++) {
						var v = items.itemAt(i);
						for ( var j = 0; j < v.items.getCount(); j++) {
							var m = v.items.itemAt(j);
							var portalItem = new PortalItem(m.id, i, j);
							curUserInfo.portalConfig.push(portalItem);
						}
					}
					Ext.Ajax.request({
						method : "post",
						url : __ctxPath + "/system/saveIndexDisplay.do",
						success : function(request) {
							Ext.ux.Toast.msg("操作信息", "保存成功");
						},
						failure : function(request) {
							Ext.MessageBox.show({
								title : "操作信息",
								msg : "信息保存出错，请联系管理员！",
								buttons : Ext.MessageBox.OK,
								icon : "ext-mb-error"
							});
						},
						params : {
							items : Ext.encode(curUserInfo.portalConfig)
						}
					});
				}
			} ]
		});
		var tools = [ {
			id : "gear",
			handler : function() {
				Ext.Msg.alert("Message", "The Settings tool was clicked.");
			}
		}, {
			id : "close",
			handler : function(e, target, panel) {
				panel.ownerCt.remove(panel, true);
			}
		} ];
		var confs = curUserInfo.portalConfig;
		if (confs == null || confs == undefined || confs.length < 1) {
			confs = new Array();
			var p1 = {
				panelId : "MessagePanelView",
				column : 1,
				row : 0
			};
			var p2 = {
				panelId : "NoticePanelView",
				column : 0,
				row : 1
			};
			var p3 = {
				panelId : "NewsPanelView",
				column : 0,
				row : 0
			};
			confs.push(p3);
			confs.push(p2);
			confs.push(p1);
		}
		var column0 = [];
		var column1 = [];
		for ( var v = 0; v < confs.length; v++) {
			if (confs[v].column == 0) {
				column0.push(eval("new " + confs[v].panelId + "()"));
			} else {
				column1.push(eval("new " + confs[v].panelId + "()"));
			}
		}
		this.portalPanel = {
			id : "Portal",
			xtype : "portal",
			region : "center",
			margins : "35 5 5 0",
			items : [ {
				columnWidth : 0.65,
				style : "padding:10px 0 10px 10px",
				id : "PortalItem",
				items : column0
			}, {
				columnWidth : 0.35,
				style : "padding:10px 10px 10px 10px",
				items : column1
			} ]
		};
	}
});