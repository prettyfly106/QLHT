
package AjaxUtil;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.PipedInputStream;
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
public final class xlsMgr extends HttpServlet {





public void service(HttpServletRequest request, HttpServletResponse response) throws java.io.IOException, ServletException {
	System.out.println("xxxxxxxxxxxxxxx start");
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
    String sqlId = "";
	String versionId = "";
	String submitType = "";
	String fileName = "";
	String hospitalId = "";
  	while (iter.hasNext()) {
  		FileItem item = (FileItem) iter.next();
		if (item.isFormField()) {
			String name = item.getFieldName();
	        String value = item.getString();
	        if(name.equalsIgnoreCase("sqlId"))
	        	sqlId = value;
	        if(name.equalsIgnoreCase("cboVersion"))
	        	versionId = value;
	        if(name.equalsIgnoreCase("submit_type"))
	        	submitType = value;
	        if(name.equalsIgnoreCase("fileName"))
	        	fileName = value;
	        if(name.equalsIgnoreCase("hospital_id"))
	        	hospitalId = value;
		}
  	}
  	System.out.println("submitType="+submitType);
  	Hashtable<String, String[]> sqlMap = new Hashtable<String, String[]>();
	sqlMap.put("DMTH.001",new String[]{"select stt,so_dang_ky,ten_thuoc,ma_hoat_chat,hoat_chat_tt40,hoat_chat,ma_duong_dung,duong_dung,ham_luong,dong_goi,hang_sx,nuoc_sx from byt_dm_thuoc where phienban_id="+ versionId +" order by ma_so",""});
	sqlMap.put("DMVT.001",new String[]{"select stt, stt_thongtu,ma_vtyt,nhom_loai_vtyt,donvi_tinh,ghi_chu from byt_dm_vattu where phienban_id="+versionId+" order by ma_so",""});
	sqlMap.put("DMDV.001",new String[]{"select stt, ma_dvkt,ma_dvkt_tt43_50,ten_dvkt,loai_pttt,ma_gia,ten_dvkt_tt37,gia_t3,gia_t7,ghi_chu from byt_dm_dvkt where phienban_id="+versionId+" order by ma_so",""});
	
	sqlMap.put("DMDC.001",new String[]{"select stt,ma_thuoc,ten_thuoc,ma_hoat_chat,hoat_chat,ma_duong_dung,duong_dung,ham_luong,dong_goi,hang_sx,nuoc_sx from byt_dm_cptyhct where phienban_id="+versionId+" order by ma_so",""});
	sqlMap.put("DMDC.002",new String[]{"select stt, stt_nhom,ma_vi_thuoc, ten_vi_thuoc, nguon_goc from byt_dm_vtyhct where phienban_id="+versionId+" order by ma_so",""});
	sqlMap.put("DMDC.003",new String[]{"select stt,ma_yhct,chung_benh,icd10,ten_benh,ten_mau from byt_dm_benhyhct where phienban_id="+versionId+" order by ma_so",""});
	sqlMap.put("DMDC.004",new String[]{"select stt, ma_mau, don_vi_va_che_pham, the_tich_thuc from byt_dm_mau where phienban_id="+versionId+" order by ma_so",""});
	sqlMap.put("DMDC.005",new String[]{"select stt, ma_chapter2, ten_chuong_e, ten_chuong_v, ma_nhom, ten_nhom_e, ten_nhom_v, ma_nhom_phu_1, ten_nhom_phu_1_e, ten_nhom_phu_1_v, ma_nhom_phu_2, ten_nhom_phu_2_e, ten_nhom_phu_2_v, ma_loai, ten_loai_e, ten_loai_v, ma_benh, ten_benh_origin_e, ten_benh_origin_v, ten_benh_fix, ma_bao_cao_BYT, ma_chi_tiet_hon, ma_origin_modified from byt_dm_icd where phienban_id="+versionId+" order by ma_so",""});
	sqlMap.put("DMDC.006",new String[]{"select stt,ma_bv,ten_bv,ma_huyen,tuyen_bv,hang_bv,dia_chi,ghi_chu from byt_dm_cskcb where phienban_id="+versionId+" order by ma_so",""});
	
  	try
  	{
  		
  	 	if(submitType.equalsIgnoreCase("export")){
  	 		
  	 		String sSQL = sqlMap.get(sqlId)[0];
	  		RecordSet rs = DBUtil.executeQuery(db_name, sSQL);
	  		
	  		Workbook wb;
	        wb = new XSSFWorkbook();
	        Sheet sheet = wb.createSheet("SheetData");
	        int cc=rs.getColumnCount();
	        Row newRow= sheet.createRow(0);
	        Cell newCell=null;
	        for(int i=1;i<=cc;i++) {
	          	newCell=newRow.createCell(i-1);
	          	newCell.setCellValue(rs.getColumnName(i));
	          	//System.out.println("rs.getColumnName(i)="+rs.getColumnName(i));
	        }
	        int j=1;
	        while(rs.next()) {
	  			newRow= sheet.createRow(j);
	  			j++;
	  			for(int i=1;i<=cc;i++) {
	  				newCell=newRow.createCell(i-1);
	  	        	newCell.setCellValue(rs.getString(i));
	  			}
	        }
	        rs.close();
	        response.setContentType("application/vnd.ms-excel; charset=utf-8");
	        response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
			wb.write(response.getOutputStream());
  	  		wb.close();
  	  		String sql = "insert into log_download (ten_file,ma_cskcb,tg_download,phienban_id) values('" + fileName + "','" + hospitalId + "',sysdate," + versionId + ")";
  	  		System.out.println("log sql = " + sql);
  	  		DBUtil.executeUpdate(db_name, sql);
  	 	}
        else if(submitType.equalsIgnoreCase("import")){
        	Connection conn = ConnectionFactory.getConnection(db_name);
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
	     		        	   int j = 0;
	     		               for (Cell cell : row) {
	     		            	   j++;
	     		            	   sql_p1 += ",C" + j;
	     		            	   if(cell.getCellType()==Cell.CELL_TYPE_NUMERIC){
	     		            		   System.out.println("cell.getNumericCellValue()="+cell.getNumericCellValue());
	     		            		   try{
	     		            			   sql_p2 += ",'" + (long)cell.getNumericCellValue() + "'";
	     		            		   }
	     		            		   catch(Exception ex){
	     		            			  sql_p2 += ",''";
	     		            		   }
	     		            	   }
	     		            	   else
	     		            		  sql_p2 += ",'" + cell.getStringCellValue().replace("'", "''") + "'";
	     		               }
	     		               System.out.println("sql="+sql_p1+") "+sql_p2+")");
	     		               stmt.execute(sql_p1+") "+sql_p2+")");
     		        	   }
     		           }
     		           i++;
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
	     		    	
	     		    	sql = "delete from "+table_name+" where phienban_id="+versionId;
	     		    	System.out.println("deleteSQL="+sql);
	     		    	stmt.execute("delete from "+table_name+" where phienban_id="+versionId);
	     		    	sql="insert into "+table_name +" (ma_so,phienban_id,"+col_list+") (select row_idx, sheet_name,"+strCol+" from excel_import where sheet_name='" + versionId + "' and file_name='"+fileName+"' and sheet_id=0 and ROW_IDX>="+start_row+")";
	     		    	System.out.println("insertSQL="+sql);
	     		    	stmt.execute(sql);
	  				
	     		    	break;
	     		    }
     		    }
     		}
            stmt.close();
            conn.close();
            PrintWriter pw = response.getWriter();
            pw.println("<html>");
            pw.println("<body>");
            pw.println("Import thành công");
            pw.println("</body></html>");
            //response.sendRedirect("/hPortal/main/manager.jsp?func=../MiniHIS/drugMgr&import=1");
  	 	}
  	} catch (Exception e) {
  		System.out.println(e.getMessage());
  		PrintWriter pw = response.getWriter();
        pw.println("<html>");
        pw.println("<body>");
        pw.println("Import không thành công. Có lỗi: " + e.getMessage());
        pw.println("</body></html>");
  	} 
  	finally {
  	}


    
  }
}
