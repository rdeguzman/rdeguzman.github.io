---
title: 'iPhone Note #9: Sending or Uploading over HTTP Post'
author: Rupert
layout: post
permalink: /2009/08/iphone-note-8-sending-or-uploading-over-http-post/
categories:
  - iphone
tags:
  - iphone
---
In this tutorial, we would use an [Objective-C Library: ASIHTTPRequest][1], which abstracts the complexities of using [NSURLConnection][2]

<img src="/images/2009/08/http-final.gif" border="0" alt="http-final.gif" width="223" height="334" /><!--more-->

1. Download the latest [build][1].

2. Create a new view based project &#8220;HTTPTest&#8221;. XCode -> File -> New Project -> View-based Application

3. Add the ff frameworks: CFNetwork, SystemConfiguration, and libz (compression library). For more details, follow these [instructions][3]

4. In IB, let&#8217;s add two UIButton&#8217;s, a UITextView \*textView and a UIProgressView \*progressView. The two buttons is for HTTP URL and HTTP FORM requests. The textView will display the response of the HTTP request. While the progressView is for displaying the uploading progress. It should look something similar to the image below&#8230;

<img src="/images/2009/08/http-1.gif" border="0" alt="http-1.gif" width="323" height="504" />

5. Here is the interface:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #6e371a;">#import</span>
&nbsp;
<span style="color: #a61390;">@interface</span> HTTPTestViewController <span style="color: #002200;">:</span> UIViewController <span style="color: #002200;">&#123;</span>
	IBOutlet UIButton <span style="color: #002200;">*</span>buttonSubmitURL;
	IBOutlet UIButton <span style="color: #002200;">*</span>buttonSubmitForm;
	IBOutlet UITextView <span style="color: #002200;">*</span>textView;
	IBOutlet UIProgressView <span style="color: #002200;">*</span>progressView;
&nbsp;
	<span style="color: #400080;">NSOperationQueue</span> <span style="color: #002200;">*</span>queue;
<span style="color: #002200;">&#125;</span>
&nbsp;
<span style="color: #a61390;">@property</span> <span style="color: #002200;">&#40;</span>nonatomic, retain<span style="color: #002200;">&#41;</span> IBOutlet UIButton <span style="color: #002200;">*</span>buttonSubmitURL;
<span style="color: #a61390;">@property</span> <span style="color: #002200;">&#40;</span>nonatomic, retain<span style="color: #002200;">&#41;</span> IBOutlet UIButton <span style="color: #002200;">*</span>buttonSubmitForm;
<span style="color: #a61390;">@property</span> <span style="color: #002200;">&#40;</span>nonatomic, retain<span style="color: #002200;">&#41;</span> IBOutlet UIProgressView <span style="color: #002200;">*</span>progressView;
&nbsp;
<span style="color: #a61390;">@property</span> <span style="color: #002200;">&#40;</span>nonatomic, retain<span style="color: #002200;">&#41;</span> IBOutlet UITextView <span style="color: #002200;">*</span>textView;
&nbsp;
<span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span>IBAction<span style="color: #002200;">&#41;</span>submitURLPressed;
&nbsp;
<span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span>IBAction<span style="color: #002200;">&#41;</span>submitFormPressed;
&nbsp;
<span style="color: #a61390;">@end</span></pre>
      </td>
    </tr>
  </table>
</div>

6. In IB, hook up the IBAction method&#8217;s from the &#8220;Touch Up Inside&#8221; events for each button.

URL Button -> Touch Up Inside -> submitURLPressed  
Form Button -> Touch Up Inside -> submitFormPressed

<img src="/images/2009/08/http-2.gif" border="0" alt="http-2.gif" width="291" height="283" />

7. Let&#8217;s do the URL first. From the code snippet below, notice that it is a UI blocking call as the call is synchronous. From the [&#8220;How to use it&#8221;][4] section of ASI&#8217;s website:

