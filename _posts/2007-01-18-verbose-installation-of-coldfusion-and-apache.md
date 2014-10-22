---
title: Verbose Installation of ColdFusion and Apache in Linux
author: rupert
layout: post
permalink: /2007/01/verbose-installation-of-coldfusion-and-apache/
categories:
  - coldfusion
tags:
  - apache
  - cf
  - linux
---
You would find all the installers here:

http://192.168.1.10/installers/

1. Edit hosts file as follows:

[root@appserver php]# more /etc/hosts

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #666666; font-style: italic;"># Do not remove the following line, or various programs</span>
<span style="color: #666666; font-style: italic;"># that require network functionality will fail.</span>
127.0.0.1               localhost.localdomain localhost
192.168.1.10            appserver</pre>
      </td>
    </tr>
  </table>
</div>

2. Edit your host as follows:  
[root@appserver php]# more /etc/sysconfig/network

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #007800;">NETWORKING</span>=<span style="color: #c20cb9; font-weight: bold;">yes</span>
<span style="color: #007800;">HOSTNAME</span>=appserver
<span style="color: #007800;">GATEWAY</span>=192.168.1.1</pre>
      </td>
    </tr>
  </table>
</div>

3. Apache:

http://192.168.1.10/installers/httpd-2.0.58.tar.gz

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #666666; font-style: italic;"># tar -zxvf httpd-2.0.58.tar.gz</span>
<span style="color: #666666; font-style: italic;"># cd httpd-2.0.58</span>
<span style="color: #666666; font-style: italic;"># ./configure --help</span>
<span style="color: #666666; font-style: italic;"># ./configure --prefix=/usr/local/apache2 --enable-so --with-mpm=prefork --enable-rewrite</span>
<span style="color: #666666; font-style: italic;"># make</span>
<span style="color: #666666; font-style: italic;"># make install</span></pre>
      </td>
    </tr>
  </table>
</div>

3.1 Starting apache2 on boot

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #666666; font-style: italic;">#cd /usr/local/apache2/bin</span>
<span style="color: #666666; font-style: italic;">#cp -Rf apachectl /etc/init.d/httpd</span></pre>
      </td>
    </tr>
  </table>
</div>

3.2 Edit httpd as follows

#cd /etc/init.d  
#vi httpd

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #666666; font-style: italic;">#!/bin/sh</span>
<span style="color: #666666; font-style: italic;"># chkconfig: 35 80 15</span>
<span style="color: #666666; font-style: italic;"># processname: httpd</span>
<span style="color: #666666; font-style: italic;"># description: httpd</span>
<span style="color: #666666; font-style: italic;"># Copyright 2000-2005 The Apache Software Foundation or its licensors, as</span>
<span style="color: #666666; font-style: italic;"># applicable.</span></pre>
      </td>
    </tr>
  </table>
</div>

3.3 create runlevels for httpd

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #666666; font-style: italic;">#/sbin/chkconfig --add httpd</span>
<span style="color: #666666; font-style: italic;">#/sbin/chkconfig --level 345 httpd on</span>
<span style="color: #666666; font-style: italic;">#/etc/init.d/httpd start</span></pre>
      </td>
    </tr>
  </table>
</div>

4. ColdFusion  
4.1 Download http://192.168.1.10/installers/coldfusion-61-lin.bin  
\# chmod +x coldfusion-61-lin.bin

4.2 Run installer  
\# ./coldfusion-61-lin.bin

4.3 ColdFusion install:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">Launching installer...
&nbsp;
Preparing CONSOLE Mode Installation...
&nbsp;
===============================================================================
Choose Locale...
<span style="color: #660033;">----------------</span>
&nbsp;
  -<span style="color: #000000; font-weight: bold;">&</span>gt;<span style="color: #000000;">1</span>- English
&nbsp;
CHOOSE LOCALE BY NUMBER: <span style="color: #000000;">1</span>
&nbsp;
DO YOU ACCEPT THE TERMS OF THIS LICENSE AGREEMENT?
    <span style="color: #7a0874; font-weight: bold;">&#40;</span>Y<span style="color: #000000; font-weight: bold;">/</span>N<span style="color: #7a0874; font-weight: bold;">&#41;</span> : Y
