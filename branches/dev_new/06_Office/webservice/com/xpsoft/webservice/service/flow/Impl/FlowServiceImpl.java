package com.xpsoft.webservice.service.flow.Impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.ServletActionContext;
import org.apache.velocity.tools.generic.DateTool;
import org.jbpm.api.ProcessInstance;
import org.jbpm.pvm.internal.model.Transition;
import org.springframework.security.AuthenticationManager;
import org.springframework.security.context.SecurityContext;
import org.springframework.security.context.SecurityContextHolder;
import org.springframework.security.providers.UsernamePasswordAuthenticationToken;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.xpsoft.core.Constants;
import com.xpsoft.core.command.QueryFilter;
import com.xpsoft.core.jbpm.pv.ParamField;
import com.xpsoft.core.jbpm.pv.TaskInfo;
import com.xpsoft.core.util.AppUtil;
import com.xpsoft.core.util.ContextUtil;
import com.xpsoft.core.web.paging.PagingBean;
import com.xpsoft.oa.action.flow.FlowRunInfo;
import com.xpsoft.oa.action.flow.ProcessActivityAssistant;
import com.xpsoft.oa.dao.flow.ProcessFormDao;
import com.xpsoft.oa.model.archive.ArchDispatch;
import com.xpsoft.oa.model.archive.ArchRecFiledType;
import com.xpsoft.oa.model.archive.ArchRecType;
import com.xpsoft.oa.model.archive.ArchRecUser;
import com.xpsoft.oa.model.archive.Archives;
import com.xpsoft.oa.model.archive.ArchivesAttend;
import com.xpsoft.oa.model.archive.ArchivesDep;
import com.xpsoft.oa.model.archive.ArchivesDist;
import com.xpsoft.oa.model.archive.ArchivesDoc;
import com.xpsoft.oa.model.archive.ArchivesHandle;
import com.xpsoft.oa.model.archive.LeaderRead;
import com.xpsoft.oa.model.flow.FormData;
import com.xpsoft.oa.model.flow.ProDefinition;
import com.xpsoft.oa.model.flow.ProcessForm;
import com.xpsoft.oa.model.flow.ProcessRun;
import com.xpsoft.oa.model.flow.Transform;
import com.xpsoft.oa.model.info.ShortMessage;
import com.xpsoft.oa.model.personal.ErrandsRegister;
import com.xpsoft.oa.model.personal.LeaveLeaderRead;
import com.xpsoft.oa.model.system.AppUser;
import com.xpsoft.oa.model.system.Department;
import com.xpsoft.oa.service.archive.ArchDispatchService;
import com.xpsoft.oa.service.archive.ArchRecFiledTypeService;
import com.xpsoft.oa.service.archive.ArchRecTypeService;
import com.xpsoft.oa.service.archive.ArchRecUserService;
import com.xpsoft.oa.service.archive.ArchUnderTakesService;
import com.xpsoft.oa.service.archive.ArchivesAttendService;
import com.xpsoft.oa.service.archive.ArchivesDepService;
import com.xpsoft.oa.service.archive.ArchivesDistService;
import com.xpsoft.oa.service.archive.ArchivesHandleService;
import com.xpsoft.oa.service.archive.ArchivesService;
import com.xpsoft.oa.service.archive.LeaderReadService;
import com.xpsoft.oa.service.flow.JbpmService;
import com.xpsoft.oa.service.flow.ProcessFormService;
import com.xpsoft.oa.service.flow.ProcessRunService;
import com.xpsoft.oa.service.flow.TaskService;
import com.xpsoft.oa.service.info.ShortMessageService;
import com.xpsoft.oa.service.personal.ErrandsRegisterService;
import com.xpsoft.oa.service.personal.LeaveLeaderReadService;
import com.xpsoft.oa.service.system.AppUserService;
import com.xpsoft.oa.service.system.DepartmentService;
import com.xpsoft.webservice.service.flow.FlowService;

public class FlowServiceImpl implements FlowService {
	private ProcessFormDao processFormDao=(ProcessFormDao) AppUtil.getBean("processFormDao");
	
	private String activityName;
	private String taskId;
	private Map parmap = new HashMap();

	public String getActivityName() {
		return activityName;
	}

	public void setActivityName(String activityName) {
		this.activityName = activityName;
	}

