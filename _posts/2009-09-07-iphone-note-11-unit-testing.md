---
title: 'iPhone Note #11: Unit Testing'
author: rupert
layout: post
permalink: /2009/09/iphone-note-11-unit-testing/
categories:
  - iphone
tags:
  - iphone
---
Test first, develop later! That&#8217;s the greeting when you visit [OCUnit][1], similar to JUnit. Note that for this tutorial, you do not need to install OCUnit as it comes &#8220;built-in&#8221; in XCode as of v2.1.

1. Create a new iPhone Window-based application project &#8220;SampleTest&#8221;.

2. Our subject for testing is Converter.m which converts kilometers to meters. Let&#8217;s implement an incorrect conversion by specifying 1km = 100 meters (should be 1000 meters) so we can see that the unit test captures it below&#8230;

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #6e371a;">#import "Converter.h"</span>
&nbsp;
<span style="color: #a61390;">@implementation</span> Converter
&nbsp;
<span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">id</span><span style="color: #002200;">&#41;</span>init<span style="color: #002200;">&#123;</span>
	<span style="color: #a61390;">if</span><span style="color: #002200;">&#40;</span>self <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>super init<span style="color: #002200;">&#93;</span><span style="color: #002200;">&#41;</span><span style="color: #002200;">&#123;</span>
&nbsp;
	<span style="color: #002200;">&#125;</span>
	<span style="color: #a61390;">return</span> self;
<span style="color: #002200;">&#125;</span>
&nbsp;
<span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">int</span><span style="color: #002200;">&#41;</span>convertKilometersToMeters<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span><span style="color: #a61390;">int</span><span style="color: #002200;">&#41;</span>km<span style="color: #002200;">&#123;</span>
	<span style="color: #a61390;">return</span> km <span style="color: #002200;">*</span> <span style="color: #2400d9;">100</span>;
<span style="color: #002200;">&#125;</span>
&nbsp;
<span style="color: #a61390;">@end</span></pre>
      </td>
    </tr>
  </table>
</div>

3. Add another target &#8220;UnitTests&#8221;. Right click on Targets -> Add -> New Target&#8230; -> Choose Unit Test Bundle. 

<img src="/images/2009/09/unit-test-bundle.png" alt="unit-test-bundle.png" border="0" width="400" height="143" />

4. Name it &#8220;UnitTests&#8221;. After hitting submit, you will be presented with the project settings for &#8220;UnitTests&#8221;.

<img src="/images/2009/09/unit-test-name2.png" alt="unit-test-name2.png" border="0" width="200" height="90" />

5. Go to the General Tab -> Click on the &#8220;+&#8221; icon above &#8220;Linked Libraries&#8221;. Choose &#8220;SampleTest&#8221; as the application we have direct dependency with.

<img src="/images/2009/09/unit-test-dependency-3.png" alt="unit-test-dependency-3.png" border="0" width="300" height="452" />

6. Close the Settings. To check, navigate under &#8220;Groups &#038; Files&#8221; -> Targets. You should see the SampleTest Application Icon just below &#8220;UnitTests&#8221;.

<img src="/images/2009/09/unit-test-tree-4.png" alt="unit-test-tree-4.png" border="0" width="225" height="191" />

7. Right Click on &#8220;Sample Test&#8221; -> Add -> New File&#8230;

<img src="/images/2009/09/unit-test-class5.png" alt="unit-test-class5.png" border="0" width="400" height="300" />

8. Name the file &#8220;ConverterTest. Don&#8217;t forget to also create the header file (default). Specify it also in a different directory under &#8220;Location&#8221;. Then check the UnitTests as the &#8220;Targets&#8221;. When you hit &#8220;Finish&#8221; it will ask you to create the folder &#8220;Tests&#8221;

<img src="/images/2009/09/unit-test-class6.png" alt="unit-test-class6.png" border="0" width="400" height="294" />

Tip: Keep things organize and put it under a &#8220;Tests&#8221; Group. Right Click on &#8220;Sample Test&#8221; -> Add -> New Group&#8230; Name it &#8220;Tests&#8221;, then drag the files (ConverterTest.h and ConverterTest.m) into that group.

9. Open up ConverterTest.h and notice that &#8220;SenTestingKit.h&#8221; is already imported. Now let&#8217;s add method testKilometersToMeters as shown below. Test methods usually start out with a *test* prefix.

