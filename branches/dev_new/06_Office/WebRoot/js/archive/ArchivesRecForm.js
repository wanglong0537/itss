Ext.ns("ArchivesRecForm");
ArchivesRecForm = Ext
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
						if (a == null) {
							a = {};
						}
						Ext.apply(this, a);
						this.initComponents();
						ArchivesRecForm.superclass.constructor.call(this, {
							id : "ArchivesRecForm",
							layout : "column",
							items : this.formPanel,
							modal : true,
							iconCls : "menu-arch-reg",
							tbar : this.toolbar,
							maximizable : true,
							title : "公文详细信息"
						});
					},
					initComponents : function() {
						
						//ArchFlowConf表保存了发文0和收文对应1流程
						Ext.Ajax.request({
									scope : this,
									url : __ctxPath
											+ "/archive/getFlowArchFlowConf.do?flowType="
											+ 1,
									success : function(b, c) {
										var d = Ext.util.JSON
												.decode(b.responseText);
										if (d.success) {
											this.setDefId(d.defId);
										}
									}
								});
						
						this.formPanel = new Ext.FormPanel(
								{
									layout : "form",
									columnWidth : 0.98,
									bodyStyle : "padding:10px 10px 10px 10px",
									border : false,
									url : __ctxPath
											+ "/archive/saveArchives.do",
									id : "ArchivesRecFormPanel",
									defaults : {
										anchor : "98%,98%"
									},
									autoScroll : true,
									reader : new Ext.data.JsonReader({
										root : "data"
									}, [ {
										name : "ArchivesRecForm.archivesId",
										mapping : "archivesId"
									},
									/* {
										name : "ArchivesRecForm.depId",
										mapping : "depId"
									}, */
									{
										name : "ArchivesRecForm.status",
										mapping : "status"
									}, {
										name : "ArchivesRecForm.archivesNo",
										mapping : "archivesNo"
									}, {
										name : "ArchivesRecForm.issueDep",
										mapping : "issueDep"
									}, {
										name : "ArchivesRecForm.subject",
										mapping : "subject"
									}, {
										name : "ArchivesRecForm.keywords",
										mapping : "keywords"
									}, {
										name : "ArchivesRecForm.sources",
										mapping : "sources"
									}, {
										name : "ArchivesRecForm.createtime",
										mapping : "createtime"
									}, {
										name : "ArchivesRecForm.urgentLevel",
										mapping : "urgentLevel"
									}, {
										name : "ArchivesRecForm.privacyLevel",
										mapping : "privacyLevel"
									}, {
										name : "ArchivesRecForm.shortContent",
										mapping : "shortContent"
									}, {
										name : "ArchivesRecForm.orgArchivesId",
										mapping : "orgArchivesId"
									}, {
										name : "ArchivesRecForm.depSignNo",
										mapping : "depSignNo"
									}, {
										name : "ArchivesRecForm.handlerUnames",
										mapping : "handlerUnames"
									}, {
										name : "ArchivesRecForm.handelUIds",
										mapping : "handelUIds"
									} ]),
									defaultType : "textfield",
									items : [
											{
												name : "archives.archivesId",
												id : "ArchivesRecForm.archivesId",
												xtype : "hidden",
												value : this.archivesId == null ? ""
														: this.archivesId
											},
											{
												name : "archives.orgArchivesId",
												xtype : "hidden",
												id : "ArchivesRecForm.orgArchivesId"
											},
//											{
//												fieldLabel : "发文部门ID",
//												name : "archives.depId",
//												xtype : "hidden",
//												id : "ArchivesRecForm.depId"
//											},
											{
												fieldLabel : "公文状态",
												xtype : "hidden",
												name : "archives.status",
												id : "ArchivesRecForm.status"
											},
											{
												xtype : "hidden",
												name : "cruArchDepId",
												value : this.archDepId
											},
											{
												fieldLabel : "来文分类",
												hiddenName : "archives.archRecType.recTypeId",
												id : "ArchivesRecForm.recTypeId",
												xtype : "combo",
												mode : "local",
												anchor : "74%",
												allowBlank : false,
												editable : false,
												valueField : "id",
												displayField : "name",
												triggerAction : "all",
												store : new Ext.data.SimpleStore(
														{
															autoLoad : true,
															url : __ctxPath
																	+ "/archive/comboArchRecType.do",
															fields : [ "id",
																	"name",
																	"processDefId"]
														}),
												listeners : {
													select : function(
															d, b, c) {
														if(b.data.processDefId!=""&&b.data.processDefId!=null
																&&b.data.processDefId!=undefined&&b.data.processDefId!="0")
														Ext.getCmp("ArchivesRecForm").setDefId(b.data.processDefId);
													}
												}
											},/*
											{
												xtype : "container",
												layout : "column",
												items : [
														{
															xtype : "label",
															style : "padding-left:0px",
															text : "拟办人员",
															width : 105
														},
														{
															xtype : "textarea",
															width : 400,
															readOnly : true,
															id : "ArchivesRecForm.handlerUnames",
															name : "archives.handlerUnames",
															allowBlank : false,
															blankText : "请选择拟办人员"
														},
														{
															xtype : "hidden",
															id : "ArchivesRecForm.handelUIds",
															name : "signUserIds"
														},
														{
															xtype : "button",
															iconCls : "btn-mail_recipient",
															text : "选择拟办人员",
															handler : function() {
																UserSelector
																		.getView(
																				function(
																						d,
																						c) {
																					Ext
																							.getCmp(
																									"ArchivesRecForm.handlerUnames")
																							.setValue(
																									c);
																					Ext
																							.getCmp(
																									"ArchivesRecForm.handelUIds")
																							.setValue(
																									d);
																				})
																		.show();
															}
														} ]
											},*/
											{
												xtype : "fieldset",
												title : "公文基本信息",
												defaults : {
													anchor : "98%,98%"
												},
												layout : "form",
												items : [
														{
															xtype : "container",
															border : true,
															layout : "column",
															defaultType : "textfield",
															items : [
																	{
																		xtype : "container",
																		style : "padding-left:0px;",
																		columnWidth : 0.65,
																		defaults : {
																			anchor : "100%,100%"
																		},
																		defaultType : "textfield",
																		layout : "form",
																		items : [
																				{
																					fieldLabel : "发文字号",
																					name : "archives.archivesNo",
																					id : "ArchivesRecForm.archivesNo"//,
																					//allowBlank : false
																				},
																				{
																					fieldLabel : "公文自编号",
																					name : "archives.depSignNo",
																					id : "ArchivesRecForm.depSignNo"//,
																					//allowBlank : false
																				},
																				{
																					fieldLabel : "发文机关或部门",
																					name : "archives.issueDep",
																					id : "ArchivesRecForm.issueDep"
																				},
																				/*{
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
																						text : "发文部门或单位:",
																						width : 106
																					},
																					{
																						name : "archives.issueDep",
																						id : "ArchivesRecForm.issueDep",
																						xtype : "textfield",
																						width : "70%",
																						allowBlank : false,
																						readOnly : true
																					},
																					{
																						name : "archives.depId",
																						id : "ArchivesRecForm.depId",
																						xtype : "hidden"
																					},
																					{
																						xtype : "button",
																						iconCls : "menu-department",
																						text : "选择部门",
																						handler : function() {
																							DepSelector.getView(function(b,c) {
																												Ext.getCmp("ArchivesRecForm.issueDep").setValue(c);
																												Ext.getCmp("ArchivesRecForm.depId").setValue(b);
																											},
																											true).show();
																						}
																					} ]
																				},*/
																				{
																					fieldLabel : "文件标题",
																					name : "archives.subject",
																					id : "ArchivesRecForm.subject"//,
																					//allowBlank : false
																				},
																				{
																					fieldLabel : "主题词",
																					name : "archives.keywords",
																					id : "ArchivesRecForm.keywords"
																				},
																				{
																					fieldLabel : "公文来源",
																					name : "archives.sources",
																					id : "ArchivesRecForm.sources"
																				} ]
																	},
																	{
																		xtype : "container",
																		columnWidth : 0.35,
																		defaults : {
																			anchor : "100%,100%"
																		},
																		defaultType : "textfield",
																		layout : "form",
																		items : [
																				{
																					fieldLabel : "创建日期",
																					name : "archives.createtime",
																					xtype : "datefield",
																					format : "Y-m-d",
																					id : "ArchivesRecForm.createtime",
																					//allowBlank : false,
																					value : formatDate(new Date(), "yyyy-MM-dd")
																				},
																				{
																					fieldLabel : "紧急程度",
																					name : "archives.urgentLevel",
																					id : "ArchivesRecForm.urgentLevel",
																					xtype : "combo",
																					mode : "local",
																					//allowBlank : false,
																					editable : false,
																					triggerAction : "all",
																					store : [
																							"普通",
																							"紧急",
																							"特急",
																							"特提" ]
																				},
																				{
																					fieldLabel : "秘密等级",
																					name : "archives.privacyLevel",
																					id : "ArchivesRecForm.privacyLevel",
																					xtype : "combo",
																					mode : "local",
																					//allowBlank : false,
																					editable : false,
																					triggerAction : "all",
																					store : [
																							"普通",
																							"秘密",
																							"机密",
																							"绝密" ]
																				} ]
																	} ]
														},
														{
															fieldLabel : "内容简介",
															name : "archives.shortContent",
															xtype : "textarea",
															id : "ArchivesRecForm.shortContent"
														} ]
											},
											{
												xtype : "fieldset",
												title : "公文正文",
												layout : "column",
												items : [
														{
															columnWidth : 0.8,
															layout : "form",
															items : [ {
																xtype : "panel",
																id : "archivesRecFilePanel",
																height : 50,
																border : false,
																autoScroll : true,
																html : ""
															} ]
														},
														{
															columnWidth : 0.2,
															border : false,
															items : [
																	{
																		xtype : "button",
																		text : "添加附件",
																		iconCls : "menu-attachment",
																		handler : function() {
																			var c = App
																					.createUploadDialog({
																						file_cat : "hrm",
																						callback : function(
																								g) {
																							var d = Ext
																									.getCmp("archivesRecfileIds");
																							var f = Ext
																									.getCmp("archivesRecFilePanel");
																							for ( var e = 0; e < g.length; e++) {
																								if (d
																										.getValue() != "") {
																									d
																											.setValue(d
																													.getValue()
																													+ ",");
																								}
																								d
																										.setValue(d
																												.getValue()
																												+ g[e].fileId);
																								Ext.DomHelper
																										.append(
																												f.body,
																												'<span><a href="#" onclick="FileAttachDetail.show('
																														+ g[e].fileId
																														+ ')">'
																														+ g[e].filename
																														+ '</a> <img class="img-delete" src="'
																														+ __ctxPath
																														+ '/images/system/delete.gif" onclick="ArchivesRecForm.removeFile(this,'
																														+ g[e].fileId
																														+ ')"/>&nbsp;|&nbsp;</span>');
																							}
																						}
																					});
																			c
																					.show(this);
																		}
																	},
																	{
																		xtype : "button",
																		text : "清除附件",
																		iconCls : "reset",
																		handler : function() {
																			var d = Ext
																					.getCmp("archivesRecfileIds");
																			var c = Ext
																					.getCmp("archivesRecFilePanel");
																			c.body
																					.update("");
																			d
																					.setValue("");
																		}
																	},
																	{
																		xtype : "hidden",
																		id : "archivesRecfileIds",
																		name : "archivesRecfileIds"
																	} ]
														} ]
											} ]
								});
						if (this.archivesId != null
								&& this.archivesId != "undefined") {
							var b = this.isSign;
							var a = this.archivesId;
							this.formPanel
									.getForm()
									.load(
											{
												deferredRender : false,
												url : __ctxPath
														+ "/archive/getArchives.do?archivesId="
														+ this.archivesId,
												waitMsg : "正在载入数据...",
												success : function(h, j) {
													if (b) {
														Ext
																.getCmp(
																		"ArchivesRecForm.archivesId")
																.setValue("");
														Ext
																.getCmp(
																		"ArchivesRecForm.orgArchivesId")
																.setValue(a);
													}
													var f = Ext.util.JSON
															.decode(j.response.responseText).data[0];
													var d = f.archRecType;
													if (d != null) {
														Ext
																.getCmp(
																		"ArchivesRecForm.recTypeId")
																.setValue(
																		d.recTypeId);
													}
													//Ext.getCmp("ArchivesRecForm.handelUIds").setValue(f.handlerUids);
													Ext
															.getCmp(
																	"ArchivesRecForm.createtime")
															.setValue(
																	new Date(
																			getDateFromFormat(
																					f.createtime,
																					"yyyy-MM-dd HH:mm:ss")));
													var k = f.archivesDocs;
													var g = Ext
															.getCmp("archivesRecFilePanel");
													var c = Ext
															.getCmp("archivesRecfileIds");
													for ( var e = 0; e < k.length; e++) {
														if (c.getValue() != "") {
															c.setValue(c
																	.getValue()
																	+ ",");
														}
														c
																.setValue(c
																		.getValue()
																		+ k[e].fileAttach.fileId);
														Ext.DomHelper
																.append(
																		g.body,
																		'<span><a href="#" onclick="FileAttachDetail.show('
																				+ k[e].fileAttach.fileId
																				+ ')">'
																				+ k[e].fileAttach.fileName
																				+ '</a><img class="img-delete" src="'
																				+ __ctxPath
																				+ '/images/system/delete.gif" onclick="ArchivesRecForm.removeFile(this,'
																				+ k[e].fileAttach.fileId
																				+ ')"/>&nbsp;|&nbsp;</span>');
													}
													
													//指定发文类型对应的流程
													var recTypeId = Ext.getCmp("ArchivesRecForm.recTypeId").getValue();
													if(recTypeId!="" && recTypeId!=null && recTypeId != undefined && recTypeId != 0){
														Ext.Ajax.request({
															scope : this,
															url : __ctxPath
																	+ "/archive/getArchRecType.do?recTypeId="
																	+ Ext.getCmp("ArchivesRecForm.recTypeId").getValue(),
															success : function(b, c) {
																var d = Ext.util.JSON
																		.decode(b.responseText);
																if (d.success) {
																	if(d.data.processDefId!=""&&d.data.processDefId!=null
																			&&d.data.processDefId!=undefined&&d.data.processDefId!="0")
																		Ext.getCmp("ArchivesRecForm").setDefId(d.data.processDefId);
																}
															}
														});
													}													
												},
												failure : function(c, d) {
												}
											});
						}
						this.toolbar = new Ext.Toolbar({
							id : "ArchivesRecFormToolbar",
							items : [
									{
										text : "提交发送",
										iconCls : "btn-save",
										handler : this.submit.createCallback(
												this.formPanel, this)
									},
									{
										text : "暂存",
										iconCls : "btn-save",
										handler : this.save.createCallback(
												this.formPanel, this)
									},
									{
										text : "重置",
										iconCls : "btn-reset",
										handler : this.reset
												.createCallback(this.formPanel)
									},
									{
										text : "取消",
										iconCls : "btn-cancel",
										handler : this.cancel
												.createCallback(this)
									} ]
						});
					},
					reset : function(a) {
						a.getForm().reset();
						Ext.getCmp("archivesRecFilePanel").body.update("");
					},
					cancel : function(a) {
						var b = Ext.getCmp("centerTabPanel");
						if (a != null) {
							b.remove("ArchivesRecForm");
						}
					},
					save : function(a, c) {
						//设置发文字号
						if(Ext.getCmp("ArchivesRecForm.archivesNo").getValue()==""){
							Ext.getCmp("ArchivesRecForm.archivesNo").setValue("空编号");
						}
						//密级、紧急程度、标题、内容
						if(Ext.getCmp("ArchivesRecForm.privacyLevel").getValue()==""){
							Ext.getCmp("ArchivesRecForm.privacyLevel").setValue("空");
						}
						if(Ext.getCmp("ArchivesRecForm.urgentLevel").getValue()==""){
							Ext.getCmp("ArchivesRecForm.urgentLevel").setValue("空");
						}
						if(Ext.getCmp("ArchivesRecForm.subject").getValue()==""){
							Ext.getCmp("ArchivesRecForm.subject").setValue("无标题");
						}
						Ext.getCmp("ArchivesRecForm.status").setValue(0);
						var b = Ext.getCmp("archivesRecfileIds").getValue();
						if (b != "" && b != null && b != "undefined") {
							if (a.getForm().isValid()) {
								a.getForm().submit({
									method : "POST",
									waitMsg : "正在提交数据...",
									success : function(d, g) {
										Ext.ux.Toast.msg("操作信息", "成功保存信息！");
										var f = Ext.getCmp("ArchivesRecGrid");
										if (f != null) {
											f.getStore().reload();
										}
										var e = Ext.getCmp("centerTabPanel");
										if (c != null) {
											e.remove("ArchivesRecForm");
										}
									},
									failure : function(d, f) {
										Ext.MessageBox.show({
											title : "操作信息",
											msg : "信息保存出错，请联系管理员！",
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
										var e = Ext.getCmp("centerTabPanel");
										if (c != null) {
											e.remove("ArchivesRecForm");
										}
									}
								});
							}
						} else {
							Ext.ux.Toast.msg("操作信息", "请上传公文！");
						}
					},
					submit : function(a, c) {
						//设置发文字号
						if(Ext.getCmp("ArchivesRecForm.archivesNo").getValue()==""){
							Ext.getCmp("ArchivesRecForm.archivesNo").setValue("空编号");
						}
						//密级、紧急程度、标题、内容
						if(Ext.getCmp("ArchivesRecForm.privacyLevel").getValue()==""){
							Ext.getCmp("ArchivesRecForm.privacyLevel").setValue("空");
						}
						if(Ext.getCmp("ArchivesRecForm.urgentLevel").getValue()==""){
							Ext.getCmp("ArchivesRecForm.urgentLevel").setValue("空");
						}
						if(Ext.getCmp("ArchivesRecForm.subject").getValue()==""){
							Ext.getCmp("ArchivesRecForm.subject").setValue("无标题");
						}
						
						if(c.defId==""||c.defId==null
								||c.defId==undefined||c.defId=="0"){
							Ext.ux.Toast.msg("操作信息", "请指定相应收文流程！");
							return;
						}
						Ext.getCmp("ArchivesRecForm.status").setValue(2);//mod by awen remove node 办公室传阅 , so change status from 1 to 2
						var b = Ext.getCmp("archivesRecfileIds").getValue();
						if (b != "" && b != null && b != "undefined") {
							if (a.getForm().isValid()) {
								a.getForm().submit({
										method : "POST",
										waitMsg : "正在提交数据...",
										params : {
											archDepId : c.archDepId
										},
										success : function(
												j,
												k) {
											var i = k.result.archivesId;
											Ext.getCmp("ArchivesRecForm.archivesId").setValue(i);
											var h = Ext.getCmp("ArchivesSignGrid");
											if (h != null
													&& h != "undefined") {
												h
														.getStore()
														.reload();
											}
											var flowAssignId = "";
											
											Ext.Ajax.request({
												async: false,//同步
												url : __ctxPath
														+ "/archive/getByCurrentUserArchRecUser.do",
												success : function(h, j) {
													var k = Ext.util.JSON.decode(h.responseText).data;
													flowAssignId = k.officeHeaderUserId;
													if(flowAssignId&&flowAssignId!=""){
													
													}else{
														Ext.MessageBox.show({
															title : '操作信息',
															msg : '请设置办公室主任信息！',
															buttons : Ext.MessageBox.OK,
															icon : Ext.MessageBox.ERROR
														});
													}
												},
												failure : function(h, j){
													Ext.ux.Toast.msg('操作信息','操作出错，请联系管理员！');
												}
											});
											//alert(flowAssignId);
											//return;
											a.getForm().submit(
															{
																url : __ctxPath
																		+ "/flow/saveProcessActivity.do",
																waitMsg : "正在提交流程表单信息...",
																params : {
																	defId : c.defId,
																	startFlow : true,
																	flowAssignId:flowAssignId
																},
																method : "POST",
																success : function(
																		l,
																		o) {
																	Ext.ux.Toast
																			.msg("操作信息", "成功保存信息！");
																	var n = Ext
																			.getCmp("ArchivesRecGrid");
																	if (n != null) {
																		n
																				.getStore()
																				.reload();
																	}
																	var m = Ext
																			.getCmp("centerTabPanel");
																	if (c != null) {
																		m
																				.remove("ArchivesRecForm");
																	}
																},
																failure : function(
																		l,
																		n) {
																	Ext.MessageBox
																			.show({
																				title : "操作信息",
																				msg : "信息保存出错，请联系管理员！",
																				buttons : Ext.MessageBox.OK,
																				icon : Ext.MessageBox.ERROR
																			});
																	var m = Ext
																			.getCmp("centerTabPanel");
																	if (c != null) {
																		m
																				.remove("ArchivesRecForm");
																	}
																}
															});
										},
										failure : function(
												h,
												j) {
											Ext.MessageBox
													.show({
														title : "操作信息",
														msg : "信息保存出错，请联系管理员！",
														buttons : Ext.MessageBox.OK,
														icon : Ext.MessageBox.ERROR
													});
											var i = Ext
													.getCmp("centerTabPanel");
											if (c != null) {
												i
														.remove("ArchivesRecForm");
											}
										}
									});
							}
						} else {
							Ext.ux.Toast.msg("操作信息", "请上传公文！");
						}
					}
				});
ArchivesRecForm.removeFile = function(e, a) {
	var b = Ext.getCmp("archivesRecfileIds");
	var d = b.getValue();
	if (d.indexOf(",") < 0) {
		b.setValue("");
	} else {
		d = d.replace("," + a, "").replace(a + ",", "");
		b.setValue(d);
	}
	var c = Ext.get(e.parentNode);
	c.remove();
};