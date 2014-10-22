---
title: Installing Postgres8.3,8.4, Postgis1.3.3,1.4.1, pgRouting on MacOSX Leopard
author: rupert
layout: post
permalink: /2008/05/installing-postgres83-postgis133-pgrouting-on-macosx-leopard/
aktt_tweeted:
  - 1
categories:
  - mac
tags:
  - leopard
  - pgRouting
  - postgis
  - postgres
---
References:

http://developer.apple.com/internet/opensource/postgres.html

http://www2.russbrooks.com:8080/2007/11/4/install-postgresql-on-mac-os-x-10-5-leopard

**Warning: Most of the packages listed below is installed by source.**

1. Download the current postgres source.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000;">8.3</span>:
$.<span style="color: #000000; font-weight: bold;">/</span>configure <span style="color: #660033;">--with-prefix</span>=<span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql <span style="color: #660033;">--with-python</span>
&nbsp;
<span style="color: #000000;">8.4</span>:
$.<span style="color: #000000; font-weight: bold;">/</span>configure <span style="color: #660033;">--prefix</span>=<span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql <span style="color: #660033;">--with-python</span>
&nbsp;
<span style="color: #007800;">$make</span>
<span style="color: #007800;">$sudo</span> <span style="color: #c20cb9; font-weight: bold;">make</span> <span style="color: #c20cb9; font-weight: bold;">install</span></pre>
      </td>
    </tr>
  </table>
</div>

2. Don&#8217;t delete the postgres folder. You might need this later on for future compilations. See pgadmin3 admin pack below.

3. Add a postgres user from **System Preferences > Accounts**

4. Initialize the data directory

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #007800;">$mkdir</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>data
<span style="color: #007800;">$chown</span> postgres <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>data<span style="color: #000000; font-weight: bold;">/</span>
<span style="color: #007800;">$su</span> - postgres
$<span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>initdb <span style="color: #660033;">-E</span> utf8 <span style="color: #660033;">-D</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>data</pre>
      </td>
    </tr>
  </table>
</div>

> <pre>The files belonging to this database system will be owned by user "postgres".
This user must also own the server process.

The database cluster will be initialized with locale C.
The default text search configuration will be set to "english".

fixing permissions on existing directory /usr/local/pgsql/data ... ok
creating subdirectories ... ok
selecting default max_connections ... 20
selecting default shared_buffers/max_fsm_pages ... 2400kB/20000
creating configuration files ... ok
creating template1 database in /usr/local/pgsql/data/base/1 ... ok
initializing pg_authid ... ok
initializing dependencies ... ok
creating system views ... ok
loading system objects' descriptions ... ok
creating conversions ... ok
creating dictionaries ... ok
setting privileges on built-in objects ... ok
creating information schema ... ok
vacuuming database template1 ... ok
copying template1 to template0 ... ok
copying template1 to postgres ... ok

WARNING: enabling "trust" authentication for local connections
You can change this by editing pg_hba.conf or using the -A option the
next time you run initdb.

Success. You can now start the database server using:

/usr/local/pgsql/bin/postgres -D /usr/local/pgsql/data
or
/usr/local/pgsql/bin/pg_ctl -D /usr/local/pgsql/data -l logfile start
</pre>

4. Install Postgis  
&#8211; install geos with the standard ./configure -> make -> make install  
&#8211; then install postgis

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;"><span style="color: #000000;">8.3</span>:
$.<span style="color: #000000; font-weight: bold;">/</span>configure <span style="color: #660033;">--with-pgsql</span>=<span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>pg_config <span style="color: #660033;">--with-geos</span>=<span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>geos-config
&nbsp;
<span style="color: #000000;">8.4</span> using Kyngchaos GEOS Framework:
$.<span style="color: #000000; font-weight: bold;">/</span>configure <span style="color: #660033;">--with-pgsql</span>=<span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>pg_config <span style="color: #660033;">--with-geosconfig</span>=<span style="color: #000000; font-weight: bold;">/</span>Library<span style="color: #000000; font-weight: bold;">/</span>Frameworks<span style="color: #000000; font-weight: bold;">/</span>GEOS.framework<span style="color: #000000; font-weight: bold;">/</span>unix<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span>geos-config
&nbsp;
<span style="color: #007800;">$make</span>
<span style="color: #007800;">$sudo</span> <span style="color: #c20cb9; font-weight: bold;">make</span> <span style="color: #c20cb9; font-weight: bold;">install</span></pre>
      </td>
    </tr>
  </table>
