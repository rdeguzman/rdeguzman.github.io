---
title: HTTP access_log analysis
author: rupert
layout: post
permalink: /2007/06/http-access_log-analysis/
categories:
  - linux
tags:
  - apache
---
1. In order to report execution times, include a &#8220;%T&#8221; in your httpd.conf as follows:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;">    #
    # The following directives define some format nicknames for use with
    # a CustomLog directive (see below).
    #
    LogFormat "%h %l %u %t \"%r\" %&gt;s %b \"%{Referer}i\" \"%{User-Agent}i\"" combined
    LogFormat "%h %l %u %t \"%r\" %&gt;s %b %T" common
&nbsp;
    &lt;ifmodule&gt;
      # You need to enable mod_logio.c to use %I and %O
      LogFormat "%h %l %u %t \"%r\" %&gt;s %b \"%{Referer}i\" \"%{User-Agent}i\" %I %O" combinedio
    &lt;/ifmodule&gt;
&nbsp;
    #
    # The location and format of the access logfile (Common Logfile Format).
    # If you do not define any access logfiles within a &lt;virtualhost&gt;
    # container, they will be logged here.  Contrariwise, if you *do*
    # define per-&lt;/virtualhost&gt;&lt;virtualhost&gt; access logfiles, transactions will be
    # logged therein and *not* in this file.
    #
    CustomLog logs/access.log common
&lt;/virtualhost&gt;</pre>
      </td>
    </tr>
  </table>
</div>

2. There are many log analysis softwares (webalizer, awstats, etc) out there, but most of them are outdated. I found this nifty little tool called visitor from [www.hping.org][1]. Freely distributed for unix but demo versions for windows build. Here&#8217;s a [demo][2].

 [1]: http://www.hping.org/visitors/
 [2]: /wordpress/images/report.html