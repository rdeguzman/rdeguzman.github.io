---
title: Processing Mapinfo Raster JPEG Images using GDAL
author: rupert
layout: post
permalink: /2007/06/processing-mapinfo-raster-jpeg-images-using-gdal/
categories:
  - GDAL/OGR
  - mapserver
  - openlayers
tags:
  - gdal
  - mapinfo
  - raster
---
I have a couple of sat images (raw jpegs) from Google that I want to use with Openlayers/Mapserver. The raw jpegs were registered using Mapinfo via GCP (Ground Control Points).

Mapinfo Raster JPEG Images example:

rupert@rupert-winxp /e/home/map/beijing/new/satimages$ ll  
-rw-r&#8211;r&#8211; 1 rupert None 358 Jan 30 03:23 2NE1.TAB  
-rw-r&#8211;r&#8211; 1 rupert None 7.1M Jan 30 02:38 2NE1.jpg  
-rw-r&#8211;r&#8211; 1 rupert None 356 Feb 1 18:56 2NE2a.TAB  
-rw-r&#8211;r&#8211; 1 rupert None 3.8M Feb 1 08:57 2NE2a.jpg

You cannot fully reference 2NE1.TAB as a Mapserver Layer. I tried to use 2NE1.jpg, but the problem its not georeferenced.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="text" style="font-family:monospace;">rupert@rupert-winxp /e/home/map/beijing/new/satimages
$ gdalinfo 2NE1.jpg
Driver: JPEG/JPEG JFIF
Size is 8650, 6744
Coordinate System is `'
Corner Coordinates:
Upper Left  (    0.0,    0.0)
Lower Left  (    0.0, 6744.0)
Upper Right ( 8650.0,    0.0)
Lower Right ( 8650.0, 6744.0)
Center      ( 4325.0, 3372.0)
Band 1 Block=8650x1 Type=Byte, ColorInterp=Red
Band 2 Block=8650x1 Type=Byte, ColorInterp=Green
Band 3 Block=8650x1 Type=Byte, ColorInterp=Blue</pre>
      </td>
    </tr>
  </table>
</div>

The georeference coordinates of 2NE1.jpg, just like an ESRI World File, is found in 2NE1.TAB&#8230;

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="text" style="font-family:monospace;">rupert@rupert-winxp /e/home/map/beijing/new/satimages
$ cat 2NE1.TAB
!table
!version 300
!charset WindowsLatin1
&nbsp;
Definition Table
  File "2ne1.jpg"
  Type "RASTER"
  (116.38575,39.906105) (349,6619) Label "Pt 1",
  (116.390072,39.93201) (1160,317) Label "Pt 2",
  (116.42786,39.932296) (8210,253) Label "Pt 3",
  (116.4295878,39.90722318) (8522,6358) Label "Pt 4"
  CoordSys Earth Projection 1, 0
  Units "degree"</pre>
      </td>
    </tr>
  </table>
</div>

I found hurting myself in trying to create an ESRI world file from the current MAPINFO Raster TABS. So, I decided to go for GeoTIFF since its native in Mapserver. Using GDAL utilities my only problem is how to put a coordinate system and reference to the raster.

On windows, you could use [Frank&#8217;s FWTools.][1] For Linux, compile GDAL by source with python would be extremely helpful later on. For installation of GDAL on Linux, we can use [Mapserver&#8217;s Verbose Installation in Linux Guide.][2]

**[GDAL][3] &#8211; the saviour!**.

[GDAL utilities][4] is extremely helpful in reprojection, scaling, image mosaics, etc. For now, we will use [gdal_translate][5] and [gdal_warp][6]. Please RTFM the utilities.

1. Using gdal_translate to specify the gcp&#8217;s registered in Mapinfo.

> **gdal_translate -gcp pixel line easting northing**  
> Add the indicated ground control point to the output dataset. This option may be provided multiple times to provide a set of GCPs.

`<br />
<strong><br />
$ gdal_translate -gcp 349 6619 116.38575 39.906105 -gcp 1160 317 116.390072 39.93201 -gcp 8210 253 116.42786 39.932296 -gcp 8522 6358 116.4295878 39.90722318 -of GTiff 2NE1.jpg 2NE1translated.tif<br />
</strong><br />
Input file size is 8650, 6744<br />
0...10...20...30...40...50...60...70...80...90...100 - done.<br />
`

Note: even if we specify the gcp&#8217;s, gdal_translate would not specify the corner coordinates of the tiff.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="text" style="font-family:monospace;">rupert@rupert-winxp /e/home/map/beijing/new/satimages
$ gdalinfo 2NE1translated.tif
Driver: GTiff/GeoTIFF
Size is 8650, 6744
Coordinate System is `'
GCP Projection =
GCP[  0]: Id=1, Info=
          (349,6619) -&gt; (116.38575,39.906105,0)