</div>

5. Starting postgres on boot. Download [postgresstartup.tar.gz][1] then extract to your /Library/StartupItems

6. Creating the database

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">createdb <span style="color: #660033;">-E</span> utf8 template_postgis
createlang plpgsql template_postgis
&nbsp;
<span style="color: #000000;">8.3</span>:
psql <span style="color: #660033;">-d</span> template_postgis <span style="color: #660033;">-f</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>share<span style="color: #000000; font-weight: bold;">/</span>lwpostgis.sql
psql <span style="color: #660033;">-d</span> template_postgis <span style="color: #660033;">-f</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>share<span style="color: #000000; font-weight: bold;">/</span>spatial_ref_sys.sql
&nbsp;
<span style="color: #000000;">8.4</span>:
psql <span style="color: #660033;">-d</span> template_postgis <span style="color: #660033;">-f</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>share<span style="color: #000000; font-weight: bold;">/</span>contrib<span style="color: #000000; font-weight: bold;">/</span>postgis.sql 
psql <span style="color: #660033;">-d</span> template_postgis <span style="color: #660033;">-f</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>share<span style="color: #000000; font-weight: bold;">/</span>contrib<span style="color: #000000; font-weight: bold;">/</span>spatial_ref_sys.sql</pre>
      </td>
    </tr>
  </table>
</div>

7. Install and download pgAdmin3 for MacOS X 

<http://www.postgresql.org/ftp/pgadmin3/release/>

8. Startup pgadmin3. You will notice there is a window stating&#8230;

> Server instrumentation  
> The server lacks instrumentation functions.  
> pgAdmin III uses some support functions that are not available by default in all PostgreSQL versions. These enable some tasks that make life easier when dealing with log files and configuration files. 

9. Compile the adminpack. Go to $postgresql\_install\_directory/contrib/adminpack

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">$ <span style="color: #c20cb9; font-weight: bold;">make</span>
<span style="color: #c20cb9; font-weight: bold;">gcc</span> <span style="color: #660033;">-no-cpp-precomp</span> <span style="color: #660033;">-O2</span> <span style="color: #660033;">-Wall</span> <span style="color: #660033;">-Wmissing-prototypes</span> <span style="color: #660033;">-Wpointer-arith</span> <span style="color: #660033;">-Winline</span> <span style="color: #660033;">-Wdeclaration-after-statement</span> <span style="color: #660033;">-Wendif-labels</span> <span style="color: #660033;">-fno-strict-aliasing</span> <span style="color: #660033;">-fwrapv</span>  <span style="color: #660033;">-bundle</span> -multiply_defined suppress  adminpack.o  -L..<span style="color: #000000; font-weight: bold;">/</span>..<span style="color: #000000; font-weight: bold;">/</span>src<span style="color: #000000; font-weight: bold;">/</span>port -bundle_loader ..<span style="color: #000000; font-weight: bold;">/</span>..<span style="color: #000000; font-weight: bold;">/</span>src<span style="color: #000000; font-weight: bold;">/</span>backend<span style="color: #000000; font-weight: bold;">/</span>postgres  <span style="color: #660033;">-o</span> libadminpack.0.0.so
<span style="color: #c20cb9; font-weight: bold;">rm</span> <span style="color: #660033;">-f</span> libadminpack.0.so
<span style="color: #c20cb9; font-weight: bold;">ln</span> <span style="color: #660033;">-s</span> libadminpack.0.0.so libadminpack.0.so
<span style="color: #c20cb9; font-weight: bold;">rm</span> <span style="color: #660033;">-f</span> libadminpack.so
<span style="color: #c20cb9; font-weight: bold;">ln</span> <span style="color: #660033;">-s</span> libadminpack.0.0.so libadminpack.so
&nbsp;
rupert:adminpack rupert$ <span style="color: #c20cb9; font-weight: bold;">sudo</span> <span style="color: #c20cb9; font-weight: bold;">make</span> <span style="color: #c20cb9; font-weight: bold;">install</span>
Password:
<span style="color: #c20cb9; font-weight: bold;">mkdir</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>share<span style="color: #000000; font-weight: bold;">/</span>contrib
<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span><span style="color: #c20cb9; font-weight: bold;">sh</span> ..<span style="color: #000000; font-weight: bold;">/</span>..<span style="color: #000000; font-weight: bold;">/</span>config<span style="color: #000000; font-weight: bold;">/</span>install-sh <span style="color: #660033;">-c</span> <span style="color: #660033;">-m</span> <span style="color: #000000;">644</span> .<span style="color: #000000; font-weight: bold;">/</span>uninstall_adminpack.sql <span style="color: #ff0000;">'/usr/local/pgsql/share/contrib'</span>
<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span><span style="color: #c20cb9; font-weight: bold;">sh</span> ..<span style="color: #000000; font-weight: bold;">/</span>..<span style="color: #000000; font-weight: bold;">/</span>config<span style="color: #000000; font-weight: bold;">/</span>install-sh <span style="color: #660033;">-c</span> <span style="color: #660033;">-m</span> <span style="color: #000000;">644</span> adminpack.sql <span style="color: #ff0000;">'/usr/local/pgsql/share/contrib'</span>
<span style="color: #000000; font-weight: bold;">/</span>bin<span style="color: #000000; font-weight: bold;">/</span><span style="color: #c20cb9; font-weight: bold;">sh</span> ..<span style="color: #000000; font-weight: bold;">/</span>..<span style="color: #000000; font-weight: bold;">/</span>config<span style="color: #000000; font-weight: bold;">/</span>install-sh <span style="color: #660033;">-c</span> <span style="color: #660033;">-m</span> <span style="color: #000000;">755</span>  libadminpack.0.0.so <span style="color: #ff0000;">'/usr/local/pgsql/lib/adminpack.so'</span></pre>
      </td>
    </tr>
  </table>
