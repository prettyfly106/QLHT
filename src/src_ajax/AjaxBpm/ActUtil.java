package AjaxBpm;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;
/*
import org.activiti.engine.*;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.DelegationState;
import org.activiti.engine.task.Task;
import org.activiti.engine.task.TaskQuery;
*/
import org.json.JSONArray;
import org.json.JSONObject;


public class ActUtil {
	public HttpSession session;	 
//static ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
public ActUtil(HttpSession _session) { 
	   this.session=_session;
	   //this.db_name=(String)session.getAttribute("db_name");
}
public String startTask(String processName,String vars) {
	//processName="vacationRequest";
	//vars=[{"name":"employeeName","value":"Kermit"},{"name":"numberOfDays","value":"4"},{"name":"vacationMotivation","value":"I'm really tired!"}]
	String rt="";
	System.out.println("startTask="+processName+" vars="+vars);
	try {
		/*
		Map<String, Object> variables = null;
		JSONArray var_ar=new JSONArray(vars);
		variables=_JAtoHM(var_ar);
		RuntimeService runtimeService = processEngine.getRuntimeService();
		ProcessInstance processInstance = runtimeService.startProcessInstanceByKey(processName, variables);
		JSONObject jo=_PIToJO(processInstance);
		rt=jo.toString();
		System.out.println("startTask="+rt);
		*/
	}
	catch(Exception e) {
		e.printStackTrace();
	}
	return rt;
}
public String findTask(String _taskKey,String _filter) {
	String rt="";
	System.out.println("findTask="+_taskKey+" vars="+_filter);
	JSONArray ja=new JSONArray();
	
	try {
		/*
		JSONArray var_ar=new JSONArray(_filter);
		HashMap filter=_JAtoHM(var_ar);
		List tasks=_findTask(_taskKey,filter);
		try {
			Iterator it = tasks.iterator();
		    while (it.hasNext()) {
		    	Task task=(Task)it.next();
		    	
		    	JSONObject obj=_taskToJO(task);
		        ja.put(obj);
		    }
		    rt=ja.toString();
		    
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		*/
	}
	catch(Exception e) {
		e.printStackTrace();
	}
	System.out.println("tasks="+rt);
	return rt;
}


public void completeTask(String _taskId,String _vars) {
	System.out.println("findTask="+_taskId+" vars="+_vars);
}

}
