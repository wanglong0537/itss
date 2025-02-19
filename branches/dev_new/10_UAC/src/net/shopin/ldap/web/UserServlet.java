package net.shopin.ldap.web;

import java.awt.Graphics;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.shopin.ldap.dao.DutyDao;
import net.shopin.ldap.dao.GroupDao;
import net.shopin.ldap.dao.UserDao;
import net.shopin.ldap.entity.User;
import net.shopin.ldap.entity.UserGroup;
import net.shopin.util.PropertiesUtil;
import net.shopin.util.Result;
import net.shopin.util.SpringContextUtils;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.ldap.NameAlreadyBoundException;
import org.springframework.ldap.samples.utils.LdapTreeBuilder;


public class UserServlet extends HttpServlet {
	
	LdapTreeBuilder ldapTreeBuilder = (LdapTreeBuilder) SpringContextUtils.getBean("ldapTreeBuilder");
	UserDao userDao = (UserDao) SpringContextUtils.getBean("userDao");
	GroupDao groupDao = (GroupDao) SpringContextUtils.getBean("groupDao");
	DutyDao dutyDao = (DutyDao) SpringContextUtils.getBean("dutyDao");
	int imgWidth = new Integer(PropertiesUtil.getProperties("imgWidth", "128")).intValue();
	int imgHeight = new Integer(PropertiesUtil.getProperties("imgHeight", "128")).intValue();
	int imgSize = new Integer(PropertiesUtil.getProperties("imgHeight", "1024")).intValue();//1024kb

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		req.setCharacterEncoding("UTF-8");
		String realPath = null;
		String filePath = null;
		byte [] photo = null;
		String methodCall = req.getParameter("methodCall");
		
