---
title: Migrating Postgres / Postgis Tables to Oracle Spatial
author: rupert
layout: post
permalink: /2008/08/oracle-spatial-tutorial/
aktt_tweeted:
  - 1
categories:
  - oracle
tags:
  - oracle
---
**  
#### Step 1: Installing and configuring

</strong> 

1. On Windows, make sure that Windows > Settings > Control Panel > Regional Settings  
&#8211; Chinese (PRC)

<img src="/images/2008/08/picture-11.png" alt="Picture 1.png" border="0" width="406" height="478" />

2. Install Oracle10g  
&#8211; make sure you have spatial installed

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;">SQL<span style="color: #66cc66;">&gt;</span> <span style="color: #993333; font-weight: bold;">SELECT</span> COMP_NAME<span style="color: #66cc66;">,</span> <span style="color: #993333; font-weight: bold;">STATUS</span>
<span style="color: #993333; font-weight: bold;">FROM</span> DBA_REGISTRY
<span style="color: #993333; font-weight: bold;">WHERE</span> COMP_NAME <span style="color: #66cc66;">=</span> <span style="color: #ff0000;">'Spatial'</span>;</pre>
      </td>
    </tr>
  </table>
</div>

3. Create a multilingual database using dbca. Make sure setting is set to UTF8. I installed the sample schema for learning purposes. Read this [previous post][1] for more information.

4. We can add a user for our spatial database or just enable scott/tiger from the Enterprise Manager.

<img src="/images/2008/08/picture-15.png" alt="Picture 15.png" border="0" width="432" height="384" />

On Administration > Users > &#8220;Search for SCOTT&#8221; > Hit EDIT > UNLOCK the status.

<img src="/images/2008/08/picture-16.png" alt="Picture 16.png" border="0" width="620" height="487" /> 

**  
#### Step 2: Get Oracle Client Tools

</strong>  
1. On the same WindowsXPSP3 machine that I installed Oracle. There is already SQL*Plus. However I always go for the native which is CLI based. So on a command prompt, sqlplus still works. Also note that I can toggle to my previous commands using *&#8220;Arrow Up&#8221;*. If we have the Oracle Database installed on a different machine, we need to download the ff:

* Oracle SQL Developer (Java GUI-Based)

http://www.oracle.com/technology/software/products/sql/index.html

* Oracle 10g Client for Windows (10201\_client\_win32 1.zip 453MB)

* Oracle 10g Client for MacOS (Oracle\_10204Client\_MAC_X86.zip 189MB) &#8211; rarely used.

* Oracle Instant Client for MacOS (instantclient-basic-macosx-10.2.0.4.0.zip 32MB) &#8211; need to try this.

**  
#### Step 3: Creating the Table

</strong>  
1. POI Table

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">CREATE</span> <span style="color: #993333; font-weight: bold;">TABLE</span> poi
<span style="color: #66cc66;">&#40;</span>
  poi_id <span style="color: #993333; font-weight: bold;">NUMBER</span><span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">10</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span>
  cn_name varchar2<span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">255</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span>
  py_name varchar2<span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">255</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span>
  en_name varchar2<span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">255</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span>
  en_visname varchar2<span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">255</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span>
  cn_fullpoiadd varchar2<span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">255</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span>
  en_fullpoiadd varchar2<span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">255</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span>
  py_fullpoiadd varchar2<span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">255</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span>
  cn_rdname varchar2<span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">255</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span>
  py_rdname varchar2<span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">255</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span>
  cn_address_no varchar2<span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">255</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span>
  py_address_no varchar2<span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">255</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span>
  cn_address_other varchar2<span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">255</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span>
  py_address_other varchar2<span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">255</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span>
  postal varchar2<span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">20</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span>
  tel_no varchar2<span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">255</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span>
  fax_no varchar2<span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">255</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span>
  email varchar2<span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">255</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span>
  web_url varchar2<span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">255</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span>
  operating_hours  varchar2<span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">4000</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span>
  cards_accepted  varchar2<span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">4000</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span>
  cust_capacity  varchar2<span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">4000</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span>
  park_space  varchar2<span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">4000</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span>
  longitude <span style="color: #993333; font-weight: bold;">NUMBER</span><span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">20</span><span style="color: #66cc66;">,</span><span style="color: #cc66cc;">8</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span>
  latitude <span style="color: #993333; font-weight: bold;">NUMBER</span><span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">20</span><span style="color: #66cc66;">,</span><span style="color: #cc66cc;">8</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span>
  <span style="color: #993333; font-weight: bold;">CONSTRAINT</span> <span style="color: #ff0000;">"poi_pkey"</span> <span style="color: #993333; font-weight: bold;">PRIMARY</span> <span style="color: #993333; font-weight: bold;">KEY</span> <span style="color: #66cc66;">&#40;</span>poi_id<span style="color: #66cc66;">&#41;</span>
