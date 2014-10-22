---
title: 'iPhone Note #13: Drawing Point, Line, Polygon on top of MKMapview'
author: rupert
layout: post
permalink: /2009/09/iphone-devnote-13-drawing-point-line-polygon-on-top-of-mkmapview/
categories:
  - iphone
tags:
  - iphone
---
Now I have a reason to study Quartz2D! I am trying to draw a point, line and polygon on top of MKMapview. I will list below important links for reference:

1. Always use Apple&#8217;s [iPhone OS Reference Library Documentation.][1]. Under &#8220;Topics&#8221; > &#8220;Graphics &#038; Animation&#8221; you will find a lot of references, guides and sample code.

2. Start out with the [Getting Started with Graphics and Animation. ]() Note, if you ever read the line below and try to find Finger Sketch, please drop me a comment. I could not find it anywhere!

> <cite>&#8220;Next, examine the Finger Sketch sample code in Xcode.&#8221;</cite>

3. [iPhone Application Programming Guide: Graphics and Drawing][2].

4. Note: I haven&#8217;t read everything on [Quartz 2D Programming Guide][3], but I went straight to the *Paths* Section.

5. Lets look at some sample codes, especially the QuartzDemo.

6. Now, I presume you know IB, add a MKMapView and a UIToolbar at the bottom. Add four UIBarButtonItems for: Map, Point, Line, Polygon. Set MKMapView&#8217;s delegate to the File&#8217;s Owner. Hook up the UIBarButtonItem IBOutlets to your buttons, so we can change the appearance of the buttons when pressed. Lastly, hook up our IBAction methods for each button.

The Map button allows to pan/zoom on the Map. If any of the three geometry buttons (PT, LN, PG) is pressed, we unhide the GeometryView(which is a UIView) to allow touchEvents to proceed.

TO DO: Watch out for this segment as I will update it with code later.

7. Now to draw a line, we implement the code below in our GeometryView.drawRect method. As we loop through each Pin, we add a line to the point. Afterwards, we stroke the path, thus drawing the lines.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;">CGContextRef context <span style="color: #002200;">=</span> UIGraphicsGetCurrentContext<span style="color: #002200;">&#40;</span><span style="color: #002200;">&#41;</span>;
&nbsp;
<span style="color: #11740a; font-style: italic;">// Drawing lines with a white stroke color</span>
CGContextSetRGBStrokeColor<span style="color: #002200;">&#40;</span>context, <span style="color: #2400d9;">1.0</span>, <span style="color: #2400d9;">1.0</span>, <span style="color: #2400d9;">1.0</span>, <span style="color: #2400d9;">1.0</span><span style="color: #002200;">&#41;</span>;
&nbsp;
<span style="color: #11740a; font-style: italic;">// Draw them with a 2.0 stroke width so they are a bit more visible.</span>
CGContextSetLineWidth<span style="color: #002200;">&#40;</span>context, <span style="color: #2400d9;">2.0</span><span style="color: #002200;">&#41;</span>;
&nbsp;
<span style="color: #a61390;">if</span><span style="color: #002200;">&#40;</span> <span style="color: #002200;">&#91;</span>pinFactory actualPinCount<span style="color: #002200;">&#93;</span> &gt; <span style="color: #2400d9;">1</span><span style="color: #002200;">&#41;</span><span style="color: #002200;">&#123;</span>
&nbsp;
	Pin <span style="color: #002200;">*</span>pin1 <span style="color: #002200;">=</span> <span style="color: #002200;">&#40;</span>Pin <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span><span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span>pinFactory pinArray<span style="color: #002200;">&#93;</span> objectAtIndex<span style="color: #002200;">:</span><span style="color: #2400d9;"></span><span style="color: #002200;">&#93;</span>;
	CGPoint pt1 <span style="color: #002200;">=</span> pin1.touchLocation;
	CGContextMoveToPoint<span style="color: #002200;">&#40;</span>context, pt1.x, pt1.y<span style="color: #002200;">&#41;</span>;
&nbsp;
	<span style="color: #a61390;">for</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">int</span> i <span style="color: #002200;">=</span> <span style="color: #2400d9;">1</span>; i &lt; <span style="color: #002200;">&#40;</span><span style="color: #002200;">&#91;</span>pinFactory actualPinCount<span style="color: #002200;">&#93;</span><span style="color: #002200;">&#41;</span>; i<span style="color: #002200;">++</span><span style="color: #002200;">&#41;</span>
	<span style="color: #002200;">&#123;</span>
		Pin <span style="color: #002200;">*</span>pin2 <span style="color: #002200;">=</span> <span style="color: #002200;">&#40;</span>Pin <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span><span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span>pinFactory pinArray<span style="color: #002200;">&#93;</span> objectAtIndex<span style="color: #002200;">:</span>i<span style="color: #002200;">&#93;</span>;
		CGPoint pt2 <span style="color: #002200;">=</span> pin2.touchLocation;
		CGContextAddLineToPoint<span style="color: #002200;">&#40;</span>context, pt2.x, pt2.y<span style="color: #002200;">&#41;</span>;
	<span style="color: #002200;">&#125;</span>
&nbsp;
	CGContextStrokePath<span style="color: #002200;">&#40;</span>context<span style="color: #002200;">&#41;</span>;
<span style="color: #002200;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

<img src="/images/2009/09/line.png" alt="line.png" border="0" width="320" height="481" />

8. To draw a polygon, we close the path of lines then fill the polygon.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;">CGContextClosePath<span style="color: #002200;">&#40;</span>context<span style="color: #002200;">&#41;</span>;
&nbsp;
CGContextDrawPath<span style="color: #002200;">&#40;</span>context, kCGPathFillStroke<span style="color: #002200;">&#41;</span>;</pre>
      </td>
    </tr>
  </table>
</div>

<img src="/images/2009/09/poly.png" alt="poly.png" border="0" width="320" height="481" />

Note: I&#8217;ll try to post the sample code when I have time. I&#8217;m trying to minimize blogging to 10 mins per post as my work tasks/personal development tasks is piling up&#8230;

 [1]: http://developer.apple.com/iphone/library/navigation/index.html
 [2]: http://developer.apple.com/iphone/library/documentation/iPhone/Conceptual/iPhoneOSProgrammingGuide/GraphicsandDrawing/GraphicsandDrawing.html#//apple_ref/doc/uid/TP40007072-CH10-SW1
 [3]: http://developer.apple.com/iphone/library/documentation/GraphicsImaging/Conceptual/drawingwithquartz2d/Introduction/Introduction.html