		StringBuffer json = new StringBuffer("{success:true}");
		User user = new User();
		user.setDn(req.getParameter("dn"));
		user.setUid(req.getParameter("uid"));
		user.setPassword(req.getParameter("password"));
		user.setCn(req.getParameter("uid"));
		user.setSn(req.getParameter("sn"));
		user.setGivenName(req.getParameter("givenName"));
		user.setDisplayName(req.getParameter("displayName"));
		user.setDescription(req.getParameter("description"));
		user.setDepartmentNumber(req.getParameter("departmentNumber"));
		user.setTitle(req.getParameter("title"));
		user.setMail(req.getParameter("mail"));
		user.setTelephoneNumber(req.getParameter("telephoneNumber"));
		user.setMobile(req.getParameter("mobile"));
		user.setFacsimileTelephoneNumber(req.getParameter("facsimileTelephoneNumber"));
		user.setUserType(req.getParameter("userType"));
		if(req.getParameter("status") != null && !"".equals(req.getParameter("status"))) {
			user.setStatus(Integer.parseInt(req.getParameter("status")));
		}
		user.setO(req.getParameter("o"));//部门名称
		user.setEmployeeNumber(req.getParameter("employeeNumber"));
		user.setEmployeeType(req.getParameter("employeeType"));
		user.setDepartmentNumber(req.getParameter("departmentNumber"));
		if(req.getParameter("displayOrder") != null && !"".equals(req.getParameter("displayOrder"))) {
			user.setDisplayOrder(Integer.parseInt(req.getParameter("displayOrder")));
		}
		user.setBelongDeptDN(req.getParameter("belongDeptDN"));
		//add by awen for add photo to user on 2001-05-16 begin
		try {
			DiskFileItemFactory factory = new DiskFileItemFactory();
			boolean isMutipart = ServletFileUpload.isMultipartContent(req);
			if(isMutipart){
				ServletFileUpload upload = new ServletFileUpload(factory);
				List fileItems = upload.parseRequest(req);
				Iterator iterator = fileItems.iterator();
				while(iterator.hasNext()){
					FileItem fi = (FileItem)iterator.next();
					if (!fi.isFormField()) {
						String fileName = fi.getName();
						if(fileName==null || "".equals(fileName)) break;
						String suffix = fileName.substring(fileName.lastIndexOf("."));
			            String systemFileName = "upload-" + System.currentTimeMillis() + suffix;			            
			            
			            if(!methodCall.equalsIgnoreCase("import")){
			            	filePath = PropertiesUtil.getProperties("userPhotoUploadpath", "D:/data/userphoto/")  + systemFileName;
			            }else{//用户信息导入
			            	filePath = PropertiesUtil.getProperties("userImpUploadpath", "D:/data/upload/")  + systemFileName;	
			            }
			            
			            //realPath = req.getSession().getServletContext().getRealPath("/") + filePath;
			            realPath = filePath;
			            File uploadedFile = new File(realPath);
			            
			            
			            if(!methodCall.equalsIgnoreCase("import")){//上传肖像
			            	BufferedImage img = ImageIO.read(fi.getInputStream());
			            	int width = img.getWidth();
				            int heigth = img.getHeight();
				            /*if(width > imgWidth || heigth > imgHeight){
				            	json = new StringBuffer("{success:false,msg:'请检查上传图片的分辨率是否为" + imgWidth + "*" + imgHeight + "!'}");
				            	try {
				        			resp.setContentType("text/html;charset=utf-8");
				        			resp.setCharacterEncoding("utf-8");
				        			PrintWriter pw = resp.getWriter();
				        			pw.write(json.toString());
				        		} catch (IOException e) {
				        			e.printStackTrace();
				        		}
				        		return;
				            }*/
				            int size = fi.getInputStream().available();
				            double kb = size/1024;
				            if(kb > imgSize){
				            	json = new StringBuffer("{success:false,msg:'请检查上传图片的大小，最大不能超过" + imgSize + "KB!'}");
				            	try {
				        			resp.setContentType("text/html;charset=utf-8");
				        			resp.setCharacterEncoding("utf-8");
				        			PrintWriter pw = resp.getWriter();
				        			pw.write(json.toString());
				        		} catch (IOException e) {
				        			e.printStackTrace();
				        		}
				        		return;
				            }
				            
				            Image image = img.getScaledInstance(imgWidth, imgHeight, Image.SCALE_DEFAULT);
				            
				            BufferedImage tag = new BufferedImage(imgWidth, imgHeight,
				            	     BufferedImage.TYPE_INT_RGB);
				            	   Graphics g = tag.getGraphics();
				            	   g.drawImage(image, 0, 0, null); // 绘制缩小后的图
				            	   g.dispose();
				            
				            if(methodCall.equalsIgnoreCase("tempUpload")){//临时上传,预览
				            	filePath = user.getUid() + "-" + System.currentTimeMillis() + suffix;
				            	realPath = req.getSession().getServletContext().getRealPath("/") + "./images/userphoto/" + filePath;
				            	File uf = new File(realPath);
				            	final String fileNameFix = user.getUid() + "-";
				            	
				            	File dir = new File(req.getSession().getServletContext().getRealPath("/") + "./images/userphoto/");
				            	String [] fileNames = dir.list(new FilenameFilter(){

									/* (non-Javadoc)
									 * @see java.io.FilenameFilter#accept(java.io.File, java.lang.String)
									 */
									public boolean accept(File dir, String name) {
										// TODO Auto-generated method stub
										if(name.indexOf(fileNameFix)!=-1){
											return true;
										}
										return false;
									}});
				            	
				            	for(String name : fileNames){
				            		File file = new File(req.getSession().getServletContext().getRealPath("/") + "./images/userphoto/" + name);
				            		file.delete();
				            	}
				            	
				            	//fi.write(uf);
				            	//............................
				            	ImageIO.write(tag, "JPEG", uf);// 输出到文件流
				            	json = new StringBuffer().append("{success:true,filePath:'"+filePath+"'}");
				            	try {
				        			resp.setContentType("text/html;charset=utf-8");
				        			resp.setCharacterEncoding("utf-8");
				        			PrintWriter pw = resp.getWriter();
				        			pw.write(json.toString());
				        		} catch (IOException e) {
				        			e.printStackTrace();
				        		}
				        		return;
				            }
				            //放大或者缩小的照片
				            //....................
				            ImageIO.write(tag, "JPEG", uploadedFile);// 输出到文件流
			            }else{
			            	fi.write(uploadedFile);
			            }			            
					}else{
						String name = fi.getFieldName();
						String value = fi.getString();
						//在enctype="multipart/form-data") 情况下，form表单的数据通过流传递，且在Tomcat服务器下，默认使用ISO-8859-1编码
						value = new String(value.getBytes("ISO-8859-1"), "UTF-8");
						BeanUtils.setProperty(user, name, value);
					}
				}
			}
			//修改cn为uid
			user.setCn(user.getUid());
		} catch (FileUploadException e1) {
			e1.printStackTrace();
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		//add by awen for add photo to user on 2001-05-16 end
		if(!methodCall.equalsIgnoreCase("import") && filePath != null && !"".equals(realPath)){
			FileInputStream fis = new FileInputStream(realPath);
            photo = new byte[fis.available()];
			fis.read(photo);
			fis.close();
			user.setPhoto(photo);			
		}
		
		try {
			if(methodCall.equalsIgnoreCase("add")){
				userDao.create(user);
				//add by guanshiqiang for add the current user into groups on 2011-11-24 begin
				String[] groupDNs = req.getParameter("groups").split("__");
				String userDN = "uid=" + user.getUid() + ",ou=employees,ou=users";
				for(int i = 0; i < groupDNs.length; i++) {
					if(StringUtils.isNotEmpty(groupDNs[i])) {
						UserGroup ug = groupDao.findByDN(groupDNs[i]);
						if(ug != null) {
							List<String> list = Arrays.asList(ug.getMembers());
							List<String> memberList = new ArrayList<String>(list);
							if(!memberList.contains(user.getDn())) {//该用户组不包含当前用户，则加入
								memberList.add(userDN);
								ug.setMembers(memberList.toArray(new String[memberList.size()]));
								groupDao.update(ug);
							}
						}
					}
				}
				//add by guanshiqiang for add the current user into groups on 2011-11-24 end
			}else if(methodCall.equalsIgnoreCase("delete")){
				String userDN = req.getParameter("userDN");
				userDao.delete(userDN);
			}else if(methodCall.equalsIgnoreCase("modify")){
				modifyUser(req, user);
			}else if(methodCall.equalsIgnoreCase("getDetail")){
				String uid = null;
				String userType = "1";//员工
				if(user.getUid()==null){
					uid = user.getDn().substring(user.getDn().indexOf("=")+1, user.getDn().indexOf(","));
				}
				if(user.getUserType()==null){
					userType = user.getDn().contains("ou=employees") ? "1" : (user.getDn().contains("ou=customers") ? "2" : (user.getDn().contains("ou=suppliers") ? "3" : (user.getDn().contains("ou=specialuser") ? "4" : "")));
				}
				User userDetail = userDao.findByPrimaryKey(uid, userType);
				json = new StringBuffer("{success:true");
				json.append(",dn:'" + (userDetail.getDn() != null ? userDetail.getDn() : "") + "'")
					.append(",uid:'" + (userDetail.getUid() != null ? userDetail.getUid() : uid) + "'")
					.append(",password:'" + (userDetail.getPassword() != null ? userDetail.getPassword() : "") + "'")
					.append(",cn:'" + (userDetail.getCn() != null ? userDetail.getCn() : "") + "'")
					.append(",sn:'" + (userDetail.getSn() != null ? userDetail.getSn() : "") + "'")
					.append(",givenName:'" + (userDetail.getGivenName() != null ? userDetail.getGivenName() : "") + "'")
					.append(",displayName:'" + (userDetail.getDisplayName() != null ? userDetail.getDisplayName() : "") + "'")
					.append(",description:'" + (userDetail.getDescription() != null ? userDetail.getDescription() : "") + "'")
					.append(",departmentNumber:'" + (userDetail.getDepartmentNumber() != null ? userDetail.getDepartmentNumber() : "") + "'")
					.append(",title:'" + (userDetail.getTitle() != null ? userDetail.getTitle() : "") + "'")
					.append(",mail:'" + (userDetail.getMail() != null ? userDetail.getMail() : "") + "'")
					.append(",mobile:'" + (userDetail.getMobile() != null ? userDetail.getMobile() : "") + "'")
					.append(",deptNo:'" + (userDetail.getDepartmentNumber() != null ? userDetail.getDepartmentNumber() : "") + "'")
					.append(",deptName:'" + (userDetail.getDeptName() != null ? userDetail.getDeptName() : "") + "'")
					.append(",telephoneNumber:'" + (userDetail.getTelephoneNumber() != null ? userDetail.getTelephoneNumber() : "") + "'")
					.append(",facsimileTelephoneNumber:'" + (userDetail.getFacsimileTelephoneNumber() != null ? userDetail.getFacsimileTelephoneNumber() : "") + "'")
					.append(",userType:'" + (userDetail.getUserType() != null ? userDetail.getUserType() : userDetail.getDn().contains("ou=employees") ? "1" : (userDetail.getDn().contains("ou=customers") ? "2" : (userDetail.getDn().contains("ou=suppliers") ? "3" : (userDetail.getDn().contains("ou=specialuser") ? "4" : "")))) + "'")
					.append(",o:'" + (userDetail.getO() != null ? userDetail.getO() : "") + "'")
					.append(",status:'" + (userDetail.getStatus() != null ? userDetail.getStatus() : "") + "'")
					.append(",displayOrder:'" + (userDetail.getDisplayOrder() != null ? userDetail.getDisplayOrder() : "") + "'")
					.append(",employeeNumber:'" + (userDetail.getEmployeeNumber() != null ? userDetail.getEmployeeNumber() : "") + "'")
					.append(",employeeType:'" + (userDetail.getEmployeeType() != null ? userDetail.getEmployeeType() : "") + "'")
					.append(",belongDeptDN:'" + (userDetail.getBelongDeptDN() != null ? userDetail.getBelongDeptDN() : "") + "'")
					.append(",belongTitleDN:'" + (userDetail.getBelongTitleDN() != null ? userDetail.getBelongTitleDN() : "") + "'")
					.append("}");
			}else if(methodCall.equalsIgnoreCase("getDetailByUid")){
				String uid = req.getParameter("uid");
				User userDetail = userDao.findByPrimaryKey(uid);
				json = new StringBuffer("{success:true,data:{");
				json.append("dn:'" + (userDetail.getDn() != null ? userDetail.getDn() : "") + "'")
					.append(",uid:'" + (userDetail.getUid() != null ? userDetail.getUid() : uid) + "'")
					.append(",password:'" + (userDetail.getPassword() != null ? userDetail.getPassword() : "") + "'")
					.append(",cn:'" + (userDetail.getCn() != null ? userDetail.getCn() : "") + "'")
					.append(",sn:'" + (userDetail.getSn() != null ? userDetail.getSn() : "") + "'")
					.append(",givenName:'" + (userDetail.getGivenName() != null ? userDetail.getGivenName() : "") + "'")
					.append(",displayName:'" + (userDetail.getDisplayName() != null ? userDetail.getDisplayName() : "") + "'")
					.append(",description:'" + (userDetail.getDescription() != null ? userDetail.getDescription() : "") + "'")
					.append(",departmentNumber:'" + (userDetail.getDepartmentNumber() != null ? userDetail.getDepartmentNumber() : "") + "'")
					.append(",title:'" + (userDetail.getTitle() != null ? userDetail.getTitle() : "") + "'")
					.append(",mail:'" + (userDetail.getMail() != null ? userDetail.getMail() : "") + "'")
					.append(",mobile:'" + (userDetail.getMobile() != null ? userDetail.getMobile() : "") + "'")					
					.append(",deptNo:'" + (userDetail.getDepartmentNumber() != null ? userDetail.getDepartmentNumber() : "") + "'")
					.append(",deptName:'" + (userDetail.getDeptName() != null ? userDetail.getDeptName() : "") + "'")
					.append(",telephoneNumber:'" + (userDetail.getTelephoneNumber() != null ? userDetail.getTelephoneNumber() : "") + "'")
					.append(",facsimileTelephoneNumber:'" + (userDetail.getFacsimileTelephoneNumber() != null ? userDetail.getFacsimileTelephoneNumber() : "") + "'")
					.append(",userType:'" + (userDetail.getUserType() != null ? userDetail.getUserType() : userDetail.getDn().contains("ou=employees") ? "1" : (userDetail.getDn().contains("ou=customers") ? "2" : (userDetail.getDn().contains("ou=suppliers") ? "3" : (userDetail.getDn().contains("ou=specialuser") ? "4" : "")))) + "'")
					.append(",o:'" + (userDetail.getO() != null ? userDetail.getO() : "") + "'")
					.append(",status:'" + (userDetail.getStatus() != null ? userDetail.getStatus() : "") + "'")
					.append(",displayOrder:'" + (userDetail.getDisplayOrder() != null ? userDetail.getDisplayOrder() : "") + "'")
					.append(",employeeNumber:'" + (userDetail.getEmployeeNumber() != null ? userDetail.getEmployeeNumber() : "") + "'")
					.append(",employeeType:'" + (userDetail.getEmployeeType() != null ? userDetail.getEmployeeType() : "") + "'")
					.append(",departmentNumber:'" + (userDetail.getDepartmentNumber() != null ? userDetail.getDepartmentNumber() : "") + "'")
					.append(",belongDeptDN:'" + (userDetail.getBelongDeptDN() != null ? userDetail.getBelongDeptDN() : "") + "'")
					.append(",belongTitleDN:'" + (userDetail.getBelongTitleDN() != null ? userDetail.getBelongTitleDN() : "") + "'")
					.append("}}");
			} else if(methodCall.equalsIgnoreCase("import")){
				String msg = null;
                	msg = userDao.importUsersFromFile(realPath);
		        json = new StringBuffer("{success:true,msg:'" + msg.trim() + "'}");
			} else if(methodCall.equalsIgnoreCase("getList")) {
				List<User> list = new ArrayList<User>();
				String deptDN = req.getParameter("deptDN");
				String uidName = "账号/姓名".equals(req.getParameter("uidName")) ? "" : req.getParameter("uidName");
				long maxSize = (req.getParameter("maxSize") == null || "".equals(req.getParameter("maxSize"))) ? 20 : Long.parseLong(req.getParameter("maxSize"));
				list = userDao.findUserList(deptDN, uidName, maxSize);
				json = new StringBuffer("{success:true,result:[");
				for(User u : list) {
					json.append("{'dn':'" + u.getDn() + "',")
							.append("'uid':'" + u.getUid() + "',")
							.append("'displayName':'" + u.getDisplayName() + "',")
							.append("'title':'" + (u.getTitle()!= null ? u.getTitle() : "") + "',")
							.append("'deptName':'" + (u.getDeptName() != null ? u.getDeptName() : "") + "',")
							.append("'status':'" + (u.getStatus() != null ? u.getStatus() : "") + "',")
							.append("'userType':'" + u.getUserType() + "'},");
				}
				if(list.size() > 0) {
					json = json.deleteCharAt(json.length() - 1);
				}
				json.append("]}");
			} else if(methodCall.equalsIgnoreCase("combo")) {
				String uidORName = req.getParameter("param");
				List<User> list = userDao.findUserList(null, uidORName, 20);
				json = new StringBuffer("[");
				for(User u : list) {
					json.append("['" + u.getDn() + "','" + u.getDisplayName() + "'],");
				}
				if(list.size() > 0) {
					json.deleteCharAt(json.length() - 1);
				}
				json.append("]");
			} else if(methodCall.equalsIgnoreCase("validateUser")) {
				Result result = validateUser(req);
				if(!result.isSuccess()){
					json = new StringBuffer("false");
				}else{
					json = new StringBuffer("true");
				}
			}
		}catch(NameAlreadyBoundException e){
			e.printStackTrace();
			json = new StringBuffer("{success:false,msg:'uid="+user.getUid()+"的用户已经存在'}");
		}catch (RuntimeException e) {
			e.printStackTrace();
			json = new StringBuffer("{success:false,msg:'服务器端异常'}");
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

	private Result validateUser(HttpServletRequest req) {
		Result result = new Result();
		String username = req.getParameter("username");
		String password = req.getParameter("password");
		User user = userDao.findByPrimaryKey(username);
		if(user==null){
			result.setMsg("用户不存在！");
		}else{
			if (!user.getPassword().equals(password)) {
				result.setMsg("密码不正确！");
			}else{
				result.setSuccess(true);
			}
		}
		return result;
	}

	private void modifyUser(HttpServletRequest req, User user) {
		userDao.update(user);
		
		String[] groupDNs = req.getParameter("groups").split("__");//用户的最新的关联用户组信息
		
		//获取用户之前的关联用户组信息
		List<UserGroup> groups = groupDao.findGroupsByUserDN(user.getDn());
		
		List<String> newRealateDNs = new ArrayList();
		for(String groupDN : groupDNs){
			boolean has = false;
			for(UserGroup group : groups){
				if(groupDN.equals(group.getDn())){
					has = true;
				}
			}
			if(!has){
				newRealateDNs.add(groupDN);
			}
		}
		for(String groupDN : newRealateDNs) {
			UserGroup userGroup = groupDao.findByDN(groupDN);
			if(userGroup != null) {
				if(ArrayUtils.isEmpty(userGroup.getMembers())){continue;}
				List<String> list = Arrays.asList(userGroup.getMembers());
				List<String> memberList = new ArrayList<String>(list);
				if(!memberList.contains(user.getDn())) {//该用户组不包含当前用户，则加入
					memberList.add(user.getDn());
					userGroup.setMembers(memberList.toArray(new String[memberList.size()]));
					groupDao.update(userGroup);
				}
			}
		}
		
		List<String> delRealateDNs = new ArrayList();
		for(UserGroup group : groups){
			boolean has = false;
			for(String groupDN : groupDNs){
				if(groupDN.equals(group.getDn())){
					has = true;
				}
			}
			if(!has){
				delRealateDNs.add(group.getDn());
			}
		}
		
		for(String groupDN : delRealateDNs) {
			UserGroup userGroup = groupDao.findByDN(groupDN);
			if(userGroup != null) {
				if(ArrayUtils.isEmpty(userGroup.getMembers())){continue;}
				List<String> list = Arrays.asList(userGroup.getMembers());
				List<String> memberList = new ArrayList<String>(list);
				if(memberList.contains(user.getDn())) {//该用户组不包含当前用户，则加入
					memberList.remove(user.getDn());
					userGroup.setMembers(memberList.toArray(new String[memberList.size()]));
					groupDao.update(userGroup);
				}
			}
		}

	}

}
