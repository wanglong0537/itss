SystemForm = Ext.extend(Ext.Window, {
	formPanel : null,
	constructor : function(a) {
		if(a == null) {
			a = {};
		}
		Ext.apply(this, a);
		this.initComponents();
		SystemForm.superclass.constructor.call(this, {
			id : "SystemFormWin",
			layout : "fit",
			items : this.formPanel,
			modal : true,
			height : 250,
			width : 400,
			title : "添加/修改系统信息",
			buttonAlign : "center",
			buttons : this.buttons
		});
	},
	initComponents : function() {
		this.formPanel = new Ext.FormPanel({
			layout : "form",
			bodyStyle : "padding:10px 10px 10px 10px",
			border : false,
			id : "SystemForm",
			defaults : {
				anchor : "95%,95%"
			},
			defaultType : "textfield",
			items : [
				{
					name : "dn",
					id : "postDN",
					xtype : "hidden",
					value : ""
				}, {
					name : "cn",
					id : "cn",
					fieldLabel : "cn",
					allowBlank : false
				}, {
					name : "displayName",
					id : "displayName",
					fieldLabel : "名称",
					allowBlank : false
				}, {
					name : "description",
					id : "description",
					fieldLabel : "描述",
					xtype : "textarea"
				}, {
					hiddenName : "status",
					id : "statusName",
					xtype : "combo",
					fieldLabel : "状态",
					mode : "local",
					allowBlank : false,
					editable : false,
					value : "0",
					rawValue : "正常",
					triggerAction : "all",
					store : [
						[
							"0",
							"正常"
						], [
							"1",
							"锁定"
						]
					]
				}
			]
		});
		if(this.systemDN != null && this.systemDN != "undefined") {
			Ext.getCmp("cn").readOnly = true;
			this.formPanel.getForm().load({
				deferredRender : false,
				url : webContext + "/system?methodCall=getDetailBySystemDN&systemDN=" + this.systemDN,
				waitMsg : "正在载入数据……",
				success : function(f, d) {
					var e = Ext.util.JSON.decode(d.response.responseText);
					if(e.data.status == "0" || e.data.status == "") {
						Ext.getCmp("statusName").setValue(0);
						Ext.getCmp("statusName").setRawValue("正常");
					} else if(e.data.status == "1") {
						Ext.getCmp("statusName").setValue(1);
						Ext.getCmp("statusName").setRawValue("锁定");
					}
				},
				failure : function() {
					
				}
			});
		}
		this.buttons = [
			{
				text : "保存",
				handler : this.save.createCallback(this, this.formPanel)
			}, {
				text : "取消",
				handler : this.cancel.createCallback(this)
			}
		];
	},
	save : function(a, b) {
		if(b.getForm().isValid()) {
			if(a.isModify) {
				//修改
				b.getForm().submit({
					url : webContext + "/system?methodCall=modify",
					method : "post",
					waitMsg : "正在提交数据……",
					success : function(form, action) {
						a.close();
						Ext.getCmp("SystemPanel").getStore().reload();
						Ext.MessageBox.show({
							title : "操作信息",
							msg : "保存成功！",
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.INFO
						});
					},
					failure : function(form, action) {
						Ext.MessageBox.show({
							title : "操作信息",
							msg : action.result.msg,
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.ERROR
						});
						return ;
					}
				});
			} else {
				//新增
				b.getForm().submit({
					url : webContext + "/system?methodCall=add",
					method : "post",
					waitMsg : "正在提交数据……",
					success : function(form, action) {
						a.close();
						Ext.getCmp("SystemPanel").getStore().reload();
						Ext.MessageBox.show({
							title : "操作信息",
							msg : "保存成功！",
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.INFO
						});
					},
					failure : function(form, action) {
						Ext.MessageBox.show({
							title : "操作信息",
							msg : action.result.msg,
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.ERROR
						});
						return ;
					}
				});
			}
		}
	},
	cancel : function(a) {
		a.close();
	}
});