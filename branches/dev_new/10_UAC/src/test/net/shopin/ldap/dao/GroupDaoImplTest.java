package net.shopin.ldap.dao;

import java.util.ArrayList;
import java.util.List;

import net.shopin.ldap.entity.Department;
import net.shopin.ldap.entity.UserGroup;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class GroupDaoImplTest {
	private static ApplicationContext context;
	private static GroupDao groupDao;

	@Before
	public void setUp() throws Exception {
		context = new ClassPathXmlApplicationContext("applicationContext.xml");
		groupDao = (GroupDao) context.getBean("groupDao");
	}

	@After
	public void tearDown() throws Exception {
		
	}
	
	@Test
	public void testCreat() {
		
		UserGroup userGroup = new UserGroup();
		userGroup.setCn("TestAdmin11");
		userGroup.setDisplayName("测试管理员");
		userGroup.setDescription("描述信息");
		userGroup.setStatus(1);
//		String [] members = {"uid=admin,ou=employees,ou=users,dc=shopin,dc=net" ,
//		"uid=ansong,ou=employees,ou=users,dc=shopin,dc=net"};
//		userGroup.setMembers(members);
		groupDao.create(userGroup);
	}
	
	@Test
	public void testUpdate() {
		
		UserGroup userGroup = new UserGroup();
		userGroup.setCn("TestAdmin");
		userGroup.setDisplayName("测试管理员");
		userGroup.setDescription("描述信息");
		userGroup.setStatus(1);
		String [] members = {"uid=admin,ou=employees,ou=users" ,
				"uid=ansong,ou=employees,ou=users"};
		userGroup.setMembers(members);
		groupDao.update(userGroup);
	}
	
	@Test
	public void testfindByDN() {		
		System.out.print(groupDao.findByDN("cn=TestAdmin,ou=groups"));
		
	}
	@Test
	public void testFindGroupsByUserDN() {		
		List<UserGroup> groups = groupDao.findGroupsByUserDN("uid=lgydg,o=11010208,o=110102,o=1101,ou=orgnizations,dc=shopin,dc=net");
		for(UserGroup group : groups){
			System.out.println("-------------" + group.getDisplayName() + "/" + group.getCn() + "-------------");
		}
		
	}
	
	


}
