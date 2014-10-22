---
title: 'iPhone Note #6: Presenting a DatePicker as a ViewController Modally'
author: Rupert
layout: post
permalink: /2009/08/iphone-note-5-presenting-a-datepicker-as-a-viewcontroller-modally/
reddit:
  - 's:55:"a:2:{s:5:"count";s:1:"0";s:4:"time";s:10:"1250145479";}";'
delicious:
  - 's:78:"a:3:{s:5:"count";s:1:"0";s:9:"post_tags";s:0:"";s:4:"time";s:10:"1250145481";}";'
categories:
  - iphone
tags:
  - iphone
---
### Part 1: Creating your own control inside a view controller..

1. File -> New. Choose UIViewController subclass. Tick the checkbox &#8220;With XIB for user interface&#8221;. Save it as &#8220;DatePickerViewController&#8221;.

2. Open the DatePickerViewController.xib from IB.

3. In IB, drag a UIDatePicker and a UIButton as shown below.

<img src="/images/2009/08/note-5-1.gif" alt="note-5-1.gif" border="0" width="150" height="235" />

<!--more-->

4. In DatePickerViewController.h,

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #6e371a;">#import</span>
&nbsp;
<span style="color: #a61390;">@protocol</span> DatePickerViewControllerDelegate;
&nbsp;
<span style="color: #a61390;">@interface</span> DatePickerViewController <span style="color: #002200;">:</span> UIViewController <span style="color: #002200;">&#123;</span>
	IBOutlet UIDatePicker <span style="color: #002200;">*</span>datePicker;
	<span style="color: #a61390;">id</span> delegate;
<span style="color: #002200;">&#125;</span>
&nbsp;
<span style="color: #a61390;">@property</span> <span style="color: #002200;">&#40;</span>retain<span style="color: #002200;">&#41;</span> IBOutlet UIDatePicker <span style="color: #002200;">*</span>datePicker;
<span style="color: #a61390;">@property</span> <span style="color: #002200;">&#40;</span>assign<span style="color: #002200;">&#41;</span> <span style="color: #a61390;">id</span> delegate;
&nbsp;
<span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">id</span><span style="color: #002200;">&#41;</span>initWithNibName<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span><span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>nibNameOrNil bundle<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span><span style="color: #400080;">NSBundle</span> <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>nibBundleOrNil;
&nbsp;
<span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span>IBAction<span style="color: #002200;">&#41;</span>doneButtonPressed<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span><span style="color: #a61390;">id</span><span style="color: #002200;">&#41;</span>sender;
<span style="color: #a61390;">@end</span>
&nbsp;
<span style="color: #a61390;">@protocol</span> DatePickerViewControllerDelegate
&nbsp;
@optional
<span style="color: #002200;">-</span><span style="color: #002200;">&#40;</span><span style="color: #a61390;">void</span><span style="color: #002200;">&#41;</span>datePickerViewController<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span>DatePickerViewController <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>controller didChooseDate<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span><span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>chosenDate;
&nbsp;
<span style="color: #a61390;">@end</span></pre>
      </td>
    </tr>
  </table>
</div>

5. Now, lets hook up the &#8220;doneButtonPressed&#8221; in IB. In IB -> Tools -> Connections Inspector. Drag the touch &#8220;Touch Up Inside&#8221; event to the File&#8217;s Owner which is DatePickerViewController. Choose the method &#8220;doneButtonPressed:&#8221; when it shows up.

<img src="/images/2009/08/note-5-2.gif" alt="note-5-2.gif" border="0" width="291" height="224" />

6. Next, implement the doneButtonPressed

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #6e371a;">#import "DatePickerViewController.h"</span>
&nbsp;
<span style="color: #a61390;">@implementation</span> DatePickerViewController
&nbsp;
<span style="color: #a61390;">@synthesize</span> datePicker, delegate;
&nbsp;
<span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">id</span><span style="color: #002200;">&#41;</span>initWithNibName<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span><span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>nibNameOrNil bundle<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span><span style="color: #400080;">NSBundle</span> <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>nibBundleOrNil <span style="color: #002200;">&#123;</span>
    <span style="color: #a61390;">if</span> <span style="color: #002200;">&#40;</span>self <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>super initWithNibName<span style="color: #002200;">:</span>nibNameOrNil bundle<span style="color: #002200;">:</span>nibBundleOrNil<span style="color: #002200;">&#93;</span><span style="color: #002200;">&#41;</span> <span style="color: #002200;">&#123;</span>
        <span style="color: #11740a; font-style: italic;">// Custom initialization</span>
		self.title <span style="color: #002200;">=</span> <span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"Date Picker"</span>;
    <span style="color: #002200;">&#125;</span>
    <span style="color: #a61390;">return</span> self;
