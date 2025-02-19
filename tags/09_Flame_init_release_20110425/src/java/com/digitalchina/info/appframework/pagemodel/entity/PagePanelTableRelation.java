package com.digitalchina.info.appframework.pagemodel.entity;

import com.digitalchina.info.appframework.metadata.entity.SystemMainTable;
import com.digitalchina.info.appframework.metadata.entity.SystemMainTableColumn;
import com.digitalchina.info.framework.dao.BaseObject;

public class PagePanelTableRelation extends BaseObject {
	private Long id;
	private PagePanel pagePanel;
	private SystemMainTable systemMainTable;
	private SystemMainTableColumn systemMainTablePKColumn; //������չ
	private SystemMainTableColumn foreignTableColumn;
	private SystemMainTable foreignTable;
	
	public SystemMainTable getForeignTable() {
		return foreignTable;
	}
	public void setForeignTable(SystemMainTable foreignTable) {
		this.foreignTable = foreignTable;
	}
	public SystemMainTableColumn getForeignTableColumn() {
		return foreignTableColumn;
	}
	public void setForeignTableColumn(SystemMainTableColumn foreignTableColumn) {
		this.foreignTableColumn = foreignTableColumn;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public PagePanel getPagePanel() {
		return pagePanel;
	}
	public void setPagePanel(PagePanel pagePanel) {
		this.pagePanel = pagePanel;
	}
	public SystemMainTable getSystemMainTable() {
		return systemMainTable;
	}
	public void setSystemMainTable(SystemMainTable systemMainTable) {
		this.systemMainTable = systemMainTable;
	} 
	
}
