---
title: Long Time No Trac
author: rupert
layout: post
permalink: /2008/11/long-time-no-trac/
aktt_tweeted:
  - 1
tags:
  - trac
---
Its been a while I haven&#8217;t setup an svn repository for SCM. Anyhow, here are the steps just in case I forget again and again&#8230;

1. Add a new trac setting in /etc/apache2/sites-available/default

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;">&nbsp;</pre>
      </td>
    </tr>
  </table>
</div>

2. Copy a template

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #c20cb9; font-weight: bold;">cp</span> <span style="color: #660033;">-Rf</span> <span style="color: #000000; font-weight: bold;">/</span>var<span style="color: #000000; font-weight: bold;">/</span>www<span style="color: #000000; font-weight: bold;">/</span>trac<span style="color: #000000; font-weight: bold;">/</span>trac-template <span style="color: #000000; font-weight: bold;">/</span>var<span style="color: #000000; font-weight: bold;">/</span>www<span style="color: #000000; font-weight: bold;">/</span>localdumplings</pre>
      </td>
    </tr>
  </table>
</div>

3. Restart Apache2

4. Resync the repository

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">trac-admin localdumpling resync</pre>
      </td>
    </tr>
  </table>
</div>