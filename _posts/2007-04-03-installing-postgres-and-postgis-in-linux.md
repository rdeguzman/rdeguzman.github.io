---
title: Installing PostGres, PostGIS, pgRouting in Linux
author: rupert
layout: post
permalink: /2007/04/installing-postgres-and-postgis-in-linux/
categories:
  - postgis
  - postgres
tags:
  - centos
  - linux
  - postgis
  - postgres
  - prRouting
  - routing
---
**A. Installing PostGres**

A.1. Download and install the source: [postgresql-8.2.3.tar.gz][1]

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux routing<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #c20cb9; font-weight: bold;">tar</span> <span style="color: #660033;">-xvzf</span> postgresql-8.1.2.tar.gz
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux routing<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #007800;">LDFLAGS</span>=-lstdc++
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux routing<span style="color: #7a0874; font-weight: bold;">&#93;</span>.<span style="color: #000000; font-weight: bold;">/</span>configure <span style="color: #660033;">--prefix</span>=<span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql <span style="color: #660033;">--with-perl</span> <span style="color: #660033;">--with-python</span> <span style="color: #660033;">--with-krb5</span> <span style="color: #660033;">--with-openssl</span>
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux routing<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #c20cb9; font-weight: bold;">make</span>
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux routing<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #c20cb9; font-weight: bold;">make</span> <span style="color: #c20cb9; font-weight: bold;">install</span>
&nbsp;
A.2. Post Compile Operations:
&nbsp;
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux routing<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>sbin<span style="color: #000000; font-weight: bold;">/</span>adduser postgres
&nbsp;
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux routing<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #c20cb9; font-weight: bold;">mkdir</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>data
&nbsp;
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux routing<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #c20cb9; font-weight: bold;">chown</span> postgres <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>data<span style="color: #000000; font-weight: bold;">/</span>
&nbsp;
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux routing<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #c20cb9; font-weight: bold;">su</span> - postgres
&nbsp;
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux routing<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>initdb <span style="color: #660033;">-D</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>data<span style="color: #000000; font-weight: bold;">/</span></pre>
      </td>
    </tr>
  </table>
</div>

Note: If youre default locale is not EN, say chinese, then you would get:

> The files belonging to this database system will be owned by user &#8220;postgres&#8221;.  
> This user must also own the server process.
> 
> The database cluster will be initialized with locale zh_CN.GB18030.  
> initdb: could not find suitable encoding for locale &#8220;zh_CN.GB18030&#8243;

A.3. Edit environment variables. Add the ff to your .bash_profile

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux routing<span style="color: #7a0874; font-weight: bold;">&#93;</span> <span style="color: #c20cb9; font-weight: bold;">vi</span> <span style="color: #000000; font-weight: bold;">/</span>root<span style="color: #000000; font-weight: bold;">/</span>.bash_profile
<span style="color: #007800;">PATH</span>=<span style="color: #007800;">$PATH</span>:<span style="color: #007800;">$HOME</span><span style="color: #000000; font-weight: bold;">/</span>bin:<span style="color: #000000; font-weight: bold;">/</span>bin:<span style="color: #000000; font-weight: bold;">/</span>sbin:<span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>bin:<span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>sbin:<span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>bin:<span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>sbin:<span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>mysql<span style="color: #000000; font-weight: bold;">/</span>bin:<span style="color: #007800;">$JAVA_HOME</span><span style="color: #000000; font-weight: bold;">/</span>bin:<span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>bin
<span style="color: #7a0874; font-weight: bold;">export</span> <span style="color: #007800;">PGLIB</span>=<span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>lib
<span style="color: #7a0874; font-weight: bold;">export</span> <span style="color: #007800;">PGDATA</span>=<span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>data
<span style="color: #7a0874; font-weight: bold;">export</span> <span style="color: #007800;">PGPORT</span>=<span style="color: #000000;">5432</span>
<span style="color: #7a0874; font-weight: bold;">export</span> <span style="color: #007800;">PGOPTS</span>=<span style="color: #ff0000;">"-i"</span></pre>
      </td>
    </tr>
  </table>
</div>

A.4. Start PostGres Automatically on Startup. [Postgres Startup Script][2]

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux routing<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #c20cb9; font-weight: bold;">touch</span> <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>init.d<span style="color: #000000; font-weight: bold;">/</span>postgresql
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux routing<span style="color: #7a0874; font-weight: bold;">&#93;</span> <span style="color: #c20cb9; font-weight: bold;">vi</span> <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>init.d<span style="color: #000000; font-weight: bold;">/</span>postgresql</pre>
      </td>
    </tr>
  </table>
</div>

