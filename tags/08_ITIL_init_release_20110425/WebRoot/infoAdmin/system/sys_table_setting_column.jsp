<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">

<HTML xmlns="http://www.w3.org/1999/xhtml">
<HEAD><TITLE>系统主表可见字段</TITLE>
<%@include file="/includefiles.jsp"%>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=GBK"/> 
<META content="" name=Keywords>
<META content="" name=Description>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/CssAdmin.css">
<script language="javascript" src="${pageContext.request.contextPath}/js/Admin.js"></script>

	<SCRIPT language="javascript">
	
	function saveAll(){
	  var xform = document.formDel;
	  xform.methodCall.value="saveAll";
	  xform.submit();
	}
	
	function saveToUser(){
	  var xform = document.formDel;
	  xform.methodCall.value="saveToUser";
	  xform.submit();
	}
	
	
	function sortTo(targetOrderFlag){ 
 
   		   if(confirm("您确认移动所勾选的查询字段吗? ")){
   		     var smtId = "${smt.id}";
   		     var sourceItemIds="";
   		     var validate=false;
   		     var settingType = "${param.settingType}";
   		     <c:forEach var="item" items="${requestScope.sysTableSettings}" varStatus="status">
   		     
   		      var sort_checked = document.getElementById("sort_checked${item.id}");
   		     
     		  if(sort_checked.checked==true){
   		        validate=true; 
   		     
   		        var trSrc = document.getElementById("tr${item.id}");
     	  	    if(trSrc!=null){
     	  		  sourceItemIds = sourceItemIds + "#" + ${item.id};
     	  	    }
     	  	  
     	  	  }//end if
     	  		
     	  	</c:forEach>
   		    if(!validate){
   		      alert("请勾选要移动的查询字段!");
   		      return false;
   		    }
   		     Ext.Ajax.request({
	            url:'${pageContext.request.contextPath}/infoAdmin/sysTableSetting.do?methodCall=sortSettingColumn',
	            params:{
	                smtId: smtId, targetOrderFlag:targetOrderFlag, sourceOrderFlags: sourceItemIds, settingType: settingType
	            },
	            method:'POST',
	            timeout:100000,
	            success:function(response){
	              window.location.reload();
	            },
	            scope:this
			  });
   		   
   		   }
	}
		
	function getColumnCnNamesByTableId(){      
		var tableId,i,j;
		var foreignTables = document.getElementById("foreignTables");
		var foreignTableColumns = document.getElementById("foreignTableColumns");
		
		for (i = foreignTableColumns.options.length-1; i>=0  ; --i){ 
			  foreignTableColumns.options[i] = null;  
		}
		tableId = foreignTables.options[foreignTables.selectedIndex].value;
		if(tableId==0){
		 foreignTableColumns.options[0] = new Option('','');
		}
		 foreignTableColumns.options[0] = new Option('',''); 
		j = 1;	
		for (i=0 ;i< tableColumns.length ;i++){
			if (tableId == tableColumns[i][3]){   
				foreignTableColumns.options[j] = new Option(tableColumns[i][2],tableColumns[i][1]); 
				++j;
			}
		}
	}
	
	function openSubWindow(url,title){
		window.open(url,title,
					"scrollbars=yes,resizable=yes,height=400,width=600,status=yes,toolbar=no,menubar=no,location=no,fullscreen=no,left=5,top=5",
					true);
	}
	
   function func(obj,itemId){ 
     var valueObj = document.getElementById("column_checked"+itemId);
     //alert(valueObj.value);
     valueObj.value = ""+itemId+"|"+(obj.checked?1:0); 
   }
   
   function chanageBgColor(checkedTrIndex){ 
     var tr = document.getElementById("tr"+checkedTrIndex);
     var sort_checked = document.getElementById("sort_checked"+checkedTrIndex);
     if(sort_checked.checked==true){
       tr.bgColor="#ababab"; //#ababab
     }else{
       tr.bgColor="#ebf2f9"; //note must uppcase 'bgColor'
     }
  }
  
  function swithUserInfoDivDisplay(){ 
	   var isAllUser = document.getElementById("isAllUser");
	   var userInfoDiv = document.getElementById("userInfoDiv");
	   var roleDiv = document.getElementById("roleDiv");
	   
	    var  selectIndex = isAllUser.options[isAllUser.selectedIndex].value; 
	    //alert(selectIndex);
	    if(selectIndex==1){
	    	if(userInfoDiv.style.display=="block"){
	    		userInfoDiv.style.display="none"
	    	}
	    	if(roleDiv.style.display=="block"){
	    		roleDiv.style.display="none"
	    	}
	    	
	    }else if(selectIndex==0){
	    	if(userInfoDiv.style.display=="none"){
	    		userInfoDiv.style.display="block"
	    	}
	    	if(roleDiv.style.display=="block"){
	    		roleDiv.style.display="none"
	    	}
	    	
	    	
	    }else if(selectIndex==2){
	    	if(userInfoDiv.style.display=="block"){
	    		userInfoDiv.style.display="none"
	    	}
	    	if(roleDiv.style.display=="none"){
	    		roleDiv.style.display="block"
	    	}
	    
	    }
	    
	}
	//-->
	</SCRIPT>
