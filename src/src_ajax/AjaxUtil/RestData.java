package AjaxUtil;

//import intellsoft.db.DBUtil;
import intellsoft.db.DBUtil;
import intellsoft.db.RecordSet;

import java.util.HashMap;
import java.util.Map;

import org.apache.poi.util.SystemOutLogger;


//import com.sun.xml.internal.bind.v2.runtime.unmarshaller.XsiNilLoader.Array;

public class RestData {
	private static boolean isLoaded = true;
	private static final Map<String,String> sqlMap = new HashMap();
	static
	{
		//LST_ALL
		sqlMap.put("LST.CITY","SELECT CITY_CODE, CITY_NAME FROM LST_CITY WHERE [S1]=1 OR [S1]<>1 AND CITY_CODE=[S2]");
		sqlMap.put("LST.CENTRE","SELECT CENTRE_ID, CENTRE_NAME FROM LST_TECH_CENTRE WHERE CITY_CODE=[P0] AND ([S1]<3 OR [S1] = 3 AND CENTRE_ID = '[S3]')");
		sqlMap.put("LST.DISTRICT","SELECT DISTRICT_CODE, DISTRICT_NAME FROM LST_DISTRICT WHERE CITY_CODE = [P0]");
		sqlMap.put("LST.WARDS","SELECT WARDS_CODE, WARDS_NAME FROM LST_WARDS WHERE DISTRICT_CODE = [P0]");
		sqlMap.put("LST.STATION","SELECT STATION_ID, STATION_CODE FROM STATIONS WHERE CITY_CODE=[P0]");
		sqlMap.put("LST.DEVICE","SELECT D.DEVICE_ID, D.DEVICE_CODE || ' ('||I.PRODUCT_NUM||')' FROM DEVICES D, INF_DEVICE I WHERE D.INF_DEVICE_ID = I.INF_DEVICE_ID AND D.STATION_ID=[P0]");
		sqlMap.put("LST.PORT","SELECT PORT_ID, PORT_CODE FROM LST_DEVICE_PORT WHERE DEVICE_ID = [P0]");
		sqlMap.put("LST.LOCALITY","SELECT LOCALITY_ID, LOCALITY_NAME FROM LST_LOCALITY");
		sqlMap.put("LST.OWNER","SELECT OWNER_ID, OWNER_NAME FROM LST_OWNER");
		sqlMap.put("LST.STATIONTYPE","SELECT STATIONTYPE_ID, STATIONTYPE_NAME FROM LST_STATIONTYPE");
		sqlMap.put("LST.POLETYPE","SELECT POLETYPE_ID, POLETYPE_NAME FROM LST_POLETYPE");
		sqlMap.put("LST.MANHOLE_TYPE","SELECT MANHOLE_TYPE_ID, MANHOLE_TYPE_NAME FROM LST_MANHOLE_TYPE");
		sqlMap.put("LST.CAPACITY","SELECT CAPACITY, NOTE FROM CAPACITY ORDER BY CAPACITY");
		sqlMap.put("LST.CABLETYPE_GROUP","SELECT CABLETYPE_GROUP_ID, CABLETYPE_GROUP_NAME FROM LST_CABLETYPE_GROUP");
		sqlMap.put("LST.DEVICETYPE_GROUP","SELECT DEVICETYPE_GROUP_ID, DEVICETYPE_GROUP_NAME FROM LST_DEVICETYPE_GROUP");
		sqlMap.put("LST.DEVICETYPE","SELECT DEVICETYPE_ID, DEVICETYPE_NAME FROM LST_DEVICETYPE WHERE DEVICETYPE_GROUP_ID=[P0]");
		sqlMap.put("LST.MANUFACTURE","SELECT MANUFACTURE_ID, MANUFACTURE_NAME FROM LST_MANUFACTURE");
		sqlMap.put("LST.INF_DEVICE","SELECT INF_DEVICE_ID, PRODUCT_NUM FROM INF_DEVICE WHERE DEVICETYPE_ID='[F0]' AND MANUFACTURE_ID='[F1]'");
		sqlMap.put("LST.INF_DEVICE01","SELECT INF_DEVICE_ID, PRODUCT_NUM FROM INF_DEVICE WHERE DEVICETYPE_ID='[P0]'");
		sqlMap.put("LST.INF_CARD","SELECT INF_CARD_ID, PRODUCT_NUM FROM INF_DEVICE_CARD WHERE DEVICETYPE_ID=[P0]");
		sqlMap.put("LST.CARD_COMPATIBLE","SELECT INF_CARD_ID, PRODUCT_NUM FROM INF_DEVICE_CARD WHERE INF_CARD_TYPE=0 AND INSTR(','||DEVICE_COMPATIBLE||',',',' || [F2] || ',')>0");
		sqlMap.put("LST.USER_GROUP","SELECT USER_GROUP_ID, USER_GROUP_NAME FROM ADM_USER_GROUP");
		sqlMap.put("LST.TRANSMISSION","SELECT TRANSMISSION_ID, TRANSMISSION_CODE FROM LST_SDH_TRANSMISSIONS");
		sqlMap.put("LST.TRANSMISSION_TYPE","SELECT * FROM LST_SDH_TRANSMISSION_TYPE");
		
		//STATIONS
		sqlMap.put("STATION.FR1","SELECT A.*, C.CITY_NAME, D.DISTRICT_NAME, W.WARDS_NAME FROM STATIONS A, LST_CITY C, LST_DISTRICT D, LST_WARDS W WHERE A.CITY_CODE=C.CITY_CODE AND A.DISTRICT_CODE = D.DISTRICT_CODE AND A.WARDS_CODE=W.WARDS_CODE(+) AND STATION_ID = [0]");
		sqlMap.put("STATION.GR1","SELECT * FROM STATIONS WHERE STATUS>0 AND ('[F0]' IS NULL OR LOCALITY_ID='[F0]') AND ([F1]=-1 OR CITY_CODE=[F1]) AND ([F2]=-1 OR DISTRICT_CODE=[F2]) AND ([F3]=-1 OR WARDS_CODE=[F3]) AND ('[F4]' IS NULL OR STATIONTYPE_ID='[F4]') AND ('[F5]' IS NULL OR OWNER_ID='[F5]') [FILTER] ORDER BY STATION_CODE");
		
		//POLES
		sqlMap.put("POLE.GR1","SELECT * FROM POLES WHERE STATUS>0 AND ([F0]=-1 OR CITY_CODE=[F0]) AND ([F1]=-1 OR DISTRICT_CODE=[F1]) AND ([F2]=-1 OR WARDS_CODE=[F2]) AND ('[F3]' IS NULL OR POLETYPE_ID='[F3]') AND ('[F4]' IS NULL OR OWNER_ID='[F4]') [FILTER] ORDER BY POLE_CODE");
		
		//MANHOLES
		sqlMap.put("MANHOLE.GR1","SELECT * FROM MANHOLES WHERE STATUS>0 AND ([F0]=-1 OR CITY_CODE=[F0]) AND ([F1]=-1 OR DISTRICT_CODE=[F1]) AND ([F2]=-1 OR WARDS_CODE=[F2]) AND ('[F3]' IS NULL OR MANHOLE_TYPE_ID='[F3]') AND ('[F4]' IS NULL OR OWNER_ID='[F4]') [FILTER] ORDER BY MANHOLE_CODE");
		
		//JOINT
		sqlMap.put("JOINT.GR1","SELECT * FROM JOINTS WHERE STATUS>0 AND ([F0]=-1 OR CITY_CODE=[F0]) AND ([F1]=-1 OR DISTRICT_CODE=[F1]) AND ([F2]=-1 OR WARDS_CODE=[F2]) [FILTER] ORDER BY JOINT_CODE");
		
		//CABLELINE
		sqlMap.put("CABLELINE.GR1","SELECT CABLELINE_ID, CABLELINE_CODE, CAPACITY, DESCRIPTION FROM CABLELINES WHERE CABLELINE_ID IN (SELECT DISTINCT A.CABLELINE_ID FROM ( SELECT A.CABLELINE_ID, A.CAPACITY, (CASE WHEN B.NODE_INDEX=(SELECT MIN(NODE_INDEX) FROM CABLELINE_DETAIL WHERE CABLELINE_ID=B.CABLELINE_ID) THEN 0 WHEN B.NODE_INDEX=(SELECT MAX(NODE_INDEX) FROM CABLELINE_DETAIL WHERE CABLELINE_ID=B.CABLELINE_ID) THEN 1 END ) SEARCH_TYPE, C.* FROM CABLELINES A, CABLELINE_DETAIL B, TABLE(GET_NODE_INFO(B.CABLELINE_ID,B.NODE_INDEX)) C WHERE A.CABLELINE_ID=B.CABLELINE_ID AND A.STATUS>0 ) A WHERE ([F0]<0 OR [F0]>=0 AND SEARCH_TYPE=[F0]) AND ([F1]=-1 OR CITY_CODE=[F1]) AND ([F2]=-1 OR DISTRICT_CODE=[F2]) AND ([F3]=-1 OR WARDS_CODE=[F3]) AND ('[F4]' IS NULL OR CAPACITY='[F4]'))");

		//LST_SDH_TRANSMISSIONS		
		sqlMap.put("TRANSMISSION.GR1","SELECT * FROM LST_SDH_TRANSMISSIONS");   
		sqlMap.put("TRANSMISSION.FR1","SELECT * FROM LST_SDH_TRANSMISSIONS WHERE TRANSMISSION_ID='[0]'");
		sqlMap.put("TRANSMISSION.DL1","DELETE LST_SDH_TRANSMISSIONS WHERE TRANSMISSION_ID='[0]'");
		
		//LST_SDH_ROUTES		
		sqlMap.put("ROUTE.GR1","SELECT R.ROUTE_ID, ROUTE_INDEX, R.route_capacity, SB.STATION_CODE STATION_CODE_B, SE.STATION_CODE STATION_CODE_E, IDB.product_num DEVICE_B, IDE.product_num DEVICE_E, PB.port_code PORT_CODE_B, PE.port_code PORT_CODE_E FROM LST_SDH_ROUTES R, STATIONS SB, STATIONS SE, DEVICES DB, DEVICES DE, INF_DEVICE IDB, INF_DEVICE IDE, LST_DEVICE_PORT PB, LST_DEVICE_PORT PE WHERE R.station_id_b = SB.station_id AND R.station_id_e = Se.station_id  and r.device_id_b = DB.device_id AND DB.inf_device_id = IDB.inf_device_id  AND r.device_id_E = DE.device_id AND DE.inf_device_id = IDE.inf_device_id   AND R.port_id_b_out = PB.port_id AND R.port_id_e_in = PE.port_id  AND R.transmission_id=[F0] AND R.TRANSMISSION_TYPE_ID=[F1] ORDER BY R.route_index");   
		sqlMap.put("ROUTE.FR1","SELECT * FROM LST_SDH_ROUTES WHERE ROUTE_ID='[0]'");
		sqlMap.put("ROUTE.DL1","DELETE LST_SDH_ROUTES WHERE ROUTE_ID='[0]'");
		
		//LST_CABLETYPE		
		sqlMap.put("CABLETYPE.GR1","SELECT CABLETYPE_ID, C.CABLETYPE_GROUP_ID, G.CABLETYPE_GROUP_NAME, CABLETYPE_CODE, CABLETYPE_NAME FROM LST_CABLETYPE C, LST_CABLETYPE_GROUP G WHERE C.CABLETYPE_GROUP_ID = G.CABLETYPE_GROUP_ID AND C.CABLETYPE_GROUP_ID = [F0]");   
		sqlMap.put("CABLETYPE.FR1","SELECT CABLETYPE_ID, C.CABLETYPE_GROUP_ID, G.CABLETYPE_GROUP_NAME, CABLETYPE_CODE, CABLETYPE_NAME FROM LST_CABLETYPE C, LST_CABLETYPE_GROUP G WHERE C.CABLETYPE_GROUP_ID = G.CABLETYPE_GROUP_ID AND CABLETYPE_ID = [0]");
		sqlMap.put("CABLETYPE.DL1","DELETE LST_CABLETYPE A WHERE A.CABLETYPE_ID=[0]");
				
		//LST_CABLETYPE_GROUP
		sqlMap.put("L002.G01","select A.USER_ID,A.USER_NAME,a.FULL_NAME,b.USER_GROUP_NAME from ADM_USER a,ADM_USER_GROUP b where a.USER_GROUP_ID=b.USER_GROUP_ID(+) AND a.COMPANY_ID=[S0]");
		sqlMap.put("L002.C01","SELECT company_id,company_name FROM org_company WHERE company_id=[S0]");
		sqlMap.put("L002.C02","SELECT USER_GROUP_ID,USER_GROUP_NAME FROM ADM_USER_GROUP START WITH PARENT_GROUP_ID = 1 CONNECT BY PRIOR USER_GROUP_ID = PARENT_GROUP_ID ORDER BY LEVEL");
		sqlMap.put("L002.FR1","SELECT A.* FROM ADM_USER a where a.USER_ID=[0]");
		sqlMap.put("L002.D01","delete from ADM_USER a where a.USER_ID=[0]");
		
		//LST_CITY
		sqlMap.put("CITY.GR1","SELECT * FROM LST_CITY");   
		sqlMap.put("CITY.FR1","SELECT * FROM LST_CITY WHERE CITY_CODE='[0]'");
		sqlMap.put("CITY.DL1","DELETE LST_CITY WHERE CITY_CODE='[0]'");
		
		//LST_CITY
		sqlMap.put("TECH_CENTRE.GR1","SELECT * FROM LST_TECH_CENTRE");   
		sqlMap.put("TECH_CENTRE.FR1","SELECT * FROM LST_TECH_CENTRE WHERE CENTRE_ID='[0]'");
		sqlMap.put("TECH_CENTRE.DL1","DELETE LST_TECH_CENTRE WHERE CENTRE_ID='[0]'");
		
		
		//LST_DISTRICT
		sqlMap.put("DISTRICT.GR1","SELECT * FROM LST_DISTRICT WHERE CITY_CODE='[F0]'");   
		sqlMap.put("DISTRICT.FR1","SELECT * FROM LST_DISTRICT WHERE DISTRICT_CODE='[0]'");
		sqlMap.put("DISTRICT.DL1","DELETE LST_DISTRICT WHERE DISTRICT_CODE='[0]'");
		
		//LST_WARDS
		sqlMap.put("WARDS.GR1","SELECT * FROM LST_WARDS WHERE DISTRICT_CODE='[F1]'");   
		sqlMap.put("WARDS.FR1","SELECT * FROM LST_WARDS WHERE WARDS_CODE='[0]'");
		sqlMap.put("WARDS.DL1","DELETE LST_WARDS WHERE WARDS_CODE='[0]'");
		
		//LST_LOCALITY
		sqlMap.put("LOCALITY.GR1","SELECT * FROM LST_LOCALITY");   
		sqlMap.put("LOCALITY.FR1","SELECT * FROM LST_LOCALITY WHERE LOCALITY_CODE='[0]'");
		sqlMap.put("LOCALITY.DL1","DELETE LST_LOCALITY WHERE LOCALITY_CODE='[0]'");
		
		//LST_OWNER
		sqlMap.put("OWNER.GR1","SELECT * FROM LST_OWNER");   
		sqlMap.put("OWNER.FR1","SELECT * FROM LST_OWNER WHERE OWNER_ID='[0]'");
		sqlMap.put("OWNER.DL1","DELETE LST_OWNER WHERE OWNER_ID='[0]'");
		
		//LST_STATIONTYPE
		sqlMap.put("STATIONTYPE.GR1","SELECT * FROM LST_STATIONTYPE");   
		sqlMap.put("STATIONTYPE.FR1","SELECT * FROM LST_STATIONTYPE WHERE STATIONTYPE_ID='[0]'");
		sqlMap.put("STATIONTYPE.DL1","DELETE LST_STATIONTYPE WHERE STATIONTYPE_ID='[0]'");
		
		//LST_POLETYPE
		sqlMap.put("POLETYPE.GR1","SELECT * FROM LST_POLETYPE");   
		sqlMap.put("POLETYPE.FR1","SELECT * FROM LST_POLETYPE WHERE POLETYPE_ID='[0]'");
		sqlMap.put("POLETYPE.DL1","DELETE LST_POLETYPE WHERE POLETYPE_ID='[0]'");
		
		//LST_MANHOLE_TYPE
		sqlMap.put("MANHOLE_TYPE.GR1","SELECT * FROM LST_MANHOLE_TYPE");   
		sqlMap.put("MANHOLE_TYPE.FR1","SELECT * FROM LST_MANHOLE_TYPE WHERE MANHOLE_TYPE_ID='[0]'");
		sqlMap.put("MANHOLE_TYPE.DL1","DELETE LST_MANHOLE_TYPE WHERE MANHOLE_TYPE_ID='[0]'");
		
		//LST_DEVICETYPE
		sqlMap.put("DEVICETYPE.GR1","SELECT * FROM LST_DEVICETYPE WHERE DEVICETYPE_GROUP_ID=[F0]");   
		sqlMap.put("DEVICETYPE.FR1","SELECT * FROM LST_DEVICETYPE WHERE DEVICETYPE_ID='[0]'");
		sqlMap.put("DEVICETYPE.DL1","DELETE LST_DEVICETYPE WHERE DEVICETYPE_ID='[0]'");
		
		//ADM_USER_GROUP
		sqlMap.put("USER_GROUP.GR1","SELECT * FROM ADM_USER_GROUP");   
		sqlMap.put("USER_GROUP.FR1","SELECT * FROM ADM_USER_GROUP WHERE USER_GROUP_ID='[0]'");
		sqlMap.put("USER_GROUP.DL1","DELETE ADM_USER_GROUP WHERE USER_GROUP_ID='[0]'");
		
		//ADM_USER
		sqlMap.put("USER.GR1","SELECT U.USER_ID, U.USER_NAME, U.FULL_NAME, U.USER_GROUP_ID, C.CENTRE_NAME CENTER_NAME FROM ADM_USER U, LST_TECH_CENTRE C WHERE U.CENTER_ID=C.CENTRE_ID(+) AND U.USER_GROUP_ID=[F0] AND ([F0]=1 OR [F0]>1 AND ('[F1]' IS NULL OR U.CITY_CODE = '[F1]'))");   
		sqlMap.put("USER.FR1","SELECT USER_NAME, FULL_NAME, USER_PWD, USER_GROUP_ID, CITY_CODE, CENTER_ID, USER_LEVEL FROM ADM_USER WHERE USER_ID = [0]");
		sqlMap.put("USER.DL1","DELETE ADM_USER WHERE USER_ID='[0]'");
		
		//LST_MANUFACTURE
		sqlMap.put("MANUFACTURE.GR1","SELECT * FROM LST_MANUFACTURE");   
		sqlMap.put("MANUFACTURE.FR1","SELECT * FROM LST_MANUFACTURE WHERE MANUFACTURE_ID='[0]'");
		sqlMap.put("MANUFACTURE.DL1","DELETE LST_MANUFACTURE WHERE MANUFACTURE_ID='[0]'");
		
		//INF_DEVICE
		sqlMap.put("INF_DEVICE.GR1","SELECT A.*,G.DEVICETYPE_GROUP_NAME,T.DEVICETYPE_NAME, M.MANUFACTURE_NAME FROM INF_DEVICE A, LST_DEVICETYPE_GROUP G, LST_DEVICETYPE T, LST_MANUFACTURE M WHERE A.DEVICETYPE_ID=T.DEVICETYPE_ID AND T.DEVICETYPE_GROUP_ID=G.DEVICETYPE_GROUP_ID AND A.MANUFACTURE_ID=M.MANUFACTURE_ID AND A.DEVICETYPE_ID=[F1]");   
		sqlMap.put("INF_DEVICE.FR1","SELECT * FROM INF_DEVICE WHERE INF_DEVICE_ID='[0]'");
		sqlMap.put("INF_DEVICE.DL1","DELETE INF_DEVICE WHERE INF_DEVICE_ID='[0]'");
		//INF_DEVICE_SLOT
		sqlMap.put("INF_DEVICE_SLOT.GR1","SELECT a.INF_SLOT_ID, a.INF_SLOT_INDEX, DECODE(a.INF_CARD_ID,0,'Có thể thay đổi',c.PRODUCT_NUM) FIXED_CARD_NAME  FROM INF_DEVICE_SLOT a, INF_DEVICE_CARD c WHERE a.INF_CARD_ID=c.INF_CARD_ID(+) AND a.INF_DEVICE_ID=[F2] ORDER BY INF_SLOT_INDEX");   
		sqlMap.put("INF_DEVICE_SLOT.FR1","SELECT * FROM INF_DEVICE_SLOT WHERE INF_SLOT_ID='[0]'");
		sqlMap.put("INF_DEVICE_SLOT.DL1","DELETE INF_DEVICE_SLOT WHERE INF_SLOT_ID='[0]'");
		
		//INF_DEVICE_CARD
		sqlMap.put("INF_DEVICE_CARD.GR1","SELECT INF_CARD_ID, DECODE(INF_CARD_TYPE,0,'Fix (Theo TB','Rời (Removeable') INF_CARD_TYPE, PRODUCT_NUM, DEVICE_COMPATIBLE  FROM INF_DEVICE_CARD WHERE DEVICETYPE_ID=[F1] AND MANUFACTURE_ID=[F2]");   
		sqlMap.put("INF_DEVICE_CARD.FR1","SELECT * FROM INF_DEVICE_CARD WHERE INF_CARD_ID='[0]'");
		sqlMap.put("INF_DEVICE_CARD.DL1","DELETE INF_DEVICE_CARD WHERE INF_CARD_ID='[0]'");
		
		//INF_DEVICE_CARD_LOGIC
		sqlMap.put("CARD_LOGIC.GR1","SELECT a.INF_CARD_LOGIC_ID, a.CARD_INDEX, t.CARD_TYPE_NAME, a.PORT_NUM, s.PORT_SPEED_NAME, a.PORT_PREFIX  FROM INF_DEVICE_CARD_LOGIC a, INF_DEVICE_CARD_TYPE t, INF_PORT_SPEED s WHERE a.CARD_TYPE_ID=t.CARD_TYPE_ID AND a.PORT_SPEED_ID = s.PORT_SPEED_ID AND a.INF_CARD_ID=[F2] ORDER BY a.CARD_INDEX");   
		sqlMap.put("CARD_LOGIC.FR1","SELECT * FROM INF_DEVICE_CARD_LOGIC WHERE INF_CARD_LOGIC_ID='[0]'");
		sqlMap.put("CARD_LOGIC.DL1","DELETE INF_DEVICE_CARD_LOGIC WHERE INF_CARD_LOGIC_ID='[0]'");
	};
	public static void initSql(String db_name) {
		if(isLoaded) {
			return;
		}
		else {
			RecordSet rs=DBUtil.executeQuery(db_name, "select sql_id,sql_text from ctl_sql where module_id=1");
			while(rs.next()) {
				String sql_id=rs.getString("sql_id");
				String sql_text=rs.getString("sql_text");
				sqlMap.put(sql_id, sql_text);
			}
			isLoaded=true;
		}
	}
	public static String getSqlById(String sql_id) {
		String sql_text="";
		sql_text=sqlMap.get(sql_id);		
		return sql_text;
	}
	
}