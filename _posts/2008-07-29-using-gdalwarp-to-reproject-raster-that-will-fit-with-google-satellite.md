---
title: Using GDALWARP to reproject raster that will fit with Google Satellite
author: rupert
layout: post
permalink: /2008/07/using-gdalwarp-to-reproject-raster-that-will-fit-with-google-satellite/
aktt_tweeted:
  - 1
categories:
  - GDAL/OGR
tags:
  - google
  - maserver
  - openlayers
  - tilecache
---
Just a couple of notes to onself using gdal: Use *gdalwarp* to reproject your GeoTIFF files! I wanted to use my own satellite images acquired from GeoEye, however, on some areas I wanted to use google sat images as well since I don&#8217;t have the coverage. In order to do so, I need to reproject the sat images to 900913. Note you need to specify this in your epsg file in my previous post.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">rupert:beijing_900913_satellite rupert$ gdalinfo Mosaic_RGB.tif
Driver: GTiff<span style="color: #000000; font-weight: bold;">/</span>GeoTIFF
Files: Mosaic_RGB.tif
Size is <span style="color: #000000;">4248</span>, <span style="color: #000000;">4553</span>
Coordinate System is:
GEOGCS<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #ff0000;">"WGS 84"</span>,
    DATUM<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #ff0000;">"WGS_1984"</span>,
        SPHEROID<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #ff0000;">"WGS 84"</span>,<span style="color: #000000;">6378137</span>,<span style="color: #000000;">298.2572235630016</span>,
            AUTHORITY<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #ff0000;">"EPSG"</span>,<span style="color: #ff0000;">"7030"</span><span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #7a0874; font-weight: bold;">&#93;</span>,
        AUTHORITY<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #ff0000;">"EPSG"</span>,<span style="color: #ff0000;">"6326"</span><span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #7a0874; font-weight: bold;">&#93;</span>,
    PRIMEM<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #ff0000;">"Greenwich"</span>,<span style="color: #000000;"></span><span style="color: #7a0874; font-weight: bold;">&#93;</span>,
    UNIT<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #ff0000;">"degree"</span>,<span style="color: #000000;">0.0174532925199433</span><span style="color: #7a0874; font-weight: bold;">&#93;</span>,
    AUTHORITY<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #ff0000;">"EPSG"</span>,<span style="color: #ff0000;">"4326"</span><span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #7a0874; font-weight: bold;">&#93;</span>
Origin = <span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000;">116.291476140000000</span>,<span style="color: #000000;">40.025198500000002</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>
Pixel Size = <span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000;">0.000046860000000</span>,-<span style="color: #000000;">0.000035970000000</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>
Metadata:
  <span style="color: #007800;">AREA_OR_POINT</span>=Area
  <span style="color: #007800;">TIFFTAG_XRESOLUTION</span>=<span style="color: #000000;">100</span>
  <span style="color: #007800;">TIFFTAG_YRESOLUTION</span>=<span style="color: #000000;">100</span>
Image Structure Metadata:
  <span style="color: #007800;">INTERLEAVE</span>=BAND
