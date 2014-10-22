---
title: TileCache Experiment
author: rupert
layout: post
permalink: /2007/02/tilecache-experiment/
categories:
  - mapserver
  - tilecache
tags:
  - openlayers
  - tilecache
---
I am now able to do tilecache using TileCache1.3 from metacarta. Base from archives (archive-user.txt)

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="text" style="font-family:monospace;">From crschmidt at metacarta.com  Wed Nov 22 17:54:29 2006
From: crschmidt at metacarta.com (Christopher Schmidt)
Date: Wed, 22 Nov 2006 17:54:29 -0500
Subject: [OpenLayers-Users] TileCache - Tiling issues
In-Reply-To: &lt;4564D326.6020607@refractions.net&gt;
References: &lt;4564D326.6020607@refractions.net&gt;
Message-ID: &lt;20061122225429.GA18180@metacarta.com&gt;
&nbsp;
On Wed, Nov 22, 2006 at 02:45:58PM -0800, Ben Brehmer wrote:
&gt; Hello everyone,
&gt;
&gt; I have setup a basic OpenLayers application with TileCache doing the
&gt; server-side caching. I was wondering if there is a way to pre-cache all
&gt; the tiles (besides panning/zooming everywhere on the map)? I know in
&gt; kamap there is a script that can be run to pre-cache all the tiles. Is
&gt; there something similair for TileCache?
&nbsp;
In the TileCache directory, there is a 'Client.py' script. To pre-cache
your data, use it in the following manner:
&nbsp;
python Client.py "http://example.com/tilecachelocation/tilecache.cgi?"
"layername" startzoomlevel endzoomlevel [BBOX]
&nbsp;
Something like:
&nbsp;
python Client.py "http://labs.metacarta.com/wms-c/Basic.py?" "basic" 0 16
&nbsp;
Is what we used to precache all of the Vmap0 data in the MetaCarta VMap0
layer.
&nbsp;
&gt; Also, I have attached two jpegs. Each has part of a symbol or label
&gt; chopped off. I believe that the "chopping" occurs at the edge of a tile.
&gt; Has anyone ever experience something like this in OpenLayers?
&nbsp;
This is based on your Mapserver setup, rather than something specific in
OpenLayers. Using WMS would result in the same visual result. Labels can
have this prevented using the "PARTIALS OFF" on your label layer, if
you're using Mapserver. I'm not aware of a way to prevent this in symbol
generation. 
&nbsp;
We are currently working on ka-map style rendering to add to TileCache,
to help people not run into this issue. No timeframe available yet on
when that'll be released. 
&nbsp;
Regards,
--
Christopher Schmidt
MetaCarta</pre>
      </td>
    </tr>
  </table>
</div>

1. TileCache Configuration: tilecache.cfg

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="text" style="font-family:monospace;">[cache]
type=DiskCache
base=E:\\usr\\local\\apache2\\htdocs\\tmp\\
&nbsp;
[basemap]
type=WMSLayer
url=http://127.0.0.1/cgi-bin/mapserv.exe?map=/home/basemap/wmstest_longlat.map
layers=district,greens,major_river,minor_river
extension=png
&nbsp;
[roads]
type=WMSLayer
url=http://127.0.0.1/cgi-bin/mapserv.exe?map=/home/basemap/wmstest_longlat.map
layers=road4,road4label,road3,road3label,road2,road2label,road1,road1label,road11,road11label
extension=png</pre>
      </td>
    </tr>
  </table>
</div>

2. Calling CFM Script: Test.cfm

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="cfm" style="font-family:monospace;">    <span style="color: #333333;"><span style="color: #0000FF;">&lt;</span><span style="color: #990000; font-weight: bold;">cfset</span> request.mapserv<span style="color: #0000FF;">=</span><span style="color: #009900;">"http://127.0.0.1/tilecache/tilecache.py"</span><span style="color: #0000FF;">&gt;</span></span> 
&nbsp;
    <span style="color: #333333;"><span style="color: #0000FF;">&lt;</span><span style="color: #000000; font-weight: bold;">script</span> <span style="color: #0000FF;">src</span><span style="color: #0000FF;">=</span><span style="color: #009900;">"/OpenLayers-2.2/lib/OpenLayers.js"</span><span style="color: #0000FF;">&gt;</span></span><span style="color: #333333;"><span style="color: #0000FF;">&lt;/</span><span style="color: #000000; font-weight: bold;">script</span><span style="color: #0000FF;">&gt;</span></span>
    <span style="color: #333333;"><span style="color: #0000FF;">&lt;</span><span style="color: #000000; font-weight: bold;">script</span> <span style="color: #0000FF;">type</span><span style="color: #0000FF;">=</span><span style="color: #009900;">"text/javascript"</span><span style="color: #0000FF;">&gt;</span></span><span style="color: #333333;"><span style="color: #0000FF;">&lt;/</span><span style="color: #000000; font-weight: bold;">script</span><span style="color: #0000FF;">&gt;</span></span>
        <span style="color: #808080; font-style: italic;">&lt;!--&lt;br /--&gt;</span>        //var lon = 116.3842;
        //var lat = 39.9150;
        var lon = 116.3846;
        var lat = 39.9202;
        var zoom = 16;
        var map, markers;
&nbsp;
        function init(){
      	    map = new OpenLayers.Map( $('map'), { maxResolution: 'auto'});
&nbsp;
	    var layer_base = new OpenLayers.Layer.WMS(
					"Base Layer",
					"<span style="color: #0000FF;">#request.mapserv#</span>",
					{
						layers: 'basemap',
						format: 'png', 'transparent': 'off'
					}
					);
&nbsp;
                map.addLayer(layer_base);
	   layer_base.setIsBaseLayer(true);	
&nbsp;
               ...more code here...
&nbsp;
       }
<span style="color: #333333;"><span style="color: #0000FF;">&lt;/</span><span style="color: #990000; font-weight: bold;">cfset</span><span style="color: #0000FF;">&gt;</span></span></pre>
      </td>
    </tr>
  </table>
</div>

I want to fine tune this script since I am getting odd tiles like duplicate tiles or tiles shown of different scale on the same scale.

3. Precaching:  
/d/Python24/python.exe Client.py &#8220;http://127.0.0.1/tilecache/tilecache.py&#8221; &#8220;roads&#8221; 14 16 116.35397,39.88984,116.42988,39.91918

I need to understand the &#8220;cache hit&#8221; or &#8220;cache miss&#8221; during execution.