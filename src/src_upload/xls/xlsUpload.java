package xls;

import intellsoft.db.ConnectionFactory;

import javax.servlet.*;
import javax.servlet.http.*;

import jxl.*;

import java.sql.*;

import upload.*;

import org.apache.commons.fileupload.*;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import java.util.*;
import java.io.*;

public class xlsUpload  {

//  private static final long serialVersionUID = 1L;

	 /*
	  drop table EXCEL_IMPORT;
	  create table EXCEL_IMPORT (file_name VARCHAR2(50),sheet_id NUMBER(5,0),sheet_name VARCHAR2(50),ROW_IDX NUMBER(10,0)
	    ,C1 VARCHAR2(1000),C2 VARCHAR2(1000),C3 VARCHAR2(1000),C4 VARCHAR2(1000),C5 VARCHAR2(1000)
	    ,C6 VARCHAR2(1000),C7 VARCHAR2(1000),C8 VARCHAR2(1000),C9 VARCHAR2(1000),C10 VARCHAR2(1000)
	    ,C11 VARCHAR2(1000),C12 VARCHAR2(1000),C13 VARCHAR2(1000),C14 VARCHAR2(1000),C15 VARCHAR2(1000)
	    ,C16 VARCHAR2(1000),C17 VARCHAR2(1000),C18 VARCHAR2(1000),C19 VARCHAR2(1000),C20 VARCHAR2(1000)
	    ,C21 VARCHAR2(1000),C22 VARCHAR2(1000),C23 VARCHAR2(1000),C24 VARCHAR2(1000),C25 VARCHAR2(1000)
	    ,C26 VARCHAR2(1000),C27 VARCHAR2(1000),C28 VARCHAR2(1000),C29 VARCHAR2(1000),C30 VARCHAR2(1000)
	    ,C31 VARCHAR2(1000),C32 VARCHAR2(1000),C33 VARCHAR2(1000),C34 VARCHAR2(1000),C35 VARCHAR2(1000)
	    ,C36 VARCHAR2(1000),C37 VARCHAR2(1000),C38 VARCHAR2(1000),C39 VARCHAR2(1000),C40 VARCHAR2(1000)
	   );
	 create table EXCEL_MAP (FILE_NAME VARCHAR2(50),TABLE_NAME VARCHAR2(50),COL_LIST VARCHAR2(500),START_ROW NUMBER,START_COL NUMBER,CALL_SP VARCHAR2(500));
	 INSERT INTO EXCEL_MAP(FILE_NAME,TABLE_NAME,COL_LIST,START_ROW ,START_COL,CALL_SP) VALUES('dm_chepham_yhct.xls','dm_chepham_yhct','to_number({c}) stt,ten_thuoc,hoat_chat,bao_che,dong_goi,ma_thuoc,nguon_goc,stt_nhom_tacdung',4,0,NULL);
	 INSERT INTO EXCEL_MAP(FILE_NAME,TABLE_NAME,COL_LIST,START_ROW ,START_COL,CALL_SP) VALUES('dm_benh_yhct.xls','dm_benh_yhct','to_number({c}) stt,to_number({c}) stt_bd,ma_benh_icd_10,ten_benh_yhhd,chung_benh_yhct,ten_th_giamdinh',3,0,NULL);
	 INSERT INTO EXCEL_MAP(FILE_NAME,TABLE_NAME,COL_LIST,START_ROW ,START_COL,CALL_SP) VALUES('dm_coso_kcb.xls','dm_coso_kcb','to_number({c}) stt,ma_bv,ten_bv,to_number({c}) ma_huyen,to_number({c}) tuyen_bv,to_number({c}) hang_bv,dia_chi,ghichu',2,0,NULL);
	 INSERT INTO EXCEL_MAP(FILE_NAME,TABLE_NAME,COL_LIST,START_ROW ,START_COL,CALL_SP) VALUES('dm_duongdung.xls','dm_duongdung','to_number({c}) STT,ma_duong_dung,duong_dung',6,0,NULL);
	 INSERT INTO EXCEL_MAP(FILE_NAME,TABLE_NAME,COL_LIST,START_ROW ,START_COL,CALL_SP) VALUES('dm_dvkt.xls','dm_dvkt','to_number({c}) STT,ma_DVKT,ma_khoa,danhmuc_kythuat',4,0,NULL);
	 INSERT INTO EXCEL_MAP(FILE_NAME,TABLE_NAME,COL_LIST,START_ROW ,START_COL,CALL_SP) VALUES('dm_thuoc_px_hopchat_danhdau.xls','dm_thuoc_px_hcdd','to_number({c}) STT,ma_hoat_chat,ma_duongdung,Stt_hoatchat,Stt_thuoc,ten_thuoc,duongdung',6,0,NULL);
	 INSERT INTO EXCEL_MAP(FILE_NAME,TABLE_NAME,COL_LIST,START_ROW ,START_COL,CALL_SP) VALUES('dm_thuoctanduoc.xls','dm_thuoctanduoc','to_number({c}) STT,ten,hamluong,hoatchat,baoche,donggoi,tieuchuan,tuoitho,sdk,ctysx,nuocsx,diachisx,ctydk,nuocdk,diachidk,nguongoc,stt_thongtu,nhom',1,0,NULL);
	 INSERT INTO EXCEL_MAP(FILE_NAME,TABLE_NAME,COL_LIST,START_ROW ,START_COL,CALL_SP) VALUES('icd.xls','dm_icd','CICD10,ID_CHAPTER,VVIET,VANH,ID_NHOM',1,0,NULL);
	 INSERT INTO EXCEL_MAP(FILE_NAME,TABLE_NAME,COL_LIST,START_ROW ,START_COL,CALL_SP) VALUES('donvi_mau_toanphan_cp_mau.xls','dm_donvi_mau_toanphan_cp_mau','to_number({c}) STT,ma,donvi_mau_cp,thetich_thuc',4,0,NULL);
	 INSERT INTO EXCEL_MAP(FILE_NAME,TABLE_NAME,COL_LIST,START_ROW ,START_COL,CALL_SP) VALUES('dm_khoa.xls','dm_khoa','to_number({c}) STT,ten_khoa,ma_khoa',3,0,NULL);
	 INSERT INTO EXCEL_MAP(FILE_NAME,TABLE_NAME,COL_LIST,START_ROW ,START_COL,CALL_SP) VALUES('dm_tainan_thuongtich.xls','dm_tainan_thuongtich','ma,ten,ghi_chu',1,0,NULL);
	 INSERT INTO EXCEL_MAP(FILE_NAME,TABLE_NAME,COL_LIST,START_ROW ,START_COL,CALL_SP) VALUES('dm_nhom_theo_chiphi.xls','dm_nhom_theo_chiphi','to_number({c}) stt,ten_nhom,ghi_chu',1,0,NULL);

	 */
  public static void doUpload(String db_name,HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

      if (!ServletFileUpload.isMultipartContent(request)) {
          throw new IllegalArgumentException("Request is not multipart, please 'multipart/form-data' enctype for your form.");
      }
      try
      {
      	
      	
      	  //Class.forName("oracle.jdbc.driver.OracleDriver");
          //Connection conn = DriverManager.getConnection(db_name);
          Connection conn=ConnectionFactory.getConnection(db_name);
          Statement stmt=conn.createStatement();
          
          UploadListener listener = new UploadListener(request, 30);
          FileItemFactory factory = new MonitoredDiskFileItemFactory(listener);
          ServletFileUpload upload = new ServletFileUpload(factory);
             List items = upload.parseRequest(request);
             Iterator iter = items.iterator();
             String mapId="";
             String mapDesc="";
             while (iter.hasNext()) {
                 FileItem item = (FileItem) iter.next();

                 if (item.isFormField()) {
                 	String name = item.getFieldName();
      		        String value = item.getString();
      		        System.out.println("name="+name+" value="+value);
      		        if(name.equalsIgnoreCase("cboMAP_ID")) {
      		        	mapId=value;
      		        }
      		        else if(name.equalsIgnoreCase("txtDESCRIPTION")) {
      		        	mapDesc=value;
      		        }
                 }
             }
             String fileName="";
             iter = items.iterator();
             //fileName=DBUtil.getOneValueString(db_name,"select to_char(sysdate,'yyyyMMddHH24MISS') FROM DUAL");
             while (iter.hasNext()) {
                 FileItem item = (FileItem) iter.next();
                 if (!item.isFormField()) {
              	   System.out.println("not isFormField name="+item.getName());
              	   fileName=item.getName();
                     //String fileName = new File(item.getName()).getName();
                     InputStream is=item.getInputStream();
                     Workbook workbook = Workbook.getWorkbook(is);
                 	//	   Do stuff with the workbook
                     	///*
                 			 if(fileName==null||fileName.equalsIgnoreCase("")) {
                 				fileName=""+Math.random();
                 			 }
                 			 stmt.executeUpdate("DELETE FROM excel_import WHERE MAP_ID="+mapId);
                 			 int sc=workbook.getNumberOfSheets();
                 			 System.out.println("\n\n\n\n\n\n\n\n\n\n====================================");
                 			 for(int i=0;i<sc;i++) {
                 			     Sheet sheet = workbook.getSheet(i);
                 			     int r=1;//bo qua dong dau (tieu de)
                 			     int rowCount=sheet.getRows();
                 			     int colCount=sheet.getColumns();
                 			  System.out.println("rows="+rowCount+" cols="+colCount);
                 			     if(rowCount==0 || colCount==0)
                 			     	break;
                 			     String strValue[]=new String[colCount];

                 			     System.out.println("1====================================");
                 			     String sql_p1="insert into excel_import (map_id,file_name,sheet_id,sheet_name,row_idx";
                 			     
                 			     System.out.println("2====================================");
                 			     for(int j=0;j<colCount && j<40;j++){
                 			     	sql_p1+=",C"+(j+1);
                 			     }
                 			     String sql_p2="";
                 			     System.out.println("\n\n\n\n\n\n\n\n\n\nsql="+sql_p1+") "+sql_p2+")");
                 			     while(r<rowCount)
                 			     {
                 			     	
                 			    	 strValue[0]= sheet.getCell(0,r).getContents().trim();
                 			    	 if(!strValue[0].equalsIgnoreCase(""))
                 			    	 {
                 			    	 	 sql_p2=" VALUES("+mapId+",'"+fileName+"',"+i+",'"+sheet.getName()+"',"+r;
                 				    	 for(int c=0;c<colCount && c<40 ;c++)
                 				    	 {
                 				    		 strValue[c] = sheet.getCell(c,r).getContents().trim(); 
                 				    		strValue[c]=strValue[c].replaceAll("'", "");
                 				    		 sql_p2+=",'"+strValue[c]+"'";
                 				    	 }
                 				    	 System.out.println("sql="+sql_p1+") "+sql_p2+")");
                 				    	 stmt.executeUpdate(sql_p1+") "+sql_p2+")");
                 			    	 }
                 			    	 else
                 			    	 {
                 			    		 break;
                 			    	 }
                 			    	 r++;
                 			     }//while
                 			  	//int rt=DBUtil.CALL_SP_I(db_name,"{? = call XLS_IMPORT(?2S,?3S,?4S,?5L)}",new Object[]{functionName,file_name,param_1});
                 	         }
                 	         //*/
                 			 ResultSet rs=stmt.executeQuery("select * from EXCEL_MAP where map_id="+mapId);
                 			 while(rs.next()) {
                 				 String table_name=rs.getString("TABLE_NAME");
                 				 String col_list=rs.getString("COL_LIST");
                 				String call_sp="";//rs.getString("CALL_SP");
                 				 int start_row=rs.getInt("START_ROW");
                 				 int start_col=rs.getInt("START_COL");
                 				 String cols[]=col_list.split(",");
                 				ResultSet rsExists=stmt.executeQuery("select TABLE_name from USER_TABLES where TABLE_name=UPPER('"+table_name+"')");
                 				boolean exists=false;
                 				if(rsExists.next()) {
                 					exists=true;
                 				}
                 				String strCol="";
                 				String sql="";
                 				//to_number()
                 				if(!exists) {
      	           				 for(int i=0;i<cols.length;i++) {
      	           					 if(i>0) {
      	           						 strCol+=",";
      	           					 }
      	           					 String col=cols[i];
      	           					 if(col.indexOf("{c}")>-1) {
      	           						 strCol+=col.replace("{c}", "C"+(i+1));
      	           					 }
      	           					 else {
      	           						 strCol+="C"+(i+1)+" "+cols[i];
      	           					 }
      	           				 }
      	           				 sql="create table "+table_name +" as select rownum AS ma_so,"+strCol+" from excel_import where map_id="+mapId+" and sheet_id=0 and ROW_IDX>="+start_row;
                 				}
                 				else {
                 					for(int i=0;i<cols.length;i++) {
      	           					 if(i==0) {
      	           						strCol+="C"+(i+1);
      	           					 }
      	           					 else {
      	           						strCol+=",C"+(i+1); 
      	           					 }
      	           				 }
                 					stmt.executeUpdate( "delete from "+table_name);
                 					 sql="insert into "+table_name +" ("+col_list+") (select "+strCol+" from excel_import where map_id="+mapId+" and sheet_id=0 and ROW_IDX>="+start_row+")";
                 				}
                 				System.out.println("sql="+sql);
                 				stmt.executeUpdate(sql);
                 				if(call_sp!=null && !call_sp.equalsIgnoreCase("")) {
                 					stmt.executeUpdate(call_sp);
                 				}
                 				break;
                 			 }
                 			 
                     /*
                     String filePath = media_dir + fileName;
                     File uploadedFile = new File(filePath);
                     
                     System.out.println(filePath);
                     // saves the file to upload directory
                     item.write(uploadedFile);
                     */
                 }
             }
             stmt.close();
             conn.close();
      	     response.sendRedirect("fileSelectXLS.jsp");
          }
          catch (Exception e)
          {
          	e.printStackTrace();
              //response.sendRedirect("index.html");
          }
	      finally {
	    	  
	      }
      

  }

  
}