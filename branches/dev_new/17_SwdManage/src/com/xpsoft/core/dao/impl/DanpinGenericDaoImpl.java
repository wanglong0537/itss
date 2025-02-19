package com.xpsoft.core.dao.impl;

import java.io.Serializable;
import java.math.BigInteger;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.criterion.Projections;
import org.hibernate.hql.ast.QueryTranslatorImpl;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.xpsoft.core.command.CriteriaCommand;
import com.xpsoft.core.command.FieldCommandImpl;
import com.xpsoft.core.command.QueryFilter;
import com.xpsoft.core.command.SortCommandImpl;
import com.xpsoft.core.dao.DanpinGenericDao;
import com.xpsoft.core.web.paging.PagingBean;

public abstract class DanpinGenericDaoImpl<T, PK extends Serializable> extends
		HibernateDaoSupport implements DanpinGenericDao<T, PK> {
	protected Log logger = LogFactory.getLog(DanpinGenericDaoImpl.class);
	protected JdbcTemplate jdbcTemplate;
	protected Class persistType;
	protected Map<String, String> querys = new HashMap();

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	public void setPersistType(Class persistType) {
		this.persistType = persistType;
	}

	public DanpinGenericDaoImpl(Class persistType) {
		this.persistType = persistType;
	}

	public T get(PK id) {
		return (T) getHibernateTemplate().get(this.persistType, id);
	}
	
	public T load(PK id) {
		return (T) getHibernateTemplate().load(this.persistType, id);
	}

	public T save(T entity) {
		getHibernateTemplate().saveOrUpdate(entity);
		return entity;
	}

	public T merge(T entity) {
		getHibernateTemplate().merge(entity);
		return entity;
	}

	public void evict(T entity) {
		getHibernateTemplate().evict(entity);
	}

	/**
	 * return a page record of a table.
	 * 
	 * @param queryString
	 * @param values
	 * @param firstResult
	 * @param maxResults
	 * @return
	 */
	public List find(final String queryString, final Object[] values,
			final int firstResult, final int pageSize) {
		return (List) getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				Query queryObject = getSession().createQuery(queryString);
				if (values != null) {
					for (int i = 0; i < values.length; i++) {
						queryObject.setParameter(i, values[i]);
					}
				}
				if (pageSize > 0) {
					queryObject.setFirstResult(firstResult)
							.setMaxResults(pageSize).setFetchSize(pageSize);
				}
				return queryObject.list();
			}
		});
	}

	public List<T> getAll() {
		return (List) getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				String hql = "from "
						+ DanpinGenericDaoImpl.this.persistType.getName();
				Query query = session.createQuery(hql);
				return query.list();
			}
		});
	}

	@SuppressWarnings("unchecked")
	public List<T> getAll(final PagingBean pb) {
		final String hql = "from " + this.persistType.getName();
		int totalItems = getTotalItems(hql, null).intValue();
		pb.setTotalItems(totalItems);
		
		return (List) getHibernateTemplate().execute(new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						Query query = session.createQuery(hql);
						query.setFirstResult(pb.getFirstResult())
								.setFetchSize(pb.getPageSize().intValue());
						query.setMaxResults(pb.getPageSize()
								.intValue());
						return query.list();
					}
				});
	}

	/**
	 * 返回queryString查询返回的记录数
	 * 
	 * @param queryString
	 * @param values
	 * @return Long
	 */
	public Long getTotalItems(final String queryString, final Object[] values) {
		QueryTranslatorImpl queryTranslator = new QueryTranslatorImpl(
				queryString,
				queryString,
				java.util.Collections.EMPTY_MAP,
				(org.hibernate.engine.SessionFactoryImplementor) getSessionFactory());
		queryTranslator.compile(java.util.Collections.EMPTY_MAP, false);
		final String sql = "select count(*) from ("
				+ queryTranslator.getSQLString() + ") tmp_count_t";

		// logger.info("count sql:" + sql);
		// int idx = queryString.toUpperCase().indexOf("FROM ");
		// int idx2 = queryString.toUpperCase().indexOf(" ORDER BY ");
		// if (idx2 < 0) {
		// idx2 = queryString.length();
		// }
		// String hqlNoSelect = null;
		// if (idx > 0) {
		// hqlNoSelect = queryString.substring(idx, idx2);
		// } else {
		// hqlNoSelect = queryString.substring(0, idx2);
		// }
		// return ((Long) findUnique("select count(*) " + hqlNoSelect, values));

		BigInteger reVal = (BigInteger) getHibernateTemplate().execute(
				new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						SQLQuery query = session.createSQLQuery(sql);
						if (values != null) {
							for (int i = 0; i < values.length; i++) {
								query.setParameter(i, values[i]);
							}
						}
						return query.uniqueResult();
					}
				});

		return reVal.longValue();

	}

	public List<T> findByHql(final String hql, final Object[] objs) {
		return (List) getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				Query query = session.createQuery(hql);
				if (objs != null) {
					for (int i = 0; i < objs.length; i++) {
						query.setParameter(i, objs[i]);
					}
				}
				return (List<T>) query.list();
			}
		});
	}

	public List<T> findByHql(final String hql, final Object[] objs,
			final int firstResult, final int pageSize) {
		return (List) getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				Query query = session.createQuery(hql);
				query.setFirstResult(firstResult).setMaxResults(pageSize);
				if (objs != null) {
					for (int i = 0; i < objs.length; i++) {
						query.setParameter(i, objs[i]);
					}
				}
				return (List<T>) query.list();
			}
		});
	}

	public List<T> findByHql(String hql, Object[] objs, PagingBean pb) {
		int totalItems = getTotalItems(hql, objs).intValue();
		pb.setTotalItems(totalItems);
		return findByHql(hql, objs, pb.getFirstResult(), pb.getPageSize()
				.intValue());
	}

	public List<T> findByHql(String hql) {
		return findByHql(hql, null);
	}

	public void remove(PK id) {
		getHibernateTemplate().delete(get(id));
	}

	public void remove(T entity) {
		getHibernateTemplate().delete(entity);
	}

	/**
	 * 通过hql查找某个唯一的实体对象
	 * 
	 * @author QGH
	 * @param queryString
	 * @param values
	 * @return
	 */
	public Object findUnique(final String hql, final Object[] values) {
		return (Object) getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				Query query = session.createQuery(hql);

				if (values != null) {
					for (int i = 0; i < values.length; i++) {
						query.setParameter(i, values[i]);
					}
				}
				return query.uniqueResult();
			}
		});
	}

	public int getCountByFilter(final QueryFilter filter) {
		Integer count = (Integer) getHibernateTemplate().execute(
				new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						Criteria criteria = session.createCriteria(persistType);
						for (int i = 0; i < filter.getCommands().size(); i++) {
							CriteriaCommand command = filter.getCommands().get(
									i);
							if (!(command instanceof SortCommandImpl)) {
								criteria = command.execute(criteria);
							}
						}
						criteria.setProjection(Projections.rowCount());
						return criteria.uniqueResult();
					}
				});
		if (count == null)
			new Integer(0);
		return count.intValue();
	}

	public List getAll(final QueryFilter queryFilter) {

		if (StringUtils.isNotEmpty(queryFilter.getFilterName())) {
			return getAll2(queryFilter);
		}

		int totalCounts = getCountByFilter(queryFilter);
		// 设置总记录数
		queryFilter.getPagingBean().setTotalItems(totalCounts);

		List<T> resultList = (List<T>) getHibernateTemplate().execute(
				new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						Criteria criteria = session.createCriteria(persistType);
						// 重新清除alias的命名，防止计算记录行数后名称还存在该处
						queryFilter.getAliasSet().clear();
						setCriteriaByQueryFilter(criteria, queryFilter);
						return criteria.list();
					}
				});

		return resultList;
	}

	public List getAll2(QueryFilter queryFilter) {
		String hql = ((String) this.querys.get(queryFilter.getFilterName()))
				.trim();

		String newHql = null;
		String condition = null;
		String groupBy = null;

		int orderIndex = hql.toUpperCase().indexOf(" ORDER BY ");
		int whereIndex = hql.toUpperCase().indexOf(" WHERE ");

		if (orderIndex < 0) {
			orderIndex = hql.length();
		}
		if (whereIndex < 0) {
			whereIndex = hql.length();
		}

		if (whereIndex < 0) {
			condition = " where 1=1 ";
		} else {
			condition = hql.substring(whereIndex + 7, orderIndex);

			this.logger.debug("condition:" + condition);

			Pattern groupByPattern = Pattern.compile(" GROUP BY [\\w|.]+");
			Matcher m = groupByPattern.matcher(condition.toUpperCase());

			if (m.find()) {
				groupBy = condition.substring(m.start(), m.end());
				condition = condition.replace(groupBy, " ");
			}
			condition = " where (" + condition + ")";
		}

		String sortDesc = "";

		for (int i = 0; i < queryFilter.getCommands().size(); i++) {
			CriteriaCommand command = (CriteriaCommand) queryFilter
					.getCommands().get(i);
			if ((command instanceof FieldCommandImpl)) {
				condition = condition + " and "
						+ ((FieldCommandImpl) command).getPartHql();
			} else if ((command instanceof SortCommandImpl)) {
				if (!"".equals(sortDesc)) {
					sortDesc = sortDesc + ",";
				}
				sortDesc = sortDesc + ((SortCommandImpl) command).getPartHql();
			}
		}

		newHql = hql.substring(0, whereIndex);

		if (queryFilter.getAliasSet().size() > 0) {
			int fromIndex = newHql.indexOf(" FROM ");
			String entityAliasName = null;
			if (fromIndex > 0) {
				String afterFrom = newHql.substring(fromIndex + 6);

				String[] keys = afterFrom.split("[ ]");
				if ((keys.length > 1)
						&& (!keys[1].toUpperCase().equals("ORDER"))
						&& (!keys[1].toUpperCase().equals("JOIN"))) {
					entityAliasName = keys[1];
				}

				if (entityAliasName == null) {
					entityAliasName = "vo";
					newHql = newHql.replace(keys[0], keys[0] + " "
							+ entityAliasName);
				}

			}

			String joinHql = "";
			Iterator it = queryFilter.getAliasSet().iterator();
			while (it.hasNext()) {
				String joinVo = (String) it.next();
				joinHql = joinHql + " join " + entityAliasName + "." + joinVo
						+ " " + joinVo;
			}

			if (!"".equals(joinHql)) {
				newHql = newHql + joinHql;
			}
		}

		newHql = newHql + condition;

		if (groupBy != null) {
			newHql = newHql + groupBy + " ";
		}

		if (!"".equals(sortDesc))
			newHql = newHql + " order by " + sortDesc;
		else {
			newHql = newHql + hql.substring(orderIndex);
		}

		Object[] params = queryFilter.getParamValueList().toArray();

		int totalItems = getTotalItems(newHql, params).intValue();
		queryFilter.getPagingBean().setTotalItems(totalItems);
		if (this.logger.isDebugEnabled()) {
			this.logger.debug("new hql:" + newHql);
		}
		return find(newHql, params, queryFilter.getPagingBean()
				.getFirstResult(), queryFilter.getPagingBean().getPageSize()
				.intValue());
	}

	public void flush() {
		getHibernateTemplate().flush();
	}

	private Criteria setCriteriaByQueryFilter(Criteria criteria,
			QueryFilter filter) {
		for (int i = 0; i < filter.getCommands().size(); i++) {
			criteria = ((CriteriaCommand) filter.getCommands().get(i))
					.execute(criteria);
		}

		criteria.setFirstResult(filter.getPagingBean().getFirstResult());
		criteria.setMaxResults(filter.getPagingBean().getPageSize().intValue());

		return criteria;
	}

	public void setQuerys(Map<String, String> querys) {
		this.querys = querys;
	}
	public List findDataList(String sql) {
		List list=this.jdbcTemplate.queryForList(sql);
		return list;
	}
	
	 public boolean removeDatabySql(String sql){
		 try {
			this.jdbcTemplate.execute(sql);
		} catch (DataAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			 return false;
		}
		 return true;
	 } 
	 public boolean updateDatabySql(String sql){
		 try {
			this.jdbcTemplate.update(sql);
		} catch (DataAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			 return false;
		}
		 return true;
	 } 
}