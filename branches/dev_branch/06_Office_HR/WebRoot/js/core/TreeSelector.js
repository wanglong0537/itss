// 修复ExtJS3.2中自动关闭下来树的Bug
Ext.override(Ext.form.ComboBox, {
	onViewClick : function(doFocus) {
		var index = this.view.getSelectedIndexes()[0], s = this.store, r = s.getAt(index);
    	if (r) {
			this.onSelect(r, index);
    	} else if (s.getCount() === 0) {
			this.collapse();
    	}
    	if (doFocus !== false) {
			this.el.focus();
    	}
	}
});
var TreeSelector = function (g, f, h, e, c) {
	var d = {
		id : g,
		store : new Ext.data.SimpleStore({
			fields : [],
			data : [[]]
		}),
		editable : false,
		mode : "local",
		fieldLabel : h,
		allowBlank : c == false ? false : true,
		triggerAction : "all",
		maxHeight : 200,
		tpl : "<tpl for='.'><div style='height:200px'><div id='" + g + "tree'></div></div></tpl>",
		selectedClass : "",
		onSelect : Ext.emptyFn
	};
	var b = new Ext.form.ComboBox(d);
	var a = new Ext.tree.TreePanel({
			id : g + "Tree",
			height : 200,
			autoScroll : true,
			split : true,
			loader : new Ext.tree.TreeLoader({
				url : f
			}),
			root : new Ext.tree.AsyncTreeNode({
				expanded : true
			}),
			rootVisible : false
		});
	a.on("click", function (j) {
		var i = Ext.getCmp(e);
		if (j.id != null && j.id != "") {
			b.setValue(j.text);
			b.id = j.id;
			b.collapse();
			if (i != null) {
				i.setValue(j.id);
			}
		}
	});
	b.on("expand", function () {
		a.render(g + "tree");
	});
	return b;
};
