---
title: 'Debian Howto: Apache 2.2 + ColdFusion Updated for SID'
author: rupert
layout: post
permalink: /2007/08/debian-howto-apache-22-coldfusion/
aktt_tweeted:
  - 1
categories:
  - debian
tags:
  - apache
  - cf
  - debian
---
Wow, this is really nice. I was able to install Apache2.2 + ColdFusion on my current Debian 4.0 Etch.

Here&#8217;s an introduction on using apt&#8230;

> Use apt-cache to search the local database for available packages.  
> apt-cache search [search terms] will find packages that sound like what you want and:  
> apt-cache show [packagename] will return more details on a particular package.  
> apt-cache showpkg [packagename] will return more details on a particular package.  
> apt-cache policy [packagename] will return which versions are available along with the priority of each version.  
> apt-setup will enable you to change mirrors. The alternative is to edit /etc/apt/sources.list manually (which I prefer).  
> apt-get clean clears the local repository of all retrieved package files.  
> apt-get autoclean clears the local repository of retrieved package files of programs that are no longer installed.  
> dpkg -l [packagename] will list the version and a short description of the package we have installed.

**Installing Apache2.2**

1. `apt-get install g++`

2. `apt-get install apache2`

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">Setting up apache2-utils <span style="color: #7a0874; font-weight: bold;">&#40;</span>2.2.3-<span style="color: #000000;">4</span><span style="color: #7a0874; font-weight: bold;">&#41;</span> ...
Setting up apache2.2-common <span style="color: #7a0874; font-weight: bold;">&#40;</span>2.2.3-<span style="color: #000000;">4</span><span style="color: #7a0874; font-weight: bold;">&#41;</span> ...
Setting Apache2 to Listen on port <span style="color: #000000;">80</span>. If this is not desired, please edit <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>apache2<span style="color: #000000; font-weight: bold;">/</span>ports.conf <span style="color: #c20cb9; font-weight: bold;">as</span> desired. Note that the Port directive no longer works.
Module <span style="color: #7a0874; font-weight: bold;">alias</span> installed; run <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>init.d<span style="color: #000000; font-weight: bold;">/</span>apache2 force-reload to enable.
Module autoindex installed; run <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>init.d<span style="color: #000000; font-weight: bold;">/</span>apache2 force-reload to enable.
Module <span style="color: #c20cb9; font-weight: bold;">dir</span> installed; run <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>init.d<span style="color: #000000; font-weight: bold;">/</span>apache2 force-reload to enable.
Module <span style="color: #c20cb9; font-weight: bold;">env</span> installed; run <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>init.d<span style="color: #000000; font-weight: bold;">/</span>apache2 force-reload to enable.
Module mime installed; run <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>init.d<span style="color: #000000; font-weight: bold;">/</span>apache2 force-reload to enable.
Module negotiation installed; run <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>init.d<span style="color: #000000; font-weight: bold;">/</span>apache2 force-reload to enable.
Module setenvif installed; run <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>init.d<span style="color: #000000; font-weight: bold;">/</span>apache2 force-reload to enable.
Module status installed; run <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>init.d<span style="color: #000000; font-weight: bold;">/</span>apache2 force-reload to enable.
Module auth_basic installed; run <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>init.d<span style="color: #000000; font-weight: bold;">/</span>apache2 force-reload to enable.
Module authz_default installed; run <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>init.d<span style="color: #000000; font-weight: bold;">/</span>apache2 force-reload to enable.
Module authz_user installed; run <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>init.d<span style="color: #000000; font-weight: bold;">/</span>apache2 force-reload to enable.
Module authz_groupfile installed; run <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>init.d<span style="color: #000000; font-weight: bold;">/</span>apache2 force-reload to enable.
Module authn_file installed; run <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>init.d<span style="color: #000000; font-weight: bold;">/</span>apache2 force-reload to enable.
Module authz_host installed; run <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>init.d<span style="color: #000000; font-weight: bold;">/</span>apache2 force-reload to enable.
&nbsp;
Setting up apache2-mpm-worker <span style="color: #7a0874; font-weight: bold;">&#40;</span>2.2.3-<span style="color: #000000;">4</span><span style="color: #7a0874; font-weight: bold;">&#41;</span> ...
Starting web server <span style="color: #7a0874; font-weight: bold;">&#40;</span>apache2<span style="color: #7a0874; font-weight: bold;">&#41;</span>...apache2: Could not reliably determine the server<span style="color: #ff0000;">'s fully qualified domain name, using 127.0.0.1 for ServerName</span></pre>
      </td>
    </tr>
  </table>
