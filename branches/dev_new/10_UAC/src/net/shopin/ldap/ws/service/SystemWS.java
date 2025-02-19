/**
 * 
 */
package net.shopin.ldap.ws.service;

import java.util.List;

import net.shopin.ldap.entity.Department;
import net.shopin.ldap.entity.Role;
import net.shopin.ldap.entity.System;
import net.shopin.ldap.entity.User;
import net.shopin.ldap.entity.UserGroup;

/**
 * 系统对外提供的WebService接口
 * @author wchao
 *
 */
public interface SystemWS {
	
	/**
	 * 获取用户列表
	 * @return
	 */
	List<User> findUserList();
	
	/**
	 * 通过用户唯一标示(uid)或者姓名(name)获取用户列表
	 * @param uidORName
	 * @return
	 */
	List<User> findUserListByParam(String uidORName);
	
	/**
	 * 通过用户唯一标示查询其详细信息
	 * @param uid
	 * @return
	 */
	User getUserDetailByUid(String uid);
	
	/**
	 * 获取部门列表
	 * @return
	 */
	List<Department> getDeptList();
	
	/**
	 * 新建用户信息
	 * @param user
	 * @return
	 */
	void createUser(User user);
	
	/**
	 * 修改用户信息
	 * @param user
	 * @return
	 */
	void updateUser(User user);
	
	/**
	 * 删除用户信息（逻辑）
	 * @param user
	 * @return
	 */
	void deleteUserByUserId(String userId);
	
	/**
	 * 根据角色cn查询用户列表
	 * @param roleCN
	 * @return
	 */
	List<User> findUserListByRoleCN(String roleCN);
	
	/**
	 * 根据用户组cn查询用户列表
	 * @param roleCN
	 * @return
	 */
	List<User> findUserListByGroupCN(String groupCN);
	
	/**
	 * 根据系统cn查询角色列表
	 * @param roleCN
	 * @return
	 */
	List<Role> findRoleListBySystemCN(String systemCN);
	
	/**
	 * 根据用户ID查询其关联的用户组列表
	 * @param userId
	 * @return
	 */
	List<UserGroup> findGroupsByUserId(String userId);
	
	/**
	 * 根据用户ID查询其关联的角色列表
	 * @param userId
	 * @return
	 */
	public List<Role> findRolesByUserId(String userId);
	
	/**
	 * 根据角色CN查询其关联的系统列表
	 * @param roleCN
	 * @return
	 */
	public List<System> findSystemsByRoleCN(String roleCN);
}
