PageTemplates = Ext.extend(Ext.Panel, {
	id : "PageTemplates",
	layout : 'table',
	height : 'auto',
	align : 'center',
	foredit : true,
	width : 'auto',
	frame : true,
	autoScroll : true,
	defaults : {
		bodyStyle : 'padding:4px'
	},
	layoutConfig : {
		columns : 1
	},
	testfun : function() {
		var sto = this.hisGrid.getStore();
		var record = sto.getAt(sto.getTotalCount()-1);
		if (record == undefined) {
			this.picPanel.add(new Ext.Panel({
				html : '没有可显示的审批图',
				laytou : 'fit',
				frame : true,
				align : 'center'
			}));
			this.picPanel.doLayout();
			return;
		}
		var pid = record.get('processId');
		var url = webContext + '/extjs/workflow?method=next&procid=' + pid;
		var da = new DataAction();
		var data = da.ajaxGetData(url);//查询出来的结果
		var dataClass = [{
				name : 'knowContract',
				mapping : 'knowContract'
			},{
				name : 'processId',
				mapping : 'processId'
			},  {
				name : 'comment',
				mapping : 'comment'
			}, {
				name : 'resultFlag',
				mapping : 'resultFlag'
			},{
				name : 'nodeName',
				mapping : 'nodeName'
			}, {
				name : 'approver',
				mapping : 'approver'
			}, {
				name : 'approverDate',
				mapping : 'approverDate'
			}];
		var gridRecord = Ext.data.Record.create(dataClass);
		
		if (data[0]!=undefined) {
			var dataRecord = new gridRecord({
					processId : data[0].processId,
					nodeName : data[0].nodeName,
					approver : data[0].actorId,
					resultFlag : '【等待处理】',
					knowledge : record.get('knowContract')
				});
			sto.add([dataRecord]);		
			var url = webContext + "/workflow/history.do?pid=" + pid
					+ "&methodCall=view";
					
			this.picPanel.add(new Ext.Panel({
				html : '<iframe id="myframebidhis" frameborder="no" myframebidhis="ifr"width="100%" height="500" scrolling="auto" src='
					+ url + '></iframe>'
			}));
			this.picPanel.doLayout();
		}
	},
	getTabpanel : function(tab,tabTitle){
		this.tabPanel = new Ext.TabPanel({           
			xtype : 'tabpanel',
			activeTab : 0,
            enableTabScroll:true, 
            title:tabTitle,
			deferredRender : false,
			frame : true,
			plain : true,
            border : false, 
			baseCls : 'x-plain',// 是否设置和背景色同步
			width : 900,
			defaults : {
				autoHeight : true,
				bodyStyle : 'padding:2px'
			},
			items : tab
		});
		return this.tabPanel;

	},
	getPanel : function(appa,panelTitle) {
		this.Panel = new Ext.Panel({
			id : "Pages",
			height : 'auto',
			align : 'center',
			title:panelTitle,
			border : false,
            defaults : {
                 bodyStyle : 'padding:5px'
            },
			width :'auto',
			frame : true,
			autoScroll : true,
			layoutConfig : {
				columns : 1
			},
			items : appa
		});
		return this.Panel;

	}, 
	
	
 getFormKnowLedgeContract_pagepanel: function() {
      var da = new DataAction();
		var data = null;
		var biddata = "";
		if (this.dataId != '0') {
			data = da.getSingleFormPanelElementsForEdit("KnowLedgeContract_pagepanel", this.dataId);// 这是要随时变得
		} else {
			data = da.getPanelElementsForAdd("KnowLedgeContract_pagepanel");
		}
		for (i = 0; i < data.length; i++) {
			data[i].readOnly = true;
			data[i].hideTrigger = true;
		}
		biddata = da.split(data);
		this.formKnowLedgeContract_pagepanel= new Ext.form.FormPanel({
		id : 'KnowLedgeContract_pagepanel',
		layout : 'table',
		height : 300,
		width : 'auto',
		frame : true,
		defaults : {
			bodyStyle : 'padding:5px'
		},
		layoutConfig : {
			columns : 4
		},
		title : "合同基本信息",
		items : biddata
		});
		return this.formKnowLedgeContract_pagepanel;
	},
	getGrid : function(kplanId, clazz, picPanel) {
		var pPanel = picPanel;
		var da = new DataAction();
		var obj = da.getElementsForHead(clazz);

		var sm = new Ext.grid.CheckboxSelectionModel();
		var columns = new Array();
		var fields = new Array();

		columns[0] = sm;
		for (var i = 0; i < obj.length; i++) {
			var headItem = obj[i];
			var title = headItem.header;
			var alignStyle = 'left';

			var propertyName = headItem.dataIndex;

			var isHidden = false;
			//2010-04-24 modified by huzh for 隐藏某些列 begin
			if (propertyName == 'id'||propertyName=="comment"|| propertyName == 'processName'|| propertyName == 'nodeId'||propertyName == 'alterFlag'||propertyName == 'knowContract') {
				isHidden = true;
			}
			//2010-04-24 modified by huzh for 隐藏某些列 begin
			var columnItem = {
				header : title,
				dataIndex : propertyName,
				sortable : true,
				hidden : isHidden,
				align : alignStyle
			};
			//2010-04-24 add by huzh for 列调整 begin
			if(propertyName=="approver"){
				columnItem.width=200;
			}
			if(propertyName=="comment"){
				columnItem.width=160;
			}
			if(propertyName=="resultFlag"){
				columnItem.width=100;
			}
			if(propertyName=="approverDate"){
				columnItem.width=160;
			}
			if(propertyName=="processId"){
				columnItem.width=90;
			}
			if(propertyName=="nodeName"){
				columnItem.width=160;
			}
			
			//2010-04-24 add by huzh for 列调整 end
			columns[i + 1] = columnItem;
			fields[i] = propertyName;
		}

		this.storeMapping = fields;
		this.cm = new Ext.grid.ColumnModel(columns);

		this.store = da.getJsonStore(clazz);

		this.cm.defaultSortable = true;

		var viewConfig = Ext.apply({
			forceFit : true
		}, this.gridViewConfig);

		this.formValue = '';

		this.grid = new Ext.grid.GridPanel({
			store : this.store,
			cm : this.cm,
			sm : sm,
			trackMouseOver : false,
			loadMask : true,
			border: true,
			height : 700,
			width  :800
			//tbar : [new Ext.Toolbar.TextItem('<font color=red>提示：</font><font color=blue>双击审批历史条目可查看审批意见</font>')]
		});
		this.grid.on("headerdblclick", this.fitWidth, this);
		this.grid.on("celldblclick",function(g,row){
			if(g.getStore().getAt(row).get('comment')==undefined){
			  }else{
				Ext.Msg.show({
				   title:'审批意见',
				   msg:'审批人：'+g.getStore().getAt(row).get('approver')+'<br>'+'结点名称：'+g.getStore().getAt(row).get('nodeName')+'<br>'+'审批意见： '+g.getStore().getAt(row).get('comment'),
				   buttons: Ext.Msg.OK,
				   animEl: 'elId',
				   icon: Ext.MessageBox.INFO
				});
			}
		},this);
		var param = {
			'start' : 1
		};
		param.methodCall = 'query';
		param.start = 1;
		var pId;
		var url = webContext+'/knowledgeAction_findProcessIdOfLatestProcess.action?kId=' + kplanId + '&kType=3'+"&time="+new Date();
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("get", url, false);
		conn.send(null);
		if (conn.status == "200") {
			var responseText = conn.responseText;
			var data = Ext.decode(responseText);
			pId = data.processId;
		} 
		param.knowledge = kplanId;
		param.processId = pId;
		param.isAsc=true;
		this.store.removeAll();
		this.store.on('load', this.testfun, this);
		this.store.load({
			params : param
		});
		return this.grid;
	},
  	items : this.items,
	/*
	 * clientvalidation 初始化
	 */
	initComponent : function() {
	    this.model="knowledgeContractApproval_pageModel";
		this.getFormKnowLedgeContract_pagepanel();
	     var clazz = 'com.digitalchina.itil.knowledge.entity.KnowContractAuditHis';
		this.picPanel = new Ext.Panel({
			title : '审批流程图',
			layout : 'fit',
			height : 500,
			width : 800
		});
		this.hisGrid = this.getGrid(this.dataId,clazz,this.picPanel);
		var hisPanel = new Ext.Panel({
			title :  "审批历史【<font style='font-weight:lighter' color=red>双击审批历史条目可查看审批意见</font>】",
			width : 800,
			height : 200,
			layout : 'fit',
			border: true,
			items : this.hisGrid
		});
		//2010-05-17 modified by huzh for 若为知识变更，则要显示原知识信息 begin
		var panelItem=new Array();
		panelItem.push(this.formKnowLedgeContract_pagepanel);
		var oldKnowContract=Ext.getCmp("KnowContract$oldKnowContract").getValue();
		if(oldKnowContract!=""){//存在原合同，为知识变更
		  var oldpanel={  
		                  title: '原合同基本信息',
			        	  height : 300,
			              autoLoad : {
							url : webContext + "/tabFrame.jsp?url=" + webContext
									+ "/user/knowledge/oldknowContract.jsp?dataId="+oldKnowContract,
							text : "页面正在加载中......",
							method : 'post',
							scope : this
					      }
                     };
         	  panelItem.push(oldpanel);
		}
		 var auditStatusPanel=new Ext.Panel({
					xtype : 'panel',
					id : "first1",
					title : '审批状态',
					frame : true,
					border : true,
					height:"auto",
					width : 800,
					items : [hisPanel, this.picPanel]
				
				});
		panelItem.push(auditStatusPanel);
	   this.tab  = new Ext.TabPanel({	
           // title:'合同详细信息'',
			enableTabScroll : true,
			deferredRender : false,
			activeTab:0,
		    frame : true,
			plain : false,
			border : true,
			width : 750,
			height :"auto",
		    bodyBorder : true,
			items : panelItem
		});
		//2010-05-17 modified by huzh for 若为知识变更，则要显示原知识信息 end
		this.items = [this.tab];
		PageTemplates.superclass.initComponent.call(this);
	}
})