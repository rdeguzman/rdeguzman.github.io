---
title: iPhone Quick Dev Notes
author: rupert
layout: post
permalink: /2009/08/iphone-quick-tip-1transparent-uilabel/
delicious:
  - 's:78:"a:3:{s:5:"count";s:1:"0";s:9:"post_tags";s:0:"";s:4:"time";s:10:"1250031506";}";'
reddit:
  - 's:55:"a:2:{s:5:"count";s:1:"0";s:4:"time";s:10:"1250031507";}";'
categories:
  - iphone
tags:
  - iphone
---
### UITableView

**1. Disable highlighted cell**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;">cell.selectionStyle <span style="color: #002200;">=</span> UITableViewCellSelectionStyleNone; 
&nbsp;
<span style="color: #002200;">-</span> or <span style="color: #002200;">-</span>
&nbsp;
<span style="color: #002200;">&#91;</span>self.tableView deselectRowAtIndexPath<span style="color: #002200;">:</span>indexPath animated<span style="color: #002200;">:</span><span style="color: #a61390;">NO</span><span style="color: #002200;">&#93;</span>;</pre>
      </td>
    </tr>
  </table>
</div>

### UI

**1. Transparent UILabel**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;">myLabel.backgroundColor <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>UIColor clearColor<span style="color: #002200;">&#93;</span>;</pre>
      </td>
    </tr>
  </table>
</div>

**2. Resizing an Image**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;">CGRect rect <span style="color: #002200;">=</span> CGRectMake<span style="color: #002200;">&#40;</span>0.0f, 0.0f, 320.0f, 460.0f<span style="color: #002200;">&#41;</span>;
UIGraphicsBeginImageContext<span style="color: #002200;">&#40;</span>CGSizeMake<span style="color: #002200;">&#40;</span>320.0f, 460.0f<span style="color: #002200;">&#41;</span><span style="color: #002200;">&#41;</span>;
<span style="color: #002200;">&#91;</span>image drawInRect<span style="color: #002200;">:</span>rect<span style="color: #002200;">&#93;</span>;
UIImage <span style="color: #002200;">*</span>newImage <span style="color: #002200;">=</span> UIGraphicsGetImageFromCurrentImageContext<span style="color: #002200;">&#40;</span><span style="color: #002200;">&#41;</span>;
UIGraphicsEndImageContext<span style="color: #002200;">&#40;</span><span style="color: #002200;">&#41;</span>;</pre>
      </td>
    </tr>
  </table>
</div>

### Strings

**1. Trimming**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span>strResponseTrimmed <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>strResponse stringByTrimmingCharactersInSet<span style="color: #002200;">:</span> 
<span style="color: #002200;">&#91;</span><span style="color: #400080;">NSCharacterSet</span> whitespaceAndNewlineCharacterSet<span style="color: #002200;">&#93;</span><span style="color: #002200;">&#93;</span>;</pre>
      </td>
    </tr>
  </table>
</div>

**2. Escaping &#8216;%&#8217;.**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;">Use <span style="color: #bf1d1a;">'%%'</span>
&nbsp;
<span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span>sqlString <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #400080;">NSString</span> stringWithFormat<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"SELECT poi_id, en_name FROM poi WHERE Upper(en_name) LIKE '%%%@%%' LIMIT 100"</span>, text<span style="color: #002200;">&#93;</span>;</pre>
      </td>
    </tr>
  </table>
</div>

**3. Escaping for URL**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span>bodyDirty <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #400080;">NSString</span> stringWithFormat<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"%@ %@ %@ %@ %@ %@"</span>, poi.en_name, poi.en_fullpoiadd, poi.py_fullpoiadd, poi.tel_no, poi.fax_no, poi.email<span style="color: #002200;">&#93;</span>;
<span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span>bodyClean <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>bodyDirty stringByAddingPercentEscapesUsingEncoding<span style="color: #002200;">:</span>NSUTF8StringEncoding<span style="color: #002200;">&#93;</span>;</pre>
      </td>
    </tr>
  </table>
</div>

### Date

**1. Current Date**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span>timestamp <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #400080;">NSString</span> stringWithFormat<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"%0.0f"</span>, <span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span><span style="color: #400080;">NSDate</span> date<span style="color: #002200;">&#93;</span> timeIntervalSince1970<span style="color: #002200;">&#93;</span><span style="color: #002200;">&#93;</span>;
&nbsp;
Or <span style="color: #a61390;">if</span> you want the unix <span style="color: #a61390;">time</span> as a <span style="color: #400080;">NSString</span> without decimals<span style="color: #002200;">:</span>
&nbsp;
<span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span>timestamp <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #400080;">NSString</span> stringWithFormat<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"%d"</span>, <span style="color: #002200;">&#40;</span><span style="color: #a61390;">long</span><span style="color: #002200;">&#41;</span><span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span><span style="color: #400080;">NSDate</span> date<span style="color: #002200;">&#93;</span> timeIntervalSince1970<span style="color: #002200;">&#93;</span><span style="color: #002200;">&#93;</span>;</pre>
      </td>
    </tr>
  </table>
