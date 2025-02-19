package com.digitalchina.itil.require.dao;

import com.digitalchina.info.framework.dao.support.Page;
import com.digitalchina.itil.config.extlist.entity.SRGroupFinanceInfo;
import com.digitalchina.itil.config.extlist.entity.SRManager;
import com.digitalchina.itil.config.extlist.entity.SRProjectNotice;
import com.digitalchina.itil.config.extlist.entity.SRServiceItem;
import com.digitalchina.itil.config.extlist.entity.SRServiceProvider;
import com.digitalchina.itil.config.extlist.entity.SRTransmisEngineer;
import com.digitalchina.itil.config.extlist.entity.SRprojectContracts;

public interface SRDao {
	/**
	 * 通过需求实体ID和类名获取对应的需求合同
	 * @Methods Name findContractByReq
	 * @Create In Mar 20, 2009 By lee
	 * @param reqId
	 * @param reqClass
	 * @return RequirementContract
	 */
	SRprojectContracts findContractByReq(String reqId);
	/**
	 * 通过需求实体ID和类名获取对应的项目发布公告
	 * @Methods Name findNoticeByReq
	 * @Create In Mar 26, 2009 By lee
	 * @param reqId
	 * @param reqClass
	 * @return ProjectNotice
	 */
	SRProjectNotice findNoticeByReq(String reqId);
	/**
	 * 通过需求实体ID和类名获取对应的需求服务项关系
	 * @Methods Name findRequirementService
	 * @Create In Mar 31, 2009 By lee
	 * @param reqId
	 * @param reqClass
	 * @return RequirementService
	 */
	SRServiceItem findRequirementService(String reqId);
	/**
	 * 通过需求实体ID和类名获取对应的需求对应服务供应商
	 * @Methods Name findRequirementServiceProvider
	 * @Create In Apr 3, 2009 By lee
	 * @param reqId
	 * @param reqClass
	 * @return RequirementServiceProvider
	 */
	SRServiceProvider findRequirementServiceProvider(String reqId);
	/**
	 * 通过需求实体ID和类名获取传输工程师
	 * @Methods Name findTransmissionEngineer
	 * @Create In Apr 7, 2009 By lee
	 * @param reqId
	 * @param reqClass
	 * @return ProjectTransmissionEngineer
	 */
	SRTransmisEngineer findTransmissionEngineer(String reqId);
	/**
	 * 获得内部服务商工程师
	 * @Methods Name findServiceEngineerIn
	 * @Create In Apr 3, 2009 By lee
	 * @param serviceId
	 * @return List<ServiceEngineerIn>
	 */
	Page findServiceEngineerIn(String serviceId, int pageNo, int pageSize);
	/**
	 * 获得外部服务商的服务工程师
	 * @Methods Name findServiceEngineerOut
	 * @Create In Apr 3, 2009 By Administrator
	 * @param serviceId
	 * @return List<ServiceEngineerOut>
	 */
//	Page findServiceEngineerOut(String serviceId, int pageNo, int pageSize);
	/**
	 * 获取集团财务信息
	 * @Methods Name findGroupGinanceInfo
	 * @Create In Apr 14, 2009 By gaowen
	 * @param dataId
	 * @param reqClass
	 * @return RequirementGroupFinanceInfo
	 */
	SRGroupFinanceInfo findGroupGinanceInfo(String dataId);
	
	
	/**
	 * 获取交付经理信息
	 * @Methods Name findSRManager
	 * @Create In Jun 25, 2009 By gaowen
	 * @param dataId
	 * @param reqClass
	 * @return  SRManager
	 */
	 SRManager  findSRManager(String dataId);
	 
	 /**
	  * 根据配置项名称获取应用软件类配置项
	  * @Methods Name findAppConfigItem
	  * @Create In Nov 25, 2009 By lee
	  * @param ciName
	  * @param appTypeId
	  * @param pageNo
	  * @param pageSize
	  * @return Page
	  */
	 Page findAppConfigItem(String ciName,Long appTypeId, int pageNo, int pageSize);
}
