---
title: Simulating Javascript Keydown in Capybara
author: rupert
layout: post
permalink: /2013/02/simulating-javascript-keydown-in-capybara/
categories:
  - rails
tags:
  - capybara
  - javascript
  - rails
---
How do you write an rspec test for a [Google Places Autocomplete][1]?  
<img src="/images/2013/02/address_search.png" alt="address_search.png" border="0" width="380" height="144" />

1. Use <https://github.com/rdeguzman/jquery-ui/blob/ticker/tests/jquery.simulate.js>

2. Trigger &#8220;keydown&#8221; event using simulate method.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="ruby" style="font-family:monospace;">    fill_in <span style="color:#996600;">'address_search_textfield'</span>, <span style="color:#ff3333; font-weight:bold;">:with</span> <span style="color:#006600; font-weight:bold;">=&gt;</span> text
    <span style="color:#CC0066; font-weight:bold;">sleep</span> <span style="color:#006666;">2</span>
&nbsp;
    script1 = <span style="color:#996600;">'$("#address_search_textfield").trigger("focus");'</span>
    page.<span style="color:#9900CC;">driver</span>.<span style="color:#9900CC;">browser</span>.<span style="color:#9900CC;">execute_script</span><span style="color:#006600; font-weight:bold;">&#40;</span>script1<span style="color:#006600; font-weight:bold;">&#41;</span>
    <span style="color:#CC0066; font-weight:bold;">sleep</span> <span style="color:#006666;">1</span>
&nbsp;
    script2 = <span style="color:#996600;">'$("#address_search_textfield").simulate("keydown", { keyCode: $.ui.keyCode.DOWN });'</span>
    page.<span style="color:#9900CC;">driver</span>.<span style="color:#9900CC;">browser</span>.<span style="color:#9900CC;">execute_script</span><span style="color:#006600; font-weight:bold;">&#40;</span>script2<span style="color:#006600; font-weight:bold;">&#41;</span>
    <span style="color:#CC0066; font-weight:bold;">sleep</span> <span style="color:#006666;">1</span>
&nbsp;
    script3 = <span style="color:#996600;">'$("#address_search_textfield").simulate("keydown", { keyCode: $.ui.keyCode.ENTER });'</span>
    page.<span style="color:#9900CC;">driver</span>.<span style="color:#9900CC;">browser</span>.<span style="color:#9900CC;">execute_script</span><span style="color:#006600; font-weight:bold;">&#40;</span>script3<span style="color:#006600; font-weight:bold;">&#41;</span>
    <span style="color:#CC0066; font-weight:bold;">sleep</span> <span style="color:#006666;">1</span>
&nbsp;
    page.<span style="color:#9900CC;">should</span> have_link<span style="color:#006600; font-weight:bold;">&#40;</span>text<span style="color:#006600; font-weight:bold;">&#41;</span></pre>
      </td>
    </tr>
  </table>
</div>

 [1]: https://developers.google.com/places/documentation/autocomplete