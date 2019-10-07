package com.xmlutil;
import java.io.BufferedOutputStream;
import java.io.BufferedWriter;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.io.StringReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.stream.XMLEventReader;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamConstants;
import javax.xml.stream.XMLStreamReader;

import oracle.jdbc.pool.OracleDataSource;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
public class Util {
	public static final char[] TCVN={'\u00FC','\u00FB','\u00FE','\u00FA','\u00F9','\u00F7','\u00F6','\u00F5','\u00F8','\u00F1','\u00F4','\u00EE','\u00EC','\u00EB','\u00EA','\u00ED','\u00E9','\u00E7','\u00E6','\u00E5','\u00E8','\u00E1','\u00E4','\u00DE','\u00D8','\u00D6','\u00D4','\u00D3','\u00D2','\u00D5','\u00CF','\u00CE','\u00D1','\u00C6','\u00BD','\u00BC','\u00AB','\u00BE','\u00CB','\u00C9','\u00C8','\u00C7','\u00CA','\u00B6','\u00B9','\u00AD','\u00A6','\u00AC','\u00A5','\u00F2','\u00DC','\u00AE','\u00A8','\u00A1','\u00F3','\u00EF','\u00E2','\u00BB','\u00E3','\u00DF','\u00DD','\u00D7','\u00AA','\u00D0','\u00CC','\u00B7','\u00A9','\u00B8','\u00B5','\u00A4','\u00A7','\u00A3','\u00A2'};
	public static final char[] UNICODE={'\u1EF9','\u1EF7','\u1EF5','\u1EF3','\u1EF1','\u1EEF','\u1EED','\u1EEB','\u1EE9','\u1EE7','\u1EE5','\u1EE3','\u1EE1','\u1EDF','\u1EDD','\u1EDB','\u1ED9','\u1ED7','\u1ED5','\u1ED3','\u1ED1','\u1ECF','\u1ECD','\u1ECB','\u1EC9','\u1EC7','\u1EC5','\u1EC3','\u1EC1','\u1EBF','\u1EBD','\u1EBB','\u1EB9','\u1EB7','\u1EB5','\u1EB3','\u00F4','\u1EAF','\u1EAD','\u1EAB','\u1EA9','\u1EA7','\u1EA5','\u1EA3','\u1EA1','\u01B0','\u01AF','\u01A1','\u01A0','\u0169','\u0129','\u0111','\u0103','\u0102','\u00FA','\u00F9','\u00F5','\u1EB1','\u00F3','\u00F2','\u00ED','\u00EC','\u00EA','\u00E9','\u00E8','\u00E3','\u00E2','\u00E1','\u00E0','\u00D4','\u0110','\u00CA','\u00C2'};
	
	private static final Logger log=Logger.getLogger(Util.class);
	
	public static String get_seq(Connection conn,String seq) throws Exception{
		PreparedStatement ps=null;
		ResultSet rs=null;
		String result=null;
		try 
		{
			ps=conn.prepareStatement("select "+seq+".nextval from dual");
			rs=ps.executeQuery();
			if (rs.next()) 	result=rs.getString(1);
		}
		catch (Exception e) 
		{
			throw e;
		}
		finally 
		{
			close_db(rs, ps);
		}
		return result;
	}
	
	public static void rollback(Connection conn) {
		if (conn !=null) 
		{
			try	{
				conn.rollback();
			} 
			catch (SQLException ex){}
		}	
	}
	
	public static void close_xml_stream_reader(XMLStreamReader xsr){
		if (xsr!=null)
		{	
			try 
			{
				xsr.close();
			} catch (Exception e){}
		}
	}
	

	
	
	public static void close_conn(Connection conn) {
		if (conn !=null) 
		{
			try 
			{
				conn.close();
			} 
			catch (SQLException e){}
		}
	}
	
	public static void close_ps(PreparedStatement ps) {
		if (ps !=null) 
		{
			try 
			{
				ps.close();
			} 
			catch (SQLException e){}
		}
	}		
	public static void close_db(ResultSet rs,PreparedStatement ps) {
		if (rs !=null) 
		{
			try 
			{
				rs.close();
			} 
			catch (SQLException e){}
		}
		if (ps !=null) 
		{
			try 
			{
				ps.close();
			} 
			catch (SQLException e){}
		}		
	}
	public static Connection get_conn(String url) {
		Connection conn = null;
		boolean b = true;
		while (b) 
		{
			try
			{
			    //Class.forName("oracle.jdbc.driver.OracleDriver");
			    //conn = DriverManager.getConnection(url);
			    //Statement stmt=conn.createStatement();
			    
				OracleDataSource ods = new OracleDataSource();
//				System.out.println("get_conn url="+url);
				ods.setURL(url);
				conn = ods.getConnection();
				conn.setAutoCommit(true);
				b = false;
				System.out.println("get_conn OK");
			} 
			catch (Exception e) 
			{
				System.out.println("get_conn FAIL");
				e.printStackTrace(); 
				b = true;
				 try 
				 {
					Thread.sleep(60000);
				 }
				 catch (Exception ex) 
				 {
					 log.error("get_conn:"+ex);
				 }
			}
		}
		return conn;
	}

	
	public static DocumentBuilderFactory get_dbf() throws Exception{
		DocumentBuilderFactory dbf=DocumentBuilderFactory.newInstance();
        dbf.setIgnoringElementContentWhitespace(true);
        return dbf;
	}

	public static Document str2doc(DocumentBuilderFactory dbf,String str) throws Exception{
        DocumentBuilder db=dbf.newDocumentBuilder(); 
        return db.parse(new ByteArrayInputStream(str.getBytes("UTF-8")));
    }
	
