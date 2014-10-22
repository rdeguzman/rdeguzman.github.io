---
title: Mapinfo8 MySQL5 Connection
author: rupert
layout: post
permalink: /2007/02/linking-mysql5-with-mapinfo8/
categories:
  - mapinfo
tags:
  - mapinfo
  - mysql
---
I only tried this using point objects.

1. Download and install [MyODBC3.5.1][1]

2. Create database mapinfotest

3. Create the mapinfo_mapcatalog table as follows:  
``<br />
CREATE TABLE `mapinfo_mapcatalog` (<br />
`SpatialType` float NOT NULL default '0',<br />
`TableName` char(32) NOT NULL default '',<br />
`OwnerName` char(32) NOT NULL default '',<br />
`SpatialColumn` char(32) NOT NULL default '',<br />
`DB_X_LL` float NOT NULL default '0',<br />
`DB_Y_LL` float NOT NULL default '0',<br />
`DB_X_UR` float NOT NULL default '0',<br />
`DB_Y_UR` float NOT NULL default '0',<br />
`CoordinateSystem` char(254) NOT NULL,<br />
`Symbol` char(254) NOT NULL default '',<br />
`XColumnName` char(32) NOT NULL default '',<br />
`YColumnName` char(32) NOT NULL default '',<br />
PRIMARY KEY  (`TableName`,`OwnerName`)<br />
) ENGINE=MyISAM DEFAULT CHARSET=latin1;<br />
``

4. create a sample table with two (2) decimal columns for the latitude and longitude.  
``<br />
CREATE TABLE `poi_orig2` (<br />
`poiid` decimal(10,0) unsigned NOT NULL default '0',<br />
`id` char(10) NOT NULL default '',<br />
`py_name` char(255) character set utf8 default NULL,<br />
`latitude` decimal(20,8) default '0.00000000',<br />
`longitude` decimal(20,8) default '0.00000000',<br />
PRIMARY KEY  (`poiid`,`id`)<br />
)<br />
``

5. Open Mapinfo 8  
6. File -> Open DBMS Connection  
![][2]

7. Table > Maintenance > Make DBMS Table Mappable  
![][3]

Fill up the necessary values for the x,y and the index column.  
![][4]

You need to choose an index column so Mapinfo could update the record/s in MySQL, normally it would be an ID. Once successful you should be able to see the success window&#8230;

![][5]

8. Open the table  
![][6]

Click on the upper right corner to open a dbms connection. After selecting the datasource (mine is system) then it would give you a list of tables to choose from.

![][7]

 [1]: http://dev.mysql.com/downloads/connector/odbc/3.51.html
 [2]: /wordpress/images/mapinfo_odbc.png
 [3]: /wordpress/images/mapinfo_mappable_window.png
 [4]: /wordpress/images/mapinfo_mappable_window_2.png
 [5]: /wordpress/images/mapinfo_mappable_window_3.png
 [6]: /wordpress/images/mapinfo_mappable_window_4.png
 [7]: /wordpress/images/mapinfo_mappable_window_5.png