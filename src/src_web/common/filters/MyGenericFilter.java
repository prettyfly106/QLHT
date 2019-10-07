package common.filters;


import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * File : common.filters.common.MyGenericFilter
 * Author: Nguyen Cong Thuan
 * Called by :
 * Calls :
 * Input:
 * Operation description:
 *          La mot file chung de extends boi cac filter 
 * Output:
 * Date of creation: Jun 20, 2003 - 11:24:02 AM
 * Date of last changes:
 */

public class MyGenericFilter implements javax.servlet.Filter{
    public FilterConfig filterConfig;
//    public BeanManager beanManager;
    public void doFilter(final ServletRequest request,final ServletResponse response,
    FilterChain chain) throws java.io.IOException, javax.servlet.ServletException
    {
    	try {
    		chain.doFilter(request,response);
    	}catch(Exception e) {
    		e.printStackTrace();
    	}
    }
    public void init(final FilterConfig filterConfig)
    {
        this.filterConfig = filterConfig;
    }
    public void destroy()
    {
    }
}
