/*    */ package com.xpsoft.oa.service.personal.impl;
/*    */ 
/*    */ import com.xpsoft.core.service.impl.BaseServiceImpl;
/*    */ import com.xpsoft.oa.dao.personal.HolidayRecordDao;
/*    */ import com.xpsoft.oa.model.personal.HolidayRecord;
/*    */ import com.xpsoft.oa.service.personal.HolidayRecordService;
/*    */ 
/*    */ public class HolidayRecordServiceImpl extends BaseServiceImpl<HolidayRecord>
/*    */   implements HolidayRecordService
/*    */ {
/*    */   private HolidayRecordDao dao;
/*    */ 
/*    */   public HolidayRecordServiceImpl(HolidayRecordDao dao)
/*    */   {
/* 15 */     super(dao);
/* 16 */     this.dao = dao;
/*    */   }
/*    */ }

/* Location:           C:\Users\Jack\Downloads\oa\joffice131Tomcat6\joffice131Tomcat6\tomcat6-joffice\webapps\joffice1.3.1\WEB-INF\classes\
 * Qualified Name:     com.xpsoft.oa.service.personal.impl.HolidayRecordServiceImpl
 * JD-Core Version:    0.6.0
 */