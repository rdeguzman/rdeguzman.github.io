---
title: Installing Chinese Font for Mapserver
author: rupert
layout: post
permalink: /2008/07/installing-chinese-font-for-mapserver/
aktt_tweeted:
  - 1
categories:
  - china
tags:
  - china
  - mapserver
---
We wanted to use a different font for mapserver which is *Microsoft Yahei* instead of *zysong*. Apparently, mapserver have some issues with path problems or with the ttf having more than one word as a font name. 

Thanks to [Martin Hosken&#8217;s perl modules for fonts][1], we were able to rename the Microsoft Yahei TTF to msyh.ttf.

1. Download: (a) Font-TTF-0.45 (b) Font-TTF-Scripts-0.11.1

2. Unzip

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #666666; font-style: italic;">#perl Makefile.pl</span>
<span style="color: #666666; font-style: italic;">#make</span>
<span style="color: #666666; font-style: italic;">#make install</span></pre>
      </td>
    </tr>
  </table>
</div>

3. ttfname

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">rupert:Desktop rupert$ ttfname
Usage:
ttfname <span style="color: #7a0874; font-weight: bold;">&#91;</span>-f <span style="color: #ff0000;">"full_name"</span><span style="color: #7a0874; font-weight: bold;">&#93;</span> <span style="color: #660033;">-n</span> <span style="color: #ff0000;">"name"</span> <span style="color: #7a0874; font-weight: bold;">&#91;</span>-t num<span style="color: #7a0874; font-weight: bold;">&#93;</span> <span style="color: #7a0874; font-weight: bold;">&#91;</span>-q<span style="color: #7a0874; font-weight: bold;">&#93;</span> infile.ttf outfile.ttf 
Renames the TTF with the given name and outputs the newly named font to out.ttf.
Options:
      <span style="color: #660033;">-f</span> <span style="color: #ff0000;">"name"</span>   specifies new full name <span style="color: #7a0874; font-weight: bold;">&#40;</span>optional<span style="color: #7a0874; font-weight: bold;">&#41;</span> <span style="color: #c20cb9; font-weight: bold;">as</span> opposed to the
                  default calculated form.
      <span style="color: #660033;">-l</span> lang     language number to use <span style="color: #7a0874; font-weight: bold;">&#40;</span>default all langs<span style="color: #7a0874; font-weight: bold;">&#41;</span>
                  <span style="color: #000000; font-weight: bold;">if</span> specified name entries will be added <span style="color: #000000; font-weight: bold;">for</span> all platforms and
                      encodings covered by the cmap <span style="color: #000000; font-weight: bold;">if</span> not already there
      <span style="color: #660033;">-n</span> <span style="color: #ff0000;">"name"</span>   specifies new font family name <span style="color: #7a0874; font-weight: bold;">&#40;</span>not optional<span style="color: #7a0874; font-weight: bold;">&#41;</span>
      <span style="color: #660033;">-q</span>          disable signon message
      <span style="color: #660033;">-s</span> filename overrides <span style="color: #660033;">-n</span> and gets string from file. Useful <span style="color: #000000; font-weight: bold;">for</span> <span style="color: #660033;">-t</span>
      <span style="color: #660033;">-t</span> num      overrides the normal naming areas to change another
                  string <span style="color: #660033;">-f</span> becomes inactive.
<span style="color: #666666; font-style: italic;">#ttfname -f "Microsoft YaHei" -n "msyh" Microsoft\ YaHei.ttf msyh.ttf</span></pre>
      </td>
    </tr>
  </table>
</div>

<img src="/images/2008/07/picture-11.png" alt="Picture 1.png" border="0" width="280" height="262" />

 [1]: http://search.cpan.org/~mhosken/