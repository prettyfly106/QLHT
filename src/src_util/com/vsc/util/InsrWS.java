package com.vsc.util;

import java.io.File;
import java.io.FileInputStream;
import java.security.MessageDigest;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONException;
import org.json.JSONObject;

import sun.misc.BASE64Encoder;


public class InsrWS {
	/*
	private static String url_base="http://127.0.0.1:8088/hPortal/RestSvc/";
	private static String URI_KCB="restSend.jsp?";
	private static String URI_LOGIN="restLogin.jsp";
	private static String URI_CHECK="restSend.jsp?";
	private static String URI_HISTORY="restSend.jsp";
	private static String URI_CHANGE_HOSPITAL="restSend.jsp";
	*/
	///*
//	private static String url_base="http://servicedemo.gdbhxh.vn/";
	private static String url_base= "http://egw.baohiemxahoi.gov.vn/";
	//private static String URI_KCB="api/egw/guiHoSoGiamDinh?";
	private static String URI_KCB="api/egw/guiHoSoGiamDinh?";
	private static String URI_TNHS_THANG="api/egw/tnhs_thangquy?";
	
	private static String URI_LOGIN="api/token/take";
	private static String URI_CHECK="api/egw/ktMathe?";
	private static String URI_HISTORY="api/egw/nhanLichSuKCB?";
	private static String URI_CHANGE_HOSPITAL="restSend.jsp";
	//*/
	private static String ws_usr;
	private static String ws_pwd;
	
	public static int LHS_DMT=1;
	public static int LHS_DMC=2;
	public static int LHS_KCB=3;
	public static int LHS_XLS79A=4;
	public static int LHS_XLS80A=5;
	public static int LHS_XLS19=6;
	public static int LHS_XLS20=7;
	public static int LHS_XLS21=8;
	public static void init(String url,String usr,String pwd) {
		url_base=url;
		ws_usr=usr;
		ws_usr=pwd;
	}
	
	
	static class UserToken {
		public UserToken(String _usr,String _pwd,String jsonStr) {
			try {
				//jsonStr={"access_token":"dHJXOFNaQ0YzYUY4YnAwS2pVWTZqcy9iay9rNkhRUWR4azV1eStKRUFhQT06MjVfNDZfU2VydmljZTE6MTMxMDM4NjY1NDgwNjkyNTUy","id_token":"39f43a9f-6091-4a6a-9fdb-a5b322776f1b","token_type":"Bearer","username":"25_46_Service1","expires_in":"2016-03-31T03:05:48.0692552Z"}
				userName=_usr;
				userPwd=_pwd;
				System.out.println("jsonStr="+jsonStr);
				JSONObject obj=new JSONObject(jsonStr);
				if( "200".equals(obj.getString("maKetQua")) && obj.getJSONObject("APIKey") != null ){
					access_token=obj.getJSONObject("APIKey").getString("access_token");
					id_token=obj.getJSONObject("APIKey").getString("id_token");
					token_type=obj.getJSONObject("APIKey").getString("token_type");
					//2016-03-17T04:16:34.5778217Z
					check_dt=new Date();
					String _gmt_date=obj.getJSONObject("APIKey").getString("expires_in");
					_gmt_date=_gmt_date.substring(0,23);
					expires_in=DateUtil.toDate(_gmt_date,"yyyy-MM-dd'T'HH:mm:ss.SSS");
					//expires_in.getTimezoneOffset();
					delta_t=expires_in.getTime()-expires_in.getTimezoneOffset()*60000-check_dt.getTime();
					System.out.println("userName="+userName+",userPwd="+userPwd+",\naccess_token="+access_token+"\nexpires_in="+expires_in.toString()+" delta_t="+delta_t+" expires_in.getTimezoneOffset();="+expires_in.getTimezoneOffset());
				}	
			}
			catch(Exception e) {
				e.printStackTrace();
			}
		}
		public void print() {
			System.out.println("userName="+userName+",userPwd="+userPwd+",\naccess_token="+access_token+"\nexpires_in="+expires_in.toString());
		}
		public boolean checkValid() {
			//print();
			Date curr_dt=new Date();
			long delta=curr_dt.getTime()-check_dt.getTime();
			if(delta_t>0 && delta<delta_t) {
				return true;
			}
			else {
				return false;
			}
		}
		public String userName;
		public String userPwd;
		public String access_token;
		public String id_token;
		public String token_type;
		public Date expires_in;
		public Date check_dt;
		public long delta_t;
	}
  
