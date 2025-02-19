package com.digitalchina.itil.require.entity;

import java.util.Date;

import com.digitalchina.info.framework.dao.BaseObject;

/**
 * 收款计划附件
 * @Class Name SRIncomePlanFile
 * @Author lee
 * @Create In Nov 26, 2009
 */
public class SRIncomePlanFile extends BaseObject{
		private Long id;
		private SpecialRequirement specialRequire;	//需求实体
		private String attachment;	//附件
		
		public SRIncomePlanFile(){
		}
		
		public SRIncomePlanFile(SpecialRequirement specialRequire){
			this.specialRequire = specialRequire;
			this.attachment = String.valueOf(new Date().getTime());
		}
		
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public SpecialRequirement getSpecialRequire() {
			return specialRequire;
		}
		public void setSpecialRequire(SpecialRequirement specialRequire) {
			this.specialRequire = specialRequire;
		}
		public String getAttachment() {
			return attachment;
		}
		public void setAttachment(String attachment) {
			this.attachment = attachment;
		}
}
