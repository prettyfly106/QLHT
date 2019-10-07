
package AjaxUtil;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.PipedInputStream;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.zip.ZipInputStream;

import javax.servlet.*;
import javax.servlet.http.*;

import intellsoft.db.ConnectionFactory;
import intellsoft.db.DBUtil;
import intellsoft.db.DBUtility;
import intellsoft.db.RecordSet;

import java.io.*;

import com.crystaldecisions.reports.exporters.excel.libs.biff.xlsDOM.ExcelCell.CellType;
import com.vsc.util.DateUtil;

import oracle.sql.BLOB;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.*;

import upload.MonitoredDiskFileItemFactory;
import upload.UploadListener;

import java.sql.*;
public final class fileMgr extends HttpServlet {





public void service(HttpServletRequest request, HttpServletResponse response) throws java.io.IOException, ServletException {

	HttpSession session = null;
    session = request.getSession();
    request.setCharacterEncoding("UTF-8");
  	String db_name=(String)session.getAttribute("db_name");
  	
  	UploadListener listener = new UploadListener(request, 30);
    // Create a factory for disk-based file items
    FileItemFactory factory = new MonitoredDiskFileItemFactory(listener);
    // Create a new file upload handler
    ServletFileUpload upload = new ServletFileUpload(factory);
    List items = null;
	try {
		items = upload.parseRequest(request);
	} catch (FileUploadException e1) {
		e1.printStackTrace();
	}
    Iterator iter = items.iterator();
	String keyField = "";
	String keyValue = "";
	String fileField = "";
	String tableName = "";
	String submitType = "";
	String nameField = "";
	String lengthField = "";
	System.out.println("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx:start");
  	while (iter.hasNext()) {
  		FileItem item = (FileItem) iter.next();
		if (item.isFormField()) {
			String name = item.getFieldName();
	        String value = item.getString();
	        if(name.equalsIgnoreCase("keyField"))
	        	keyField = value;
	        if(name.equalsIgnoreCase("keyValue"))
	        	keyValue = value;
	        if(name.equalsIgnoreCase("fileField"))
	        	fileField = value;
	        if(name.equalsIgnoreCase("tableName"))
	        	tableName = value;
	        if(name.equalsIgnoreCase("submitType"))
	        	submitType = value;
	        if(name.equalsIgnoreCase("nameField"))
	        	nameField = value;
	        if(name.equalsIgnoreCase("lengthField"))
	        	lengthField = value;
		}
  	}
  	System.out.println("submitType="+submitType);
  	if(submitType.equalsIgnoreCase("save2DB")){
  		try{
	 		System.out.println("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx:save2DB");
	 		response.setContentType("text/html;charset=UTF-8");
	 		iter = items.iterator();
	 		while (iter.hasNext()) {
			    FileItem item = (FileItem) iter.next();
			    if (!item.isFormField()) {
			    	//String fieldName = item.getFieldName();
			        String fileName = item.getName();
			    	//String contentType = item.getContentType();
			        //boolean isInMemory = item.isInMemory();
			        long sizeInBytes = item.getSize();
			        //fileName = fileName.replace('\\', '/');
			        //String[] temp = fileName.split("/");
			        //String[] name_type=temp[temp.length-1].split("\\.");
			        //String s = temp[temp.length-1];
			    	
		        	Connection con=DBUtil.getRawConnection(db_name);
		        	con.setAutoCommit(false);
		        	int fileSize=(int) item.getSize();
		        	System.out.println("fileSize="+fileSize);
		        	if(fileSize>10000000){
		        		PrintWriter pw = response.getWriter();
		        		pw.write("<html>");
		        		pw.write("<head/>");
		        		pw.write("<body>");
		        		pw.write("File upload không được vượt quá 10MB");
		        		pw.write("</body>");
		        		pw.write("</html>");
		    	        return;
		        	}
		        	String sql = "BEGIN update "+tableName+" set "+nameField+"='"+fileName+"',"+lengthField+"="+sizeInBytes+","+fileField+"=? where "+keyField+"="+keyValue+" RETURNING "+keyField+" INTO ?;END;";
		        	System.out.println("sql="+sql);
		        	CallableStatement ps = con.prepareCall(sql);
		            ps.setBinaryStream(1, item.getInputStream(), (int) item.getSize());
		            ps.registerOutParameter(2, Types.INTEGER);
		            ps.executeUpdate();
		            String id = ps.getString(2);
		            con.commit();
		            ps.close();
		            con.close();
		            PrintWriter pw = response.getWriter();
			        pw.println("<html>");
			        pw.println("<body>");
			        pw.println("Upload thành công");
			        pw.println("</body></html>");
			    }
	 		}
  		} 
  		catch (Exception e) {
	  		System.out.println(e.getMessage());
	  		PrintWriter pw = response.getWriter();
	        pw.println("<html>");
	        pw.println("<body>");
	        pw.println("Upload không thành công. Có lỗi: " + e.getMessage());
	        pw.println("</body></html>");
	  	} 
	  	finally {
	  	}
  	}	
    else if(submitType.equalsIgnoreCase("download")){
    	
        RecordSet rs=null;
        String sql = "select * from "+tableName+" where "+keyField+" =" + keyValue;
        System.out.println("sql="+sql);
    	rs = DBUtil.executeQuery(db_name, sql);
    	while(rs.next()) {
    		try{
	            Blob blob = rs.getBlob(fileField);
	            if(blob==null){
	            	response.setContentType("text/html;charset=UTF-8");
	    			PrintWriter pw = response.getWriter();
	    			pw.println("<html>");
	    	        pw.println("<body>");
	    	        pw.println("Công văn này chưa có file đính kèm");
	    	        pw.println("</body></html>");
	    	        return;
	            }
	            InputStream inputStream = blob.getBinaryStream();
	            String fileName = rs.getString(nameField);
	            int fileLength = rs.getInt(lengthField);
	            System.out.println("fileLength = " + fileLength);
                ServletContext context = getServletContext();
                String mimeType = context.getMimeType(fileName);
                if (mimeType == null) {        
                    mimeType = "application/octet-stream";
                }              
                System.out.println("mimeType="+mimeType); 
                // set content properties and header attributes for the response
                response.setContentType(mimeType);
                response.setContentLength(fileLength);
                String headerKey = "Content-Disposition";
                String headerValue = String.format("attachment; filename=\"%s\"", fileName);
                response.setHeader(headerKey, headerValue);
 
                // writes the file to the client
                OutputStream outStream = response.getOutputStream();
                 
                byte[] buffer = new byte[4096];
                int bytesRead = -1;
                 
                while ((bytesRead = inputStream.read(buffer)) != -1) {
                    outStream.write(buffer, 0, bytesRead);
                }
                 
                inputStream.close();
                outStream.close(); 
    		}
    		catch(Exception ex){
    			response.setContentType("text/html;charset=UTF-8");
    			PrintWriter pw = response.getWriter();
    			pw.println("<html>");
    	        pw.println("<body>");
    	        pw.println("Download không thành công. Có lỗi: " + ex.getMessage());
    	        pw.println("</body></html>");
    		}
          
        }
    	/*Connection conn = ConnectionFactory.getConnection(db_name);
        Statement stmt=DBUtility.createStatement(conn);
        stmt.execute("delete from excel_import where hospital_id=1 and file_name='" + fileName + "' and sheet_name='" + versionId + "'");
    	response.setContentType("text/html;charset=UTF-8");
    	iter = items.iterator();
        while (iter.hasNext()) {
 		    FileItem item = (FileItem) iter.next();
 		    if (!item.isFormField()) {
 		    	InputStream is=item.getInputStream();
 		    	Workbook wb = WorkbookFactory.create(is);
 		    	for (Sheet sheet : wb ) {
 		    	   int i=0;
 		           for (Row row : sheet) {
 		        	   if(row.getRowNum()>0){
     		        	   String sql_p1="insert into excel_import (hospital_id,file_name,sheet_id,sheet_name,row_idx";
     		        	   String sql_p2=" VALUES('1','" + fileName  + "','" + i + "','" + versionId + "','" + row.getRowNum() + "'";
     		               for (Cell cell : row) {
     		            	   sql_p1 += ",C" + (cell.getColumnIndex()+1);
     		            	   if(cell.getCellType()==Cell.CELL_TYPE_NUMERIC){
     		            		   System.out.println("cell.getNumericCellValue()="+cell.getNumericCellValue());
     		            		   sql_p2 += ",'" + (long)cell.getNumericCellValue() + "'";}
     		            	   else
     		            		  sql_p2 += ",'" + cell.getStringCellValue().replace("'", "''") + "'";
     		               }
     		               System.out.println("sql="+sql_p1+") "+sql_p2+")");
     		               stmt.execute(sql_p1+") "+sql_p2+")");
 		        	   }
 		           }
 		           i++;
 		       }
 		    }
 		    ResultSet rs=stmt.executeQuery("select * from EXCEL_MAP where file_name='"+fileName+"'");
 		    while(rs.next()) {
 		    	String table_name=rs.getString("TABLE_NAME");
 		    	String col_list=rs.getString("COL_LIST");
 		    	String call_sp="";//rs.getString("CALL_SP");
 		    	int start_row=rs.getInt("START_ROW");
 		    	int start_col=rs.getInt("START_COL");
 		    	String cols[]=col_list.split(",");
 		    	String strCol="";
 		    	String sql="";
 		    	for(int i=0;i<cols.length;i++) {
 		    		if(i==0) {
 		    			strCol+="C"+(i+1);
 		    		}
 		    		else {
 		    			strCol+=",C"+(i+1); 
 		    		}
 		    	}
			
 		    	stmt.execute("delete from "+table_name+" where phienban_id="+versionId);
 		    	sql="insert into "+table_name +" (ma_so,phienban_id,"+col_list+") (select row_idx, sheet_name,"+strCol+" from excel_import where sheet_name=" + versionId + " and file_name='"+fileName+"' and sheet_id=0 and ROW_IDX>="+start_row+")";
 		    	stmt.execute(sql);
			
 		    	break;
 		    }
 		}
        stmt.close();
        conn.close();
        PrintWriter pw = response.getWriter();
        pw.println("<html>");
        pw.println("<body>");
        pw.println("Import thành công");
        pw.println("</body></html>");
        //response.sendRedirect("/hPortal/main/manager.jsp?func=../MiniHIS/drugMgr&import=1");*/
 	}
  	


    
  }
}
