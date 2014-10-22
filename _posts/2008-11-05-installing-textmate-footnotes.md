---
title: 'Rails Note #3: Installing Footnotes for RAILS'
author: rupert
layout: post
permalink: /2008/11/installing-textmate-footnotes/
aktt_tweeted:
  - 1
categories:
  - rails
tags:
  - rails
---
1. Install GIT from <http://code.google.com/p/git-osx-installer/>

2. <http://josevalim.blogspot.com/2008/05/footnotes-v30.html> &#8211; Jose Valim is now maintaining footnotes

3. How to install?

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #7a0874; font-weight: bold;">cd</span> myapp<span style="color: #000000; font-weight: bold;">/</span>vendor<span style="color: #000000; font-weight: bold;">/</span>plugins
<span style="color: #c20cb9; font-weight: bold;">git clone</span> git:<span style="color: #000000; font-weight: bold;">//</span>github.com<span style="color: #000000; font-weight: bold;">/</span>drnic<span style="color: #000000; font-weight: bold;">/</span>rails-footnotes.git footnotes
<span style="color: #c20cb9; font-weight: bold;">rm</span> <span style="color: #660033;">-rf</span> footnotes<span style="color: #000000; font-weight: bold;">/</span>.git</pre>
      </td>
    </tr>
  </table>
</div>

In summary, you are better off installing the plugin from GIT instead of SVN if you are using rails 2.1.x or edge ( at the time this post was written)

**UPDATE**

If you are receiving 500 Internal Server Error when having errors on your views then please read below..

If you are running on Rails 2.1.x, you should use Footnotes v3.2.2:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">    <span style="color: #7a0874; font-weight: bold;">cd</span> myapp
    <span style="color: #c20cb9; font-weight: bold;">git clone</span> git:<span style="color: #000000; font-weight: bold;">//</span>github.com<span style="color: #000000; font-weight: bold;">/</span>drnic<span style="color: #000000; font-weight: bold;">/</span>rails-footnotes.git vendor<span style="color: #000000; font-weight: bold;">/</span>plugins<span style="color: #000000; font-weight: bold;">/</span>footnotes
    <span style="color: #7a0874; font-weight: bold;">cd</span> vendor<span style="color: #000000; font-weight: bold;">/</span>plugins<span style="color: #000000; font-weight: bold;">/</span>footnotes
    <span style="color: #c20cb9; font-weight: bold;">git checkout</span> v3.2.2
    <span style="color: #c20cb9; font-weight: bold;">rm</span> <span style="color: #660033;">-rf</span> .<span style="color: #000000; font-weight: bold;">/</span>.git</pre>
      </td>
    </tr>
  </table>
</div>

If you are running on Rails 2.0.x or Rails 1.x, you should use Footnotes v3.0:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">    <span style="color: #7a0874; font-weight: bold;">cd</span> myapp
    <span style="color: #c20cb9; font-weight: bold;">git clone</span> git:<span style="color: #000000; font-weight: bold;">//</span>github.com<span style="color: #000000; font-weight: bold;">/</span>drnic<span style="color: #000000; font-weight: bold;">/</span>rails-footnotes.git vendor<span style="color: #000000; font-weight: bold;">/</span>plugins<span style="color: #000000; font-weight: bold;">/</span>footnotes
    <span style="color: #7a0874; font-weight: bold;">cd</span> vendor<span style="color: #000000; font-weight: bold;">/</span>plugins<span style="color: #000000; font-weight: bold;">/</span>footnotes
    <span style="color: #c20cb9; font-weight: bold;">git checkout</span> v3.0
    <span style="color: #c20cb9; font-weight: bold;">rm</span> <span style="color: #660033;">-rf</span> .<span style="color: #000000; font-weight: bold;">/</span>.git</pre>
      </td>
    </tr>
  </table>
</div>

Remember that in Rails 1.x, after filters appear first than before filters in the Filters tab.