&nbsp;
The installer has found the following errors<span style="color: #000000; font-weight: bold;">/</span>warnings:
&nbsp;
Warning: C++ compatibility pack
&nbsp;
The installer was unable to determine <span style="color: #000000; font-weight: bold;">if</span> the C++ compatibility pack is
installed by running the following command: rpm <span style="color: #660033;">--query</span> compat-libstdc++
If this machine uses a version of glibc that is 2.2.5.x or higher the
compatibility pack is necessary <span style="color: #000000; font-weight: bold;">for</span> C++ custom tags, Verity, and web server
connectors to work properly.
&nbsp;
For <span style="color: #c20cb9; font-weight: bold;">more</span> information see the installation manual at
http:<span style="color: #000000; font-weight: bold;">//</span>www.macromedia.com<span style="color: #000000; font-weight: bold;">/</span>go<span style="color: #000000; font-weight: bold;">/</span>livedocs_cfmx61docs
&nbsp;
PRESS  TO CONTINUE WITH THE INSTALLER:
&nbsp;
===============================================================================
Existing Macromedia ColdFusion MX Installation?
<span style="color: #660033;">-----------------------------------------------</span>
&nbsp;
You cannot <span style="color: #c20cb9; font-weight: bold;">install</span> a new installation of Macromedia ColdFusion MX <span style="color: #000000;">6.1</span> <span style="color: #000000; font-weight: bold;">if</span> you
have an existing version of Macromedia ColdFusion MX installed on this
computer.
&nbsp;
If you <span style="color: #000000; font-weight: bold;">do</span> have a previous version installed, the installer can update your
current current installation to Macromedia ColdFusion MX <span style="color: #000000;">6.1</span>.
&nbsp;
Is there already a version of Macromedia ColdFusion MX installed on this
   computer? <span style="color: #7a0874; font-weight: bold;">&#40;</span>Y<span style="color: #000000; font-weight: bold;">/</span>N<span style="color: #7a0874; font-weight: bold;">&#41;</span>: N
===============================================================================
Install Type
<span style="color: #660033;">------------</span>
&nbsp;
Choose the <span style="color: #7a0874; font-weight: bold;">type</span> of Macromedia ColdFusion MX installation you want to perform:
&nbsp;
  -<span style="color: #000000; font-weight: bold;">&</span>gt;<span style="color: #000000;">1</span>- Install new version of ColdFusion MX
    <span style="color: #000000;">2</span>- <span style="color: #000000;">30</span>-day trial <span style="color: #7a0874; font-weight: bold;">&#40;</span>Enterprise Edition<span style="color: #7a0874; font-weight: bold;">&#41;</span>
    <span style="color: #000000;">3</span>- Developer Edition <span style="color: #7a0874; font-weight: bold;">&#40;</span>Single-IP Only<span style="color: #7a0874; font-weight: bold;">&#41;</span>
&nbsp;
Installation Choice: <span style="color: #000000;">1</span>
&nbsp;
Serial Number: CED600-<span style="color: #000000;">18040</span>-<span style="color: #000000;">87264</span>-<span style="color: #000000;">92597</span>
&nbsp;
===============================================================================
Install Configuration
<span style="color: #660033;">---------------------</span>
&nbsp;
What kind of installation <span style="color: #000000; font-weight: bold;">do</span> you want?
&nbsp;
  -<span style="color: #000000; font-weight: bold;">&</span>gt;<span style="color: #000000;">1</span>- Server configuration
    <span style="color: #000000;">2</span>- J2EE configuration <span style="color: #7a0874; font-weight: bold;">&#40;</span>ColdFusion MX with JRun <span style="color: #000000;">4</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>
    <span style="color: #000000;">3</span>- J2EE configuration <span style="color: #7a0874; font-weight: bold;">&#40;</span>EAR <span style="color: #c20cb9; font-weight: bold;">file</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>
    <span style="color: #000000;">4</span>- J2EE configuration <span style="color: #7a0874; font-weight: bold;">&#40;</span>WAR <span style="color: #c20cb9; font-weight: bold;">file</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>
