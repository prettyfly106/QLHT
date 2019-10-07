package AjaxUtil;

//import intellsoft.db.DBUtil;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;


import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


//import com.sun.xml.internal.bind.v2.runtime.unmarshaller.XsiNilLoader.Array;

public class AjaxService extends HttpServlet {
	public HttpSession session;
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("text/plain; charset=UTF-8");//("application/json");
		session=req.getSession();
		String db_name="";
		//db_name=(String)session.getAttribute("db_name");
		db_name  =getServletContext().getInitParameter("db_info");
		session.setAttribute("db_name", db_name);
		// String body = getBody(req);
		String rt = "";
		try {
			StringBuffer jb = new StringBuffer();
			  String line = null;
			  try {
				  BufferedReader reader = req.getReader();
			    while ((line = reader.readLine()) != null)
			    	jb.append(line);
			  } catch (Exception e) { /*report an error*/ }
			  String reqData=jb.toString();
			rt=processRequest(db_name,reqData);
			resp.getWriter().print(rt);
		} catch (Exception e) {
			e.printStackTrace();
			StringWriter sw = new StringWriter();
			PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			String err=sw.toString();
			err=err.replaceAll("'", "");
			err=err.replaceAll("\\'", "");
			resp.getWriter().print("{result:'"+rt+"',error_code:1,error_msg:'"+err+"'}");
		}
		// System.out.println("author=" + author.id + " " + author.name);
	}
	private static String analyzeClass(Class clazz) throws JSONException
	  {
	    Method[] methods = clazz.getMethods();
	    JSONArray method_ar=new JSONArray();
	    for (int i = 0; i < methods.length; i++)
	    {
	      Method method = methods[i];
	      if (method.getDeclaringClass() != Object.class)
	      {
	        int mod = methods[i].getModifiers();
	        if (Modifier.isPublic(mod) && !Modifier.isStatic(mod))
	        {
	          Class[] param = method.getParameterTypes();
	          JSONObject mObj=new JSONObject();
	          mObj.put("method", method.getName());
	          JSONArray par_ar=new JSONArray();
	          for (int n = 0; n < param.length; n++)
	          {
	        	  par_ar.put(param[n].getName());
	          }
	          mObj.put("params", par_ar);
	          mObj.put("return", method.getReturnType().getName());
	          method_ar.put(mObj);
	        }
	      }
	    }
	    return method_ar.toString();
	  }
	private static Method findMethod(Class clazz,String method,int paramSize) {
		Method m=null;
		Method m_ar[]=clazz.getDeclaredMethods();
		for(int i=0;i<m_ar.length;i++) {
			if(m_ar[i].getName().equals(method)) {
				Class pc[]=m_ar[i].getParameterTypes();
				if(paramSize==pc.length) {
					m=m_ar[i];
					break;
				}
			}
		}
		return m;
	}
	private String processRequest(String db_name,String reqData)
			throws Exception {
			String rt="";
			//System.out.println("reqData="+reqData);
			//ReqMsg reqMsg = gson.fromJson(reqData, ReqMsg.class);
			AjaxJson ajaxJson = new AjaxJson(session);
			 
			//String _func=reqMsg.func;
			//String[] _params=reqMsg.params;
			JSONObject obj=null;
			try {
				System.out.println("Request="+reqData);
				obj=new JSONObject(reqData);
			} 
			catch (Exception e) { /*report an error*/ }
			String _class=obj.getString("class");
			String _func=obj.getString("func");
			
			String _uid=null;
			System.out.println("Call _func-->" + _func);
			JSONArray js_ar=obj.getJSONArray("params");
			String[] _params=new String[js_ar.length()];
			for(int i=0;i<js_ar.length();i++) {
				_params[i]=js_ar.getString(i);
			}
			
			String[][] data=null;
			if (_func.equalsIgnoreCase("register")) {
				String className=_params[0];
				Object _obj=session.getAttribute(className);
				Class cls=null;
				if(_obj==null) {
					cls = Class.forName("AjaxBpm."+className);
					_obj=cls.getConstructor(HttpSession.class).newInstance(session);
					//_obj=cls.newInstance();
				}
				else {
					cls=_obj.getClass();
				}
				rt=analyzeClass(cls);
				session.setAttribute(className,_obj);
				//rt="{result:'"+rt+"',error_code:0,error_msg:''}";
			}
			else {
				Object _obj=session.getAttribute(_class);
				Class cls=_obj.getClass();
				int p=_params.length;
				Method m=findMethod(cls,_func,p);
				if(m!=null) {
					String rtObj=(String)m.invoke(_obj, (Object[])_params);
				}
				
			}
		return rt;
	}
	



	
}