</div>

3. `/etc/init.d/apache2 start`

4. `ps -ef | grep apache2`

5. Post Install:  
`<br />
#mkdir -p /usr/local/apache2<br />
#ln -s /var/log/apache2 /usr/local/apache2/logs<br />
#ln -s /var/www 	/usr/local/apache2/htdocs<br />
#ln -s /usr/lib/cgi-bin /usr/local/apache2/cgi-bin<br />
`

**Installing ColdFusion 8**  
1. Install ColdFusion 8 normally. Make the user as nobody

2. To start ColdFusion8 on boot, download this startup script ([coldfusion8\_startup\_debian][1]).  
Drop it to /etc/init.d/ and start coldfusion

3. Bind ColdFusion to Apache. Modify the existing apache_connector.sh.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #666666; font-style: italic;">#!/bin/sh</span>
&nbsp;
<span style="color: #666666; font-style: italic;">#</span>
<span style="color: #666666; font-style: italic;"># Configure the Apache connector.</span>
<span style="color: #666666; font-style: italic;">#       -dir should be the *directory* which contains httpd.conf</span>
<span style="color: #666666; font-style: italic;">#       -bin should be the path to the apache *executable*</span>
<span style="color: #666666; font-style: italic;">#       -script should be the path to the script which is used to</span>
<span style="color: #666666; font-style: italic;">#               start/stop apache</span>
<span style="color: #666666; font-style: italic;">#</span>
..<span style="color: #000000; font-weight: bold;">/</span>..<span style="color: #000000; font-weight: bold;">/</span>runtime<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>wsconfig \
        <span style="color: #660033;">-server</span> coldfusion \
        <span style="color: #660033;">-ws</span> apache \
        <span style="color: #660033;">-dir</span> <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>apache2 \
        <span style="color: #660033;">-bin</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>sbin<span style="color: #000000; font-weight: bold;">/</span>apache2 \
        <span style="color: #660033;">-script</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>sbin<span style="color: #000000; font-weight: bold;">/</span><span style="color: #c20cb9; font-weight: bold;">apache2ctl</span> \
        <span style="color: #660033;">-coldfusion</span>
&nbsp;
<span style="color: #7a0874; font-weight: bold;">exit</span> <span style="color: #007800;">$#</span></pre>
      </td>
    </tr>
  </table>
</div>

4. Check if the bind is successful by inspecting /etc/apache2/httpd.conf . You should see something similar below&#8230;

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #666666; font-style: italic;"># JRun Settings</span>
LoadModule jrun_module <span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>coldfusion8<span style="color: #000000; font-weight: bold;">/</span>runtime<span style="color: #000000; font-weight: bold;">/</span>lib<span style="color: #000000; font-weight: bold;">/</span>wsconfig<span style="color: #000000; font-weight: bold;">/</span><span style="color: #000000;">1</span><span style="color: #000000; font-weight: bold;">/</span>mod_jrun22.so
<span style="color: #000000; font-weight: bold;">&lt;</span>IfModule mod_jrun22.c<span style="color: #000000; font-weight: bold;">&gt;</span>
    JRunConfig Verbose <span style="color: #c20cb9; font-weight: bold;">false</span>
    JRunConfig Apialloc <span style="color: #c20cb9; font-weight: bold;">false</span>
    JRunConfig Ignoresuffixmap <span style="color: #c20cb9; font-weight: bold;">false</span>
    JRunConfig Serverstore <span style="color: #000000; font-weight: bold;">/</span>opt<span style="color: #000000; font-weight: bold;">/</span>coldfusion8<span style="color: #000000; font-weight: bold;">/</span>runtime<span style="color: #000000; font-weight: bold;">/</span>lib<span style="color: #000000; font-weight: bold;">/</span>wsconfig<span style="color: #000000; font-weight: bold;">/</span><span style="color: #000000;">1</span><span style="color: #000000; font-weight: bold;">/</span>jrunserver.store
    JRunConfig Bootstrap 127.0.0.1:<span style="color: #000000;">51011</span>
    <span style="color: #666666; font-style: italic;">#JRunConfig Errorurl url &lt;optionally redirect to this URL on errors&gt;</span>
    <span style="color: #666666; font-style: italic;">#JRunConfig ProxyRetryInterval 600 &lt;number of seconds to wait before trying to reconnect to unreachable clustered server&gt;</span>
    <span style="color: #666666; font-style: italic;">#JRunConfig ConnectTimeout 15 &lt;number of seconds to wait on a socket connect to a jrun server&gt;</span>
    <span style="color: #666666; font-style: italic;">#JRunConfig RecvTimeout 300 &lt;number of seconds to wait on a socket receive to a jrun server&gt;</span>
    <span style="color: #666666; font-style: italic;">#JRunConfig SendTimeout 15 &lt;number of seconds to wait on a socket send to a jrun server&gt;</span>
    AddHandler jrun-handler .jsp .jws .cfm .cfml .cfc .cfr .cfswf
