---
title: Creating a Spatial Table in PostGIS
author: rupert
layout: post
permalink: /2007/04/creating-a-spatial-table/
categories:
  - postgis
  - postgres
tags:
  - centos
  - postgis
  - postgres
---
Creating the spatial table from scratch&#8230;

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #7a0874; font-weight: bold;">&#91;</span>postgres<span style="color: #000000; font-weight: bold;">@</span>rupert-linux ~<span style="color: #7a0874; font-weight: bold;">&#93;</span>$ <span style="color: #c20cb9; font-weight: bold;">su</span> - postgres
<span style="color: #7a0874; font-weight: bold;">&#91;</span>postgres<span style="color: #000000; font-weight: bold;">@</span>rupert-linux ~<span style="color: #7a0874; font-weight: bold;">&#93;</span>$ createdb _E UTF-<span style="color: #000000;">8</span> template_postgis
CREATE DATABASE
<span style="color: #7a0874; font-weight: bold;">&#91;</span>postgres<span style="color: #000000; font-weight: bold;">@</span>rupert-linux ~<span style="color: #7a0874; font-weight: bold;">&#93;</span>$ createlang plpgsql template_postgis
<span style="color: #7a0874; font-weight: bold;">&#91;</span>postgres<span style="color: #000000; font-weight: bold;">@</span>rupert-linux ~<span style="color: #7a0874; font-weight: bold;">&#93;</span>$ psql <span style="color: #660033;">-f</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>share<span style="color: #000000; font-weight: bold;">/</span>lwpostgis.sql <span style="color: #660033;">-d</span> template_postgis
CREATE FUNCTION
CREATE FUNCTION
CREATE FUNCTION
CREATE FUNCTION
CREATE FUNCTION
COMMIT
postgres<span style="color: #000000; font-weight: bold;">@</span>rupert-linux ~<span style="color: #7a0874; font-weight: bold;">&#93;</span>$ psql <span style="color: #660033;">-f</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>share<span style="color: #000000; font-weight: bold;">/</span>spatial_ref_sys.sql <span style="color: #660033;">-d</span> template_postgis
<span style="color: #7a0874; font-weight: bold;">&#91;</span>postgres<span style="color: #000000; font-weight: bold;">@</span>rupert-linux ~<span style="color: #7a0874; font-weight: bold;">&#93;</span>$ psql</pre>
      </td>
    </tr>
  </table>
</div>

Alternatively you could also create your spatial table from a template&#8230;

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">     <span style="color: #000000;">14</span> <span style="color: #007800;">postgres</span>=<span style="color: #666666; font-style: italic;"># CREATE DATABASE gistest TEMPLATE=template_postgis;</span>
     <span style="color: #000000;">15</span> CREATE DATABASE</pre>
      </td>
    </tr>
  </table>
</div>

I have also added the routing functions using routing.sql and routing_postgis.sql

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #7a0874; font-weight: bold;">&#91;</span>postgres<span style="color: #000000; font-weight: bold;">@</span>rupert-linux ~<span style="color: #7a0874; font-weight: bold;">&#93;</span>$ psql <span style="color: #660033;">-f</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>share<span style="color: #000000; font-weight: bold;">/</span>contrib<span style="color: #000000; font-weight: bold;">/</span>routing.sql <span style="color: #660033;">-d</span> template_postgis
<span style="color: #7a0874; font-weight: bold;">&#91;</span>postgres<span style="color: #000000; font-weight: bold;">@</span>rupert-linux ~<span style="color: #7a0874; font-weight: bold;">&#93;</span>$ psql <span style="color: #660033;">-f</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>share<span style="color: #000000; font-weight: bold;">/</span>contrib<span style="color: #000000; font-weight: bold;">/</span>routing_postgis.sql <span style="color: #660033;">-d</span> template_postgis</pre>
      </td>
    </tr>
  </table>
</div>

FYI&#8230;

The **spatial\_ref\_sys** table contains the ESPG codes and projections. Currently it has 3162 records.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;">gistest<span style="color: #66cc66;">=</span># \d spatial_ref_sys;
 srid      <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">INTEGER</span>                 <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">NOT</span> <span style="color: #993333; font-weight: bold;">NULL</span>
 auth_name <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">CHARACTER</span> <span style="color: #993333; font-weight: bold;">VARYING</span><span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">256</span><span style="color: #66cc66;">&#41;</span>  <span style="color: #66cc66;">|</span>
 auth_srid <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">INTEGER</span>                 <span style="color: #66cc66;">|</span>
 srtext    <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">CHARACTER</span> <span style="color: #993333; font-weight: bold;">VARYING</span><span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">2048</span><span style="color: #66cc66;">&#41;</span> <span style="color: #66cc66;">|</span>
 proj4text <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">CHARACTER</span> <span style="color: #993333; font-weight: bold;">VARYING</span><span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">2048</span><span style="color: #66cc66;">&#41;</span> <span style="color: #66cc66;">|</span></pre>
      </td>
    </tr>
  </table>
</div>

The **geometry_columns** contains the geometry type of the table you just created..

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;">gistest<span style="color: #66cc66;">=</span># \d geometry_columns;
 f_table_catalog   <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">CHARACTER</span> <span style="color: #993333; font-weight: bold;">VARYING</span><span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">256</span><span style="color: #66cc66;">&#41;</span> <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">NOT</span> <span style="color: #993333; font-weight: bold;">NULL</span>
 f_table_schema    <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">CHARACTER</span> <span style="color: #993333; font-weight: bold;">VARYING</span><span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">256</span><span style="color: #66cc66;">&#41;</span> <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">NOT</span> <span style="color: #993333; font-weight: bold;">NULL</span>
 f_table_name      <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">CHARACTER</span> <span style="color: #993333; font-weight: bold;">VARYING</span><span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">256</span><span style="color: #66cc66;">&#41;</span> <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">NOT</span> <span style="color: #993333; font-weight: bold;">NULL</span>
 f_geometry_column <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">CHARACTER</span> <span style="color: #993333; font-weight: bold;">VARYING</span><span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">256</span><span style="color: #66cc66;">&#41;</span> <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">NOT</span> <span style="color: #993333; font-weight: bold;">NULL</span>
 coord_dimension   <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">INTEGER</span>                <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">NOT</span> <span style="color: #993333; font-weight: bold;">NULL</span>
 srid              <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">INTEGER</span>                <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">NOT</span> <span style="color: #993333; font-weight: bold;">NULL</span>
 <span style="color: #993333; font-weight: bold;">TYPE</span>              <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">CHARACTER</span> <span style="color: #993333; font-weight: bold;">VARYING</span><span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">30</span><span style="color: #66cc66;">&#41;</span>  <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">NOT</span> <span style="color: #993333; font-weight: bold;">NULL</span></pre>
      </td>
    </tr>
  </table>
</div>