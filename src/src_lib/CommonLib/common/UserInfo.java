package CommonLib.common;


import org.apache.log4j.Logger;

import intellsoft.db.RecordSet;
import intellsoft.db.DBUtil;

/**
 * File : CommonLib.common.UserInfo
 * Author: Nguyen Cong Thuan
 * Called by :
 * Calls :
 * Input:
 * Operation description:
 *          class nay chua thong tin ve user hien dang login
 * Output:
 * Date of creation: Jun 20, 2003 - 11:23:17 AM
 * Date of last changes:
 */

public class UserInfo
{
	//static final Logger logger = Logger.getLogger(UserInfo.class);

	public boolean LOGINED = false;
	public String user_name;
	public String user_password;
	public String full_name;
	public int encrypt_check;
	public Long user_group_id;

	public Long user_id;
	
	public Long department_id;
	public Long team_id;
	public Long officer_id;
	public String teamName;	
	public Long province_code;	
	public Long center_id;
	public Long station_id;
	public Long zoom_level;
	public String lat;
	public String lng;
	
	public Long user_level;
	public int editRight=1;
	public String db_name;
	public String db_schema;
	public String clientIP;
	public String uuid;
	
	
	public void setUser(String db_name,RecordSet user){
		try {
			//logger.info("XXXXXXXXXXXXXXXXXXXXXXXXX");
			this.user_id =user.getLongObject("user_id");
			this.user_name = user.getString("user_name");
			this.user_password = user.getString("user_pwd");
			this.full_name = user.getString("full_name");
			this.encrypt_check = user.getInt("encrypt_check");
			this.user_group_id = user.getLongObject("user_group_id");
			
			user_level=user.getLongObject("user_level");
			//Long user_id=user.getLongObject("user_id");
			/**/
			//listTeam=DBUtil.getOneValueString(db_name,"SELECT listagg(team_id,',') within group (order by team_id) FROM gus_user_teams ut  WHERE ut.hospital_id="+hospital_id+" and ut.user_id = "+user_id);
			//System.out.println("SELECT listagg(team_id,',') within group (order by team_id) FROM gus_user_teams ut  WHERE ut.hospital_id="+hospital_id+" and ut.user_id = "+user_id);
			//listTeam=","+listTeam+",";
			//System.out.println("listTeam="+listTeam);
			//listTeam119=DBUtil.getOneValueString(db_name,"SELECT listagg(team_id,',') within group (order by team_id) FROM trb_user_team ut  WHERE ut.hospital_id="+hospital_id+" and ut.user_id = "+user_id);
			//listTeam119=","+listTeam119+",";
			//listStation=DBUtil.getOneValueString(db_name,"SELECT listagg(station_id,',') within group (order by station_id) FROM gus_teams ut  WHERE INSTR ('"+listUnit+"', ',' || team_id || ',') > 0");
			//listCenter=DBUtil.getOneValueString(db_name,"SELECT listagg(department_id,',') within group (order by department_id) FROM com_team ut  WHERE ut.hospital_id="+hospital_id+" and INSTR ('"+listTeam+"', ',' || team_id || ',') > 0");
			//listCenter=","+listCenter+",";
			//listStation=listCenter;
			
			Long tmpLong = null;
			tmpLong =user.getLongObject("access_right");
			if (tmpLong == null) {
				editRight=1;
			} else {
				editRight=tmpLong.intValue();
			}
			//this.listProvince = user.getString("priv_province");
		}
		catch(Exception e) {
			e.printStackTrace();
			//logger.error("StackTrace:",e);
		}
	}
	
   
}