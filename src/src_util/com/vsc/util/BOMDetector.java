package com.vsc.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PushbackInputStream;
import java.io.Reader;
import java.io.UnsupportedEncodingException;
import java.io.Writer;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
	made up, decorated, fixed and customized by ducnm
 */
public final class BOMDetector {
	private File fRootDir;
	private List<String> fExtensions;
	private InputStream inputStream = null;
	
	private final char[] uft8 = {0xEF,0xBB,0xBF};
	private final char[] uft16le = {0xFF, 0xFE};
	private final char[] uft16be = {0xFE,0xFF};
	private final static String[] char_bom = {"ï»¿","þÿ","ÿþ"};
	private static final int[] BYTE_ORDER_MARK_UTF8 = { 239, 187, 191 };
	private static final int[] BYTE_ORDER_MARK_UTF16_BE = { 254, 255 };
	private static final int[] BYTE_ORDER_MARK_UTF16_LE = { 255, 254 };

	public static void main(String... aArgs) throws IOException {
//		BOMDetector bom = new BOMDetector("C:\\xmldata\\checkout\\", ".txt", ".jsp", ".jspf", ".tag", ".html", ".css",".xml", ".js", ".sql", ".tld");
		BOMDetector bom = new BOMDetector("C:\\xmldata\\checkout\\", ".xml");
		int count = 0;
		for (String file : bom.findBOMs()) {
			// log(file);
			System.out.println(file);
			++count;
		}
		log("Number of files with BOM:" + count);
//		inputStream= (InputStream) removeUtf8BOM(new FileInputStream(file));
//		FileUtils.copyInputStreamToFile(inputStream, file);
		
//		BufferedReader bufferedReader = new BufferedReader(new FileReader(file));
//		System.out.println(removeBOM(bufferedReader,uft8));
		
		/*
		 * for(String file : bom.removeBOMs()){ log("Removed BOM from: " +
		 * file); }
		 */
	}

	public BOMDetector(String aRootDirectory, String... aFileExtensions) {
		fRootDir = new File(aRootDirectory);
		fExtensions = Arrays.asList(aFileExtensions);
		if (!fRootDir.exists() || fRootDir.isFile()) {
			throw new RuntimeException("Root directory not valid.");
		}
	}

	/**
	 * Find files with BOMs under the given root directory. Return their names.
	 */
	public List<String> findBOMs() throws IOException {
		List<String> result = new ArrayList<String>();
		for (File textFile : findTextFilesBeneath(fRootDir)) {
			if (checkBOM(textFile)) {
				result.add(textFile.getCanonicalPath());
			}
		}
		return result;
	}

	/**
	 * Find and remove BOMs from files under the given root directory.
	 * Overwrites files. Return the names of the affected files.
	 */
	public List<String> removeBOMs() throws IOException {
		List<String> result = new ArrayList<String>();
		for (String bomFile : findBOMs()) {
			removeBOM(bomFile);
			result.add(bomFile);
		}
		return result;
	}

	// PRIVATE	

	private static void log(Object aThing) {
		System.out.println(String.valueOf(aThing));
	}

	private List<File> findTextFilesBeneath(File aStartingDir) throws IOException {
		List<File> result = new ArrayList<File>();
		File[] filesAndDirs = aStartingDir.listFiles();
		List<File> filesDirs = Arrays.asList(filesAndDirs);
		for (File file : filesDirs) {
			if (isTextFile(file)) {
				System.out.println(file.getName());
				result.add(file);
			}
			if (file.isDirectory()) {
				// recursive call!!
				List<File> deeperList = findTextFilesBeneath(file);
				result.addAll(deeperList);
			}
		}
		return result;
	}

	private boolean isTextFile(File aFile) throws IOException {
		boolean result = false;
		String fileName = aFile.getCanonicalPath();
		int finalDot = fileName.lastIndexOf(".");
		if (finalDot > -1) {
			String extension = fileName.substring(finalDot);
			result = fExtensions.contains(extension);
		}
		return result;
	}
	public static boolean checkBOM(File aTextFile) throws IOException {
		if (checkBOM(aTextFile, BYTE_ORDER_MARK_UTF8)) {
			System.out.println("BYTE_ORDER_MARK_UTF8 done");
			return true;
		} else if (checkBOM(aTextFile, BYTE_ORDER_MARK_UTF16_BE)) {
			convertFileToUTF8(aTextFile,"UTF-16BE");			
			System.out.println("BYTE_ORDER_MARK_UTF16_BE done");
			return true;
		} else if (checkBOM(aTextFile, BYTE_ORDER_MARK_UTF16_LE)) {
			convertFileToUTF8(aTextFile,"UTF-16LE");
			System.out.println("BYTE_ORDER_MARK_UTF16_LE done");
			return true;
		} else
			return false;
	}
	public static String checkBOM(String strContent){
		return checkBOM(strContent, char_bom);
	}

