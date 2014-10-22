---
title: 'Rails Note #5: Dynamic Layouts'
author: rupert
layout: post
permalink: /2008/11/ror-dynamic-layouts/
aktt_tweeted:
  - 1
categories:
  - rails
tags:
  - rails
---
Wow.. everyday.. Ruby on Rails seems to amuse me.. I just figured how to **seperate layouts just by having different files in the layouts/ which corresponds to a controller**. If a layout file &#8220;home (*home.html.erb*)&#8221; exists and there is home_controller, then the *home_controller* would use that layout instead of *application.html.erb*.

Now.. I haven&#8217;t validated this concept by book and would do so soon..

<img src="/images/2008/11/picture-12.png" alt="Picture 1.png" border="0" width="253" height="543" />  
Fig 1

**Another way is specifying a filter&#8230;**

1. In application.rb, specify a method that displays the *&#8216;admin&#8217;* layout if the user is admin.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">    <span style="color:#9966CC; font-weight:bold;">def</span> load_layout
      <span style="color:#9966CC; font-weight:bold;">if</span> admin?
        <span style="color:#0000FF; font-weight:bold;">self</span>.<span style="color:#9966CC; font-weight:bold;">class</span>.<span style="color:#9900CC;">layout</span><span style="color:#006600; font-weight:bold;">&#40;</span><span style="color:#996600;">'admin'</span><span style="color:#006600; font-weight:bold;">&#41;</span>
      <span style="color:#9966CC; font-weight:bold;">end</span>
    <span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

2. home_controller

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;"><span style="color:#9966CC; font-weight:bold;">class</span> HomeController <span style="color:#006600; font-weight:bold;">&lt;</span> ApplicationController
  before_filter <span style="color:#ff3333; font-weight:bold;">:load_layout</span>
<span style="color:#9966CC; font-weight:bold;">end</span></pre>
      </td>
    </tr>
  </table>
</div>

<img src="/images/2008/11/picture-2.png" alt="Picture 2.png" border="0" width="178" height="152" />  
Fig 2. admin.html.erb now exists in layouts/

Reference:  
<http://railscasts.com/episodes/125-dynamic-layouts>