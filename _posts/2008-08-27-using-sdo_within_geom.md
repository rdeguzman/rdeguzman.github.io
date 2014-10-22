---
title: Using SDO_WITHIN_GEOM
author: rupert
layout: post
permalink: /2008/08/using-sdo_within_geom/
aktt_tweeted:
  - 1
categories:
  - oracle
tags:
  - oracle
---
Experiment 1: Two POIs

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">SELECT</span> 
  p1<span style="color: #66cc66;">.</span>poi_id<span style="color: #66cc66;">,</span> 
  p1<span style="color: #66cc66;">.</span>en_name<span style="color: #66cc66;">,</span> 
  p1<span style="color: #66cc66;">.</span>py_fullpoiadd<span style="color: #66cc66;">,</span> 
  p1<span style="color: #66cc66;">.</span>py_rdname<span style="color: #66cc66;">,</span> 
  p2<span style="color: #66cc66;">.</span>poi_id<span style="color: #66cc66;">,</span> 
  p2<span style="color: #66cc66;">.</span>en_name<span style="color: #66cc66;">,</span> 
  p2<span style="color: #66cc66;">.</span>py_fullpoiadd<span style="color: #66cc66;">,</span> 
  p2<span style="color: #66cc66;">.</span>py_rdname<span style="color: #66cc66;">,</span>
  SDO_GEOM<span style="color: #66cc66;">.</span>SDO_DISTANCE<span style="color: #66cc66;">&#40;</span>p1<span style="color: #66cc66;">.</span>geom<span style="color: #66cc66;">,</span> p2<span style="color: #66cc66;">.</span>geom<span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">0.5</span><span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">AS</span> dist
<span style="color: #993333; font-weight: bold;">FROM</span> poi_test p1<span style="color: #66cc66;">,</span> poi_test p2
<span style="color: #993333; font-weight: bold;">WHERE</span> 
	<span style="color: #993333; font-weight: bold;">UPPER</span><span style="color: #66cc66;">&#40;</span>p1<span style="color: #66cc66;">.</span>en_name<span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">LIKE</span> <span style="color: #ff0000;">'%PARKSON%'</span>
<span style="color: #993333; font-weight: bold;">AND</span>	<span style="color: #993333; font-weight: bold;">UPPER</span><span style="color: #66cc66;">&#40;</span>p2<span style="color: #66cc66;">.</span>en_name<span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">LIKE</span> <span style="color: #ff0000;">'%KFC%'</span>
<span style="color: #993333; font-weight: bold;">AND</span> SDO_WITHIN_DISTANCE<span style="color: #66cc66;">&#40;</span>p1<span style="color: #66cc66;">.</span>geom<span style="color: #66cc66;">,</span> p2<span style="color: #66cc66;">.</span>geom<span style="color: #66cc66;">,</span> <span style="color: #ff0000;">'DISTANCE=500 UNIT=METER'</span> <span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">=</span><span style="color: #ff0000;">'TRUE'</span>
<span style="color: #993333; font-weight: bold;">ORDER</span> <span style="color: #993333; font-weight: bold;">BY</span> dist</pre>
      </td>
    </tr>
  </table>
</div>

Experiment 2: Road + Two POIs

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">SELECT</span>
  p1<span style="color: #66cc66;">.</span>poi_id<span style="color: #66cc66;">,</span> 
  p1<span style="color: #66cc66;">.</span>en_name<span style="color: #66cc66;">,</span> 
  p1<span style="color: #66cc66;">.</span>py_fullpoiadd<span style="color: #66cc66;">,</span> 
  p1<span style="color: #66cc66;">.</span>py_rdname<span style="color: #66cc66;">,</span> 
  p2<span style="color: #66cc66;">.</span>poi_id<span style="color: #66cc66;">,</span> 
  p2<span style="color: #66cc66;">.</span>en_name<span style="color: #66cc66;">,</span> 
  p2<span style="color: #66cc66;">.</span>py_fullpoiadd<span style="color: #66cc66;">,</span> 
  p2<span style="color: #66cc66;">.</span>py_rdname<span style="color: #66cc66;">,</span>
  SDO_GEOM<span style="color: #66cc66;">.</span>SDO_DISTANCE<span style="color: #66cc66;">&#40;</span>p1<span style="color: #66cc66;">.</span>geom<span style="color: #66cc66;">,</span> p2<span style="color: #66cc66;">.</span>geom<span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">0.5</span><span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">AS</span> dist
<span style="color: #993333; font-weight: bold;">FROM</span> poi_app p1<span style="color: #66cc66;">,</span> poi_app p2<span style="color: #66cc66;">,</span> geo_entities g
<span style="color: #993333; font-weight: bold;">WHERE</span> 
	<span style="color: #993333; font-weight: bold;">UPPER</span><span style="color: #66cc66;">&#40;</span>p1<span style="color: #66cc66;">.</span>en_name<span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">LIKE</span> <span style="color: #ff0000;">'%BAR BLU%'</span>
<span style="color: #993333; font-weight: bold;">AND</span>	<span style="color: #993333; font-weight: bold;">UPPER</span><span style="color: #66cc66;">&#40;</span>p2<span style="color: #66cc66;">.</span>en_name<span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">LIKE</span> <span style="color: #ff0000;">'%KOKOMO%'</span>
<span style="color: #993333; font-weight: bold;">AND</span>     <span style="color: #993333; font-weight: bold;">UPPER</span><span style="color: #66cc66;">&#40;</span>g<span style="color: #66cc66;">.</span>meta_name<span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">LIKE</span> <span style="color: #ff0000;">'%SANLITUN%'</span>
<span style="color: #993333; font-weight: bold;">AND</span> SDO_WITHIN_DISTANCE<span style="color: #66cc66;">&#40;</span>p1<span style="color: #66cc66;">.</span>geom<span style="color: #66cc66;">,</span> p2<span style="color: #66cc66;">.</span>geom<span style="color: #66cc66;">,</span> <span style="color: #ff0000;">'DISTANCE=500 UNIT=METER'</span> <span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">=</span><span style="color: #ff0000;">'TRUE'</span>
<span style="color: #993333; font-weight: bold;">AND</span> SDO_WITHIN_DISTANCE<span style="color: #66cc66;">&#40;</span>p1<span style="color: #66cc66;">.</span>geom<span style="color: #66cc66;">,</span> g<span style="color: #66cc66;">.</span>the_geom<span style="color: #66cc66;">,</span> <span style="color: #ff0000;">'DISTANCE=500 UNIT=METER'</span> <span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">=</span><span style="color: #ff0000;">'TRUE'</span>
<span style="color: #993333; font-weight: bold;">AND</span> SDO_WITHIN_DISTANCE<span style="color: #66cc66;">&#40;</span>p2<span style="color: #66cc66;">.</span>geom<span style="color: #66cc66;">,</span> g<span style="color: #66cc66;">.</span>the_geom<span style="color: #66cc66;">,</span> <span style="color: #ff0000;">'DISTANCE=500 UNIT=METER'</span> <span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">=</span><span style="color: #ff0000;">'TRUE'</span></pre>
      </td>
    </tr>
  </table>
</div>

Notes:  
1. Significant improvement when Sorting is removed.  
2. SDO\_WITHIN\_DISTANCE vs NN? The first finds the nearest geometry within a given distance while NN finds the nearest geometry regardless of the distance. NN could be costly when unused properly.