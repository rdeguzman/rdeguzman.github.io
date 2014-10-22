---
title: Reviving an old web map with Google Maps via OpenLayers
author: rupert
layout: post
permalink: /2008/01/reviving-an-old-web-map-with-google-maps-via-openlayers/
categories:
  - openlayers
tags:
  - google
  - openlayers
---
<p><a href="http://www.gisnotes.com/images/2008/01/travelsite.jpg" title="Travelsite.ph with Google"><img src="http://www.gisnotes.com/images/2008/01/travelsite.jpg" alt="Travelsite.ph with Google" /></a></p>
<p>An old coworker and I worked on a travel portal for the Philippines called travelsite.ph about 4 years ago. We are now given a task of reviving the old web application and even adding mapping functionalities.  Back then, the application was using ColdFusion 4.5 and MySQL 3.</p>
<p>Fingers crossed we dropped the app in a ColdFusion 6/7/8 environment with no changes at all. The app still works! Awesome.. how CF really progressed through the years with backward compatibility.  The only changes we made was removing the registration/sign up for a quick demo. I just laughed at the oddities and the no brainer features (pertaining to security) that I made when I was starting out.</p>
<p>The database was also intact and have UTM coordinates. We dropped it to a Debian mysql 5 and works flawlessly since its MyISAM. I had the coordinates exported to lon/lat, so I could directly inject it to OpenLayers/Google.  After two hours of fiddling around, I got mapping embedded.. hehe.. courtesy of OpenLayers ofcourse.</p>
<p>Here&#8217;s a quick reminder to myself&#8230;</p>
<p>A. Google WGS 84 Example.</p>

<div class="wp_syntax"><table><tr><td class="code"><pre class="javascript" style="font-family:monospace;">	window.<span style="color: #660066;">onload</span> <span style="color: #339933;">=</span> <span style="color: #000066; font-weight: bold;">function</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
		<span style="color: #000066; font-weight: bold;">var</span> options <span style="color: #339933;">=</span> <span style="color: #009900;">&#123;</span>
					projection<span style="color: #339933;">:</span> <span style="color: #3366CC;">&quot;EPSG:4326&quot;</span><span style="color: #339933;">,</span>
					numZoomLevels<span style="color: #339933;">:</span> <span style="color: #CC0000;">19</span><span style="color: #339933;">,</span>
					maxExtent<span style="color: #339933;">:</span> <span style="color: #000066; font-weight: bold;">new</span> OpenLayers.<span style="color: #660066;">Bounds</span><span style="color: #009900;">&#40;</span><span style="color: #CC0000;">120.8774</span><span style="color: #339933;">,</span> <span style="color: #CC0000;">14.3684</span><span style="color: #339933;">,</span> <span style="color: #CC0000;">121.1628</span><span style="color: #339933;">,</span> <span style="color: #CC0000;">14.7931</span><span style="color: #009900;">&#41;</span>
&nbsp;
				<span style="color: #009900;">&#125;</span><span style="color: #339933;">;</span>
&nbsp;
		<span style="color: #006600; font-style: italic;">// avoid pink tiles</span>
		OpenLayers.<span style="color: #660066;">IMAGE_RELOAD_ATTEMPTS</span> <span style="color: #339933;">=</span> <span style="color: #CC0000;">3</span><span style="color: #339933;">;</span>
		OpenLayers.<span style="color: #660066;">Util</span>.<span style="color: #660066;">onImageLoadErrorColor</span> <span style="color: #339933;">=</span> <span style="color: #3366CC;">&quot;transparent&quot;</span><span style="color: #339933;">;</span>
		map <span style="color: #339933;">=</span> <span style="color: #000066; font-weight: bold;">new</span> OpenLayers.<span style="color: #660066;">Map</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">'mapdiv'</span><span style="color: #339933;">,</span>options<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
		sat_wms <span style="color: #339933;">=</span> <span style="color: #000066; font-weight: bold;">new</span> OpenLayers.<span style="color: #660066;">Layer</span>.<span style="color: #660066;">Google</span><span style="color: #009900;">&#40;</span>
					<span style="color: #3366CC;">&quot;Layer&quot;</span><span style="color: #339933;">,</span>
					<span style="color: #009900;">&#123;</span>type<span style="color: #339933;">:</span> G_SATELLITE_MAP<span style="color: #009900;">&#125;</span>
		<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
		map.<span style="color: #660066;">addLayer</span><span style="color: #009900;">&#40;</span>sat_wms<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
		map.<span style="color: #660066;">addControl</span><span style="color: #009900;">&#40;</span><span style="color: #000066; font-weight: bold;">new</span> OpenLayers.<span style="color: #660066;">Control</span>.<span style="color: #660066;">MousePosition</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
		map.<span style="color: #660066;">addControl</span><span style="color: #009900;">&#40;</span><span style="color: #000066; font-weight: bold;">new</span> OpenLayers.<span style="color: #660066;">Control</span>.<span style="color: #660066;">LayerSwitcher</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
		map.<span style="color: #660066;">addControl</span><span style="color: #009900;">&#40;</span><span style="color: #000066; font-weight: bold;">new</span> OpenLayers.<span style="color: #660066;">Control</span>.<span style="color: #660066;">Scale</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
		<span style="color: #000066; font-weight: bold;">var</span> center <span style="color: #339933;">=</span> <span style="color: #000066; font-weight: bold;">new</span> OpenLayers.<span style="color: #660066;">LonLat</span><span style="color: #009900;">&#40;</span><span style="color: #CC0000;">121.06504</span><span style="color: #339933;">,</span><span style="color: #CC0000;">14.65495</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
		map.<span style="color: #660066;">setCenter</span><span style="color: #009900;">&#40;</span>center<span style="color: #339933;">,</span> <span style="color: #CC0000;">16</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
	<span style="color: #009900;">&#125;</span></pre></td></tr></table></div>

