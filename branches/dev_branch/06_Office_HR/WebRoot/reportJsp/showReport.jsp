<%@ page contentType="text/html;charset=GBK" %>
<%@ taglib uri="/WEB-INF/runqianReport4.tld" prefix="report" %>
<%@ page import="java.io.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.runqian.report4.usermodel.Context"%>
<script type="text/javascript" src="${pageContext.request.contextPath}/reportJsp/jquery-1.4.4.min.js"></script>
<html>
<head>
<script language="javascript" type="text/javascript" src="${pageContext.request.contextPath}/reportJsp/jsDate/WdatePicker.js"></script>
</head>
<body bgcolor="#FFFFFF" topmargin=0 leftmargin=0 rightmargin=0 bottomMargin=0>
<%	
	request.setCharacterEncoding( "GBK" );
	String report = request.getParameter( "raq" );
	String reportFileHome=Context.getInitCtx().getMainDir();
	StringBuffer param=new StringBuffer();

	session.setAttribute("user_id","111111");

	//保证报表名称的完整性
	int iTmp = 0;
	if( (iTmp = report.lastIndexOf(".raq")) <= 0 ){
		report = report + ".raq";
		iTmp = 0;
	}
	
	Enumeration paramNames = request.getParameterNames();
	if(paramNames!=null){
		while(paramNames.hasMoreElements()){
			String paramName = (String) paramNames.nextElement();
			String paramValue=request.getParameter(paramName);
			if(paramValue!=null){
				//把参数拼成name=value;name2=value2;.....的形式
				param.append(paramName).append("=").append(paramValue).append(";");
			}
		}
	}

	//以下代码是检测这个报表是否有相应的参数模板
	String paramFile = report.substring(0,iTmp)+"_arg.raq";
	File f=new File(application.getRealPath(reportFileHome+ File.separator +paramFile));

%>
<jsp:include page="toolbar.jsp" flush="false" />
<table id=rpt align=center><tr><td>
<%	//如果参数模板存在，则显示参数模板
	if( f.exists() ) {
	%>
	<table id=param_tbl><tr><td>
		<report:param name="form1" paramFileName="<%=paramFile%>"
			needSubmit="no"
			params="<%=param.toString()%>"
			
		/>
	</td>
	<td><a href="javascript:_submit( form1 )"><img src="${pageContext.request.contextPath}/reportJsp/images/query.jpg" border=no style="vertical-align:middle"></a></td>
	</tr></table>
	<%}
%>

<table align=center>
	<tr><td>
		<report:html name="report1" reportFileName="<%=report%>"
			funcBarLocation=""
			needPageMark="yes"
			generateParamForm="no"
			needLinkStyle="yes"
			params="<%=param.toString()%>"
			width="-1"
			exceptionPage="/reportJsp/myError2.jsp"
		/>
	</td></tr>
</table>

<script language="javascript">
	//设置分页显示值
	document.getElementById( "t_page_span" ).innerHTML=report1_getTotalPage();
	document.getElementById( "c_page_span" ).innerHTML=report1_getCurrPage();
	function show_detail(orderId){
		window.open("showReport.jsp?raq=order_detail.raq&orderid="+orderId,"_blank");
	}
	function setdatevalue(columnname)
	{
		var temp=document.getElementById(columnname).getValue();
		document.getElementById(columnname).innerText=temp;
	}
	
 	function getBrowserVersion() {
 		var divs=document.getElementsByTagName("div");
		var i=divs.length-1;
		var browser = {};
		var userAgent = navigator.userAgent.toLowerCase();
		var s;
		(s = userAgent.match(/msie ([\d.]+)/))
				? browser.ie = s[1]
				: (s = userAgent.match(/firefox\/([\d.]+)/))
						? browser.firefox = s[1]
						: (s = userAgent.match(/chrome\/([\d.]+)/))
								? browser.chrome = s[1]
								: (s = userAgent.match(/opera.([\d.]+)/))
										? browser.opera = s[1]
										: (s = userAgent
												.match(/version\/([\d.]+).*safari/))
												? browser.safari = s[1]
												: 0;
		var version = "";
		if (browser.ie) {
			version = 'msie ' + browser.ie;
			divs[i].innerText="";
		} else if (browser.firefox) {
			version = 'firefox ' + browser.firefox;
			divs[0].innerText="";
		} else if (browser.chrome) {
			version = 'chrome ' + browser.chrome;
			divs[0].innerText="";
		} else if (browser.opera) {
			version = 'opera ' + browser.opera;
			divs[0].innerText="";
		} else if (browser.safari) {
			version = 'safari ' + browser.safari;
			divs[0].innerText="";
		} else {
			version = '未知浏览器';
			divs[0].innerText="";
		}
		return version;
	}
	getBrowserVersion();
</script>
</body>
</html>
