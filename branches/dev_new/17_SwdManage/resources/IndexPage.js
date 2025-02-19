var IndexPage = Ext
		.extend(
				Ext.Viewport,
				{
					top : new Ext.Panel({
						region : "north",
						id : "__nortPanel",
						contentEl : "app-header",
						height : 60
					}),
					center : null,
					west : new Ext.Panel({
						region : "west",
						id : "west-panel",
						title : "导航",
						iconCls : "menu-navigation",
						split : true,
						width : 180,
						autoScroll : true,
						layout : "accordion",
						collapsible : true,
						items : []
					}),
					south : new Ext.Panel(
							{
								region : "south",
								height : 28,
								border : false,
								bbar : [
										{
											text : "退出系统",
											iconCls : "btn-logout",
											handler : function() {
												App.Logout();
											}
										},
										"-",
										{
											text : "在线用户",
											iconCls : "btn-onlineUser",
											handler : function() {
												OnlineUserSelector.getView()
														.show();
											}
										},
										"-",
										{
											id : "messageTip",
											xtype : "button",
											hidden : true,
											width : 50,
											height : 20,
											handler : function() {
												var a = Ext
														.getCmp("messageTip");
												var b = Ext.getCmp("win");
												if (b == null) {
													new MessageWin().show();
												}
												a.hide();
											}
										},
										"->",
										{
											xtype : "tbfill"
										},
										{
											xtype : "tbtext",
											text : __companyName + "办公协同管理系统",
											id : "toolbarCompanyName"
										},
										{
											xtype : "tbseparator"
										},
										new Ext.Toolbar.TextItem(
												'技术支持 <a href="http://172.16.100.26/ITC/" target="_blank">上品折扣信息系统部</a>'),
										{
											xtype : "tbseparator"
										},
										{
											pressed : false,
											text : "便签",
											iconCls : "tipsTile",
											handler : function() {
												App
														.clickTopTab("PersonalTipsView");
											}
										},
										{
											xtype : "tbseparator"
										},
										{
											pressed : false,
											text : "与我们联系",
											handler : function() {
												Ext.ux.Toast
														.msg("联系我们",
																"网址：http://172.16.100.26/ITC");
											}
										},
										"-",
										{
											text : "收展",
											iconCls : "btn-expand",
											handler : function() {
												var a = Ext
														.getCmp("__nortPanel");
												if (a.collapsed) {
													a.expand(true);
												} else {
													a.collapse(true);
												}
											}
										},
										"-",
										{
											xtype : "combo",
											mode : "local",
											editable : false,
											value : "切换皮肤",
											width : 100,
											triggerAction : "all",
											store : [
													[ "ext-all", "缺省浅蓝" ],
													[ "ext-all-css04", "灰白主题" ],
													[ "ext-all-css05", "绿色主题" ],
													[ "ext-all-css03", "粉红主题" ],
													[ "xtheme-tp", "灰色主题" ],
													[ "xtheme-default2", "灰蓝主题" ],
													[ "xtheme-default16",
															"绿色主题" ],
													[ "xtheme-access",
															"Access风格" ] ],
											listeners : {
												scope : this,
												"select" : function(d, b, c) {
													if (d.value != "") {
														var a = new Date();
														a
																.setDate(a
																		.getDate() + 300);
														setCookie("theme",
																d.value, a,
																__ctxPath);
														Ext.util.CSS
																.swapStyleSheet(
																		"theme",
																		__ctxPath
																				+ "/ext3/resources/css/"
																				+ d.value
																				+ ".css");
													}
												}
											}
										} ]
							}),
					constructor : function() {
						this.center = new Ext.TabPanel({
							id : "centerTabPanel",
							region : "center",
							deferredRender : true,
							enableTabScroll : true,
							activeTab : 0,
							defaults : {
								autoScroll : true,
								closable : true
							},
							items : [],
							plugins : new Ext.ux.TabCloseMenu()
						});
						IndexPage.superclass.constructor.call(this, {
							layout : "border",
							items : [ this.top, this.west, this.center,
									this.south ]
						});
						this.afterPropertySet();
						this.loadWestMenu();
					},
					afterPropertySet : function() {
						var a = this.center;
						var c = function(f) {
							var d = Ext.getCmp("messageTip");
							var g = Ext.getCmp("win");
							var e = Ext.getCmp("wind");
							if (f > 0 && g == null && e == null) {
								d
										.setText('<div style="height:25px;"><img src="'
												+ __ctxPath
												+ '/images/newpm.gif" style="height:12px;"/>你有<strong style="color: red;">'
												+ f + "</strong>信息</div>");
								soundManager.play("msgSound");
								d.show();
							} else {
								d.hide();
							}
						};
						var b = function() {
							Ext.Ajax.request({
								url : __ctxPath + "/info/countInMessage.do",
								method : "POST",
								success : function(e, f) {
									var d = Ext.util.JSON
											.decode(e.responseText);
									count = d.count;
									c(count);
									setTimeout(b, 1000 * 60);
								},
								failure : function(d, e) {
								},
								scope : this
							});
						};
						setTimeout(function() {
							setInterval("CalConv()", 1000);
							soundManager = new SoundManager();
							soundManager.url = __ctxPath + "/js/sound/swf/";
							soundManager.beginDelayedInit();
							soundManager.debugMode = false;
							soundManager.consoleOnly = false;
							soundManager.onload = function() {
								soundManager.createSound({
									id : "msgSound",
									url : __ctxPath + "/js/sound/mp3/msg.mp3"
								});
								b();
							};
						}, 100);
						Ext.getCmp("SearchForm").render("searchFormDisplay");
					},
					loadWestMenu : function() {
						var westPanel = Ext.getCmp("west-panel");
						Ext.Ajax
								.request({
									url : __ctxPath + "/panelTreeMenu.do",
									success : function(response, options) {
										var arr = eval(response.responseText);
										var __activedPanelId = getCookie("__activedPanelId");
										for ( var i = 0; i < arr.length; i++) {
											var doc = strToDom(arr[i].subXml);
											var root = doc.documentElement
													|| doc;
											var panel = new Ext.tree.TreePanel(
													{
														id : arr[i].id,
														title : arr[i].text,
														iconCls : arr[i].iconCls,
														layout : "fit",
														animate : true,
														border : false,
														autoScroll : true,
														loader : new xpsoft.ux.TreeXmlLoader(
																{
																	preloadChildren : true
																}),
														root : new Ext.tree.AsyncTreeNode(
																{
																	text : root.tagName,
																	xmlNode : root
																}),
														listeners : {
															"click" : App.clickNode
														},
														rootVisible : false
													});
											westPanel.add(panel);
											panel.on("expand", function(p) {
												var expires = new Date();
												expires.setDate(expires
														.getDate() + 30);
												setCookie("__activedPanelId",
														p.id, expires,
														__ctxPath);
											});
											if (arr[i].id == __activedPanelId) {
												westPanel.layout.activeItem = panel;
											}
										}
										westPanel.doLayout();
									}
								});
					}
				});