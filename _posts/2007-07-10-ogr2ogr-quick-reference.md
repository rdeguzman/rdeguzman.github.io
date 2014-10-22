---
title: OGR Quick Reference
author: rupert
layout: post
permalink: /2007/07/ogr2ogr-quick-reference/
aktt_notify_twitter:
  - no
categories:
  - GDAL/OGR
tags:
  - mapinfo
  - ogr2ogr
  - postgis
  - postgres
---
Here is a list of the most widely used OGR commands I use..

**OGR2OGR**  
**1. POSTGRES -> MAPINFO**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #666666;">$ </span>ogr2ogr <span style="color: #660033;">-f</span> <span style="color: #ff0000;">"Mapinfo File"</span> busline_buffer10m.tab PG:<span style="color: #ff0000;">"host=localhost user=postgres dbname=cybersoftbj"</span> <span style="color: #660033;">-sql</span> <span style="color: #ff0000;">"select * from table_name"</span> -a_srs WGS84 <span style="color: #660033;">-nln</span> layer_name <span style="color: #660033;">-nlt</span> MULTIPOLYGON</pre>
      </td>
    </tr>
  </table>
</div>

**2. MAPINFO -> POSTGRES**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">ogr2ogr <span style="color: #660033;">-f</span> <span style="color: #ff0000;">"PostgreSQL"</span> PG:<span style="color: #ff0000;">"host=127.0.0.1 user=rupert dbname=australia password=*****"</span> AUS_ROAD.TAB <span style="color: #660033;">-nln</span> AUS_ROAD -a_srs EPSG:<span style="color: #000000;">4269</span> -t_srs EPSG:<span style="color: #000000;">3857</span> <span style="color: #660033;">-skip-failures</span>
&nbsp;
ogr2ogr <span style="color: #660033;">-f</span> <span style="color: #ff0000;">"PostgreSQL"</span> PG:<span style="color: #ff0000;">"host=myhost user=myloginname dbname=mydbname password=mypassword"</span> mytabfile.tab <span style="color: #660033;">-nln</span> newtablename <span style="color: #660033;">-select</span> columnName</pre>
      </td>
    </tr>
  </table>
</div>

Note: If you have Chinese characters, might as well do MAPINFO -> SHAPE -> POSTGRES  
<http://222.128.19.19/wordpress/?p=108>

**3. SHAPE -> POSTGRES**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">shp2pgsql <span style="color: #660033;">-W</span> <span style="color: #ff0000;">"gbk"</span> <span style="color: #660033;">-s</span> <span style="color: #000000;">4326</span> lbjrdnt_small_polyline roads <span style="color: #000000; font-weight: bold;">&</span>gt; roads.sql</pre>
      </td>
    </tr>
  </table>
</div>

**4. POSTGRES -> SHAPE**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">pgsql2shp <span style="color: #660033;">-h</span> 127.0.0.1 <span style="color: #660033;">-u</span> lbs <span style="color: #660033;">-P</span> tracking <span style="color: #660033;">-f</span> roads.shp databasename tablename</pre>
      </td>
    </tr>
  </table>
</div>

**4. MAPINFO TO ORACLE**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">ogr2ogr <span style="color: #660033;">-f</span> OCI OCI:username<span style="color: #000000; font-weight: bold;">/</span>password<span style="color: #000000; font-weight: bold;">@</span>orcl C:\path_to_tabfile\EMPLOYEES.TAB <span style="color: #660033;">-nln</span> employees</pre>
      </td>
    </tr>
  </table>
</div>

Note: This assumes you already have Oracle 10g Client installed and &#8220;orcl&#8221; is defined as an instance in tnsnames.ora. OGR2OGR automatically updates USER\_SDO\_GEOM_METADATA and creates a spatial index.

**5. MAPINFO to MAPINFO but different projection. From EPSG:4326 to EPSG:3857**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"> ogr2ogr <span style="color: #660033;">-f</span> <span style="color: #ff0000;">"MapInfo File"</span> BaseMaps_3857<span style="color: #000000; font-weight: bold;">/</span>AUS_CITIES_3857.TAB BaseMaps<span style="color: #000000; font-weight: bold;">/</span>AUS_CITIES.TAB -a_srs <span style="color: #ff0000;">"EPSG:4326"</span> -t_srs <span style="color: #ff0000;">"EPSG:3857"</span></pre>
      </td>
    </tr>
  </table>
</div>