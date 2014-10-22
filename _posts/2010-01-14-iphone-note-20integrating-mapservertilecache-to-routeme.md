---
title: 'iPhone Note #20:Integrating Mapserver/TileCache to RouteMe'
author: rupert
layout: post
permalink: /2010/01/iphone-note-20integrating-mapservertilecache-to-routeme/
categories:
  - iphone
  - mapserver
  - tilecache
tags:
  - iphone
  - mapserver
  - route-me
  - tilecache
---
Below is a summary of how I was able to implement Mapserver, TileCache and Route-Me iPhone Mapping Framework. 

1. Assuming you have a **working** Mapserver/TileCache setup. Take note of the ff parameters: resolution and bbox. Below is my tilecache.cfg:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;"> 61 [mapserver_australia_3857]
 62 type=MapServerLayer
 63 mapfile=/Users/rupert/projects/pelicancorp/DMOB/trunk/map/australia_3857.map
 64 layers=all
 65 extension=jpg
 66 bbox=-20037508.34, -20037508.34, 20037508.34, 20037508.34
 68 maxResolution=156543.033928041
 70 levels=20
 71 srs=EPSG:3857
 72 tms_type=google
 73 extent_type=loose
 74 spherical_mercator=true</pre>
      </td>
    </tr>
  </table>
</div>

2. Grab the RMGenericMercatorWMSSource from <http://groups.google.com/group/route-me-map/browse_thread/thread/b58fa1d20cf15823/e30c42d9c90a8170?lnk=gst&#038;q=Generic#e30c42d9c90a8170>

3. By default without any changes, the RMGenericMercatorWMSSource could display Mapserver WMS Tiles. This is possible by passing an NSDictionary *parameters, which contains arrayValues and arrayKeys for creating an http 256&#215;256 image request to the http://127.0.0.1/cgi-bin/mapserv binary.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #11740a; font-style: italic;">//This would request to http://127.0.0.1/cgi-bin/mapserv</span>
<span style="color: #400080;">NSArray</span> <span style="color: #002200;">*</span>arrayValues <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span><span style="color: #400080;">NSArray</span> alloc<span style="color: #002200;">&#93;</span> initWithObjects<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"/path-to/australia_3857.map"</span>, <span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"all"</span>, <span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"png"</span>, <span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"EPSG:3857"</span>,<span style="color: #a61390;">nil</span><span style="color: #002200;">&#93;</span>;
<span style="color: #400080;">NSArray</span> <span style="color: #002200;">*</span>arrayKeys <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span><span style="color: #400080;">NSArray</span> alloc<span style="color: #002200;">&#93;</span> initWithObjects<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"MAP"</span>, <span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"LAYERS"</span>, <span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"FORMAT"</span>, <span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"SRS"</span>, <span style="color: #a61390;">nil</span><span style="color: #002200;">&#93;</span>;
<span style="color: #400080;">NSDictionary</span> <span style="color: #002200;">*</span>wmsParameters <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span><span style="color: #400080;">NSDictionary</span> alloc<span style="color: #002200;">&#93;</span> initWithObjects<span style="color: #002200;">:</span> arrayValues forKeys<span style="color: #002200;">:</span>arrayKeys <span style="color: #002200;">&#93;</span>;</pre>
      </td>
    </tr>
  </table>
</div>

Resulting http requests to the mapserv binary:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="text" style="font-family:monospace;">http://192.168.1.193:81/tilecache/tilecache.py?LAYERS=australia_3857&SRS=EPSG:3857&REQUEST=GetMap&SERVICE=WMS&STYLES=&EXCEPTIONS=application%2Fvnd.ogc.se_inimage&FORMAT=png&VERSION=1.1.1&WIDTH=256&HEIGHT=256&BBOX=16828376.000000,-4006523.000000,16833268.000000,-4001631.000000</pre>
      </td>
    </tr>
  </table>
</div>

Note that the bbox values does not contain decimal places. Nevertheless, it still works on Mapserver.