  //url_base="http://egw.baohiemxahoi.gov.vn/api/egw/";
  
  
  
  private static final Map<String, UserToken> mapUserData = new HashMap();
  private static UserToken doLogin(String _usr,String _pwd)  throws Exception{
	  //received=[username=thuannc&password=Bibonbon806]
	  //received=[username=test&password=123]
	  //rt={"access_token":"MkMxVHJ1YnNITytKUTdsQ0U4cTQrV05lZXhxMXg0MG5wbjBURXlzRWpiYz06MjVfNDZfU2VydmljZTE6MTMxMDU3ODY0NzMwMTk0ODQy","id_token":"0a1acadf-deda-4629-b2b4-19a7f03505dd","token_type":"Bearer","username":"25_46_Service1","expires_in":"2016-04-22T08:24:33.0194842Z"}

	  	String url = url_base+URI_LOGIN;
	  	//String url = "http://egw.baohiemxahoi.gov.vn/api/token/take";
	  	HttpUtil http = new HttpUtil();
	  	UserToken ut=null;
	  	MessageDigest md = MessageDigest.getInstance("MD5");
		md.update(_pwd.getBytes());
		byte[] digest = md.digest();
		StringBuffer sb = new StringBuffer();
		for (byte b : digest) {
			sb.append(String.format("%02x", b & 0xff));
		}
	  	String md5_pwd=sb.toString();
	  	
	  	
	  	md5_pwd=md5_pwd.toUpperCase();
	  	ut=mapUserData.get(_usr);
	  	if(ut==null|| !ut.checkValid()) {
	  		JSONObject jsonObj=new JSONObject();
	  	  jsonObj.put("username", _usr);
	  	  jsonObj.put("password", md5_pwd);
	  	  String jsonStr=jsonObj.toString();
			//List<NameValuePair> postParams =  http.getFormParams(page, "username","password");
			//List<NameValuePair> postParams = new ArrayList<NameValuePair>();
			//postParams.add(new BasicNameValuePair("username", _usr));
			//postParams.add(new BasicNameValuePair("password", md5_pwd));
			//String rt=http.sendPost(url, postParams);
	  	    String rt=http.sendPostJson(url,jsonStr);
			ut=new UserToken(_usr,md5_pwd,rt);
			ut.print();
			mapUserData.put(_usr, ut);
	  	}
		System.out.println("doLogin Done");
		return ut;
  }
  
