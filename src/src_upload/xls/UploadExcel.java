package xls;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;

public class UploadExcel extends HttpServlet {

//  private static final long serialVersionUID = 1L;

  @Override
  public void init(ServletConfig config) {
  }
      
  /**
      * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
      * 
      */
  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	  doPost(request,response);
  }
  
  /**
      * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
      * 
      */
  @SuppressWarnings("unchecked")
  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	  String db_name="jdbc:oracle:thin:qlbv/123@123.30.171.4:1521:qlbv";
	  //String db_name=getServletContext().getInitParameter("db_name");
	  xlsUpload.doUpload(db_name, request, response);
  }

  
}