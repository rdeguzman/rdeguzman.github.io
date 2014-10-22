---
title: Installing Trac on CentOS4
author: rupert
layout: post
permalink: /2007/06/installing-trac-on-centos4/
categories:
  - linux
  - subversion
tags:
  - apache
  - centos
  - linux
  - svn
  - trac
---
There is a problem with clearsilver on CentOS systems. I get neo_cgi.so module not found. Don&#8217;t force yourself, it would simply not work (Trac0.10.4 on CentOS, not unless we try the DAG repositories).

So, I have to use Trac 0.11, setuptools and Genshi.

Prerequisites:  
&#8211; Must have python 2.3+  
&#8211; Must have mod_python-3.3.1.tgz  
&#8211; Must have httpd2.0.x+ or httpd2.2.x

**A. Core Trac Installation**

1. Install [setuptools-0.6c6-py2.3.egg.][1] Download the setuptools according to your python distribution and simply run:

`sh setuptools-0.6c4-py2.3.egg`

2. Install [Genshi.][2] There are numerous ways of installing [Genshi.][3]

`easy_install Genshi`

or

`<br />
#wget http://ftp.edgewall.com/pub/genshi/Genshi-0.4.2-py2.3.egg<br />
#chmod +x Genshi-0.4.2-py2.3.egg<br />
#easy_install Genshi-0.4.2-py2.3.egg<br />
`

3. Install [Trac 0.11.][4] We need to install trac from svn  
#svn co http://svn.edgewall.org/repos/trac/trunk trac  
#python ./setup.py install

This would install trac-admin and tracd in /usr/bin.

**Trac Post Intall**  
`<br />
#mkdir -p /var/www/trac<br />
#cd /var/www/trac<br />
#trac-admin /var/www/trac/poimgr initenv<br />
#chown -Rf nobody:root /var/www<br />
#chmod -Rf 755 /var/www<br />
`

Just accept the defaults for now, we can change it later on /var/www/trac/poimgr/conf/trac.ini.

**C. Apache Configuration**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;">LoadModule python_module /usr/local/apache2/modules/mod_python.so
&nbsp;
&lt;location&gt;
SetHandler mod_python
PythonHandler trac.web.modpython_frontend
PythonOption TracEnv /var/www/trac/poimgr
PythonOption TracUriRoot /trac/poimgr
#Order deny,allow
#Deny from all
#Allow from 192.168.1.0/24
AuthType Basic
AuthName "TRAC-POIMGR"
AuthUserFile "/repos/svn-auth-file"
require valid-user
&lt;/location&gt;</pre>
      </td>
    </tr>
  </table>
</div>

Notes:  
<http://www.yolinux.com/TUTORIALS/LinuxSubversionAndTracServer.html>

Depending on your installation, you may encounter some problems. I had problems with expat errors:

`<br />
ExpatError (null): line 1,column 0.<br />
`

Turns out that it was confused between the link libraries of apache and that of python.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #666666; font-style: italic;">#ps aux | grep http | head -3</span>
<span style="color: #666666; font-style: italic;">#sof -p 29982 | grep expat</span>
<span style="color: #666666; font-style: italic;"># strings libexpat.so.0.1.0 | grep expat_</span>
expat_1.95.2
<span style="color: #666666; font-style: italic;"># strings /usr/lib/python2.3/lib-dynload/pyexpat.so | grep expat_</span>
expat_1.95.7
&nbsp;
Quickfix is to use symbolic links:
<span style="color: #666666; font-style: italic;">#cd /usr/local/apache2/lib/</span>
<span style="color: #666666; font-style: italic;">#cp -Rf /usr/lib/libexpat.so.0.5.0 /usr/local/apache2/lib/</span>
<span style="color: #666666; font-style: italic;">#ln -s libexpat.so.0.5.0 libexpat.so</span>
<span style="color: #666666; font-style: italic;">#ln -s libexpat.so.0.5.0 libexpat.so.0</span>
<span style="color: #666666; font-style: italic;">#su -l</span>
<span style="color: #666666; font-style: italic;">#/etc/init.d/httpd restart</span></pre>
      </td>
    </tr>
  </table>
</div>

