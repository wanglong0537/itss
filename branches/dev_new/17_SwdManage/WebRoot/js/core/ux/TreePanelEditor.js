Ext.ns("xpsoft.ux");
xpsoft.ux.TreePanelEditor = Ext.extend(Ext.tree.TreePanel, {
	showContextMenu : true,
	url : null,
	contextMenu : null,
	contextMenuItems : null,
	selectedNode : null,
	constructor : function(a) {
		if (a == null) {
			a = {};
		}
		Ext.apply(this, a);
		xpsoft.ux.TreePanelEditor.superclass.constructor.call(this, {
			tbar : new Ext.Toolbar({
				items : [ {
					xtype : "button",
					iconCls : "btn-refresh",
					text : "刷新",
					scope : this,
					handler : function() {
						this.root.reload();
					}
				}, {
					xtype : "button",
					text : "展开",
					iconCls : "btn-expand",
					scope : this,
					handler : function() {
						this.expandAll();
					}
				}, {
					xtype : "button",
					text : "收起",
					iconCls : "btn-collapse",
					scope : this,
					handler : function() {
						this.collapseAll();
					}
				} ]
			}),
			loader : new Ext.tree.TreeLoader({
				url : this.url
			}),
			root : new Ext.tree.AsyncTreeNode({
				expanded : true
			}),
			listeners : {
				"click" : function(b) {
					a.onclick.call(this, b);
				}
			},
			rootVisible : false
		});
		this.initContextMenu();
	},
	initContextMenu : function() {
		if (this.showContextMenu) {
			this.contextMenu = new Ext.menu.Menu({});
			if (this.contextMenuItems != null) {
				this.contextMenu.add(this.contextMenuItems);
			}
			this.on("contextmenu", this.contextHandler, this);
		}
	},
	contextHandler : function contextmenu(a, b) {
		this.selectedNode = new Ext.tree.TreeNode({
			id : a.id,
			text : a.text,
			attributes : a.attributes
		});
		this.contextMenu.showAt(b.getXY());
	}
});
Ext.reg("treePanelEditor", xpsoft.ux.TreePanelEditor);