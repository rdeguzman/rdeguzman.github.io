---
title: Oracle SQL CheatSheet
author: rupert
layout: post
permalink: /2008/08/oracle-sql-cheatsheet/
aktt_tweeted:
  - 1
aktt_notify_twitter:
  - no
categories:
  - oracle
tags:
  - oracle
  - oracle spatial
---
References:  
[Comparison of different SQL implementations][1]

[Oracle DataTypes][2]

### Part 1: Oracle Misc Information

***Oracle Services Running on Windows?**  
<img src="http://www.gisnotes.com/images/2009/03/oracle-services-running-on-windows.png" border="0" alt="Oracle Services Running on Windows.png" width="733" height="91" />

*** How to create a user?**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">CREATE</span> <span style="color: #993333; font-weight: bold;">USER</span> <span style="color: #ff0000;">"APPDEV"</span> PROFILE <span style="color: #ff0000;">"DEFAULT"</span> <span style="color: #993333; font-weight: bold;">IDENTIFIED</span> <span style="color: #993333; font-weight: bold;">BY</span> <span style="color: #ff0000;">"*******"</span> <span style="color: #993333; font-weight: bold;">DEFAULT</span> TABLESPACE <span style="color: #ff0000;">"USERS"</span> <span style="color: #993333; font-weight: bold;">TEMPORARY</span> TABLESPACE <span style="color: #ff0000;">"TEMP"</span> ACCOUNT <span style="color: #993333; font-weight: bold;">UNLOCK</span>
<span style="color: #993333; font-weight: bold;">GRANT</span> UNLIMITED TABLESPACE <span style="color: #993333; font-weight: bold;">TO</span> <span style="color: #ff0000;">"APPDEV"</span>;
<span style="color: #993333; font-weight: bold;">GRANT</span> <span style="color: #ff0000;">"CONNECT"</span> <span style="color: #993333; font-weight: bold;">TO</span> <span style="color: #ff0000;">"APPDEV"</span>;
<span style="color: #993333; font-weight: bold;">GRANT</span> <span style="color: #ff0000;">"RESOURCE"</span> <span style="color: #993333; font-weight: bold;">TO</span> <span style="color: #ff0000;">"APPDEV"</span>;</pre>
      </td>
    </tr>
  </table>
</div>

*** How to load data in bulk?**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="text" style="font-family:monospace;">SQLLDR username/password CONTROL=filename DATA=filename</pre>
      </td>
    </tr>
  </table>
</div>

Note:  
1. You can specify the CHARACTERSET UTF8 in your control file for multilingual databases.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">LOAD</span> <span style="color: #993333; font-weight: bold;">DATA</span>
CHARACTERSET UTF8
<span style="color: #993333; font-weight: bold;">INFILE</span> <span style="color: #66cc66;">*</span>
<span style="color: #993333; font-weight: bold;">REPLACE</span> <span style="color: #993333; font-weight: bold;">INTO</span> <span style="color: #993333; font-weight: bold;">TABLE</span> LOADER_TEST
<span style="color: #993333; font-weight: bold;">FIELDS</span> <span style="color: #993333; font-weight: bold;">TERMINATED</span> <span style="color: #993333; font-weight: bold;">BY</span> <span style="color: #ff0000;">';'</span>
<span style="color: #993333; font-weight: bold;">TRAILING</span> NULLCOLS <span style="color: #66cc66;">&#40;</span>
USR_ID         <span style="color: #993333; font-weight: bold;">INTEGER</span> EXTERNAL<span style="color: #66cc66;">,</span>
USR_NAME       <span style="color: #993333; font-weight: bold;">CHAR</span><span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">50</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span>
USR_LNK_NAME   <span style="color: #993333; font-weight: bold;">CHAR</span><span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">50</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span>
USR_LNK_ORDER  <span style="color: #993333; font-weight: bold;">INTEGER</span> EXTERNAL
<span style="color: #66cc66;">&#41;</span></pre>
      </td>
    </tr>
  </table>
</div>

2. Sometimes SQLLDR does not display anything when loading. Be sure to issue a &#8220;commit&#8221; command before doing anything.

