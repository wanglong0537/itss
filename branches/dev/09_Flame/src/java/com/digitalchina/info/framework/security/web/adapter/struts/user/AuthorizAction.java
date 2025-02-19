package com.digitalchina.info.framework.security.web.adapter.struts.user;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.digitalchina.info.framework.security.entity.Authorization;
import com.digitalchina.info.framework.security.entity.Resource;
import com.digitalchina.info.framework.security.entity.Right;
import com.digitalchina.info.framework.security.service.SecurityManageService;
import com.digitalchina.info.framework.util.HttpUtil;
import com.digitalchina.info.framework.web.adapter.struts.BaseDispatchAction;

public class AuthorizAction extends BaseDispatchAction{
	private SecurityManageService sms = (SecurityManageService) getBean("securityManageService");
	
	/**
	 * 显示所有资源
	 * @Methods Name list
	 * @Create In 2008-3-14 By peixf
	 * @param map
	 * @param form
	 * @param request
	 * @param response
	 * @return ActionForward
	 * @throws Exception ActionForward
	 */
	public ActionForward listAuthorizations(ActionMapping mapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse httpServletResponse) throws Exception {
	
		//List authorizations = sms.findAuthorizationsAll();
		List authorizations = sms.findAuthorizationsAllForPage();
		request.setAttribute("authorizations", authorizations);
		
		JSONArray jsonObject = JSONArray.fromObject(authorizations);
		//System.out.println(jsonObject.toString());
		
		try {
			httpServletResponse.setCharacterEncoding("gbk");
			PrintWriter pw = httpServletResponse.getWriter();
			pw.write("{success:" + true + ",authorizations:"+ jsonObject.toString() + "}");
			pw.flush();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return null;
		//return mapping.findForward("listAuthorizations");
	}
	
	/**
	 * 修改指定资源
	 * @Methods Name toEdit
	 * @Create In 2008-3-14 By peixf
	 * @param map
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception ActionForward
	 */
	public ActionForward toEditAuthorization(ActionMapping mapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse httpServletResponse) throws Exception {
		
		List authorizations = sms.findAuthorizationsAll();
		request.setAttribute("authorizations", authorizations);
		
		List rights = sms.findRightsAll();
		request.setAttribute("rights", rights);
		
		List resources = sms.findResourcesAll();
		request.setAttribute("resources", resources);
		
		String authorizationId = request.getParameter("id");
		Authorization auth = sms.findAuthorizationById(authorizationId);
		request.setAttribute("authorization", auth);
		
		return mapping.findForward("listAuthorizations"); //本页快速修改
	}
	
	/**
	 * 去添加一个资源
	 * @Methods Name toAddResource
	 * @Create In 2008-3-14 By peixf
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param httpServletResponse
	 * @return
	 * @throws Exception ActionForward
	 */
	public ActionForward toAddAuthorization(ActionMapping mapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse httpServletResponse) throws Exception {
		
		List authorizations = sms.findAuthorizationsAll();
		request.setAttribute("authorizations", authorizations);
		
		List rights = sms.findRightsAll();
		request.setAttribute("rights", rights);
		
		List resources = sms.findResourcesAll();
		request.setAttribute("resources", resources);
		
		return mapping.findForward("listAuthorizations"); //本页快速修改
	}
	
	/**
	 * 保存资源
	 * @Methods Name saveResource
	 * @Create In 2008-3-14 By peixf
	 * @param mapping
	 * @param actionForm
	 * @param request
	 * @param httpServletResponse
	 * @return
	 * @throws Exception ActionForward
	 */
	public ActionForward saveAuthorization(ActionMapping mapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse httpServletResponse) throws Exception {
		
		/*Authorization auth = (Authorization) BeanUtil.getObject(request, Authorization.class);
		Right right = null;
		String rightId = request.getParameter("rightId");
		if(rightId!=null&& !rightId.equals("")){
			right = sms.findRightById(rightId); //Right right = sms.findRightById(rightId);
			auth.setRight(right);
		}
		Resource resource = null;
		String resourceId = request.getParameter("resourceId");
		if(resourceId!=null&& !resourceId.equals("")){
			resource = sms.findResourceById(resourceId);
			auth.setResource(resource);
		}
		auth.setModule(resource.getModule());
		Authorization authorization = sms.saveAuthorization(auth);
		
		List authorizations = sms.findAuthorizationsAll();
		request.setAttribute("authorizations", authorizations);

		return HttpUtil.redirect("authorizationManage.do?methodCall=listAuthorizations");
		 */	
		
		String name = request.getParameter("name");
		Authorization auth = new Authorization();
		auth.setName(name);
		Right right = null;
		String rightId = request.getParameter("rightId");
		if(rightId!=null&& !rightId.equals("")){
			right = sms.findRightById(rightId); 
			auth.setRight(right);
		}
		Resource resource = null;
		String resourceId = request.getParameter("resourceId");
		if(resourceId!=null&& !resourceId.equals("")){
			resource = sms.findResourceById(resourceId);
			auth.setResource(resource);
		}
		auth.setModule(resource.getModule());
		Authorization authorization = sms.saveAuthorization(auth);
		
		//JSONArray jsonObject = JSONArray.fromObject(authorization);
		
		try {
			httpServletResponse.getWriter().write("{success:" + true + ",id:"+ authorization.getId() + "}");
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public ActionForward removeAuthorization(ActionMapping mapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse httpServletResponse) throws Exception {

		String authorizationId = request.getParameter("id");
		sms.removeAuthorization(authorizationId);
		
		List authorizations = sms.findAuthorizationsAll();
		request.setAttribute("authorizations", authorizations);
		
		return HttpUtil.redirect("authorizationManage.do?methodCall=listAuthorizations");
	}
	
	public ActionForward findAuth(ActionMapping mapping,
			ActionForm actionForm, HttpServletRequest request,
			HttpServletResponse httpServletResponse) throws Exception {
		
		String authId = request.getParameter("id");
		List authorizationList = sms.findAuthorizationByIdForPage(authId);
		
		JSONArray jsonObject = JSONArray.fromObject(authorizationList);
		System.out.println(jsonObject.toString());
		
		try {
			httpServletResponse.setCharacterEncoding("gbk");
			PrintWriter pw = httpServletResponse.getWriter();
			pw.write("{success:" + true + ",authList:"+ jsonObject.toString() + "}");
			pw.flush();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return null;
	}
}