---
title: 'iPhone Note #17: Displaying a custom view controller from a UITextField'
author: rupert
layout: post
permalink: /2009/11/iphone-note-17-displaying-a-custom-view-controller-from-a-uitextfield/
categories:
  - iphone
tags:
  - iphone
---
Problem: I want my textFieldSearchAddress to display a seperate viewcontroller.

<img src="/images/2009/11/textfield.png" alt="textfield.png" border="0" width="400" height="279" />

Short Answer: Hide the keyboard by using 
<pre>[textField resignFirstResponder]</pre>

then show the view controller.

1. Implement a UITextFieldDelegate.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span><span style="color: #a61390;">BOOL</span><span style="color: #002200;">&#41;</span>textFieldShouldBeginEditing<span style="color: #002200;">:</span><span style="color: #002200;">&#40;</span>UITextField <span style="color: #002200;">*</span><span style="color: #002200;">&#41;</span>textField<span style="color: #002200;">&#123;</span>
	<span style="color: #002200;">&#91;</span>textField resignFirstResponder<span style="color: #002200;">&#93;</span>;
	<span style="color: #002200;">&#91;</span>self show<span style="color: #002200;">&#93;</span>;
	<span style="color: #a61390;">return</span> <span style="color: #a61390;">NO</span>;
<span style="color: #002200;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

Be careful with the BOOL return of textFieldShouldBeginEditing. From the docs: *&#8220;YES if an editing session should be initiated; otherwise, NO to disallow editing.&#8221;* 

2. Show the view controller.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;"><span style="color: #002200;">-</span> <span style="color: #002200;">&#40;</span>IBAction<span style="color: #002200;">&#41;</span>show<span style="color: #002200;">&#123;</span>
	NSLog<span style="color: #002200;">&#40;</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"show"</span><span style="color: #002200;">&#41;</span>;
&nbsp;
	AddressViewController <span style="color: #002200;">*</span>addressViewController <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span>AddressViewController alloc<span style="color: #002200;">&#93;</span> initWithNibName<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"AddressViewController"</span> bundle<span style="color: #002200;">:</span><span style="color: #a61390;">nil</span><span style="color: #002200;">&#93;</span>;
	UINavigationController <span style="color: #002200;">*</span>nav <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span>UINavigationController alloc<span style="color: #002200;">&#93;</span> initWithRootViewController<span style="color: #002200;">:</span>addressViewController<span style="color: #002200;">&#93;</span>;
	<span style="color: #002200;">&#91;</span>self presentModalViewController<span style="color: #002200;">:</span>nav animated<span style="color: #002200;">:</span><span style="color: #a61390;">YES</span><span style="color: #002200;">&#93;</span>;
&nbsp;
	<span style="color: #002200;">&#91;</span>addressViewController release<span style="color: #002200;">&#93;</span>;
	<span style="color: #002200;">&#91;</span>nav release<span style="color: #002200;">&#93;</span>;
&nbsp;
<span style="color: #002200;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

Download [SimpleIB-textfield\_custom\_view_controller.zip][1]

 [1]: /images/2009/11/SimpleIB-textfield_custom_view_controller.zip "SimpleIB-textfield_custom_view_controller.zip"