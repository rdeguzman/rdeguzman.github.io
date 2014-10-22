---
title: 'iPhone Note #12: Adding a UIButton on a UITableViewCell (Borderless)'
author: rupert
layout: post
permalink: /2009/09/iphone-note-12-adding-a-uibutton-on-a-uitableviewcell-borderless/
categories:
  - iphone
tags:
  - iphone
---
1. Im trying to add two UIbuttons to a UITableViewCell, similar to the contacts app. Creating the UIButtons programmatically and adding them to the cell&#8217;s subview is trivial. However the interface is a bit different from the contacts app, see image here&#8230;

<img src="/images/2009/09/UIButtons-dirty.png" alt="UIButtons-dirty.png" border="0" width="320" height="68" />

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;">cell <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span>UITableViewCell alloc<span style="color: #002200;">&#93;</span> initWithStyle<span style="color: #002200;">:</span>UITableViewCellStyleDefault reuseIdentifier<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"ButtonCell"</span><span style="color: #002200;">&#93;</span> autorelease<span style="color: #002200;">&#93;</span>;
&nbsp;
UIButton <span style="color: #002200;">*</span>buttonLeft <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>UIButton buttonWithType<span style="color: #002200;">:</span>UIButtonTypeRoundedRect<span style="color: #002200;">&#93;</span>;
<span style="color: #002200;">&#91;</span>buttonLeft setTitle<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"Left"</span> forState<span style="color: #002200;">:</span>UIControlStateNormal<span style="color: #002200;">&#93;</span>;
<span style="color: #002200;">&#91;</span>buttonLeft setFrame<span style="color: #002200;">:</span> CGRectMake<span style="color: #002200;">&#40;</span> 10.0f, 3.0f, 145.0f, 40.0f<span style="color: #002200;">&#41;</span><span style="color: #002200;">&#93;</span>;
<span style="color: #002200;">&#91;</span>buttonLeft addTarget<span style="color: #002200;">:</span>self action<span style="color: #002200;">:</span><span style="color: #a61390;">@selector</span><span style="color: #002200;">&#40;</span>addToFavorites<span style="color: #002200;">&#41;</span> forControlEvents<span style="color: #002200;">:</span>UIControlEventTouchUpInside<span style="color: #002200;">&#93;</span>;
&nbsp;
UIButton <span style="color: #002200;">*</span>buttonRight <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>UIButton buttonWithType<span style="color: #002200;">:</span>UIButtonTypeRoundedRect<span style="color: #002200;">&#93;</span>;
<span style="color: #002200;">&#91;</span>buttonRight setTitle<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"Right"</span> forState<span style="color: #002200;">:</span>UIControlStateNormal<span style="color: #002200;">&#93;</span>;
<span style="color: #002200;">&#91;</span>buttonRight setFrame<span style="color: #002200;">:</span> CGRectMake<span style="color: #002200;">&#40;</span> 165.0f, 3.0f, 145.0f, 40.0f<span style="color: #002200;">&#41;</span><span style="color: #002200;">&#93;</span>;
<span style="color: #002200;">&#91;</span>buttonRight addTarget<span style="color: #002200;">:</span>self action<span style="color: #002200;">:</span><span style="color: #a61390;">@selector</span><span style="color: #002200;">&#40;</span>addToFavorites<span style="color: #002200;">&#41;</span> forControlEvents<span style="color: #002200;">:</span>UIControlEventTouchUpInside<span style="color: #002200;">&#93;</span>;
&nbsp;
<span style="color: #002200;">&#91;</span>cell addSubview<span style="color: #002200;">:</span>buttonLeft<span style="color: #002200;">&#93;</span>;
<span style="color: #002200;">&#91;</span>cell addSubview<span style="color: #002200;">:</span>buttonRight<span style="color: #002200;">&#93;</span>;</pre>
      </td>
    </tr>
  </table>
</div>

2. So to make the background the same as *UITableViewStyleGrouped*, we can implement:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;">cell.backgroundColor <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>UIColor groupTableViewBackgroundColor<span style="color: #002200;">&#93;</span>;</pre>
      </td>
    </tr>
  </table>
</div>

But I could still see the border of the UITableViewCell.. see image below&#8230;  
<img src="/images/2009/09/UIButtons-not-so-clean.png" alt="UIButtons-not-so-clean.png" border="0" width="318" height="61" />

