/*    */ package com.xpsoft.oa.service.admin.impl;
/*    */ 
/*    */ import com.xpsoft.core.service.impl.BaseServiceImpl;
/*    */ import com.xpsoft.core.web.paging.PagingBean;
/*    */ import com.xpsoft.oa.dao.admin.BookBorRetDao;
/*    */ import com.xpsoft.oa.model.admin.BookBorRet;
/*    */ import com.xpsoft.oa.service.admin.BookBorRetService;
/*    */ import java.util.List;
/*    */ 
/*    */ public class BookBorRetServiceImpl extends BaseServiceImpl<BookBorRet>
/*    */   implements BookBorRetService
/*    */ {
/*    */   private BookBorRetDao dao;
/*    */ 
/*    */   public BookBorRetServiceImpl(BookBorRetDao dao)
/*    */   {
/* 18 */     super(dao);
/* 19 */     this.dao = dao;
/*    */   }
/*    */ 
/*    */   public BookBorRet getByBookSnId(Long bookSnId)
/*    */   {
/* 25 */     return this.dao.getByBookSnId(bookSnId);
/*    */   }
/*    */ 
/*    */   public List getBorrowInfo(PagingBean pb)
/*    */   {
/* 31 */     return this.dao.getBorrowInfo(pb);
/*    */   }
/*    */ 
/*    */   public List getReturnInfo(PagingBean pb)
/*    */   {
/* 37 */     return this.dao.getReturnInfo(pb);
/*    */   }
/*    */ 
/*    */   public Long getBookBorRetId(Long snId)
/*    */   {
/* 42 */     return this.dao.getBookBorRetId(snId);
/*    */   }
/*    */ }

/* Location:           C:\Users\Jack\Downloads\oa\joffice131Tomcat6\joffice131Tomcat6\tomcat6-joffice\webapps\joffice1.3.1\WEB-INF\classes\
 * Qualified Name:     com.xpsoft.oa.service.admin.impl.BookBorRetServiceImpl
 * JD-Core Version:    0.6.0
 */