</div>

10. Load the adminpack.sql into your maintenance and template database

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">$ psql <span style="color: #660033;">-U</span> postgres <span style="color: #660033;">-d</span> postgres <span style="color: #660033;">-f</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>share<span style="color: #000000; font-weight: bold;">/</span>contrib<span style="color: #000000; font-weight: bold;">/</span>adminpack.sql 
CREATE FUNCTION
CREATE FUNCTION
CREATE FUNCTION
...</pre>
      </td>
    </tr>
  </table>
</div>

11. Disconnect and Reconnect from pgAdmin3. You shouldn&#8217;t see the window again.

Continue only if you want pgRouting

12. Essentially we would need [Boost Graph Library (BGL)][2] a.k.a boost, [Genetic Algorithm Utility Library][3] (or, GAUL for short), and GEOS (which we installed earlier when we installed postgis).

13. The easiest way to install boost is using MacPorts.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">$ <span style="color: #c20cb9; font-weight: bold;">sudo</span> port <span style="color: #c20cb9; font-weight: bold;">install</span> boost-jam
---<span style="color: #000000; font-weight: bold;">&gt;</span>  Fetching boost-jam
---<span style="color: #000000; font-weight: bold;">&gt;</span>  Attempting to fetch boost-jam-3.1.16.tgz from http:<span style="color: #000000; font-weight: bold;">//</span>downloads.sourceforge.net<span style="color: #000000; font-weight: bold;">/</span>boost
---<span style="color: #000000; font-weight: bold;">&gt;</span>  Verifying checksum<span style="color: #7a0874; font-weight: bold;">&#40;</span>s<span style="color: #7a0874; font-weight: bold;">&#41;</span> <span style="color: #000000; font-weight: bold;">for</span> boost-jam
---<span style="color: #000000; font-weight: bold;">&gt;</span>  Extracting boost-jam
---<span style="color: #000000; font-weight: bold;">&gt;</span>  Configuring boost-jam
---<span style="color: #000000; font-weight: bold;">&gt;</span>  Building boost-jam
---<span style="color: #000000; font-weight: bold;">&gt;</span>  Staging boost-jam into destroot
---<span style="color: #000000; font-weight: bold;">&gt;</span>  Installing boost-jam 3.1.16_0
---<span style="color: #000000; font-weight: bold;">&gt;</span>  Activating boost-jam 3.1.16_0
---<span style="color: #000000; font-weight: bold;">&gt;</span>  Cleaning boost-jam
---<span style="color: #000000; font-weight: bold;">&gt;</span>  Fetching <span style="color: #c20cb9; font-weight: bold;">gmake</span>
---<span style="color: #000000; font-weight: bold;">&gt;</span>  Attempting to fetch make-<span style="color: #000000;">3.81</span>.tar.bz2 from http:<span style="color: #000000; font-weight: bold;">//</span>ftp.gnu.org<span style="color: #000000; font-weight: bold;">/</span>gnu<span style="color: #000000; font-weight: bold;">/</span><span style="color: #c20cb9; font-weight: bold;">make</span>
---<span style="color: #000000; font-weight: bold;">&gt;</span>  Verifying checksum<span style="color: #7a0874; font-weight: bold;">&#40;</span>s<span style="color: #7a0874; font-weight: bold;">&#41;</span> <span style="color: #000000; font-weight: bold;">for</span> <span style="color: #c20cb9; font-weight: bold;">gmake</span>
---<span style="color: #000000; font-weight: bold;">&gt;</span>  Extracting <span style="color: #c20cb9; font-weight: bold;">gmake</span>
---<span style="color: #000000; font-weight: bold;">&gt;</span>  Configuring <span style="color: #c20cb9; font-weight: bold;">gmake</span>
---<span style="color: #000000; font-weight: bold;">&gt;</span>  Building <span style="color: #c20cb9; font-weight: bold;">gmake</span> with target all
---<span style="color: #000000; font-weight: bold;">&gt;</span>  Staging <span style="color: #c20cb9; font-weight: bold;">gmake</span> into destroot
---<span style="color: #000000; font-weight: bold;">&gt;</span>  Installing <span style="color: #c20cb9; font-weight: bold;">gmake</span> <span style="color: #000000;">3.81</span>_0
---<span style="color: #000000; font-weight: bold;">&gt;</span>  Activating <span style="color: #c20cb9; font-weight: bold;">gmake</span> <span style="color: #000000;">3.81</span>_0
---<span style="color: #000000; font-weight: bold;">&gt;</span>  Cleaning <span style="color: #c20cb9; font-weight: bold;">gmake</span>
---<span style="color: #000000; font-weight: bold;">&gt;</span>  Fetching boost
---<span style="color: #000000; font-weight: bold;">&gt;</span>  Attempting to fetch boost_1_34_1.tar.bz2 from http:<span style="color: #000000; font-weight: bold;">//</span>downloads.sourceforge.net<span style="color: #000000; font-weight: bold;">/</span>boost
...
$ <span style="color: #c20cb9; font-weight: bold;">sudo</span> port <span style="color: #c20cb9; font-weight: bold;">install</span> boost</pre>
      </td>
    </tr>
  </table>