<span style="color: #000000; font-weight: bold;">&lt;/</span>IfModule<span style="color: #000000; font-weight: bold;">&gt;</span></pre>
      </td>
    </tr>
  </table>
</div>

5. Follow Post install considerations

**Installing ColdFusion7.0.2**

References:  
[http://demirkapi.net/tutorials/coldfusion\_debian\_installation.cfm][2]  
[http://www.easycfm.com/print/index.cfm?tutorial_id=376][2]

1.` apt-get install libstdc++6 libstdc++5 libstdc++2.10-glibc2.2(etch)`

On etch, by default there is already xlibs, if we have desktop. On sid, if there is also no X, we need to install `libxp6 libxt6 libxtst6`. If you don&#8217;t install these libraries, you will get a graphing library error during coldfusionmx startup.

2. By default debian has a &#8216;nobody&#8217; user also

From <http://forums.gentoo.org/viewtopic-t-312113.html>, and **if you get a libc.so.6 No suc file or directory found problem**

3. Modify /opt/coldfusionmx7/bin/coldfusion and comment out LD\_ASSUME\_KERNEL  
``<br />
174                 # Some Java JVMs (both from Sun and IBM) don't work with the new floating stack<br />
175                 # feature of the i686 version of glibc.  Force glibc to use the deprecated stack model.<br />
176                 # Check if the OS is SuSE8.1 or SuSE 9 - if it is, do not use the deprecated stack model.<br />
177                 #SUSEFLAG=`grep 'SuSE Linux 8.1\|UnitedLinux 1.0\|SuSE Linux 9\|SUSE LINUX Enterprise Server 9' /etc/SuSE-release /etc/UnitedLinux-release /etc/UnitedLinux-release 2> /dev/null`<br />
178<br />
179                 #if [ ! "$SUSEFLAG" ]; then<br />
180                 #       LD_ASSUME_KERNEL=2.2.9<br />
181                 #       export LD_ASSUME_KERNEL<br />
182                 #fi<br />
``

4. **Boot on Start.**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #666666; font-style: italic;">#cp -Rf /opt/coldfusionmx7/bin/coldfusion /etc/init.d/coldfusionmx7</span>
<span style="color: #666666; font-style: italic;">#update-rc.d coldfusionmx7 start 80 2 3 4 5 . stop 15 0 1 6 .</span></pre>
      </td>
    </tr>
  </table>
</div>

5. You need the latest wsconfig.jar that will work on Apache2.2. It was discussed from a technote [here][3]. Configure apache with coldfusion  
`<br />
`

or

Call **java** and execute wsconfig.jar

`<br />
/opt/coldfusionmx7/runtime/jre/bin/java<br />
cd {cf_root}/runtime/lib`

java -Dtrace.ci=1 -jar wsconfig.jar -server coldfusion -ws apache

-dir /etc/apache2/

-bin /usr/sbin/apache2

-script /usr/sbin/apache2ctl

-coldfusion -v

[-apxs]

 [1]: /images/2008/05/coldfusion8_startup_debian.sh
 [2]: http://demirkapi.net/tutorials/coldfusion_debian_installation.cfm
 [3]: http://kb.adobe.com/selfservice/viewContent.do?externalId=8001e97&sliceId=2