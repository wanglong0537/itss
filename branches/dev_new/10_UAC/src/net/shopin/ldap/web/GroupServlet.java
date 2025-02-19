package net.shopin.ldap.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.shopin.ldap.dao.GroupDao;
import net.shopin.ldap.entity.User;
import net.shopin.ldap.entity.UserGroup;
import net.shopin.util.SpringContextUtils;

import org.apache.commons.lang.StringUtils;
import org.springframework.ldap.NameAlreadyBoundException;
import org.springframework.ldap.samples.utils.LdapTreeBuilder;


public class GroupServlet extends HttpServlet {
	
	LdapTreeBuilder ldapTreeBuilder = (LdapTreeBuilder) SpringContextUtils.getBean("ldapTreeBuilder");
	GroupDao groupDao = (GroupDao) SpringContextUtils.getBean("groupDao");

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		StringBuffer json = new StringBuffer("{success:true}");
		try {
			String methodCall = req.getParameter("methodCall");
			if(methodCall.equalsIgnoreCase("add")) {//新增
				UserGroup userGroup = new UserGroup();
				userGroup.setCn(req.getParameter("cn"));
				userGroup.setDisplayName(req.getParameter("displayName"));
				userGroup.setDescription(req.getParameter("description"));
				userGroup.setStatus((req.getParameter("status") == null || "".equals(req.getParameter("status"))) ? 0 : Integer.parseInt(req.getParameter("status")));
				groupDao.create(userGroup);
			} else if(methodCall.equalsIgnoreCase("modify")) {//修改
				UserGroup oldUg = groupDao.findByDN(req.getParameter("dn"));
				UserGroup userGroup = new UserGroup();
				userGroup.setDn(req.getParameter("dn"));
				userGroup.setCn(req.getParameter("cn"));
				userGroup.setDisplayName(req.getParameter("displayName"));
				userGroup.setDescription(req.getParameter("description"));
				userGroup.setStatus((req.getParameter("status") == null || "".equals(req.getParameter("status"))) ? 0 : Integer.parseInt(req.getParameter("status")));
				userGroup.setMembers(oldUg.getMembers());
				groupDao.update(userGroup);
			} else if(methodCall.equalsIgnoreCase("delete")) {//删除
				String groupDN = req.getParameter("groupDN");
				groupDao.deleteByDN(groupDN);
			} else if(methodCall.equalsIgnoreCase("getList")) {
				List<UserGroup> list = groupDao.findGroupsByParam("");
				json = new StringBuffer("{success:true,result:[");
				for(UserGroup ug : list) {
					json.append("{'dn':'" + ug.getDn() + "',")
							.append("'cn':'" + ug.getCn() + "',")
							.append("'displayName':'" + ug.getDisplayName() + "'},");
				}
				if(list.size() > 0) {
					json.deleteCharAt(json.length() - 1);
				}
				json.append("]}");
			} else if (methodCall.equalsIgnoreCase("getDetailByGroupDN")) {
				String groupDN = req.getParameter("groupDN");
				UserGroup ug = groupDao.findByDN(groupDN);
				json = new StringBuffer("{success:true,data:{");
				json.append("'dn':'" + ug.getDn() + "'")
					.append(",'cn':'" + ug.getCn() + "'")
					.append(",'displayName':'" + ug.getDisplayName() + "'")
					.append(",'description':'" + (ug.getDescription() == null ? "" : ug.getDescription()) + "'")
					.append(",'status':'" + (ug.getStatus() != null ? ug.getStatus() : "") + "'")
					.append("}}");
			} else if(methodCall.equalsIgnoreCase("findByUserDN")) {//根据用户DN查找
				String userDN = req.getParameter("userDN");
				List<UserGroup> list = groupDao.findGroupsByParam("", userDN, true);
				json = new StringBuffer("{success:true,result:[");
				for(UserGroup ug : list) {
					json.append("{'dn':'" + ug.getDn() + "',")
							.append("'cn':'" + ug.getCn() + "',")
							.append("'displayName':'" + ug.getDisplayName() + "'},");
				}
				if(list.size() > 0) {
					json.deleteCharAt(json.length() - 1);
				}
				json.append("]}");
			} else if(methodCall.equalsIgnoreCase("combo")) {
				String param = req.getParameter("param");
				List<UserGroup> list = groupDao.findGroupsByParam(param);
				json = new StringBuffer("[");
				for(UserGroup ug : list) {
					json.append("['" + ug.getDn() + "','" + ug.getDisplayName() + "'],");
				}
				if(list.size() > 0) {
					json.deleteCharAt(json.length() - 1);
				}
				json.append("]");
			} else if(methodCall.equalsIgnoreCase("listMembers")) {
				String groupDN = req.getParameter("groupDN");
				List<User> userList = groupDao.listMembers(groupDN);
				json = new StringBuffer("{success:true,result:[");
				for(User user : userList) {
					json.append("{'dn':'" + user.getDn() + "',")
							.append("'uid':'" + user.getUid() + "',")
							.append("'displayName':'" + user.getDisplayName() + "'},");
				}
				if(userList.size() > 0) {
					json.deleteCharAt(json.length() - 1);
				}
				json.append("]}");
			} else if(methodCall.equalsIgnoreCase("relatUsers")) {
				//绑定用户组与组员的关系
				String groupDN = req.getParameter("groupDN");
				String members = req.getParameter("members");
				String [] memberArray = StringUtils.isNotEmpty(members) ? members.split("#") : null;
				UserGroup userGroup = groupDao.findByDN(groupDN);
				userGroup.setMembers(memberArray);
				groupDao.update(userGroup);
				
			}
		} catch(NameAlreadyBoundException e) {
			e.printStackTrace();
			json = new StringBuffer("{success:false,msg:'输入的组信息的cn已经存在！'}");
		} catch(Exception e) {
			e.printStackTrace();
			json = new StringBuffer("{success:false,msg:'服务器端异常，请联系管理员！'}");
		}
		try {
			resp.setContentType("text/html;charset=utf-8");
			resp.setCharacterEncoding("utf-8");
			PrintWriter pw = resp.getWriter();
			pw.write(json.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