</div>

Note: I encountered an error when I directly installed &#8220;sudo port install boost&#8221; on my first run. A quick workaround is to install boost-jam, then install boost afterwards. For more details:

*   <http://trac.macosforge.org/projects/macports/ticket/13714>
*   <http://trac.macosforge.org/projects/macports/ticket/14043>

> Error: Target org.macports.build returned: shell command &#8221; cd &#8220;/opt/local/var/macports/build/\_opt\_local\_var\_macports\_sources\_rsync.macports.org\_release\_ports\_devel\_boost/work/boost\_1\_34_1&#8243; &#038;&#038; gmake all &#8221; returned error 2 Command output: Makefile:2: \*** missing separator. Stop.

14. You can check if boost was successfully installed by&#8230;

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">$ <span style="color: #c20cb9; font-weight: bold;">sudo</span> port <span style="color: #660033;">-v</span> installed boost boost-jam
The following ports are currently installed:
  boost <span style="color: #000000; font-weight: bold;">@</span>1.34.1_3+darwin_9 <span style="color: #7a0874; font-weight: bold;">&#40;</span>active<span style="color: #7a0874; font-weight: bold;">&#41;</span>
  boost-jam <span style="color: #000000; font-weight: bold;">@</span>3.1.16_0 <span style="color: #7a0874; font-weight: bold;">&#40;</span>active<span style="color: #7a0874; font-weight: bold;">&#41;</span></pre>
      </td>
    </tr>
  </table>