Corner Coordinates:
Upper Left  <span style="color: #7a0874; font-weight: bold;">&#40;</span> <span style="color: #000000;">116.2914761</span>,  <span style="color: #000000;">40.0251985</span><span style="color: #7a0874; font-weight: bold;">&#41;</span> <span style="color: #7a0874; font-weight: bold;">&#40;</span>116d17<span style="color: #ff0000;">'29.31"E, 40d 1'</span><span style="color: #000000;">30.71</span><span style="color: #ff0000;">"N)
Lower Left  ( 116.2914761,  39.8614271) (116d17'29.31"</span>E, 39d51<span style="color: #ff0000;">'41.14"N)
Upper Right ( 116.4905374,  40.0251985) (116d29'</span><span style="color: #000000;">25.93</span><span style="color: #ff0000;">"E, 40d 1'30.71"</span>N<span style="color: #7a0874; font-weight: bold;">&#41;</span>
Lower Right <span style="color: #7a0874; font-weight: bold;">&#40;</span> <span style="color: #000000;">116.4905374</span>,  <span style="color: #000000;">39.8614271</span><span style="color: #7a0874; font-weight: bold;">&#41;</span> <span style="color: #7a0874; font-weight: bold;">&#40;</span>116d29<span style="color: #ff0000;">'25.93"E, 39d51'</span><span style="color: #000000;">41.14</span><span style="color: #ff0000;">"N)
Center      ( 116.3910068,  39.9433128) (116d23'27.62"</span>E, 39d56<span style="color: #ff0000;">'35.93"N)
Band 1 Block=4248x1 Type=Byte, ColorInterp=Red
Band 2 Block=4248x1 Type=Byte, ColorInterp=Green
Band 3 Block=4248x1 Type=Byte, ColorInterp=Blue</span></pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">rupert:beijing_900913_satellite rupert$ gdalwarp -s_srs epsg:<span style="color: #000000;">4326</span> -t_srs epsg:<span style="color: #000000;">900913</span> Mosaic_RGB.tif sat_4m_rgb.tif
Creating output <span style="color: #c20cb9; font-weight: bold;">file</span> that is 4245P x 4556L.
Processing input <span style="color: #c20cb9; font-weight: bold;">file</span> Mosaic_RGB.tif.
<span style="color: #000000;"></span>...<span style="color: #000000;">10</span>...<span style="color: #000000;">20</span>...<span style="color: #000000;">30</span>...<span style="color: #000000;">40</span>...<span style="color: #000000;">50</span>...<span style="color: #000000;">60</span>...<span style="color: #000000;">70</span>...<span style="color: #000000;">80</span>...<span style="color: #000000;">90</span>...<span style="color: #000000;">100</span> - done.</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">rupert:beijing_900913_satellite rupert$ gdalinfo sat_4m_rgb.tif
Driver: GTiff<span style="color: #000000; font-weight: bold;">/</span>GeoTIFF
Files: sat_4m_rgb.tif
Size is <span style="color: #000000;">4245</span>, <span style="color: #000000;">4556</span>
Coordinate System is:
PROJCS<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #ff0000;">"Google Maps Global Mercator"</span>,
    GEOGCS<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #ff0000;">"WGS 84"</span>,
        DATUM<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #ff0000;">"WGS_1984"</span>,
            SPHEROID<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #ff0000;">"WGS 84"</span>,<span style="color: #000000;">6378137</span>,<span style="color: #000000;">298.2572235630016</span>,
                AUTHORITY<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #ff0000;">"EPSG"</span>,<span style="color: #ff0000;">"7030"</span><span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #7a0874; font-weight: bold;">&#93;</span>,
            AUTHORITY<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #ff0000;">"EPSG"</span>,<span style="color: #ff0000;">"6326"</span><span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #7a0874; font-weight: bold;">&#93;</span>,
        PRIMEM<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #ff0000;">"Greenwich"</span>,<span style="color: #000000;"></span><span style="color: #7a0874; font-weight: bold;">&#93;</span>,
        UNIT<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #ff0000;">"degree"</span>,<span style="color: #000000;">0.0174532925199433</span><span style="color: #7a0874; font-weight: bold;">&#93;</span>,
        AUTHORITY<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #ff0000;">"EPSG"</span>,<span style="color: #ff0000;">"4326"</span><span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #7a0874; font-weight: bold;">&#93;</span>,
    PROJECTION<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #ff0000;">"Mercator_1SP"</span><span style="color: #7a0874; font-weight: bold;">&#93;</span>,
    PARAMETER<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #ff0000;">"central_meridian"</span>,<span style="color: #000000;"></span><span style="color: #7a0874; font-weight: bold;">&#93;</span>,
    PARAMETER<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #ff0000;">"scale_factor"</span>,<span style="color: #000000;">1</span><span style="color: #7a0874; font-weight: bold;">&#93;</span>,
    PARAMETER<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #ff0000;">"false_easting"</span>,<span style="color: #000000;"></span><span style="color: #7a0874; font-weight: bold;">&#93;</span>,
    PARAMETER<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #ff0000;">"false_northing"</span>,<span style="color: #000000;"></span><span style="color: #7a0874; font-weight: bold;">&#93;</span>,
    UNIT<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #ff0000;">"metre"</span>,<span style="color: #000000;">1</span>,
        AUTHORITY<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #ff0000;">"EPSG"</span>,<span style="color: #ff0000;">"9001"</span><span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #7a0874; font-weight: bold;">&#93;</span>
Origin = <span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000;">12945507.907502911984921</span>,<span style="color: #000000;">4869604.732793668285012</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>
Pixel Size = <span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000;">5.219801430503303</span>,-<span style="color: #000000;">5.219801430503303</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>
Metadata:
  <span style="color: #007800;">AREA_OR_POINT</span>=Area
Image Structure Metadata:
  <span style="color: #007800;">INTERLEAVE</span>=PIXEL
Corner Coordinates:
Upper Left  <span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000;">12945507.908</span>, <span style="color: #000000;">4869604.733</span><span style="color: #7a0874; font-weight: bold;">&#41;</span> <span style="color: #7a0874; font-weight: bold;">&#40;</span>116d17<span style="color: #ff0000;">'29.31"E, 40d12'</span><span style="color: #000000;">53.10</span><span style="color: #ff0000;">"N)
Lower Left  (12945507.908, 4845823.317) (116d17'29.31"</span>E, 40d <span style="color: #000000;">3</span><span style="color: #ff0000;">'2.78"N)
Upper Right (12967665.965, 4869604.733) (116d29'</span><span style="color: #000000;">25.89</span><span style="color: #ff0000;">"E, 40d12'53.10"</span>N<span style="color: #7a0874; font-weight: bold;">&#41;</span>
Lower Right <span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000;">12967665.965</span>, <span style="color: #000000;">4845823.317</span><span style="color: #7a0874; font-weight: bold;">&#41;</span> <span style="color: #7a0874; font-weight: bold;">&#40;</span>116d29<span style="color: #ff0000;">'25.89"E, 40d 3'</span><span style="color: #000000;">2.78</span><span style="color: #ff0000;">"N)
Center      (12956586.936, 4857714.025) (116d23'27.60"</span>E, 40d <span style="color: #000000;">7</span><span style="color: #ff0000;">'58.12"N)
Band 1 Block=4245x1 Type=Byte, ColorInterp=Red
Band 2 Block=4245x1 Type=Byte, ColorInterp=Green
Band 3 Block=4245x1 Type=Byte, ColorInterp=Blue</span></pre>
      </td>
    </tr>
  </table>
</div>