> The simplest way to use ASIHTTPRequest. Sending the start message will execute the request in the same thread, and return control when it has completed (successfully or otherwise).

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span>IBAction<span style="color: #002200;">&#41;</span>submitURLPressed<span style="color: #002200;">&#123;</span>
	textView.text <span style="color: #002200;">=</span> <span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">""</span>;
&nbsp;
	<span style="color: #400080;">NSURL</span> <span style="color: #002200;">*</span>url <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #400080;">NSURL</span> URLWithString<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"http://192.168.1.188/iphone/test.cfm"</span><span style="color: #002200;">&#93;</span>;
&nbsp;
	ASIHTTPRequest <span style="color: #002200;">*</span>request <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span>ASIHTTPRequest alloc<span style="color: #002200;">&#93;</span> initWithURL<span style="color: #002200;">:</span>url<span style="color: #002200;">&#93;</span> autorelease<span style="color: #002200;">&#93;</span>;
&nbsp;
	<span style="color: #002200;">&#91;</span>request start<span style="color: #002200;">&#93;</span>;
&nbsp;
	<span style="color: #400080;">NSError</span> <span style="color: #002200;">*</span>error <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>request error<span style="color: #002200;">&#93;</span>;
&nbsp;
	<span style="color: #a61390;">if</span> <span style="color: #002200;">&#40;</span><span style="color: #002200;">!</span>error<span style="color: #002200;">&#41;</span> <span style="color: #002200;">&#123;</span>
		<span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span>response <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>request responseString<span style="color: #002200;">&#93;</span>;
		NSLog<span style="color: #002200;">&#40;</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"Result string: %@"</span>, response<span style="color: #002200;">&#41;</span>;
&nbsp;
		textView.text <span style="color: #002200;">=</span> response;
	<span style="color: #002200;">&#125;</span>
<span style="color: #002200;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

8. Now let&#8217;s do an asynchronous request so the UI can respond using the progressView. Implement the code snippet below for submitFormPressed. Notice, that I am using an image (http_test.gif) which is bundled up in the application. After creating the *request, I made HTTPTestViewController as the delegate. Therefore we need to implement methods requestDone and requestWentWrong in step [9].

To add a form value, simple do `[request setPostValue:@"rupert" forKey:@"name"];`

To add a file, simple pass the NSString path to setFile, i.e:  
`[request setFile:imagePath1 forKey:@"file"];`

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span>IBAction<span style="color: #002200;">&#41;</span>submitFormPressed<span style="color: #002200;">&#123;</span>
	queue <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span><span style="color: #400080;">NSOperationQueue</span> alloc<span style="color: #002200;">&#93;</span> init<span style="color: #002200;">&#93;</span>;
	<span style="color: #002200;">&#91;</span>queue setMaxConcurrentOperationCount<span style="color: #002200;">:</span><span style="color: #2400d9;">1</span><span style="color: #002200;">&#93;</span>;
&nbsp;
	<span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span>imagePath1 <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span><span style="color: #400080;">NSBundle</span> mainBundle<span style="color: #002200;">&#93;</span> resourcePath<span style="color: #002200;">&#93;</span> stringByAppendingPathComponent<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"http_test.gif"</span><span style="color: #002200;">&#93;</span>;
&nbsp;
	textView.text <span style="color: #002200;">=</span> <span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">""</span>;
&nbsp;
	<span style="color: #002200;">&#91;</span>progressView setProgress<span style="color: #002200;">:</span><span style="color: #2400d9;"></span><span style="color: #002200;">&#93;</span>;
&nbsp;
	<span style="color: #400080;">NSURL</span> <span style="color: #002200;">*</span>url <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #400080;">NSURL</span> URLWithString<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"http://192.168.1.193/dbydsms/upload.aspx"</span><span style="color: #002200;">&#93;</span>;
&nbsp;
	ASIFormDataRequest <span style="color: #002200;">*</span>request <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span>ASIFormDataRequest alloc<span style="color: #002200;">&#93;</span> initWithURL<span style="color: #002200;">:</span>url<span style="color: #002200;">&#93;</span> autorelease<span style="color: #002200;">&#93;</span>;
