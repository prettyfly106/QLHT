package common.filters;


import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

import java.io.IOException;

/**
 * File : common.filters.EncodingFilter
 * Author: Nguyen Cong Thuan
 * Called by :
 * Calls :
 * Input:
 * Operation description:
 *              Thuc hien chuan hoa encode cho tat ca cac request va response cua
 *              chuong trinh web
 * Output:
 * Date of creation: Aug 12, 2003 - 10:51:04 AM
 * Date of last changes:
 */

public class EncodingFilter extends MyGenericFilter{
	//Logger logger = Logger.getLogger(EncodingFilter.class);
    private static final String myDebugName = "EncodingFilter : Error:";
    private static final String encoding = "UTF-8";
    public void doFilter(final ServletRequest request, final ServletResponse response,
    FilterChain chain) throws IOException, ServletException
    {
//        request.setCharacterEncoding(encoding);
        chain.doFilter(request,response);
        if (response.getCharacterEncoding() != null)
        {
            if (!response.getCharacterEncoding().equalsIgnoreCase(encoding))
            {
                throw new RuntimeException(myDebugName + " response'encoding not set to UTF-8 for url: "
                + ((HttpServletRequest)request).getRequestURI());
            }
        }
        else {
        	System.out.println("response.getCharacterEncoding() == null");
        }
    }
}
