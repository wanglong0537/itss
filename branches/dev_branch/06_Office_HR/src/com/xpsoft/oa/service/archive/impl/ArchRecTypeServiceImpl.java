/*    */ package com.xpsoft.oa.service.archive.impl;
/*    */ 
/*    */ import com.xpsoft.core.service.impl.BaseServiceImpl;
/*    */ import com.xpsoft.oa.dao.archive.ArchRecTypeDao;
/*    */ import com.xpsoft.oa.model.archive.ArchRecType;
/*    */ import com.xpsoft.oa.service.archive.ArchRecTypeService;
/*    */ 
/*    */ public class ArchRecTypeServiceImpl extends BaseServiceImpl<ArchRecType>
/*    */   implements ArchRecTypeService
/*    */ {
/*    */   private ArchRecTypeDao dao;
/*    */ 
/*    */   public ArchRecTypeServiceImpl(ArchRecTypeDao dao)
/*    */   {
/* 15 */     super(dao);
/* 16 */     this.dao = dao;
/*    */   }
/*    */ }

/* Location:           C:\Users\Jack\Downloads\oa\joffice131Tomcat6\joffice131Tomcat6\tomcat6-joffice\webapps\joffice1.3.1\WEB-INF\classes\
 * Qualified Name:     com.xpsoft.oa.service.archive.impl.ArchRecTypeServiceImpl
 * JD-Core Version:    0.6.0
 */