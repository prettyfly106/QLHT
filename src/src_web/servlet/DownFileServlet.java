package servlet;
/*
 * ducnm
 */
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.Reader;
import java.sql.Blob;
import java.sql.CallableStatement;
import java.sql.Clob;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Date;
import java.util.Enumeration;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;

import com.vsc.util.DateUtil;

import CommonLib.common.UserInfo;
import intellsoft.db.*;
import oracle.jdbc.OracleTypes;
import oracle.sql.BLOB;
import oracle.sql.CLOB;


public class DownFileServlet extends HttpServlet {

	//Logger logger = Logger.getLogger(DownFileServlet.class);
	private static final long serialVersionUID = 7277133933361004940L;
	// private PrintWriter out;
	private UserInfo userInfo;
	private int content_type = 0;
//	String db_name = "jdbc:oracle:thin:his_esb/123@172.16.80.42:1521:db01";
//	String db_name = "jdbc:oracle:thin:his_esb/123@123.31.27.51:1521:db01";
	String dbCommon_name; 
	String dbCommon_schema;
	public void init(ServletConfig config) throws ServletException {
		super.init(config);				
		dbCommon_name  =getServletContext().getInitParameter("db_name");
		dbCommon_schema  =getServletContext().getInitParameter("db_schema");
	}

