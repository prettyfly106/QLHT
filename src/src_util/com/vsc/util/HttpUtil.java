package com.vsc.util;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.text.SimpleDateFormat;
import java.util.Date;



//import oracle.net.aso.MD5;









import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ByteArrayEntity;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;

import sun.misc.BASE64Encoder;


public class HttpUtil {
	private HttpClient client = HttpClientBuilder.create().build();
	private static final String USER_AGENT = "Mozilla/5.0";
	
	
	
  public String sendPostJson(String url, String jsonStr) throws Exception {
	   String rt="";
		HttpPost post = new HttpPost(url);
		// add header
		System.out.println("url : " + url);
		System.out.println("jsonStr : " + jsonStr);
		post.setHeader("User-Agent", USER_AGENT);
		post.setHeader("Content-Type", "application/json");
		StringEntity entity =new StringEntity(jsonStr,"UTF-8");
		post.setEntity(entity);
	    HttpResponse response = client.execute(post);
		int responseCode = response.getStatusLine().getStatusCode();
		System.out.println("Response Code : " + responseCode);
		System.out.println("Reason : " + response.getStatusLine().getReasonPhrase());
		if(responseCode==200) {
			BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
	
			StringBuffer result = new StringBuffer();
			String line = "";
			while ((line = rd.readLine()) != null) {
				result.append(line);
			}
			rt=result.toString();
			System.out.println("rt="+rt);
		}
		else {
			throw new Exception(""+responseCode);
		}
		
		return rt;

	  }
 
 
  public String sendPost(String url, String xml) throws Exception {
	   String rt="";
		HttpPost post = new HttpPost(url);
		// add header
		//post.setHeader("Host", "accounts.google.com");
		post.setHeader("User-Agent", USER_AGENT);
		//post.setHeader("Accept","text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
		//post.setHeader("Accept-Language", "en-US,en;q=0.5");
		//post.setHeader("Cookie", getCookies());
		//post.setHeader("Connection", "keep-alive");
		//post.setHeader("Referer", "https://accounts.google.com/ServiceLoginAuth");
		//post.setHeader("Content-Type", "application/x-www-form-urlencoded");
		post.setHeader("Content-Type", "application/json");
		String fileData=xml;//readFileBinary(fileName);
		//fileData="\""+fileData+"\"";
		BASE64Encoder base64e=new BASE64Encoder();
		String base64data=base64e.encode(fileData.getBytes());
		base64data="\""+base64data+"\"";
		byte[] bytes=base64data.getBytes();
		ByteArrayEntity body = null;
		body = new ByteArrayEntity(bytes);
		post.setEntity(body);
	    HttpResponse response = client.execute(post);

		int responseCode = response.getStatusLine().getStatusCode();
		System.out.println("\nSending 'POST' request to URL : " + url);
		System.out.println("Post parameters : \n" + fileData);
		System.out.println("Post parameters base64data: \n" + base64data);
		System.out.println("Response Code : " + responseCode);
		System.out.println("Reason : " + response.getStatusLine().getReasonPhrase());
		
		if(responseCode==200) {
			BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
	
			StringBuffer result = new StringBuffer();
			String line = "";
			while ((line = rd.readLine()) != null) {
				result.append(line);
			}
	
			System.out.println("result="+result.toString());
			rt=result.toString();
		}
		else {
			throw new Exception(""+responseCode);
		}
		return rt;

	  }
  
  public String sendPostBytes(String url,byte[] xmlBytes) throws Exception {
	  if(xmlBytes == null || xmlBytes.length == 0 )return null;
	   String rt="";
		HttpPost post = new HttpPost(url);
		post.setHeader("User-Agent", USER_AGENT);
		post.setHeader("Content-Type", "application/json");
		BASE64Encoder base64e=new BASE64Encoder();
		String base64data=base64e.encode(xmlBytes);
		base64data="\""+base64data+"\"";
		byte[] bytes=base64data.getBytes();
		ByteArrayEntity body = null;
		body = new ByteArrayEntity(bytes);
		post.setEntity(body);
	    HttpResponse response = client.execute(post);

		int responseCode = response.getStatusLine().getStatusCode();
		System.out.println("\nSending 'POST' request to URL : " + url);
		//System.out.println("Post parameters : \n" + fileData);
		System.out.println("Post parameters base64data: \n" + base64data);
		System.out.println("Response Code : " + responseCode);
		System.out.println("Reason : " + response.getStatusLine().getReasonPhrase());
		
		if(responseCode==200) {
			BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
	
			StringBuffer result = new StringBuffer();
			String line = "";
			while ((line = rd.readLine()) != null) {
				result.append(line);
			}
	
			System.out.println("result="+result.toString());
			rt=result.toString();
		}
		else {
			throw new Exception(""+responseCode);
		}
		return rt;

	  }
  
}
