 ContractHistroyForm = Ext.extend(Ext.Panel, {
	id : "contractHistroyForm",
	layout : 'table',
	height : 'auto',
	align : 'center',
	foredit : true,
	width : 'auto',
	frame : true,

	defaults : {
		bodyStyle : 'padding:4px'
	},
	layoutConfig : {
		columns : 1
	},
	fitWidth : function(grid, columnIndex, e) {
		var c = columnIndex;
		var w = grid.view.getHeaderCell(c).firstChild.scrollWidth;
		for (var i = 0, l = grid.store.getCount(); i < l; i++) {
			w = Math.max(w, grid.view.getCell(i, c).firstChild.scrollWidth);
		}
		grid.colModel.setColumnWidth(c, w);
	},
	goBackUrl : function() {
	},
	getButtons : function() {
		return [{
			xtype : 'button',
			style : 'margin:4px 10px 4px 0',
			handler : function() {
//				history.back();
				window.location = webContext
							+ '/user/knowledgeAuditQuery/knowContractAuditSearch.jsp';
			},
			align : 'center',
			iconCls : 'back', //2010-04-30 modified by huzh
			text : '返回'
		}]
	},
	items : this.items,

	split : function(data) {
		var labellen = 135;
		var itemlen = 200;
		var throulen = 550;
		if (data == null || data.length == 0) {
			return null;
		}
		var hid = 0;
		var hidd = new Array();
		var longData = new Array();
		for (i = 0; i < data.length; i++) {
			data[i].style = data[i].style == null ? "" : data[i].style;
			if (data[i].xtype == "textarea") {
				data[i].style += "'margin:5 0 5 0;'";
			}
			if (data[i].xtype == "hidden") {
				hidd[hid] = data[i];
				hid++;
				continue;
			}

			if (data[i].width == null || data[i].width == 'null'
					|| data[i].width == "") {
				data[i].style += "width:" + itemlen + "px";
				data[i].width += "'" + itemlen + "'";
			} else {
				if (data[i].width == "9999") {// 通栏
					if (i % 2 == 1) {// 在右侧栏，前一栏贯通
						longData[2 * (i - hid) - 1].colspan = 3;
					}
					data[i].colspan = 3;// 本栏贯通
					data[i].width = throulen;
					data[i].style += "width:" + throulen + "px;";
				} else {// 正常长度，半栏
					data[i].style += "width:" + data[i].width + "px;";
				}
			}
			longData[2 * (i - hid)] = {
				html : data[i].feildLabel + ":",
				cls : 'common-text',
				style : 'width:' + labellen + ';text-align:right'
			};
			longData[2 * (i - hid) + 1] = data[i];
		}
		for (i = 0; i < hidd.length; i++) {
			longData[longData.length] = hidd[i];
		}
		return longData;

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
					knowContract : record.get('knowContract')
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
		getKnowContractForm : function(knowContractId) {
			        var da = new DataAction();
			        var data=da.getKnowledgeFormPanelElementsForEdit("KnowLedgeContract_pagepanel",knowContractId);
			        var dataform = da.splitForReadOnly(data);
			        this.knowFormPanel = new Ext.form.FormPanel({
			             id:'knowContractDetails',
				         layout : 'table',
				        autoScroll:true,
						title:"合同基本信息",
					    height : 340,	
						width : 767,
						frame : true,
						border:true,
//						collapsible : true,
						defaults : {
							bodyStyle : 'padding:5px' //2010-04-20 modified by huzh 
						},
						layoutConfig : {
							columns : 4
						},
				         items : dataform
			           });
		     	return this.knowFormPanel;
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
			'start' : 0
		};
		param.methodCall = 'query';
		param.start = 0;
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
		param.knowContract = kplanId;
		param.processId = pId;
		param.isAsc=true;
		this.store.removeAll();
		this.store.on('load', this.testfun, this);

		this.store.load({
			params : param
		});

		return this.grid;

	},
	
	initComponent : function() {
		var clazz = 'com.digitalchina.itil.knowledge.entity.KnowContractAuditHis';
		this.mybuttons = this.getButtons();
		var da = new DataAction();
		var biddata = "";
		this.picPanel = new Ext.Panel({
			title : '审批流程图',
			layout : 'fit',
			height : 500,
			width : 840

		});
		this.hisGrid = this.getGrid(this.dataId,clazz,this.picPanel);
		var hisPanel = new Ext.Panel({
			title :  "审批历史【<font style='font-weight:lighter' color=red>双击审批历史条目可查看审批意见</font>】",
			width : 840,
			height : 200,
			layout : 'fit',
			border: true,
			items : this.hisGrid

		});

		// 按钮
		var buttons = {
			layout : 'table',
			height : 'auto',
			width : 'auto',
			style : 'margin:4px 6px 4px 400px',//2010-04-30 modified by huzh
			align : 'center',
			defaults : {
				bodyStyle : 'padding:4px'
			},
			items : this.mybuttons
		}

		this.knowContractPanel=this.getKnowContractForm(this.dataId);
		//2010-05-17 modified by huzh for 若为知识变更，则要显示原知识信息 begin
		var panelItem=new Array();
		panelItem.push(this.knowContractPanel);
		var oldKnowContract=Ext.getCmp("KnowContract$oldKnowContract").getValue();
		if(oldKnowContract!=""){//存在原合同，为知识变更
		  var oldpanel={  
		                  title: '原合同基本信息',
			        	  height : 340,
			              autoLoad : {
							url : webContext + "/tabFrame.jsp?url=" + webContext
									+ "/user/knowledgeAuditQuery/oldknowContract.jsp?dataId="+oldKnowContract,
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
           // title:'合同详细信息',
			enableTabScroll : true,
			deferredRender : false,
			activeTab:0,
		    frame : true,
			plain : false,
			border : true,
			width : 860,//2010-04-30 modified by huzh
			height :"auto",
		    bodyBorder : true,
			items : panelItem
		});
		//2010-05-17 modified by huzh for 若为知识变更，则要显示原知识信息 end
		this.items = [this.tab,buttons];
		ContractHistroyForm.superclass.initComponent.call(this);
	}

})
