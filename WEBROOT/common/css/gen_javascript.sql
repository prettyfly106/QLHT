select LISTAGG(c, ',')
   WITHIN GROUP (ORDER BY c) "Employees"
 from  (
SELECT (decode(data_type,'NUMBER','N','VARCHAR2','S','CHAR','S','DATE','D','NVARCHAR2','S')||','||'txt,'||''||UPPER(column_name) || ',E') c
FROM user_tab_cols a
WHERE table_name=UPPER('CTR_CONTRACT') order by column_id) t

--ctllData
SELECT 'ctlDataCus['||(column_id-1)||']=["'||decode(data_type,'NUMBER','N','VARCHAR2','S','DATE','D','NVARCHAR2','S')||'",'||'"T",'||'"'||UPPER(SUBSTR(lower(column_name),1,1))||SUBSTR(lower(column_name),2)||'"];'
FROM user_tab_cols a
WHERE table_name=UPPER('CTR_CUSTOMER') order by column_id;
--RI

SELECT 'var RI_'||UPPER(SUBSTR(lower(column_name),1,1))||SUBSTR(lower(column_name),2)||'='||(column_id-1)||';'
FROM user_tab_cols a
WHERE table_name=UPPER('CTR_CUSTOMER') order by column_id;


COM_IDENTIFICATION

SELECT 'ctlData_Identifi[]=["'||decode(data_type,'NUMBER','N','VARCHAR2','S','DATE','D','NVARCHAR2','S')||'",'||'"T",'||'"'||lower(column_name)||'"];'
FROM user_tab_cols a
WHERE table_name=UPPER('COM_IDENTIFICATION')

COM_ADDRESS

SELECT 'ctlData_Addr[]=["'||decode(data_type,'NUMBER','N','VARCHAR2','S','DATE','D','NVARCHAR2','S')||'",'||'"T",'||'"'||lower(column_name)||'"];'
FROM user_tab_cols a
WHERE table_name=UPPER('COM_ADDRESS')

COM_CONTACT

SELECT 'ctlData_Contact[]=["'||decode(data_type,'NUMBER','N','VARCHAR2','S','DATE','D','NVARCHAR2','S')||'",'||'"T",'||'"'||lower(column_name)||'"];'
FROM user_tab_cols a
WHERE table_name=UPPER('COM_CONTACT')
