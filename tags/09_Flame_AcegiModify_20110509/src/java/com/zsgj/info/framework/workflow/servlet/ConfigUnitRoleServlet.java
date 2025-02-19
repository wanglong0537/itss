package com.zsgj.info.framework.workflow.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jbpm.graph.def.ProcessDefinition;

import com.zsgj.info.framework.context.ContextHolder;
import com.zsgj.info.framework.service.Service;
import com.zsgj.info.framework.workflow.DefinitionService;
import com.zsgj.info.framework.workflow.entity.VirtualDefinitionInfo;
import com.zsgj.info.framework.workflow.entity.VirtualNodeInfo;
import com.zsgj.info.framework.workflow.info.NodeInfo;

public class ConfigUnitRoleServlet extends HttpServlet{

	DefinitionService ds = (DefinitionService)ContextHolder.getBean("definitionService");
	Service service = (Service) ContextHolder.getBean("baseService");
	public void doGet(HttpServletRequest request,HttpServletResponse response)throws ServletException, IOException{ 
		doPost(request,response);
	}
	
	public void doPost(HttpServletRequest request ,HttpServletResponse response)throws ServletException, IOException {
		
		String nodeName = "";
		String nodeDesc = "";
		
		String virtualDefinitionInfoId = request.getParameter("virtualDefinitionInfoId");
		String nodeId = request.getParameter("nodeId");
		VirtualDefinitionInfo vitual = (VirtualDefinitionInfo) service.findUnique(VirtualDefinitionInfo.class, "id", Long.valueOf(virtualDefinitionInfoId));
		ProcessDefinition p = ds.getDefinitionById(vitual.getProcessDefinitionId());
		//得到虚拟流程和真实流程
		String processName = p.getName();
		String virtualDesc = vitual.getVirtualDefinitionDesc();
		
		List<VirtualNodeInfo> virturalNodes = service.find(VirtualNodeInfo.class,"virtualDefinitionInfo", vitual);
		//得到所有的虚拟节点
		for (VirtualNodeInfo node : virturalNodes) {
			if (Long.valueOf(nodeId).equals(node.getNodeId())) {
				nodeName = node.getVirtualNodeName();
				nodeDesc = node.getVirtualNodeDesc();
			}
		}
		String url= "/infoAdmin/workflow/configPage/configUnitRole.jsp";
		request.setAttribute("virtualDesc", virtualDesc);
		request.setAttribute("processName", processName);
		request.setAttribute("nodeName",nodeName);
		request.setAttribute("virtualDefinitionInfoId", virtualDefinitionInfoId);
		request.setAttribute("nodeId",nodeId);
		RequestDispatcher rd = getServletContext().getRequestDispatcher(url);   
        rd.forward(request,response);   
		response.setContentType("text/plain");
		PrintWriter out = response.getWriter();
		out.flush();
		out.close();
		
		
	}
}
//String nodeId = request.getParameter("nodeId");
//ProcessDefinition def = ds.getDefinitionById(Long.valueOf(virtualDefinitionInfoId));
//String processName = def.getName();
//List<NodeInfo> nodes = ds.getAllNodes(processName);
//for(NodeInfo node : nodes){
//	if(node.getId()==Long.valueOf(nodeId)||nodeId.equals(node.getId()+"")){				
//		nodeName = node.getNodeName();				
//	}
//}
