package com.xpsoft.oa.service.kpi.impl;

import java.util.List;
import java.util.Map;

import com.xpsoft.core.service.impl.BaseServiceImpl;
import com.xpsoft.oa.dao.kpi.HrPaAssessmentcriteriaDao;
import com.xpsoft.oa.model.kpi.HrPaAssessmentcriteria;
import com.xpsoft.oa.service.kpi.HrPaAssessmentcriteriaService;

public class HrPaAssessmentcriteriaServiceImpl extends BaseServiceImpl<HrPaAssessmentcriteria>
	implements HrPaAssessmentcriteriaService{
	private HrPaAssessmentcriteriaDao dao;
	
	public HrPaAssessmentcriteriaServiceImpl(HrPaAssessmentcriteriaDao dao){
		super(dao);
		this.dao = dao;
	}
	/*
	 * 取得所有考核标准关键字和名称
	 * */
	public Map<String, String> getKeyAndName(Long depId) {
		return this.dao.getKeyAndName(depId);
	}
	/*
	 * 判断关键字是否存在
	 * @param key
	 * 要判断的关键字
	 * */
	public boolean checkKey(String key, long id) {
		boolean flag = false;
		String sql = "select id from hr_pa_assessmentcriteria where publishStatus = 3 and acKey = '" + key + "'";
		sql += (id == 0) ? "" : " and id <> " + id + " and id <> (select fromAc from hr_pa_assessmentcriteria where id = " + id + ")";
		List<Map<String, Object>> list = this.findDataList(sql);
		if(list.size() > 0) {//list里边有数据，表明关键字重复
			flag = true;
		}
		return flag;
	}
	/*
	 * 批量导入考核标准
	 * */
	public boolean multiSave(List<HrPaAssessmentcriteria> list) {
		for(HrPaAssessmentcriteria ac : list) {
			try {
				this.save(ac);
			} catch(Exception e) {
				e.printStackTrace();
				return false;
			}
		}
		return true;
	}
}