&nbsp;
	<span style="color: #002200;">&#91;</span>request setDelegate<span style="color: #002200;">:</span>self<span style="color: #002200;">&#93;</span>;
	<span style="color: #002200;">&#91;</span>request setDidFinishSelector<span style="color: #002200;">:</span><span style="color: #a61390;">@selector</span><span style="color: #002200;">&#40;</span>requestDone<span style="color: #002200;">:</span><span style="color: #002200;">&#41;</span><span style="color: #002200;">&#93;</span>;
	<span style="color: #002200;">&#91;</span>request setDidFailSelector<span style="color: #002200;">:</span><span style="color: #a61390;">@selector</span><span style="color: #002200;">&#40;</span>requestWentWrong<span style="color: #002200;">:</span><span style="color: #002200;">&#41;</span><span style="color: #002200;">&#93;</span>;
&nbsp;
	<span style="color: #002200;">&#91;</span>request setPostValue<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"rupert"</span> forKey<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"name"</span><span style="color: #002200;">&#93;</span>;
&nbsp;
	<span style="color: #002200;">&#91;</span>request setFile<span style="color: #002200;">:</span>imagePath1 forKey<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"file"</span><span style="color: #002200;">&#93;</span>;
&nbsp;
	<span style="color: #002200;">&#91;</span>request setUploadProgressDelegate<span style="color: #002200;">:</span>progressView<span style="color: #002200;">&#93;</span>;
&nbsp;
	<span style="color: #002200;">&#91;</span>queue addOperation<span style="color: #002200;">:</span>request<span style="color: #002200;">&#93;</span>;
<span style="color: #002200;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

9. Conforming to the delegate&#8217;s methods&#8230;

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">void</span><span style="color: #002200;">&#41;</span>requestDone<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span>ASIHTTPRequest <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>request
<span style="color: #002200;">&#123;</span>
	NSLog<span style="color: #002200;">&#40;</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"Value: %f"</span>, <span style="color: #002200;">&#91;</span>progressView progress<span style="color: #002200;">&#93;</span><span style="color: #002200;">&#41;</span>;
&nbsp;
	<span style="color: #400080;">NSError</span> <span style="color: #002200;">*</span>error <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>request error<span style="color: #002200;">&#93;</span>;
&nbsp;
	<span style="color: #a61390;">if</span> <span style="color: #002200;">&#40;</span><span style="color: #002200;">!</span>error<span style="color: #002200;">&#41;</span> <span style="color: #002200;">&#123;</span>
		<span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span>response <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>request responseString<span style="color: #002200;">&#93;</span>;
		NSLog<span style="color: #002200;">&#40;</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"Result string: %@"</span>, response<span style="color: #002200;">&#41;</span>;
&nbsp;
		textView.text <span style="color: #002200;">=</span> response;
	<span style="color: #002200;">&#125;</span>
<span style="color: #002200;">&#125;</span>
&nbsp;
<span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">void</span><span style="color: #002200;">&#41;</span>requestWentWrong<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span>ASIHTTPRequest <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>request
<span style="color: #002200;">&#123;</span>
	<span style="color: #400080;">NSError</span> <span style="color: #002200;">*</span>error <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>request error<span style="color: #002200;">&#93;</span>;
	NSLog<span style="color: #002200;">&#40;</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"error: %@"</span>, error<span style="color: #002200;">&#41;</span>;
<span style="color: #002200;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

10. For the upload.aspx,

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="csharp" style="font-family:monospace;"><span style="color: #0600FF; font-weight: bold;">protected</span> <span style="color: #6666cc; font-weight: bold;">void</span> Page_Load<span style="color: #008000;">&#40;</span><span style="color: #6666cc; font-weight: bold;">object</span> sender, EventArgs e<span style="color: #008000;">&#41;</span>
    <span style="color: #008000;">&#123;</span>
        HttpFileCollection uploadFiles <span style="color: #008000;">=</span> Request<span style="color: #008000;">.</span><span style="color: #0000FF;">Files</span><span style="color: #008000;">;</span>
