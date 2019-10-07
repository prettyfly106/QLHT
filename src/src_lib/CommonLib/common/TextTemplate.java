package CommonLib.common;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.FileInputStream;
import java.io.UnsupportedEncodingException;

import org.apache.log4j.Logger;


public class TextTemplate {
  //static final Logger logger = Logger.getLogger(TextTemplate.class);
  private java.util.Properties dBlocks = new java.util.Properties();
  private java.util.Properties parsedBlocks = new java.util.Properties();

  public void setBlock(String tplName, String blockName) {
    dBlocks.put(blockName, getBlock(dBlocks.getProperty(tplName), blockName));
    dBlocks.put(tplName, replaceBlock(dBlocks.getProperty(tplName), blockName));
    int[] fromIndex={0};
    String nName = nextDBlockName(blockName,fromIndex);
    while (! "".equals(nName)) {
      setBlock(blockName, nName);
      nName = nextDBlockName(blockName,fromIndex);
    }
  }
 
  public void loadTemplate(String path, String name) {
	  //logger.info("loadtemplate-"+path);
	  try {
      String fileContent = null;
      try {
        fileContent = getFileContent(path);
      }
      catch (java.io.FileNotFoundException e) {
        System.err.println("\nCodecharge "+new java.text.SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(new java.util.Date())+" ==> \""+path+"\" not found.\n\n");
      }
      catch (java.io.IOException e) {}
      if (fileContent != null) {
        dBlocks.put(name, fileContent);
        int[] fromIndex={0};
        String nName = nextDBlockName(name,fromIndex);
        while (! (nName == null || "".equals(nName))) {
          //logger.info("1--loadTemplate."+name+".nextDBlockName="+nName);
          setBlock(name, nName);
          nName = nextDBlockName(name,fromIndex);
          
        }
      }
    }
    catch ( Exception e ) {
      System.err.println("\nCodecharge "+new java.text.SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(new java.util.Date())+" ==> TextTemplate.loadTemplate(\""+path+"\",\""+name+"\")\n\n");
      e.printStackTrace();
    }
  }

  public String getVar(String name) {
    String result = dBlocks.getProperty(name);
    if (result==null) {
      return "";
    }
    else {
      return result;
    }
  }

  public void setVar(String name, String value) {
    if ( value == null ) value ="";
    parsedBlocks.put(name, value);
  }

  public void parse(String tplName, boolean repeat) {
    try {
      if (parsedBlocks.getProperty(tplName) != null) {
        if (repeat) {
          parsedBlocks.put(tplName, parsedBlocks.getProperty(tplName) + proceedTpl(dBlocks.getProperty(tplName)));
          return;
        }
        else {
          parsedBlocks.put(tplName, proceedTpl(dBlocks.getProperty(tplName)));
        }
      }
      else {
        parsedBlocks.put(tplName, proceedTpl(dBlocks.getProperty(tplName)));
      }
    }
    catch ( Exception e ) {
      System.err.println("\nCodecharge "+new java.text.SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(new java.util.Date())+" ==> TextTemplate.parse("+tplName+","+repeat+")\n\n");
      e.printStackTrace(System.err);
      System.err.println("\nparsedBlocks.getProperty("+tplName+") => "+parsedBlocks.getProperty(tplName));
      System.err.println("dBlocks.getProperty("+tplName+") => "+dBlocks.getProperty(tplName));
    }
  }

  public String printVar(String name) {
    return parsedBlocks.getProperty(name);
  }

  private String proceedTpl(String tpl) {
    String tTpl = tpl;
    try {
      String match = null, name = null;
      java.util.Enumeration matches = null;
      matches = extractMatches(tpl, '{', '}');
      while (matches.hasMoreElements()) {
        match = (String)matches.nextElement();
        name = match.substring(1, match.length() - 1);
        if (parsedBlocks.containsKey(name)) {
          tTpl = replace(tTpl, match, parsedBlocks.getProperty(name));
        }
        else {
          tTpl = replace(tTpl, match, dBlocks.getProperty(name));
        }
      }
    }
    catch ( Exception e ) {
      System.err.println("\nCodecharge "+new java.text.SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(new java.util.Date())+" ==> TextTemplate.proceedTpl("+tpl+")\n\n");
      e.printStackTrace(System.err);
    }
    return tTpl;
  }

  private String getBlock(String template, String name) {
    int bBlock, eBlock, alpha;
    alpha = name.length() + 12;
    bBlock = template.indexOf("<!--Begin" + name + "-->");
    eBlock = template.indexOf("<!--End" + name + "-->");
    if (! (bBlock == 0 || eBlock == 0)) {
        return template.substring(bBlock + alpha, eBlock);
    }
    else {
        return "";
    }
  }

  private String replaceBlock(String template, String name) {
    int bBlock, eBlock;
    bBlock = template.indexOf("<!--Begin" + name + "-->");
    eBlock = template.indexOf("<!--End" + name + "-->");
    if (! (bBlock == 0 || eBlock == 0)) {
      return template.substring(0, bBlock) + "{" + name + "}" +
             template.substring(eBlock + ("<!--End" + name + "-->").length(), template.length());
    }
    else {
      return template;
    }
  }

  private String nextDBlockName(String templateName,int[] fromIndex) {
    int bTag = 0, eTag = 0;
    //logger.info("fromIndex="+fromIndex[0]);
    String name = "", template = "";
    template = dBlocks.getProperty(templateName);
    bTag = template.indexOf("<!--Begin",fromIndex[0]);
    
    if (bTag != -1) {
      eTag = template.indexOf("-->", bTag);
      fromIndex[0]=eTag-1;
      //logger.info("fromIndex="+fromIndex[0]);
      name = template.substring(bTag + 9, eTag);
      if (template.indexOf("<!--End" + name + "-->") != -1) {
        return name;
      }
    }
    else
    {
    	//logger.info("----------------No more Block---------------");
    }
    return "";
  }

