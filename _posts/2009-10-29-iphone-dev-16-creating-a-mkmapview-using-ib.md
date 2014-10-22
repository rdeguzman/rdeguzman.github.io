---
title: 'iPhone Note #16: Creating a MKMapView using IB'
author: rupert
layout: post
permalink: /2009/10/iphone-dev-16-creating-a-mkmapview-using-ib/
categories:
  - iphone
tags:
  - iphone
---
In this tutorial we will be addking MKMapView using IB to a ViewController.

1. XCode -> File -> New Project -> View-based Application.

Name the project &#8220;SimpleMapIB&#8221;

2. Make sure everything works out accordingly before doing anything. Let&#8217;s test from the iPhone Simulator. Click on **&#8220;Build and Go&#8221;**. You should see the iPhone Simulator running with a gray background. Bring up the Debugger Console (XCode -> Run -> Console) as well and it should be free from errors.

3. Now double-click on &#8220;SimpleMapIBViewController.xib&#8221;, it should open in Interface Builder.

4. Drag a UIToolbar to the bottom. We will use the button as a GPS in our next tutorial.

5. Drag MKMapView to the middle of the screen.

6. IB -> save

7. Now we need to reference Mapkit. Go to XCode -> Project -> Edit Active Target &#8220;SimpleMapIB&#8221;. Click the + icon on the bottom left, choose MapKit.framework, then &#8220;Add&#8221;. 

<img src="/images/2009/10/SimpleMapIB-1.png" alt="SimpleMapIB-1.png" border="0" width="400" height="421" />

You should see Mapkit added to the frameworks. 

<img src="/images/2009/10/SimpleMapIB-2.png" alt="SimpleMapIB-2.png" border="0" width="207" height="105" />

You could also organize XCode&#8217;s left panel by dragging &#8220;MapKit.framework&#8221; to the Frameworks Group.

<img src="/images/2009/10/SimpleMapIB-3.png" alt="SimpleMapIB-3.png" border="0" width="227" height="132" />

7. Let&#8217;s code SimpleMapIBViewController.h

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #6e371a;">#import &lt;UIKit/UIKit.h&gt;</span>
<span style="color: #6e371a;">#import &lt;MapKit/MapKit.h&gt;</span>
&nbsp;
<span style="color: #a61390;">@interface</span> SimpleMapIBViewController <span style="color: #002200;">:</span> UIViewController <span style="color: #002200;">&#123;</span>
	IBOutlet MKMapView <span style="color: #002200;">*</span>mapview;
<span style="color: #002200;">&#125;</span>
&nbsp;
<span style="color: #a61390;">@property</span><span style="color: #002200;">&#40;</span>nonatomic, retain<span style="color: #002200;">&#41;</span> IBOutlet MKMapView <span style="color: #002200;">*</span>mapview;
&nbsp;
<span style="color: #a61390;">@end</span></pre>
      </td>
    </tr>
  </table>
</div>

8. Now back to IB. Click on the &#8220;File&#8217;s Owner&#8221; and you should see your outlets displayed &#8220;Connections Inspector&#8221;. Drag &#8220;mapview&#8221; to MKMapView Control.

[  
<img src="/images/2009/10/SimpleMapIB-4-sm.png" alt="SimpleMapIB-4-sm.png" border="0" width="300" height="333" />][1]  
*Note: You can click for a bigger image.*

9. Now to set &#8220;SimpleMapIBViewController&#8221; as the delegate. Click on the MKMapView, it should be highlighted and in the &#8220;Connections Inspector&#8221; notice the &#8220;delegate&#8221; come out in the Outlets. Drag it to the &#8220;Files Owner&#8221; to set &#8220;SimpleMapIBViewController&#8221; as the delegate.

<a href="/images/2009/10/SimpleMapIB-5.png" alt="SimpleMapIB-5.png"><img src="/images/2009/10/SimpleMapIB-5-sm.png" alt="SimpleMapIB-5-sm.png" border="0" width="300" height="336" /></a>  
*Note: You can click for a bigger image.*

10. Now, let&#8217;s test. Hit &#8220;Clean All&#8221; then &#8220;Build and Go&#8221;. You should see something like this..

<img src="/images/2009/10/SimpleMapIB-6.png" alt="SimpleMapIB-6.png" border="0" width="150" height="225" />

11. Now to test that the delegate is setup accordingly, we can code on the viewDidLoad.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">void</span><span style="color: #002200;">&#41;</span>viewDidLoad <span style="color: #002200;">&#123;</span>
    mapview.mapType <span style="color: #002200;">=</span> MKMapTypeSatellite;
&nbsp;
	<span style="color: #002200;">&#91;</span>super viewDidLoad<span style="color: #002200;">&#93;</span>;
<span style="color: #002200;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

12, Now press command-Y for &#8220;Build and Debug&#8221;. We should see a satellite map instead.  
<img src="/images/2009/10/SimpleMapIB-7.png" alt="SimpleMapIB-7.png" border="0" width="150" height="226" />

