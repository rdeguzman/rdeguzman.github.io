---
title: Loading Mapinfo table to PostGis
author: rupert
layout: post
permalink: /2007/04/loading-mapinfo-table-to-postgis/
categories:
  - GDAL/OGR
  - postgis
  - postgres
tags:
  - mapinfo
  - ogr2ogr
  - postgis
  - postgres
---
AFAIK, there are only two ways to load data to PostGIS:  
1. Using Insert statements  
2. Using Utilities.

Utilities include shp2pgsql which is found in &#8220;C:\Program Files\PostgreSQL\8.2\bin\&#8221; or &#8220;/usr/local/pgsql/bin&#8221;. To load Mapinfo table, I have used the OGR utilities from [FWTools for Windows.][1] and used [gdal1.3.2][2] (since it contains ogr) for Unix.

[OGR2OGR CheatSheet][3] should be a good kickstart for basic understanding. For the impatient..

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">ogr2ogr <span style="color: #660033;">-f</span> <span style="color: #ff0000;">"PostGreSQL"</span> <span style="color: #660033;">-nlt</span> LINESTRING -a_srs <span style="color: #ff0000;">"EPSG:4326"</span> PG:<span style="color: #ff0000;">"host=localhost user=username password=mypassword dbname=mydb mytab.TAB -select columnName</span></pre>
      </td>
    </tr>
  </table>
</div>

or

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">ogr2ogr <span style="color: #660033;">-f</span> <span style="color: #ff0000;">"PostgreSQL"</span> PG:<span style="color: #ff0000;">"host=myhost user=myloginname dbname=mydbname password=mypassword"</span> mytabfile.tab <span style="color: #660033;">-nln</span> newtablename <span style="color: #660033;">-select</span> columnName</pre>
      </td>
    </tr>
  </table>
</div>

Bear in mind that you should select out the columns from your mapfile (mine is chinese) especially if you have a diffent encoding in your column which matches your database (postgres). You might get a &#8220;Terminating translation prematurely after failed translation of layer [layername]&#8221; error. Since Mapinfo stores the text to ASCII, my workaround is to export the tabfile to a UTF-8 textfile then upload it to PostGres. Hoping the primary ids would match to make the necessary updates&#8230;

An alternative to load Chinese text from Mapinfo to PostGIS is the ff:  
1. In Mapinfo use the Universal Translator to export the table into a shape file.  
2. Once you have the shape file, you can directly use the **shp2pgsql***.*

*shp2pgsql -W &#8220;gbk&#8221; -s 4326 lbjrdnt\_small\_polyline roads > roads.sql*

 [1]: http://fwtools.maptools.org/
 [2]: www.gdal.org
 [3]: http://www.bostongis.com/?content_name=ogr_cheatsheet