4. Now, assuming we have a valid tilecache running. And it is tested from browser, i.e http://127.0.0.1/map/tilecache_3857.html, open up firebug to see the requests. Below is a sample&#8230;

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="text" style="font-family:monospace;">http://192.168.1.193:81/tilecache/tilecache.py?LAYERS=australia_3857&FORMAT=jpg&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&EXCEPTIONS=application%2Fvnd.ogc.se_inimage&SRS=EPSG%3A3857&BBOX=16123932.497377,-4539747.9811239,16143500.376618,-4520180.1018829&WIDTH=256&HEIGHT=256</pre>
      </td>
    </tr>
  </table>
</div>

But it seems, route-me is not supplying the bbox values accurately, as the decimal values is truncated (BBOX=16828376.000000,-4006523.000000,16833268.000000,-4001631.000000) from our previous request(3). 

After changing the wmsParameter values to create a tilecache request, I noticed that route-me is not displaying the tiles correctly.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #11740a; font-style: italic;">//Testing for Windows:TileCache - ?</span>
<span style="color: #400080;">NSArray</span> <span style="color: #002200;">*</span>arrayValues <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span><span style="color: #400080;">NSArray</span> alloc<span style="color: #002200;">&#93;</span> initWithObjects<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"australia_3857"</span>, <span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"png"</span>, <span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"EPSG:3857"</span>,<span style="color: #a61390;">nil</span><span style="color: #002200;">&#93;</span>; <span style="color: #11740a; font-style: italic;">//for WIndows</span>
&nbsp;
<span style="color: #11740a; font-style: italic;">//TileCache URL Parameters:</span>
<span style="color: #400080;">NSArray</span> <span style="color: #002200;">*</span>arrayKeys <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span><span style="color: #400080;">NSArray</span> alloc<span style="color: #002200;">&#93;</span> initWithObjects<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"LAYERS"</span>, <span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"FORMAT"</span>, <span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"SRS"</span>, <span style="color: #a61390;">nil</span><span style="color: #002200;">&#93;</span>;</pre>
      </td>
    </tr>
  </table>
</div>

5. The workaround is to use &#8220;double&#8221; instead of &#8220;floats&#8221; in the RMGenericMercatorWMSSource. You can download the zip from [RMGenericMercatorWMSSource.zip][1]. I have modified &#8220;initialResolution&#8221; and &#8220;originShift&#8221; to both use *&#8220;double&#8221;*.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #a61390;">typedef</span> <span style="color: #a61390;">struct</span> <span style="color: #002200;">&#123;</span>
	<span style="color: #a61390;">double</span> x;
	<span style="color: #a61390;">double</span> y;
<span style="color: #002200;">&#125;</span> CGDoublePoint;
&nbsp;
<span style="color: #a61390;">typedef</span> <span style="color: #a61390;">struct</span> <span style="color: #002200;">&#123;</span> 
	CGDoublePoint ul; 
	CGDoublePoint lr; 
<span style="color: #002200;">&#125;</span> CGXYRect;</pre>
      </td>
    </tr>
  </table>
</div>

Afterwards, I copied the maxResolution and bbox (tilecache) and specified it for the initialResoultion and originShift respectively.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #6e371a;">#import "RMGenericMercatorWMSSource.h"</span>
&nbsp;
CGFloat DegreesToRadians<span style="color: #002200;">&#40;</span>CGFloat degrees<span style="color: #002200;">&#41;</span> <span style="color: #002200;">&#123;</span><span style="color: #a61390;">return</span> degrees <span style="color: #002200;">*</span> M_PI <span style="color: #002200;">/</span> <span style="color: #2400d9;">180</span>;<span style="color: #002200;">&#125;</span>; 
CGFloat RadiansToDegrees<span style="color: #002200;">&#40;</span>CGFloat radians<span style="color: #002200;">&#41;</span> <span style="color: #002200;">&#123;</span><span style="color: #a61390;">return</span> radians <span style="color: #002200;">*</span> <span style="color: #2400d9;">180</span><span style="color: #002200;">/</span> M_PI;<span style="color: #002200;">&#125;</span>; 
&nbsp;
<span style="color: #a61390;">@implementation</span> RMGenericMercatorWMSSource
&nbsp;
<span style="color: #002200;">-</span><span style="color: #002200;">&#40;</span><span style="color: #a61390;">id</span><span style="color: #002200;">&#41;</span> initWithBaseUrl<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span><span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>baseUrl parameters<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span><span style="color: #400080;">NSDictionary</span> <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>params
<span style="color: #002200;">&#123;</span> 
	<span style="color: #a61390;">if</span> <span style="color: #002200;">&#40;</span><span style="color: #002200;">!</span><span style="color: #002200;">&#91;</span>super init<span style="color: #002200;">&#93;</span><span style="color: #002200;">&#41;</span> 
		<span style="color: #a61390;">return</span> <span style="color: #a61390;">nil</span>; 