3. The crux of it was to implement a UIView, set the background as *UITableViewStyleGrouped* and add that as a cell&#8217;s backgroundView.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="objc" style="font-family:monospace;">cell <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span>UITableViewCell alloc<span style="color: #002200;">&#93;</span> initWithStyle<span style="color: #002200;">:</span>UITableViewCellStyleDefault reuseIdentifier<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"ButtonCell"</span><span style="color: #002200;">&#93;</span> autorelease<span style="color: #002200;">&#93;</span>;
&nbsp;
UIView <span style="color: #002200;">*</span>backgroundView <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span><span style="color: #002200;">&#91;</span>UIView alloc<span style="color: #002200;">&#93;</span> initWithFrame<span style="color: #002200;">:</span>CGRectMake<span style="color: #002200;">&#40;</span>0.0f, 0.0f, 320.0f, 44.0f<span style="color: #002200;">&#41;</span><span style="color: #002200;">&#93;</span>;
backgroundView.backgroundColor <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>UIColor groupTableViewBackgroundColor<span style="color: #002200;">&#93;</span>;
&nbsp;
cell.backgroundView <span style="color: #002200;">=</span> backgroundView;
&nbsp;
UIButton <span style="color: #002200;">*</span>buttonLeft <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>UIButton buttonWithType<span style="color: #002200;">:</span>UIButtonTypeRoundedRect<span style="color: #002200;">&#93;</span>;
<span style="color: #002200;">&#91;</span>buttonLeft setTitle<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"Left"</span> forState<span style="color: #002200;">:</span>UIControlStateNormal<span style="color: #002200;">&#93;</span>;
<span style="color: #002200;">&#91;</span>buttonLeft setFrame<span style="color: #002200;">:</span> CGRectMake<span style="color: #002200;">&#40;</span> 10.0f, 3.0f, 145.0f, 40.0f<span style="color: #002200;">&#41;</span><span style="color: #002200;">&#93;</span>;
<span style="color: #002200;">&#91;</span>buttonLeft addTarget<span style="color: #002200;">:</span>self action<span style="color: #002200;">:</span><span style="color: #a61390;">@selector</span><span style="color: #002200;">&#40;</span>addToFavorites<span style="color: #002200;">&#41;</span> forControlEvents<span style="color: #002200;">:</span>UIControlEventTouchUpInside<span style="color: #002200;">&#93;</span>;
&nbsp;
UIButton <span style="color: #002200;">*</span>buttonRight <span style="color: #002200;">=</span> <span style="color: #002200;">&#91;</span>UIButton buttonWithType<span style="color: #002200;">:</span>UIButtonTypeRoundedRect<span style="color: #002200;">&#93;</span>;
<span style="color: #002200;">&#91;</span>buttonRight setTitle<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"Right"</span> forState<span style="color: #002200;">:</span>UIControlStateNormal<span style="color: #002200;">&#93;</span>;
<span style="color: #002200;">&#91;</span>buttonRight setFrame<span style="color: #002200;">:</span> CGRectMake<span style="color: #002200;">&#40;</span> 165.0f, 3.0f, 145.0f, 40.0f<span style="color: #002200;">&#41;</span><span style="color: #002200;">&#93;</span>;
<span style="color: #002200;">&#91;</span>buttonRight addTarget<span style="color: #002200;">:</span>self action<span style="color: #002200;">:</span><span style="color: #a61390;">@selector</span><span style="color: #002200;">&#40;</span>addToFavorites<span style="color: #002200;">&#41;</span> forControlEvents<span style="color: #002200;">:</span>UIControlEventTouchUpInside<span style="color: #002200;">&#93;</span>;
&nbsp;
<span style="color: #002200;">&#91;</span>cell addSubview<span style="color: #002200;">:</span>buttonLeft<span style="color: #002200;">&#93;</span>;
<span style="color: #002200;">&#91;</span>cell addSubview<span style="color: #002200;">:</span>buttonRight<span style="color: #002200;">&#93;</span>;
&nbsp;
<span style="color: #002200;">&#91;</span>backgroundView release<span style="color: #002200;">&#93;</span>;</pre>
      </td>
    </tr>
  </table>
</div>

Now the interface is a whole lot cleaner and the resulting image is better&#8230;

<img src="/images/2009/09/UIButtons-clean.png" alt="UIButtons-clean.png" border="0" width="320" height="62" />