	private static boolean checkBOM(File aTextFile, int[] charset) throws IOException {
		boolean result = false;
		int r = 0;
		if (aTextFile.length() < charset.length)
			return false;
		// open as bytes here, not characters
		int[] firstFewBytes = new int[charset.length];
		InputStream input = null;
		try {
			input = new FileInputStream(aTextFile);
			for (int index = 0; index < charset.length; ++index) {
				firstFewBytes[index] = input.read(); // read a single byte
//				System.out.print(firstFewBytes[index] + "-");
//				System.out.print(charset[index]);
//				System.out.println();
			}
			result = Arrays.equals(firstFewBytes, charset);
			if(result){
				r= removeBOM(aTextFile,charset);
				if(r==1){					
					System.out.println("Removing BOM characters successfully");
				}
				else
					System.out.println("Detected BOM characters but removing unsuccessfully");
			}
		} finally {
			input.close();
		}
		return result;
	}
	private static String checkBOM(String strContent, String[] charset){
		String tmp = null;
		StringBuilder builder = null;
		if(strContent != null){
			builder = new StringBuilder(strContent);
			for(int i = 0;i<charset.length;i++){
//				System.out.println(charset[i]);
				tmp = charset[i];
				int j = builder.indexOf(tmp);
//				System.out.println(j);
				if(j>-1){
					int k = tmp.length();					
					builder = builder.replace(j,j+k,"");
				}
			}
			strContent = builder.toString();
		}		
		return strContent;
	}

	private boolean removeBOM(String aTextFile) throws IOException {
		if (removeBOM(aTextFile, BYTE_ORDER_MARK_UTF8)!=-1) {
			System.out.println("removal BYTE_ORDER_MARK_UTF8 done");
			return true;
		} else if (removeBOM(aTextFile, BYTE_ORDER_MARK_UTF16_BE) !=-1) {
			System.out.println("removal BYTE_ORDER_MARK_UTF16_BE done");
			return true;
		} else if (removeBOM(aTextFile, BYTE_ORDER_MARK_UTF16_LE) !=-1) {
			System.out.println("removal BYTE_ORDER_MARK_UTF16_LE done");
			return true;
		} else
			return false;
	}
	
	private int removeBOM(String aTextFile, int[] charset) {
		File bomFile = new File(aTextFile);
		return removeBOM(bomFile, charset);
	}
	
	public static int removeBOM(File bomFile, int[] charset) {		
		int rs=-1;
		long initialSize = bomFile.length();
		long truncatedSize = initialSize - charset.length;
		byte[] memory = new byte[(int) (truncatedSize)];
		InputStream input = null;
		OutputStream output = null;
		try {
			input = new BufferedInputStream(new FileInputStream(bomFile));
			input.skip(charset.length);
			int totalBytesReadIntoMemory = 0;
			while (totalBytesReadIntoMemory < truncatedSize) {
				int bytesRemaining = (int) truncatedSize - totalBytesReadIntoMemory;
				int bytesRead = input.read(memory, totalBytesReadIntoMemory, bytesRemaining);
				if (bytesRead > 0) {
					totalBytesReadIntoMemory = totalBytesReadIntoMemory + bytesRead;
				}
			}
			input.close();
			output = new BufferedOutputStream(new FileOutputStream(bomFile));
			output.write(memory);
			rs =1;
			//rs = overwriteWithoutBOM(memory, bomFile);
		} catch(IOException e){
			e.printStackTrace();
			return -1;
		}catch(Exception e){
			e.printStackTrace();
			return -1;
		}finally {
			try {
				if(input != null)
					input.close();
				if(output != null){
					output.flush();
					output.close();
				}					
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
//		File after = new File(bomFile.);
//		long finalSize = bomFile.length();
//		long changeInSize = initialSize - finalSize;
//		if (changeInSize != charset.length) {
//			throw new RuntimeException("Change in file size: " + changeInSize + " Expected change: " + charset.length);
//		}
		return rs;
	}
	
	private static InputStream removeBOM(InputStream inputStream) {
	    PushbackInputStream pushbackInputStream = new PushbackInputStream(new BufferedInputStream(inputStream), 3);
	    byte[] bom = new byte[3];
	    try {
			if (pushbackInputStream.read(bom) != -1) {
			    if (!(bom[0] == (byte) 0xEF || bom[1] == (byte) 0xBB || bom[2] == (byte) 0xBF)) {
			        pushbackInputStream.unread(bom);
			    }
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    return pushbackInputStream;
	}
	private static boolean removeBOM(Reader reader, char[] bom) {
	    int bomLength = bom.length;
	    try {
			reader.mark(bomLength);
			char[] possibleBOM = new char[bomLength];
		    reader.read(possibleBOM);
		    for (int x = 0; x < bomLength; x++) {
		    	System.out.println((int)possibleBOM[x]);
		        if ((int) bom[x] != (int) possibleBOM[x]) {
		            reader.reset();
		            return false;
		        }
		    }
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    
	    return true;
	}
	private static int overwriteWithoutBOM(byte[] aBytesWithoutBOM, File aTextFile){
		OutputStream output = null;
		try {
			output = new BufferedOutputStream(new FileOutputStream(aTextFile));
			output.write(aBytesWithoutBOM);
		}catch(IOException e){
			e.printStackTrace();
			return -1;
		}catch(Exception e){
			e.printStackTrace();
			return -1;
		}
		finally {
			try {
				if(output != null)
					output.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return 1;
	}
	private static void convertFileToUTF8(File file, String charset){
		InputStreamReader isr = null;
		Reader in = null;
		StringBuffer buffer = null;
		Writer out = null;
		try{
			isr = new InputStreamReader(new FileInputStream(file),charset);
			in = new BufferedReader(isr);
			buffer = new StringBuffer();	
			int ch;
			while ((ch = in.read()) > -1) {
			    buffer.append((char)ch);
			}
			out = new OutputStreamWriter(new FileOutputStream(file), "UTF8");
			out.write(buffer.toString());
		}catch(IOException e){
			e.printStackTrace();
		}finally{			
			try {
				if(in != null){
					in.close();
				}
				if(isr != null)
					isr.close();
				if(out != null){
					out.flush();
					out.close();
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
}