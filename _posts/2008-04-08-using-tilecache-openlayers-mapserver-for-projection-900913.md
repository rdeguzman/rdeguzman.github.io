---
title: Using TileCache, OpenLayers, Mapserver for Projection 900913
author: rupert
layout: post
permalink: /2008/04/using-tilecache-openlayers-mapserver-for-projection-900913/
aktt_tweeted:
  - 1
categories:
  - mapserver
  - openlayers
  - tilecache
tags:
  - mapserver
  - openlayers
  - tilecache
---
I had a few problems with [TileCache][1] the other week which I am eager to blog about, since I knew for sure that later on, I might encounter the same. I don&#8217;t have the exact errors with me right now, so I&#8217;m jotting this down from my head&#8230;

1.  Classic Resolutions problem. Use extent_type=loose
2.  Can not set image type

UPDATED (JAN 11, 2010): Classic Resolutions problem:

How are resolutions calculated? Assuming we have:

Original:  
Lower Left (LL) or minx, miny: 12453557, -5434940  
Upper Right (UR) or max, maxy: 16980842, -1180729

maxResolution = (max &#8211; minx)/tilesize = (16980842 &#8211; 12453557)/512 = 8842.353  
where tilesize = 512.

Therefore, we can set/guess for max so that we have maxResolution as a whole number.

Adjusted:  
minx, miny: 12453557, -5434940  
maxx, maxy: 16980661, -1180729

gives a maxResolution (whole number) of 8842.

Now, you can use 8842 in both the TileCache.cfg and OpenLayers Javascript.<!--more-->

  
**A. Google BaseLayer + Road WMS Overlay = Validation approach before we proceed to TC.**

1. OpenLayers (OL) Code: <http://www.gisnotes.com/platform/docs/examples/GoogleWMSRoads.cfm>

2. Map File Configuration: `/home/map/beijing/new/beijing_google_roads`

Well the above files are not exactly for TC, but it is a good demonstration that we could overlay our custom layers (WMS) on top of Google as the base layer. For a more detailed explanation regarding Google + OL, please read my previous [gisnote][2]. Also, this is a good test to see if our [Mapserver *mapfile* configuration]() is correct. I do suggest not to proceed with OL + TC not unless you have validated the mapfile through OL (Google + WMS).

**B. Google900913 Tilecache as baselayer**

Ok.. so here it is..

1. OpenLayers Code: <http://www.gisnotes.com/platform/docs/examples/TilecacheGoogle900913Base.cfm>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="javascript" style="font-family:monospace;">        window.<span style="color: #660066;">onload</span> <span style="color: #339933;">=</span> <span style="color: #000066; font-weight: bold;">function</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
            <span style="color: #000066; font-weight: bold;">var</span> options <span style="color: #339933;">=</span> <span style="color: #009900;">&#123;</span>
                        projection<span style="color: #339933;">:</span> <span style="color: #000066; font-weight: bold;">new</span> OpenLayers.<span style="color: #660066;">Projection</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">"EPSG:900913"</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">,</span>
                        units<span style="color: #339933;">:</span> <span style="color: #3366CC;">"m"</span><span style="color: #339933;">,</span>
&nbsp;
                        <span style="color: #006600; font-style: italic;">//maxResolution: 156543.0339,</span>
                        resolutions <span style="color: #339933;">:</span> <span style="color: #009900;">&#91;</span><span style="color: #CC0000;">156543.03390000001</span><span style="color: #339933;">,</span> <span style="color: #CC0000;">78271.516950000005</span><span style="color: #339933;">,</span> <span style="color: #CC0000;">39135.758475000002</span><span style="color: #339933;">,</span> <span style="color: #CC0000;">19567.879237500001</span><span style="color: #339933;">,</span> <span style="color: #CC0000;">9783.9396187500006</span><span style="color: #339933;">,</span> <span style="color: #CC0000;">4891.9698093750003</span><span style="color: #339933;">,</span> <span style="color: #CC0000;">2445.9849046875001</span><span style="color: #339933;">,</span> <span style="color: #CC0000;">1222.9924523437501</span><span style="color: #339933;">,</span> <span style="color: #CC0000;">611.49622617187504</span><span style="color: #339933;">,</span> <span style="color: #CC0000;">305.74811308593752</span><span style="color: #339933;">,</span> <span style="color: #CC0000;">152.87405654296876</span><span style="color: #339933;">,</span> <span style="color: #CC0000;">76.43702827148438</span><span style="color: #339933;">,</span> <span style="color: #CC0000;">38.21851413574219</span><span style="color: #339933;">,</span> <span style="color: #CC0000;">19.109257067871095</span><span style="color: #339933;">,</span> <span style="color: #CC0000;">9.5546285339355475</span><span style="color: #339933;">,</span> <span style="color: #CC0000;">4.7773142669677737</span><span style="color: #339933;">,</span> <span style="color: #CC0000;">2.3886571334838869</span><span style="color: #339933;">,</span> <span style="color: #CC0000;">1.1943285667419434</span><span style="color: #339933;">,</span> <span style="color: #CC0000;">0.59716428337097172</span><span style="color: #339933;">,</span> <span style="color: #CC0000;">0.29858214168548586</span><span style="color: #009900;">&#93;</span><span style="color: #339933;">,</span>
                        <span style="color: #006600; font-style: italic;">//zoom: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19] @ numZoomLevels: 20</span>
                        numZoomLevels<span style="color: #339933;">:</span> <span style="color: #CC0000;">20</span><span style="color: #339933;">,</span>
                        <span style="color: #006600; font-style: italic;">//maxExtent: new OpenLayers.Bounds(12823075.86334, 4800551.12375, 13101918.14248, 5021301.26141)</span>
                        <span style="color: #006600; font-style: italic;">//maxExtent: new OpenLayers.Bounds(12823075, 4800551, 13101918, 5021301)</span>
                        <span style="color: #006600; font-style: italic;">//maxExtent: new OpenLayers.Bounds(12848138, 4785083, 13080212, 5021118.5)</span>
                        maxExtent<span style="color: #339933;">:</span> <span style="color: #000066; font-weight: bold;">new</span> OpenLayers.<span style="color: #660066;">Bounds</span><span style="color: #009900;">&#40;</span><span style="color: #339933;">-</span><span style="color: #CC0000;">20037508</span><span style="color: #339933;">,</span> <span style="color: #339933;">-</span><span style="color: #CC0000;">20037508</span><span style="color: #339933;">,</span><span style="color: #CC0000;">20037508</span><span style="color: #339933;">,</span> <span style="color: #CC0000;">20037508.34</span><span style="color: #009900;">&#41;</span>
                    <span style="color: #009900;">&#125;</span><span style="color: #339933;">;</span>
&nbsp;
            OpenLayers.<span style="color: #660066;">IMAGE_RELOAD_ATTEMPTS</span> <span style="color: #339933;">=</span> <span style="color: #CC0000;">3</span><span style="color: #339933;">;</span>
            OpenLayers.<span style="color: #660066;">Util</span>.<span style="color: #660066;">onImageLoadErrorColor</span> <span style="color: #339933;">=</span> <span style="color: #3366CC;">"transparent"</span><span style="color: #339933;">;</span>
&nbsp;
            map <span style="color: #339933;">=</span> <span style="color: #000066; font-weight: bold;">new</span> OpenLayers.<span style="color: #660066;">Map</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">'mapdiv'</span><span style="color: #339933;">,</span>options<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
            <span style="color: #000066; font-weight: bold;">var</span> serverURL <span style="color: #339933;">=</span> <span style="color: #3366CC;">"/tilecache/tilecache.py"</span><span style="color: #339933;">;</span>
            <span style="color: #006600; font-style: italic;">// start custom layer here</span>
            <span style="color: #000066; font-weight: bold;">var</span> layer_obj <span style="color: #339933;">=</span> <span style="color: #000066; font-weight: bold;">new</span> OpenLayers.<span style="color: #660066;">Layer</span>.<span style="color: #660066;">WMS</span><span style="color: #009900;">&#40;</span>
                <span style="color: #3366CC;">"Beijing"</span><span style="color: #339933;">,</span>
                serverURL<span style="color: #339933;">,</span>
                <span style="color: #009900;">&#123;</span>
                    layers<span style="color: #339933;">:</span> <span style="color: #3366CC;">'beijing_900913'</span><span style="color: #339933;">,</span>
                    map<span style="color: #339933;">:</span> <span style="color: #3366CC;">'/home/map/beijing/new/beijing_900913/beijing.map'</span><span style="color: #339933;">,</span>
                    format<span style="color: #339933;">:</span> <span style="color: #3366CC;">'image/jpg'</span><span style="color: #339933;">,</span>
                    <span style="color: #3366CC;">'transparent'</span><span style="color: #339933;">:</span> <span style="color: #3366CC;">'off'</span>
                <span style="color: #009900;">&#125;</span>
            <span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
            layer_obj.<span style="color: #660066;">setIsBaseLayer</span><span style="color: #009900;">&#40;</span><span style="color: #003366; font-weight: bold;">true</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
            layer_obj.<span style="color: #660066;">setVisibility</span><span style="color: #009900;">&#40;</span><span style="color: #003366; font-weight: bold;">true</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
            map.<span style="color: #660066;">addLayer</span><span style="color: #009900;">&#40;</span>layer_obj<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span></pre>
      </td>
    </tr>
  </table>
</div>

2. TileCache Configuration: /wwwroot/tilecache/tilecache.cfg

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="cnf" style="font-family:monospace;">[beijing_900913]
type=WMSLayer
url=http://127.0.0.1/cgi-bin/mapserv?map=/home/map/beijing/new/beijing_900913/beijing.map
layers=beijing_900913
metatile=true
extension=jpg
levels=20
resolutions=156543.03390000001, 78271.516950000005, 39135.758475000002, 19567.879237500001, 9783.9396187500006, 4891.9698093750003, 2445.9849046875001, 1222.9924523437501, 611.49622617187504, 305.74811308593752, 152.87405654296876, 76.43702827148438, 38.21851413574219, 19.109257067871095, 9.5546285339355475, 4.7773142669677737, 2.3886571334838869, 1.1943285667419434, 0.59716428337097172, 0.29858214168548586
srs=EPSG:900913
bbox=-20037508, -20037508, 20037508, 20037508.34
#maxResolution=156543.0339
extent_type=loose
debug=on</pre>
      </td>
    </tr>
  </table>
</div>

You can either set resolutions or maxResolutions. I always wanted to be explicit, so setting the **resolutions** is my preference.

3. MapFile Configuration: `/home/map/beijing/new/beijing_900913/beijing.map`  
I have a long mapfile, and using [includes][3] helped a lot, see my previous [gisnote][4]. For debugging your mapfile, read this [post.][5]

**Always Remember&#8230;I believe when they made TC, I presume they always tested on WGS84(lonlat), this means if you don&#8217;t set anything explicit, it would *implicitly* set settings in WGS84(lon/lat)&#8230;**

*   Ensure that you have the vector data in the necessary projection, in my case it&#8217;s 900913.
  


*   Ensure that the *resolutions* from OL (B.1) is reflected in TC configuration (B.2).
  


*   Ensure that the *maxextents* from OL (B.1) is reflected in TC configuration (B.2) as *bbox*.
  
</ul> 
**C. Still can&#8217;t get it running?**

1. Narrow down the error.

2. **tail -f /var/log/apache2/error.log** and **access.log** is your bestfriend. It&#8217;s a good starting point to trace down what went wrong. If you can&#8217;t see it from Apache&#8217;s error.log then ensure that [python debugging is turned on.][6]

3. Sometimes TC **[a]** gives you an obvious error or **[b]** its just a link to the mapserv request. 

Examples of **[a]**:

*   *Classic Resolution problem stated above. *- If you followed my final notes above, then this should not happen. If you&#8217;ve set up things correctly but it&#8217;s still broken and you want to pull your hair out, then do a clean test stated below in D.
*   *Cannot set image type* &#8211; Check the extensions from the mapfile and TC config. Are they both in jpg&#8217;s?

The latter **[b]** is harder to debug. Most likely its a mapserver mapfile mishap and the easiest way to hunt this down is only thru your error.log (note: you need mapserver to have a debug=true when you compiled it, that&#8217;s another story.)

**D. Doing a clean test as always**  
1. Always disable any caching when testing. Disable cache from your browser, for FF I use the webdeveloper toolbar. It&#8217;s as easy as Disable -> Disable Cache.

2. Stop/Start Apache. Hoping Python get&#8217;s a clean start as well. If you found any pyc (python compiled) under TC source directory&#8230; then stop Apache; remove the pycs; start Apache.

3. Seeing the same images? Always remove the image caches! rm -Rf /data/tilecache/beijing_900913

 [1]: www.tilecache.org
 [2]: /wordpress/index.php/2007/12/22/openlayers-google-spherical-mercator-example/
 [3]: http://mapserver.gis.umn.edu/docs/reference/mapfile/Include
 [4]: /wordpress/index.php/2007/08/19/103/
 [5]: /wordpress/index.php/2007/08/24/mapserver-debug-output/
 [6]: /wordpress/index.php/2007/07/25/installing-tilecache/