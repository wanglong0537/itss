PagePanel = Ext.extend(Ext.Panel, {
	id : "KnowledgeManager",
	closable : true,
	frame : true,
	autoScroll : true,
	viewConfig : {
		autoFill : true,
		forceFit : true 
	},
	layout : 'border',
	getknowSearchForm : function() {
		var serviceItemBySu = new Ext.form.ComboBox({
			name : "serviceItemBySu",
			id : 'serviceItemBySu',
			fieldLabel : "服务项",
			//width : 180,
			width : 200, //2010-04-16 modified by huzh for bug(分页工具栏“最后一页”标记显示不出来)
			hiddenName : 'serviceItem',
			displayField : 'name',
			valueField : 'id',
			lazyRender : true,
			minChars : 50,
			emptyText :'请从下拉列表中选择...',
			resizable : true,
			triggerAction : 'all',
			selectOnFocus : true,
			store : new Ext.data.JsonStore({
				url : webContext
						+ '/eventAction_findServiceItem.action',
				fields : ['id', 'name'],
				totalProperty : 'rowCount',
				root : 'data',
				id : 'id'
			}),
			pageSize : 10,
			listeners : {
				'beforequery' : function(queryEvent) {
					Ext.getCmp('problemTypebySu').clearValue();
//					var discValue = Ext.getCmp('serviceItemTypebySu').getValue();
					var param = queryEvent.combo.getRawValue();
					var val = queryEvent.combo.getValue();
					if (queryEvent.query == '') {
						param = '';
					}
					this.store.baseParams={"name" : param,official:1};
					this.store.load();
					return false;
				},
				"select" :function(){
				 Ext.getCmp('problemTypebySu').clearValue();
				}
				
			}

		});
		var problemTypebySu = new Ext.form.ComboBox({
			name : "problemTypebySu",
			id : 'problemTypebySu',
			fieldLabel : "问题类型",
			//width : 180,
			width : 200, 
			hiddenName : 'knowProblemType',
			displayField : 'name',
			valueField : 'id',
			lazyRender : true,
			minChars : 50,
			emptyText :'请从下拉列表中选择...',
			resizable : true,
			triggerAction : 'all',
			selectOnFocus : true,
			store : new Ext.data.JsonStore({
				url : webContext  + '/knowledgeAction_findKnowProblemType.action',
				fields : ['id', 'name'],
				totalProperty : 'rowCount',
				root : 'data',
				id : 'id'
			}),
			pageSize : 10,
			listeners : {
				'beforequery' : function(queryEvent) {
					var discValue = Ext.getCmp('serviceItemBySu').getValue();
					var param = queryEvent.combo.getRawValue();
					var val = queryEvent.combo.getValue();
					if (queryEvent.query == '') {
						param = '';
					}
					this.store.baseParams={
						"name" : param,
						serviceItem : discValue,
						deleteFlag :0//过滤掉已删除的问题类型
					};
					this.store.load();
					return false;
				}
			}
		});
		var summary = new Ext.form.TextField({
			name : "summary",
			fieldLabel : "具体问题",
			id : 'summary',
			//width : 180
			width : 200
		});
		this.panel = new Ext.form.FormPanel({
			id:"knowSearchForm",
			region : "north", 
			layout : 'table',
			height : 60,
			width : 'auto',
			frame : true,
//			autoScroll : true,
			collapsible : true,
			defaults : {
				bodyStyle : 'padding:2px'
			},
			layoutConfig : {
				columns : 6
			},
			title : "查询条件",
			items : [{
				html : "服务项:",
				cls : 'common-text',
				width : 80,
				style : 'width:150;text-align:right'
			}, serviceItemBySu, {
				html : "问题类型:",
				cls : 'common-text',
				width : 80,
				style : 'width:150;text-align:right'
			}, problemTypebySu, {
				html : "具体问题:",
				cls : 'common-text',
				width : 80,
				style : 'width:150;text-align:right'
			}, summary]
		});
		return this.panel;
	},
	 remove : function() {
		var record = Ext.getCmp('konwledgeGrid').getSelectionModel().getSelected();
		var records = Ext.getCmp('konwledgeGrid').getSelectionModel().getSelections();
		if (!record) {
			Ext.Msg.alert("提示", "请先选择要删除的行！");
			return;
		}
		if (records.length == 0) {
			Ext.MessageBox.alert('提示', '最少选择一条信息进行删除！');
			return;
		}
		var id = new Array();
		var da = new DataAction();
		var firm  =Ext.Msg.confirm('提示', '您确定要进行删除操作吗？', function(button) {
			if (button == 'yes') {
				for(var i=0;i<records.length;i++){	
					id[i] = records[i].get("Knowledge$id");
				Ext.Ajax.request({
						url : webContext
								+ '/extjs/dataAction?method=remove&clazz=com.digitalchina.itil.knowledge.entity.Knowledge',
						params : {id:id[i]},
						timeout:100000, 
						success:function(response){
	                       var r =Ext.decode(response.responseText);
	                       if(!r.success){
	                       		Ext.Msg.alert("提示","数据删除失败！");
	                       }else{  
		                       	  var params = Ext.getCmp("knowSearchForm").getForm().getValues(false);
								  var store=Ext.getCmp("konwledgeGrid").getStore();
						          params.start = 0;  
						          params.status=0;
//						          Ext.getCmp("pagetoolBar").formValue=param;
						          store.on('beforeload', function(a) {   
									      Ext.apply(a.baseParams,params);   
									});
						          store.load({
						              params : params
						          });
		                    }
	                   },scope:this
						
					});
				}
			}
		}, this);

	  },
    	show:function(){ 
	            var record =  Ext.getCmp('konwledgeGrid').getSelectionModel().getSelected();
				var records =  Ext.getCmp('konwledgeGrid').getSelectionModel().getSelections();
				if(!record){
					Ext.Msg.alert("提示","请先选择要查看的行!");
					return;
				}
				if(records.length>1){
					Ext.Msg.alert("提示","查看时只能选择一行!");
					return;
				}
				var knowledgeId=record.get('Knowledge$id');	
		        var da = new DataAction();
		        var data=da.getKnowledgeFormPanelElementsForEdit("KnowLedgeSolution_pagepanel",knowledgeId);
		        var dataform = this.split(data);
		        var knowForm = new Ext.form.FormPanel({
		             id:'knowledgeSkip',
			         layout : 'table',
			         width : 630,     //2010-04-20 modified by huzh 
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
			// add by huzh for bug in 20100324 start,解决修改时的联动问题
		   var sItem="";
		   var kProblemType="";
		    for(var i=0;i<data.length;i++){
				if(data[i].name=="Knowledge$serviceItem"){
				    sItem=data[i];
				};
				if(data[i].name=="Knowledge$knowProblemType"){
					kproblmeType=data[i];
				};
			}
			if(sItem!=null){
			    sItem.store.on('beforeload',function(store, opt) {
					if (opt.params['Knowledge$serviceItem'] == undefined) {
						opt.params['name'] = Ext.getCmp('Knowledge$serviceItemCombo').defaultParam;
						opt.params['official'] = 1;
					}
				});
				sItem.on('select', function() {
							Ext.getCmp('Knowledge$knowProblemTypeCombo').clearValue();
				});
			}
		    if(kproblmeType!=null){
		    	kproblmeType.store.on('beforeload',function(store, opt) {
						if (opt.params['Knowledge$knowProblemType'] == undefined) {
							opt.params['name'] = Ext.getCmp('Knowledge$knowProblemTypeCombo').defaultParam;
							opt.params['serviceItem'] = Ext.getCmp('Knowledge$serviceItemCombo').getValue();
							opt.params['deleteFlag'] = 0;
						}
					});
		    }
			var windowSkip = new Ext.Window({
				title : '查看详细信息',
				width : 650,  //2010-04-20 modified by huzh 
				height :'auto',
				modal : true,
				//maximizable : true,
				items : [knowForm],
				bodyStyle : 'padding:2px',
				buttons : [{
				text : '暂存',
				id : 'savelistbutton',
				handler : function() {
					var si=Ext.getCmp('Knowledge$serviceItemCombo');
					var kt=Ext.getCmp('Knowledge$knowProblemTypeCombo');
					var su=Ext.getCmp('Knowledge$summary');
					if(su.getValue().trim()==""){
						su.setValue('');
					}
					if(si.getValue().trim()==""){
						si.clearValue();
					}
					if(kt.getValue().trim()==""){
						kt.clearValue();
					}
					Ext.getCmp("savelistbutton").disable();
				   	Ext.getCmp("submitknowbutton").disable();
					Ext.getCmp("closebutton").disable();
					if (Ext.getCmp("knowledgeSkip").getForm().isValid()) {
//						var knowledgeParam = Ext.encode(Ext.getCmp("knowledgeSkip").form.getValues(false));
						var resolvent = Ext.encode(Ext.getCmp('Knowledge$resolvent').getValue());
						var knowledgeParam = Ext.encode(getFormParam("knowledgeSkip"));
						Ext.Ajax.request({
							url : webContext+ '/knowledgeAction_saveKnowledgeEntityDraft.action',
							params : {
								knowledgeParam : knowledgeParam,
								resolvent : resolvent.substring(1,resolvent.length-1)
							},
							method : 'post',
							success : function() {
								Ext.MessageBox.alert("提示", "保存数据成功!",function(){
									windowSkip.close();
									//add by huzh for bug begin in 20100407
									var params = Ext.getCmp("knowSearchForm").getForm().getValues(false);
									var store=Ext.getCmp("konwledgeGrid").getStore();
							        params.start = 0;  
							        params.status=0;
//							        Ext.getCmp("pagetoolBar").formValue=param;
							        store.on('beforeload', function(a) {   
									      Ext.apply(a.baseParams,params);   
									});
							        store.load({
							            params : params
							        });
							        //add by huzh for bug end
								}); 
							},
							failure : function(response, options) {
								Ext.MessageBox.alert("提示", "保存数据失败!");
								Ext.getCmp("savelistbutton").enable();
							   	Ext.getCmp("submitknowbutton").enable();
								Ext.getCmp("closebutton").enable();
							}
						});
					}else{
					 Ext.MessageBox.alert("提示", "红色波浪线部分为必填项!"); 
					 Ext.getCmp("savelistbutton").enable();
				   	Ext.getCmp("submitknowbutton").enable();
					Ext.getCmp("closebutton").enable();
					 return;
					}
				},
				scope : this
			}, {
				text : '提交',
				id : 'submitknowbutton',
				handler : function() {
					var si=Ext.getCmp('Knowledge$serviceItemCombo');
					var kt=Ext.getCmp('Knowledge$knowProblemTypeCombo');
					var su=Ext.getCmp('Knowledge$summary');
					if(su.getValue().trim()==""){
						su.setValue('');
					}
					if(si.getValue().trim()==""){
						si.clearValue();
					}
					if(kt.getValue().trim()==""){
						kt.clearValue();
					}
					Ext.getCmp("savelistbutton").disable();
				   	Ext.getCmp("submitknowbutton").disable();
					Ext.getCmp("closebutton").disable();
					if (Ext.getCmp("knowledgeSkip").getForm().isValid()) {
//						var knowledgeParam = Ext.encode(Ext
//								.getCmp("knowledgeSkip").form.getValues(false));
						var resolvent = Ext.encode(Ext.getCmp('Knowledge$resolvent').getValue());
						var knowledgeParam = Ext.encode(getFormParam("knowledgeSkip"));
						Ext.Ajax.request({
							url : webContext
									+ '/knowledgeAction_saveKnowledgeEntityDraft.action',
							params : {
								knowledgeParam : knowledgeParam,
								resolvent : resolvent.substring(1,resolvent.length-1)
							},
							method : 'post',
							success : function(response) {
								var dataId = eval('('
										+ response.responseText + ')').dataId;
								//---------------------------------------------
								//提交流程（合同、解决方案、文件）
								var dataType = 8;//数据类型Id
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
													+ "', applyType: 'kproject',applyTypeName: '知识审批',customer:''}",
										    defname : "KnowledgeProcess1276415839731"
										},
										success:function(response){
											var meg = Ext.decode(response.responseText);
											if (meg.Exception != undefined) {
												Ext.Msg.alert("提示",meg.Exception);
											}else{
												Ext.Msg.alert("提示","提交成功！",function(){
													windowSkip.close();
													//add by huzh for bug begin in 20100407
													var params = Ext.getCmp("knowSearchForm").getForm().getValues(false);
													var store=Ext.getCmp("konwledgeGrid").getStore();
											        params.start = 0;  
											        params.status=0;
//											        Ext.getCmp("pagetoolBar").formValue=param;
											        store.on('beforeload', function(a) {   
													      Ext.apply(a.baseParams,params);   
													});
											        store.load({
											            params : params
											        });
											        //add by huzh for bug end in 20100407
												});
											}
										}
								});
								
							},
							failure : function(response, options) {
								Ext.getCmp("savelistbutton").enable();
							   	Ext.getCmp("submitknowbutton").enable();
								Ext.getCmp("closebutton").enable();
								Ext.MessageBox.alert("提示", "保存数据失败!");
							}
						});

					}else{
				//add by huzh for bug in 20100324 start
					 Ext.MessageBox.alert("提示", "红色波浪线部分为必填项!"); 
					 Ext.getCmp("savelistbutton").enable();
				   	Ext.getCmp("submitknowbutton").enable();
					Ext.getCmp("closebutton").enable();
					 return;
					}
					//add by huzh for bug in 20100324 end
				},
				scope : this
			},{
				text : '关闭',
				id :'closebutton',
				handler : function() {
					windowSkip.close();
				},
				scope : this
			}]
			  });
	        windowSkip.show();
      },
      split : function(data) {
		var labellen = 90;  //2010-04-20 modified by huzh 
		var itemlen = 200;
		var throulen = 300;
		if (Ext.isIE) {
			throulen = 300;
		} else {
			throulen = 490;
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
			//2010-04-30 delete by huzh for 再保存的时候会出错 begin
			/*if (data[i].xtype == "fckeditor") {
				data[i] = {
					value : data[i].value,
					xtype : "fckeditor",
					colspan : 3,
					fieldLabel : data[i].fieldLabel,
					cls : 'common-text',
					width: data[i].width,
					height : 220
				};
			}*/
			//2010-04-30 delete by huzh for 再保存的时候会出错 end
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
	items : this.items,
	initComponent : function(){
		var da = new DataAction();
		var DataHead=da.getListPanelElementsForHead("KnowLedgeSolutionList_pagepanel");
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
            if(isHidden=='true'){
                    isHiddenColumn = true;  
            }  
             if(propertyName=="Knowledge$knowledgeCisn"
                 ||propertyName=="Knowledge$createDate"
                   ||propertyName=="Knowledge$createUser"){
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
			if(propertyName=="Knowledge$createUser"){
				columnItem.width=100;
			}
			if(propertyName=="Knowledge$createDate"){
				columnItem.width=120;
			}
			if(propertyName=="Knowledge$summary"){
				columnItem.width=200;
			}
			if(propertyName=="Knowledge$id"){
				columnItem.width=70;
			}
			if(propertyName=="Knowledge$knowProblemType"){
				columnItem.width=180;
			}
			if(propertyName=="Knowledge$serviceItem"){
				columnItem.width=180;
			}
			//2010-04-24 add by huzh for 列调整 end
			columns[i + 1] = columnItem;
			fields[i] = propertyName;
		}
		this.storeMapping = fields;
		this.cm = new Ext.grid.ColumnModel(columns);
		this.store= da.getPanelJsonStore("KnowLedgeSolutionList_pagepanel", DataHead);
		this.store.on("load",function(store,records, opt) {
					for(var i=0;i<records.length;i++){
						var cDate=records[i].get("Knowledge$createDate")
						if(cDate!=""){
							records[i].set("Knowledge$createDate",cDate.substring(0,16));
						}
						if(records[i].get("Knowledge$status")==0){
						 	records[i].set("Knowledge$status","草稿");
						}
					}
		});
		this.fp = this.getknowSearchForm();
		this.store.paramNames.sort = "orderBy";
		this.store.paramNames.dir = "orderType";
		this.cm.defaultSortable = true;
		var viewConfig = Ext.apply({
			forceFit : true
		}, this.gridViewConfig);

		var pageBar = new Ext.PagingToolbar({
			id :"pagetoolBar",
			pageSize : 10,
			store : this.store,
			displayInfo : true,
			displayMsg : '当前显示 {0}-{1}条记录 /共{2}条记录',
			emptyMsg : "无显示数据"
		});
		this.searchConfig=function(){
			if((Ext.getCmp('serviceItemBySu').getRawValue() != '' 
		           && Ext.getCmp('serviceItemBySu').getValue() == '')
		            ||(Ext.getCmp('problemTypebySu').getRawValue() != '' 
		             && Ext.getCmp('problemTypebySu').getValue() == '')){
			    Ext.Msg.alert("提示","请从下拉列表中选择正确的服务项类型、服务项或问题类型！");
			    return;
		    }
			if(Ext.getCmp('serviceItemBySu').getRawValue()==''){
				Ext.getCmp('serviceItemBySu').clearValue();
			}
			if(Ext.getCmp('problemTypebySu').getRawValue()==''){
				Ext.getCmp('problemTypebySu').clearValue();
			}
			var params = Ext.getCmp("knowSearchForm").getForm().getValues(false);
			var store=Ext.getCmp("konwledgeGrid").getStore();
	        params.start = 0; 
	        params.status=0;
//	        pageBar.formValue=param;
	        store.on('beforeload', function(a) {   
					      Ext.apply(a.baseParams,params);   
					});
	        store.load({
	            params : params
	        });
	},
		this.konwledgeGrid = new Ext.grid.GridPanel({
			id:"konwledgeGrid",
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
					text : '新建',
					handler : function() {
//						var conn = Ext.lib.Ajax.getConnectionObject().conn;
//						conn.open("POST",
//							webContext+ '/knowledgeAction_queryKnowledgetId.action?panel=KnowLedgeSolution_pagepanel',
//										false);
//						conn.send(null);
//						var result = Ext.decode(conn.responseText);
//						var knowledgeId = result.knowledgeId;
						window.location = webContext
								+ "/user/knowledge/knowledgeManager/createNewKnowledge.jsp";
					},
					scope : this,
					iconCls : 'add'
				},'-',{
					xtype : 'button',
					style : 'margin:2px 0px 2px 5px',
					handler :this.searchConfig,
					text : '查询',
					iconCls : 'search'
				},'-',{
					xtype : 'button',
					style : 'margin:2px 0px 2px 5px',
					text : '修改',
					handler : this.show,
					scope : this,
					iconCls : 'edit'
				},'-',{
					xtype : 'button',
					style : 'margin:2px 0px 2px 5px',
					text : '删除',
					handler : this.remove,
					scope : this,
					iconCls : 'remove'
				},'-',{
					xtype : 'button',
					style : 'margin:2px 0px 2px 5px',
					handler :function(){
						Ext.getCmp("knowSearchForm").getForm().reset();
					},
					text : '清除',
					iconCls : 'reset'
		},new Ext.Toolbar.TextItem("<font color=red style='font-weight:lighter' >【双击后查看详细信息】</font>")],
			bbar : pageBar
		});
		
		this.konwledgeGrid.on("headerdblclick", this.fitWidth, this);
		this.konwledgeGrid.on("rowdblclick", this.show, this);
		var items = new Array();
		items.push(this.fp);
		items.push(this.konwledgeGrid);
		this.items = items;
		
		PagePanel.superclass.initComponent.call(this);
		var params = {
			 start : 0,
			'status':0
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