<body>
<TABLE cellSpacing=1 cellPadding=3 width="100%" bgColor=#6298e1 border=0>
  <TBODY>
  <TR>
    <TD noWrap height=24><FONT color=#ffffff><IMG height=18 
      src="${pageContext.request.contextPath}/images/Explain.gif" width=18 align=absMiddle 
      border=0>&nbsp;<STRONG>主表的系统可见字段：列表，输入和导出3类字段可见性设置</STRONG></FONT></TD></TR>
    <TR>
    <TD noWrap align=middle bgColor=#ebf2f9 height=36>
      <TABLE cellSpacing=0 width="100%" border=0>
        <TBODY>
        <TR>
		<TD align="center"> 
       	   
         <a href="${pageContext.request.contextPath}/infoAdmin/sysTableSetting.do?methodCall=list&smtId=${smt.id}&settingType=1">系统可见字段设置</a>
	    &nbsp;
	     <a href="${pageContext.request.contextPath}/infoAdmin/sysTableQuery.do?methodCall=list&smtId=${smt.id}">系统主表查询设置</a>
	    &nbsp;
	     <a href="${pageContext.request.contextPath}/infoAdmin/sysTableRole.do?methodCall=list&smtId=${smt.id}">系统角色可见字段设置</a>   
         <INPUT name="pageNo" type="hidden" value="${param.pageNo}">
         <INPUT name="methodCall" type="hidden" value="list">
         
         </TD>
        	
          </TR>
          </TBODY>
          </TABLE>
       </TD>
      </TR>
   </TBODY>
 </TABLE>
<script>
function chg(){
  var settingType = document.getElementById("settingType");
  var selectedIndex = settingType.options[settingType.selectedIndex].value;
  window.location.href="${pageContext.request.contextPath}/infoAdmin/sysTableSetting.do?methodCall=list&smtId=${smt.id}&settingType="+selectedIndex;
  //document.formDel.settingType.value=selectedIndex;
}
</script>
<TABLE cellSpacing=1 cellPadding=0 width="100%" border=0>
 <TBODY>
 <TR>
 <TD height=30>系统后台管理&nbsp;-&gt;&nbsp;系统主表&nbsp;-&gt;&nbsp;系统可见字段:
 &nbsp;
 <select name="settingType" id="settingType" class="textfield" onchange="chg();">
     <option value="1" ${empty param.settingType or param.settingType eq '1'?' selected':''} >列表</option>
     <option value="2" ${param.settingType eq '2'?' selected':''}>输入</option>
     <option value="5" ${param.settingType eq '5'?' selected':''}>导出</option>
   </select> 
   <a href="${pageContext.request.contextPath}/infoAdmin/sysMainTable.do?methodCall=toForm&id=${smt.id}">
   &nbsp;&nbsp;返回
  </a>
  </TD>
  <td align="right" style="color:red;">&nbsp;&nbsp;&nbsp;
  <a href="${pageContext.request.contextPath}/infoAdmin/sysMainTable.do?methodCall=toForm&id=${smt.id}">
  ${smt.tableCnName}&nbsp;
  </a>
  </td>
  </TR>
  </TBODY>
  </TABLE>


