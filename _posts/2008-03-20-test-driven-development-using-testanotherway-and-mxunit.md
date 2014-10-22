---
title: Test Driven Development using Test.AnotherWay and mxUnit
author: rupert
layout: post
permalink: /2008/03/test-driven-development-using-testanotherway-and-mxunit/
categories:
  - javascript
tags:
  - javascript
---
Time and time again, I have debugging bugs and redeveloping code which some I wrote but mostly done by others as well. Experience is still my best teacher in web development and I believe it would be a heavier burden later on if we continuously pursue rapid development without any testing at all.

You may have heard of writing test cases before diving into code which is well known as Test Driven Development. This methodology has been widely adapted in programming (Java thru JUnit, etc). Following Kent Beck&#8217;s Test Driven Development (TDD) we will follow this simple method:

1.  Write the test *first*
2.  Watch the test fail
3.  Write the component
4.  Watch the test pass

<!--more-->

  
A. [Test.AnotherWay.][1] With the emerging trend in web development including javascript, I need a similar aproach which makes development consistent and debugging easier for the client/front-end. Since I&#8217;ve been doing mostly web mapping, I have adapted a testing methodology from OpenLayers which is practical but effective.

1. Read [Test.AnotherWay Documentation][1]

2. Download [Test.AnotherWay-0.51.tar.gz][2]

3. Let&#8217;s say my application is called **myproject**. Create a *test* folder under **myproject**.

4. Copy run-tests.html, list-tests.html into **myproject**/*test*. Don&#8217;t be surprised if you can&#8217;t find list-tests.html in Test.AnotherWay.

5. Writing the tests. To add a test, you should add it on **list-tests.html**. Test files should be named beginning with test_. For example, *test_index.html  
*

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="javascript" style="font-family:monospace;">    <span style="color: #000066; font-weight: bold;">function</span> test_Map<span style="color: #009900;">&#40;</span>t<span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
        t.<span style="color: #660066;">plan</span><span style="color: #009900;">&#40;</span><span style="color: #CC0000;">3</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
		<span style="color: #006600; font-style: italic;">//this should go to the Application\\'s Global Settings</span>
    	<span style="color: #000066; font-weight: bold;">var</span> baselayer <span style="color: #339933;">=</span> CS.<span style="color: #660066;">globals</span>.<span style="color: #660066;">baselayer</span><span style="color: #339933;">;</span>
&nbsp;
		<span style="color: #006600; font-style: italic;">//this should go to the Application\\'s Global Settings</span>
		<span style="color: #000066; font-weight: bold;">var</span> options <span style="color: #339933;">=</span> CS.<span style="color: #660066;">globals</span>.<span style="color: #660066;">options</span><span style="color: #339933;">;</span>		
&nbsp;
		map <span style="color: #339933;">=</span> <span style="color: #000066; font-weight: bold;">new</span> CS.<span style="color: #660066;">Map</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">"div-map"</span><span style="color: #339933;">,</span> baselayer<span style="color: #339933;">,</span> options<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>	<span style="color: #006600; font-style: italic;">// default options was set</span>
		t.<span style="color: #660066;">eq</span><span style="color: #009900;">&#40;</span>map.<span style="color: #660066;">getMap</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span>.<span style="color: #660066;">CLASS_NAME</span><span style="color: #339933;">,</span> <span style="color: #3366CC;">"OpenLayers.Map"</span><span style="color: #339933;">,</span> <span style="color: #3366CC;">"map object created successful"</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
		layerPlaces <span style="color: #339933;">=</span> <span style="color: #000066; font-weight: bold;">new</span> CS.<span style="color: #660066;">VectorLayer</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">"Places Layer"</span><span style="color: #339933;">,</span> options<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
		t.<span style="color: #660066;">eq</span><span style="color: #009900;">&#40;</span>layerPlaces.<span style="color: #660066;">getLayer</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span>.<span style="color: #660066;">CLASS_NAME</span><span style="color: #339933;">,</span> <span style="color: #3366CC;">"OpenLayers.Layer.Vector"</span><span style="color: #339933;">,</span> <span style="color: #3366CC;">"vector layer created successfully"</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
		map.<span style="color: #660066;">addVectorLayer</span><span style="color: #009900;">&#40;</span>layerPlaces<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
		selectControl <span style="color: #339933;">=</span> layerPlaces.<span style="color: #660066;">getSelectControl</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
		t.<span style="color: #660066;">eq</span><span style="color: #009900;">&#40;</span>selectControl.<span style="color: #660066;">CLASS_NAME</span><span style="color: #339933;">,</span> <span style="color: #3366CC;">"OpenLayers.Control.SelectFeature"</span><span style="color: #339933;">,</span> <span style="color: #3366CC;">"selectFeatureControl added successfully"</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
    <span style="color: #009900;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

B. For the server side, particularly ColdFusion, I have been using [mxunit.org][3] upon following [Sean Corfield&#8217;s blog post regarding ColdFusion Unit Testing.][4]

1. Download from <mxunit.org>

2. Extract to your webroot

3. Write your testcase as a cfc.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="javascript" style="font-family:monospace;"><span style="color: #000066; font-weight: bold;">var</span> metaName <span style="color: #339933;">=</span> <span style="color: #3366CC;">"gao li wu"</span><span style="color: #339933;">;</span>
<span style="color: #000066; font-weight: bold;">var</span> search <span style="color: #339933;">=</span> createObject<span style="color: #009900;">&#40;</span><span style="color: #3366CC;">"component"</span><span style="color: #339933;">,</span><span style="color: #3366CC;">"platform.svc.search.GeoSearch"</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
search.<span style="color: #660066;">setDSN</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">'beijing_app'</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
search.<span style="color: #660066;">setMetaName</span><span style="color: #009900;">&#40;</span>metaName<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
actual <span style="color: #339933;">=</span> search.<span style="color: #660066;">getMetaName</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
assertEquals<span style="color: #009900;">&#40;</span>actual<span style="color: #339933;">,</span>metaName<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span></pre>
      </td>
    </tr>
  </table>
</div>

Notes:  
1. You can **show the cfdump on the test case iff the test-case passed**. If your test-case *fails*, then you need to **comment** the assertion first so you could see the cfdump. Inserting cfdump (commented or not) is a convenient way to debug your CFM.

2. You can chain test cases by calling the related functions. This is very useful when you are doing a short-circuit test.

 [1]: http://straytree.com/TestAnotherWay/doc/index.html
 [2]: http://straytree.com/TestAnotherWay/download/Test.AnotherWay-0.51.tar.gz
 [3]: http://mxunit.org/doc/index.cfm
 [4]: http://corfield.org/blog/index.cfm/do/blog.entry/entry/MXUnit