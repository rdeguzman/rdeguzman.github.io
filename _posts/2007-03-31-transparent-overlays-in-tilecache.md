---
title: Transparent Overlays in TileCache
author: rupert
layout: post
permalink: /2007/03/transparent-overlays-in-tilecache/
categories:
  - mapserver
  - tilecache
tags:
  - apache
  - mapserver
  - openlayers
  - python
---
From the tilecache mailing list&#8230;.

Hi Everyone,

Really appreciate all the replies&#8230;

1. Installed Imaging-1.1.6.tar.gz (PIL).

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux ~<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># python</span>
Python 2.3.4 <span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #666666; font-style: italic;">#1, Mar 10 2006, 06:12:09) [GCC 3.4.5 20051201 (Red Hat 3.4.5-2)] on linux2 Type "help", "copyright", "credits" or "license" for more information.</span>
<span style="color: #000000; font-weight: bold;">&</span>gt;<span style="color: #000000; font-weight: bold;">&</span>gt;<span style="color: #000000; font-weight: bold;">&</span>gt; import sys
<span style="color: #000000; font-weight: bold;">&</span>gt;<span style="color: #000000; font-weight: bold;">&</span>gt;<span style="color: #000000; font-weight: bold;">&</span>gt; print sys.path
<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #ff0000;">''</span>, <span style="color: #ff0000;">'/usr/lib/python23.zip'</span>, <span style="color: #ff0000;">'/usr/lib/python2.3'</span>, <span style="color: #ff0000;">'/usr/lib/python2.3/plat-linux2'</span>, <span style="color: #ff0000;">'/usr/lib/python2.3/lib-tk'</span>, <span style="color: #ff0000;">'/usr/lib/python2.3/lib-dynload'</span>, <span style="color: #ff0000;">'/usr/lib/python2.3/site-packages'</span>,
<span style="color: #ff0000;">'/usr/lib/python2.3/site-packages/PIL'</span>,
<span style="color: #ff0000;">'/usr/lib/python2.3/site-packages/gtk-2.0'</span><span style="color: #7a0874; font-weight: bold;">&#93;</span>
<span style="color: #000000; font-weight: bold;">&</span>gt;<span style="color: #000000; font-weight: bold;">&</span>gt;<span style="color: #000000; font-weight: bold;">&</span>gt;</pre>
      </td>
    </tr>
  </table>
</div>

2. Modified test1.cfm

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="cfm" style="font-family:monospace;">     41         var options = {
     42                         controls: [new OpenLayers.Control.MouseDefaults()]
     43                       };
     44
     45         map = new OpenLayers.Map( $('map'), options);
     46
     47         var layer_base = new OpenLayers.Layer.WMS(
     48                     "Base Layer",
     49                     "<span style="color: #0000FF;">#request.mapserv_tile#</span>",
     50                     {
     51                         map: '/home/map/beijing/new/wms.map',
     52                         layers: '<span style="color: #0000FF;">#request.basemap_tile#</span>',
     53                         format: 'image/png', 'transparent': 'false'
     54                     }
     55                     );
     56
     57         var layer_road = new OpenLayers.Layer.WMS(
     58                     "Road Layer",
     59                     "<span style="color: #0000FF;">#request.mapserv_tile#</span>",
     60                     {
     61                         map: '/home/map/beijing/new/wms.map',
     62                         layers: '<span style="color: #0000FF;">#request.roads_tile#</span>',
     63                         format: 'image/png', 'transparent': 'true'
     64                     },
     65                     {
     66                         reproject: false
     67                     }
     68                     );
     69
     70         map.addLayer(layer_base);
     71         layer_base.setIsBaseLayer(true);
     72
     73         layer_road.setIsBaseLayer(false);
     74         map.addLayer(layer_road);</pre>
      </td>
    </tr>
  </table>
</div>

