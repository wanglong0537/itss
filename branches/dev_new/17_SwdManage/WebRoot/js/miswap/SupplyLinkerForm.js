SupplyLinkerForm = Ext.extend(Ext.Window, {
	formPanel : null,
	constructor : function(a) {
		if(a == null) {
			a = {};
		}
		Ext.apply(this, a);
		this.initComponents();
		SupplyLinkerForm.superclass.constructor.call(this, {
			id : "SupplyLinkerFormWin",
			layout : "fit",
			items : this.formPanel,
			modal : true,
			height : 200,
			width : 350,
			title : "联系人添加/修改",
			buttonAlign : "center",
			buttons : this.buttons
		});
	},
	initComponents : function() {
		this.formPanel = new Ext.FormPanel({
			layout : "form",
			bodyStyle : "padding:10px 10px 10px 10px",
			border : false,
			url : __ctxPath + "/danpin/saveSupplyLinker.do",
			id : "SupplyLinkerForm",
			defaults : {
				anchor : "95%,95%"
			},
			defaultType : "textfield",
			items : [
				{
					name : "supplyLinker.sid",
					id : "supplyLinkerSid",
					xtype : "hidden",
					value : this.supplyLinkerSid == null ? "" : this.supplyLinkerSid
				}, {
					name : "supplyLinker.supplyInfoSid",
					id : "supplyInfoSid",
					value : this.supplyInfoSid,
					hidden : true
				}, {
					fieldLabel : "姓名",
					name : "supplyLinker.linker",
					id : "linker",
					allowBlank : false,
					blankText : "姓名不能为空！"
				}, {
					fieldLabel : "联系电话",
					name : "supplyLinker.linkerPhone",
					id : "linkerPhone"
				}, {
					fieldLabel : "邮箱",
					name : "supplyLinker.email",
					id : "email"
				}, {
					fieldLabel : "是否主联系人",
					xtype : "checkboxgroup",
					columns : 1,
					items : [
						{
							boxLabel : "是",
							name : "supplyLinker.isMainLinker",
							id : "isMainLinker",
							inputValue : 1
						}
					]
				}, {
					name : "supplyLinker.status",
					id : "status",
					value : "1",
					xtype : "hidden"
				}
			]
		});
		if(this.supplyLinkerSid != null && this.supplyLinkerSid != "undefined") {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/danpin/getSupplyLinker.do?sid=" + this.supplyLinkerSid,
				waitMsg : "正在载入数据……",
				success : function(f, d) {
					var e = Ext.util.JSON.decode(d.response.responseText);
					if(e.data.isMainLinker == "1") {
						Ext.getCmp("isMainLinker").setValue(true);
					}
				},
				failure : function() {
					
				}
			});
		}
		this.buttons = [
			{
				text : "保存",
				iconCls : "btn-save",
				handler : this.save.createCallback(this.formPanel, this)
			}, {
				text : "取消",
				iconCls : "btn-cancel",
				handler : this.cancel.createCallback(this)
			}
		];
	},
	cancel : function(a) {
		a.close();
	},
	save : function(a, b) {
		var phoneReg =/^0{0,1}(13[0-9]|15[0-9])[0-9]{8}$/;
		if(Ext.getCmp("linkerPhone").getValue() != "") {
			if(!phoneReg.test(Ext.getCmp("linkerPhone").getValue())) {
				Ext.MessageBox.show({
					title : "操作信息",
					msg : "联系电话必须为手机号，请重新输入！",
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
				return ;
			}
		}
		var emailReg =/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
		if(Ext.getCmp("email").getValue() != "") {
			if(!emailReg.test(Ext.getCmp("email").getValue())) {
				Ext.MessageBox.show({
					title : "操作信息",
					msg : "邮箱格式不正确，请重新输入！",
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
				return ;
			}
		}
		if(a.getForm().isValid()) {
			a.getForm().submit({
				method : "post",
				waitMsg : "正在提交数据……",
				success : function() {
					Ext.ux.Toast.msg("提示信息","保存成功！");
					Ext.getCmp("SupplyLinkerView").gridPanel.store.reload({
						params : {
							start : 0,
							limit : 10
						}
					});
					b.close();
				},
				failure : function(c, d) {
					Ext.MessageBox.show({
						title : "操作信息",
						msg : d.result.msg,
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
					return ;
				}
			});
		}
	}
});