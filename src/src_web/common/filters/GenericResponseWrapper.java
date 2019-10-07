package common.filters;


import javax.servlet.http.HttpServletResponseWrapper;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletOutputStream;

import org.apache.log4j.Logger;



import java.io.ByteArrayOutputStream;
import java.io.CharArrayWriter;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;

/**
 * File : common.filters.common.GenericResponseWrapper
 * Author: Nguyen Cong Thuan
 * Called by :
 * Calls :
 * Input:
 * Operation description: 
 * Output:
 * Date of creation: Jun 20, 2003 - 11:20:26 AM
 * Date of last changes:
 */

public class GenericResponseWrapper extends HttpServletResponseWrapper{
	static final Logger logger = Logger.getLogger(GenericResponseWrapper.class);
    private ByteArrayOutputStream output;
    private CharArrayWriter jspOut;
    private int mode;
    //private FilterServletOutputStream filteredServletOutput;
    private int contentLength;
    private String contentType;
    public GenericResponseWrapper(HttpServletResponse response) {
        super(response);
        output=new ByteArrayOutputStream();
        this.jspOut = new CharArrayWriter();
        //filteredServletOutput = new FilterServletOutputStream(output);
    }
    
    public byte[] getData() throws UnsupportedEncodingException {
    	//logger.info("getData() mode="+mode);
    	if(mode==1) {
    		String s=jspOut.toString();
    		return s.getBytes("utf-8");
    	}
    	else {
    		return output.toByteArray();
    	}
    }

    public String getStringData() throws UnsupportedEncodingException {
        return output.toString("utf-8");
    }
    
    public ServletOutputStream getOutputStream() {
//        return filteredServletOutput;
    	//logger.info("getOutputStream()");
    	mode=2;
        return new FilterServletOutputStream(output);
    }
    public PrintWriter getWriter() throws java.io.IOException
    {
    	//logger.info("getWriter()");
    	 mode=1;
         return new PrintWriter(this.jspOut);
    }
    public void setContentLength(int length)
    {
        this.contentLength = length;
        super.setContentLength(length);
    }
    public int getContentLength()
    {
        return contentLength;
    }
    public void setContentType(String type)
    {
        this.contentType = type;
//        logger.info(myDebugName + "setContentType : type = " + type);
        super.setContentType(type);
    }
    public String getContentType()
    {
        return contentType;
    }
}
