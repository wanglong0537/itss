package net.shopin.ldap.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.shopin.ldap.dao.DeptDao;
import net.shopin.ldap.entity.Department;
import net.shopin.util.SpringContextUtils;

import org.apache.commons.lang.StringUtils;
import org.springframework.ldap.samples.utils.LdapTreeBuilder;

public class DeptServlet extends HttpServlet {
	
	LdapTreeBuilder ldapTreeBuilder = (LdapTreeBuilder) SpringContextUtils.getBean("ldapTreeBuilder");
	DeptDao deptDao = (DeptDao) SpringContextUtils.getBean("deptDao");

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		StringBuffer json = new StringBuffer("{success:true}");
		try {
			String methodCall = req.getParameter("methodCall");
			if(methodCall.equalsIgnoreCase("add")){
				String dn = req.getParameter("parentDN");
				dn = dn!=null && !"".equals(dn) ? dn : "o=orgnizations";//一般会有根节点
				Department department = new Department();
				convertReqToDept(req, department);
				deptDao.create(department);
				
			}else if(methodCall.equalsIgnoreCase("delete")){
				String deptDN = req.getParameter("deptDN");
				deptDao.deleteByDN(deptDN);
			}else if(methodCall.equalsIgnoreCase("modify")){
				Department department = new Department();
				convertReqToDept(req, department);
				deptDao.update(department);				
			}else if (methodCall.equalsIgnoreCase("searchDepts")){
				
				List<Department> depts = deptDao.findDeptsByParam(req.getParameter("param") != null ? req.getParameter("param") : "");
				json = new StringBuffer();
				for (Department dept : depts) {
					json.append("{deptNo:'" + (StringUtils.isNotEmpty(dept.getDeptNo()) ? dept.getDeptNo() : "") + "'")
					.append(",parentNo:'" + (StringUtils.isNotEmpty(dept.getParentNo()) ? dept.getParentNo() : "") + "'")
					.append(",deptName:'" + dept.getDeptName() + "'")
					.append(",deptDesc:'" + dept.getDeptDesc() + "'")
					.append(",displayOrder:'" + (dept.getDisplayOrder() != null ? dept.getDisplayOrder() : "0") + "'")
					.append(",status:'" + (dept.getStatus() != null ? dept.getStatus() : "") + "'")
					.append(",erpId:'" + (StringUtils.isNotEmpty(dept.getErpId()) ? dept.getErpId() : "") + "'")
					.append("},");
				}
				if (json.toString().endsWith(",")) {
					json = new StringBuffer(json.substring(0, json.length() - 1));
				}
				json = new StringBuffer("{success: true,rowCount:'" + depts.size() + "',data:[" + json + "]}");
			}else if (methodCall.equalsIgnoreCase("getDetailByDeptDN")){
				String deptDN = req.getParameter("deptDN");
				Department dept = deptDao.findByDN(deptDN);
				json = new StringBuffer("{success:true,data:{");
				json.append("'deptNo':'" + (StringUtils.isNotEmpty(dept.getDeptNo()) ? dept.getDeptNo() : "") + "'")
					.append(",'parentNo':'" + (StringUtils.isNotEmpty(dept.getParentNo()) ? dept.getParentNo() : "") + "'")
					.append(",'deptName':'" + dept.getDeptName() + "'")
					.append(",'deptDesc':'" + dept.getDeptDesc() + "'")
					.append(",'displayOrder':'" + (dept.getDisplayOrder() != null ? dept.getDisplayOrder() : "0") + "'")
					.append(",'status':'" + (dept.getStatus() != null ? dept.getStatus() : "") + "'")
					.append(",'erpId':'" + (StringUtils.isNotEmpty(dept.getErpId()) ? dept.getErpId() : "") + "'")
					.append("}}");
			}else if (methodCall.equalsIgnoreCase("findSubDeptsByParentDN")){
				String parentDN = req.getParameter("parentDN");
				List<Department> deptList = deptDao.findSubDeptsByParentDN(parentDN);
				json = new StringBuffer("[");
				for(int i=0; i<deptList.size(); i++){
					json.append("{");
					json.append("id:'" + deptList.get(i).getDn() + "',");
					if(deptList.get(i).getStatus()==0){
						json.append("text:'" + deptList.get(i).getDeptName() + "'");
					}else{
						json.append("text:'" + deptList.get(i).getDeptName() + "<font color=\"red\">(锁定)</font>'");
					}
					
					if(i<(deptList.size()-1)) {
						json.append("},");
					}else {
						json.append("}");
					}
				}
				json.append("]");
			}
		} catch (RuntimeException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			json = new StringBuffer("{success:false}");
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
	
	private void convertReqToDept(HttpServletRequest req, Department department){
		department.setDeptNo(req.getParameter("deptDN"));
		department.setParentNo(req.getParameter("parentNo"));
		department.setDeptName(req.getParameter("deptName"));
		department.setDeptDesc(req.getParameter("deptDesc"));
		department.setErpId(req.getParameter("erpId"));
		if(StringUtils.isNotEmpty(req.getParameter("displayOrder")))
			department.setDisplayOrder(Integer.valueOf(req.getParameter("displayOrder")));
		if(StringUtils.isNotEmpty(req.getParameter("status")))
			department.setStatus(Integer.valueOf(req.getParameter("status")));
	}

}
