package com.xmlutil;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;


public class XmlEntity {
	Element element;
	Map<String,Object> xmlMap=new HashMap<String,Object>();
	Map<String,Object> usrData=new HashMap<String,Object>();
	public XmlEntity() {
		element=null;
	}
	public XmlEntity(Element el) {
		element=el;
	}
	public void setUserData(String key,Object val) {
		usrData.put(key, val);
	}
	public Object getUserData(String key) {
		return usrData.get(key);
	}
	public String toString() {
		return element.toString();
	}
	public static XmlEntity unmarshal(InputStream isXml) {
		
		XmlEntity xe=null;
		try {
			DocumentBuilderFactory dbf= DocumentBuilderFactory.newInstance();
			DocumentBuilder db=dbf.newDocumentBuilder();
			Document doc=db.parse(isXml);
			Element element=doc.getDocumentElement();
			xe=new XmlEntity(element);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return xe;
	}
	public static XmlEntity parse(String xmlData) {
		XmlEntity xe=null;
		try {
			DocumentBuilderFactory dbf= DocumentBuilderFactory.newInstance();
			DocumentBuilder db=dbf.newDocumentBuilder();
			Document doc=db.parse(new ByteArrayInputStream(xmlData.getBytes("UTF-8")));
			Element element=doc.getDocumentElement();
			xe=new XmlEntity(element);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return xe;
	}
	public void parse(Element ele) {
		element=ele;
		NodeList nodes=ele.getChildNodes();
		for(int i=0;i<nodes.getLength();i++) {
			Node node=nodes.item(i);
			if(node instanceof Element) {
				Element child=(Element) node;
				xmlMap.put(child.getNodeName(),child);
			}
		}
	}
	public XmlEntity getEntity(String name) {
		XmlEntity val=null;
		NodeList nodes=element.getElementsByTagName(name);
		if(nodes!=null && nodes.getLength()>0) {
			Element el=(Element)nodes.item(0);
			val=new XmlEntity(el);
		}
		return val;
	}
	public String get(String name) {
		String val=null;
		NodeList nodes=element.getElementsByTagName(name);
		if(nodes!=null && nodes.getLength()>0) {
			Element el=(Element)nodes.item(0);
			Node n1=el.getFirstChild();
			if(n1==null) 
				val=null;
			else
				val=n1.getNodeValue();
		}
		return val;
	}
	public long getLong(String name) {
		String val=get(name);
		return Long.parseLong(val);
	}
	public short getShort(String name) {
		String val=get(name);
		return Short.parseShort(val);
	}
	public Double getDouble(String name) {
		String val=get(name);
		return new Double(val);
	}
	public java.sql.Date getDate(String name,String format) throws Exception{
		String str=get(name);
		if(str==null) 
			return null;
		else {
			SimpleDateFormat sdf=new SimpleDateFormat(format);
			Date date=sdf.parse(str);
			return new java.sql.Date(date.getTime());
		}
	}
	public List<XmlEntity> getList(String parent,String name) {
		List list=new ArrayList<XmlEntity>();
		XmlEntity p=getEntity(parent);
		if(p!=null) {
			list=p.getList(name);
		}
		return list;
	}
	public List<XmlEntity> getList(String name) {
		List list=new ArrayList<XmlEntity>();
		NodeList nodes=element.getChildNodes(); //element.getElementsByTagName(name);
		System.out.println("getList="+name); 
		if(nodes!=null && nodes.getLength()>0) {
			for(int i=0;i<nodes.getLength();i++) {
				Node node=nodes.item(i);
				if(node instanceof Element && name.equals(node.getNodeName())) {
					System.out.println("node="+node.getNodeName()+"="+ node.getNodeValue()); 
					Element child=(Element) node;
					list.add(new XmlEntity(child));
				}
			}
		}
		return list;
	}
	public String[] getChild() {
		NodeList nodes=element.getChildNodes();
		ArrayList<String> childs=new ArrayList<String>();
		if(nodes!=null && nodes.getLength()>0) {
			for(int i=0;i<nodes.getLength();i++) {
				Node node=nodes.item(i);
				if(node instanceof Element) {
					//Node n1=node.getFirstChild();
					childs.add(node.getNodeName());
				}
			}
		}
		return childs.toArray(new String[childs.size()]);
	}
}
