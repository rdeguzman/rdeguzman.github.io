---
title: freebsd + apache + php
author: rupert
layout: post
permalink: /2012/02/freebsd-apache-php/
categories:
  - freebsd
tags:
  - freebsd
---
**1. Install apache22**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #7a0874; font-weight: bold;">cd</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>ports<span style="color: #000000; font-weight: bold;">/</span>www<span style="color: #000000; font-weight: bold;">/</span>apache22
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">make</span> config
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">make</span> <span style="color: #c20cb9; font-weight: bold;">install</span> clean</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">vim</span> <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>rc.conf
<span style="color: #007800;">apache22_enable</span>=YES</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">/usr/local/etc/rc.d/apache22 start</pre>
      </td>
    </tr>
  </table>
</div>

**2. Install php52**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #7a0874; font-weight: bold;">cd</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>ports<span style="color: #000000; font-weight: bold;">/</span>lang<span style="color: #000000; font-weight: bold;">/</span>php52
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">make</span> config <span style="color: #666666; font-style: italic;">#enable APACHE module</span>
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">make</span>
<span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">make</span> <span style="color: #c20cb9; font-weight: bold;">install</span> clean
Installing PHP CLI binary:        <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>
Installing PHP CLI <span style="color: #c20cb9; font-weight: bold;">man</span> page:      <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>man<span style="color: #000000; font-weight: bold;">/</span>man1<span style="color: #000000; font-weight: bold;">/</span>
Installing PHP CGI binary: <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>
Installing build environment:     <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>lib<span style="color: #000000; font-weight: bold;">/</span>php<span style="color: #000000; font-weight: bold;">/</span>build<span style="color: #000000; font-weight: bold;">/</span>
Installing header files:          <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>include<span style="color: #000000; font-weight: bold;">/</span>php<span style="color: #000000; font-weight: bold;">/</span>
Installing helper programs:       <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>
  program: phpize
  program: php-config
....
      This port has installed the following files <span style="color: #c20cb9; font-weight: bold;">which</span> may act <span style="color: #c20cb9; font-weight: bold;">as</span> network
      servers and may therefore pose a remote security risk to the system.
<span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>libexec<span style="color: #000000; font-weight: bold;">/</span>apache22<span style="color: #000000; font-weight: bold;">/</span>libphp5.so
<span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>php
<span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>php-cgi
...</pre>
      </td>
    </tr>
  </table>
</div>

<img src="/images/2012/02/enable_apache.png" alt="enable_apache.png" border="0" width="495" height="168" />

**3 Configure Apache for php**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">%</span> <span style="color: #c20cb9; font-weight: bold;">vim</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>apache22<span style="color: #000000; font-weight: bold;">/</span>httpd.conf</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;">LoadModule php5_module        libexec/apache22/libphp5.so</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;">&lt;IfModule dir_module&gt;
    DirectoryIndex index.html index.php
&lt;/IfModule&gt;</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;">&lt;IfModule mime_module&gt;
    AddType application/x-httpd-php .php
    AddType application/x-httpd-php-source .phps
&lt;/IfModule&gt;</pre>
      </td>
    </tr>
  </table>
</div>