*** How to use EXPORT / IMPORT?**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">EXP</span> scott<span style="color: #66cc66;">/</span>tiger@instance FILE<span style="color: #66cc66;">=</span>geo_entities<span style="color: #66cc66;">.</span>dmp <span style="color: #993333; font-weight: bold;">TABLES</span><span style="color: #66cc66;">=</span>geo_entities
&nbsp;
IMP sysman<span style="color: #66cc66;">/</span>password FILE<span style="color: #66cc66;">=/</span>path<span style="color: #66cc66;">/</span><span style="color: #993333; font-weight: bold;">TO</span><span style="color: #66cc66;">/</span>geo_entities<span style="color: #66cc66;">.</span>dmp FROMUSE<span style="color: #66cc66;">=</span>scott TOUSER<span style="color: #66cc66;">=</span>appdev <span style="color: #993333; font-weight: bold;">IGNORE</span><span style="color: #66cc66;">=</span>Y INDEXES<span style="color: #66cc66;">=</span>N <span style="color: #993333; font-weight: bold;">TABLES</span><span style="color: #66cc66;">=</span>geo_entities</pre>
      </td>
    </tr>
  </table>
</div>

Note: Delete records first before importing

*** What is the database encoding of my database?**

<pre>SELECT * FROM V$NLS_PARAMETERS</pre>

<img src="http://www.gisnotes.com/images/2008/12/picture-11.png" border="0" alt="Picture 1.png" width="367" height="409" />

### Part 2: Oracle SQL

*** ADD COLUMN in a TABLE**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">ALTER</span> <span style="color: #993333; font-weight: bold;">TABLE</span> <span style="color: #993333; font-weight: bold;">TABLE_NAME</span> <span style="color: #993333; font-weight: bold;">ADD</span> <span style="color: #66cc66;">&#40;</span>column_name  <span style="color: #993333; font-weight: bold;">NUMBER</span><span style="color: #66cc66;">&#41;</span>;</pre>
      </td>
    </tr>
  </table>
</div>

*** CHANGE COLUMN NAME in a TABLE**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">ALTER</span> <span style="color: #993333; font-weight: bold;">TABLE</span> geo_entities <span style="color: #993333; font-weight: bold;">MODIFY</span> meta_name <span style="color: #993333; font-weight: bold;">VARCHAR</span><span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">255</span><span style="color: #66cc66;">&#41;</span></pre>
      </td>
    </tr>
  </table>
</div>

*** DROP COLUMN NAME in a TABLE**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">ALTER</span> <span style="color: #993333; font-weight: bold;">TABLE</span> <span style="color: #993333; font-weight: bold;">TABLE_NAME</span> <span style="color: #993333; font-weight: bold;">DROP</span> <span style="color: #993333; font-weight: bold;">COLUMN</span> column_name;</pre>
      </td>
    </tr>
  </table>
</div>

*** ADD PRIMARY KEY CONSTRAINT on a COLUMN**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">ALTER</span> <span style="color: #993333; font-weight: bold;">TABLE</span> <span style="color: #993333; font-weight: bold;">TABLE_NAME</span> <span style="color: #993333; font-weight: bold;">ADD</span> <span style="color: #993333; font-weight: bold;">CONSTRAINT</span> table_name_col_pk <span style="color: #993333; font-weight: bold;">PRIMARY</span> <span style="color: #993333; font-weight: bold;">KEY</span><span style="color: #66cc66;">&#40;</span>column_name<span style="color: #66cc66;">&#41;</span>;</pre>
      </td>
    </tr>
  </table>
</div>

*** Select Top N rows**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">SELECT</span> <span style="color: #66cc66;">*</span> <span style="color: #993333; font-weight: bold;">FROM</span> <span style="color: #993333; font-weight: bold;">TABLE_NAME</span> <span style="color: #993333; font-weight: bold;">WHERE</span> ROWNUM <span style="color: #66cc66;">&lt;=</span> <span style="color: #cc66cc;">100</span></pre>
      </td>
    </tr>
  </table>
</div>

