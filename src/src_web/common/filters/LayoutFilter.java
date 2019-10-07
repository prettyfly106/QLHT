package common.filters;

import javax.servlet.*;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

import java.io.*;

import CommonLib.common.UserInfo;

/**
 * File : common.filters.LayoutFilter
 * Author: Nguyen Cong Thuan
 * Called by :
 * Calls :
 * Input:
 *          duong dan cua file layout duoc luu trong bien layOutFilePath
 *          cua file cau hinh web.xml
 * Operation description:
 *          Filter nay thuc hien ghep response cua servlet hoac trang JSP
 *          vao trong phan {content} cua mot file html layout
 * Output:
 * Date of creation: Jun 20, 2003 - 11:23:17 AM
 * Date of last changes:
 */

public class LayoutFilter extends MyGenericFilter{
	//Logger logger = Logger.getLogger(LayoutFilter.class);
    private static final String myDebugName = "LayoutFilter : ";
    private static final String fileEncoding = "UTF-8"; //Encode cua file layout
    private static final String layoutFileSeperator = "{content}";
    private String preFileContent_en ; //nua truoc cua file theo tieng Anh
    private String postFileContent_en ; //nua sau cua file theo tieng Anh
    private String preFileContent_vi ; //nua truoc cua file theo tieng Viet
    private String postFileContent_vi ; //nua sau cua file theo tieng Viet
    private String layOutFilePath_popup; //doi voi cac form popup
    
    String appPath = "";
    public void doFilter(final ServletRequest request, final ServletResponse response,
    FilterChain chain) throws IOException, ServletException
    {
    	try {
	    	HttpServletRequest req=(HttpServletRequest) request;
	    	HttpSession session = req.getSession(false);
			if (session == null)
			{
				//Day la truong hop vao trang login hoac validateUser
				chain.doFilter(request, response);
				return;
			}
			UserInfo userInfo = (UserInfo)session.getAttribute("userInfo");
			String contextPath=req.getContextPath();
			
	        GenericResponseWrapper wrapper = new GenericResponseWrapper((HttpServletResponse) response);
	        chain.doFilter(request,wrapper);
	        
	        String contentType = wrapper.getContentType();
	        //logger.info("chain.doFilter(request,wrapper);="+contentType);
	        String preFileContent,postFileContent;
	        //response.setContentType(contentType);
	        ServletOutputStream out = response.getOutputStream();
	        if (contentType!=null)
	        {
	            if (contentType.indexOf("text/html")<0)
	            {
	                out.write(wrapper.getData());
	                out.close();
	                return;
	            }
	        } else
	        {
	            try{
	                response.setContentType("text/html; charset=utf-8");
	            }catch(Exception e){
	                //logger.info("setContentType error");
	            }
	        }
	        
	        Boolean useFilter = (Boolean)(request.getAttribute("useFilter"));
	        if (useFilter ==null)
	        {
	            String strUseFilter = request.getParameter("useFilter");
	            if (strUseFilter!=null)
	            {
	                useFilter = new Boolean(strUseFilter);
	            }
	            else
	            {
	                useFilter = new Boolean(true);
	            }
	        }
	        String lang=request.getParameter("lang");
	        String _lang="";
	        if(lang==null||lang.equalsIgnoreCase("")) {
	        	lang=(String)session.getAttribute("lang");
	        	//System.out.println("--------------------------------------\n\n\n--**********---_lang:"+ _lang);
	        	if(lang==null||lang.equalsIgnoreCase("")) {
	        		lang="";
	        		session.setAttribute("lang",lang);
	        	}
	        	else {
	        		_lang="_"+lang;
	        	}
	        }
	        else if (lang.equalsIgnoreCase("vn")){
	        	lang = "";
	        	session.setAttribute("lang",lang);
	        	_lang= "";
	        }
	        else {
	        	session.setAttribute("lang",lang);
	        	_lang="_"+lang;
	        }
	        //out
			String userMenuFile="" ;
	        String user_name="";
	        String team_name="";
	        //StringBuffer InformationAboutCurrentUser=new StringBuffer();
	        if(userInfo!=null){
	            user_name=userInfo.full_name;
	            team_name="";//userInfo.getTeam_name();
	        }
	        //logger.info("&&&&&&&&&&&&&&&&&&& user="+user_name+" link=" + ((HttpServletRequest)request).getRequestURI());	        
			if (lang==null || lang.equalsIgnoreCase("")) {
				userMenuFile =  userInfo.user_group_id+"_2_"+"vn";
			}
			else if (lang.equalsIgnoreCase("en")) {
				userMenuFile =  userInfo.user_group_id+"_2_"+"en";
			}
	        if (request.getLocale().getLanguage()=="vi") //Vietnamese
	        {
	            //Tam thoi bo qua viec su dung moi nhom mot menu, tam thoi su dung chung mot menu 17_11_vn.js
	            //Chi chan link, khong tu tao menu dong
	            preFileContent = preFileContent_vi;
	            postFileContent = postFileContent_vi;
				/*if (userInfo!=null)
				userMenuFile =  userInfo.user_group_id+"_2_"+"vn";*/
				
	            //userMenuFile ="17_11_vn.js";
	        }
	        else
	        {
	            preFileContent = preFileContent_en;
	            postFileContent = postFileContent_en;
				/*if (userInfo!=null)
	                userMenuFile = userInfo.user_group_id+"_2_"+"vn";*/
				//userMenuFile = userInfo.getUser_group_id()+"_"+CommonConstants.app_CabmanWeb+"_"+"en.js";
	            //userMenuFile = "17_11_vn.js";
	        }
	        /*
	        String fn = appPath+"common/script/newmenu/"+userInfo.hospital_id+"_"+userMenuFile;
	        logger.info("-------------------fn="+fn);
	        File f = new File(fn+".xml");
	        if(f.exists())
	        {
	        	userMenuFile=userInfo.hospital_id+"_"+userMenuFile;
	        } 
			*/
	        	
	
	        //logger.info("xxxxx***********************************************"+userMenuFile);
			if (userInfo!=null ) 
			{
				String session_id = session.getId();
				preFileContent = preFileContent.replaceAll("\\{session_id\\}",session_id);
				postFileContent = postFileContent.replaceAll("\\{session_id\\}",session_id);
	            preFileContent = preFileContent.replaceAll("UserMenuFile",userMenuFile);
	            postFileContent = postFileContent.replaceAll("UserMenuFile",userMenuFile);
	            preFileContent = preFileContent.replaceAll("clientip",userInfo.clientIP);    
	            /*preFileContent = preFileContent.replaceAll("InformationAboutCurrentUser", InformationAboutCurrentUser.toString());
	            postFileContent = postFileContent.replaceAll("InformationAboutCurrentUser", InformationAboutCurrentUser.toString());*/
	            preFileContent = preFileContent.replaceAll("user_name",""+user_name);
	            postFileContent = postFileContent.replaceAll("user_name", ""+user_name);
	            preFileContent = preFileContent.replaceAll("team_name", ""+team_name);
	            postFileContent = postFileContent.replaceAll("team_name", ""+team_name);
			}
			preFileContent = preFileContent.replaceAll("\\{ROOT\\}", contextPath);
	        postFileContent = postFileContent.replaceAll("\\{ROOT\\}", contextPath);
	        preFileContent = preFileContent.replaceAll("\\{lang\\}", lang);
	        postFileContent = postFileContent.replaceAll("\\{lang\\}", lang);
			
			//logger.info("xxxxx***********************************************\n\n\n\n\n\n\nuseFilter="+useFilter);
	        if (useFilter.booleanValue())
	        { 
	        	String db_schema=""+userInfo.db_schema;
	        	preFileContent=preFileContent.replaceAll("\\{db_schema\\}",db_schema);
	        	//logger.info("preFileContent="+preFileContent);
	            out.write(preFileContent.getBytes(fileEncoding));
	        }
	        out.write(wrapper.getData());
	        if (useFilter.booleanValue())
	        {
	            out.write(postFileContent.getBytes(fileEncoding));
	        }
	        out.close();
    	}catch(Exception e) {
    		e.printStackTrace();
    		((HttpServletResponse)response).sendRedirect(((HttpServletRequest)request).getContextPath());
    		return;
    	}
    }

