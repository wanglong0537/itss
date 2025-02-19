package com.xpsoft.core.dao;

import com.xpsoft.core.command.QueryFilter;
import com.xpsoft.core.web.paging.PagingBean;
import java.io.Serializable;
import java.util.List;

public abstract interface GenericDao<T, PK extends Serializable>
{
  public abstract T save(T paramT);

  public abstract T merge(T paramT);

  public abstract T get(PK paramPK);
  
  public abstract T load(PK paramPK);

  public abstract void remove(PK paramPK);

  public abstract void remove(T paramT);

  public abstract void evict(T paramT);

  public abstract List<T> getAll();

  public abstract List<T> getAll(PagingBean paramPagingBean);

  public abstract List<T> getAll(QueryFilter paramQueryFilter);

  public abstract List<T> findByHql(String paramString, Object[] paramArrayOfObject);

  public abstract List<T> findByHql(String paramString, Object[] paramArrayOfObject, PagingBean paramPagingBean);

  public abstract List<T> findByHql(String paramString, Object[] paramArrayOfObject, int paramInt1, int paramInt2);

  public abstract void flush();
  
  public abstract List findDataList(String sql);
  
  public abstract boolean removeDatabySql(String sql); 
  
  public abstract boolean updateDatabySql(String sql);
}