&nbsp;
	<span style="color: #11740a; font-style: italic;">// 156543.03392804062 for sideLength 256 pixels </span>
	<span style="color: #11740a; font-style: italic;">// initialResolution = 2 * M_PI * 6378137 / [self tileSideLength];</span>
	<span style="color: #11740a; font-style: italic;">// specify here whatever the resolution is from tilecache.</span>
	initialResolution <span style="color: #002200;">=</span> <span style="color: #2400d9;">156543.033928041</span>;
&nbsp;
	<span style="color: #11740a; font-style: italic;">// 20037508.342789244 </span>
	<span style="color: #11740a; font-style: italic;">//originShift = 2 * M_PI * 6378137 / 2;</span>
	<span style="color: #11740a; font-style: italic;">//originShift = 20037508.342789244f;</span>
	<span style="color: #11740a; font-style: italic;">// specify here whatever the bbox is from tilecache.</span>
	originShift <span style="color: #002200;">=</span> <span style="color: #2400d9;">20037508.32</span>;
&nbsp;
	NSLog<span style="color: #002200;">&#40;</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"test initialResolution:%f originShift:%f"</span>, initialResolution, originShift<span style="color: #002200;">&#41;</span>;
&nbsp;
	<span style="color: #11740a; font-style: italic;">// setup default parameters</span>
	<span style="color: #11740a; font-style: italic;">// use official EPSG:3857 by default, user can override to 900913 if needed.</span>
	wmsParameters <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span><span style="color: #400080;">NSMutableDictionary</span> alloc<span style="color: #002200;">&#93;</span> initWithObjects<span style="color: #002200;">:</span><span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span><span style="color: #400080;">NSArray</span> alloc<span style="color: #002200;">&#93;</span> initWithObjects<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"EPSG:3857"</span>,<span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"image/png"</span>,<span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"GetMap"</span>,<span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"1.1.1"</span>,<span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"WMS"</span>,<span style="color: #a61390;">nil</span><span style="color: #002200;">&#93;</span> autorelease<span style="color: #002200;">&#93;</span> 
											  forKeys<span style="color: #002200;">:</span><span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span><span style="color: #400080;">NSArray</span> alloc<span style="color: #002200;">&#93;</span> initWithObjects<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"SRS"</span>,<span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"FORMAT"</span>,<span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"REQUEST"</span>,<span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"VERSION"</span>,<span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"SERVICE"</span>,<span style="color: #a61390;">nil</span><span style="color: #002200;">&#93;</span> autorelease<span style="color: #002200;">&#93;</span><span style="color: #002200;">&#93;</span>;
	<span style="color: #002200;">&#91;</span>wmsParameters addEntriesFromDictionary<span style="color: #002200;">:</span>params<span style="color: #002200;">&#93;</span>;