*** CREATING AN AUTO INCREMENT COLUMN**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">CREATE</span> <span style="color: #993333; font-weight: bold;">SEQUENCE</span> seq_table_name_pk <span style="color: #993333; font-weight: bold;">INCREMENT</span> <span style="color: #993333; font-weight: bold;">BY</span> <span style="color: #cc66cc;">1</span> <span style="color: #993333; font-weight: bold;">START</span> <span style="color: #993333; font-weight: bold;">WITH</span> <span style="color: #cc66cc;">10000</span>;
&nbsp;
<span style="color: #993333; font-weight: bold;">INSERT</span> <span style="color: #993333; font-weight: bold;">INTO</span> <span style="color: #993333; font-weight: bold;">TABLE_NAME</span> <span style="color: #66cc66;">&#40;</span>pid<span style="color: #66cc66;">,</span> en_name<span style="color: #66cc66;">&#41;</span> 
<span style="color: #993333; font-weight: bold;">SELECT</span> seq_table_name_pk<span style="color: #66cc66;">.</span><span style="color: #993333; font-weight: bold;">NEXTVAL</span><span style="color: #66cc66;">,</span> en_name <span style="color: #993333; font-weight: bold;">FROM</span> other_table</pre>
      </td>
    </tr>
  </table>
</div>

*** Concatenating Strings**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">SELECT</span> concat<span style="color: #66cc66;">&#40;</span><span style="color: #ff0000;">'hello'</span><span style="color: #66cc66;">,</span> <span style="color: #ff0000;">'rupert'</span><span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">FROM</span> DUAL;
<span style="color: #993333; font-weight: bold;">SELECT</span> <span style="color: #ff0000;">'hello'</span> <span style="color: #66cc66;">||</span> <span style="color: #ff0000;">'rupert'</span> <span style="color: #993333; font-weight: bold;">FROM</span> DUAL;</pre>
      </td>
    </tr>
  </table>
</div>

*** UPDATE TABLE**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">UPDATE</span> poi_temp pt
<span style="color: #993333; font-weight: bold;">SET</span> geom <span style="color: #66cc66;">=</span> <span style="color: #66cc66;">&#40;</span><span style="color: #993333; font-weight: bold;">SELECT</span> geom <span style="color: #993333; font-weight: bold;">FROM</span> poi_app <span style="color: #993333; font-weight: bold;">WHERE</span> poi_id <span style="color: #66cc66;">=</span> pt<span style="color: #66cc66;">.</span>poi_id<span style="color: #66cc66;">&#41;</span>
<span style="color: #993333; font-weight: bold;">WHERE</span> <span style="color: #993333; font-weight: bold;">EXISTS</span> <span style="color: #66cc66;">&#40;</span><span style="color: #993333; font-weight: bold;">SELECT</span> <span style="color: #cc66cc;">1</span> <span style="color: #993333; font-weight: bold;">FROM</span> poi_app <span style="color: #993333; font-weight: bold;">WHERE</span> poi_id <span style="color: #66cc66;">=</span> pt<span style="color: #66cc66;">.</span>poi_id<span style="color: #66cc66;">&#41;</span>
&nbsp;
<span style="color: #993333; font-weight: bold;">UPDATE</span> poi_app pa
<span style="color: #993333; font-weight: bold;">SET</span> <span style="color: #66cc66;">&#40;</span>long_900913<span style="color: #66cc66;">,</span> lat_900913<span style="color: #66cc66;">&#41;</span> <span style="color: #66cc66;">=</span> <span style="color: #66cc66;">&#40;</span><span style="color: #993333; font-weight: bold;">SELECT</span> pg<span style="color: #66cc66;">.</span>long_900913<span style="color: #66cc66;">,</span> pg<span style="color: #66cc66;">.</span>lat_900913 <span style="color: #993333; font-weight: bold;">FROM</span> poi_app_900913 pg <span style="color: #993333; font-weight: bold;">WHERE</span> pa<span style="color: #66cc66;">.</span>poi_id <span style="color: #66cc66;">=</span> pg<span style="color: #66cc66;">.</span>poi_id<span style="color: #66cc66;">&#41;</span>
<span style="color: #993333; font-weight: bold;">WHERE</span> <span style="color: #993333; font-weight: bold;">EXISTS</span> <span style="color: #66cc66;">&#40;</span><span style="color: #993333; font-weight: bold;">SELECT</span> <span style="color: #cc66cc;">1</span> <span style="color: #993333; font-weight: bold;">FROM</span> poi_app_900913 pg <span style="color: #993333; font-weight: bold;">WHERE</span> pa<span style="color: #66cc66;">.</span>poi_id <span style="color: #66cc66;">=</span> pg<span style="color: #66cc66;">.</span>poi_id<span style="color: #66cc66;">&#41;</span></pre>
      </td>
    </tr>
  </table>