&nbsp;
Please choose one of the following options: <span style="color: #000000;">1</span>
&nbsp;
===============================================================================
Choose Install Folder
<span style="color: #660033;">---------------------</span>
&nbsp;
Select the directory <span style="color: #000000; font-weight: bold;">in</span> <span style="color: #c20cb9; font-weight: bold;">which</span> to <span style="color: #c20cb9; font-weight: bold;">install</span> Macromedia ColdFusion MX.
&nbsp;
Directory:
&nbsp;
  Default Install Folder: <span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>coldfusionmx
&nbsp;
ENTER AN ABSOLUTE PATH, OR PRESS  TO ACCEPT THE DEFAULT
: <span style="color: #7a0874; font-weight: bold;">&#91;</span>just press enter<span style="color: #7a0874; font-weight: bold;">&#93;</span>
&nbsp;
===============================================================================
Existing ColdFusion <span style="color: #000000;">4.5</span> or <span style="color: #000000;">5</span> Installation?
<span style="color: #660033;">------------------------------------------</span>
&nbsp;
The installer can migrate your settings from ColdFusion <span style="color: #000000;">4.5</span> or <span style="color: #000000;">5</span> <span style="color: #000000; font-weight: bold;">if</span> you have
an
installation on this computer.
&nbsp;
Is there a version of ColdFusion <span style="color: #000000;">4.5</span> or <span style="color: #000000;">5</span> installed on this computer? <span style="color: #7a0874; font-weight: bold;">&#40;</span>Y<span style="color: #000000; font-weight: bold;">/</span>N<span style="color: #7a0874; font-weight: bold;">&#41;</span> N
&nbsp;
===============================================================================
Configure Web Servers
<span style="color: #660033;">---------------------</span>
&nbsp;
Please configure your webserver<span style="color: #7a0874; font-weight: bold;">&#40;</span>s<span style="color: #7a0874; font-weight: bold;">&#41;</span>.  If you <span style="color: #000000; font-weight: bold;">do</span> not configure a webserver the
built-in webserver will be used on port <span style="color: #000000;">8500</span>.
&nbsp;
    <span style="color: #000000;">1</span>- Add Web Server Configuration
  -<span style="color: #000000; font-weight: bold;">&</span>gt;<span style="color: #000000;">2</span>- Continue with installation
&nbsp;
Choice: <span style="color: #000000;">2</span>
&nbsp;
===============================================================================
Runtime User
<span style="color: #660033;">------------</span>
&nbsp;
Enter the name of the runtime user.   This user must exist already on the
system.
&nbsp;
User Name: <span style="color: #7a0874; font-weight: bold;">&#40;</span>DEFAULT: nobody<span style="color: #7a0874; font-weight: bold;">&#41;</span>: <span style="color: #7a0874; font-weight: bold;">&#91;</span>enter<span style="color: #7a0874; font-weight: bold;">&#93;</span>
&nbsp;
===============================================================================
Init System
<span style="color: #660033;">-----------</span>
&nbsp;
Would you like ColdFusion MX to start at System Boot? Please note, this is
only supported on Solaris and Red Hat Linux. If you answer no to this, you can add
ColdFusion MX to system boot post <span style="color: #c20cb9; font-weight: bold;">install</span> by running
<span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>coldfusionmx<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>cfmx-init.sh
&nbsp;
Answer <span style="color: #7a0874; font-weight: bold;">&#40;</span>Y<span style="color: #000000; font-weight: bold;">/</span>N<span style="color: #7a0874; font-weight: bold;">&#41;</span>: Y
&nbsp;
===============================================================================
Administrator Password
<span style="color: #660033;">----------------------</span>
&nbsp;
Enter the password you will use to control access to the ColdFusion MX
Administrator.
&nbsp;
This field is required.
&nbsp;
Password:
Confirm Password:
&nbsp;
===============================================================================
Installation Confirmation
<span style="color: #660033;">-------------------------</span>
&nbsp;
Installation Type:
  Server configuration