&nbsp;
        <span style="color: #008080; font-style: italic;">// Loop over the uploaded files and save to disk.</span>
        <span style="color: #6666cc; font-weight: bold;">int</span> i<span style="color: #008000;">;</span>
        <span style="color: #0600FF; font-weight: bold;">for</span> <span style="color: #008000;">&#40;</span>i <span style="color: #008000;">=</span> <span style="color: #FF0000;"></span><span style="color: #008000;">;</span> i <span style="color: #008000;">&</span>lt<span style="color: #008000;">;</span> uploadFiles<span style="color: #008000;">.</span><span style="color: #0000FF;">Count</span><span style="color: #008000;">;</span> i<span style="color: #008000;">++</span><span style="color: #008000;">&#41;</span>
        <span style="color: #008000;">&#123;</span>
            HttpPostedFile postedFile <span style="color: #008000;">=</span> uploadFiles<span style="color: #008000;">&#91;</span>i<span style="color: #008000;">&#93;</span><span style="color: #008000;">;</span>
&nbsp;
            <span style="color: #008080; font-style: italic;">// Access the uploaded file's content in-memory:</span>
            <span style="color: #000000;">System.<span style="color: #0000FF;">IO</span></span><span style="color: #008000;">.</span><span style="color: #0000FF;">Stream</span> inStream <span style="color: #008000;">=</span> postedFile<span style="color: #008000;">.</span><span style="color: #0000FF;">InputStream</span><span style="color: #008000;">;</span>
            <span style="color: #6666cc; font-weight: bold;">byte</span><span style="color: #008000;">&#91;</span><span style="color: #008000;">&#93;</span> fileData <span style="color: #008000;">=</span> <span style="color: #008000;">new</span> <span style="color: #6666cc; font-weight: bold;">byte</span><span style="color: #008000;">&#91;</span>postedFile<span style="color: #008000;">.</span><span style="color: #0000FF;">ContentLength</span><span style="color: #008000;">&#93;</span><span style="color: #008000;">;</span>
            inStream<span style="color: #008000;">.</span><span style="color: #0000FF;">Read</span><span style="color: #008000;">&#40;</span>fileData, <span style="color: #FF0000;"></span>, postedFile<span style="color: #008000;">.</span><span style="color: #0000FF;">ContentLength</span><span style="color: #008000;">&#41;</span><span style="color: #008000;">;</span>
&nbsp;
            <span style="color: #008080; font-style: italic;">// Save the posted file in our "data" virtual directory.</span>
            postedFile<span style="color: #008000;">.</span><span style="color: #0000FF;">SaveAs</span><span style="color: #008000;">&#40;</span><span style="color: #666666;">"E:<span style="color: #008080; font-weight: bold;">\\</span>RupertWork<span style="color: #008080; font-weight: bold;">\\</span>wwwroot<span style="color: #008080; font-weight: bold;">\\</span>project<span style="color: #008080; font-weight: bold;">\\</span>uploads<span style="color: #008080; font-weight: bold;">\\</span>"</span> <span style="color: #008000;">+</span> postedFile<span style="color: #008000;">.</span><span style="color: #0000FF;">FileName</span><span style="color: #008000;">&#41;</span><span style="color: #008000;">;</span>
&nbsp;
        <span style="color: #008000;">&#125;</span>
&nbsp;
    <span style="color: #008000;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

 [1]: http://allseeing-i.com/ASIHTTPRequest/
 [2]: http://developer.apple.com/documentation/Cocoa/Conceptual/URLLoadingSystem/Tasks/UsingNSURLConnection.html
 [3]: http://allseeing-i.com/ASIHTTPRequest/Setup-instructions
 [4]: http://allseeing-i.com/ASIHTTPRequest/How-to-use