Configuring Trac.  
1. I have to move /etc/svn-auth-file to /repos-auth-file. Change the permissions so &#8220;nobody&#8221; could access it.

2. How to configure my users? Well, since its an intranet application and my trac-users and developers is both in the svn-auth-file, I need a way to configure users easily. Follow these steps from [trac-hack.][5]  
`<br />
easy_install http://trac-hacks.org/svn/accountmanagerplugin/trunk<br />
`

Role base authorisation in trac

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">trac-admin <span style="color: #000000; font-weight: bold;">/</span>var<span style="color: #000000; font-weight: bold;">/</span>www<span style="color: #000000; font-weight: bold;">/</span>trac<span style="color: #000000; font-weight: bold;">/</span>poiclient permission remove anonymous \
TICKET_CREATE TICKET_MODIFY WIKI_CREATE WIKI_MODIFY
&nbsp;
<span style="color: #000000; font-weight: bold;">for</span> n <span style="color: #000000; font-weight: bold;">in</span> rupert andrew; <span style="color: #000000; font-weight: bold;">do</span>
trac-admin <span style="color: #000000; font-weight: bold;">/</span>var<span style="color: #000000; font-weight: bold;">/</span>www<span style="color: #000000; font-weight: bold;">/</span>trac<span style="color: #000000; font-weight: bold;">/</span><span style="color: #7a0874; font-weight: bold;">&#123;</span>app_name<span style="color: #7a0874; font-weight: bold;">&#125;</span> permission add <span style="color: #007800;">$n</span> TRAC_ADMIN
<span style="color: #000000; font-weight: bold;">done</span>
&nbsp;
<span style="color: #000000; font-weight: bold;">for</span> n <span style="color: #000000; font-weight: bold;">in</span> rupert andrew; <span style="color: #000000; font-weight: bold;">do</span>
trac-admin <span style="color: #000000; font-weight: bold;">/</span>var<span style="color: #000000; font-weight: bold;">/</span>www<span style="color: #000000; font-weight: bold;">/</span>trac<span style="color: #000000; font-weight: bold;">/</span><span style="color: #7a0874; font-weight: bold;">&#123;</span>app_name<span style="color: #7a0874; font-weight: bold;">&#125;</span> permission add <span style="color: #007800;">$n</span> WIKI_DELETE
<span style="color: #000000; font-weight: bold;">done</span>
&nbsp;
trac-admin <span style="color: #000000; font-weight: bold;">/</span>var<span style="color: #000000; font-weight: bold;">/</span>www<span style="color: #000000; font-weight: bold;">/</span>trac<span style="color: #000000; font-weight: bold;">/</span>poiclient permission add authenticated \
BROWSER_VIEW CHANGESET_VIEW FILE_VIEW LOG_VIEW MILESTONE_VIEW \
REPORT_SQL_VIEW REPORT_VIEW ROADMAP_VIEW SEARCH_VIEW \
TICKET_CREATE TICKET_MODIFY TICKET_VIEW TIMELINE_VIEW \
WIKI_CREATE WIKI_MODIFY WIKI_VIEW</pre>
      </td>
    </tr>
  </table>
</div>

3. Here&#8217;s my trac.ini. Things to look at is the *notification* and *account-manager*.

4. Deleting a Trac Ticket:  
`<br />
# sqlite3 trac.db<br />
delete from ticket_custom where ticket = [ticketID];<br />
delete from ticket_change where ticket = [ticketID];<br />
delete from ticket where id = [ticketID];<br />
`

Other References:  
<http://www.dscpl.com.au/wiki/ModPython/Articles/ExpatCausingApacheCrash>  
<http://www.yolinux.com/TUTORIALS/LinuxSubversionAndTracServer.html>  
[Trac and Multiple Subversion Repositories][6]

Future Work:  
<http://insurrection.tigris.org/>

 [1]: http://cheeseshop.python.org/pypi/setuptools/
 [2]: http://genshi.edgewall.org/
 [3]: http://genshi.edgewall.org/wiki/Download
 [4]: http://trac.edgewall.org/wiki/TracDownload
 [5]: http://trac-hacks.org/wiki/AccountManagerPlugin
 [6]: http://lists.edgewall.com/archive/trac/2004-April/000175.html