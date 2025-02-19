PageTemplates = Ext.extend(Ext.Panel, {
	id : "PageTemplates",
	layout : 'table',
	height : 'auto',
	align : 'center',
	foredit : true,
	width : 1050,
	frame : true,
	buttonAlign : 'center',
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
			activeTab : 0,
			enableTabScroll : true,
			//minTabWidth:100,
			//resizeTabs:true,
			title : tabTitle,
			deferredRender : false,
			frame : true,
			plain : true,
			border : false,
			//tabPosition:'bottom',
			baseCls : 'x-plain',// 是否设置和背景色同步
			width : 900,
			//bodyBorder : true,
			defaults : {
				autoHeight : true,
				bodyStyle : 'padding:2px'
			},
			items : tab
		});
		return this.tabPanel;

	},
	getPanel : function(appa, panelTitle) {
		this.Panel = new Ext.Panel({
			id : "Pages",
			height : 'auto',
			align : 'center',
			title : panelTitle,
			border : false,
			defaults : {
				bodyStyle : 'padding:5px'
			},
			width : 'auto',
			frame : true,
			autoScroll : true,
			layoutConfig : {
				columns : 1
			},
			items : appa
		});
		return this.Panel;

	},

	getFormpanel_typicalRequire_Input : function() {
		var da = new DataAction();
		var data = null;
		// 判断是新增还是修改
		var biddata = "";

		var buttonUtil = new ButtonUtil();
		this.getFormButtons = buttonUtil.getButtonForPanel(
				"panel_typicalRequire_Input", this);
		if (this.dataId != '0') {
			data = da.getPanelElementsForEdit("tr_confirmByHome","panel_typicalRequire_Input", this.dataId);// 这是要随时变得
			for (i = 0; i < data.length; i++) {
				var idStr = data[i].id + "";
				
				if (idStr.indexOf('$confirmUserCombo') > 0) {
					delete data[i].fieldLabel;
					data[i].fieldLabel = '部门审批人';
					
				}
			}
			biddata = da.splitForReadOnly(data);
		} else {
			data = da.getPanelElementsForAdd("panel_typicalRequire_Input");
			biddata = da.split(data);
		}
		if (this.getFormButtons.length != 0) {
			this.formpanel_typicalRequire_Input = new Ext.form.FormPanel({
				id : 'panel_typicalRequire_Input',
				layout : 'table',
				height : 'auto',
				width : 800,
				frame : true,
				collapsible : true,
				defaults : {
					bodyStyle : 'padding:4px'
				},
				layoutConfig : {
					columns : 4
				},
				title : "需求申请",
				items : biddata,
				buttons : this.getFormButtons
			});
		} else {
			this.formpanel_typicalRequire_Input = new Ext.form.FormPanel({
				id : 'panel_typicalRequire_Input',
				layout : 'table',
				height : 'auto',
				width : 800,
				frame : true,
				collapsible : true,
				defaults : {
					bodyStyle : 'padding:4px'
				},
				layoutConfig : {
					columns : 4
				},
				title : "需求申请",
				items : biddata
			});
		}
		return this.formpanel_typicalRequire_Input;
	},
	items : this.items,
	buttons : this.buttons,
	/*
	 * clientvalidation 初始化
	 */
	initComponent : function() {

		var histroyForm = new HistroyForm({
			reqId : this.dataId,
			reqClass : "com.zsgj.itil.require.entity.SpecialRequirement"
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
		this.model = "tr_confirmByHome";
		var buttonUtil = new ButtonUtil();
		this.mybuttons = buttonUtil.getButtonForModel("tr_confirmByHome", this);
		this.buttons = this.mybuttons;
	
		this.getFormpanel_typicalRequire_Input();
		this.pa.push(this.formpanel_typicalRequire_Input);
		this.formname.push("panel_typicalRequire_Input");
		temp.push(this.formpanel_typicalRequire_Input);

		temp.push(histroyForm);

		items.push(this.getTabpanel(temp));
		if (this.readOnly != 1) {
			items.push(this.buttons);
		}
		this.items = items;
		PageTemplates.superclass.initComponent.call(this);
	}
})