<span style="color: #66cc66;">&#41;</span>;</pre>
      </td>
    </tr>
  </table>
</div>

**  
#### Step 4: Exporting to TextFile with &#8220;|&#8221;

</strong>  
Export the table into a textfile. Run the SQL statement below on Navicat. Afterwards, run the &#8220;Export Wizard&#8221; and specify &#8220;|&#8221; as the *delimiter*.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">SELECT</span>
  poi_id<span style="color: #66cc66;">,</span>
  cn_name<span style="color: #66cc66;">,</span>
  py_name<span style="color: #66cc66;">,</span>
  en_name<span style="color: #66cc66;">,</span>
  en_visname<span style="color: #66cc66;">,</span>
  cn_fullpoiadd<span style="color: #66cc66;">,</span>
  en_fullpoiadd<span style="color: #66cc66;">,</span>
  py_fullpoiadd<span style="color: #66cc66;">,</span>
  cn_rdname<span style="color: #66cc66;">,</span>
  py_rdname<span style="color: #66cc66;">,</span>
  cn_address_no<span style="color: #66cc66;">,</span>
  py_address_no<span style="color: #66cc66;">,</span>
  cn_address_other<span style="color: #66cc66;">,</span>
  py_address_other<span style="color: #66cc66;">,</span>
  postal<span style="color: #66cc66;">,</span>
  tel_no<span style="color: #66cc66;">,</span>
  fax_no<span style="color: #66cc66;">,</span>
  email<span style="color: #66cc66;">,</span>
  web_url<span style="color: #66cc66;">,</span>
  operating_hours<span style="color: #66cc66;">,</span>
  cards_accepted<span style="color: #66cc66;">,</span>
  cust_capacity<span style="color: #66cc66;">,</span>
  park_space<span style="color: #66cc66;">,</span>
  longitude<span style="color: #66cc66;">,</span>
  latitude
<span style="color: #993333; font-weight: bold;">FROM</span> poi</pre>
      </td>
    </tr>
  </table>
</div>

Find out how many lines were exported using &#8220;wc -l file-name&#8221;. If there are more lines than actual records then most likely there are &#8216;\n&#8217; (newlines / carriage returns) on the exported file.

**  
#### Step 5: Use SQLLOADER to bulkload the data

</strong>

SQLLDR scott/tiger CONTROL=poi\_full.ctl DATA=data\_navicat\_cn\_all2.dat

Since we have point data in longitude, latitude columns. It is very easy to populate the SDO_GEOMETRY with these columns.

**  
#### Step 6: Creating Point Geometries from Long/Lat Columns