	public final void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	} 

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String filepath = request.getParameter("filepath");
		String tmp = request.getParameter("content_type");
		if(tmp!=null){
			try{
				content_type = Integer.parseInt(tmp);
			}catch(Exception e){
			}
		}		
		System.out.println(content_type);
		String messageReturn = null;	
		if(filepath!=null){    		
			try {
				if(content_type==1)
					downloadCLOBFile(filepath,response);
				else if(content_type==2)
					downloadBLOBFile(filepath,response);
				else if(content_type==3)
					downloadBinFile(filepath,response);
				else
					messageReturn = "Can not find your kind of file resource that you want";
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				messageReturn = "Process downloading file got the error";
			}
	    }else{
	    	messageReturn = "Can not find your file identify";	    	
      	}
		if(messageReturn!=null){
			PrintWriter out = response.getWriter();        
	        out.write(messageReturn);
		}
		
	}
	
	private void downloadBinFile(String filepath, HttpServletResponse response) {
		// TODO Auto-generated method stub
		
	}

	private void downloadBLOBFile(String fileName, HttpServletResponse response) {
		// TODO Auto-generated method stub
		int BUFF_SIZE = 4096;		
		try {			
			ServletOutputStream outputStream = response.getOutputStream();
			byte[] arr_in = getBlobContent(fileName);
			ByteArrayInputStream in = new ByteArrayInputStream(arr_in);			
			ByteArrayOutputStream out = new ByteArrayOutputStream();		
			response.setContentType("APPLICATION/OCTET-STREAM");   
	  		response.setHeader("Content-Disposition","attachment; filename=\"" + DateUtil.formatDate(new Date(),"yyyyMMddHHmmss").concat("_").concat(fileName).concat(".zip") + "\"");   
			byte[] buffer = new byte[BUFF_SIZE];			
			int bytesRead = -1;
			//copy binary content to output stream
			while((bytesRead = in.read(buffer)) != -1)
			{
				out.write(buffer, 0, bytesRead);
			}
			out.writeTo(outputStream);
			in.close();
			out.flush();
			out.close();
			outputStream.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
			
	}

	private byte[] getBlobContent(String fileName) {
		// TODO Auto-generated method stub
		return getBlobContent("{? = call GET_EXPORTED_KCB(?)}",new Integer(fileName));
//		return readBlob("select NOIDUNG_FILENEN from PT_BHYT_PHEDUYET where pheduyet_id="+fileName);		
	}

	private void downloadCLOBFile(String fileName, HttpServletResponse response) throws IOException, Exception{
		ServletOutputStream out = response.getOutputStream();
		int BUFF_SIZE = 4096;		
		String content = getContent(fileName);					
		InputStream in = new ByteArrayInputStream(content.getBytes("UTF-8"));
		//InputStream in = IOUtils.toInputStream(xmldata,"UTF-8");			
		response.setContentType("APPLICATION/OCTET-STREAM");   
  		response.setHeader("Content-Disposition","attachment; filename=\"" + DateUtil.formatDate(new Date(),"yyyyMMddHHmmss").concat("_").concat(fileName).concat(".xml") + "\"");   
		byte[] outputByte = new byte[BUFF_SIZE];
		int bytesRead = -1;
		//copy binary contect to output stream
		while((bytesRead = in.read(outputByte)) != -1)
		{
			out.write(outputByte, 0, bytesRead);
		}
		in.close();
		out.flush();
		out.close();
	}
	private String getContent(String fileName){
		return getLargeContent("{? = call GET_NOIDUNG_PHEDUYET(?)}",new Integer(fileName));
	}
	
	private String getLargeContent(String sql, Object... aObjs) {		
		Connection connection = DBUtil.getRawConnection(dbCommon_name);
		CallableStatement cs = null;
		CLOB cb = null;
		String xmldata = null;
		int j = 2;
		try {
			cs = connection.prepareCall(sql);
			cs.registerOutParameter(1, OracleTypes.CLOB);
			if (aObjs != null && aObjs.length != 0) {
				for (int i = 0; i < aObjs.length; i++) {
					cs.setObject(j, aObjs[i]);
					j++;
				}
			}
			cs.execute();
			cb = (CLOB) cs.getObject(1);
			xmldata = getStringFromCLOB(cb);			
		} catch (SQLException e) {
			if(e.getMessage().indexOf("ORA-06503") != -1){
				System.out.println("The CLOBdata does not exists. [getLargeContent]");
			}else{
				e.printStackTrace();
			}
			// TODO Auto-generated catch block			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			if(cs != null){
				try {
					cs.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			if(connection != null){
				try {
					connection.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return xmldata;
	}
	private byte[] readBlob(String sql){
		ResultSet rs = null;
		Blob lob = null;
		byte[] barr = null;
		Connection conn = null;
        try {        
        	conn = DBUtil.getRawConnection(dbCommon_name);
        	Statement stmt = conn.createStatement();
	        rs =stmt.executeQuery(sql);
	        while (rs.next()) {
	        	barr = rs.getBytes(1);	
	        }
        }catch(Exception e){
        	e.printStackTrace();
        }finally{
			if(rs != null){
				try {
					rs.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			if(conn != null){
				try {
					conn.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
        return barr;
	}
	private byte[] getBlobContent(String sql, Object... aObjs) {		
		Connection connection = DBUtil.getRawConnection(dbCommon_name);
		CallableStatement cs = null;
		byte[] barr = null;
		Blob bb = null;
		String xmldata = null;
		int j = 2;
		try {
			cs = connection.prepareCall(sql);
			cs.registerOutParameter(1, OracleTypes.BLOB);
			if (aObjs != null && aObjs.length != 0) {
				for (int i = 0; i < aObjs.length; i++) {
					cs.setObject(j, aObjs[i]);
					j++;
				}
			}
			cs.execute();
			barr = cs.getBytes(1);					
		} catch (SQLException e) {
			if(e.getMessage().indexOf("ORA-06503") != -1){
				System.out.println("The BLOB data does not exists. [getBlobContent]");
			}else{
				e.printStackTrace();
			}
			// TODO Auto-generated catch block			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			if(cs != null){
				try {
					cs.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			if(connection != null){
				try {
					connection.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return barr;
	}
	private String getStringFromCLOB(Clob data) throws Exception {
		Reader input = null;
		StringBuffer output = null;
		if (data != null) {
			output = new StringBuffer();
			input = data.getCharacterStream();
			char[] buffer = new char[4056];
			int byteRead;
			while ((byteRead = input.read(buffer, 0, 1024)) != -1) {
				output.append(buffer, 0, byteRead);
			}
			try {
				if (input != null)
					input.close();
			} catch (Exception exm) {
			}
	//		System.out.println(output.toString());
			return output.toString();
		}
		return null;
	}
}