<span style="color: #002200;">&#125;</span>
&nbsp;
&nbsp;
<span style="color: #11740a; font-style: italic;">//-(void)datePickerViewController:(DatePickerViewController *)controller didChooseDate:(NSString *)chosenDate;</span>
&nbsp;
<span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span>IBAction<span style="color: #002200;">&#41;</span>doneButtonPressed<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span><span style="color: #a61390;">id</span><span style="color: #002200;">&#41;</span>sender
<span style="color: #002200;">&#123;</span>
    <span style="color: #a61390;">if</span> <span style="color: #002200;">&#40;</span><span style="color: #002200;">&#91;</span>self.delegate respondsToSelector<span style="color: #002200;">:</span><span style="color: #a61390;">@selector</span><span style="color: #002200;">&#40;</span>datePickerViewController<span style="color: #002200;">:</span>didChooseDate<span style="color: #002200;">:</span><span style="color: #002200;">&#41;</span><span style="color: #002200;">&#93;</span><span style="color: #002200;">&#41;</span> <span style="color: #002200;">&#123;</span>
		<span style="color: #400080;">NSDateFormatter</span> <span style="color: #002200;">*</span>dateFormatter <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span><span style="color: #400080;">NSDateFormatter</span> alloc<span style="color: #002200;">&#93;</span> init<span style="color: #002200;">&#93;</span>  autorelease<span style="color: #002200;">&#93;</span>;
		<span style="color: #002200;">&#91;</span>dateFormatter setDateStyle<span style="color: #002200;">:</span>NSDateFormatterMediumStyle<span style="color: #002200;">&#93;</span>;
&nbsp;
		<span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span>dateString <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>dateFormatter stringFromDate<span style="color: #002200;">:</span><span style="color: #002200;">&#91;</span>datePicker date<span style="color: #002200;">&#93;</span><span style="color: #002200;">&#93;</span>;
&nbsp;
        <span style="color: #002200;">&#91;</span>self.delegate datePickerViewController<span style="color: #002200;">:</span>self didChooseDate<span style="color: #002200;">:</span>dateString<span style="color: #002200;">&#93;</span>;
    <span style="color: #002200;">&#125;</span>
<span style="color: #002200;">&#125;</span>
&nbsp;
<span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">void</span><span style="color: #002200;">&#41;</span>dealloc <span style="color: #002200;">&#123;</span>
	<span style="color: #002200;">&#91;</span>datePicker release<span style="color: #002200;">&#93;</span>;
    <span style="color: #002200;">&#91;</span>super dealloc<span style="color: #002200;">&#93;</span>;
<span style="color: #002200;">&#125;</span>
&nbsp;
<span style="color: #a61390;">@end</span></pre>
      </td>
    </tr>
  </table>
</div>

### Part 2: Displaying the view controller modally

7. From this point on, I will refer to JobProfileViewController as the *client*. The client will create and present the DatePickerViewController modally (which is now referred to as *picker*). Once the user is finished using the picker and hits the &#8220;Done&#8221; button, the client will dismiss the picker and process the returned results.

8. Make the client conform to the DatePickerViewControllerDelegate.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #6e371a;">#import "DatePickerViewController.h"</span>
&nbsp;
<span style="color: #a61390;">@interface</span> JobProfileViewController <span style="color: #002200;">:</span> UIViewController <span style="color: #002200;">&#123;</span></pre>
      </td>
    </tr>
  </table>
</div>

9. Trigger an event to create and present the picker modally. In my case, its a button which is hooked up to showDatePicker method. Now, make the client as the delegate for the picker. Present the content modally then release the object.

*JobProfileViewController.h:*

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span>IBAction<span style="color: #002200;">&#41;</span>showDatePicker<span style="color: #002200;">&#123;</span>
	DatePickerViewController <span style="color: #002200;">*</span>datePickerViewController <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span>DatePickerViewController alloc<span style="color: #002200;">&#93;</span> initWithNibName<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"DatePickerViewController"</span> bundle<span style="color: #002200;">:</span><span style="color: #a61390;">nil</span><span style="color: #002200;">&#93;</span>;
	datePickerViewController.delegate <span style="color: #002200;">=</span> self;
&nbsp;
	<span style="color: #002200;">&#91;</span>self presentModalViewController<span style="color: #002200;">:</span>datePickerViewController animated<span style="color: #002200;">:</span><span style="color: #a61390;">YES</span><span style="color: #002200;">&#93;</span>;
&nbsp;
	<span style="color: #002200;">&#91;</span>datePickerViewController release<span style="color: #002200;">&#93;</span>;
<span style="color: #002200;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

10. Since the client is now the delegate for the picker, we can implement &#8220;didChooseDate&#8221; method inside the client. It is good practice that whoever (in our case the client) presents the content modally *should* also dismiss the content. Process what needs to be done, then let&#8217;s dismiss the modal content. **Note: There is only one modal content for every view controller.**

*JobProfileViewController.h:*

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #002200;">-</span><span style="color: #002200;">&#40;</span><span style="color: #a61390;">void</span><span style="color: #002200;">&#41;</span>datePickerViewController<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span>DatePickerViewController <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>controller didChooseDate<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span><span style="color: #400080;">NSString</span> <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>chosenDate<span style="color: #002200;">&#123;</span>
	NSLog<span style="color: #002200;">&#40;</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"Chosen Date as String: %@"</span>, chosenDate <span style="color: #002200;">&#41;</span>;
&nbsp;
	job.startDate <span style="color: #002200;">=</span> chosenDate;
	<span style="color: #002200;">&#91;</span>startDate setTitle<span style="color: #002200;">:</span> chosenDate forState<span style="color: #002200;">:</span> UIControlStateNormal<span style="color: #002200;">&#93;</span>;
&nbsp;
	<span style="color: #002200;">&#91;</span>self dismissModalViewControllerAnimated<span style="color: #002200;">:</span><span style="color: #a61390;">YES</span><span style="color: #002200;">&#93;</span>;
<span style="color: #002200;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

UPDATE OCT 2, 2009: Download [DatePickerModalExample.zip][1]

 [1]: /images/2009/10/DatePickerModalExample.zip "DatePickerModalExample.zip"