  public static String doCheck(String _usr,String _pwd,String ma_the,String ho_ten,String ngay_sinh,int gioi_tinh,String maCSKCB,String ngay_bd,String ngay_kt)  throws Exception {
	  String rt="";
	  String url = url_base+URI_CHECK;
	  JSONObject jsonObj=new JSONObject();
	  jsonObj.put("ma_the", ma_the);
	  jsonObj.put("ho_ten", ho_ten);
	  jsonObj.put("ngay_sinh", ngay_sinh);
	  jsonObj.put("gioi_tinh", gioi_tinh);
	  jsonObj.put("maCSKCB", maCSKCB);
	  jsonObj.put("ngay_bd", ngay_bd);
	  jsonObj.put("ngay_kt", ngay_kt);
	  //String jsonStr="";
	  //jsonStr ="{\"ma_the\":\"DN401AA31900023\",\"maCSKCB\":\"01009\",\"ngay_sinh\":\"10/06/1982\",\"ngay_kt\":\"31/12/2016\",\"gioi_tinh\":1,\"ngay_bd\":\"01/01/2016\",\"ho_ten\":\"NGUYEN THANH NAM\"}";
	  //jsonStr="{'ma_the':'12345','ho_ten':'Trung','ngay_sinh':'04/12/1980','gioi_tinh':1,'maCSKCB':'45678','ngay_bd':'01/01/2015','ngay_kt':'01/01/2016'}";
	  /*
	  {
		  “ma_the”: { ma_the },
		  “ho_ten”: { ho_ten },
		  “ngay_sinh”: { ngay_sinh },
		  “gioi_tinh”: { gioi_tinh },
		  “maCSKCB”: { maCSKCB },
		  “ngay_bd”: { ngay_bd },
		  “ngay_kt”: { ngay_kt }
	  }
	  */
	  UserToken ut=mapUserData.get(_usr);
	  if(ut!=null && ut.checkValid()) {
		  System.out.println("User token valid");
	  }
	  else {
		  System.out.println("doLogin Start");
		  ut=doLogin(_usr,_pwd);
	  }
	  if(ut.checkValid()) {
		  String param="token="+ut.access_token+"&id_token="+ut.id_token+"&username="+ut.userName+"&password="+ut.userPwd;
		  
		  HttpUtil http = new HttpUtil();
		  rt=http.sendPostJson(url+param,jsonObj.toString());
		  JSONObject obj=new JSONObject(rt);
		  //rt="{maKetQua:\"1234567\",moTaKetQua:\"Giao dich thanh cong\",maGDich:\"123\"}";
		  
//		  System.out.println("maKetQua="+obj.getString("maKetQua")+",moTaKetQua="+obj.getString("chi_tiet")+",maGDich="+obj.getString("maGDich"));
		  System.out.println("maKetQua="+obj.getString("maKetQua")+",moTaKetQua="+obj.getString("chiTietThe"));
		  System.out.println("doSend Done");
	  }
	  return rt;
 }
  public static String getHistory(String _usr,String _pwd,String ma_the,String ho_ten,String ngay_sinh,String gioi_tinh,String maCSKCB,String ngay_bd,String ngay_kt)  throws Exception {
	  String rt="";
	  String url = url_base+URI_HISTORY;
	  JSONObject jsonObj=new JSONObject();
	  jsonObj.put("maThe", ma_the);
	  jsonObj.put("hoTen", ho_ten);
	  jsonObj.put("ngaySinh", ngay_sinh);
	  jsonObj.put("gioiTinh", gioi_tinh);
	  jsonObj.put("maCSKCB", maCSKCB);
	  jsonObj.put("ngayBD", ngay_bd);
	  jsonObj.put("ngayKT", ngay_kt);
	 
	  String jsonStr=jsonObj.toString();
	  /*
	  {
		  “ma_the”: { ma_the },
		  “ho_ten”: { ho_ten },
		  “ngay_sinh”: { ngay_sinh },
		  “gioi_tinh”: { gioi_tinh },
		  “maCSKCB”: { maCSKCB },
		  “ngay_bd”: { ngay_bd },
		  “ngay_kt”: { ngay_kt }
	  }
	  */
	  UserToken ut=mapUserData.get(_usr);
	  MessageDigest md = MessageDigest.getInstance("MD5");
		md.update(_pwd.getBytes());
		byte[] digest = md.digest();
		StringBuffer sb = new StringBuffer();
		for (byte b : digest) {
			sb.append(String.format("%02x", b & 0xff));
		}
	  	String md5_pwd=sb.toString();
	  	
	  	
	  	md5_pwd=md5_pwd.toUpperCase();
	  if(ut!=null && ut.checkValid()) {
		  System.out.println("User token valid");
	  }
	  else { 
		  System.out.println("doLogin Start");
		  ut=doLogin(_usr,_pwd);
	  }
	  if(ut.checkValid()) {
//		  String param="token="+ut.access_token+"&id_token="+ut.id_token+"&username="+_usr+"&password="+_pwd+"&tungay="+tungay+"& denngay="+denngay;
		  String param="token="+ut.access_token+"&id_token="+ut.id_token+"&username="+_usr+"&password="+md5_pwd;
		  System.out.println("===getHistory--param====>"+url+param);
		  HttpUtil http = new HttpUtil();
		  rt=http.sendPostJson(url+param,jsonStr);
		  //JSONObject obj=new JSONObject(rt);
		  //System.out.println("maKetQua="+obj.getString("maKetQua")+",moTaKetQua="+obj.getString("chi_tiet")+",maGDich="+obj.getString("maGDich"));
		  System.out.println("getHistory Done");
	  }
	  return rt;
 }
  public static String sendChangeHospital(String _usr,String _pwd,String tungay,String denngay,String ma_the,String ho_ten,String ngay_sinh,String gioi_tinh,String cskcb_di,String cskcb_den,String fileHS)  throws Exception {
	  String rt="";
	  String url = url_base+URI_CHANGE_HOSPITAL;
	  JSONObject jsonObj=new JSONObject();
	  jsonObj.put("ma_the", ma_the);
	  jsonObj.put("ho_ten", ho_ten);
	  jsonObj.put("ngay_sinh", ngay_sinh);
	  jsonObj.put("gioi_tinh", gioi_tinh);
	  jsonObj.put("cskcb_di", cskcb_di);
	  jsonObj.put("cskcb_den", cskcb_den);
	  jsonObj.put("fileHS", fileHS);
	  String jsonStr=jsonObj.toString();
	  
	  UserToken ut=mapUserData.get(_usr);
	  if(ut!=null && ut.checkValid()) {
		  System.out.println("User token valid");
	  }
	  else {
		  System.out.println("doLogin Start");
		  ut=doLogin(_usr,_pwd);
	  }
	  if(ut.checkValid()) {
		  String param="token="+ut.access_token+"&id_token="+ut.id_token+"&username="+_usr+"&password="+_pwd;
		  
		  HttpUtil http = new HttpUtil();
		  rt=http.sendPostJson(url+param,jsonStr);
		  //JSONObject obj=new JSONObject(rt);
		  //System.out.println("maKetQua="+obj.getString("maKetQua")+",moTaKetQua="+obj.getString("chi_tiet")+",maGDich="+obj.getString("maGDich"));
		  System.out.println("sendChangeHospital Done");
	  }
	  return rt;
 }
  public static String sendChangeHospital(String _usr,String _pwd,String ma_the,String ho_ten,String ngay_sinh,int gioi_tinh,String cskcb_di,String cskcb_den,byte[] fileHS)  throws Exception {
	  String rt="";
	  String url = url_base+URI_CHANGE_HOSPITAL;
	  JSONObject jsonObj=new JSONObject();
	  jsonObj.put("ma_the", ma_the);
	  jsonObj.put("ho_ten", ho_ten);
	  jsonObj.put("ngay_sinh", ngay_sinh);
	  jsonObj.put("gioi_tinh", gioi_tinh);
	  jsonObj.put("cskcb_di", cskcb_di);
	  jsonObj.put("cskcb_den", cskcb_den);
	  jsonObj.put("fileHS", fileHS);
	  String jsonStr=jsonObj.toString();
	  /*
	  {
      “ma_the”: { ma_the },
      “ho_ten”: { ho_ten },
      “ngay_sinh”: { ngay_sinh },
      “gioi_tinh”: { gioi_tinh },
      “cskcb_di”: { cskcb_di },
      “cskcb_den”: { cskcb_den },
      “fileHS” : {fileHS} 
} 

	  */
	  UserToken ut=mapUserData.get(_usr);
	  if(ut!=null && ut.checkValid()) {
		  System.out.println("User token valid");
	  }
	  else {
		  System.out.println("doLogin Start");
		  ut=doLogin(_usr,_pwd);
	  }
	  if(ut.checkValid()) {
		  String param="token="+ut.access_token+"&id_token="+ut.id_token+"&username="+_usr+"&password="+_pwd;
		  
		  HttpUtil http = new HttpUtil();
		  rt=http.sendPostJson(url+param,jsonStr);
		  //JSONObject obj=new JSONObject(rt);
		  //System.out.println("maKetQua="+obj.getString("maKetQua")+",moTaKetQua="+obj.getString("chi_tiet")+",maGDich="+obj.getString("maGDich"));
		  System.out.println("sendChangeHospital Done");
	  }
	  return rt;
 }
  