</div>

### Part 3: Oracle Spatial

*** What is SDO_GEOMETRY?**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="text" style="font-family:monospace;">SDO_GEOMETRY{
    SDO_GTYPE, - GeometryType: D00T
    D: Dimension (2: 2d, 3: 3d, 4:4d)
        T:GeometryType(
        0 - unknown
        1 - point
        2 - line
        3 - polygon
        4 - collection
        5 - multipoint
        6 - multiline
        7 - multipolygon
    )
    SDO_SRID,
    SDO_POINT, - NULL for line, polygon, etc.
    SDO_ELEM_INFO,
    SDO_ORDINATES
}</pre>
      </td>
    </tr>
  </table>
</div>

*** How to know the geometry type?**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;">THE_GEOM<span style="color: #66cc66;">&#40;</span>SDO_GTYPE<span style="color: #66cc66;">,</span> SDO_SRID<span style="color: #66cc66;">,</span> SDO_POINT<span style="color: #66cc66;">&#40;</span>X<span style="color: #66cc66;">,</span> Y<span style="color: #66cc66;">,</span> Z<span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span> SDO_ELEM_INFO<span style="color: #66cc66;">,</span> SDO_ORDINATES<span style="color: #66cc66;">&#41;</span>
<span style="color: #808080; font-style: italic;">--------------------------------------------------------------------------------</span>
SDO_GEOMETRY<span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">3</span><span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">4326</span><span style="color: #66cc66;">,</span> <span style="color: #993333; font-weight: bold;">NULL</span><span style="color: #66cc66;">,</span> SDO_ELEM_INFO_ARRAY<span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">1</span><span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">3</span><span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">1</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span> SDO_ORDINATE_ARRAY<span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">116</span>
<span style="color: #66cc66;">.</span>281578<span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">39.854501</span><span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">116.281491</span><span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">39.853828</span><span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">116.281236</span><span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">39.853181</span><span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">116.280821</span><span style="color: #66cc66;">,</span> <span style="color: #66cc66;">....</span><span style="color: #cc66cc;">39</span>
<span style="color: #66cc66;">.</span>855174<span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">116.281578</span><span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">39.854501</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">&#41;</span>
&nbsp;
THE_GEOM<span style="color: #66cc66;">&#40;</span>SDO_GTYPE<span style="color: #66cc66;">,</span> SDO_SRID<span style="color: #66cc66;">,</span> SDO_POINT<span style="color: #66cc66;">&#40;</span>X<span style="color: #66cc66;">,</span> Y<span style="color: #66cc66;">,</span> Z<span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">,</span> SDO_ELEM_INFO<span style="color: #66cc66;">,</span> SDO_ORDINATES<span style="color: #66cc66;">&#41;</span>
<span style="color: #808080; font-style: italic;">--------------------------------------------------------------------------------</span>
&nbsp;
SQL<span style="color: #66cc66;">&gt;</span> <span style="color: #993333; font-weight: bold;">SELECT</span> g<span style="color: #66cc66;">.</span>the_geom<span style="color: #66cc66;">.</span>sdo_gtype <span style="color: #993333; font-weight: bold;">FROM</span> geo_entities g <span style="color: #993333; font-weight: bold;">WHERE</span> rownum <span style="color: #66cc66;">&lt;=</span> <span style="color: #cc66cc;">1</span>;
&nbsp;
THE_GEOM<span style="color: #66cc66;">.</span>SDO_GTYPE
<span style="color: #808080; font-style: italic;">------------------</span>
<span style="color: #cc66cc;">3</span></pre>
      </td>
    </tr>
  </table>
</div>

