---
title: Installing MS4W, Python2.4, ColdFusion6.1
author: rupert
layout: post
permalink: /2007/01/installing-ms4w-python24-coldfusion61/
categories:
  - mapserver
  - ms4w
tags:
  - cf
  - mapserver
  - python
---
For Windows:

**A. Installing MS4W**  
1. Download ms4w2.2 from [maptools.org][1]

2. Extract ms4w2.2 into your root drive (E:\)

3. Run E:\ms4w\apache-install.bat. This would install apache2.2 as a service.

4. Edit E:\ms4w\Apache\conf\httpd.conf to reflect your webroot in &#8220;DocumentRoot&#8221; (E:\wwwroot\)

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000;">149</span> DocumentRoot <span style="color: #ff0000;">"/wwwroot"</span>
...
....
<span style="color: #000000;">177</span> <span style="color: #000000; font-weight: bold;">&lt;</span>directory<span style="color: #000000; font-weight: bold;">&gt;</span>
    <span style="color: #666666; font-style: italic;">#</span>
    <span style="color: #666666; font-style: italic;"># Possible values for the Options directive are "None", "All",</span>
    <span style="color: #666666; font-style: italic;"># or any combination of:</span>
    <span style="color: #666666; font-style: italic;">#   Indexes Includes FollowSymLinks SymLinksifOwnerMatch ExecCGI MultiViews</span>
    <span style="color: #666666; font-style: italic;">#</span>
    <span style="color: #666666; font-style: italic;"># Note that "MultiViews" must be named *explicitly* --- "Options All"</span>
    <span style="color: #666666; font-style: italic;"># doesn't give it to you.</span>
    <span style="color: #666666; font-style: italic;">#</span>
    <span style="color: #666666; font-style: italic;"># The Options directive is both complicated and important.  Please see</span>
    <span style="color: #666666; font-style: italic;"># http://httpd.apache.org/docs/2.2/mod/core.html#options</span>
    <span style="color: #666666; font-style: italic;"># for more information.</span>
    <span style="color: #666666; font-style: italic;">#</span>
    Options Indexes FollowSymLinks
&nbsp;
    <span style="color: #666666; font-style: italic;">#</span>
    <span style="color: #666666; font-style: italic;"># AllowOverride controls what directives may be placed in .htaccess files.</span>
    <span style="color: #666666; font-style: italic;"># It can be "All", "None", or any combination of the keywords:</span>
    <span style="color: #666666; font-style: italic;">#   Options FileInfo AuthConfig Limit</span>
    <span style="color: #666666; font-style: italic;">#</span>
    AllowOverride None
&nbsp;
    <span style="color: #666666; font-style: italic;">#</span>
    <span style="color: #666666; font-style: italic;"># Controls who can get stuff from this server.</span>
    <span style="color: #666666; font-style: italic;">#</span>
    Order allow,deny
    Allow from all
<span style="color: #000000;">205</span> <span style="color: #000000; font-weight: bold;">&lt;/</span>directory<span style="color: #000000; font-weight: bold;">&gt;</span>
....
....
<span style="color: #000000;">212</span> DirectoryIndex index.html index.html.var index.php index.phtml index.php3 index.cfm
....
....</pre>
      </td>
    </tr>
  </table>
</div>

5. Test apache, navigate to &#8220;http://127.0.0.1/&#8221;.

**B. Configuring Apache2.2 with ColdFusion6.1**  
6. Since Apache2.2 was released after CF6.1 and CF7.0 then, it would only bind with Apache2.0.x. We need a new wsconfig.jar that would bind with Apache2.2.x. Read more about the technote:  
<http://www.adobe.com/cfusion/knowledgebase/index.cfm?id=8001e97>

Alternatively, you could download wsconfig.jar from <http://www.adobe.com/support/coldfusion/ts/documents/8001e97/wsconfig.zip>

7. Backup your existing wsconfig.jar to wsconfig.jar.bak. Replace the wsconfig.jar.

8. Restart ColdFusion.

9. Remove existing connectors from D:\CFusionMX\bin\connectors\Remove\_ALL\_connectors.bat

