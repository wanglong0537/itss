package com.xpsoft.oa.dao.archive;

import com.xpsoft.core.dao.BaseDao;
import com.xpsoft.core.web.paging.PagingBean;
import com.xpsoft.oa.model.archive.ArchDispatch;
import com.xpsoft.oa.model.system.AppUser;
import java.util.List;

public abstract interface ArchDispatchDao extends BaseDao<ArchDispatch>
{
  public abstract List<ArchDispatch> findByUser(AppUser paramAppUser, PagingBean paramPagingBean);

  public abstract List<ArchDispatch> findRecordByArc(Long paramLong);
}

/* Location:           C:\Users\Jack\Downloads\oa\joffice131Tomcat6\joffice131Tomcat6\tomcat6-joffice\webapps\joffice1.3.1\WEB-INF\classes\
 * Qualified Name:     com.xpsoft.oa.dao.archive.ArchDispatchDao
 * JD-Core Version:    0.6.0
 */