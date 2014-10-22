---
title: OpenLayers + Google Spherical Mercator Example
author: rupert
layout: post
permalink: /2007/12/openlayers-google-spherical-mercator-example/
categories:
  - GIS
  - google
  - openlayers
tags:
  - google
  - openlayers
---
<p><a href="http://www.gisnotes.com/images/2007/12/openlayers_google.jpg" title="Road Overlay on Google Vector in Forbidden City and Tiananmen, Beijing, China"><img src="http://www.gisnotes.com/images/2007/12/openlayers_google.jpg" alt="Road Overlay on Google Vector in Forbidden City and Tiananmen, Beijing, China" /></a></p>
<p>I&#8217;ve been a dormant user of OpenLayers for months (4 months?) now and it was a surprise that the <a href="http://svn.openlayers.org/trunk/openlayers/">svn trunk</a> had huge differences from what I remember OL (2.4/5?) to be. One of the cool features that <a href="http://labs.metacarta.com/"></a> and the <a href="http://trac.openlayers.org/">OpenLayers</a> community contributed was the Google Speherical Mercator hack. Below is a quick step tutorial on how I was able to overlay a custom WMS to Google (set as the baselayer). For this tutorial, I want to overlay a road layer on top of Google.</p>
<p>1. We need to convert our data to <a href="http://trac.osgeo.org/gdal/ticket/1868">Google Projection (Spatial Reference System: 900913)</a>. This applies to whatever kind of data (mine is vector stored both in Mapinfo and PostGis) we have.  For PostGis, we need to:</p>

<div class="wp_syntax"><table><tr><td class="code"><pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">INSERT</span> <span style="color: #993333; font-weight: bold;">INTO</span> spatial_ref_sys <span style="color: #66cc66;">&#40;</span>srid<span style="color: #66cc66;">,</span> auth_name<span style="color: #66cc66;">,</span> auth_srid<span style="color: #66cc66;">,</span> proj4text<span style="color: #66cc66;">,</span> srtext<span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">VALUES</span> <span style="color: #66cc66;">&#40;</span> <span style="color: #cc66cc;">900913</span><span style="color: #66cc66;">,</span> 
&nbsp;
<span style="color: #ff0000;">'spatialreference.org'</span><span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">900913</span><span style="color: #66cc66;">,</span> <span style="color: #ff0000;">'+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 
&nbsp;
+x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs'</span><span style="color: #66cc66;">,</span> <span style="color: #ff0000;">'PROJCS
&nbsp;
[&quot;unnamed&quot;,GEOGCS[&quot;unnamed ellipse&quot;,DATUM[&quot;unknown&quot;,SPHEROID[&quot;unnamed&quot;,6378137,0]],PRIMEM
&nbsp;
[&quot;Greenwich&quot;,0],UNIT[&quot;degree&quot;,0.0174532925199433]],PROJECTION[&quot;Mercator_2SP&quot;],PARAMETER
&nbsp;
[&quot;standard_parallel_1&quot;,0],PARAMETER[&quot;central_meridian&quot;,0],PARAMETER
&nbsp;
[&quot;false_easting&quot;,0],PARAMETER[&quot;false_northing&quot;,0],UNIT[&quot;Meter&quot;,1],EXTENSION
&nbsp;
[&quot;PROJ4&quot;,&quot;+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 
&nbsp;
+units=m +nadgrids=@null +wktext  +no_defs&quot;]]'</span><span style="color: #66cc66;">&#41;</span>;
&nbsp;
<span style="color: #993333; font-weight: bold;">SELECT</span> AddGeometryColumn<span style="color: #66cc66;">&#40;</span><span style="color: #ff0000;">'public'</span><span style="color: #66cc66;">,</span><span style="color: #ff0000;">'roads'</span><span style="color: #66cc66;">,</span><span style="color: #ff0000;">'the_geom_google'</span><span style="color: #66cc66;">,</span><span style="color: #cc66cc;">900913</span><span style="color: #66cc66;">,</span><span style="color: #ff0000;">'LINESTRING'</span><span style="color: #66cc66;">,</span><span style="color: #cc66cc;">2</span><span style="color: #66cc66;">&#41;</span>; 
&nbsp;
<span style="color: #993333; font-weight: bold;">UPDATE</span> roads <span style="color: #993333; font-weight: bold;">SET</span> the_geom_google <span style="color: #66cc66;">=</span> Transform<span style="color: #66cc66;">&#40;</span>the_geom<span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">900913</span><span style="color: #66cc66;">&#41;</span>;</pre></td></tr></table></div>

