<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page pageEncoding="UTF-8"%>
<%
	String basePath=request.getContextPath();
%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>员工试用期评估</title>
		<style type="text/css">
			.label {
				width:120px;
				height:40px;
				text-align:center;
				border-left:1px solid #000000;
				border-top:1px solid #000000;
				background:#ddd;
				
				width:120px;height:40px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;background:#ddd;
			}
			.field {
				height:40px;
				width:120px;
				text-align:center;
				border-left:1px solid #000000;
				border-top:1px solid #000000;
				
				height:40px;width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;
			}
		</style>
	</head>

	<body>
		<div style="text-align:center;height:30px;line-height:30px;">
			<font style="font-size:22px;font-weight:bold;">北京市上品商业发展有限责任公司</font><br/>
		</div>
		<div style="text-align:center;height:30px;line-height:30px;">
			<font style="font-size:22px;font-weight:bold;">员工试用（实习）评估表</font>
		</div>
		<form id="applyForm" onsubmit="return check();" action="${pageContext.request.contextPath}/hrm/saveHrPostApply.do" method="post">
			<input type="hidden" name="hrPostApply.id" value="${hrPostApply.id}"/>
			<input type="hidden" name="hrPostApply.publishStatus" value="0"/>
			<table style="width:700px;margin:0 auto;border:1px solid #000000;background:#ffffff" cellpadding="0" cellspacing="0">
				<tr>
					<td style="height:40px;width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;">姓名</td>
					<td style="height:40px;width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;">${hrPostAssessment.postApply.applyUser.fullname}&nbsp;</td>
					<td style="height:40px;width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;">部门/门店</td>
					<td style="height:40px;width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;">${hrPostAssessment.postApply.deptName}&nbsp;</td>
					<td style="height:40px;width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;">职务</td>
					<td style="height:40px;width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;border-right:1px solid #000000;padding:2px;">${hrPostAssessment.postApply.postName}&nbsp;</td>
				</tr>
				<tr>
					<td style="height:40px;width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;">实际报到日期</td>
					<td style="height:40px;width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;">
						<fmt:formatDate value="${hrPostAssessment.actualReportDate}" type="date"/>&nbsp;
					</td>
					<td style="height:40px;width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;">拟定转正日期</td>
					<td style="height:40px;width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;">
						<fmt:formatDate value="${hrPostAssessment.applyPostDate}" type="date"/>&nbsp;
					</td>
					<td style="height:40px;width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;">实际转正日期</td>
					<td style="height:40px;width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;border-right:1px solid #000000;">
						<fmt:formatDate value="${hrPostAssessment.actualPostDate}" type="date"/>&nbsp;
					</td>
				</tr>
				<tr>
					<td style="height:40px;width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;">专业知识</td>
					<td style="height:40px;width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;">沟通影响</td>
					<td style="height:40px;width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;">问题解决能力</td>
					<td style="height:40px;width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;">工作难度管理幅度</td>
					<td style="height:40px;width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;">业务领域影响</td>
					<td style="height:40px;width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;border-right:1px solid #000000;padding:2px;">评级结果</td>
				</tr>
				<tr>
					<td style="height:40px;width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;">${hrPostAssessment.proKnowledge}&nbsp;</td>
					<td style="height:40px;width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;">${hrPostAssessment.commEffect}&nbsp;</td>
					<td style="height:40px;width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;">${hrPostAssessment.solveAbility}&nbsp;</td>
					<td style="height:40px;width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;">${hrPostAssessment.difficultyManage}&nbsp;</td>
					<td style="height:40px;width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;">${hrPostAssessment.businessFieldEffect}&nbsp;</td>
					<td style="height:40px;width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;border-right:1px solid #000000;padding:2px;">${hrPostAssessment.ratingResult}&nbsp;</td>
				</tr>
				<tr>
					<td colspan="6" style="height:40px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;background:#ddd;border-right:1px solid #000000;">员工试用（实习）期间工作表现评价</td>
				</tr>
				<tr>
					<td colspan="6" style="height:300px;padding:2px;border:1px solid #000000;border-bottom:none;">
						<textarea readonly="readonly" id="proSummary" name="hrPostApply.proSummary" style="width:100%;*width:690px;height:100%;*height:290px;border:none;overflow-y:hidden;">${hrPostAssessment.proPerformance}</textarea>
					</td>
				</tr>
				<tr>
					<td colspan="6" style="height:40px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;background:#ddd;border-right:1px solid #000000;">人力资源部审核</td>
				</tr>
				<tr>
					<td style="height:40px;width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;">被评估者标准岗位名称</td>
					<td style="height:40px;width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;" colspan="2">${hrPostAssessment.standardPostName}&nbsp;</td>
					<td style="height:40px;width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;">被评估者岗位层级</td>
					<td colspan="2" style="height:40px;width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;border-right:1px solid #000000;padding:2px;">
						Band&nbsp;<font style="text-decoration:underline">${hrPostAssessment.postBand}</font>&nbsp;&nbsp;
						档&nbsp;<font style="text-decoration:underline">${hrPostAssessment.postGrade}</font>
					</td>
				</tr>
				<tr>
					<td style="height:40px;line-height:14px;width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;">转正前薪酬级别</td>
					<td style="height:40px;line-height:14px;width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;" colspan="2">
						<font style="text-decoration:underline">${hrPostAssessment.oldSalaryLevelName}</font>，
						<font style="text-decoration:underline">${hrPostAssessment.oldSalary}</font>元/月
					</td>
					<td style="height:40px;line-height:14px;width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;">转正后薪酬（由人力资源部填写）</td>
					<td colspan="2" style="height:40px;line-height:14px;width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;border-right:1px solid #000000;padding:2px;text-align:left">
						月度工资为<font style="text-decoration:underline">${hrPostAssessment.newFixedSalary + hrPostAssessment.newFloatSalary}</font>元，其中<br/>
						固定部分为<font style="text-decoration:underline">${hrPostAssessment.newFixedSalary}</font>元，<br/>
						浮动部分为<font style="text-decoration:underline">${hrPostAssessment.newFloatSalary}</font>元，<br/>
						年终奖金基数为<font style="text-decoration:underline">${hrPostAssessment.yearEndBonusCoefficient}</font>元，<br/>
						年度总酬为<font style="text-decoration:underline">${hrPostAssessment.totalYearSalary}</font>元。
					</td>
				</tr>
				<tr>
					<td colspan="3" style="width:120px;height:40px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;background:#ddd;">本部门/门店意见</td>
					<td colspan="3" style="width:120px;height:40px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;background:#ddd;border-right:1px solid #000000;">主管部门意见（无主管部门可不填写）</td>
				</tr>
				<tr>
					<td colspan="3" style="width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;height:150px;padding:2px">
						<textarea readonly="readonly" id="proSummary" name="hrPostApply.proSummary" style="width:100%;height:100%;border:none;overflow-y:hidden;">${hrPostAssessment.postOpinion}</textarea>
					</td>
					<td colspan="3" style="width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;height:150px;padding:2px;border-right:1px solid #000000;">
						<textarea readonly="readonly" id="proSummary" name="hrPostApply.proSummary" style="width:100%;height:100%;border:none;overflow-y:hidden;">${hrPostAssessment.deptOpinion}</textarea>
					</td>
				</tr>
				<tr>
					<td style="height:40px;width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;border-bottom:1px solid #000000;">人力资源部意见</td>
					<td colspan="2" style="width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;height:70px;padding:2px;border-bottom:1px solid #000000;">
						<textarea readonly="readonly" id="proSummary" name="hrPostApply.proSummary" style="width:100%;height:100%;border:none;overflow-y:hidden;">${hrPostAssessment.hrOpinion}</textarea>
					</td>
					<td style="height:40px;width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;border-bottom:1px solid #000000;">总经理意见</td>
					<td colspan="2" style="width:120px;text-align:center;border-left:1px solid #000000;border-top:1px solid #000000;height:70px;padding:2px;border-right:1px solid #000000;border-bottom:1px solid #000000;">
						<textarea readonly="readonly" id="proSummary" name="hrPostApply.proSummary" style="width:100%;height:100%;border:none;overflow-y:hidden;">${hrPostAssessment.bossOpinion}</textarea>
					</td>
				</tr>
			</table>
		</form>
	</body>
</html>
