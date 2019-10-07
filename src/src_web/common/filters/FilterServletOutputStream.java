package common.filters;

import javax.servlet.ServletOutputStream;
import java.io.DataOutputStream;
import java.io.OutputStream;
import java.io.IOException;

/**
 * File : common.filters.common.FilterServletOutputStream
 * Author: Nguyen Cong Thuan
 * Called by :
 * Calls :
 * Input:
 * Operation description: 
 * Output:
 * Date of creation: Jun 20, 2003 - 11:18:34 AM
 * Date of last changes:
 */

public class FilterServletOutputStream extends ServletOutputStream{
    private DataOutputStream stream;
    public FilterServletOutputStream(OutputStream output) {
        stream = new DataOutputStream(output);
    }
    public void write(int b) throws IOException {
    	//logger.info("write(int b)");
        stream.write(b);
    }
    public void write(byte[] b) throws IOException {
    	//logger.info("write(byte[] b)");
        stream.write(b);
    }
    public void write(byte[] b, int off, int len) throws IOException {
    	//logger.info("write(byte[] b, int off, int len)");
        stream.write(b,off,len);
    }
/*
 doan nay de xu ly loi charset utf8 cua servlet trong oc4j
 */
    public void print(String s) throws IOException {
    	//logger.info("print()"+ s);
    	if(s == null)
    		s = "null";
    	byte[] b=s.getBytes("utf-8");
    	stream.write(b);
    }
    public void println(String s) throws IOException {
    	//logger.info("println()"+ s);
    	if(s == null)
    		s = "null";
    	byte[] b=s.getBytes("utf-8");
    	stream.write(b);
    }
}
