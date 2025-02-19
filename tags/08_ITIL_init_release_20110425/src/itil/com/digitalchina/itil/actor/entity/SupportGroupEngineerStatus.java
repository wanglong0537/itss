package com.digitalchina.itil.actor.entity;

import com.digitalchina.info.framework.dao.BaseObject;
import com.digitalchina.info.framework.security.entity.UserInfo;

/**
 * ����ʦ״̬ʵ��
 * @Class Name SupportGroupEngineerStatus
 * @Author sa
 * @Create In 2009-3-19
 */
public class SupportGroupEngineerStatus extends BaseObject {
	public static String STATUS_IDLE = "idle"; //����
	public static String STATUS_BUSY = "busy"; //æµ
	
	private Long id;	
	private String name; //״̬
	private String keyword; //�ؼ��֣������ж�ʹ��
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getKeyword() {
		return keyword;
	}
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
}
