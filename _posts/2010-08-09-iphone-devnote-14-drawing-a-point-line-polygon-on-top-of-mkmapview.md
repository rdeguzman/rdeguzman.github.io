---
title: 'iPhone Note #14: Drawing a Point, Line, Polygon on top of MKMapview'
author: rupert
layout: post
permalink: /2010/08/iphone-devnote-14-drawing-a-point-line-polygon-on-top-of-mkmapview/
categories:
  - iphone
tags:
  - iphone
---
UPDATE: Aug 9, 2010  
[DrawMap2.zip][1]  
Note: This does not contain the new MapKit functions for overlaying lines and polygons. This zip was created to compile against 4.0.0 but still have the same codebase.  
============================

This is an update to [iPhone DevNote #13.]() This post has solved my zooming/panning problem with a CustomView on top of my MKMapView courtesy of [http://spitzkoff.com/craig/?p=108 (Craig&#8217;s blog)][2]. 

The trick here is instead of doing the drawing on the drawRect method of the CustomView, we will use [Craig&#8217;s methodology][2] to use the drawRect method of a custom MKAnnotationView. Note, that he also used an internal view and made clipsToBounds = NO, this way we can draw the whole geometry on top of MKMapView not just a portion of it. The end result is the shape (polygon in this example) is below the added pins.

<img src="/images/2009/10/polygon_on_top_mapview.png" alt="polygon_on_top_mapview.png" border="0" width="250" height="372" />

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #a61390;">@interface</span> LinePolygonAnnotationInternalView <span style="color: #002200;">:</span> UIView
<span style="color: #002200;">&#123;</span>
	<span style="color: #11740a; font-style: italic;">// line view which added this as a subview. </span>
	LinePolygonAnnotationView<span style="color: #002200;">*</span> _mainView;
<span style="color: #002200;">&#125;</span>
<span style="color: #a61390;">@property</span> <span style="color: #002200;">&#40;</span>nonatomic, retain<span style="color: #002200;">&#41;</span> LinePolygonAnnotationView<span style="color: #002200;">*</span> mainView;
<span style="color: #a61390;">@end</span>
&nbsp;
<span style="color: #a61390;">@implementation</span> LinePolygonAnnotationInternalView
&nbsp;
<span style="color: #a61390;">@synthesize</span> mainView <span style="color: #002200;">=</span> _mainView;
&nbsp;
<span style="color: #002200;">-</span><span style="color: #002200;">&#40;</span><span style="color: #a61390;">id</span><span style="color: #002200;">&#41;</span> init
<span style="color: #002200;">&#123;</span>
	self <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>super init<span style="color: #002200;">&#93;</span>;
	self.backgroundColor <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>UIColor clearColor<span style="color: #002200;">&#93;</span>;
	self.clipsToBounds <span style="color: #002200;">=</span> <span style="color: #a61390;">NO</span>;
&nbsp;
	<span style="color: #a61390;">return</span> self;
<span style="color: #002200;">&#125;</span>
&nbsp;
&nbsp;
<span style="color: #002200;">-</span><span style="color: #002200;">&#40;</span><span style="color: #a61390;">void</span><span style="color: #002200;">&#41;</span> drawRect<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span>CGRect<span style="color: #002200;">&#41;</span> rect
<span style="color: #002200;">&#123;</span>
	GeometryAnnotation<span style="color: #002200;">*</span> myAnnotation <span style="color: #002200;">=</span> <span style="color: #002200;">&#40;</span>GeometryAnnotation<span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>self.mainView.annotation;
&nbsp;
	<span style="color: #11740a; font-style: italic;">// only draw our lines if we're not int he moddie of a transition and we </span>
	<span style="color: #11740a; font-style: italic;">// acutally have some points to draw. </span>
	<span style="color: #a61390;">if</span><span style="color: #002200;">&#40;</span><span style="color: #002200;">!</span>self.hidden <span style="color: #002200;">&&</span> <span style="color: #a61390;">nil</span> <span style="color: #002200;">!=</span> myAnnotation.points <span style="color: #002200;">&&</span> myAnnotation.points.count &gt; <span style="color: #2400d9;"></span><span style="color: #002200;">&#41;</span>
	<span style="color: #002200;">&#123;</span>
		CGContextRef context <span style="color: #002200;">=</span> UIGraphicsGetCurrentContext<span style="color: #002200;">&#40;</span><span style="color: #002200;">&#41;</span>; 
&nbsp;
		<span style="color: #11740a; font-style: italic;">// Drawing lines with a white stroke color</span>
		CGContextSetRGBStrokeColor<span style="color: #002200;">&#40;</span>context, <span style="color: #2400d9;">1.0</span>, <span style="color: #2400d9;">1.0</span>, <span style="color: #2400d9;">1.0</span>, <span style="color: #2400d9;">1.0</span><span style="color: #002200;">&#41;</span>;
&nbsp;
		<span style="color: #11740a; font-style: italic;">// Draw them with a 2.0 stroke width so they are a bit more visible.</span>
		CGContextSetLineWidth<span style="color: #002200;">&#40;</span>context, <span style="color: #2400d9;">2.0</span><span style="color: #002200;">&#41;</span>;		
&nbsp;
		<span style="color: #a61390;">if</span><span style="color: #002200;">&#40;</span>myAnnotation.geometryType <span style="color: #002200;">==</span> kGeometryTypePolygon<span style="color: #002200;">&#41;</span><span style="color: #002200;">&#123;</span>
			CGContextSetRGBFillColor<span style="color: #002200;">&#40;</span>context, <span style="color: #2400d9;">0.0</span>, <span style="color: #2400d9;">0.0</span>, <span style="color: #2400d9;">1.0</span>, <span style="color: #2400d9;">1.0</span><span style="color: #002200;">&#41;</span>;
		<span style="color: #002200;">&#125;</span>
&nbsp;
		<span style="color: #11740a; font-style: italic;">// Draw them with a 2.0 stroke width so they are a bit more visible.</span>
		CGContextSetLineWidth<span style="color: #002200;">&#40;</span>context, <span style="color: #2400d9;">2.0</span><span style="color: #002200;">&#41;</span>;
&nbsp;
		<span style="color: #a61390;">for</span><span style="color: #002200;">&#40;</span><span style="color: #a61390;">int</span> idx <span style="color: #002200;">=</span> <span style="color: #2400d9;"></span>; idx &lt; myAnnotation.points.count; idx<span style="color: #002200;">++</span><span style="color: #002200;">&#41;</span>
		<span style="color: #002200;">&#123;</span>
			CLLocation<span style="color: #002200;">*</span> location <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>myAnnotation.points objectAtIndex<span style="color: #002200;">:</span>idx<span style="color: #002200;">&#93;</span>;
			CGPoint point <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>self.mainView.mapView convertCoordinate<span style="color: #002200;">:</span>location.coordinate toPointToView<span style="color: #002200;">:</span>self<span style="color: #002200;">&#93;</span>;
&nbsp;
			NSLog<span style="color: #002200;">&#40;</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"Point: %lf, %lf"</span>, point.x, point.y<span style="color: #002200;">&#41;</span>;
&nbsp;
			<span style="color: #a61390;">if</span><span style="color: #002200;">&#40;</span>idx <span style="color: #002200;">==</span> <span style="color: #2400d9;"></span><span style="color: #002200;">&#41;</span>
			<span style="color: #002200;">&#123;</span>
				<span style="color: #11740a; font-style: italic;">// move to the first point</span>
				CGContextMoveToPoint<span style="color: #002200;">&#40;</span>context, point.x, point.y<span style="color: #002200;">&#41;</span>;
			<span style="color: #002200;">&#125;</span>
			<span style="color: #a61390;">else</span>
			<span style="color: #002200;">&#123;</span>
				CGContextAddLineToPoint<span style="color: #002200;">&#40;</span>context, point.x, point.y<span style="color: #002200;">&#41;</span>;
			<span style="color: #002200;">&#125;</span>
		<span style="color: #002200;">&#125;</span>
&nbsp;
		<span style="color: #a61390;">if</span><span style="color: #002200;">&#40;</span>myAnnotation.geometryType <span style="color: #002200;">==</span> kGeometryTypeLine<span style="color: #002200;">&#41;</span><span style="color: #002200;">&#123;</span>
			CGContextStrokePath<span style="color: #002200;">&#40;</span>context<span style="color: #002200;">&#41;</span>;
		<span style="color: #002200;">&#125;</span>
		<span style="color: #a61390;">else</span> <span style="color: #a61390;">if</span><span style="color: #002200;">&#40;</span>myAnnotation.geometryType <span style="color: #002200;">==</span> kGeometryTypePolygon<span style="color: #002200;">&#41;</span><span style="color: #002200;">&#123;</span>
			CGContextClosePath<span style="color: #002200;">&#40;</span>context<span style="color: #002200;">&#41;</span>;
&nbsp;
			CGContextDrawPath<span style="color: #002200;">&#40;</span>context, kCGPathFillStroke<span style="color: #002200;">&#41;</span>;
		<span style="color: #002200;">&#125;</span>
&nbsp;
	<span style="color: #002200;">&#125;</span>
&nbsp;
&nbsp;
<span style="color: #002200;">&#125;</span>
&nbsp;
<span style="color: #002200;">-</span><span style="color: #002200;">&#40;</span><span style="color: #a61390;">void</span><span style="color: #002200;">&#41;</span> dealloc
<span style="color: #002200;">&#123;</span>
	self.mainView <span style="color: #002200;">=</span> <span style="color: #a61390;">nil</span>;
&nbsp;
	<span style="color: #002200;">&#91;</span>super dealloc<span style="color: #002200;">&#93;</span>;
<span style="color: #002200;">&#125;</span>
<span style="color: #a61390;">@end</span>
&nbsp;
<span style="color: #a61390;">@implementation</span> LinePolygonAnnotationView
&nbsp;
<span style="color: #a61390;">@synthesize</span> mapView <span style="color: #002200;">=</span> _mapView;
&nbsp;
<span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">id</span><span style="color: #002200;">&#41;</span>initWithFrame<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span>CGRect<span style="color: #002200;">&#41;</span>frame <span style="color: #002200;">&#123;</span>
    <span style="color: #a61390;">if</span> <span style="color: #002200;">&#40;</span>self <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>super initWithFrame<span style="color: #002200;">:</span>frame<span style="color: #002200;">&#93;</span><span style="color: #002200;">&#41;</span> <span style="color: #002200;">&#123;</span>
&nbsp;
		self.backgroundColor <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>UIColor clearColor<span style="color: #002200;">&#93;</span>;
&nbsp;
		<span style="color: #11740a; font-style: italic;">// do not clip the bounds. We need the LinePolygonAnnotationInternalView to be able to render the whole line/polygon, regardless of where the</span>
		<span style="color: #11740a; font-style: italic;">// actual annotation view is displayed. </span>
		self.clipsToBounds <span style="color: #002200;">=</span> <span style="color: #a61390;">NO</span>;
&nbsp;
		<span style="color: #11740a; font-style: italic;">// create the internal line view that does the rendering of the line. </span>
		_internalView <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span>LinePolygonAnnotationInternalView alloc<span style="color: #002200;">&#93;</span> init<span style="color: #002200;">&#93;</span>;
		_internalView.mainView <span style="color: #002200;">=</span> self;
&nbsp;
		<span style="color: #002200;">&#91;</span>self addSubview<span style="color: #002200;">:</span>_internalView<span style="color: #002200;">&#93;</span>;
    <span style="color: #002200;">&#125;</span>
    <span style="color: #a61390;">return</span> self;
<span style="color: #002200;">&#125;</span>
&nbsp;
<span style="color: #002200;">-</span><span style="color: #002200;">&#40;</span><span style="color: #a61390;">void</span><span style="color: #002200;">&#41;</span> setMapView<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span>MKMapView<span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span> mapView
<span style="color: #002200;">&#123;</span>
	<span style="color: #002200;">&#91;</span>_mapView release<span style="color: #002200;">&#93;</span>;
	_mapView <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>mapView retain<span style="color: #002200;">&#93;</span>;
&nbsp;
	<span style="color: #002200;">&#91;</span>self regionChanged<span style="color: #002200;">&#93;</span>;
<span style="color: #002200;">&#125;</span>
&nbsp;
<span style="color: #002200;">-</span><span style="color: #002200;">&#40;</span><span style="color: #a61390;">void</span><span style="color: #002200;">&#41;</span> regionChanged
<span style="color: #002200;">&#123;</span>
	NSLog<span style="color: #002200;">&#40;</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"Region Changed"</span><span style="color: #002200;">&#41;</span>;
&nbsp;
	<span style="color: #11740a; font-style: italic;">// move the internal line view. </span>
	CGPoint origin <span style="color: #002200;">=</span> CGPointMake<span style="color: #002200;">&#40;</span><span style="color: #2400d9;"></span>, <span style="color: #2400d9;"></span><span style="color: #002200;">&#41;</span>;
	origin <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>_mapView convertPoint<span style="color: #002200;">:</span>origin toView<span style="color: #002200;">:</span>self<span style="color: #002200;">&#93;</span>;
&nbsp;
	_internalView.frame <span style="color: #002200;">=</span> CGRectMake<span style="color: #002200;">&#40;</span>origin.x, origin.y, _mapView.frame.size.width, _mapView.frame.size.height<span style="color: #002200;">&#41;</span>;
	<span style="color: #002200;">&#91;</span>_internalView setNeedsDisplay<span style="color: #002200;">&#93;</span>;
&nbsp;
<span style="color: #002200;">&#125;</span>
&nbsp;
<span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">void</span><span style="color: #002200;">&#41;</span>dealloc 
<span style="color: #002200;">&#123;</span>
	<span style="color: #002200;">&#91;</span>_mapView release<span style="color: #002200;">&#93;</span>;
	<span style="color: #002200;">&#91;</span>_internalView release<span style="color: #002200;">&#93;</span>;
&nbsp;
    <span style="color: #002200;">&#91;</span>super dealloc<span style="color: #002200;">&#93;</span>;
<span style="color: #002200;">&#125;</span>
&nbsp;
&nbsp;
<span style="color: #a61390;">@end</span></pre>
      </td>
    </tr>
  </table>
</div>

I extended the class above to be able to draw both lines and polygons by checking a property (geometryType) of the GeometryAnnotation. If the geometryType is a line, then just stroke the path. However, if the geometryType is a polygon, then close the path and fill it.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #a61390;">if</span><span style="color: #002200;">&#40;</span>myAnnotation.geometryType <span style="color: #002200;">==</span> kGeometryTypeLine<span style="color: #002200;">&#41;</span><span style="color: #002200;">&#123;</span>
	CGContextStrokePath<span style="color: #002200;">&#40;</span>context<span style="color: #002200;">&#41;</span>;
<span style="color: #002200;">&#125;</span>
<span style="color: #a61390;">else</span> <span style="color: #a61390;">if</span><span style="color: #002200;">&#40;</span>myAnnotation.geometryType <span style="color: #002200;">==</span> kGeometryTypePolygon<span style="color: #002200;">&#41;</span><span style="color: #002200;">&#123;</span>
	CGContextClosePath<span style="color: #002200;">&#40;</span>context<span style="color: #002200;">&#41;</span>;
&nbsp;
	CGContextDrawPath<span style="color: #002200;">&#40;</span>context, kCGPathFillStroke<span style="color: #002200;">&#41;</span>;
<span style="color: #002200;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

And here is the GeometryAnnotation class. Most of the code is from [Craig][2], i just added the geometryType property:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #11740a; font-style: italic;">//  Created by Craig on 8/18/09.</span>
<span style="color: #11740a; font-style: italic;">//  Copyright Craig Spitzkoff 2009. All rights reserved.</span>
<span style="color: #11740a; font-style: italic;">//</span>
&nbsp;
<span style="color: #6e371a;">#import "GeometryAnnotation.h"</span>
&nbsp;
<span style="color: #a61390;">@implementation</span> GeometryAnnotation
<span style="color: #a61390;">@synthesize</span> coordinate <span style="color: #002200;">=</span> _center;
<span style="color: #a61390;">@synthesize</span> points <span style="color: #002200;">=</span> _points; 
<span style="color: #a61390;">@synthesize</span> annotationID;
<span style="color: #a61390;">@synthesize</span> geometryType;
&nbsp;
<span style="color: #002200;">-</span><span style="color: #002200;">&#40;</span><span style="color: #a61390;">id</span><span style="color: #002200;">&#41;</span> initWithPoints<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span><span style="color: #400080;">NSArray</span><span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span> points withGeometry<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span>GeometryType<span style="color: #002200;">&#41;</span>geomType
<span style="color: #002200;">&#123;</span>
	self <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>super init<span style="color: #002200;">&#93;</span>;
&nbsp;
	geometryType <span style="color: #002200;">=</span> geomType;
&nbsp;
	_points <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span><span style="color: #400080;">NSMutableArray</span> alloc<span style="color: #002200;">&#93;</span> initWithArray<span style="color: #002200;">:</span>points<span style="color: #002200;">&#93;</span>;
&nbsp;
	<span style="color: #11740a; font-style: italic;">// create a unique ID for this line so it can be added to dictionaries by this key. </span>
	self.annotationID <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #400080;">NSString</span> stringWithFormat<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"%p"</span>, self<span style="color: #002200;">&#93;</span>;
&nbsp;
&nbsp;
	<span style="color: #11740a; font-style: italic;">// determine a logical center point for this line based on the middle of the lat/lon extents.</span>
	<span style="color: #a61390;">double</span> maxLat <span style="color: #002200;">=</span> <span style="color: #002200;">-</span><span style="color: #2400d9;">91</span>;
	<span style="color: #a61390;">double</span> minLat <span style="color: #002200;">=</span>  <span style="color: #2400d9;">91</span>;
	<span style="color: #a61390;">double</span> maxLon <span style="color: #002200;">=</span> <span style="color: #002200;">-</span><span style="color: #2400d9;">181</span>;
	<span style="color: #a61390;">double</span> minLon <span style="color: #002200;">=</span>  <span style="color: #2400d9;">181</span>;
&nbsp;
	<span style="color: #a61390;">for</span><span style="color: #002200;">&#40;</span>CLLocation<span style="color: #002200;">*</span> currentLocation <span style="color: #a61390;">in</span> _points<span style="color: #002200;">&#41;</span>
	<span style="color: #002200;">&#123;</span>
		CLLocationCoordinate2D coordinate <span style="color: #002200;">=</span> currentLocation.coordinate;
&nbsp;
		<span style="color: #a61390;">if</span><span style="color: #002200;">&#40;</span>coordinate.latitude &gt; maxLat<span style="color: #002200;">&#41;</span>
			maxLat <span style="color: #002200;">=</span> coordinate.latitude;
		<span style="color: #a61390;">if</span><span style="color: #002200;">&#40;</span>coordinate.latitude &lt; minLat<span style="color: #002200;">&#41;</span>
			minLat <span style="color: #002200;">=</span> coordinate.latitude;
		<span style="color: #a61390;">if</span><span style="color: #002200;">&#40;</span>coordinate.longitude &gt; maxLon<span style="color: #002200;">&#41;</span>
			maxLon <span style="color: #002200;">=</span> coordinate.longitude;
		<span style="color: #a61390;">if</span><span style="color: #002200;">&#40;</span>coordinate.longitude &lt; minLon<span style="color: #002200;">&#41;</span>
			minLon <span style="color: #002200;">=</span> coordinate.longitude; 
	<span style="color: #002200;">&#125;</span>
&nbsp;
	_span.latitudeDelta <span style="color: #002200;">=</span> <span style="color: #002200;">&#40;</span>maxLat <span style="color: #002200;">+</span> <span style="color: #2400d9;">90</span><span style="color: #002200;">&#41;</span> <span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span>minLat <span style="color: #002200;">+</span> <span style="color: #2400d9;">90</span><span style="color: #002200;">&#41;</span>;
	_span.longitudeDelta <span style="color: #002200;">=</span> <span style="color: #002200;">&#40;</span>maxLon <span style="color: #002200;">+</span> <span style="color: #2400d9;">180</span><span style="color: #002200;">&#41;</span> <span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span>minLon <span style="color: #002200;">+</span> <span style="color: #2400d9;">180</span><span style="color: #002200;">&#41;</span>;
&nbsp;
	<span style="color: #11740a; font-style: italic;">// the center point is the average of the max and mins</span>
	_center.latitude <span style="color: #002200;">=</span> minLat <span style="color: #002200;">+</span> _span.latitudeDelta <span style="color: #002200;">/</span> <span style="color: #2400d9;">2</span>;
	_center.longitude <span style="color: #002200;">=</span> minLon <span style="color: #002200;">+</span> _span.longitudeDelta <span style="color: #002200;">/</span> <span style="color: #2400d9;">2</span>;
&nbsp;
	NSLog<span style="color: #002200;">&#40;</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"Found center of new Annotation at %lf, %ld"</span>, _center.latitude, _center.longitude<span style="color: #002200;">&#41;</span>;
&nbsp;
	<span style="color: #a61390;">return</span> self;
<span style="color: #002200;">&#125;</span>
&nbsp;
<span style="color: #002200;">-</span><span style="color: #002200;">&#40;</span>MKCoordinateRegion<span style="color: #002200;">&#41;</span> region
<span style="color: #002200;">&#123;</span>
	MKCoordinateRegion region;
	region.center <span style="color: #002200;">=</span> _center;
	region.span <span style="color: #002200;">=</span> _span;
&nbsp;
	<span style="color: #a61390;">return</span> region;
<span style="color: #002200;">&#125;</span>
&nbsp;
<span style="color: #002200;">-</span><span style="color: #002200;">&#40;</span><span style="color: #a61390;">void</span><span style="color: #002200;">&#41;</span> dealloc
<span style="color: #002200;">&#123;</span>
	<span style="color: #002200;">&#91;</span>_points release<span style="color: #002200;">&#93;</span>;
&nbsp;
	<span style="color: #002200;">&#91;</span>super dealloc<span style="color: #002200;">&#93;</span>;
<span style="color: #002200;">&#125;</span>
&nbsp;
<span style="color: #a61390;">@end</span></pre>
      </td>
    </tr>
  </table>
</div>

Now that we have a way to draw a line/polygon as a custom MKAnnotationView, we need a custom TouchView (GeometryTouchView) which could accept the touch events. 

For example, if the user wants to draw a line geometry, the GeometryTouchView would accept touch events from the user and add a point as a PointAnnotation in the Map. Succeeding points would be added to an array. For every point added, the MKAnnotationView drawRects method connects the points to produce a line. The MKAnnotationView is now added to the map. 

Once the geometry is added as an annotation, the custom TouchView is hidden. This way we have access (panning/zooming) to the mapview. If we make a pan or a zoom, the region changes, thus we need to redraw the shape of the annotation again.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">void</span><span style="color: #002200;">&#41;</span>mapView<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span>MKMapView <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>mapView regionWillChangeAnimated<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span><span style="color: #a61390;">BOOL</span><span style="color: #002200;">&#41;</span>animated
<span style="color: #002200;">&#123;</span>
	<span style="color: #a61390;">if</span><span style="color: #002200;">&#40;</span>currentAnnotationView <span style="color: #002200;">!=</span> <span style="color: #a61390;">nil</span><span style="color: #002200;">&#41;</span><span style="color: #002200;">&#123;</span>
		NSLog<span style="color: #002200;">&#40;</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"regionWillChangeAnimated"</span><span style="color: #002200;">&#41;</span>;
&nbsp;
		currentAnnotationView.hidden <span style="color: #002200;">=</span> <span style="color: #a61390;">YES</span>;
	<span style="color: #002200;">&#125;</span>
<span style="color: #002200;">&#125;</span>
&nbsp;
<span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">void</span><span style="color: #002200;">&#41;</span>mapView<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span>MKMapView <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>mapView regionDidChangeAnimated<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span><span style="color: #a61390;">BOOL</span><span style="color: #002200;">&#41;</span>animated
<span style="color: #002200;">&#123;</span>
	<span style="color: #a61390;">if</span><span style="color: #002200;">&#40;</span>currentAnnotationView <span style="color: #002200;">!=</span> <span style="color: #a61390;">nil</span><span style="color: #002200;">&#41;</span><span style="color: #002200;">&#123;</span>
		NSLog<span style="color: #002200;">&#40;</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"regionDidChangeAnimated"</span><span style="color: #002200;">&#41;</span>;
&nbsp;
		currentAnnotationView.hidden <span style="color: #002200;">=</span> <span style="color: #a61390;">NO</span>;
		<span style="color: #002200;">&#91;</span>currentAnnotationView regionChanged<span style="color: #002200;">&#93;</span>;
	<span style="color: #002200;">&#125;</span>
<span style="color: #002200;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #002200;">-</span><span style="color: #002200;">&#40;</span><span style="color: #a61390;">void</span><span style="color: #002200;">&#41;</span> regionChanged
<span style="color: #002200;">&#123;</span>
	NSLog<span style="color: #002200;">&#40;</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"Region Changed"</span><span style="color: #002200;">&#41;</span>;
&nbsp;
	<span style="color: #11740a; font-style: italic;">// move the internal line view. </span>
	CGPoint origin <span style="color: #002200;">=</span> CGPointMake<span style="color: #002200;">&#40;</span><span style="color: #2400d9;"></span>, <span style="color: #2400d9;"></span><span style="color: #002200;">&#41;</span>;
	origin <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>_mapView convertPoint<span style="color: #002200;">:</span>origin toView<span style="color: #002200;">:</span>self<span style="color: #002200;">&#93;</span>;
&nbsp;
	_internalView.frame <span style="color: #002200;">=</span> CGRectMake<span style="color: #002200;">&#40;</span>origin.x, origin.y, _mapView.frame.size.width, _mapView.frame.size.height<span style="color: #002200;">&#41;</span>;
	<span style="color: #002200;">&#91;</span>_internalView setNeedsDisplay<span style="color: #002200;">&#93;</span>;
&nbsp;
<span style="color: #002200;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

The resulting image is now:  
<img src="/images/2009/10/polygon_small_on_top_of_mapview.png" alt="polygon_small_on_top_of_mapview.png" border="0" width="250" height="372" />

(Download the [DrawMap.zip][3] code.) &#8211; old. This is for iOS < 4

 [1]: /images/2010/08/DrawMap2.zip "DrawMap2.zip"
 [2]: http://spitzkoff.com/craig/?p=108
 [3]: /images/2009/10/DrawMap.zip "DrawMap.zip"