  public String printAll() {
    return "<h1><font objectColor=\"red\">printAll() is not implemented yet</font></h1>";
  }

  private java.util.Enumeration extractMatches(String str, char start, char end) {
    java.util.Vector vec = new java.util.Vector(10, 10);
    if (str != null) {
      int s = 0, e = 0, sc = 0, se = 0;
      while ((s = str.indexOf(start, e)) >= 0) {
        if ((e = str.indexOf(end, s)) >= 0) {
          sc = str.indexOf(" ", s);
          se = str.indexOf("\n", s);
          if ( sc == -1 ) { sc = se; }
          if ( se < sc && se != -1 ) { sc = se; }
          se = str.indexOf("=", s);
          if ( sc == -1 ) { sc = se; }
          if ( se < sc && se != -1 ) { sc = se; }
          if ( sc == -1 || sc > e ) {
            vec.addElement(str.substring(s, e) + end);
          }
        }
      }
    }
    return vec.elements();
  }

  private String replace(String str, String pattern, String replace) {
    if (replace == null) {
      replace = "";
    }
    int s = 0, e = 0;
    StringBuffer result = new StringBuffer();
    while ((e = str.indexOf(pattern, s)) >= 0) {
      result.append(str.substring(s, e));
      result.append(replace);
      s = e + pattern.length();
    }
    result.append(str.substring(s));
    return result.toString();
  }

  private String getFileContent(String fName) throws java.io.FileNotFoundException, java.io.IOException {
    java.io.File f = new java.io.File (fName);
    int lenFile = (int) f.length(); //No checking so template-file is not big
//    java.io.BufferedReader bf = new java.io.BufferedReader(new java.io.FileReader(fName));
      //Doc file theo UTF-8
      java.io.BufferedReader bf ;
      try
      {
          bf = new BufferedReader(new InputStreamReader(new FileInputStream(fName),"UTF-8"));
      }
      catch (java.io.FileNotFoundException fnfe)
      {
          throw new RuntimeException("TextTemplate Error : Khong thay file: " + fName);
      }
      catch (UnsupportedEncodingException uee)
      {
          throw new RuntimeException("TextTemplate Error : Khong ho tro kieu encode nay: UTF-8");
      }

    StringBuffer line = new StringBuffer(lenFile+1024);
    while (bf.ready()) {
      line.append(bf.readLine() + "\n");
    }
    bf.close();
    return line.toString();
  }


  public void getOptions(java.util.ArrayList dataRows, boolean isSearch, boolean isRequired, String selectedValue, String nameBlock)
  {
    this.setVar ( nameBlock, "");
    if ( isSearch ) {
      this.setVar ("ID", "");
      this.setVar ("Value", "All");
      this.parse ( nameBlock, true);
    }
    else {
      if ( ! isRequired ) {
        this.setVar ("ID", "");
        this.setVar ("Value", "");
        this.parse ( nameBlock, true);
      }
    }
    try{
      for (int i = 0; i < dataRows.size(); i++) {
	  	String[] dataRow = (String[])dataRows.get(i);
        String lbId  = dataRow[0];
        String lbVal = dataRow[1];
        if (lbId!=null){
          this.setVar ("ID", lbId);
          if (lbVal!=null){
            this.setVar ("Value", lbVal);
          }
          else this.setVar ("Value", "");
          if (lbId.equals(""+selectedValue)) {
            this.setVar ("Selected", "SELECTED");
          }
          else this.setVar ("Selected", "");
          this.parse ( nameBlock, true);
        }
      }
    }
    catch(Exception ignore)  {}
  }

    public void getOptions(java.util.ArrayList dataRows,String selectedValue, String nameBlock)
      {
        this.setVar ( nameBlock, "");
        try{
          for (int i = 0; i < dataRows.size(); i++) {
              String[] dataRow = (String[])dataRows.get(i);
            String lbId  = dataRow[0];
            String lbVal = dataRow[1];
            if (lbId!=null){
              this.setVar ("ID", lbId);
              if (lbVal!=null){
                this.setVar ("Value", lbVal);
              }
              else this.setVar ("Value", "");
              if (lbId.equals(""+selectedValue)) {
                this.setVar ("Selected", "SELECTED");
              }
              else this.setVar ("Selected", "");
              this.parse ( nameBlock, true);
            }
          }
        }
        catch(Exception ignore)  {}
      }
    public void getOptions(java.util.ArrayList dataRows, String displayID,String displayValue, String selectedValue, String nameBlock)
      {
        this.setVar ( nameBlock, "");
        this.setVar ("ID",displayID);
        this.setVar ("Value",displayValue);
        this.parse ( nameBlock, true);
        try{
          for (int i = 0; i < dataRows.size(); i++) {
              String[] dataRow = (String[])dataRows.get(i);
            String lbId  = dataRow[0];
            String lbVal = dataRow[1];
            if (lbId!=null){
              this.setVar ("ID", lbId);
              if (lbVal!=null){
                this.setVar ("Value", lbVal);
              }
              else this.setVar ("Value", "");
              if (lbId.equals(""+selectedValue)) {
                this.setVar ("Selected", "SELECTED");
              }
              else this.setVar ("Selected", "");
              this.parse ( nameBlock, true);
            }
          }
        }
        catch(Exception ignore)  {}
      }
}