  public static String receiveChangeHospital(String _usr,String _pwd,String tungay,String denngay,String ma_the,String ho_ten,String ngay_sinh,String gioi_tinh,String cskcb_di,String cskcb_den)  throws Exception {
	  String rt="";
	  String url = url_base+URI_CHANGE_HOSPITAL;
	  JSONObject jsonObj=new JSONObject();
	  jsonObj.put("ma_the", ma_the);
	  jsonObj.put("ho_ten", ho_ten);
	  jsonObj.put("ngay_sinh", ngay_sinh);
	  jsonObj.put("gioi_tinh", gioi_tinh);
	  jsonObj.put("cskcb_di", cskcb_di);
	  jsonObj.put("cskcb_den", cskcb_den);
	  String jsonStr=jsonObj.toString();
	  
	  UserToken ut=mapUserData.get(_usr);
	  if(ut!=null && ut.checkValid()) {
		  System.out.println("User token valid");
	  }
	  else {
		  System.out.println("doLogin Start");
		  ut=doLogin(_usr,_pwd);
	  }
	  if(ut.checkValid()) {
		  String param="token="+ut.access_token+"&id_token="+ut.id_token+"&username="+_usr+"&password="+_pwd;
		  
		  HttpUtil http = new HttpUtil();
		  rt=http.sendPostJson(url+param,jsonStr);
		  //JSONObject obj=new JSONObject(rt);
		  //System.out.println("maKetQua="+obj.getString("maKetQua")+",moTaKetQua="+obj.getString("chi_tiet")+",maGDich="+obj.getString("maGDich"));
		  System.out.println("receiveChangeHospital Done");
	  }
	  return rt;
 }
  