<TABLE cellSpacing=1 cellPadding=3 width="100%" bgColor=#6298e1 border=0>
  <FORM name="formDel" action="${pageContext.request.contextPath}/infoAdmin/sysTableSetting.do" method="post">
  <input type="hidden" name="methodCall" value="saveAll">
  <INPUT name="smtId" type="hidden" value="${smt.id}">
   <INPUT name="settingType" type="hidden" value="${empty param.settingType?'1':param.settingType}">
   
  <TBODY>
  <TR>
    <TD noWrap width="20" bgColor=#8db5e9>
    <FONT color=#ffffff><STRONG>ID</STRONG></FONT>
    </TD>
    
    <TD noWrap bgColor=#8db5e9>
    <FONT color=#ffffff><STRONG>字段名称</STRONG></FONT>
    </TD>
    <TD noWrap bgColor=#8db5e9>
    <FONT color=#ffffff><STRONG>所属主表名称</STRONG></FONT>
    </TD>
    <td nowrap bgColor=#8db5e9>
    <font color="#FFFFFF"><STRONG>页面宽度</STRONG></font>（%/px）
    </td>
    <TD noWrap bgColor=#8db5e9 >
    <STRONG><FONT color=#ffffff>是否显示</FONT></STRONG>
    </TD>
    <TD noWrap bgColor=#8db5e9 >
    <STRONG><FONT color=#ffffff>必须显示</FONT></STRONG>
    </TD>
    
    <TD noWrap  bgColor=#8db5e9>
    <FONT color=#ffffff><STRONG>排序</STRONG></FONT>
    </TD>
    
    <TD  bgColor=#8db5e9 style="width:90px;">
    <a onclick="sortColumns(0);" href="#"><FONT color=#ffffff><STRONG>&nbsp;移动到此行下</STRONG></FONT></a>
    </TD>

  
  </TR>
  
 <c:forEach  var="item" items="${requestScope.sysTableSettings}" varStatus="status">   
 
  <TR id="tr${item.id}" style="CURSOR: hand" 
       bgColor=#ebf2f9>
    <TD  width="20">${item.id }</TD>
    
    
    <TD noWrap>${item.columnCnName }(${item.column.id})
    	
    
    </TD>
    <TD noWrap>
    
    <a href="${pageContext.request.contextPath}/infoAdmin/sysTableSetting.do?methodCall=remove&smtId=${smt.id}&id=${item.id}&settingType=${param.settingType}">
    	${item.systemMainTable.tableCnName}(${item.systemMainTable.id})
    &nbsp;</a>
    
    </TD>
    <TD noWrap>
    <input id="order${item.id}" name="lengthForPage${item.id}" 
    		type="text" style="height:18px;width:70px" value="${item.lengthForPage}">
     </TD>
    
  
    <TD noWrap>
     <input name="isDisplay" type="checkbox" 
     	<c:if test="${item.isDisplay eq 1}">checked</c:if> onclick="func(this,${item.id});">
     <input id="column_checked${item.id}"  name="isDisplay${item.id}" type="hidden" style="width:35px"
                        value="<c:choose><c:when test="${item.isDisplay eq 1}">${item.id}|1</c:when><c:otherwise>${item.id}|0</c:otherwise></c:choose>">
       <!-- <span><font color="red">修改成功</font></span> -->
         			
    </TD>
    <TD>
	 <select name="isMustInput${item.id}"  class="textfield">
        <option value="0" ${empty item.isMustInput or item.isMustInput eq 0?' selected':''}>否</option>
        <option value="1" ${item.isMustInput eq 1?' selected':''}>是</option>
      </select> 
	</TD>
	
    
     
    <TD noWrap><input id="order${item.id}" name="order${item.id}" type="text" style="height:18px;width:20px" value="${item.order}">&nbsp;</TD>
    
    
      
    
 
    <TD style="width:90px;" align="left">
    <input id="sort_checked${item.id}"  name="sort_checked" type="checkbox" 
    	onclick="chanageBgColor(${item.id});"><input id="column_checked2${item.id}"  name="column_checked2" type="hidden"
        value="<c:choose><c:when test="${item.isDisplay eq 1}">${item.id}|1</c:when><c:otherwise>${item.id}|0</c:otherwise></c:choose>">
       <a onclick="sortTo(${item.order});" href="#">移到此行下</a>
    </TD>
   
    </TR>
  
 </c:forEach> 
  <TR style="CURSOR: hand"  bgColor=#ebf2f9>
      
    <TD  width="20"></TD>
    
    <TD style="width:130px;"></TD>
    
    <TD noWrap></TD>
    
    
    <TD noWrap colspan="3">
   		<select name="isAllUser" id="isAllUser" onchange="swithUserInfoDivDisplay();" class="textfield" style="float:left">
  			<option value="1">所有用户</option>
  			<option value="0">指定用户</option>
  			<option value="2">指定角色的用户</option>
     	</select>
     	<select name="userInfo" id="userInfoDiv" style="display:none;" class="textfield" style="float:left">
   		   <c:forEach var="item" items="${requestScope.userInfos}">
   			<option value="${item.id}">${item.realName}</option>
   			</c:forEach>
      	</select>
      	<select name="roles" id="roleDiv" style="display:none;" class="textfield" style="float:left">
   		   <c:forEach var="item" items="${requestScope.roles}">
   			<option value="${item.id}">${item.name}</option>
   			</c:forEach>
      	</select>
      	
     <INPUT class=button onclick="saveToUser();this.disabled=true;" type=button value="开始同步" style="float:left">	
    </TD>
   
    <TD style="width:100px;"><INPUT class=button onclick="saveAll();" type=button value="保存系统字段"></TD>
    
    
 
    <TD style="width:90px;" align="left">
  		<!-- <INPUT class=button  onclick="ConfirmDel('删除查询字段，您确认删除吗？');"
    		type=button value="删除所选" name="submitDelSelect"> -->
      </TD>
   
    </TR></TBODY></TABLE></TD></TR></FORM></TBODY></TABLE>
</BODY></HTML>