13. That seems a little bit dull, lets add a segmented control so we can switch between maptypes (standard, satellite, hybrid). In IB, drag a UISegmentedControl in the UIToolbar at the bottom. Add another segment, making a total of three. Then change the titles to &#8220;Normal&#8221;, &#8220;Sat&#8221;, &#8220;Hybrid&#8221; respectively.

<img src="/images/2009/10/SimpleMapIB-8.png" alt="SimpleMapIB-8.png" border="0" width="250" height="389" />.

14. Let&#8217;s code. In the interface, we need to add a method that would be called by the segmentedControl whened the values changed.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #6e371a;">#import &lt;UIKit/UIKit.h&gt;</span>
<span style="color: #6e371a;">#import &lt;MapKit/MapKit.h&gt;</span>
&nbsp;
<span style="color: #a61390;">@interface</span> SimpleMapIBViewController <span style="color: #002200;">:</span> UIViewController <span style="color: #002200;">&#123;</span>
	IBOutlet MKMapView <span style="color: #002200;">*</span>mapview;
	IBOutlet UISegmentedControl <span style="color: #002200;">*</span>segmentedControlMapType;
<span style="color: #002200;">&#125;</span>
&nbsp;
<span style="color: #a61390;">@property</span><span style="color: #002200;">&#40;</span>nonatomic, retain<span style="color: #002200;">&#41;</span> IBOutlet MKMapView <span style="color: #002200;">*</span>mapview;
<span style="color: #a61390;">@property</span><span style="color: #002200;">&#40;</span>nonatomic, retain<span style="color: #002200;">&#41;</span> IBOutlet UISegmentedControl <span style="color: #002200;">*</span>segmentedControlMapType;
&nbsp;
<span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span>IBAction<span style="color: #002200;">&#41;</span>changeMapType<span style="color: #002200;">:</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">id</span><span style="color: #002200;">&#41;</span>sender;
&nbsp;
<span style="color: #a61390;">@end</span></pre>
      </td>
    </tr>
  </table>
</div>

Now in IB, click on the &#8220;File&#8217;s Owner&#8221; and you should see your outlets displayed &#8220;Connections Inspector&#8221;. Drag &#8220;segmentedControlMapType&#8221; to the segmented control just like what we did for mapview.

15. In the implementation, we can switch between the segmentIndex and display the corresponding MKMapType.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span>IBAction<span style="color: #002200;">&#41;</span>changeMapType<span style="color: #002200;">:</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">id</span><span style="color: #002200;">&#41;</span>sender<span style="color: #002200;">&#123;</span>
	<span style="color: #a61390;">if</span><span style="color: #002200;">&#40;</span>segmentedControlMapType.selectedSegmentIndex <span style="color: #002200;">==</span> <span style="color: #2400d9;"></span><span style="color: #002200;">&#41;</span><span style="color: #002200;">&#123;</span>
		mapview.mapType <span style="color: #002200;">=</span> MKMapTypeStandard;
	<span style="color: #002200;">&#125;</span>
	<span style="color: #a61390;">else</span> <span style="color: #a61390;">if</span><span style="color: #002200;">&#40;</span>segmentedControlMapType.selectedSegmentIndex <span style="color: #002200;">==</span> <span style="color: #2400d9;">1</span><span style="color: #002200;">&#41;</span><span style="color: #002200;">&#123;</span>
		mapview.mapType <span style="color: #002200;">=</span> MKMapTypeSatellite;
	<span style="color: #002200;">&#125;</span>
	<span style="color: #a61390;">else</span> <span style="color: #a61390;">if</span><span style="color: #002200;">&#40;</span>segmentedControlMapType.selectedSegmentIndex <span style="color: #002200;">==</span> <span style="color: #2400d9;">2</span><span style="color: #002200;">&#41;</span><span style="color: #002200;">&#123;</span>
		mapview.mapType <span style="color: #002200;">=</span> MKMapTypeHybrid;
	<span style="color: #002200;">&#125;</span>
&nbsp;
<span style="color: #002200;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

16. Now to hook the IBAction of the UISegmentedControl to the method. In IB, click on the segmented control and in the &#8220;Connections Inspector&#8221;, drag the &#8220;Value Changed&#8221; Event to the &#8220;File&#8217;s Owner&#8221; and choose &#8220;changeMapType&#8221;.

<a href="<img src="/images/2009/10/SimpleMapIB-9.png" alt="SimpleMapIB-9.png" border="0" width="600" height="675" />&#8220;><img src="/images/2009/10/SimpleMapIB-9-sm.png" alt="SimpleMapIB-9-sm.png" border="0" width="300" height="338" /></a>

17. Now test in the simulator again and the hybrid button should work.  
<img src="/images/2009/10/SimpleMapIB-10.png" alt="SimpleMapIB-10.png" border="0" width="323" height="480" />

[Download SimpleMapIB.zip][2]

In my next tutorial, I would be hooking up a GPS button which handles location updates using CoreLocation.

 [1]: /images/2009/10/SimpleMapIB-4.png
 [2]: /images/2009/10/SimpleMapIB.zip "SimpleMapIB.zip"