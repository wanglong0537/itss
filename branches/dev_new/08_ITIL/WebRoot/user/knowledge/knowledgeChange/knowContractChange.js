PagePanel = Ext.extend(Ext.Panel, {
	id : "KnowContractManager",
	closable : true,
	frame : true,
	 autoScroll : true,
	viewConfig : {
		autoFill : true,
		forceFit : true
	},
	layout : 'border',
	getSearchForm : function() {
		this.panel = new Ext.form.FormPanel({
			id : "searchForm",
			region : "north",
			layout : 'table',
			height : 60,
			width : 'auto',
			frame : true,
//			 autoScroll : true,
			collapsible : true,
			defaults : {
				bodyStyle : 'padding:2px'
			},
			layoutConfig : {
				columns : 4
			},
			title : "查询条件",
			items : [{
				html : '合同名称:',
				cls : 'common-text',
				style : 'width:100;text-align:right'
			}, new Ext.form.TextField({
				xtype : 'textfield',
				colspan : 0,
				rowspan : 0,
				id : 'name',
				name : 'name',
				style : '',
				width : 200,
				value : '',
				allowBlank : true,
				validator : '',
				vtype : ''
			}), {
				html : '创建人:',
				cls : 'common-text',
				style : 'width:80;text-align:right'
			}, new Ext.form.ComboBox({
				id : 'createUserCombo',
				fieldLabel : "创建人",
				//width : 200,
				width : 220,//2010-04-16 modified by huzh for bug(分页工具栏“最后一页”标记显示不出来)
				hiddenName : 'createUser',
				displayField : 'userName',
				valueField : 'id',
				resizable : true,
				emptyText :'请从下拉列表中选择...',
				triggerAction : 'all',
				store : new Ext.data.JsonStore({
					url : webContext
							+ '/extjs/comboDataAction?clazz=com.zsgj.info.framework.security.entity.UserInfo',
					fields : ['id', 'userName'],
					listeners : {
						beforeload : function(store, opt) {
							if (opt.params['createUser'] == undefined) {
								opt.params['userName'] = Ext
										.getCmp('createUserCombo').defaultParam;
							}
						}
					},
					totalProperty : 'rowCount',
					root : 'data',
					id : 'id'
				}),
				pageSize : 10,
				listeners : {
					'beforequery' : function(queryEvent) {
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
				}
			})]
		});
		return this.panel;
	},
	show : function() {
		var record = Ext.getCmp('KnowContractListGrid').getSelectionModel()
				.getSelected();
		var records = Ext.getCmp('KnowContractListGrid').getSelectionModel()
				.getSelections();
		if (!record) {
			Ext.Msg.alert("提示", "请先选择要查看的行！");
			return;
		}
		if (records.length > 1) {
			Ext.Msg.alert("提示", "查看时只能选择一行！");
			return;
		}
		var knowContractId = record.get('KnowContract$id');
		var da = new DataAction();
		var data = da.getKnowledgeFormPanelElementsForEdit(
				"KnowLedgeContract_pagepanel", knowContractId);
		for(var i=0;i<data.length;i++){
			if(data[i].name=='KnowContract$number'){
			 	data[i].readOnly=true;
			}
		}
		//2010-04-20 modified by huzh for 页面修整 begin
		//var dataform = da.split(data);
		var dataform = this.split(data);
		//2010-04-20 modified by huzh for 页面修整 end
		var knowForm = new Ext.form.FormPanel({
			id : 'knowledgeSkip',
			layout : 'table',
			width : 630, //2010-04-20 modified by huzh 
			height : 'auto',
			layoutConfig : {
				columns : 4
			},
			defaults : {
				bodyStyle : 'padding:6px'
			},
			frame : true,
			items : dataform
		});
		var windowSkip = new Ext.Window({
			title : '查看详细信息',
			width : 648, //2010-04-20 modified by huzh 
			height : 'auto',
			modal : true,
			//maximizable : true,
			items : [knowForm],
			bodyStyle : 'padding:2px', //2010-04-20 modified by huzh 
			buttons : [{
			text : '暂存变更',
			id : 'savelistbutton',
			handler : function() {
				var name=Ext.getCmp('KnowContract$name');
					if(name.getValue().trim()==""){
						name.setValue('');
					}
				Ext.getCmp("savelistbutton").disable();
				Ext.getCmp("submitknowbutton").disable();
				Ext.getCmp("closebutton").disable();
				if (Ext.getCmp("knowledgeSkip").getForm().isValid()) {
//					var panelTypeParam = Ext.encode(Ext.getCmp("knowledgeSkip").form.getValues(false));
					var panelTypeParam = Ext.encode(getFormParam('knowledgeSkip'));
					Ext.Ajax.request({
						url : webContext+ '/knowledgeAction_saveKnowContractChangDraft.action',
						params : {
							panelTypeParam : panelTypeParam
						},
						method : 'post',
						success : function() {
							Ext.MessageBox.alert("提示", "保存变更数据成功！",function(){
								windowSkip.close();
							}); 
							var params = Ext.getCmp("searchForm").getForm().getValues(false);
							var store = Ext.getCmp("KnowContractListGrid").getStore();
							params.start = 0;
							params.status = 1;
//							Ext.getCmp("pagetoolbar").formValue = param;
							store.on('beforeload', function(a) {   
							      Ext.apply(a.baseParams,params);   
							});
							store.load({
								params : params
							});
						},
						failure : function(response, options) {
							Ext.getCmp("savelistbutton").enable();
							Ext.getCmp("submitknowbutton").enable();
							Ext.getCmp("closebutton").enable();
							Ext.MessageBox.alert("提示", "保存变更数据失败！");
						}
					});
				}else{
					 Ext.MessageBox.alert("提示", "红色波浪线部分为必填项！"); 
					 Ext.getCmp("savelistbutton").enable();
					Ext.getCmp("submitknowbutton").enable();
					Ext.getCmp("closebutton").enable();
					 return;
				}
			},
			scope : this
			}, {
				text : '提交变更',
				id : 'submitknowbutton',
				handler : function() {
					var name=Ext.getCmp('KnowContract$name');
					if(name.getValue().trim()==""){
						name.setValue('');
					}
					Ext.getCmp("savelistbutton").disable();
					Ext.getCmp("submitknowbutton").disable();
					Ext.getCmp("closebutton").disable();
					if (Ext.getCmp("knowledgeSkip").getForm().isValid()) {
//						var panelTypeParam = Ext.encode(Ext
//								.getCmp("knowledgeSkip").form.getValues(false));
						var panelTypeParam = Ext.encode(getFormParam('knowledgeSkip'));
						Ext.Ajax.request({
							url : webContext
									+ '/knowledgeAction_saveKnowContractChangDraft.action',
							params : {
								knowContractId :knowContractId,
								panelTypeParam : panelTypeParam
							},
							method : 'post',
							success : function(response) {
								var r =Ext.decode(response.responseText);
                               if(r.success==false){
	                             	 Ext.MessageBox.alert("提示", "该合同已变更过或正处于变更申请中，您不能再次对其提交变更申请！"); 
	                             	 var params = Ext.getCmp("searchForm").getForm().getValues(false);
									 var store = Ext.getCmp("KnowContractListGrid").getStore();
									 params.start = 0;
									 params.status = 1;
//									 Ext.getCmp("pagetoolbar").formValue = param;
									 store.on('beforeload', function(a) {   
									      Ext.apply(a.baseParams,params);   
									});
									 store.load({
										params : params
									 });
                               }else{
								var dataId = eval('('
										+ response.responseText + ')').dataId;
								//---------------------------------------------
								//提交流程（合同、解决方案、文件）
								var dataType = 6;//数据类型Id
								Ext.Ajax.request({
									url : webContext + '/configWorkflow_findProcessByPram.action',
									params : {
										modleType : 'Kno_Contract',//
										processStatusType : '1'//
									},
									success : function(response, options) {
										var responseArray = Ext.util.JSON
												.decode(response.responseText);
										var vpid = responseArray.vpid;
										if(vpid!=""&&vpid!=undefined&&vpid.length>0){
											Ext.Ajax.request({
												url : webContext
														+ '/knowledgeWorkflow_apply.action',
												params : {
													dataId : dataId,
													model : this.model,
													bzparam : "{dataId :'"
															+ dataId
															+ "',dataType : '"
															+ dataType
															+ "',applyId : '"
															+ dataId
															+ "', applyType: 'kproject',applyTypeName: '知识变更审批',customer:''}",
													defname : vpid
												},
												success : function(response){
													var meg = Ext.decode(response.responseText);
													if (meg.Exception != undefined) {
														Ext.Msg.alert("提示",meg.Exception);
													}else{
														Ext.Msg.alert("提示","提交变更申请成功！",function(){
															windowSkip.close();
															var params = Ext.getCmp("searchForm").getForm().getValues(false);
															var store = Ext.getCmp("KnowContractListGrid").getStore();
															params.start = 0;
															params.status = 1;
//															Ext.getCmp("pagetoolbar").formValue = param;
															this.store.on('beforeload', function(a) {   
															      Ext.apply(a.baseParams,params);   
															});
															store.load({
																params : params
															});
														});
													}
												}
											});
										}else{
											Ext.MessageBox.alert("未找到对应的流程，请查看是否配置!");
										}
									},
									failure : function(response, options) {
										Ext.MessageBox.alert("未找到对应的流程，请查看是否配置!");
									}
								}, this);
                               }
							},
							failure : function(response, options) {
								Ext.getCmp("savelistbutton").enable();
								Ext.getCmp("submitknowbutton").enable();
								Ext.getCmp("closebutton").enable();
								Ext.MessageBox.alert("提示", "保存变更数据失败！");
							}
						});
					}else{
						Ext.getCmp("savelistbutton").enable();
						Ext.getCmp("submitknowbutton").enable();
						Ext.getCmp("closebutton").enable();
						 Ext.MessageBox.alert("提示", "红色波浪线部分为必填项！"); 
					}
				},
				scope : this
			}, 
					{
					text : '关闭',
					id : 'closebutton',
					handler : function() {
							windowSkip.close();	
					},
					scope : this
				}]
		});
		windowSkip.show();
	},
	//2010-04-20 add by huzh for 页面修整 begin
	split : function(data) {
		var labellen = 90;
		var itemlen = 200;
		var throulen = 500;
		if (Ext.isIE) {
			throulen = 500;
		} else {
			throulen = 510;
		}
		if (data == null || data.length == 0) {
			return null;
		}
		var hid = 0;
		var hidd = new Array();
		var longData = new Array();
		var longitems = 0;
		//alert(this.dataId);         
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
			if (data[i].xtype == "fckeditor") {
				data[i] = {
					value : data[i].value,
					xtype : "fckeditor",
					colspan : 3,
					fieldLabel : data[i].fieldLabel,
					cls : 'common-text',
					width: data[i].width,
					height : 220
				};
			}
			//add by lee for 为下拉列表增加可拖拽属性以修改不能看全信息的BUG in 20091112 BEGIN
			if (data[i].xtype == "combo") {
				data[i].resizable = true;
			}
			//add by lee for 为下拉列表增加可拖拽属性以修改不能看全信息的BUG in 20091112 END
			if (data[i].width == null || data[i].width == 'null'
					|| data[i].width == "") {
				data[i].style += "width:" + itemlen + "px";
				data[i].width = itemlen;
			} else {
				if (data[i].width == "9999") {//通栏  
					// alert("data");
					if ((i - hid + longitems) % 2 == 1) {//在右侧栏，前一栏贯通                                             
						longData[2 * (i - hid) - 1].colspan = 3;
					} else {//多占一栏
						longitems++;
					}
					data[i].colspan = 3;//本栏贯通                                            
					data[i].width = throulen;
					if (data[i].xtype == "textarea") {
						data[i].height = 150;
					}
					data[i].style += "width:" + throulen + "px;";
				} else {//正常长度，半栏 
					data[i].style += "width:" + itemlen + "px";
					data[i].width = itemlen;
				}
			}
			//alert(data[i].width+data[i].name);
			longData[2 * (i - hid)] = {
				html : data[i].fieldLabel + ":",
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
	//2010-04-20 add by huzh for 页面修整 end
	items : this.items,
	initComponent : function() {
		var da = new DataAction();
		var DataHead = da
				.getListPanelElementsForHead("KnowLedgeContractQuery_pagepanel");
		var sm = new Ext.grid.CheckboxSelectionModel();
		var columns = new Array();
		var fields = new Array();
		columns[0] = sm;
		for (var i = 0; i < DataHead.length; i++) {
			var headItem = DataHead[i];
			var title = headItem.header;
			var alignStyle = 'left';
			var propertyName = headItem.dataIndex;
			var isHiddenColumn = false;
			var isHidden = headItem.isHidden;
			if (isHidden == 'true') {
				isHiddenColumn = true;
			}
			if(propertyName=="KnowContract$status"
			    ||propertyName=="KnowContract$createUser"
			      ||propertyName=="KnowContract$createDate"){
				isHiddenColumn = false;
			}
			var columnItem = {
				header : title,
				dataIndex : propertyName,
				sortable : true,
				hidden : isHiddenColumn,
				align : alignStyle
			}
			//2010-04-24 add by huzh for 列调整 begin
			if(propertyName=="KnowContract$id"){
				columnItem.width=70;
			}
			if(propertyName=="KnowContract$name"){
				columnItem.width=200;
			}
			if(propertyName=="KnowContract$descn"){
				columnItem.width=230;
			}
			if(propertyName=="KnowContract$createDate"){
				columnItem.width=120;
			}
			if(propertyName=="KnowContract$createUser"){
				columnItem.width=100;
			}
			//2010-04-24 add by huzh for 列调整 end
			columns[i + 1] = columnItem;
			fields[i] = propertyName;
		}
		this.storeMapping = fields;
		this.cm = new Ext.grid.ColumnModel(columns);
		this.store = da.getPanelJsonStore("KnowLedgeContractQuery_pagepanel",
				DataHead);
        this.store.on("load",function(store,records, opt) {
					for(var i=0;i<records.length;i++){
						var cDate=records[i].get("KnowContract$createDate")
						if(cDate!=""){
							records[i].set("KnowContract$createDate",cDate.substring(0,16));
						}
						 if(records[i].get("KnowContract$status")==1){
							records[i].set("KnowContract$status","正式");
						}
					}
		});
		this.fp = this.getSearchForm();
		this.store.paramNames.sort = "orderBy";
		this.store.paramNames.dir = "orderType";
		this.cm.defaultSortable = true;
		var viewConfig = Ext.apply({
			forceFit : true
		}, this.gridViewConfig);

		var pageBar = new Ext.PagingToolbar({
			id : "pagetoolbar",
			pageSize : 10,
			store : this.store,
			displayInfo : true,
			displayMsg : '当前显示 {0}-{1}条记录 /共{2}条记录',
			emptyMsg : "无显示数据"
		});
		this.searchConfig = function() {
			if(Ext.getCmp('createUserCombo').getRawValue()!=''&&Ext.getCmp('createUserCombo').getValue()==''){
			    Ext.Msg.alert("提示","请从下拉列表中选择正确的创建人！");
			    return false;
			}
			if(Ext.getCmp('createUserCombo').getRawValue()==''){
				Ext.getCmp('createUserCombo').clearValue();
			}
			var params = Ext.getCmp("searchForm").getForm().getValues(false);
			var store = Ext.getCmp("KnowContractListGrid").getStore();
			params.start = 0;
			params.status = 1;
//			pageBar.formValue = param;
			store.on('beforeload', function(a) {   
			      Ext.apply(a.baseParams,params);   
			});
			store.load({
				params : params
			});
		}, this.grid = new Ext.grid.GridPanel({
			id : "KnowContractListGrid",
			region : "center",
			store : this.store,
			cm : this.cm,
			sm : sm,
			trackMouseOver : false,
			loadMask : true,
			y : 140,
			height : 200,
			anchor : '0 -35',
			tbar : [{
				xtype : 'button',
				style : 'margin:2px 0px 2px 5px',
				handler : this.searchConfig,
				text : '查询',
				iconCls : 'search'
			}, '-',{
				xtype : 'button',
				style : 'margin:2px 0px 2px 5px',
				text : '变更',
				handler : this.show,
				scope : this,
				iconCls : 'edit'
			},'-',{
				xtype : 'button',
				style : 'margin:2px 0px 2px 5px',
				handler : function() {
					Ext.getCmp("searchForm").getForm().reset();
				},
				text : '清除',
				iconCls : 'reset'
			},new Ext.Toolbar.TextItem("<font color=red style='font-weight:lighter' >【双击后查看详细信息】</font>")],
			bbar : pageBar
		});

		this.grid.on("headerdblclick", this.fitWidth, this);
		this.grid.on("rowdblclick", this.show, this);
		var items = new Array();
		items.push(this.fp);
		items.push(this.grid);
		this.items = items;

		PagePanel.superclass.initComponent.call(this);
		var params = {
			start : 0,
			'status' : 1
		};
//		pageBar.formValue = param;
		this.store.on('beforeload', function(a) {   
		      Ext.apply(a.baseParams,params);   
		});
		this.store.removeAll();
		this.store.load({
			params : params
		});
	},
	fitWidth : function(grid, columnIndex, e) {
		var c = columnIndex;
		var w = grid.view.getHeaderCell(c).firstChild.scrollWidth;
		for (var i = 0, i = grid.store.getCount(); i < l; i++) {
			w = Math.max(w, grid.view.getCell(i, c).firstChild.scrollWidth);
		}
		grid.colModel.setColumnWidth(c, w);
	}
});