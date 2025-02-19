package com.xpsoft.oa.model.kpi;


import java.util.*;

import com.xpsoft.core.model.BaseModel;

public class HrPaPerformanceindex extends BaseModel{
	protected Long id;
	protected String paName;
	protected Long paType;
	protected Long paFrequency;
	protected Long paMode;
	protected HrPaDatadictionary type;
	protected HrPaDatadictionary frequency;
	protected HrPaDatadictionary mode;
	protected int paIsOnlyNegative;
	protected String paDesc;
	protected String remark;
	protected Date createDate;
	protected Long createPerson;
	protected int publishStatus;
	protected Date modifyDate;
	protected Long modifyPerson;
	
	public HrPaPerformanceindex(){}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPaName() {
		return paName;
	}

	public void setPaName(String paName) {
		this.paName = paName;
	}

	public HrPaDatadictionary getType() {
		return type;
	}

	public void setType(HrPaDatadictionary type) {
		this.type = type;
	}
	
	public Long getPaType() {
		return this.getType() == null ? null : this.getType().getId();
	}
	
	public void setPaType(Long value) {
		if(value == null) {
			this.type = null;
		} else if (this.type == null) {
			this.type = new HrPaDatadictionary();
			this.type.setId(value);
		} else {
			this.type.setId(value);
		}
	}

	public HrPaDatadictionary getFrequency() {
		return frequency;
	}

	public void setFrequency(HrPaDatadictionary frequency) {
		this.frequency = frequency;
	}
	
	public Long getPaFrequency() {
		return this.getFrequency() == null ? null : this.getFrequency().getId();
	}
	
	public void setPaFrequency(Long value) {
		if(value == null) {
			this.frequency = null;
		} else if (this.frequency == null) {
			this.frequency = new HrPaDatadictionary();
			this.frequency.setId(value);
		} else {
			this.frequency.setId(value);
		}
	}

	public HrPaDatadictionary getMode() {
		return mode;
	}

	public void setMode(HrPaDatadictionary mode) {
		this.mode = mode;
	}
	
	public Long getPaMode(){
		return this.getMode() == null ? null : this.getMode().getId();
	}
	
	public void setPaMode(Long value) {
		if(value == null) {
			this.mode = null;
		} else if (this.mode == null) {
			this.mode = new HrPaDatadictionary();
			this.mode.setId(value);
		} else {
			this.mode.setId(value);
		}
	}

	public int getPaIsOnlyNegative() {
		return paIsOnlyNegative;
	}

	public void setPaIsOnlyNegative(int paIsOnlyNegative) {
		this.paIsOnlyNegative = paIsOnlyNegative;
	}

	public String getPaDesc() {
		return paDesc;
	}

	public void setPaDesc(String paDesc) {
		this.paDesc = paDesc;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Long getCreatePerson() {
		return createPerson;
	}

	public void setCreatePerson(Long createPerson) {
		this.createPerson = createPerson;
	}

	public int getPublishStatus() {
		return publishStatus;
	}

	public void setPublishStatus(int publishStatus) {
		this.publishStatus = publishStatus;
	}

	public Date getModifyDate() {
		return modifyDate;
	}

	public void setModifyDate(Date modifyDate) {
		this.modifyDate = modifyDate;
	}

	public Long getModifyPerson() {
		return modifyPerson;
	}

	public void setModifyPerson(Long modifyPerson) {
		this.modifyPerson = modifyPerson;
	}
}
