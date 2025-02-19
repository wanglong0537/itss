/*    */ package com.xpsoft.oa.service.communicate.impl;
/*    */ 
/*    */ import com.xpsoft.core.service.impl.BaseServiceImpl;
/*    */ import com.xpsoft.core.web.paging.PagingBean;
/*    */ import com.xpsoft.oa.dao.communicate.MailBoxDao;
/*    */ import com.xpsoft.oa.model.communicate.MailBox;
/*    */ import com.xpsoft.oa.service.communicate.MailBoxService;
/*    */ import java.util.List;
/*    */ 
/*    */ public class MailBoxServiceImpl extends BaseServiceImpl<MailBox>
/*    */   implements MailBoxService
/*    */ {
/*    */   private MailBoxDao dao;
/*    */ 
/*    */   public MailBoxServiceImpl(MailBoxDao dao)
/*    */   {
/* 18 */     super(dao);
/* 19 */     this.dao = dao;
/*    */   }
/*    */ 
/*    */   public Long CountByFolderId(Long folderId)
/*    */   {
/* 24 */     return this.dao.CountByFolderId(folderId);
/*    */   }
/*    */ 
/*    */   public List<MailBox> findByFolderId(Long folderId) {
/* 28 */     return this.dao.findByFolderId(folderId);
/*    */   }
/*    */ 
/*    */   public List<MailBox> findBySearch(String searchContent, PagingBean pb)
/*    */   {
/* 33 */     return this.dao.findBySearch(searchContent, pb);
/*    */   }
/*    */ }

/* Location:           C:\Users\Jack\Downloads\oa\joffice131Tomcat6\joffice131Tomcat6\tomcat6-joffice\webapps\joffice1.3.1\WEB-INF\classes\
 * Qualified Name:     com.xpsoft.oa.service.communicate.impl.MailBoxServiceImpl
 * JD-Core Version:    0.6.0
 */