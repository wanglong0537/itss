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

	getFormpanel_erpSR_enter_input : function() {
		var da = new DataAction();
		var data = null;
		// 判断是新增还是修改
		var biddata = "";

		var buttonUtil = new ButtonUtil();
		this.getFormButtons = buttonUtil.getButtonForPanel(
				"panel_erpSR_enter_input", this);
		if (this.dataId != '0') {
			data = da.getPanelElementsForEdit("esr_confirmByHomeFinance",
					"panel_erpSR_enter_input", this.dataId);// 这是要随时变得
		} else {
			data = da.getPanelElementsForAdd("panel_erpSR_enter_input");
		}
		biddata = da.splitForReadOnly(data);
		if (this.getFormButtons.length != 0) {
			this.formpanel_erpSR_enter_input = new Ext.form.FormPanel({
				id : 'panel_erpSR_enter_input',
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
				title : "ERP非常规需求",
				items : biddata,
				buttons : this.getFormButtons
			});
		} else {
			this.formpanel_erpSR_enter_input = new Ext.form.FormPanel({
				id : 'panel_erpSR_enter_input',
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
				title : "ERP非常规需求",
				items : biddata
			});
		}
		return this.formpanel_erpSR_enter_input;
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
		this.model = "esr_confirmByHomeFinance";
		var buttonUtil = new ButtonUtil();
		this.mybuttons = buttonUtil.getButtonForModel(
				"esr_confirmByHomeFinance", this);
		this.buttons = new Array();
		if (this.readOnly != 1) {
			this.buttons = this.mybuttons;
		}
		this.getFormpanel_erpSR_enter_input();
		this.pa.push(this.formpanel_erpSR_enter_input);
		this.formname.push("panel_erpSR_enter_input");
		temp.push(this.formpanel_erpSR_enter_input);
		temp.push(histroyForm);
		items.push(this.getTabpanel(temp));

		this.items = items;
		PageTemplates.superclass.initComponent.call(this);
	}
})