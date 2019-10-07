package com.vsc.util;
import it.sauronsoftware.ftp4j.FTPClient;


import java.io.File;
public class FtpUtil {
	String server; 
    String port;
    String user;
    String pass;
    String logPath;
	public FtpUtil(String server,String port,String user,String pass,String logPath) {
		this.server=server;
		this.port=port;
		this.user=user;
		this.pass=pass;
		this.logPath=logPath;
	}
	public void sendFile(File uploadFile, String folder){
		try {
	    	
			FTPClient ftpClient = new FTPClient();
			System.out.println("connect server="+server+" port="+port);
            ftpClient.connect(server, Integer.parseInt(port));
            ftpClient.login(user, pass);
            ftpClient.setType(FTPClient.TYPE_BINARY);
            //if (!checkFolderExists(ftpClient,folder)) ftpClient.createDirectory(folder);
            ftpClient.changeDirectory(folder);
            try {
            	ftpClient.upload(uploadFile);
            	System.out.println("File uploaded");
            } catch (Exception ex){
    			System.out.println("Upload file error: " + ex.getMessage());
                ex.printStackTrace();
    		}
		}
		catch (Exception ex){
			System.out.println("Transfer file via FTP error: " + ex.getMessage());
            ex.printStackTrace();
		}
	}
	
}