<p>B. Google Mercator Projection</p>

<div class="wp_syntax"><table><tr><td class="code"><pre class="javascript" style="font-family:monospace;">		window.<span style="color: #660066;">onload</span> <span style="color: #339933;">=</span> <span style="color: #000066; font-weight: bold;">function</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
			<span style="color: #000066; font-weight: bold;">var</span> options <span style="color: #339933;">=</span> <span style="color: #009900;">&#123;</span>
						projection<span style="color: #339933;">:</span> <span style="color: #3366CC;">&quot;EPSG:900913&quot;</span><span style="color: #339933;">,</span>
						units<span style="color: #339933;">:</span> <span style="color: #3366CC;">&quot;m&quot;</span><span style="color: #339933;">,</span>
						maxResolution<span style="color: #339933;">:</span> <span style="color: #CC0000;">156543.0339</span><span style="color: #339933;">,</span>
						numZoomLevels<span style="color: #339933;">:</span> <span style="color: #CC0000;">19</span><span style="color: #339933;">,</span>
						maxExtent<span style="color: #339933;">:</span> <span style="color: #000066; font-weight: bold;">new</span> OpenLayers.<span style="color: #660066;">Bounds</span><span style="color: #009900;">&#40;</span><span style="color: #CC0000;">12823075.86334</span><span style="color: #339933;">,</span> <span style="color: #CC0000;">4800551.12375</span><span style="color: #339933;">,</span> <span style="color: #CC0000;">13101918.14248</span><span style="color: #339933;">,</span> <span style="color: #CC0000;">5021301.26141</span><span style="color: #009900;">&#41;</span>
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
&nbsp;
			map.<span style="color: #660066;">addControl</span><span style="color: #009900;">&#40;</span><span style="color: #000066; font-weight: bold;">new</span> OpenLayers.<span style="color: #660066;">Control</span>.<span style="color: #660066;">MousePosition</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
			map.<span style="color: #660066;">addControl</span><span style="color: #009900;">&#40;</span><span style="color: #000066; font-weight: bold;">new</span> OpenLayers.<span style="color: #660066;">Control</span>.<span style="color: #660066;">LayerSwitcher</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
			map.<span style="color: #660066;">addControl</span><span style="color: #009900;">&#40;</span><span style="color: #000066; font-weight: bold;">new</span> OpenLayers.<span style="color: #660066;">Control</span>.<span style="color: #660066;">Scale</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
			<span style="color: #000066; font-weight: bold;">var</span> center <span style="color: #339933;">=</span> <span style="color: #000066; font-weight: bold;">new</span> OpenLayers.<span style="color: #660066;">LonLat</span><span style="color: #009900;">&#40;</span><span style="color: #CC0000;">12956625.68367</span><span style="color: #339933;">,</span> <span style="color: #CC0000;">4852316.90682</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
			map.<span style="color: #660066;">setCenter</span><span style="color: #009900;">&#40;</span>center<span style="color: #339933;">,</span> <span style="color: #CC0000;">18</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
		<span style="color: #009900;">&#125;</span></pre></td></tr></table></div>

<p>What&#8217;s the difference between both snippets? Obviously projection is one. Since most of my point data is in lon/lat, then the WGS84 example is good if I don&#8217;t want to overlay custom precise data.  Remember the x shift problem in Google with Openlayers. The Google Mercator example is used when I want to overlay more custom data, particularly polygons/line that needs to fit on Google Layers. For more details, please see my previous <a href="/wordpress/?p=129">blog post</a>.</p>