  public static String doSendXML(String _type,String _usr,String _pwd,String _loai_hs,String _ma_tinh,String _ma_cskcb,String xmlData)  throws Exception {
	  String rt="";
	  String url = url_base+URI_LOGIN;
	  if(_type.equalsIgnoreCase("KCB")) {
		  url = url_base+URI_KCB;
	  }
	  else if(_type.equalsIgnoreCase("KCB")) {
		  url = url_base+URI_KCB;
	  }
	  UserToken ut=mapUserData.get(_usr);
	  if(ut!=null && ut.checkValid()) {
		  System.out.println("User token valid");
	  }
	  else {
		  System.out.println("doLogin Start");
		  ut=doLogin(_usr,_pwd);
	  }
	  if(ut.checkValid()) {
		  
		  MessageDigest md = MessageDigest.getInstance("MD5");
			md.update(_pwd.getBytes());
			byte[] digest = md.digest();
			StringBuffer sb = new StringBuffer();
			for (byte b : digest) {
				sb.append(String.format("%02x", b & 0xff));
			}
		  	String md5_pwd=sb.toString();
		  	
		  	
		  	md5_pwd=md5_pwd.toUpperCase();
		  
		  String param="token="+ut.access_token+"&id_token="+ut.id_token+"&username="+_usr+"&password="+md5_pwd+"&loaiHoSo="+_loai_hs+"&maTinh="+_ma_tinh+"&maCSKCB="+_ma_cskcb;
		  
		  
		  BASE64Encoder base64e=new BASE64Encoder();
		  String base64data=base64e.encode(xmlData.getBytes());
		  //base64data="\""+base64data+"\"";
		  
		  String jsonStr=base64data;
		  /*
		  JSONObject jsonObj=new JSONObject();
		  jsonObj.put("fileHS", base64data);
		  jsonStr=jsonObj.toString();
		  */
		  System.out.println("doSend jsonStr="+jsonStr);
		  HttpUtil http = new HttpUtil();
		  rt=http.sendPostJson(url+param,jsonStr);
		  
		  
		  JSONObject obj=new JSONObject(rt);
		  //rt="{maKetQua:\"1234567\",moTaKetQua:\"Giao dich thanh cong\",maGDich:\"123\"}";
		  System.out.println("maKetQua="+obj.getString("maKetQua")+",moTaKetQua="+obj.getString("moTaKetQua")+",maGDich="+obj.getString("maGDich"));
		  System.out.println("doSend Done");
	  }
	  return rt;
 }
  public static String doSendXML(String _usr,String _pwd,int _loai_hs,String _ma_tinh,String _ma_cskcb,byte[] xmlData)  throws Exception {
	  String rt="";
	  String url = url_base+URI_LOGIN;
	  if(_loai_hs==1||_loai_hs==2||_loai_hs==3) {
		  url = url_base+URI_KCB;
	  }
	  else if(_loai_hs==4||_loai_hs==5||_loai_hs==6||_loai_hs==7||_loai_hs==8) {
		  url = url_base+URI_TNHS_THANG;
	  }
	  
	  UserToken ut=mapUserData.get(_usr);
	  if(ut!=null && ut.checkValid()) {
		  System.out.println("User token valid");
	  }
	  else {
		  System.out.println("doLogin Start");
		  ut=doLogin(_usr,_pwd);
	  }
	  if(ut.checkValid()) {
		  
		  MessageDigest md = MessageDigest.getInstance("MD5");
			md.update(_pwd.getBytes());
			byte[] digest = md.digest();
			StringBuffer sb = new StringBuffer();
			for (byte b : digest) {
				sb.append(String.format("%02x", b & 0xff));
			}
		  	String md5_pwd=sb.toString();
		  	
		  	
		  	md5_pwd=md5_pwd.toUpperCase();
		  	
		  String param="token="+ut.access_token+"&id_token="+ut.id_token+"&username="+_usr+"&password="+md5_pwd+"&loaiHoSo="+_loai_hs+"&maTinh="+_ma_tinh+"&maCSKCB="+_ma_cskcb;
		  System.out.println("========URL=========>"+url+param);
		  HttpUtil http = new HttpUtil();
		 
		  rt=http.sendPostBytes(url+param,xmlData);
		  
		  if( rt != null ){
			  JSONObject obj=new JSONObject(rt);
			  //rt="{maKetQua:\"1234567\",moTaKetQua:\"Giao dich thanh cong\",maGDich:\"123\"}";
			  System.out.println("maKetQua="+obj.getString("maKetQua")+",maGDich="+obj.getString("maGiaoDich"));
			  System.out.println("doSend Done");
		  }else{
			  System.out.println("doSend Fail");
		  }
	  }
	  return rt;
 }
  
  
  
  
  public static byte[] readFileB(String fileName) {
	  byte fileContent[]=null;
	  
	          File file = new File(fileName);
	          FileInputStream fin = null;
	          try {
	              fin = new FileInputStream(file);
	              fileContent = new byte[(int)file.length()];
	              fin.read(fileContent);
	          }
	          catch (Exception e) {
	              System.out.println("File not found" + e);
	          }
	          
	          finally {
	              try {
	                  if (fin != null) {
	                      fin.close();
	                  }
	              }
	              catch (Exception ioe) {
	                  System.out.println("Error while closing stream: " + ioe);
	              }
	          }
	          return fileContent;
	      }
  
