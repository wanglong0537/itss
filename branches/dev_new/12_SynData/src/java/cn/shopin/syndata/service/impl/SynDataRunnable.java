/**
 * @Probject Name: 12_SynData
 * @Path: cn.shopin.syndata.service.implSynDataRunnable.java
 * @Create By Jack
 * @Create In 2011-5-24 下午03:57:00
 * TODO
 */
package cn.shopin.syndata.service.impl;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Properties;

import javax.sql.DataSource;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

import net.shopin.ldap.ws.client.SystemWSImpl;
import net.shopin.ldap.ws.client.SystemWSImplService;

import org.apache.commons.dbcp.BasicDataSourceFactory;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.jdbc.core.JdbcTemplate;

import cn.shopin.syndata.entity.CustomizeSQL;
import cn.shopin.syndata.entity.ObjectFactory;
import cn.shopin.syndata.entity.SynData;
import cn.shopin.syndata.entity.TableInfo;
import cn.shopin.syndata.utils.PropertiesUtil;

/**
 * 
 * @Class Name SynDataRunnable
 * @Author Jack
 * @Create In 2011-5-24
 */
public class SynDataRunnable implements Runnable {

	private String filePath = "";
	private final Log logger = LogFactory.getLog("servicelog");

	public SynDataRunnable(String filePath) {
		this.filePath = filePath;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Runnable#run()
	 */
	public void run() {
		// TODO Auto-generated method stub
		try {
			JAXBContext jc = JAXBContext
					.newInstance("cn.shopin.syndata.entity");

			Unmarshaller u = jc.createUnmarshaller();
			FileInputStream fis = new FileInputStream(this.filePath);
			JAXBElement synData = (JAXBElement) u.unmarshal(fis);

			SynData sd = (SynData) synData.getValue();

			Properties p = new Properties();
			p.setProperty("driverClassName", sd.getDataBase().getDriver());
			p.setProperty("url", sd.getDataBase().getUrl());
			p.setProperty("password", sd.getDataBase().getPassword());
			p.setProperty("username", sd.getDataBase().getUsername());
			p.setProperty("maxActive", "30");
			p.setProperty("maxIdle", "10");
			p.setProperty("maxWait", "1000");
			p.setProperty("removeAbandoned", "false");
			p.setProperty("removeAbandonedTimeout", "120");
			p.setProperty("testOnBorrow", "true");
			p.setProperty("logAbandoned", "true");

			DataSource ds = BasicDataSourceFactory.createDataSource(p);
			JdbcTemplate jt = new JdbcTemplate(ds);
			fis.close();

			if (sd.getTableinfo().getDept().isIsSyn()) {
				synDepartment(sd, jt);
			}

			if (sd.getTableinfo().getUser().isIsSyn()) {
				synUser(sd, jt);
			}
			
			setFlag(sd);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logger.error("SynData Runnable Thread Error: " + e.getMessage());
		}
	}
	
	/**
	 * 设定同步结束标记
	 * @Methods Name setFlag
	 * @Create In 2011-6-4 By Jack
	 * @param sd void
	 */
	private void setFlag(final SynData sd){
		logger.info("Start Change Department Syn Flag To False--------");
		FileOutputStream fos = null;
		try {
			JAXBContext jc = JAXBContext.newInstance("cn.shopin.syndata.entity");
			Marshaller marshaller = jc.createMarshaller();
			
			sd.getTableinfo().getDept().setIsSyn(false);
			sd.getTableinfo().getUser().getPassWord().setIsSyn(false);
			
			ObjectFactory factory = new ObjectFactory();
			SynData sdw = factory.createSynData();
			sdw = sd;
			fos = new FileOutputStream(this.filePath);
			marshaller.marshal(sdw, fos);
			fos.flush();
			fos.close();
			
		} catch (JAXBException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logger.error("Start Change Department Syn Flag To False Error:" + e.getMessage());
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logger.error("Start Change Department Syn Flag To False Error:" + e.getMessage());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logger.error("Start Change Department Syn Flag To False Error:" + e.getMessage());
		}
		logger.info("End Change Department Syn Flag To False--------");
	}
	
	/**
	 * 同步部门信息
	 * @Methods Name synDepartment
	 * @Create In 2011-6-4 By Jack
	 * @param sd
	 * @param jt void
	 */
	@SuppressWarnings("deprecation")
	private void synDepartment(final SynData sd, JdbcTemplate jt) {
		List<net.shopin.ldap.ws.client.Department> ldapDept = new ArrayList<net.shopin.ldap.ws.client.Department>();
		logger.info("Start Department SynData..............");
		String urlStr = PropertiesUtil.getProperties("system.file.wsdl.path",
				"http://localhost:8081/uac/services/sysService?wsdl");
		SystemWSImpl port = SystemWSImplService.getPort(urlStr);
		ldapDept = port.getDeptList();

		if (ldapDept != null && ldapDept.size() > 0) {

			String update = " update "
					+ sd.getTableinfo().getDept().getTablename() + " set "
					+ sd.getTableinfo().getDept().getDeptname() + " = ?, "
					+ sd.getTableinfo().getDept().getParentdept() + " = ? "
					+ " where " + sd.getTableinfo().getDept().getDeptcode()
					+ " = ?";
			String insert = " insert into "
				+ sd.getTableinfo().getDept().getTablename() + " ("
				+ sd.getTableinfo().getDept().getDeptcode() + " , "
				+ sd.getTableinfo().getDept().getDeptname() + " , "
				+ sd.getTableinfo().getDept().getParentdept() + " , ";
			
			String value = " ) values( ?,?,?";
			String startMounth = String.valueOf((new Date()).getYear() + 1900) + "-" + PropertiesUtil.getProperties("system.file.startMounth", "1-1");
			
			String otherWhere = "";
			String otherInsertItem = "";
			String otherInsertValue = "";
			int paraNum = 3;
			
			if(sd.getTableinfo().getDept().getStartdate() != null && !"".equals(sd.getTableinfo().getDept().getStartdate())){
				otherWhere += " and ? >=" + sd.getTableinfo().getDept().getStartdate();
				otherInsertItem += sd.getTableinfo().getDept().getStartdate() + " , ";
				otherInsertValue += " , ?";
				paraNum += 1;
			}
			if(sd.getTableinfo().getDept().getEnddate() != null && !"".equals(sd.getTableinfo().getDept().getEnddate())){
				otherWhere += " and ? <=" + sd.getTableinfo().getDept().getEnddate() ;
				otherInsertItem += sd.getTableinfo().getDept().getEnddate() + " , ";
				otherInsertValue += " , ?";
				paraNum += 1;
			}
			if(sd.getTableinfo().getDept().getIsdelete() != null && !"".equals(sd.getTableinfo().getDept().getIsdelete())){
				otherWhere += " and " + sd.getTableinfo().getDept().getIsdelete() + " != ?";
				otherInsertItem += sd.getTableinfo().getDept().getIsdelete() + " , ";
				otherInsertValue += " , ?";
				paraNum += 1;
			}
			
			update += otherWhere;
			insert += otherInsertItem;
			insert = insert.trim();
			insert = insert.substring(0, insert.length()-1);
			insert += (value + otherInsertValue + " )" );
			
			
			List<net.shopin.ldap.ws.client.Department> notIn = new ArrayList<net.shopin.ldap.ws.client.Department>();
			for (net.shopin.ldap.ws.client.Department item : ldapDept) {
				try {
					Object[] arg = new Object[paraNum] ;
					arg[0] = item.getDeptName();
					arg[1] = item.getParentNo();
					arg[2] =  item.getDeptNo();
					
					int itemSize = 3;
					String now = new Date().toLocaleString();
					now = now.substring(0, now.indexOf(" "));
					if(sd.getTableinfo().getDept().getStartdate() != null && !"".equals(sd.getTableinfo().getDept().getStartdate())){
						arg[itemSize++] = now;
					}
					if(sd.getTableinfo().getDept().getEnddate() != null && !"".equals(sd.getTableinfo().getDept().getEnddate())){
						arg[itemSize++] = now;
					}
					if(sd.getTableinfo().getDept().getIsdelete() != null && !"".equals(sd.getTableinfo().getDept().getIsdelete())){
						arg[itemSize++] = 1;
					}
					
					logger.info("Update Department:" + item.getDeptName() + "/" + item.getDeptNo());
					int updatenum = jt.update(update, arg);
					if(updatenum == 0){
						notIn.add(item);
					}
				} catch (Exception e) {
					e.printStackTrace();
					notIn.add(item);
				}
			}
			if (notIn.size() != 0) {
				for (net.shopin.ldap.ws.client.Department item : notIn) {
					Object[] arg = new Object[paraNum] ;
					arg[0] = item.getDeptNo();
					arg[1] = item.getDeptName();
					arg[2] = item.getParentNo();
					
					int itemSize = 3;
					if(sd.getTableinfo().getDept().getStartdate() != null && !"".equals(sd.getTableinfo().getDept().getStartdate())){
						arg[itemSize++] = startMounth;
					}
					if(sd.getTableinfo().getDept().getEnddate() != null && !"".equals(sd.getTableinfo().getDept().getEnddate())){
						arg[itemSize++] = "9999-12-31";
					}
					if(sd.getTableinfo().getDept().getIsdelete() != null && !"".equals(sd.getTableinfo().getDept().getIsdelete())){
						arg[itemSize++] = 0;
					}
					logger.info("Insert Department:" + item.getDeptName() + "/"
							+ item.getDeptNo());
					jt.update(insert, arg);
				}
			}
			doCustomizeSQL(sd.getTableinfo().getDept().getCustomizeSQL(), jt);
		}
		
		logger.info("End Department SynData..............");
	}
	
	/**
	 * 同步人员信息
	 * @Methods Name synUser
	 * @Create In 2011-6-4 By Jack
	 * @param sd
	 * @param jt void
	 */
	private void synUser(SynData sd, JdbcTemplate jt) {
		List<net.shopin.ldap.ws.client.User> ldapUser = new ArrayList<net.shopin.ldap.ws.client.User>();
		logger.info("Start User SynData..............");
		String urlStr = PropertiesUtil.getProperties("system.file.wsdl.path",
				"http://localhost:8081/uac/services/sysService?wsdl");
		SystemWSImpl port = SystemWSImplService.getPort(urlStr);
		ldapUser = port.findUserList();
		int paraNum = 3;

		if (ldapUser != null && ldapUser.size() > 0) {
			String update = " update "
					+ sd.getTableinfo().getUser().getTablename() + " set "
					+ sd.getTableinfo().getUser().getRealname() + " = ?, "
					+ sd.getTableinfo().getUser().getEmail() + " = ?, ";

			String insert = "insert into "
					+ sd.getTableinfo().getUser().getTablename() + " ("
					+ sd.getTableinfo().getUser().getUid() + " , "
					+ sd.getTableinfo().getUser().getRealname() + " , "
					+ sd.getTableinfo().getUser().getEmail() + " , ";
			String values = "";

			if (sd.getTableinfo().getUser().getMobile() != null
					&& !"".equalsIgnoreCase(sd.getTableinfo().getUser()
							.getMobile())) {
				update += (sd.getTableinfo().getUser().getMobile() + " = ?, ");
				insert += (sd.getTableinfo().getUser().getMobile() + " , ");
				values += " , ?";
				paraNum +=1;
			}

			if (sd.getTableinfo().getUser().getPhone() != null
					&& !"".equalsIgnoreCase(sd.getTableinfo().getUser()
							.getPhone())) {
				update += (sd.getTableinfo().getUser().getPhone() + " = ?, ");
				insert += (sd.getTableinfo().getUser().getPhone() + " , ");
				values += " , ?";
				paraNum +=1;
			}

			if (sd.getTableinfo().getUser().getFax() != null
					&& !"".equalsIgnoreCase(sd.getTableinfo().getUser()
							.getFax())) {
				update += (sd.getTableinfo().getUser().getFax() + " = ?, ");
				insert += (sd.getTableinfo().getUser().getFax() + " , ");
				values += " , ?";
				paraNum +=1;
			}

			if (sd.getTableinfo().getUser().getPosition() != null
					&& !"".equalsIgnoreCase(sd.getTableinfo().getUser()
							.getPosition())) {
				update += (sd.getTableinfo().getUser().getPosition() + " = ?, ");
				insert += (sd.getTableinfo().getUser().getPosition() + " , ");
				values += " , ?";
				paraNum +=1;
			}
			if (sd.getTableinfo().getUser().getBelongdept() != null
					&& !"".equalsIgnoreCase(sd.getTableinfo().getUser()
							.getBelongdept())) {
				update += (sd.getTableinfo().getUser().getBelongdept() + " = ?, ");
				insert += (sd.getTableinfo().getUser().getBelongdept() + " , ");
				values += " , ?";
				paraNum +=1;
			}
			if (sd.getTableinfo().getUser().getBelongName() != null
					&& !"".equalsIgnoreCase(sd.getTableinfo().getUser()
							.getBelongName())) {
				update += (sd.getTableinfo().getUser().getBelongName() + " = ?, ");
				insert += (sd.getTableinfo().getUser().getBelongName() + " , ");
				values += " , ?";
				paraNum +=1;
			}
			if(sd.getTableinfo().getUser().getPassWord().isIsSyn()){
				update += (sd.getTableinfo().getUser().getPassWord().getColumnName() + " = ?, ");
				insert += (sd.getTableinfo().getUser().getPassWord().getColumnName() + " , ");
				values += " , ?";
				paraNum +=1;
			}

			update = update.trim();
			update = update.substring(0, update.length() - 1);
			update += " where " + sd.getTableinfo().getUser().getUid() + " = ?";
			insert = insert.trim();
			insert = insert.substring(0, insert.length() - 1);
			insert += " ) values( ?,?,?";
			insert += values + " )";

			List<net.shopin.ldap.ws.client.User> notIn = new ArrayList<net.shopin.ldap.ws.client.User>();
			//add by jack for 增加离职用户处理部分 at 2011-12-31 begin
			String leaveEmp = "";
			//add by jack for 增加离职用户处理部分 at 2011-12-31 end
			for (net.shopin.ldap.ws.client.User item : ldapUser) {
				try {
					String uid = item.getUid();
					Object[] arg = new Object[paraNum];
					int itemn = 2;
					arg[0] = item.getDisplayName();
					arg[1] = item.getMail();
					arg[arg.length-1] = uid;
					
					if (sd.getTableinfo().getUser().getMobile() != null
							&& !"".equalsIgnoreCase(sd.getTableinfo().getUser()
									.getMobile())) {
						arg[itemn++] = item.getMobile();
					}

					if (sd.getTableinfo().getUser().getPhone() != null
							&& !"".equalsIgnoreCase(sd.getTableinfo().getUser()
									.getPhone())) {
						arg[itemn++] = item.getTelephoneNumber();
					}

					if (sd.getTableinfo().getUser().getFax() != null
							&& !"".equalsIgnoreCase(sd.getTableinfo().getUser()
									.getFax())) {
						arg[itemn++] = item.getFacsimileTelephoneNumber();
					}

					if (sd.getTableinfo().getUser().getPosition() != null
							&& !"".equalsIgnoreCase(sd.getTableinfo().getUser()
									.getPosition())) {
						arg[itemn++] = item.getTitle();
					}
					if (sd.getTableinfo().getUser().getBelongdept() != null
							&& !"".equalsIgnoreCase(sd.getTableinfo().getUser()
									.getBelongdept())) {
						arg[itemn++] = StringUtils.isNumeric(item.getDepartmentNumber()) ? item.getDepartmentNumber() : 1101 ;
					}
					if (sd.getTableinfo().getUser().getBelongName() != null
							&& !"".equalsIgnoreCase(sd.getTableinfo().getUser()
									.getBelongName())) {
						arg[itemn++] = item.getDeptName();
					}
					if(sd.getTableinfo().getUser().getPassWord().isIsSyn()){
						arg[itemn++] = sd.getTableinfo().getUser().getPassWord().getDefaultValue();
					}
					
					//add by jack for 增加离职用户处理部分 at 2011-12-31 begin
					int updatenum = jt.update(update, arg);
					if(updatenum == 0){
						notIn.add(item);
					}else{
						logger.info("Update User:" + item.getCn() + "/" + uid);
						leaveEmp += "'" + uid + "',";
					}
					//add by jack for 增加离职用户处理部分 at 2011-12-31 end
				} catch (Exception e) {
					e.printStackTrace();
					logger.error("Update User:" + item.getDisplayName() + "/" + item.getUid() + "has failed!!");
					notIn.add(item);
				}
			}
			if (notIn.size() != 0) {
				for (net.shopin.ldap.ws.client.User item : notIn) {
					try{
						String uid = item.getUid();
						Object[] arg = new Object[paraNum];
						int itemn = 3;
						arg[0] = uid;
						arg[1] = item.getDisplayName();
						arg[2] = item.getMail();
						
						if (sd.getTableinfo().getUser().getMobile() != null
								&& !"".equalsIgnoreCase(sd.getTableinfo().getUser()
										.getMobile())) {
							arg[itemn++] = item.getMobile();
						}
	
						if (sd.getTableinfo().getUser().getPhone() != null
								&& !"".equalsIgnoreCase(sd.getTableinfo().getUser()
										.getPhone())) {
							arg[itemn++] = item.getTelephoneNumber();
						}
	
						if (sd.getTableinfo().getUser().getFax() != null
								&& !"".equalsIgnoreCase(sd.getTableinfo().getUser()
										.getFax())) {
							arg[itemn++] = item.getFacsimileTelephoneNumber();
						}
	
						if (sd.getTableinfo().getUser().getPosition() != null
								&& !"".equalsIgnoreCase(sd.getTableinfo().getUser()
										.getPosition())) {
							arg[itemn++] = item.getTitle();
						}
						if (sd.getTableinfo().getUser().getBelongdept() != null
								&& !"".equalsIgnoreCase(sd.getTableinfo().getUser()
										.getBelongdept())) {
							arg[itemn++] = StringUtils.isNumeric(item.getDepartmentNumber()) ? item.getDepartmentNumber() : 1001;
						}
						if (sd.getTableinfo().getUser().getBelongName() != null
								&& !"".equalsIgnoreCase(sd.getTableinfo().getUser()
										.getBelongName())) {
							arg[itemn++] = item.getDeptName();
						}
						if(sd.getTableinfo().getUser().getPassWord().isIsSyn()){
							arg[itemn++] = sd.getTableinfo().getUser().getPassWord().getDefaultValue();
						}
						
						//add by jack for 增加离职用户处理部分 at 2011-12-31 begin
						int insertnum = jt.update(insert, arg);
						if(insertnum != 0){
							logger.info("Insert User:" + item.getDisplayName() + "/" + uid);
							leaveEmp += "'" + uid + "',";
						}else{
							logger.error("Insert User:" + item.getDisplayName() + "/" + item.getUid() + "has failed!!");
						}
						//add by jack for 增加离职用户处理部分 at 2011-12-31 end
					}catch(Exception e){
						e.printStackTrace();
						logger.error("Insert User:" + item.getDisplayName() + "/" + item.getUid() + "has failed!!");
					}
				}
			}
			doCustomizeSQL(sd.getTableinfo().getUser().getCustomizeSQL(), jt);
			//add by jack for 增加离职用户处理部分 at 2011-12-31 begin
			if(sd.getTableinfo().getUser().getDeleteFlag() != null){
				try{
					StringBuilder sb = new StringBuilder();
					leaveEmp = leaveEmp.substring(0, leaveEmp.length()-1);
					
					sb.append("update " + sd.getTableinfo().getUser().getTablename() + " set ");
					sb.append(sd.getTableinfo().getUser().getDeleteFlag().getColumnName() + " = " + sd.getTableinfo().getUser().getDeleteFlag().getFlagValue() + " ");
					sb.append("where " + sd.getTableinfo().getUser().getUid() + " not in ( " + leaveEmp + " ) ");
					
					String sql  = sb.toString();
					int leaveNum = jt.update(sql);
					if(leaveNum != 0){
						logger.info("Leave User Disabled Successed, Leave Person Number: " + leaveNum);
					}else{
						logger.info("No Person has leaved!");
					}
				}catch(Exception e){
					e.printStackTrace();
					logger.error("Leave User set Flag is Failed, UID is : " + leaveEmp);
				}
			}
			//add by jack for 增加离职用户处理部分 at 2011-12-31 end
		}

		logger.info("End User SynData..............");
	}
	
	/**
	 * 执行自定义SQL
	 * @Methods Name doCustomizeSQL
	 * @Create In 2011-6-4 By Jack
	 * @param csql
	 * @param jt void
	 */
	private void doCustomizeSQL(CustomizeSQL csql, JdbcTemplate jt){
		if(csql !=  null){
			logger.info("Start deal Customize SQL...................");
			long no = 1;
			try{
				for(String item : csql.getValue()){
					logger.info("No." + no++ + ": " + item);
					jt.update(item);
				}
			}catch(Exception e){
				e.printStackTrace();
				logger.error("No." + no++ + " has deal failed!!");
			}
			
			logger.info("End deal Customize SQL...................");
		}
	}
	
	/**
	 * @Param String filePath to set
	 */
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	/**
	 * @Return the String filePath
	 */
	public String getFilePath() {
		return filePath;
	}

}