</strong>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">CREATE</span> <span style="color: #993333; font-weight: bold;">TABLE</span> poi_app <span style="color: #993333; font-weight: bold;">AS</span> <span style="color: #993333; font-weight: bold;">SELECT</span> <span style="color: #66cc66;">*</span> <span style="color: #993333; font-weight: bold;">FROM</span> poi <span style="color: #993333; font-weight: bold;">WHERE</span> latitude <span style="color: #66cc66;">&gt;</span> <span style="color: #cc66cc;"></span> <span style="color: #993333; font-weight: bold;">AND</span> longitude <span style="color: #66cc66;">&gt;</span> <span style="color: #cc66cc;"></span>;
&nbsp;
<span style="color: #993333; font-weight: bold;">ALTER</span> <span style="color: #993333; font-weight: bold;">TABLE</span> poi_app <span style="color: #993333; font-weight: bold;">ADD</span> the_geom SDO_GEOMETRY;
&nbsp;
<span style="color: #993333; font-weight: bold;">UPDATE</span> poi_app 
<span style="color: #993333; font-weight: bold;">SET</span> the_geom <span style="color: #66cc66;">=</span> SDO_GEOMETRY<span style="color: #66cc66;">&#40;</span> <span style="color: #cc66cc;">2001</span><span style="color: #66cc66;">,</span> <span style="color: #993333; font-weight: bold;">NULL</span><span style="color: #66cc66;">,</span> SDO_POINT_TYPE<span style="color: #66cc66;">&#40;</span>longitude<span style="color: #66cc66;">,</span> latitude<span style="color: #66cc66;">,</span> <span style="color: #993333; font-weight: bold;">NULL</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span> <span style="color: #993333; font-weight: bold;">NULL</span><span style="color: #66cc66;">,</span> <span style="color: #993333; font-weight: bold;">NULL</span><span style="color: #66cc66;">&#41;</span>;
&nbsp;
<span style="color: #993333; font-weight: bold;">INSERT</span> <span style="color: #993333; font-weight: bold;">INTO</span> USER_SDO_GEOM_METADATA <span style="color: #993333; font-weight: bold;">VALUES</span>
<span style="color: #66cc66;">&#40;</span>
	<span style="color: #ff0000;">'poi_app'</span><span style="color: #66cc66;">,</span> <span style="color: #808080; font-style: italic;">-- TABLE_NAME</span>
	<span style="color: #ff0000;">'the_geom'</span><span style="color: #66cc66;">,</span> <span style="color: #808080; font-style: italic;">-- COLUMN_NAME</span>
	SDO_DIM_ARRAY <span style="color: #808080; font-style: italic;">-- DIMINFO attribute for storing dimension bounds, tolerance</span>
	<span style="color: #66cc66;">&#40;</span>
		SDO_DIM_ELEMENT
		<span style="color: #66cc66;">&#40;</span>
			<span style="color: #ff0000;">'LONGITUDE'</span><span style="color: #66cc66;">,</span> <span style="color: #808080; font-style: italic;">-- DIMENSION NAME for first dimension</span>
			<span style="color: #66cc66;">-</span><span style="color: #cc66cc;">180</span><span style="color: #66cc66;">,</span> <span style="color: #808080; font-style: italic;">-- SDO_LB for the dimension</span>
			<span style="color: #cc66cc;">180</span><span style="color: #66cc66;">,</span> <span style="color: #808080; font-style: italic;">-- SDO_UB for the dimension</span>
			<span style="color: #cc66cc;">0.5</span> <span style="color: #808080; font-style: italic;">-- Tolerance of 0.5 meters</span>
		<span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span>
		SDO_DIM_ELEMENT
		<span style="color: #66cc66;">&#40;</span>
			<span style="color: #ff0000;">'LATITUDE'</span><span style="color: #66cc66;">,</span> <span style="color: #808080; font-style: italic;">-- DIMENSION NAME for second dimension</span>
			<span style="color: #66cc66;">-</span><span style="color: #cc66cc;">90</span><span style="color: #66cc66;">,</span> <span style="color: #808080; font-style: italic;">-- SDO_LB for the dimension</span>
			<span style="color: #cc66cc;">90</span><span style="color: #66cc66;">,</span> <span style="color: #808080; font-style: italic;">-- SDO_UB for the dimension</span>
			<span style="color: #cc66cc;">0.5</span> <span style="color: #808080; font-style: italic;">-- Tolerance of 0.5 meters</span>
		<span style="color: #66cc66;">&#41;</span>
	<span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span>
	<span style="color: #cc66cc;">4326</span> <span style="color: #808080; font-style: italic;">-- SRID value for specifying a geodetic coordinate system</span>
