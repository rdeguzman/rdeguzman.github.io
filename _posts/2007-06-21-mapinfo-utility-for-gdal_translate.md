---
title: Mapinfo Utility for gdal_translate.
author: rupert
layout: post
permalink: /2007/06/mapinfo-utility-for-gdal_translate/
aktt_tweeted:
  - 1
categories:
  - GDAL/OGR
tags:
  - gdal
  - GDAL/OGR
  - mapinfo
  - perl
  - raster
---
I made a small perl utility to automate the gcp&#8217;s from Mapinfo Raster TABS to gdal_translate command line. Currently your tabfile would have:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="text" style="font-family:monospace;">!table
!version 300
!charset WindowsLatin1
&nbsp;
Definition Table
  File "beijing_6th_1.jpg"
  Type "RASTER"
  (116.522865,40.016316) (347,184) Label "Pt 1",
  (116.681215,40.015286) (7729,243) Label "Pt 2",
  (116.679777,39.777904) (7666,14674) Label "Pt 3",
  (116.523827,39.779108) (397,14606) Label "Pt 4"
  CoordSys Earth Projection 1, 104
  Units "degree"
  RasterStyle 4 1
  RasterStyle 7 1677695</pre>
      </td>
    </tr>
  </table>
</div>

How to use  
[gdal_mapinfo][1]

1. ls *.TAB > init.sh

2. vi init.sh to reflect the ff:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="text" style="font-family:monospace;">perl gdal_mapinfo.pl Beijing_6th_1.TAB &gt;&gt; final.bat
perl gdal_mapinfo.pl Beijing_6th_10.TAB &gt;&gt; final.bat
perl gdal_mapinfo.pl Beijing_6th_11.TAB &gt;&gt; final.bat
perl gdal_mapinfo.pl Beijing_6th_12.TAB &gt;&gt; final.bat
perl gdal_mapinfo.pl Beijing_6th_13.TAB &gt;&gt; final.bat
perl gdal_mapinfo.pl Beijing_6th_2.TAB &gt;&gt; final.bat
perl gdal_mapinfo.pl Beijing_6th_3.TAB &gt;&gt; final.bat
perl gdal_mapinfo.pl Beijing_6th_4.TAB &gt;&gt; final.bat
perl gdal_mapinfo.pl Beijing_6th_5.TAB &gt;&gt; final.bat
perl gdal_mapinfo.pl Beijing_6th_6.TAB &gt;&gt; final.bat
perl gdal_mapinfo.pl Beijing_6th_7.TAB &gt;&gt; final.bat
perl gdal_mapinfo.pl Beijing_6th_8.TAB &gt;&gt; final.bat
perl gdal_mapinfo.pl Beijing_6th_9.TAB &gt;&gt; final.bat</pre>
      </td>
    </tr>
  </table>
</div>

3. The resulting final.bat should have the ff:  
gdal\_translate -gcp 347 184 116.522865 40.016316 -gcp 7729 243 116.681215 40.015286 -gcp 7666 14674 116.679777 39.777904 -gcp 397 14606 116.523827 39.779108 -of GTiff Beijing\_6th\_1.jpg I:\\satimages\translated\Beijing\_6th\_1\_translated.tif

gdalwarp -s\_srs epsg:4326 -t\_srs epsg:4326 I:\\satimages\translated\Beijing\_6th\_1_translated.tif  
I:\\satimages\warped\Beijing\_6th\_1.tif </pre>

 [1]: /images/2008/08/gdal_mapinfo.pl