    public void init(final FilterConfig filterConfig)
    {
        super.init(filterConfig);
        //TextTemplate oTpl=new TextTemplate();
        
    	appPath =filterConfig.getServletContext().getRealPath("/").replace('\\', '/');
        String layOutFilePath = filterConfig.getServletContext().getRealPath("/").replace('\\', '/')+filterConfig.getInitParameter("layOutFilePath_en");
        System.out.println("------------------------------*************************************layOutFilePath:"+ layOutFilePath);
        String layOutFileContent;
        //Doc file layout english
        layOutFileContent = getFileContent(layOutFilePath,fileEncoding);
        int separatePos = layOutFileContent.indexOf(layoutFileSeperator);
        System.out.println("separatePos------------------------------:"+separatePos);
        preFileContent_en = layOutFileContent.substring(0,separatePos);
        postFileContent_en = layOutFileContent.substring(separatePos + layoutFileSeperator.length(), layOutFileContent.length());
        //Doc file layout tieng viet
        layOutFilePath = filterConfig.getServletContext().getRealPath("/").replace('\\', '/')+filterConfig.getInitParameter("layOutFilePath_vi");
        //Lay du lieu tu file layout

        layOutFileContent = getFileContent(layOutFilePath,fileEncoding);
        separatePos = layOutFileContent.indexOf(layoutFileSeperator);
        preFileContent_vi = layOutFileContent.substring(0,separatePos);
        postFileContent_vi = layOutFileContent.substring(separatePos + layoutFileSeperator.length(), layOutFileContent.length());

        preFileContent_en=preFileContent_vi;
        postFileContent_en=postFileContent_vi;
    }

    private String getFileContent(String fName, String charsetName)
    {
    	File f = new java.io.File (fName);
        int lenFile = (int) f.length(); //No checking so template-file is not big
        BufferedReader bf;
        try
        {
            bf = new BufferedReader(new InputStreamReader(new FileInputStream(fName),charsetName));
        }
        catch (java.io.FileNotFoundException fnfe)
        {
            throw new RuntimeException(myDebugName + "Error : Khong thay file: " + fName);
        }
        catch (UnsupportedEncodingException uee)
        {
            throw new RuntimeException(myDebugName + "Error : Khong ho tro kieu encode nay: " + charsetName);
        }
        StringBuffer line = new StringBuffer(lenFile+1024);
        try
        {
            while (bf.ready()) {
                line.append(bf.readLine() + "\n");
            }
            bf.close();
        } catch (java.io.IOException ioe)
        {
            throw new RuntimeException(myDebugName + "Error : Loi truy cap file: " + fName);
        }
        return line.toString();
    }
}