	/*public static String doc2str(Document doc) throws Exception {
		Source source=new DOMSource(doc);
		StringWriter writer=new StringWriter();
		Result result=new StreamResult(writer);
		Transformer transformer=TransformerFactory.newInstance().newTransformer();
		//transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
		//transformer.setOutputProperty(OutputKeys.INDENT, "no");
		transformer.transform(source, result);
		return writer.toString();
	}*/
	public static boolean check_element(XMLInputFactory xif,String xml,String element) throws Exception
	{
		XMLStreamReader xsr=null;
		boolean retval=false;
		try 
		{
			xsr=xif.createXMLStreamReader(new StringReader(xml));
			while (xsr.hasNext())
			{
			    if (xsr.next()==XMLStreamConstants.START_ELEMENT && element.equals(xsr.getLocalName()))
			    {
	    			retval=true;
		    		break;
			    }
			}
			return retval;
		}
		catch (Exception e) 
		{
			throw e;
		}
		finally
		{
			close_xml_stream_reader(xsr);
		}
	}

	public static String get_element(XMLInputFactory xif,String xml,String element) throws Exception
	{
		XMLStreamReader xsr=null;
		String retval="";
		try 
		{
			xsr=xif.createXMLStreamReader(new StringReader(xml));
			while (xsr.hasNext())
			{
			    if (xsr.next()==XMLStreamConstants.START_ELEMENT && element.equals(xsr.getLocalName()))
			    {
			    	retval=xsr.getElementText();
		    		break;
			    }
			}
			return retval;
		}
		catch (Exception e) 
		{
			throw e;
		}
		finally
		{
			close_xml_stream_reader(xsr);
		}
	}
	public static String element(String name,String content) {
		String xml;
		if (StringUtils.isNotBlank(content)) xml="<"+name+">"+content+"</"+name+">";
		else								 xml="<"+name+"/>";
		return xml;
	}
	
	public static String getElementsByTagName(Element element,String tag) throws Exception{
		if (element==null)  return "";
		String str="";
		NodeList nodes=element.getElementsByTagName(tag);
		if (nodes!=null && nodes.getLength()>0){
			Node node=nodes.item(0).getFirstChild();
			if (node!=null) str=node.getNodeValue();
		}
		return str;
	}
	
	   
	public static String tcvn2unicode(String str){
		if(StringUtils.isBlank(str)) return "";
		StringBuffer sb=new StringBuffer();
		char[] arr=str.toCharArray();
		for(int i=0;i<arr.length;i++){
			char chr=arr[i];
			for (int j=0;j<TCVN.length;j++) {
		    	if(chr==TCVN[j]) {
		    		chr=UNICODE[j];
		    		break;
		    	}
			}
			sb.append(chr);
		}
	    return sb.toString();
	}
	
	public static String unicode2tcvn(String str){
		if(StringUtils.isBlank(str)) return "";
		StringBuffer sb=new StringBuffer();
		char[] arr=str.toCharArray();
		for(int i=0;i<arr.length;i++){
			char chr=arr[i];
			for (int j=0;j<UNICODE.length;j++) {
		    	if(chr==UNICODE[i]) {
		    		chr=TCVN[i];
		    		break;
		    	}
			}
			sb.append(chr);
		}
	    return sb.toString();
	}
	
	public static InputStream zip(String str, String name) throws Exception{
		    ByteArrayInputStream  bais=new ByteArrayInputStream(str.getBytes("UTF-8"));
			ByteArrayOutputStream baos=new ByteArrayOutputStream();
			ZipOutputStream zos=new ZipOutputStream(baos);
			zos.setLevel(9);
			ZipEntry ze=new ZipEntry(name);
			zos.putNextEntry(ze);
			int len;
			byte[] buf=new byte[1024];
			while ((len=bais.read(buf))>0) {
				zos.write(buf,0,len);
    		}
			zos.closeEntry();
			zos.close();
			bais.close();
			return new ByteArrayInputStream(baos.toByteArray());
	}
	
	public static String unzip(InputStream is) throws Exception {
			ZipInputStream zis=new ZipInputStream(is); 
			zis.getNextEntry();
		    ByteArrayOutputStream baos=new ByteArrayOutputStream();
		    BufferedOutputStream  bos=new BufferedOutputStream(baos);
		    int len;
		    byte[] buf=new byte[1024];
		    while ((len=zis.read(buf))>0) {
		    	bos.write(buf,0,len);
		    }
		    bos.flush();
		    bos.close();
		    zis.closeEntry();
		    zis.close();
			return baos.toString("UTF-8");
	}
	
	public static String stripNonValidXMLCharacters(String xml) {
		if (StringUtils.isBlank(xml)) return "";
	    StringBuffer sb = new StringBuffer();
	    char c;
	    for (int i = 0; i < xml.length(); i++) 
	    {
	        c = xml.charAt(i);
	        if ((c == 0x9) || (c == 0xA) || (c == 0xD) || ((c >= 0x20) && (c <= 0xD7FF)) || ((c >= 0xE000) && (c <= 0xFFFD)) || ((c >= 0x10000) && (c <= 0x10FFFF)))  sb.append(c);
	    }
	    return sb.toString();
	}
	public static String readStream(final InputStream is)
	{
	  int bufferSize=2048;
	  final char[] buffer = new char[bufferSize];
	  final StringBuilder out = new StringBuilder();
	  try {
	    final Reader in = new InputStreamReader(is, "UTF-8");
	    try {
	      for (;;) {
	        int rsz = in.read(buffer, 0, buffer.length);
	        if (rsz < 0)
	          break;
	        out.append(buffer, 0, rsz);
	      }
	    }
	    finally {
	      in.close();
	    }
	  }
	  catch (Exception ex) {
	    /* ... */
	  }
	  
	  return out.toString();
	}
}
