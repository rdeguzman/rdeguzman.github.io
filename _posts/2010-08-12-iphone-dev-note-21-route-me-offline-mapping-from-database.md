---
title: 'iPhone Dev Note #21: Route-Me Offline Mapping from Database'
author: rupert
layout: post
permalink: /2010/08/iphone-dev-note-21-route-me-offline-mapping-from-database/
categories:
  - iphone
  - sqlite3
tags:
  - iphone
  - route-me
  - sqlite
---
**Part I: Download the osm ([openstreetmap][1]) tiles**  
1. Download the tiles from osm using [downloadosmtiles.pl][2]  
&#8211; Download [Geo-OSM-Tiles-0.02.tar.gz from CPAN][3]  
&#8211; See README file. Compile and build

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="shell" style="font-family:monospace;">   perl Makefile.PL
   make
   make test
   make install</pre>
      </td>
    </tr>
  </table>
</div>

&#8211; Copy downloadosmtiles.pl to /usr/bin  
&#8211; Usage:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">downloadosmtiles.pl <span style="color: #660033;">--lat</span>=min_lat:max_lat <span style="color: #660033;">--lon</span>=min_long:max_long <span style="color: #660033;">--zoom</span>=min_zoom:max_zoom</pre>
      </td>
    </tr>
  </table>
</div>

How do you set the min\_lat, max\_lat and min\_long, max\_long?  
&#8211; Go to <www.openstreetmap.org>  
&#8211; Click on the &#8220;Edit&#8221; tab  
&#8211; You will see the extent or bounds of the map under the section &#8220;Area to Export&#8221;  
&#8211; Alternatively, you can click on &#8220;Manually select a different area&#8221; to specifically choose an area.

<img src="/images/2010/08/osm.png" alt="osm.png" border="0" width="670" height="209" />

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">downloadosmtiles.pl <span style="color: #660033;">--lat</span>=<span style="color: #000000;">6.9443</span>:<span style="color: #000000;">7.2261</span> <span style="color: #660033;">--lon</span>=<span style="color: #000000;">125.5082</span>:<span style="color: #000000;">125.7104</span> <span style="color: #660033;">--zoom</span>=<span style="color: #000000;">6</span>:<span style="color: #000000;">12</span></pre>
      </td>
    </tr>
  </table>
</div>

The tiles will be downloaded to the current directory.  
<img src="/images/2010/08/dir.png" alt="dir.png" border="0" width="153" height="206" />