</div>

15. For GAUL, we don&#8217;t need slang base on <http://pgrouting.postlbs.org/wiki/1.x/InstallationManual>.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">$ .<span style="color: #000000; font-weight: bold;">/</span>configure <span style="color: #660033;">--enable-slang</span>=no
$ <span style="color: #c20cb9; font-weight: bold;">make</span>
$ <span style="color: #c20cb9; font-weight: bold;">make</span> <span style="color: #c20cb9; font-weight: bold;">install</span></pre>
      </td>
    </tr>
  </table>
</div>

16. Ok, so this is the heartbreaker. I was able to get pass cmake on pgRouting on version 1.02 however, I received &#8220;undefined symbols&#8221; when linking the librouting.dylib

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="text" style="font-family:monospace;">Linking CXX shared library ../../lib/librouting.dylib
Undefined symbols:
  "_errcode", referenced from:
      _shortest_path in dijkstra.o
      _shortest_path_astar in astar.o
      _shortest_path_shooting_star in shooting_star.o</pre>
      </td>
    </tr>
  </table>
</div>

For the complete error details, see [pgrouting_problem.txt][4]

17. Thanks to www.kyngchaos.com, we can install <http://www.kyngchaos.com/files/software/unixport/pgRouting-1.0.1-4.dmg> binary from http://www.kyngchaos.com/wiki/software:postgres

18. Now we can load the pgRouting functions to our template database

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="bash" style="font-family:monospace;">psql <span style="color: #660033;">-U</span> postgres <span style="color: #660033;">-d</span> template_postgis <span style="color: #660033;">-f</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>share<span style="color: #000000; font-weight: bold;">/</span>contrib<span style="color: #000000; font-weight: bold;">/</span>routing_core.sql 
psql <span style="color: #660033;">-U</span> postgres <span style="color: #660033;">-d</span> template_postgis <span style="color: #660033;">-f</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>share<span style="color: #000000; font-weight: bold;">/</span>contrib<span style="color: #000000; font-weight: bold;">/</span>routing_core_wrappers.sql 
psql <span style="color: #660033;">-U</span> postgres <span style="color: #660033;">-d</span> template_postgis <span style="color: #660033;">-f</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>share<span style="color: #000000; font-weight: bold;">/</span>contrib<span style="color: #000000; font-weight: bold;">/</span>routing_dd.sql
psql <span style="color: #660033;">-U</span> postgres <span style="color: #660033;">-d</span> template_postgis <span style="color: #660033;">-f</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>share<span style="color: #000000; font-weight: bold;">/</span>contrib<span style="color: #000000; font-weight: bold;">/</span>routing_dd_wrappers.sql 
psql <span style="color: #660033;">-U</span> postgres <span style="color: #660033;">-d</span> template_postgis <span style="color: #660033;">-f</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>share<span style="color: #000000; font-weight: bold;">/</span>contrib<span style="color: #000000; font-weight: bold;">/</span>routing_dd_tsp.sql
psql <span style="color: #660033;">-U</span> postgres <span style="color: #660033;">-d</span> template_postgis <span style="color: #660033;">-f</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>share<span style="color: #000000; font-weight: bold;">/</span>contrib<span style="color: #000000; font-weight: bold;">/</span>routing_tsp.sql
psql <span style="color: #660033;">-U</span> postgres <span style="color: #660033;">-d</span> template_postgis <span style="color: #660033;">-f</span> <span style="color: #000000; font-weight: bold;">/</span>usr<span style="color: #000000; font-weight: bold;">/</span>local<span style="color: #000000; font-weight: bold;">/</span>pgsql<span style="color: #000000; font-weight: bold;">/</span>share<span style="color: #000000; font-weight: bold;">/</span>contrib<span style="color: #000000; font-weight: bold;">/</span>routing_tsp_wrappers.sql</pre>
      </td>
    </tr>
  </table>
</div>

 [1]: /images/2008/05/postgresstartup.tar.gz
 [2]: http://www.boost.org/
 [3]: http://gaul.sourceforge.net/
 [4]: /images/2008/05/pgrouting_problem.txt