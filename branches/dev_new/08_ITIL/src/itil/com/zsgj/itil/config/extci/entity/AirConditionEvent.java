package com.zsgj.itil.config.extci.entity;

import com.zsgj.info.framework.dao.BaseObject;

public class AirConditionEvent extends BaseObject {
	/**
	 * @Field long serialVersionUID
	 */
	private static final long serialVersionUID = -2838911224971172630L;
	private com.zsgj.info.framework.security.entity.UserInfo createUser;
	private java.util.Date createDate;
	private com.zsgj.info.framework.security.entity.UserInfo modifyUser;
	private java.util.Date modifyDate;
	private java.lang.Long id;
	private java.lang.String model;
	private com.zsgj.itil.config.extlist.entity.AirConditionType type;
	private java.lang.String powerConsumption;
	private java.lang.String brand;
	private java.lang.String capacity;
	private java.lang.String cisn;
	private java.lang.String sn;

	public void setCreateUser(
			com.zsgj.info.framework.security.entity.UserInfo createUser) {
		this.createUser = createUser;
	}

	public void setCreateDate(java.util.Date createDate) {
		this.createDate = createDate;
	}

	public void setModifyUser(
			com.zsgj.info.framework.security.entity.UserInfo modifyUser) {
		this.modifyUser = modifyUser;
	}

	public void setModifyDate(java.util.Date modifyDate) {
		this.modifyDate = modifyDate;
	}

	public void setId(java.lang.Long id) {
		this.id = id;
	}

	public void setModel(java.lang.String model) {
		this.model = model;
	}

	public void setType(
			com.zsgj.itil.config.extlist.entity.AirConditionType type) {
		this.type = type;
	}

	public void setPowerConsumption(java.lang.String powerConsumption) {
		this.powerConsumption = powerConsumption;
	}

	public void setBrand(java.lang.String brand) {
		this.brand = brand;
	}

	public void setCapacity(java.lang.String capacity) {
		this.capacity = capacity;
	}

	public void setCisn(java.lang.String cisn) {
		this.cisn = cisn;
	}

	public void setSn(java.lang.String sn) {
		this.sn = sn;
	}

	public com.zsgj.info.framework.security.entity.UserInfo getCreateUser() {
		return this.createUser;
	}

	public java.util.Date getCreateDate() {
		return this.createDate;
	}

	public com.zsgj.info.framework.security.entity.UserInfo getModifyUser() {
		return this.modifyUser;
	}

	public java.util.Date getModifyDate() {
		return this.modifyDate;
	}

	public java.lang.Long getId() {
		return this.id;
	}

	public java.lang.String getModel() {
		return this.model;
	}

	public com.zsgj.itil.config.extlist.entity.AirConditionType getType() {
		return this.type;
	}

	public java.lang.String getPowerConsumption() {
		return this.powerConsumption;
	}

	public java.lang.String getBrand() {
		return this.brand;
	}

	public java.lang.String getCapacity() {
		return this.capacity;
	}

	public java.lang.String getCisn() {
		return this.cisn;
	}

	public java.lang.String getSn() {
		return this.sn;
	}
}
