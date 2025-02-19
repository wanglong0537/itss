package com.jeecms.cms.manager.main;

import java.util.List;
import java.util.Map;

import com.jeecms.cms.entity.main.CmsUser;
import com.jeecms.cms.entity.main.Content;
import com.jeecms.cms.entity.main.ContentExt;
import com.jeecms.cms.entity.main.ContentTxt;
import com.jeecms.cms.entity.main.Content.ContentStatus;
import com.jeecms.common.page.Pagination;

public interface ContentMng {
	public Pagination getPageByRight(String title, Integer typeId,
			Integer inputUserId, boolean topLevel, boolean recommend,
			ContentStatus status, Byte checkStep, Integer siteId,
			Integer channelId, Integer userId, int orderBy, int pageNo,
			int pageSize);

	/**
	 * 获得文章分页。供会员中心使用。
	 * 
	 * @param title
	 *            文章标题
	 * @param channelId
	 *            栏目ID
	 * @param siteId
	 *            站点ID
	 * @param memberId
	 *            会员ID
	 * @param pageNo
	 *            页码
	 * @param pageSize
	 *            每页大小
	 * @return 文章分页对象
	 */
	public Pagination getPageForMember(String title, Integer channelId,
			Integer siteId, Integer memberId, int pageNo, int pageSize);

	/**
	 * 根据内容ID数组获取文章列表
	 * 
	 * @param ids
	 * @param orderBy
	 * @return
	 */
	public List<Content> getListByIdsForTag(Integer[] ids, int orderBy);

	public Content getSide(Integer id, Integer siteId, Integer channelId,
			boolean next);
	
	public Content getSide(Integer id, Integer siteId, Integer channelId,
			boolean next, String jounalNum, String forum);

	public Pagination getPageBySiteIdsForTag(Integer[] siteIds,
			Integer[] typeIds, Boolean titleImg, Boolean recommend,
			String title, int orderBy, int pageNo, int pageSize);

	public List<Content> getListBySiteIdsForTag(Integer[] siteIds,
			Integer[] typeIds, Boolean titleImg, Boolean recommend,
			String title, int orderBy, Integer first, Integer count);

	public Pagination getPageByChannelIdsForTag(Integer[] channelIds,
			Integer[] typeIds, Boolean titleImg, Boolean recommend,
			String title, int orderBy, int option, int pageNo, int pageSize);
	
	public Pagination getPageByChannelIdsForTag(Integer[] channelIds,
			Integer[] typeIds, Boolean titleImg, Boolean recommend,
			String title, int orderBy, int option, int pageNo, int pageSize, String customizes);
	
	public List<Content> getListByChannelIdsForTag(Integer[] channelIds,
			Integer[] typeIds, Boolean titleImg, Boolean recommend,
			String title, int orderBy, int option, Integer first, Integer count);
	
	public List<Content> getListByChannelIdsForTag(Integer[] channelIds,
			Integer[] typeIds, Boolean titleImg, Boolean recommend,
			String title, int orderBy, int option, Integer first, Integer count, String customizes);
	
	public Pagination getPageByChannelPathsForTag(String[] paths,
			Integer[] siteIds, Integer[] typeIds, Boolean titleImg,
			Boolean recommend, String title, int orderBy, int pageNo,
			int pageSize);

	public List<Content> getListByChannelPathsForTag(String[] paths,
			Integer[] siteIds, Integer[] typeIds, Boolean titleImg,
			Boolean recommend, String title, int orderBy, Integer first,
			Integer count);

	public Pagination getPageByTopicIdForTag(Integer topicId,
			Integer[] siteIds, Integer[] channelIds, Integer[] typeIds,
			Boolean titleImg, Boolean recommend, String title, int orderBy,
			int pageNo, int pageSize);

	public List<Content> getListByTopicIdForTag(Integer topicId,
			Integer[] siteIds, Integer[] channelIds, Integer[] typeIds,
			Boolean titleImg, Boolean recommend, String title, int orderBy,
			Integer first, Integer count);

	public Pagination getPageByTagIdsForTag(Integer[] tagIds,
			Integer[] siteIds, Integer[] channelIds, Integer[] typeIds,
			Integer excludeId, Boolean titleImg, Boolean recommend,
			String title, int orderBy, int pageNo, int pageSize);

	public List<Content> getListByTagIdsForTag(Integer[] tagIds,
			Integer[] siteIds, Integer[] channelIds, Integer[] typeIds,
			Integer excludeId, Boolean titleImg, Boolean recommend,
			String title, int orderBy, Integer first, Integer count);

	public Content findById(Integer id);

	public Content save(Content bean, ContentExt ext, ContentTxt txt,
			Integer[] channelIds, Integer[] topicIds, Integer[] viewGroupIds,
			String[] tagArr, String[] attachmentPaths,
			String[] attachmentNames, String[] attachmentFilenames,
			String[] picPaths, String[] picDescs, Integer channelId,
			Integer typeId, Boolean draft, CmsUser user, boolean forMember);

	public Content update(Content bean, ContentExt ext, ContentTxt txt,
			String[] tagArr, Integer[] channelIds, Integer[] topicIds,
			Integer[] viewGroupIds, String[] attachmentPaths,
			String[] attachmentNames, String[] attachmentFilenames,
			String[] picPaths, String[] picDescs, Map<String, String> attr,
			Integer channelId, Integer typeId, Boolean draft, CmsUser user,
			boolean forMember);

	public Content check(Integer id, CmsUser user);

	public Content[] check(Integer[] ids, CmsUser user);

	public Content reject(Integer id, CmsUser user, Byte step, String opinion);

	public Content[] reject(Integer[] ids, CmsUser user, Byte step,
			String opinion);

	public Content cycle(Integer id);

	public Content[] cycle(Integer[] ids);

	public Content recycle(Integer id);

	public Content[] recycle(Integer[] ids);

	public Content deleteById(Integer id);

	public Content[] deleteByIds(Integer[] ids);
}