&nbsp;
Licensing:
  Fully Licensed Edition
  Serial Number: CED600-<span style="color: #000000;">18040</span>-<span style="color: #000000;">87264</span>-<span style="color: #000000;">92597</span>
&nbsp;
Install Directories:
  Product: <span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>coldfusionmx
  Web root: <span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>coldfusionmx<span style="color: #000000; font-weight: bold;">/</span>wwwroot
&nbsp;
Server Information:
  Web Server: Built-in Web Server
  Port: <span style="color: #000000;">8500</span>
&nbsp;
Disk Space Information <span style="color: #7a0874; font-weight: bold;">&#40;</span><span style="color: #000000; font-weight: bold;">for</span> Installation Target<span style="color: #7a0874; font-weight: bold;">&#41;</span>:
  Required: <span style="color: #000000;">433</span>,<span style="color: #000000;">293</span>,<span style="color: #000000;">879</span> bytes
  Available: <span style="color: #000000;">25</span>,<span style="color: #000000;">831</span>,<span style="color: #000000;">923</span>,<span style="color: #000000;">712</span> bytes
&nbsp;
PRESS  TO CONTINUE:
<span style="color: #7a0874; font-weight: bold;">&#91;</span>enter<span style="color: #7a0874; font-weight: bold;">&#93;</span>
&nbsp;
PRESS  TO CONTINUE:
&nbsp;
===============================================================================
Installing...
<span style="color: #660033;">-------------</span>
&nbsp;
 <span style="color: #7a0874; font-weight: bold;">&#91;</span>==================<span style="color: #000000; font-weight: bold;">|</span>==================<span style="color: #000000; font-weight: bold;">|</span>==================<span style="color: #000000; font-weight: bold;">|</span>==================<span style="color: #7a0874; font-weight: bold;">&#93;</span>
 <span style="color: #7a0874; font-weight: bold;">&#91;</span>------------------<span style="color: #000000; font-weight: bold;">|</span>------------------<span style="color: #000000; font-weight: bold;">|</span>------------------<span style="color: #000000; font-weight: bold;">|</span>------------------<span style="color: #7a0874; font-weight: bold;">&#93;</span>
&nbsp;
===============================================================================
Installation Complete
<span style="color: #660033;">---------------------</span>
&nbsp;
You have successfully completed the first step <span style="color: #000000; font-weight: bold;">in</span> installing Macromedia
ColdFusion MX.
&nbsp;
To <span style="color: #7a0874; font-weight: bold;">continue</span> with your installation, go to <span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>coldfusionmx<span style="color: #000000; font-weight: bold;">/</span>bin and <span style="color: #7a0874; font-weight: bold;">type</span>
<span style="color: #ff0000;">"./coldfusion start"</span> to start your server.
&nbsp;
Once the server is started log <span style="color: #000000; font-weight: bold;">in</span> to the Configuration Wizard at
http:<span style="color: #000000; font-weight: bold;">//</span><span style="color: #7a0874; font-weight: bold;">&#91;</span>machinename<span style="color: #7a0874; font-weight: bold;">&#93;</span>:<span style="color: #000000;">8500</span><span style="color: #000000; font-weight: bold;">/</span>CFIDE<span style="color: #000000; font-weight: bold;">/</span>administrator<span style="color: #000000; font-weight: bold;">/</span>index.cfm
&nbsp;
PRESS  TO EXIT THE INSTALLER:</pre>
      </td>
    </tr>
  </table>
</div>

5. Start coldfusion  
\# /etc/init.d/coldfusionmx start  
Starting ColdFusion MX&#8230;  
There may be a few moments before you can access the ColdFusion MX administrator. This is normal.  
======================================================================  
ColdFusion MX has been started.  
ColdFusion MX will write logs to /opt/coldfusionmx/logs/cfserver.log  
======================================================================