<p>2. MapFile Settings courtesy of <a href="http://spatialreference.org/ref/user/google-projection/">SpatialReference: Google Projection</a></p>

<div class="wp_syntax"><table><tr><td class="code"><pre class="conf" style="font-family:monospace;">WEB
    #Other Web Config Settings goes here...
    &quot;wms_srs&quot;              &quot;EPSG:900913&quot;
END
&nbsp;
PROJECTION
    &quot;+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs&quot;
END</pre></td></tr></table></div>

<p>3. By ensuring that Mapserver has the new 900913 projection, problems such as <em>&#8220;msWMSLoadGetMapParams(): WMS server error. Invalid SRS given : SRS must be valid for all requested layers.&#8221;</em> or <em><a href="http://mapserver.gis.umn.edu/docs/error/proj-init-file">&#8220;msProcessProjection(): Projection library error. no options found in &#8216;init&#8217; file&#8221;</a></em> will be avoided.</p>

<div class="wp_syntax"><table><tr><td class="code"><pre class="conf" style="font-family:monospace;">cd /ms4w/proj/nad/
gvim epsg
# GCS Voirol 1875 Degree
&amp;lt;104304&amp;gt; +proj=longlat +a=6378249.2 +b=6356514.999904194  no_defs &amp;lt;&amp;gt;
# GCS Voirol Unifie 1960 Degree
&amp;lt;104305&amp;gt; +proj=longlat +ellps=clrk80  no_defs &amp;lt;&amp;gt;
# Google Spherical Mercator
. . .
&amp;lt;900913&amp;gt; +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs</pre></td></tr></table></div>

<p>4. Below is an example WMS Request. Note: &#8220;SRS=EPSG 900913&#8243; is added; TRANSPARENT=true not TRANSPARENT=on; Check your BBOX settings for the correct extent.</p>

<div class="wp_syntax"><table><tr><td class="code"><pre class="conf" style="font-family:monospace;">http://127.0.0.1/cgi-bin/mapserv?
LAYERS=beijing_all
&amp;amp;MAP=%2Fhome%2Fmap%2Fbeijing%2Fnew%2Fbeijing_google.map
&amp;amp;FORMAT=AGG
&amp;amp;TRANSPARENT=true
&amp;amp;SERVICE=WMS&amp;amp;VERSION=1.1.1&amp;amp;REQUEST=GetMap
&amp;amp;STYLES=
&amp;amp;EXCEPTIONS=application%2Fvnd.ogc.se_inimage
&amp;amp;SRS=EPSG%3A900913
&amp;amp;BBOX=12956687.788758555,4852222.554861524,12956993.536871642,4852528.30297461
&amp;amp;WIDTH=256&amp;amp;HEIGHT=256</pre></td></tr></table></div>

<p>5. Requesting the WMS from OpenLayers.</p>

<div class="wp_syntax"><table><tr><td class="code"><pre class="javascript" style="font-family:monospace;">	<span style="color: #000066; font-weight: bold;">var</span> options <span style="color: #339933;">=</span> <span style="color: #009900;">&#123;</span>
			projection<span style="color: #339933;">:</span> <span style="color: #3366CC;">&quot;EPSG:900913&quot;</span><span style="color: #339933;">,</span>
			units<span style="color: #339933;">:</span> <span style="color: #3366CC;">&quot;m&quot;</span><span style="color: #339933;">,</span>
			<span style="color: #006600; font-style: italic;">//maxResolution: 156543.0339,</span>
			numZoomLevels<span style="color: #339933;">:</span> <span style="color: #CC0000;">18</span><span style="color: #339933;">,</span>
			maxExtent<span style="color: #339933;">:</span> <span style="color: #000066; font-weight: bold;">new</span> OpenLayers.<span style="color: #660066;">Bounds</span><span style="color: #009900;">&#40;</span><span style="color: #CC0000;">12823075.86334</span><span style="color: #339933;">,</span> <span style="color: #CC0000;">4800551.12375</span><span style="color: #339933;">,</span> <span style="color: #CC0000;">13101918.14248</span><span style="color: #339933;">,</span> <span style="color: #CC0000;">021301.26141</span><span style="color: #009900;">&#41;</span>
	<span style="color: #009900;">&#125;</span><span style="color: #339933;">;</span>
