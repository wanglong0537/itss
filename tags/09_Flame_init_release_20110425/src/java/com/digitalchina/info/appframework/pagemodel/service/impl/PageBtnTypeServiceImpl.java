package com.digitalchina.info.appframework.pagemodel.service.impl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.FetchMode;
import org.hibernate.criterion.Restrictions;

import com.digitalchina.info.appframework.pagemodel.entity.PageBtnType;
import com.digitalchina.info.appframework.pagemodel.entity.PagePanel;
import com.digitalchina.info.appframework.pagemodel.service.PageBtnTypeService;
import com.digitalchina.info.framework.dao.BaseDao;

public class PageBtnTypeServiceImpl extends BaseDao implements PageBtnTypeService {

	public PageBtnType findPageBtnTypeByName(String keyName) {
		PageBtnType pageBtnType = null;
		Criteria c = super.getCriteria(PageBtnType.class);
		c.add(Restrictions.eq("name", keyName));
		List list = c.list(); //��ֹ���ظ���¼
		if(!list.isEmpty()){
			pageBtnType = (PageBtnType) list.iterator().next();
		}
		return pageBtnType;
	}

}
