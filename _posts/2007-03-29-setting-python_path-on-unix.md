---
title: Setting python_path on Unix
author: rupert
layout: post
permalink: /2007/03/setting-python_path-on-unix/
categories:
  - mapserver
  - tilecache
tags:
  - linux
  - python
---
At the time of this writing.. download mod_python-3.3.1.tgz

./configure &#8211;with-apxs=/usr/local/apache2/bin/apxs  
make  
make install

You need to pass the PYTHONPATH to apache..  
<directory>  
AddHandler python-program .py  
PythonHandler TileCache.Service  
PythonOption TileCacheConfig /usr/local/apache2/htdocs/tilecache/tilecache.cfg  
PythonDebug On  
PythonPath &#8220;sys.path + ['/usr/local/apache2/htdocs/tilecache/']&#8221;  
</directory>

In your bash shells, you could also check the PYTHONPATH&#8230;

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux views<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># python</span>
Python 2.3.4 <span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #666666; font-style: italic;">#1, Mar 10 2006, 06:12:09)</span>
<span style="color: #7a0874; font-weight: bold;">&#91;</span>GCC 3.4.5 <span style="color: #000000;">20051201</span> <span style="color: #7a0874; font-weight: bold;">&#40;</span>Red Hat 3.4.5-<span style="color: #000000;">2</span><span style="color: #7a0874; font-weight: bold;">&#41;</span><span style="color: #7a0874; font-weight: bold;">&#93;</span> on linux2
Type <span style="color: #ff0000;">"help"</span>, <span style="color: #ff0000;">"copyright"</span>, <span style="color: #ff0000;">"credits"</span> or <span style="color: #ff0000;">"license"</span> <span style="color: #000000; font-weight: bold;">for</span> <span style="color: #c20cb9; font-weight: bold;">more</span> information.
<span style="color: #000000; font-weight: bold;">&</span>gt;<span style="color: #000000; font-weight: bold;">&</span>gt;<span style="color: #000000; font-weight: bold;">&</span>gt; import sys
<span style="color: #000000; font-weight: bold;">&</span>gt;<span style="color: #000000; font-weight: bold;">&</span>gt;<span style="color: #000000; font-weight: bold;">&</span>gt; print sys.path
<span style="color: #7a0874; font-weight: bold;">&#91;</span><span style="color: #ff0000;">''</span>, <span style="color: #ff0000;">'/usr/lib/python23.zip'</span>, <span style="color: #ff0000;">'/usr/lib/python2.3'</span>, <span style="color: #ff0000;">'/usr/lib/python2.3/plat-linux2'</span>, <span style="color: #ff0000;">'/usr/lib/python2.3/lib-tk'</span>, <span style="color: #ff0000;">'/usr/lib/python2.3/lib-dynload'</span>, <span style="color: #ff0000;">'/usr/lib/python2.3/site-packages'</span>, <span style="color: #ff0000;">'/usr/lib/python2.3/site-packages/gtk-2.0'</span><span style="color: #7a0874; font-weight: bold;">&#93;</span>
<span style="color: #000000; font-weight: bold;">&</span>gt;<span style="color: #000000; font-weight: bold;">&</span>gt;<span style="color: #000000; font-weight: bold;">&</span>gt;</pre>
      </td>
    </tr>
  </table>
</div>