10. Execute D:\CFusionMX\bin\connectors\Apache_connector.bat

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="winbatch" style="font-family:monospace;"><span style="color: #66cc66;">@</span>echo <span style="color: #0080FF; font-weight: bold;">off</span>
echo WARNING<span style="color: #66cc66;">!</span>  This will install the ColdFusion MX Apache Connector.
echo Press Control<span style="color: #66cc66;">+</span>C <span style="color: #800080;">to</span> abort.
<span style="color: #0000FF;">pause</span>
SETLOCAL
PATH=..\..\runtime\jre\bin<span style="color: #008000; font-style: italic;">;%PATH%</span>
java <span style="color: #66cc66;">-</span>jar ..\..\runtime\lib\wsconfig.jar  <span style="color: #66cc66;">-</span>ws apache <span style="color: #66cc66;">-</span>bin <span style="color: #ff0000;">"e:\\ms4w\Apache\bin\httpd.exe"</span> <span style="color: #66cc66;">-</span>dir <span style="color: #ff0000;">"e:\\ms4w\apache\conf"</span> <span style="color: #66cc66;">-</span>map .cfm,.cfc,.cfml <span style="color: #66cc66;">-</span>coldfusion <span style="color: #66cc66;">-</span>v
ENDLOCAL</pre>
      </td>
    </tr>
  </table>
</div>

11. Restart Apache and ColdFusion. Browse to <http://127.0.0.1/cfide/administrator/index.cfm>

**C. Installing Python2.4**  
1. Read Reference document from [maptools.org install site][2]

2. Download Python2.4 from <http://www.python.org/ftp/python/2.4/python-2.4.msi>. Download mod_python from [mod_python-3.3.0b.win32-py2.4-Apache2.2.exe][3]

3. Install Python2.4 in your root drive. (D:\)

4. Install mod_python-3.3.0b.win32-py2.4-Apache2.2.exe

5. Edit your Windows Environment Variables (System Variable: PATH) to include &#8220;D:\Python23&#8243;

6. Edit E:\ms4w\Apache\conf\httpd.conf

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #666666; font-style: italic;">#For Python</span>
LoadModule python_module modules<span style="color: #000000; font-weight: bold;">/</span>mod_python.so
&nbsp;
<span style="color: #000000; font-weight: bold;">&lt;</span>directory<span style="color: #000000; font-weight: bold;">&gt;</span>
	AddHandler python-program .py
	PythonHandler <span style="color: #7a0874; font-weight: bold;">test</span>
	PythonDebug On
<span style="color: #000000; font-weight: bold;">&lt;/</span>directory<span style="color: #000000; font-weight: bold;">&gt;</span>
&nbsp;
ScriptInterpreterSource Registry
SetEnv PYTHONUNBUFFERED <span style="color: #000000;">1</span>
PassEnv PYTHONPATH</pre>
      </td>
    </tr>
  </table>
</div>

7. Restart Apache and test from <http://127.0.0.1/pytest/test.py>. If you see a &#8220;Hello World&#8221; web page from python then you are good to go. Sample python test page &#8220;test.py&#8221;:  
E:\wwwroot\pytest\test.py

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="python" style="font-family:monospace;"><span style="color: #ff7700;font-weight:bold;">from</span> mod_python <span style="color: #ff7700;font-weight:bold;">import</span> apache
&nbsp;
<span style="color: #ff7700;font-weight:bold;">def</span> handler<span style="color: black;">&#40;</span>req<span style="color: black;">&#41;</span>:
	req.<span style="color: black;">content_type</span> <span style="color: #66cc66;">=</span> <span style="color: #483d8b;">'text/plain'</span>
	req.<span style="color: black;">write</span><span style="color: black;">&#40;</span><span style="color: #483d8b;">"Hello World!"</span><span style="color: black;">&#41;</span>
	<span style="color: #ff7700;font-weight:bold;">return</span> apache.<span style="color: black;">OK</span></pre>
      </td>
    </tr>
  </table>
</div>

 [1]: http://www.maptools.org/ms4w/index.phtml?page=downloads.html
 [2]: http://www.maptools.org/ms4w/index.phtml?page=README_INSTALL.html
 [3]: http://www.eng.lsu.edu/mirrors/apache/httpd/modpython/win/3.3.0b/mod_python-3.3.0b.win32-py2.4-Apache2.2.exe