*** How to create a spatial index?**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">INSERT</span> <span style="color: #993333; font-weight: bold;">INTO</span> USER_SDO_GEOM_METADATA <span style="color: #993333; font-weight: bold;">VALUES</span>
<span style="color: #66cc66;">&#40;</span>
    <span style="color: #ff0000;">'table_name'</span><span style="color: #66cc66;">,</span> <span style="color: #808080; font-style: italic;">-- TABLE_NAME</span>
    <span style="color: #ff0000;">'geom'</span><span style="color: #66cc66;">,</span> <span style="color: #808080; font-style: italic;">-- COLUMN_NAME</span>
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
<span style="color: #993333; font-weight: bold;">CREATE</span> <span style="color: #993333; font-weight: bold;">INDEX</span> idx_poi_app_geom <span style="color: #993333; font-weight: bold;">ON</span> poi_app<span style="color: #66cc66;">&#40;</span>geom<span style="color: #66cc66;">&#41;</span> INDEXTYPE <span style="color: #993333; font-weight: bold;">IS</span> MDSYS<span style="color: #66cc66;">.</span>SPATIAL_INDEX;
&nbsp;
<span style="color: #993333; font-weight: bold;">CREATE</span> <span style="color: #993333; font-weight: bold;">INDEX</span> idx_poi_app_geom <span style="color: #993333; font-weight: bold;">ON</span> poi_app<span style="color: #66cc66;">&#40;</span>geom<span style="color: #66cc66;">&#41;</span>
INDEXTYPE <span style="color: #993333; font-weight: bold;">IS</span> MDSYS<span style="color: #66cc66;">.</span>SPATIAL_INDEX PARAMETERS<span style="color: #66cc66;">&#40;</span><span style="color: #ff0000;">'LAYER_GTYPE=POINT'</span><span style="color: #66cc66;">&#41;</span></pre>
      </td>
    </tr>
  </table>
</div>

*** How to VALIDATE a geometry?**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">SELECT</span> SDO_GEOM<span style="color: #66cc66;">.</span>VALIDATE_GEOMETRY_WITH_CONTEXT<span style="color: #66cc66;">&#40;</span>GEOM<span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">0.000000005</span><span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">FROM</span> <span style="color: #993333; font-weight: bold;">TABLE_NAME</span></pre>
      </td>
    </tr>
  </table>
</div>

*** SPATIAL INTERSECTION**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">SELECT</span> pc<span style="color: #66cc66;">.</span>postcode<span style="color: #66cc66;">,</span> au<span style="color: #66cc66;">.</span>authority_name<span style="color: #66cc66;">,</span> au<span style="color: #66cc66;">.</span>state<span style="color: #66cc66;">,</span> au<span style="color: #66cc66;">.</span>authority_type
<span style="color: #993333; font-weight: bold;">FROM</span> econ_authorities_valid_temp au<span style="color: #66cc66;">,</span> econ_postcodes pc
<span style="color: #993333; font-weight: bold;">WHERE</span> pc<span style="color: #66cc66;">.</span>POSTCODE <span style="color: #66cc66;">=</span> <span style="color: #cc66cc;">3128</span>
	  <span style="color: #993333; font-weight: bold;">AND</span> SDO_ANYINTERACT<span style="color: #66cc66;">&#40;</span>
	  				  pc<span style="color: #66cc66;">.</span>GEOM<span style="color: #66cc66;">,</span>
	  				  au<span style="color: #66cc66;">.</span>GEOM
	  <span style="color: #66cc66;">&#41;</span> <span style="color: #66cc66;">=</span> <span style="color: #ff0000;">'TRUE</span></pre>
      </td>
    </tr>
  </table>
</div>

*  
Note: </p> 
1. Both geometries should be in the same projection.  
</em>

*** Get POINTS in a POLYGON using VERTICES**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">SELECT</span> SDO_UTIL<span style="color: #66cc66;">.</span>GETVERTICES<span style="color: #66cc66;">&#40;</span> GEOM <span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">FROM</span> ECON_AUTHORITIES <span style="color: #993333; font-weight: bold;">WHERE</span> AUTHORITYID <span style="color: #66cc66;">=</span> <span style="color: #cc66cc;">90009</span></pre>
      </td>
    </tr>
  </table>
</div>

 [1]: http://troels.arvin.dk/db/rdbms/
 [2]: http://ss64.com/ora/syntax-datatypes.html