  public static void initData(int opt) {
		if(opt==0) {
			url_base="http://servicedemo.gdbhxh.vn/";
			//URI_KCB="api/egw/guiHoSoGiamDinh?";
			URI_KCB="api/egw/guiHoSoGiamDinh?";
			URI_TNHS_THANG="api/egw/tnhs_thangquy?";
			URI_LOGIN="api/token/take";
			URI_CHECK="api/egw/ktMathe?";
			URI_HISTORY="restSend.jsp";
			URI_CHANGE_HOSPITAL="restSend.jsp";
		}
		else {
			url_base="http://127.0.0.1:8088/hPortal/RestSvc/";
			URI_KCB="restSend.jsp?";
			URI_TNHS_THANG="restSend.jsp?";
			URI_LOGIN="restLogin.jsp";
			URI_CHECK="restSend.jsp?";
			URI_HISTORY="restSend.jsp";
			URI_CHANGE_HOSPITAL="restSend.jsp";
		}
	}
  public static void main(String[] args) throws Exception {
	  /*
	  	String url = "https://accounts.google.com/ServiceLoginAuth";
	  	String gmail = "https://mail.google.com/mail/";

	  	// make sure cookies is turn on
	  	CookieHandler.setDefault(new CookieManager());

	  	WSUtil http = new WSUtil();

	  	String page = http.getPageContent(url);
	  	
	  	//List<NameValuePair> postParams =  http.getFormParams(page, "username","password");
	  	List<NameValuePair> postParams = new ArrayList<NameValuePair>();
	  	postParams.add(new BasicNameValuePair("username", "thuannc.vn@gmail.com"));
	  	postParams.add(new BasicNameValuePair("password", "Bibonbon806"));
	  	http.sendPost(url, postParams);

	  	String result = http.getPageContent(gmail);
	  	System.out.println(result);

	  	System.out.println("Done");
	  */
	  	  
	  	  //Date dt=toDate("2016-03-25T03:38:08.4250605Z","yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
	  	  //Date dt=toDate("2016-03-21T04:05:06.541+0700","yyyy-MM-dd'T'HH:mm:ss.SSSZ");
	  	  
	  	  //System.out.println("User token valid="+dt.toString());
	  	  //doLogin("test","25D55AD283AA400AF464C76D713C07AD");
//	  	  doCheck("96001_BV","1qaz2wsx","DN401AA31900023","NGUYỄN THANH NAM","10/06/1982",1,"01009","01/01/2016","31/12/2016");
	  	  //doCheck("25_46_Service1","1qaz2wsx","DN401AA31900029","Nguyễn Việt Trung","04/12/1980",1,"01009","01/01/2016","31/12/2016");
	  
	  //(String _usr,String _pwd,String tungay,String denngay,String ma_the,String ho_ten,String ngay_sinh,String gioi_tinh,String maCSKCB,String ngay_bd,String ngay_kt)
//	  	  getHistory("25_46_Service1","1qaz2wsx","01/01/2016","01/04/2016","DN401AA31900029","Nguyễn Việt Trung","04/12/1980","1","01009","01/01/2016","31/12/2016");
//	  		getHistory("96001_BV","1qaz2wsx","DN401AA31900023","NGUYỄN THANH NAM","10/06/1982","1","01009","01/01/2016","31/12/2016");			  
	  	  /*
	  	   [token=eGVuNjJCcXhjaU8vTlFnZEFlTzd6TFRZZU1LVEFORHRJOXFZMU1OcmNhQT06MjVfNDZfU2VydmljZTE6MTMxMDMzNjgzM
	  			  DYzOTMwMzcy&id_token=5bfc302a-006b-42a3-b0a3-a61fc7a2de6c&username=25_46_Service1&password=1C63129AE
	  			  9DB9C60C3E8AA94D3E00495&loaiHoSo=3&maTinh=&maCSKCB=2345678]
	  	   */
	  	  //initData(0);
	  	  //String xml="<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<GiamDinhHS></GiamDinhHS>";
	  	  byte[] xmlBytes=readFileB("D:\\xml_data\\20160706153511_937.xml");
//	  	  byte[] xmlBytes=xml.getBytes("UTF-8");
	  	 // String rt= new String(xmlBytes);
	  	  //System.out.println("doSendXML=\n"+rt);
	  	  doSendXML("37721_BV","04011964",LHS_KCB,"0","37721",xmlBytes);
//	  	doSendXML("KCB","96001_BV","1qaz2wsx","3","0","01010",rt);
//	  doCheck();
	  	  //test2();
	    } 
}
