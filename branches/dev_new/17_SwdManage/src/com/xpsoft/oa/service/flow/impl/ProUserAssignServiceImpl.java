/*    */ package com.xpsoft.oa.service.flow.impl;
/*    */ 
/*    */ import com.xpsoft.core.service.impl.BaseServiceImpl;
/*    */ import com.xpsoft.oa.dao.flow.ProUserAssignDao;
/*    */ import com.xpsoft.oa.model.flow.ProUserAssign;
/*    */ import com.xpsoft.oa.service.flow.ProUserAssignService;
/*    */ import java.util.List;
/*    */ 
/*    */ public class ProUserAssignServiceImpl extends BaseServiceImpl<ProUserAssign>
/*    */   implements ProUserAssignService
/*    */ {
/*    */   private ProUserAssignDao dao;
/*    */ 
/*    */   public ProUserAssignServiceImpl(ProUserAssignDao dao)
/*    */   {
/* 17 */     super(dao);
/* 18 */     this.dao = dao;
/*    */   }
/*    */ 
/*    */   public List<ProUserAssign> getByDeployId(String deployId) {
/* 22 */     return this.dao.getByDeployId(deployId);
/*    */   }
/*    */ 
/*    */   public ProUserAssign getByDeployIdActivityName(String deployId, String activityName)
/*    */   {
/* 29 */     return this.dao.getByDeployIdActivityName(deployId, activityName);
/*    */   }
/*    */ }

/* Location:           C:\Users\Jack\Downloads\oa\joffice131Tomcat6\joffice131Tomcat6\tomcat6-joffice\webapps\joffice1.3.1\WEB-INF\classes\
 * Qualified Name:     com.xpsoft.oa.service.flow.impl.ProUserAssignServiceImpl
 * JD-Core Version:    0.6.0
 */