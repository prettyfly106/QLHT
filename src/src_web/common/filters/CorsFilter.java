package common.filters;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
//import org.apache.tomcat.util.res.StringManager;

public final class CorsFilter
  implements Filter
{
  private static final Logger log = Logger.getLogger(CorsFilter.class);
  //private static final StringManager sm = StringManager.getManager("org.apache.catalina.filters");
  private final Collection<String> allowedOrigins;
  private boolean anyOriginAllowed;
  private final Collection<String> allowedHttpMethods;
  private final Collection<String> allowedHttpHeaders;
  private final Collection<String> exposedHeaders;
  private boolean supportsCredentials;
  private long preflightMaxAge;
  private boolean decorateRequest;
  public static final String RESPONSE_HEADER_ACCESS_CONTROL_ALLOW_ORIGIN = "Access-Control-Allow-Origin";
  public static final String RESPONSE_HEADER_ACCESS_CONTROL_ALLOW_CREDENTIALS = "Access-Control-Allow-Credentials";
  public static final String RESPONSE_HEADER_ACCESS_CONTROL_EXPOSE_HEADERS = "Access-Control-Expose-Headers";
  public static final String RESPONSE_HEADER_ACCESS_CONTROL_MAX_AGE = "Access-Control-Max-Age";
  public static final String RESPONSE_HEADER_ACCESS_CONTROL_ALLOW_METHODS = "Access-Control-Allow-Methods";
  public static final String RESPONSE_HEADER_ACCESS_CONTROL_ALLOW_HEADERS = "Access-Control-Allow-Headers";
  public static final String REQUEST_HEADER_ORIGIN = "Origin";
  public static final String REQUEST_HEADER_ACCESS_CONTROL_REQUEST_METHOD = "Access-Control-Request-Method";
  public static final String REQUEST_HEADER_ACCESS_CONTROL_REQUEST_HEADERS = "Access-Control-Request-Headers";
  public static final String HTTP_REQUEST_ATTRIBUTE_PREFIX = "cors.";
  public static final String HTTP_REQUEST_ATTRIBUTE_ORIGIN = "cors.request.origin";
  public static final String HTTP_REQUEST_ATTRIBUTE_IS_CORS_REQUEST = "cors.isCorsRequest";
  public static final String HTTP_REQUEST_ATTRIBUTE_REQUEST_TYPE = "cors.request.type";
  public static final String HTTP_REQUEST_ATTRIBUTE_REQUEST_HEADERS = "cors.request.headers";
  
  public CorsFilter()
  {
    this.allowedOrigins = new HashSet();
    this.allowedHttpMethods = new HashSet();
    this.allowedHttpHeaders = new HashSet();
    this.exposedHeaders = new HashSet();
  }
  
  public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
    throws IOException, ServletException
  {
	  System.out.println("doFilter CorsFilter="+((HttpServletRequest)servletRequest).getRequestURI());
    if ((!(servletRequest instanceof HttpServletRequest)) || (!(servletResponse instanceof HttpServletResponse))) {
    	System.out.println("doFilter corsFilter.onlyHttp");
      throw new ServletException("corsFilter.onlyHttp");
    }
    HttpServletRequest request = (HttpServletRequest)servletRequest;
    HttpServletResponse response = (HttpServletResponse)servletResponse;
    
    CORSRequestType requestType = checkRequestType(request);
    if (this.decorateRequest) {
      //decorateCORSProperties(request, requestType);
    }
    switch (requestType)
    {
    case SIMPLE: 
      handleSimpleCORS(request, response, filterChain);
      break;
    case ACTUAL: 
      handleSimpleCORS(request, response, filterChain);
      break;
    case PRE_FLIGHT: 
      handlePreflightCORS(request, response, filterChain);
      break;
    case NOT_CORS: 
      handleNonCORS(request, response, filterChain);
      break;
    default: 
      handleInvalidCORS(request, response, filterChain);
    }
  }
  
  public void init(FilterConfig filterConfig)
    throws ServletException
  {
    parseAndStore("*", "GET,POST,HEAD,OPTIONS", "Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers", "", "true", "1800", "true");
    if (filterConfig != null)
    {
      String configAllowedOrigins = filterConfig.getInitParameter("cors.allowed.origins");
      
      String configAllowedHttpMethods = filterConfig.getInitParameter("cors.allowed.methods");
      
      String configAllowedHttpHeaders = filterConfig.getInitParameter("cors.allowed.headers");
      
      String configExposedHeaders = filterConfig.getInitParameter("cors.exposed.headers");
      
      String configSupportsCredentials = filterConfig.getInitParameter("cors.support.credentials");
      
      String configPreflightMaxAge = filterConfig.getInitParameter("cors.preflight.maxage");
      
      String configDecorateRequest = filterConfig.getInitParameter("cors.request.decorate");
      
      parseAndStore(configAllowedOrigins, configAllowedHttpMethods, configAllowedHttpHeaders, configExposedHeaders, configSupportsCredentials, configPreflightMaxAge, configDecorateRequest);
    }
  }
  
  protected void handleSimpleCORS(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
    throws IOException, ServletException
  {
	  System.out.println("doFilter handleSimpleCORS");
    CORSRequestType requestType = checkRequestType(request);
    if ((requestType != CORSRequestType.SIMPLE) && (requestType != CORSRequestType.ACTUAL)) {
      throw new IllegalArgumentException("corsFilter.wrongType2"+CORSRequestType.SIMPLE+CORSRequestType.ACTUAL);
    }
    String origin = request.getHeader("Origin");
    
    String method = request.getMethod();
    if (!isOriginAllowed(origin))
    {
      handleInvalidCORS(request, response, filterChain);
      return;
    }
    if (!this.allowedHttpMethods.contains(method))
    {
      handleInvalidCORS(request, response, filterChain);
      return;
    }
    if ((this.anyOriginAllowed) && (!this.supportsCredentials)) {
      response.addHeader("Access-Control-Allow-Origin", "*");
    } else {
      response.addHeader("Access-Control-Allow-Origin", origin);
    }
    if (this.supportsCredentials) {
      response.addHeader("Access-Control-Allow-Credentials", "true");
    }
    if ((this.exposedHeaders != null) && (this.exposedHeaders.size() > 0))
    {
      String exposedHeadersString = join(this.exposedHeaders, ",");
      response.addHeader("Access-Control-Expose-Headers", exposedHeadersString);
    }
    filterChain.doFilter(request, response);
  }
  
  protected void handlePreflightCORS(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
    throws IOException, ServletException
  {
	  System.out.println("doFilter handlePreflightCORS");
    CORSRequestType requestType = checkRequestType(request);
    System.out.println("handlePreflightCORS.0.1");
    if (requestType != CORSRequestType.PRE_FLIGHT) {
    	System.out.println("corsFilter.wrongType1");
      throw new IllegalArgumentException("corsFilter.wrongType1"+CORSRequestType.PRE_FLIGHT.name().toLowerCase());
    }
    System.out.println("handlePreflightCORS.1");
    String origin = request.getHeader("Origin");
    if (!isOriginAllowed(origin))
    {
    	System.out.println("handlePreflightCORS.2");
      handleInvalidCORS(request, response, filterChain);
      return;
    }
    String accessControlRequestMethod = request.getHeader("Access-Control-Request-Method");
    if ((accessControlRequestMethod == null) || (!HTTP_METHODS.contains(accessControlRequestMethod.trim())))
    {
    	System.out.println("handlePreflightCORS.3");
      handleInvalidCORS(request, response, filterChain);
      return;
    }
    accessControlRequestMethod = accessControlRequestMethod.trim();
    
    String accessControlRequestHeadersHeader = request.getHeader("Access-Control-Request-Headers");
    System.out.println("handlePreflightCORS.4");
    List<String> accessControlRequestHeaders = new LinkedList();
    if ((accessControlRequestHeadersHeader != null) && (!accessControlRequestHeadersHeader.trim().isEmpty()))
    {
      String[] headers = accessControlRequestHeadersHeader.trim().split(",");
      for (String header : headers) {
        accessControlRequestHeaders.add(header.trim().toLowerCase());
        System.out.println("accessControlRequestHeaders="+header.trim().toLowerCase());
      }
    }
    if (!this.allowedHttpMethods.contains(accessControlRequestMethod))
    {
      handleInvalidCORS(request, response, filterChain);
      return;
    }
    System.out.println("handlePreflightCORS.5");
    //response.addHeader("Access-Control-Allow-Origin", "*");
    //response.addHeader("Access-Control-Allow-Headers", "accept,content-type,soapaction");
    /**/
    if (!accessControlRequestHeaders.isEmpty()) {
      for (String header : accessControlRequestHeaders) {
        if (!this.allowedHttpHeaders.contains(header))
        {
          handleInvalidCORS(request, response, filterChain);
          return;
        }
      }
    }
    System.out.println("handlePreflightCORS.6");
    if (this.supportsCredentials)
    {
      response.addHeader("Access-Control-Allow-Origin", origin);
      
      response.addHeader("Access-Control-Allow-Credentials", "true");
    }
    else if (this.anyOriginAllowed)
    {
      response.addHeader("Access-Control-Allow-Origin", "*");
    }
    else
    {
      response.addHeader("Access-Control-Allow-Origin", origin);
    }
    System.out.println("handlePreflightCORS.7");
    if (this.preflightMaxAge > 0L) {
      response.addHeader("Access-Control-Max-Age", String.valueOf(this.preflightMaxAge));
    }
    response.addHeader("Access-Control-Allow-Methods", accessControlRequestMethod);
    if ((this.allowedHttpHeaders != null) && (!this.allowedHttpHeaders.isEmpty())) {
      response.addHeader("Access-Control-Allow-Headers", join(this.allowedHttpHeaders, ","));
    }
    System.out.println("handlePreflightCORS.8");
    
  }
  
  private void handleNonCORS(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
    throws IOException, ServletException
  {
	  System.out.println("doFilter handleNonCORS");
    filterChain.doFilter(request, response);
  }
  
  private void handleInvalidCORS(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
  {
	  System.out.println("doFilter handleInvalidCORS");
    String origin = request.getHeader("Origin");
    String method = request.getMethod();
    String accessControlRequestHeaders = request.getHeader("Access-Control-Request-Headers");
    
    response.setContentType("text/plain");
    response.setStatus(403);
    response.resetBuffer();
    if (log.isDebugEnabled())
    {
      StringBuilder message = new StringBuilder("Invalid CORS request; Origin=");
      
      message.append(origin);
      message.append(";Method=");
      message.append(method);
      if (accessControlRequestHeaders != null)
      {
        message.append(";Access-Control-Request-Headers=");
        message.append(accessControlRequestHeaders);
      }
      log.debug(message.toString());
    }
  }
  
  public void destroy() {}
  
  protected static void decorateCORSProperties(HttpServletRequest request, CORSRequestType corsRequestType)
  {
    if (request == null) {
      throw new IllegalArgumentException("corsFilter.nullRequest");
    }
    if (corsRequestType == null) {
      throw new IllegalArgumentException("corsFilter.nullRequestType");
    }
    switch (corsRequestType)
    {
    case SIMPLE: 
      request.setAttribute("cors.isCorsRequest", Boolean.TRUE);
      
      request.setAttribute("cors.request.origin", request.getHeader("Origin"));
      
      request.setAttribute("cors.request.type", corsRequestType.name().toLowerCase());
      
      break;
    case ACTUAL: 
      request.setAttribute("cors.isCorsRequest", Boolean.TRUE);
      
      request.setAttribute("cors.request.origin", request.getHeader("Origin"));
      
      request.setAttribute("cors.request.type", corsRequestType.name().toLowerCase());
      
      break;
    case PRE_FLIGHT: 
      request.setAttribute("cors.isCorsRequest", Boolean.TRUE);
      
      request.setAttribute("cors.request.origin", request.getHeader("Origin"));
      
      request.setAttribute("cors.request.type", corsRequestType.name().toLowerCase());
      
      String headers = request.getHeader("Access-Control-Request-Headers");
      if (headers == null) {
        headers = "";
      }
      request.setAttribute("cors.request.headers", headers);
      
      break;
    case NOT_CORS: 
      request.setAttribute("cors.isCorsRequest", Boolean.FALSE);
      
      break;
    }
  }
  
  protected static String join(Collection<String> elements, String joinSeparator)
  {
    String separator = ",";
    if (elements == null) {
      return null;
    }
    if (joinSeparator != null) {
      separator = joinSeparator;
    }
    StringBuilder buffer = new StringBuilder();
    boolean isFirst = true;
    for (String element : elements)
    {
      if (!isFirst) {
        buffer.append(separator);
      } else {
        isFirst = false;
      }
      if (element != null) {
        buffer.append(element);
      }
    }
    return buffer.toString();
  }
  
  protected CORSRequestType checkRequestType(HttpServletRequest request)
  {
	  System.out.println("checkRequestType");
    CORSRequestType requestType = CORSRequestType.INVALID_CORS;
    if (request == null) {
      throw new IllegalArgumentException("corsFilter.nullRequest");
    }
    String originHeader = request.getHeader("Origin");
    if (originHeader != null)
    {
      if (originHeader.isEmpty())
      {
        requestType = CORSRequestType.INVALID_CORS;
      }
      else if (!isValidOrigin(originHeader))
      {
        requestType = CORSRequestType.INVALID_CORS;
      }
      else
      {
        String method = request.getMethod();
        if ((method != null) && (HTTP_METHODS.contains(method))) {
          if ("OPTIONS".equals(method))
          {
            String accessControlRequestMethodHeader = request.getHeader("Access-Control-Request-Method");
            if ((accessControlRequestMethodHeader != null) && (!accessControlRequestMethodHeader.isEmpty())) {
              requestType = CORSRequestType.PRE_FLIGHT;
            } else if ((accessControlRequestMethodHeader != null) && (accessControlRequestMethodHeader.isEmpty())) {
              requestType = CORSRequestType.INVALID_CORS;
            } else {
              requestType = CORSRequestType.ACTUAL;
            }
          }
          else if (("GET".equals(method)) || ("HEAD".equals(method)))
          {
            requestType = CORSRequestType.SIMPLE;
          }
          else if ("POST".equals(method))
          {
            String contentType = request.getContentType();
            if (contentType != null)
            {
              contentType = contentType.toLowerCase().trim();
              if (SIMPLE_HTTP_REQUEST_CONTENT_TYPE_VALUES.contains(contentType)) {
                requestType = CORSRequestType.SIMPLE;
              } else {
                requestType = CORSRequestType.ACTUAL;
              }
            }
          }
          else if (COMPLEX_HTTP_METHODS.contains(method))
          {
            requestType = CORSRequestType.ACTUAL;
          }
        }
      }
    }
    else {
      requestType = CORSRequestType.NOT_CORS;
    }
    return requestType;
  }
  
  private boolean isOriginAllowed(String origin)
  {
    if (this.anyOriginAllowed) {
      return true;
    }
    return this.allowedOrigins.contains(origin);
  }
  
  private void parseAndStore(String allowedOrigins, String allowedHttpMethods, String allowedHttpHeaders, String exposedHeaders, String supportsCredentials, String preflightMaxAge, String decorateRequest)
    throws ServletException
  {
    if (allowedOrigins != null) {
      if (allowedOrigins.trim().equals("*"))
      {
        this.anyOriginAllowed = true;
      }
      else
      {
        this.anyOriginAllowed = false;
        Set<String> setAllowedOrigins = parseStringToSet(allowedOrigins);
        
        this.allowedOrigins.clear();
        this.allowedOrigins.addAll(setAllowedOrigins);
      }
    }
    if (allowedHttpMethods != null)
    {
      Set<String> setAllowedHttpMethods = parseStringToSet(allowedHttpMethods);
      
      this.allowedHttpMethods.clear();
      this.allowedHttpMethods.addAll(setAllowedHttpMethods);
    }
    if (allowedHttpHeaders != null)
    {
      Set<String> setAllowedHttpHeaders = parseStringToSet(allowedHttpHeaders);
      
      Set<String> lowerCaseHeaders = new HashSet();
      for (String header : setAllowedHttpHeaders)
      {
        String lowerCase = header.toLowerCase();
        lowerCaseHeaders.add(lowerCase);
      }
      this.allowedHttpHeaders.clear();
      this.allowedHttpHeaders.addAll(lowerCaseHeaders);
    }
    if (exposedHeaders != null)
    {
      Set<String> setExposedHeaders = parseStringToSet(exposedHeaders);
      this.exposedHeaders.clear();
      this.exposedHeaders.addAll(setExposedHeaders);
    }
    if (supportsCredentials != null) {
      this.supportsCredentials = Boolean.parseBoolean(supportsCredentials);
    }
    if (preflightMaxAge != null) {
      try
      {
        if (!preflightMaxAge.isEmpty()) {
          this.preflightMaxAge = Long.parseLong(preflightMaxAge);
        } else {
          this.preflightMaxAge = 0L;
        }
      }
      catch (NumberFormatException e)
      {
        throw new ServletException("corsFilter.invalidPreflightMaxAge", e);
      }
    }
    if (decorateRequest != null) {
      this.decorateRequest = Boolean.parseBoolean(decorateRequest);
    }
  }
  
  private Set<String> parseStringToSet(String data)
  {
    String[] splits;
    if ((data != null) && (data.length() > 0)) {
      splits = data.split(",");
    } else {
      splits = new String[0];
    }
    Set<String> set = new HashSet();
    if (splits.length > 0) {
      for (String split : splits) {
        set.add(split.trim());
      }
    }
    return set;
  }
  
  protected static boolean isValidOrigin(String origin)
  {
    if (origin.contains("%")) {
      return false;
    }
    URI originURI;
    try
    {
      originURI = new URI(origin);
    }
    catch (URISyntaxException e)
    {
      return false;
    }
    return originURI.getScheme() != null;
  }
  
  public boolean isAnyOriginAllowed()
  {
    return this.anyOriginAllowed;
  }
  
  public Collection<String> getExposedHeaders()
  {
    return this.exposedHeaders;
  }
  
  public boolean isSupportsCredentials()
  {
    return this.supportsCredentials;
  }
  
  public long getPreflightMaxAge()
  {
    return this.preflightMaxAge;
  }
  
  public Collection<String> getAllowedOrigins()
  {
    return this.allowedOrigins;
  }
  
  public Collection<String> getAllowedHttpMethods()
  {
    return this.allowedHttpMethods;
  }
  
  public Collection<String> getAllowedHttpHeaders()
  {
    return this.allowedHttpHeaders;
  }
  
  protected static enum CORSRequestType
  {
    SIMPLE,  ACTUAL,  PRE_FLIGHT,  NOT_CORS,  INVALID_CORS;
    
    private CORSRequestType() {}
  }
  
  public static final Collection<String> HTTP_METHODS = new HashSet(Arrays.asList(new String[] { "OPTIONS", "GET", "HEAD", "POST", "PUT", "DELETE", "TRACE", "CONNECT" }));
  public static final Collection<String> COMPLEX_HTTP_METHODS = new HashSet(Arrays.asList(new String[] { "PUT", "DELETE", "TRACE", "CONNECT" }));
  public static final Collection<String> SIMPLE_HTTP_METHODS = new HashSet(Arrays.asList(new String[] { "GET", "POST", "HEAD" }));
  public static final Collection<String> SIMPLE_HTTP_REQUEST_HEADERS = new HashSet(Arrays.asList(new String[] { "Accept", "Accept-Language", "Content-Language" }));
  public static final Collection<String> SIMPLE_HTTP_RESPONSE_HEADERS = new HashSet(Arrays.asList(new String[] { "Cache-Control", "Content-Language", "Content-Type", "Expires", "Last-Modified", "Pragma" }));
  public static final Collection<String> SIMPLE_HTTP_REQUEST_CONTENT_TYPE_VALUES = new HashSet(Arrays.asList(new String[] { "application/x-www-form-urlencoded", "multipart/form-data", "text/plain" }));
  public static final String DEFAULT_ALLOWED_ORIGINS = "*";
  public static final String DEFAULT_ALLOWED_HTTP_METHODS = "GET,POST,HEAD,OPTIONS";
  public static final String DEFAULT_PREFLIGHT_MAXAGE = "1800";
  public static final String DEFAULT_SUPPORTS_CREDENTIALS = "true";
  public static final String DEFAULT_ALLOWED_HTTP_HEADERS = "Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers";
  public static final String DEFAULT_EXPOSED_HEADERS = "";
  public static final String DEFAULT_DECORATE_REQUEST = "true";
  public static final String PARAM_CORS_ALLOWED_ORIGINS = "cors.allowed.origins";
  public static final String PARAM_CORS_SUPPORT_CREDENTIALS = "cors.support.credentials";
  public static final String PARAM_CORS_EXPOSED_HEADERS = "cors.exposed.headers";
  public static final String PARAM_CORS_ALLOWED_HEADERS = "cors.allowed.headers";
  public static final String PARAM_CORS_ALLOWED_METHODS = "cors.allowed.methods";
  public static final String PARAM_CORS_PREFLIGHT_MAXAGE = "cors.preflight.maxage";
  public static final String PARAM_CORS_REQUEST_DECORATE = "cors.request.decorate";
}

