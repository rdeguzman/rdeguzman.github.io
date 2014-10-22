---
title: Preparing routing data for pgRouting
author: rupert
layout: post
permalink: /2007/04/preparing-routing-data-for-pgrouting/
categories:
  - postgis
  - postgres
tags:
  - mapinfo
  - pgRouting
  - postgis
  - postgres
  - routing
---
1. It is important that you already have [postgres, postgis, pgRouting installed in your machine.][1]

A. The schema. Below is the sample schema that is a derivative of the [kanagawa sample data from pgRouting][2]. Take note of the *source and target nodes*, as well as the length and the node coordinates (x1,y1; x2,y2) of the line.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;">cybersoftbj<span style="color: #66cc66;">=</span># \dt
List <span style="color: #993333; font-weight: bold;">OF</span> relations
 Schema <span style="color: #66cc66;">|</span>       Name       <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">TYPE</span>  <span style="color: #66cc66;">|</span>  Owner
<span style="color: #808080; font-style: italic;">--------+------------------+-------+----------</span>
 public <span style="color: #66cc66;">|</span> geometry_columns <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">TABLE</span> <span style="color: #66cc66;">|</span> postgres
 public <span style="color: #66cc66;">|</span> roads            <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">TABLE</span> <span style="color: #66cc66;">|</span> postgres
 public <span style="color: #66cc66;">|</span> spatial_ref_sys  <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">TABLE</span> <span style="color: #66cc66;">|</span> postgres
<span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">3</span> <span style="color: #993333; font-weight: bold;">ROWS</span><span style="color: #66cc66;">&#41;</span></pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;">cybersoftbj<span style="color: #66cc66;">=</span># \d roads
<span style="color: #993333; font-weight: bold;">TABLE</span> <span style="color: #ff0000;">"public.roads"</span>
<span style="color: #993333; font-weight: bold;">COLUMN</span>   <span style="color: #66cc66;">|</span>          <span style="color: #993333; font-weight: bold;">TYPE</span>          <span style="color: #66cc66;">|</span>                      Modifiers
<span style="color: #808080; font-style: italic;">------------+------------------------+-----------------------------------------------------</span>
gid        <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">INTEGER</span>                <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">NOT</span> <span style="color: #993333; font-weight: bold;">NULL</span> <span style="color: #993333; font-weight: bold;">DEFAULT</span> <span style="color: #993333; font-weight: bold;">NEXTVAL</span><span style="color: #66cc66;">&#40;</span><span style="color: #ff0000;">'roads_gid_seq'</span>::regclass<span style="color: #66cc66;">&#41;</span>
rd_id      <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">BIGINT</span>
yutu_id    <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">INTEGER</span>
block_id   <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">BIGINT</span>
heirarchy  <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">CHARACTER</span> <span style="color: #993333; font-weight: bold;">VARYING</span><span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">5</span><span style="color: #66cc66;">&#41;</span>
cn_name    <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">CHARACTER</span> <span style="color: #993333; font-weight: bold;">VARYING</span><span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">75</span><span style="color: #66cc66;">&#41;</span>
py_name    <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">CHARACTER</span> <span style="color: #993333; font-weight: bold;">VARYING</span><span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">100</span><span style="color: #66cc66;">&#41;</span>
<span style="color: #993333; font-weight: bold;">SOURCE</span>     <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">BIGINT</span>
target     <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">BIGINT</span>
x1         <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">NUMERIC</span>
y1         <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">NUMERIC</span>
x2         <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">NUMERIC</span>
y2         <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">NUMERIC</span>
costlength <span style="color: #66cc66;">|</span> <span style="color: #993333; font-weight: bold;">NUMERIC</span>
the_geom   <span style="color: #66cc66;">|</span> geometry</pre>
      </td>
    </tr>
  </table>
</div>

A. Extracting the coordinates of the line segments from Mapinfo.

1. I have to format the data structure as follows&#8230;

&#8230;here is the roads table after weeding out some unnecessary columns&#8230;  
![][3]

&#8230; adding the source,target,x1,y1,x2,y2,costlength&#8230;  
![][4]

2. Using ObjectGeography. [Download the MapBasic Reference][5]

ObjectGeography( object, attribute )

ObjectGeography( object, &#8220;1&#8221; ) <&#8211; gives you the beginning x coord of the point

![][6]

3. Export the tab file to a shape file for ArchMap.

![][7]

 [1]: /wordpress/?p=45
 [2]: http://www.postlbs.org/postlbs-cms/files/downloads/pgRouting-sampleapp.tar.bz
 [3]: /wordpress/images/routing_mapinfo_1.png
 [4]: /wordpress/images/routing_mapinfo_2.png
 [5]: http://reference.mapinfo.com/software/mapbasic/english/8.5/MB_Ref.pdf
 [6]: /wordpress/images/routing_mapinfo_3.png
 [7]: /wordpress/images/routing_mapinfo_4.png