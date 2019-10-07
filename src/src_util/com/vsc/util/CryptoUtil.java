package com.vsc.util;
import java.security.MessageDigest;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;
public class CryptoUtil {
	public static void toHex(byte[] bytes){
		StringBuilder sb = new StringBuilder();
	    for (byte b : bytes) {
	        sb.append(String.format("%02X", b));
	    }
	    System.out.println("toHex=\n\n\n\n\n\n\n\n\n$$$$$$$$$\n"+sb.toString());
	}
	public static final String MD5_encode(String srcData) {
		StringBuffer sb = new StringBuffer();
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			md.update(srcData.getBytes());
			byte[] digest = md.digest();
			
			for (byte b : digest) {
				sb.append(String.format("%02x", b & 0xff));
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return sb.toString();
    }
	
	public static final String BASE64_encode(String srcData) {
		BASE64Encoder base64e=new BASE64Encoder();
		String dstData=base64e.encode(srcData.getBytes());
		return dstData;
    }
	public static final String BASE64_decode(String srcData) {
		String dstData="";
		try {
			BASE64Decoder base64d=new BASE64Decoder();
			byte[] data=base64d.decodeBuffer(srcData);
			dstData=new String(data);
		}
		catch(Exception e) {
			e.printStackTrace();
			dstData = srcData;
		}
		return dstData;
	}
}

