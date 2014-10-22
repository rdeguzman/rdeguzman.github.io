---
title: 'iPhone Note #19: Route-Me: Opensource mapping for the iphone'
author: rupert
layout: post
permalink: /2009/12/iphone-dev-note-19-route-me-opensource-mapping-for-the-iphone/
categories:
  - iphone
tags:
  - iphone
---
Route-Me is an opensource mapping api similar to the MapKit.framework. The main project resides in googlecode (<http://code.google.com/p/route-me/>).

### Part 1: Making the Sample Apps work.

1. Download the code from svn.  
svn co http://route-me.googlecode.com/svn/trunk/ route-me

2. In the route-me directory, you would have 3 directories:  
&#8211; MapView &#8211; this contains the mapping framework  
&#8211; Proj4 &#8211; projection library.  
&#8211; samples

3. Build MapView. I encountered some problems here, particularly this specific [issue: Cannot build on 3.1 using iphone simulator][1]. 

**How to make the build?** Now, at the time of this writing, I have XCode3.1.4 and iPhone 3.0, 3.1, 3.1.2. Edit the project settings so that the &#8220;build&#8221; and &#8220;release&#8221; will point to use 3.0. If you encounter a problem, it is best to &#8220;Clean All&#8221;, remove the build directory, then &#8220;Build&#8221; again. To verfiy if you have a successful build, notice that libMapView.a was created.

<img src="/images/2009/12/routeme-libMapView.png" alt="routeme-libMapView.png" border="0" width="274" height="218" />

Note: Notice here that I have **libMapView.a** both in *Debug-iphoneos/* and *Debug-iphonesimulator/*

No need to build Proj4 as long as it is sitting on the same directory where MapView is. 

4. To test route-me, we can study from the samples directory. Let&#8217;s build samples/SampleMap. Notice that SampleMap has a reference to MapView.xcodeproj. 

<img src="/images/2009/12/routeme-samplemap.png" alt="routeme-samplemap.png" border="0" width="179" height="102" />

Similarly, we can build this using 3.0 both in the simulator and device.

<img src="/images/2009/12/routeme-samplemap-ok.jpg" alt="routeme-samplemap-ok.jpg" border="0" width="161" height="243" />

### Part 2: Integrating with your own project.

Reference: <http://code.google.com/p/route-me/wiki/EmbeddingGuide>

1. Create a view-based project: MyRMSampleMap. 

2. Project -> &#8220;Add To Project&#8221;. Make the reference type as &#8220;Relative to Project&#8221;.

<img src="/images/2009/12/routeme-referencing-mapview.jpg" alt="routeme-referencing-mapview.jpg" border="0" width="250" height="233" />

3. Configure your project to have a direct dependency with MapView.xcodeproj. Follow the instructions exactly as stated from the EmbeddingGuide.

<img src="/images/2009/12/routeme-ref-dd.jpg" alt="routeme-ref-dd.jpg" border="0" width="275" height="417" />

> Click on the &#8220;Build&#8221; tab in your target&#8217;s info window.
> 
> Change the Configuration popup to read &#8220;All Configurations&#8221;, so that your changes can be made just once.
> 
> Find &#8220;Header Search Paths&#8221; under &#8220;Search Paths&#8221; (shortcut: type &#8220;header&#8221; in the search box at upper right of the target info window). Double-click on the &#8216;Header Search Paths&#8217; text and add the path to the MapView directory contained in the route-me project located on your file system. (Note that if there are any spaces in the path, enclose the entire entry with &#8220;&#8221;. If the MapView project folder is placed next to your project&#8217;s project folder on the file system, you would have the following in the path: &#8220;../MapView&#8221;.
> 
> Check the &#8216;Recursive&#8217; box and click Ok. 

<img src="/images/2009/12/routeme-searchpaths.jpg" alt="routeme-searchpaths.jpg" border="0" width="400" height="205" />

4. Make a test &#8220;Build&#8221;.

5. Add a reference to:  
&#8211; QuartzCore.framework  
&#8211; libsqlite3.dylib

6. Let&#8217;s add our mapview in the interface: MyRMSampleMapViewController.h

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #6e371a;">#import &lt;UIKit/UIKit.h&gt;</span>
<span style="color: #6e371a;">#import "RMMapView.h"</span>
&nbsp;
<span style="color: #a61390;">@interface</span> MyRMSampleMapViewController <span style="color: #002200;">:</span> UIViewController <span style="color: #002200;">&#123;</span>
	RMMapView <span style="color: #002200;">*</span>mapview;
<span style="color: #002200;">&#125;</span>
&nbsp;
<span style="color: #a61390;">@property</span><span style="color: #002200;">&#40;</span>nonatomic, retain<span style="color: #002200;">&#41;</span> RMMapView <span style="color: #002200;">*</span>mapview;
&nbsp;
<span style="color: #a61390;">@end</span></pre>
      </td>
    </tr>
  </table>
</div>

7. In the implementation, add this snippet.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #a61390;">@synthesize</span> mapview;
...
<span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">void</span><span style="color: #002200;">&#41;</span>viewWillAppear<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span><span style="color: #a61390;">BOOL</span><span style="color: #002200;">&#41;</span>animated<span style="color: #002200;">&#123;</span>
	mapview <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span>RMMapView alloc<span style="color: #002200;">&#93;</span> initWithFrame<span style="color: #002200;">:</span>CGRectMake<span style="color: #002200;">&#40;</span>0.0f, 0.0f, 320.0f, 460.0f<span style="color: #002200;">&#41;</span><span style="color: #002200;">&#93;</span>;
	<span style="color: #002200;">&#91;</span>mapview setBackgroundColor<span style="color: #002200;">:</span><span style="color: #002200;">&#91;</span>UIColor blackColor<span style="color: #002200;">&#93;</span><span style="color: #002200;">&#93;</span>;
&nbsp;
	<span style="color: #002200;">&#91;</span>self.view addSubview<span style="color: #002200;">:</span>mapview<span style="color: #002200;">&#93;</span>;
<span style="color: #002200;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

Download: [MyRMSampleMap.zip][2]

 [1]: http://code.google.com/p/route-me/issues/detail?id=114
 [2]: /images/2009/12/MyRMSampleMap.zip "MyRMSampleMap.zip"