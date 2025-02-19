package com.xpsoft.oa.model.kpi;

import com.xpsoft.core.model.BaseModel;

public class HrPaKpiitem2userCmp extends BaseModel {
	protected Long id;
	protected HrPaKpiPBC2UserCmp pbc2User;
	protected Long piId;
	protected Double weight;
	protected Double result;
	protected Double coefficient;
	
	public Double getCoefficient() {
		return coefficient;
	}

	public void setCoefficient(Double coefficient) {
		this.coefficient = coefficient;
	}
	public HrPaKpiitem2userCmp() {}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public HrPaKpiPBC2UserCmp getPbc2User() {
		return pbc2User;
	}

	public void setPbc2User(HrPaKpiPBC2UserCmp pbc2User) {
		this.pbc2User = pbc2User;
	}

	public Long getPiId() {
		return piId;
	}

	public void setPiId(Long piId) {
		this.piId = piId;
	}

	public Double getWeight() {
		return weight;
	}

	public void setWeight(Double weight) {
		this.weight = weight;
	}

	public Double getResult() {
		return result;
	}

	public void setResult(Double result) {
		this.result = result;
	}

	
}
