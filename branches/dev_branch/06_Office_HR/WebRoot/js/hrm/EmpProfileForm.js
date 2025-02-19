EmpProfileForm = Ext
		.extend(
				Ext.Panel,
				{
					formPanel : null,
					constructor : function(a) {
						if (a == null) {
							a = {};
						}
						Ext.apply(this, a);
						this.initComponents();
						EmpProfileForm.superclass.constructor.call(this, {
							id : "EmpProfileForm",
							iconCls : "menu-profile-create",
							layout : "fit",
							items : this.formPanel,
							modal : true,
							height : 200,
							tbar : this.topbar,
							width : 400,
							maximizable : true,
							title : "档案详细信息",
							buttonAlign : "center",
							buttons : this.buttons
						});
					},
					topbar : null,
					initComponents : function() {
						var a = __ctxPath
								+ "/system/listDepartment.do?opt=appUser";
						var b = new TreeSelector("empProfile.depName", a,
								"所属部门或公司", "empProfileForm.depId", false);
						Ext.getCmp("empProfile.depNameTree").on(
								"click",
								function(c) {
									var d = Ext
											.getCmp("empProfileForm.position");
									d.getStore().removeAll();
									d.reset();
								});
						this.formPanel = new Ext.FormPanel(
								{
									layout : "form",
									autoScroll : true,
									tbar : this.topbar,
									bodyStyle : "padding:10px 20px 10px 10px",
									border : false,
									url : __ctxPath + "/hrm/saveEmpProfile.do",
									id : "EmpProfileFormPanel",
									defaults : {
										anchor : "98%,98%"
									},
									reader : new Ext.data.JsonReader(
											{
												root : "data"
											},
											[
													{
														name : "empProfileForm.profileId",
														mapping : "profileId"
													},
													{
														name : "empProfileForm.creator",
														mapping : "creator"
													},
													{
														name : "empProfileForm.createtime",
														mapping : "createtime"
													},
													{
														name : "empProfileForm.checkName",
														mapping : "checkName"
													},
													{
														name : "empProfileForm.checktime",
														mapping : "checktime"
													},
													{
														name : "empProfileForm.approvalStatus",
														mapping : "approvalStatus"
													},
													{
														name : "empProfileForm.depId",
														mapping : "depId"
													},
													{
														name : "empProfileForm.delFlag",
														mapping : "delFlag"
													},
													{
														name : "empProfileForm.jobId",
														mapping : "jobId"
													},
													{
														name : "empProfileForm.photo",
														mapping : "photo"
													},
													{
														name : "empProfileForm.profileNo",
														mapping : "profileNo"
													},
													{
														name : "empProfileForm.fullname",
														mapping : "fullname"
													},
													{
														name : "empProfileForm.idCard",
														mapping : "idCard"
													},
													{
														name : "empProfileForm.birthday",
														mapping : "birthday"
													},
													{
														name : "empProfileForm.sex",
														mapping : "sex"
													},
													{
														name : "empProfileForm.marriage",
														mapping : "marriage"
													},
													{
														name : "empProfileForm.religion",
														mapping : "religion"
													},
													{
														name : "empProfileForm.party",
														mapping : "party"
													},
													{
														name : "empProfileForm.nationality",
														mapping : "nationality"
													},
													{
														name : "empProfileForm.race",
														mapping : "race"
													},
													{
														name : "empProfileForm.birthPlace",
														mapping : "birthPlace"
													},
													{
														name : "empProfileForm.address",
														mapping : "address"
													},
													{
														name : "empProfileForm.homeZip",
														mapping : "homeZip"
													},
													{
														name : "empProfileForm.mobile",
														mapping : "mobile"
													},
													{
														name : "empProfileForm.phone",
														mapping : "phone"
													},
													{
														name : "empProfileForm.qq",
														mapping : "qq"
													},
													{
														name : "empProfileForm.email",
														mapping : "email"
													},
													{
														name : "empProfileForm.eduDegree",
														mapping : "eduDegree"
													},
													{
														name : "empProfileForm.eduMajor",
														mapping : "eduMajor"
													},
													{
														name : "empProfileForm.eduCollege",
														mapping : "eduCollege"
													},
													{
														name : "empProfileForm.startWorkDate",
														mapping : "startWorkDate"
													},
													{
														name : "empProfileForm.eduCase",
														mapping : "eduCase"
													},
													{
														name : "empProfileForm.designation",
														mapping : "designation"
													},
													{
														name : "empProfileForm.position",
														mapping : "position"
													},
													{
														name : "empProfileForm.openBank",
														mapping : "openBank"
													},
													{
														name : "empProfileForm.bankNo",
														mapping : "bankNo"
													},
													{
														name : "empProfileForm.depName",
														mapping : "depName"
													},
													{
														name : "empProfileForm.standardMiNo",
														mapping : "standardMiNo"
													},
													{
														name : "empProfileForm.standardMoney",
														mapping : "standardMoney"
													},
													{
														name : "empProfileForm.standardName",
														mapping : "standardName"
													},
													{
														name : "empProfileForm.standardId",
														mapping : "standardId"
													},
													{
														name : "empProfileForm.trainingCase",
														mapping : "trainingCase"
													},
													{
														name : "empProfileForm.awardPunishCase",
														mapping : "awardPunishCase"
													},
													{
														name : "empProfileForm.workCase",
														mapping : "workCase"
													},
													{
														name : "empProfileForm.memo",
														mapping : "memo"
													},
													{
														name : "empProfileForm.practiceRecord",
														mapping : "practiceRecord"
													},
													{
														name : "empProfileForm.userId",
														mapping : "userId"
													},
													{
														name : "empProfileForm.provident",
														mapping : "provident"
													},
													{
														name : "empProfileForm.insurance",
														mapping : "insurance"
													},
													{
														name : "empProfileForm.perCoefficient",
														mapping : "perCoefficient"
													},
													{
														name : "empProfileForm.accessionTime",
														mapping : "accessionTime"
													},
													{
														name : "empProfileForm.departureTime",
														mapping : "departureTime"
													},
													{
														name : "empProfileForm.organization",
														mapping : "organization"
													},
													{
														name : "empProfileForm.positiveTime",
														mapping : "positiveTime"
													},{
														name : "empProfileForm.realPositiveTime",
														mapping : "realPositiveTime"
													},{
														name : "empProfileForm.providentDate",
														mapping : "providentDate"
													},{
														name : "empProfileForm.pbcSingedDate",
														mapping : "pbcSingedDate"
													},{
														name : "empProfileForm.pbcExecuteDate",
														mapping : "pbcExecuteDate"
													},{
														name : "empProfileForm.isDepartFiled",
														mapping : "isDepartFiled"
													},{
														name : "empProfileForm.chestCardNumber",
														mapping : "chestCardNumber"
													},{
														name : "empProfileForm.isOrientation",
														mapping : "isOrientation"
													},{
														name : "empProfileForm.firstTryUserId",
														mapping : "firstTryUserId"
													},{
														name : "empProfileForm.firstTryUser",
														mapping : "firstTryUser"
													},{
														name : "empProfileForm.secondTryUserId",
														mapping : "secondTryUserId"
													},{
														name : "empProfileForm.secondTryUser",
														mapping : "secondTryUser"
													},{
														name : "empProfileForm.contractRenewalRecord",
														mapping : "contractRenewalRecord"
													},{
														name : "empProfileForm.renewalBeginDate",
														mapping : "renewalBeginDate"
													},{
														name : "empProfileForm.renewalEndDate",
														mapping : "renewalEndDate"
													},{
														name : "empProfileForm.seRenewalBeginDate",
														mapping : "seRenewalBeginDate"
													},{
														name : "empProfileForm.seRenewalEndDate",
														mapping : "seRenewalEndDate"
													},{
														name : "empProfileForm.isOpenEnded",
														mapping : "isOpenEnded"
													},{
														name : "empProfileForm.leaveReason",
														mapping : "leaveReason"
													} ]),
									defaultType : "textfield",
									items : [
											{
												name : "empProfile.profileId",
												id : "empProfileForm.profileId",
												xtype : "hidden",
												value : this.profileId == null ? ""
														: this.profileId
											},
											{
												fieldLabel : "建档人",
												name : "empProfile.creator",
												xtype : "hidden",
												id : "empProfileForm.creator"
											},
											{
												fieldLabel : "建档时间",
												name : "empProfile.createtime",
												xtype : "hidden",
												id : "empProfileForm.createtime"
											},
											{
												fieldLabel : "审核人",
												name : "empProfile.checkName",
												xtype : "hidden",
												id : "empProfileForm.checkName"
											},
											{
												fieldLabel : "审核时间",
												name : "empProfile.checktime",
												xtype : "hidden",
												id : "empProfileForm.checktime"
											},
											{
												fieldLabel : "核审状态",
												name : "empProfile.approvalStatus",
												xtype : "hidden",
												id : "empProfileForm.approvalStatus"
											},
											{
												fieldLabel : "所属部门Id",
												name : "empProfile.depId",
												xtype : "hidden",
												id : "empProfileForm.depId"
											},
											{
												fieldLabel : "删除状态",
												name : "empProfile.delFlag",
												xtype : "hidden",
												id : "empProfileForm.delFlag"
											},
											{
												fieldLabel : "所属岗位",
												name : "empProfile.jobId",
												xtype : "hidden",
												id : "empProfileForm.jobId"
											},
											{
												fieldLabel : "照片",
												name : "empProfile.photo",
												xtype : "hidden",
												id : "empProfileForm.photo"
											},
											{
												fieldLabel : "薪酬标准单编号",
												name : "empProfile.standardId",
												xtype : "hidden",
												id : "empProfileForm.standardId"
											},
											{
												fieldLabel : "所属员工ID",
												name : "empProfile.userId",
												xtype : "hidden",
												id : "empProfileForm.userId"
											},
											{
												xtype : "container",
												layout : "column",
												height : 26,
												anchor : "100%",
												items : [
														{
															xtype : "label",
															style : "padding:3px 5px 0px 17px;",
															text : "档案编号:"
														},
														{
															name : "empProfile.profileNo",
															width : 200,
															xtype : "textfield",
															id : "empProfileForm.profileNo",
															readOnly : true,
															allowBlank : false,
															blankText : "档案编号不能为空!"
														},
														{
															xtype : "button",
															autoWidth : true,
															id : "EmpProfileSystemSetting",
															text : "系统生成",
															iconCls : "btn-system-setting",
															handler : function() {
																Ext.Ajax
																		.request({
																			url : __ctxPath
																					+ "/hrm/numberEmpProfile.do",
																			success : function(
																					d) {
																				var c = Ext.util.JSON
																						.decode(d.responseText);
																				Ext
																						.getCmp(
																								"empProfileForm.profileNo")
																						.setValue(
																								c.profileNo);
																			}
																		});
															}
														} ]
											},
											{
												xtype : "container",
												height : 26,
												layout : "column",
												anchor : "100%",
												items : [
														{
															xtype : "label",
															style : "padding:3px 5px 0px 17px;",
															text : "员工姓名:"
														},
														{
															width : 200,
															xtype : "textfield",
															name : "empProfile.fullname",
															id : "empProfileForm.fullname",
															allowBlank : false,
															blankText : "姓名不能为空！",
															readOnly : true
														},
														{
															xtype : "button",
															id : "EmpProfileSelectEmp",
															text : "选择员工",
															iconCls : "btn-mail_recipient",
															handler : function() {
																UserSelector
																		.getView(
																				function(
																						d,
																						c) {
																					Ext
																							.getCmp(
																									"empProfileForm.fullname")
																							.setValue(
																									c);
																					Ext
																							.getCmp(
																									"empProfileForm.userId")
																							.setValue(
																									d);
																					Ext.Ajax
																							.request({
																								url : __ctxPath
																										+ "/system/getAppUser.do",
																								params : {
																									userId : d
																								},
																								method : "post",
																								success : function(
																										f) {
																									var e = Ext.util.JSON
																											.decode(f.responseText).data[0];
																									Ext
																											.getCmp(
																													"empProfileForm.depId")
																											.setValue(
																													e.department.depId);
																									Ext
																											.getCmp(
																													"empProfile.depName")
																											.setValue(
																													e.department.depName);
																								}
																							});
																				},
																				true)
																		.show();
															}
														} ]
											},
											{
												xtype : "fieldset",
												title : "基本资料",
												layout : "column",
												items : [
														{
															xtype : "container",
															columnWidth : 0.37,
															defaultType : "textfield",
															layout : "form",
															defaults : {
																anchor : "100%,100%"
															},
															items : [
																	{
																		fieldLabel : "身份证号",
																		name : "empProfile.idCard",
																		id : "empProfileForm.idCard"
																	},
																	{
																		fieldLabel : "出生日期",
																		name : "empProfile.birthday",
																		id : "empProfileForm.birthday",
																		xtype : "datefield",
																		format : "Y-m-d"
																	},
																	{
																		fieldLabel : "性别",
																		name : "empProfile.sex",
																		id : "empProfileForm.sex",
																		xtype : "combo",
																		editable : false,
																		mode : "local",
																		triggerAction : "all",
																		store : [
																				"男",
																				"女" ]
																	},
																	{
																		fieldLabel : "婚姻状况",
																		name : "empProfile.marriage",
																		id : "empProfileForm.marriage",
																		xtype : "combo",
																		editable : false,
																		mode : "local",
																		triggerAction : "all",
																		store : [
																				"已婚",
																				"未婚" ]
																	} ,
																	{
																		fieldLabel : "入职日期",
																		name : "empProfile.accessionTime",
																		id : "empProfileForm.accessionTime",
																		xtype : "datefield",
																		format : "Y-m-d",
																		listeners : {
																			"select" : function() {
																				Ext.getCmp("empProfileForm.contractBeginDate").setValue(Ext.getCmp("empProfileForm.accessionTime").getValue());
																				Ext.getCmp("empProfileForm.contractEndDate").setValue(new Date(Ext.getCmp("empProfileForm.accessionTime").getValue()).add(Date.YEAR, 3).add(Date.DAY, -1));
																			}
																		}
																	},/*{
																		fieldLabel : "是否离职",
																		name : "empProfile.isDepart",
																		id : "empProfileForm.isDepart",
																		xtype : "combo",
																		allowBlank : false,
																		emptyText : "请选择",
																		mode : "local",
																		editable : false,
																		triggerAction : "all",
																		store : [ [ "0", "否" ], [ "1", "是" ]
																		],
																		value:0
																	},*/
																	{
																		fieldLabel : "离职日期",
																		name : "empProfile.departureTime",
																		id : "empProfileForm.departureTime",
																		xtype : "datefield",
																		format : "Y-m-d"
																	} ,
																	{
																		fieldLabel : "所属岗位",
																		name : "empProfile.organization",
																		xtype : "hidden",
																		id : "empProfileForm.organization"
																	},
																	{
																		fieldLabel : "编制",
																		name : "empProfile.organizationid",
																		id : "empProfileForm.organizationid",
																		xtype : "combo",
																		allowBlank : false,
																		emptyText : "请选择",
																		mode : "local",
																		editable : false,
																		triggerAction : "all",
																		store : [ [ "1", "正编" ], [ "0", "非正编" ]
																		],
																		listeners : {
																		select:function(e,c,d){
																			var rganizationid=Ext.getCmp("empProfileForm.organizationid").getValue();
																			Ext.getCmp("empProfileForm.organization").setValue(rganizationid);
																		}
																		}
																	}, {
																		fieldLabel : "合同签署日期",
																		name : "empProfile.contractBeginDate",
																		id : "empProfileForm.contractBeginDate",
																		xtype : "datefield",
																		format : "Y-m-d"
																	},
																	{
																		fieldLabel : "合同截止日期",
																		name : "empProfile.contractEndDate",
																		id : "empProfileForm.contractEndDate",
																		xtype : "datefield",
																		format : "Y-m-d"
																	},
																	{
																		fieldLabel : "合同签署日期-续1",
																		name : "empProfile.renewalBeginDate",
																		id : "empProfileForm.renewalBeginDate",
																		xtype : "datefield",
																		format : "Y-m-d"
																	},
																	{
																		fieldLabel : "合同截止日期-续1",
																		name : "empProfile.renewalEndDate",
																		id : "empProfileForm.renewalEndDate",
																		xtype : "datefield",
																		format : "Y-m-d"
																	},
																	{
																		fieldLabel : "合同签署日期-续2",
																		name : "empProfile.seRenewalBeginDate",
																		id : "empProfileForm.seRenewalBeginDate",
																		xtype : "datefield",
																		format : "Y-m-d"
																	},
																	{
																		fieldLabel : "合同截止日期-续2",
																		name : "empProfile.seRenewalEndDate",
																		id : "empProfileForm.seRenewalEndDate",
																		xtype : "datefield",
																		format : "Y-m-d"
																	},
																	{
																		fieldLabel : "用工形式",
																		hiddenName : "empProfile.empType.id",
																		id : "empProfileForm.empType.id",
																		maxHeight : 200,
																		xtype : "combo",
																		mode : "local",
																		editable : false,
																		valueField : "id",
																		displayField : "name",
																		triggerAction : "all",
																		store : new Ext.data.SimpleStore({
																			fields : ["id","name"]
																		}),
																		listeners : {
																			focus : function(d) {
																				var c = Ext.getCmp("empProfileForm.empType.id").getStore();
																				if(c.getCount() <= 0) {
																					Ext.Ajax.request({
																						url : __ctxPath + "/kpi/loadHrPaDatadictionary.do",
																						method : "post",
																						params : {
																							parentId : 20
																						},
																						success : function(f) {
																							var e = Ext.util.JSON.decode(f.responseText);
																							c.loadData(e);
																						}
																					});
																				}
																			}
																		}
																	},
																	{
																		fieldLabel : "胸卡号码",
																		name : "empProfile.chestCardNumber",
																		id : "empProfileForm.chestCardNumber"
																	}]
														},
														{
															xtype : "container",
															columnWidth : 0.37,
															defaultType : "textfield",
															layout : "form",
															defaults : {
																anchor : "100%,100%"
															},
															items : [
																	{
																		fieldLabel : "宗教信仰",
																		name : "empProfile.religion",
																		id : "empProfileForm.religion",
																		maxHeight : 200,
																		xtype : "combo",
																		mode : "local",
																		editable : true,
																		triggerAction : "all",
																		store : [],
																		listeners : {
																			focus : function(
																					d) {
																				var c = Ext
																						.getCmp(
																								"empProfileForm.religion")
																						.getStore();
																				if (c
																						.getCount() <= 0) {
																					Ext.Ajax
																							.request({
																								url : __ctxPath
																										+ "/system/loadDictionary.do",
																								method : "post",
																								params : {
																									itemName : "宗教信仰"
																								},
																								success : function(
																										f) {
																									var e = Ext.util.JSON
																											.decode(f.responseText);
																									c
																											.loadData(e);
																								}
																							});
																				}
																			}
																		}
																	},
																	{
																		fieldLabel : "政治面貌",
																		name : "empProfile.party",
																		id : "empProfileForm.party",
																		maxHeight : 200,
																		xtype : "combo",
																		mode : "local",
																		editable : true,
																		triggerAction : "all",
																		store : [],
																		listeners : {
																			focus : function(
																					d) {
																				var c = Ext
																						.getCmp(
																								"empProfileForm.party")
																						.getStore();
																				if (c
																						.getCount() <= 0) {
																					Ext.Ajax
																							.request({
																								url : __ctxPath
																										+ "/system/loadDictionary.do",
																								method : "post",
																								params : {
																									itemName : "政治面貌"
																								},
																								success : function(
																										f) {
																									var e = Ext.util.JSON
																											.decode(f.responseText);
																									c
																											.loadData(e);
																								}
																							});
																				}
																			}
																		}
																	},
																	{
																		fieldLabel : "国籍",
																		name : "empProfile.nationality",
																		id : "empProfileForm.nationality",
																		maxHeight : 200,
																		xtype : "combo",
																		mode : "local",
																		editable : true,
																		triggerAction : "all",
																		store : [],
																		listeners : {
																			focus : function(
																					d) {
																				var c = Ext
																						.getCmp(
																								"empProfileForm.nationality")
																						.getStore();
																				if (c
																						.getCount() <= 0) {
																					Ext.Ajax
																							.request({
																								url : __ctxPath
																										+ "/system/loadDictionary.do",
																								method : "post",
																								params : {
																									itemName : "国籍"
																								},
																								success : function(
																										f) {
																									var e = Ext.util.JSON
																											.decode(f.responseText);
																									c
																											.loadData(e);
																								}
																							});
																				}
																			}
																		}
																	},
																	{
																		fieldLabel : "民族",
																		name : "empProfile.race",
																		id : "empProfileForm.race",
																		maxHeight : 200,
																		xtype : "combo",
																		mode : "local",
																		editable : true,
																		triggerAction : "all",
																		store : [],
																		listeners : {
																			focus : function(
																					d) {
																				var c = Ext
																						.getCmp(
																								"empProfileForm.race")
																						.getStore();
																				if (c
																						.getCount() <= 0) {
																					Ext.Ajax
																							.request({
																								url : __ctxPath
																										+ "/system/loadDictionary.do",
																								method : "post",
																								params : {
																									itemName : "民族"
																								},
																								success : function(
																										f) {
																									var e = Ext.util.JSON
																											.decode(f.responseText);
																									c
																											.loadData(e);
																								}
																							});
																				}
																			}
																		}
																	},
																	{
																		fieldLabel : "户籍性质",
																		name : "empProfile.censusRegisterType",
																		id : "empProfileForm.censusRegisterType",
																		maxHeight : 200,
																		xtype : "combo",
																		editable : false,
																		triggerAction : "all",
																		store : [],
																		listeners : {
																			focus : function(d) {
																				var c = Ext.getCmp("empProfileForm.censusRegisterType").getStore();
																				if(c.getCount() <= 0) {
																					Ext.Ajax.request({
																						url : __ctxPath + "/system/loadDictionary.do",
																						method : "post",
																						params : {
																							itemName : "户籍性质"
																						},
																						success : function(f) {
																							var e =  Ext.util.JSON.decode(f.responseText);
																							c.loadData(e);
																						}
																					});
																				}
																			}
																		}
																	},
																	{
																		fieldLabel : "户口所在地",
																		name : "empProfile.birthPlace",
																		id : "empProfileForm.birthPlace"
																	} ,
																	{
																		fieldLabel : "转正日期",
																		name : "empProfile.positiveTime",
																		xtype : "datefield",
																		format : "Y-m-d",
																		id : "empProfileForm.positiveTime",
																		listeners : {
																			change : function(field, newValue, oldValue ) {
																				Ext.getCmp("empProfileForm.realPositiveTime").setValue(newValue);
																				
																			}
																		}
																	},
																	{
																		fieldLabel : "实际转正日期",
																		name : "empProfile.realPositiveTime",
																		xtype : "datefield",
																		format : "Y-m-d",
																		readOnly: true,
																		id : "empProfileForm.realPositiveTime"
																	},
																	{
																		fieldLabel : "PBC签署日期",
																		name : "empProfile.pbcSingedDate",
																		id : "empProfileForm.pbcSingedDate",
																		xtype : "datefield",
																		format : "Y-m-d"
																	},
																	{
																		fieldLabel : "PBC执行日期",
																		name : "empProfile.pbcExecuteDate",
																		id : "empProfileForm.pbcExecuteDate",
																		xtype : "datefield",
																		format : "Y-m-d"
																	},
																	{
																		fieldLabel : "是否办理离职手续",
																		name : "empProfile.isDepartFiled",
																		id : "empProfileForm.isDepartFiled",
																		xtype : "checkbox",
																		inputValue : 1
																	},
																	{
																		fieldLabel : "是否接受入职培训",
																		name : "empProfile.isOrientation",
																		id : "empProfileForm.isOrientation",
																		xtype : "checkbox",
																		inputValue : 1
																	},
																	{
																		fieldLabel : "签订无固定期限",
																		name : "empProfile.isOpenEnded",
																		id : "empProfileForm.isOpenEnded",
																		xtype : "checkbox",
																		inputValue : 1
																	},
																	{
																		xtype : "container",
																		height : 26,
																		layout : "column",
																		anchor : "100%",
																		items : [
																				{
																					fieldLabel : "初试人ID",
																					name : "empProfile.firstTryUserId",
																					xtype : "hidden",
																					id : "empProfileForm.firstTryUserId"
																				},
																				{
																					xtype : "label",
																					style : "padding:3px 5px 0px 0px;width:100px;",
																					text : "初试人:"
																				},
																				{
																					width : 150,
																					xtype : "textfield",
																					name : "empProfile.firstTryUser",
																					id : "empProfileForm.firstTryUser",
																					readOnly : true
																				},
																				{
																					xtype : "button",
																					id : "firstTryUserSelector",
																					text : "选择员工",
																					iconCls : "btn-mail_recipient",
																					handler : function() {
																						UserSelector
																								.getView(
																										function(
																												d,
																												c) {
																											Ext
																													.getCmp(
																															"empProfileForm.firstTryUser")
																													.setValue(
																															c);
																											Ext
																													.getCmp(
																															"empProfileForm.firstTryUserId")
																													.setValue(
																															d);
																											Ext.Ajax
																													.request({
																														url : __ctxPath
																																+ "/system/getAppUser.do",
																														params : {
																															userId : d
																														},
																														method : "post",
																														success : function(
																																f) {
																															var e = Ext.util.JSON
																																	.decode(f.responseText).data[0];
																															Ext
																																	.getCmp(
																																			"empProfileForm.depId")
																																	.setValue(
																																			e.department.depId);
																															Ext
																																	.getCmp(
																																			"empProfile.depName")
																																	.setValue(
																																			e.department.depName);
																														}
																													});
																										},
																										true)
																								.show();
																					}
																				} ]
																	},
																	{
																		xtype : "container",
																		height : 26,
																		layout : "column",
																		anchor : "100%",
																		items : [
																				{
																					fieldLabel : "复试人ID",
																					name : "empProfile.secondTryUserId",
																					xtype : "hidden",
																					id : "empProfileForm.secondTryUserId"
																				},
																				{
																					xtype : "label",
																					style : "padding:3px 5px 0px 0px;width:100px;",
																					text : "复试人:"
																				},
																				{
																					width : 150,
																					xtype : "textfield",
																					name : "empProfile.secondTryUser",
																					id : "empProfileForm.secondTryUser",
																					readOnly : true
																				},
																				{
																					xtype : "button",
																					id : "secondTryUserSelector",
																					text : "选择员工",
																					iconCls : "btn-mail_recipient",
																					handler : function() {
																						UserSelector
																								.getView(
																										function(
																												d,
																												c) {
																											Ext
																													.getCmp(
																															"empProfileForm.secondTryUser")
																													.setValue(
																															c);
																											Ext
																													.getCmp(
																															"empProfileForm.secondTryUserId")
																													.setValue(
																															d);
																											Ext.Ajax
																													.request({
																														url : __ctxPath
																																+ "/system/getAppUser.do",
																														params : {
																															userId : d
																														},
																														method : "post",
																														success : function(
																																f) {
																															var e = Ext.util.JSON
																																	.decode(f.responseText).data[0];
																															Ext
																																	.getCmp(
																																			"empProfileForm.depId")
																																	.setValue(
																																			e.department.depId);
																															Ext
																																	.getCmp(
																																			"empProfile.depName")
																																	.setValue(
																																			e.department.depName);
																														}
																													});
																										},
																										true)
																								.show();
																					}
																				} ]
																	}]
														},
														{
															xtype : "container",
															columnWidth : 0.26,
															layout : "column",
															items : [
																	{
																		xtype : "label",
																		text : "个人相片:",
																		style : "padding-left:0px;"
																	},
																	{
																		xtype : "container",
																		layout : "form",
																		width : 100,
																		items : [
																				{
																					id : "ProfilePhotoPanel",
																					height : 120,
																					width : 88,
																					xtype : "panel",
																					border : true,
																					html : '<img src="'
																							+ __ctxPath
																							+ '/images/default_person.gif" width="88" height="120"/>'
																				},
																				{
																					xtype : "button",
																					style : "padding-top:3px;",
																					iconCls : "btn-upload",
																					text : "上传照片",
																					handler : function() {
																						var d = Ext
																								.getCmp("empProfileForm.photo");
																						var e = App
																								.createUploadDialog({
																									file_cat : "hrm/profile",
																									callback : function c(
																											h) {
																										var g = Ext
																												.getCmp("empProfileForm.photo");
																										var i = Ext
																												.getCmp("ProfilePhotoPanel");
																										g
																												.setValue(h[0].filepath);
																										i.body
																												.update('<img src="'
																														+ ""
																														+ h[0].filepath
																														+ '"  width="88" height="120"/>');
																									},
																									permitted_extensions : [
																											"jpg",
																											"png" ]
																								});
																						if (d
																								.getValue() != ""
																								&& d
																										.getValue() != null
																								&& d
																										.getValue() != "undefined") {
																							var f = "再次上传需要先删除原有图片,";
																							Ext.Msg
																									.confirm(
																											"信息确认",
																											f
																													+ "是否删除？",
																											function(
																													g) {
																												if (g == "yes") {
																													var h = Ext
																															.getCmp(
																																	"empProfileForm.profileId")
																															.getValue();
																													Ext.Ajax
																															.request({
																																url : __ctxPath
																																		+ "/hrm/delphotoEmpProfile.do",
																																method : "post",
																																params : {
																																	profileId : h
																																},
																																success : function() {
																																	var i = d.value;
																																	Ext
																																			.getCmp(
																																					"empProfileForm.photo")
																																			.setValue(
																																					"");
																																	Ext
																																			.getCmp("ProfilePhotoPanel").body
																																			.update('<img src="'
																																					+ __ctxPath
																																					+ '/images/default_person.gif" width="88" height="120"/>');
																																	Ext.Ajax
																																			.request({
																																				url : __ctxPath
																																						+ "/system/deleteFileAttach.do",
																																				method : "post",
																																				params : {
																																					filePath : i
																																				},
																																				success : function() {
																																					e
																																							.show("queryBtn");
																																				}
																																			});
																																}
																															});
																												}
																											});
																						} else {
																							e
																									.show("queryBtn");
																						}
																					}
																				} ]
																	} ]
														} ]
											},
											{
												xtype : "fieldset",
												id : "salaryInfo",
												title : "职务薪酬信息",
												defaultType : "textfield",
												layout : "column",
												items : [
														{
															xtype : "container",
															columnWidth : 0.5,
															defaultType : "textfield",
															layout : "form",
															defaults : {
																anchor : "100%,100%"
															},
															items : [
																	b,
																	{
																		fieldLabel : "职称",
																		name : "empProfile.designation",
																		id : "empProfileForm.designation"
																	},
																	{
																		fieldLabel : "开户银行",
																		name : "empProfile.openBank",
																		id : "empProfileForm.openBank",
																		value : "招商银行"
																	},
																	{
																		fieldLabel : "银行账号",
																		name : "empProfile.bankNo",
																		id : "empProfileForm.bankNo"
																	},
																	{
																		fieldLabel : "基本工资",
																		name : "empProfile.baseMoney",
																		id : "empProfileForm.baseMoney",
																		readOnly : true,
																		xtype:"numberfield"
																	},
																	{
																		fieldLabel : "年度总薪酬",
																		name : "empProfile.yearTotalMoney",
																		id : "empProfileForm.yearTotalMoney",
																		readOnly : true,
																		xtype:"numberfield"
																	},
																	{
																		fieldLabel : "试用期固定工资",
																		name : "empProfile.baseMoneyTmp",
																		id : "empProfileForm.baseMoneyTmp",
																		readOnly : true,
																		xtype:"numberfield"
																	},
																	{
																		fieldLabel : "社会保险金额",
																		name : "empProfile.insurance",
																		id : "empProfileForm.insurance",
																		xtype:"numberfield"
																	},
																	{
																		fieldLabel : "公积金金额",
																		name : "empProfile.provident",
																		id : "empProfileForm.provident",
																		xtype:"numberfield"
																	} ]
														},
														{
															xtype : "container",
															columnWidth : 0.5,
															defaultType : "textfield",
															layout : "form",
															defaults : {
																anchor : "100%,100%"
															},
															items : [
																	{
																		fieldLabel : "岗位",
																		name : "empProfile.position",
																		id : "empProfileForm.position",
																		xtype : "combo",
																		mode : "local",
																		//allowBlank : false,
																		editable : false,
																		valueField : "jobName",
																		displayField : "jobName",
																		triggerAction : "all",
																		store : new Ext.data.SimpleStore(
																				{
																					url : __ctxPath
																							+ "/hrm/comboJob.do",
																					fields : [
																							"jobId",
																							"jobName" ]
																				}),
																		listeners : {
																			focus : function(
																					d) {
																				var c = Ext
																						.getCmp(
																								"empProfileForm.depId")
																						.getValue();
																				if (c != null
																						&& c != ""
																						&& c != "undefined") {
																					Ext
																							.getCmp(
																									"empProfileForm.position")
																							.getStore()
																							.reload(
																									{
																										params : {
																											depId : c
																										}
																									});
																				} else {
																					Ext.ux.Toast
																							.msg(
																									"操作信息",
																									"请先选择部门！");
																				}
																			},
																			select : function(
																					e,
																					c,
																					d) {
																				Ext
																						.getCmp(
																								"empProfileForm.jobId")
																						.setValue(
																								c.data.jobId);
																				
																				var d = Ext
																					.getCmp("empProfileForm.standardName");
																				d.getStore().removeAll();
																				d.reset();
																			}
																		}
																	},
																	{
																		fieldLabel : "薪酬标准单名称",
																		name : "empProfile.standardName",
																		id : "empProfileForm.standardName",
																		xtype : "combo",
																		mode : "local",
																		//allowBlank : false,
																		editable : false,
																		valueField : "standardName",
																		displayField : "standardName",
																		triggerAction : "all",
																		store : new Ext.data.JsonStore(
																				{
																					url : __ctxPath
																							+ "/hrm/comboSalaryJobSalaryRelation.do",
																					fields : [
																							{
																								name : "standardId",
																								type : "int"
																							},
																							"standardNo",
																							"standardName",
																							"totalMoney",
																							"setdownTime",
																							"perCoefficient",
																							"yearTotalMoney",
																							"baseMoney",
																							"status" ]
																				}),
																		listeners : {
																			focus : function() {
																				var jobId = Ext.getCmp("empProfileForm.jobId").getValue();
																				if(jobId==null || jobId==undefined || jobId==0){
																					Ext.ux.Toast.msg("操作信息",
																					"请选择岗位！");
																				}else{
																					Ext.getCmp("empProfileForm.standardName")
																						.getStore()
																						.reload({
																							params : {
																								'Q_job.jobId_L_EQ' : jobId,
																								'Q_deleteFlag_N_EQ' : 0
																							}
																						});
																				}
																				
																			},
																			select : function(
																					e,
																					c,
																					d) {
																				Ext.getCmp("empProfileForm.standardId")
																						.setValue(c.data.standardId);
																				Ext.getCmp("empProfileForm.standardMiNo")
																						.setValue(c.data.standardNo);
																				Ext.getCmp("empProfileForm.standardMoney")
																						.setValue(c.data.totalMoney);
																				Ext.getCmp("empProfileForm.perCoefficient")
																					.setValue(c.data.perCoefficient);
																				
																				try{
																					//年度总薪酬
																					Ext.getCmp("empProfileForm.yearTotalMoney").setValue(c.data.yearTotalMoney);
																					//基本工资
																					Ext.getCmp("empProfileForm.baseMoney").setValue(c.data.baseMoney);
																					//试用期工资
																					Ext.getCmp("empProfileForm.standardMoneyTmp").setValue(Math.round(c.data.totalMoney*0.8));
																					//试用期固定工资
																					Ext.getCmp("empProfileForm.baseMoneyTmp").setValue(Math.round(c.data.baseMoney*0.8));
																					//试用期绩效基数
																					Ext.getCmp("empProfileForm.perCoefficientTmp").setValue(Math.round(c.data.perCoefficient*0.8));
																				}catch(err){
																					
																				}
																				
																			},
																			beforeload : function(store, options){
																				if(jobId==null || jobId==undefined || jobId==0){
																					return false;
																				}
																			}
																		}
																	},
																	{
																		fieldLabel : "薪酬标准编号",
																		name : "empProfile.standardMiNo",
																		id : "empProfileForm.standardMiNo",
																		readOnly : true
																	},
																	{
																		fieldLabel : "月度薪资总额",
																		name : "empProfile.standardMoney",
																		id : "empProfileForm.standardMoney",
																		readOnly : true
																	},
																	{
																		fieldLabel : "绩效基数",
																		name : "empProfile.perCoefficient",
																		id : "empProfileForm.perCoefficient",
																		xtype:"numberfield"
																	},
																	{
																		fieldLabel : "试用期工资",
																		name : "empProfile.standardMoneyTmp",
																		id : "empProfileForm.standardMoneyTmp",
																		readOnly : true,
																		xtype:"numberfield"
																	},
																	{
																		fieldLabel : "试用期绩效基数",
																		name : "empProfile.perCoefficientTmp",
																		id : "empProfileForm.perCoefficientTmp",
																		readOnly : true,
																		xtype:"numberfield"
																	},
																	{
																		fieldLabel : "社会保险起缴日期",
																		name : "empProfile.providentDate",
																		id : "empProfileForm.providentDate",
																		xtype : "datefield",
																		format : "Y-m-d"
																	}]
														},
														{
															xtype : "container",
															columnWidth : 1,
															defaultType : "textfield",
															layout : "form",
															defaults : {
																anchor : "100%,100%"
															},
															items : [ {
																fieldLabel : "异动情况",
																name : "empProfile.trainingCase",
																xtype : "textarea",
																id : "empProfileForm.trainingCase"
															} ]
														} ]
											},
											{
												xtype : "fieldset",
												title : "联系方式",
												defaultType : "textfield",
												layout : "column",
												items : [
														{
															xtype : "container",
															columnWidth : 0.5,
															defaultType : "textfield",
															layout : "form",
															defaults : {
																anchor : "100%,100%"
															},
															items : [
																	{
																		fieldLabel : "家庭地址",
																		name : "empProfile.address",
																		id : "empProfileForm.address"
																	},
																	{
																		fieldLabel : "家庭邮编",
																		name : "empProfile.homeZip",
																		id : "empProfileForm.homeZip"
																	},
																	{
																		fieldLabel : "手机号码",
																		name : "empProfile.mobile",
																		id : "empProfileForm.mobile"
																	} ]
														},
														{
															xtype : "container",
															columnWidth : 0.5,
															defaultType : "textfield",
															layout : "form",
															defaults : {
																anchor : "100%,100%"
															},
															items : [
																	{
																		fieldLabel : "电话号码",
																		name : "empProfile.phone",
																		id : "empProfileForm.phone"
																	},
																	{
																		fieldLabel : "QQ号码",
																		name : "empProfile.qq",
																		id : "empProfileForm.qq"
																	},
																	{
																		fieldLabel : "电子邮箱",
																		name : "empProfile.email",
																		id : "empProfileForm.email",
																		vtype : "email",
																		vtypeText : "邮箱格式不正确!"
																	} ]
														} ]
											},
											{
												xtype : "fieldset",
												title : "教育情况",
												defaultType : "textfield",
												layout : "column",
												items : [
														{
															xtype : "container",
															columnWidth : 0.5,
															defaultType : "textfield",
															layout : "form",
															defaults : {
																anchor : "100%,100%"
															},
															items : [
																	{
																		fieldLabel : "学历",
																		name : "empProfile.eduDegree",
																		id : "empProfileForm.eduDegree",
																		maxHeight : 200,
																		xtype : "combo",
																		mode : "local",
																		editable : true,
																		triggerAction : "all",
																		store : [],
																		listeners : {
																			focus : function(
																					d) {
																				var c = Ext
																						.getCmp(
																								"empProfileForm.eduDegree")
																						.getStore();
																				if (c
																						.getCount() <= 0) {
																					Ext.Ajax
																							.request({
																								url : __ctxPath
																										+ "/system/loadDictionary.do",
																								method : "post",
																								params : {
																									itemName : "学历"
																								},
																								success : function(
																										f) {
																									var e = Ext.util.JSON
																											.decode(f.responseText);
																									c
																											.loadData(e);
																								}
																							});
																				}
																			}
																		}
																	},
																	{
																		fieldLabel : "专业",
																		name : "empProfile.eduMajor",
																		id : "empProfileForm.eduMajor",
																		maxHeight : 200,
																		xtype : "combo",
																		mode : "local",
																		editable : true,
																		triggerAction : "all",
																		store : [],
																		listeners : {
																			focus : function(
																					d) {
																				var c = Ext
																						.getCmp(
																								"empProfileForm.eduMajor")
																						.getStore();
																				if (c
																						.getCount() <= 0) {
																					Ext.Ajax
																							.request({
																								url : __ctxPath
																										+ "/system/loadDictionary.do",
																								method : "post",
																								params : {
																									itemName : "专业"
																								},
																								success : function(
																										f) {
																									var e = Ext.util.JSON
																											.decode(f.responseText);
																									c
																											.loadData(e);
																								}
																							});
																				}
																			}
																		}
																	} ]
														},
														{
															xtype : "container",
															columnWidth : 0.5,
															defaultType : "textfield",
															layout : "form",
															defaults : {
																anchor : "100%,100%"
															},
															items : [
																	{
																		fieldLabel : "毕业院校",
																		name : "empProfile.eduCollege",
																		id : "empProfileForm.eduCollege"
																	},
																	{
																		fieldLabel : "参加工作时间",
																		name : "empProfile.startWorkDate",
																		id : "empProfileForm.startWorkDate",
																		xtype : "datefield",
																		format : "Y-m-d"
																	} ]
														}]
											},
											{
												xtype : "fieldset",
												title : "合同签订记录",
												layout : "anchor",
												items : [ {
													fieldLabel : "合同签订记录",
													name : "empProfile.contractRenewalRecord",
													xtype : "textarea",
													id : "empProfileForm.contractRenewalRecord",
													anchor : "100%"
												} ]
											},
											{
												xtype : "fieldset",
												title : "奖惩情况",
												layout : "anchor",
												items : [ {
													fieldLabel : "奖惩情况",
													name : "empProfile.awardPunishCase",
													xtype : "textarea",
													id : "empProfileForm.awardPunishCase",
													anchor : "100%"
												} ]
											},
											{
												xtype : "fieldset",
												title : "工作经历",
												layout : "anchor",
												items : [ {
													fieldLabel : "工作经历",
													name : "empProfile.workCase",
													xtype : "textarea",
													anchor : "100%",
													id : "empProfileForm.workCase"
												} ]
											},
											{
												xtype : "fieldset",
												title : "培训记录",
												layout : "anchor",
												items : [ {
													fieldLabel : "培训记录",
													name : "empProfile.practiceRecord",
													anchor : "100%",
													id : "empProfileForm.practiceRecord",
													xtype : "textarea"
												} ]
											},
											{
												xtype : "fieldset",
												title : "离职原因",
												layout : "anchor",
												items : [ {
													fieldLabel : "离职原因",
													name : "empProfile.leaveReason",
													anchor : "100%",
													id : "empProfileForm.leaveReason",
													xtype : "textarea"
												} ]
											},
											{
												xtype : "fieldset",
												title : "备注",
												layout : "anchor",
												items : [ {
													fieldLabel : "备注",
													name : "empProfile.memo",
													anchor : "100%",
													id : "empProfileForm.memo",
													xtype : "textarea"
												} ]
											} ]
								});
						
						this.topbar = new Ext.Toolbar({
							height : 30,
							bodyStyle : "text-align:left",
							defaultType : "button",
							items : [
									{
										text : "保存",
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
						if (this.profileId != null
								&& this.profileId != "undefined") {
							this.formPanel
									.getForm()
									.load(
											{
												deferredRender : false,
												url : __ctxPath
														+ "/hrm/getEmpProfile.do?profileId="
														+ this.profileId,
												waitMsg : "正在载入数据...",
												success : function(g, h) {
													var e = Ext.util.JSON
															.decode(h.response.responseText).data[0];
													var d = e.photo;
													//add get empType info logic on 2011-10-11 begin
													if (e.empType != ""
														&& e.empType != null
														&& e.empType != "undefined") {
														Ext.getCmp("empProfileForm.empType.id").setValue(e.empType.id);
														Ext.getCmp("empProfileForm.empType.id").setRawValue(e.empType.name);
													}
													//add get empType info logic on 2011-10-11 end
													if (e.startWorkDate != ""
															&& e.startWorkDate != null
															&& e.startWorkDate != "undefined") {
														var c = getDateFromFormat(
																e.startWorkDate,
																"yyyy-MM-dd HH:mm:ss");
														Ext
																.getCmp(
																		"empProfileForm.startWorkDate")
																.setValue(
																		new Date(
																				c));
													}		
														Ext.getCmp("empProfileForm.organizationid")
																.setValue(e.organization);
													
													if (e.birthday != ""
															&& e.birthday != null
															&& e.birthday != "undefined") {
														var f = getDateFromFormat(
																e.birthday,
																"yyyy-MM-dd HH:mm:ss");
														Ext
																.getCmp(
																		"empProfileForm.birthday")
																.setValue(
																		new Date(
																				f));
													}
													if (e.accessionTime != ""
														&& e.accessionTime != null
														&& e.accessionTime != "undefined") {
														var f = getDateFromFormat(
																e.accessionTime,
																"yyyy-MM-dd HH:mm:ss");
														Ext
																.getCmp(
																		"empProfileForm.accessionTime")
																.setValue(
																		new Date(
																				f));
													}
													if (e.departureTime != ""
														&& e.departureTime != null
														&& e.departureTime != "undefined") {
														var f = getDateFromFormat(
																e.departureTime,
														"yyyy-MM-dd HH:mm:ss");
														Ext
														.getCmp(
																"empProfileForm.departureTime")
																.setValue(
																		new Date(
																				f));
													}
													
													if (e.positiveTime != ""
														&& e.positiveTime != null
														&& e.positiveTime != "undefined") {
														var f = getDateFromFormat(
																e.positiveTime,
														"yyyy-MM-dd HH:mm:ss");
														Ext
														.getCmp(
																"empProfileForm.positiveTime")
																.setValue(
																		new Date(
																				f));
													}
													
													if (e.realPositiveTime != ""
														&& e.realPositiveTime != null
														&& e.realPositiveTime != "undefined") {
														Ext
														.getCmp(
														"empProfileForm.realPositiveTime")
														.setValue(
																new Date(
																		e.realPositiveTime));
													}
													if (e.contractBeginDate != ""
														&& e.contractBeginDate != null
														&& e.contractBeginDate != "undefined") {
														var f = getDateFromFormat(
																e.contractBeginDate,
														"yyyy-MM-dd HH:mm:ss");
														Ext
														.getCmp(
														"empProfileForm.contractBeginDate")
														.setValue(
																new Date(
																		f));
													}
													if (e.contractEndDate != ""
														&& e.contractEndDate != null
														&& e.contractEndDate != "undefined") {
														var f = getDateFromFormat(
																e.contractEndDate,
														"yyyy-MM-dd HH:mm:ss");
														Ext
														.getCmp(
														"empProfileForm.contractEndDate")
														.setValue(
																new Date(
																		f));
													}
													
													if (e.providentDate != ""
														&& e.providentDate != null
														&& e.providentDate != "undefined") {
														var f = getDateFromFormat(
																e.providentDate,
														"yyyy-MM-dd HH:mm:ss");
														Ext
														.getCmp(
														"empProfileForm.providentDate")
														.setValue(
																new Date(
																		f));
													}
													
													if (e.pbcSingedDate != ""
														&& e.pbcSingedDate != null
														&& e.pbcSingedDate != "undefined") {
														var f = getDateFromFormat(
																e.pbcSingedDate,
														"yyyy-MM-dd HH:mm:ss");
														Ext
														.getCmp(
														"empProfileForm.pbcSingedDate")
														.setValue(
																new Date(
																		f));
													}
													
													if (e.pbcExecuteDate != ""
														&& e.pbcExecuteDate != null
														&& e.pbcExecuteDate != "undefined") {
														var f = getDateFromFormat(
																e.pbcExecuteDate,
														"yyyy-MM-dd HH:mm:ss");
														Ext
														.getCmp(
														"empProfileForm.pbcExecuteDate")
														.setValue(
																new Date(
																		f));
													}
													
													if (d != null && d != "") {
														Ext
																.getCmp("ProfilePhotoPanel").body
																.update('<img src="'
																		+ ""
																		+ d
																		+ '" width="88" height="120"/>');
													}
													if (e.renewalBeginDate != ""
														&& e.renewalBeginDate != null
														&& e.renewalBeginDate != "undefined") {
														var f = getDateFromFormat(
																e.renewalBeginDate,
														"yyyy-MM-dd HH:mm:ss");
														Ext
														.getCmp(
														"empProfileForm.renewalBeginDate")
														.setValue(
																new Date(
																		f));
													}
													if (e.renewalEndDate != ""
														&& e.renewalEndDate != null
														&& e.renewalEndDate != "undefined") {
														var f = getDateFromFormat(
																e.renewalEndDate,
														"yyyy-MM-dd HH:mm:ss");
														Ext
														.getCmp(
														"empProfileForm.renewalEndDate")
														.setValue(
																new Date(
																		f));
													}
													if (e.seRenewalBeginDate != ""
														&& e.seRenewalBeginDate != null
														&& e.seRenewalBeginDate != "undefined") {
														var f = getDateFromFormat(
																e.seRenewalBeginDate,
														"yyyy-MM-dd HH:mm:ss");
														Ext
														.getCmp(
														"empProfileForm.seRenewalBeginDate")
														.setValue(
																new Date(
																		f));
													}
													if (e.seRenewalEndDate != ""
														&& e.seRenewalEndDate != null
														&& e.seRenewalEndDate != "undefined") {
														var f = getDateFromFormat(
																e.seRenewalEndDate,
														"yyyy-MM-dd HH:mm:ss");
														Ext
														.getCmp(
														"empProfileForm.seRenewalEndDate")
														.setValue(
																new Date(
																		f));
													}
													Ext
															.getCmp(
																	"empProfile.depName")
															.setValue(e.depName);
													Ext
															.getCmp(
																	"EmpProfileSystemSetting")
															.hide();
													Ext
															.getCmp(
																	"empProfileForm.profileNo")
															.getEl().dom.readOnly = true;
													Ext
															.getCmp(
																	"EmpProfileSelectEmp")
															.hide();
													//add by awen for get standSalary info by ajax on 2011-10-11 begin
													
													Ext.Ajax.request({
														url : __ctxPath + "/hrm/getStandSalary.do?standardId=" + e.standSalary.standardId,
														success : function (d, e) {
															var data = Ext.decode(d.responseText);
															var standSalary = data.data[0];
															try{
																//年度总薪酬
																Ext.getCmp("empProfileForm.yearTotalMoney").setValue(standSalary.yearTotalMoney);
																//基本工资
																Ext.getCmp("empProfileForm.baseMoney").setValue(standSalary.baseMoney);
																//试用期工资
																Ext.getCmp("empProfileForm.standardMoneyTmp").setValue(Math.round(standSalary.totalMoney*0.8));
																//试用期固定工资
																Ext.getCmp("empProfileForm.baseMoneyTmp").setValue(Math.round(standSalary.baseMoney*0.8));
																//试用期绩效基数
																Ext.getCmp("empProfileForm.perCoefficientTmp").setValue(Math.round(standSalary.perCoefficient*0.8));
															}catch(err){
																
															}
															
														},
														failure : function (d, e) {}
														
													});
													
													//add by awen for get standSalary info by ajax on 2011-10-11 end
													
													//add by guanshiqiang at 2012-06-18 begin
													if(e.censusRegisterType != null && e.censusRegisterType != "") {
														Ext.getCmp("empProfileForm.censusRegisterType").setRawValue(e.censusRegisterType);
													}
													//add by guanshiqiang at 2012-06-18 end
												},
												failure : function(c, d) {
												}
											});
						}
						//add by guanshiqiang for 编辑档案时薪酬信息权限的添加 at 2012-03-19 begin
						if(!isGranted("_EmpProfileEditSalary")) {
							Ext.getCmp("salaryInfo").hide();
						}
						//add by guanshiqiang for 编辑档案时薪酬信息权限的添加 at 2012-03-19 end
					},
					reset : function(a) {
						a.getForm().reset();
					},
					cancel : function(a) {
						var b = Ext.getCmp("centerTabPanel");
						if (a != null) {
							b.remove("EmpProfileForm");
						}
					},
					save : function(a, b) {
						if (a.getForm().isValid()) {
							a
									.getForm()
									.submit(
											{
												method : "POST",
												waitMsg : "正在提交数据...",
												success : function(c, e) {
													Ext.ux.Toast.msg("操作信息",
															"成功保存信息！");
													var d = Ext
															.getCmp("EmpProfileGrid");
													if (d != null) {
														d.getStore().reload();
														AppUtil
																.removeTab("EmpProfileForm");
													}
												},
												failure : function(c, d) {
													Ext.MessageBox
															.show({
																title : "操作信息",
																msg : d.result.msg,
																buttons : Ext.MessageBox.OK,
																icon : Ext.MessageBox.ERROR
															});
													Ext
															.getCmp(
																	"empProfileForm.profileNo")
															.setValue("");
												}
											});
						}
					}
				});