GCP[  1]: Id=2, Info=
          (1160,317) -&gt; (116.390072,39.93201,0)
GCP[  2]: Id=3, Info=
          (8210,253) -&gt; (116.42786,39.932296,0)
GCP[  3]: Id=4, Info=
          (8522,6358) -&gt; (116.4295878,39.90722318,0)
Corner Coordinates:
Upper Left  (    0.0,    0.0)
Lower Left  (    0.0, 6744.0)
Upper Right ( 8650.0,    0.0)
Lower Right ( 8650.0, 6744.0)
Center      ( 4325.0, 3372.0)
Band 1 Block=8650x1 Type=Byte, ColorInterp=Red
Band 2 Block=8650x1 Type=Byte, ColorInterp=Green
Band 3 Block=8650x1 Type=Byte, ColorInterp=Blue</pre>
      </td>
    </tr>
  </table>
</div>

2. Use gdalwarp to reproject using the gcp and specify the coordinates.

> The gdalwarp utility is an image mosaicing, reprojection and warping utility. The program can reproject to any supported projection, and can also apply GCPs stored with the image if the image is &#8220;raw&#8221; with control information.

`<br />
<strong>$ gdalwarp -s_srs epsg:4326 -t_srs epsg:4326 2NE1translated.tif warped.tif</strong><br />
Creating output file that is 9422P x 5631L.<br />
Processing input file 2NE1translated.tif.<br />
:0...10...20...30...40...5050...60...70...80...90...<br />
`

Let&#8217;s check after gdalwarp using gdalinfo&#8230;

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="text" style="font-family:monospace;">$ gdalinfo warped.tif
Driver: GTiff/GeoTIFF
Size is 9422, 5631
Coordinate System is:
GEOGCS["WGS 84",
    DATUM["WGS_1984",
        SPHEROID["WGS 84",6378137,298.2572235630016,
            AUTHORITY["EPSG","7030"]],
        AUTHORITY["EPSG","6326"]],
    PRIMEM["Greenwich",0],
    UNIT["degree",0.0174532925199433],
    AUTHORITY["EPSG","4326"]]
Origin = (116.383841930499160,39.933342296341991)
Pixel Size = (0.000004927579869,-0.000004927579869)
Metadata:
  AREA_OR_POINT=Area
Corner Coordinates:
Upper Left  ( 116.3838419,  39.9333423) (116d23'1.83"E, 39d56'0.03"N)
Lower Left  ( 116.3838419,  39.9055951) (116d23'1.83"E, 39d54'20.14"N)
Upper Right ( 116.4302696,  39.9333423) (116d25'48.97"E, 39d56'0.03"N)
Lower Right ( 116.4302696,  39.9055951) (116d25'48.97"E, 39d54'20.14"N)
Center      ( 116.4070558,  39.9194687) (116d24'25.40"E, 39d55'10.09"N)
Band 1 Block=9422x1 Type=Byte, ColorInterp=Red
Band 2 Block=9422x1 Type=Byte, ColorInterp=Green
Band 3 Block=9422x1 Type=Byte, ColorInterp=Blue</pre>
      </td>
    </tr>
  </table>
</div>

Sweet. Now, all we need to do is display the raster images in Mapserver/OpenLayers.

[Specifying a raster image in Mapserver][7]

> LAYER  
> NAME &#8220;2NE1&#8243;  
> DATA &#8220;satimages/2NE1.tif&#8221;  
> TYPE RASTER  
> STATUS DEFAULT  
> END
> 
> LAYER  
> NAME &#8220;2NE2&#8243;  
> DATA &#8220;satimages/2NE2a.tif&#8221;  
> TYPE RASTER  
> STATUS DEFAULT  
> END

Here is the end result&#8230;  
![][8].

Lessons learned, I tried to specify coordinate extents using gdal\_translate -a\_ullr ulx uly lrx lry. Specifying the coordinates was subjective by just looking at the cursor location of the registered image in Mapinfo. *It is still best to use the GCP&#8217;s. Simply put, we need to be accurate in specifying corner coordinates in raster images to project them accurately.*

![][9].

 [1]: http://fwtools.maptools.org
 [2]: http://mapserver.gis.umn.edu/docs/howto/verboselinuxinstall/
 [3]: http://www.gdal.org/
 [4]: http://www.gdal.org/gdal_utilities.html
 [5]: http://www.gdal.org/gdal_translate.html
 [6]: http://www.gdal.org/gdalwarp.html
 [7]: http://mapserver.gis.umn.edu/docs/howto/raster_data
 [8]: /wordpress/images/gdal_warp.jpg
 [9]: /wordpress/images/gdal_merge.jpg