In the implementation, let&#8217;s import Converter.h and use STAssertTrue. To test the convertKilometersToMeters method, we are asserting that the result should be 1000. If not, then we should know! That is why we are writing a unit test for.. making sure that our implementation doesn&#8217;t break.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #6e371a;">#import "ConverterTest.h"</span>
<span style="color: #6e371a;">#import "Converter.h"</span>
&nbsp;
<span style="color: #a61390;">@implementation</span> ConverterTest
&nbsp;
<span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">void</span><span style="color: #002200;">&#41;</span>testKilometersToMeters<span style="color: #002200;">&#123;</span>
	<span style="color: #a61390;">int</span> km <span style="color: #002200;">=</span> <span style="color: #2400d9;">1</span>;
	Converter <span style="color: #002200;">*</span>converter <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span>Converter alloc<span style="color: #002200;">&#93;</span> init<span style="color: #002200;">&#93;</span>;
	<span style="color: #a61390;">int</span> meters <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>converter convertKilometersToMeters<span style="color: #002200;">:</span>km<span style="color: #002200;">&#93;</span>;
	STAssertTrue<span style="color: #002200;">&#40;</span>meters <span style="color: #002200;">==</span> <span style="color: #2400d9;">1000</span>, <span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"converting %d km to meters should equal 1000, instead received %d"</span>, km, meters<span style="color: #002200;">&#41;</span>;
<span style="color: #002200;">&#125;</span>
&nbsp;
<span style="color: #a61390;">@end</span></pre>
      </td>
    </tr>
  </table>
</div>

12. Now, before we build our target &#8220;UnitTests&#8221;, we need to include additional class references from our application. Drag Converter.m to the &#8220;Compile Sources&#8221; under UnitTests.

<img src="/images/2009/09/unit-test-drag7.png" alt="unit-test-drag7.png" border="0" width="147" height="400" />

13. Now we can build. There are many ways to do this. My preference is to do a clean build when testing. Right Click on Sample Test then choose &#8220;Clean SampleTest&#8221;. Afterwards choose &#8220;Build SampleTest&#8221;. 

<img src="/images/2009/09/unit-test-build8.png" alt="unit-test-build8.png" border="0" width="200" height="154" />

If you have a succesful build for SampleTest, lets do the same for our &#8220;UnitTests&#8221;.

<img src="/images/2009/09/unit-test-build9.png" alt="unit-test-build9.png" border="0" width="230" height="236" />

13. Here&#8217;s the crux of it. Notice the *error* in your &#8220;Build Results&#8221;?

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="text" style="font-family:monospace;">/Users/rupert/projects/iphone/SampleTest/Tests/ConverterTest.m:18: error: -[ConverterTest testKilometersToMeters] : "meters == 1000" should be true. converting 1 km to meters should equal 1000, instead received 100</pre>
      </td>
    </tr>
  </table>
</div>

<img src="/images/2009/09/unit-test-results.png" alt="unit-test-results.png" border="0" width="400" height="422" />

Now changing the correct implementation of convertKilometersToMeters will put the error away and you will have a successful build.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">int</span><span style="color: #002200;">&#41;</span>convertKilometersToMeters<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span><span style="color: #a61390;">int</span><span style="color: #002200;">&#41;</span>km<span style="color: #002200;">&#123;</span>
	<span style="color: #a61390;">return</span> km <span style="color: #002200;">*</span> <span style="color: #2400d9;">1000</span>;
<span style="color: #002200;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

14. Look up the assert methods from SenTest.h.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #6e371a;">#import &lt;Foundation/NSObject.h&gt;</span>
<span style="color: #6e371a;">#import "SenTest.h"</span>
&nbsp;
<span style="color: #6e371a;">#define STAssertNil(a1, description, ...)</span>
<span style="color: #6e371a;">#define STAssertNotNil(a1, description, ...)</span>
<span style="color: #6e371a;">#define STAssertTrue(expression, description, ...)</span>
<span style="color: #6e371a;">#define STAssertFalse(expression, description, ...)</span>
<span style="color: #6e371a;">#define STAssertEqualObjects(a1, a2, description, ...)</span>
<span style="color: #6e371a;">#define STAssertEquals(a1, a2, description, ...)</span>
<span style="color: #6e371a;">#define STAssertEqualsWithAccuracy(left, right, accuracy, description, ...)</span>
<span style="color: #6e371a;">#define STAssertFalseNoThrow(expression, description, ...)</span>
....</pre>
      </td>
    </tr>
  </table>
</div>

References:

<http://developer.apple.com/mac/library/documentation/DeveloperTools/Conceptual/UnitTesting/Articles/CreatingTests.html>

<http://developer.apple.com/tools/unittest.html>

Download: [SampleTest.zip][2]

 [1]: http://www.sente.ch/software/ocunit/
 [2]: /images/2009/09/SampleTest.zip "SampleTest.zip"