&nbsp;
	<span style="color: #006600; font-style: italic;">// avoid pink tiles</span>
	OpenLayers.<span style="color: #660066;">IMAGE_RELOAD_ATTEMPTS</span> <span style="color: #339933;">=</span> <span style="color: #CC0000;">3</span><span style="color: #339933;">;</span>
	OpenLayers.<span style="color: #660066;">Util</span>.<span style="color: #660066;">onImageLoadErrorColor</span> <span style="color: #339933;">=</span> <span style="color: #3366CC;">&quot;transparent&quot;</span><span style="color: #339933;">;</span>
	map <span style="color: #339933;">=</span> <span style="color: #000066; font-weight: bold;">new</span> OpenLayers.<span style="color: #660066;">Map</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">'mapdiv'</span><span style="color: #339933;">,</span>options<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
	sat_wms <span style="color: #339933;">=</span> <span style="color: #000066; font-weight: bold;">new</span> OpenLayers.<span style="color: #660066;">Layer</span>.<span style="color: #660066;">Google</span><span style="color: #009900;">&#40;</span>
				<span style="color: #3366CC;">&quot;Layer&quot;</span><span style="color: #339933;">,</span>
				<span style="color: #009900;">&#123;</span>type<span style="color: #339933;">:</span> G_SATELLITE_MAP<span style="color: #339933;">,</span><span style="color: #3366CC;">'sphericalMercator'</span><span style="color: #339933;">:</span> <span style="color: #003366; font-weight: bold;">true</span><span style="color: #009900;">&#125;</span>
	<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
	map.<span style="color: #660066;">addLayer</span><span style="color: #009900;">&#40;</span>sat_wms<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
	<span style="color: #006600; font-style: italic;">// start custom layer here</span>
	<span style="color: #000066; font-weight: bold;">var</span> layer_obj <span style="color: #339933;">=</span> <span style="color: #000066; font-weight: bold;">new</span> OpenLayers.<span style="color: #660066;">Layer</span>.<span style="color: #660066;">WMS</span><span style="color: #009900;">&#40;</span>
		<span style="color: #3366CC;">&quot;Beijing&quot;</span><span style="color: #339933;">,</span>
		<span style="color: #3366CC;">&quot;http://127.0.0.1/cgi-bin/mapserv&quot;</span><span style="color: #339933;">,</span>
		<span style="color: #009900;">&#123;</span>
			layers<span style="color: #339933;">:</span> <span style="color: #3366CC;">'beijing_all'</span><span style="color: #339933;">,</span>
			map<span style="color: #339933;">:</span> <span style="color: #3366CC;">'/home/map/beijing/new/beijing_google.map'</span><span style="color: #339933;">,</span>
			format<span style="color: #339933;">:</span> <span style="color: #3366CC;">'AGG'</span><span style="color: #339933;">,</span>
			<span style="color: #3366CC;">'transparent'</span><span style="color: #339933;">:</span> <span style="color: #3366CC;">'true'</span>
		<span style="color: #009900;">&#125;</span>
	<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
	layer_obj.<span style="color: #660066;">setIsBaseLayer</span><span style="color: #009900;">&#40;</span><span style="color: #003366; font-weight: bold;">false</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
	layer_obj.<span style="color: #660066;">setVisibility</span><span style="color: #009900;">&#40;</span><span style="color: #003366; font-weight: bold;">true</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>	
&nbsp;
        map.<span style="color: #660066;">addLayer</span><span style="color: #009900;">&#40;</span>layer_obj<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
	map.<span style="color: #660066;">addControl</span><span style="color: #009900;">&#40;</span><span style="color: #000066; font-weight: bold;">new</span> OpenLayers.<span style="color: #660066;">Control</span>.<span style="color: #660066;">MousePosition</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
	map.<span style="color: #660066;">addControl</span><span style="color: #009900;">&#40;</span><span style="color: #000066; font-weight: bold;">new</span> OpenLayers.<span style="color: #660066;">Control</span>.<span style="color: #660066;">LayerSwitcher</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
	map.<span style="color: #660066;">addControl</span><span style="color: #009900;">&#40;</span><span style="color: #000066; font-weight: bold;">new</span> OpenLayers.<span style="color: #660066;">Control</span>.<span style="color: #660066;">Scale</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
	<span style="color: #000066; font-weight: bold;">var</span> center <span style="color: #339933;">=</span> <span style="color: #000066; font-weight: bold;">new</span> OpenLayers.<span style="color: #660066;">LonLat</span><span style="color: #009900;">&#40;</span><span style="color: #CC0000;">12956625.68367</span><span style="color: #339933;">,</span> <span style="color: #CC0000;">4852316.90682</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
	map.<span style="color: #660066;">setCenter</span><span style="color: #009900;">&#40;</span>center<span style="color: #339933;">,</span> <span style="color: #CC0000;">17</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span></pre></td></tr></table></div>

