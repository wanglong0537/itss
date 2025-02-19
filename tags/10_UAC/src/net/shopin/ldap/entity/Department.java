package net.shopin.ldap.entity;

import java.io.Serializable;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;

public class Department implements Serializable {

	/**
	 * 部门标号规则
	 * ## ## ## ## .. (财年 第一级 第二级 第三级 ..)
	 * 
	 */
	String parentNo;//父部门编号，在LDAP中为orgniztionUnit的ou
	
	String deptNo;//部门编号，在LDAP中为orgniztionUnit的ou
	
	String deptName;//部门名称，在LDAP中为orgniztionUnit的descriptions
	
	
	public String getParentNo() {
		return parentNo;
	}
	public void setParentNo(String parentNo) {
		this.parentNo = parentNo;
	}
	/**
	 * @return the deptNo
	 */
	public String getDeptNo() {
		return deptNo;
	}
	/**
	 * @param deptNo the deptNo to set
	 */
	public void setDeptNo(String deptNo) {
		this.deptNo = deptNo;
	}
	/**
	 * @return the deptName
	 */
	public String getDeptName() {
		return deptName;
	}
	/**
	 * @param deptName the deptName to set
	 */
	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}
	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		return HashCodeBuilder.reflectionHashCode(this);
	}
	/* (non-Javadoc)
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		return EqualsBuilder.reflectionEquals(this, obj);
	}
	
	
}
