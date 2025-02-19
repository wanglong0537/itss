SendMailForm = Ext
		.extend(
				Ext.Window,
				{
					formPanel : null,
					constructor : function(a) {
						Ext.applyIf(this, a);
						this.initUIComponents();
						SendMailForm.superclass.constructor.call(this, {
							layout : "fit",
							title : "邮件发送",
							iconCls : "btn-mail_send",
							id : "SendMailFormWin",
							width : 650,
							height : 530,
							minWidth : 649,
							minHeight : 529,
							items : this.formPanel,
							maximizable : true,
							border : false,
							modal : true,
							plain : true,
							buttonAlign : "center",
							buttons : this.buttons
						});
					},
					initUIComponents : function() {
						this.formPanel = new Ext.FormPanel(
								{
									id : "CmailForm",
									frame : false,
									bodyStyle : "padding:5px;",
									defaultType : "textarea",
									url : __ctxPath + "/customer/send.do",
									method : "post",
									modal : true,
									layout : "form",
									plain : true,
									scope : this,
									labelWidth : 60,
									defaults : {
										labelWidth : 60
									},
									items : [
											{
												xtype : "hidden",
												id : "provideIds",
												name : "customerMail.ids",
												value : this.ids
											},
											{
												xtype : "hidden",
												id : "type",
												name : "customerMail.type",
												value : this.type
											},
											{
												xtype : "textfield",
												id : "receivedName",
												anchor : "98%",
												name : "customerMail.names",
												fieldLabel : "收件人",
												readOnly : true,
												value : this.names
											},
											{
												xtype : "textfield",
												id : "subject",
												name : "customerMail.subject",
												anchor : "98%",
												allowBlank : false,
												fieldLabel : "主题"
											},
											{
												xtype : "htmleditor",
												id : "content",
												name : "customerMail.mailContent",
												anchor : "98%",
												height : 300,
												fieldLabel : "内容"
											},
											{
												layout : "column",
												xtype : "container",
												border : false,
												items : [
														{
															columnWidth : 0.7,
															border : false,
															layout : "form",
															items : [ {
																fieldLabel : "附件",
																xtype : "panel",
																id : "providerFilePanel",
																frame : false,
																height : 80,
																autoScroll : true,
																html : ""
															} ]
														},
														{
															columnWidth : 0.3,
															border : false,
															items : [
																	{
																		xtype : "button",
																		iconCls : "btn-add",
																		text : "添加附件",
																		handler : function() {
																			var a = App
																					.createUploadDialog({
																						file_cat : "customer",
																						callback : function(
																								e) {
																							var b = Ext
																									.getCmp("providerfileIds");
																							var d = Ext
																									.getCmp("providerFilePanel");
																							for ( var c = 0; c < e.length; c++) {
																								if (b
																										.getValue() != "") {
																									b
																											.setValue(b
																													.getValue()
																													+ ",");
																								}
																								b
																										.setValue(b
																												.getValue()
																												+ e[c].fileId);
																								Ext.DomHelper
																										.append(
																												d.body,
																												'<span><a href="#" onclick="FileAttachDetail.show('
																														+ e[c].fileId
																														+ ')">'
																														+ e[c].filename
																														+ '</a> <img class="img-delete" src="'
																														+ __ctxPath
																														+ '/images/system/delete.gif" onclick="removeFile(this,'
																														+ e[c].fileId
																														+ ')"/>&nbsp;|&nbsp;</span>');
																							}
																						}
																					});
																			a
																					.show(this);
																		}
																	},
																	{
																		xtype : "button",
																		iconCls : "btn-del",
																		text : "清除附件",
																		handler : function() {
																			var b = Ext
																					.getCmp("providerfileIds");
																			var a = Ext
																					.getCmp("providerFilePanel");
																			a.body
																					.update("");
																			b
																					.setValue("");
																		}
																	} ]
														} ]
											}, {
												xtype : "hidden",
												id : "providerfileIds",
												name : "customerMail.files"
											} ]
								});
						this.formPanel
								.getForm()
								.load(
										{
											deferredRender : false,
											url : __ctxPath
													+ "/customer/loadVm.do",
											waitMsg : "正在载入数据...",
											success : function(b, c) {
												var a = Ext.util.JSON
														.decode(c.response.responseText).data;
												Ext.getCmp("content").setValue(
														a);
											},
											failure : function(b, c) {
												var a = c.result;
												Ext.ux.Toast.msg("信息提示",
														a.message);
												Ext.getCmp("SendMailFormWin")
														.close();
											}
										});
						this.buttons = [
								{
									text : "发送",
									iconCls : "btn-mail_send",
									handler : function() {
										var a = Ext.getCmp("CmailForm");
										if (a.getForm().isValid()) {
											a
													.getForm()
													.submit(
															{
																waitMsg : "正在 发送信息",
																success : function(
																		b, d) {
																	var c = Ext
																			.getCmp("SendMailFormWin");
																	c.close();
																	Ext.ux.Toast
																			.msg(
																					"操作信息",
																					"邮件发送成功！");
																},
																failure : function(
																		b, c) {
																	Ext.ux.Toast
																			.msg(
																					"错误信息",
																					c.result.message);
																}
															});
										}
									}
								}, {
									text : "关闭",
									iconCls : "reset",
									handler : function() {
										var a = Ext.getCmp("SendMailFormWin");
										a.close();
									}
								} ];
					}
				});