3. tilecache.cfg. Commented metaTile=true http://222.128.19.19/tilecache/tilecache.cfg

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">     <span style="color: #000000;">47</span> <span style="color: #7a0874; font-weight: bold;">&#91;</span>basemap<span style="color: #7a0874; font-weight: bold;">&#93;</span>
     <span style="color: #000000;">48</span> <span style="color: #007800;">type</span>=WMSLayer
     <span style="color: #000000;">49</span> <span style="color: #007800;">url</span>=http:<span style="color: #000000; font-weight: bold;">//</span>127.0.0.1<span style="color: #000000; font-weight: bold;">/</span>cgi-bin<span style="color: #000000; font-weight: bold;">/</span>mapserv?<span style="color: #007800;">map</span>=<span style="color: #000000; font-weight: bold;">/</span>home<span style="color: #000000; font-weight: bold;">/</span>map<span style="color: #000000; font-weight: bold;">/</span>beijing<span style="color: #000000; font-weight: bold;">/</span>new<span style="color: #000000; font-weight: bold;">/</span>wms.map
     <span style="color: #000000;">50</span> <span style="color: #007800;">layers</span>=district,greens,major_river,minor_river
     <span style="color: #000000;">51</span> <span style="color: #666666; font-style: italic;">#bbox=-180,-90,180,90</span>
     <span style="color: #000000;">52</span> <span style="color: #666666; font-style: italic;">#metaTile=true</span>
     <span style="color: #000000;">53</span> <span style="color: #007800;">extension</span>=png
     <span style="color: #000000;">54</span>
     <span style="color: #000000;">55</span> <span style="color: #7a0874; font-weight: bold;">&#91;</span>roads<span style="color: #7a0874; font-weight: bold;">&#93;</span>
     <span style="color: #000000;">56</span> <span style="color: #007800;">type</span>=WMSLayer
     <span style="color: #000000;">57</span> <span style="color: #007800;">url</span>=http:<span style="color: #000000; font-weight: bold;">//</span>127.0.0.1<span style="color: #000000; font-weight: bold;">/</span>cgi-bin<span style="color: #000000; font-weight: bold;">/</span>mapserv?<span style="color: #007800;">map</span>=<span style="color: #000000; font-weight: bold;">/</span>home<span style="color: #000000; font-weight: bold;">/</span>map<span style="color: #000000; font-weight: bold;">/</span>beijing<span style="color: #000000; font-weight: bold;">/</span>new<span style="color: #000000; font-weight: bold;">/</span>wms.map
     <span style="color: #000000;">58</span> <span style="color: #666666; font-style: italic;">#layers=road4,road4label,road3,road3label,road2,road2label,road1,road1label,road11,road11label</span>
     <span style="color: #000000;">59</span> <span style="color: #666666; font-style: italic;">#bbox=116.1737,39.8211,116.5640,40.0799</span>
     <span style="color: #000000;">60</span> <span style="color: #666666; font-style: italic;">#maxresolution=1.40625</span>
     <span style="color: #000000;">61</span> <span style="color: #666666; font-style: italic;">#bbox=-180,-90,180,90</span>
     <span style="color: #000000;">62</span> <span style="color: #007800;">layers</span>=road1,road1label,road11,road11label
     <span style="color: #000000;">63</span> <span style="color: #007800;">extension</span>=png
     <span style="color: #000000;">64</span> <span style="color: #666666; font-style: italic;">#metaTile=true</span></pre>
      </td>
    </tr>
  </table>
</div>

4. Modified wms.map http://222.128.19.19/tilecache/wms.map

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">OUTPUTFORMAT
     NAME png
     DRIVER <span style="color: #ff0000;">"GD/PNG"</span>
     MIMETYPE <span style="color: #ff0000;">"image/png"</span>
     IMAGEMODE RGB
     EXTENSION <span style="color: #ff0000;">"png"</span>
     FORMATOPTION <span style="color: #ff0000;">"INTERLACE=OFF"</span>
END</pre>
      </td>
    </tr>
  </table>
</div>

5. Checked access_log. &#8220;transparent=true&#8221; exists&#8230;  
`<br />
192.168.1.150 - - [30/Mar/2007:13:46:26 +0800] "GET /tilecache/tilecache.py?MAP=%2Fhome%2Fmap%2Fbeijing%2Fnew%2Fwms.map&LAYERS=r<br />
oads&FORMAT=image%2Fpng&TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=G<br />
etMap&STYLES=&EXCEPTIONS=application%2Fvnd.ogc.se_inimage&SRS=EPSG%3A4326&BB<br />
OX=116.334229%2C39.891357%<br />
2C116.345215%2C39.902344&WIDTH=256&HEIGHT=256 HTTP/1.1" 200 14580<br />
`

Now, this is really weird. I have &#8220;transparent&#8221;: true in test1.cfm all the time. That didn&#8217;t worked.

For every test iteration i made, I always tried clearing the cache, removing the python compiled scripts, then restarting Apache just to get a clean state..

`<br />
rm -Rf /usr/local/apache2/htdocs/tmp/*<br />
rm /wwwroot/tilecache/TileCache/*.pyc<br />
/etc/init.d/httpd restart<br />
`

Then I tried appending &#8220;transparent=true&#8221; to tilecache.cfg based on Eric&#8217;s suggestion&#8230;  
That worked. Now I wonder why&#8230; Nevertheless, its working now. Again many thanks to everyone&#8230;

Rupert

On Fri, Mar 30, 2007 at 01:57:43PM +0800, Rupert de Guzman Jr wrote:  
> Hi Everyone,  
>  
> Really appreciate all the replies&#8230;  
> Then I tried appending &#8220;transparent=true&#8221; to tilecache.cfg based on  
> Eric&#8217;s suggestion&#8230;  
> That worked. Now I wonder why&#8230; Nevertheless, its working now. Again  
> many thanks to everyone&#8230;

TileCache pays almost no attention to the URL: Only the BBOX and the layername matter. Anything else is simply ignored: so your transparency being set in OpenLayers actually has 0 affect.

The reason for this is that TileCache can only store one copy of an image. If the URL parameters modified the content, you could get an inconsistent cache.

This is &#8216;by design&#8217;, insofar as there is no obvious solution (other than to complain more loudly when TC Gets parameters it isn&#8217;t expecting, which is an outstanding FIXME in the code). The lack of error message is not by design, and I&#8217;m sorry you got bit by the poorly documented behavior.

Regards,  
&#8212;  
Christopher Schmidt  
MetaCarta