6. Bind ColdFusion with Apache.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #007800;">$JAVA_EXECUTABLE</span> <span style="color: #660033;">-jar</span> <span style="color: #007800;">$CF_DIR</span><span style="color: #000000; font-weight: bold;">/</span>runtime<span style="color: #000000; font-weight: bold;">/</span>lib<span style="color: #000000; font-weight: bold;">/</span>wsconfig.jar \
        <span style="color: #660033;">-ws</span> apache \
        <span style="color: #660033;">-dir</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>apache2<span style="color: #000000; font-weight: bold;">/</span>conf \
        <span style="color: #660033;">-bin</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>apache2<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>httpd \
        <span style="color: #660033;">-script</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>apache2<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span><span style="color: #c20cb9; font-weight: bold;">apachectl</span> \
        <span style="color: #660033;">-coldfusion</span> <span style="color: #660033;">-v</span></pre>
      </td>
    </tr>
  </table>
</div>

`<br />
[root@appserver /]#  cd /opt/coldfusionmx/bin/connectors/<br />
[root@appserver connectors]# ls<br />
apache_connector.sh  connectorslist.sh  iplanet_connector.sh  remove_all_connectors.sh  upgrade_all_connectors.sh<br />
[root@appserver connectors]# sh -v apache_connector.sh<br />
`

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">You can check <span style="color: #000000; font-weight: bold;">if</span> your binding is successfull <span style="color: #000000; font-weight: bold;">if</span> you see the ff
messages:
&nbsp;
Found JRun server default at 127.0.0.1:<span style="color: #000000;">2901</span>
CentOS release <span style="color: #000000;">4.4</span> <span style="color: #7a0874; font-weight: bold;">&#40;</span>Final<span style="color: #7a0874; font-weight: bold;">&#41;</span>
Detected Red Hat Linux release <span style="color: #000000;">7</span> or lower
Using Apache binary <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>apache2<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>httpd
Server version: Apache<span style="color: #000000; font-weight: bold;">/</span>2.0.58
Apache 2.0.58 is supported
Using Apache control script <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>apache2<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span><span style="color: #c20cb9; font-weight: bold;">apachectl</span>
Parsing Apache configuration <span style="color: #c20cb9; font-weight: bold;">file</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>apache2<span style="color: #000000; font-weight: bold;">/</span>conf<span style="color: #000000; font-weight: bold;">/</span>httpd.conf
Exec<span style="color: #ff0000;">'ing chmod 777 /opt/coldfusionmx/runtime/lib/wsconfig/1
Set permission to 777 on /opt/coldfusionmx/runtime/lib/wsconfig/1
Exec'</span>ing <span style="color: #c20cb9; font-weight: bold;">chmod</span> +x <span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>coldfusionmx<span style="color: #000000; font-weight: bold;">/</span>runtime<span style="color: #000000; font-weight: bold;">/</span>lib<span style="color: #000000; font-weight: bold;">/</span>wsconfig<span style="color: #000000; font-weight: bold;">/</span><span style="color: #000000;">1</span><span style="color: #000000; font-weight: bold;">/</span>mod_jrun20.so
Set permission to execute on <span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>coldfusionmx<span style="color: #000000; font-weight: bold;">/</span>runtime<span style="color: #000000; font-weight: bold;">/</span>lib<span style="color: #000000; font-weight: bold;">/</span>wsconfig<span style="color: #000000; font-weight: bold;">/</span><span style="color: #000000;">1</span><span style="color: #000000; font-weight: bold;">/</span>mod_jrun20.so
Created <span style="color: #c20cb9; font-weight: bold;">file</span> <span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>coldfusionmx<span style="color: #000000; font-weight: bold;">/</span>runtime<span style="color: #000000; font-weight: bold;">/</span>lib<span style="color: #000000; font-weight: bold;">/</span>wsconfig<span style="color: #000000; font-weight: bold;">/</span><span style="color: #000000;">1</span><span style="color: #000000; font-weight: bold;">/</span>mod_jrun20.so
Wrote <span style="color: #c20cb9; font-weight: bold;">file</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>apache2<span style="color: #000000; font-weight: bold;">/</span>conf<span style="color: #000000; font-weight: bold;">/</span>httpd.conf
Added JRun configuration to Apache configuration <span style="color: #c20cb9; font-weight: bold;">file</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>apache2<span style="color: #000000; font-weight: bold;">/</span>conf<span style="color: #000000; font-weight: bold;">/</span>httpd.conf
Created <span style="color: #c20cb9; font-weight: bold;">file</span> <span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>coldfusionmx<span style="color: #000000; font-weight: bold;">/</span>runtime<span style="color: #000000; font-weight: bold;">/</span>lib<span style="color: #000000; font-weight: bold;">/</span>wsconfig<span style="color: #000000; font-weight: bold;">/</span><span style="color: #000000;">1</span><span style="color: #000000; font-weight: bold;">/</span>README.txt
Wrote <span style="color: #c20cb9; font-weight: bold;">file</span> <span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>coldfusionmx<span style="color: #000000; font-weight: bold;">/</span>runtime<span style="color: #000000; font-weight: bold;">/</span>lib<span style="color: #000000; font-weight: bold;">/</span>wsconfig<span style="color: #000000; font-weight: bold;">/</span>wsconfig.properties
Exec<span style="color: #ff0000;">'ing /usr/local/apache2/bin/apachectl restart
httpd: Could not determine the server'</span>s fully qualified domain name, using 127.0.0.1 <span style="color: #000000; font-weight: bold;">for</span> ServerName
Restarted Apache server
The Apache connector was installed to <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>apache2<span style="color: #000000; font-weight: bold;">/</span>conf</pre>
      </td>
    </tr>
  </table>