**Part II:Put the tiles in the sqlite database**  
1. Read [Frank&#8217;s email to route-me group regarding map2sqlite][4]

2. Download [map2sqlite-1.0.tar.bz2][5]. 

3. Build the map2sqlite XCodeProj. Afterwards, find map2sqlite and drop it in /usr/bin.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #c20cb9; font-weight: bold;">cp</span> map2sqlite <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>bin</pre>
      </td>
    </tr>
  </table>
</div>

4. Run map2sqlite to import the tiles in sqlite.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">map2sqlite <span style="color: #660033;">-db</span> ph-1.0.0.db <span style="color: #660033;">-mapdir</span> ph-osm-map<span style="color: #000000; font-weight: bold;">/</span>
&nbsp;
<span style="color: #000000;">2010</span>-08-<span style="color: #000000;">12</span> <span style="color: #000000;">17</span>:<span style="color: #000000;">24</span>:<span style="color: #000000;">40.749</span> map2sqlite<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #000000;">14113</span>:<span style="color: #000000;">903</span><span style="color: #7a0874; font-weight: bold;">&#93;</span> map2sqlite <span style="color: #000000;">1.0</span>
<span style="color: #000000;">2010</span>-08-<span style="color: #000000;">12</span> <span style="color: #000000;">17</span>:<span style="color: #000000;">24</span>:<span style="color: #000000;">40.756</span> map2sqlite<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #000000;">14113</span>:<span style="color: #000000;">903</span><span style="color: #7a0874; font-weight: bold;">&#93;</span> Creating ph-1.0.0.db
<span style="color: #000000;">2010</span>-08-<span style="color: #000000;">12</span> <span style="color: #000000;">17</span>:<span style="color: #000000;">24</span>:<span style="color: #000000;">40.761</span> map2sqlite<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #000000;">14113</span>:<span style="color: #000000;">903</span><span style="color: #7a0874; font-weight: bold;">&#93;</span> Importing map tiles at ph-osm-map<span style="color: #000000; font-weight: bold;">/</span>
<span style="color: #000000;">2010</span>-08-<span style="color: #000000;">12</span> <span style="color: #000000;">17</span>:<span style="color: #000000;">25</span>:<span style="color: #000000;">03.169</span> map2sqlite<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #000000;">14113</span>:<span style="color: #000000;">903</span><span style="color: #7a0874; font-weight: bold;">&#93;</span> 
<span style="color: #000000;">2010</span>-08-<span style="color: #000000;">12</span> <span style="color: #000000;">17</span>:<span style="color: #000000;">25</span>:<span style="color: #000000;">03.170</span> map2sqlite<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #000000;">14113</span>:<span style="color: #000000;">903</span><span style="color: #7a0874; font-weight: bold;">&#93;</span> Map statistics
<span style="color: #000000;">2010</span>-08-<span style="color: #000000;">12</span> <span style="color: #000000;">17</span>:<span style="color: #000000;">25</span>:<span style="color: #000000;">03.170</span> map2sqlite<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #000000;">14113</span>:<span style="color: #000000;">903</span><span style="color: #7a0874; font-weight: bold;">&#93;</span> <span style="color: #660033;">--------------</span>
<span style="color: #000000;">2010</span>-08-<span style="color: #000000;">12</span> <span style="color: #000000;">17</span>:<span style="color: #000000;">25</span>:<span style="color: #000000;">03.171</span> map2sqlite<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #000000;">14113</span>:<span style="color: #000000;">903</span><span style="color: #7a0874; font-weight: bold;">&#93;</span> map db:            ph-1.0.0.db
<span style="color: #000000;">2010</span>-08-<span style="color: #000000;">12</span> <span style="color: #000000;">17</span>:<span style="color: #000000;">25</span>:<span style="color: #000000;">03.171</span> map2sqlite<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #000000;">14113</span>:<span style="color: #000000;">903</span><span style="color: #7a0874; font-weight: bold;">&#93;</span> <span style="color: #c20cb9; font-weight: bold;">file</span> size:         <span style="color: #000000;">13758464</span> bytes
<span style="color: #000000;">2010</span>-08-<span style="color: #000000;">12</span> <span style="color: #000000;">17</span>:<span style="color: #000000;">25</span>:<span style="color: #000000;">03.172</span> map2sqlite<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #000000;">14113</span>:<span style="color: #000000;">903</span><span style="color: #7a0874; font-weight: bold;">&#93;</span> tile directory:    ph-osm-map<span style="color: #000000; font-weight: bold;">/</span>
<span style="color: #000000;">2010</span>-08-<span style="color: #000000;">12</span> <span style="color: #000000;">17</span>:<span style="color: #000000;">25</span>:<span style="color: #000000;">03.172</span> map2sqlite<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #000000;">14113</span>:<span style="color: #000000;">903</span><span style="color: #7a0874; font-weight: bold;">&#93;</span> number of tiles:   <span style="color: #000000;">9091</span>
<span style="color: #000000;">2010</span>-08-<span style="color: #000000;">12</span> <span style="color: #000000;">17</span>:<span style="color: #000000;">25</span>:<span style="color: #000000;">03.173</span> map2sqlite<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #000000;">14113</span>:<span style="color: #000000;">903</span><span style="color: #7a0874; font-weight: bold;">&#93;</span> zoom levels:       <span style="color: #000000;">6</span> - <span style="color: #000000;">11</span>
<span style="color: #000000;">2010</span>-08-<span style="color: #000000;">12</span> <span style="color: #000000;">17</span>:<span style="color: #000000;">25</span>:<span style="color: #000000;">03.218</span> map2sqlite<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #000000;">14113</span>:<span style="color: #000000;">903</span><span style="color: #7a0874; font-weight: bold;">&#93;</span> zoom level  <span style="color: #000000;">6</span>:        <span style="color: #000000;">12</span> tiles, <span style="color: #7a0874; font-weight: bold;">&#40;</span>    <span style="color: #000000;">28</span>,    <span style="color: #000000;">52</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>x<span style="color: #7a0874; font-weight: bold;">&#40;</span>    <span style="color: #000000;">31</span>,    <span style="color: #000000;">54</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>, <span style="color: #7a0874; font-weight: bold;">&#123;</span><span style="color: #007800;">x</span>=<span style="color: #000000;">112.500000</span>,<span style="color: #007800;">y</span>=<span style="color: #000000;">21.943047</span><span style="color: #7a0874; font-weight: bold;">&#125;</span>x<span style="color: #7a0874; font-weight: bold;">&#123;</span><span style="color: #007800;">x</span>=<span style="color: #000000;">129.375000</span>,<span style="color: #007800;">y</span>=<span style="color: #000000;">0.000000</span><span style="color: #7a0874; font-weight: bold;">&#125;</span>
<span style="color: #000000;">2010</span>-08-<span style="color: #000000;">12</span> <span style="color: #000000;">17</span>:<span style="color: #000000;">25</span>:<span style="color: #000000;">03.219</span> map2sqlite<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #000000;">14113</span>:<span style="color: #000000;">903</span><span style="color: #7a0874; font-weight: bold;">&#93;</span> zoom level  <span style="color: #000000;">7</span>:        <span style="color: #000000;">35</span> tiles, <span style="color: #7a0874; font-weight: bold;">&#40;</span>    <span style="color: #000000;">56</span>,   <span style="color: #000000;">105</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>x<span style="color: #7a0874; font-weight: bold;">&#40;</span>    <span style="color: #000000;">62</span>,   <span style="color: #000000;">109</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>, <span style="color: #7a0874; font-weight: bold;">&#123;</span><span style="color: #007800;">x</span>=<span style="color: #000000;">115.312500</span>,<span style="color: #007800;">y</span>=<span style="color: #000000;">21.943047</span><span style="color: #7a0874; font-weight: bold;">&#125;</span>x<span style="color: #7a0874; font-weight: bold;">&#123;</span><span style="color: #007800;">x</span>=<span style="color: #000000;">129.375000</span>,<span style="color: #007800;">y</span>=<span style="color: #000000;">2.811371</span><span style="color: #7a0874; font-weight: bold;">&#125;</span>
<span style="color: #000000;">2010</span>-08-<span style="color: #000000;">12</span> <span style="color: #000000;">17</span>:<span style="color: #000000;">25</span>:<span style="color: #000000;">03.222</span> map2sqlite<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #000000;">14113</span>:<span style="color: #000000;">903</span><span style="color: #7a0874; font-weight: bold;">&#93;</span> zoom level  <span style="color: #000000;">8</span>:       <span style="color: #000000;">117</span> tiles, <span style="color: #7a0874; font-weight: bold;">&#40;</span>   <span style="color: #000000;">112</span>,   <span style="color: #000000;">210</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>x<span style="color: #7a0874; font-weight: bold;">&#40;</span>   <span style="color: #000000;">124</span>,   <span style="color: #000000;">218</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>, <span style="color: #7a0874; font-weight: bold;">&#123;</span><span style="color: #007800;">x</span>=<span style="color: #000000;">115.312500</span>,<span style="color: #007800;">y</span>=<span style="color: #000000;">21.943047</span><span style="color: #7a0874; font-weight: bold;">&#125;</span>x<span style="color: #7a0874; font-weight: bold;">&#123;</span><span style="color: #007800;">x</span>=<span style="color: #000000;">127.968750</span>,<span style="color: #007800;">y</span>=<span style="color: #000000;">4.214943</span><span style="color: #7a0874; font-weight: bold;">&#125;</span>
<span style="color: #000000;">2010</span>-08-<span style="color: #000000;">12</span> <span style="color: #000000;">17</span>:<span style="color: #000000;">25</span>:<span style="color: #000000;">03.223</span> map2sqlite<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #000000;">14113</span>:<span style="color: #000000;">903</span><span style="color: #7a0874; font-weight: bold;">&#93;</span> zoom level  <span style="color: #000000;">9</span>:       <span style="color: #000000;">450</span> tiles, <span style="color: #7a0874; font-weight: bold;">&#40;</span>   <span style="color: #000000;">225</span>,   <span style="color: #000000;">420</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>x<span style="color: #7a0874; font-weight: bold;">&#40;</span>   <span style="color: #000000;">249</span>,   <span style="color: #000000;">437</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>, <span style="color: #7a0874; font-weight: bold;">&#123;</span><span style="color: #007800;">x</span>=<span style="color: #000000;">115.312500</span>,<span style="color: #007800;">y</span>=<span style="color: #000000;">21.289375</span><span style="color: #7a0874; font-weight: bold;">&#125;</span>x<span style="color: #7a0874; font-weight: bold;">&#123;</span><span style="color: #007800;">x</span>=<span style="color: #000000;">127.968750</span>,<span style="color: #007800;">y</span>=<span style="color: #000000;">4.214943</span><span style="color: #7a0874; font-weight: bold;">&#125;</span>
<span style="color: #000000;">2010</span>-08-<span style="color: #000000;">12</span> <span style="color: #000000;">17</span>:<span style="color: #000000;">25</span>:<span style="color: #000000;">03.225</span> map2sqlite<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #000000;">14113</span>:<span style="color: #000000;">903</span><span style="color: #7a0874; font-weight: bold;">&#93;</span> zoom level <span style="color: #000000;">10</span>:      <span style="color: #000000;">1715</span> tiles, <span style="color: #7a0874; font-weight: bold;">&#40;</span>   <span style="color: #000000;">450</span>,   <span style="color: #000000;">841</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>x<span style="color: #7a0874; font-weight: bold;">&#40;</span>   <span style="color: #000000;">498</span>,   <span style="color: #000000;">875</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>, <span style="color: #7a0874; font-weight: bold;">&#123;</span><span style="color: #007800;">x</span>=<span style="color: #000000;">115.664062</span>,<span style="color: #007800;">y</span>=<span style="color: #000000;">21.289375</span><span style="color: #7a0874; font-weight: bold;">&#125;</span>x<span style="color: #7a0874; font-weight: bold;">&#123;</span><span style="color: #007800;">x</span>=<span style="color: #000000;">127.968750</span>,<span style="color: #007800;">y</span>=<span style="color: #000000;">4.565474</span><span style="color: #7a0874; font-weight: bold;">&#125;</span>
<span style="color: #000000;">2010</span>-08-<span style="color: #000000;">12</span> <span style="color: #000000;">17</span>:<span style="color: #000000;">25</span>:<span style="color: #000000;">03.231</span> map2sqlite<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #000000;">14113</span>:<span style="color: #000000;">903</span><span style="color: #7a0874; font-weight: bold;">&#93;</span> zoom level <span style="color: #000000;">11</span>:      <span style="color: #000000;">6762</span> tiles, <span style="color: #7a0874; font-weight: bold;">&#40;</span>   <span style="color: #000000;">900</span>,  <span style="color: #000000;">1683</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>x<span style="color: #7a0874; font-weight: bold;">&#40;</span>   <span style="color: #000000;">997</span>,  <span style="color: #000000;">1751</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>, <span style="color: #7a0874; font-weight: bold;">&#123;</span><span style="color: #007800;">x</span>=<span style="color: #000000;">115.839844</span>,<span style="color: #007800;">y</span>=<span style="color: #000000;">21.289375</span><span style="color: #7a0874; font-weight: bold;">&#125;</span>x<span style="color: #7a0874; font-weight: bold;">&#123;</span><span style="color: #007800;">x</span>=<span style="color: #000000;">127.968750</span>,<span style="color: #007800;">y</span>=<span style="color: #000000;">4.565474</span><span style="color: #7a0874; font-weight: bold;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

5. ph-osm-map is 43.9 MB but was compressed to ph-1.0.0.db (13.8 MB)

**Part III: Downlaod the route-me code from trunk and run some examples.**  
&#8211; Follow this [previous tutorial][6]

**Part IV: Patch the trunk to incorporate the RMDBMapSource from Frank Schroder**

1. What we need to add to the trunk. Download [RMDBMapSource.zip][7]

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">+ RMDBMapSource.h
+ RMDBMapSource.m
+ RMDBTileImage.h
+ RMDBTileImage.m</pre>
      </td>
    </tr>
  </table>
</div>

Copy the files above to the &#8220;Map&#8221; directory.

<img src="/images/2010/08/route-me-1.png" alt="route-me-1.png" border="0" width="338" height="403" />

2. Edit RMTileImage.h and RMTileImage.m base on the patch below.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="c" style="font-family:monospace;">Index<span style="color: #339933;">:</span> MapView<span style="color: #339933;">/</span>Map<span style="color: #339933;">/</span>RMTileImage.<span style="color: #202020;">h</span>
<span style="color: #339933;">===================================================================</span>
<span style="color: #339933;">---</span> MapView<span style="color: #339933;">/</span>Map<span style="color: #339933;">/</span>RMTileImage.<span style="color: #202020;">h</span>	<span style="color: #009900;">&#40;</span>revision <span style="color: #0000dd;">605</span><span style="color: #009900;">&#41;</span>
<span style="color: #339933;">+++</span> MapView<span style="color: #339933;">/</span>Map<span style="color: #339933;">/</span>RMTileImage.<span style="color: #202020;">h</span>	<span style="color: #009900;">&#40;</span>working copy<span style="color: #009900;">&#41;</span>
@@ <span style="color: #339933;">-</span><span style="color: #0000dd;">37</span><span style="color: #339933;">,</span><span style="color: #0000dd;">8</span> <span style="color: #339933;">+</span><span style="color: #0000dd;">37</span><span style="color: #339933;">,</span><span style="color: #0000dd;">10</span> @@
 <span style="color: #339933;">#import "RMNotifications.h"</span>
 <span style="color: #339933;">#import "RMTile.h"</span>
 <span style="color: #339933;">#import "RMTileProxy.h"</span>
<span style="color: #339933;">+</span><span style="color: #339933;">#import "FMDatabase.h"</span>
&nbsp;
 @class RMTileImage<span style="color: #339933;">;</span>
<span style="color: #339933;">+</span>@class NSData<span style="color: #339933;">;</span>
&nbsp;
 @interface RMTileImage <span style="color: #339933;">:</span> NSObject <span style="color: #009900;">&#123;</span>
 	<span style="color: #666666; font-style: italic;">// I know this is a bit nasty.</span>
@@ <span style="color: #339933;">-</span><span style="color: #0000dd;">64</span><span style="color: #339933;">,</span><span style="color: #0000dd;">6</span> <span style="color: #339933;">+</span><span style="color: #0000dd;">66</span><span style="color: #339933;">,</span><span style="color: #0000dd;">7</span> @@
 <span style="color: #339933;">+</span> <span style="color: #009900;">&#40;</span>RMTileImage<span style="color: #339933;">*</span><span style="color: #009900;">&#41;</span>imageForTile<span style="color: #339933;">:</span> <span style="color: #009900;">&#40;</span>RMTile<span style="color: #009900;">&#41;</span> tile withURL<span style="color: #339933;">:</span> <span style="color: #009900;">&#40;</span>NSString<span style="color: #339933;">*</span><span style="color: #009900;">&#41;</span>url<span style="color: #339933;">;</span>
 <span style="color: #339933;">+</span> <span style="color: #009900;">&#40;</span>RMTileImage<span style="color: #339933;">*</span><span style="color: #009900;">&#41;</span>imageForTile<span style="color: #339933;">:</span> <span style="color: #009900;">&#40;</span>RMTile<span style="color: #009900;">&#41;</span> tile fromFile<span style="color: #339933;">:</span> <span style="color: #009900;">&#40;</span>NSString<span style="color: #339933;">*</span><span style="color: #009900;">&#41;</span>filename<span style="color: #339933;">;</span>
 <span style="color: #339933;">+</span> <span style="color: #009900;">&#40;</span>RMTileImage<span style="color: #339933;">*</span><span style="color: #009900;">&#41;</span>imageForTile<span style="color: #339933;">:</span> <span style="color: #009900;">&#40;</span>RMTile<span style="color: #009900;">&#41;</span> tile withData<span style="color: #339933;">:</span> <span style="color: #009900;">&#40;</span>NSData<span style="color: #339933;">*</span><span style="color: #009900;">&#41;</span>data<span style="color: #339933;">;</span>
<span style="color: #339933;">++</span> <span style="color: #009900;">&#40;</span>RMTileImage<span style="color: #339933;">*</span><span style="color: #009900;">&#41;</span>imageForTile<span style="color: #339933;">:</span> <span style="color: #009900;">&#40;</span>RMTile<span style="color: #009900;">&#41;</span> tile fromDB<span style="color: #339933;">:</span> <span style="color: #009900;">&#40;</span>FMDatabase<span style="color: #339933;">*</span><span style="color: #009900;">&#41;</span>db<span style="color: #339933;">;</span>
&nbsp;
 <span style="color: #339933;">-</span> <span style="color: #009900;">&#40;</span><span style="color: #993333;">void</span><span style="color: #009900;">&#41;</span>moveBy<span style="color: #339933;">:</span> <span style="color: #009900;">&#40;</span>CGSize<span style="color: #009900;">&#41;</span> delta<span style="color: #339933;">;</span>
 <span style="color: #339933;">-</span> <span style="color: #009900;">&#40;</span><span style="color: #993333;">void</span><span style="color: #009900;">&#41;</span>zoomByFactor<span style="color: #339933;">:</span> <span style="color: #009900;">&#40;</span><span style="color: #993333;">float</span><span style="color: #009900;">&#41;</span> zoomFactor near<span style="color: #339933;">:</span><span style="color: #009900;">&#40;</span>CGPoint<span style="color: #009900;">&#41;</span> center<span style="color: #339933;">;</span>
Index<span style="color: #339933;">:</span> MapView<span style="color: #339933;">/</span>Map<span style="color: #339933;">/</span>RMTileImage.<span style="color: #202020;">m</span>
<span style="color: #339933;">===================================================================</span>
<span style="color: #339933;">---</span> MapView<span style="color: #339933;">/</span>Map<span style="color: #339933;">/</span>RMTileImage.<span style="color: #202020;">m</span>	<span style="color: #009900;">&#40;</span>revision <span style="color: #0000dd;">605</span><span style="color: #009900;">&#41;</span>
<span style="color: #339933;">+++</span> MapView<span style="color: #339933;">/</span>Map<span style="color: #339933;">/</span>RMTileImage.<span style="color: #202020;">m</span>	<span style="color: #009900;">&#40;</span>working copy<span style="color: #009900;">&#41;</span>
@@ <span style="color: #339933;">-</span><span style="color: #0000dd;">29</span><span style="color: #339933;">,</span><span style="color: #0000dd;">6</span> <span style="color: #339933;">+</span><span style="color: #0000dd;">29</span><span style="color: #339933;">,</span><span style="color: #0000dd;">7</span> @@
 <span style="color: #339933;">#import "RMWebTileImage.h"</span>
 <span style="color: #339933;">#import "RMTileLoader.h"</span>
 <span style="color: #339933;">#import "RMFileTileImage.h"</span>
<span style="color: #339933;">+</span><span style="color: #339933;">#import "RMDBTileImage.h"</span>
 <span style="color: #339933;">#import "RMTileCache.h"</span>
 <span style="color: #339933;">#import "RMPixel.h"</span>
 <span style="color: #339933;">#import &lt;QuartzCore/QuartzCore.h&gt;</span>
@@ <span style="color: #339933;">-</span><span style="color: #0000dd;">108</span><span style="color: #339933;">,</span><span style="color: #0000dd;">6</span> <span style="color: #339933;">+</span><span style="color: #0000dd;">109</span><span style="color: #339933;">,</span><span style="color: #0000dd;">11</span> @@
 	<span style="color: #b1b100;">return</span> <span style="color: #009900;">&#91;</span>image autorelease<span style="color: #009900;">&#93;</span><span style="color: #339933;">;</span>
 <span style="color: #009900;">&#125;</span>
&nbsp;
<span style="color: #339933;">++</span> <span style="color: #009900;">&#40;</span>RMTileImage<span style="color: #339933;">*</span><span style="color: #009900;">&#41;</span>imageForTile<span style="color: #339933;">:</span><span style="color: #009900;">&#40;</span>RMTile<span style="color: #009900;">&#41;</span> _tile fromDB<span style="color: #339933;">:</span> <span style="color: #009900;">&#40;</span>FMDatabase<span style="color: #339933;">*</span><span style="color: #009900;">&#41;</span>db
<span style="color: #339933;">+</span><span style="color: #009900;">&#123;</span>
<span style="color: #339933;">+</span>	<span style="color: #b1b100;">return</span> <span style="color: #009900;">&#91;</span><span style="color: #009900;">&#91;</span><span style="color: #009900;">&#91;</span>RMDBTileImage alloc<span style="color: #009900;">&#93;</span> initWithTile<span style="color: #339933;">:</span> _tile fromDB<span style="color: #339933;">:</span>db<span style="color: #009900;">&#93;</span> autorelease<span style="color: #009900;">&#93;</span><span style="color: #339933;">;</span>
<span style="color: #339933;">+</span><span style="color: #009900;">&#125;</span>
<span style="color: #339933;">+</span>
 <span style="color: #339933;">-</span><span style="color: #009900;">&#40;</span><span style="color: #993333;">void</span><span style="color: #009900;">&#41;</span> cancelLoading
 <span style="color: #009900;">&#123;</span>
 	<span style="color: #009900;">&#91;</span><span style="color: #009900;">&#91;</span>NSNotificationCenter defaultCenter<span style="color: #009900;">&#93;</span> postNotificationName<span style="color: #339933;">:</span>RMMapImageLoadingCancelledNotification</pre>
      </td>
    </tr>
  </table>
</div>

We just need to add these lines on RMTileImage.h:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">+<span style="color: #666666; font-style: italic;">#import "FMDatabase.h"</span>
...
++ <span style="color: #7a0874; font-weight: bold;">&#40;</span>RMTileImage<span style="color: #000000; font-weight: bold;">*</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>imageForTile: <span style="color: #7a0874; font-weight: bold;">&#40;</span>RMTile<span style="color: #7a0874; font-weight: bold;">&#41;</span> tile fromDB: <span style="color: #7a0874; font-weight: bold;">&#40;</span>FMDatabase<span style="color: #000000; font-weight: bold;">*</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>db;</pre>
      </td>
    </tr>
  </table>
</div>

do the same for RMTileImage.m:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">+<span style="color: #666666; font-style: italic;">#import "RMDBTileImage.h"</span>
...
++ <span style="color: #7a0874; font-weight: bold;">&#40;</span>RMTileImage<span style="color: #000000; font-weight: bold;">*</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>imageForTile:<span style="color: #7a0874; font-weight: bold;">&#40;</span>RMTile<span style="color: #7a0874; font-weight: bold;">&#41;</span> _tile fromDB: <span style="color: #7a0874; font-weight: bold;">&#40;</span>FMDatabase<span style="color: #000000; font-weight: bold;">*</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>db
+<span style="color: #7a0874; font-weight: bold;">&#123;</span>
+	<span style="color: #7a0874; font-weight: bold;">return</span> <span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #7a0874; font-weight: bold;">&#91;</span>RMDBTileImage alloc<span style="color: #7a0874; font-weight: bold;">&#93;</span> initWithTile: _tile fromDB:db<span style="color: #7a0874; font-weight: bold;">&#93;</span> autorelease<span style="color: #7a0874; font-weight: bold;">&#93;</span>;
+<span style="color: #7a0874; font-weight: bold;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

UPDATE (OCT 15, 2010): I am attaching my current RMTileImage.h and RMTileImage.m so you guys could double-check the changes I made. [RMTileImage.zip][8]

4. Still with me? Comment NSAssert on 609 on RMMapContents.m  
<img src="/images/2010/08/rmcontents.png" alt="rmcontents.png" border="0" width="838" height="336" />

**Part V: RouteMeSampleMapDBOffline code**  
1. Download [RouteMeSampleMapDBOffline.zip][9]

2. Drop the project in the samples directory.  
<img src="/images/2010/08/sample_proj.png" alt="sample_proj.png" border="0" width="311" height="379" />

3. Build. You should be able to build this since the header path is relative to the route-me trunk.  
<img src="/images/2010/08/build-config.png" alt="build-config.png" border="0" width="480" height="338" />

4. Run from the simulator  
<img src="/images/2010/08/finish.png" alt="finish.png" border="0" width="393" height="733" />

 [1]: www.openstreetmap.org
 [2]: http://search.cpan.org/~rotkraut/Geo-OSM-Tiles-0.02/downloadosmtiles.pl
 [3]: http://search.cpan.org/CPAN/authors/id/R/RO/ROTKRAUT/Geo-OSM-Tiles-0.02.tar.gz
 [4]: http://groups.google.com/group/route-me-map/browse_thread/thread/934459dc136ffd28
 [5]: http://groups.google.com/group/route-me-map/files
 [6]: /wordpress/2009/12/iphone-dev-note-19-route-me-an-opensource-mapkit-for-the-iphone/
 [7]: /images/2010/08/RMDBMapSource.zip "RMDBMapSource.zip"
 [8]: /images/2010/10/RMTileImage.zip "RMTileImage.zip"
 [9]: /images/2010/08/RouteMeSampleMapDBOffline.zip "RouteMeSampleMapDBOffline.zip"