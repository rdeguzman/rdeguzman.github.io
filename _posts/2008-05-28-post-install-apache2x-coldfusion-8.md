---
title: Post Install Apache2.x, ColdFusion 8
author: rupert
layout: post
permalink: /2008/05/post-install-apache2x-coldfusion-8/
aktt_tweeted:
  - 1
categories:
  - debian
tags:
  - apache
  - cf
  - debian
---
After binding Apache2.x and ColdFusion 8, I find it very useful to follow the post-install instructions below:

1. Copying ColdFusion Admin directory to /wwwroot (webroot)

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #666666; font-style: italic;"># ln -s /var/www /wwwroot</span>
<span style="color: #666666; font-style: italic;"># cp -Rf /opt/coldfusion8/wwwroot/CFIDE /wwwroot/</span>
<span style="color: #666666; font-style: italic;"># rm /wwwroot/index.html</span>
<span style="color: #666666; font-style: italic;"># cd /wwwroot</span>
<span style="color: #666666; font-style: italic;"># ln -s CFIDE cfide</span></pre>
      </td>
    </tr>
  </table>
</div>

2. Adding index.cfm to DirectoryIndex.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #666666; font-style: italic;"># vim /etc/apache2/mods-available/dir.conf</span>
DirectoryIndex index.html index.cgi index.pl index.php index.xhtml index.htm index.cfm</pre>
      </td>
    </tr>
  </table>
</div>

3. Restart apache

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>init.d<span style="color: #000000; font-weight: bold;">/</span>apache2 stop 
<span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>init.d<span style="color: #000000; font-weight: bold;">/</span>apache2 start</pre>
      </td>
    </tr>
  </table>
</div>

4. Browse Admin page for the first time