PostGres Startup Script

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #666666; font-style: italic;">#!/bin/sh</span>
<span style="color: #666666; font-style: italic;"># postgresql    This is the init script for starting up the PostgreSQL</span>
<span style="color: #666666; font-style: italic;">#               server</span>
&nbsp;
<span style="color: #666666; font-style: italic;"># chkconfig: - 85 15</span>
<span style="color: #666666; font-style: italic;"># description: Starts and stops the PostgreSQL backend daemon that handles all database requests.</span>
<span style="color: #666666; font-style: italic;"># processname: postmaster</span>
<span style="color: #666666; font-style: italic;"># pidfile: /usr/local/pgsql/data/postmaster.pid</span>
<span style="color: #666666; font-style: italic;">#</span>
&nbsp;
<span style="color: #666666; font-style: italic;"># Source function library.</span>
. <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>rc.d<span style="color: #000000; font-weight: bold;">/</span>init.d<span style="color: #000000; font-weight: bold;">/</span>functions
&nbsp;
<span style="color: #666666; font-style: italic;"># Get config.</span>
. <span style="color: #000000; font-weight: bold;">/</span>etc<span style="color: #000000; font-weight: bold;">/</span>sysconfig<span style="color: #000000; font-weight: bold;">/</span>network
&nbsp;
<span style="color: #666666; font-style: italic;"># Check that networking is up.</span>
<span style="color: #666666; font-style: italic;"># Pretty much need it for postmaster.</span>
<span style="color: #7a0874; font-weight: bold;">&#91;</span> <span style="color: #800000;">${NETWORKING}</span> = <span style="color: #ff0000;">"no"</span> <span style="color: #7a0874; font-weight: bold;">&#93;</span> <span style="color: #000000; font-weight: bold;">&</span>amp;<span style="color: #000000; font-weight: bold;">&</span>amp; <span style="color: #7a0874; font-weight: bold;">exit</span> <span style="color: #000000;"></span>
&nbsp;
<span style="color: #7a0874; font-weight: bold;">&#91;</span> <span style="color: #660033;">-f</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>postmaster <span style="color: #7a0874; font-weight: bold;">&#93;</span> <span style="color: #000000; font-weight: bold;">||</span> <span style="color: #7a0874; font-weight: bold;">exit</span> <span style="color: #000000;"></span>
&nbsp;
<span style="color: #666666; font-style: italic;"># See how we were called.</span>
<span style="color: #000000; font-weight: bold;">case</span> <span style="color: #ff0000;">"$1"</span> <span style="color: #000000; font-weight: bold;">in</span>
start<span style="color: #7a0874; font-weight: bold;">&#41;</span>
<span style="color: #007800;">pid</span>=<span style="color: #000000; font-weight: bold;">`</span><span style="color: #c20cb9; font-weight: bold;">pidof</span> postmaster<span style="color: #000000; font-weight: bold;">`</span>
<span style="color: #000000; font-weight: bold;">if</span> <span style="color: #7a0874; font-weight: bold;">&#91;</span> <span style="color: #007800;">$pid</span> <span style="color: #7a0874; font-weight: bold;">&#93;</span>
<span style="color: #000000; font-weight: bold;">then</span>
<span style="color: #7a0874; font-weight: bold;">echo</span> <span style="color: #ff0000;">"Postmaster already running."</span>
<span style="color: #000000; font-weight: bold;">else</span>
<span style="color: #7a0874; font-weight: bold;">echo</span> <span style="color: #660033;">-n</span> <span style="color: #ff0000;">"Starting postgresql service: "</span>
<span style="color: #c20cb9; font-weight: bold;">su</span> <span style="color: #660033;">-l</span> postgres <span style="color: #660033;">-c</span> <span style="color: #ff0000;">'/usr/local/pgsql/bin/pg_ctl -o -i -D /usr/local/pgsql/data/ -l /usr/local/pgsql/data/logfile start'</span>
<span style="color: #c20cb9; font-weight: bold;">sleep</span> <span style="color: #000000;">1</span>
<span style="color: #7a0874; font-weight: bold;">echo</span>
<span style="color: #7a0874; font-weight: bold;">exit</span>
<span style="color: #000000; font-weight: bold;">fi</span>
<span style="color: #000000; font-weight: bold;">;;</span>
&nbsp;
stop<span style="color: #7a0874; font-weight: bold;">&#41;</span>
<span style="color: #7a0874; font-weight: bold;">echo</span> <span style="color: #660033;">-n</span> <span style="color: #ff0000;">"Stopping postgresql service: "</span>
killproc postmaster
<span style="color: #c20cb9; font-weight: bold;">sleep</span> <span style="color: #000000;">2</span>
<span style="color: #c20cb9; font-weight: bold;">rm</span> <span style="color: #660033;">-f</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>data<span style="color: #000000; font-weight: bold;">/</span>postmaster.pid
<span style="color: #7a0874; font-weight: bold;">echo</span>
<span style="color: #000000; font-weight: bold;">;;</span>
&nbsp;
restart<span style="color: #7a0874; font-weight: bold;">&#41;</span>
<span style="color: #007800;">$0</span> stop
<span style="color: #007800;">$0</span> start
<span style="color: #000000; font-weight: bold;">;;</span>
&nbsp;
<span style="color: #000000; font-weight: bold;">*</span><span style="color: #7a0874; font-weight: bold;">&#41;</span>
<span style="color: #7a0874; font-weight: bold;">echo</span> <span style="color: #ff0000;">"Usage: postgresql {start|stop|restart}"</span>
<span style="color: #7a0874; font-weight: bold;">exit</span> <span style="color: #000000;">1</span>
<span style="color: #000000; font-weight: bold;">esac</span>
&nbsp;
<span style="color: #7a0874; font-weight: bold;">exit</span> <span style="color: #000000;"></span></pre>
      </td>
    </tr>
  </table>