&nbsp;
	<span style="color: #11740a; font-style: italic;">// build WMS request URL template</span>
	urlTemplate <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #400080;">NSString</span> stringWithString<span style="color: #002200;">:</span>baseUrl<span style="color: #002200;">&#93;</span>;
	<span style="color: #400080;">NSEnumerator</span> <span style="color: #002200;">*</span>e <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>wmsParameters keyEnumerator<span style="color: #002200;">&#93;</span>;
	<span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span>key;
	<span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span>delimiter <span style="color: #002200;">=</span> <span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">""</span>;
	<span style="color: #a61390;">while</span> <span style="color: #002200;">&#40;</span>key <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>e nextObject<span style="color: #002200;">&#93;</span><span style="color: #002200;">&#41;</span> <span style="color: #002200;">&#123;</span>
		urlTemplate <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>urlTemplate stringByAppendingFormat<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"%@%@=%@"</span>,
					   delimiter,
					   <span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span>key uppercaseString<span style="color: #002200;">&#93;</span> stringByAddingPercentEscapesUsingEncoding<span style="color: #002200;">:</span>NSASCIIStringEncoding<span style="color: #002200;">&#93;</span>, 
					   <span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span>wmsParameters objectForKey<span style="color: #002200;">:</span>key<span style="color: #002200;">&#93;</span> stringByAddingPercentEscapesUsingEncoding<span style="color: #002200;">:</span>NSASCIIStringEncoding<span style="color: #002200;">&#93;</span><span style="color: #002200;">&#93;</span>;
		delimiter <span style="color: #002200;">=</span> <span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"&"</span>;
	<span style="color: #002200;">&#125;</span>
	<span style="color: #a61390;">int</span> sideLength <span style="color: #002200;">=</span>  <span style="color: #002200;">&#91;</span>self tileSideLength<span style="color: #002200;">&#93;</span>;
	urlTemplate <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span>urlTemplate stringByAppendingFormat<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"&WIDTH=%d&HEIGHT=%d"</span>,sideLength,sideLength<span style="color: #002200;">&#93;</span> retain<span style="color: #002200;">&#93;</span>;
	<span style="color: #a61390;">return</span> self;
<span style="color: #002200;">&#125;</span>
&nbsp;
<span style="color: #11740a; font-style: italic;">// implement in subclass?</span>
<span style="color: #002200;">-</span><span style="color: #002200;">&#40;</span><span style="color: #400080;">NSString</span><span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span> uniqueTilecacheKey
<span style="color: #002200;">&#123;</span>
	<span style="color: #a61390;">return</span> <span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"AbstractMercatorWMSSource"</span>;
<span style="color: #002200;">&#125;</span>
&nbsp;
<span style="color: #002200;">-</span><span style="color: #002200;">&#40;</span><span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>shortName
<span style="color: #002200;">&#123;</span>
	<span style="color: #a61390;">return</span> <span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"Generic WMS Source"</span>;
<span style="color: #002200;">&#125;</span>
<span style="color: #002200;">-</span><span style="color: #002200;">&#40;</span><span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>longDescription
<span style="color: #002200;">&#123;</span>
	<span style="color: #a61390;">return</span> <span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"Generic WMS Source"</span>;
<span style="color: #002200;">&#125;</span>
<span style="color: #002200;">-</span><span style="color: #002200;">&#40;</span><span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>shortAttribution
<span style="color: #002200;">&#123;</span>
	<span style="color: #a61390;">return</span> <span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"Generic WMS Source"</span>;
<span style="color: #002200;">&#125;</span>
<span style="color: #002200;">-</span><span style="color: #002200;">&#40;</span><span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>longAttribution
<span style="color: #002200;">&#123;</span>
	<span style="color: #a61390;">return</span> <span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"Generic WMS Source"</span>;
<span style="color: #002200;">&#125;</span>
&nbsp;
<span style="color: #002200;">-</span><span style="color: #002200;">&#40;</span><span style="color: #a61390;">float</span><span style="color: #002200;">&#41;</span> minZoom
<span style="color: #002200;">&#123;</span>
	<span style="color: #a61390;">return</span> 1.0f;
<span style="color: #002200;">&#125;</span>
<span style="color: #002200;">-</span><span style="color: #002200;">&#40;</span><span style="color: #a61390;">float</span><span style="color: #002200;">&#41;</span> maxZoom
<span style="color: #002200;">&#123;</span>
	<span style="color: #a61390;">return</span> 19.0f;
