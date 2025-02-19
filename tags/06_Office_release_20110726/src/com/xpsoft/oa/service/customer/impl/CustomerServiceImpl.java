/*    */ package com.xpsoft.oa.service.customer.impl;
/*    */ 
/*    */ import com.xpsoft.core.service.impl.BaseServiceImpl;
/*    */ import com.xpsoft.oa.dao.customer.CustomerDao;
/*    */ import com.xpsoft.oa.model.customer.Customer;
/*    */ import com.xpsoft.oa.service.customer.CustomerService;
/*    */ 
/*    */ public class CustomerServiceImpl extends BaseServiceImpl<Customer>
/*    */   implements CustomerService
/*    */ {
/*    */   private CustomerDao dao;
/*    */ 
/*    */   public CustomerServiceImpl(CustomerDao dao)
/*    */   {
/* 15 */     super(dao);
/* 16 */     this.dao = dao;
/*    */   }
/*    */ 
/*    */   public boolean checkCustomerNo(String customerNo)
/*    */   {
/* 21 */     return this.dao.checkCustomerNo(customerNo);
/*    */   }
/*    */ }

/* Location:           C:\Users\Jack\Downloads\oa\joffice131Tomcat6\joffice131Tomcat6\tomcat6-joffice\webapps\joffice1.3.1\WEB-INF\classes\
 * Qualified Name:     com.xpsoft.oa.service.customer.impl.CustomerServiceImpl
 * JD-Core Version:    0.6.0
 */