</div>

A.5. PostGres Testing

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux routing<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># su - postgres</span>
<span style="color: #7a0874; font-weight: bold;">&#91;</span>postgres<span style="color: #000000; font-weight: bold;">@</span>rupert-linux ~<span style="color: #7a0874; font-weight: bold;">&#93;</span>$ <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>createdb <span style="color: #7a0874; font-weight: bold;">test</span>
<span style="color: #7a0874; font-weight: bold;">&#91;</span>postgres<span style="color: #000000; font-weight: bold;">@</span>rupert-linux ~<span style="color: #7a0874; font-weight: bold;">&#93;</span>$ <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>psql <span style="color: #7a0874; font-weight: bold;">test</span></pre>
      </td>
    </tr>
  </table>
</div>

**B. Installing PostGIS.**

B.1. Download [Geos][3]

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux <span style="color: #000000; font-weight: bold;">/</span><span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># bzip2 -d geos-3.0.0rc4.tar.bz2</span>
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux <span style="color: #000000; font-weight: bold;">/</span><span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># tar -xvf geos-3.0.0rc4.tar</span>
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux <span style="color: #000000; font-weight: bold;">/</span><span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># ./configure</span>
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux <span style="color: #000000; font-weight: bold;">/</span><span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># make</span>
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux <span style="color: #000000; font-weight: bold;">/</span><span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># make install</span></pre>
      </td>
    </tr>
  </table>
</div>

B.2. Download [PostGIS.][4]

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux <span style="color: #000000; font-weight: bold;">/</span><span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># cp postgis-1.2.1.tar.gz /home/installers/postgresql-8.2.3/contrib/</span>
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux <span style="color: #000000; font-weight: bold;">/</span><span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># tar -zxvf postgis-1.2.1.tar.gz</span>
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux <span style="color: #000000; font-weight: bold;">/</span><span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># cd /home/installers/postgresql-8.2.3/contrib/postgis-1.2.1/</span>
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux <span style="color: #000000; font-weight: bold;">/</span><span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># ./configure --with-pgsql=/usr/local/pgsql/bin/pg_config</span>
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux <span style="color: #000000; font-weight: bold;">/</span><span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># make</span>
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux <span style="color: #000000; font-weight: bold;">/</span><span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># make install</span></pre>
      </td>
    </tr>
  </table>
</div>

B.3 Reload ldconfig

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux <span style="color: #000000; font-weight: bold;">/</span><span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># vi /etc/ld.so.conf</span>
<span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>include
<span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>lib
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux <span style="color: #000000; font-weight: bold;">/</span><span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># ldconfig</span></pre>
      </td>
    </tr>
  </table>
</div>

B.4. Testing PostGIS

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">$ <span style="color: #c20cb9; font-weight: bold;">su</span> - postgres
$ createlang plpgsql <span style="color: #7a0874; font-weight: bold;">test</span>
$ <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>psql <span style="color: #660033;">-d</span> <span style="color: #7a0874; font-weight: bold;">test</span> <span style="color: #660033;">-f</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>share<span style="color: #000000; font-weight: bold;">/</span>lwpostgis.sql
BEGIN
psql:<span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>share<span style="color: #000000; font-weight: bold;">/</span>postgresql<span style="color: #000000; font-weight: bold;">/</span>contrib<span style="color: #000000; font-weight: bold;">/</span>lwpostgis.sql:<span style="color: #000000;">39</span> NOTICE:  <span style="color: #7a0874; font-weight: bold;">type</span> <span style="color: #ff0000;">"histogram2d"</span> is not yet defined
DETAIL:  Creating a shell <span style="color: #7a0874; font-weight: bold;">type</span> definition.
.
.
.
COMMIT
$ <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>psql <span style="color: #660033;">-d</span> <span style="color: #7a0874; font-weight: bold;">test</span> <span style="color: #660033;">-f</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>share<span style="color: #000000; font-weight: bold;">/</span>spatial_ref_sys.sql
BEGIN
INSERT <span style="color: #000000;"></span> <span style="color: #000000;">1</span>
INSERT <span style="color: #000000;"></span> <span style="color: #000000;">1</span>
.
.
.
VACUUM</pre>
      </td>
    </tr>
  </table>