<span style="color: #002200;">&#125;</span>
&nbsp;
<span style="color: #11740a; font-style: italic;">// Converts given lat/lon in WGS84 Datum to XY in Spherical Mercator EPSG:3857 </span>
<span style="color: #002200;">-</span><span style="color: #002200;">&#40;</span>CGPoint<span style="color: #002200;">&#41;</span> LatLonToMeters<span style="color: #002200;">:</span> <span style="color: #002200;">&#40;</span>CLLocationCoordinate2D<span style="color: #002200;">&#41;</span> latlon 
<span style="color: #002200;">&#123;</span> 
	CGPoint meters; 
	meters.x <span style="color: #002200;">=</span> latlon.longitude <span style="color: #002200;">*</span> originShift <span style="color: #002200;">/</span> <span style="color: #2400d9;">180</span>; 
	meters.y <span style="color: #002200;">=</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">log</span><span style="color: #002200;">&#40;</span> <span style="color: #a61390;">tan</span><span style="color: #002200;">&#40;</span><span style="color: #002200;">&#40;</span><span style="color: #2400d9;">90.0</span> <span style="color: #002200;">+</span> latlon.latitude<span style="color: #002200;">&#41;</span> <span style="color: #002200;">*</span> M_PI <span style="color: #002200;">/</span> <span style="color: #2400d9;">360.0</span> <span style="color: #002200;">&#41;</span><span style="color: #002200;">&#41;</span> <span style="color: #002200;">/</span> <span style="color: #002200;">&#40;</span>M_PI <span style="color: #002200;">/</span> <span style="color: #2400d9;">180.0</span><span style="color: #002200;">&#41;</span><span style="color: #002200;">&#41;</span> <span style="color: #002200;">*</span> originShift <span style="color: #002200;">/</span> <span style="color: #2400d9;">180</span>; 
	<span style="color: #a61390;">return</span> meters; 
<span style="color: #002200;">&#125;</span>
&nbsp;
<span style="color: #11740a; font-style: italic;">//Converts XY point from Spherical Mercator EPSG:3857 to lat/lon in WGS84 Datum </span>
<span style="color: #002200;">-</span><span style="color: #002200;">&#40;</span>CLLocationCoordinate2D<span style="color: #002200;">&#41;</span> MetersToLatLon<span style="color: #002200;">:</span> <span style="color: #002200;">&#40;</span>CGPoint<span style="color: #002200;">&#41;</span> meters 
<span style="color: #002200;">&#123;</span> 
	CLLocationCoordinate2D latlon; 
	latlon.longitude <span style="color: #002200;">=</span> <span style="color: #002200;">&#40;</span>meters.x <span style="color: #002200;">/</span> originShift<span style="color: #002200;">&#41;</span> <span style="color: #002200;">*</span> <span style="color: #2400d9;">180.0</span>; 
	latlon.latitude <span style="color: #002200;">=</span> <span style="color: #002200;">&#40;</span>meters.y <span style="color: #002200;">/</span> originShift<span style="color: #002200;">&#41;</span> <span style="color: #002200;">*</span> <span style="color: #2400d9;">180.0</span>; 
	<span style="color: #11740a; font-style: italic;">//latlon.latitude = - 180 / M_PI * (2 * atan( exp( latlon.latitude * M_PI / 180.0)) - M_PI / 2.0); </span>
	latlon.latitude <span style="color: #002200;">=</span> <span style="color: #2400d9;">180</span> <span style="color: #002200;">/</span> M_PI <span style="color: #002200;">*</span> <span style="color: #002200;">&#40;</span><span style="color: #2400d9;">2</span> <span style="color: #002200;">*</span> <span style="color: #a61390;">atan</span><span style="color: #002200;">&#40;</span> <span style="color: #a61390;">exp</span><span style="color: #002200;">&#40;</span> latlon.latitude <span style="color: #002200;">*</span> M_PI <span style="color: #002200;">/</span> <span style="color: #2400d9;">180.0</span><span style="color: #002200;">&#41;</span><span style="color: #002200;">&#41;</span> <span style="color: #002200;">-</span> M_PI <span style="color: #002200;">/</span> <span style="color: #2400d9;">2.0</span><span style="color: #002200;">&#41;</span>; 
	<span style="color: #a61390;">return</span> latlon; 
