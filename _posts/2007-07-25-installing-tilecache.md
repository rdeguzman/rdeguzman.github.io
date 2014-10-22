---
title: Installing TileCache on RedHat/CentOS
author: rupert
layout: post
permalink: /2007/07/installing-tilecache/
aktt_tweeted:
  - 1
categories:
  - linux
  - mapserver
  - python
  - tilecache
tags:
  - apache
  - centos
  - python
  - tilecache
---
1. Install Apache  
./configure &#8211;prefix=/usr/local/apache2 &#8211;enable-so &#8211;enable-rewrite &#8211;with-mpm=prefork  
make  
make install  
rm -Rf /usr/local/apache2/htdocs/*

2. Install mod_python-3.3.1  
`<br />
./configure --with-apxs=/usr/local/apache2/bin/apxs<br />
make<br />
make install<br />
`

3. Install Python Imaging Library (PIL) &#8211; Imaging-1.1.6  
`<br />
python setup.py install<br />
`

Note: To check if PIL was successfully installed:  
#python selftest.py  
\*\\*\*Test Failed\*\** 1 failures.  
\*** 1 tests of 57 failed.

47 ln -s /usr/lib/libjpeg.so.62 /usr/lib/libjpeg.so  
48 ldconfig  
49 python setup.py install  
51 python selftest.py  
54 rm -rf Imaging-1.1.6  
55 tar -zxvf Imaging-1.1.6.tar.gz  
56 cd Imaging-1.1.6  
58 python selftest.py -> still fails  
59 python setup.py install  
60 python selftest.py -> ok

4. Check if mod_python was sucessfully installed.  
<http://www.dscpl.com.au/wiki/ModPython/Articles/GettingModPythonWorking>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="python" style="font-family:monospace;"><span style="color: black;">&#91;</span>root<span style="color: #66cc66;">@</span>rupert-centos pytest<span style="color: black;">&#93;</span><span style="color: #808080; font-style: italic;"># python</span>
Python 2.4.3 <span style="color: black;">&#40;</span><span style="color: #808080; font-style: italic;">#1, Mar 14 2007, 18:51:08)</span>
<span style="color: black;">&#91;</span>GCC 4.1.1 <span style="color: #ff4500;">20070105</span> <span style="color: black;">&#40;</span>Red Hat 4.1.1-<span style="color: #ff4500;">52</span><span style="color: black;">&#41;</span><span style="color: black;">&#93;</span> on linux2
Type <span style="color: #483d8b;">"help"</span><span style="color: #66cc66;">,</span> <span style="color: #483d8b;">"copyright"</span><span style="color: #66cc66;">,</span> <span style="color: #483d8b;">"credits"</span> <span style="color: #ff7700;font-weight:bold;">or</span> <span style="color: #483d8b;">"license"</span> <span style="color: #ff7700;font-weight:bold;">for</span> more information.
&gt<span style="color: #66cc66;">;</span>&gt<span style="color: #66cc66;">;</span>&gt<span style="color: #66cc66;">;</span> <span style="color: #ff7700;font-weight:bold;">import</span> mod_python
&gt<span style="color: #66cc66;">;</span>&gt<span style="color: #66cc66;">;</span>&gt<span style="color: #66cc66;">;</span> mod_python.<span style="color: black;">version</span>
<span style="color: #483d8b;">'3.3.1'</span>
&gt<span style="color: #66cc66;">;</span>&gt<span style="color: #66cc66;">;</span>&gt<span style="color: #66cc66;">;</span></pre>
      </td>
    </tr>
  </table>
</div>

4. Edit httpd.conf

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;">&lt;directory&gt;
 AddHandler python-program .py
 PythonHandler TileCache.Service
 PythonOption TileCacheConfig /usr/local/apache2/htdocs/tilecache/tilecache.cfg
 PythonDebug On
 PythonPath "sys.path + ['/usr/local/apache2/htdocs/tilecache/']"
&lt;/directory&gt;
&nbsp;
&lt;directory&gt;
 AddHandler mod_python .py
 PythonHandler test
 PythonDebug On
&lt;/directory&gt;</pre>
      </td>
    </tr>
  </table>
</div>

> Note: This syntax will work for all versions of mod\_python. In version 3.0 and later, the name of the mod\_python handler reference has actually been changed and thus it is now preferred to use &#8220;mod_python&#8221; instead of &#8220;python-program&#8221;. The old name though is still supported and will be used here to avoid confusion for those using version 2.7.

5. Test your python

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="python" style="font-family:monospace;"><span style="color: #ff7700;font-weight:bold;">from</span> mod_python <span style="color: #ff7700;font-weight:bold;">import</span> apache
&nbsp;
<span style="color: #ff7700;font-weight:bold;">def</span> handler<span style="color: black;">&#40;</span>req<span style="color: black;">&#41;</span>:
      req.<span style="color: black;">log_error</span><span style="color: black;">&#40;</span><span style="color: #483d8b;">'handler'</span><span style="color: black;">&#41;</span>
      req.<span style="color: black;">content_type</span> <span style="color: #66cc66;">=</span> <span style="color: #483d8b;">'text/plain'</span>
      req.<span style="color: black;">send_http_header</span><span style="color: black;">&#40;</span><span style="color: black;">&#41;</span>
      req.<span style="color: black;">write</span><span style="color: black;">&#40;</span><span style="color: #483d8b;">'mptest.py<span style="color: #000099; font-weight: bold;">\n</span>'</span><span style="color: black;">&#41;</span>
      <span style="color: #ff7700;font-weight:bold;">return</span> apache.<span style="color: black;">OK</span></pre>
      </td>
    </tr>
  </table>
</div>