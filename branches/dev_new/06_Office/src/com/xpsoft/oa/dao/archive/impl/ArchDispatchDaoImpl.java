package com.xpsoft.oa.dao.archive.impl;

import com.xpsoft.core.dao.impl.BaseDaoImpl;
import com.xpsoft.core.web.paging.PagingBean;
import com.xpsoft.oa.dao.archive.ArchDispatchDao;
import com.xpsoft.oa.model.archive.ArchDispatch;
import com.xpsoft.oa.model.system.AppRole;
import com.xpsoft.oa.model.system.AppUser;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

public class ArchDispatchDaoImpl extends BaseDaoImpl<ArchDispatch> implements
		ArchDispatchDao {
	public ArchDispatchDaoImpl() {
		/* 19 */super(ArchDispatch.class);
	}

	public List<ArchDispatch> findByUser(AppUser user, PagingBean pb) {
		/* 24 */Iterator it = user.getRoles().iterator();
		/* 25 */StringBuffer sb = new StringBuffer();
		/* 26 */while (it.hasNext()) {
			/* 27 */if (sb.length() > 0) {
				/* 28 */sb.append(",");
			}
			/* 30 */sb.append(((AppRole) it.next()).getRoleId().toString());
		}
		/* 32 */StringBuffer hql = new StringBuffer(
				"from ArchDispatch vo where vo.archUserType=2 and vo.isRead=0 and (vo.userId=?");
		/* 33 */if (sb.length() > 0) {
			/* 34 */hql.append(" or vo.disRoleId in (" + sb + ")");
		}
		/* 36 */hql.append(") order by vo.dispatchId desc");
		/* 37 */Object[] objs = { user.getUserId() };
		/* 38 */return findByHql(hql.toString(), objs, pb);
	}

	public List<ArchDispatch> findRecordByArc(Long archivesId) {
		/* 43 */String hql = "from ArchDispatch vo where (vo.archUserType=0 or vo.archUserType=1) and vo.archives.archivesId=?";
		/* 44 */Object[] objs = { archivesId };
		/* 45 */return findByHql(hql, objs);
	}
	
	public List<ArchDispatch> findRecordByArc(Long archivesId, Short type) {
		String hql = null;
		if(type.equals(Short.valueOf("0"))){
			hql = "from ArchDispatch vo where vo.archUserType=0 and vo.archives.archivesId=?";
		}else{
			hql = "from ArchDispatch vo where vo.archUserType=1 and vo.archives.archivesId=?";
		}
		Object[] objs = { archivesId };
		return findByHql(hql, objs);
	}
}
