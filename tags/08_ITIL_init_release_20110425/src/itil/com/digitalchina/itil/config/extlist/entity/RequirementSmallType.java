package com.digitalchina.itil.config.extlist.entity;

import java.util.Date;
import com.digitalchina.info.framework.dao.BaseObject;
import com.digitalchina.info.framework.security.entity.UserInfo;

public class RequirementSmallType extends BaseObject {
   private java.lang.Long id;
   private com.digitalchina.itil.config.extlist.entity.RequirementBigType type;
   private java.lang.String name;

   public void setId(java.lang.Long id){
	     this.id=id;
   }
   public void setType(com.digitalchina.itil.config.extlist.entity.RequirementBigType type){
	     this.type=type;
   }
   public void setName(java.lang.String name){
	     this.name=name;
   }

   public java.lang.Long getId(){
	     return this.id;
   }
   public com.digitalchina.itil.config.extlist.entity.RequirementBigType getType(){
	     return this.type;
   }
   public java.lang.String getName(){
	     return this.name;
   }
} 