	public String getTaskId() {
		return taskId;
	}

	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}

	private String getType(String type) {
		if (type.equals("doc") || type.equals("docx")) {
			return "0";
		} else if (type.equals("xls")) {
			return "1";
		} else if (type.equals("ppt")) {
			return "2";
		} else if (type.equals("pdf")) {
			return "3";
		} else if (type.equals("rar")) {
			return "5";
		} else if (type.equals("txt")) {
			return "6";
		} else if (type.equals("jpg")) {
			return "7";
		} else {
			return "4";
		}
	}

	public String filter(String userId, String passwd) {
		AppUserService userService = (AppUserService) AppUtil
				.getBean("appUserService");
		AppUser user = userService.get(Long.parseLong(userId));
		UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(
				user.getUsername(), passwd);
		SecurityContext securityContext = SecurityContextHolder.getContext();
		AuthenticationManager authenticationManager = (AuthenticationManager) AppUtil
				.getBean("authenticationManager");
		securityContext.setAuthentication(authenticationManager
				.authenticate(authRequest));
		SecurityContextHolder.setContext(securityContext);
		return null;
	}

	public String getDycyList(String userId, String passwd) {
		TaskService flowTaskService = (TaskService) AppUtil
				.getBean("flowTaskService");
		filter(userId, passwd);
		PagingBean pb = new PagingBean(0, 999999);
		List<TaskInfo> tasks = flowTaskService.getTaskInfosByUserId(userId, pb);
		List<Map> dycylist = new ArrayList();
		for (TaskInfo task : tasks) {
			if (task.getTaskName().equals("科室主任传阅")) {
				Map map = new HashMap();
				map.put("taskid", task.getTaskId());
				map.put("taskName", task.getTaskName());
				map.put("nodeName", task.getActivityName());
				map.put("author", task.getAssignee());
				map.put("createDate", task.getCreateTime() != null ? task
						.getCreateTime().toString().substring(0, 19) : "");
				dycylist.add(map);
			}
		}
		StringBuffer buff = new StringBuffer("{success:true,").append("data:");
		Gson gson = new Gson();
		buff.append(gson.toJson(dycylist));
		buff.append("}");
		return buff.toString();
	}

	public String getDbsxList(String userId, String passwd) {
		TaskService flowTaskService = (TaskService) AppUtil
				.getBean("flowTaskService");
		filter(userId, passwd);
		PagingBean pb = new PagingBean(0, 999999);
		List<TaskInfo> tasks = flowTaskService.getTaskInfosByUserId(userId, pb);
		List<Map> dycylist = new ArrayList();
		for (TaskInfo task : tasks) {
			if (!task.getTaskName().equals("科室主任传阅")) {
				Map map = new HashMap();
				map.put("taskid", task.getTaskId());
				map.put("taskName", task.getTaskName());
				map.put("nodeName", task.getActivityName());
				map.put("author", task.getAssignee()!=null?task.getAssignee().toString():"");
				map.put("createDate", task.getCreateTime() != null ? task
						.getCreateTime().toString().substring(0, 19) : "");
				dycylist.add(map);
			}
		}
		StringBuffer buff = new StringBuffer("{success:true,").append("data:");
		Gson gson = new Gson();
		buff.append(gson.toJson(dycylist));
		buff.append("}");
		return buff.toString();
	}

	public String getDbsxDetail(String userId, String passwd,
			String activityName, String taskId) {
		filter(userId, passwd);
		this.setActivityName(activityName);
		this.setTaskId(taskId);
		this.parmap.put("activityName", activityName);
		this.parmap.put("taskId", taskId);
		JbpmService jbpmService = (JbpmService) AppUtil.getBean("jbpmService");
		ProcessRunService processRunService = (ProcessRunService) AppUtil
				.getBean("processRunService");
		ProcessFormService processFormService = (ProcessFormService) AppUtil
				.getBean("processFormService");
		ArchivesService archivesService = (ArchivesService) AppUtil
				.getBean("archivesService");
		ProDefinition proDefinition = getProDefinition();
		String processName = proDefinition.getName();

		if (StringUtils.isEmpty(this.activityName)) {
			this.activityName = jbpmService.getStartNodeName(proDefinition);
		}

		Map model = new HashMap();
		Map formDataMap = null;
		Map fieldsMap = ProcessActivityAssistant.constructFieldMap(processName,
				this.activityName);
		Iterator fieldNames = fieldsMap.keySet().iterator();
		while (fieldNames.hasNext()) {
			String fieldName = (String) fieldNames.next();
			if (formDataMap != null) {
				Object fieldVal = formDataMap.get(fieldName);
				model.put(fieldName, fieldVal);
			}
			if (!model.containsKey(fieldName)) {
				model.put(fieldName, "");
			}
		}
		List<ProcessForm> pformlist = null;
		Transform tf = null;
		if (this.taskId != null) {
			ProcessRun processRun = processRunService.getByTaskId(this.taskId
					.toString());
			Map processRunVars = processFormService.getVariables(processRun
					.getRunId());
			pformlist = processFormService.getByRunId(processRun.getRunId());
			List<Transition> trans = jbpmService
					.getTransitionsByTaskId(this.taskId.toString());
			List allTrans = new ArrayList();
			for (Transition tran : trans) {
				allTrans.add(new Transform(tran));
			}
			tf = (Transform) allTrans.get(0);
			model.putAll(processRunVars);
			model.put("nextTrans", allTrans);
		}
		AppUserService userService=(AppUserService) AppUtil.getBean("appUserService");
		//查出局长的id
		String sql = "select app_user.* from user_role,app_role,app_user "
			+ "where user_role.roleId=app_role.roleId and app_user.userId=user_role.userId ";
		sql += "and app_role.roleId in ("+AppUtil.getPropertity("role.leaderId")+")";
		List<Map> list = userService.findDataList(sql);
		Map userMap=new HashMap();
		for(Map map:list){
			userMap.put(map.get("userId").toString(), map.get("userId").toString());
		}
		String json = "{success:true,";
		// ”0”,(0发文流程，1收文流程，2请假流程)
		Gson gson = new Gson();
		if (processName.equals("发文流程") || processName.equals("请示报告")
				|| processName.equals("发文流程-市局发文")) {
			String id = model.get("archives_archivesId").toString();
			Archives archives = archivesService.get(Long.parseLong(id));
			json += "title:\"" + archives.getSubject() + "\",";
			json += "createDate:\"" + archives.getCreatetime() + "\",";
			json += "id:\"" + id + "\",";
			json += "activityName: \"" + this.activityName + "\",";
			json += "taskId: \"" + this.taskId + "\",";
			json += "signalName: \"" + tf.getName() + "\",";
			json += "type:\"0\",";
			if (this.activityName.equals("科室负责人核稿")) {
				json += "boxstatus:true,";//查询所有的局长或分管局长
			} else {
				json += "boxstatus:false,";
			}
			json += "userquery:false,";
			json += "showgdlx:false,";
			json += "showBack:true,";
			if(activityName.equals("编号录入")){
				json += "showbh:true,";
			}else{
				json += "showbh:false,";
			}
			json += "isdx:false,";
			json += "fgld:false,";//分管领导
			if(activityName.equals("拟稿人分发")){
				json += "fjry:true,";//分局人员
			}else{
				json += "fjry:false,";//分局人员
			}
			json += "data:[";
			json += "{label:\"来文文字号\",value:\"" + archives.getArchivesNo()
					+ "\"},";
			json += "{label:\"发文人\",value:\"" + archives.getIssuer() + "\"},";
			json += "{label:\"发文机关\",value:\"" + archives.getIssueDep()
					+ "\"},";
			json += "{label:\"来文类型\",value:\"" + archives.getTypeName()
					+ "\"},";
			json += "{label:\"主题词\",value:\"" + archives.getKeywords() + "\"},";
			json += "{label:\"公文来源\",value:\"" + archives.getSources() + "\"},";
			json += "{label:\"紧急程度\",value:\"" + archives.getUrgentLevel()
					+ "\"},";
			json += "{label:\"秘密等级\",value:\"" + archives.getPrivacyLevel()
					+ "\"},";
			json += "{label:\"签收部门\",value:\"" + archives.getRecDepNames()
					+ "\"},";
			json += "{label:\"内容\",value:" +( archives.getShortContent()!=null?gson.toJson( archives.getShortContent()):"\"\"") + "},";
			String leadjson="";
			String otherpjson="";
			for (ProcessForm pf : pformlist) {
				if (!pf.getActivityName().equals("开始")) {
					if(userMap.get(pf.getCreatorId().toString())!=null){
						leadjson += "{label:\"审批流程名称\",value:\"" + pf.getActivityName()
						+ "\"},";
						leadjson += "{label:\"审批人\",value:\"" + pf.getCreatorName()
								+ "\"},";
						Iterator<FormData> foemdates = pf.getFormDatas().iterator();
						for (; foemdates.hasNext();) {
							FormData fd = foemdates.next();
							if (fd.getIsShowed() == 1&&fd.getVal()!=null) {
								leadjson += "{label:\"" + fd.getFieldLabel()
										+ "\",value:" + (fd.getVal()!=null?gson.toJson(fd.getVal()):"\"\"") + "},";
							}
						}
					}else{
						otherpjson += "{label:\"审批流程名称\",value:\"" + pf.getActivityName()
						+ "\"},";
						otherpjson += "{label:\"审批人\",value:\"" + pf.getCreatorName()
								+ "\"},";
						Iterator<FormData> foemdates = pf.getFormDatas().iterator();
						for (; foemdates.hasNext();) {
							FormData fd = foemdates.next();
							if (fd.getIsShowed() == 1&&fd.getVal()!=null) {
								otherpjson += "{label:\"" + fd.getFieldLabel()
										+ "\",value:" + (fd.getVal()!=null?gson.toJson(fd.getVal()):"\"\"") + "},";
							}
						}
					}
				}
			}
			json=json+leadjson+otherpjson;
			if (json.length() > 0 && json.lastIndexOf(",") == json.length() - 1) {
				json = json.substring(0, json.length() - 1);
			}
			json += "],";
			json += "accessories:[";
			Iterator<ArchivesDoc> iterator = archives.getArchivesDocs()
					.iterator();
			ArchivesDoc doc = null;
			for (; iterator.hasNext();) {
				doc = iterator.next();
				json += "{name:\"" + doc.getDocName() + "\",\"url\":\""
						+ doc.getFileAttach().getFilePath() + "\",type:\""
						+ getType(doc.getFileAttach().getExt()) + "\"}";
				if (iterator.hasNext()) {
					json += ",";
				}
			}
			json += "]}";
		} else if (processName.equals("收文流程")
				|| processName.equals("收文流程-市局收文")) {
			String id = model.get("archives_archivesId").toString();
			Archives archives = archivesService.get(Long.parseLong(id));
			json += "title:\"" + archives.getSubject() + "\",";
			json += "createDate:\"" + archives.getCreatetime() + "\",";
			json += "id:\"" + id + "\",";
			json += "activityName: \"" + this.activityName + "\",";
			json += "taskId: \"" + this.taskId + "\",";
			json += "signalName: \"" + tf.getName() + "\",";
			json += "type:\"1\",";
			if (this.activityName.equals("办公室主任批阅")) {
				json += "boxstatus:true,";
			} else {
				json += "boxstatus:false,";
			}
			if (activityName.equals("指定传阅人")
					|| this.activityName.equals("科室主任传阅")) {
				json += "userquery:true,";
			} else {
				json += "userquery:false,";
			}
			if (this.activityName.equals("承办归档")) {
				json += "showgdlx:true,";
			} else {
				json += "showgdlx:false,";
			}
			if ( this.activityName.equals("科室主任传阅")||this.activityName.equals("承办归档")) {
				json += "showBack:false,";
			} else {
				json += "showBack:true,";
			}
			json += "showbh:false,";
			json += "isdx:false,";
//			String usersql = "select app_user.* from user_role,app_role,app_user "
//				+ "where user_role.roleId=app_role.roleId and app_user.userId=user_role.userId " +
//				"and app_role.roleId in ("+AppUtil.getPropertity("role.leaderId")+")";
//			AppUserService appUserService = (AppUserService) AppUtil.getBean("appUserService");
//			List<Map> userList=appUserService.findDataList(usersql);
//			Map usermap=new HashMap();
//			for(Map user:userList){
//				usermap.put(user.get("userId").toString(), user.get("userId").toString());
//			}
			//不管是不是局长，都不需要再查分管领导了
			if(this.activityName.equals("分管或主管领导批示")&&userMap.get(userId)!=null){
				json += "fgld:false,";
			}else{
				json += "fgld:false,";
			}
			json += "fjry:false,";//分局人员
			json += "data:[";
			json += "{label:\"来文文字号\",value:\"" + archives.getArchivesNo()
					+ "\"},";
			json += "{label:\"发文人\",value:\"" + archives.getIssuer() + "\"},";
			json += "{label:\"发文机关\",value:\"" + archives.getIssueDep()
					+ "\"},";
			json += "{label:\"来文类型\",value:\""
					+ archives.getArchRecType().getTypeName() + "\"},";
			json += "{label:\"主题词\",value:\"" + archives.getKeywords() + "\"},";
			json += "{label:\"公文来源\",value:\"" + archives.getSources() + "\"},";
			json += "{label:\"紧急程度\",value:\"" + archives.getUrgentLevel()
					+ "\"},";
			json += "{label:\"秘密等级\",value:\"" + archives.getPrivacyLevel()
					+ "\"},";
			json += "{label:\"内容\",value:" +( archives.getShortContent()!=null?gson.toJson( archives.getShortContent()):"\"\"") + "},";
			String leadjson="";
			String otherpjson="";
			for (ProcessForm pf : pformlist) {
				if (!pf.getActivityName().equals("开始")) {
					if(userMap.get(pf.getCreatorId().toString())!=null){
						leadjson += "{label:\"审批流程名称\",value:\"" + pf.getActivityName()
						+ "\"},";
						leadjson += "{label:\"审批人\",value:\"" + pf.getCreatorName()
								+ "\"},";
						Iterator<FormData> foemdates = pf.getFormDatas().iterator();
						for (; foemdates.hasNext();) {
							FormData fd = foemdates.next();
							if (fd.getIsShowed() == 1&&fd.getVal()!=null) {
								leadjson += "{label:\"" + fd.getFieldLabel()
										+ "\",value:" + (fd.getVal()!=null?gson.toJson(fd.getVal()):"\"\"") + "},";
							}
						}
					}else{
						otherpjson += "{label:\"审批流程名称\",value:\"" + pf.getActivityName()
						+ "\"},";
						otherpjson += "{label:\"审批人\",value:\"" + pf.getCreatorName()
								+ "\"},";
						Iterator<FormData> foemdates = pf.getFormDatas().iterator();
						for (; foemdates.hasNext();) {
							FormData fd = foemdates.next();
							if (fd.getIsShowed() == 1&&fd.getVal()!=null) {
								otherpjson += "{label:\"" + fd.getFieldLabel()
										+ "\",value:" + (fd.getVal()!=null?gson.toJson(fd.getVal()):"\"\"") + "},";
							}
						}
					}
				}
			}
			json=json+leadjson+otherpjson;
			if (json.length() > 0 && json.lastIndexOf(",") == json.length() - 1) {
				json = json.substring(0, json.length() - 1);
			}
			json += "],";
			json += "accessories:[";
			Iterator<ArchivesDoc> iterator = archives.getArchivesDocs()
					.iterator();
			ArchivesDoc doc = null;
			for (; iterator.hasNext();) {
				doc = iterator.next();
				json += "{name:\"" + doc.getDocName() + "\",\"url\":\""
						+ doc.getFileAttach().getFilePath() + "\",type:\""
						+ getType(doc.getFileAttach().getExt()) + "\"}";
				if (iterator.hasNext()) {
					json += ",";
				}
			}
			json += "]}";
		} else if (processName.equals("请假-短") || processName.equals("请假-中")
				|| processName.equals("请假-长")) {
			String dateId = model.get("dateId").toString();
			ErrandsRegisterService errandsRegisterService = (ErrandsRegisterService) AppUtil
					.getBean("errandsRegisterService");
			ErrandsRegister errandsRegister = (ErrandsRegister) errandsRegisterService
					.get(Long.parseLong(dateId));
			json += "title:\"" + processName + "\",";
			json += "createDate:\"" + errandsRegister.getStartTime() + "\",";
			json += "id:\"" + dateId + "\",";
			json += "activityName: \"" + this.activityName + "\",";
			json += "taskId: \"" + this.taskId + "\",";
			json += "signalName: \"" + tf.getName() + "\",";
			json += "type:\"2\",";
			json += "boxstatus:false,";
			json += "userquery:false,";
			json += "showgdlx:false,";
			json += "showBack:true,";
			json += "showbh:false,";
			json += "isdx:false,";
			json += "fgld:false,";
			json += "fjry:false,";//分局人员
			json += "data:[";
			json += "{label:\"开始时间\",value:\"" + errandsRegister.getStartTime()
					+ "\"},";
			json += "{label:\"结束时间\",value:\"" + errandsRegister.getEndTime()
					+ "\"},";
			json += "{label:\"申请人\",value:\"" + errandsRegister.getAppUser().getFullname()
			+ "\"},";
			json += "{label:\"部门\",value:\"" + errandsRegister.getAppUser().getDepartment().getDepName()
			+ "\"},";
			json += "{label:\"描述\",value:" +( errandsRegister.getDescp()!=null?gson.toJson( errandsRegister.getDescp()):"\"\"") + "},";
			json += "{label:\"请假类型\",value:\""
					+ errandsRegister.getLeaveTypeName() + "\"},";
			String leadjson="";
			String otherpjson="";
			for (ProcessForm pf : pformlist) {
				if (!pf.getActivityName().equals("开始")) {
					if(userMap.get(pf.getCreatorId().toString())!=null){
						leadjson += "{label:\"审批流程名称\",value:\"" + pf.getActivityName()
						+ "\"},";
						leadjson += "{label:\"审批人\",value:\"" + pf.getCreatorName()
								+ "\"},";
						Iterator<FormData> foemdates = pf.getFormDatas().iterator();
						for (; foemdates.hasNext();) {
							FormData fd = foemdates.next();
							if (fd.getIsShowed() == 1&&fd.getVal()!=null) {
								leadjson += "{label:\"" + fd.getFieldLabel()
										+ "\",value:" + (fd.getVal()!=null?gson.toJson(fd.getVal()):"\"\"") + "},";
							}
						}
					}else{
						otherpjson += "{label:\"审批流程名称\",value:\"" + pf.getActivityName()
						+ "\"},";
						otherpjson += "{label:\"审批人\",value:\"" + pf.getCreatorName()
								+ "\"},";
						Iterator<FormData> foemdates = pf.getFormDatas().iterator();
						for (; foemdates.hasNext();) {
							FormData fd = foemdates.next();
							if (fd.getIsShowed() == 1&&fd.getVal()!=null) {
								otherpjson += "{label:\"" + fd.getFieldLabel()
										+ "\",value:" + (fd.getVal()!=null?gson.toJson(fd.getVal()):"\"\"") + "},";
							}
						}
					}
				}
			}
			json=json+leadjson+otherpjson;
			if (json.length() > 0 && json.lastIndexOf(",") == json.length() - 1) {
				json = json.substring(0, json.length() - 1);
			}
			json += "],accessories:[]}";
		}
		return json;
	}

	public String getYycyList(String userId, String passwd, String passType,
			String title, String pageNum, String pageSize) {
		filter(userId, passwd);
		Integer start = 0;
		Integer limit = 10;
		if (pageNum != null && pageSize != null) {
			start = (Integer.parseInt(pageNum) - 1)
					* Integer.parseInt(pageSize);
			limit = Integer.parseInt(pageSize);
		}
		PagingBean pb = new PagingBean(start, limit);
		ArchDispatchService archDispatchService = (ArchDispatchService) AppUtil
				.getBean("archDispatchService");
		QueryFilter filter = new QueryFilter(pb);
		filter.addFilter("Q_userId_L_EQ", userId);
		filter.addFilter("Q_archUserType_SN_EQ", "0");
		if (title != null && title.length() > 0) {
			filter.addFilter("Q_subject_S_LK", title);
		}
		if (passType.equals("0")) {
			filter.addFilter("Q_archives.status_SN_EQ", "6");
		} else if (passType.equals("1")) {
			filter.addFilter("Q_archives.status_SN_NEQ", "6");
		}
		List<ArchDispatch> list = archDispatchService.getAll(filter);
		String json = "{success:true,totalCount:\"" + pb.getTotalItems()
				+ "\",data:[";
		for (ArchDispatch ad : list) {
			json += "{id:\"" + ad.getArchivesId() + "\",title:\""
					+ ad.getSubject() + "\",gwzh :\""
					+ ad.getArchives().getArchivesNo() + "\",author :\""
					+ ad.getArchives().getIssuer() + "\", department:\""
					+ ad.getArchives().getIssueDep() + "\",createDate :\""
					+ ad.getArchives().getIssueDate() + "\"},";
		}
		if (list != null && list.size() > 0) {
			json = json.substring(0, json.length() - 1);
		}
		json += "]}";
		return json;
	}

	public String getYycyDetail(String userId, String passwd, String id) {
		// TODO Auto-generated method stub
		ArchivesService arService = (ArchivesService) AppUtil
				.getBean("archivesService");
		Archives archives = arService.load(new Long(id));
		String json = "{success:true,";
		json += "title:\"" + archives.getSubject() + "\",";
		json += "createDate:\"" + archives.getCreatetime() + "\",";
		json += "id:\"" + id + "\",";
		json += "activityName: \"false\",";
		json += "taskId: \"false\",";
		json += "signalName: \"false\",";
		json += "type:\"1\",";
		json += "boxstatus:false,";
		json += "userquery:false,";
		json += "showgdlx:false,";
		json += "data:[";
		json += "{label:\"来文文字号\",value:\"" + archives.getArchivesNo() + "\"},";
		json += "{label:\"发文人\",value:\"" + archives.getIssuer() + "\"},";
		json += "{label:\"发文机关\",value:\"" + archives.getIssueDep() + "\"},";
		json += "{label:\"来文类型\",value:\""
				+ archives.getArchRecType().getTypeName() + "\"},";
		json += "{label:\"主题词\",value:\"" + archives.getKeywords() + "\"},";
		json += "{label:\"公文来源\",value:\"" + archives.getSources() + "\"},";
		json += "{label:\"紧急程度\",value:\"" + archives.getUrgentLevel() + "\"},";
		json += "{label:\"秘密等级\",value:\"" + archives.getPrivacyLevel()
				+ "\"},";
		Gson gson = new Gson();
		json += "{label:\"内容\",value:" +( archives.getShortContent()!=null?gson.toJson( archives.getShortContent()):"\"\"") + "},";
		if (json.length() > 0 && json.lastIndexOf(",") == json.length() - 1) {
			json = json.substring(0, json.length() - 1);
		}
		json += "],";
		json += "accessories:[";
		Iterator<ArchivesDoc> iterator = archives.getArchivesDocs().iterator();
		ArchivesDoc doc = null;
		for (; iterator.hasNext();) {
			doc = iterator.next();
			json += "{name:\"" + doc.getDocName() + "\",\"url\":\""
					+ doc.getFileAttach().getFilePath() + "\",type:\""
					+ getType(doc.getFileAttach().getExt()) + "\"}";
			if (iterator.hasNext()) {
				json += ",";
			}
		}
		json += "]}";
		return json;
	}

	public String getDyffList(String userId, String passwd,
			String title, String pageNum, String pageSize) {
		filter(userId, passwd);
		Integer start = 0;
		Integer limit = 10;
		if (pageNum != null && pageSize != null) {
			start = (Integer.parseInt(pageNum) - 1)
					* Integer.parseInt(pageSize);
			limit = Integer.parseInt(pageSize);
		}
		PagingBean pb = new PagingBean(start, limit);
		QueryFilter filter = new QueryFilter(pb);
		filter.addFilter("Q_signUserID_L_EQ", ContextUtil
				.getCurrentUserId().toString());
		filter.addFilter("Q_status_SN_EQ", ArchivesDist.STATUS_UNSIGNED+"");
		ArchivesDistService archivesDistService= (ArchivesDistService) AppUtil.getBean("archivesDistService");
		List<ArchivesDist> list = archivesDistService.getAll(filter);
		String json = "{success:true,totalCount:\"" + pb.getTotalItems()
				+ "\",data:[";
		for (ArchivesDist ad : list) {
			json += "{id:\"" + ad.getArchivesId()
					+ "\",distid:\""+ ad.getarchDistId() + "\",title:\""
					+ ad.getSubject() + "\",gwzh :\""
					+ ad.getArchives().getArchivesNo() + "\",author :\""
					+ ad.getArchives().getIssuer() + "\", department:\""
					+ ad.getArchives().getIssueDep() + "\",createDate :\""
					+ ad.getArchives().getIssueDate() + "\"},";
		}
		if (list != null && list.size() > 0) {
			json = json.substring(0, json.length() - 1);
		}
		json += "]}";
		return json;
	}

	public String getDyffDetail(String userId, String passwd, String id,String distid) {
		// TODO Auto-generated method stub
		ArchivesService arService = (ArchivesService) AppUtil
				.getBean("archivesService");
		Archives archives = arService.load(new Long(id));
		String json = "{success:true,";
		json += "title:\"" + archives.getSubject() + "\",";
		json += "createDate:\"" + archives.getCreatetime() + "\",";
		json += "id:\"" + id + "\",";
		json += "activityName: \"false\",";
		json += "taskId: \"false\",";
		json += "signalName: \"false\",";
		json += "type:\"1\",";
		json += "boxstatus:false,";
		json += "userquery:false,";
		json += "showgdlx:false,";
		json += "data:[";
		json += "{label:\"来文文字号\",value:\"" + archives.getArchivesNo() + "\"},";
		json += "{label:\"发文人\",value:\"" + archives.getIssuer() + "\"},";
		json += "{label:\"发文机关\",value:\"" + archives.getIssueDep() + "\"},";
		json += "{label:\"发文类型\",value:\""
				+ archives.getArchivesType().getTypeName() + "\"},";
		json += "{label:\"主题词\",value:\"" + archives.getKeywords() + "\"},";
		json += "{label:\"公文来源\",value:\"" + archives.getSources() + "\"},";
		json += "{label:\"紧急程度\",value:\"" + archives.getUrgentLevel() + "\"},";
		json += "{label:\"秘密等级\",value:\"" + archives.getPrivacyLevel()
				+ "\"},";
		Gson gson = new Gson();
		json += "{label:\"内容\",value:" +( archives.getShortContent()!=null?gson.toJson( archives.getShortContent()):"\"\"") + "},";
		if (json.length() > 0 && json.lastIndexOf(",") == json.length() - 1) {
			json = json.substring(0, json.length() - 1);
		}
		json += "],";
		json += "accessories:[";
		Iterator<ArchivesDoc> iterator = archives.getArchivesDocs().iterator();
		ArchivesDoc doc = null;
		for (; iterator.hasNext();) {
			doc = iterator.next();
			json += "{name:\"" + doc.getDocName() + "\",\"url\":\""
					+ doc.getFileAttach().getFilePath() + "\",type:\""
					+ getType(doc.getFileAttach().getExt()) + "\"}";
			if (iterator.hasNext()) {
				json += ",";
			}
		}
		json += "]}";
		ArchivesDistService archivesDistService= (ArchivesDistService) AppUtil.getBean("archivesDistService");
		if(distid!=null&&distid.length()>0){
			ArchivesDist dist=archivesDistService.get(Long.parseLong(distid));
			dist.setStatus(ArchivesDist.STATUS_SIGNED);
			archivesDistService.save(dist);
		}
		
		return json;
	}
	public String saveDyffDetail(String userId, String passwd, String id ){
		
		return "{success:true}";
	}
	public String saveProcessAndToNext(String userId, String passwd, String id,
			String taskId, String activityName, String signalName,
			String commentDesc, String nextuser, String checkboxvalue,
			String ispass, String gdlx,String bh,String fgld,String fjry,String btType) {
		filter(userId, passwd);
		ErrandsRegisterService errandsRegisterService = (ErrandsRegisterService) AppUtil.getBean("errandsRegisterService");
		LeaveLeaderReadService leaveLeaderReadService = (LeaveLeaderReadService) AppUtil.getBean("leaveLeaderReadService");
		ArchivesService archivesService = (ArchivesService) AppUtil.getBean("archivesService");
		LeaderReadService leaderReadService = (LeaderReadService) AppUtil.getBean("leaderReadService");
		DepartmentService departmentService = (DepartmentService) AppUtil.getBean("departmentService");
		ArchRecUserService archRecUserService = (ArchRecUserService) AppUtil.getBean("archRecUserService");
		ArchivesDepService archivesDepService = (ArchivesDepService) AppUtil.getBean("archivesDepService");
		ShortMessageService messageService = (ShortMessageService) AppUtil.getBean("shortMessageService");
		ArchivesAttendService archivesAttendService = (ArchivesAttendService) AppUtil.getBean("archivesAttendService");
		ArchDispatchService archDispatchService = (ArchDispatchService) AppUtil.getBean("archDispatchService");
		ArchUnderTakesService undertakesService = (ArchUnderTakesService) AppUtil.getBean("undertakesService");
		ArchivesHandleService archivesHandleService = (ArchivesHandleService) AppUtil.getBean("archivesHandleService");
		ArchRecFiledTypeService archRecFiledTypeService = (ArchRecFiledTypeService) AppUtil.getBean("archRecFiledTypeService");
		AppUserService appUserService = (AppUserService) AppUtil.getBean("appUserService");
		ArchivesDistService archivesDistService= (ArchivesDistService) AppUtil.getBean("archivesDistService");
		if(activityName==null||activityName.length()==0){
			TaskService flowTaskService = (TaskService) AppUtil
			.getBean("flowTaskService");
			PagingBean pb = new PagingBean(0, 999999);
			List<TaskInfo> tasks = flowTaskService.getTaskInfosByUserId(userId, pb);
			for (TaskInfo task : tasks) {
				if(task.getTaskId().equals(Long.parseLong(taskId))){
					activityName=task.getActivityName();
					break;
				}
			}
		}
		this.setActivityName(activityName);
		this.setTaskId(taskId);
		JbpmService jbpmService=(JbpmService) AppUtil.getBean("jbpmService");
		ProDefinition proDefinition = getProDefinition();
		String processName = proDefinition.getName();
		ProcessRunService processRunService = (ProcessRunService) AppUtil
				.getBean("processRunService");
		if(ispass!=null&&ispass.length()>0&&ispass.equals("false")){
			this.parmap.put("activityName", activityName);
			this.parmap.put("taskId", taskId);
			this.parmap.put("signalName", signalName);
			FlowRunInfo flowRunInfo = getFlowRunInfo();
			ProcessInstance pi=jbpmService.getProcessInstanceByTaskId(taskId);
			ProcessRun processRun = processRunService.getByTaskId(this.taskId.toString());
			processRun.setRunStatus(ProcessRun.RUN_STATUS_FINISHED);
	        processRun.setPiId(null);
	        processRunService.save(processRun);
	        this.saveForm(processRun, flowRunInfo,"打回");
			jbpmService.endProcessInstance(pi.getId());
			if (processName.equals("请假-短") || processName.equals("请假-中")
					|| processName.equals("请假-长")) {
				ErrandsRegister errandsRegister = ((ErrandsRegister) errandsRegisterService
						.get(Long.parseLong(id)));
				errandsRegister.setStatus(Short.valueOf(Short
							.parseShort("6")));
				errandsRegisterService.save(errandsRegister);
				LeaveLeaderRead leaderRead = new LeaveLeaderRead();
				leaderRead.setLeaderName(ContextUtil.getCurrentUser()
						.getFullname());
				leaderRead.setUserId(ContextUtil.getCurrentUserId());
				leaderRead.setErrandsRegister(errandsRegister);
				leaderRead.setCreatetime(new Date());
				leaderRead.setIsPass(LeaveLeaderRead.NOT_PASS);
				leaderRead.setLeaderOpinion("打回");
				leaderRead.setCheckName(activityName);
				leaderRead = leaveLeaderReadService.save(leaderRead);
			} else if (processName.equals("发文流程") || processName.equals("请示报告")
					|| processName.equals("发文流程-市局发文")||processName.equals("收文流程")
					|| processName.equals("收文流程-市局收文")) {
				Archives archives = ((Archives) archivesService.get(Long
						.parseLong(id)));
				archives.setStatus(Short.valueOf(Short
							.parseShort("0")));
				archivesService.save(archives);
				LeaderRead leaderRead = new LeaderRead();
				leaderRead.setLeaderName(ContextUtil.getCurrentUser()
						.getFullname());
				leaderRead.setUserId(ContextUtil.getCurrentUserId());
				leaderRead.setArchives(archives);
				leaderRead.setCreatetime(new Date());
				leaderRead.setIsPass(LeaderRead.NOT_PASS);
				leaderRead.setLeaderOpinion("打回");
				leaderRead.setCheckName(activityName);
				leaderReadService.save(leaderRead);
			}
			return "{success:true}";
		}else{
			this.parmap.put("activityName", activityName);
			this.parmap.put("taskId", taskId);
			this.parmap.put("signalName", signalName);
		}
		
		if (nextuser != null && nextuser.length() > 0) {
			this.parmap.put("signUserIds", nextuser);
		}
		Set userset=new HashSet();
		if((processName.equals("请示报告")&&activityName.equals("部门负责人"))
				||(processName.equals("发文流程-市局发文")&&activityName.equals("科室负责人核稿"))){
			if(checkboxvalue!=null&&checkboxvalue.length()>0){
				this.parmap.put("signUserIds", checkboxvalue);
			}else{
				Long deptId = ContextUtil.getCurrentUser().getDepartment().getDepId();
				ArchRecUser archRecUser = (ArchRecUser) archRecUserService.getByDepId(deptId);
				if(archRecUser!=null&&archRecUser.getLeaderUserId()!=null){
					this.parmap.put("flowAssignId", archRecUser.getLeaderUserId());
				}
			}
		}else if((processName.equals("发文流程-市局发文")&&activityName.equals("分管或局领导签发"))){
			Long deptId = ContextUtil.getCurrentUser().getDepartment().getDepId();
			ArchRecUser archRecUser = (ArchRecUser) archRecUserService.getByDepId(deptId);
			if(archRecUser!=null&&archRecUser.getLeaderUserId()!=null){
				this.parmap.put("flowAssignId", archRecUser.getOfficeHeaderUserId());
			}else{
				this.parmap.put("flowAssignId",ContextUtil.getCurrentUser().getId());
				System.out.println(processName+activityName+"审批中由于获取不到人，因此取改登录人");
			}
		}else if((processName.equals("发文流程-市局发文")&&activityName.equals("办公室主任承办"))){
			Long deptId = ContextUtil.getCurrentUser().getDepartment().getDepId();
			ArchRecUser archRecUser = (ArchRecUser) archRecUserService.getByDepId(deptId);
			if(archRecUser!=null&&archRecUser.getLeaderUserId()!=null){
				this.parmap.put("flowAssignId", archRecUser.getNumberUserId());
			}else{
				this.parmap.put("flowAssignId",ContextUtil.getCurrentUser().getId());
				System.out.println(processName+activityName+"审批中由于获取不到人，因此取改登录人");
			}
		}else if((processName.equals("发文流程-市局发文")&&activityName.equals("编号录入"))){
			Long deptId = ContextUtil.getCurrentUser().getDepartment().getDepId();
			ArchRecUser archRecUser = (ArchRecUser) archRecUserService.getByDepId(deptId);
			if(archRecUser!=null&&archRecUser.getLeaderUserId()!=null){
				this.parmap.put("flowAssignId", archRecUser.getStampUserId());
			}else{
				this.parmap.put("flowAssignId",ContextUtil.getCurrentUser().getId());
				System.out.println(processName+activityName+"审批中由于获取不到人，因此取改登录人");
			}
		}
		else if(processName.equals("收文流程-市局收文")&&activityName.equals("办公室主任批阅")){
			this.parmap.put("signUserIds", checkboxvalue);
		}else if(processName.equals("收文流程-市局收文")&&activityName.equals("分管或主管领导批示")){
			Long deptId = ContextUtil.getCurrentUser().getDepartment().getDepId();
			ArchRecUser archRecUser = (ArchRecUser) archRecUserService.getByDepId(deptId);
			if(archRecUser!=null&&archRecUser.getSignUserId()!=null){
				this.parmap.put("flowAssignId", archRecUser.getSignUserId());
			}else{
				this.parmap.put("flowAssignId",ContextUtil.getCurrentUser().getId());
				System.out.println(processName+activityName+"审批中由于获取不到人，因此取改登录人");
			}
		}
		else if(processName.equals("请假-中")&&activityName.equals("部门负责人审批")){
			ErrandsRegister errandsRegister = ((ErrandsRegister) errandsRegisterService.get(Long.parseLong(id)));
			Long userid=errandsRegister.getApprovalId();
			AppUser appUser =appUserService.get(userid);
			Long departid=appUser.getDepartment().getDepId();
			ArchRecUser archRecUser = (ArchRecUser) archRecUserService.getByDepId(departid);
			if(archRecUser!=null&&archRecUser.getLeaderUserId()!=null){
				this.parmap.put("flowAssignId", archRecUser.getLeaderUserId());
			}
		}
		
		try {
			if (processName.equals("请假-短") || processName.equals("请假-中")
					|| processName.equals("请假-长")) {
				
				ErrandsRegister errandsRegister = ((ErrandsRegister) errandsRegisterService
						.get(Long.parseLong(id)));
				LeaveLeaderRead leaderRead = new LeaveLeaderRead();
				String errandsRegisterStatus = "";
				if (activityName.equals("部门负责人审批")) {// 1
					if (processName.equals("请假-短")) {
						errandsRegisterStatus = "4";
					} else if (processName.equals("请假-中")) {
						errandsRegisterStatus = "2";
					} else if (processName.equals("请假-长")) {
						errandsRegisterStatus = "3";
					}
				} else if (activityName.equals("分管局长审批")) {// 2
					if (processName.equals("请假-中")) {
						errandsRegisterStatus = "4";
					}
				} else if (activityName.equals("局长审批")) {// 3
					if (processName.equals("请假-中")) {
						errandsRegisterStatus = "4";
					} else if (processName.equals("请假-长")) {
						errandsRegisterStatus = "4";
					}
				} else if (activityName.equals("人事登记")) {// 4
					errandsRegisterStatus = "5";
				}
				if (StringUtils.isNotEmpty(errandsRegisterStatus)) {
					errandsRegister.setStatus(Short.valueOf(Short
							.parseShort(errandsRegisterStatus)));
				}
				errandsRegisterService.save(errandsRegister);
				leaderRead.setLeaderName(ContextUtil.getCurrentUser()
						.getFullname());
				leaderRead.setUserId(ContextUtil.getCurrentUserId());
				leaderRead.setErrandsRegister(errandsRegister);
				leaderRead.setCreatetime(new Date());
				leaderRead.setIsPass(LeaveLeaderRead.IS_PASS);
				leaderRead.setLeaderOpinion(commentDesc);
				leaderRead.setCheckName(activityName);
				leaderRead = leaveLeaderReadService.save(leaderRead);
				this.parmap.put("leaderRead.readId", leaderRead.getReadId());
				this.parmap.put("leaderRead.leaderOpinion", commentDesc);
				this.parmap.put("errandsRegister.dateId", id);
			} else if (processName.equals("发文流程") || processName.equals("请示报告")
					|| processName.equals("发文流程-市局发文")) {
				if (activityName.equals("部门负责人")) {
					Archives archives = ((Archives) archivesService.get(Long
							.parseLong(id)));
					String archivesStatus = "6";
					if (StringUtils.isNotEmpty(archivesStatus)) {
						archives.setStatus(Short.valueOf(Short
								.parseShort(archivesStatus)));
					}
					archivesService.save(archives);
					LeaderRead leaderRead = new LeaderRead();
					leaderRead.setLeaderName(ContextUtil.getCurrentUser()
							.getFullname());
					leaderRead.setUserId(ContextUtil.getCurrentUserId());
					leaderRead.setArchives(archives);
					leaderRead.setCreatetime(new Date());
					leaderRead.setIsPass(LeaderRead.IS_PASS);
					leaderRead.setLeaderOpinion(commentDesc);
					leaderRead.setCheckName(activityName);
					leaderReadService.save(leaderRead);
					this.parmap
							.put("leaderRead.readId", leaderRead.getReadId());
					this.parmap.put("leaderRead.leaderOpinion", commentDesc);
					this.parmap.put("archives.archivesId", id);
				} else if (activityName.equals("分管局长审核")) {
					Archives archives = ((Archives) archivesService.get(Long
							.parseLong(id)));
					String archivesStatus = "8";
					if (StringUtils.isNotEmpty(archivesStatus)) {
						archives.setStatus(Short.valueOf(Short
								.parseShort(archivesStatus)));
					}
					archivesService.save(archives);
					LeaderRead leaderRead = new LeaderRead();
					leaderRead.setLeaderName(ContextUtil.getCurrentUser()
							.getFullname());
					leaderRead.setUserId(ContextUtil.getCurrentUserId());
					leaderRead.setArchives(archives);
					leaderRead.setCreatetime(new Date());
					leaderRead.setIsPass(LeaderRead.IS_PASS);
					leaderRead.setLeaderOpinion(commentDesc);
					leaderRead.setCheckName(activityName);
					leaderReadService.save(leaderRead);
					this.parmap
							.put("leaderRead.readId", leaderRead.getReadId());
					this.parmap.put("leaderRead.leaderOpinion", commentDesc);
					this.parmap.put("archives.archivesId", id);
				}else if (activityName.equals("局长审核")
						|| activityName.equals("拟稿人分发")) {
					Archives archives = ((Archives) archivesService.get(Long
							.parseLong(id)));
					String depIds = archives.getRecDepIds();
					StringBuffer msg = new StringBuffer("");
					// 获取不需要进入收文签收的发文类型类型
					String archivesTypeName = AppUtil
							.getPropertity("app.unrefArchivesTypeName");
					if (StringUtils.isNotEmpty(depIds)
							&& !archives.getArchivesType().getTypeName()
									.equals(archivesTypeName)) {
						String[] depIdArr = depIds.split("[,]");
						if (depIdArr != null) {
							StringBuffer recIds = new StringBuffer("");
							for (int i = 0; i < depIdArr.length; i++) {
								Long depId = new Long(depIdArr[i]);
								Department department = (Department) departmentService
										.get(depId);
								ArchRecUser archRecUser = archRecUserService
										.getByDepId(depId);
								ArchivesDep archivesDep = new ArchivesDep();
								archivesDep.setSubject(archives.getSubject());
								archivesDep.setDepartment(department);
								archivesDep.setArchives(archives);
								archivesDep.setIsMain(ArchivesDep.RECEIVE_MAIN);
								archivesDep
										.setStatus(ArchivesDep.STATUS_UNSIGNED);
								if ((archRecUser != null)
										&& (archRecUser.getUserId() != null)) {
									archivesDep.setSignUserID(archRecUser
											.getUserId());
									archivesDep.setSignFullname(archRecUser
											.getFullname());
									recIds.append(archRecUser.getUserId())
											.append(",");
								}
								archivesDepService.save(archivesDep);
							}
							//发文分发，1市局所有人 2分局指定人
							//市局部门的的isDist=0
							//distUserIds为分局指定人的ids
							Long deptId = ContextUtil.getCurrentUser().getDepartment().getDepId();
							Department dept =departmentService.get(deptId);
							StringBuffer distIds = new StringBuffer();	//发送分发人信息
							if(dept.getIsDist()==0){//如果分发人不是市局的，就不需要分发市局的，只选择分局的分发
								QueryFilter filter = new QueryFilter(new HashMap());
								filter.addFilter("Q_delFlag_SN_EQ", Constants.FLAG_UNDELETED.toString());
								filter.addFilter("Q_department.isDist_N_EQ", "0");
								List<AppUser> mainDeptUsers = appUserService.getAll(filter);//市局
								//市局
								for (int i = 0; i < mainDeptUsers.size(); i++) {
									ArchivesDist archivesDist = new ArchivesDist();
									archivesDist.setSubject(archives.getSubject());
									archivesDist.setDepartment(mainDeptUsers.get(i).getDepartment());
									archivesDist.setArchives(archives);
									archivesDist.setIsMain(ArchivesDist.RECEIVE_MAIN);
									archivesDist.setStatus(ArchivesDist.STATUS_UNSIGNED);
									archivesDist.setSignUserID(mainDeptUsers.get(i).getUserId());
									archivesDist.setSignFullname(mainDeptUsers.get(i).getFullname());
									distIds.append(mainDeptUsers.get(i).getUserId()).append(",");
									archivesDistService.save(archivesDist);
								}
							}
							//分局
							if(fjry!=null&&fjry.length()>0){
								//保存分局人员
								String distUserIds = fjry;
								if(StringUtils.isNotEmpty(distUserIds)){
									String [] distUsers = distUserIds.split("[,]");
									for(int i=0; i<distUsers.length; i++){
										AppUser user = appUserService.get(Long.valueOf(distUsers[i]));
										ArchivesDist archivesDist = new ArchivesDist();
										archivesDist.setSubject(archives.getSubject());
										archivesDist.setDepartment(user.getDepartment());
										archivesDist.setArchives(archives);
										archivesDist.setIsMain(ArchivesDist.RECEIVE_MAIN);
										archivesDist.setStatus(ArchivesDist.STATUS_UNSIGNED);
										archivesDist.setSignUserID(user.getUserId());
										archivesDist.setSignFullname(user.getFullname());
										distIds.append(user.getUserId()).append(",");
										archivesDistService.save(archivesDist);
									}
								}
							}
							if (StringUtils.isNotEmpty(distIds.toString())) {
								String content = "您有新的公文,请及时签收.";
								messageService.save(AppUser.SYSTEM_USER, distIds
										.toString(), content, ShortMessage.MSG_TYPE_TASK);
							}
						}
					}
					archives.setStatus(Short.valueOf(Short.parseShort("7")));
					archivesService.save(archives);
					this.parmap.put("distributeOpinion", commentDesc);
					this.parmap.put("archives.archivesId", id);
				} else if (activityName.equals("科室负责人核稿")) {
					String archivesStatus = "2";
					Archives archives = ((Archives) archivesService.get(Long
							.parseLong(id)));
					if (StringUtils.isNotEmpty(archivesStatus)) {
						archives.setStatus(Short.valueOf(Short
								.parseShort(archivesStatus)));
					}
					archivesService.save(archives);
					ArchivesAttend archivesAttend = new ArchivesAttend();
					archivesAttend.setArchives(archives);
					archivesAttend.setUserID(ContextUtil.getCurrentUserId());
					archivesAttend.setFullname(ContextUtil.getCurrentUser()
							.getFullname());
					archivesAttend.setExecuteTime(new Date());
					archivesAttend.setAttendType("2");
					archivesAttend = archivesAttendService.save(archivesAttend);
					this.parmap.put("archivesAttend.memo", commentDesc);
					this.parmap.put("archives.archivesId", id);
					this.parmap.put("archivesAttend.attendId", archivesAttend
							.getAttendId());
				} else if (activityName.equals("分管或局领导签发")) {
					Archives archives = ((Archives) archivesService.get(Long
							.parseLong(id)));
					String archivesStatus = "3";
					if (StringUtils.isNotEmpty(archivesStatus)) {
						archives.setStatus(Short.valueOf(Short
								.parseShort(archivesStatus)));
					}
					archivesService.save(archives);
					LeaderRead leaderRead = new LeaderRead();
					leaderRead.setLeaderName(ContextUtil.getCurrentUser()
							.getFullname());
					leaderRead.setUserId(ContextUtil.getCurrentUserId());
					leaderRead.setArchives(archives);
					leaderRead.setCreatetime(new Date());
					leaderRead.setIsPass(LeaderRead.IS_PASS);
					leaderRead.setLeaderOpinion(commentDesc);
					leaderRead.setCheckName(activityName);
					leaderReadService.save(leaderRead);
					this.parmap
							.put("leaderRead.readId", leaderRead.getReadId());
					this.parmap.put("leaderRead.leaderOpinion", commentDesc);
					this.parmap.put("archives.archivesId", id);
				} else if (activityName.equals("办公室主任承办")) {
					String archivesStatus = "9";
					Archives archives = ((Archives) archivesService.get(Long
							.parseLong(id)));
					if (StringUtils.isNotEmpty(archivesStatus)) {
						archives.setStatus(Short.valueOf(Short
								.parseShort(archivesStatus)));
					}
					archivesService.save(archives);
					ArchivesAttend archivesAttend = new ArchivesAttend();
					archivesAttend.setArchives(archives);
					archivesAttend.setUserID(ContextUtil.getCurrentUserId());
					archivesAttend.setFullname(ContextUtil.getCurrentUser()
							.getFullname());
					archivesAttend.setExecuteTime(new Date());
					archivesAttend.setAttendType("1");
					archivesAttend = archivesAttendService.save(archivesAttend);
					this.parmap.put("archivesAttend.memo", commentDesc);
					this.parmap.put("archives.archivesId", id);
					this.parmap.put("archivesAttend.attendId", archivesAttend
							.getAttendId());
				}else if (activityName.equals("编号录入")) {
					Archives archives = ((Archives) archivesService.get(Long
							.parseLong(id)));
					archives.setStatus(Short.valueOf(Short.parseShort("4")));
					archives.setArchivesNo(bh);
					archivesService.save(archives);
					this.parmap.put("archives.archivesId", id);
					this.parmap.put("distributeOpinion", commentDesc);
				} else if (activityName.equals("盖章")) {
					Archives archives = ((Archives) archivesService.get(Long
							.parseLong(id)));
					archives.setStatus(Short.valueOf(Short.parseShort("10")));
					archivesService.save(archives);
					this.parmap.put("archives.archivesId", id);
					this.parmap.put("distributeOpinion", commentDesc);
					this.parmap.put("flowAssignId", archives.getIssuerId());
				} 
			} else if (processName.equals("收文流程")
					|| processName.equals("收文流程-市局收文")) {
//				ProcessRun processRun = processRunService
//						.getByTaskId(this.taskId.toString());
//				Map processRunVars = processFormService.getVariables(processRun
//						.getRunId());
				if (activityName.equals("办公室传阅")) {
					Archives archives = ((Archives) archivesService.get(Long
							.parseLong(id)));
					String archivesStatus = "2";
					if (StringUtils.isNotEmpty(archivesStatus)) {
						archives.setStatus(Short.valueOf(Short
								.parseShort(archivesStatus)));
					}
					archivesService.save(archives);
					LeaderRead leaderRead = new LeaderRead();
					leaderRead.setLeaderName(ContextUtil.getCurrentUser()
							.getFullname());
					leaderRead.setUserId(ContextUtil.getCurrentUserId());
					leaderRead.setArchives(archives);
					leaderRead.setCreatetime(new Date());
					leaderRead.setIsPass(LeaderRead.IS_PASS);
					leaderRead.setLeaderOpinion(commentDesc);
					leaderRead.setCheckName(activityName);
					leaderReadService.save(leaderRead);
					this.parmap.put("handleOpinion", commentDesc);
				} else if (activityName.equals("办公室主任批阅")) {
					Archives archives = ((Archives) archivesService.get(Long
							.parseLong(id)));
					String archivesStatus = "3";
					if (StringUtils.isNotEmpty(archivesStatus)) {
						archives.setStatus(Short.valueOf(Short
								.parseShort(archivesStatus)));
					}
					archivesService.save(archives);
					LeaderRead leaderRead = new LeaderRead();
					leaderRead.setLeaderName(ContextUtil.getCurrentUser()
							.getFullname());
					leaderRead.setUserId(ContextUtil.getCurrentUserId());
					leaderRead.setArchives(archives);
					leaderRead.setCreatetime(new Date());
					leaderRead.setIsPass(LeaderRead.IS_PASS);
					leaderRead.setLeaderOpinion(commentDesc);
					leaderRead.setCheckName(activityName);
					leaderReadService.save(leaderRead);
					this.parmap.put("handleOpinion", commentDesc);
				} else if (activityName.equals("分管或主管领导批示")) {
					Archives archives = ((Archives) archivesService.get(Long
							.parseLong(id)));
					String archivesStatus = "8";
					if(fgld!=null&&fgld.length()>0){
						this.parmap.put("destName", "分管或主管领导批示");
						this.parmap.put("signUserIds", fgld);
						this.parmap.put("signalName", "to分管或主管领导批示");
						archivesStatus="3";
					}
					if (StringUtils.isNotEmpty(archivesStatus)) {
						archives.setStatus(Short.valueOf(Short
								.parseShort(archivesStatus)));
					}
					archivesService.save(archives);
					LeaderRead leaderRead = new LeaderRead();
					leaderRead.setLeaderName(ContextUtil.getCurrentUser()
							.getFullname());
					leaderRead.setUserId(ContextUtil.getCurrentUserId());
					leaderRead.setArchives(archives);
					leaderRead.setCreatetime(new Date());
					leaderRead.setIsPass(LeaderRead.IS_PASS);
					leaderRead.setLeaderOpinion(commentDesc);
					leaderRead.setCheckName(activityName);
					leaderReadService.save(leaderRead);
					this.parmap.put("leaderOpinion", commentDesc);
				}else if (activityName.equals("指定传阅人")){
					//三个按钮 审批1（nextuser）  直接归档2（gdlx）  分管领导审批3（nextuser）  然后  类型的话放
					Archives archives = ((Archives) archivesService.get(Long
							.parseLong(id)));
					if(btType.equals("1")){//审批
						archives.setStatus(Short.valueOf(Short
								.parseShort("4")));
						archivesService.save(archives);
						this.parmap.put("handleOpinion", commentDesc);
						undertakesService.saveArchUnderTakesByArchIdAndSign(id,  this.parmap.get("signUserIds").toString());
					}else if(btType.equals("2")){//
						ArchRecFiledType art = archRecFiledTypeService.get(Long
								.parseLong(gdlx));
						ArchivesHandle arh = new ArchivesHandle();
						AppUser user = ContextUtil.getCurrentUser();
						arh.setArchives(archives);
						arh.setCreatetime(new Date());
						arh.setFillTime(new Date());
						arh.setHandleOpinion(commentDesc);
						arh.setIsPass((short) 1);
						arh.setUserId(user.getUserId());
						arh.setUserFullname(user.getFullname());
						arh.setFiledDeptId(user.getDepartment().getDepId());
						arh.setFiledDeptName(user.getDepartment().getDepName());
						arh.setRecFiledTypeId(art.getRecFiledTypeId());
						arh.setRecFiledTypeName(art.getTypeName());
						archivesHandleService.save(arh);
						String archivesStatus = "7";
						if (StringUtils.isNotEmpty(archivesStatus)) {
							archives.setStatus(Short.valueOf(Short
									.parseShort(archivesStatus)));
						}
						archivesService.save(archives);
						ArchDispatch archDispatch = new ArchDispatch();
						archDispatch.setArchives(archives);
						archDispatch.setArchUserType((short) 1);
						archDispatch.setUserId(user.getUserId());
						archDispatch.setFullname(user.getFullname());
						archDispatch.setDispatchTime(new Date());
						archDispatch.setSubject(archives.getSubject());
						archDispatch.setIsRead(ArchDispatch.HAVE_READ);
						archDispatch.setReadFeedback(commentDesc);
						archDispatchService.save(archDispatch);
						this.parmap.put("handleOpinion", commentDesc);
						FlowRunInfo flowRunInfo = getFlowRunInfo();
						ProcessInstance pi=jbpmService.getProcessInstanceByTaskId(taskId);
						ProcessRun processRun = processRunService.getByTaskId(this.taskId.toString());
						processRun.setRunStatus(ProcessRun.RUN_STATUS_FINISHED);
				        processRun.setPiId(null);
				        processRunService.save(processRun);
						jbpmService.endProcessInstance(pi.getId());
						this.saveForm(processRun, flowRunInfo,"承办归档");
						return "{success:true}";
//						this.parmap.put("handleOpinion", commentDesc);
//						this.parmap.put("destName", "承办归档");
//						this.parmap.put("signalName", "to承办归档");
					}else if(btType.equals("3")){
						this.parmap.put("destName", "分管或主管领导批示");
						this.parmap.put("signalName", "to分管或主管领导批示");
						archives.setStatus(Short.valueOf(Short
								.parseShort("3")));
						archivesService.save(archives);
					}
					
				} else if (activityName.equals("科室主任传阅")) {
					Archives archives = ((Archives) archivesService.get(Long
							.parseLong(id)));
					String upsignUserIds =undertakesService.findArchUnderTakesUpSignByArchId(id);					
					if (StringUtils.isNotEmpty(upsignUserIds)) {
						ArchDispatch archDispatch = new ArchDispatch();
						AppUser user = ContextUtil.getCurrentUser();
						archDispatch.setArchives(archives);
						archDispatch.setArchUserType((short) 0);
						archDispatch.setUserId(user.getUserId());
						archDispatch.setFullname(user.getFullname());
						archDispatch.setDispatchTime(new Date());
						archDispatch.setSubject(archives.getSubject());
						archDispatch.setIsRead(ArchDispatch.HAVE_READ);
						archDispatch.setReadFeedback(commentDesc);
						archDispatchService.save(archDispatch);
						int recordSize = archDispatchService
								.countArchDispatch(Long.parseLong(id));
						String archivesStatus = "4";
						String[] signId = upsignUserIds.split(",");
						if (signId.length == recordSize) {
							archivesStatus = "5";
							String suids =undertakesService.saveArchUnderTakesByArchId(id,
									this.parmap.get("signUserIds").toString());
							this.parmap.put("signUserIds", suids);
						} else {
							archivesStatus = "6";
							String suids = undertakesService
									.saveArchUnderTakesByArchId(id, this.parmap
											.get("signUserIds").toString());
						}
						if (StringUtils.isNotEmpty(archivesStatus)) {
							archives.setStatus(Short.valueOf(Short
									.parseShort(archivesStatus)));
						}
						archivesService.save(archives);
						this.parmap.put("handleOpinion", commentDesc);
					} else {
						System.out
								.println("---------------------所有审批人没有获取到-------------------");
						return "{success:false}";
					}
				} else if (activityName.equals("承办归档")) {
					Archives archives = ((Archives) archivesService.get(Long
							.parseLong(id)));
					ArchRecFiledType art = archRecFiledTypeService.get(Long
							.parseLong(gdlx));
					ArchivesHandle arh = new ArchivesHandle();
					AppUser user = ContextUtil.getCurrentUser();
					arh.setArchives(archives);
					arh.setCreatetime(new Date());
					arh.setFillTime(new Date());
					arh.setHandleOpinion(commentDesc);
					arh.setIsPass((short) 1);
					arh.setUserId(user.getUserId());
					arh.setUserFullname(user.getFullname());
					arh.setFiledDeptId(user.getDepartment().getDepId());
					arh.setFiledDeptName(user.getDepartment().getDepName());
					arh.setRecFiledTypeId(art.getRecFiledTypeId());
					arh.setRecFiledTypeName(art.getTypeName());
					archivesHandleService.save(arh);
					String archivesStatus = "7";
					if (StringUtils.isNotEmpty(archivesStatus)) {
						archives.setStatus(Short.valueOf(Short
								.parseShort(archivesStatus)));
					}
					archivesService.save(archives);
					ArchDispatch archDispatch = new ArchDispatch();
					archDispatch.setArchives(archives);
					archDispatch.setArchUserType((short) 1);
					archDispatch.setUserId(user.getUserId());
					archDispatch.setFullname(user.getFullname());
					archDispatch.setDispatchTime(new Date());
					archDispatch.setSubject(archives.getSubject());
					archDispatch.setIsRead(ArchDispatch.HAVE_READ);
					archDispatch.setReadFeedback(commentDesc);
					archDispatchService.save(archDispatch);
					this.parmap.put("handleOpinion", commentDesc);
				}
			}
			FlowRunInfo flowRunInfo = getFlowRunInfo();
			processRunService.saveAndNextStep(flowRunInfo);
		} catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			return "{success:false}";
		}

		return "{success:true}";
	}

	protected Map<String, ParamField> constructFieldMap() {
		JbpmService jbpmService = (JbpmService) AppUtil.getBean("jbpmService");
		ProDefinition proDefinition = getProDefinition();

		if (StringUtils.isEmpty(this.activityName)) {
			this.activityName = jbpmService.getStartNodeName(proDefinition);
		}

		Map map = ProcessActivityAssistant.constructFieldMap(proDefinition
				.getName(), this.activityName);

		Iterator fieldNames = map.keySet().iterator();
		while (fieldNames.hasNext()) {
			String name = (String) fieldNames.next();
			ParamField pf = (ParamField) map.get(name);

			pf.setName(pf.getName().replace(".", "_"));
			pf.setValue(parmap.get(name) != null ? parmap.get(name).toString()
					: null);
		}
		return map;
	}

	protected ProDefinition getProDefinition() {
		ProcessRunService processRunService = (ProcessRunService) AppUtil
				.getBean("processRunService");
		ProDefinition proDefinition = null;
		ProcessRun processRun = processRunService.getByTaskId(this.taskId);
		proDefinition = processRun.getProDefinition();
		return proDefinition;
	}

	protected FlowRunInfo getFlowRunInfo() {
		FlowRunInfo info = new FlowRunInfo(parmap);
		Map fieldMap = constructFieldMap();
		info.setParamFields(fieldMap);
		return info;
	}
	//归档类型
	public String getGdlx() {
		// TODO Auto-generated method stub
		ArchRecFiledTypeService archRecFiledTypeService = (ArchRecFiledTypeService) AppUtil
				.getBean("archRecFiledTypeService");
		String sql = "select typeId as id,typeName as name from arch_rec_filed_type";
		List list = archRecFiledTypeService.findDataList(sql);
		StringBuffer buff = new StringBuffer("{success:true,").append("data:");
		Gson gson = new Gson();
		buff.append(gson.toJson(list));
		buff.append("}");
		return buff.toString();
	}
	//分管领导
	public String findFgld(String userId,String passwd) {
		filter(userId, passwd);
		DepartmentService departmentService=(DepartmentService) AppUtil.getBean("departmentService");
		AppUserService userService=(AppUserService) AppUtil.getBean("appUserService");
		Long deptId = ContextUtil.getCurrentUser().getDepartment().getDepId();
		Department pep=this.findDepartmentByDeptId(deptId);
		String sql="";
		if(pep.getIsDist()==null||pep.getIsDist()==0){
			sql = "select app_user.* from user_role,app_role,app_user "
				+ "where user_role.roleId=app_role.roleId and app_user.userId=user_role.userId and app_user.delFlag=0 and app_user.status=1 ";
			sql += "and app_role.roleId in ("+AppUtil.getPropertity("role.proxyLeaderId")+")";
		}else{
			while(pep!=null&&pep.getIsDist()==1){//如果是分局，又不是顶层的话，找到顶层
				pep=this.findDepartmentByDeptId(pep.getParentId());
			}
			sql="select app_user.* from app_user where app_user.delFlag=0 and app_user.status=1 and depId in (select department.depId from department where department.path like '"+pep.getPath()+"%')";
		}
		List<Map> list = userService.findDataList(sql);
		String json="{\"success\":true,data:[";
		//+"/"+ap.get("username")
		for(Map ap:list){
			json+="{id:\""+ap.get("userId")+"\",name:\""+ap.get("fullname")+"\"},";
		}
		if(list.size()>0){
			json=json.substring(0,json.length()-1);
		}
		json+="]}";
		return json;
	}
	//分局分发人员
	public String findFfry(String userId,String passwd) {
		filter(userId, passwd);
		DepartmentService departmentService=(DepartmentService) AppUtil.getBean("departmentService");
		AppUserService userService=(AppUserService) AppUtil.getBean("appUserService");
		Long deptId = ContextUtil.getCurrentUser().getDepartment().getDepId();
		Department pep=this.findDepartmentByDeptId(deptId);
		String sql="";
		if(pep.getIsDist()==null||pep.getIsDist()==0){
			 sql = "select app_user.* from department,app_user where app_user.delFlag=0 and app_user.status=1 and app_user.depId=department.depId and department.isDist!=0 and app_user.userId>0";
		}else{
			while(pep!=null&&pep.getIsDist()==1){//如果是分局，又不是顶层的话，找到顶层
				pep=this.findDepartmentByDeptId(pep.getParentId());
			}
			sql="select app_user.* from app_user where  app_user.delFlag=0 and app_user.status=1 and app_user.delFlag=0 and app_user.status=1 and depId in (select department.depId from department where department.path like '"+pep.getPath()+"%')";
		}
		List<Map> list = userService.findDataList(sql);
		String json="{\"success\":true,data:[";
		//+"/"+ap.get("username")
		for(Map ap:list){
			json+="{id:\""+ap.get("userId")+"\",name:\""+ap.get("fullname")+"\"},";
		}
		if(list.size()>0){
			json=json.substring(0,json.length()-1);
		}
		json+="]}";
		return json;
	}
	//局领导
	public String findJld(String userId,String passwd){
		filter(userId, passwd);
		DepartmentService departmentService=(DepartmentService) AppUtil.getBean("departmentService");
		AppUserService userService=(AppUserService) AppUtil.getBean("appUserService");
		Long deptId = ContextUtil.getCurrentUser().getDepartment().getDepId();
		Department pep=this.findDepartmentByDeptId(deptId);
		String sql="";
		if(pep.getIsDist()==null||pep.getIsDist()==0){
			sql= "select app_user.* from app_role,app_user,user_role "
				+ "where  user_role.roleId=app_role.roleId and app_user.userId=user_role.userId and app_user.delFlag=0 and app_user.status=1 ";
			sql += "and (app_role.roleId="+AppUtil.getPropertity("role.leaderId")+" or app_role.roleId in ("+AppUtil.getPropertity("role.proxyLeaderId")+"))";
		}else{
			while(pep!=null&&pep.getIsDist()==1){//如果是分局，又不是顶层的话，找到顶层
				pep=this.findDepartmentByDeptId(pep.getParentId());
			}
			sql="select app_user.* from app_user where app_user.delFlag=0 and app_user.status=1 and depId in (select department.depId from department where department.path like '"+pep.getPath()+"%')";
		}
		List<Map> list = userService.findDataList(sql);
		String json="{\"success\":true,data:[";
		//+"/"+ap.get("username")
		for(Map ap:list){
			json+="{id:\""+ap.get("userId")+"\",name:\""+ap.get("fullname")+"\"},";
		}
		if(list.size()>0){
			json=json.substring(0,json.length()-1);
		}
		json+="]}";
		return json;
	}
	public String findPersonDatas(String userId,String passwd,String type){
		AppUserService userService=(AppUserService) AppUtil.getBean("appUserService");
		String json="";
//		收文流程-指定传阅人中选择传阅人
		if(type.equals("deptmanage")){
			String sql="select deptUserId,deptFullname,depName from arch_rec_user";
			List<Map> list = userService.findDataList(sql);
			json="{\"success\":true,data:[";
			//+"/"+ap.get("username")
			for(Map ap:list){
				json+="{id:\""+ap.get("deptUserId")+"\",name:\""+ap.get("depName")+"/"+ap.get("deptFullname")+"\"},";
			}
			if(list.size()>0){
				json=json.substring(0,json.length()-1);
			}
			json+="]}";
		}
		return json;
	}
	public Department findDepartmentByDeptId(Long depid){
		DepartmentService departmentService=(DepartmentService) AppUtil.getBean("departmentService");
		return departmentService.get(depid);
	}
	
	public void saveForm(ProcessRun processRun,FlowRunInfo flowRunInfo,String statusName){
		//form保存
		Integer maxSn = Integer.valueOf(this.processFormDao
				.getActvityExeTimes(processRun.getRunId(),
						flowRunInfo.getActivityName()).intValue());
		ProcessForm processForm = new ProcessForm();
		processForm.setActivityName(flowRunInfo.getActivityName());
		processForm.setSn(Integer.valueOf(maxSn.intValue() + 1));
		AppUser curUser = ContextUtil.getCurrentUser();
		processForm.setCreatorId(curUser.getUserId());
		processForm.setCreatorName(curUser.getFullname());
		processForm.setProcessRun(processRun);
		Iterator it = flowRunInfo.getParamFields().keySet().iterator();
		while (it.hasNext()) {
			String key = (String) it.next();
			ParamField paramField = (ParamField) flowRunInfo
					.getParamFields().get(key);
			FormData fd = new FormData(paramField);
			fd.setProcessForm(processForm);
			processForm.getFormDatas().add(fd);
		}
		ParamField paramField =new ParamField();
		paramField.setName("status");
		paramField.setLabel("状态");
		paramField.setType("varchar");
		paramField.setValue(statusName);
		paramField.setIsShowed(Short.parseShort("1"));
		paramField.setLength(100);
		FormData fd = new FormData(paramField);
		fd.setProcessForm(processForm);
		processForm.getFormDatas().add(fd);
		ProcessFormService processFormService=(ProcessFormService) AppUtil.getBean("processFormService");
		processFormService.save(processForm);
	}
}
