PageTemplates = Ext.extend(Ext.Panel, {
	id : "PageTemplates",
	layout : 'table',
	height : 'auto',
	align : 'center',
	foredit : true,
	width : 1050,
	frame : true,
	autoScroll : true,
	defaults : {
		bodyStyle : 'padding:4px'
	},
	layoutConfig : {
		columns : 1
	},
	getTabpanel : function(tab, tabTitle) {
		this.tabPanel = new Ext.TabPanel({
			xtype : 'tabpanel',
			activeTab :0,
			enableTabScroll : true,
			title : tabTitle,
			deferredRender : false,
			frame : true,
			plain : true,
			border : true,
			baseCls : 'x-plain',// 是否设置和背景色同步
			width : 800,
			defaults : {
				autoHeight : true,
				bodyStyle : 'padding:2px'
			},
			items : tab,
			tbar : [new Ext.Toolbar.TextItem('<font color=red>提示：</font><font color=blue>审批时要严格授权，如果单据审核不通过，请点击页面下方的“审批”按钮,在弹出的窗口中填写审批意见,选择拒绝单选框!</font>')]
			
		});
		return this.tabPanel;

	},

	getFormpanel_PersonAccountApply_Input : function() {
		var curscid = this.serviceItemId;
		var pName = this.processName;
		var processType = this.processType;
		var processInfoId = this.serviceItemProcess;
		this.formpanel_PersonAccountApply_Input = new Ext.form.FormPanel({
			id : 'panel_PersonAccountApply_Input',
			layout : 'column',
			height : 'auto',
			width : 800,
			frame : true,
			//collapsible : true,
			defaults : {
				bodyStyle : 'padding:4px'
			},
			reader : new Ext.data.JsonReader({
				root : 'form',
				successProperty : 'success'
			}, [{
				name : 'AccountApplyMainTable$signAuditUser',
				mapping : 'AccountApplyMainTable$signAuditUser'
			}, {
				name : 'AccountApplyMainTable$mail',
				mapping : 'AccountApplyMainTable$mail'
			}, {
				name : 'AccountApplyMainTable$createUser',
				mapping : 'AccountApplyMainTable$createUser'
			}, {
				name : 'AccountApplyMainTable$createDate',
				mapping : 'AccountApplyMainTable$createDate'
			}, {
				name : 'AccountApplyMainTable$modifyUser',
				mapping : 'AccountApplyMainTable$modifyUser'
			}, {
				name : 'AccountApplyMainTable$modifyDate',
				mapping : 'AccountApplyMainTable$modifyDate'
			}, {
				name : 'AccountApplyMainTable$id',
				mapping : 'AccountApplyMainTable$id'
			}, {
				name : 'AccountApplyMainTable$name',
				mapping : 'AccountApplyMainTable$name'
			}, {
				name : 'AccountApplyMainTable$oldApply',
				mapping : 'AccountApplyMainTable$oldApply'
			}, {
				name : 'AccountApplyMainTable$processType',
				mapping : 'AccountApplyMainTable$processType'
			}, {
				name : 'AccountApplyMainTable$status',
				mapping : 'AccountApplyMainTable$status'
			}, {
				name : 'AccountApplyMainTable$deleteFlag',
				mapping : 'AccountApplyMainTable$deleteFlag'
			}, {
				name : 'AccountApplyMainTable$serviceItem',
				mapping : 'AccountApplyMainTable$serviceItem'
			}, {
				name : 'AccountApplyMainTable$applyDate',
				mapping : 'AccountApplyMainTable$applyDate'
			}, {
				name : 'AccountApplyMainTable$applyUser',
				mapping : 'AccountApplyMainTable$applyUser'
			}, {
				name : 'AccountApplyMainTable$delegateApplyUser',
				mapping : 'AccountApplyMainTable$delegateApplyUser'
			}, {
				name : 'AccountApplyMainTable$applyUserTel',
				mapping : 'AccountApplyMainTable$applyUserTel'
			}, {
				name : 'AccountApplyMainTable$delegateApplyTel',
				mapping : 'AccountApplyMainTable$delegateApplyTel'
			}, {
				name : 'AccountApplyMainTable$attachment',
				mapping : 'AccountApplyMainTable$attachment'
			}, {
				name : 'AccountApplyMainTable$confirmUser',
				mapping : 'AccountApplyMainTable$confirmUser'
			}, {
				name : 'itil_ac_PersonFormalAccount$stationNumber',
				mapping : 'itil_ac_PersonFormalAccount$stationNumber'
			}, {
				name : 'itil_ac_PersonFormalAccount$yearMoney',
				mapping : 'itil_ac_PersonFormalAccount$yearMoney'
			}, {
				name : 'itil_ac_PersonFormalAccount$telephoneType',
				mapping : 'itil_ac_PersonFormalAccount$telephoneType'
			}, {
				name : 'itil_ac_PersonFormalAccount$telephoneNumber',
				mapping : 'itil_ac_PersonFormalAccount$telephoneNumber'
			}, {
				name : 'itil_ac_PersonFormalAccount$ifSysn',
				mapping : 'itil_ac_PersonFormalAccount$ifSysn'
			}, {
				name : 'itil_ac_PersonFormalAccount$cardState',
				mapping : 'itil_ac_PersonFormalAccount$cardState'
			}, {
				name : 'itil_ac_PersonFormalAccount$olodApplyAccount',
				mapping : 'itil_ac_PersonFormalAccount$olodApplyAccount'
			}, {
				name : 'itil_ac_PersonFormalAccount$department',
				mapping : 'itil_ac_PersonFormalAccount$department'
			}, {
				name : 'itil_ac_PersonFormalAccount$costCenterCode',
				mapping : 'itil_ac_PersonFormalAccount$costCenterCode'
			}, {
				name : 'itil_ac_PersonFormalAccount$applyId',
				mapping : 'itil_ac_PersonFormalAccount$applyId'
			}, {
				name : 'itil_ac_PersonFormalAccount$beyondMoney',
				mapping : 'itil_ac_PersonFormalAccount$beyondMoney'
			}, {
				name : 'itil_ac_PersonFormalAccount$sameMailDept',
				mapping : 'itil_ac_PersonFormalAccount$sameMailDept'
			}, {
				name : 'itil_ac_PersonFormalAccount$id',
				mapping : 'itil_ac_PersonFormalAccount$id'
			}, {
				name : 'itil_ac_PersonFormalAccount$accountName',
				mapping : 'itil_ac_PersonFormalAccount$accountName'
			}, {
				name : 'itil_ac_PersonFormalAccount$password',
				mapping : 'itil_ac_PersonFormalAccount$password'
			}, {
				name : 'itil_ac_PersonFormalAccount$accountType',
				mapping : 'itil_ac_PersonFormalAccount$accountType'
			}, {
				name : 'itil_ac_PersonFormalAccount$accountowner',
				mapping : 'itil_ac_PersonFormalAccount$accountowner'
			}, {
				name : 'itil_ac_PersonFormalAccount$accountState',
				mapping : 'itil_ac_PersonFormalAccount$accountState'
			}, {
				name : 'itil_ac_PersonFormalAccount$createDate',
				mapping : 'itil_ac_PersonFormalAccount$createDate'
			}, {
				name : 'itil_ac_PersonFormalAccount$registerServiceRightDesc',
				mapping : 'itil_ac_PersonFormalAccount$registerServiceRightDesc'
			}, {
				name : 'itil_ac_PersonFormalAccount$sameRightAccount',
				mapping : 'itil_ac_PersonFormalAccount$sameRightAccount'
			}, {
				name : 'itil_ac_PersonFormalAccount$rightsDesc',
				mapping : 'itil_ac_PersonFormalAccount$rightsDesc'
			}, {
				name : 'itil_ac_PersonFormalAccount$remarkDesc',
				mapping : 'itil_ac_PersonFormalAccount$remarkDesc'
			}, {
				name : 'itil_ac_PersonFormalAccount$attachment',
				mapping : 'itil_ac_PersonFormalAccount$attachment'
			}, {
				name : 'itil_ac_PersonFormalAccount$applyReason',
				mapping : 'itil_ac_PersonFormalAccount$applyReason'
			}, {
				name : 'itil_ac_PersonFormalAccount$confirmUser',
				mapping : 'itil_ac_PersonFormalAccount$confirmUser'
			}, {
				name : 'itil_ac_PersonFormalAccount$mailValue',
				mapping : 'itil_ac_PersonFormalAccount$mailValue'
			}, {
				name : 'itil_ac_PersonFormalAccount$wwwAccountValue',
				mapping : 'itil_ac_PersonFormalAccount$wwwAccountValue'
			}, {
				name : 'itil_ac_PersonFormalAccount$referSalary',
				mapping : 'itil_ac_PersonFormalAccount$referSalary'
			}, {
				name : 'itil_ac_PersonFormalAccount$telephone',
				mapping : 'itil_ac_PersonFormalAccount$telephone'
			}, {
				name : 'itil_ac_PersonFormalAccount$registerServiceType',
				mapping : 'itil_ac_PersonFormalAccount$registerServiceType'
			}, {
				name : 'itil_ac_PersonFormalAccount$dutyName',
				mapping : 'itil_ac_PersonFormalAccount$dutyName'
			}, {
				name : 'itil_ac_PersonFormalAccount$thingCode',
				mapping : 'itil_ac_PersonFormalAccount$thingCode'
			}, {
				name : 'itil_ac_PersonFormalAccount$controlScope',
				mapping : 'itil_ac_PersonFormalAccount$controlScope'
			}, {
				name : 'itil_ac_PersonFormalAccount$userRight',
				mapping : 'itil_ac_PersonFormalAccount$userRight'
			}, {
				name : 'itil_ac_PersonFormalAccount$operatorScope',
				mapping : 'itil_ac_PersonFormalAccount$operatorScope'
			}, {
				name : 'itil_ac_PersonFormalAccount$erpUserName',
				mapping : 'itil_ac_PersonFormalAccount$erpUserName'
			}, {
				name : 'itil_ac_PersonFormalAccount$workSpace',
				mapping : 'itil_ac_PersonFormalAccount$workSpace'
			}, {
				name : 'itil_ac_PersonFormalAccount$mailServer',
				mapping : 'itil_ac_PersonFormalAccount$mailServer'
			}, {
				name : 'itil_ac_PersonFormalAccount$endDate',
				mapping : 'itil_ac_PersonFormalAccount$endDate'
			}, {
				name : 'itil_ac_PersonFormalAccount$otherLinkCompany',
				mapping : 'itil_ac_PersonFormalAccount$otherLinkCompany'
			}, 
				{
				name : 'itil_ac_PersonFormalAccount$drawSpace',
				mapping : 'itil_ac_PersonFormalAccount$drawSpace'
			},
			{
				name : 'itil_ac_PersonFormalAccount$costCenterCode',
				mapping : 'itil_ac_PersonFormalAccount$costCenterCode'
			},
			{
				name : 'sUserInfos$employeeCode',
				mapping : 'sUserInfos$employeeCode'
			}, {
				name : 'sUserInfos$realName',
				mapping : 'sUserInfos$realName'
			}, {
				name : 'sUserInfos$userName',
				mapping : 'sUserInfos$userName'
			}, {
				name : 'sUserInfos$department',
				mapping : 'sUserInfos$department'
			}, {
				name : 'sUserInfos$email',
				mapping : 'sUserInfos$email'
			}, {
				name : 'sUserInfos$telephone',
				mapping : 'sUserInfos$telephone'
			}, {
				name : 'sUserInfos$mobilePhone',
				mapping : 'sUserInfos$mobilePhone'
			}, {
				name : 'sUserInfos$employeeCode',
				mapping : 'sUserInfos$employeeCode'
			}, {
				name : 'sUserInfos$costCenterCode',
				mapping : 'sUserInfos$costCenterCode'
			}, {
				name : 'sUserInfos$sameMailDept',
				mapping : 'sUserInfos$sameMailDept'
			}, {
				name : 'sUserInfos$workSpace',
				mapping : 'sUserInfos$workSpace'
			}, {
				name : 'sUserInfos$mailServer',
				mapping : 'sUserInfos$mailServer'
			}, {
				name : 'sUserInfos$userType',
				mapping : 'sUserInfos$userType'
			}, {
				name : 'sUserInfos$personnelScope',
				mapping : 'sUserInfos$personnelScope'
			}, {
				name : 'itil_ac_PersonFormalAccount$ifHold',
				mapping : 'itil_ac_PersonFormalAccount$ifHold'
			}]),
			title : "座机移机申请",
			items : [{
				xtype : 'fieldset',
				title : '申请人信息',
				layout : 'table',
				anchor : '100%',
				autoHeight : true,
				animCollapse : true,
				collapsible : true,
				style : 'border:1px dotted #b0acac',
				defaults : {
					bodyStyle : 'padding:4px'
				},
				layoutConfig : {
					columns : 4
				},

				items : [{
					html : '申请编号:',
					cls : 'common-text',
					style : 'width:135;text-align:right'
				}, new Ext.form.TextField({
					fieldLabel : '申请编号',
					xtype : 'textfield',
					colspan : 0,
					rowspan : 0,
					id : 'AccountApplyMainTable$name',
					name : 'AccountApplyMainTable$name',
					style : '',
					width : 200,
					readOnly : true,

					emptyText : '自动生成',
					value : '',
					allowBlank : true,
					validator : '',
					vtype : ''
				}), {
					html : '申请日期:',
					cls : 'common-text',
					style : 'width:135;text-align:right'
				}, new Ext.form.DateField({
					xtype : 'datefield',
					id : 'AccountApplyMainTable$applyDate',
					colspan : 0,
					rowspan : 0,
					name : 'AccountApplyMainTable$applyDate',
					width : 200,
					style : '',
					value : '',
					allowBlank : true,
					hideTrigger : true,
					readOnly : true,
					validator : '',
					format : 'Y-m-d',
					fieldLabel : '申请日期'
				}), {
					html : '代申请人:',
					cls : 'common-text',
					style : 'width:135;text-align:right'
				}, new Ext.form.ComboBox({
					xtype : 'combo',
					hiddenName : 'AccountApplyMainTable$delegateApplyUser',
					id : 'AccountApplyMainTable$delegateApplyUserCombo',
					width : 200,
					style : '',
					fieldLabel : '代申请人',
					colspan : 0,
					rowspan : 0,
					readOnly : true,

					hideTrigger : true,
					readOnly : true,
					lazyRender : true,
					displayField : 'userName',
					valueField : 'id',
					emptyText : '请选择...',
					allowBlank : true,
					typeAhead : true,
					name : 'AccountApplyMainTable$delegateApplyUser',
					triggerAction : 'all',
					minChars : 50,
					queryDelay : 700,
					store : new Ext.data.JsonStore({
						url : webContext
								+ '/extjs/comboDataAction?clazz=com.digitalchina.info.framework.security.entity.UserInfo',
						fields : ['id', 'userName'],
						listeners : {
							beforeload : function(store, opt) {
								if (opt.params['AccountApplyMainTable$delegateApplyUser'] == undefined) {
									opt.params['userName'] = Ext
											.getCmp('AccountApplyMainTable$delegateApplyUserCombo').defaultParam;
								}
							}
						},
						totalProperty : 'rowCount',
						root : 'data',
						id : 'id'
					}),
					pageSize : 10,
					listeners : {
						'beforequery' : function(queryEvent) {if(this.readOnly==true){return false}
							var param = queryEvent.combo.getRawValue();
							this.defaultParam = param;
							if (queryEvent.query == '') {
								param = '';
							}
							this.store.load({
								params : {
									userName : param,
									start : 0
								}
							});
							return true;
						}
					},
					initComponent : function() {
						if(this.getValue()!=''){
							var combo=this;
							this.store.load({
								params : {
									id : this.getValue(),
									start : 0
								},
								callback : function(r, options, success) {
									if(r.length>0){
										combo.setRawValue(r[0].get(combo.displayField));
									}
								}
							});
						}
					}
				}), {
					html : '<font color=red>*</font>代申请人联系电话:',
					cls : 'common-text',
					style : 'width:135;text-align:right'
				}, new Ext.form.TextField({
					fieldLabel : '<font color=red>*</font>代办人联系电话',
					xtype : 'textfield',
					colspan : 0,
					rowspan : 0,
					id : 'AccountApplyMainTable$delegateApplyTel',
					name : 'AccountApplyMainTable$delegateApplyTel',
					style : '',
					width : 200,
					value : '',
					allowBlank : false,
					validator : '',
					vtype : ''
				 }), 
				 {
					xtype : 'fieldset',
					title : '个人电话',
					layout : 'table',
					anchor : '100%',
					checkboxToggle : 'true',
					checkboxName : 'haveItcode',
					collapsed : true,
					id:'haveItcodeApply',
					animCollapse : false,
					collapsible : false,
					colspan : 4,
					rowspan : 0,

					style : 'border:1px dotted #b0acac;',
					autoHeight : true,
					defaults : {
						bodyStyle : 'padding:4px'
					},
					layoutConfig : {
						columns : 4
					},
					items : [

					{
					html : '申请人:',
					cls : 'common-text',
					style : 'width:135;text-align:right'
				}, new Ext.form.ComboBox({
					xtype : 'combo',
					hiddenName : 'AccountApplyMainTable$applyUser',
					id : 'AccountApplyMainTable$applyUserCombo',
					width : 200,
					style : '',
					fieldLabel : '申请人',
					colspan : 0,
					rowspan : 0,
					lazyRender : true,
					displayField : 'userName',
					valueField : 'id',
					emptyText : '请选择...',
					allowBlank : true,
					typeAhead : true,
					name : 'AccountApplyMainTable$applyUser',
					triggerAction : 'all',
					minChars : 50,
					queryDelay : 700,
					store : new Ext.data.JsonStore({
						url : webContext
								+ '/extjs/comboDataAction?clazz=com.digitalchina.info.framework.security.entity.UserInfo',
						fields : ['id', 'userName'],
						listeners : {
							beforeload : function(store, opt) {
								if (opt.params['AccountApplyMainTable$applyUser'] == undefined) {
									opt.params['userName'] = Ext
											.getCmp('AccountApplyMainTable$applyUserCombo').defaultParam;
								}
							}
						},
						totalProperty : 'rowCount',
						root : 'data',
						id : 'id'
					}),
					pageSize : 10,
					listeners : {
						'beforequery' : function(queryEvent) {if(this.readOnly==true){return false}
							var param = queryEvent.combo.getRawValue();
							this.defaultParam = param;
							if (queryEvent.query == '') {
								param = '';
							}
							this.store.load({
								params : {
									userName : param,
									start : 0
								}
							});
							return true;
						},
						'select' : function(combo, record, index) {
							var userInfo = Ext
									.getCmp('AccountApplyMainTable$applyUserCombo')
									.getValue();

										Ext.Ajax.request({
											url : webContext
													+ '/accountAction_getUserPersonAccount.action',
											params : {
												userInfo : userInfo,
												accountType : '座机'
											},

											success : function(response,
													options) {
												var r = Ext
														.decode(response.responseText);
												if (!r.success) {
													Ext.MessageBox
															.alert("提示",
																	"申请不存在可用的座机！");
													 Ext
															.getCmp('AccountApplyMainTable$applyUserCombo')
															.setValue("");
													return false;
													
												} else {
													
													var userInfo = Ext
															.getCmp('AccountApplyMainTable$applyUserCombo')
															.getValue();
													Ext.Ajax.request({
														url : webContext
																+ '/accountAction_initUserInfoData.action',
														params : {
															userInfo : userInfo

														},
														success : function(
																response,
																options) {
															var r = Ext
																	.decode(response.responseText);
															Ext
																	.getCmp('sUserInfos$costCenterCode')
																	.setValue(r.costCenter);
															Ext
																	.getCmp('sUserInfos$employeeCode')
																	.setValue(r.employeeCode);
															Ext
																	.getCmp('sUserInfos$userTypeCombo')
																	.setValue(r.userType);
															Ext
																	.getCmp('AccountApplyMainTable$applyUserTel')
																	.setValue(r.telephone);
															Ext
																	.getCmp('sUserInfos$personnelScopeCombo')
																	.setValue(r.PersonScope);

														},

														failure : function(
																response,
																options) {
															Ext.MessageBox
																	.alert(
																			"提示",
																			"申请人数据加载失败，请联系管理员处理！");
															 Ext
																	.getCmp('AccountApplyMainTable$applyUserCombo')
																	.setValue("");
															return false;

														}
													}, this);

												}
											},

											failure : function(response,
													options) {

											}
										}, this);

							

						}
					},
					initComponent : function() {
						if(this.getValue()!=''){
							var combo=this;
							this.store.load({
								params : {
									id : this.getValue(),
									start : 0
								},
								callback : function(r, options, success) {
									if(r.length>0){
										combo.setRawValue(r[0].get(combo.displayField));
									}
								}
							});
						}
					}
				}), {
					html : '申请人联系电话:',
					cls : 'common-text',
					style : 'width:135;text-align:right'
				}, new Ext.form.TextField({
					fieldLabel : '申请人联系电话',
					xtype : 'textfield',
					colspan : 0,
					rowspan : 0,
					id : 'AccountApplyMainTable$applyUserTel',
					name : 'AccountApplyMainTable$applyUserTel',
					style : '',
					width : 200,
					value : '',
					allowBlank : true,
					validator : '',
					vtype : ''
				}), {
					html : '员工编号:',
					cls : 'common-text',
					style : 'width:135;text-align:right'
				}, new Ext.form.TextField({
					fieldLabel : '员工编号',
					xtype : 'textfield',
					colspan : 0,
					rowspan : 0,
					id : 'sUserInfos$employeeCode',
					name : 'sUserInfos$employeeCode',
					style : '',
					width : 200,
					readOnly : true,
					value : '',
					allowBlank : true,
					validator : '',
					vtype : ''
				}), {
					html : '成本中心号:',
					cls : 'common-text',
					style : 'width:135;text-align:right'
				}, new Ext.form.TextField({
					fieldLabel : '成本中心号',
					xtype : 'textfield',
					colspan : 0,
					rowspan : 0,
					id : 'sUserInfos$costCenterCode',
					name : 'sUserInfos$costCenterCode',
					style : '',
					width : 200,
					readOnly : true,
					value : '',
					allowBlank : true,
					validator : '',
					vtype : ''
				}),
						
						{
							html : '用户类别/员工组:',
							cls : 'common-text',
							style : 'width:135;text-align:right'
						}, new Ext.form.ComboBox({
							xtype : 'combo',
							hiddenName : 'sUserInfos$userType',
							id : 'sUserInfos$userTypeCombo',
							width : 200,
							style : '',
							fieldLabel : '用户类型',
							colspan : 0,
							rowspan : 0,
							lazyRender : true,
							readOnly : true,
							hideTrigger : true,
							displayField : 'name',
							valueField : 'id',
							emptyText : '请选择...',
							allowBlank : true,
							typeAhead : true,
							name : 'sUserInfos$userType',
							triggerAction : 'all',
							minChars : 50,
							queryDelay : 700,
							store : new Ext.data.JsonStore({
								url : webContext
										+ '/extjs/comboDataAction?clazz=com.digitalchina.info.framework.security.entity.UserType',
								fields : ['id', 'name'],
								listeners : {
									beforeload : function(store, opt) {
										if (opt.params['sUserInfos$userType'] == undefined) {
											opt.params['name'] = Ext
													.getCmp('sUserInfos$userTypeCombo').defaultParam;
										}
									}
								},
								totalProperty : 'rowCount',
								root : 'data',
								id : 'id'
							}),
							pageSize : 10,
							listeners : {
								'beforequery' : function(queryEvent) {if(this.readOnly==true){return false}
									var param = queryEvent.combo.getRawValue();
									this.defaultParam = param;
									if (queryEvent.query == '') {
										param = '';
									}
									this.store.load({
										params : {
											name : param,
											start : 0
										}
									});
									return true;
								}
							},
							initComponent : function() {
								this.store.load({
									params : {
										id : Ext
												.getCmp('sUserInfos$userTypeCombo')
												.getValue(),
										start : 0
									},
									callback : function(r, options, success) {
										Ext
												.getCmp('sUserInfos$userTypeCombo')
												.setValue(Ext
														.getCmp('sUserInfos$userTypeCombo')
														.getValue());
									}
								});
							}
						})]
				},
				
				{
					xtype : 'fieldset',
					title : '部门电话或传真机',
					layout : 'table',
					anchor : '100%',
					checkboxToggle : 'true',
					checkboxName : 'noItcode',
					collapsed : true,
					id:'noItcodeApply',
					animCollapse : false,
					collapsible : false,
					colspan : 4,
					rowspan : 0,

					style : 'border:1px dotted #b0acac;',
					autoHeight : true,
					defaults : {
						bodyStyle : 'padding:4px'
					},
					layoutConfig : {
						columns : 4
					},
					items : [

			  {
					html : '成本中心号:',
					cls : 'common-text',
					style : 'width:135;text-align:right'
				}, new Ext.form.TextField({
					fieldLabel : '成本中心号',
					xtype : 'textfield',
					colspan : 0,
					rowspan : 0,
					id : 'itil_ac_PersonFormalAccount$costCenterCode',
					name : 'itil_ac_PersonFormalAccount$costCenterCode',
					style : '',
					width : 200,
					value : '',
					allowBlank : true,
					validator : '',
					vtype : ''
				}),
				{
					html : '申请人联系电话:',
					cls : 'common-text',
					style : 'width:135;text-align:right'
				}, new Ext.form.TextField({
					fieldLabel : '申请人联系电话',
					xtype : 'textfield',
					colspan : 0,
					rowspan : 0,
					id : 'itil_ac_PersonFormalAccount$telephone',
					name : 'itil_ac_PersonFormalAccount$telephone',
					style : '',
					width : 200,
					value : '',
					allowBlank : true,
					validator : '',
					vtype : ''
				})
				]
				},

					
						
			{
				html : '<font color=red>*</font>工作地点:',
				cls : 'common-text',
				style : 'width:135;text-align:right'
			},new Ext.form.ComboBox({
				xtype : 'combo',
				hiddenName : 'itil_ac_PersonFormalAccount$workSpace',
				id : 'itil_ac_PersonFormalAccount$workSpaceCombo',
				width : 200,
				style : '',
				fieldLabel : '领卡地点',
				colspan : 0,
				rowspan : 0,
				lazyRender : true,
				displayField : 'workSpace',
				valueField : 'id',
				emptyText : '请选择...',
				allowBlank : false,
				
				name : 'itil_ac_PersonFormalAccount$workSpace',
				triggerAction : 'all',
				minChars : 50,
				queryDelay : 700,
				store : new Ext.data.JsonStore({
					url : webContext
							+ '/extjs/comboDataAction?clazz=com.digitalchina.itil.config.extlist.entity.TelephoneAudit',
					fields : ['id', 'workSpace'],
					listeners : {
						beforeload : function(store, opt) {
							if (opt.params['itil_ac_PersonFormalAccount$workSpace'] == undefined) {
								opt.params['workSpace'] = Ext
										.getCmp('itil_ac_PersonFormalAccount$workSpaceCombo').defaultParam;
							}
						}
					},
					totalProperty : 'rowCount',
					root : 'data',
					id : 'id'
				}),
				pageSize : 10,
				listeners : {
					'beforequery' : function(queryEvent) {if(this.readOnly==true){return false}
						var param = queryEvent.combo.getRawValue();
						this.defaultParam = param;
						if (queryEvent.query == '') {
							param = '';
						}
						this.store.load({
							params : {
								name : param,
								start : 0
							}
						});
						return true;
					},
				'select' : function(combo, record, index) {
					var mailvalue=Ext.getCmp('itil_ac_PersonFormalAccount$workSpaceCombo').getRawValue();
					if(mailvalue=='无'){
					Ext.MessageBox.alert("提示","请您选择具体的工作地点,谢谢您的合作！",function(btn){
					Ext.getCmp('itil_ac_PersonFormalAccount$workSpaceCombo').setValue("");
					return false;
					});	
					}
			
				}
					
				},
				
				initComponent : function() {
						if(this.getValue()!=''){
							var combo=this;
							this.store.load({
								params : {
									id : this.getValue(),
									start : 0
								},
								callback : function(r, options, success) {
									if(r.length>0){
										combo.setRawValue(r[0].get(combo.displayField));
									}
								}
							});
						}
					}
			}),

					 {
							html : '<font color=red>*</font>审批人:',
							cls : 'common-text',
							style : 'width:135;text-align:right'
						}, new Ext.form.ComboBox({
							xtype : 'combo',
							hiddenName : 'AccountApplyMainTable$confirmUser',
							id : 'AccountApplyMainTable$confirmUserCombo',
							width : 200,
							style : '',
							fieldLabel : '审批人',
							colspan : 0,
							rowspan : 0,
							lazyRender : true,
							displayField : 'userName',
							valueField : 'id',
							emptyText : '请选择...',
							allowBlank : false,
							typeAhead : true,
							name : 'AccountApplyMainTable$confirmUser',
							triggerAction : 'all',
							minChars : 50,
							queryDelay : 700,
							store : new Ext.data.JsonStore({
								url : webContext
										+ '/extjs/comboDataAction?clazz=com.digitalchina.info.framework.security.entity.UserInfo',
								fields : ['id', 'userName'],
								listeners : {
									beforeload : function(store, opt) {
										if (opt.params['AccountApplyMainTable$confirmUser'] == undefined) {
											opt.params['userName'] = Ext
													.getCmp('AccountApplyMainTable$confirmUserCombo').defaultParam;
										}
									}
								},
								totalProperty : 'rowCount',
								root : 'data',
								id : 'id'
							}),
							pageSize : 10,
							listeners : {
								'beforequery' : function(queryEvent) {if(this.readOnly==true){return false}
									var param = queryEvent.combo.getRawValue();
									this.defaultParam = param;
									if (queryEvent.query == '') {
										param = '';
									}
									this.store.load({
										params : {
											userName : param,
											start : 0
										}
									});
									return true;
								}
							},
							initComponent : function() {
						if(this.getValue()!=''){
							var combo=this;
							this.store.load({
								params : {
									id : this.getValue(),
									start : 0
								},
								callback : function(r, options, success) {
									if(r.length>0){
										combo.setRawValue(r[0].get(combo.displayField));
									}
								}
							});
						}
					}
						})]
			}, {
				xtype : 'fieldset',
				title : '座机信息',
				layout : 'table',
				anchor : '100%',
				animCollapse : true,
				collapsible : true,
				style : 'border:1px dotted #b0acac;margin:15px 0px 0px px',
				autoHeight : true,
				defaults : {
					bodyStyle : 'padding:4px'
				},
				layoutConfig : {
					columns : 4
				},
				items : [

				{
					html : '<font color=red>*</font>原端口号:',
					cls : 'common-text',
					style : 'width:135;text-align:right'
				}, new Ext.form.TextField({
					fieldLabel : '工位号码',
					xtype : 'textfield',
					colspan : 0,
					rowspan : 0,
					id : 'itil_ac_PersonFormalAccount$userRight',
					name : 'itil_ac_PersonFormalAccount$userRight',
					style : '',
					width : 200,
					value : '',
					allowBlank : false,
					validator : '',
					vtype : ''
				}), {
					html : '<font color=red>*</font>新端口号:',
					cls : 'common-text',
					style : 'width:135;text-align:right'
				}, new Ext.form.TextField({
					fieldLabel : '工位号码',
					xtype : 'textfield',
					colspan : 0,
					rowspan : 0,
					id : 'itil_ac_PersonFormalAccount$stationNumber',
					name : 'itil_ac_PersonFormalAccount$stationNumber',
					style : '',
					width : 200,
					value : '',
					allowBlank : false,
					validator : '',
					vtype : ''
				}), {
					html : '<font color=red>*</font>变更的电话号码:',
					cls : 'common-text',
					id : 'number',
					style : 'width:135;text-align:right'
				}, new Ext.form.TextField({
					fieldLabel : '电话号码',
					xtype : 'textfield',
					colspan : 0,
					rowspan : 0,
					id : 'itil_ac_PersonFormalAccount$telephoneNumber',
					name : 'itil_ac_PersonFormalAccount$telephoneNumber',
					style : '',
					width : 200,
					value : '',
					allowBlank : false,
					validator : '',
					vtype : ''
				}), {}, {},

				{
					html : '<font color=red>*</font>调整原因:',
					cls : 'common-text',
					style : 'width:135;text-align:right'
				}, new Ext.form.TextArea({
					xtype : 'textarea',
					id : 'itil_ac_PersonFormalAccount$applyReason',
					colspan : 3,
					rowspan : 0,
					name : 'itil_ac_PersonFormalAccount$applyReason',
					width : 530,

					style : '',
					value : '',
					allowBlank : false,
					validator : '',
					fieldLabel : '申请原因'
				}), new Ext.form.Hidden({
					fieldLabel : '电话类型',
					xtype : 'hidden',
					colspan : 0,
					rowspan : 0,
					id : 'itil_ac_PersonFormalAccount$telephoneType',
					name : 'itil_ac_PersonFormalAccount$telephoneType',
					style : '',
					width : 200,
					value : '',
					allowBlank : false,
					validator : '',
					vtype : ''
				}),

				new Ext.form.Hidden({
					fieldLabel : '财年额度',
					xtype : 'hidden',
					colspan : 0,
					rowspan : 0,
					id : 'itil_ac_PersonFormalAccount$yearMoney',
					name : 'itil_ac_PersonFormalAccount$yearMoney',
					style : '',
					width : 200,
					value : '',
					allowBlank : false,
					validator : '',
					vtype : ''
				}), new Ext.form.Hidden({
					xtype : 'hidden',
					id : 'AccountApplyMainTable$id',
					colspan : 0,
					rowspan : 0,
					name : 'AccountApplyMainTable$id',
					width : 200,
					style : '',
					value : '',
					fieldLabel : '自动编号'
				}), new Ext.form.Hidden({
					xtype : 'hidden',
					id : 'AccountApplyMainTable$oldApply',
					colspan : 0,
					rowspan : 0,
					name : 'AccountApplyMainTable$oldApply',
					width : 200,
					style : '',
					value : '',
					fieldLabel : '变更前申请'
				}), new Ext.form.Hidden({
					xtype : 'hidden',
					id : 'AccountApplyMainTable$processType',
					colspan : 0,
					rowspan : 0,
					name : 'AccountApplyMainTable$processType',
					width : 200,
					style : '',
					value : '',
					fieldLabel : '流程类型'
				}), new Ext.form.Hidden({
					xtype : 'hidden',
					id : 'AccountApplyMainTable$status',
					colspan : 0,
					rowspan : 0,
					name : 'AccountApplyMainTable$status',
					width : 200,
					style : '',
					value : '',
					fieldLabel : '状态'
				}), new Ext.form.Hidden({
					xtype : 'hidden',
					id : 'AccountApplyMainTable$deleteFlag',
					colspan : 0,
					rowspan : 0,
					name : 'AccountApplyMainTable$deleteFlag',
					width : 200,
					style : '',
					value : '',
					fieldLabel : '删除状态'
				}), new Ext.form.Hidden({
					xtype : 'hidden',
					id : 'AccountApplyMainTable$serviceItem',
					colspan : 0,
					rowspan : 0,
					name : 'AccountApplyMainTable$serviceItem',
					width : 200,
					style : '',
					value : '',
					fieldLabel : '所属服务'
				}), new Ext.form.Hidden({
					xtype : 'hidden',
					id : 'AccountApplyMainTable$createUser',
					colspan : 0,
					rowspan : 0,
					name : 'AccountApplyMainTable$createUser',
					width : 200,
					style : '',
					value : '',
					fieldLabel : '创建人'
				}), new Ext.form.Hidden({
					xtype : 'hidden',
					id : 'AccountApplyMainTable$createDate',
					colspan : 0,
					rowspan : 0,
					name : 'AccountApplyMainTable$createDate',
					width : 200,
					style : '',
					value : '',
					fieldLabel : '创建日期'
				}), new Ext.form.Hidden({
					xtype : 'hidden',
					id : 'AccountApplyMainTable$modifyUser',
					colspan : 0,
					rowspan : 0,
					name : 'AccountApplyMainTable$modifyUser',
					width : 200,
					style : '',
					value : '',
					fieldLabel : '最后修改人'
				}), new Ext.form.Hidden({
					xtype : 'hidden',
					id : 'AccountApplyMainTable$modifyDate',
					colspan : 0,
					rowspan : 0,
					name : 'AccountApplyMainTable$modifyDate',
					width : 200,
					style : '',
					value : '',
					fieldLabel : '最后修改日期'
				}), new Ext.form.Hidden({
					xtype : 'hidden',
					id : 'itil_ac_PersonFormalAccount$olodApplyAccount',
					colspan : 0,
					rowspan : 0,
					name : 'itil_ac_PersonFormalAccount$olodApplyAccount',
					width : 200,
					style : '',
					value : '',
					fieldLabel : '变化前帐号'
				}), new Ext.form.Hidden({
					xtype : 'hidden',
					id : 'itil_ac_PersonFormalAccount$applyId',
					colspan : 0,
					rowspan : 0,
					name : 'itil_ac_PersonFormalAccount$applyId',
					width : 200,
					style : '',
					value : '',
					fieldLabel : '申请编号'
				}), new Ext.form.Hidden({
					xtype : 'hidden',
					id : 'itil_ac_PersonFormalAccount$id',
					colspan : 0,
					rowspan : 0,
					name : 'itil_ac_PersonFormalAccount$id',
					width : 200,
					style : '',
					value : '',
					fieldLabel : '自动编号'
				}), new Ext.form.Hidden({
					xtype : 'hidden',
					id : 'itil_ac_PersonFormalAccount$accountName',
					colspan : 0,
					rowspan : 0,
					name : 'itil_ac_PersonFormalAccount$accountName',
					width : 200,
					style : '',
					value : '',
					fieldLabel : '帐号名'
				}), new Ext.form.Hidden({
					xtype : 'hidden',
					id : 'itil_ac_PersonFormalAccount$password',
					colspan : 0,
					rowspan : 0,
					name : 'itil_ac_PersonFormalAccount$password',
					width : 200,
					style : '',
					value : '',
					fieldLabel : '密码'
				}), new Ext.form.Hidden({
					xtype : 'hidden',
					id : 'itil_ac_PersonFormalAccount$accountType',
					colspan : 0,
					rowspan : 0,
					name : 'itil_ac_PersonFormalAccount$accountType',
					width : 200,
					style : '',
					value : '',
					fieldLabel : '帐号类型'
				}), new Ext.form.Hidden({
					xtype : 'hidden',
					id : 'itil_ac_PersonFormalAccount$accountState',
					colspan : 0,
					rowspan : 0,
					name : 'itil_ac_PersonFormalAccount$accountState',
					width : 200,
					style : '',
					value : '',
					fieldLabel : '帐号状态'
				})]
			}],
		   buttons : [{
				text : '审批',
				iconCls : 'submit',
				handler : function() {
					window.parent.auditContentWin.audit();
				}
			}],
			buttonAlign:'center'
		});
		if (this.dataId == "0" || this.dataId == "null") {
		
		} else {
			this.formpanel_PersonAccountApply_Input.load({
				url : webContext
						+ '/accountAction_getPersonApplyDraftData.action?panelName=panel_PersonAccountApply_Input&dataId='
						+ this.dataId,
				timeout : 30,
				success : function(action, form) {
					Ext.getCmp("AccountApplyMainTable$applyUserCombo")
							.initComponent();
					Ext.getCmp("AccountApplyMainTable$delegateApplyUserCombo")
							.initComponent();
					Ext.getCmp("AccountApplyMainTable$confirmUserCombo")
							.initComponent();
					Ext.getCmp("itil_ac_PersonFormalAccount$workSpaceCombo")
							.initComponent();
		  var applyUser=Ext.getCmp('AccountApplyMainTable$applyUserCombo').getValue();
	      if(applyUser!=null&&applyUser!=''){
	      Ext.getDom('haveItcode').checked=true;
	      Ext.getCmp("haveItcodeApply").expand(true);
	      }	  
	      
	       var costCenter=Ext.getCmp('itil_ac_PersonFormalAccount$costCenterCode').getValue();
	      if(costCenter!=null&&costCenter!=''){
	      Ext.getDom('noItcode').checked=true;
	      Ext.getCmp("noItcodeApply").expand(true);
	      }	
				}
			});
		}
		return this.formpanel_PersonAccountApply_Input;
	},
	items : this.items,
	/*
	 * clientvalidation 初始化
	 */
	initComponent : function() {
		var histroyForm = new HistroyForm({
			reqId : this.dataId,
			reqClass : "com.digitalchina.itil.require.entity.AccountApplyMainTable"
		});
		var items = new Array();
		var pa = new Array();
		this.pa = pa;
		var gd = new Array();
		this.gd = gd;
		var temp = new Array();
		this.temp = temp;
		var formname = new Array();
		this.formname = formname;
		var gridname = new Array();
		this.gridname = gridname;
		this.model = "ac_MSNAccountApply";
		

		this.getFormpanel_PersonAccountApply_Input();
		this.pa.push(this.formpanel_PersonAccountApply_Input);
		this.formname.push("panel_PersonAccountApply_Input");
		temp.push(this.formpanel_PersonAccountApply_Input);
		temp.push(histroyForm);
		items.push(this.getTabpanel(temp));
		this.items = items;
		PageTemplates.superclass.initComponent.call(this);
	}
})