<span style="color: #002200;">&#125;</span> 
&nbsp;
<span style="color: #11740a; font-style: italic;">// Converts pixel coordinates in given zoom level of pyramid to EPSG:3857 </span>
<span style="color: #002200;">-</span><span style="color: #002200;">&#40;</span>CGDoublePoint<span style="color: #002200;">&#41;</span> PixelsToMeters<span style="color: #002200;">:</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">int</span><span style="color: #002200;">&#41;</span> px PixelY<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span><span style="color: #a61390;">int</span><span style="color: #002200;">&#41;</span>py atZoom<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span><span style="color: #a61390;">int</span><span style="color: #002200;">&#41;</span>zoom 
<span style="color: #002200;">&#123;</span> 
	<span style="color: #a61390;">double</span> resolution <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>self ResolutionAtZoom<span style="color: #002200;">:</span> zoom<span style="color: #002200;">&#93;</span>; 
	CGDoublePoint meters; 
	<span style="color: #a61390;">double</span> x <span style="color: #002200;">=</span> <span style="color: #002200;">&#40;</span>px <span style="color: #002200;">*</span> resolution <span style="color: #002200;">-</span> originShift<span style="color: #002200;">&#41;</span>; 
	<span style="color: #a61390;">double</span> y <span style="color: #002200;">=</span> <span style="color: #002200;">&#40;</span>py <span style="color: #002200;">*</span> resolution <span style="color: #002200;">-</span> originShift<span style="color: #002200;">&#41;</span>; 
&nbsp;
	meters.x <span style="color: #002200;">=</span> x;
	meters.y <span style="color: #002200;">=</span> y;
&nbsp;
	NSLog<span style="color: #002200;">&#40;</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"px: %d py: %d resolution: %f originShift: %f x: %f y: %f"</span>, px, py, resolution, originShift, x, y<span style="color: #002200;">&#41;</span>;
&nbsp;
	<span style="color: #a61390;">return</span> meters; 
<span style="color: #002200;">&#125;</span> 
&nbsp;
<span style="color: #002200;">-</span><span style="color: #002200;">&#40;</span><span style="color: #400080;">NSString</span><span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span> tileURL<span style="color: #002200;">:</span> <span style="color: #002200;">&#40;</span>RMTile<span style="color: #002200;">&#41;</span> tile 
<span style="color: #002200;">&#123;</span> 
	<span style="color: #11740a; font-style: italic;">//RMLatLongBounds tileBounds = [self TileLatLonBounds:tile];</span>
	<span style="color: #11740a; font-style: italic;">// Get BBOX coordinates in meters</span>
	CGXYRect tileBounds <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>self TileBounds<span style="color: #002200;">:</span>tile<span style="color: #002200;">&#93;</span>;
&nbsp;
	<span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span>url <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>urlTemplate stringByAppendingFormat<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"&BBOX=%f,%f,%f,%f"</span>,
					 tileBounds.ul.x,
					 tileBounds.lr.y,
					 tileBounds.lr.x,
					 tileBounds.ul.y<span style="color: #002200;">&#93;</span>;
&nbsp;
	NSLog<span style="color: #002200;">&#40;</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"Tile %d,%d,%d yields %@"</span>,tile.zoom, tile.x, tile.y, url<span style="color: #002200;">&#41;</span>; 
&nbsp;
	<span style="color: #a61390;">return</span> url; 
