/*    */ package com.xpsoft.test.admin;
/*    */ 
/*    */ import com.xpsoft.oa.dao.admin.BookSnDao;
/*    */ import com.xpsoft.oa.model.admin.BookSn;
/*    */ import com.xpsoft.test.BaseTestCase;
/*    */ import javax.annotation.Resource;
/*    */ import org.junit.Test;
/*    */ import org.springframework.test.annotation.Rollback;
/*    */ 
/*    */ public class BookSnDaoTestCase extends BaseTestCase
/*    */ {
/*    */ 
/*    */   @Resource
/*    */   private BookSnDao bookSnDao;
/*    */ 
/*    */   @Test
/*    */   @Rollback(false)
/*    */   public void add()
/*    */   {
/* 19 */     BookSn bookSn = new BookSn();
/*    */ 
/* 22 */     this.bookSnDao.save(bookSn);
/*    */   }
/*    */ }

/* Location:           C:\Users\Jack\Downloads\oa\joffice131Tomcat6\joffice131Tomcat6\tomcat6-joffice\webapps\joffice1.3.1\WEB-INF\classes\
 * Qualified Name:     com.xpsoft.test.admin.BookSnDaoTestCase
 * JD-Core Version:    0.6.0
 */