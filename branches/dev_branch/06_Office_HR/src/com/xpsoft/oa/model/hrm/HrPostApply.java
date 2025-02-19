package com.xpsoft.oa.model.hrm;

import java.util.Date;

import com.xpsoft.core.model.BaseModel;
import com.xpsoft.oa.model.system.AppUser;

public class HrPostApply extends BaseModel{
	
	public static final Integer STATUS_DRAFT = 0;
	public static final Integer STATUS_AUDITING = 1;
	public static final Integer STATUS_BACK = 2;
	public static final Integer STATUS_APPROVED = 3;
	public static final Integer STATUS_DEL = 4;
	public static final Integer STATUS_LINEMANAGERAUDIT = 5;//待直线经理审核
	public static final Integer STATUS_HRCONFIRMAUDIT = 6;//待人力资源复核
	public static final Integer STATUS_VICEPRESIDENTCONFIRM = 7;//待分管副总裁确认
	
	protected Long id;
	protected AppUser applyUser;//转正申请人
	protected String gender;//申请人性别
	protected Integer age;//申请人年龄
	protected Long deptId;//部门ID
	protected String deptName;//部门名称
	protected Long postId;//职务ID
	protected String postName;//职务名称
	protected Date accessionTime;//入职日期
	protected String proSummary;//员工试用期总结
	protected Long postManagerId;//直属上级ID
	protected String postManagerName;//直属上级姓名
	protected Date postManagerAuditDate;//直属上级确认日期
	protected Date userManagerAuditDate;//本人确认日期
	protected Integer publishStatus;//状态：0-草稿 1-审核中 2-退回 3-已确认
	protected AppUser createPerson;
	protected Date createDate;
	protected AppUser modifyPerson;
	protected Date modifyDate;
	
	public HrPostApply() {}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public AppUser getApplyUser() {
		return applyUser;
	}

	public void setApplyUser(AppUser applyUser) {
		this.applyUser = applyUser;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public Long getDeptId() {
		return deptId;
	}

	public void setDeptId(Long deptId) {
		this.deptId = deptId;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public Long getPostId() {
		return postId;
	}

	public void setPostId(Long postId) {
		this.postId = postId;
	}

	public String getPostName() {
		return postName;
	}

	public void setPostName(String postName) {
		this.postName = postName;
	}

	public Date getAccessionTime() {
		return accessionTime;
	}

	public void setAccessionTime(Date accessionTime) {
		this.accessionTime = accessionTime;
	}

	public Long getPostManagerId() {
		return postManagerId;
	}

	public void setPostManagerId(Long postManagerId) {
		this.postManagerId = postManagerId;
	}

	public String getPostManagerName() {
		return postManagerName;
	}

	public void setPostManagerName(String postManagerName) {
		this.postManagerName = postManagerName;
	}

	public Date getPostManagerAuditDate() {
		return postManagerAuditDate;
	}

	public void setPostManagerAuditDate(Date postManagerAuditDate) {
		this.postManagerAuditDate = postManagerAuditDate;
	}

	public Date getUserManagerAuditDate() {
		return userManagerAuditDate;
	}

	public void setUserManagerAuditDate(Date userManagerAuditDate) {
		this.userManagerAuditDate = userManagerAuditDate;
	}

	public Integer getPublishStatus() {
		return publishStatus;
	}

	public void setPublishStatus(Integer publishStatus) {
		this.publishStatus = publishStatus;
	}

	public AppUser getCreatePerson() {
		return createPerson;
	}

	public void setCreatePerson(AppUser createPerson) {
		this.createPerson = createPerson;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public AppUser getModifyPerson() {
		return modifyPerson;
	}

	public void setModifyPerson(AppUser modifyPerson) {
		this.modifyPerson = modifyPerson;
	}

	public Date getModifyDate() {
		return modifyDate;
	}

	public void setModifyDate(Date modifyDate) {
		this.modifyDate = modifyDate;
	}

	public String getProSummary() {
		return proSummary;
	}

	public void setProSummary(String proSummary) {
		this.proSummary = proSummary;
	}
}
