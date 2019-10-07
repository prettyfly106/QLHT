package com.vsc.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.io.FileUtils;

public class DateUtil {
	 
	public static final Date toDate(String mydate, String format_date) {
        SimpleDateFormat converttodt = new SimpleDateFormat(format_date);
        try {
        	Date myd = new Date(converttodt.parse(mydate).getTime());
            return myd;
        } catch (Exception e) {
        	e.printStackTrace();
            return new Date(System.currentTimeMillis());
        }

    }
	
	public static final java.sql.Date toJavaSqlDate(String startDateString,
			String formatDate) {
		DateFormat df = new SimpleDateFormat(formatDate);
		java.util.Date startDate = new java.util.Date();
		try {
			startDate = df.parse(startDateString);
			java.sql.Date sqlDate = new java.sql.Date(startDate.getTime());
			return sqlDate;
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static final String formatDate(Date mydate, String format_date) {
        SimpleDateFormat converttodt = new SimpleDateFormat(format_date);
        String dateStr="";
        try {
        	dateStr=converttodt.format(mydate);
            return dateStr;
        } catch (Exception e) {
        	e.printStackTrace();
            return dateStr;
        }

    }
	
	
}