<span style="color: #66cc66;">&#41;</span>;
&nbsp;
<span style="color: #993333; font-weight: bold;">CREATE</span> <span style="color: #993333; font-weight: bold;">INDEX</span> idx_poi_app_the_geom <span style="color: #993333; font-weight: bold;">ON</span> poi_app<span style="color: #66cc66;">&#40;</span>the_geom<span style="color: #66cc66;">&#41;</span> INDEXTYPE <span style="color: #993333; font-weight: bold;">IS</span> MDSYS<span style="color: #66cc66;">.</span>SPATIAL_INDEX;</pre>
      </td>
    </tr>
  </table>
</div>

Once the index is created, *Oracle creates a SEQUENCE(MDRS\_C796$) and a TABLE(MDRT\_C796$)*. Please do not delete this table. I accidentally deleted this table and I have to recreate the indexes&#8211;well it was not that easy. I have to DROP INDEX, insert it into USER\_SDO\_GEOM_METADATA, then CREATE INDEX.

Note that it is important to include the geometry to be indexed in the USER\_SDO\_GEOM_METADATA table. This should happen before creating the index or receive an error like&#8230;

<img src="/images/2008/08/picture-21.png" alt="Picture 2.png" border="0" width="492" height="237" />

**  
#### Step 7: Creating Geometries from ESRI Shapefiles

</strong>  
* PGSQL2SHP &#8211; Use this to convert from a postgres table to an ESRI Shapefile. Note that if you have mixed geometries in a single column, then you need output different shapefiles for each geometry. For example, I have a &#8220;geo_entities&#8221; table which contains polygons, multipolygons, and multilinestrings. I was able to come up with three (3) different shapefiles for each geometry. Then afterwards load the individual shapefiles using SDO2SHP below.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">pgsql2shp <span style="color: #660033;">-f</span> geo_entities_2006 <span style="color: #660033;">-h</span> 127.0.0.1 <span style="color: #660033;">-u</span> lbs <span style="color: #660033;">-P</span> <span style="color: #000000; font-weight: bold;">*******</span> <span style="color: #660033;">-g</span> the_geom beijing_app <span style="color: #ff0000;">"SELECT gid,cn_name,py_name,en_name,entity_type,geom_type,meta_name,cn_district,the_geom FROM geo_entities WHERE GeometryType(the_geom) = 'MULTILINESTRING'"</span></pre>
      </td>
    </tr>
  </table>
</div>

* Ensure that you download [SDO2SHP][2]

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">shp2sdo shp\geo_entities_2007 geo_entities_2007 <span style="color: #660033;">-g</span> the_geom <span style="color: #660033;">-x</span> <span style="color: #7a0874; font-weight: bold;">&#40;</span>-<span style="color: #000000;">180</span>,<span style="color: #000000;">180</span><span style="color: #7a0874; font-weight: bold;">&#41;</span> <span style="color: #660033;">-y</span> <span style="color: #7a0874; font-weight: bold;">&#40;</span>-<span style="color: #000000;">90</span>,<span style="color: #000000;">90</span><span style="color: #7a0874; font-weight: bold;">&#41;</span> <span style="color: #660033;">-s</span> <span style="color: #000000;">4326</span> 
<span style="color: #660033;">-t</span> <span style="color: #000000;">0.5</span> <span style="color: #660033;">-v</span></pre>
      </td>
    </tr>
  </table>
</div>

The output of SHP2SDO are three (3) files:

a. CTL &#8211; control file containing &#8220;LOAD DATA&#8230;&#8221;  
b. SQL &#8211; contains &#8220;CREATE TABLE&#8230;&#8221;  
c. DAT &#8211; Data with &#8220;#&#8221;

 [1]: /wordpress/?p=220
 [2]: http://www.oracle.com/technology/software/products/spatial/index.html