</div>

### Debugging

**1. Using the static Clang Analyzer**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">scan-build <span style="color: #660033;">-k</span> <span style="color: #660033;">-V</span> xcodebuild <span style="color: #660033;">-configuration</span> Debug <span style="color: #660033;">-sdk</span> iphonesimulator3.1</pre>
      </td>
    </tr>
  </table>
</div>

**2. Always remove physically the files from the build directory when testing.**

**3. Where is the application bundle directory?**  
/Users/rupert/Library/Application Support/iPhone Simulator/User/Applications

### Misc

**1. Application Icon**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">Drop a Icon.png <span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000;">57</span> x <span style="color: #000000;">57</span> pixels<span style="color: #7a0874; font-weight: bold;">&#41;</span> <span style="color: #000000; font-weight: bold;">in</span> the project root directory.</pre>
      </td>
    </tr>
  </table>
</div>

**2. Calling safari to launch a URL**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span>UIApplication sharedApplication<span style="color: #002200;">&#93;</span> openURL<span style="color: #002200;">:</span><span style="color: #002200;">&#91;</span><span style="color: #400080;">NSURL</span> URLWithString<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"http://www.apple.com"</span><span style="color: #002200;">&#93;</span><span style="color: #002200;">&#93;</span>;</pre>
      </td>
    </tr>
  </table>
</div>

**3. Calling a number**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">void</span><span style="color: #002200;">&#41;</span>callNumber<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span><span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>_number<span style="color: #002200;">&#123;</span>
	<span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span>callToURLString <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #400080;">NSString</span> stringWithFormat<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"tel:+%@"</span>, _number<span style="color: #002200;">&#93;</span>;
	<span style="color: #a61390;">if</span> <span style="color: #002200;">&#40;</span><span style="color: #002200;">!</span><span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span>UIApplication sharedApplication<span style="color: #002200;">&#93;</span> openURL<span style="color: #002200;">:</span><span style="color: #002200;">&#91;</span><span style="color: #400080;">NSURL</span> URLWithString<span style="color: #002200;">:</span>callToURLString<span style="color: #002200;">&#93;</span><span style="color: #002200;">&#93;</span><span style="color: #002200;">&#41;</span>
	<span style="color: #002200;">&#123;</span>
		<span style="color: #11740a; font-style: italic;">// there was an error trying to open the URL. We'll ignore for the time being.</span>
		NSLog<span style="color: #002200;">&#40;</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"This will not work on the simulator. Need to test in the device"</span><span style="color: #002200;">&#41;</span>;
	<span style="color: #002200;">&#125;</span>   
<span style="color: #002200;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

**4. Cancelling operations**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;">	<span style="color: #002200;">&#91;</span>operation cancelAllOperations<span style="color: #002200;">&#93;</span>
&nbsp;
	or 
&nbsp;
	<span style="color: #400080;">NSArray</span> <span style="color: #002200;">*</span>arrayOperations <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>operationQueue operations<span style="color: #002200;">&#93;</span>;
	<span style="color: #a61390;">for</span><span style="color: #002200;">&#40;</span><span style="color: #a61390;">int</span> i<span style="color: #002200;">=</span><span style="color: #2400d9;"></span>; i &lt; <span style="color: #002200;">&#91;</span>arrayOperations count<span style="color: #002200;">&#93;</span>; i<span style="color: #002200;">++</span><span style="color: #002200;">&#41;</span><span style="color: #002200;">&#123;</span>
		<span style="color: #400080;">NSOperation</span> <span style="color: #002200;">*</span>operation <span style="color: #002200;">=</span> <span style="color: #002200;">&#40;</span><span style="color: #400080;">NSOperation</span> <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span><span style="color: #002200;">&#91;</span>arrayOperations objectAtIndex<span style="color: #002200;">:</span>i<span style="color: #002200;">&#93;</span>;
		<span style="color: #a61390;">if</span><span style="color: #002200;">&#40;</span> <span style="color: #002200;">&#91;</span>operation isExecuting<span style="color: #002200;">&#93;</span> <span style="color: #002200;">&#41;</span><span style="color: #002200;">&#123;</span>
			NSLog<span style="color: #002200;">&#40;</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"cancelOperations: found an operation running. Cancelling..."</span><span style="color: #002200;">&#41;</span>;
			<span style="color: #002200;">&#91;</span>operation cancel<span style="color: #002200;">&#93;</span>;
		<span style="color: #002200;">&#125;</span>
	<span style="color: #002200;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>