<span style="color: #002200;">&#125;</span> 
&nbsp;
&nbsp;
<span style="color: #11740a; font-style: italic;">//Returns bounds of the given tile in EPSG:3857 coordinates </span>
<span style="color: #002200;">-</span><span style="color: #002200;">&#40;</span>CGXYRect<span style="color: #002200;">&#41;</span>  TileBounds<span style="color: #002200;">:</span> <span style="color: #002200;">&#40;</span>RMTile<span style="color: #002200;">&#41;</span> tile 
<span style="color: #002200;">&#123;</span>
	<span style="color: #a61390;">int</span> sideLength <span style="color: #002200;">=</span>  <span style="color: #002200;">&#91;</span>self tileSideLength<span style="color: #002200;">&#93;</span>;
&nbsp;
	<span style="color: #a61390;">int</span> zoom <span style="color: #002200;">=</span> tile.zoom;
	<span style="color: #a61390;">long</span> twoToZoom <span style="color: #002200;">=</span> <span style="color: #a61390;">pow</span><span style="color: #002200;">&#40;</span><span style="color: #2400d9;">2</span>,zoom<span style="color: #002200;">&#41;</span>;
	CGXYRect tileBounds; 
	tileBounds.ul <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>self PixelsToMeters<span style="color: #002200;">:</span> <span style="color: #002200;">&#40;</span>tile.x <span style="color: #002200;">*</span> sideLength<span style="color: #002200;">&#41;</span> 
								  PixelY<span style="color: #002200;">:</span> <span style="color: #002200;">&#40;</span><span style="color: #002200;">&#40;</span>twoToZoom<span style="color: #002200;">-</span>tile.y<span style="color: #002200;">&#41;</span> <span style="color: #002200;">*</span> sideLength<span style="color: #002200;">&#41;</span> 
								  atZoom<span style="color: #002200;">:</span> zoom <span style="color: #002200;">&#93;</span>; 
	tileBounds.lr <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>self PixelsToMeters<span style="color: #002200;">:</span> <span style="color: #002200;">&#40;</span><span style="color: #002200;">&#40;</span>tile.x<span style="color: #002200;">+</span><span style="color: #2400d9;">1</span><span style="color: #002200;">&#41;</span> <span style="color: #002200;">*</span> sideLength<span style="color: #002200;">&#41;</span> 
								  PixelY<span style="color: #002200;">:</span> <span style="color: #002200;">&#40;</span><span style="color: #002200;">&#40;</span>twoToZoom<span style="color: #002200;">-</span>tile.y<span style="color: #002200;">-</span><span style="color: #2400d9;">1</span><span style="color: #002200;">&#41;</span> <span style="color: #002200;">*</span> sideLength<span style="color: #002200;">&#41;</span> 
								  atZoom<span style="color: #002200;">:</span> zoom<span style="color: #002200;">&#93;</span>;
	<span style="color: #a61390;">return</span> tileBounds; 
<span style="color: #002200;">&#125;</span> 
&nbsp;
<span style="color: #11740a; font-style: italic;">//Resolution (meters/pixel) for given zoom level (measured at Equator) </span>
<span style="color: #002200;">-</span><span style="color: #002200;">&#40;</span><span style="color: #a61390;">double</span><span style="color: #002200;">&#41;</span> ResolutionAtZoom <span style="color: #002200;">:</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">int</span><span style="color: #002200;">&#41;</span> zoom 
<span style="color: #002200;">&#123;</span> 
	<span style="color: #a61390;">return</span> initialResolution <span style="color: #002200;">/</span> <span style="color: #a61390;">pow</span><span style="color: #002200;">&#40;</span><span style="color: #2400d9;">2</span>,zoom<span style="color: #002200;">&#41;</span>; 
<span style="color: #002200;">&#125;</span> 
&nbsp;
<span style="color: #a61390;">@end</span></pre>
      </td>
    </tr>
  </table>
</div>

6. Download [TileCache_RouteMe.zip][2] Note: You need a valid mapserver and tilecache running.

 [1]: /images/2010/01/RMGenericMercatorWMSSource.zip "RMGenericMercatorWMSSource.zip"
 [2]: /images/2010/01/TileCache_RouteMe.zip "TileCache_RouteMe.zip"