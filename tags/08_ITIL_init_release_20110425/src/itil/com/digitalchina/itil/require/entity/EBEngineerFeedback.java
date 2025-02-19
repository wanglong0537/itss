package com.digitalchina.itil.require.entity;

import com.digitalchina.info.framework.dao.BaseObject;
/**
 * EB工程师反馈信息
 * @Class Name EBEngineerFeedback
 * @Author lee
 * @Create In Apr 8, 2009
 */
public class EBEngineerFeedback extends BaseObject{
	private Long id;			//自动编号
	private String feekback;	//反馈
	private String otherInfo;	//备注
	private String attachment;	//附件
	private ERP_NormalNeed erpNeed; //关联需求实体
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getFeekback() {
		return feekback;
	}
	public void setFeekback(String feekback) {
		this.feekback = feekback;
	}
	public String getOtherInfo() {
		return otherInfo;
	}
	public void setOtherInfo(String otherInfo) {
		this.otherInfo = otherInfo;
	}
	public String getAttachment() {
		return attachment;
	}
	public void setAttachment(String attachment) {
		this.attachment = attachment;
	}
	public ERP_NormalNeed getErpNeed() {
		return erpNeed;
	}
	public void setErpNeed(ERP_NormalNeed erpNeed) {
		this.erpNeed = erpNeed;
	}
}
