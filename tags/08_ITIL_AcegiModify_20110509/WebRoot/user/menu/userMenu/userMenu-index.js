// 全局路径
var basePath = "http://localhost:8080"+webContext;
//保存菜单信息后返回的id

if(typeof(glbRootPath) != "undefined"){
	basePath = glbRootPath;
}

//用户导航菜单树
NavTree = function(){
	var nav;
	var loader;
	var root;
	var removeFlag = false;
	var titleChangeFlag = false;
	var nodeSelected;
	var mgr;
	
	return {
		init : function(){
			if(!mgr){
				Ext.Msg.alert("警告提示","请先通过NavTree.setMgr()设置mgr");
				return;
			}
			if(!loader){
				loader = new Ext.tree.TreeLoader({
					url : basePath + '/servlet/userMenuModify'
				});
				loader.on('beforeload', function(treeloader, node) {
					treeloader.baseParams = {
						id : node.id,
						userId: userId,
						method : 'tree'
					};
				}, this);
			}
			if(!root){
				root = new Ext.tree.AsyncTreeNode({
					id : '0',
					text : "用户菜单",
					expanded : true
				});
			}

			if(!nav){
				nav = new Ext.tree.TreePanel({
					title : "用户菜单定制",
					autoWidth : true,
					height: 490,
					autoScroll : true,
					animate : true,
					loader : loader,
					root : root,
					enableDD : true,
					collapsible : false,
					bodyBorder : false,
					listeners : {
						'click' : function(node, event) {
							if (node.isLeaf()) {
								// 为叶子节点时，点击不进入链接
								event.stopEvent();
							}
						}
					}
				});

				// 当节点移动时触发事件
				nav.on("movenode", function(tree, node, oldParent, newParent, index) {
					mgr.ajaxMoveNode(node.id, oldParent.id, newParent.id, index);
				});
				// 当节点删除时触发事件
				nav.on("remove", function(tree, parentNode, node) {
					if (removeFlag) {
						mgr.ajaxRemoveNode(node.id);
					}
				});
				nav.on("checkchange",function(node,checked){
					var nodeId = node.id;
					if(checked == true){
					   mgr.ajaxEnableNode(nodeId, 1);
					}else{
					   mgr.ajaxEnableNode(nodeId, 0);	
					}
				});
			}
			
		},
		setMgr : function(manager){
			mgr = manager;
		},
		getMgr : function(){
			return mgr;
		},
		getId : function(){
			return id;
		},
		show : function(){
			nav.render(Ext.getBody());
			nav.getRootNode().toggle();
		}
	}
}();

// 文档加载完毕执行
Ext.onReady(function(){
	Ext.BLANK_IMAGE_URL = webContext+"/extEngine/resources/images/default/s.gif";
	if(typeof(UserMenuTemplateManager)=="undefined"){
		Ext.Msg.alert("警告提示","请先设置DWR，并实例化UserMenuTemplateManager");
	}else{
		NavTree.setMgr(UserMenuTemplateManager);
		NavTree.init();
		NavTree.show();
	}
});