</div>

**C. Installing pgRouting.**

C.1 Install Boost Library if you don&#8217;t have it. Download [boost][5]

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux <span style="color: #000000; font-weight: bold;">/</span><span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># tar -jxvf boost_1_33_1.tar.bz2</span>
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux <span style="color: #000000; font-weight: bold;">/</span><span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># ./configure</span>
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux <span style="color: #000000; font-weight: bold;">/</span><span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># make</span>
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux <span style="color: #000000; font-weight: bold;">/</span><span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># make install</span>
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux <span style="color: #000000; font-weight: bold;">/</span><span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># cd /usr/local/include/boost1.3.3</span>
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux <span style="color: #000000; font-weight: bold;">/</span><span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># cp -Rf boost /usr/local/include/</span></pre>
      </td>
    </tr>
  </table>
</div>

C.2 Download and install [CGAL][6].

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux installers<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># tar zxvf CGAL-3.2.1.tar.gz</span>
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux installers<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># cd CGAL-3.2.1</span>
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux CGAL-3.2.1<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># ./install_cgal --prefix=/usr/local/cgal --with-boost=n --without-autofind -ni /usr/bin/g++</span>
Copy libCGAL.so to the pgsql<span style="color: #000000; font-weight: bold;">/</span>lib directory...
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux CGAL-3.2.1<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;">#  cp -Rf /usr/local/cgal/lib/i686_Linux-2.6_g++-3.4.3/libCGAL.so /usr/local/pgsql/lib/</span></pre>
      </td>
    </tr>
  </table>
</div>

C.3 Download and install [GAUL][7].

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux installers<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># tar zxvf gaul-devel-0.1849.tar.gz</span>
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux gaul-devel-<span style="color: #000000;">0.1849</span>-<span style="color: #000000;"></span><span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># ./configure -prefix=/usr/local/gaul</span>
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux gaul-devel-<span style="color: #000000;">0.1849</span>-<span style="color: #000000;"></span><span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># make</span>
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux gaul-devel-<span style="color: #000000;">0.1849</span>-<span style="color: #000000;"></span><span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># make install</span>
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux gaul-devel-<span style="color: #000000;">0.1849</span>-<span style="color: #000000;"></span><span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># cd /usr/local/gaul (Note: Copy gaul includes and libraries to standard directories...)</span>
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux gaul<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># cp -Rf include/* /usr/include/</span>
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux gaul<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># cp -Rf lib/* /usr/local/lib/</span></pre>
      </td>
    </tr>
  </table>
</div>

C.4 Download and install [pgRouting][8].

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux installers<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># tar -jxvf pgRouting-0.9.9.tgz</span>
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux routing<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># vi configure</span>
<span style="color: #666666; font-style: italic;">##########################################</span>
Edit line <span style="color: #000000;">3036</span>...
<span style="color: #007800;">CGAL_MKF</span>=<span style="color: #ff0000;">'find /usr/local/cgal/include/CGAL.....'</span>
<span style="color: #666666; font-style: italic;">##########################################</span>
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux routing<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># ./configure --with-cgal=/usr/local/cgal --with-gaul=/usr/local/gaul --with boost=/usr/local --pg-sql=/usr/local/pgsql</span>
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux routing<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># make</span>
<span style="color: #7a0874; font-weight: bold;">&#91;</span>root<span style="color: #000000; font-weight: bold;">@</span>rupert-linux routing<span style="color: #7a0874; font-weight: bold;">&#93;</span><span style="color: #666666; font-style: italic;"># make install</span></pre>
      </td>
    </tr>
  </table>
</div>

<ins datetime="2007-06-07T01:28:02+00:00"></ins>

 [1]: http://wwwmaster.postgresql.org/download/mirrors-ftp?file=%2Fsource%2Fv8.2.3%2Fpostgresql-8.2.3.tar.gz
 [2]: /images/2007/06/postgresql.txt
 [3]: http://geos.refractions.net/
 [4]: http://www.postgis.org/download/
 [5]: http://sourceforge.net/project/showfiles.php?group_id=7586
 [6]: http://www.cgal.org/download/
 [7]: http://sourceforge.net/projects/gaul/
 [8]: http://www.postlbs.org/postlbs-cms/files/downloads/pgRouting-0.9.9.tgz