package com.xpsoft.oa.service.shop.impl;

import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.xpsoft.core.command.QueryFilter;
import com.xpsoft.core.service.impl.BaseServiceImpl;
import com.xpsoft.core.util.AppUtil;
import com.xpsoft.oa.dao.shop.SpPaKpiitem2userDao;
import com.xpsoft.oa.model.shop.SpPaDatadictionary;
import com.xpsoft.oa.model.shop.SpPaKpiitem2user;
import com.xpsoft.oa.service.shop.SpPaKpiitem2userService;

public class SpPaKpiitem2userServiceImpl extends BaseServiceImpl<SpPaKpiitem2user>
		implements SpPaKpiitem2userService {
	private SpPaKpiitem2userDao dao;
	
	public SpPaKpiitem2userServiceImpl(SpPaKpiitem2userDao dao) {
		super(dao);
		this.dao = dao;
	}
	/*
	 * 计算个人考核模板定性考核项的多人多次打分平均分数
	 * @param itemId
	 * 考核项ID
	 * */
	@SuppressWarnings("unchecked")
	public void calculateAvg(Long itemId) {
		DecimalFormat doubleFormat = new DecimalFormat();
		doubleFormat.applyPattern("###.00");
		//从授权考核模板关联的考核项中取到所有该考核项的打分记录
		String sql = "select id, weight, result from sp_pa_authpbcitem where akpiItem2uId = " + itemId;
		List<Map<String, Object>> list = this.findDataList(sql);
		Double totalResult = new Double(0);
		int gradeCount = 0;
		//Double totalWeight = new Double(1);
		for(int i = 0; i < list.size(); i++) {
			Map<String, Object> map = list.get(i);
			//判断是否已经打分，result为0则表示没有打分
			if(Double.parseDouble(map.get("result").toString()) != 0) {//已经打分，则进入计算
				totalResult += Double.parseDouble(map.get("result").toString());
				gradeCount++;
			}
		}
		//在跟人PBC模板关联的考核项中保存结果
		SpPaKpiitem2user item = this.get(itemId);
		//Double result = Double.valueOf(doubleFormat.format(avgResult + item.getResult() * totalWeight));
		if(gradeCount == 0) {
			item.setResult(new Double(0));
		} else {
			item.setResult(totalResult / gradeCount);
		}
		//保存相关联的绩效系数
		int resultIndex = 0;
		String sql2 = "select a.id, a.pisScore, a.coefficient from sp_pa_performanceindexscore a, sp_pa_kpiitem2user b where " +
				"b.id = " + itemId + " and a.piId = b.piId";
		List<Map<String, Object>> mapList2 = this.findDataList(sql2);
		for(int i = 0; i < mapList2.size() - 1; i++) {
			if((totalResult / gradeCount) >= Double.parseDouble(mapList2.get(i).get("pisScore").toString())) {
				resultIndex = i;
			}
		}
		item.setCoefficient(Double.parseDouble(mapList2.get(resultIndex).get("coefficient").toString()));
		//插入数据库
		this.save(item);
	}
	/*
	 * 批量计算考核模板关联所有考核项平均分
	 * @param pbcId
	 * 考核模板ID
	 * */
	public void multiCal(Long pbcId) {
		String sql = "select a.id from sp_pa_kpiitem2user a, sp_pa_performanceindex b where " +
				"a.pbcId = " + pbcId + " and a.piId = b.id and b.paMode = " + SpPaDatadictionary.PA_QUALITATIVE_ASSESSMENT;
		List<Map<String, Object>> mapList = this.findDataList(sql);
		for(int i = 0; i < mapList.size(); i++) {
			this.calculateAvg(Long.parseLong(mapList.get(i).get("id").toString()));
		}
	}
	/*
	 * 批量保存
	 * @param list
	 * 要保存的数据集
	 * */
	public void multiSave(List<SpPaKpiitem2user> list) {
		for(int i = 0; i < list.size(); i++) {
			this.save(list.get(i));
		}
	}
}