</div>

7. Your httpd.conf file should contain the ff:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">------------------------httpd.conf------------------------------
<span style="color: #666666; font-style: italic;"># NOTE: DO NOT ATTEMPT TO PUT THIS IN YOUR HTTPD.CONF MANUALLY.</span>
LoadModule jrun_module <span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>coldfusionmx<span style="color: #000000; font-weight: bold;">/</span>runtime<span style="color: #000000; font-weight: bold;">/</span>lib<span style="color: #000000; font-weight: bold;">/</span>wsconfig<span style="color: #000000; font-weight: bold;">/</span><span style="color: #000000;">1</span><span style="color: #000000; font-weight: bold;">/</span>mod_jrun20.so
&nbsp;
    JRunConfig Verbose <span style="color: #c20cb9; font-weight: bold;">false</span>
    JRunConfig Apialloc <span style="color: #c20cb9; font-weight: bold;">false</span>
    JRunConfig Ssl <span style="color: #c20cb9; font-weight: bold;">false</span>
    JRunConfig Ignoresuffixmap <span style="color: #c20cb9; font-weight: bold;">false</span>
    JRunConfig Serverstore <span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>coldfusionmx<span style="color: #000000; font-weight: bold;">/</span>runtime<span style="color: #000000; font-weight: bold;">/</span>lib<span style="color: #000000; font-weight: bold;">/</span>wsconfig<span style="color: #000000; font-weight: bold;">/</span><span style="color: #000000;">1</span><span style="color: #000000; font-weight: bold;">/</span>jrunserver.store
    JRunConfig Bootstrap 127.0.0.1:<span style="color: #000000;">51010</span>
    <span style="color: #666666; font-style: italic;">#JRunConfig Errorurl</span>
    AddHandler jrun-handler .jsp .jws .cfm .cfml .cfc</pre>
      </td>
    </tr>
  </table>
</div>

8. Copy ColdFusion Administrator to your webroot  
\# cd /usr/local/apache2/htdocs  
\# rm -Rf *  
\# cp -Rf /opt/coldfusionmx/wwwroot/CFIDE .  
\# ln -s CFIDE cfide

Open your browse and point to: http://192.168.1.15/cfide/administrator/

9. CFADMIN settings:  
&#8211; Check Disable RDS Services. Press Next  
&#8211; Install Documents: Yes. Press Next  
&#8211; OK

10. Copy cfdocs to webroot:  
\# cp -Rf /opt/coldfusionmx/wwwroot/cfdocs /usr/local/apache2/htdocs/